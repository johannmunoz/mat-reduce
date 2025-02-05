import { Component, forwardRef, Input, OnInit, OnDestroy } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormBase } from '../form-base-class';

function compareObject(l1: {}, l2: {}) {
  if (!l1 || !l2) {
    return false;
  }
  let json1, json2;
  try {
    json1 = JSON.stringify(l1);
    json2 = JSON.stringify(l2);
  } catch (error) {
    return false;
  }
  if (json1 !== json2) {
    return false;
  }
  return true;
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'form-select-object',
  template: `
    <mat-form-field [appearance]="appearance" class="full-width">
      <mat-select
        [formControl]="this.internalControl"
        [placeholder]="placeholder"
        [compareWith]="compareObject"
      >
        <mat-option
          *ngFor="let selectionObject of selectionObjects"
          [value]="selectionObject"
        >
          {{ selectionObject[selectionKey] }}
        </mat-option>
      </mat-select>
    </mat-form-field>
  `,
  styles: [
    `
      .full-width {
        width: 100%;
        padding-bottom: 15px;
      }
    `
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LibFormSelectObjectComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => LibFormSelectObjectComponent),
      multi: true
    }
  ]
})
export class LibFormSelectObjectComponent extends FormBase<Object> {
  @Input()
  selectionObjects: Object[];
  @Input()
  selectionKey: string;

  compareObject = compareObject;

  writeValue(newVal: Object) {
    this.value = newVal || {};
  }
}
