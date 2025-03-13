import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports :[NgIf, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: boolean = false;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onLogin() {
    const { email, password } = this.loginForm.value;
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = users.some((user: any) => user.email === email && user.password === password);

    if (userExists) {
      alert('Login successful!');
      this.loginError = false;
    } else {
      this.loginError = true;
    }
  }
}