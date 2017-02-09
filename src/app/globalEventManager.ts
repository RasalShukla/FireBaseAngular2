import {EventEmitter, Injectable} from "@angular/core";

/**
 * 
 * Service class responsible for emitting a custom event on global level
 * @export
 * @class GlobalEventsManager
 */
@Injectable()
export class GlobalEventsManager {
    public showNavBar: EventEmitter<any[]> = new EventEmitter();
    constructor() {
    }
}