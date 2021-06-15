import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatTabGroup } from '@angular/material/tabs';
import { AlertController, LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { DashboardPage } from '../dashboard/dashboard.page'
import { IUserItem } from './useritem.interface';
@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {
  public demo1TabIndex = 0;
  public loginForm: FormGroup;
  public requestId
  formInitial: Object;
  formBasicData: Object;
  itemDetail: IUserItem;
  public isLoading: boolean;
  procesStep


  async present() {
    this.isLoading = true;
    return await this.loadingController.create({
    }).then(a => {
      a.present().then(() => {
        if (!this.isLoading) {
          a.dismiss();
        }
      });
    });
  }

  async dismiss() {
    this.isLoading = false;
    const popover = await this.loadingController.getTop();
    if (popover) {
      return await this.loadingController.dismiss();
    }
  }

  async presentAlert(e) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: this.translate.instant('COMMONS.ALERT'),
      subHeader: '',
      message: e,
      buttons: [this.translate.instant('COMMONS.OK')]
    });
    await alert.present();
  }
  constructor(
    public translate: TranslateService,
    public formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    public loadingController: LoadingController,
    private dataService: DataService,
    public observerUser: DashboardPage

  ) {
    this.observerUser.resetStateNew().subscribe(data => {
      if (data) {
        this.procesStep = [
          { "id": 1, "title": "Consulta", "description": "Proceso de consulta", "state": 1, data: [] },
        ]
      }
    });
  }


  cancelProcess(event) {
    if (event) {
      this.procesStep = [
        { "id": 1, "title": "Consulta", "description": "Proceso de consulta", "state": 1, data: [] },
      ]
    }
  }

  ngOnInit() {
    this.presentWaitin(false);
    this.cancelProcess(true);
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.procesStep = [
      { "id": 1, "title": "Consulta", "description": "Proceso de consulta", "state": 1, data: [] },
    ]
  }



  askState(dataState) {
    this.procesStep = [
      { "id": 1, "id_request": dataState.request_id, "title": "Consulta", "description": "Proceso de consulta", "state": dataState.state, data: dataState.initial_data },
    ]
    if (dataState) {
      if (dataState.basic_data) {
        this.procesStep.push({ "id": 2, "id_request": dataState.request_id, "title": "Datos Basicos", "description": "Proceso de datos basicos", "state": dataState.state, data: dataState.basic_data },)
        this.demo1TabIndex = this.demo1TabIndex + 1;
      }
      if (dataState.financial_data) {
        this.procesStep.push({ "id": 3, "id_request": dataState.request_id, "title": "Datos Financieros", "description": "Proceso de datos financieros", "state": dataState.state, data: dataState.financial_data },)
        this.demo1TabIndex = this.demo1TabIndex + 1;
      }
      if (dataState.aditional_data) {
        this.procesStep.push({ "id": 4, "id_request": dataState.request_id, "title": "Datos Adicionales", "description": "Proceso de datos financieros", "state": dataState.state, data: dataState.aditional_data },)
        this.demo1TabIndex = this.demo1TabIndex + 1;
      }
      if (dataState.final_data) {
        this.procesStep.push({ "id": 5, "id_request": dataState.request_id, "title": "Resumen", "description": " ", "state": dataState.state, data: dataState.final_data });
        this.demo1TabIndex = this.demo1TabIndex + 1;
      }
    }
  }
  presentWaitin(wait: boolean) {
    wait ? this.present() : this.dismiss();
  }
  resultFormInitial(form) {
    if (form) {
      this.requestId = form.request_id
      this.askState(form);
    }
  }


}
