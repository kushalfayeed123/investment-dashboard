import { Component, OnInit, Input, OnChanges, SimpleChanges } from "@angular/core";
import {
  ApexNonAxisChartSeries,
  ApexChart,
  ApexResponsive,
  ApexLegend,
  ApexTitleSubtitle,
  ApexPlotOptions,
  ApexStroke,
  ApexDataLabels
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  responsive: ApexResponsive[];
  legend: ApexLegend;
  title: ApexTitleSubtitle;
  colors: string[];
  plotOptions: ApexPlotOptions;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
};

@Component({
  selector: "app-investment-distribution-chart",
  templateUrl: "./investment-distribution-chart.component.html",
  styleUrls: ["./investment-distribution-chart.component.css"],
})
export class InvestmentDistributionChartComponent implements OnInit, OnChanges {
  @Input() data: any;

  // Initialize with empty object to prevent template 'undefined' errors
  public chartOptions: Partial<ChartOptions> = {};

  constructor() {}

  ngOnInit(): void {
    this.initChart();
  }

  // This ensures the chart updates if data arrives late from an API
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && !changes['data'].firstChange) {
      this.initChart();
    }
  }

  initChart(): void {
    const distribution = this.data || {
      equities: 40,
      bonds: 30,
      alternatives: 20,
      realEstate: 5,
      commodities: 5,
    };

    this.chartOptions = {
      series: [
        Number(distribution.equities) || 0,
        Number(distribution.bonds) || 0,
        Number(distribution.alternatives) || 0,
        Number(distribution.realEstate) || 0,
        Number(distribution.commodities) || 0,
      ],
      chart: {
        type: "donut", // Donut looks more premium than Pie
        height: 350,
        fontFamily: 'inherit',
        animations: { enabled: true }
      },
      labels: ["Equities", "Bonds", "Alternatives", "Real Estate", "Commodities"],
      colors: ["#590202", "#a61103", "#000000", "#333333", "#555555"],
      stroke: {
        show: true,
        width: 2,
        colors: ["#ffffff"]
      },
      dataLabels: { enabled: false },
      plotOptions: {
        pie: {
          donut: {
            size: "75%",
            labels: {
              show: true,
              total: {
                show: true,
                label: "Assets",
                color: "#a1a1aa",
                formatter: () => "Portfolio"
              }
            }
          }
        }
      },
      legend: {
        show: true,
        position: "bottom", // Better for mobile responsiveness
      },
      responsive: [
        {
          breakpoint: 600,
          options: {
            legend: { position: "bottom" }
          }
        }
      ]
    };
  }
}