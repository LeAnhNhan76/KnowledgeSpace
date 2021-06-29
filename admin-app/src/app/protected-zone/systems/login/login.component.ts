import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService, NotificationService } from '@app/shared/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private loginService: LoginService, private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  onCheckLogin(value: any) {
    console.log('value', value);
    if(value && value.username === 'admin' && value.password === '123'){
      this.notificationService.showSuccess('Login is successfully');
      this.loginService.onSetLoggedIn(true);
      this.router.navigate(['/systems', 'roles']);
    }
    else{
      this.notificationService.showError('Login is failed');
    }
    //this.router.navigate(['/']);
  }

}
