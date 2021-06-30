import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Student } from '@app/shared/models';
import { NotificationService, StudentsService } from '@app/shared/services';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.scss']
})
export class StudentEditComponent implements OnInit {

  public id: number;
  public student: Student= new Student();
  public title: string;

  constructor(private router: Router
    , private activatedRoute: ActivatedRoute
    , private studentsService: StudentsService
    , private notificationService : NotificationService) { }

  ngOnInit(): void {

   this.activatedRoute.queryParams.subscribe(params => {
      this.id = params['id'];
      this.title = this.id ? 'Edit student' : 'Add new student';
    });

    if(this.id){
      this.studentsService.GetDetail(this.id).subscribe((response: any) =>{
        this.student = response;
      })
    }
  }

  onNavigateToStudentsPage(){
    this.router.navigate(['systems', 'students']);
  }

  onSubmit(value: Student){
    if(this.id == null){
      this.studentsService.Add(value).subscribe((response)=> {
        console.log('response', response);
        this.notificationService.showSuccess('Add new student is successfully');
        this.student = new Student();
      }
      ,(error) => {
        console.log('error', error);
        this.notificationService.showError('Add new student is failed');
      });
    }else{
      value.id = this.id;
      this.studentsService.Update(value).subscribe((response)=> {
        console.log('response', response);
        this.notificationService.showSuccess('Update student is successfully');
      }
      ,(error) => {
        console.log('error', error);
        this.notificationService.showError('Update student is failed');
      });
    }
  }
}
