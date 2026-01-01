import { Injector } from '@angular/core';
import { registerUserCard } from './elements/user-card.element';
import { registerProductTile } from './elements/product-tile.element';
import { registerNotificationBell } from './elements/notification-bell.element';

export function registerAllElements(injector: Injector) {
  registerUserCard(injector);
  registerProductTile(injector);
  registerNotificationBell(injector);
}
