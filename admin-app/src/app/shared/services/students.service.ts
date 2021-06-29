import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class StudentsService{
    private apiGetAllUrl: string = "https://60d53c7c943aa6001776883b.mockapi.io/api/v1/students";
    private apiGetDetailUrl: string = "https://60d53c7c943aa6001776883b.mockapi.io/api/v1/students/";
    constructor(private httpClient: HttpClient){

    }
    GetAll(): Observable<any> {
        // let students : any[] = [
        //     {id: 1, name: 'Le Anh Nhan'},
        //     {id: 2, name: 'Nguyen Thi Thu Ha'},
        //     {id: 3, name: 'Tran Long An'},
        //     {id: 4, name: 'Phan Thanh Bang'},
        // ]
        // return students;
        return this.httpClient.get(this.apiGetAllUrl).pipe(map((response: any) => response));
    }

    GetDetail(id: number): Observable<any> {
        return this.httpClient.get(this.apiGetDetailUrl + id).pipe(map((response: any) => response));
    }
}