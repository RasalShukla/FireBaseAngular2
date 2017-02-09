import { Injectable } from '@angular/core';
import {ToasterContainerComponent, ToasterService, ToasterConfig,Toast} from 'angular2-toaster';



/**
 * 
 * Toaster service class reponsible for diplaying pop ups
 * @export
 * @class NotificationService
 */
@Injectable()
export class NotificationService {

  /**
   * Creates an instance of NotificationService.
   * 
   * @param {ToasterService} _toasterService
   * 
   * @memberOf NotificationService
   */
  constructor(private _toasterService: ToasterService){}

  private toasterconfig : ToasterConfig =  new ToasterConfig({ positionClass: "toast-bottom-left", showCloseButton: true, tapToDismiss: true,  timeout: 10,});

        // private toast: Toast = {
        //     type: 'success',
        //     title: 'close button',
        //     showCloseButton: true,
        //     toasterConfig:this.toasterconfig
        // }; //this._toasterService.pop(this.toast);

    /**
     * 
     * Function to display information
     * @param {string} header
     * @param {string} message
     * 
     * @memberOf NotificationService
     */
    popToastInfo(header:string,message:string) {
        this._toasterService.pop('info', header, message);
    }

    /**
     * 
     * Function to display success message
     * @param {string} header
     * @param {string} message
     * 
     * @memberOf NotificationService
     */
    popToastSuccess(header:string,message:string) {
        this._toasterService.pop('success', header, message);
    }

    /**
     * 
     * Function to display warning message
     * @param {string} header
     * @param {string} message
     * 
     * @memberOf NotificationService
     */
    popToastWarning(header:string,message:string){ 
        this._toasterService.pop('warning', header, message);
    }
    
    /**
     * 
     * Function to display erroe message
     * @param {string} header
     * @param {string} message
     * 
     * @memberOf NotificationService
     */
    popToastError(header:string,message:string){ 
        this._toasterService.pop('error', header, message);
     }
}
