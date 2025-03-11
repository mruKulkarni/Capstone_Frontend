import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  profile: any;
  userEmail: string = "john@example.com";

  constructor(private profileService: ProfileService){};

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(){
    this.profileService.getProfile(this.userEmail).subscribe(
      (data) => {
        console.log("API response: ", data);
        this.profile = data;
      },
      (error) => {
        console.error("Error fetching profile", error);
      }
    );
  }
}
