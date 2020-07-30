import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service'
import { from } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
tasks:any[];
  constructor(public authService: AuthenticationService,private router:Router) { }

  ngOnInit(): void {
    this.loadTasks();
  }
loadTasks(){
  this.authService.getTasks().subscribe(
    res=>{
      console.log(res);
      this.tasks=res;
    },
    err=>{
      console.error(err);
      this.authService.logout();  
      
    }
  )
}
onNewTask(){
this.router.navigateByUrl('/newtask');
}
}
