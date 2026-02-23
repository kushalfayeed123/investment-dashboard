import { Component, OnInit, Input, OnChanges, SimpleChanges } from "@angular/core";
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexStroke,
  ApexXAxis,
  ApexResponsive,
  ApexYAxis,
  ApexPlotOptions
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  responsive: ApexResponsive[];
  colors: string[];
  plotOptions: ApexPlotOptions;
};

@Component({
  selector: "app-performance-summary-chart",
  templateUrl: "./performance-summary-chart.component.html",
  styleUrls: ["./performance-summary-chart.component.css"],
})
export class PerformanceSummaryChartComponent implements OnInit, OnChanges {
  @Input() data: any;
  public chartOptions: Partial<ChartOptions> = {};

  ngOnInit(): void {
    this.initChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && !changes['data'].firstChange) {
      this.initChart();
    }
  }

  initChart(): void {
    const inputData = this.data || {
      annualReturn: 8,
      volatility: 12,
      maxDrawdown: 10,
      sharpeRatio: 1.5,
      beta: 0.95,
    };

    this.chartOptions = {
      series: [{
        name: "Performance",
        data: [
          inputData.annualReturn,
          inputData.volatility,
          inputData.maxDrawdown,
          inputData.sharpeRatio,
          inputData.beta
        ]
      }],
      chart: {
        type: "bar",
        height: 350,
        width: "100%", // Let CSS handle the width
        toolbar: { show: false },
        fontFamily: 'inherit'
      },
      plotOptions: {
        bar: {
          horizontal: true, // Horizontal bars fit text labels much better on mobile
          borderRadius: 8,
          columnWidth: '50%',
          distributed: true // Allows different colors for each bar
        }
      },
      colors: ["#590202", "#a61103", "#09090b", "#27272a", "#52525b"],
      dataLabels: {
        enabled: true,
        textAnchor: 'start',
        style: { colors: ['#fff'] },
        formatter: (val, opt) => {
          return val + (opt.dataPointIndex < 3 ? '%' : ''); // Add % to first 3 metrics
        }
      },
      xaxis: {
        categories: ["Return", "Volatility", "Drawdown", "Sharpe", "Beta"],
        labels: { show: false }, // Hide axis for a cleaner "metric" look
        axisBorder: { show: false }
      },
      yaxis: {
        labels: {
          style: { fontWeight: 700, colors: "#71717a" }
        }
      },
      stroke: { show: false },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: { height: 300 },
          plotOptions: { bar: { borderRadius: 4 } }
        }
      }]
    };
  }
}