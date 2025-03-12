import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DepartmentService } from '../../../services/department.service';

@Component({
  selector: 'app-add-doctor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent implements OnInit {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private router = inject(Router);

  doctorForm: FormGroup = this.fb.group({
    doctorCode: ['', Validators.required],
    name: ['', Validators.required],
    qualification: ['', Validators.required],
    departmentId: ['', Validators.required],
    averageRating: [0, [Validators.min(0), Validators.max(5)]]
  });

  departments: any[] = []; // Holds department data
constructor(private departmentService: DepartmentService) {}
  ngOnInit() {
    this.fetchDepartments();
  }

  fetchDepartments() {
    this.departmentService.getDepartments().subscribe(
      data => {
        console.log('Departments received:', data);
        this.departments = data;
      },
      error => {
        console.error('Error fetching departments:', error);
      }
    );
  }

  onSubmit() {
    if (this.doctorForm.valid) {
      this.http.post('http://localhost:8082/doctors', this.doctorForm.value).subscribe({
        next: () => {
          alert('Doctor added successfully');
          this.router.navigate(['/departments']); // Redirect after adding
        },
        error: (err) => {
          console.error('Error adding doctor:', err);
          alert('Failed to add doctor');
        }
      });
    }
  }
}
