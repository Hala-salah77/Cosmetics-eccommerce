import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ToastService } from '../../services/toast.service';
import { TranslationService } from '../../services/translation.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  items: any[] = [];
  
  // Pagination State
  currentPage: number = 1;
  itemsPerPage: number = 6;
  Math = Math;

  constructor(private route: ActivatedRoute, private cartService: CartService, private toastService: ToastService, public tr: TranslationService, private productService: ProductService) { }

  ngOnInit() {
    this.items = this.productService.getStaticProducts();
    // Replicate list to have enough items to test pagination
    if (this.items.length < 12) {
        this.items = [...this.items, ...this.items, ...this.items].map((item, index) => ({...item, id: item.id + index * 100}));
    }
    
    this.route.queryParams.subscribe(params => {
      // Logic to filter by category if parameter present
      this.currentPage = 1; // reset page on filter
    });
  }

  // Pagination Getters
  get totalPages(): number {
    return Math.ceil(this.items.length / this.itemsPerPage);
  }

  get paginatedItems(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.items.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get pagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  // Pagination Controls
  goToPage(event: Event, page: number) {
    event.preventDefault();
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  nextPage(event: Event) {
    this.goToPage(event, this.currentPage + 1);
  }

  prevPage(event: Event) {
    this.goToPage(event, this.currentPage - 1);
  }

  addToCart(event: Event, item: any) {
    event.stopPropagation();
    this.cartService.addToCart(item);
    this.toastService.show(this.tr.t('products.quickAdd') + ' ✅');
  }

  trackByFn(index: number, item: any): any {
    return item.id;
  }
}
