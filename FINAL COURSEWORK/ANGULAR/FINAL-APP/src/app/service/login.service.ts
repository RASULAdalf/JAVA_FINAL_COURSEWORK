import {Injectable, NgZone} from '@angular/core';
import {AuthService} from "@auth0/auth0-angular";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {LocalDataService} from "./local-data.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
//import auth = firebase.auth;
import {Vendor} from "../model/Vendor";
import firebase from "firebase/compat/app";
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
import {SnackBarService} from "../module/customer-dashboard/services/snack-bar.service";

//import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private userData: any

  constructor(private localDataService: LocalDataService, public auth: AuthService, private activatedRoute: ActivatedRoute, private snackBarService: SnackBarService, private router: Router, public afs: AngularFirestore, public afAuth: AngularFireAuth, public ngZone: NgZone) {
    this.setLoggingStateFirebase();
  }

  get isLogged(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }

  public loginWithAuth0(): void {
    this.isLoggedAuth0().then(res => {
      this.router.navigate(['/CustomerDashboard']);
    }).catch(err => {
      this.localDataService.setCookie('login_init', true);
      this.auth.loginWithRedirect();

    });
  }

  public logoutFromAuth0(data: any): void {
    this.auth.logout(data);
    this.localDataService.deleteCookie('userToken', '/');
    this.localDataService.deleteCookie('userEmail', '/');
    this.localDataService.deleteCookie('userPic', '/');
    this.localDataService.deleteCookie('login_init', '/');
    this.router.navigate(['']);
  }

  public landingPageLoginOperations(data: any): void {
    if (data['code'] != undefined) {
      this.localDataService.setCookie('userToken', data['code']);

    } else if (data['err'] != undefined) {
      this.snackBarService.openSnackBar(data['err']);
    }else if (data['token']!= undefined){
      this.localDataService.setCookie('token',data['token']).then(res=>{
        this.router.navigate(['/AdminDashboard'])
      },err=>{
        this.router.navigate(['landing'],{queryParams:{err:'Error Occurred '}});
      })
    }
  }

  public CustomerDashboardLoginOperations(data: any): void {

    if (data['code'] != undefined) {
      this.localDataService.setCookie('userToken', data['code']).then(result=>{

        this.auth.user$.subscribe(res=>{
          console.log(res?.picture+" "+res?.email);
          this.localDataService.setCookie('userPic',res?.picture).then(r=>{
           this.localDataService.setCookie('userEmail',res?.email).then(rr=>{
             window.location.replace("http://localhost:4200/CustomerDashboard");
           })
          });
        })
        // this.localDataService.setCookie('userPic',)
          this.localDataService.deleteCookie('login_init', '/');


      }).catch(error=>console.log(error));


    }

    if (data['err_description'] != undefined) {
      this.localDataService.deleteCookie('login_init', '/');
      this.router.navigate(['/landing'],
        {queryParams: {err: data['err_description']}}
      );
    } else {
      this.router.navigate(['/CustomerDashboard']);
    }



  }

  public async isLoggedAuth0(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.getCookie('userToken')|| this.getCookie('login_init')) {
        resolve(true);
      } else {
        reject(false);
      }
    });
  }
  public getCookie(key: string): any {
    return this.localDataService.getCookie(key);
  }

  public deleteCookie(userToken: string, s: any) {
    this.localDataService.deleteCookie(userToken, s);
  }

  public async isLoggedFirebase(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.isLogged) {
        resolve(true);
      } else {
        const user = JSON.parse(localStorage.getItem('user')!);
        if (user.emailVerified == false) {
          this.router.navigate(['/landing'], {queryParams: {err: 'Please verify your email'}});
        } else {
          reject(false);
        }
      }
    });
  }

  SignIn(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password).then(res => {
      this.router.navigate(['VendorDashboard']);
    }, error => {
      this.router.navigate(['/landing'], {queryParams: {err: error}});
    })
  }

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: Vendor = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  public SignUp(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.afAuth
        .createUserWithEmailAndPassword(email, password)
        .then((result) => {
          /* Call the SendVerificaitonMail() function when new user sign
          up and returns promise */
          this.SendVerificationMail();
          this.SetUserData(result.user);
          resolve(true);
        })
        .catch((error) => {
          window.alert(error.message);
          reject(false);
        });
    })
  }

  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }

  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider()).then((res: any) => {
      if (res) {
        //this.router.navigate(['/landing']);
        //this.router.navigate(['/VendorDashboard']);
      }
    });
  }

  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.afAuth.authState.subscribe((user) => {
            if (user) {
              this.userData = user;
              localStorage.setItem('user', JSON.stringify(this.userData));
              JSON.parse(localStorage.getItem('user')!);
              this.router.navigate(['VendorDashboard']);
            } else {
              localStorage.setItem('user', 'null');
              JSON.parse(localStorage.getItem('user')!);
            }
          });
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/landing']);
    });
  }

  setLoggingStateFirebase() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  forgotPassword(email:any) {
    this.ForgotPassword(email).then(res => {
      this.router.navigate(['/landing'], {queryParams: {err: `Reset link sent to ${email}`}});
    }, err => {
      this.router.navigate(['/landing'], {queryParams: {err: err}});
    })
  }

  VendorLogin(email:any,password:any) {
    this.SignIn(email,password);

  }

  VendorRegister() {
    this.router.navigate(['VendorDashboard/register']);
  }

  loginWithGoogle() {
    this.GoogleAuth();
  }

  registerWithGoogle() {
    this.GoogleAuth();
  }

  register(email:any,password:any) {
    this.SignUp(email,password).then(res => {
      this.router.navigate(['VendorDashboard/login']);
    }, err => {
      this.router.navigate(['/landing'], {queryParams: {err: err}});
    })
  }

  login() {
    this.router.navigate(['VendorDashboard/login']);
    this.afAuth.signInWithEmailLink('')
  }

  public async isLoggedAdmin():Promise<any>{
    return new Promise((resolve,reject)=>{
      if (this.localDataService.getCookie('token')){
        resolve(true);
      }else {
        reject(false);
      }
    })
  }


  AdminLogout() {
    this.localDataService.deleteCookie('token','path').then(res=>{
      this.router.navigate(['/landing']);
    })
  }
}



