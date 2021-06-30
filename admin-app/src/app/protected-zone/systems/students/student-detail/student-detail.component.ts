import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentsService } from '@app/shared/services';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss']
})
export class StudentDetailComponent implements OnInit {

  public _id: number;
  public student: any;

  constructor(private router: Router
    , private activatedRoute: ActivatedRoute
    , private studentsService: StudentsService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this._id = params['id'];
    });

    this.studentsService.GetDetail(this._id).subscribe((response: any) =>{
      this.student = response;
    })

  }

  onNavigateToStudentsPage(){
    this.router.navigate(['systems', 'students']);
  }
}
