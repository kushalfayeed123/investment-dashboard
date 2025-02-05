import { Component } from "@angular/core";
import { InvestmentService } from "src/app/investment.service";

@Component({
  selector: "app-withdraw",
  templateUrl: "./withdraw.component.html",
})
export class WithdrawComponent {
  withdrawData = {
    amount: 0,
    currency: "",
  };
  message: string = "";
  error: string = "";
  availableCurrencies: any[] = [];

  constructor(private investmentService: InvestmentService) {
    this.investmentService.getCurrencies().subscribe({
      next: (data: any) => (this.availableCurrencies = data),
      error: (err) =>
        (this.error = err.error.error || "Error fetching currencies"),
    });
  }

  submitWithdraw() {
    const uid = localStorage.getItem("uid");
    if (!uid) {
      this.error = "User not logged in";
      return;
    }
    if (!this.withdrawData.currency || !this.withdrawData.amount) {
      this.error = "Please select a currency and enter an amount";
      return;
    }
    const data = { uid, ...this.withdrawData };
    this.investmentService.withdraw(data).subscribe({
      next: (res) => {
        this.message = res.message;
        this.error = "";
      },
      error: (err) => (this.error = err.error.error || "Withdrawal failed"),
    });
  }
}
