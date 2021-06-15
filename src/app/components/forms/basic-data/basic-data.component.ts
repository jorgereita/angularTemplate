import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-basic-data',
  templateUrl: './basic-data.component.html',
  styleUrls: ['./basic-data.component.scss'],
})
export class BasicDataComponent implements OnChanges {
  @Output() formResult = new EventEmitter<object>();
  @Output() cancelEvent = new EventEmitter<boolean>(false);
  @Output() waiting = new EventEmitter<boolean>(false);
  @Input() requestId
  @Input() inputdata 
  public Form: FormGroup;
  @Input() myProp: any;
  options = [];
 


  ngOnChanges( ) {
    
  }

  constructor(
    public formBuilder: FormBuilder,
    public translate: TranslateService,
    private dataService: DataService,
  ) {     
    this.Form = this.formBuilder.group({
    firstName: ['', Validators.required],
    secondName: ['',],
    surName: ['', Validators.required],
    secondSurName: ['',],
    birthDate: ['', Validators.required],
  });
  this.dataService.getOptions().subscribe(data => {
    if (data !== '') {
      this.options = data;
    }
  });
}

  ngOnInit() {
    this.validatePreviuous();
  }
  validatePreviuous(){
    if(this.inputdata.updated_date){
      this.Form.controls['firstName'].setValue( this.inputdata.first_name);
      this.Form.controls['secondName'].setValue( this.inputdata.second_name);
      this.Form.controls['surName'].setValue( this.inputdata.surname);
      this.Form.controls['secondSurName'].setValue( this.inputdata.second_surname);
      this.Form.controls['birthDate'].setValue( this.inputdata.birth_date);

      this.Form.controls['firstName'].disable(); 
      this.Form.controls['secondName'].disable(); 
      this.Form.controls['surName'].disable(); 
      this.Form.controls['secondSurName'].disable(); 
      this.Form.controls['birthDate'].disable(); 
    }
  }
  cancelProcess(){
    this.cancelEvent.emit(true);
  }
  
  sendForm() {
    const dts = {
      "request_id": this.requestId,
      "first_name": this.Form.value.firstName,
      "second_name": this.Form.value.secondName,
      "surname": this.Form.value.surName,
      "second_surname": this.Form.value.secondSurName,
      "birth_date": this.Form.value.birthDate,
    }
    this.waiting.emit(true);
    this.dataService.setRequest(dts).subscribe(data => {
      this.waiting.emit(false);
      this.formResult.emit(data);
      this.Form.reset();
    });
  }
}
