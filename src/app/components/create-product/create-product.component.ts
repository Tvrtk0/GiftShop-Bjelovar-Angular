import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/common/product';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';
import uploadcare from 'uploadcare-widget'

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  product : Product = new Product();
  categories : ProductCategory[] = [];
  productForm : FormGroup;
  selectedFile = null;
  imgUrl: any = null;
  imagePath: any;
  message: string;
  currentUuid: any = null;
  widgets = uploadcare.initialize('#my-form');

  constructor(private formBuilder: FormBuilder,
              private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProductCategories().subscribe(
      data => {
        this.categories = data;
      }
    );
    
    this.productForm = this.formBuilder.group( {
      'name': new FormControl('', [Validators.required, Validators.minLength(2)]),
      'productCategory': new FormControl('', [Validators.required]),
      'description': new FormControl('', [Validators.required, Validators.minLength(10)]),
      'price': new FormControl('', [Validators.required, Validators.pattern('^[0-9]*(\.[0-9]{0,2})?$')]),
    });
    // provjerit regex
    //'imageInput' : new FormControl('', [Validators.required])
  }

  onSubmit() {
    this.product.id = null;
    this.product.name = this.productForm.value.name;


    // Store current image object -> default is delete after 24h
    // this.currentUuid

  }

  onUpload(info: any) {
    this.message = info.original_filename;
    this.currentUuid = info.uuid;
    this.imgUrl = info.cdnUrl;
  }

  onChange(file: any) {
    console.log('fired Event "onChange with data:"');
    console.log(file);
  }
}