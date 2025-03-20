import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { DepartmentService } from '../../../services/department.service';
import { DepartmentFilterPipe } from '../../../pipes/department-search.pipe';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-departments',
  standalone: true,
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css'],
  imports: [CommonModule, FormsModule, DepartmentFilterPipe, HttpClientModule]
})
export class DepartmentsComponent implements OnInit {
  departments: any[] = [];
  searchText: string = ''; 

  constructor(private departmentService: DepartmentService, private router: Router) {}

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments() {
    this.departmentService.getDepartments().subscribe(
      data => {
        //console.log('Departments received:', data);
  
        this.departments = data.map(department => ({
          ...department,
          isDisabled: department.hasDoctors === false // Disable if hasDoctors is false
        }));
  
        //console.log('Updated departments:', this.departments);
      },
      error => {
        console.error('Error fetching departments:', error);
      }
    );
  }
  

  onDepartmentClick(department: any) {
    if (!department.isDisabled) {
      //console.log('Navigating to department:', department);
      this.router.navigate(['/departments', department.id]);
    } else {
      //console.log('Department is disabled, cannot navigate.');
    }
  }
}
