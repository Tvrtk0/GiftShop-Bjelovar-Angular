import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/common/product-category';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  productCategories: ProductCategory[];

  constructor(private title: Title,
              private meta: Meta
  ) { }

  ngOnInit(): void {
    this.metaTags();
  }

  metaTags() {
    this.title.setTitle(`Admin | Gift Shop Bjelovar - DadoExpres`);
    this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow'});
  }
}
