import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ModalModule, ModalDirective } from 'ng2-bootstrap/modal';
import { NotificationService } from '../shared/common-service/notification.service';
import { AlertService } from '../shared/common-service/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalEventsManager } from '../globalEventManager';
import { User } from '../shared/model/user';
import { FirebaseAuthentication } from "../shared/firebase/firebaseAuthentication"
import {Observable} from "rxjs/Rx";
import { GlobalValidator } from "../shared/validators/mail-validator";
import { TranslateService } from '../../translate/translate.service';


/**
 * 
 * Class to responsible for handling login component logic
 * @export
 * @class CrudLoginComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'app-crud-login',
    templateUrl: './crud-login.component.html',
    styleUrls: ['./crud-login.component.css']
})
export class CrudLoginComponent implements OnInit {
  
    isAuthenticated: boolean;
    form: FormGroup;
    user: User = new User();
    menuBarSetting: any[];
    
    
    /**
     * Creates an instance of CrudLoginComponent.
     * 
     * @param {FormBuilder} fb
     * @param {Router} router
     * @param {NotificationService} _notificationService
     * @param {GlobalEventsManager} _globalEventsManager
     * @param {FirebaseAuthentication} _firebaseAuthentication
     * 
     * @memberOf CrudLoginComponent
     */
    constructor( private fb: FormBuilder,
                 private router: Router,
                 private _notificationService: NotificationService,
                 private _globalEventsManager: GlobalEventsManager,
                 private _firebaseAuthentication: FirebaseAuthentication,
                 private _translate: TranslateService
        ) {
        this.form = fb.group({
            name: ['', [
               Validators.compose([Validators.required, GlobalValidator.mailFormat])
            ]],
            password: ['', [
               Validators.compose([Validators.required,  Validators.minLength(6), Validators.maxLength(10)])
            ]]
        });
         
        this._globalEventsManager.showNavBar.emit([false,""]);
    }

    ngOnInit() {};
    
    /**
     * function to login with google popup
     */
    loginWithGoogle() {
      this._firebaseAuthentication.loginWithGoogle().subscribe(
        (data) => this.afterLoginResponce(data),
        (err) => this._notificationService.popToastError("Error", err)
      );

    }
    
    /**
     * function to login with email and password
     * @param  {} event
     * @param  {} email
     * @param  {} password
     */
    loginWithEmail(event, email, password) {
       event.preventDefault();
       this._firebaseAuthentication.loginWithEmail(email, password).subscribe(
        (data) => this.afterLoginResponce(data),
        (err) => this._notificationService.popToastError("Error", err)
      );

    }

    /**
     * function to navigate to registrtion component
     */
    navigateToRegistration() {
      this.router.navigate(['/registration']);
    }

    /**
     * function to process login responce data 
     * @param  {any} data
     */
    afterLoginResponce(data: any) {
      this._globalEventsManager.showNavBar.emit([true,"Rahul"]);
      this._firebaseAuthentication.addUserInfo();
      this._notificationService.popToastSuccess(this._translate.instant('Welcome'),this._translate.instant('User has authenticated to use this site'));
      this.router.navigate(['/home']);
    }

    /**
     * function to save sign up user
     * @param  {string} userName
     * @param  {string} password
     */
    save(userName: string, password: string) {
      var result = JSON.stringify(this.form.value);
      this.isAuthenticated ? this._notificationService.popToastSuccess(this._translate.instant('Welcome'), this._translate.instant('User has authenticated to use this site')) :
      this._notificationService.popToastError(this._translate.instant('Error'), this._translate.instant('Username or password is not valid'));
      this.router.navigate(['/home']);
    }

    /**
     * function to logout from application
     */
    logOut() {
      this._firebaseAuthentication.logout();
      this.router.navigate(['/login']);
    }
}

