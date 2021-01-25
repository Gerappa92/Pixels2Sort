import { PixelComponent } from 'src/components/pixel/pixel.component';

export interface SortStrategy {
  sort(pixels: number[]): void;
  sortComponents(pixels: PixelComponent[]): Promise<void>;
}
