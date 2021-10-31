import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';

import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LocationComponent } from './components/location/location.component';
import { ContactComponent } from './components/contact/contact.component';
import { DeliveryComponent } from './components/delivery/delivery.component';

const routes: Routes = [
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'search/:keyword', component: ProductListComponent },
  { path: 'category/:id', component: ProductListComponent },
  { path: 'category', component: ProductListComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'delivery', component: DeliveryComponent },
  { path: 'location', component: LocationComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '**', redirectTo: '/products', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    HomeComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    SidebarComponent,
    LocationComponent,
    ContactComponent,
    DeliveryComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
