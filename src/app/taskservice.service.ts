import { Injectable } from '@angular/core';
import { TaskModelModule } from './Model/task-model.module';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { ParentTaskModelModule } from './Model/parent-task-model.module';
import { ITaskService } from './taskservice.interface'
import { of } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class TaskserviceService extends ITaskService {

  constructor(private httpService: HttpClient) { super(); }

  getAllTasks(): Observable<TaskModelModule[]> {  

      console.log("Test Connection")
      return this.httpService.get<TaskModelModule[]>("http://localhost/TaskManagerService/api/taskmodelmodules");
  }

  getTaskById(id:number): Observable<TaskModelModule> {

    return this.httpService.get<TaskModelModule>("http://localhost/TaskManagerService/api/taskmodelmodules/"+id);
  }

  AddTaskDetails(task: TaskModelModule) {

    console.log("From Add : " + task);
    return this.httpService.post("http://localhost/TaskManagerService/api/taskmodelmodules", task);
  }

  UpdateTaskDetails(task: TaskModelModule) {   
    return this.httpService.post("http://localhost/TaskManagerService/api/taskmodelmodules", task);
  }

  private taskData: TaskModelModule[] = [
    { TaskId: 1, TaskDescripton: "Task 1", ParentTaskModelModule: { ParentTaskId: 1, ParentTaskName: "Parent Task1" }, Priority: 1, PriorityTo: 30, StartDate: new Date(2018, 12, 6), EndDate: new Date(2018, 12, 20), IsFinished:true },
    { TaskId: 2, TaskDescripton: "Task 2", ParentTaskModelModule: { ParentTaskId: 2, ParentTaskName: "Parent Task2" }, Priority: 30, PriorityTo: 30, StartDate: new Date(2018, 11, 25), EndDate: new Date(2018, 12, 10), IsFinished:false },
    { TaskId: 3, TaskDescripton: "Task 3", ParentTaskModelModule: { ParentTaskId: 2, ParentTaskName: "Parent Task3" }, Priority: 20, PriorityTo: 30, StartDate: new Date(2018, 10, 11), EndDate: new Date(2018, 10, 28), IsFinished:false },
    { TaskId: 4, TaskDescripton: "Task 4", ParentTaskModelModule: null, Priority: 20, PriorityTo: 30, StartDate: new Date(2018, 10, 11), EndDate: new Date(2018, 10, 28), IsFinished:false }
  ];

  private ParentTaskModelModule: ParentTaskModelModule[] = [
    { ParentTaskId: 1, ParentTaskName: "Parent Task1" }, { ParentTaskId: 2, ParentTaskName: "Parent Task2" },
  ];
}
