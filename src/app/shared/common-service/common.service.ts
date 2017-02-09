import { Injectable } from '@angular/core';




/**
 * 
 * Service class responsible to put common methods
 * @export
 * @class CommonService
 */
@Injectable()

export class CommonService {

/**
 * Function to generate random number 
 * 
 * @returns {string}
 * 
 * @memberOf CommonService
 */
generateRandomId() : string {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}


    
}
