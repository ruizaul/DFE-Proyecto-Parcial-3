import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, switchMap } from 'rxjs';
import { Product } from 'src/app/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://655ff71f83aba11d99d006b4.mockapi.io/api/products';
  private productsSubject = new BehaviorSubject<Product[]>([]);

  products$ = this.productsSubject.asObservable();

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  createProduct(product: Product): any {
    return this.http
      .post<Product>(this.apiUrl, product)
      .pipe(
        // Después de agregar un nuevo producto, actualiza la lista de productos
        switchMap(() => this.getProducts())
      )
      .subscribe(
        (products: Product[]) => {
          this.productsSubject.next(products);
        },
        (error: any) => {
          console.error('Error fetching products after creating:', error);
        }
      );
  }

  getTotalTitles(products: Product[]): number {
    return products.length;
  }

  getTotalSales(products: Product[]): number {
    return products.reduce((total, product) => total + product.cost, 0);
  }

  getTotalCopiesSold(products: Product[]): number {
    return products.reduce((total, product) => total + product.quantitySold, 0);
  }

  // Nuevo método para obtener las ganancias totales
  getTotalProfits(products: Product[]): number {
    return products.reduce(
      (total, product) =>
        total + (product.price - product.cost) * product.quantitySold,
      0
    );
  }

  updateProduct(product: Product): any {
    const url = `${this.apiUrl}/${product.id}`;
    return this.http
      .put<Product>(url, product)
      .pipe(
        // Después de actualizar un producto, actualiza la lista de productos
        switchMap(() => this.getProducts())
      )
      .subscribe(
        (products: Product[]) => {
          this.productsSubject.next(products);
        },
        (error: any) => {
          console.error('Error fetching products after updating:', error);
        }
      );
  }

  notifyDataChanged() {
    this.getProducts().subscribe((products) => {
      this.productsSubject.next(products);
    });
  }

  // Observable for components to subscribe to changes
  onDataChanged(): Observable<Product[]> {
    return this.productsSubject.asObservable();
  }
}
