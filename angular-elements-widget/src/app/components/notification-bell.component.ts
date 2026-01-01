import { Component, signal } from "@angular/core";

@Component({
  standalone: true,
  selector: 'notification-bell',
  template: `🔔 {{ count() }}`,
})
export class NotificationBellComponent {
  count = signal(3);
}
