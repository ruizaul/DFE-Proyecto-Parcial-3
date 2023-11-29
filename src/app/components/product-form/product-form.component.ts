import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
})
export class ProductFormComponent implements OnInit, OnDestroy {
  @Input() product: Product | undefined;
  @Output() dataUpdated = new EventEmitter();
  productForm: FormGroup;

  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      cost: [0, [Validators.required, Validators.min(0)]],
      quantitySold: [0, [Validators.required, Validators.min(0)]],
      price: [0, [Validators.required, Validators.min(0)]],
    });

    if (this.product) {
      this.productForm.patchValue(this.product);
    }
  }

  ngOnInit() {
    this.productService.products$
      .pipe(takeUntil(this.destroy$))
      .subscribe((products) => {
        // Find the matching product in the updated products array
        const updatedProduct = products.find((p) => p.id === this.product?.id);

        if (updatedProduct) {
          this.product = updatedProduct;
          this.productForm.patchValue(updatedProduct);
        }
      });
  }

  onSubmit() {
    if (this.productForm.valid) {
      const formData = this.productForm.value;

      if (this.product && this.product.id) {
        const updatedProduct: Product = { ...this.product, ...formData };
        this.productService.updateProduct(updatedProduct).subscribe(
          () => {
            console.log('Producto actualizado:', updatedProduct);
            this.productService.notifyDataChanged(); // Notify other components
            this.emitDataUpdated();
          },
          (error: any) => {
            console.error('Error al actualizar el producto:', error);
          }
        );
      } else {
        const newProduct: Product = {
          ...formData,
          createdAt: new Date().toISOString(),
        };
        this.productService.createProduct(newProduct).subscribe(
          () => {
            console.log('Producto creado:', newProduct);
            this.productService.notifyDataChanged(); // Notify other components
            this.emitDataUpdated();
          },
          (error: any) => {
            console.error('Error al crear el producto:', error);
          }
        );
      }
    } else {
      console.log('Formulario no válido');
    }
  }

  private emitDataUpdated() {
    this.dataUpdated.emit();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
