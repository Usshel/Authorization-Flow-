import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

  constructor(private _authService: AuthService, private _storage: StorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accessToken = this._storage.getData('accessToken')

    const updatedRequest: HttpRequest<any> = request.clone({setHeaders: {Authorization: `Bearer ${accessToken}`}})
    updatedRequest.headers.set('Authorization', `Bearer ${accessToken}`)
    return next.handle(updatedRequest);
  }
}
