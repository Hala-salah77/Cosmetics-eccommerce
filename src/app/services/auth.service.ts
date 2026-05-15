import { Injectable, Inject, PLATFORM_ID, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, user } from '@angular/fire/auth';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public currentUser$: any;
  private isBrowser: boolean;

  constructor(private auth: Auth, @Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.currentUser$ = user(this.auth);
  }

  async login(email: string, pass: string) {
    if (this.isBrowser) {
      return signInWithEmailAndPassword(this.auth, email, pass);
    }
    return Promise.resolve(null);
  }

  async register(email: string, pass: string) {
    if (this.isBrowser) {
      return createUserWithEmailAndPassword(this.auth, email, pass);
    }
    return Promise.resolve(null);
  }

  async logout() {
    if (this.isBrowser) {
      return signOut(this.auth);
    }
    return Promise.resolve();
  }
}
