import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DepartmentService } from '../../../services/department.service';
import { CommonModule } from '@angular/common'; // ✅ Import CommonModule
import { DoctorComponent } from '../doctors/doctors.component';

@Component({
  selector: 'app-department-detail',
  standalone: true, // ✅ Ensure standalone is set
  templateUrl: './department-detail.component.html',
  styleUrls: ['./department-detail.component.css'],
  imports: [CommonModule, DoctorComponent] // ✅ Import DoctorComponent here
})
export class DepartmentDetailComponent implements OnInit {
  departmentId!: number;
  doctors: any[] = []; // ✅ Ensure doctors is declared
  

  constructor(private route: ActivatedRoute, private departmentService: DepartmentService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.departmentId = Number(this.route.snapshot.paramMap.get('id'));
    this.getDoctorsByDepartment(this.departmentId);
  }

  getDoctorsByDepartment(id: number) {
    console.log("Calling API for doctors...");

    this.departmentService.getDoctorByDepartment(id).subscribe({
      next:(response) => {
        console.log("Raw API Response:", response);

        if (Array.isArray(response) && response.length > 0) {
          this.doctors = response;
        } else {
          this.doctors = [];
        }

        console.log("Doctors extracted in DepartmentDetailComponent:", this.doctors);

        this.cdr.detectChanges(); // ✅ Force Angular to update UI
      },
      error: (error) => {
        console.error("Error fetching doctors:", error);
      }}
    );
  }
}
