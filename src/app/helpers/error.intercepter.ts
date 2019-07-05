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
      switch (err.status) {
        case 400: alert('Error during process request data'); break;
        case 401:
          alert('Wrong email or password');
          this.authService.logout();
          location.reload();
          break;
        case 403: alert('No permission to do this action'); break;
        case 422: alert('Error with validators'); break;
        case 500: alert('Server Error'); break;
      }

      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }
}
