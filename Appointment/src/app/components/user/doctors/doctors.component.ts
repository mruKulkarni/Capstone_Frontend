import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnChanges {
  @Input() doctors: any[] = [];

  constructor() {
    console.log("DoctorComponent initialized!"); // ✅ Debugging log
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['doctors'] && changes['doctors'].currentValue) {
      console.log("Doctors received in DoctorComponent:", JSON.stringify(changes['doctors'].currentValue, null, 2)); // ✅ Stringify doctors
    }
  }
}
