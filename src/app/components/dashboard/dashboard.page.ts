import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router, RouterEvent, RouterStateSnapshot } from '@angular/router';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from 'src/app/services/data.service';
import { ImainMenu } from './dashboard.interface'
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
 
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  private _transformer = (node: ImainMenu, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.title,
      icon: node.icon,
      level: level,
      url: node.url
    };
  }
  public active_route = this.router.url;
  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);


  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  public labels = ['Salir'];
  public user_name = localStorage.getItem('user');
  public ios = this.platform.is('ipad')
  constructor(
    public translate: TranslateService,
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private stateRoute: ActivatedRoute,
    public platform: Platform,
    
  ) {
 
  this.router.events.subscribe((event: RouterEvent) => {
    if (event instanceof NavigationEnd && (event.url === '/main/new' )) {
      this.observerStateNew$.next(true);
     }
  });
  }
  public observerUser$ = new BehaviorSubject<any>('');
  public observerStateNew$ = new BehaviorSubject<any>('');

  public user2Consult() {
    return this.observerUser$.asObservable();
  }
  public resetStateNew() {
    return this.observerStateNew$.asObservable();
  }
  ngOnInit(): void {
    this.dataService.helpersMenu().subscribe(data => {
      this.dataSource.data = data
    });
    this.dataService.helpersOptions().subscribe(data => { 
      this.dataService.options$.next([...data]);
    });
    
  }
  simClick(item){
    document.getElementById(item).click();
  }
  classSelected(node){
    if(this.active_route == node.url){
      return "active-item-menu"
    } 
    return ""
  }
  routeMain(node) {
    this.router.navigate([node.url]);
    this.active_route = node.url;
    localStorage.setItem("route", node.name);
  }

  logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("expired");
    localStorage.removeItem("roleId");
    this.router.navigate(["/login"]);
  }
}
