import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {User} from "../models/UserDTO";

@Injectable()
export class UserService {
  crudApiUrl = 'https://reqres.in/api/'

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.crudApiUrl);
  }

  createUser(element: User): Observable<User> {
    return this.http.post<User>(this.crudApiUrl, element);
  }

  editUser(element: User): Observable<User> {
    return this.http.put<User>(this.crudApiUrl, element);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.crudApiUrl}?id=${id}`);
  }

}
