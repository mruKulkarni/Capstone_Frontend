import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { debounceTime, switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-registration',
  standalone: true,
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  imports: [ReactiveFormsModule, NgIf, NgFor]
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  apiUrl = 'http://localhost:8082/register';
  existingEmails: string[] = ['test@example.com', 'user@example.com']; // Simulated database emails
  emailExistsError: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { // Inject Router
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      age: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email], [this.emailAsyncValidator.bind(this)]], // Use the async validator
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
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

  // Asynchronous custom validator for email uniqueness check
  emailAsyncValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    return of(control.value).pipe(
      debounceTime(500), // Add debounce to prevent immediate requests
      switchMap((email) => {
        // Simulate checking the email in the database
        const emailExists = this.existingEmails.includes(email);
        return emailExists ? of({ emailExists: true }) : of(null); // Return error if email exists
      }),
      catchError(() => of(null)) // In case of error, just return null (valid)
    );
  }

  // Form submission
  onSubmit() {
    this.emailExistsError = false; // Reset email exists error before submission

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

          // Redirect to the login page after successful registration
          this.router.navigate(['/login']); // Navigate to the login page
        },
        error: (error) => {
          console.error('Error:', error);
          if (error.status === 400) {
            this.emailExistsError = true; // Show email exists error
          } else {
            alert('An error occurred. Please try again.');
          }
        }
      });
    } else {
      this.emailExistsError = this.registrationForm.get('email')?.hasError('emailExists') || false;
    }
  }
}
