import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from './base.service';
import { catchError, map } from 'rxjs/operators';
import { Function, User } from '../models';
import { userUrls } from '@app/shared/services/commons/constants';
import { UtilitiesService } from './utilities.service';

@Injectable({ providedIn: 'root' })
export class UsersService extends BaseService {
    constructor(private http: HttpClient
        , private utilitiesService : UtilitiesService) {
        super();
    }

    getAll() {
        var httpOptions = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json'
          })  
        };
        return this.http.get<User[]>(userUrls.getAll, httpOptions)
            .pipe(catchError(this.handleError));
    }

    getMenuByUser(userId : string) {
        var httpOptions = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json'
          })  
        };
        return this.http.get<Function[]>(userUrls.getMenuByUser.format(userId), httpOptions)
            .pipe(map(response => {
                var functions = this.utilitiesService.UnflatteringForLeftMenu(response);
                return functions;
            }),catchError(this.handleError));
    }
}
