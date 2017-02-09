//Angular Core Files 
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router'
import { ToasterModule, ToasterService, ToasterConfig, Toast } from 'angular2-toaster';
import { ModalModule } from 'ng2-bootstrap/modal';
import { Routing } from './app.routing';
import { ConfirmDeactivateGuard } from './shared/security/confirm-deactivate-guard';
import { AngularFireModule } from 'angularfire2/index';
// Application Core File
import { AppComponent } from './app.component';
import { CrudHomeComponent } from './crud-home/crud-home.component';
import { NotificationService } from './shared/common-service/notification.service';
import { CrudLoginComponent } from './crud-login/crud-login.component';
import { LocalStorageModule } from 'angular-2-local-storage';
//import { ConfirmActivateGuard } from './shared/security/confirm-activate-guard';
import { GlobalEventsManager } from './globalEventManager';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { SharedModule } from './shared.module';
import { firebaseConfig, authConfig } from "../environments/firebase.config";
import { FirebaseAuthentication } from "./shared/firebase/firebaseAuthentication";
import { CrudRegistrationComponent } from "./crud-registration/crud-registration.component";
import { CommonService } from "./shared/common-service/common.service";
import {enableProdMode} from '@angular/core';




// enable pro mode 
 enableProdMode();


@NgModule({
  declarations: [
    AppComponent,
    CrudHomeComponent,
    CrudLoginComponent,
    CrudRegistrationComponent,
  ],
  imports: [
    LocalStorageModule.withConfig({ prefix: 'app', storageType: 'localStorage' }),
    BrowserModule,
    SharedModule.forRoot(),
    FormsModule,
    HttpModule,
    ToasterModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig,authConfig),
    Routing
  ],
 
  providers: [
    NotificationService,
    ConfirmDeactivateGuard,
    GlobalEventsManager,
    CommonService,
    [
      { provide: LocationStrategy, useClass: HashLocationStrategy }
    ]
  ],
 
 
  bootstrap: [AppComponent]
})
export class AppModule {}

