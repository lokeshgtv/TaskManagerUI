import { TaskModelModule } from './model/task-model.module';
import { ParentTaskModelModule } from './model/parent-task-model.module';  
import { Observable } from 'rxjs/internal/Observable';
  
  
  export abstract class ITaskService {  
    abstract getAllTasks(): Observable<TaskModelModule[]>;  
    abstract getTaskById(id: number): Observable<TaskModelModule> ;
    abstract AddTaskDetails(task: TaskModelModule);
    abstract UpdateTaskDetails(task: TaskModelModule);    
  }
  