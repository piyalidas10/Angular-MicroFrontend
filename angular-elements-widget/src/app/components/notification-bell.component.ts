import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventBusService } from '../shared/event-bus.service';

@Component({
  selector: 'notification-bell',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bell">
      🔔 Notifications: {{ count }}
    </div>
  `,
})
export class NotificationBellComponent {
  count = 0;
  private bus = inject(EventBusService);

  constructor() {
    effect(() => {
      const event = this.bus.events();
      if (!event) return;

      if (event.type === 'USER_SELECTED') {
        this.count++;
      }
    });
  }
}
