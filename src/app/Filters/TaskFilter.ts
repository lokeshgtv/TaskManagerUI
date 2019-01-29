import { Pipe, PipeTransform } from '@angular/core';
import { TaskModelModule } from '../Model/task-model.module';
import { IMPLICIT_REFERENCE } from '@angular/compiler/src/render3/view/util';
import { DatePipe } from '@angular/common'

@Pipe({
name: 'taskFilter'
})

export class TaskFilterPipe implements PipeTransform
{
    constructor(public datepipe: DatePipe){}
    
    transform(items : TaskModelModule[], filter : TaskModelModule) : any {
        console.log("Filer Pipe fired from PIPI" + filter)        
        if(!items || filter == null)
        {
            console.log("Filer returned");
            console.log(items);
            return items;
        }
        console.log("Before Transformation" + items);
        console.log(filter);
        items = items.filter(item =>                          
                 ((filter.TaskDescripton == null || filter.TaskDescripton == "" 
                 || item.TaskDescripton == null || item.TaskDescripton == "") ? true : item.TaskDescripton.indexOf(filter.TaskDescripton) == 0) &&
                 (( filter.ParentTaskModelModule == null ||
                     filter.ParentTaskModelModule.ParentTaskName == null || 
                     filter.ParentTaskModelModule.ParentTaskName == "" || 
                     item.ParentTaskModelModule == null ||
                    item.ParentTaskModelModule.ParentTaskName == null ||
                    item.ParentTaskModelModule.ParentTaskName == "") ? true : item.ParentTaskModelModule.ParentTaskName.indexOf(filter.ParentTaskModelModule.ParentTaskName) != -1) &&
                 ((!filter.Priority || item.Priority) ? true : item.Priority >= filter.Priority) &&
                 ((!filter.PriorityTo || item.PriorityTo) ? true : item.PriorityTo <= filter.PriorityTo) &&
                 ((!filter.StartDate || !item.StartDate) ? true : this.GetFormattedDate(item.StartDate) >= this.GetFormattedDate(filter.StartDate)) &&
                 ((!filter.EndDate || item.EndDate) ? true :this.GetFormattedDate(item.EndDate) <= this.GetFormattedDate(filter.EndDate))                  
        );       
        console.log("Transformed Items : "+ items);
        return items;
    }

    GetFormattedDate(dateToFormat : Date){
        console.log(this.datepipe.transform(dateToFormat, 'yyyy-MM-dd'));
        return this.datepipe.transform(dateToFormat, 'yyyy-MM-dd');
    }
}