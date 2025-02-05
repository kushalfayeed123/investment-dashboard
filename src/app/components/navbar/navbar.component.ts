import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
})
export class NavbarComponent {
  isOpen: boolean = false;
  constructor(private router: Router) {}

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  logout() {
    localStorage.removeItem("uid");
    this.router.navigate(["/login"]);
  }
}
