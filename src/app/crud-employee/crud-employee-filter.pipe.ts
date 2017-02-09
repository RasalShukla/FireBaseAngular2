import {  Pipe,PipeTransform } from '@angular/core'
import { Employees } from  '../shared/model/employees';

/**
 * Class to filter all the employee info , according to user selection
 */
@Pipe({
    name: 'crudemployeefilterpipe'
})

export class CrudEmployeeFilterPipe implements PipeTransform{
  
  transform(value: Employees[], filterBy: string): Employees[] {
        
        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
        return filterBy ? value.filter((employee: Employees) =>
            employee.name.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
    }
}