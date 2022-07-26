import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassEditComponent } from './class-edit.component';
import { ClassEditRoutingModule } from './class-edit-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    ClassEditRoutingModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    ClassEditComponent
  ]
})
export class ClassEditModule { }
