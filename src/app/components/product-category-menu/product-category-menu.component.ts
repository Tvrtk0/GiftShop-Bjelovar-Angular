import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.scss']
})
export class ProductCategoryMenuComponent implements OnInit {

  productCategories: ProductCategory[];
  productForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private productService: ProductService,
              private router: Router) { }

  ngOnInit(): void {
    this.listProductCategories();

    this.productForm = this.formBuilder.group( {
      'productCategory': new FormControl('', [Validators.required])
    });
  }

  listProductCategories() {
    this.productService.getProductCategories().subscribe(
      data => {
        this.productCategories = data.sort(function(a, b) {
          let textA = a.categoryName.toUpperCase();
          let textB = b.categoryName.toUpperCase();
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
      }
    );
  }
  
  navigateTo(value) {
    if (value) {
      this.router.navigate([`/category/${value}`]);
    }
  }
}
