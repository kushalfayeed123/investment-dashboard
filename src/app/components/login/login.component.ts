import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { InvestmentService } from "src/app/investment.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent {
  email: string = "";
  password: string = "";
  error: string = "";

  constructor(
    private router: Router,
    private investmentService: InvestmentService
  ) {}

  login() {
    if (this.email.trim() && this.password.trim()) {
      const credentials = {
        email: this.email,
        password: this.password,
      };

      this.investmentService.login(credentials).subscribe({
        next: (res: any) => {
          // Store the UID and authentication token in localStorage
          localStorage.setItem("uid", res.uid);
          localStorage.setItem("idToken", res.idToken); // Store the idToken as well
          if (res.role == "Admin") {
            this.router.navigate(["/admin"]);
          } else {
            this.router.navigate(["/dashboard"]);
          }
        },
        error: (err) => {
          this.error = err.error.error || "Login failed";
        },
      });
    } else {
      this.error = "Please enter both email and password.";
    }
  }
}
