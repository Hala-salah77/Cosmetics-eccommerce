import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Firestore, collection, collectionData, query } from '@angular/fire/firestore';
import { map, combineLatestWith } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container-fluid py-2">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="fw-bold text-secondary mb-0">Dashboard Overview</h2>
      </div>

      <!-- Stats Cards -->
      <div class="row g-4 mb-5" *ngIf="stats$ | async as stats">
        <div class="col-sm-6 col-lg-3">
          <div class="card border-0 shadow-sm rounded-4 h-100 p-3 bg-primary text-white position-relative overflow-hidden">
            <div class="position-absolute end-0 bottom-0 opacity-10 translate-middle-y me-n3">
              <span style="font-size: 8rem;">💰</span>
            </div>
            <div class="card-body position-relative z-1">
              <h6 class="card-title mb-0 fw-medium text-white-50 text-uppercase small tracking-wider">Total Orders</h6>
              <h3 class="fw-bold mt-3 mb-0">{{ stats.totalOrders }}</h3>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-lg-3">
          <div class="card border-0 shadow-sm rounded-4 h-100 p-3">
            <div class="card-body">
              <h6 class="card-title mb-0 fw-medium text-muted text-uppercase small tracking-wider">Total Products</h6>
              <h3 class="fw-bold mt-3 mb-0 text-primary">{{ stats.totalProducts }}</h3>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-lg-3">
          <div class="card border-0 shadow-sm rounded-4 h-100 p-3">
            <div class="card-body">
              <h6 class="card-title mb-0 fw-medium text-muted text-uppercase small tracking-wider">Registered Users</h6>
              <h3 class="fw-bold mt-3 mb-0 text-primary">{{ stats.totalUsers }}</h3>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-lg-3">
          <div class="card border-0 shadow-sm rounded-4 h-100 p-3">
            <div class="card-body">
              <h6 class="card-title mb-0 fw-medium text-muted text-uppercase small tracking-wider">Pending Orders</h6>
              <h3 class="fw-bold mt-3 mb-0 text-warning">{{ stats.pendingOrders }}</h3>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Orders Section -->
      <div class="card border-0 shadow-sm rounded-4 p-4">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h5 class="fw-bold mb-0 text-secondary">Recent Orders</h5>
          <a routerLink="/admin/orders" class="btn btn-sm btn-light text-primary rounded-pill px-3 fw-medium">View All</a>
        </div>

        <div *ngIf="(recentOrders$ | async) as orders">
          <div *ngIf="orders.length === 0" class="d-flex flex-column align-items-center justify-content-center text-center py-5">
            <div class="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mb-4" style="width: 80px; height: 80px;">
              <span style="font-size: 2.2rem;">📦</span>
            </div>
            <h6 class="fw-bold text-secondary mb-1">No orders yet</h6>
            <p class="text-muted small mb-0">Recent orders will appear here once customers start shopping.</p>
          </div>

          <div *ngIf="orders.length > 0" class="table-responsive">
            <table class="table table-hover align-middle mb-0">
              <thead class="bg-light text-muted">
                <tr>
                  <th scope="col" class="border-0 py-3 ps-3 fw-medium small text-uppercase tracking-wider">Order ID</th>
                  <th scope="col" class="border-0 py-3 fw-medium small text-uppercase tracking-wider">Customer</th>
                  <th scope="col" class="border-0 py-3 fw-medium small text-uppercase tracking-wider">Amount</th>
                  <th scope="col" class="border-0 py-3 fw-medium small text-uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let order of orders">
                  <td class="fw-bold text-secondary py-3 ps-3">#{{ order.id.slice(0,8).toUpperCase() }}</td>
                  <td class="py-3">
                    <div class="fw-bold text-secondary">{{ order.customerName || 'Unknown' }}</div>
                    <div class="small text-muted">{{ order.customerEmail }}</div>
                  </td>
                  <td class="fw-bold text-primary py-3">\${{ order.total?.toFixed(2) }}</td>
                  <td class="py-3">
                    <span class="badge rounded-pill fw-medium px-3 py-2"
                      [ngClass]="{
                        'bg-warning bg-opacity-10 text-warning': order.status === 'pending',
                        'bg-info bg-opacity-10 text-info': order.status === 'shipped',
                        'bg-success bg-opacity-10 text-success': order.status === 'delivered',
                        'bg-danger bg-opacity-10 text-danger': order.status === 'cancelled'
                      }">
                      {{ order.status | titlecase }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`.tracking-wider { letter-spacing: 0.05em; }`]
})
export class DashboardComponent {
  private firestore = inject(Firestore);

  private orders$ = collectionData(query(collection(this.firestore, 'orders')), { idField: 'id' });
  private products$ = collectionData(query(collection(this.firestore, 'products')), { idField: 'id' });
  private users$ = collectionData(query(collection(this.firestore, 'users')), { idField: 'id' });

  stats$ = combineLatest([this.orders$, this.products$, this.users$]).pipe(
    map(([orders, products, users]) => ({
      totalOrders: orders.length,
      totalProducts: products.length,
      totalUsers: users.length,
      pendingOrders: orders.filter((o: any) => o.status === 'pending').length
    }))
  );

  recentOrders$ = this.orders$.pipe(
    map((orders: any[]) => orders.slice(0, 5))
  );
}
