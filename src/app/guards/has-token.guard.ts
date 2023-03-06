import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HasTokenGuard implements CanActivate {
  readonly userAccessToken$: Observable<string | null> = this._authService.userAccessToken$;

  constructor(private _authService: AuthService, private _router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userAccessToken$.pipe(
      map((accessToken) => 
      {
        return accessToken
        ? true
        : this._router.parseUrl(route.data['redirectUrlToLogin'])
      })
    )
  }

}
