import { TestBed, getTestBed, inject } from '@angular/core/testing';
import { TaskserviceService } from './taskservice.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { TaskServiceMockData } from './taskservice.service.mock';
import { url } from 'inspector';
import { ITaskService } from './taskservice.interface';

describe('TaskService', () => {

  let injector = TestBed;
  let service: TaskserviceService;  
  let httpMock: HttpTestingController;
  let serviceURL : "http://localhost/TaskManagerService/api/taskmodelmodules";

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskserviceService],      
      imports: [HttpClientTestingModule]
    });
    injector = TestBed;
    service = TestBed.get(TaskserviceService);    
    httpMock = TestBed.get(HttpTestingController);
    serviceURL = "http://localhost/TaskManagerService/api/taskmodelmodules";
  });

  afterEach(() => {
    //To check there is no outstanding outbound call after each test
    httpMock.verify();
  });


  it('When Task Service Instance Required Then Injector Provides',
    () => {
      expect(service).toBeTruthy();
      httpMock.verify();
    });


    it('When getTaskById Then getTaskById Should return matching Task', () => {      
      service.getTaskById(TaskServiceMockData.Task1.TaskId).subscribe(x => {                
        expect(x.TaskId).toBe(TaskServiceMockData.Task1.TaskId);
        expect(x.ParentTaskModelModule.ParentTaskId).toBe(TaskServiceMockData.Task1.ParentTaskModelModule.ParentTaskId);     
      });  

      var request = httpMock.expectOne(serviceURL + "/"+TaskServiceMockData.Task1.TaskId);      
      expect(request.request.method).toBe('GET');
      request.flush(TaskServiceMockData.Task1);  
    });
    
    it('When getAllTasks Then getAllTasks Should return all Task', () => {
      service.getAllTasks().subscribe(x => {                
        expect(x.length).toBe(TaskServiceMockData.TaskModel_All.length);          
      });
      var request = httpMock.expectOne(serviceURL);      
      expect(request.request.method).toBe('GET');
      request.flush(TaskServiceMockData.TaskModel_All);  
    });   
    
    it('When Add Task Then Verify Post is Called', () => {     
      service.AddTaskDetails(TaskServiceMockData.NewTask1).subscribe(x => {});;       
      var request = httpMock.expectOne(       
        req => 
        {         
          return req.method === 'POST' && req.url === serviceURL
        });     
        expect(request.request.body).not.toBeNull();
        expect(request.request.body).toBe(TaskServiceMockData.NewTask1);
        request.flush(TaskServiceMockData.NewTask1);
    });

    it('When Update Task Then Verify Put is Called', () => {     
      service.UpdateTaskDetails(TaskServiceMockData.NewTask1).subscribe(x => {});;       
      var request = httpMock.expectOne(       
        req => 
        {         
          return req.method === 'POST' && req.url === serviceURL
        });             
        expect(request.request.body).not.toBeNull();
        expect(request.request.body).toBe(TaskServiceMockData.NewTask1);
        request.flush(TaskServiceMockData.NewTask1);
    });
  });