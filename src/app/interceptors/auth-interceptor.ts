import { HttpInterceptorFn } from '@angular/common/http';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('access_token');
  const isApiRequest = req.url.includes('/api/v1/');

  if (token && isApiRequest) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      }
    });
    return next(clonedReq);
  }
  return next(req);
};
