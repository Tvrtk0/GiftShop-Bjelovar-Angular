import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent implements OnInit {

  products: Product[] = []; 
  currentCategoryId: number = 1;
  currentCategory: ProductCategory = new(ProductCategory);

  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getProductCategory();

    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  getProductCategory() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('idCat');

    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('idCat');
    }

    this.productService.getProductCategory(this.currentCategoryId).subscribe(
      data => {
        this.currentCategory = data;
      }
    );
  }

  listProducts() {
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    )
  }

  deleteProduct(productId: number, productName: string, index: number) {
    if (confirm("Delete - ''" + productName.toUpperCase() + "''")) {
      console.log("delete: " + productId);
      this.productService.deleteProduct(productId).subscribe();
      this.products.splice(index, 1);
    }
  }

}
