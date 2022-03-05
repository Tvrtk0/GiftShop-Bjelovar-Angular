import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product: Product = new Product();
  category : ProductCategory = new ProductCategory();
  productCategoryId: number = null;
  recommendedProducts: Product[] = [];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private title: Title,
    private meta: Meta,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
  }

  handleProductDetails() {
    
    // get id param and convert it to a number
    const theProductId: number = +this.route.snapshot.paramMap.get('id');
    
    this.productService.getCategoryByProductId(theProductId).subscribe(
      res => {
        this.category = res;
      }
    )

    this.productService.getProduct(theProductId).subscribe(
      data => {
        this.product = data;
        this.productService.getCategoryByProductId(+data.id).subscribe(
          data => {
            console.log(data.id);
            this.productCategoryId = +data.id;
            this.productService.getProductList(data.id).subscribe(
              data => {
                this.recommendedProducts = data.filter(p => p.id != this.product.id && p.archive === false).slice(0, 3);
              }
            );
          }
        );
        this.metaTags();
      }
    )
  }
  
  metaTags() {
    this.title.setTitle(`${this.product.name} - Gift Shop Bjelovar`);

    this.meta.updateTag({ name: 'title', content: `${this.product.name} - Gift Shop Bjelovar`});
    this.meta.updateTag({ name: 'description', content: `${this.product.description.slice(0, 200)} ...`});
    this.meta.updateTag({ name: 'author', content: 'Dado Expres'});
    this.meta.updateTag({ name: 'robots', content: 'index, follow'});

    this.meta.updateTag({ name: 'twitter:card', content: 'summary'});
    this.meta.updateTag({ name: 'og:title', content: `${this.product.name} - Gift Shop Bjelovar`});
    this.meta.updateTag({ name: 'og:type', content: 'website'});
    this.meta.updateTag({ name: 'og:url', content: `http://giftshopbjelovar.com/${this.router.url}`});
    this.meta.updateTag({ name: 'og:image', content: `${this.product.imageUrl}`});
    this.meta.updateTag({ name: 'og:description', content: `${this.product.description.slice(0, 200)} ...`});
  }
}
