import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

export type Lang = 'en' | 'ar';

const translations: Record<Lang, Record<string, string>> = {
  en: {
    // Nav
    'nav.home': 'Home',
    'nav.shop': 'Shop',
    'nav.offers': 'Offers',
    'nav.login': 'Log In',
    'nav.signup': 'Sign Up',
    // Hero
    'hero.title': 'Pure Nature, Beautiful You.',
    'hero.subtitle': 'Discover our premium collection of 100% natural, clean, and organic skin and hair care products designed to nourish your body and soul.',
    'hero.cta.skin': 'Shop Skin Care',
    'hero.cta.hair': 'Shop Hair Care',
    // Categories
    'cat.skin.title': 'Skin Care',
    'cat.skin.desc': 'Glow naturally with our organic serums, cleansers, and moisturizers.',
    'cat.hair.title': 'Hair Care',
    'cat.hair.desc': 'Restore and strengthen your hair with pure oils and extracts.',
    'cat.explore': 'Explore Collection',
    // Featured
    'featured.label': 'Our Best Sellers',
    'featured.title': 'Featured Products',
    'featured.viewAll': 'View All Products',
    'featured.addToCart': 'Add to Cart',
    'featured.skinLabel': 'Skin Care',
    'featured.productName': 'Radiant Glow Serum',
    // Testimonials
    'test.title': 'Loved by our customers',
    'test.subtitle': "Don't just take our word for it.",
    'test.review': '"Absolutely love it! The serum completely transformed my skin routine. It feels so natural and clean."',
    'test.buyer': 'Verified Buyer',
    // Products page
    'products.title': 'All Products',
    'products.sort': 'Sort by:',
    'products.newest': 'Newest Arrivals',
    'products.priceLow': 'Price: Low to High',
    'products.priceHigh': 'Price: High to Low',
    'products.best': 'Best Sellers',
    'products.category': 'Category',
    'products.all': 'All Products',
    'products.skin': 'Skin Care',
    'products.hair': 'Hair Care',
    'products.price': 'Price Range',
    'products.apply': 'Apply Filters',
    'products.quickAdd': 'Quick Add',
    'products.filters': 'Filters',
    'products.clearAll': 'Clear All',
    // Product details
    'details.addToCart': 'Add to Cart',
    'details.description': 'Description',
    'details.ingredients': 'Key Ingredients',
    'details.howTo': 'How to Use',
    'details.shipping': 'Free Shipping over $50',
    'details.returns': '30-Day Returns',
    'details.organic': '100% Organic',
    // Cart
    'cart.title': 'Your Cart',
    'cart.empty': 'Your cart is empty',
    'cart.emptyDesc': "Looks like you haven't added any natural products to your cart yet.",
    'cart.returnShop': 'Return to Shop',
    'cart.product': 'Product',
    'cart.price': 'Price',
    'cart.qty': 'Quantity',
    'cart.total': 'Total',
    'cart.continue': '← Continue Shopping',
    'cart.clear': 'Clear Cart',
    'cart.summary': 'Order Summary',
    'cart.subtotal': 'Subtotal',
    'cart.shipping': 'Shipping',
    'cart.tax': 'Tax (5%)',
    'cart.orderTotal': 'Total',
    'cart.checkout': 'Proceed to Checkout',
    // Auth
    'auth.login.title': 'Log In',
    'auth.login.email': 'Email Address',
    'auth.login.pass': 'Password',
    'auth.login.btn': 'Log In',
    'auth.login.noAccount': "Don't have an account?",
    'auth.login.signup': 'Sign Up',
    'auth.login.tagline': 'Your natural beauty journey starts here.',
    'auth.register.title': 'Create Account',
    'auth.register.name': 'Full Name',
    'auth.register.email': 'Email Address',
    'auth.register.pass': 'Password',
    'auth.register.btn': 'Create Account',
    'auth.register.hasAccount': 'Already have an account?',
    'auth.register.login': 'Log In',
    'auth.register.confirmPass': 'Confirm Password',
    'auth.register.heroTitle': 'Join GHAMBOLA',
    'auth.register.heroDesc': 'Start your journey to healthier skin and hair with our 100% organic, natural products.',
    'auth.register.terms': 'I agree to the Terms of Service and Privacy Policy',
    'auth.login.heroTitle': 'Welcome Back',
    'auth.login.heroDesc': 'Log in to manage your orders, track shipments, and discover new natural products tailored for you.',
    'auth.login.subtitle': 'Enter your credentials to access your account',
    'auth.login.remember': 'Remember me',
    'auth.login.forgot': 'Forgot Password?',
    'auth.login.loading': 'Logging in...',
    'auth.register.loading': 'Creating Account...',
    'auth.back': 'Back to Store',
    // Offers
    'offers.title': 'Exclusive Offers',
    'offers.subtitle': 'Limited time deals on our bestselling natural products.',
    'offers.addToCart': 'Add to Cart',
    'offers.off': 'OFF',
    // Footer
    'footer.desc': 'GHAMBOLA = Safety + Results',
    'footer.desc1': '🌿 100% Natural Skin & Hair Care Products',
    'footer.desc2': '✔️ Stops hair loss | Promotes new hair growth | Moisturizes and brightens',
    'footer.desc3': '🩺 Certified and under medical supervision',
    'footer.quickLinks': 'Quick Links',
    'footer.contact': 'Contact Us',
    'footer.shop': 'Shop',
    'footer.hairCare': 'Hair Care',
    'footer.skinCare': 'Skin Care',
    'footer.specialOffers': 'Special Offers',
    'footer.company': 'Company',
    'footer.aboutUs': 'About Us',
    'footer.journal': 'Journal',
    'footer.testimonials': 'Testimonials',
    'footer.contactUs': 'Contact',
    'footer.newsletter': 'Newsletter',
    'footer.newsletterDesc': 'Subscribe to receive updates, access to exclusive deals, and more.',
    'footer.enterEmail': 'Enter your email',
    'footer.subscribe': 'Subscribe',
    'footer.rights': 'GHAMBOLA. All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.followUs': 'Follow Us',
    'footer.facebook': 'Facebook',
    'footer.instagram': 'Instagram',
    'footer.whatsapp': 'WhatsApp',
    'footer.gmail': 'Gmail',
    'footer.locations': 'Our Branches',
    'footer.branch1': 'Smouha: 1st St. from El Nasr St., Al-Asdeqa Tower, Alexandria',
    'footer.branch2': 'Janaklis: Abu Qir St., Al-Zeraeiyeen Buildings, last shop on the left, Alexandria',
    // Breadcrumb
    'bc.home': 'Home',
    'bc.products': 'Products',
    // SEO
    'seo.default.title': 'GHAMBOLA | Pure Organic Beauty',
    'seo.default.desc': 'Premium organic skin and hair care products made with natural ingredients to nourish your body and soul.',
    'seo.home.title': 'Home',
    'seo.home.desc': 'Discover our premium collection of 100% natural, clean, and organic skin and hair care products.',
    'seo.products.title': 'All Products',
    'seo.products.desc': 'Browse our wide range of organic skincare and haircare products designed for natural wellness.',
    'seo.offers.title': 'Exclusive Offers',
    'seo.offers.desc': 'Grab our limited time deals and exclusive offers on premium organic products.',
    'seo.cart.title': 'Your Cart',
    'seo.cart.desc': 'View and manage the natural beauty items in your shopping cart.',
    'seo.login.title': 'Log In',
    'seo.login.desc': 'Log in to your GHAMBOLA account to manage your orders and favorites.',
    'seo.register.title': 'Sign Up',
    'seo.register.desc': 'Create a GHAMBOLA account to start your journey to healthier skin and hair.',
    'shop.soon': 'Coming soon',
    'cert.badge': 'Official Certificates',
    'cert.title': 'Ministry of Health Certifications',
    'cert.desc': 'We care about your safety and trust. GHAMBOLA Beauty products are certified and approved by the Egyptian Ministry of Health.',
  },
  ar: {
    // Nav
    'nav.home': 'الرئيسية',
    'nav.shop': 'المتجر',
    'nav.offers': 'العروض',
    'nav.login': 'تسجيل الدخول',
    'nav.signup': 'إنشاء حساب',
    // Hero
    'hero.title': 'طبيعة خالصة، جمال أصيل.',
    'hero.subtitle': 'اكتشفي مجموعتنا الفاخرة من منتجات العناية بالبشرة والشعر، 100% طبيعية وعضوية، مصممة لتغذية جسمك وروحك.',
    'hero.cta.skin': 'تسوقي للعناية بالبشرة',
    'hero.cta.hair': 'تسوقي للعناية بالشعر',
    // Categories
    'cat.skin.title': 'العناية بالبشرة',
    'cat.skin.desc': 'أشرقي بشكل طبيعي مع سيروماتنا وغسولاتنا ومرطباتنا العضوية.',
    'cat.hair.title': 'العناية بالشعر',
    'cat.hair.desc': 'استعيدي قوة شعرك وصحته بزيوت ومستخلصات طبيعية خالصة.',
    'cat.explore': 'استكشفي المجموعة',
    // Featured
    'featured.label': 'الأكثر مبيعاً',
    'featured.title': 'منتجات مميزة',
    'featured.viewAll': 'عرض كل المنتجات',
    'featured.addToCart': 'أضف إلى السلة',
    'featured.skinLabel': 'عناية بالبشرة',
    'featured.productName': 'سيروم التألق الإشراقي',
    // Testimonials
    'test.title': 'محبوب من عملائنا',
    'test.subtitle': 'لا تأخذي كلامنا فقط، دعي العملاء يتحدثون.',
    'test.review': '"أحببته جداً! غيّر السيروم روتين عنايتي بالبشرة تماماً. يبدو طبيعياً ونظيفاً للغاية."',
    'test.buyer': 'مشترٍ موثق',
    // Products page
    'products.title': 'جميع المنتجات',
    'products.sort': 'ترتيب:',
    'products.newest': 'الأحدث',
    'products.priceLow': 'السعر: من الأقل للأعلى',
    'products.priceHigh': 'السعر: من الأعلى للأقل',
    'products.best': 'الأكثر مبيعاً',
    'products.category': 'الفئة',
    'products.all': 'جميع المنتجات',
    'products.skin': 'عناية بالبشرة',
    'products.hair': 'عناية بالشعر',
    'products.price': 'نطاق السعر',
    'products.apply': 'تطبيق الفلتر',
    'products.quickAdd': 'أضف بسرعة',
    'products.filters': 'الفلاتر',
    'products.clearAll': 'مسح الكل',
    // Product details
    'details.addToCart': 'أضف إلى السلة',
    'details.description': 'الوصف',
    'details.ingredients': 'المكونات الرئيسية',
    'details.howTo': 'طريقة الاستخدام',
    'details.shipping': 'شحن مجاني لأكثر من 50$',
    'details.returns': 'إرجاع خلال 30 يوم',
    'details.organic': '100% عضوي',
    // Cart
    'cart.title': 'سلة المشتريات',
    'cart.empty': 'سلتك فارغة',
    'cart.emptyDesc': 'يبدو أنك لم تضيفي أي منتجات طبيعية إلى سلتك بعد.',
    'cart.returnShop': 'العودة للمتجر',
    'cart.product': 'المنتج',
    'cart.price': 'السعر',
    'cart.qty': 'الكمية',
    'cart.total': 'الإجمالي',
    'cart.continue': 'متابعة التسوق ←',
    'cart.clear': 'مسح السلة',
    'cart.summary': 'ملخص الطلب',
    'cart.subtotal': 'المجموع الفرعي',
    'cart.shipping': 'الشحن',
    'cart.tax': 'الضريبة (5%)',
    'cart.orderTotal': 'الإجمالي',
    'cart.checkout': 'إتمام الشراء',
    // Auth
    'auth.login.title': 'تسجيل الدخول',
    'auth.login.email': 'البريد الإلكتروني',
    'auth.login.pass': 'كلمة المرور',
    'auth.login.btn': 'دخول',
    'auth.login.noAccount': 'ليس لديك حساب؟',
    'auth.login.signup': 'إنشاء حساب',
    'auth.login.tagline': 'رحلة جمالك الطبيعي تبدأ من هنا.',
    'auth.register.title': 'إنشاء حساب',
    'auth.register.name': 'الاسم الكامل',
    'auth.register.email': 'البريد الإلكتروني',
    'auth.register.pass': 'كلمة المرور',
    'auth.register.btn': 'إنشاء الحساب',
    'auth.register.hasAccount': 'لديك حساب بالفعل؟',
    'auth.register.login': 'تسجيل الدخول',
    'auth.register.confirmPass': 'تأكيد كلمة المرور',
    'auth.register.heroTitle': 'انضمي لعائلة غمبوله بيوتي',
    'auth.register.heroDesc': 'ابدأي رحلتك للحصول على بشرة وشعر صحيين مع منتجاتنا العضوية الطبيعية 100%.',
    'auth.register.terms': 'أوافق على شروط الخدمة وسياسة الخصوصية',
    'auth.login.heroTitle': 'مرحباً بكِ مجدداً',
    'auth.login.heroDesc': 'سجلي الدخول لمتابعة طلباتك واكتشاف أحدث المنتجات الطبيعية المناسبة لكِ.',
    'auth.login.subtitle': 'أدخلي بياناتك للدخول لحسابك',
    'auth.login.remember': 'تذكرني',
    'auth.login.forgot': 'نسيت كلمة المرور؟',
    'auth.login.loading': 'جاري الدخول...',
    'auth.register.loading': 'جاري إنشاء الحساب...',
    'auth.back': 'العودة للمتجر',
    // Offers
    'offers.title': 'عروض حصرية',
    'offers.subtitle': 'صفقات لفترة محدودة على أفضل منتجاتنا الطبيعية.',
    'offers.addToCart': 'أضف إلى السلة',
    'offers.off': 'خصم',
    // Footer
    'footer.desc': 'غمبوله = أمان + نتيجة',
    'footer.desc1': '🌿 منتجات طبيعية 100% للشعر والبشرة',
    'footer.desc2': '✔️ توقف التساقط | تنبت شعر جديد | ترطيب وتفتيح',
    'footer.desc3': '🩺 معتمدة وتحت إشراف طبي',
    'footer.quickLinks': 'روابط سريعة',
    'footer.contact': 'تواصل معنا',
    'footer.shop': 'المتجر',
    'footer.hairCare': 'العناية بالشعر',
    'footer.skinCare': 'العناية بالبشرة',
    'footer.specialOffers': 'عروض خاصة',
    'footer.company': 'الشركة',
    'footer.aboutUs': 'من نحن',
    'footer.journal': 'المجلة',
    'footer.testimonials': 'آراء العملاء',
    'footer.contactUs': 'تواصل معنا',
    'footer.newsletter': 'النشرة الإخبارية',
    'footer.newsletterDesc': 'اشترك لتلقي التحديثات والوصول إلى العروض الحصرية والمزيد.',
    'footer.enterEmail': 'أدخل بريدك الإلكتروني',
    'footer.subscribe': 'اشتراك',
    'footer.rights': 'غمبوله بيوتي. جميع الحقوق محفوظة.',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.terms': 'شروط الخدمة',
    'footer.followUs': 'تابعنا على',
    'footer.facebook': 'فيسبوك',
    'footer.instagram': 'انستجرام',
    'footer.whatsapp': 'واتساب',
    'footer.gmail': 'جيميل',
    'footer.locations': 'فروعنا',
    'footer.branch1': 'سموحة: ش ١ من ش النصر برج الأصدقاء، الإسكندرية',
    'footer.branch2': 'جناكليس: شارع أبو قير عمارات الزراعيين أخر محل على الشمال، الإسكندرية',
    // Breadcrumb
    'bc.home': 'الرئيسية',
    'bc.products': 'المنتجات',
    // SEO
    'seo.default.title': 'غمبوله بيوتي | جمال عضوي نقي',
    'seo.default.desc': 'منتجات عناية بالبشرة والشعر عضوية وفاخرة مصنوعة من مكونات طبيعية لتغذية جسمك وروحك.',
    'seo.home.title': 'الرئيسية',
    'seo.home.desc': 'اكتشفي مجموعتنا الفاخرة من منتجات العناية بالبشرة والشعر الطبيعية والعضوية 100%.',
    'seo.products.title': 'جميع المنتجات',
    'seo.products.desc': 'تصفحي مجموعتنا الواسعة من منتجات العناية بالبشرة والشعر العضوية المصممة للالعافية الطبيعية.',
    'seo.offers.title': 'عروض حصرية',
    'seo.offers.desc': 'احصلي على صفقاتنا لفترة محدودة وعروضنا الحصرية على المنتجات العضوية الفاخرة.',
    'seo.cart.title': 'سلة المشتريات',
    'seo.cart.desc': 'عرض وإدارة منتجات الجمال الطبيعي في سلة التسوق الخاصة بك.',
    'seo.login.title': 'تسجيل الدخول',
    'seo.login.desc': 'سجلي الدخول لحساب غمبوله بيوتي الخاص بك لإدارة طلباتك ومفضلاتك.',
    'seo.register.title': 'إنشاء حساب',
    'seo.register.desc': 'أنشئي حساب غمبوله بيوتي وابدأي رحلتك للحصول على بشرة وشعر أكثر صحة.',
    'shop.soon': 'قريباً',
    'cert.badge': 'وثائق رسمية',
    'cert.title': 'توثيقات وزارة الصحة',
    'cert.desc': 'نهتم بأمانك وثقتك بنا. جميع منتجات غمبوله بيوتي معتمدة ومسجلة رسمياً بوزارة الصحة المصرية.',
  }
};

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private isBrowser: boolean;
  private langSubject: BehaviorSubject<Lang>;
  public lang$;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    const saved = (this.isBrowser && localStorage.getItem('ghambola_lang') as Lang) || 'en';
    this.langSubject = new BehaviorSubject<Lang>(saved);
    this.lang$ = this.langSubject.asObservable();
    this.applyDir(saved);
  }

  get currentLang(): Lang {
    return this.langSubject.value;
  }

  toggle() {
    const next: Lang = this.langSubject.value === 'en' ? 'ar' : 'en';
    this.langSubject.next(next);
    if (this.isBrowser) {
      localStorage.setItem('ghambola_lang', next);
      this.applyDir(next);
    }
  }

  t(key: string): string {
    return translations[this.langSubject.value][key] ?? key;
  }

  private applyDir(lang: Lang) {
    if (!this.isBrowser) return;
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  }
}
