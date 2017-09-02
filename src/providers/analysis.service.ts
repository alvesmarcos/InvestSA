import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

const URLSERVER = "http://192.168.1.144:8080/api/v1/reports";

@Injectable()
export class AnalysisService {
  constructor(public http: Http) { }

  getAnalysis() {
    return this.http.get(URLSERVER).map((res: Response) => res.json());
  }
}
