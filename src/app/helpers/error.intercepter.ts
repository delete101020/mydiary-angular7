import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        alert('Wrong email or password');
        this.authService.logout();
        location.reload();
      }
      if (err.status === 403) {
        alert('No permission to do this action');
      }
      if (err.status === 422) {
        alert('Error with validator');
      }
      if (err.status === 500) {
        alert('Serve Error');
      }

      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }
}
