import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  readonly login: FormGroup = new FormGroup({
    userEmail: new FormControl(),
    userPassword: new FormControl()
  });

  constructor(private _authService: AuthService, private _router: Router) {
  }

  onLoginSubmitted(login: FormGroup): void {
    this._authService.login(login.value.userEmail, login.value.userPassword).subscribe({
      complete: () => this._router.navigate(['logged-in'])
    })
  }
}
