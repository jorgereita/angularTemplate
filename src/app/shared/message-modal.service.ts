import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
@Injectable({
  providedIn: 'root'
})
export class MessageModal  {

  requests = null;
  public isLoading: boolean;
  constructor(
    public translate: TranslateService,
    private alertCtrl: AlertController,
  ) { }

  async presentAlert(messagge) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: this.translate.instant('COMMONS.ALERT'),
      subHeader: '',
      message: messagge,
      buttons: [this.translate.instant('COMMONS.OK')]
    });
    await alert.present();
  }


}