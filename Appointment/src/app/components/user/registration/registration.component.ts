import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-registration',
  standalone: true,
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  imports: [ReactiveFormsModule, NgIf, NgFor] // ✅ Import ReactiveFormsModule
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  existingEmails: string[] = ['test@example.com', 'user@example.com']; // Simulated database emails
  emailExistsError: boolean = false;

  constructor(private fb: FormBuilder) {
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
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  // ✅ Form submission
  onSubmit() {
    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;
      
      // ✅ Check if email already exists
      if (this.existingEmails.includes(formData.email)) {
        this.emailExistsError = true;
        return;
      }

      console.log('Form Data:', formData);
      alert('Registration Successful!');
    } else {
      alert('Please fill out the form correctly.');
    }
  }
}
