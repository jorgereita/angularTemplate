import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  @ViewChild('passwordEyeRegister', { read: ElementRef }) passwordEye: ElementRef;
  passwordTypeInput = 'password';
  togglePasswordMode() {
    this.passwordTypeInput = this.passwordTypeInput === 'text' ? 'password' : 'text';
    const nativeEl = this.passwordEye.nativeElement.querySelector('input');
    const inputSelection = nativeEl.selectionStart;
    nativeEl.focus();
    setTimeout(() => {
      nativeEl.setSelectionRange(inputSelection, inputSelection);
    }, 1);
  }
  public loginForm: FormGroup;
  public isLoading: boolean;
  constructor(
    public router: Router,
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public translate: TranslateService,
    private authService: AuthService,
    private alertCtrl: AlertController,
    public loadingController: LoadingController

  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
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
    return await this.loadingController.dismiss();
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

  logIn() {
    this.present();
    this.authService.authenticate(this.loginForm.value.username, this.loginForm.value.password).subscribe(res => {
      this.dismiss();
      if (res.error !== 0) {
        this.presentAlert(res.error_message);
        return;
      }
      this.loginForm.reset();
      localStorage.setItem('token', res.token);
      localStorage.setItem('expired', res.expiry_time.toString());
      localStorage.setItem('roleId', res.role_id.toString());
      localStorage.setItem('user', res.name);
      this.router.navigate(["/main/new"]);
    }, err => {
      this.dismiss();
      this.presentAlert(this.translate.instant('COMMONS.ERROR_SERVICE'));
    });
  }
}
