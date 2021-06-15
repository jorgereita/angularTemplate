import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { DashboardPage } from '../dashboard/dashboard.page'
@Component({
  selector: 'app-all',
  templateUrl: './all.page.html',
  styleUrls: ['./all.page.scss'],
})
export class AllPage implements OnInit {

  requests = null;

  constructor(
    private dataService: DataService,
    private observer: DashboardPage,
    private router: Router
  ) { }

  ngOnInit() {
    this.dataService.myRequests().subscribe(data => {
      this.requests = data;
    });
  }
  reStartUnit(item) {
    this.router.navigate(["/main/new"]);
    setTimeout(() => {
      this.observer.observerUser$.next({ ...item });
      this.observer.observerUser$.next('');
    }, 500);
  }
}
