import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-financial-data',
  templateUrl: './financial-data.component.html',
  styleUrls: ['./financial-data.component.scss'],
})
export class FinancialDataComponent implements OnInit {

  @Output() formResult = new EventEmitter<object>();
  @Output() waiting = new EventEmitter<boolean>(false);
  @Output() cancelEvent = new EventEmitter<boolean>(false);
  @Input() requestId 
  @Input() inputdata 
  public Form: FormGroup;

  options = [];
  constructor(
    public formBuilder: FormBuilder,
    public translate: TranslateService,
    private dataService: DataService,
  ) { }
  cancelProcess(){
    this.cancelEvent.emit(true);
  }
  ngOnInit() {
    this.requestId
    this.Form = this.formBuilder.group({
      income: ['', Validators.required],
    });
    this.dataService.getOptions().subscribe(data => {
      if (data !== '') {
        this.options = data;
      }
    });
    this.validatePreviuous();
  }
  validatePreviuous(){
    if(this.inputdata.updated_date){
      this.Form.controls['income'].setValue( this.inputdata.income);
      this.Form.controls['income'].disable(); 
    }
  }
  sendForm() {
    const dts = {
      "request_id": this.requestId,
      "income": this.Form.value.income,
    }
    this.waiting.emit(true);
    this.dataService.setRequest(dts).subscribe(data => {
      this.waiting.emit(false);
      this.formResult.emit(data);
      this.Form.reset();
    });
  }

}
