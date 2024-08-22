import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  constructor(private authService : AuthService) {}

  ngOnInit(): void {
  }

  onSubmit(formValue: any)
  {
      console.log(formValue.email)
      this.authService.login(formValue['email'], formValue['password']);
  }

}
