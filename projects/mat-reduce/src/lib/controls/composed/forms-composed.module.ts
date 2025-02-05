import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatIconModule } from '@angular/material';

import { MatReduceFormsUsingMaterialModule } from '../material/forms-material.module';
import { LibFormAssigneeSelectorComponent } from './form-assignee-selector.component';

const exportedModules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  MatIconModule,
  MatCardModule,
  MatReduceFormsUsingMaterialModule
];

const exported = [LibFormAssigneeSelectorComponent];

@NgModule({
  imports: [...exportedModules],
  exports: [...exported, ...exportedModules],
  declarations: [...exported],
  providers: []
})
export class MatReduceFormsComposedModule {}
