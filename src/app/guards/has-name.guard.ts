import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class HasNameGuard implements CanActivate {
  constructor(private _storage: StorageService, private _router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return (this._storage.getData('firstName') !== null && this._storage.getData('lastName') !== null) 
    ? true
    : this._router.parseUrl(route.data['urlHasNoName'])
  }
  
}
