import { Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormBase } from './form-base-class';
import { Subscription } from 'rxjs';
import {
  FormControlTypeSafe,
  FormBuilderTypedService
} from '../services/form-builder-typed.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'form-textarea-disabled',
  template: `
    <mat-form-field class="full-width">
      <textarea
        matInput
        [rows]="rows"
        [placeholder]="placeholder"
        [formControl]="disabledControl"
        [name]="autoCompleteObscureName"
        autocomplete="dontcompleteme"
      ></textarea>
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
      useExisting: forwardRef(() => AppFormTextAreaDisabledComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AppFormTextAreaDisabledComponent),
      multi: true
    }
  ]
})
export class AppFormTextAreaDisabledComponent extends FormBase<string>
  implements OnInit, OnDestroy {

  @Input()
  rows = 4;

  disabledControl: FormControlTypeSafe<string>;
  disabledControlSubscription: Subscription;

  constructor(private fb: FormBuilderTypedService) {
    super();
    this.disabledControl = this.fb.control<string>({
      value: '',
      disabled: true
    });
  }

  ngOnInit() {
    this.disabledControl.setValue(this.internalControl.value);
    this.disabledControlSubscription = this.internalControl.valueChanges.subscribe(
      () => {
        this.disabledControl.setValue(this.internalControl.value);
      }
    );
  }

  ngOnDestroy() {
    this.disabledControlSubscription.unsubscribe();
  }
}
