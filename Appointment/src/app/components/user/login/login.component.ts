import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule], // ✅ Ensure these modules are included
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  loginError: boolean = false; // Property to manage login error display

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) {
    // Initialize the form with validations
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Getter for easy access to form controls
  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  // Handle form submission
  login() {
    this.submitted = true;

    // Stop if the form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    // Call the login service to authenticate the user
    this.loginService.login(this.loginForm.value).subscribe({
      next:(response) => {
        //console.log('Login successful!', response);
        //alert('Login successful!');
        localStorage.setItem("userId",response.email);
        localStorage.setItem('userName', response.name); 
        localStorage.setItem('userNumber', response.id);
        const adminEmail = "admin@example.com"; 
        localStorage.setItem('isAdmin', response.email === adminEmail ? 'true' : 'false');
        this.router.navigate(['/departments']); // Redirect to dashboard after successful login
      },
      error:
      (error) => {
        //console.error('Login failed', error);
        this.loginError = true;  // Set loginError to true to show error message
        //alert('Invalid email or password!');  // Show a generic error alert
      }}
    );
  }
  goToRegister() {
    this.router.navigate(['/registration']); // Navigate to the registration page
  }
}
