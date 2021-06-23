import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '@app/shared/models';
import { UsersService } from '@app/shared/services';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  
  public users$ : Observable<User[]>;
  public numAgree: number = 0;
  public numDisagree: number = 0;
  public names: string[] = ['Mr.A', 'Mr.B', 'Mr.C', ]

  constructor( private usersService: UsersService ) {}

  ngOnInit() {
    this.users$ = this.usersService.getAll();
  }

  onHandleResultVote(agree: boolean){
    agree ? this.numAgree++ : this.numDisagree++;
  }
}
