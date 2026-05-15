import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  public cartItems$ = this.cartItems.asObservable();
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.loadCart();
  }

  private loadCart() {
    if (this.isBrowser) {
      const saved = localStorage.getItem('ghambola_cart');
      if (saved) {
        try {
          this.cartItems.next(JSON.parse(saved));
        } catch (e) { }
      }
    }
  }

  private saveCart(items: CartItem[]) {
    this.cartItems.next(items);
    if (this.isBrowser) {
      localStorage.setItem('ghambola_cart', JSON.stringify(items));
    }
  }

  addToCart(product: any, quantity: number = 1) {
    const items = [...this.cartItems.value];
    const existingIndex = items.findIndex(i => i.id === product.id);

    if (existingIndex > -1) {
      items[existingIndex].quantity += quantity;
    } else {
      items.push({
        id: product.id,
        name: product.name || 'GHAMBOLA Product',
        price: product.price || 35.00,
        quantity: quantity,
        imageUrl: product.imageUrl || ''
      });
    }

    this.saveCart(items);
  }

  removeFromCart(productId: string) {
    const items = this.cartItems.value.filter(i => i.id !== productId);
    this.saveCart(items);
  }

  clearCart() {
    this.saveCart([]);
  }
}
