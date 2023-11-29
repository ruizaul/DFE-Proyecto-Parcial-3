import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
})
export class ProductsTableComponent implements OnChanges {
  @Input() products: Product[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Products changed:', this.products);
  }
}
