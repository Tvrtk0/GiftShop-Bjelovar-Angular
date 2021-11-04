import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})

export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  pageNumber: number = 1;
  pageSize: number = 9;
  totalElements: number = 0;

  previousKeyword: string = null;

  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  
  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    }
    else {
      this.handleListProducts();
    }
  }


  // assign results from getProductList Observable to the products array
  handleListProducts() {
    // check if "id" parametar is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    // get "id" and convert it to nmbr
    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    }
    else {
      this.currentCategoryId = 1;
    }

    // check if we have a different category than previous
    if (this.previousCategoryId != this.currentCategoryId) {
      this.pageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;


    this.productService.getProductListPaginate(
      this.pageNumber - 1,
      this.pageSize,
      this.currentCategoryId
    ).subscribe(this.processResult());
  }

  // spring pages start with 0, angular with 1
  // class properties = data from REST JSON
  processResult() {
    return data => {
      this.products = data._embedded.products;
      this.pageNumber = data.page.number + 1;
      this.pageSize = data.page.size;
      this.totalElements = data.page.totalElements;
    }
  }

  handleSearchProducts() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword');

    // check if we have a different keyword than previous
    if (this.previousKeyword != theKeyword) {
      this.pageNumber = 1;
    }

    this.previousKeyword = theKeyword;

    // search for products using keyword
    this.productService.searchProductsPaginate(
      this.pageNumber - 1,
      this.pageSize,
      theKeyword
    ).subscribe(this.processResult());
  }
}
