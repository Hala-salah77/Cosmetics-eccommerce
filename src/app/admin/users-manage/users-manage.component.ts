import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Firestore, collection, collectionData, query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users-manage',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container-fluid py-2">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="fw-bold text-secondary mb-0">User Monitoring</h2>
      </div>

      <div class="card border-0 shadow-sm rounded-4 p-0 overflow-hidden">
        <div *ngIf="(users$ | async) as users">
          <div class="card-header bg-light py-3 px-4 border-bottom border-secondary border-opacity-10">
            <span class="text-muted fw-medium small text-uppercase tracking-wider">
              {{ users.length }} Registered Users
            </span>
          </div>

          <div *ngIf="users.length === 0" class="d-flex flex-column align-items-center justify-content-center text-center py-5 my-3 px-4">
            <div class="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mb-4" style="width: 100px; height: 100px;">
              <span style="font-size: 3rem;">👥</span>
            </div>
            <h5 class="fw-bold text-secondary mb-2">No users yet</h5>
            <p class="text-muted" style="max-width: 320px;">Users who register through the Sign Up page will appear here automatically.</p>
          </div>

          <div *ngIf="users.length > 0" class="table-responsive">
            <table class="table table-hover align-middle mb-0">
              <thead class="bg-light text-muted">
                <tr>
                  <th scope="col" class="border-0 py-3 ps-4 fw-medium text-uppercase tracking-wider small">User</th>
                  <th scope="col" class="border-0 py-3 fw-medium text-uppercase tracking-wider small">Role</th>
                  <th scope="col" class="border-0 py-3 fw-medium text-uppercase tracking-wider small">Member Since</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let user of users">
                  <td class="py-3 ps-4">
                    <div class="d-flex align-items-center gap-3">
                      <div class="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center fw-bold" style="width: 45px; height: 45px; flex-shrink: 0;">
                        {{ user.fullName?.charAt(0)?.toUpperCase() || '?' }}
                      </div>
                      <div>
                        <h6 class="mb-0 fw-bold text-secondary">{{ user.fullName }}</h6>
                        <small class="text-muted">{{ user.email }}</small>
                      </div>
                    </div>
                  </td>
                  <td class="py-3">
                    <span class="badge rounded-pill fw-medium px-3 py-2"
                      [ngClass]="user.role === 'admin' ? 'bg-primary bg-opacity-10 text-primary' : 'bg-success bg-opacity-10 text-success'">
                      {{ user.role || 'customer' }}
                    </span>
                  </td>
                  <td class="text-muted py-3">{{ user.createdAt | date:'MMM d, y' }}</td>
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
export class UsersManageComponent {
  private firestore = inject(Firestore);
  users$: Observable<any[]>;

  constructor() {
    const q = query(collection(this.firestore, 'users'));
    this.users$ = collectionData(q, { idField: 'id' });
  }
}
