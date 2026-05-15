import { Injectable, Inject, PLATFORM_ID, inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { isPlatformBrowser } from '@angular/common';
import { Observable, of } from 'rxjs';
import { TranslationService } from './translation.service';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private isBrowser: boolean;
  private tr = inject(TranslationService);

  getStaticProducts() {
    return [
      {
        id: 1,
        name: this.tr.t('featured.productName'),
        price: 45.00,
        bestSeller: true,
        rating: 0,
        image: 'https://res.cloudinary.com/dkbjna5nf/image/upload/v1778751440/Gemini_Generated_Image_wmp0omwmp0omwmp0_vh7tpc.png',
        descImg: 'https://res.cloudinary.com/dkbjna5nf/image/upload/v1778811396/657746411_930368123042365_547619668868903158_n_oz7ipc.jpg'
      },
      {
        id: 2,
        name: this.tr.t('featured.productName'),
        price: 45.00,
        category: 'hair',
        bestSeller: false,
        rating: 0,

        image: 'https://res.cloudinary.com/dkbjna5nf/image/upload/v1778751397/Gemini_Generated_Image_4p28a4p28a4p28a4_fldtcn.png',
        descImg: 'https://res.cloudinary.com/dkbjna5nf/image/upload/v1778811396/677822283_946757381403439_3525022741513052651_n_y19xim.jpg'
      },
      {
        id: 3,
        name: this.tr.t('featured.productName'),
        price: 45.00,
        bestSeller: true,
        category: 'hair',
        rating: 3,
        image: 'https://res.cloudinary.com/dkbjna5nf/image/upload/v1778752113/Gemini_Generated_Image_vrl8spvrl8spvrl8_llbrtw.png',
        descImg: 'https://res.cloudinary.com/dkbjna5nf/image/upload/v1778811396/677822283_946757381403439_3525022741513052651_n_y19xim.jpg'
      },
      {
        id: 4,
        name: this.tr.t('featured.productName'),
        price: 45.00,
        category: 'hair',
        bestSeller: false,
        rating: 0,

        image: 'https://res.cloudinary.com/dkbjna5nf/image/upload/v1778752488/Gemini_Generated_Image_fywheofywheofywh_kcvtcl.png',
      },
      {
        id: 5,
        name: this.tr.t('featured.productName'),
        price: 45.00,
        bestSeller: true,
        rating: 0,

        category: 'hair',
        image: 'https://res.cloudinary.com/dkbjna5nf/image/upload/v1778752157/Gemini_Generated_Image_7bsfni7bsfni7bsf_jnguc4.png',
        descImg: 'https://res.cloudinary.com/dkbjna5nf/image/upload/v1778811396/658694348_934885985923912_8363828394931542175_n_aigevg.jpg'

      },
      {
        id: 6,
        name: this.tr.t('featured.productName'),
        price: 45.00,
        bestSeller: true,
        rating: 5,
        category: 'hair',
        image: 'https://res.cloudinary.com/dkbjna5nf/image/upload/v1778809876/ChatGPT_Image_May_15_2026_04_49_45_AM_ydht8p.png'
      },
      {
        id: 7,
        name: this.tr.t('featured.productName'),
        price: 45.00,
        bestSeller: true,
        category: 'hair',
        rating: 4,
        image: 'https://res.cloudinary.com/dkbjna5nf/image/upload/v1778807107/Gemini_Generated_Image_4lvp0x4lvp0x4lvp_bola1a.png'
      },
      {
        id: 8,
        name: this.tr.t('featured.productName'),
        price: 45.00,
        bestSeller: true,
        rating: 5,
        category: 'hair',
        image: 'https://res.cloudinary.com/dkbjna5nf/image/upload/v1778809876/ChatGPT_Image_May_15_2026_04_50_03_AM_ivs1ae.png'
      },
      {
        id: 9,
        name: this.tr.t('featured.productName'),
        price: 45.00,
        bestSeller: true,
        category: 'hair',
        image: 'https://res.cloudinary.com/dkbjna5nf/image/upload/v1778807430/Gemini_Generated_Image_m0x8jqm0x8jqm0x8_cgeqhm.png'
      },
      {
        id: 10,
        name: this.tr.t('featured.productName'),
        price: 45.00,
        bestSeller: false,
        category: 'hair',
        image: 'https://res.cloudinary.com/dkbjna5nf/image/upload/v1778752267/Gemini_Generated_Image_49xn5w49xn5w49xn_lwbiwh.png'
      },
      {
        id: 11,
        name: this.tr.t('featured.productName'),
        price: 45.00,
        bestSeller: true,
        category: 'hair',

        image: 'https://res.cloudinary.com/dkbjna5nf/image/upload/v1778810703/ChatGPT_Image_May_15_2026_04_59_50_AM_jjveh9.png'
      },
      {
        id: 12,
        name: this.tr.t('featured.productName'),
        price: 45.00,
        bestSeller: false,
        rating: 5,
        category: 'hair',
        image: 'https://res.cloudinary.com/dkbjna5nf/image/upload/v1778810807/ChatGPT_Image_May_15_2026_05_06_28_AM_gbxkoa.png'
      }
    ];
  }

  constructor(
    private firestore: Firestore,
    private storage: Storage,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  getProducts(): Observable<any[]> {
    if (!this.isBrowser) return of([]);
    const coll = collection(this.firestore, 'products');
    return collectionData(coll, { idField: 'id' });
  }

  async addProduct(product: any, imageFile?: File) {
    if (!this.isBrowser) return;

    let imageUrl = '';
    if (imageFile) {
      const storageRef = ref(this.storage, `products/${Date.now()}_${imageFile.name}`);
      const uploadResult = await uploadBytes(storageRef, imageFile);
      imageUrl = await getDownloadURL(uploadResult.ref);
    }

    const coll = collection(this.firestore, 'products');
    return addDoc(coll, { ...product, imageUrl });
  }

  async deleteProduct(productId: string) {
    if (!this.isBrowser) return;
    const docRef = doc(this.firestore, `products/${productId}`);
    return deleteDoc(docRef);
  }
}
