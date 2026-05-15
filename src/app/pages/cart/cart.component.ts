import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ToastService } from '../../services/toast.service';
import { TranslationService } from '../../services/translation.service';
import { Observable } from 'rxjs';
import { CartItem } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  tr = inject(TranslationService);
  cartService = inject(CartService);
  cartItems$: Observable<CartItem[]> = this.cartService.cartItems$;

  removeItem(id: string) { this.cartService.removeFromCart(id); }
  clearCart() { this.cartService.clearCart(); }
  getSubtotal(items: CartItem[]) { return items.reduce((a, c) => a + c.price * c.quantity, 0); }
  getShipping(items: CartItem[]) { return this.getSubtotal(items) > 50 ? 0 : 10; }
  getTax(items: CartItem[]) { return this.getSubtotal(items) * 0.05; }
  getTotal(items: CartItem[]) { return this.getSubtotal(items) + this.getShipping(items) + this.getTax(items); }
}
