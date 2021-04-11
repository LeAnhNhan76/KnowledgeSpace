import { Component, OnInit } from '@angular/core';
import { User } from '@app/shared/models';
import { UsersService } from '@app/shared/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  
  public users$ : Observable<User[]>;

  constructor( private usersService: UsersService ) {}

  ngOnInit() {
    this.users$ = this.usersService.getAll();
  }
}
