import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'pixel',
  templateUrl: './pixel.component.html',
  styleUrls: ['./pixel.component.css'],
})
export class PixelComponent implements OnInit, AfterViewInit {
  color = '#000000';
  top = '80px';
  value = 0;

  @ViewChild('pixelDiv') pixelDiv: ElementRef<HTMLElement>;

  @Input()
  set index(value: number) {
    this.color = this.getColor(value);
    this.top = this.getTop(value) + 'px';
    this.value = value;
  }

  constructor() {}

  getColor(index: number) {
    return '#' + index * 111111;
  }

  getTop(index: number) {
    return 55 * index;
  }

  async move(index: number) {
    let newTop = this.getTop(index);
    this.pixelDiv.nativeElement.style.top = newTop + 'px';
    await this.sleep(500);
  }

  async moveOnSide(right: boolean = true) {
    const factor = right ? 1 : 0;
    this.pixelDiv.nativeElement.style.transform = `translateX(${
      factor * 100
    }%)`;
    await this.sleep(500);
  }

  ngOnInit() {}

  ngAfterViewInit() {
    // console.log(this.pixelDiv.nativeElement);
  }

  sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
