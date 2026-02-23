import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { InvestmentService } from "src/app/investment.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
})
export class NavbarComponent implements OnInit {
  isOpen: boolean = false;
  role: string = "";
  isSidebarOpen = false;
  username: string = "Loading..."; // Default state

  error: string = ''

  constructor(private router: Router, private investmentService: InvestmentService
  ) { }

  ngOnInit(): void {
    this.role = localStorage.getItem("role") ?? "";
    const uid = localStorage.getItem("uid");

    if (uid) {
      this.fetchUserDetails(uid);
    }
  }

  fetchUserDetails(uid: string): void {
    this.investmentService.getUserDetails(uid).subscribe(
      (res: any) => {
        this.username = res.name;

      },
      (err) => {
        this.error = "Failed to fetch user details";
      }
    );
  }

  getInitials(name: string): string {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) : '??';
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  logout() {
    localStorage.clear(); // Clears everything including uid and role
    this.router.navigate(["/login"]);
  }
}
