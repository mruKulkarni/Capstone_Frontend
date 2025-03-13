import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  standalone: true,
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  imports: [ReactiveFormsModule, NgIf] // ✅ Import ReactiveFormsModule
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  apiUrl = 'http://localhost:8082/register'
  existingEmails: string[] = ['test@example.com', 'user@example.com']; // Simulated database emails
  emailExistsError: boolean = false;

  constructor(private fb: FormBuilder, private http:HttpClient) {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      age: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      gender: ['', Validators.required]
    }, { validators: this.passwordsMatchValidator });
  }

  // ✅ Custom validator to check if passwords match
  passwordsMatchValidator(formGroup: AbstractControl): ValidationErrors | null {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null :
     { passwordsMismatch: true };
  }

  // ✅ Form submission
  onSubmit() {
    if (this.registrationForm.valid) {
      const formData = {
        name: this.registrationForm.value.name,
        age: this.registrationForm.value.age,
        email: this.registrationForm.value.email,
        phone: this.registrationForm.value.phone,
        password: this.registrationForm.value.password,
        gender: this.registrationForm.value.gender
      };

      console.log('Submitting:', formData);

      this.http.post(this.apiUrl, formData).subscribe({
        next: (response) => {
          console.log('Success:', response);
          alert('Registration Successful!');
          this.registrationForm.reset();
        },
        error: (error) => {
          console.error('Error:', error);
          if (error.status === 400) {
            this.emailExistsError = true; // ✅ Show email exists error
          } else {
            alert('An error occurred while registering.');
          }
        }
      });
  }
}}
