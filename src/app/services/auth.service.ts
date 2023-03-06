import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CurrentUserDataQueryModel } from '../query-models/current-user-data.query-model';
import { StorageService } from './storage.service';
import { UserCredentialsModel } from '../models/user-credentials.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  
  private _isUserEmailVerifiedSubject: BehaviorSubject<boolean | null> = new BehaviorSubject<boolean | null>(
    ( (localStorage.getItem('emailVerified')) === 'true'
    )
    
    );
  public IsUserEmailVerified$: Observable<boolean | null> = this._isUserEmailVerifiedSubject.asObservable().pipe(tap((data) => console.log(data)));

  private _userAccessTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(localStorage.getItem('accessToken'));
  public userAccessToken$: Observable<string | null> = this._userAccessTokenSubject.asObservable();

  constructor(private _httpClient: HttpClient, private _storage: StorageService) {
  }

  register(newUserEmail: string, newUserPassword: string): Observable<any> {
    return this._httpClient.post<any>('https://us-central1-courses-auth.cloudfunctions.net/auth/register2', { data: { email: newUserEmail, password: newUserPassword } });
  }

  login(userEmail: string, userPassword: string): Observable<any> {
    return this._httpClient.post<any>('https://us-central1-courses-auth.cloudfunctions.net/auth/login', { data: { email: userEmail, password: userPassword } }).pipe(
      map((userCredentials) => ({
        accessToken: userCredentials.data.accessToken,
        emailVerified: userCredentials.data.emailVerified
      })),
      tap((mappedUserCredentials) => this.saveDataToLocalStorage(mappedUserCredentials)),
      tap((mappedUserCredentials) => this.saveDataInBehaviorSubject(mappedUserCredentials))
    );
  }

  saveDataToLocalStorage(userCredentials: UserCredentialsModel): void {
    this._storage.saveData('accessToken', userCredentials.accessToken)
    this._storage.saveData('emailVerified', (userCredentials.emailVerified).toString())
  }
  saveDataInBehaviorSubject(userCredentials: UserCredentialsModel): void {
    this._isUserEmailVerifiedSubject.next(userCredentials.emailVerified);
    this._userAccessTokenSubject.next(userCredentials.accessToken);
  }

}
