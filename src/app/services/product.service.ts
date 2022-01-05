import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../common/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';
  private categoryUrl = 'http://localhost:8080/api/product-category';
  private secretKey = '63c682d0d56c2fe6f352';
  private publicKey = '604a57657e7111712369';

  constructor(private httpClient: HttpClient) { }

  storeImage(uuid: string) {
    const uploadcareUrl = `https://api.uploadcare.com/files/${uuid}/storage/`;

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Uploadcare.Simple ${this.publicKey}:${this.secretKey}`,
        Accept: "application/vnd.uploadcare-v0.5+json"
      })
    }

    return this.httpClient.post(uploadcareUrl, null, httpOptions);
  }

  addProduct(product: Product, categoryId: number) {

    product.category = `${this.categoryUrl}/${categoryId}`;

    return this.httpClient.post<Product>(this.baseUrl, product);
  }

  deleteProduct(id: number) {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.delete(url);
  }

  deleteProductCategory(id: number) {
    const url = `${this.categoryUrl}/${id}`;
    return this.httpClient.delete(url);
  }

  addProductCategory(category : ProductCategory ) {
    return this.httpClient.post<ProductCategory>(this.categoryUrl, category);
  }

  getProductListPaginate( thePage: number, 
                          thePageSize: number, 
                          theCategoryId: number): Observable<GetResponseProducts> {

    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
                    + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  // Maps the JSON data from Spring Data REST to Product array
  getProductList(theCategoryId: number): Observable<Product[]> {

    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.getProducts(searchUrl);
  }

  getProductCategories(): Observable<ProductCategory[]> {
    
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    )
  }

  searchProducts(theKeyword: string): Observable<Product[]> {

    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

    return this.getProducts(searchUrl);
  }

  searchProductsPaginate( thePage: number, 
                          thePageSize: number, 
                          theKeyword: string): Observable<GetResponseProducts> {

    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
                    + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductsByDate(): Observable<Product[]> {

    const searchUrl = `${this.baseUrl}/search/findTop4ByOrderByDateCreatedDesc`;

    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    )
  }

  getProduct(theProductId: number): Observable<Product> {

    // URL based on id
    const productUrl = `${this.baseUrl}/${theProductId}`;

    return this.httpClient.get<Product>(productUrl);
  }

  getProductCategory(theCategoryId: number): Observable<ProductCategory> {

    const productCateroryUrl = `${this.categoryUrl}/${theCategoryId}`;

    return this.httpClient.get<ProductCategory>(productCateroryUrl);
  }

}

// Unwraps the JSON from Spring Data Rest _embedded entry
interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}