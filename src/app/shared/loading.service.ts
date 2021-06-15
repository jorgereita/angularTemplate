import { Component, Injectable, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { AlertController, LoadingController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class LoadingModal  {

  requests = null;
  public isLoading: boolean;
  constructor(
    private dataService: DataService,
    private alertCtrl: AlertController,
    public loadingController: LoadingController,
  ) { }

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
    if (popover){
      return await this.loadingController.dismiss();
    }
      
  }
  presentWaitin(wait: boolean) {
    wait ? this.present() : this.dismiss();
  }

}
