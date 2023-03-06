import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class CompletingAProfileService {
  constructor(private _httpClient: HttpClient, private _storage: StorageService) {
  }

  postNameOfTheUser(userFirstName: string, userLastName: string): Observable<any> {
    return this._httpClient.post('https://us-central1-courses-auth.cloudfunctions.net/auth/complete-profile', { data: { firstName: userFirstName, lastName: userLastName }}) 
  }
}
