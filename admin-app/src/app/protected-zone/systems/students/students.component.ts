import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from '@app/shared/models';
import { NotificationService, StudentsService } from '@app/shared/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  public students : Observable<Student[]>;
  public routeEditStudent: string[] = ['/systems', 'student-edit'];
  public keyword: string;
  
  constructor(private studentsService : StudentsService
    , private router : Router
    , private notificationService : NotificationService) { }

  ngOnInit(): void {
    this.onLoad();
  }

  onLoad() : void {
    this.studentsService.GetAll().subscribe((response) => {
      this.students = response;
    });
  }

  onAdd() : void{
    this.router.navigate(this.routeEditStudent);
  }

  onEdit(id: number) : void{
    this.router.navigate(this.routeEditStudent, {queryParams: {id}});
  }
  
  onDelete(id: number) : void{
    this.studentsService.Delete(id).subscribe((response) => {
      console.log('response', response);
      this.notificationService.showSuccess('Delete student is successfully');
      setTimeout(() => {
        this.onLoad();
      }, 300)
    }, 
    (error) => {
      console.log('error', error);
      this.notificationService.showError('Delete student is failed');
    })
  }

  onSearch() : void{
    this.studentsService.Search(this.keyword).subscribe((response) => {
      this.students = response;
    }, 
    (error) => {
      console.log('error of search api', error);
    });
  }

}
