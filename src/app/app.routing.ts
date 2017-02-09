import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrudHomeComponent } from './crud-home/crud-home.component';
import { CrudLoginComponent } from './crud-login/crud-login.component';
import { ConfirmActivateGuard } from './shared/security/confirm-activate-guard';
import { CrudRegistrationComponent } from "./crud-registration/crud-registration.component";
 

const appRoutes: Routes = [
      { path:'',redirectTo:'/login',pathMatch:'full'},
      { path: 'login', component: CrudLoginComponent, pathMatch:'full' },
      {path: 'registration', component: CrudRegistrationComponent},
      { path: 'home', component: CrudHomeComponent,canActivate: [ConfirmActivateGuard]},
      { path: 'crudEmployee', loadChildren:'app/crud-employee/crud-employee.module#FarmsatEmployeeModule',canActivate: [ConfirmActivateGuard] },
      { path: '',   component: CrudLoginComponent },
      { path: '**', component: CrudLoginComponent }   
];


function redirectRouterLessonUnmatched(req,res) {
    res.sendFile("index.html", { root: './index.html' });
}

export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);