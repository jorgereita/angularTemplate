import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ISheetItems } from './sheet.interface';
import { LoadingModal } from '../../shared/loading.service'
import { TranslateService } from '@ngx-translate/core';
import { MessageModal } from '../../shared/message-modal.service';
@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.page.html',
  styleUrls: ['./sheet.page.scss'],
})
export class SheetPage implements OnInit {
  value: string;
  constSkip = 50
  skip: number = 0;
  take: number = 0;
  flag = 0;
  flaglastpage: boolean = false;
  filterOn: boolean = false;
  requests: Array<ISheetItems> = [];
  backUpData: Array<ISheetItems> = [];
  stateFilter = false;
  typeFilter = "1";
  searchValue: number;
  searchDateStart: string;
  searchDateEnd: string;

  constructor(private dataService: DataService,
    private loadingModal: LoadingModal,
    public translate: TranslateService,
    private modalMenssage: MessageModal,
  ) {
    this.value = this.translate.instant("FORMS.COMMONS.VALUE");
  }

  ngOnInit() {
    this.take = this.constSkip;
    this.getData();
  }
  validateDisable() {
    if (parseInt(this.typeFilter) === 3) {
      if (this.searchDateStart && this.searchDateEnd) {
        return false;
      }
      return true;
    } else {
      if (this.searchValue) {
        return false;
      }
      return true;
    }

  }
  onScroll() {
    const elem = document.getElementById("scrollcontainer");
    let pos = elem.scrollTop + elem.offsetHeight;
    let max = elem.scrollHeight;
    let roundedpos = Math.ceil(pos);
    let roundedmax = Math.ceil(max);
    if ((roundedpos == roundedmax || (roundedmax - roundedpos == 1) || (roundedmax - roundedpos == -1)) && this.flag == 0) {
      this.skip += this.constSkip;
      this.getData();
      this.loadingModal.presentWaitin(false);
    }
  }
  sendFilter() {
    var dts: object;
    if (parseInt(this.typeFilter) == 1 || parseInt(this.typeFilter) == 2) {
      dts = {
        "skip": 0,
        "take": 10,
        "filter_type": parseInt(this.typeFilter),
        "filter": this.searchValue
      }
    } else {
      dts = {
        "skip": 0,
        "take": 10,
        "filter_type": parseInt(this.typeFilter),
        "start_date": this.searchDateStart,
        "end_date": this.searchDateEnd
      }
    }

    this.loadingModal.presentWaitin(true);
    this.dataService.reportingSheet(dts).subscribe(data => {
      this.loadingModal.presentWaitin(false);
      if (data.length > 0) {
        this.backUpData = this.filterOn ? this.backUpData : [...this.requests];
        this.requests = data;
        this.filterOn = true;
        return '';
      }
      this.modalMenssage.presentAlert(this.translate.instant("FORMS.COMMONS.NO_MATCH"))

    });
  }
  resetData() {
    this.searchValue = null
    this.filterOn = false;
    this.requests = this.backUpData;
  }
  getData() {
    this.flag = 1;
    if (!this.flaglastpage) {
      this.loadingModal.presentWaitin(true);
      let data = { "skip": this.skip, "take": this.take }
      this.dataService.reportingSheet(data).subscribe(data => {
        this.loadingModal.presentWaitin(false);
        this.flaglastpage = data.length < this.constSkip ? !this.flaglastpage : this.flaglastpage;
        for (let item of data) {
          this.requests.push(item);
        };
        this.flag = 0;
      });
    }
  }
}
