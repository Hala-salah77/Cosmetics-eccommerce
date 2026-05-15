import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { TranslationService } from '../../services/translation.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  productId: string | null = null;
  product: any = null;
  quantity: number = 1;
  activeImage: string = '';

  constructor(private route: ActivatedRoute, private cartService: CartService, private router: Router, public tr: TranslationService, private productService: ProductService) {}

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');
    const items = this.productService.getStaticProducts();
    if (this.productId) {
      this.product = items.find(i => i.id.toString() === this.productId) || items[0];
    } else {
      this.product = items[0];
    }
    if (this.product) {
      this.activeImage = this.product.image;
    }
  }

  setActiveImage(imgUrl: string) {
    this.activeImage = imgUrl;
  }

  increaseQty() {
    if (this.quantity < 10) this.quantity++;
  }

  decreaseQty() {
    if (this.quantity > 1) this.quantity--;
  }

  addToCart() {
    if (this.product) {
      this.cartService.addToCart({
        id: `prod-${this.product.id}`,
        name: this.product.name,
        price: this.product.price,
        image: this.product.image
      }, this.quantity);
    }
    this.router.navigate(['/cart']);
  }
}
