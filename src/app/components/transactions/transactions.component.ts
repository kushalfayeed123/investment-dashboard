import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router"; // assuming use of Angular Router

@Component({
  selector: "app-transactions",
  templateUrl: "./transactions.component.html",
  styleUrls: ["./transactions.component.css"],
})
export class TransactionsComponent implements OnInit {
  transactions: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Replace with real API/service call as needed.
    this.transactions = [
      {
        type: "Deposit",
        amount: 500,
        currency: "USD",
        status: "approved",
        createdAt: new Date(),
      },
      {
        type: "Withdrawal",
        amount: 200,
        currency: "USD",
        status: "pending",
        createdAt: new Date(),
      },
      // Add additional transactions as needed.
    ];
  }

  goBack() {
    // Navigate back to the dashboard.
    this.router.navigate(["/dashboard"]);
  }
}
