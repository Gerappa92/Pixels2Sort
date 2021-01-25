import { PixelComponent } from 'src/components/pixel/pixel.component';
import { SortStrategy } from './sort-strategy';

export class InsertionSortStrategy implements SortStrategy {
  sort(pixels: number[]): void {
    for (let i = 1; i < pixels.length; i++) {
      const comparePixel = pixels[i];
      let emptyIndex = i;
      for (let j = i - 1; j >= 0; j--) {
        if (comparePixel > pixels[j]) break;
        pixels[j + 1] = pixels[j];
        emptyIndex = j;
      }
      pixels[emptyIndex] = comparePixel;
    }
  }
  async sortComponents(pixels: PixelComponent[]): Promise<void> {
    for (let i = 1; i < pixels.length; i++) {
      const comparePixel = pixels[i];
      await comparePixel.moveOnRight();
      let emptyIndex = i;

      for (let j = i - 1; j >= 0; j--) {
        if (comparePixel.value > pixels[j].value) {
          await pixels[j].moveOnRight();
          await pixels[j].moveOnLeft();
          break;
        }
        await pixels[j].moveOnRight();
        await pixels[j].moveOnLeft();
      }

      for (let j = i - 1; j >= 0; j--) {
        if (comparePixel.value > pixels[j].value) break;

        await pixels[j].move(j + 1);
        pixels[j + 1] = pixels[j];

        emptyIndex = j;
      }
      pixels[emptyIndex] = comparePixel;
      await comparePixel.move(emptyIndex);
      await comparePixel.moveOnLeft();
    }
  }
}
