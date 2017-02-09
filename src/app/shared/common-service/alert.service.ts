import { Injectable } from '@angular/core';


declare var alertify: any;

/**
 * 
 * Alerify service class responsible for diplaying confirmation box
 * @export
 * @class AlertService
 */
@Injectable()
export class AlertService {
    private _notifier: any = alertify;

    constructor() { }

   
    /**
     * 
     * Function to display confirmation pop up 
     * @param {string} title
     * @param {string} message
     * @param {() => any} okCallback
     * 
     * @memberOf AlertService
     */
    openConfirmationDialog(title: string,message: string, okCallback: () => any) {
        
        this._notifier.confirm(title,message, function (e) {
            if (e) {
                okCallback();
            } else {
            }
        },null);

      
    }

   
    /**
     * 
     * function to display success message 
     * @param {string} message
     * 
     * @memberOf AlertService
     */
    printSuccessMessage(message: string) {

        this._notifier.success(message);
    }

   
    /**
     * 
     * function to display error message
     * @param {string} message
     * 
     * @memberOf AlertService
     */
    printErrorMessage(message: string) {
        this._notifier.error(message);
    }
}
