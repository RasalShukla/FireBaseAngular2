import { Injectable } from '@angular/core';


/**
 * Service class reponsible for handling with local storage
 * 
 * @export
 * @class LocalStorageService
 */
@Injectable()
export class LocalStorageService {
    
    constructor() { }
    
    
    /**
     * 
     * function to add data in local storage
     * @param {string} username
     * @param {string} password
     * @returns {boolean}
     * 
     * @memberOf LocalStorageService
     */
    addDataInLocalStorage(username: string, password: string) : boolean {
        try{
            localStorage.setItem('currentUser', JSON.stringify({ username: username, password: password }));
            return true;
        }
        catch(err){
            return false;
        }
    }
    
    /**
     * 
     * function to remove data from local storage by key
     * @param {string} key
     * @memberOf LocalStorageService
     */
    removeDataFromLocalStorage(key :string) {
        localStorage.removeItem('currentUser');
    }
     
    /**
     * 
     * function to count number of record available in local storage
     * @returns {number}
     * 
     * @memberOf LocalStorageService
     */
    numberOfDataInLocalStorage() : number {
       return localStorage.length ;
    }

   
    
    /**
     * 
     * function to responsible for clear the local storage
     * 
     * @memberOf LocalStorageService
     */
    emptyLocalStorage(){
        localStorage.clear();
    }
}