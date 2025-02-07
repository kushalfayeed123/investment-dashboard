import { Component, Input, OnChanges } from "@angular/core";

@Component({
  selector: "app-performance-summary-chart",
  templateUrl: "./performance-summary-chart.component.html",
  styleUrls: ["./performance-summary-chart.component.css"],
})
export class PerformanceSummaryChartComponent implements OnChanges {
  @Input() data: any;
  // Expected data format: {
  //   annualReturn: number,
  //   volatility: number,
  //   maxDrawdown: number,
  //   sharpeRatio: number,
  //   beta: number
  // }
  chartData: any[] = [];
  colorScheme: any;

  ngOnChanges() {
    // Updated color scheme to align with your branding:
    // Primary red (#590202), secondary red (#a61103), then black and dark grays.
    this.colorScheme = {
      domain: ["#590202", "#a61103", "#000000", "#333333", "#555555"],
    };

    if (this.data) {
      this.chartData = [
        { name: "Annual Return (%)", value: this.data.annualReturn || 8 },
        { name: "Volatility (%)", value: this.data.volatility || 12 },
        { name: "Max Drawdown (%)", value: this.data.maxDrawdown || 10 },
        { name: "Sharpe Ratio", value: this.data.sharpeRatio || 1.5 },
        { name: "Beta", value: this.data.beta || 0.95 },
      ];
    } else {
      // Default fallback values if no data is provided.
      this.chartData = [
        { name: "Annual Return (%)", value: 8 },
        { name: "Volatility (%)", value: 12 },
        { name: "Max Drawdown (%)", value: 10 },
        { name: "Sharpe Ratio", value: 1.5 },
        { name: "Beta", value: 0.95 },
      ];
    }
  }
}
