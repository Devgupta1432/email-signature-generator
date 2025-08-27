import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login.component';
import { RegisterComponent } from './components/register.component';
import { DashboardComponent } from './components/dashboard.component';
import { SignatureEditorComponent } from './components/signature-editor.component';
import { EnhancedHomepageComponent } from './components/enhanced-homepage.component';
import { SignatureCreatorComponent } from './components/signature-creator.component';
import { Temp1Component } from './template/temp1.component';
import { Temp2Component } from './template/temp2.component';
import { Temp3Component } from './template/temp3.component';
import { OAuth2SuccessComponent } from './components/oauth2-success.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AvatarComponent } from './components/template-components/avatar.component';
import { TextBlockComponent } from './components/template-components/text-block.component';
import { SocialIconsComponent } from './components/template-components/social-icons.component';
import { DynamicTemplateComponent } from './components/template-components/dynamic-template.component';
import { AvatarWithTextComponent } from './components/template-components/avatar-with-text.component';
import { MySignaturesComponent } from './components/my-signatures.component';
import { UserProfileComponent } from './components/user-profile.component';
import { AdminDashboardComponent } from './components/admin-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    DashboardComponent,
    EnhancedHomepageComponent,
    Temp1Component,
    Temp2Component,
    Temp3Component,
    OAuth2SuccessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    LoginComponent,
    SignatureCreatorComponent,
    SignatureEditorComponent,
    AvatarComponent,
    TextBlockComponent,
    SocialIconsComponent,
    DynamicTemplateComponent,
    AvatarWithTextComponent,
    MySignaturesComponent,
    UserProfileComponent,
    AdminDashboardComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }