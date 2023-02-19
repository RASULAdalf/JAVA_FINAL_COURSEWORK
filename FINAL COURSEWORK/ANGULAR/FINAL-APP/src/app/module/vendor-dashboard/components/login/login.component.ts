import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../../../service/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  constructor(private loginService: LoginService, private router: Router) {
  }


  ngOnInit(): void {
  }

  forgotPassword() {
    this.loginService.forgotPassword(this.loginForm.get('email')?.value?.toString());
  }

  VendorLogin() {
    this.loginService.VendorLogin(this.loginForm.get('email')?.value?.toString(), this.loginForm.get('password')?.value);

  }

  VendorRegister() {
    this.loginService.VendorRegister();
  }

  loginWithGoogle() {
    this.loginService.loginWithGoogle();
  }
}
