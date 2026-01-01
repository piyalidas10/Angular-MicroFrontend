import { Injectable, signal, WritableSignal } from '@angular/core';

export type WidgetEvent =
  | { type: 'USER_SELECTED'; payload: { userId: string } }
  | { type: 'PRODUCT_VIEWED'; payload: { productId: string } }
  | { type: 'NOTIFICATION_READ'; payload: null };

@Injectable({ providedIn: 'root' })
export class EventBusService {
  private _event: WritableSignal<WidgetEvent | null> = signal(null);

  emit(event: WidgetEvent) {
    this._event.set(event);
  }

  get events() {
    return this._event.asReadonly();
  }
}
