import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LoggedInComponent } from './components/logged-in/logged-in.component';
import { VerifyComponent } from './components/verify/verify.component';
import { LoginComponentModule } from './components/login/login.component-module';
import { RegisterComponentModule } from './components/register/register.component-module';
import { LoggedInComponentModule } from './components/logged-in/logged-in.component-module';
import { VerifyComponentModule } from './components/verify/verify.component-module';
import { HasEmailVerifiedGuard } from './guards/has-email-verified.guard';
import { HasTokenGuard } from './guards/has-token.guard';
import { CompleteProfileComponent } from './components/complete-profile/complete-profile.component';
import { CompleteProfileComponentModule } from './components/complete-profile/complete-profile.component-module';
import { HasNameGuard } from './guards/has-name.guard';

@NgModule({
  imports: [RouterModule.forRoot([
    { path: 'login', component: LoginComponent }, 
    { path: 'register', component: RegisterComponent }, 
    { 
    path: 'logged-in', 
    component: LoggedInComponent, 
    canActivate: [HasTokenGuard, HasEmailVerifiedGuard, HasNameGuard],
    data:{
      redirectUrl: 'verify',
      verified: true,
      redirectUrlToLogin: 'login',
      urlHasNoName: 'complete-profile'
    } 
  }, 
    { 
      path: 'verify', 
      component: VerifyComponent,
      canActivate: [HasTokenGuard],
      data:{
        redirectUrl: 'logged-in',
        verified: false,
        redirectUrlToLogin: 'login'
      } 
    },
    { path: 'complete-profile', component: CompleteProfileComponent }
  ]),
     LoginComponentModule, 
     RegisterComponentModule, 
     LoggedInComponentModule, 
     VerifyComponentModule,
     CompleteProfileComponentModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
