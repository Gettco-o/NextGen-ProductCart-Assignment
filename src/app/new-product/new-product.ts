import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormArray, FormGroup } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { productService } from '../services/product';
import { Router } from '@angular/router';
import { StateService } from '../services/state-service';

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

  productForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    price: [0, [Validators.required, Validators.min(50)]],
    category: ['', Validators.required],
    imageUrl: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+\.(png|jpg|jpeg|gif|svg|webp)(\?.*)?$/i)]],
    inStock: [true],
    rating: [0, Validators.required],
    properties: this.fb.array([
      this.createProperty()
    ])
  });

  createProperty(): FormGroup {
    return this.fb.group({
      color: ['', Validators.required],
      weight: ['', Validators.required]
    });
  }

  get properties(): FormArray {
    return this.productForm.get('properties') as FormArray;
  }

  addProperty() {
    this.properties.push(this.createProperty());
  }

  removeProperty(index: number) {
    this.properties.removeAt(index);
  }

  submitForm() {
    this.prodService.createProduct(this.productForm.value).subscribe({
      next: (res) => {
        alert('Product created successfully!');
        this.state.addProduct(res);
        this.productForm.reset();
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
