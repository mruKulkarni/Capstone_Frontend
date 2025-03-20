import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  profile: any = {};
  userEmail: string | null = null;
  isEditing: boolean = false;
  calculatedAge: number | null = null; // Holds calculated age

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.getUserEmail();
    if (this.userEmail) {
      this.loadProfile();
    }
  }

  getUserEmail() {
    this.userEmail = localStorage.getItem('userId');
    if (!this.userEmail) {
      console.error("No user email found. Redirecting to login...");
      return;
    }
  }

  loadProfile() {
    if (!this.userEmail) return;

    this.profileService.getProfile(this.userEmail).subscribe(
      (data) => {
        //("API Response:", data);
        this.profile = data;
        if (this.profile.dateOfBirth || this.profile.date_of_birth) {
          this.calculatedAge = this.calculateAge(this.profile.dateOfBirth || this.profile.date_of_birth);
        }
      },
      (error) => {
        console.error("Error fetching profile", error);
      }
    );
  }

  calculateAge(dob: string): number {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // If birth month and day are ahead of today's month and day, subtract 1 from age
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  saveProfile() {
    this.profileService.updateProfile(this.profile.email, this.profile).subscribe(
      () => {
        //console.log("Profile updated successfully");
        this.isEditing = false;
        // Recalculate age after saving DOB changes
        if (this.profile.dateOfBirth || this.profile.date_of_birth) {
          this.calculatedAge = this.calculateAge(this.profile.dateOfBirth || this.profile.date_of_birth);
        }
      },
      (error) => {
        console.error("Error updating profile", error);
      }
    );
  }
}
