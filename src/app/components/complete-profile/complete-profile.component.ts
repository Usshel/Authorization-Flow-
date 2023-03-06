import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CompletingAProfileService } from '../../services/completing-aprofile.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompleteProfileComponent {
  readonly userName: FormGroup = new FormGroup({ firstName: new FormControl(), lastName: new FormControl() });

  constructor(private _completingAProfileService: CompletingAProfileService, private _storage: StorageService, private _router: Router) {
  }

  onUserNameSubmitted(name: FormGroup): void {
    this._completingAProfileService.postNameOfTheUser(name.value.firstName, name.value.lastName).subscribe({
      error: (err) => console.log(err),
      complete: () => {
        this._storage.saveData('firstName', name.value.firstName),
        this._storage.saveData('lastName', name.value.lastName),
        this._router.navigate(['logged-in'])
      }
    });
  }


}
