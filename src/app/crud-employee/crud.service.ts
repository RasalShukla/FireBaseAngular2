import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { Employees } from  '../shared/model/employees';
import {AngularFire, FirebaseRef} from "angularfire2";
import {Observable} from "rxjs/Rx";
import  firebaseUpdate  from "../shared/firebase/firebaseUpdateToObs";
import { FirebaseAuthentication } from "../shared/firebase/firebaseAuthentication"

/**
 * 
 * Service class responsible for interacting with firebase db (DAL layer)
 * @export
 * @class CrudService
 */
@Injectable()
export class CrudService {

dbRef: any;
uid: string;

  /**
   * Creates an instance of CrudService.
   * 
   * @param {AngularFire} _angularFire
   * @param {any} dbRef
   * @param {FirebaseAuthentication}  _firebaseAuthentication
   * 
   * @memberOf CrudService
   */
  constructor( private _angularFire:AngularFire,  
               @Inject(FirebaseRef) dbRef,
               private _firebaseAuthentication: FirebaseAuthentication
               ) {
                this.dbRef = dbRef.database().ref();
                this._firebaseAuthentication.authInfo$.take(1).subscribe(aa=>this.uid = aa.$uid);          
  }
 
  
/**
 * function to load all the available employee data
 * @returns Observable
 */
getAllEmployees(): Observable < Employees[]> {
  return this._angularFire.database.list('Employee', {
      query: {
        //orderByKey: true,
        orderByChild:'createdBy',
        equalTo: this.uid
      }
    })
    .map(employee => employee.map(json => Employees.fromJson(json)).filter(aa=>aa.$key != "0"))
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
}


/**
 * function to get selected employee data by its key
 * @param  {string} employeeKey
 * @returns Observable
 */
findEmployeeByKey(employeeKey: string): Observable <Employees> {
  return this._angularFire.database.object(`Employee/${employeeKey}`).map(json => Employees.fromJson(json)).take(1)
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));;
}

/**
 * function to get selected employee data by its id
 * @param  {string} id
 * @returns Observable
 */
// findEmployeeById(id: string): Observable < Employees > {
//   return this._angularFire.database.list('Employee', {
//       query: {
//         orderByChild: 'id',
//         equalTo: id
//       }
//     })
//     .map(results => results[0])
//     .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
// }

/**
 * function to delete selected employee by its key
 * @param  {string} employeeKey
 */
deleteEmployee(employeeKey: string) {
  const items = this._angularFire.database.list('Employee');
  items.remove(employeeKey);

}
/**
 * function to update selected employee record by its key 
 * @param  {string} employeeKey
 * @param  {} employee 
 * @returns Observable
 */
updateEmployee(employeeKey: string, employee): Observable <any> {
  employee.createdBy = this.uid;
  const items = this._angularFire.database.list('Employee');
  const employeeToSave = employee;
  delete(employeeToSave.$key);
  let dataToSave = {};
  dataToSave[`Employee/${employeeKey}`] = employeeToSave;
  return firebaseUpdate(this.dbRef, dataToSave);


}

/**
 * function to get last key of db
 * @returns Observable
 */
findlastKey(): Observable < any > {
  return this._angularFire.database.list('Employee', {
      query: {
        limitToLast: 1
      }
    })
    .map(results => results[0].$key).take(1)
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
}

/**
 * function to insert new employee record by 
 * @param  {string} lastKey
 * @param  {} employee
 * @returns Observable
 */
saveEmployeeWithLastKey(lastKey: string, employee): Observable <any> {
  if (lastKey != "" || lastKey != undefined) {
    let updatedLastKey = (parseInt(lastKey) + 1).toString();
    const employeeToSave = Object.assign({}, employee);
    delete(employeeToSave.$key);
    let dataToSave = {};
    dataToSave[`Employee/${updatedLastKey}`] = employeeToSave;
    return firebaseUpdate(this.dbRef, dataToSave);
  }
}

/**
 * funtion to save new employee record
 * @param  {} employee
 * @returns Observable
 */
saveEmployee(employee) : Observable <any> {
   employee.createdBy = this.uid;
  return this.findlastKey().flatMap(lastKey => {
    return this.saveEmployeeWithLastKey(lastKey, employee)
  })
}

}

