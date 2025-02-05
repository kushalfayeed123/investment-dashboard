import { Component, OnInit } from "@angular/core";
import { InvestmentService } from "src/app/investment.service";

@Component({
  selector: "app-deposit",
  templateUrl: "./deposit.component.html",
})
export class DepositComponent implements OnInit {
  currencies: any[] = [];
  selectedCurrency: any;
  depositAmount: number = 0;
  message: string = "";
  error: string = "";

  constructor(private investmentService: InvestmentService) {}

  ngOnInit() {
    this.investmentService.getCurrencies().subscribe({
      next: (data: any) => (this.currencies = data),
      error: (err) =>
        (this.error = err.error.error || "Error fetching currencies"),
    });
  }

  selectCurrency(currency: any) {
    this.selectedCurrency = currency;
  }

  confirmDeposit() {
    const uid = localStorage.getItem("uid");
    if (!uid) {
      this.error = "User not logged in";
      return;
    }
    if (!this.selectedCurrency || !this.depositAmount) {
      this.error = "Please select a currency and enter an amount";
      return;
    }
    const depositData = {
      uid,
      amount: this.depositAmount,
      currency: this.selectedCurrency.id,
    };
    this.investmentService.deposit(depositData).subscribe({
      next: (res) => {
        this.message = res.message;
        this.error = "";
      },
      error: (err) => (this.error = err.error.error || "Deposit failed"),
    });
  }
}
