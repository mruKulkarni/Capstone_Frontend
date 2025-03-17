// import { Component } from '@angular/core';
// import { Router, NavigationEnd } from '@angular/router';
// import { RouterLink, RouterOutlet } from '@angular/router';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [RouterOutlet, RouterLink, CommonModule, FormsModule, ReactiveFormsModule],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.css'
// })
// export class AppComponent {
//   title = 'Appointment';
//   showNavbar: boolean = true; // Controls navbar visibility
//   userName: string = ''; 

//   constructor(private router: Router) {
//     this.router.events.subscribe((event) => {
//       if (event instanceof NavigationEnd) {
//         // Hide navbar if on login or registration page
//         this.showNavbar = !(event.url === '/login' || event.url === '/registration');
//         this.userName = localStorage.getItem('userName') || 'Guest'; 
//       }
//     });
//   }
// }

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, NavigationEnd, RouterOutlet, RouterLink } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterOutlet, RouterLink, CommonModule, FormsModule, ReactiveFormsModule]
})
export class AppComponent {
  userName: string | null = '';
  isAdmin: boolean = false;
  showNavbar: boolean = true;
  isNavbarOpen: boolean = false; // Track navbar state

  constructor(private router: Router) {}

  ngOnInit() {
    this.checkUserStatus();

    // Hide navbar on login and registration pages
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const noNavbarRoutes = ['/login', '/registration'];
      this.showNavbar = !noNavbarRoutes.includes(event.url);
    });
  }

  checkUserStatus() {
    this.userName = localStorage.getItem('userName');
    this.isAdmin = localStorage.getItem('userId') === 'admin@example.com';
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
    this.isNavbarOpen = false; // Close navbar on logout
  }

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen; // Toggle navbar state
  }

  closeNavbar() {
    this.isNavbarOpen = false; // Close navbar when a link is clicked
  }
}
