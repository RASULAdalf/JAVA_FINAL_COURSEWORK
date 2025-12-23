import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from "../../../../core/services/login.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  email = '';
  password = '';
  confirmPassword = '';
  loading = false;

  constructor(
    private auth: LoginService,
    private router: Router
  ) {
  }

  register() {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    this.loading = true;

    this.auth.register(this.email, this.password).then(() => {
      this.router.navigate(['/VendorDashboard/login']);
    })
      .catch((err: { message: any; }) => alert(err.message))
      .finally(() => this.loading = false);
  }

  googleSignup() {
    this.auth.googleLogin()
      .then(() => this.router.navigate(['VendorDashboard']))
      .catch((err: { message: any; }) => alert(err.message));
  }
}
