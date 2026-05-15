import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, OnInit } from '@angular/core';
import { fromEvent, throttleTime, map, distinctUntilChanged, of, Observable } from 'rxjs';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  tr = inject(TranslationService);
  private document = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);
  currentYear = new Date().getFullYear();
  showScrollTop$: Observable<boolean> = of(false);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.showScrollTop$ = fromEvent(window, 'scroll').pipe(
        throttleTime(100),
        map(() => window.scrollY > 400),
        distinctUntilChanged()
      );
    }
  }

  scrollToTop() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }
}
