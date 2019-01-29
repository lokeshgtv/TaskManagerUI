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
import { AddTaskComponent } from './add-task.component';
import { ViewTaskComponent } from '..//view-task/view-task.component';
import { TaskServiceFake } from "../taskservice.service.fake";
import { AppModuleUnitTestFixture } from "../app.module.unittest.fixture";
import { TaskModelModule } from '../Model/task-model.module';

describe('AddTaskComponent', () => {
  let routerMock: any;  
  let routerSpy: Router;
  let service: ITaskService;
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;


  beforeEach(async(() => {
    TestBed.overrideComponent(
      AddTaskComponent,
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
    fixture = TestBed.createComponent(AddTaskComponent);        
    component = fixture.componentInstance;        
    component.ngOnInit();
  });

  it('When Add Task Component Created Verify Component is Created', () => {
    expect(component).toBeTruthy();
  });

  it("When Task Description getss updated, Form validity should afftected for New Task", () => {
    expect(component).toBeTruthy();
    console.log("TaskServiceMockData" + TaskServiceMockData.NewTask1.TaskDescripton);
    component.taskModel = TaskServiceMockData.NewTask1;        
    expect(true).toBe(component.valider());    
  });

  it("When Task is added, validate all values in Form controls", () => {
    expect(component).toBeTruthy();
    console.log("TaskServiceMockData" + TaskServiceMockData.NewTask1);
    component.taskModel = TaskServiceMockData.NewTask1;       
    fixture.detectChanges();        
    expect(TaskServiceMockData.NewTask1.TaskDescripton).toBe(component.taskModel.TaskDescripton); 
    expect(TaskServiceMockData.NewTask1.Priority).toBe(component.taskModel.Priority); 
    expect(TaskServiceMockData.NewTask1.StartDate).toBe(component.taskModel.StartDate); 
    expect(TaskServiceMockData.NewTask1.EndDate).toBe(component.taskModel.EndDate); 
  });

  it("When Task is added, validate invalid dates in Form controls", () => {
    expect(component).toBeTruthy();
    console.log("TaskServiceMockData" + TaskServiceMockData.TaskWithInvalidDates);
    component.taskModel = TaskServiceMockData.TaskWithInvalidDates; 
    component.ValidateStartEndDates();      
    fixture.detectChanges();         
    expect(true).toBe(component.error.isError);  
  });

  it("When Task is added, validate valid dates in Form controls", () => {
    expect(component).toBeTruthy();
    console.log("TaskServiceMockData" + TaskServiceMockData.NewTask1);
    component.taskModel = TaskServiceMockData.NewTask1; 
    component.ValidateStartEndDates();      
    fixture.detectChanges();         
    expect(false).toBe(component.error.isError);  
  });  
});
