import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormArray, FormGroup } from '@angular/forms';
import { productService } from '../services/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-product',
  imports: [ReactiveFormsModule],
  templateUrl: './new-product.html',
  styleUrl: './new-product.css',
})
export class NewProduct {

  private fb = inject(FormBuilder);
  private prodService = inject(productService);
  private router = inject(Router);

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
    console.log(this.productForm.value);
    this.prodService.createProduct(this.productForm.value).subscribe({
      next: (res) => {
        alert('Product created successfully!');
        this.productForm.reset();
        this.router.navigate(['']);
      },
      error: (err) => {
        //console.error('Error creating product:', err);
        alert('Failed to create product. Please try again.');
      }
    });
  }
  
}
