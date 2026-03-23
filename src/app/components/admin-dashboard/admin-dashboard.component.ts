import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, forkJoin } from "rxjs";
import { InvestmentService } from "src/app/investment.service";


interface Transaction {
  id: string;
  uid: string;
  type: "deposit" | "withdraw";
  amount: number;
  currency?: string;
  status: "approved" | "pending" | "rejected";
  createdAt: any;
  approvedAt?: { _seconds: number; _nanoseconds: number };
  userName?: string; // New field to store user's name
}
@Component({
  selector: "app-admin-dashboard",
  templateUrl: "./admin-dashboard.component.html",
  styleUrls: ["./admin-dashboard.component.css"],
})
export class AdminDashboardComponent implements OnInit {
  users: any[] = [];
  error: string = "";
  message: string = "";
  transactions: any[] = []; // This should be populated from your service/API
  totalBalance: number = 0;

  constructor(
    private router: Router,
    private investmentService: InvestmentService
  ) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.investmentService.getAllUsers().subscribe(
      (res: any[]) => {
        // Define the list of allowed names
        const allowedNames = [
          'ryland reese',
          'george l hughes',
          'alonzo scurlock',
          'ryan marsh',
          'glenn'
        ];

        // Unix timestamp for Feb 1, 2026 (Users created after Jan 2026)
        const cutoffSeconds = 1771665000;
        const excludedEmail = 'segunajanaku617@gmail.com';

        this.users = res.filter(user => {
          // 1. Normalize data for comparison
          const userName = user.name?.toLowerCase().trim() || '';
          const userEmail = user.email?.toLowerCase().trim() || '';
          const userSeconds = user.createdAt?._seconds || 0;

          // 2. Define the conditions
          const isAllowedName = allowedNames.includes(userName);
          const isRecentUser = userSeconds >= cutoffSeconds;
          const isNotExcludedEmail = userEmail !== excludedEmail;

          // 3. Combine: (Name OR Date) AND Not the excluded email
          return (isAllowedName || isRecentUser) && isNotExcludedEmail;
        });
        // this.users = res;

        this.loadTransactions();
      },
      (err) => {
        this.error = "Failed to fetch users";
      }
    );
  }

  goToUserDetails(user: any): void {
    // Navigate to the User Details component with the selected user's uid
    this.router.navigate(["/user-details", user.uid]);
  }

  searchTerm: string = '';

  get filteredUsers() {
    return this.users.filter(user =>
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  calculateBalance() {
    this.totalBalance = this.transactions.reduce((acc, transaction) => {
      if (transaction.type === 'deposit') {
        return acc + transaction.amount;
      } else if (transaction.type === 'withdraw') {
        return acc - transaction.amount;
      }
      return acc;
    }, 0);
  }

  async loadTransactions() {
    this.investmentService.getAllTransactions().subscribe({
      next: (response) => {
        if (response.length === 0) {
          this.transactions = [];
          return;
        } else {
          this.transactions = response
        }

        this.calculateBalance();
      },

      error: () => (this.error = "Failed to load transactions"),
    });
  }
}
