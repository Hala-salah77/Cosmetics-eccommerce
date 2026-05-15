import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Firestore, collection, collectionData, doc, updateDoc } from '@angular/fire/firestore';
import { isPlatformBrowser } from '@angular/common';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private isBrowser: boolean;

  constructor(private firestore: Firestore, @Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  getOrders(): Observable<any[]> {
    if (!this.isBrowser) return of([]);
    const coll = collection(this.firestore, 'orders');
    return collectionData(coll, { idField: 'id' });
  }

  async updateOrderStatus(orderId: string, status: string) {
    if (!this.isBrowser) return;
    const orderDoc = doc(this.firestore, `orders/${orderId}`);
    return updateDoc(orderDoc, { status });
  }
}
