import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, BehaviorSubject, from } from 'rxjs';
import { ImainMenu } from '../components/dashboard/dashboard.interface'
import { IHelpersMenu } from '../interfaces/helpers-options.interfaces'
@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseUrl = environment.baseUrl;
  public options$: BehaviorSubject<any>;

  constructor(private httpClient: HttpClient) {
    this.options$ = <BehaviorSubject<any>>new BehaviorSubject('');
  }
  public getOptions() {
    return this.options$.asObservable();
  }
  helpersMenu() {
    return this.httpClient.get<ImainMenu[]>(this.baseUrl + "/api/helpers/menu");
  }
  helpersOptions(){
    return this.httpClient.get<any>(this.baseUrl + "/api/helpers/options");
  }
  reportingInd(Id) {
    return this.httpClient.get<any>(this.baseUrl + "/api/reporting/ind?id=" + Id);
  }
  reportingSheet(data) {
    return this.httpClient.post<any>(this.baseUrl + "/api/reporting/sheet", data);
  }
  myRequests() {
    return this.httpClient.get<any>(this.baseUrl + "/api/helpers/my-requests");
  }
  reportingPdfBuro(TipoIdentificacion, Identificacion) {
    return this.httpClient.post<string>(this.baseUrl + "/api/reporting/pdf-buro"
      , { TipoIdentificacion, Identificacion },
      { responseType: 'text' as 'json' }
    );
  }
  getRequest(data) {
    return this.httpClient.post<any>(this.baseUrl + "/api/helpers/get-request", data );
  }
  flowInit(data) {
    return this.httpClient.post<any>(this.baseUrl + "/api/flow/init", data );
  }
  setRequest(data){
    return this.httpClient.post<any>(this.baseUrl + "/api/flow/set-request", data );
  }
  helpersGetRequest(requesId){
    return this.httpClient.post<any>(this.baseUrl + "/api/helpers/get-request", requesId );
  }
}
