import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from 'src/app/services/data.service';
import { LoadingModal } from 'src/app/shared/loading.service';
import { MessageModal } from 'src/app/shared/message-modal.service';
 

@Component({
  selector: 'app-buro',
  templateUrl: './buro.page.html',
  styleUrls: ['./buro.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BuroPage implements OnInit {
  report = "";
  public Form: FormGroup;
  public options = [];
  public showdata = false;
  constructor(
    public formBuilder: FormBuilder,
    public translate: TranslateService,
    private dataService: DataService,
    private modalMenssage: MessageModal,
    private loadingModal: LoadingModal,
  ) { }
  ngOnInit() {

    this.Form = this.formBuilder.group({
      idType: ['', Validators.required],
      idNumber: ['', Validators.required]
    });
    this.dataService.getOptions().subscribe(data => {
      if (data !== '') {
        this.options = data;
      }
    });
  }
  sendForm() {
 
    this.loadingModal.presentWaitin(true);
    this.dataService.reportingPdfBuro(this.Form.value.idType, this.Form.value.idNumber).subscribe(data => {
      this.loadingModal.presentWaitin(false);
      if(data){
        this.showdata=true;
        this.report = data;
        this.Form.reset();
      }else{
        this.showdata=false;
        this.modalMenssage.presentAlert(this.translate.instant("FORMS.COMMONS.NO_MATCH"))
      }
    });
  }
}
