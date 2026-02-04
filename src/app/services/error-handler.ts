import { inject, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { StateService } from './state-service';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {

  private state = inject(StateService); 

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Network error: ${error.error.message}`;
    } else {
      errorMessage = this.getServerErrorMessage(error);
    }

    this.state.setError(errorMessage);
    this.state.setLoading(false);

    console.error('HTTP Error:', error);

    return throwError(() => new Error(errorMessage));
  }

  private getServerErrorMessage(error: HttpErrorResponse) {
    if (error.error?.message) {
      return error.error.message;
    }

    switch (error.status) {
      case 400:
        return 'Bad request. Please check the data you provided.';
      case 401:
        return 'Unauthorized. Please log in and try again.';
      case 403:
        return 'Forbidden. You do not have permission to perform this action.';
      case 404:
        return 'Resource not found.';
      case 500:
        return 'Server error. Please try again later.';
      default:
        return `Error ${error.status} 'Please try again.'}`;
    }
  }
}
