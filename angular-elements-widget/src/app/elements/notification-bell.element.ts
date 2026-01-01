import { Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { NotificationBellComponent } from '../components/notification-bell.component';

export function registerNotificationBell(injector: Injector): void {
  const tagName = 'notification-bell';

  if (!customElements.get(tagName)) {
    const element = createCustomElement(NotificationBellComponent, { injector });
    customElements.define(tagName, element);
  }
}
