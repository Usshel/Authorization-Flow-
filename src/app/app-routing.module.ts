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

@NgModule({
  imports: [RouterModule.forRoot([
    { path: 'login', component: LoginComponent }, 
    { path: 'register', component: RegisterComponent }, 
    { 
    path: 'logged-in', 
    component: LoggedInComponent, 
    canActivate: [HasEmailVerifiedGuard],
    data:{
      redirectUrl: 'verify',
      verified: true
    } 
  }, 
    { 
      path: 'verify', 
      component: VerifyComponent,
      data:{
        redirectUrl: 'logged-in',
        verified: false
      } 
    }
  ]),
     LoginComponentModule, 
     RegisterComponentModule, 
     LoggedInComponentModule, 
     VerifyComponentModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
