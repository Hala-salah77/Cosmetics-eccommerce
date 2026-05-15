import { Routes } from '@angular/router';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layouts/storefront-layout/storefront-layout.component').then(c => c.StorefrontLayoutComponent),
    children: [
      { path: '', loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent), data: { titleKey: 'seo.home.title', descKey: 'seo.home.desc' } },
      { path: 'products', loadComponent: () => import('./pages/products/products.component').then(c => c.ProductsComponent), data: { titleKey: 'seo.products.title', descKey: 'seo.products.desc' } },
      { path: 'product/:id', loadComponent: () => import('./pages/product-details/product-details.component').then(c => c.ProductDetailsComponent) },
      { path: 'offers', loadComponent: () => import('./pages/offers/offers.component').then(c => c.OffersComponent), data: { titleKey: 'seo.offers.title', descKey: 'seo.offers.desc' } },
      { path: 'cart', loadComponent: () => import('./pages/cart/cart.component').then(c => c.CartComponent), data: { titleKey: 'seo.cart.title', descKey: 'seo.cart.desc' } },
      { path: 'certifications', loadComponent: () => import('./pages/certifications/certifications.component').then(c => c.CertificationsComponent) },
    ]
  },
  {
    path: 'auth',
    children: [
      { path: 'login', loadComponent: () => import('./pages/auth/login/login.component').then(c => c.LoginComponent), data: { titleKey: 'seo.login.title', descKey: 'seo.login.desc' } },
      { path: 'register', loadComponent: () => import('./pages/auth/register/register.component').then(c => c.RegisterComponent), data: { titleKey: 'seo.register.title', descKey: 'seo.register.desc' } }
    ]
  },
  {
    path: 'admin',
    canActivate: [adminGuard],
    loadComponent: () => import('./layouts/admin-layout/admin-layout.component').then(c => c.AdminLayoutComponent),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./admin/dashboard/dashboard.component').then(c => c.DashboardComponent) },
      { path: 'products', loadComponent: () => import('./admin/products-manage/products-manage.component').then(c => c.ProductsManageComponent) },
      { path: 'offers', loadComponent: () => import('./admin/offers-manage/offers-manage.component').then(c => c.OffersManageComponent) },
      { path: 'orders', loadComponent: () => import('./admin/orders-manage/orders-manage.component').then(c => c.OrdersManageComponent) },
      { path: 'users', loadComponent: () => import('./admin/users-manage/users-manage.component').then(c => c.UsersManageComponent) },
    ]
  },
  { path: '**', redirectTo: '' }
];
