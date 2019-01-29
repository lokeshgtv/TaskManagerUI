import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { URLSearchParams } from 'url';
import { HttpParams } from '@angular/common/http';
import {environment} from '../environments/environment';

import { TaskModelModule } from './model/task-model.module';
import { ParentTaskModelModule } from './model/parent-task-model.module';
import { ITaskService } from './taskservice.interface';
import { TaskServiceMockData } from './taskservice.service.mock';

@Injectable()
export class TaskServiceFake extends ITaskService {

    getAllTasks(): Observable<TaskModelModule[]> {          
        return of(TaskServiceMockData.TaskModel_All);
    }
  
    getTaskById(id:number): Observable<TaskModelModule> {
  
        throw new Error("Method not implemented.");
    }
  
    AddTaskDetails(task: TaskModelModule) {
  
        throw new Error("Method not implemented.");
    }
  
    UpdateTaskDetails(task: TaskModelModule) {   
        throw new Error("Method not implemented.");
    }   
}