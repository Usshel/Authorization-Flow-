import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {
  readonly register: FormGroup = new FormGroup({ newUserEmail: new FormControl(), newUserPassword: new FormControl() });

  constructor(private _authService: AuthService, private _router: Router) {
  }

  onRegisterSubmitted(register: FormGroup): void {
    this._authService.register(register.value.newUserEmail, register.value.newUserPassword).subscribe(
      {
        complete: () => this._router.navigate(['login']),
        error: (error) => console.log(error)
      }
    )
  }
}
