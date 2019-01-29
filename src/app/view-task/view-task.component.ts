import { Component, OnInit } from '@angular/core';
import { TaskModelModule } from '../Model/task-model.module'
import { TaskserviceService } from '../taskservice.service'
import { Input } from '@angular/core';
import { TaskFilterPipe } from '../Filters/TaskFilter'
import { ParentTaskModelModule } from '../Model/parent-task-model.module';
import { ActivatedRoute,Router } from '@angular/router';
import { RouterPreloader } from '@angular/router/src/router_preloader';
import { ITaskService } from '../taskservice.interface'

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  filterTaskDetails : TaskModelModule;
  filteredDetails : TaskModelModule[];
  IsTaskCompleted : boolean;

  @Input()
  AllTasksInfo: TaskModelModule[];
  error : any = { isError: false, errorMsg: '' }
  isPriorityFromRangeError : boolean = false;
  isPriorityToRangeError : boolean = false;

  constructor(private taskService: ITaskService, private taskFilering : TaskFilterPipe, private router:Router) { 
    this.filterTaskDetails = new TaskModelModule();
    this.filterTaskDetails.ParentTaskModelModule = new ParentTaskModelModule();

    
  }

  ngOnInit() {
    
    this.taskService.getAllTasks().subscribe(x =>
      { 
        console.log(x);
        this.AllTasksInfo = x;
        this.filteredDetails = this.AllTasksInfo;
        // x.forEach(element => {
        //   console.log("Filter Element" + element.ParentTaskModelModule);           
        //});
        console.log("Filter " + this.filteredDetails);        
      });    
      
  }

  OnSearchCriteriaChanged(searchValue : string ) 
  {     
    this.ValidateStartEndDates();
    this.ValidatePriorityRange();
    if(this.error.isError || this.isPriorityFromRangeError || this.isPriorityToRangeError) return;
    this.filteredDetails = this.taskFilering.transform(this.AllTasksInfo, this.filterTaskDetails);      
  }

  OnEdit(selectedItem : TaskModelModule){
    console.log(selectedItem)
    this.router.navigate(["/addtask", selectedItem.TaskId]);
  }

  OnEnd(selectedItem : TaskModelModule){
    console.log(selectedItem)
    selectedItem.IsFinished = true;
    // this.taskService.UpdateTaskDetails(selectedItem).subscribe(x => {
    //   console.log("Updated Task to End State...")});
  }

  ValidateStartEndDates()
  {    
    if(this.filterTaskDetails.StartDate && this.filterTaskDetails.EndDate)
    {
      console.log(this.filterTaskDetails.StartDate)
      console.log(this.filterTaskDetails.EndDate)
      console.log("Validation CAlled")
        if(this.filterTaskDetails.EndDate < this.filterTaskDetails.StartDate)
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

  ValidatePriorityRange()
  {
    console.log(this.filterTaskDetails.Priority);
    console.log(this.filterTaskDetails.PriorityTo);

      this.isPriorityFromRangeError = false;
      this.isPriorityToRangeError = false;
      if(this.filterTaskDetails.Priority)
      {
        console.log(this.filterTaskDetails.Priority)
        if(this.filterTaskDetails.Priority < 1 || 
          this.filterTaskDetails.Priority > 30)
            this.isPriorityFromRangeError = true;
      }
      if(this.filterTaskDetails.PriorityTo)
      {
        console.log(this.filterTaskDetails.PriorityTo)
        if(this.filterTaskDetails.PriorityTo < 1 || 
          this.filterTaskDetails.PriorityTo > 30)
            this.isPriorityToRangeError = true;
      }
  }

}
