import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NewPageRoutingModule } from './new-routing.module';
import { NewPage } from './new.page';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { InitialFormComponent } from '../../components/forms/initial-form/initial-form.component';
import {MatSelectModule} from '@angular/material/select';
import { BasicDataComponent } from '../forms/basic-data/basic-data.component';
import { FinancialDataComponent } from '../forms/financial-data/financial-data.component';
import { AditionalDataComponent } from '../forms/aditional-data/aditional-data.component';
import { FinalDataComponent } from '../forms/final-data/final-data.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NewPageRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    TranslateModule,
    HttpClientModule,
    MatTabsModule,
    MatSelectModule,
  ],
  declarations: [
    NewPage,
    InitialFormComponent,
    BasicDataComponent,
    FinancialDataComponent,
    AditionalDataComponent,
    FinalDataComponent,
  ],
 
})
export class NewPageModule {}
