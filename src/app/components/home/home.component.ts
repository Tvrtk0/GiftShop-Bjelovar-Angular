import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: Product[] = [];

  constructor(private productService: ProductService,
              private router: Router) { }

  ngOnInit(): void {
    this.listProducts();
  }

  doSearch(value: string) {
    this.router.navigateByUrl(`/search/${value}`);
  }

  listProducts() {
    this.productService.getProductsByDate().subscribe(
      data => {
        this.products = data;
      }
    )
  }

}
