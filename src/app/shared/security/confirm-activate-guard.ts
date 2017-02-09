import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router,RouterStateSnapshot } from '@angular/router';
import { NotificationService } from '../../shared/common-service/notification.service';
import { AuthInfo } from '../../shared/security/auth-info';
import {Observable} from "rxjs/Rx";
import { FirebaseAuthentication } from "../../shared/firebase/firebaseAuthentication"

/**
 * 
 * Authentication guard class to check user is valid or not on each user routing
 * @export
 * @class ConfirmActivateGuard
 * @implements {CanActivate}
 */
@Injectable()

export class ConfirmActivateGuard implements CanActivate {
    constructor(private _router: Router,
        private _notificationService: NotificationService,
        private _firebaseAuthentication: FirebaseAuthentication
    ) {}


    /**
     * 
     * 
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable < boolean >}
     * 
     * @memberOf ConfirmActivateGuard
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable < boolean > {

        return this._firebaseAuthentication.authInfo$
            .map(authInfo => authInfo.isLoggedIn())
            .take(1)
            .do(allowed => {
                if (!allowed) {
                    this._router.navigate(['/login']);

                }
            });
    }
}