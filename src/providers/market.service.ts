import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

const URLSERVER = "http://192.168.1.144:8080/api/v1/indicators";

@Injectable()
export class MarketService {
  constructor(public http: Http) { }

  getIndicators() {
    return this.http.get(URLSERVER)
                    .map((res: Response) => res.json());
  }
}
