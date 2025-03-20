import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf, CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { debounceTime, switchMap, catchError } from 'rxjs/operators';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  imports: [ReactiveFormsModule, NgIf, CommonModule, RouterLink]
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  apiUrl = 'http://localhost:8082/register';
  existingEmails: string[] = ['test@example.com', 'user@example.com'];
  emailExistsError: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    // Define form controls with validation rules
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      dateOfBirth: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email], [this.emailAsyncValidator.bind(this)]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], // Validates for a 10-digit number
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/) // Updated regex for strong password validation
      ]],
      confirmPassword: ['', [Validators.required]],
      gender: ['', Validators.required]
    }, { validators: this.passwordsMatchValidator });
  }

  // Custom validator to check if passwords match
  passwordsMatchValidator(formGroup: AbstractControl): ValidationErrors | null {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  // Async email validator to check if the email exists in the system
  emailAsyncValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    return of(control.value).pipe(
      debounceTime(500),
      switchMap((email) => {
        const emailExists = this.existingEmails.includes(email);
        return emailExists ? of({ emailExists: true }) : of(null);
      }),
      catchError(() => of(null)) // Handle any errors from the async validation
    );
  }

  // Handle form submission
  onSubmit() {
    this.emailExistsError = false; // Reset the emailExists error state

    if (this.registrationForm.valid) {
      const formData = this.prepareFormData();
      
      this.http.post(this.apiUrl, formData).subscribe({
        next: (response) => {
          //console.log('Success:', response);
          //alert('Registration Successful!');
          this.registrationForm.reset(); // Reset the form after success

          // Redirect to the login page after successful registration
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Error:', error);
          if (error.status === 400) {
            this.emailExistsError = true; // Display email exists error
          } else {
            //alert('An error occurred. Please try again.');
          }
        }
      });
    } else {
      this.emailExistsError = this.registrationForm.get('email')?.hasError('emailExists') || false;
    }
  }

  // Helper function to prepare form data for submission
  private prepareFormData() {
    return {
      name: this.registrationForm.value.name,
      dateOfBirth: this.registrationForm.value.dateOfBirth,
      email: this.registrationForm.value.email,
      phone: this.registrationForm.value.phone,
      password: this.registrationForm.value.password,
      gender: this.registrationForm.value.gender
    };
  }
}
