import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product: Product = new Product();
  productCategoryId: number = null;
  recommendedProducts: Product[] = [];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
    
  }

  handleProductDetails() {
    
    // get id param and convert it to a number
    const theProductId: number = +this.route.snapshot.paramMap.get('id');

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
      }
    )
  }

}
