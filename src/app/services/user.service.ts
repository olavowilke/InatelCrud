import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {User} from "../models/UserDTO";
import {GetAllUsersDto} from "../models/GetAllUsersDto";

@Injectable()
export class UserService {
  crudApiUrl = 'api/users'

  constructor(private http: HttpClient) {
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<any>(this.crudApiUrl);
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
