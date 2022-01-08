import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  product : Product = new Product();
  categories : ProductCategory[] = [];
  productForm : FormGroup;
  selectedFile = null;
  imgUrl: any = null;
  imagePath: any;
  message: string;
  currentUuid: any = null;
  currentProductId: number = null;
  currentCategoryId: number = null;

  constructor(private formBuilder: FormBuilder,
              private productService: ProductService,
              private route: ActivatedRoute) { }

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
      'archive': new FormControl(''),
    });

    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('idCat');
    const hasProductId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('idCat');
    }
    
    if (hasProductId) {
      this.currentProductId = +this.route.snapshot.paramMap.get('id');
      this.productService.getProduct(this.currentProductId).subscribe(
        (data) => {   
          this.productForm.controls['productCategory'].setValue(this.currentCategoryId);
          this.productForm.controls['price'].setValue(`${data.price}`);
          this.productForm.controls['name'].setValue(`${data.name}`);
          this.productForm.controls['description'].setValue(`${data.description}`);
          this.productForm.controls['archive'].setValue(data.archive);
          this.imgUrl = data.imageUrl;
        });
    }
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
    //======= if nova slika uploadana
    //this.productService.storeImage(this.currentUuid).subscribe();

    //this.productService.addProduct(this.product, formObject.productCategory).subscribe();
    //======= editProduct
  }

  onUpload(info: any) {
    this.message = info.original_filename;
    this.currentUuid = info.uuid;
    this.imgUrl = info.cdnUrl;
  }
}
