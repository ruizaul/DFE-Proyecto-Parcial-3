// sales.component.ts
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
})
export class SalesComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  selectedProduct: Product | undefined;

  private destroy$ = new Subject<void>();

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.filteredProducts = data;
      this.selectedProduct = undefined;
    });

    this.productService.products$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.products = data;
        this.filteredProducts = data;
        this.selectedProduct = undefined;
      });
  }

  onSearchChange(searchTerm: string) {
    this.filteredProducts = this.products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  onEditProduct(product: Product) {
    // Asigna el producto seleccionado al formulario de edición
    this.selectedProduct = { ...product };
  }

  onSubmitProduct() {
    if (this.selectedProduct && this.selectedProduct.id) {
      this.productService.updateProduct(this.selectedProduct).subscribe(
        (updatedProduct: any) => {
          const index = this.products.findIndex(
            (p) => p.id === updatedProduct.id
          );
          if (index !== -1) {
            this.products[index] = updatedProduct;
          }
          this.productService.notifyDataChanged();
        },
        (error: any) => {
          console.error('Error al actualizar el producto:', error);
        }
      );
    } else {
      if (this.selectedProduct) {
        this.productService.createProduct(this.selectedProduct).subscribe(
          (newProduct: any) => {
            this.products.push(newProduct);
            this.productService.notifyDataChanged();
          },
          (error: any) => {
            console.error('Error al crear el producto:', error);
          }
        );
      }
    }

    this.selectedProduct = undefined;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
