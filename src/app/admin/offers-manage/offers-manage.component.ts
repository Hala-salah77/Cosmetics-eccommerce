import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-offers-manage',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container-fluid py-2">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="fw-bold text-secondary mb-0">Offers & Discounts</h2>
        <button class="btn btn-primary rounded-pill fw-medium shadow-sm d-flex align-items-center gap-2" data-bs-toggle="modal" data-bs-target="#addOfferModal">
          <span class="fs-5 lh-1">+</span> Create Offer
        </button>
      </div>

      <div class="card border-0 shadow-sm rounded-4 p-0 overflow-hidden">
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0">
            <thead class="bg-light text-muted">
              <tr>
                <th scope="col" class="border-0 py-3 ps-4 fw-medium text-uppercase tracking-wider small">Offer Code/Name</th>
                <th scope="col" class="border-0 py-3 fw-medium text-uppercase tracking-wider small">Target Product(s)</th>
                <th scope="col" class="border-0 py-3 fw-medium text-uppercase tracking-wider small">Discount</th>
                <th scope="col" class="border-0 py-3 fw-medium text-uppercase tracking-wider small">Expiry Date</th>
                <th scope="col" class="border-0 py-3 fw-medium text-uppercase tracking-wider small">Status</th>
                <th scope="col" class="border-0 py-3 text-end pe-4 fw-medium text-uppercase tracking-wider small">Actions</th>
              </tr>
            </thead>
            <tbody class="border-top-0">
              <tr *ngFor="let item of [1,2,3]">
                <td class="py-3 ps-4">
                  <div class="fw-bold text-secondary">SPRING2{{item}}</div>
                  <small class="text-muted">Spring Sale Campaign</small>
                </td>
                <td class="text-secondary fw-medium py-3">All Skin Care</td>
                <td class="fw-bold text-danger py-3">-2{{item}}%</td>
                <td class="text-muted py-3">Oct 30, 2024</td>
                <td class="py-3">
                  <span class="badge rounded-pill fw-medium bg-success bg-opacity-10 text-success">Active</span>
                </td>
                <td class="text-end py-3 pe-4">
                  <button class="btn btn-sm btn-light text-danger rounded-pill px-3 fw-medium hover-bg-light">Revoke</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Create Offer Modal -->
    <div class="modal fade" id="addOfferModal" tabindex="-1" aria-labelledby="addOfferModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content rounded-4 border-0 shadow">
          <div class="modal-header border-bottom-0 pb-0 pt-4 px-4">
            <h5 class="modal-title fw-bold text-secondary fs-4" id="addOfferModalLabel">Create New Offer</h5>
            <button type="button" class="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body p-4">
            <form>
              <div class="form-floating mb-3">
                <input type="text" class="form-control focus-primary shadow-none" id="offerName" placeholder="Offer Name" required>
                <label for="offerName" class="text-muted">Campaign Name</label>
              </div>
              
              <div class="form-floating mb-3">
                <select class="form-select text-secondary fw-medium focus-primary shadow-none" id="targetProduct" aria-label="Target">
                  <option value="all" selected>All Products</option>
                  <option value="skin">Category: Skin Care</option>
                  <option value="hair">Category: Hair Care</option>
                  <option value="p1">Product: Radiant Glow Serum</option>
                </select>
                <label for="targetProduct" class="text-muted">Target Area</label>
              </div>

              <div class="row g-3 mb-3">
                <div class="col-md-6">
                  <div class="form-floating">
                    <input type="number" class="form-control focus-primary shadow-none text-danger fw-bold" id="discountPct" placeholder="20" value="20">
                    <label for="discountPct" class="text-muted">Discount %</label>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-floating">
                    <input type="date" class="form-control focus-primary shadow-none" id="expiryDate" required>
                    <label for="expiryDate" class="text-muted">Expiry Date</label>
                  </div>
                </div>
              </div>

            </form>
          </div>
          <div class="modal-footer border-top-0 pt-0 px-4 pb-4">
            <button type="button" class="btn btn-light rounded-pill px-4 fw-medium" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary rounded-pill px-5 fw-bold shadow-sm">Launch Offer</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .tracking-wider { letter-spacing: 0.05em; }
    .focus-primary:focus {
      border-color: var(--bs-primary);
      box-shadow: 0 0 0 0.25rem rgba(44, 94, 59, 0.25);
    }
  `]
})
export class OffersManageComponent { }
