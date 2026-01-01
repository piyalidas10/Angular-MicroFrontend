import { Component, Input, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventBusService } from '../shared/event-bus.service';

@Component({
  selector: 'product-tile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="product-tile">
      <h4>Product {{ productId }}</h4>

      <p *ngIf="selectedUserId">
        Viewing for user: <b>{{ selectedUserId }}</b>
      </p>

      <button (click)="viewProduct()">View Product</button>
    </div>
  `,
  styles: [
    `
      .product-tile {
        border: 1px solid #ddd;
        padding: 12px;
        margin: 8px;
        border-radius: 6px;
      }
    `,
  ],
})
export class ProductTileComponent {
  @Input() productId!: string;

  selectedUserId: string | null = null;

  private bus = inject(EventBusService);

  constructor() {
    // 🔁 React to cross-widget events
    effect(() => {
      const event = this.bus.events();
      if (!event) return;

      if (event.type === 'USER_SELECTED') {
        this.selectedUserId = event.payload.userId;
      }
    });
  }

  viewProduct() {
    this.bus.emit({
      type: 'PRODUCT_VIEWED',
      payload: { productId: this.productId },
    });
  }
}
