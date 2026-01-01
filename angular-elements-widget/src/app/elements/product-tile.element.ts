import { Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { ProductTileComponent } from '../components/product-tile.component';

export function registerProductTile(injector: Injector): void {
  const tagName = 'product-tile';

  if (!customElements.get(tagName)) {
    const element = createCustomElement(ProductTileComponent, { injector });
    customElements.define(tagName, element);
  }
}
