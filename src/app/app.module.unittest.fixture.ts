import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ITaskService } from './taskservice.interface';
import { TaskserviceService } from './taskservice.service';
import { AppModule } from 'src/app/app.module';
import { appRoutes } from './app-routing.module';
import { TaskServiceFake } from './taskservice.service.fake';
import { RouterModule } from '@angular/router';
import { TaskFilterPipe } from './Filters/TaskFilter';
import { DatePipe } from '@angular/common';


@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,       
    AppModule
  ],
  providers: [{provide: ITaskService,useClass:TaskServiceFake},
    TaskFilterPipe, DatePipe],
})
export class AppModuleUnitTestFixture 
{ 
  
}