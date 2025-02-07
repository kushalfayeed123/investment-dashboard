import { Component, Input, OnChanges } from "@angular/core";

@Component({
  selector: "app-performance-summary-chart",
  templateUrl: "./performance-summary-chart.component.html",
  styleUrls: ["./performance-summary-chart.component.css"],
})
export class PerformanceSummaryChartComponent implements OnChanges {
  @Input() data: any; // Expected format: { annualReturn: number, volatility: number }
  chartData: any[] = [];
  colorScheme: any;

  // Use a color scheme that distinguishes performance metrics

  ngOnChanges() {
    this.colorScheme = {
      domain: ["#34A853", "#EA4335"], // Green for return, red for volatility
    };
    if (this.data) {
      this.chartData = [
        { name: "Annual Return (%)", value: this.data.annualReturn || 1 },
        { name: "Volatility (%)", value: this.data.volatility || 1 },
      ];
    } else {
      // Default fallback values
      this.chartData = [
        { name: "Annual Return (%)", value: 8 },
        { name: "Volatility (%)", value: 12 },
      ];
    }
  }
}
