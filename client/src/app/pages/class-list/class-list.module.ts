import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassListComponent } from './class-list.component';
import { ClassListRoutingModule } from './class-list-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    ClassListRoutingModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    ClassListComponent
  ]
})
export class ClassListModule { }
