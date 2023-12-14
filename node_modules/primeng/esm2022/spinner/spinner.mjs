import { NgModule, Component, Input, Output, EventEmitter, forwardRef, ViewChild, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export const SPINNER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Spinner),
    multi: true
};
export class Spinner {
    el;
    cd;
    onChange = new EventEmitter();
    onFocus = new EventEmitter();
    onBlur = new EventEmitter();
    min;
    max;
    maxlength;
    size;
    placeholder;
    inputId;
    disabled;
    readonly;
    tabindex;
    required;
    name;
    ariaLabelledBy;
    inputStyle;
    inputStyleClass;
    formatInput;
    decimalSeparator;
    thousandSeparator;
    precision;
    value;
    _step = 1;
    formattedValue;
    onModelChange = () => { };
    onModelTouched = () => { };
    keyPattern = /[0-9\+\-]/;
    timer;
    focus;
    filled;
    negativeSeparator = '-';
    localeDecimalSeparator;
    localeThousandSeparator;
    thousandRegExp;
    calculatedPrecision;
    inputfieldViewChild;
    get step() {
        return this._step;
    }
    set step(val) {
        this._step = val;
        if (this._step != null) {
            let tokens = this.step.toString().split(/[,]|[.]/);
            this.calculatedPrecision = tokens[1] ? tokens[1].length : undefined;
        }
    }
    constructor(el, cd) {
        this.el = el;
        this.cd = cd;
    }
    ngOnInit() {
        if (this.formatInput) {
            this.localeDecimalSeparator = (1.1).toLocaleString().substring(1, 2);
            this.localeThousandSeparator = (1000).toLocaleString().substring(1, 2);
            this.thousandRegExp = new RegExp(`[${this.thousandSeparator || this.localeThousandSeparator}]`, 'gim');
            if (this.decimalSeparator && this.thousandSeparator && this.decimalSeparator === this.thousandSeparator) {
                console.warn('thousandSeparator and decimalSeparator cannot have the same value.');
            }
        }
    }
    repeat(event, interval, dir) {
        let i = interval || 500;
        this.clearTimer();
        this.timer = setTimeout(() => {
            this.repeat(event, 40, dir);
        }, i);
        this.spin(event, dir);
    }
    spin(event, dir) {
        let step = this.step * dir;
        let currentValue;
        let precision = this.getPrecision();
        if (this.value)
            currentValue = typeof this.value === 'string' ? this.parseValue(this.value) : this.value;
        else
            currentValue = 0;
        if (precision)
            this.value = parseFloat(this.toFixed(currentValue + step, precision));
        else
            this.value = currentValue + step;
        if (this.maxlength !== undefined && this.value.toString().length > this.maxlength) {
            this.value = currentValue;
        }
        if (this.min !== undefined && this.value < this.min) {
            this.value = this.min;
        }
        if (this.max !== undefined && this.value > this.max) {
            this.value = this.max;
        }
        this.formatValue();
        this.onModelChange(this.value);
        this.onChange.emit(event);
    }
    getPrecision() {
        return this.precision === undefined ? this.calculatedPrecision : this.precision;
    }
    toFixed(value, precision) {
        let power = Math.pow(10, precision || 0);
        return String(Math.round(value * power) / power);
    }
    onUpButtonMousedown(event) {
        if (!this.disabled) {
            this.inputfieldViewChild.nativeElement.focus();
            this.repeat(event, null, 1);
            this.updateFilledState();
            event.preventDefault();
        }
    }
    onUpButtonMouseup(event) {
        if (!this.disabled) {
            this.clearTimer();
        }
    }
    onUpButtonMouseleave(event) {
        if (!this.disabled) {
            this.clearTimer();
        }
    }
    onDownButtonMousedown(event) {
        if (!this.disabled) {
            this.inputfieldViewChild.nativeElement.focus();
            this.repeat(event, null, -1);
            this.updateFilledState();
            event.preventDefault();
        }
    }
    onDownButtonMouseup(event) {
        if (!this.disabled) {
            this.clearTimer();
        }
    }
    onDownButtonMouseleave(event) {
        if (!this.disabled) {
            this.clearTimer();
        }
    }
    onInputKeydown(event) {
        if (event.which == 38) {
            this.spin(event, 1);
            event.preventDefault();
        }
        else if (event.which == 40) {
            this.spin(event, -1);
            event.preventDefault();
        }
    }
    onInputChange(event) {
        this.onChange.emit(event);
    }
    onInput(event) {
        this.value = this.parseValue(event.target.value);
        this.onModelChange(this.value);
        this.updateFilledState();
    }
    onInputBlur(event) {
        this.focus = false;
        this.formatValue();
        this.onModelTouched();
        this.onBlur.emit(event);
    }
    onInputFocus(event) {
        this.focus = true;
        this.onFocus.emit(event);
    }
    parseValue(val) {
        let value;
        let precision = this.getPrecision();
        if (val.trim() === '') {
            value = null;
        }
        else {
            if (this.formatInput) {
                val = val.replace(this.thousandRegExp, '');
            }
            if (precision) {
                val = this.formatInput ? val.replace(this.decimalSeparator || this.localeDecimalSeparator, '.') : val.replace(',', '.');
                value = parseFloat(val);
            }
            else {
                value = parseInt(val, 10);
            }
            if (!isNaN(value)) {
                if (this.max !== null && value > this.max) {
                    value = this.max;
                }
                if (this.min !== null && value < this.min) {
                    value = this.min;
                }
            }
            else {
                value = null;
            }
        }
        return value;
    }
    formatValue() {
        let value = this.value;
        let precision = this.getPrecision();
        if (value != null) {
            if (this.formatInput) {
                value = value.toLocaleString(undefined, { maximumFractionDigits: 20 });
                if (this.decimalSeparator && this.thousandSeparator) {
                    value = value.split(this.localeDecimalSeparator);
                    if (precision && value[1]) {
                        value[1] = (this.decimalSeparator || this.localeDecimalSeparator) + value[1];
                    }
                    if (this.thousandSeparator && value[0].length > 3) {
                        value[0] = value[0].replace(new RegExp(`[${this.localeThousandSeparator}]`, 'gim'), this.thousandSeparator);
                    }
                    value = value.join('');
                }
            }
            this.formattedValue = value.toString();
        }
        else {
            this.formattedValue = null;
        }
        if (this.inputfieldViewChild && this.inputfieldViewChild.nativeElement) {
            this.inputfieldViewChild.nativeElement.value = this.formattedValue;
        }
    }
    clearTimer() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }
    writeValue(value) {
        this.value = value;
        this.formatValue();
        this.updateFilledState();
        this.cd.markForCheck();
    }
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
    setDisabledState(val) {
        this.disabled = val;
        this.cd.markForCheck();
    }
    updateFilledState() {
        this.filled = this.value !== undefined && this.value != null;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: Spinner, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.5", type: Spinner, selector: "p-spinner", inputs: { min: "min", max: "max", maxlength: "maxlength", size: "size", placeholder: "placeholder", inputId: "inputId", disabled: "disabled", readonly: "readonly", tabindex: "tabindex", required: "required", name: "name", ariaLabelledBy: "ariaLabelledBy", inputStyle: "inputStyle", inputStyleClass: "inputStyleClass", formatInput: "formatInput", decimalSeparator: "decimalSeparator", thousandSeparator: "thousandSeparator", precision: "precision", step: "step" }, outputs: { onChange: "onChange", onFocus: "onFocus", onBlur: "onBlur" }, host: { properties: { "class.ui-inputwrapper-filled": "filled", "class.ui-inputwrapper-focus": "focus" }, classAttribute: "p-element" }, providers: [SPINNER_VALUE_ACCESSOR], viewQueries: [{ propertyName: "inputfieldViewChild", first: true, predicate: ["inputfield"], descendants: true }], ngImport: i0, template: `
        <span class="ui-spinner ui-widget ui-corner-all">
            <input
                #inputfield
                type="text"
                [attr.id]="inputId"
                [value]="formattedValue || null"
                [attr.name]="name"
                [attr.aria-valumin]="min"
                [attr.aria-valuemax]="max"
                [attr.aria-valuenow]="value"
                [attr.aria-labelledby]="ariaLabelledBy"
                [attr.size]="size"
                [attr.maxlength]="maxlength"
                [attr.tabindex]="tabindex"
                [attr.placeholder]="placeholder"
                [disabled]="disabled"
                [readonly]="readonly"
                [attr.required]="required"
                (keydown)="onInputKeydown($event)"
                (blur)="onInputBlur($event)"
                (input)="onInput($event)"
                (change)="onInputChange($event)"
                (focus)="onInputFocus($event)"
                [ngStyle]="inputStyle"
                [class]="inputStyleClass"
                [ngClass]="'ui-spinner-input ui-inputtext ui-widget ui-state-default ui-corner-all'"
            />
            <button
                type="button"
                [ngClass]="{ 'ui-spinner-button ui-spinner-up ui-corner-tr ui-button ui-widget ui-state-default': true, 'ui-state-disabled': disabled }"
                [disabled]="disabled || readonly"
                tabindex="-1"
                [attr.readonly]="readonly"
                (mouseleave)="onUpButtonMouseleave($event)"
                (mousedown)="onUpButtonMousedown($event)"
                (mouseup)="onUpButtonMouseup($event)"
            >
                <span class="ui-spinner-button-icon pi pi-caret-up ui-clickable"></span>
            </button>
            <button
                type="button"
                [ngClass]="{ 'ui-spinner-button ui-spinner-down ui-corner-br ui-button ui-widget ui-state-default': true, 'ui-state-disabled': disabled }"
                [disabled]="disabled || readonly"
                tabindex="-1"
                [attr.readonly]="readonly"
                (mouseleave)="onDownButtonMouseleave($event)"
                (mousedown)="onDownButtonMousedown($event)"
                (mouseup)="onDownButtonMouseup($event)"
            >
                <span class="ui-spinner-button-icon pi pi-caret-down ui-clickable"></span>
            </button>
        </span>
    `, isInline: true, styles: ["@layer primeng{.ui-spinner{display:inline-block;overflow:visible;padding:0;position:relative;vertical-align:middle}.ui-spinner-input{vertical-align:middle;padding-right:1.5em}.ui-spinner-button{cursor:default;display:block;height:50%;margin:0;overflow:hidden;padding:0;position:absolute;right:0;text-align:center;vertical-align:middle;width:1.5em}.ui-spinner .ui-spinner-button-icon{position:absolute;top:50%;left:50%;margin-top:-.5em;margin-left:-.5em;width:1em}.ui-spinner-up{top:0}.ui-spinner-down{bottom:0}.ui-fluid .ui-spinner{width:100%}.ui-fluid .ui-spinner .ui-spinner-input{padding-right:2em;width:100%}.ui-fluid .ui-spinner .ui-spinner-button{width:1.5em}.ui-fluid .ui-spinner .ui-spinner-button .ui-spinner-button-icon{left:.7em}}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: Spinner, decorators: [{
            type: Component,
            args: [{ selector: 'p-spinner', template: `
        <span class="ui-spinner ui-widget ui-corner-all">
            <input
                #inputfield
                type="text"
                [attr.id]="inputId"
                [value]="formattedValue || null"
                [attr.name]="name"
                [attr.aria-valumin]="min"
                [attr.aria-valuemax]="max"
                [attr.aria-valuenow]="value"
                [attr.aria-labelledby]="ariaLabelledBy"
                [attr.size]="size"
                [attr.maxlength]="maxlength"
                [attr.tabindex]="tabindex"
                [attr.placeholder]="placeholder"
                [disabled]="disabled"
                [readonly]="readonly"
                [attr.required]="required"
                (keydown)="onInputKeydown($event)"
                (blur)="onInputBlur($event)"
                (input)="onInput($event)"
                (change)="onInputChange($event)"
                (focus)="onInputFocus($event)"
                [ngStyle]="inputStyle"
                [class]="inputStyleClass"
                [ngClass]="'ui-spinner-input ui-inputtext ui-widget ui-state-default ui-corner-all'"
            />
            <button
                type="button"
                [ngClass]="{ 'ui-spinner-button ui-spinner-up ui-corner-tr ui-button ui-widget ui-state-default': true, 'ui-state-disabled': disabled }"
                [disabled]="disabled || readonly"
                tabindex="-1"
                [attr.readonly]="readonly"
                (mouseleave)="onUpButtonMouseleave($event)"
                (mousedown)="onUpButtonMousedown($event)"
                (mouseup)="onUpButtonMouseup($event)"
            >
                <span class="ui-spinner-button-icon pi pi-caret-up ui-clickable"></span>
            </button>
            <button
                type="button"
                [ngClass]="{ 'ui-spinner-button ui-spinner-down ui-corner-br ui-button ui-widget ui-state-default': true, 'ui-state-disabled': disabled }"
                [disabled]="disabled || readonly"
                tabindex="-1"
                [attr.readonly]="readonly"
                (mouseleave)="onDownButtonMouseleave($event)"
                (mousedown)="onDownButtonMousedown($event)"
                (mouseup)="onDownButtonMouseup($event)"
            >
                <span class="ui-spinner-button-icon pi pi-caret-down ui-clickable"></span>
            </button>
        </span>
    `, host: {
                        class: 'p-element',
                        '[class.ui-inputwrapper-filled]': 'filled',
                        '[class.ui-inputwrapper-focus]': 'focus'
                    }, providers: [SPINNER_VALUE_ACCESSOR], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, styles: ["@layer primeng{.ui-spinner{display:inline-block;overflow:visible;padding:0;position:relative;vertical-align:middle}.ui-spinner-input{vertical-align:middle;padding-right:1.5em}.ui-spinner-button{cursor:default;display:block;height:50%;margin:0;overflow:hidden;padding:0;position:absolute;right:0;text-align:center;vertical-align:middle;width:1.5em}.ui-spinner .ui-spinner-button-icon{position:absolute;top:50%;left:50%;margin-top:-.5em;margin-left:-.5em;width:1em}.ui-spinner-up{top:0}.ui-spinner-down{bottom:0}.ui-fluid .ui-spinner{width:100%}.ui-fluid .ui-spinner .ui-spinner-input{padding-right:2em;width:100%}.ui-fluid .ui-spinner .ui-spinner-button{width:1.5em}.ui-fluid .ui-spinner .ui-spinner-button .ui-spinner-button-icon{left:.7em}}\n"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }], propDecorators: { onChange: [{
                type: Output
            }], onFocus: [{
                type: Output
            }], onBlur: [{
                type: Output
            }], min: [{
                type: Input
            }], max: [{
                type: Input
            }], maxlength: [{
                type: Input
            }], size: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], inputId: [{
                type: Input
            }], disabled: [{
                type: Input
            }], readonly: [{
                type: Input
            }], tabindex: [{
                type: Input
            }], required: [{
                type: Input
            }], name: [{
                type: Input
            }], ariaLabelledBy: [{
                type: Input
            }], inputStyle: [{
                type: Input
            }], inputStyleClass: [{
                type: Input
            }], formatInput: [{
                type: Input
            }], decimalSeparator: [{
                type: Input
            }], thousandSeparator: [{
                type: Input
            }], precision: [{
                type: Input
            }], inputfieldViewChild: [{
                type: ViewChild,
                args: ['inputfield']
            }], step: [{
                type: Input
            }] } });
export class SpinnerModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: SpinnerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.0.5", ngImport: i0, type: SpinnerModule, declarations: [Spinner], imports: [CommonModule, InputTextModule], exports: [Spinner] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: SpinnerModule, imports: [CommonModule, InputTextModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: SpinnerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, InputTextModule],
                    exports: [Spinner],
                    declarations: [Spinner]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Bpbm5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvY29tcG9uZW50cy9zcGlubmVyL3NwaW5uZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQXNCLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQXFCLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNMLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDcEQsT0FBTyxFQUFFLGlCQUFpQixFQUF3QixNQUFNLGdCQUFnQixDQUFDOzs7QUFFekUsTUFBTSxDQUFDLE1BQU0sc0JBQXNCLEdBQVE7SUFDdkMsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQztJQUN0QyxLQUFLLEVBQUUsSUFBSTtDQUNkLENBQUM7QUFvRUYsTUFBTSxPQUFPLE9BQU87SUFxRkc7SUFBdUI7SUFwRmhDLFFBQVEsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUVqRCxPQUFPLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7SUFFaEQsTUFBTSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO0lBRWhELEdBQUcsQ0FBUztJQUVaLEdBQUcsQ0FBUztJQUVaLFNBQVMsQ0FBUztJQUVsQixJQUFJLENBQVM7SUFFYixXQUFXLENBQVM7SUFFcEIsT0FBTyxDQUFTO0lBRWhCLFFBQVEsQ0FBVTtJQUVsQixRQUFRLENBQVU7SUFFbEIsUUFBUSxDQUFTO0lBRWpCLFFBQVEsQ0FBVTtJQUVsQixJQUFJLENBQVM7SUFFYixjQUFjLENBQVM7SUFFdkIsVUFBVSxDQUFNO0lBRWhCLGVBQWUsQ0FBUztJQUV4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Z0JBRUcsUUFBUTtzQkFBaEIsS0FBSztnQkFFRyxRQUFRO3NCQUFoQixLQUFLO2dCQUVHLElBQUk7c0JBQVosS0FBSztnQkFFRyxjQUFjO3NCQUF0QixLQUFLO2dCQUVHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBRUcsZUFBZTtzQkFBdkIsS0FBSztnQkFFRyxXQUFXO3NCQUFuQixLQUFLO2dCQUVHLGdCQUFnQjtzQkFBeEIsS0FBSztnQkFFRyxpQkFBaUI7c0JBQXpCLEtBQUs7Z0JBRUcsU0FBUztzQkFBakIsS0FBSztnQkE4Qm1CLG1CQUFtQjtzQkFBM0MsU0FBUzt1QkFBQyxZQUFZO2dCQUVWLElBQUk7c0JBQWhCLEtBQUs7O0FBMlBWLE1BQU0sT0FBTyxhQUFhO3VHQUFiLGFBQWE7d0dBQWIsYUFBYSxpQkFwVWIsT0FBTyxhQWdVTixZQUFZLEVBQUUsZUFBZSxhQWhVOUIsT0FBTzt3R0FvVVAsYUFBYSxZQUpaLFlBQVksRUFBRSxlQUFlOzsyRkFJOUIsYUFBYTtrQkFMekIsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsZUFBZSxDQUFDO29CQUN4QyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUM7b0JBQ2xCLFlBQVksRUFBRSxDQUFDLE9BQU8sQ0FBQztpQkFDMUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgZm9yd2FyZFJlZiwgVmlld0NoaWxkLCBDaGFuZ2VEZXRlY3RvclJlZiwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSW5wdXRUZXh0TW9kdWxlIH0gZnJvbSAncHJpbWVuZy9pbnB1dHRleHQnO1xuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5leHBvcnQgY29uc3QgU1BJTk5FUl9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFNwaW5uZXIpLFxuICAgIG11bHRpOiB0cnVlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Atc3Bpbm5lcicsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1zcGlubmVyIHVpLXdpZGdldCB1aS1jb3JuZXItYWxsXCI+XG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAjaW5wdXRmaWVsZFxuICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICBbYXR0ci5pZF09XCJpbnB1dElkXCJcbiAgICAgICAgICAgICAgICBbdmFsdWVdPVwiZm9ybWF0dGVkVmFsdWUgfHwgbnVsbFwiXG4gICAgICAgICAgICAgICAgW2F0dHIubmFtZV09XCJuYW1lXCJcbiAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLXZhbHVtaW5dPVwibWluXCJcbiAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLXZhbHVlbWF4XT1cIm1heFwiXG4gICAgICAgICAgICAgICAgW2F0dHIuYXJpYS12YWx1ZW5vd109XCJ2YWx1ZVwiXG4gICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XT1cImFyaWFMYWJlbGxlZEJ5XCJcbiAgICAgICAgICAgICAgICBbYXR0ci5zaXplXT1cInNpemVcIlxuICAgICAgICAgICAgICAgIFthdHRyLm1heGxlbmd0aF09XCJtYXhsZW5ndGhcIlxuICAgICAgICAgICAgICAgIFthdHRyLnRhYmluZGV4XT1cInRhYmluZGV4XCJcbiAgICAgICAgICAgICAgICBbYXR0ci5wbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXG4gICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgICAgICAgICBbcmVhZG9ubHldPVwicmVhZG9ubHlcIlxuICAgICAgICAgICAgICAgIFthdHRyLnJlcXVpcmVkXT1cInJlcXVpcmVkXCJcbiAgICAgICAgICAgICAgICAoa2V5ZG93bik9XCJvbklucHV0S2V5ZG93bigkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAoYmx1cik9XCJvbklucHV0Qmx1cigkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAoaW5wdXQpPVwib25JbnB1dCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAoY2hhbmdlKT1cIm9uSW5wdXRDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgKGZvY3VzKT1cIm9uSW5wdXRGb2N1cygkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICBbbmdTdHlsZV09XCJpbnB1dFN0eWxlXCJcbiAgICAgICAgICAgICAgICBbY2xhc3NdPVwiaW5wdXRTdHlsZUNsYXNzXCJcbiAgICAgICAgICAgICAgICBbbmdDbGFzc109XCIndWktc3Bpbm5lci1pbnB1dCB1aS1pbnB1dHRleHQgdWktd2lkZ2V0IHVpLXN0YXRlLWRlZmF1bHQgdWktY29ybmVyLWFsbCdcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7ICd1aS1zcGlubmVyLWJ1dHRvbiB1aS1zcGlubmVyLXVwIHVpLWNvcm5lci10ciB1aS1idXR0b24gdWktd2lkZ2V0IHVpLXN0YXRlLWRlZmF1bHQnOiB0cnVlLCAndWktc3RhdGUtZGlzYWJsZWQnOiBkaXNhYmxlZCB9XCJcbiAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWQgfHwgcmVhZG9ubHlcIlxuICAgICAgICAgICAgICAgIHRhYmluZGV4PVwiLTFcIlxuICAgICAgICAgICAgICAgIFthdHRyLnJlYWRvbmx5XT1cInJlYWRvbmx5XCJcbiAgICAgICAgICAgICAgICAobW91c2VsZWF2ZSk9XCJvblVwQnV0dG9uTW91c2VsZWF2ZSgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAobW91c2Vkb3duKT1cIm9uVXBCdXR0b25Nb3VzZWRvd24oJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgKG1vdXNldXApPVwib25VcEJ1dHRvbk1vdXNldXAoJGV2ZW50KVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1zcGlubmVyLWJ1dHRvbi1pY29uIHBpIHBpLWNhcmV0LXVwIHVpLWNsaWNrYWJsZVwiPjwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsgJ3VpLXNwaW5uZXItYnV0dG9uIHVpLXNwaW5uZXItZG93biB1aS1jb3JuZXItYnIgdWktYnV0dG9uIHVpLXdpZGdldCB1aS1zdGF0ZS1kZWZhdWx0JzogdHJ1ZSwgJ3VpLXN0YXRlLWRpc2FibGVkJzogZGlzYWJsZWQgfVwiXG4gICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkIHx8IHJlYWRvbmx5XCJcbiAgICAgICAgICAgICAgICB0YWJpbmRleD1cIi0xXCJcbiAgICAgICAgICAgICAgICBbYXR0ci5yZWFkb25seV09XCJyZWFkb25seVwiXG4gICAgICAgICAgICAgICAgKG1vdXNlbGVhdmUpPVwib25Eb3duQnV0dG9uTW91c2VsZWF2ZSgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAobW91c2Vkb3duKT1cIm9uRG93bkJ1dHRvbk1vdXNlZG93bigkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAobW91c2V1cCk9XCJvbkRvd25CdXR0b25Nb3VzZXVwKCRldmVudClcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktc3Bpbm5lci1idXR0b24taWNvbiBwaSBwaS1jYXJldC1kb3duIHVpLWNsaWNrYWJsZVwiPjwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L3NwYW4+XG4gICAgYCxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAncC1lbGVtZW50JyxcbiAgICAgICAgJ1tjbGFzcy51aS1pbnB1dHdyYXBwZXItZmlsbGVkXSc6ICdmaWxsZWQnLFxuICAgICAgICAnW2NsYXNzLnVpLWlucHV0d3JhcHBlci1mb2N1c10nOiAnZm9jdXMnXG4gICAgfSxcbiAgICBwcm92aWRlcnM6IFtTUElOTkVSX1ZBTFVFX0FDQ0VTU09SXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHN0eWxlVXJsczogWycuL3NwaW5uZXIuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgU3Bpbm5lciBpbXBsZW1lbnRzIE9uSW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICAgIEBPdXRwdXQoKSBvbkNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25Gb2N1czogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25CbHVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBJbnB1dCgpIG1pbjogbnVtYmVyO1xuXG4gICAgQElucHV0KCkgbWF4OiBudW1iZXI7XG5cbiAgICBASW5wdXQoKSBtYXhsZW5ndGg6IG51bWJlcjtcblxuICAgIEBJbnB1dCgpIHNpemU6IG51bWJlcjtcblxuICAgIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBpbnB1dElkOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIHJlYWRvbmx5OiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgdGFiaW5kZXg6IG51bWJlcjtcblxuICAgIEBJbnB1dCgpIHJlcXVpcmVkOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgbmFtZTogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgYXJpYUxhYmVsbGVkQnk6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGlucHV0U3R5bGU6IGFueTtcblxuICAgIEBJbnB1dCgpIGlucHV0U3R5bGVDbGFzczogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgZm9ybWF0SW5wdXQ6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBkZWNpbWFsU2VwYXJhdG9yOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSB0aG91c2FuZFNlcGFyYXRvcjogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgcHJlY2lzaW9uOiBudW1iZXI7XG5cbiAgICB2YWx1ZTogYW55O1xuXG4gICAgX3N0ZXA6IG51bWJlciA9IDE7XG5cbiAgICBmb3JtYXR0ZWRWYWx1ZTogc3RyaW5nO1xuXG4gICAgb25Nb2RlbENoYW5nZTogRnVuY3Rpb24gPSAoKSA9PiB7fTtcblxuICAgIG9uTW9kZWxUb3VjaGVkOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuXG4gICAga2V5UGF0dGVybjogUmVnRXhwID0gL1swLTlcXCtcXC1dLztcblxuICAgIHB1YmxpYyB0aW1lcjogYW55O1xuXG4gICAgcHVibGljIGZvY3VzOiBib29sZWFuO1xuXG4gICAgcHVibGljIGZpbGxlZDogYm9vbGVhbjtcblxuICAgIHB1YmxpYyBuZWdhdGl2ZVNlcGFyYXRvciA9ICctJztcblxuICAgIGxvY2FsZURlY2ltYWxTZXBhcmF0b3I6IHN0cmluZztcblxuICAgIGxvY2FsZVRob3VzYW5kU2VwYXJhdG9yOiBzdHJpbmc7XG5cbiAgICB0aG91c2FuZFJlZ0V4cDogUmVnRXhwO1xuXG4gICAgY2FsY3VsYXRlZFByZWNpc2lvbjogbnVtYmVyO1xuXG4gICAgQFZpZXdDaGlsZCgnaW5wdXRmaWVsZCcpIGlucHV0ZmllbGRWaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XG5cbiAgICBASW5wdXQoKSBnZXQgc3RlcCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3RlcDtcbiAgICB9XG4gICAgc2V0IHN0ZXAodmFsOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fc3RlcCA9IHZhbDtcblxuICAgICAgICBpZiAodGhpcy5fc3RlcCAhPSBudWxsKSB7XG4gICAgICAgICAgICBsZXQgdG9rZW5zID0gdGhpcy5zdGVwLnRvU3RyaW5nKCkuc3BsaXQoL1ssXXxbLl0vKTtcbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlZFByZWNpc2lvbiA9IHRva2Vuc1sxXSA/IHRva2Vuc1sxXS5sZW5ndGggOiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYsIHB1YmxpYyBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuZm9ybWF0SW5wdXQpIHtcbiAgICAgICAgICAgIHRoaXMubG9jYWxlRGVjaW1hbFNlcGFyYXRvciA9ICgxLjEpLnRvTG9jYWxlU3RyaW5nKCkuc3Vic3RyaW5nKDEsIDIpO1xuICAgICAgICAgICAgdGhpcy5sb2NhbGVUaG91c2FuZFNlcGFyYXRvciA9ICgxMDAwKS50b0xvY2FsZVN0cmluZygpLnN1YnN0cmluZygxLCAyKTtcbiAgICAgICAgICAgIHRoaXMudGhvdXNhbmRSZWdFeHAgPSBuZXcgUmVnRXhwKGBbJHt0aGlzLnRob3VzYW5kU2VwYXJhdG9yIHx8IHRoaXMubG9jYWxlVGhvdXNhbmRTZXBhcmF0b3J9XWAsICdnaW0nKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuZGVjaW1hbFNlcGFyYXRvciAmJiB0aGlzLnRob3VzYW5kU2VwYXJhdG9yICYmIHRoaXMuZGVjaW1hbFNlcGFyYXRvciA9PT0gdGhpcy50aG91c2FuZFNlcGFyYXRvcikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybigndGhvdXNhbmRTZXBhcmF0b3IgYW5kIGRlY2ltYWxTZXBhcmF0b3IgY2Fubm90IGhhdmUgdGhlIHNhbWUgdmFsdWUuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXBlYXQoZXZlbnQ6IEV2ZW50LCBpbnRlcnZhbDogbnVtYmVyLCBkaXI6IG51bWJlcikge1xuICAgICAgICBsZXQgaSA9IGludGVydmFsIHx8IDUwMDtcblxuICAgICAgICB0aGlzLmNsZWFyVGltZXIoKTtcbiAgICAgICAgdGhpcy50aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZXBlYXQoZXZlbnQsIDQwLCBkaXIpO1xuICAgICAgICB9LCBpKTtcblxuICAgICAgICB0aGlzLnNwaW4oZXZlbnQsIGRpcik7XG4gICAgfVxuXG4gICAgc3BpbihldmVudDogRXZlbnQsIGRpcjogbnVtYmVyKSB7XG4gICAgICAgIGxldCBzdGVwID0gdGhpcy5zdGVwICogZGlyO1xuICAgICAgICBsZXQgY3VycmVudFZhbHVlOiBudW1iZXI7XG4gICAgICAgIGxldCBwcmVjaXNpb24gPSB0aGlzLmdldFByZWNpc2lvbigpO1xuXG4gICAgICAgIGlmICh0aGlzLnZhbHVlKSBjdXJyZW50VmFsdWUgPSB0eXBlb2YgdGhpcy52YWx1ZSA9PT0gJ3N0cmluZycgPyB0aGlzLnBhcnNlVmFsdWUodGhpcy52YWx1ZSkgOiB0aGlzLnZhbHVlO1xuICAgICAgICBlbHNlIGN1cnJlbnRWYWx1ZSA9IDA7XG5cbiAgICAgICAgaWYgKHByZWNpc2lvbikgdGhpcy52YWx1ZSA9IHBhcnNlRmxvYXQodGhpcy50b0ZpeGVkKGN1cnJlbnRWYWx1ZSArIHN0ZXAsIHByZWNpc2lvbikpO1xuICAgICAgICBlbHNlIHRoaXMudmFsdWUgPSBjdXJyZW50VmFsdWUgKyBzdGVwO1xuXG4gICAgICAgIGlmICh0aGlzLm1heGxlbmd0aCAhPT0gdW5kZWZpbmVkICYmIHRoaXMudmFsdWUudG9TdHJpbmcoKS5sZW5ndGggPiB0aGlzLm1heGxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IGN1cnJlbnRWYWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm1pbiAhPT0gdW5kZWZpbmVkICYmIHRoaXMudmFsdWUgPCB0aGlzLm1pbikge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMubWluO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubWF4ICE9PSB1bmRlZmluZWQgJiYgdGhpcy52YWx1ZSA+IHRoaXMubWF4KSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5tYXg7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmZvcm1hdFZhbHVlKCk7XG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSh0aGlzLnZhbHVlKTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZS5lbWl0KGV2ZW50KTtcbiAgICB9XG5cbiAgICBnZXRQcmVjaXNpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByZWNpc2lvbiA9PT0gdW5kZWZpbmVkID8gdGhpcy5jYWxjdWxhdGVkUHJlY2lzaW9uIDogdGhpcy5wcmVjaXNpb247XG4gICAgfVxuXG4gICAgdG9GaXhlZCh2YWx1ZTogbnVtYmVyLCBwcmVjaXNpb246IG51bWJlcikge1xuICAgICAgICBsZXQgcG93ZXIgPSBNYXRoLnBvdygxMCwgcHJlY2lzaW9uIHx8IDApO1xuICAgICAgICByZXR1cm4gU3RyaW5nKE1hdGgucm91bmQodmFsdWUgKiBwb3dlcikgLyBwb3dlcik7XG4gICAgfVxuXG4gICAgb25VcEJ1dHRvbk1vdXNlZG93bihldmVudDogRXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLmlucHV0ZmllbGRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgdGhpcy5yZXBlYXQoZXZlbnQsIG51bGwsIDEpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVGaWxsZWRTdGF0ZSgpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uVXBCdXR0b25Nb3VzZXVwKGV2ZW50OiBFdmVudCkge1xuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJUaW1lcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25VcEJ1dHRvbk1vdXNlbGVhdmUoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5jbGVhclRpbWVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkRvd25CdXR0b25Nb3VzZWRvd24oZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5pbnB1dGZpZWxkVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgIHRoaXMucmVwZWF0KGV2ZW50LCBudWxsLCAtMSk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUZpbGxlZFN0YXRlKCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Eb3duQnV0dG9uTW91c2V1cChldmVudDogRXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyVGltZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRG93bkJ1dHRvbk1vdXNlbGVhdmUoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5jbGVhclRpbWVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbklucHV0S2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAoZXZlbnQud2hpY2ggPT0gMzgpIHtcbiAgICAgICAgICAgIHRoaXMuc3BpbihldmVudCwgMSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LndoaWNoID09IDQwKSB7XG4gICAgICAgICAgICB0aGlzLnNwaW4oZXZlbnQsIC0xKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbklucHV0Q2hhbmdlKGV2ZW50OiBFdmVudCkge1xuICAgICAgICB0aGlzLm9uQ2hhbmdlLmVtaXQoZXZlbnQpO1xuICAgIH1cblxuICAgIG9uSW5wdXQoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMucGFyc2VWYWx1ZSgoPEhUTUxJbnB1dEVsZW1lbnQ+ZXZlbnQudGFyZ2V0KS52YWx1ZSk7XG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSh0aGlzLnZhbHVlKTtcbiAgICAgICAgdGhpcy51cGRhdGVGaWxsZWRTdGF0ZSgpO1xuICAgIH1cblxuICAgIG9uSW5wdXRCbHVyKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZm9jdXMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5mb3JtYXRWYWx1ZSgpO1xuICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkKCk7XG4gICAgICAgIHRoaXMub25CbHVyLmVtaXQoZXZlbnQpO1xuICAgIH1cblxuICAgIG9uSW5wdXRGb2N1cyhldmVudCkge1xuICAgICAgICB0aGlzLmZvY3VzID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5vbkZvY3VzLmVtaXQoZXZlbnQpO1xuICAgIH1cblxuICAgIHBhcnNlVmFsdWUodmFsOiBzdHJpbmcpOiBudW1iZXIge1xuICAgICAgICBsZXQgdmFsdWU6IG51bWJlcjtcbiAgICAgICAgbGV0IHByZWNpc2lvbiA9IHRoaXMuZ2V0UHJlY2lzaW9uKCk7XG5cbiAgICAgICAgaWYgKHZhbC50cmltKCkgPT09ICcnKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IG51bGw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5mb3JtYXRJbnB1dCkge1xuICAgICAgICAgICAgICAgIHZhbCA9IHZhbC5yZXBsYWNlKHRoaXMudGhvdXNhbmRSZWdFeHAsICcnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHByZWNpc2lvbikge1xuICAgICAgICAgICAgICAgIHZhbCA9IHRoaXMuZm9ybWF0SW5wdXQgPyB2YWwucmVwbGFjZSh0aGlzLmRlY2ltYWxTZXBhcmF0b3IgfHwgdGhpcy5sb2NhbGVEZWNpbWFsU2VwYXJhdG9yLCAnLicpIDogdmFsLnJlcGxhY2UoJywnLCAnLicpO1xuICAgICAgICAgICAgICAgIHZhbHVlID0gcGFyc2VGbG9hdCh2YWwpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHBhcnNlSW50KHZhbCwgMTApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWlzTmFOKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1heCAhPT0gbnVsbCAmJiB2YWx1ZSA+IHRoaXMubWF4KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdGhpcy5tYXg7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubWluICE9PSBudWxsICYmIHZhbHVlIDwgdGhpcy5taW4pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB0aGlzLm1pbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICBmb3JtYXRWYWx1ZSgpIHtcbiAgICAgICAgbGV0IHZhbHVlID0gdGhpcy52YWx1ZTtcbiAgICAgICAgbGV0IHByZWNpc2lvbiA9IHRoaXMuZ2V0UHJlY2lzaW9uKCk7XG5cbiAgICAgICAgaWYgKHZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmZvcm1hdElucHV0KSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS50b0xvY2FsZVN0cmluZyh1bmRlZmluZWQsIHsgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAyMCB9KTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRlY2ltYWxTZXBhcmF0b3IgJiYgdGhpcy50aG91c2FuZFNlcGFyYXRvcikge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnNwbGl0KHRoaXMubG9jYWxlRGVjaW1hbFNlcGFyYXRvcik7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHByZWNpc2lvbiAmJiB2YWx1ZVsxXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVbMV0gPSAodGhpcy5kZWNpbWFsU2VwYXJhdG9yIHx8IHRoaXMubG9jYWxlRGVjaW1hbFNlcGFyYXRvcikgKyB2YWx1ZVsxXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnRob3VzYW5kU2VwYXJhdG9yICYmIHZhbHVlWzBdLmxlbmd0aCA+IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlWzBdID0gdmFsdWVbMF0ucmVwbGFjZShuZXcgUmVnRXhwKGBbJHt0aGlzLmxvY2FsZVRob3VzYW5kU2VwYXJhdG9yfV1gLCAnZ2ltJyksIHRoaXMudGhvdXNhbmRTZXBhcmF0b3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5qb2luKCcnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZm9ybWF0dGVkVmFsdWUgPSB2YWx1ZS50b1N0cmluZygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5mb3JtYXR0ZWRWYWx1ZSA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pbnB1dGZpZWxkVmlld0NoaWxkICYmIHRoaXMuaW5wdXRmaWVsZFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLmlucHV0ZmllbGRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC52YWx1ZSA9IHRoaXMuZm9ybWF0dGVkVmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGVhclRpbWVyKCkge1xuICAgICAgICBpZiAodGhpcy50aW1lcikge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMuZm9ybWF0VmFsdWUoKTtcbiAgICAgICAgdGhpcy51cGRhdGVGaWxsZWRTdGF0ZSgpO1xuICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkID0gZm47XG4gICAgfVxuXG4gICAgc2V0RGlzYWJsZWRTdGF0ZSh2YWw6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IHZhbDtcbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICB1cGRhdGVGaWxsZWRTdGF0ZSgpIHtcbiAgICAgICAgdGhpcy5maWxsZWQgPSB0aGlzLnZhbHVlICE9PSB1bmRlZmluZWQgJiYgdGhpcy52YWx1ZSAhPSBudWxsO1xuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBJbnB1dFRleHRNb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtTcGlubmVyXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtTcGlubmVyXVxufSlcbmV4cG9ydCBjbGFzcyBTcGlubmVyTW9kdWxlIHt9XG4iXX0=