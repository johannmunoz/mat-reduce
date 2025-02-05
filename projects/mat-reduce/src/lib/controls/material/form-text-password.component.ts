import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormBase } from '../form-base-class';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'form-text-password',
  template: `
    <mat-form-field [appearance]="appearance" class="full-width">
      <input
        matInput
        [placeholder]="placeholder"
        [maxlength]="maxlength"
        [formControl]="internalControl"
        [name]="autoCompleteObscureName"
        autocomplete="dontcompleteme"
        [type]="inputType"
      />
      <mat-icon matSuffix (click)="toggleHide()">{{
        hidePassword ? 'visibility_off' : 'visibility'
      }}</mat-icon>
    </mat-form-field>
  `,
  styles: [
    `
      .full-width {
        width: 100%;
      }
    `
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LibFormTextPasswordComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => LibFormTextPasswordComponent),
      multi: true
    }
  ]
})
export class LibFormTextPasswordComponent extends FormBase<string>
  implements OnInit {
  @Input()
  maxlength: number;

  get inputType() {
    return this.hidePassword ? 'password' : 'text';
  }

  hidePassword = true;

  toggleHide() {
    this.hidePassword = !this.hidePassword;
  }
}
