import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Student } from '../models/student.model';

@Injectable()
export class StudentsService{
    private apiUrl: string = "https://60d53c7c943aa6001776883b.mockapi.io/api/v1/students";
    constructor(private httpClient: HttpClient){

    }
    GetAll(): Observable<any> {
        return this.httpClient.get(this.apiUrl).pipe(map((response: any) => response));
    }

    Search(keyword: string): Observable<any> {
        return this.httpClient.get(this.apiUrl + '?search='+ keyword).pipe(map((response: any) => response));
    }

    GetDetail(id: number): Observable<any> {
        return this.httpClient.get(this.apiUrl + '/' + id).pipe(map((response: any) => response));
    }

    Add(data: Student){
        return this.httpClient.post(this.apiUrl, data).pipe(map((response: any) => response));
    }

    Update(data: Student){
        return this.httpClient.put(this.apiUrl + '/' + data.id, data).pipe(map((response: any) => response));
    }

    Delete(id: number): Observable<any> {
        return this.httpClient.delete(this.apiUrl + '/' + id).pipe(map((response : any) => response))
    }
}