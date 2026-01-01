import { Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: 'product-tile',
  template: `Product {{ productId }}`,
})
export class ProductTileComponent {
  @Input() productId!: number;
}
