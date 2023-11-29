import { NgModule } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { SalesComponent } from './sales.component';
import { ProductsTableComponent } from 'src/app/components/products-table/products-table.component';
import { SearchSummaryComponent } from 'src/app/components/search-summary/search-summary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ProductFormComponent } from 'src/app/components/product-form/product-form.component';

@NgModule({
  declarations: [
    SalesComponent,
    ProductsTableComponent,
    SearchSummaryComponent,
    ProductFormComponent,
  ],
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule, BrowserModule],
  providers: [ProductService],
})
export class SalesModule {}
