import { Injectable } from '@angular/core';
import { PixelComponent } from 'src/components/pixel/pixel.component';
import { ISort } from './isort';

@Injectable({
  providedIn: 'root',
})
export class BubleSortService implements ISort {
  constructor() {}
  async sort(
    pixels: number[],
    pixelsComponents: PixelComponent[]
  ): Promise<void> {
    let sort = true;
    while (sort) {
      sort = false;
      for (let i = 1; i < pixels.length; i++) {
        await this.comparePixels(pixelsComponents, i, i - 1, true);
        if (pixels[i - 1] > pixels[i]) {
          sort = true;
          await this.switchPixels(pixels, pixelsComponents, i, i - 1);
        }
        await this.comparePixels(pixelsComponents, i, i - 1, false);
      }
    }
  }

  private async switchPixels(
    pixels: number[],
    pixelsComponents: PixelComponent[],
    index1: number,
    index2: number,
    wait: boolean = true
  ) {
    let temp = pixels[index1];
    pixels[index1] = pixels[index2];
    pixels[index2] = temp;
    let sleepDuration = 300;
    if (!wait) sleepDuration = 100;

    await this.sleep(sleepDuration);
    pixelsComponents[index1].move(index2);
    pixelsComponents[index2].move(index1);
  }

  async comparePixels(
    pixelsComponents: PixelComponent[],
    index1: number,
    index2: number,
    right: boolean
  ) {
    pixelsComponents[index1].moveOnSide(right);
    pixelsComponents[index2].moveOnSide(right);
    await this.sleep(500);
  }

  sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
