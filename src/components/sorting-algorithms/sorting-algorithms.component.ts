import {
  Component,
  OnInit,
  QueryList,
  ViewChildren,
  AfterViewChecked,
} from '@angular/core';
import { interval } from 'rxjs';
import { PixelComponent } from '../pixel/pixel.component';

@Component({
  selector: 'sorting-algorithms',
  templateUrl: './sorting-algorithms.component.html',
  styleUrls: ['./sorting-algorithms.component.css'],
})
export class SortingAlgorithmsComponent implements OnInit {
  pixels: number[] = [];
  sortingStatus: string = 'Pixels 2 sort...';

  @ViewChildren(PixelComponent)
  private _pixelsComponents: QueryList<PixelComponent>;

  constructor() {
    for (let i = 0; i < 10; i++) {
      this.pixels[i] = i;
    }
  }

  ngOnInit() {
    console.log('pixels', this.pixels);
    // console.log('_pixelsComponents', this._pixelsComponents);
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

    let sort = true;
    while (sort) {
      sort = false;
      for (let i = 1; i < this.pixels.length; i++) {
        await this.comparePixels(i, i - 1, true);
        if (this.pixels[i - 1] > this.pixels[i]) {
          sort = true;
          await this.switchPixels(i, i - 1);
        }
        await this.comparePixels(i, i - 1, false);
      }
    }

    clearInterval(intervalSortStatus);
    this.sortingStatus = 'Sorting completed!';
  }

  async insertionSort() {
    const intervalLoader = this.setSortingLoader();
    const pc = this._pixelsComponents.toArray();

    for (let i = 1; i < this.pixels.length; i++) {
      const key = this.pixels[i];
      const keyPc = pc[i];
      await pc[i].moveOnSide(true);
      let index = i;

      for (let j = i - 1; j >= 0; j--) {
        if (key > this.pixels[j]) {
          await pc[j].moveOnSide(true);
          await pc[j].moveOnSide(false);
          break;
        }
        await pc[j].moveOnSide(true);
        await pc[j].moveOnSide(false);
      }

      for (let j = i - 1; j >= 0; j--) {
        if (key > this.pixels[j]) {
          break;
        }
        this.pixels[j + 1] = this.pixels[j];

        pc[j].move(j + 1);
        pc[j + 1] = pc[j];
        index = j;
      }

      this.pixels[index] = key;
      pc[index] = keyPc;
      await this.sleep(500);
      await keyPc.move(index);
      await keyPc.moveOnSide(false);
    }

    console.log(this.pixels);
    clearInterval(intervalLoader);
    this.sortingStatus = 'Sorting completed!';
  }

  private setSortingLoader() {
    this.sortingStatus = 'Sorting';
    return setInterval(() => {
      if (this.sortingStatus.length === 10) {
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
