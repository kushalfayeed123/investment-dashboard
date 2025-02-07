import { Component, OnInit } from "@angular/core";
import { interval } from "rxjs";

@Component({
  selector: "app-crypto-chart",
  templateUrl: "./crypto-chart.component.html",
  styleUrls: ["./crypto-chart.component.css"],
})
export class CryptoChartComponent implements OnInit {
  cryptoData: any[] = [];
  colorScheme: any;
  stockPrices: any[] = [];
  transactions: any[] = [];
  error!: string;

  constructor() {}

  ngOnInit(): void {
    // Sample user data (if needed)
    // this.userData = { name: "John Doe", email: "john@example.com", ... };

    // Updated data for cryptoData with more coins and more data points
    this.cryptoData = [
      {
        name: "Bitcoin",
        series: [
          { name: "Jan", value: 40000 },
          { name: "Feb", value: 42000 },
          { name: "Mar", value: 45000 },
          { name: "Apr", value: 43000 },
          { name: "May", value: 47000 },
          { name: "Jun", value: 49000 },
          { name: "Jul", value: 48000 },
          { name: "Aug", value: 50000 },
          { name: "Sep", value: 52000 },
          { name: "Oct", value: 51000 },
          { name: "Nov", value: 53000 },
          { name: "Dec", value: 55000 },
        ],
      },
      {
        name: "Ethereum",
        series: [
          { name: "Jan", value: 3000 },
          { name: "Feb", value: 3100 },
          { name: "Mar", value: 3200 },
          { name: "Apr", value: 3150 },
          { name: "May", value: 3300 },
          { name: "Jun", value: 3400 },
          { name: "Jul", value: 3350 },
          { name: "Aug", value: 3500 },
          { name: "Sep", value: 3600 },
          { name: "Oct", value: 3550 },
          { name: "Nov", value: 3700 },
          { name: "Dec", value: 3800 },
        ],
      },
      {
        name: "Ripple",
        series: [
          { name: "Jan", value: 0.5 },
          { name: "Feb", value: 0.55 },
          { name: "Mar", value: 0.52 },
          { name: "Apr", value: 0.53 },
          { name: "May", value: 0.58 },
          { name: "Jun", value: 0.6 },
          { name: "Jul", value: 0.57 },
          { name: "Aug", value: 0.62 },
          { name: "Sep", value: 0.65 },
          { name: "Oct", value: 0.63 },
          { name: "Nov", value: 0.66 },
          { name: "Dec", value: 0.68 },
        ],
      },
      {
        name: "Litecoin",
        series: [
          { name: "Jan", value: 150 },
          { name: "Feb", value: 160 },
          { name: "Mar", value: 155 },
          { name: "Apr", value: 158 },
          { name: "May", value: 162 },
          { name: "Jun", value: 170 },
          { name: "Jul", value: 168 },
          { name: "Aug", value: 172 },
          { name: "Sep", value: 175 },
          { name: "Oct", value: 174 },
          { name: "Nov", value: 178 },
          { name: "Dec", value: 180 },
        ],
      },
      {
        name: "Cardano",
        series: [
          { name: "Jan", value: 1.2 },
          { name: "Feb", value: 1.25 },
          { name: "Mar", value: 1.3 },
          { name: "Apr", value: 1.28 },
          { name: "May", value: 1.35 },
          { name: "Jun", value: 1.38 },
          { name: "Jul", value: 1.36 },
          { name: "Aug", value: 1.4 },
          { name: "Sep", value: 1.42 },
          { name: "Oct", value: 1.41 },
          { name: "Nov", value: 1.45 },
          { name: "Dec", value: 1.5 },
        ],
      },
      {
        name: "Polkadot",
        series: [
          { name: "Jan", value: 20 },
          { name: "Feb", value: 22 },
          { name: "Mar", value: 21 },
          { name: "Apr", value: 23 },
          { name: "May", value: 24 },
          { name: "Jun", value: 25 },
          { name: "Jul", value: 24 },
          { name: "Aug", value: 26 },
          { name: "Sep", value: 27 },
          { name: "Oct", value: 26 },
          { name: "Nov", value: 28 },
          { name: "Dec", value: 29 },
        ],
      },
    ];

    // Expanded color scheme to include enough colors for all series
    this.colorScheme = {
      domain: [
        "#f7931a", // Bitcoin Orange
        "#627eea", // Ethereum Blue
        "#00aae4", // Ripple Blue
        "#bebebe", // Litecoin Gray
        "#0033ad", // Cardano Blue
        "#e6007a", // Polkadot Pink
      ],
    };  

    // Updated stockPrices with additional stocks
    this.stockPrices = [
      { name: "AAPL", price: 150 },
      { name: "GOOGL", price: 2800 },
      { name: "AMZN", price: 3500 },
      { name: "MSFT", price: 300 },
      { name: "TSLA", price: 800 },
      { name: "FB", price: 340 },
      { name: "NFLX", price: 550 },
      { name: "NVDA", price: 220 },
      { name: "BABA", price: 160 },
      { name: "ORCL", price: 90 },
      { name: "INTC", price: 50 },
      { name: "IBM", price: 140 },
    ];

    // Sample transactions data remains the same
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
    ];

    this.error = "";

    // Optionally, simulate live updates (if desired)
    interval(5000).subscribe(() => {
      this.updateChartData();
    });
  }

  updateChartData() {
    // For each crypto series, add a new data point with a random fluctuation
    this.cryptoData = this.cryptoData.map((series) => {
      const lastPoint = series.series[series.series.length - 1];
      const newValue = Math.round(
        lastPoint.value + (Math.random() * 1000 - 500)
      );
      const newPoint = {
        name: new Date().toLocaleTimeString(),
        value: newValue,
      };
      // Optionally maintain a fixed number of points (e.g., latest 12)
      const updatedSeries = [...series.series, newPoint];
      if (updatedSeries.length > 12) {
        updatedSeries.shift();
      }
      return { ...series, series: updatedSeries };
    });
  }
}
