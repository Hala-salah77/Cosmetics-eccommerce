import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit, OnDestroy {
  targetDate = new Date();
  days: string = '00';
  hours: string = '00';
  minutes: string = '00';
  seconds: string = '00';
  private timer: any;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    this.targetDate.setDate(this.targetDate.getDate() + 3);
    if (this.isBrowser) {
      this.updateTimer();
      this.timer = setInterval(() => this.updateTimer(), 1000);
    }
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  updateTimer() {
    const now = new Date().getTime();
    const distance = this.targetDate.getTime() - now;

    if (distance < 0) {
      clearInterval(this.timer);
      return;
    }

    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);

    this.days = d < 10 ? '0' + d : d.toString();
    this.hours = h < 10 ? '0' + h : h.toString();
    this.minutes = m < 10 ? '0' + m : m.toString();
    this.seconds = s < 10 ? '0' + s : s.toString();
  }
}
