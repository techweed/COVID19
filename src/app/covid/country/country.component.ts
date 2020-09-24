import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  Confirmed;
  Deaths;
  Recovered;
  Active;
  Date;



  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'line';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Confirmed' },
    { data: [], label: 'Active' },
    { data: [], label: 'Recovered' },
    { data: [], label: 'Deaths' }

  ];

  constructor(private activateRouter: ActivatedRoute) { }

  @Input() cv2: any;
  @Input() chartTypeLine: any;


  ngOnInit(): void {
    // console.log(this.cv2)
    this.barChartType = this.chartTypeLine ? 'line':'bar';
    this.Confirmed = this.cv2.map(({ Confirmed }) => Confirmed);
    this.Active = this.cv2.map(({ Active }) => Active);
    this.Recovered = this.cv2.map(({ Recovered }) => Recovered);
    this.Deaths = this.cv2.map(({ Deaths }) => Deaths);
    this.Date = this.cv2.map(({ Date }) => Date);
    // this.Confirmed = this.Confirmed.map(String);
    // console.log(this.Confirmed);
    this.barChartLabels = this.Date;
    this.barChartOptions = {
      title: {
        text: this.cv2[0].Country,
        display: true
      }
    };
    this.barChartData = [
      { data: this.Confirmed, label: 'Cases' },
      { data: this.Active, label: 'Active' },
      { data: this.Recovered, label: 'Recover' },
      { data: this.Deaths, label: 'Death' }

    ];
  }

}
