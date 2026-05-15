import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, collectionData, addDoc, doc, deleteDoc, query } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { Observable, of } from 'rxjs';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-products-manage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container-fluid py-2">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="fw-bold text-secondary mb-0">Products Management</h2>
        <button class="btn btn-primary rounded-pill fw-medium shadow-sm d-flex align-items-center gap-2" data-bs-toggle="modal" data-bs-target="#addProductModal">
          <span class="fs-5 lh-1">+</span> Add New Product
        </button>
      </div>

      <!-- Loading -->
      <div *ngIf="loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status"></div>
        <p class="text-muted mt-3">Loading products...</p>
      </div>

      <!-- Products Table -->
      <div *ngIf="!loading" class="card border-0 shadow-sm rounded-4 p-0 overflow-hidden">
        <div *ngIf="(products$ | async) as products">
          <!-- Empty state -->
          <div *ngIf="products.length === 0" class="d-flex flex-column align-items-center justify-content-center text-center py-5 my-3 px-4">
            <div class="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mb-4" style="width: 100px; height: 100px;">
              <span style="font-size: 3rem;">🌿</span>
            </div>
            <h5 class="fw-bold text-secondary mb-2">No products yet</h5>
            <p class="text-muted mb-4" style="max-width: 320px;">Your product catalog is empty. Add your first natural product using the button above.</p>
            <button class="btn btn-primary rounded-pill px-4 fw-medium shadow-sm" data-bs-toggle="modal" data-bs-target="#addProductModal">
              + Add First Product
            </button>
          </div>

          <div *ngIf="products.length > 0" class="table-responsive">
            <table class="table table-hover align-middle mb-0">
              <thead class="bg-light text-muted">
                <tr>
                  <th scope="col" class="border-0 py-3 ps-4 fw-medium text-uppercase tracking-wider small">Product</th>
                  <th scope="col" class="border-0 py-3 fw-medium text-uppercase tracking-wider small">Category</th>
                  <th scope="col" class="border-0 py-3 fw-medium text-uppercase tracking-wider small">Price</th>
                  <th scope="col" class="border-0 py-3 fw-medium text-uppercase tracking-wider small">Stock</th>
                  <th scope="col" class="border-0 py-3 fw-medium text-uppercase tracking-wider small">Status</th>
                  <th scope="col" class="border-0 py-3 text-end pe-4 fw-medium text-uppercase tracking-wider small">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let product of products">
                  <td class="py-3 ps-4">
                    <div class="d-flex align-items-center gap-3">
                      <div class="bg-secondary bg-opacity-10 rounded-3 d-flex justify-content-center align-items-center border border-secondary border-opacity-10" style="width: 50px; height: 50px; overflow: hidden; flex-shrink: 0;">
                        <img *ngIf="product.image" [src]="product.image" class="w-100 h-100 object-fit-cover" alt="product">
                        <span *ngIf="!product.image" class="fs-4">🌿</span>
                      </div>
                      <div>
                        <h6 class="mb-0 fw-bold text-secondary">{{ product.name }}</h6>
                        <small class="text-muted">ID: {{ product.id }}</small>
                      </div>
                    </div>
                  </td>
                  <td class="text-muted py-3">{{ product.category }}</td>
                  <td class="fw-bold text-secondary py-3">\${{ product.price }}</td>
                  <td class="py-3">
                    <span class="fw-medium" [class.text-danger]="product.stock === 0">
                      {{ product.stock === 0 ? 'Out of Stock' : product.stock + ' in stock' }}
                    </span>
                  </td>
                  <td class="py-3">
                    <span class="badge rounded-pill fw-medium" [ngClass]="product.hasOffer ? 'bg-warning bg-opacity-10 text-warning' : 'bg-success bg-opacity-10 text-success'">
                      {{ product.hasOffer ? '🏷️ Has Offer' : 'Regular Price' }}
                    </span>
                  </td>
                  <td class="text-end py-3 pe-4">
                    <button class="btn btn-sm btn-light text-danger rounded-pill px-3 fw-medium" (click)="deleteProduct(product.id)">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Product Modal -->
    <div class="modal fade" id="addProductModal" tabindex="-1" aria-labelledby="addProductModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content rounded-4 border-0 shadow">
          <div class="modal-header border-bottom-0 pt-4 px-4">
            <h5 class="modal-title fw-bold text-secondary fs-4" id="addProductModalLabel">Add New Product</h5>
            <button type="button" class="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body p-4">
            <form>
              <div class="row g-4">
                <div class="col-md-8">
                  <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="pName" placeholder="Product Name" [(ngModel)]="newProduct.name" name="pName">
                    <label for="pName" class="text-muted">Product Name</label>
                  </div>
                  <div class="row g-3 mb-3">
                    <div class="col-md-6">
                      <div class="form-floating">
                        <select class="form-select" id="pCategory" [(ngModel)]="newProduct.category" name="pCategory">
                          <option value="Skin Care">Skin Care</option>
                          <option value="Hair Care">Hair Care</option>
                        </select>
                        <label for="pCategory" class="text-muted">Category</label>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-floating">
                        <input type="number" class="form-control" id="pPrice" placeholder="0.00" [(ngModel)]="newProduct.price" name="pPrice">
                        <label for="pPrice" class="text-muted">Price ($)</label>
                      </div>
                    </div>
                  </div>
                  <div class="row g-3 mb-3">
                    <div class="col-md-6">
                      <div class="form-floating">
                        <input type="number" class="form-control" id="pStock" placeholder="0" [(ngModel)]="newProduct.stock" name="pStock">
                        <label for="pStock" class="text-muted">Initial Stock</label>
                      </div>
                    </div>
                    <div class="col-md-6 d-flex align-items-center">
                      <div class="form-check form-switch ms-2">
                        <input class="form-check-input" type="checkbox" id="pHasOfferRow" [(ngModel)]="newProduct.hasOffer" name="pHasOfferRow" style="width: 3em; height: 1.5em;">
                        <label class="form-check-label ms-3 mt-1 fw-medium text-secondary" for="pHasOfferRow">Has Offer</label>
                      </div>
                    </div>
                  </div>
                  <div class="form-floating mb-3">
                    <textarea class="form-control" placeholder="Description" id="pDesc" [(ngModel)]="newProduct.desc" name="pDesc" style="height: 120px"></textarea>
                    <label for="pDesc" class="text-muted">Product Description</label>
                  </div>
                  <div class="form-check form-switch ms-1 mt-2">
                    <input class="form-check-input" type="checkbox" id="pHasOffer" [(ngModel)]="newProduct.hasOffer" name="pHasOffer" style="width: 3em; height: 1.5em;">
                    <label class="form-check-label ms-3 mt-1 fw-medium text-secondary" for="pHasOffer">Has Offer / Discount</label>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="card h-100 border border-secondary border-opacity-10 bg-light rounded-4">
                    <div class="card-body d-flex flex-column justify-content-center align-items-center text-center p-4">
                      <span class="display-4 mb-3">☁️</span>
                      <h6 class="fw-bold text-secondary mb-1">Upload Image</h6>
                      <p class="small text-muted mb-4">Max 2MB. JPG or PNG.</p>
                      <div class="mt-auto w-100 position-relative">
                        <input class="form-control opacity-0 position-absolute w-100 h-100 cursor-pointer z-2" type="file" accept="image/*" (change)="onFileSelect($event)">
                        <button class="btn btn-outline-primary rounded-pill w-100 position-relative z-1 fw-medium">Select File</button>
                      </div>
                      <small class="text-success mt-2 fw-medium" *ngIf="selectedFile">{{ selectedFile.name }}</small>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer border-top-0 px-4 pb-4">
            <button type="button" class="btn btn-light rounded-pill px-4 fw-medium" data-bs-dismiss="modal" id="closeModal">Cancel</button>
            <button type="button" class="btn btn-primary rounded-pill px-5 fw-bold shadow-sm" (click)="saveProduct()" [disabled]="saving">
              <span *ngIf="saving" class="spinner-border spinner-border-sm me-2"></span>
              {{ saving ? 'Saving...' : 'Save Product' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`.tracking-wider { letter-spacing: 0.05em; } .cursor-pointer { cursor: pointer; }`]
})
export class ProductsManageComponent {
  private firestore = inject(Firestore);
  private storage = inject(Storage);
  private toastService = inject(ToastService);

  products$: Observable<any[]>;
  loading = false;
  saving = false;
  selectedFile: File | null = null;

  newProduct: any = { name: '', category: 'Skin Care', price: 0, stock: 0, desc: '', hasOffer: false };

  constructor() {
    const q = query(collection(this.firestore, 'products'));
    this.products$ = collectionData(q, { idField: 'id' });
  }

  onFileSelect(event: any) {
    this.selectedFile = event.target.files[0] || null;
  }

  async saveProduct() {
    if (!this.newProduct.name || !this.newProduct.price) {
      this.toastService.show('Please fill in Product Name and Price.', 'error');
      return;
    }
    this.saving = true;
    try {
      // 1. Save product to Firestore FIRST (without image) so the form never hangs
      const coll = collection(this.firestore, 'products');
      const docRef = await addDoc(coll, {
        name: this.newProduct.name,
        category: this.newProduct.category,
        price: Number(this.newProduct.price),
        stock: Number(this.newProduct.stock),
        desc: this.newProduct.desc,
        hasOffer: this.newProduct.hasOffer,
        image: '',
        createdAt: new Date().toISOString()
      });

      this.toastService.show('Product saved! 🌿');
      this.newProduct = { name: '', category: 'Skin Care', price: 0, stock: 0, desc: '', hasOffer: false };
      this.selectedFile = null;
      this.saving = false;
      document.getElementById('closeModal')?.click();

      // 2. Upload image in background AFTER closing the modal (non-blocking)
      if (this.selectedFile) {
        try {
          const storageRef = ref(this.storage, `products/${docRef.id}`);
          const uploadResult = await uploadBytes(storageRef, this.selectedFile!);
          const imageUrl = await getDownloadURL(uploadResult.ref);
          const { updateDoc } = await import('@angular/fire/firestore');
          await updateDoc(doc(this.firestore, `products/${docRef.id}`), { image: imageUrl });
          this.toastService.show('Image uploaded! ☁️');
        } catch {
          this.toastService.show('Product saved but image upload failed. Check Storage rules.', 'info');
        }
      }
    } catch (e: any) {
      this.saving = false;
      this.toastService.show('Error saving product: ' + e.message, 'error');
    }
  }

  async deleteProduct(id: string) {
    if (!confirm('Delete this product?')) return;
    try {
      await deleteDoc(doc(this.firestore, `products/${id}`));
      this.toastService.show('Product deleted.', 'info');
    } catch (e: any) {
      this.toastService.show('Error deleting product.', 'error');
    }
  }
}
