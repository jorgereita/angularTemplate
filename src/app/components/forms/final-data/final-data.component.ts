import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-final-data',
  templateUrl: './final-data.component.html',
  styleUrls: ['./final-data.component.scss'],
})
export class FinalDataComponent implements OnInit {
  @Output() cancelEvent = new EventEmitter<boolean>(false);
  @Output() formResult = new EventEmitter<object>();
  @Output() waiting = new EventEmitter<boolean>(false);
  @Input() requestId
  @Input() inputdata
  @Input() state
  public Form: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public translate: TranslateService,
    private dataService: DataService,
  ) { }

  cancelProcess() {
    this.cancelEvent.emit(true);
  }

  ngOnInit() {

    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
      //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });

    this.inputdata.quota = formatter.format(this.inputdata.quota)

    this.requestId
    this.Form = this.formBuilder.group({
      income: ['', Validators.required],
    });
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
