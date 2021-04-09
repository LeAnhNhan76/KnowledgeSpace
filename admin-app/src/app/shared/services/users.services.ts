import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from './base.service';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User } from '../models';

@Injectable({ providedIn: 'root' })
export class UsersService extends BaseService {
    constructor(private http: HttpClient) {
        super();
    }
    getAll() {
        var httpOptions = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json'
          })  
        };
        return this.http.get<User[]>(`${environment.apiUrl}/api/users`, httpOptions)
            .pipe(catchError(this.handleError));
    }
}
