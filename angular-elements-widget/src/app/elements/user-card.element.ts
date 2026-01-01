import { Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { UserCardComponent } from '../components/user-card.component';

export function registerUserCard(injector: Injector) {
  if (!customElements.get('user-card')) {
    customElements.define(
      'user-card',
      createCustomElement(UserCardComponent, { injector })
    );
  }
}
