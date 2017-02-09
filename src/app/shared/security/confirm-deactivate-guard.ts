import { CanDeactivate,Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AlertService } from '../common-service/alert.service';


/**
 * 
 * Authentication guard class to show confirm pop up before leaving the page 
 * @export
 * @class ConfirmDeactivateGuard
 * @implements {CanDeactivate<any>}
 */
@Injectable()
export class ConfirmDeactivateGuard implements CanDeactivate<any> {
  constructor( private _alertService: AlertService,
               private _router: Router,
  ){}

  canDeactivate(target: any) {
     if(target.form.invalid) {
    // this._alertService.openConfirmationDialog("Title","Do you really want to cancel?",()=>{ this._router.navigate(['crudEmployee']);});
       //  return true;
     }
     return true;
    // if(target.hasChanges()){
    //     return window.confirm('Do you really want to cancel?');
    // }
   
  }
}


 