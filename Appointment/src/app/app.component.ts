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
  title(title: any) {
    throw new Error('Method not implemented.');
  }
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
      const noNavbarRoutes = ['/login', '/registration', '/'];
      this.showNavbar = !noNavbarRoutes.includes(event.url);
    });
  }

  checkUserStatus() {
    this.userName = localStorage.getItem('userName');
    this.isAdmin = localStorage.getItem('userId') === 'admin@example.com';
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
    this.isNavbarOpen = false; // Close navbar on logout
  }

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen; // Toggle navbar state
  }

  closeNavbar() {
    this.isNavbarOpen = false; // Close navbar when a link is clicked
  }
}
