import { PixelComponent } from 'src/components/pixel/pixel.component';
import { SortStrategy } from './sort-strategy';

export default class BubleSortStrategy implements SortStrategy {
  sort(pixels: number[]): void {
    let isSorted = false;
    while (!isSorted) {
      isSorted = true;
      for (let i = 1; i < pixels.length; i++) {
        if (pixels[i] < pixels[i - 1]) {
          const temp = pixels[i];
          pixels[i] = pixels[i - 1];
          pixels[i - 1] = temp;
          isSorted = false;
        }
      }
    }
  }

  async sortComponents(pixels: PixelComponent[]): Promise<void> {
    let isSorted = false;
    while (!isSorted) {
      isSorted = true;
      for (let i = 1; i < pixels.length; i++) {
        pixels[i - 1].moveOnRight();
        await pixels[i].moveOnRight();
        if (pixels[i].value < pixels[i - 1].value) {
          pixels[i].move(i - 1);
          await pixels[i - 1].move(i);
          isSorted = false;

          const temp = pixels[i];
          pixels[i] = pixels[i - 1];
          pixels[i - 1] = temp;
        }
        pixels[i - 1].moveOnLeft();
        await pixels[i].moveOnLeft();
      }
    }
  }
}
