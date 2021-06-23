import {Injectable} from '@angular/core'

@Injectable()
export class StudentsService{
    GetAll(): any[] {
        let students : any[] = [
            {id: 1, name: 'Le Anh Nhan'},
            {id: 2, name: 'Nguyen Thi Thu Ha'},
            {id: 3, name: 'Tran Long An'},
            {id: 4, name: 'Phan Thanh Bang'},
        ]
        return students;
    }
}