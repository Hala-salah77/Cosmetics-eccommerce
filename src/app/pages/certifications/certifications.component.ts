import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './certifications.component.html',
  styleUrls: ['./certifications.component.scss']
})
export class CertificationsComponent implements OnInit {
  certImages = [
    '/prove/490451120_654786070600573_1521425102929130613_n.jpg',
    '/prove/prov2.jpg',
    '/prove/prove3.jpg',
    '/prove/prove4.jpg',
    '/prove/prove5.jpg'
  ];

  selectedImage: string | null = null;

  constructor(
    public tr: TranslationService,
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit() {
    this.titleService.setTitle(this.tr.t('cert.title') + ' | GHAMBOLA');
    this.metaService.updateTag({ name: 'description', content: this.tr.t('cert.desc') });
  }

  openLightbox(img: string) {
    this.selectedImage = img;
  }

  closeLightbox() {
    this.selectedImage = null;
  }
}
