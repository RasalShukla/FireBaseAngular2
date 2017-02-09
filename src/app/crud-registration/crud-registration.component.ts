import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ModalModule, ModalDirective } from 'ng2-bootstrap/modal';
import { NotificationService } from '../shared/common-service/notification.service';
import { AlertService } from '../shared/common-service/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalEventsManager } from '../globalEventManager';
import { User } from '../shared/model/user';
import { FirebaseAuthentication } from "../shared/firebase/firebaseAuthentication";
import { GlobalValidator } from "../shared/validators/mail-validator";
import { TranslateService } from '../../translate/translate.service';

/**
 * 
 * Class to responxible for sign up logic
 * @export
 * @class CrudRegistrationComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'app-crud-registration',
    templateUrl: './crud-registration.component.html',
    styleUrls: ['./crud-registration.component.css']
})
export class CrudRegistrationComponent implements OnInit {
    public error: any;
    isAuthenticated: boolean;
    form: FormGroup;
    user: User = new User();
    
    /**
     * Creates an instance of CrudRegistrationComponent.
     * 
     * @param {FormBuilder} fb
     * @param {Router} router
     * @param {NotificationService} _notificationService
     * @param {GlobalEventsManager} _globalEventsManager
     * @param {FirebaseAuthentication} _firebaseAuthentication
     * 
     * @memberOf CrudRegistrationComponent
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
                Validators.required,
                Validators.minLength(10),
                Validators.maxLength(11)
            ]],
            password: ['', [
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(10)
            ]],
            email:['',[
              Validators.compose([Validators.required, GlobalValidator.mailFormat])
            ]]
        });
        this._globalEventsManager.showNavBar.emit([false,""]);
    }

    ngOnInit() {};

    
     /**
      * function to register new user
      * @param  {} event
      * @param  {} name
      * @param  {} email
      * @param  {} password
      
      */
     register(event, name, email, password) {
       event.preventDefault();
       this._firebaseAuthentication.registerUser(email, password).then((user) => {
           this._firebaseAuthentication.saveUserInfoFromForm(user.uid, name, email).then(() => {
               this._notificationService.popToastSuccess(this._translate.instant('Welcome'),this._translate.instant('User has been registered successfully'));
               this.router.navigate(['/login']);
             })
             .catch((error) => {
               this.error = error;
               this._notificationService.popToastError("Error", this.error);
             });
         })
         .catch((error) => {
           this.error = error;
           this._notificationService.popToastError("Error", this.error);
         });
     }


   

    
  
    
    
    
    
    
    
    
    

}

