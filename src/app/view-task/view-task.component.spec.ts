// import {
//   async,
//   ComponentFixture,
//   TestBed,
//   fakeAsync
// } from "@angular/core/testing";

// import { Router } from "@angular/router";
// import { Location, APP_BASE_HREF } from "@angular/common";
// import { HttpClientModule } from "@angular/common/http";
// import { RouterTestingModule } from "@angular/router/testing";
// import { appRoutes } from "src/app/app-routing.module";
// import { ReactiveFormsModule, FormsModule } from "@angular/forms";
// import { tick } from "@angular/core/testing";
// import { ITaskService } from "src/app/taskservice.interface";
// import { TaskServiceMockData } from "src/app/taskservice.service.mock";
// //import { TaskrowComponent } from "src/app/taskrow/taskrow.component";
// import { AppModule } from "src/app/app.module";
// import { inject } from "@angular/core/testing";
// import { expand } from "rxjs/internal/operators/expand";
// import { fail } from "assert";
// import { ViewTaskComponent } from './view-task.component';
// import { AppModuleUnitTestFixture } from "src/app/app.module.unittest.fixture";

// describe('ViewTaskComponent', () => {
//   let location: Location;
//   let routerSpy: Router;
//   let service: ITaskService;
//   let component: ViewTaskComponent;
//   let fixture: ComponentFixture<ViewTaskComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       providers: [
//         { provide: ITaskService, useClass: TaskServiceMockData }        
//       ],
//       //declarations: [ AddUserComponent ]
//       imports: [
//         AppModuleUnitTestFixture,
//         FormsModule,
//         ReactiveFormsModule,
//         HttpClientModule,
//         RouterTestingModule.withRoutes(appRoutes),      
//       ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     console.log("From View Component Test cases1");
//     location = TestBed.get(Location);
//     service = TestBed.get(ITaskService);
//     fixture = TestBed.createComponent(ViewTaskComponent);
//     component = fixture.componentInstance;
//      //fixture.detectChanges();
//      console.log("From View Component Test cases");
//      component.ngOnInit();
//   });

//   it('When Task Editor Component Created Injector Injects all required Inputs should create', () => {
//     expect(component).toBeTruthy();
//   });

// });


import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { appRoutes } from "../app-routing.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { tick } from "@angular/core/testing";
import { ITaskService } from "../taskservice.interface";
import { TaskServiceMockData } from "../taskservice.service.mock";
import { AppModule } from "src/app/app.module";
import { inject } from "@angular/core/testing";
import { expand } from "rxjs/internal/operators/expand";
import { fail } from "assert";
import { AddTaskComponent } from '..//add-task/add-task.component';
import { ViewTaskComponent } from '..//view-task/view-task.component';
import { TaskServiceFake } from "../taskservice.service.fake";
import { AppModuleUnitTestFixture } from "../app.module.unittest.fixture";
import { TaskModelModule } from '../Model/task-model.module';
import { TaskFilterPipe } from '../Filters/TaskFilter'

describe('ViewTaskComponent', () => {
  let routerMock: any;  
  let routerSpy: Router;
  let service: ITaskService;
  let component: ViewTaskComponent;
  let fixture: ComponentFixture<ViewTaskComponent>;


  beforeEach(async(() => {
    TestBed.overrideComponent(
      ViewTaskComponent,
      {set: {providers: [{provide: ITaskService, useClass: TaskServiceFake}]}}
  );
  console.log("In Before Each Async Start")   
    TestBed.configureTestingModule({      
      providers: [{ provide: ITaskService, useClass: TaskServiceFake }],
      imports: [        
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule.withRoutes(appRoutes),       
        AppModuleUnitTestFixture        
      ]      
    })
    .compileComponents();
    console.log("In Before Each AsyncEnd ")   
  }));

  beforeEach(() => {                  
    service = TestBed.get(ITaskService);     
    fixture = TestBed.createComponent(ViewTaskComponent);        
    component = fixture.componentInstance;        
    component.ngOnInit();
  });

  it('When View Task Component Created Verify Component is Created', () => {
    expect(component).toBeTruthy();
  });

  it("When View Task Component loaded, Verify Task Count", () => {
    expect(component).toBeTruthy();    
    component.AllTasksInfo = TaskServiceMockData.TaskModel_All;        
    expect(TaskServiceMockData.TaskModel_All.length).toBe(component.AllTasksInfo.length);    
  });

  it("When View Task Component loaded and Filter Added, Verify Task Filtered", () => {
    expect(component).toBeTruthy();    
    component.AllTasksInfo = TaskServiceMockData.TaskModel_All;
    component.filterTaskDetails.TaskDescripton = TaskServiceMockData.Task1.TaskDescripton;
    component.OnSearchCriteriaChanged(component.filterTaskDetails.TaskDescripton);
    expect(TaskServiceMockData.Task1.TaskId).toBe(component.filteredDetails[0].TaskId); 
    expect(TaskServiceMockData.Task1.ParentTaskModelModule.ParentTaskId).toBe(component.filteredDetails[0].ParentTaskModelModule.ParentTaskId);
  });

  it("When View Task Component loaded and Filter Added, Verify Task Filtered", () => {
    expect(component).toBeTruthy();    
    component.AllTasksInfo = TaskServiceMockData.TaskModel_All;
    component.filterTaskDetails.TaskDescripton = TaskServiceMockData.Task1.TaskDescripton;
    component.OnSearchCriteriaChanged(component.filterTaskDetails.TaskDescripton);
    expect(TaskServiceMockData.Task1.TaskId).toBe(component.filteredDetails[0].TaskId); 
    expect(TaskServiceMockData.Task1.ParentTaskModelModule.ParentTaskId).toBe(component.filteredDetails[0].ParentTaskModelModule.ParentTaskId);
  });

  it("When View Task Component loaded and filter invalid, validate invalid dates in Filter", () => {
    expect(component).toBeTruthy();    
    component.AllTasksInfo = TaskServiceMockData.TaskModel_All;
    component.filterTaskDetails = TaskServiceMockData.TaskWithInvalidDates;
    component.ValidateStartEndDates();      
    fixture.detectChanges();         
    expect(true).toBe(component.error.isError);  
  });

  it("When View Task Component loaded and filter valid, validate valid dates in Filter", () => {
    expect(component).toBeTruthy();    
    component.AllTasksInfo = TaskServiceMockData.TaskModel_All;
    component.filterTaskDetails = TaskServiceMockData.Task2;
    component.ValidateStartEndDates();      
    fixture.detectChanges();         
    expect(false).toBe(component.error.isError); 
  });

  it("When View Task Component loaded and filter invalid, validate invalid Priority Out Of Range (Greater) in Filter", () => {
    expect(component).toBeTruthy();    
    component.AllTasksInfo = TaskServiceMockData.TaskModel_All;
    component.filterTaskDetails.Priority = 35;
    component.filterTaskDetails.PriorityTo = 40;
    component.ValidatePriorityRange();      
    fixture.detectChanges();         
    expect(true).toBe(component.isPriorityFromRangeError);  
    expect(true).toBe(component.isPriorityToRangeError);  
  });

  it("When View Task Component loaded and filter invalid, validate invalid Priority Out Of Range (lesser) in Filter", () => {
    expect(component).toBeTruthy();    
    component.AllTasksInfo = TaskServiceMockData.TaskModel_All;
    component.filterTaskDetails.Priority = -1;
    component.filterTaskDetails.PriorityTo = -5;
    component.ValidatePriorityRange();      
    fixture.detectChanges();         
    expect(true).toBe(component.isPriorityFromRangeError);  
    expect(true).toBe(component.isPriorityToRangeError);  
  });

  it("When View Task Component loaded and filter valid, validate invalidvalid Priority in Filter", () => {
    expect(component).toBeTruthy();    
    component.AllTasksInfo = TaskServiceMockData.TaskModel_All;
    component.filterTaskDetails.Priority = 1;
    component.filterTaskDetails.PriorityTo = 30;
    component.ValidatePriorityRange();      
    fixture.detectChanges();         
    expect(false).toBe(component.isPriorityFromRangeError);  
    expect(false).toBe(component.isPriorityToRangeError);  
  });


//   it("When Task is added, validate all values in Form controls", () => {
//     expect(component).toBeTruthy();
//     console.log("TaskServiceMockData" + TaskServiceMockData.NewTask1);
//     component.taskModel = TaskServiceMockData.NewTask1;       
//     fixture.detectChanges();        
//     expect(TaskServiceMockData.NewTask1.TaskDescripton).toBe(component.taskModel.TaskDescripton); 
//     expect(TaskServiceMockData.NewTask1.Priority).toBe(component.taskModel.Priority); 
//     expect(TaskServiceMockData.NewTask1.StartDate).toBe(component.taskModel.StartDate); 
//     expect(TaskServiceMockData.NewTask1.EndDate).toBe(component.taskModel.EndDate); 
//   });

//   it("When Task is added, validate invalid dates in Form controls", () => {
//     expect(component).toBeTruthy();
//     console.log("TaskServiceMockData" + TaskServiceMockData.TaskWithInvalidDates);
//     component.taskModel = TaskServiceMockData.TaskWithInvalidDates; 
//     component.ValidateStartEndDates();      
//     fixture.detectChanges();         
//     expect(true).toBe(component.error.isError);  
//   });

//   it("When Task is added, validate valid dates in Form controls", () => {
//     expect(component).toBeTruthy();
//     console.log("TaskServiceMockData" + TaskServiceMockData.NewTask1);
//     component.taskModel = TaskServiceMockData.NewTask1; 
//     component.ValidateStartEndDates();      
//     fixture.detectChanges();         
//     expect(false).toBe(component.error.isError);  
//   });

//   it("When Task is added/edited, in-valid data should not insert/edit data", () => {
//     expect(component).toBeTruthy();
//     console.log("TaskServiceMockData" + TaskServiceMockData.NewTask1);
//     component.taskModel = TaskServiceMockData.NewTask1; 
//     component.ValidateStartEndDates();      
//     component.AddEditTask();   
//     fixture.detectChanges();             
//   });
});
