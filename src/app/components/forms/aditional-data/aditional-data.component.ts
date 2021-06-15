import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-aditional-data',
  templateUrl: './aditional-data.component.html',
  styleUrls: ['./aditional-data.component.scss'],
})
export class AditionalDataComponent implements OnInit {
  @Output() cancelEvent = new EventEmitter<boolean>(false);
  @Output() formResult = new EventEmitter<object>();
  @Output() waiting = new EventEmitter<boolean>(false);
  @Input() requestId 
  @Input() inputdata 
  public Form: FormGroup;

  options = [];
  constructor(
    public formBuilder: FormBuilder,
    public translate: TranslateService,
    private dataService: DataService,
  ) { }
    
  ngOnInit() {
    this.requestId
    this.Form = this.formBuilder.group({
      idRef: ['', Validators.required],
      nameRef: ['',Validators.required ],
      idTypeRef: ['',Validators.required ],
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
      this.Form.controls['idTypeRef'].setValue( this.inputdata?.reference1_identification_type?.id);
      this.Form.controls['idRef'].setValue( this.inputdata?.reference1_identification);
      this.Form.controls['nameRef'].setValue( this.inputdata?.reference1_name);
 
      this.Form.controls['idTypeRef'].disable(); 
      this.Form.controls['idRef'].disable(); 
      this.Form.controls['nameRef'].disable(); 
    }
  }
  cancelProcess(){
    this.cancelEvent.emit(true);
  }
  
  sendForm() {
    const dts = {
      
      "request_id": this.requestId,
      "reference1_identification_type":this.Form.value.idTypeRef,
      "reference1_identification": this.Form.value.idRef.toString(),
      "reference1_name": this.Form.value.nameRef,
    }
    this.waiting.emit(true);
    this.dataService.setRequest(dts).subscribe(data => {
      this.waiting.emit(false);
      this.formResult.emit(data);
      this.Form.reset();
    });
  }

}
