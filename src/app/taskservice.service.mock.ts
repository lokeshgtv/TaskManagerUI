import { Injectable } from '@angular/core';
import { TaskModelModule } from './Model/task-model.module';
import { ParentTaskModelModule } from './Model/parent-task-model.module';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { URLSearchParams } from 'url';
import { HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';

export class TaskServiceMockData {

    public static ParentTask1 : ParentTaskModelModule = {
        ParentTaskId : 5001,
        ParentTaskName : "Parent Task 1"
    }

    public static ParentTask2 : ParentTaskModelModule = {
        ParentTaskId : 5002,
        ParentTaskName : "Parent Task 2"
    }

    public static ParentTask3 : ParentTaskModelModule = {
        ParentTaskId : 5003,
        ParentTaskName : "Parent Task 3"
    }   


    public static Task1: TaskModelModule = {
        TaskId : 101,
        TaskDescripton : "Task 1",
        Priority : 1,
        ParentTaskModelModule : TaskServiceMockData.ParentTask1,
        PriorityTo : null,
        StartDate : new Date(2018, 1, 1),
        EndDate : new Date(2018, 3, 1),
        IsFinished : false
    }

    public static Task2: TaskModelModule = {
        TaskId : 102,
        TaskDescripton : "Task 2",
        Priority : 30,
        ParentTaskModelModule : TaskServiceMockData.ParentTask2,
        PriorityTo : null,
        StartDate : new Date(2019, 9, 1),
        EndDate : new Date(2019, 12, 1),
        IsFinished : true
    }

    public static Task3: TaskModelModule = {
        TaskId : 103,
        TaskDescripton : "Task 3",
        Priority : 15,
        ParentTaskModelModule : TaskServiceMockData.ParentTask3,
        PriorityTo : null,
        StartDate : new Date(2020, 1, 1),
        EndDate : new Date(2020, 3, 1),
        IsFinished : false
    }

    public static Task4WithoutParent: TaskModelModule = {
        TaskId : 104,
        TaskDescripton : "Task 4",
        Priority : 10,
        ParentTaskModelModule : null,
        PriorityTo : null,
        StartDate : new Date(2017, 1, 1),
        EndDate : new Date(2017, 3, 1),
        IsFinished : false
    }

    public static Task5WithoutParent: TaskModelModule = {
        TaskId : 105,
        TaskDescripton : "Task 5",
        Priority : 20,
        ParentTaskModelModule : null,
        PriorityTo : null,
        StartDate : new Date(2015, 6, 1),
        EndDate : new Date(2015, 12, 1),
        IsFinished : false
    }

    public static NewTask1: TaskModelModule = {
        TaskId : null,
        TaskDescripton : "Task 1",
        Priority : 1,
        ParentTaskModelModule : null,
        PriorityTo : null,
        StartDate : new Date(2018, 1, 1),
        EndDate : new Date(2018, 3, 1),
        IsFinished : false
    }

    public static InvalidTaskDescription: TaskModelModule = {
        TaskId : null,
        TaskDescripton : null,
        Priority : 1,
        ParentTaskModelModule : null,
        PriorityTo : null,
        StartDate : new Date(2018, 1, 1),
        EndDate : new Date(2018, 3, 1),
        IsFinished : false
    }
    public static TaskWithInvalidDates: TaskModelModule = {
        TaskId : null,
        TaskDescripton : null,
        Priority : 1,
        ParentTaskModelModule : null,
        PriorityTo : null,
        StartDate : new Date(2019, 1, 1),
        EndDate : new Date(2018, 3, 1),
        IsFinished : false
    }

    public static TaskModel_WithChilderen: TaskModelModule[] =
    [
        TaskServiceMockData.Task1, TaskServiceMockData.Task2, 
        TaskServiceMockData.Task3
    ];

    public static TaskModel_WithoutChilderen: TaskModelModule[] =
    [
        TaskServiceMockData.Task4WithoutParent, 
        TaskServiceMockData.Task4WithoutParent
    ];

    public static TaskModel_All: TaskModelModule[] =
    [
        TaskServiceMockData.Task1, TaskServiceMockData.Task2, 
        TaskServiceMockData.Task3,
        TaskServiceMockData.Task4WithoutParent, 
        TaskServiceMockData.Task4WithoutParent
    ];
    
    
}