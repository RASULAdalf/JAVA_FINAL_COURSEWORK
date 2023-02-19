import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../../../service/login.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })
  confirmPassword: any;
  confirmedPassword = this.registerForm.get('password')?.value?.toString();


  constructor(private loginService: LoginService, private router: Router) {
    console.log(this.confirmedPassword);
    console.log(this.confirmPassword);
  }

  ngOnInit(): void {
  }

  registerWithGoogle() {
    this.loginService.registerWithGoogle();
  }

  register() {
    this.loginService.register(this.registerForm.get('email')?.value?.toString(), this.registerForm.get('password')?.value?.toString());
  }

  login() {
    this.loginService.login();
  }
}
