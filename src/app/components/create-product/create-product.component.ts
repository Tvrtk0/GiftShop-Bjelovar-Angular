import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/common/product';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';
import uploadcare from 'uploadcare-widget';

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
  uploadMessage: string;
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
      'productCategory': new FormControl('', [Validators.required]),
      'price': new FormControl('', [Validators.required, Validators.pattern('^(?!-)[0-9]*(\.[0-9]{0,2})?$')]),
      'name': new FormControl('', [Validators.required, Validators.minLength(2)]),
      'description': new FormControl('', [Validators.required, Validators.minLength(10)]),
      'archive': new FormControl(false),
    });
  }

  onSubmit() {
    let formObject = this.productForm.value;
    this.product.id = null;
    this.product.name = formObject.name;
    this.product.price = formObject.price;
    this.product.description = formObject.description;
    this.product.archive = formObject.archive;
    this.product.imageUrl = this.imgUrl;

    // Store current image object -> default is delete after 24h
    this.productService.storeImage(this.currentUuid).subscribe();

    this.productService.addProduct(this.product, formObject.productCategory).subscribe();
    this.uploadMessage = "Proizvod uspješno spremljen.";
  }

  onUpload(info: any) {
    this.message = info.original_filename;
    this.currentUuid = info.uuid;
    this.imgUrl = info.cdnUrl;
  }
}