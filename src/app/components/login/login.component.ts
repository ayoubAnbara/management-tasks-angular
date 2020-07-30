import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service'
import { from } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  mode: number = 0;
  constructor(private authService: AuthenticationService
    ,private router:Router) { }

  ngOnInit(): void {
  }
  onLogin(dataForm) {
    //  console.log(dataForm);
    this.authService.login(dataForm)
      .subscribe(
        resp => {
          console.log(resp);
          let jwt = resp.headers.get('Authorization');
          this.authService.saveToken(jwt);
          this.router.navigateByUrl('/tasks');
        },
        err => {
          console.error(err);
          this.mode = 1;
        }


      )
  }
}
