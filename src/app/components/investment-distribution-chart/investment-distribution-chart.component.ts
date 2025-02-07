import { Component, Input, OnChanges } from "@angular/core";

@Component({
  selector: "app-investment-distribution-chart",
  templateUrl: "./investment-distribution-chart.component.html",
  styleUrls: ["./investment-distribution-chart.component.css"],
})
export class InvestmentDistributionChartComponent implements OnChanges {
  @Input() data: any;
  // Expected format:
  // { equities: number, bonds: number, alternatives: number, realEstate?: number, commodities?: number }

  chartData: any[] = [];
  colorScheme: any;

  ngOnChanges() {
    // Updated color scheme to align with your branding
    this.colorScheme = {
      domain: [
        "#590202", // Equities
        "#a61103", // Bonds
        "#000000", // Alternatives
        "#333333", // Real Estate
        "#555555", // Commodities
      ],
    };

    if (this.data) {
      this.chartData = [
        { name: "Equities", value: this.data.equities || 40 },
        { name: "Bonds", value: this.data.bonds || 30 },
        { name: "Alternatives", value: this.data.alternatives || 20 },
        { name: "Real Estate", value: this.data.realEstate || 5 },
        { name: "Commodities", value: this.data.commodities || 5 },
      ];
    } else {
      // Default fallback values if no data is provided
      this.chartData = [
        { name: "Equities", value: 40 },
        { name: "Bonds", value: 30 },
        { name: "Alternatives", value: 20 },
        { name: "Real Estate", value: 5 },
        { name: "Commodities", value: 5 },
      ];
    }
  }
}
