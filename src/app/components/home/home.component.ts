import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: Product[] = [];

  constructor(private productService: ProductService,
              private router: Router,
              private title: Title,
              private meta: Meta) { }

  ngOnInit(): void {
    this.listProducts();
    this.metaTags();
  }

  doSearch(value: string) {
    this.router.navigateByUrl(`/search/${value}`);
  }

  listProducts() {
    this.productService.get10ProductsByDate().subscribe(
      data => {
        this.products = data.filter(product => product.archive === false)
                            .slice(0, 4);
      }
    )
  }

  metaTags() {
    this.title.setTitle(`Gift Shop Bjelovar - DadoExpres`);

    this.meta.updateTag({ name: 'title', content: 'Gift Shop Bjelovar - DadoExpres'});
    this.meta.updateTag({ name: 'description', content: 'Suveniri, noževi, upaljači, sublimacija na keramičke šalice, elektronske cigarete, satovi i razni pokloni!'});
    this.meta.updateTag({ name: 'author', content: 'Dado Expres'});
    this.meta.updateTag({ name: 'robots', content: 'index, follow'});

    this.meta.updateTag({ name: 'twitter:card', content: 'summary'});
    this.meta.updateTag({ name: 'og:title', content: 'Gift Shop Bjelovar - DadoExpres'});
    this.meta.updateTag({ name: 'og:type', content: 'website'}); //business.business
    this.meta.updateTag({ name: 'og:url', content: 'http://giftshopbjelovar.com/home'});
    this.meta.updateTag({ name: 'og:image', content: 'https://ucarecdn.com/265bf75e-f2c9-4a8d-8039-8da09c8f8015/'});
    this.meta.updateTag({ name: 'og:description', content: 'Suveniri, noževi, upaljači, sublimacija na keramičke šalice, elektronske cigarete, satovi i razni pokloni!'});
  }
}
