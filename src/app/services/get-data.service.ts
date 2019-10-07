import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor(private http: HTTP) { }

  getRemoteData(url: string): any {
    return this.http.get(url, {}, {});
  }
}
