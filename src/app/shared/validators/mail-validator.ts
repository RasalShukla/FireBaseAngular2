import { FormBuilder, Validators, FormControl } from '@angular/forms';
export class GlobalValidator{

    static mailFormat(control: FormControl): ValidationResult {
        var EMAIL_REGEXP = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
        //var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        try{
        if (control.value != "" && (control.value.length <= 5 || !EMAIL_REGEXP.test(control.value))) {
            return { "incorrectMailFormat": true };
        }
     }catch(err){};
        return null;
    }

}

interface ValidationResult {
    [key: string]: boolean;
}