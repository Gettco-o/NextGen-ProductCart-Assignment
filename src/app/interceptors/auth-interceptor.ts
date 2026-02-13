import { HttpInterceptorFn } from '@angular/common/http';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const userEmail = localStorage.getItem('userEmail');
  if (userEmail && req.url.includes('/products')) {
    const clonedReq = req.clone({
      setHeaders: {
        'X-User-Email': userEmail
      }
    });
    return next(clonedReq);
  }
  return next(req);
};
