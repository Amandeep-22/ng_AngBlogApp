import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  userEmail: string='';
  isloggedIn$! : Observable<boolean>; 

  constructor(private authservice : AuthService){}
  ngOnInit(): void {
    const userJson = localStorage.getItem('user');
    if(userJson!=null)
    {
      this.userEmail = (JSON.parse(userJson).email);  
    }
    this.isloggedIn$ = this.authservice.isLoggedIn();
  }

  onLogout(){
      this.authservice.logOut();
  }

}
