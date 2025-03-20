import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DepartmentService } from '../../../services/department.service';
 // Import the DepartmentService

@Component({
  selector: 'app-add-department',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent {
  departmentForm: FormGroup;
  successMessage: boolean = false;
  errorMessage: boolean = false;
  
  // Inject Router and DepartmentService into the constructor
  constructor(private fb: FormBuilder, private router: Router, private departmentService: DepartmentService) {
    this.departmentForm = this.fb.group({
      departmentName: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  addDepartment() {
    if (this.departmentForm.valid) {
      const departmentName = this.departmentForm.value.departmentName;

      this.departmentService.addDepartment(departmentName).subscribe({
        next:(response) => {
          // Success logic
          this.successMessage = true;
          this.errorMessage = false;
          this.goToDepartmentList();
        },
        error:(error) => {
          // Error handling
          this.successMessage = false;
          this.errorMessage = true;
        }
      });
    } else {
      this.successMessage = false;
      this.errorMessage = true;
    }
  }

  goToDepartmentList() {
    // Use this.router to navigate
    this.router.navigate(['/departments']);
  }
}
