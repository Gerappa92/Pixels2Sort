import { PixelComponent } from 'src/components/pixel/pixel.component';

export interface ISort {
  sort(pixels: number[], pixelsComponents: PixelComponent[]): void;
}
