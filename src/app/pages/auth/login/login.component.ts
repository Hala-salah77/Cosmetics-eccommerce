import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { TranslationService } from '../../../services/translation.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  authService = inject(AuthService);
  tr = inject(TranslationService);
  router = inject(Router);

  email = '';
  password = '';
  errorMessage = '';
  isLoading = false;

  async onSubmit() {
    if (!this.email || !this.password) {
      this.errorMessage = (this.tr.currentLang === 'ar') ? 'يرجى إدخال البريد الإلكتروني وكلمة المرور.' : 'Please enter both email and password.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    try {
      await this.authService.login(this.email, this.password);
      this.isLoading = false;
      this.router.navigate(['/admin/dashboard']);
    } catch (error: any) {
      this.isLoading = false;
      this.errorMessage = (this.tr.currentLang === 'ar') ? 'البريد الإلكتروني أو كلمة المرور غير صحيحة.' : 'Invalid email or password. Please verify your credentials or create a new account.';
    }
  }
}
