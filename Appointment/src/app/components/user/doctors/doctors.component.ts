import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnChanges {
  @Input() doctors: any[] = [];

  constructor() {
    //console.log("DoctorComponent initialized!"); // ✅ Debugging log
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['doctors'] && changes['doctors'].currentValue) {
      //console.log("Doctors received in DoctorComponent:", JSON.stringify(changes['doctors'].currentValue, null, 2)); // ✅ Stringify doctors
    }
  }

  bookAppointment(doctor: any) {
    alert(`Booking appointment for ${doctor.name}`);
    // Navigate to booking page or open a modal here
  }
}
