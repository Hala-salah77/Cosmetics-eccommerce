import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { TranslationService } from '../../../services/translation.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  authService = inject(AuthService);
  tr = inject(TranslationService);
  firestore = inject(Firestore);
  router = inject(Router);

  fullName = '';
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';
  isLoading = false;

  async onSubmit() {
    if (!this.email || !this.password || !this.fullName) {
      this.errorMessage = (this.tr.currentLang === 'ar') ? 'يرجى ملء جميع الحقول المطلوبة.' : 'Please fill all required fields.';
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.errorMessage = (this.tr.currentLang === 'ar') ? 'كلمتا المرور غير متطابقتين.' : 'Passwords do not match.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    try {
      const userCredential = await this.authService.register(this.email, this.password);
      if (userCredential && userCredential.user) {
        // Safe check for browser environment since AngularFire handles SSR mostly safe, 
        // but creating a user document immediately.
        const userDoc = doc(this.firestore, `users/${userCredential.user.uid}`);
        await setDoc(userDoc, {
          uid: userCredential.user.uid,
          fullName: this.fullName,
          email: this.email,
          role: 'customer',
          createdAt: new Date().toISOString()
        });
      }
      this.isLoading = false;
      this.router.navigate(['/admin/dashboard']);
    } catch (error: any) {
      this.isLoading = false;
      // Handle Firebase specific error messages
      if (error.code === 'auth/email-already-in-use') {
        this.errorMessage = (this.tr.currentLang === 'ar') ? 'هذا البريد الإلكتروني مسجل مسبقاً. يرجى تسجيل الدخول.' : 'This email is already registered. Please log in.';
      } else if (error.code === 'auth/weak-password') {
        this.errorMessage = (this.tr.currentLang === 'ar') ? 'كلمة المرور ضعيفة جداً. يرجى إدخال 6 أحرف على الأقل.' : 'Password is too weak. Please use at least 6 characters.';
      } else {
        this.errorMessage = (this.tr.currentLang === 'ar') ? 'فشل التسجيل: ' + error.message : 'Registration failed: ' + error.message;
      }
      console.error(error);
    }
  }
}
