import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-logged-in',
  templateUrl: './logged-in.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoggedInComponent {
  readonly isUserEmailVerified$: Observable<boolean | null> = this._authService.IsUserEmailVerified$.pipe(tap((data) => console.log(data)));
  readonly userAccessToken$: Observable<string | null> = this._authService.userAccessToken$
  constructor(private _authService: AuthService) {
  }

  logout(): void{
    this._authService.logout();
  }
}
