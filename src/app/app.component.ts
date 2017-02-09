import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalEventsManager } from './globalEventManager';
import { initializeApp, database } from "firebase";
import { firebaseConfig } from "../environments/firebase.config"
import {AngularFire, FirebaseRef} from "angularfire2";
import {Observable} from "rxjs/Rx";
import { FirebaseAuthentication } from "./shared/firebase/firebaseAuthentication";
import { AuthInfo } from './shared/security/auth-info';
import { TranslateService } from '../translate/translate.service';


@Component({
  selector: 'app-root',
  template: `



  
<div>
<nav class="navbar navbar-default">
   <div class="navbar-header">
      <toaster-container></toaster-container>
      <a class="navbar-brand" href="javascript:void(0)">{{title}}</a>
   </div>
   <div id="navbar" class="navbar-collapse collapse">
      <ul class="nav navbar-nav">
         <li [routerLinkActive]="['active']" class="myclass" *ngIf="showMenu"><a routerLink="/home">{{'Home' | translate}}</a></li>
         <li [routerLinkActive]="['active']"  class="myclass" *ngIf="showMenu"><a routerLink="/crudEmployee">{{'Employee' | translate}}</a></li>
      </ul>
      <form class="navbar-form navbar-left">
         <div class="btn-group">
            <button *ngFor="let lang of supportedLangs"
            (click)="selectLang(lang.value)"
            class="btn btn-default" [class.btn-primary]="isCurrentLang(lang.value)">
            {{ lang.display }}
            </button>
         </div>
      </form>
      <ul class="nav navbar-nav navbar-right" *ngIf="showMenu">
         <!-- <li><a class="myclass btn">Welcome, {{userName}}</a></li> -->
         <li><a (click) ="logOut()" class="myclass btn"><i class='glyphicon glyphicon-off' title="{{'Log Off' | translate}}"></i>&nbsp;&nbsp;{{'Log Off' | translate}}</a></li>
      </ul>
   </div>
   <!--/.nav-collapse -->
</nav>
<div class='container'>
   <router-outlet></router-outlet>
</div>




   
  `,
  styles: ['.myclass { color: black;font-weight: bold; }']
})


export class AppComponent implements OnInit {

  public isLoggedIn: boolean;
  public isMenuShown: boolean;
  title = 'CRUD ANGULAR 2 APP';
  public showMenu : boolean;
  public translatedText: string;
  public supportedLanguages: any[];
  userName: string= "Rasal Shukla";
  supportedLangs  :any[];

 
  /**
   * Creates an instance of AppComponent.
   *
   * @param {Router} router
   * @param {GlobalEventsManager} _globalEventsManager
   * @param {AngularFire} _angularFire
   * @param {FirebaseAuthentication} _firebaseAuthentication
   *
   * @memberOf AppComponent
   */
  constructor(
               private router: Router,
               private _globalEventsManager: GlobalEventsManager,
               private _angularFire: AngularFire,
               private _firebaseAuthentication: FirebaseAuthentication,
               private _translate: TranslateService
             ) {

       //Code to show hide tab menu
    this._firebaseAuthentication.authInfo$.map(authInfo => authInfo.isLoggedIn()).take(1)
            .do(allowed => {  this.showMenu = allowed ? true : false;});

       this._globalEventsManager.showNavBar.subscribe((mode : any[]) =>{
             this.showMenu =mode[0];
             this.userName = mode[1];
         });

      // This asynchronously checks if our user is logged it and will automatically
      // redirect them to the Login page when the status changes.
      // This is just a small thing that Firebase does that makes it easy to use.

        this._firebaseAuthentication.af.auth.subscribe(
      (auth) => {
        if(auth == null) {
          this.isLoggedIn = false;
          this.router.navigate(['login']);
        }
        else {
          // Set the Display Name and Email so we can attribute messages to them
          if(auth.google) {
            this._firebaseAuthentication.displayName = auth.google.displayName;
            this._firebaseAuthentication.email = auth.google.email;
          }
          else {
            this._firebaseAuthentication.displayName = auth.auth.email;
            this._firebaseAuthentication.email = auth.auth.email;
          }
          this.isLoggedIn = true;
        }
      }
    );
  }

  ngOnInit() {
      // standing data
      this.supportedLangs = [
        { display: 'English', value: 'en-US' },
        { display: 'French', value: 'fr-FR' }
      ];

      this.selectLang('en-US');

    }

      isCurrentLang(lang: string) {
      return lang === this._translate.currentLang;
    }

    selectLang(lang: string) {
      // set default;
      this._translate.use(lang);
      this.refreshText();
    }

    refreshText() {
      this.title = this._translate.instant('Angular 2 crud app');
    }

  /**
   *
   * function to log out from application and redirect to login page
   *
   * @memberOf AppComponent
   */
  logOut() {
    this._firebaseAuthentication.logout();
    this.router.navigate(['/login']);

  }
}

