import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product-category',
  templateUrl: './edit-product-category.component.html',
  styleUrls: ['./edit-product-category.component.scss']
})
export class EditProductCategoryComponent implements OnInit {

  categoryForm : FormGroup;
  category : ProductCategory = new ProductCategory();
  currentCategoryId: number = null;
  message: string = null;

  constructor(private formBuilder: FormBuilder,
              private productService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.categoryForm = this.formBuilder.group( {
      'name': new FormControl('', [Validators.required, Validators.minLength(2)])
    });

    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('idCat');
    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('idCat');
      
      this.productService.getProductCategory(this.currentCategoryId).subscribe(
        (data) => {
          this.categoryForm.controls['name'].setValue(`${data.categoryName}`);
        });
    }
  }

  onSubmit() {
    this.category.id = this.currentCategoryId;
    this.category.categoryName = this.categoryForm.value.name;
    this.message = "Uspješeno spremljeno";

    this.productService.updateProductCategory(this.category)
      .subscribe(res => {

        console.log(res);
      });
  }
}
