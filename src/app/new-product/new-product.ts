import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { productService } from '../services/product';
import { Router } from '@angular/router';
import { StateService } from '../services/state-service';
import { CreateProductDto } from '../interfaces/product';

@Component({
  selector: 'app-new-product',
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './new-product.html',
  styleUrl: './new-product.css',
})
export class NewProduct {

  private fb = inject(FormBuilder);
  private prodService = inject(productService);
  private router = inject(Router);
  private state = inject(StateService);

  error$ = this.state.error$;
  categories$ = this.state.categories$;

  productForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    price: [0, [Validators.required, Validators.min(0.01)]],
    stock: [0, [Validators.min(0)]],
    imageUrl: ['', [Validators.pattern(/^https?:\/\/.+/i)]],
    categoryId: ['', [Validators.required]],
  });

  ngOnInit() {
    this.prodService.getAllCategories();
  }

  submitForm() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const { name, description, price, stock, imageUrl, categoryId } =
      this.productForm.getRawValue();

    const payload: CreateProductDto = {
      name: name?.trim() ?? '',
      description: description?.trim() ?? '',
      price: Number(price),
      categoryId: Number(categoryId),
      ...(stock !== null && stock !== undefined
        ? { stock: Number(stock) }
        : {}),
      ...(imageUrl?.trim() ? { imageUrl: imageUrl.trim() } : {}),
    };

    this.prodService.createProduct(payload).subscribe({
      next: (res) => {
        alert('Product created successfully!');
        this.state.addProduct(res);
        this.productForm.reset({
          name: '',
          description: '',
          price: 0,
          stock: 0,
          imageUrl: '',
          categoryId: '',
        });
        this.router.navigate(['']);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  clearError() {
    this.state.setError(null);
  }
  
}
