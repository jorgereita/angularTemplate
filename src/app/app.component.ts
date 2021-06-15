import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(
    public translate: TranslateService,
    private router: Router,
  ) {
    this.translate.addLangs(['es']);
    this.translate.use('es');
  }
}
