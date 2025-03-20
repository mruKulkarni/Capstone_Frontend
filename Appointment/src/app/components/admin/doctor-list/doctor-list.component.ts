import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css'],
  imports: [CommonModule]
})
export class DoctorListComponent implements OnInit {
  doctors: any[] = [];
  docNotFoundError: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadDoctors();
  }

  loadDoctors() {
    this.http.get<any[]>('/api/admin/doctors').subscribe(data => {
      this.doctors = data;
    });
  }

  deleteDoctor(id: number) {
    if (confirm('Are you sure you want to delete this doctor?')) {
      this.http.delete(`/doctors/${id}`).subscribe({next:() => {
        //alert('Doctor deleted successfully');
        this.loadDoctors(); // Refresh the list
      }, error: error => {
        //alert('Failed to delete doctor');
        this.docNotFoundError = true;
      }});
    }
  }
}
