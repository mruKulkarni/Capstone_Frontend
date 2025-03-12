import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { DepartmentService } from '../../../services/department.service';
import { DepartmentFilterPipe } from '../../../pipes/department-search.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-departments',
  standalone: true,
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css'],
  imports: [CommonModule, FormsModule, DepartmentFilterPipe]
})
export class DepartmentsComponent implements OnInit {
  departments: any[] = [];
  searchText: string = ''; 

  constructor(private departmentService: DepartmentService) {}

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments() {
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

  onDepartmentClick(department: any) {
    console.log('Clicked Department:', department);
    alert(`You selected: ${department.name}`);
  }
}
