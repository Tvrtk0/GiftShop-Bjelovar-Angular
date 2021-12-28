import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-create-product-category',
  templateUrl: './create-product-category.component.html',
  styleUrls: ['./create-product-category.component.scss']
})
export class CreateProductCategoryComponent implements OnInit {

  categoryForm : FormGroup;
  category : ProductCategory = new ProductCategory();

  constructor(private formBuilder: FormBuilder,
              private productService: ProductService) { }

  ngOnInit(): void {

    this.categoryForm = this.formBuilder.group( {
      'name': new FormControl('', [Validators.required, Validators.minLength(2)])
    });

  }

  onSubmit() {
    console.log(this.categoryForm.value.name);
    this.category.id = null;
    this.category.categoryName = this.categoryForm.value.name;

    this.productService.addProductCategory(this.category)
      .subscribe((res => {
        console.log(res);
      }));
  }
}