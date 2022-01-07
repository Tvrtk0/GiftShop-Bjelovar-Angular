import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';

import { Routes, RouterModule, Router } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ContactComponent } from './components/contact/contact.component';

import { LoginComponent } from './components/login/login.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';
import { OktaAuth } from '@okta/okta-auth-js';
import {
  OKTA_CONFIG,
  OktaAuthModule,
  OktaCallbackComponent,
  OktaAuthGuard
} from '@okta/okta-angular';

import myAppConfig from './config/app-config';

import { AdminComponent } from './components/admin/admin.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductTableComponent } from './components/product-table/product-table.component';
import { ProductCategoryTableComponent } from './components/product-category-table/product-category-table.component';
import { CreateProductCategoryComponent } from './components/create-product-category/create-product-category.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { UcWidgetModule } from 'ngx-uploadcare-widget';
import { EditProductCategoryComponent } from './components/edit-product-category/edit-product-category.component';

const oktaConfig = Object.assign({
  onAuthRequired: (oktaAuth, injector) => {
    const router = injector.get(Router);
    
    // Redirect the user to your custom login page
    router.navigate(['/login']);
  }
}, myAppConfig.oidc);

const oktaAuth = new OktaAuth(oktaConfig);

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  
  { 
    path: 'admin', component: AdminComponent, canActivate: [OktaAuthGuard],
    children : [
      { path: '', redirectTo: 'category', pathMatch: 'full'},
      { path: 'category/:idCat/edit', component: EditProductCategoryComponent, canActivateChild: [OktaAuthGuard] },
      { path: 'category/:idCat/products', component: ProductTableComponent, canActivateChild: [OktaAuthGuard] },
      { path: 'product/add', component: CreateProductComponent, canActivateChild: [OktaAuthGuard] },
      { path: 'category/add', component: CreateProductCategoryComponent, canActivateChild: [OktaAuthGuard] },
      { path: 'category', component: ProductCategoryTableComponent, canActivateChild: [OktaAuthGuard] },
    ]
  },
  { path: 'login/callback', component: OktaCallbackComponent },
  { path: 'login', component: LoginComponent },

  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'search/:keyword', component: ProductListComponent },
  { path: 'category/:id', component: ProductListComponent },
  { path: 'category', component: ProductListComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'home', component: HomeComponent },
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
    ContactComponent,
    LoginComponent,
    LoginStatusComponent,
    AdminComponent,
    NavbarComponent,
    ProductTableComponent,
    ProductCategoryTableComponent,
    CreateProductCategoryComponent,
    CreateProductComponent,
    EditProductCategoryComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy', scrollPositionRestoration: 'enabled' }),
    OktaAuthModule,
    ReactiveFormsModule,
    UcWidgetModule
  ],
  providers: [ProductService, { provide: OKTA_CONFIG, useValue: {oktaAuth} }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
