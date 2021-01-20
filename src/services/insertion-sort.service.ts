import { Injectable } from '@angular/core';
import { PixelComponent } from 'src/components/pixel/pixel.component';
import { ISort } from './isort';

@Injectable({
  providedIn: 'root',
})
export class InsertionSortService implements ISort {
  constructor() {}
  async sort(
    pixels: number[],
    pixelsComponents: PixelComponent[]
  ): Promise<void> {
    const pc = pixelsComponents;
    for (let i = 1; i < pixels.length; i++) {
      const key = pixels[i];
      const keyPc = pc[i];
      await pc[i].moveOnSide(true);
      let j = i - 1;
      while (j >= 0 && key < pixels[j]) {
        pixels[j + 1] = pixels[j];
        await pc[j].moveOnSide(true);
        await pc[j].moveOnSide(false);
        await pc[j].move(j + 1);
        pc[j + 1] = pc[j];
        j--;
      }
      pixels[j + 1] = key;
      pc[j + 1] = keyPc;
      await keyPc.move(j + 1);
      await keyPc.moveOnSide(false);
    }
  }
}
