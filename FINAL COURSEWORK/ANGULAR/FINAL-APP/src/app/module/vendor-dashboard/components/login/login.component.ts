import {Component} from '@angular/core';
import {LoginService} from "../../../../core/services/login.service";
import {ActivatedRoute, Router} from "@angular/router";
import {sendPasswordResetEmail} from "@angular/fire/auth";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email = '';
  password = '';

  constructor(private route: ActivatedRoute, private auth: LoginService, private router: Router) {
  }

  login() {
    this.auth.login(this.email, this.password)
      .then((res: { user: any; }) => {
        console.log('Logged in:', res.user);
        this.router.navigate(['VendorDashboard']);
      })
      .catch((err: { message: any; }) => alert(err.message));
  }

  // register() {
  //   // this.auth.register(this.email, this.password)
  //   //   .then((res: { user: any; }) => console.log('Registered:', res.user))
  //   //   .catch((err: { message: any; }) => alert(err.message));
  //   this.router.navigate(['register'],{relativeTo:this.route});
  // }

  googleLogin() {
    this.auth.googleLogin()
      .then((res: { user: any; }) => {
        console.log('Google login:', res.user);
        this.router.navigate(['VendorDashboard']);

      })
      .catch((err: { message: any; }) => alert(err.message));
  }

  forgotPassword() {
    if (!this.email) {
      alert('Please enter your email first.');
      return;
    }

    sendPasswordResetEmail(this.auth.afAuth, this.email)
      .then(() => alert('Password reset email sent! Check your inbox.'))
      .catch(err => alert(err.message));

  }
}
