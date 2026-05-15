import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="d-flex" style="min-height: 100vh;">
      <aside class="bg-dark text-white p-3 d-flex flex-column" style="width: 250px;">
        <h3 class="mb-4">Admin Panel</h3>
        <ul class="nav nav-pills flex-column mb-auto gap-2">
          <li class="nav-item"><a class="nav-link text-white" routerLink="/admin/dashboard" routerLinkActive="active">Dashboard</a></li>
          <li class="nav-item"><a class="nav-link text-white" routerLink="/admin/products" routerLinkActive="active">Products</a></li>
          <li class="nav-item"><a class="nav-link text-white" routerLink="/admin/offers" routerLinkActive="active">Offers</a></li>
          <li class="nav-item"><a class="nav-link text-white" routerLink="/admin/orders" routerLinkActive="active">Orders</a></li>
          <li class="nav-item"><a class="nav-link text-white" routerLink="/admin/users" routerLinkActive="active">Users</a></li>
        </ul>
        <hr>
        <a class="nav-link text-danger" routerLink="/">Exit to Store</a>
      </aside>
      <main class="flex-grow-1 bg-light p-4 overflow-auto" style="height: 100vh;">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .nav-link.active {
      background-color: var(--bs-primary);
    }
  `]
})
export class AdminLayoutComponent { }
