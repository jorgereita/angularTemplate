import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl =  environment.baseUrl;

  constructor(private httpClient: HttpClient) { }
  authenticate(email, password) {

    return this.httpClient.post<{ token: string, expiry_time: number, error: number, role_id:number,error_message:string, name:string }>(this.baseUrl + "/api/auth/token"
      , { user: email, password: password }
      , { headers: new HttpHeaders({ "No-Auth": "True" }) } 
    );
  }

  extend() {
    return this.httpClient.get<{ token: string, expired: number, error: number }>(this.baseUrl + "api/auth/extend");
  }

  change(ContrasenaActual: string, ContrasenaNueva: string) {
    return this.httpClient.post<{ IdError: number }>(this.baseUrl + "api/clave/cambiar-clave"
      , { ClaveActual: ContrasenaActual, ClaveNueva: ContrasenaNueva }
    );
  }
}
