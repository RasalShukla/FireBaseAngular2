import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,  Validators,ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Employees } from '../../shared/model/employees';
import { CrudService} from '../crud.service';
import { NotificationService } from '../../shared/common-service/notification.service';
import { AlertService } from '../../shared/common-service/alert.service';
import { GlobalValidator } from "../../shared/validators/mail-validator";
import { TranslateService } from '../../../translate/translate.service';

/**
 * 
 * Class to responsible for user form 
 * @export
 * @class EmployeeFormComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'app-employee-form',
    templateUrl: './employee-form.component.html',
})
export class EmployeeFormComponent implements OnInit {
    
    form: FormGroup;
    title: string;
    employee: Employees = new Employees("", "", "", false, "", "", "../assets/images/blank.jpg","");
    imageWidth: number = 100;
    imageMargin: number = 2;
    base64ImageString: string;
   
    key: any;
    lastKey: any;
    file_src:string;
    
    /**
     * Creates an instance of EmployeeFormComponent.
     * 
     * @param {FormBuilder} formBuilder
     * @param {Router} router
     * @param {ActivatedRoute} route
     * @param {CrudService} _crudEmployeeService
     * @param {NotificationService} _notificationService
     * @param {AlertService} _alertService
     * 
     * @memberOf EmployeeFormComponent
     */
    constructor(
                formBuilder: FormBuilder,
                private router: Router,
                private route: ActivatedRoute,
                private _crudEmployeeService:CrudService, 
                private _notificationService:NotificationService,
                private _alertService: AlertService,
                private _translate: TranslateService
    ) {
        this.form = formBuilder.group({
            name: ['', [ Validators.compose([Validators.required, Validators.minLength(10)])
                
            ]],
            designation: ['', [
                Validators.compose([Validators.required])
            ]],
            id:[],
            isdeleted:[],
            imageSrc: [],
            $key: [],
            email:['',[
              Validators.compose([Validators.required, GlobalValidator.mailFormat])
            ]],
            phoneNo:['',[
                Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(11)])
            ]]

        });
    }

    ngOnInit() {
    this.base64ImageString = "";
    var employeeKey = this.route.params.subscribe(params => {
    var employeeKey= params['id'];
    this.title = employeeKey == undefined ? 'NEW USER' : 'EDIT USER';
    
    employeeKey != undefined  ?  this._crudEmployeeService.findEmployeeByKey(employeeKey).subscribe(empInfo => this.employee = empInfo) 
                              :  this.employee = new  Employees("", "", "", false, "", "", "../assets/images/blank.jpg","");
 
      });
    }

/**
 * function to upsert empoloyee 
 * if employeeKey is empty or undefined then it , will insert the data otherwise update the data
 * @param  {string} employeeKey
 */
save(employeeKey: string) {
   var result = this.form.value;
   try{
   result.imageSrc = this.base64ImageString == "" ? result.imageSrc : this.base64ImageString;
   result.isdeleted = false;
}
catch(err){ }
    employeeKey == ""  || employeeKey == undefined || employeeKey == "undefined" ? this.addUser(result) : this.updateUser(employeeKey,result)     
}

/**
 * function to add new record in firbase 
 * @param  {} result
 */
addUser(result) {
    this._crudEmployeeService.saveEmployee(result)
        .subscribe(
            () => {
                this._notificationService.popToastSuccess(this._translate.instant('Success'),this._translate.instant('User added successfully'));
                this.router.navigate(['crudEmployee']);
            },
            err => this._notificationService.popToastError(this._translate.instant('Error'),this._translate.instant('An error occured while processing your request.'))
        );
}
/**
 * function to update selected employee
 * @param  {} employeeKey
 * @param  {} result
 */
updateUser(employeeKey, result) {
    this._crudEmployeeService.updateEmployee(employeeKey, result).subscribe(
        () => {
            this._notificationService.popToastSuccess(this._translate.instant('Success'), this._translate.instant('User updated successfully'));
            this.router.navigate(['crudEmployee']);
        }
    );
}

 /**
  * function to get last key of database
  * @returns any
  */
 requestLastKey() : any {
    return this._crudEmployeeService.findlastKey().subscribe(lastKey => this.key = lastKey );
 }
  /**
   * function to go back to crud employee component
   */
  goBack(){
       this.router.navigate(['crudEmployee']);
  }


processImage(fileEvent){
  
    // Loop through each picture file
    var files = (fileEvent.target.files[0]);
  
    // Create an img element and add the image file data to it
    var img = document.querySelector("img");

    // Create a FileReader
    var reader = new FileReader();

    // Add an event listener to deal with the file when the reader is complete
    reader.addEventListener("load", (event:any) => {
    // Get the event.target.result from the reader (base64 of the image)
      img.src = event.target.result;

      // Resize the image
      var resized_img = this.resize(img);
      // Push the img src (base64 string) into our array that we display in our html template
      this.file_src = resized_img;
      }, false);

    reader.readAsDataURL(fileEvent.target.files[0]);
        //}
  }
  resize (img, MAX_WIDTH:number = 500, MAX_HEIGHT:number = 500){
    var canvas = document.createElement("canvas");


    var width = img.width;
    var height = img.height;

    if (width > height) {
      if (width > MAX_WIDTH) {
        height *= MAX_WIDTH / width;
        width = MAX_WIDTH;
      }
    } else {
      if (height > MAX_HEIGHT) {
        width *= MAX_HEIGHT / height;
        height = MAX_HEIGHT;
      }
    }
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext("2d");

    ctx.drawImage(img, 0, 0, width, height);

    var dataUrl = canvas.toDataURL('image/jpeg');
     img.src = dataUrl;
   this.base64ImageString = dataUrl;
    // IMPORTANT: 'jpeg' NOT 'jpg'
    return dataUrl
  }
   
   

}