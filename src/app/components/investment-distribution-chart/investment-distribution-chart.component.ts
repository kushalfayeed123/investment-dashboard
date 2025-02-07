import { Component, Input, OnChanges } from "@angular/core";
import { Color, ScaleType } from "@swimlane/ngx-charts";

@Component({
  selector: "app-investment-distribution-chart",
  templateUrl: "./investment-distribution-chart.component.html",
  styleUrls: ["./investment-distribution-chart.component.css"],
})
export class InvestmentDistributionChartComponent implements OnChanges {
  @Input() data: any; // Expected format: { equities: number, bonds: number, alternatives: number }
  chartData: any[] = [];

  // A color scheme that reflects typical asset classes
  colorScheme: any;

  ngOnChanges() {
    this.colorScheme = {
      domain: ["#34A853", "#EA4335"], // Green for return, red for volatility
    };
    // Transform input object to an array for ngx-charts
    if (this.data) {
      this.chartData = [
        { name: "Equities", value: this.data.equities || 1 },
        { name: "Bonds", value: this.data.bonds || 1 },
        { name: "Alternatives", value: this.data.alternatives || 1 },
      ];
    } else {
      // Default values if no data is provided
      this.chartData = [
        { name: "Equities", value: 40 },
        { name: "Bonds", value: 30 },
        { name: "Alternatives", value: 30 },
      ];
    }
  }
}
