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
        console.log("API Response:", data);
        this.profile = data;
      },
      (error) => {
        console.error("Error fetching profile", error);
      }
    );
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  saveProfile() {
    this.profileService.updateProfile(this.profile.email, this.profile).subscribe(
      () => {
        console.log("Profile updated successfully");
        this.isEditing = false;
      },
      (error) => {
        console.error("Error updating profile", error);
      }
    );
  }
}
