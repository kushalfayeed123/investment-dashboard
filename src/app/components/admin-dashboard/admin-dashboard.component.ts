import { Component, OnInit } from "@angular/core";
import { InvestmentService } from "src/app/investment.service";

@Component({
  selector: "app-admin-dashboard",
  templateUrl: "./admin-dashboard.component.html",
})
export class AdminDashboardComponent implements OnInit {
  users: any[] = [];
  error: string = "";
  message: string = "";

  constructor(private investmentService: InvestmentService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.investmentService.getAllUsers().subscribe({
      next: (data: any) => (this.users = data),
      error: (err) => (this.error = err.error.error || "Error fetching users"),
    });
  }

  approveDeposit(transactionId: string, approved: boolean) {
    this.investmentService
      .approveDeposit({ transactionId, approved })
      .subscribe({
        next: (res) => {
          this.message = res.message;
          this.error = "";
        },
        error: (err) => (this.error = err.error.error || "Operation failed"),
      });
  }
}
