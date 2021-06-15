import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from 'src/app/services/data.service';
import { DashboardPage } from '../../dashboard/dashboard.page';
@Component({
  selector: 'app-initial-form',
  templateUrl: './initial-form.component.html',
  styleUrls: ['./initial-form.component.scss'],
})
export class InitialFormComponent implements OnInit {
  @Output() formResult = new EventEmitter<object>();
  @Output() waiting = new EventEmitter<boolean>(false);
  @Input() inputdata
  public Form: FormGroup;

  options = [];
  constructor(
    public formBuilder: FormBuilder,
    public translate: TranslateService,
    private dataService: DataService,
    private observerUser: DashboardPage
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
    
    this.validatePreviuous()

    this.observerUser.user2Consult().subscribe(data => {
      if(data!==""){
        this.reStart(data);
      }
    });

 
  }
  validatePreviuous(){
    if(this.inputdata.updated_date){
      this.Form.controls['idType'].setValue( this.inputdata.identification_type.id);
      this.Form.controls['idNumber'].setValue( this.inputdata.identification);
      this.Form.controls['idNumber'].disable(); 
      this.Form.controls['idType'].disable();
    }
  }
  reStart(data){
    const dts = {
      "request_id": data.idSolicitud,
    }
    this.waiting.emit(true);
    this.dataService.getRequest(dts).subscribe(data => {
      this.waiting.emit(false);
      this.formResult.emit(data);
      this.Form.reset();
    });
  }
  sendForm() {
    const dts = {
      "identification_type": this.Form.value.idType,
      "identification": this.Form.value.idNumber
    }
    this.waiting.emit(true);
    this.dataService.flowInit(dts).subscribe(data => {
      this.waiting.emit(false);
      this.formResult.emit(data);
      this.Form.reset();
    });
  }

}
