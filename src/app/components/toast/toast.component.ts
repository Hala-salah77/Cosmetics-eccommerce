import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, Toast } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container position-fixed bottom-0 end-0 p-4" style="z-index: 9999;">
      <div
        *ngFor="let toast of (toastService.toasts | async)"
        class="toast-item d-flex align-items-center gap-3 px-4 py-3 mb-3 rounded-4 shadow-lg toast-animate"
        [ngClass]="{
          'bg-primary text-white': toast.type === 'success',
          'bg-danger text-white': toast.type === 'error',
          'bg-secondary text-white': toast.type === 'info'
        }"
        style="min-width: 290px; max-width: 360px; backdrop-filter: blur(8px);"
      >
        <span class="fs-4 flex-shrink-0">
          {{ toast.type === 'success' ? '✅' : toast.type === 'error' ? '❌' : 'ℹ️' }}
        </span>
        <span class="fw-medium lh-sm flex-grow-1" style="font-size: 0.95rem;">{{ toast.message }}</span>
        <button
          class="btn btn-sm p-0 lh-1 border-0 flex-shrink-0 opacity-75"
          style="background: transparent; color: inherit;"
          (click)="toastService.dismiss(toast.id)"
        >✕</button>
      </div>
    </div>
  `,
  styles: [`
    @keyframes slideInUp {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .toast-animate {
      animation: slideInUp 0.3s ease forwards;
    }
  `]
})
export class ToastComponent {
  toastService = inject(ToastService);
}
