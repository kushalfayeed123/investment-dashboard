import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { InvestmentService } from "src/app/investment.service";

@Component({
  selector: "app-user-dashboard",
  templateUrl: "./user-dashboard.component.html",
})
export class UserDashboardComponent implements OnInit {
  userData: any;
  error: string = "";
  transactions: any[] = [];

  constructor(
    private investmentService: InvestmentService,
    private router: Router
  ) {}

  convertTimestampToDate(seconds: number, nanoseconds: number): Date {
    // Firebase timestamp is in seconds, so multiply by 1000 to get milliseconds
    const milliseconds = seconds * 1000 + nanoseconds / 1000000;
    return new Date(milliseconds);
  }

  ngOnInit() {
    const uid = localStorage.getItem("uid");
    if (uid) {
      this.investmentService.getDashboard().subscribe({
        next: (data) => (this.userData = data),
        error: (err) =>
          (this.error = err.error.error || "Error loading dashboard"),
      });
      this.fetchTransactions(uid);
    }
  }

  fetchTransactions(userId: string): void {
    this.investmentService.getTransactionsByUserId(userId).subscribe({
      next: (response) =>
        (this.transactions = response.map((transaction: any) => {
          const createdAtDate = this.convertTimestampToDate(
            transaction.createdAt._seconds,
            transaction.createdAt._nanoseconds
          );
          return { ...transaction, createdAt: createdAtDate };
        })),
      error: (error) => (this.error = "Failed to load transactions"),
    });
  }

  getCardClass(index: number): string {
    const colors = [
      "bg-blue-100",
      "bg-green-100",
      "bg-yellow-100",
      "bg-red-100",
      "bg-purple-100",
    ];
    return colors[index % colors.length];
  }

  navigateToDeposit(): void {
    this.router.navigate(["/deposit"]);
  }

  navigateToWithdraw(): void {
    this.router.navigate(["/withdraw"]);
  }
}
