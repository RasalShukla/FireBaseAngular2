import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { NotificationService } from '../../shared/common-service/notification.service';
import { CrudService } from '../crud.service';
import { Employees } from  '../../shared/model/employees';
import { TranslateService } from '../../../translate/translate.service';
import { FirebaseAuthentication } from "../../shared/firebase/firebaseAuthentication";

@Injectable()
export class EmployeeFormGuard implements CanActivate {
  emlpoyeeInfo: Employees = new Employees("", "", "", false, "", "", "","");
  employeeKey : number;
  uid: string;
    constructor( private _router: Router, 
                 private _notificationService:NotificationService, 
                 private _crudEmployeeService: CrudService,
                 private _translate: TranslateService,
                private _firebaseAuthentication: FirebaseAuthentication
                
                 ) {}

    canActivate(route: ActivatedRouteSnapshot): boolean {
        
         this.employeeKey = +route.url[1].path;
         this._firebaseAuthentication.authInfo$.take(1).subscribe(aa=>this.uid = aa.$uid);  
         this.emlpoyeeInfo = new Employees("", "", "", false, "", "", "","");
         this._crudEmployeeService.findEmployeeByKey(this.employeeKey.toString()).subscribe(empInfo => {this.emlpoyeeInfo = empInfo});  
        if ( this.emlpoyeeInfo.name == undefined || this.emlpoyeeInfo.createdBy != this.uid) {
              this._router.navigate(['/home']);
              this._notificationService.popToastWarning(this._translate.instant('Invald Employee'),this._translate.instant('Emloyee is not registered with db, Please contact your DBA.'));
              return false;
        };
         return true;
    }
}