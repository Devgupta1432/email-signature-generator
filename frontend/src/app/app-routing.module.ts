import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login.component';
import { RegisterComponent } from './components/register.component';
import { DashboardComponent } from './components/dashboard.component';
import { EnhancedHomepageComponent } from './components/enhanced-homepage.component';
import { SignatureEditorComponent } from './components/signature-editor.component';
import { SignatureCreatorComponent } from './components/signature-creator.component';
import { MySignaturesComponent } from './components/my-signatures.component';
import { Temp1Component } from './template/temp1.component';
import { Temp2Component } from './template/temp2.component';
import { Temp3Component } from './template/temp3.component';
import { OAuth2SuccessComponent } from './components/oauth2-success.component';
import { UserProfileComponent } from './components/user-profile.component';
import { AdminDashboardComponent } from './components/admin-dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: '', component: EnhancedHomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'my-signatures', component: MySignaturesComponent, canActivate: [AuthGuard] },
  { path: 'editor', component: SignatureEditorComponent },
  { path: 'signature-creator', component: SignatureCreatorComponent },
  { path: 'temp1', component: Temp1Component },
  { path: 'temp2', component: Temp2Component },
  { path: 'temp3', component: Temp3Component },
  { path: 'oauth2/success', component: OAuth2SuccessComponent },
  { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [AdminGuard] },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }