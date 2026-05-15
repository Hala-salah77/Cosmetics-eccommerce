import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ToastService } from '../../services/toast.service';
import { TranslationService } from '../../services/translation.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  tr = inject(TranslationService);
  cartService = inject(CartService);
  toastService = inject(ToastService);

  productService = inject(ProductService);
  items: any[] = this.productService.getStaticProducts();

  get bestSellerItems(): any[] {
    return this.items.filter(item => item.bestSeller);
  }

  addToCart(event: Event, item: any) {
    event.stopPropagation();
    this.cartService.addToCart(item);
    this.toastService.show(this.tr.t('featured.addToCart') + ' ✅');
  }

  testimonialImages = [
    'https://res.cloudinary.com/dkbjna5nf/image/upload/v1778738624/560080780_798177486261430_763738499983468763_n_v19mbf.jpg',
    'https://res.cloudinary.com/dkbjna5nf/image/upload/v1778738623/537635087_754715147274331_8119703444528726278_n_a0d2kr.jpg',
    'https://res.cloudinary.com/dkbjna5nf/image/upload/v1774820958/customer1_ybwygq.jpg',
    'https://res.cloudinary.com/dkbjna5nf/image/upload/v1778738622/537391133_754714567274389_301651753678291631_n_o5yanl.jpg',
    'https://res.cloudinary.com/dkbjna5nf/image/upload/v1774820957/customer4_uehanx.jpg',
    'https://res.cloudinary.com/dkbjna5nf/image/upload/v1778738621/537196671_754715187274327_2138525938828793481_n_a3oaiu.jpg',
    'https://res.cloudinary.com/dkbjna5nf/image/upload/v1774821189/customer8_pyigln.jpg',
    'https://res.cloudinary.com/dkbjna5nf/image/upload/v1778738620/536589167_754715323940980_7349953135206824784_n_letcpx.jpg',
    'https://res.cloudinary.com/dkbjna5nf/image/upload/v1778738620/535613967_754714917274354_7300713787540328265_n_pbnueb.jpg',
    'https://res.cloudinary.com/dkbjna5nf/image/upload/v1778810889/598980067_848539084558603_8583347970723217666_n_ssujnm.jpg',
    'https://res.cloudinary.com/dkbjna5nf/image/upload/v1778811016/538119273_754714667274379_3418612166797203632_n_s9unq8.jpg',
    'https://res.cloudinary.com/dkbjna5nf/image/upload/v1778811121/489382345_648490027896844_3408273359951089686_n_jn2sto.jpg'
  ];

  isLightboxOpen = false;
  activeLightboxIndex = 0;

  get chunkedTestimonials() {
    const chunks = [];
    for (let i = 0; i < this.testimonialImages.length; i += 3) {
      chunks.push({ indexStart: i, images: this.testimonialImages.slice(i, i + 3) });
    }
    return chunks;
  }

  openLightbox(index: number) {
    this.activeLightboxIndex = index;
    this.isLightboxOpen = true;
    if (typeof document !== 'undefined') document.body.style.overflow = 'hidden';
  }

  closeLightbox() {
    this.isLightboxOpen = false;
    if (typeof document !== 'undefined') document.body.style.overflow = '';
  }

  nextLightboxImage(event: Event) {
    event.stopPropagation();
    this.activeLightboxIndex = (this.activeLightboxIndex + 1) % this.testimonialImages.length;
  }

  prevLightboxImage(event: Event) {
    event.stopPropagation();
    this.activeLightboxIndex = (this.activeLightboxIndex - 1 + this.testimonialImages.length) % this.testimonialImages.length;
  }
}
