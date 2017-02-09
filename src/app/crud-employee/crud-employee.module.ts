import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CrudEmployeeComponent } from './crud-employee.component';
import { CrudEmployeeFilterPipe } from './crud-employee-filter.pipe';
import { EmployeeFormComponent } from '../crud-employee/employee-form/employee-form.component';
import { LazyRouting } from './crud-employee.routing';
import {ToasterModule, ToasterService, ToasterConfig, Toast} from 'angular2-toaster';
import { ModalModule } from 'ng2-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { EmployeeFormGuard } from '../crud-employee/employee-form/employee-form-guard';
import { SharedModule } from '../shared.module';




@NgModule({
  declarations: [CrudEmployeeComponent, 
                 EmployeeFormComponent, 
                 CrudEmployeeFilterPipe,
                
               ],
        
        imports: [CommonModule,
                  LazyRouting, 
                  ToasterModule,
                  ModalModule.forRoot(),
                  FormsModule,   
                  ReactiveFormsModule, 
                  SharedModule ],
  
      providers: [
                  EmployeeFormGuard,
                 
                  ],
})
export class FarmsatEmployeeModule { }
