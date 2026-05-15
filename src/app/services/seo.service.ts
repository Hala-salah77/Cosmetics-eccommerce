import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { TranslationService } from './translation.service';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private tr = inject(TranslationService);

  init() {
    // Listen to routing events
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      filter(route => route.outlet === 'primary'),
      mergeMap(route => route.data)
    ).subscribe((data) => {
      this.updateSeoTags(data);
    });

    // Also update tags when language changes
    this.tr.lang$.subscribe(() => {
      const activeData = this.getActiveRouteData();
      if (activeData) {
        this.updateSeoTags(activeData);
      }
    });
  }

  private getActiveRouteData(): any {
    let route = this.activatedRoute;
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route.snapshot.data;
  }

  private updateSeoTags(data: any) {
    const defaultTitle = 'GHAMBOLA';
    
    // Get translations if keys exist, otherwise fallback
    let pageTitle = this.tr.t('seo.default.title') || defaultTitle;
    let pageDesc = this.tr.t('seo.default.desc') || 'Premium organic skin and hair care products.';

    if (data['titleKey']) {
        const trTitle = this.tr.t(data['titleKey']);
        if (trTitle !== data['titleKey']) {
            pageTitle = trTitle + ' | ' + defaultTitle;
        }
    }

    if (data['descKey']) {
        const trDesc = this.tr.t(data['descKey']);
        if (trDesc !== data['descKey']) {
            pageDesc = trDesc;
        }
    }

    // Set Title
    this.titleService.setTitle(pageTitle);

    // Set Meta Description
    this.metaService.updateTag({ name: 'description', content: pageDesc });
    this.metaService.updateTag({ property: 'og:title', content: pageTitle });
    this.metaService.updateTag({ property: 'og:description', content: pageDesc });
    this.metaService.updateTag({ name: 'twitter:title', content: pageTitle });
    this.metaService.updateTag({ name: 'twitter:description', content: pageDesc });
  }
}
