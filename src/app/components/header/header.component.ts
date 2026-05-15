import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { TranslationService } from '../../services/translation.service';
import { ProductService } from '../../services/product.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  cartItemCount$: Observable<number>;

  isSearchOpen = false;
  searchQuery = '';
  isSearching = false;
  searchResults: any[] = [];
  searchTimeout: any;

  constructor(
    public tr: TranslationService, 
    private cartService: CartService,
    private productService: ProductService
  ) {
    this.cartItemCount$ = this.cartService.cartItems$.pipe(
      map(items => items.reduce((acc: number, curr: any) => acc + curr.quantity, 0))
    );
  }

  toggleSearch() {
    this.isSearchOpen = !this.isSearchOpen;
    if (!this.isSearchOpen) {
      this.searchQuery = '';
      this.searchResults = [];
      this.isSearching = false;
    }
  }

  onSearchChange() {
    clearTimeout(this.searchTimeout);
    
    if (!this.searchQuery.trim()) {
      this.searchResults = [];
      this.isSearching = false;
      return;
    }

    this.isSearching = true;
    
    // Simulate API delay
    this.searchTimeout = setTimeout(() => {
      const allProducts = this.productService.getStaticProducts();
      const query = this.searchQuery.toLowerCase();
      this.searchResults = allProducts.filter(p => 
        p.name.toLowerCase().includes(query) || 
        (p.category && p.category.toLowerCase().includes(query))
      );
      this.isSearching = false;
    }, 800); // 800ms to show the skeleton beautifully
  }

  closeSearch() {
    this.isSearchOpen = false;
    this.searchQuery = '';
    this.searchResults = [];
  }
}
