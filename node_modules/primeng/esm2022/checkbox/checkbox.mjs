import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, forwardRef, Input, NgModule, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { CheckIcon } from 'primeng/icons/check';
import { ObjectUtils } from 'primeng/utils';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export const CHECKBOX_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Checkbox),
    multi: true
};
/**
 * Checkbox is an extension to standard checkbox element with theming.
 * @group Components
 */
export class Checkbox {
    cd;
    /**
     * Value of the checkbox.
     * @group Props
     */
    value;
    /**
     * Name of the checkbox group.
     * @group Props
     */
    name;
    /**
     * When present, it specifies that the element should be disabled.
     * @group Props
     */
    disabled;
    /**
     * Allows to select a boolean value instead of multiple values.
     * @group Props
     */
    binary;
    /**
     * Label of the checkbox.
     * @group Props
     */
    label;
    /**
     * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
     * @group Props
     */
    ariaLabelledBy;
    /**
     * Used to define a string that labels the input element.
     * @group Props
     */
    ariaLabel;
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    tabindex;
    /**
     * Identifier of the focus input to match a label defined for the component.
     * @group Props
     */
    inputId;
    /**
     * Inline style of the component.
     * @group Props
     */
    style;
    /**
     * Style class of the component.
     * @group Props
     */
    styleClass;
    /**
     * Style class of the label.
     * @group Props
     */
    labelStyleClass;
    /**
     * Form control value.
     * @group Props
     */
    formControl;
    /**
     * Icon class of the checkbox icon.
     * @group Props
     */
    checkboxIcon;
    /**
     * When present, it specifies that the component cannot be edited.
     * @group Props
     */
    readonly;
    /**
     * When present, it specifies that checkbox must be checked before submitting the form.
     * @group Props
     */
    required;
    /**
     * Value in checked state.
     * @group Props
     */
    trueValue = true;
    /**
     * Value in unchecked state.
     * @group Props
     */
    falseValue = false;
    /**
     * Callback to invoke on value change.
     * @param {CheckboxChangeEvent} event - Custom value change event.
     * @group Emits
     */
    onChange = new EventEmitter();
    /**
     * Callback to invoke when the receives focus.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onFocus = new EventEmitter();
    /**
     * Callback to invoke when the loses focus.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onBlur = new EventEmitter();
    inputViewChild;
    templates;
    checkboxIconTemplate;
    model;
    onModelChange = () => { };
    onModelTouched = () => { };
    focused = false;
    constructor(cd) {
        this.cd = cd;
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'icon':
                    this.checkboxIconTemplate = item.template;
                    break;
            }
        });
    }
    onClick(event) {
        if (!this.disabled && !this.readonly) {
            this.inputViewChild.nativeElement.focus();
            let newModelValue;
            if (!this.binary) {
                if (this.checked())
                    newModelValue = this.model.filter((val) => !ObjectUtils.equals(val, this.value));
                else
                    newModelValue = this.model ? [...this.model, this.value] : [this.value];
                this.onModelChange(newModelValue);
                this.model = newModelValue;
                if (this.formControl) {
                    this.formControl.setValue(newModelValue);
                }
            }
            else {
                newModelValue = this.checked() ? this.falseValue : this.trueValue;
                this.model = newModelValue;
                this.onModelChange(newModelValue);
            }
            this.onChange.emit({ checked: newModelValue, originalEvent: event });
        }
    }
    onInputFocus(event) {
        this.focused = true;
        this.onFocus.emit(event);
    }
    onInputBlur(event) {
        this.focused = false;
        this.onModelTouched();
        this.onBlur.emit(event);
    }
    writeValue(model) {
        this.model = model;
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
    checked() {
        return this.binary ? this.model === this.trueValue : ObjectUtils.contains(this.value, this.model);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: Checkbox, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.5", type: Checkbox, selector: "p-checkbox", inputs: { value: "value", name: "name", disabled: "disabled", binary: "binary", label: "label", ariaLabelledBy: "ariaLabelledBy", ariaLabel: "ariaLabel", tabindex: "tabindex", inputId: "inputId", style: "style", styleClass: "styleClass", labelStyleClass: "labelStyleClass", formControl: "formControl", checkboxIcon: "checkboxIcon", readonly: "readonly", required: "required", trueValue: "trueValue", falseValue: "falseValue" }, outputs: { onChange: "onChange", onFocus: "onFocus", onBlur: "onBlur" }, host: { classAttribute: "p-element" }, providers: [CHECKBOX_VALUE_ACCESSOR], queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "inputViewChild", first: true, predicate: ["input"], descendants: true }], ngImport: i0, template: `
        <div
            [ngStyle]="style"
            [ngClass]="{ 'p-checkbox p-component': true, 'p-checkbox-checked': checked(), 'p-checkbox-disabled': disabled, 'p-checkbox-focused': focused }"
            [class]="styleClass"
            [attr.data-pc-name]="'checkbox'"
            [attr.data-pc-section]="'root'"
            (click)="onClick($event)"
        >
            <div class="p-hidden-accessible" [attr.data-pc-section]="'hiddenInputWrapper'" [attr.data-p-hidden-accessible]="true">
                <input
                    #input
                    [attr.id]="inputId"
                    type="checkbox"
                    [value]="value"
                    [attr.name]="name"
                    [checked]="checked()"
                    [attr.tabindex]="tabindex"
                    [disabled]="disabled"
                    [readonly]="readonly"
                    [attr.required]="required"
                    [attr.aria-labelledby]="ariaLabelledBy"
                    [attr.aria-label]="ariaLabel"
                    [attr.aria-checked]="checked()"
                    (focus)="onInputFocus($event)"
                    (blur)="onInputBlur($event)"
                    [attr.data-pc-section]="'hiddenInput'"
                />
            </div>
            <div
                class="p-checkbox-box"
                [ngClass]="{ 'p-highlight': checked(), 'p-disabled': disabled, 'p-focus': focused }"
                [attr.data-p-highlight]="checked()"
                [attr.data-p-disabled]="disabled"
                [attr.data-p-focused]="focused"
                [attr.data-pc-section]="'input'"
            >
                <ng-container *ngIf="checked()">
                    <ng-container *ngIf="!checkboxIconTemplate">
                        <span *ngIf="checkboxIcon" class="p-checkbox-icon" [ngClass]="checkboxIcon" [attr.data-pc-section]="'icon'"></span>
                        <CheckIcon *ngIf="!checkboxIcon" [styleClass]="'p-checkbox-icon'" [attr.data-pc-section]="'icon'" />
                    </ng-container>
                    <span *ngIf="checkboxIconTemplate" class="p-checkbox-icon" [attr.data-pc-section]="'icon'">
                        <ng-template *ngTemplateOutlet="checkboxIconTemplate"></ng-template>
                    </span>
                </ng-container>
            </div>
        </div>
        <label
            (click)="onClick($event)"
            [class]="labelStyleClass"
            [ngClass]="{ 'p-checkbox-label': true, 'p-checkbox-label-active': checked(), 'p-disabled': disabled, 'p-checkbox-label-focus': focused }"
            *ngIf="label"
            [attr.for]="inputId"
            [attr.data-pc-section]="'label'"
        >
            {{ label }}</label
        >
    `, isInline: true, styles: ["@layer primeng{.p-checkbox{display:inline-flex;cursor:pointer;-webkit-user-select:none;user-select:none;vertical-align:bottom;position:relative}.p-checkbox-disabled{cursor:default!important;pointer-events:none}.p-checkbox-box{display:flex;justify-content:center;align-items:center}p-checkbox{display:inline-flex;vertical-align:bottom;align-items:center}.p-checkbox-label{line-height:1}}\n"], dependencies: [{ kind: "directive", type: i0.forwardRef(() => i1.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgIf), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgStyle), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: i0.forwardRef(() => CheckIcon), selector: "CheckIcon" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: Checkbox, decorators: [{
            type: Component,
            args: [{ selector: 'p-checkbox', template: `
        <div
            [ngStyle]="style"
            [ngClass]="{ 'p-checkbox p-component': true, 'p-checkbox-checked': checked(), 'p-checkbox-disabled': disabled, 'p-checkbox-focused': focused }"
            [class]="styleClass"
            [attr.data-pc-name]="'checkbox'"
            [attr.data-pc-section]="'root'"
            (click)="onClick($event)"
        >
            <div class="p-hidden-accessible" [attr.data-pc-section]="'hiddenInputWrapper'" [attr.data-p-hidden-accessible]="true">
                <input
                    #input
                    [attr.id]="inputId"
                    type="checkbox"
                    [value]="value"
                    [attr.name]="name"
                    [checked]="checked()"
                    [attr.tabindex]="tabindex"
                    [disabled]="disabled"
                    [readonly]="readonly"
                    [attr.required]="required"
                    [attr.aria-labelledby]="ariaLabelledBy"
                    [attr.aria-label]="ariaLabel"
                    [attr.aria-checked]="checked()"
                    (focus)="onInputFocus($event)"
                    (blur)="onInputBlur($event)"
                    [attr.data-pc-section]="'hiddenInput'"
                />
            </div>
            <div
                class="p-checkbox-box"
                [ngClass]="{ 'p-highlight': checked(), 'p-disabled': disabled, 'p-focus': focused }"
                [attr.data-p-highlight]="checked()"
                [attr.data-p-disabled]="disabled"
                [attr.data-p-focused]="focused"
                [attr.data-pc-section]="'input'"
            >
                <ng-container *ngIf="checked()">
                    <ng-container *ngIf="!checkboxIconTemplate">
                        <span *ngIf="checkboxIcon" class="p-checkbox-icon" [ngClass]="checkboxIcon" [attr.data-pc-section]="'icon'"></span>
                        <CheckIcon *ngIf="!checkboxIcon" [styleClass]="'p-checkbox-icon'" [attr.data-pc-section]="'icon'" />
                    </ng-container>
                    <span *ngIf="checkboxIconTemplate" class="p-checkbox-icon" [attr.data-pc-section]="'icon'">
                        <ng-template *ngTemplateOutlet="checkboxIconTemplate"></ng-template>
                    </span>
                </ng-container>
            </div>
        </div>
        <label
            (click)="onClick($event)"
            [class]="labelStyleClass"
            [ngClass]="{ 'p-checkbox-label': true, 'p-checkbox-label-active': checked(), 'p-disabled': disabled, 'p-checkbox-label-focus': focused }"
            *ngIf="label"
            [attr.for]="inputId"
            [attr.data-pc-section]="'label'"
        >
            {{ label }}</label
        >
    `, providers: [CHECKBOX_VALUE_ACCESSOR], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: ["@layer primeng{.p-checkbox{display:inline-flex;cursor:pointer;-webkit-user-select:none;user-select:none;vertical-align:bottom;position:relative}.p-checkbox-disabled{cursor:default!important;pointer-events:none}.p-checkbox-box{display:flex;justify-content:center;align-items:center}p-checkbox{display:inline-flex;vertical-align:bottom;align-items:center}.p-checkbox-label{line-height:1}}\n"] }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef }], propDecorators: { value: [{
                type: Input
            }], name: [{
                type: Input
            }], disabled: [{
                type: Input
            }], binary: [{
                type: Input
            }], label: [{
                type: Input
            }], ariaLabelledBy: [{
                type: Input
            }], ariaLabel: [{
                type: Input
            }], tabindex: [{
                type: Input
            }], inputId: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], labelStyleClass: [{
                type: Input
            }], formControl: [{
                type: Input
            }], checkboxIcon: [{
                type: Input
            }], readonly: [{
                type: Input
            }], required: [{
                type: Input
            }], trueValue: [{
                type: Input
            }], falseValue: [{
                type: Input
            }], onChange: [{
                type: Output
            }], onFocus: [{
                type: Output
            }], onBlur: [{
                type: Output
            }], inputViewChild: [{
                type: ViewChild,
                args: ['input']
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
export class CheckboxModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: CheckboxModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.0.5", ngImport: i0, type: CheckboxModule, declarations: [Checkbox], imports: [CommonModule, CheckIcon], exports: [Checkbox, SharedModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: CheckboxModule, imports: [CommonModule, CheckIcon, SharedModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: CheckboxModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, CheckIcon],
                    exports: [Checkbox, SharedModule],
                    declarations: [Checkbox]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvY2hlY2tib3gvY2hlY2tib3gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSx1QkFBdUIsRUFBcUIsU0FBUyxFQUFFLGVBQWUsRUFBYyxZQUFZLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUEwQixTQUFTLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDNU4sT0FBTyxFQUFxQyxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3RGLE9BQU8sRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzFELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUVoRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFHNUMsTUFBTSxDQUFDLE1BQU0sdUJBQXVCLEdBQVE7SUFDeEMsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQztJQUN2QyxLQUFLLEVBQUUsSUFBSTtDQUNkLENBQUM7QUFDRjs7O0dBR0c7QUFzRUgsTUFBTSxPQUFPLFFBQVE7SUE0SEU7SUEzSG5COzs7T0FHRztJQUNNLEtBQUssQ0FBTTtJQUNwQjs7O09BR0c7SUFDTSxJQUFJLENBQXFCO0lBQ2xDOzs7T0FHRztJQUNNLFFBQVEsQ0FBc0I7SUFDdkM7OztPQUdHO0lBQ00sTUFBTSxDQUFzQjtJQUNyQzs7O09BR0c7SUFDTSxLQUFLLENBQXFCO0lBQ25DOzs7T0FHRztJQUNNLGNBQWMsQ0FBcUI7SUFDNUM7OztPQUdHO0lBQ00sU0FBUyxDQUFxQjtJQUN2Qzs7O09BR0c7SUFDTSxRQUFR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LGNBQWM7dUdBQWQsY0FBYzt3R0FBZCxjQUFjLGlCQXhNZCxRQUFRLGFBb01QLFlBQVksRUFBRSxTQUFTLGFBcE14QixRQUFRLEVBcU1HLFlBQVk7d0dBR3ZCLGNBQWMsWUFKYixZQUFZLEVBQUUsU0FBUyxFQUNiLFlBQVk7OzJGQUd2QixjQUFjO2tCQUwxQixRQUFRO21CQUFDO29CQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxTQUFTLENBQUM7b0JBQ2xDLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUM7b0JBQ2pDLFlBQVksRUFBRSxDQUFDLFFBQVEsQ0FBQztpQkFDM0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIENvbnRlbnRDaGlsZHJlbiwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBmb3J3YXJkUmVmLCBJbnB1dCwgTmdNb2R1bGUsIE91dHB1dCwgUXVlcnlMaXN0LCBUZW1wbGF0ZVJlZiwgVmlld0NoaWxkLCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIEZvcm1Db250cm9sLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFByaW1lVGVtcGxhdGUsIFNoYXJlZE1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IENoZWNrSWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvY2hlY2snO1xuaW1wb3J0IHsgTnVsbGFibGUgfSBmcm9tICdwcmltZW5nL3RzLWhlbHBlcnMnO1xuaW1wb3J0IHsgT2JqZWN0VXRpbHMgfSBmcm9tICdwcmltZW5nL3V0aWxzJztcbmltcG9ydCB7IENoZWNrYm94Q2hhbmdlRXZlbnQgfSBmcm9tICcuL2NoZWNrYm94LmludGVyZmFjZSc7XG5cbmV4cG9ydCBjb25zdCBDSEVDS0JPWF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IENoZWNrYm94KSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcbi8qKlxuICogQ2hlY2tib3ggaXMgYW4gZXh0ZW5zaW9uIHRvIHN0YW5kYXJkIGNoZWNrYm94IGVsZW1lbnQgd2l0aCB0aGVtaW5nLlxuICogQGdyb3VwIENvbXBvbmVudHNcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLWNoZWNrYm94JyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgICBbbmdTdHlsZV09XCJzdHlsZVwiXG4gICAgICAgICAgICBbbmdDbGFzc109XCJ7ICdwLWNoZWNrYm94IHAtY29tcG9uZW50JzogdHJ1ZSwgJ3AtY2hlY2tib3gtY2hlY2tlZCc6IGNoZWNrZWQoKSwgJ3AtY2hlY2tib3gtZGlzYWJsZWQnOiBkaXNhYmxlZCwgJ3AtY2hlY2tib3gtZm9jdXNlZCc6IGZvY3VzZWQgfVwiXG4gICAgICAgICAgICBbY2xhc3NdPVwic3R5bGVDbGFzc1wiXG4gICAgICAgICAgICBbYXR0ci5kYXRhLXBjLW5hbWVdPVwiJ2NoZWNrYm94J1wiXG4gICAgICAgICAgICBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ3Jvb3QnXCJcbiAgICAgICAgICAgIChjbGljayk9XCJvbkNsaWNrKCRldmVudClcIlxuICAgICAgICA+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1oaWRkZW4tYWNjZXNzaWJsZVwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInaGlkZGVuSW5wdXRXcmFwcGVyJ1wiIFthdHRyLmRhdGEtcC1oaWRkZW4tYWNjZXNzaWJsZV09XCJ0cnVlXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICNpbnB1dFxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5pZF09XCJpbnB1dElkXCJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICAgICAgW3ZhbHVlXT1cInZhbHVlXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIubmFtZV09XCJuYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgW2NoZWNrZWRdPVwiY2hlY2tlZCgpXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIudGFiaW5kZXhdPVwidGFiaW5kZXhcIlxuICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAgICAgICAgICAgICBbcmVhZG9ubHldPVwicmVhZG9ubHlcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5yZXF1aXJlZF09XCJyZXF1aXJlZFwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxsZWRieV09XCJhcmlhTGFiZWxsZWRCeVwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiYXJpYUxhYmVsXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1jaGVja2VkXT1cImNoZWNrZWQoKVwiXG4gICAgICAgICAgICAgICAgICAgIChmb2N1cyk9XCJvbklucHV0Rm9jdXMoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgIChibHVyKT1cIm9uSW5wdXRCbHVyKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ2hpZGRlbklucHV0J1wiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGNsYXNzPVwicC1jaGVja2JveC1ib3hcIlxuICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsgJ3AtaGlnaGxpZ2h0JzogY2hlY2tlZCgpLCAncC1kaXNhYmxlZCc6IGRpc2FibGVkLCAncC1mb2N1cyc6IGZvY3VzZWQgfVwiXG4gICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wLWhpZ2hsaWdodF09XCJjaGVja2VkKClcIlxuICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcC1kaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wLWZvY3VzZWRdPVwiZm9jdXNlZFwiXG4gICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidpbnB1dCdcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjaGVja2VkKClcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFjaGVja2JveEljb25UZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJjaGVja2JveEljb25cIiBjbGFzcz1cInAtY2hlY2tib3gtaWNvblwiIFtuZ0NsYXNzXT1cImNoZWNrYm94SWNvblwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInaWNvbidcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Q2hlY2tJY29uICpuZ0lmPVwiIWNoZWNrYm94SWNvblwiIFtzdHlsZUNsYXNzXT1cIidwLWNoZWNrYm94LWljb24nXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidpY29uJ1wiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImNoZWNrYm94SWNvblRlbXBsYXRlXCIgY2xhc3M9XCJwLWNoZWNrYm94LWljb25cIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ2ljb24nXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJjaGVja2JveEljb25UZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGxhYmVsXG4gICAgICAgICAgICAoY2xpY2spPVwib25DbGljaygkZXZlbnQpXCJcbiAgICAgICAgICAgIFtjbGFzc109XCJsYWJlbFN0eWxlQ2xhc3NcIlxuICAgICAgICAgICAgW25nQ2xhc3NdPVwieyAncC1jaGVja2JveC1sYWJlbCc6IHRydWUsICdwLWNoZWNrYm94LWxhYmVsLWFjdGl2ZSc6IGNoZWNrZWQoKSwgJ3AtZGlzYWJsZWQnOiBkaXNhYmxlZCwgJ3AtY2hlY2tib3gtbGFiZWwtZm9jdXMnOiBmb2N1c2VkIH1cIlxuICAgICAgICAgICAgKm5nSWY9XCJsYWJlbFwiXG4gICAgICAgICAgICBbYXR0ci5mb3JdPVwiaW5wdXRJZFwiXG4gICAgICAgICAgICBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ2xhYmVsJ1wiXG4gICAgICAgID5cbiAgICAgICAgICAgIHt7IGxhYmVsIH19PC9sYWJlbFxuICAgICAgICA+XG4gICAgYCxcbiAgICBwcm92aWRlcnM6IFtDSEVDS0JPWF9WQUxVRV9BQ0NFU1NPUl0sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBzdHlsZVVybHM6IFsnLi9jaGVja2JveC5jc3MnXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAncC1lbGVtZW50J1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgQ2hlY2tib3ggaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gICAgLyoqXG4gICAgICogVmFsdWUgb2YgdGhlIGNoZWNrYm94LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHZhbHVlOiBhbnk7XG4gICAgLyoqXG4gICAgICogTmFtZSBvZiB0aGUgY2hlY2tib3ggZ3JvdXAuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgbmFtZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdoZW4gcHJlc2VudCwgaXQgc3BlY2lmaWVzIHRoYXQgdGhlIGVsZW1lbnQgc2hvdWxkIGJlIGRpc2FibGVkLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIEFsbG93cyB0byBzZWxlY3QgYSBib29sZWFuIHZhbHVlIGluc3RlYWQgb2YgbXVsdGlwbGUgdmFsdWVzLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGJpbmFyeTogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBMYWJlbCBvZiB0aGUgY2hlY2tib3guXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgbGFiZWw6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBFc3RhYmxpc2hlcyByZWxhdGlvbnNoaXBzIGJldHdlZW4gdGhlIGNvbXBvbmVudCBhbmQgbGFiZWwocykgd2hlcmUgaXRzIHZhbHVlIHNob3VsZCBiZSBvbmUgb3IgbW9yZSBlbGVtZW50IElEcy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBhcmlhTGFiZWxsZWRCeTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFVzZWQgdG8gZGVmaW5lIGEgc3RyaW5nIHRoYXQgbGFiZWxzIHRoZSBpbnB1dCBlbGVtZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGFyaWFMYWJlbDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIEluZGV4IG9mIHRoZSBlbGVtZW50IGluIHRhYmJpbmcgb3JkZXIuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgdGFiaW5kZXg6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBJZGVudGlmaWVyIG9mIHRoZSBmb2N1cyBpbnB1dCB0byBtYXRjaCBhIGxhYmVsIGRlZmluZWQgZm9yIHRoZSBjb21wb25lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgaW5wdXRJZDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIElubGluZSBzdHlsZSBvZiB0aGUgY29tcG9uZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHN0eWxlOiB7IFtrbGFzczogc3RyaW5nXTogYW55IH0gfCBudWxsIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFN0eWxlIGNsYXNzIG9mIHRoZSBjb21wb25lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFN0eWxlIGNsYXNzIG9mIHRoZSBsYWJlbC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBsYWJlbFN0eWxlQ2xhc3M6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBGb3JtIGNvbnRyb2wgdmFsdWUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZm9ybUNvbnRyb2w6IEZvcm1Db250cm9sIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIEljb24gY2xhc3Mgb2YgdGhlIGNoZWNrYm94IGljb24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgY2hlY2tib3hJY29uOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hlbiBwcmVzZW50LCBpdCBzcGVjaWZpZXMgdGhhdCB0aGUgY29tcG9uZW50IGNhbm5vdCBiZSBlZGl0ZWQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgcmVhZG9ubHk6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hlbiBwcmVzZW50LCBpdCBzcGVjaWZpZXMgdGhhdCBjaGVja2JveCBtdXN0IGJlIGNoZWNrZWQgYmVmb3JlIHN1Ym1pdHRpbmcgdGhlIGZvcm0uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgcmVxdWlyZWQ6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogVmFsdWUgaW4gY2hlY2tlZCBzdGF0ZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB0cnVlVmFsdWU6IGFueSA9IHRydWU7XG4gICAgLyoqXG4gICAgICogVmFsdWUgaW4gdW5jaGVja2VkIHN0YXRlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGZhbHNlVmFsdWU6IGFueSA9IGZhbHNlO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSBvbiB2YWx1ZSBjaGFuZ2UuXG4gICAgICogQHBhcmFtIHtDaGVja2JveENoYW5nZUV2ZW50fSBldmVudCAtIEN1c3RvbSB2YWx1ZSBjaGFuZ2UgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Q2hlY2tib3hDaGFuZ2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gdGhlIHJlY2VpdmVzIGZvY3VzLlxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gQnJvd3NlciBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25Gb2N1czogRXZlbnRFbWl0dGVyPEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gdGhlIGxvc2VzIGZvY3VzLlxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gQnJvd3NlciBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25CbHVyOiBFdmVudEVtaXR0ZXI8RXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudD4oKTtcblxuICAgIEBWaWV3Q2hpbGQoJ2lucHV0JykgaW5wdXRWaWV3Q2hpbGQ6IE51bGxhYmxlPEVsZW1lbnRSZWY+O1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihQcmltZVRlbXBsYXRlKSB0ZW1wbGF0ZXM6IE51bGxhYmxlPFF1ZXJ5TGlzdDxQcmltZVRlbXBsYXRlPj47XG5cbiAgICBjaGVja2JveEljb25UZW1wbGF0ZSE6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBtb2RlbDogYW55O1xuXG4gICAgb25Nb2RlbENoYW5nZTogRnVuY3Rpb24gPSAoKSA9PiB7fTtcblxuICAgIG9uTW9kZWxUb3VjaGVkOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuXG4gICAgZm9jdXNlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGNkOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgKHRoaXMudGVtcGxhdGVzIGFzIFF1ZXJ5TGlzdDxQcmltZVRlbXBsYXRlPikuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChpdGVtLmdldFR5cGUoKSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2ljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrYm94SWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uQ2xpY2soZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCAmJiAhdGhpcy5yZWFkb25seSkge1xuICAgICAgICAgICAgdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgICBsZXQgbmV3TW9kZWxWYWx1ZTtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLmJpbmFyeSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNoZWNrZWQoKSkgbmV3TW9kZWxWYWx1ZSA9IHRoaXMubW9kZWwuZmlsdGVyKCh2YWw6IG9iamVjdCkgPT4gIU9iamVjdFV0aWxzLmVxdWFscyh2YWwsIHRoaXMudmFsdWUpKTtcbiAgICAgICAgICAgICAgICBlbHNlIG5ld01vZGVsVmFsdWUgPSB0aGlzLm1vZGVsID8gWy4uLnRoaXMubW9kZWwsIHRoaXMudmFsdWVdIDogW3RoaXMudmFsdWVdO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKG5ld01vZGVsVmFsdWUpO1xuICAgICAgICAgICAgICAgIHRoaXMubW9kZWwgPSBuZXdNb2RlbFZhbHVlO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZm9ybUNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb3JtQ29udHJvbC5zZXRWYWx1ZShuZXdNb2RlbFZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5ld01vZGVsVmFsdWUgPSB0aGlzLmNoZWNrZWQoKSA/IHRoaXMuZmFsc2VWYWx1ZSA6IHRoaXMudHJ1ZVZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMubW9kZWwgPSBuZXdNb2RlbFZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMub25Nb2RlbENoYW5nZShuZXdNb2RlbFZhbHVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5vbkNoYW5nZS5lbWl0KHsgY2hlY2tlZDogbmV3TW9kZWxWYWx1ZSwgb3JpZ2luYWxFdmVudDogZXZlbnQgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbklucHV0Rm9jdXMoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIHRoaXMuZm9jdXNlZCA9IHRydWU7XG4gICAgICAgIHRoaXMub25Gb2N1cy5lbWl0KGV2ZW50KTtcbiAgICB9XG5cbiAgICBvbklucHV0Qmx1cihldmVudDogRXZlbnQpIHtcbiAgICAgICAgdGhpcy5mb2N1c2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQoKTtcbiAgICAgICAgdGhpcy5vbkJsdXIuZW1pdChldmVudCk7XG4gICAgfVxuXG4gICAgd3JpdGVWYWx1ZShtb2RlbDogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbk1vZGVsVG91Y2hlZCA9IGZuO1xuICAgIH1cblxuICAgIHNldERpc2FibGVkU3RhdGUodmFsOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSB2YWw7XG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgY2hlY2tlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmluYXJ5ID8gdGhpcy5tb2RlbCA9PT0gdGhpcy50cnVlVmFsdWUgOiBPYmplY3RVdGlscy5jb250YWlucyh0aGlzLnZhbHVlLCB0aGlzLm1vZGVsKTtcbiAgICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgQ2hlY2tJY29uXSxcbiAgICBleHBvcnRzOiBbQ2hlY2tib3gsIFNoYXJlZE1vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbQ2hlY2tib3hdXG59KVxuZXhwb3J0IGNsYXNzIENoZWNrYm94TW9kdWxlIHt9XG4iXX0=