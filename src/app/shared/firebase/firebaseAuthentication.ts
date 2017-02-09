import { Injectable } from "@angular/core";
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { FirebaseObjectFactoryOpts } from "angularfire2/interfaces";
import { AuthInfo } from "../security/auth-info"
import {Observable, BehaviorSubject, Subject} from "rxjs/Rx";

/**
 * 
 * Service class responsible for user and firebase database autntication
 * @export
 * @class FirebaseAuthentication
 */
@Injectable()
export class FirebaseAuthentication {
 
  public employee: FirebaseListObservable<any>;
  public users: FirebaseListObservable<any>;
  public displayName: string;
  public email: string;
  public user: FirebaseObjectObservable<any>;
  static UNKNOWN_USER = new AuthInfo(null);

  authInfo$:BehaviorSubject<AuthInfo> = new BehaviorSubject<AuthInfo>(FirebaseAuthentication.UNKNOWN_USER);

  /**
   * Creates an instance of FirebaseAuthentication.
   * 
   * @param {AngularFire} af
   * 
   * @memberOf FirebaseAuthentication
   */
  constructor(public af: AngularFire) {
    this.af.auth.subscribe(
      (auth) => {
        if (auth != null) {
          this.user = this.af.database.object('users/' + auth.uid);
        }
      });

    this.employee = this.af.database.list('Employee');
    this.users = this.af.database.list('users');
  }

  /**
   * Logs in the user
   * @returns {firebase.Promise<FirebaseAuthState>}
   */
  loginWithGoogle() : Observable<any>{  
   return this.fromFirebaseAuthPromise(this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup,
    }));
  }

  /**
   * Logs out the current user 
   */
  logout() {
     this.authInfo$.next(FirebaseAuthentication.UNKNOWN_USER);
    return this.af.auth.logout();
  }

  /**
   *
   */
  addUserInfo(){
    //We saved their auth info now save the rest to the db.
    this.users.push({
      email: this.email == undefined ? "" : this.email,
      name: this.displayName == undefined  ? "" : this.displayName
    });
  }

  

  /**
   *
   * @param model
   * @returns {firebase.Promise<void>}
   */
  registerUser(email, password) {
    return this.af.auth.createUser({
      email: email,
      password: password
    });


  }

  /**
   *
   * @param uid
   * @param model
   * @returns {firebase.Promise<void>}
   */
  saveUserInfoFromForm(uid, name, email) {
    return this.af.database.object('registeredUsers/' + uid).set({
      name: name,
      email: email,
    });
  }

  /**
   * Logs the user in using their Email/Password combo
   * @param email
   * @param password
   * @returns {firebase.Promise<FirebaseAuthState>}
   */
  loginWithEmail(email, password) : Observable<any> {
    return this.fromFirebaseAuthPromise(this.af.auth.login({
        email: email,
        password: password,
      },
      {
        provider: AuthProviders.Password,
        method: AuthMethods.Password,
      }));
  }


   fromFirebaseAuthPromise(promise): Observable<any> {

    const subject = new Subject<any>();
    promise
      .then(() => {
          const authInfo = new AuthInfo(this.af.auth.getAuth().uid);
          this.authInfo$.next(authInfo);
          subject.next(authInfo);
          subject.complete();
        },
        err => {
          subject.error(err);
          subject.complete();
        });

    return subject;
  }

}
