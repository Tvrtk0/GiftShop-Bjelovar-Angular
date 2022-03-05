import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(private title: Title,
    private meta: Meta) { }

  ngOnInit(): void {
    this.metaTags();
  }

  metaTags() {
    this.title.setTitle(`Gift Shop Bjelovar - DadoExpres`);

    this.meta.updateTag({ name: 'title', content: 'Kontakt - Gift Shop Bjelovar | DadoExpres'});
    this.meta.updateTag({ name: 'description', content: 'Lokacija: Ul. Augusta Šenoe 25, 43000, Bjelovar. Suveniri, noževi, upaljači, sublimacija na keramičke šalice, elektronske cigarete, satovi i razni pokloni!'});
    this.meta.updateTag({ name: 'author', content: 'Dado Expres'});
    this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow'});

    this.meta.updateTag({ name: 'twitter:card', content: 'summary'});
    this.meta.updateTag({ name: 'og:title', content: 'Gift Shop Bjelovar - DadoExpres'});
    this.meta.updateTag({ name: 'og:type', content: 'website'}); //business.business
    this.meta.updateTag({ name: 'og:url', content: 'http://giftshopbjelovar.com/home'});
    this.meta.updateTag({ name: 'og:image', content: 'https://ucarecdn.com/265bf75e-f2c9-4a8d-8039-8da09c8f8015/'});
    this.meta.updateTag({ name: 'og:description', content: 'Lokacija: Ul. Augusta Šenoe 25, 43000, Bjelovar. Suveniri, noževi, upaljači, sublimacija na keramičke šalice, elektronske cigarete, satovi i razni pokloni!'});
  
  }
}
