import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  totalTitles: number = 0;
  totalSales: number = 0;
  totalCopiesSold: number = 0;
  totalProfits: number = 0;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      this.totalTitles = this.productService.getTotalTitles(products);
      this.totalSales = this.productService.getTotalSales(products);
      this.totalCopiesSold = this.productService.getTotalCopiesSold(products);
      this.totalProfits = this.productService.getTotalProfits(products);
    });
  }
}
