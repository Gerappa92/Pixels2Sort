import { PixelComponent } from 'src/components/pixel/pixel.component';
import { SortStrategy } from './sort-strategy';

export class SortingSerice {
  private sortStrategy: SortStrategy;
  constructor(sortStrategy: SortStrategy) {
    this.setStrategy(sortStrategy);
  }

  setStrategy(sortStrategy: SortStrategy) {
    this.sortStrategy = sortStrategy;
  }

  sort(numbers: number[]) {
    this.sortStrategy.sort(numbers);
  }

  sortComponents(pixelComponents: PixelComponent[]) {
    this.sortStrategy.sortComponents(pixelComponents);
  }
}
