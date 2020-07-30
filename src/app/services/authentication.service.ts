import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";
import {  Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private host: string = "http://localhost:8084";
  private jwtToken: string;
  private roles: Array<any> = [];

  constructor(private http: HttpClient, private router: Router) { }

  login(user) {
    return this.http.post(`${this.host}/login`, user
      , { observe: 'response' } //je veux pas qu'il converti ca en format json
    );

  }
  loadToken() {
    this.jwtToken = localStorage.getItem('token');
  }
  saveToken(jwtToken: string) {
    this.jwtToken = jwtToken;
    localStorage.setItem("token", jwtToken);
    let jwtHelper = new JwtHelperService();
    this.roles = jwtHelper.decodeToken(this.jwtToken) // acceder au claims
      .roles;

  }
  register(user) {
    return this.http.post(this.host + "/users", user);
  }

  saveTask(task) {
    let headers = new HttpHeaders();
    headers.append('authorization'
      , this.jwtToken);
    return this.http.post(this.host + "/tasks", task, {
      headers: new
        HttpHeaders({ 'authorization': this.jwtToken })
    });
  }

  getTasks(): Observable<any[]> {
    if (this.jwtToken == null) {
      this.loadToken();

    }
    return this.http.get<any[]>(`${this.host}/tasks`
      , { headers: new HttpHeaders({ 'Authorization': this.jwtToken }) });
  }
  logout() {
    this.jwtToken = null;
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }
  isAdmin() {
    for (let r of this.roles) {
      if (r.authority == 'ADMIN')
        return true;
    }
    return false;
  }
}
