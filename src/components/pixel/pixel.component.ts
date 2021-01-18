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
  indexValue = 0;

  @ViewChild('pixelDiv') pixelDiv: ElementRef<HTMLElement>;

  @Input()
  set index(value: number) {
    this.color = this.getColor(value);
    this.top = this.getTop(value) + 'px';
    this.indexValue = value;
  }

  constructor() {}

  getColor(index: number) {
    return '#' + index * 111111;
  }

  getTop(index: number) {
    return 55 * index + 80;
  }

  move(index: number) {
    let newTop = this.getTop(index);
    this.pixelDiv.nativeElement.style.top = newTop + 'px';
  }

  moveOnSide(right: boolean = true) {
    const factor = right ? 1 : 0;
    this.pixelDiv.nativeElement.style.transform = `translateX(${
      factor * 100
    }%)`;
  }

  ngOnInit() {}

  ngAfterViewInit() {
    // console.log(this.pixelDiv.nativeElement);
  }
}
