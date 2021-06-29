import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentsService } from '@app/shared/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss']
})
export class StudentDetailComponent implements OnInit, OnDestroy {

  public _id: number;
  public subscription: Subscription;
  public student: any;

  constructor(private router: Router
    , private activatedRoute: ActivatedRoute
    , private studentsService: StudentsService) { }

  ngOnInit(): void {
    this.subscription = this.activatedRoute.params.subscribe(params => {
      this._id = params['id'];
    });

    this.studentsService.GetDetail(this._id).subscribe((response: any) =>{
      this.student = response;
      console.log('student', this.student);
    })

  }

  onNavigateToStudentsPage(){
    this.router.navigate(['systems', 'roles']);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
