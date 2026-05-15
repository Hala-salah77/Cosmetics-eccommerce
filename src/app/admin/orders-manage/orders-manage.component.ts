import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, collectionData, doc, updateDoc, query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-orders-manage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container-fluid py-2">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="fw-bold text-secondary mb-0">Order Tracking</h2>
      </div>

      <div class="card border-0 shadow-sm rounded-4 p-0 overflow-hidden">
        <div *ngIf="(orders$ | async) as orders">
          <div *ngIf="orders.length === 0" class="d-flex flex-column align-items-center justify-content-center text-center py-5 my-3 px-4">
            <div class="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mb-4" style="width: 100px; height: 100px;">
              <span style="font-size: 3rem;">📦</span>
            </div>
            <h5 class="fw-bold text-secondary mb-2">No orders yet</h5>
            <p class="text-muted" style="max-width: 320px;">When customers place orders they will appear here in real-time. Share your store to get started!</p>
          </div>

          <div *ngIf="orders.length > 0" class="table-responsive">
            <table class="table table-hover align-middle mb-0">
              <thead class="bg-light text-muted">
                <tr>
                  <th scope="col" class="border-0 py-3 ps-4 fw-medium text-uppercase tracking-wider small">Order ID</th>
                  <th scope="col" class="border-0 py-3 fw-medium text-uppercase tracking-wider small">Customer</th>
                  <th scope="col" class="border-0 py-3 fw-medium text-uppercase tracking-wider small">Amount</th>
                  <th scope="col" class="border-0 py-3 fw-medium text-uppercase tracking-wider small">Date</th>
                  <th scope="col" class="border-0 py-3 fw-medium text-uppercase tracking-wider small">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let order of orders">
                  <td class="fw-bold text-secondary py-3 ps-4">#{{ order.id.slice(0,8).toUpperCase() }}</td>
                  <td class="py-3">
                    <h6 class="mb-0 fw-bold text-secondary">{{ order.customerName || 'Unknown' }}</h6>
                    <small class="text-muted">{{ order.customerEmail }}</small>
                  </td>
                  <td class="fw-bold text-primary py-3">\${{ order.total?.toFixed(2) }}</td>
                  <td class="text-muted py-3">{{ order.createdAt | date:'MMM d, y' }}</td>
                  <td class="py-3">
                    <select class="form-select form-select-sm rounded-pill fw-medium border-0 shadow-none cursor-pointer"
                      [ngClass]="{
                        'bg-warning bg-opacity-10 text-warning': order.status === 'pending',
                        'bg-info bg-opacity-10 text-info': order.status === 'shipped',
                        'bg-success bg-opacity-10 text-success': order.status === 'delivered',
                        'bg-danger bg-opacity-10 text-danger': order.status === 'cancelled'
                      }"
                      [value]="order.status"
                      (change)="updateStatus(order.id, $any($event.target).value)"
                      style="width: 140px;">
                      <option value="pending">Pending</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`.tracking-wider { letter-spacing: 0.05em; } .cursor-pointer { cursor: pointer; }`]
})
export class OrdersManageComponent {
  private firestore = inject(Firestore);
  private toastService = inject(ToastService);
  orders$: Observable<any[]>;

  constructor() {
    const q = query(collection(this.firestore, 'orders'));
    this.orders$ = collectionData(q, { idField: 'id' });
  }

  async updateStatus(orderId: string, status: string) {
    try {
      await updateDoc(doc(this.firestore, `orders/${orderId}`), { status });
      this.toastService.show(`Order status updated to "${status}".`);
    } catch (e: any) {
      this.toastService.show('Failed to update order status.', 'error');
    }
  }
}
