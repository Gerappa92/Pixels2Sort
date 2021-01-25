import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import BubleSortStrategy from 'src/services/sorting/buble-sort-strategy';
import { InsertionSortStrategy } from 'src/services/sorting/insertion-sort-strategy';
import { SortingSerice as SortSerice } from 'src/services/sorting/sort-service';
import { PixelComponent } from '../pixel/pixel.component';

@Component({
  selector: 'sorting-algorithms',
  templateUrl: './sorting-algorithms.component.html',
  styleUrls: ['./sorting-algorithms.component.css'],
})
export class SortingAlgorithmsComponent implements OnInit {
  pixels: number[] = [];
  sortingStatus: string = 'Pixels 2 sort...';
  sortService: SortSerice;

  @ViewChildren(PixelComponent)
  private _pixelsComponents: QueryList<PixelComponent>;

  constructor() {
    for (let i = 0; i < 10; i++) {
      this.pixels[i] = i;
    }
    this.sortService = new SortSerice(new BubleSortStrategy());
  }

  ngOnInit() {
    console.log('pixels', this.pixels);
  }

  async mixPixels() {
    this.sortingStatus = 'Mixing pixels...';
    for (let i = 2; i < this._pixelsComponents.length; i++) {
      if (i % 2 === 0) {
        await this.switchPixels(i - 1, i, false);
      }
    }
    let randoms: number[] = [];

    for (let i = 0; i < this.pixels.length; i += 2) {
      let r1 = this.getRandomInt(0, this.pixels.length);
      while (randoms.find((n) => n === r1)) {
        r1 = this.getRandomInt(0, this.pixels.length);
      }
      randoms.push(r1);
      await this.switchPixels(r1, i, false);
    }
    this.sortingStatus = 'Mixing completed!';
  }

  async bubleSort() {
    const intervalSortStatus = this.setSortingLoader();

    this.sortService.setStrategy(new BubleSortStrategy());
    this.sortService.sort(this.pixels);
    await this.sortService.sortComponents(this._pixelsComponents.toArray());

    clearInterval(intervalSortStatus);
    this.sortingStatus = 'Sorting completed!';
  }

  async insertionSort() {
    const intervalLoader = this.setSortingLoader();

    this.sortService.setStrategy(new InsertionSortStrategy());
    this.sortService.sort(this.pixels);
    await this.sortService.sortComponents(this._pixelsComponents.toArray());

    clearInterval(intervalLoader);
    this.sortingStatus = 'Sorting completed!';
  }

  private setSortingLoader() {
    this.sortingStatus = 'Sorting';
    return setInterval(() => {
      if (this.sortingStatus.length >= 10) {
        this.sortingStatus = 'Sorting';
      } else {
        this.sortingStatus += '.';
      }
    }, 500);
  }

  private getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  private async switchPixels(
    index1: number,
    index2: number,
    wait: boolean = true
  ) {
    let temp = this.pixels[index1];
    this.pixels[index1] = this.pixels[index2];
    this.pixels[index2] = temp;
    let pc = this._pixelsComponents.toArray();
    let sleepDuration = 300;
    if (!wait) sleepDuration = 100;

    await this.sleep(sleepDuration);
    pc[index1].move(index2);
    pc[index2].move(index1);
  }

  async comparePixels(index1: number, index2: number, right: boolean) {
    let pc = this._pixelsComponents.toArray();
    pc[index1].moveOnSide(right);
    pc[index2].moveOnSide(right);
    await this.sleep(500);
  }

  sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
