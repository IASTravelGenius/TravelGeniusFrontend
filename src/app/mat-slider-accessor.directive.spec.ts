import { Directive, HostListener, ElementRef, Renderer2, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
    selector: 'mat-slider[formControlName], mat-slider[formControl], mat-slider[ngModel]',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MatSliderValueAccessorDirective),
            multi: true
        }
    ],
    standalone: false
})
export class MatSliderValueAccessorDirective implements ControlValueAccessor {
  onChange = (_: any) => {};
  onTouched = () => {};

  constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {}

  @HostListener('input', ['$event.target.value'])
  input(value: any): void {
    this.onChange(parseFloat(value));
  }

  @HostListener('blur')
  blur(): void {
    this.onTouched();
  }

  writeValue(value: any): void {
    this._renderer.setProperty(this._elementRef.nativeElement, 'value', value);
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
  }
}
