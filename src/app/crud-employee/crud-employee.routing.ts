import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrudEmployeeComponent } from '../crud-employee/crud-employee.component';
import { CrudEmployeeFilterPipe } from '../crud-employee/crud-employee-filter.pipe';
import { EmployeeFormComponent } from '../crud-employee/employee-form/employee-form.component';
import {FarmsatEmployeeModule} from './crud-employee.module';
import { EmployeeFormGuard } from '../crud-employee/employee-form/employee-form-guard';
import { ConfirmDeactivateGuard } from '../shared/security/confirm-deactivate-guard';
import { ConfirmActivateGuard } from '../shared/security/confirm-activate-guard';

const routes: Routes = [
        { path: '', component: CrudEmployeeComponent },
        { path: '', component: CrudEmployeeComponent,canActivate: [ConfirmActivateGuard] },
        { path:'user-Profile', component: EmployeeFormComponent, canDeactivate:[ConfirmDeactivateGuard],canActivate: [ConfirmActivateGuard] },
        { path: 'user-Profile/:id', component: EmployeeFormComponent, canActivate: [ EmployeeFormGuard],canDeactivate:[ConfirmDeactivateGuard]},
      
];

export const LazyRouting: ModuleWithProviders = RouterModule.forChild(routes);