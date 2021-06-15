import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

import * as Highcharts from 'highcharts';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'app-overview',
  templateUrl: './overview.page.html',
  styleUrls: ['./overview.page.scss'],
})
export class OverviewPage implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit() {

    this.dataService.reportingInd(1).subscribe(data => {
      Highcharts.chart('container1', data);
    });

    this.dataService.reportingInd(2).subscribe(data => {
      Highcharts.chart('container2', data);
    });

    this.dataService.reportingInd(3).subscribe(data => {
      Highcharts.chart('container3', data);
    });

    this.dataService.reportingInd(4).subscribe(data => {
      Highcharts.chart('container4', data);
    });
  }

}
