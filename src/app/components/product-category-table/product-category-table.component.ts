import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-category-table',
  templateUrl: './product-category-table.component.html',
  styleUrls: ['./product-category-table.component.scss']
})
export class ProductCategoryTableComponent implements OnInit {

  productCategories: ProductCategory[];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.listProductCategories();
  }

  listProductCategories() {
    this.productService.getProductCategories().subscribe(
      data => {
        this.productCategories = data;
      }
    );
  }

  deleteCategory(categoryId: number, categoryName: string, index: number) {
    if (confirm("Delete: " + categoryName.toUpperCase())) {
      console.log("delete: " + categoryId);
      this.productService.deleteProductCategory(categoryId).subscribe();
      this.productCategories.splice(index, 1);
    }
  }
}
