import { Component, Input, inject, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventBusService } from '../shared/event-bus.service';

@Component({
  selector: 'user-card',
  standalone: true,
  imports: [CommonModule],
  template: `
  <style>
      .card {
        border: 1px solid #ccc;
        padding: 12px;
        border-radius: 6px;
        font-family: Arial;
      }
      button {
        margin-top: 8px;
      }
    </style>

    <div class="card">
      <h3>User {{ userId }}</h3>
      <button (click)="select()">Select</button>
    </div>
  `,
})
export class UserCardComponent {
  @Input() userId!: string;

  private bus = inject(EventBusService);
  private el = inject(ElementRef<HTMLElement>);

  select() {
    const payload = { userId: this.userId };

    // 🔁 Angular ↔ Angular (cross-widget)
    this.bus.emit({
      type: 'USER_SELECTED',
      payload,
    });

    // 🌍 Angular → Host (DOM event)
    this.el.nativeElement.dispatchEvent(
      new CustomEvent('user-selected', {
        detail: payload,
        bubbles: true,
        composed: true, // 🔴 CRITICAL for Angular Elements
      })
    );
  }
}

/**
 * 🔴 Why bubbles + composed Matter
 | Option           | Why                       |
| ---------------- | ------------------------- |
| `bubbles: true`  | Event travels up DOM      |
| `composed: true` | Escapes Shadow DOM        |
| Without these    | Host NEVER receives event |

 * Without composed: true:
    card.addEventListener ❌
    window.addEventListener ❌
 */