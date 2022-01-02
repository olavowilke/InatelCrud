import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {PeriodicElement} from "../models/PeriodicElementDTO";

@Injectable()
export class PeriodicElementService {
  elementApiUrl = 'https://localhost:44366/api/PeriodicElements'

  constructor(private http: HttpClient) {
  }

  getElements(): Observable<PeriodicElement[]> {
    return this.http.get<PeriodicElement[]>(this.elementApiUrl);
  }

  createElement(element: PeriodicElement): Observable<PeriodicElement> {
    return this.http.post<PeriodicElement>(this.elementApiUrl, element);
  }

  editElement(element: PeriodicElement): Observable<PeriodicElement> {
    return this.http.put<PeriodicElement>(this.elementApiUrl, element);
  }

  deleteElement(id: number): Observable<any> {
    return this.http.delete(`${this.elementApiUrl}?id=${id}`);
  }

}
