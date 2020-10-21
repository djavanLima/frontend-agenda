
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contato } from './contato/contato';
import{Observable} from 'rxjs';
import{environment} from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  url:string=environment.apiBaseUrl;

  constructor(private http:HttpClient) { }

  save(contato:Contato ):Observable<Contato>{
    return this.http.post<Contato>(this.url,contato);
  }

  list():Observable<Contato[]>{
      return this.http.get<any>(this.url);
  }
    // o segundo parametro pode ser um objeto
    //entretanto como é só para midificar de true para false e vice e versa, então não precisa
  favorite(contato: Contato):Observable<any>{
      return this.http.patch(`${this.url}/${contato.id}/favorito`,null);
  }

  //upload de fotos

  upload(contato:Contato, formData):Observable<any>
  {
      return this.http.put(`${this.url}/${contato.id}/foto`, formData, {responseType :'blob'});
  }





}


