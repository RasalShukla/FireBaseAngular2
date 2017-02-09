import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Employees } from  '../shared/model/employees';
import { FormBuilder, FormGroup,  Validators,ReactiveFormsModule } from '@angular/forms';
import { CrudService } from './crud.service';
import { ModalModule, ModalDirective } from 'ng2-bootstrap/modal';
import { CrudEmployeeFilterPipe } from './crud-employee-filter.pipe';
import { NotificationService } from '../shared/common-service/notification.service';
import { AlertService } from '../shared/common-service/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import {Observable} from "rxjs/Rx";
import  firebaseUpdateToObs  from "../shared/firebase/firebaseUpdateToObs";
import { TranslatePipe } from '../../translate/translate.pipe';
import { TranslateService } from '../../translate/translate.service';
/**
 * 
 * Class to responsible for handling all the crud operation of employee
 * @export
 * @class CrudEmployeeComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-crud-employee',
  templateUrl: './crud-employee.component.html',
  styleUrls: ['./crud-employee.component.css'],
  

})

export class CrudEmployeeComponent implements OnInit {
  tableInnerHeight: any;
  // Code to achieve modal functionality by server code 
  @ViewChild('childModal') public childModal: ModalDirective
  employees: Employees[];
  emlpoyeeInfo: Employees = new Employees("", "", "", false, "", "", "","");
  listFilter: string;
  imageWidth: number = 50;
  imageMargin: number = 2;

  /**
   * Creates an instance of CrudEmployeeComponent.
   * 
   * @param {CrudService} _crudEmployeeService
   * @param {NotificationService} _notificationService
   * @param {AlertService} _alertService
   * @param {Router} router
   * 
   * @memberOf CrudEmployeeComponent
   */
  constructor( private _crudEmployeeService: CrudService,
               private _notificationService: NotificationService,
               private _alertService: AlertService,
               private router: Router,
               private _translate: TranslateService
  ) {
     this.tableInnerHeight = (window.innerHeight) - 225;
  }

  ngOnInit(): void {
      this._crudEmployeeService.getAllEmployees().subscribe(employeesInfo => { this.employees = employeesInfo });
     
  }
  /**
   * function to get employee info by employee key
   * @param  {string} employeeKey
   */
  getEmployeeInfo(employeeKey: string) {
    this._crudEmployeeService.findEmployeeByKey(employeeKey.toString()).subscribe(empInfo => {this.emlpoyeeInfo = empInfo});
    this.childModal.show();
  }

  
  /**
   * function to delete seleceted employee by its key
   * @param  {string} employeeKey
   * @param  {string} employeeName
   */
  deleteEmployeeInfo(employeeKey: string, employeeName: string) {
    this._alertService.openConfirmationDialog(this._translate.instant('Delete Employee'),this._translate.instant('Are you sure you want to release') +
      employeeName.toUpperCase() +" " +this._translate.instant('from team ?'),
      () => {
        this._crudEmployeeService.deleteEmployee(employeeKey);
        this._crudEmployeeService.getAllEmployees().subscribe(employeesInfo => { this.employees = employeesInfo });
        this._notificationService.popToastSuccess(this._translate.instant('Success'), this._translate.instant('You have successfully release') + " " + employeeName.toUpperCase() +" " + this._translate.instant('from team'));
      });
  }

  /**
   * function to navigate user to user profile component
   * @returns void
   */
  navigateUserForm() : void {
    this.router.navigate(['crudEmployee/user-Profile']);
  }

  /**
   * function to hide user info modal
   * @param  {string} employeeName
   * @returns void
   */
  public hideChildModal(employeeName: string): void {
    this.childModal.hide();
    this._notificationService.popToastInfo(this._translate.instant('Tracking Info'),this._translate.instant('You have successfully seen')+" " + employeeName.toUpperCase() +" "+ this._translate.instant('info'));
  }
}
