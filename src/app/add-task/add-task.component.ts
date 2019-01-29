import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { TaskModelModule } from '../Model/task-model.module';
import { ParentTaskModelModule } from '../Model/parent-task-model.module';
import { TaskserviceService } from '../taskservice.service';
import { FormArray, Form, FormGroup, ReactiveFormsModule, NgForm } from '@angular/forms';
import { FormControl } from '@angular/forms'

import { Input } from '@angular/core';
import { Router, Route, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { of } from 'rxjs';
import { ITaskService } from '../taskservice.interface'

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})

export class AddTaskComponent implements OnInit { 
  
  public taskModel: TaskModelModule; 
  public noParentAssociated : boolean; 
  @ViewChild('f') f: NgForm;  
  @ViewChild('taskName') taskName: FormControl;
  taskvalider = (): boolean => this.taskName.valid;
  valider = (): boolean => this.f.form.valid;
  error : any = { isError: false, errorMsg: '' }
  
  
  constructor(private taskService: ITaskService, private taskRouter: Router, private activeRoute: ActivatedRoute) {    
     this.taskModel = new TaskModelModule();
     this.taskModel.ParentTaskModelModule = new ParentTaskModelModule();       
    console.log("From Constructor" + this.taskModel.TaskDescripton);
    console.log("From Constructor" + this.taskModel.ParentTaskModelModule.ParentTaskName);
    this.activeRoute.paramMap.pipe(switchMap((parms: ParamMap) => {      
      if (parms.has("id")) {
        let id = Number.parseInt(parms.get("id"));
        return this.taskService.getTaskById(id);
      }
      return of(new TaskModelModule());
      })).subscribe(x => {    
        if(x.ParentTaskModelModule)
        {
          if(!x.ParentTaskModelModule.ParentTaskId)
            this.noParentAssociated = true;
        }        
        this.taskModel = x;       
        console.log(this.taskModel)  
        console.log(this.noParentAssociated)                         ;
      });
    }

  ngOnInit() {     
    if(!this.taskModel.ParentTaskModelModule)
    {      
      this.taskModel.ParentTaskModelModule = new ParentTaskModelModule();       
      console.log("From Init" + this.taskModel.TaskDescripton);
      console.log("From Init" + this.taskModel.ParentTaskModelModule.ParentTaskName);     
    }
  }

  AddEditTask() 
  {

    if(this.error.isError) return;
    if(!this.taskModel.TaskId)
    {      
      console.log("Task Details : " + this.taskModel.TaskId);
      console.log("Task Details To Add : " + this.taskModel.TaskDescripton);
      console.log("Task Details To Add : " + this.taskModel.Priority);
      console.log("Task Details To Add : " + this.taskModel.StartDate);
      console.log("Task Details To Add : " + this.taskModel.EndDate);
      console.log("Task Details To Add : " + this.taskModel.ParentTaskModelModule.ParentTaskId);
      console.log("Task Details To Add : " + this.taskModel.ParentTaskModelModule.ParentTaskName);
      
      this.taskService.AddTaskDetails(this.taskModel).subscribe(x => {
        console.log("Task Added...")});
    }
    else
    {
      console.log("Task Details Update : " + this.taskModel.TaskId);
      console.log("Task Details To Add : " + this.taskModel.TaskDescripton);
      console.log("Task Details To Add : " + this.taskModel.Priority);
      console.log("Task Details To Add : " + this.taskModel.StartDate);
      console.log("Task Details To Add : " + this.taskModel.EndDate);
      console.log("Task Details To Add : " + this.taskModel.ParentTaskModelModule.ParentTaskId);
      console.log("Task Details To Add : " + this.taskModel.ParentTaskModelModule.ParentTaskName);
      
      this.taskService.UpdateTaskDetails(this.taskModel).subscribe(x => {
        console.log("Task Saved...")});
    }
  }

  ValidateStartEndDates()
  {    
    if(this.taskModel.StartDate && this.taskModel.EndDate)
    {
      console.log("Validation CAlled")
        if(this.taskModel.EndDate < this.taskModel.StartDate)
        {
          this.error = {isError:true, errorMsg:'End Date Cannot be lesser than Start Date'}
        }
        else
        {
          this.error = {isError:false, errorMsg:''}
        }
        console.log(this.error)

    }

  }
}
