import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  signal,
  ViewEncapsulation
} from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'user-card',
  encapsulation: ViewEncapsulation.ShadowDom,
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
      <h3>{{ name() }}</h3>
      <p>User ID: {{ userId }}</p>
      <button (click)="notify()">Notify</button>
    </div>
  `
})
export class UserCardComponent {
  @Input() userId!: number;
  @Output() selected = new EventEmitter<number>();

  name = signal('Angular 19 Element');

  notify() {
    this.selected.emit(this.userId);
  }
}
