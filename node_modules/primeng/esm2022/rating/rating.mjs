import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, forwardRef, Input, NgModule, Output, signal, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { BanIcon } from 'primeng/icons/ban';
import { StarIcon } from 'primeng/icons/star';
import { StarFillIcon } from 'primeng/icons/starfill';
import { DomHandler } from 'primeng/dom';
import { UniqueComponentId } from 'primeng/utils';
import * as i0 from "@angular/core";
import * as i1 from "primeng/api";
import * as i2 from "@angular/common";
export const RATING_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Rating),
    multi: true
};
/**
 * Rating is an extension to standard radio button element with theming.
 * @group Components
 */
export class Rating {
    cd;
    config;
    /**
     * When present, it specifies that the element should be disabled.
     * @group Props
     */
    disabled;
    /**
     * When present, changing the value is not possible.
     * @group Props
     */
    readonly;
    /**
     * Number of stars.
     * @group Props
     */
    stars = 5;
    /**
     * When specified a cancel icon is displayed to allow removing the value.
     * @group Props
     */
    cancel = true;
    /**
     * Style class of the on icon.
     * @group Props
     */
    iconOnClass;
    /**
     * Inline style of the on icon.
     * @group Props
     */
    iconOnStyle;
    /**
     * Style class of the off icon.
     * @group Props
     */
    iconOffClass;
    /**
     * Inline style of the off icon.
     * @group Props
     */
    iconOffStyle;
    /**
     * Style class of the cancel icon.
     * @group Props
     */
    iconCancelClass;
    /**
     * Inline style of the cancel icon.
     * @group Props
     */
    iconCancelStyle;
    /**
     * Emitted on value change.
     * @param {RatingRateEvent} value - Custom rate event.
     * @group Emits
     */
    onRate = new EventEmitter();
    /**
     * Emitted when the rating is cancelled.
     * @param {Event} value - Browser event.
     * @group Emits
     */
    onCancel = new EventEmitter();
    /**
     * Emitted when the rating receives focus.
     * @param {Event} value - Browser event.
     * @group Emits
     */
    onFocus = new EventEmitter();
    /**
     * Emitted when the rating loses focus.
     * @param {Event} value - Browser event.
     * @group Emits
     */
    onBlur = new EventEmitter();
    templates;
    onIconTemplate;
    offIconTemplate;
    cancelIconTemplate;
    value;
    onModelChange = () => { };
    onModelTouched = () => { };
    starsArray;
    isFocusVisibleItem = true;
    focusedOptionIndex = signal(-1);
    name;
    constructor(cd, config) {
        this.cd = cd;
        this.config = config;
    }
    ngOnInit() {
        this.name = this.name || UniqueComponentId();
        this.starsArray = [];
        for (let i = 0; i < this.stars; i++) {
            this.starsArray[i] = i;
        }
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'onicon':
                    this.onIconTemplate = item.template;
                    break;
                case 'officon':
                    this.offIconTemplate = item.template;
                    break;
                case 'cancelicon':
                    this.cancelIconTemplate = item.template;
                    break;
            }
        });
    }
    onOptionClick(event, value) {
        if (!this.readonly && !this.disabled) {
            this.onOptionSelect(event, value);
            this.isFocusVisibleItem = false;
            const firstFocusableEl = DomHandler.getFirstFocusableElement(event.currentTarget, '');
            firstFocusableEl && DomHandler.focus(firstFocusableEl);
        }
    }
    onOptionSelect(event, value) {
        this.focusedOptionIndex.set(value);
        this.updateModel(event, value || null);
    }
    onChange(event, value) {
        this.onOptionSelect(event, value);
        this.isFocusVisibleItem = true;
    }
    onInputBlur(event) {
        this.focusedOptionIndex.set(-1);
        this.onBlur.emit(event);
    }
    onInputFocus(event, value) {
        this.focusedOptionIndex.set(value);
        this.onFocus.emit(event);
    }
    updateModel(event, value) {
        this.value = value;
        this.onModelChange(this.value);
        this.onModelTouched();
        if (!value) {
            this.onCancel.emit();
        }
        else {
            this.onRate.emit({
                originalEvent: event,
                value
            });
        }
    }
    cancelAriaLabel() {
        return this.config.translation.clear;
    }
    starAriaLabel(value) {
        return value === 1 ? this.config.translation.aria.star : this.config.translation.aria.stars.replace(/{star}/g, value);
    }
    getIconTemplate(i) {
        return !this.value || i >= this.value ? this.offIconTemplate : this.onIconTemplate;
    }
    writeValue(value) {
        this.value = value;
        this.cd.detectChanges();
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
    get isCustomIcon() {
        return this.templates && this.templates.length > 0;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: Rating, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.PrimeNGConfig }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.5", type: Rating, selector: "p-rating", inputs: { disabled: "disabled", readonly: "readonly", stars: "stars", cancel: "cancel", iconOnClass: "iconOnClass", iconOnStyle: "iconOnStyle", iconOffClass: "iconOffClass", iconOffStyle: "iconOffStyle", iconCancelClass: "iconCancelClass", iconCancelStyle: "iconCancelStyle" }, outputs: { onRate: "onRate", onCancel: "onCancel", onFocus: "onFocus", onBlur: "onBlur" }, host: { classAttribute: "p-element" }, providers: [RATING_VALUE_ACCESSOR], queries: [{ propertyName: "templates", predicate: PrimeTemplate }], ngImport: i0, template: `
        <div class="p-rating" [ngClass]="{ 'p-readonly': readonly, 'p-disabled': disabled }" [attr.data-pc-name]="'rating'" [attr.data-pc-section]="'root'">
            <ng-container *ngIf="!isCustomIcon; else customTemplate">
                <div *ngIf="cancel" [attr.data-pc-section]="'cancelItem'" (click)="onOptionClick($event, 0)" [ngClass]="{ 'p-focus': focusedOptionIndex() === 0 && isFocusVisible }" class="p-rating-item p-rating-cancel-item">
                    <span class="p-hidden-accessible" [attr.data-p-hidden-accessible]="true">
                        <input
                            type="radio"
                            value="0"
                            [name]="name"
                            [checked]="value === 0"
                            [disabled]="disabled"
                            [readonly]="readonly"
                            [attr.aria-label]="cancelAriaLabel()"
                            (focus)="onInputFocus($event, 0)"
                            (blur)="onInputBlur($event)"
                            (change)="onChange($event, 0)"
                        />
                    </span>
                    <span *ngIf="iconCancelClass" class="p-rating-icon p-rating-cancel" [ngClass]="iconCancelClass" [ngStyle]="iconCancelStyle"></span>
                    <BanIcon *ngIf="!iconCancelClass" [styleClass]="'p-rating-icon p-rating-cancel'" [ngStyle]="iconCancelStyle" [attr.data-pc-section]="'cancelIcon'" />
                </div>
                <ng-template ngFor [ngForOf]="starsArray" let-star let-i="index">
                    <div class="p-rating-item" [ngClass]="{ 'p-rating-item-active': star + 1 <= value, 'p-focus': star + 1 === focusedOptionIndex() && isFocusVisible }" (click)="onOptionClick($event, star + 1)">
                        <span class="p-hidden-accessible" [attr.data-p-hidden-accessible]="true">
                            <input
                                type="radio"
                                value="0"
                                [name]="name"
                                [checked]="value === 0"
                                [disabled]="disabled"
                                [readonly]="readonly"
                                [attr.aria-label]="starAriaLabel(star + 1)"
                                (focus)="onInputFocus($event, star + 1)"
                                (blur)="onInputBlur($event)"
                                (change)="onChange($event, star + 1)"
                            />
                        </span>
                        <ng-container *ngIf="!value || i >= value">
                            <span class="p-rating-icon" *ngIf="iconOffClass" [ngStyle]="iconOffStyle" [ngClass]="iconOffClass" [attr.data-pc-section]="'offIcon'"></span>
                            <StarIcon *ngIf="!iconOffClass" [ngStyle]="iconOffStyle" [styleClass]="'p-rating-icon'" [attr.data-pc-section]="'offIcon'" />
                        </ng-container>
                        <ng-container *ngIf="value && i < value">
                            <span class="p-rating-icon p-rating-icon-active" *ngIf="iconOnClass" [ngStyle]="iconOnStyle" [ngClass]="iconOnClass" [attr.data-pc-section]="'onIcon'"></span>
                            <StarFillIcon *ngIf="!iconOnClass" [ngStyle]="iconOnStyle" [styleClass]="'p-rating-icon p-rating-icon-active'" [attr.data-pc-section]="'onIcon'" />
                        </ng-container>
                    </div>
                </ng-template>
            </ng-container>
            <ng-template #customTemplate>
                <span *ngIf="cancel" (click)="onOptionClick($event, 0)" class="p-rating-icon p-rating-cancel" [ngStyle]="iconCancelStyle" [attr.data-pc-section]="'cancelIcon'">
                    <ng-container *ngTemplateOutlet="cancelIconTemplate"></ng-container>
                </span>
                <span *ngFor="let star of starsArray; let i = index" class="p-rating-icon" (click)="onOptionClick($event, star + 1)" [attr.data-pc-section]="'onIcon'">
                    <ng-container *ngTemplateOutlet="getIconTemplate(i)"></ng-container>
                </span>
            </ng-template>
        </div>
    `, isInline: true, styles: ["@layer primeng{.p-rating{display:inline-flex}.p-rating-icon{cursor:pointer}.p-rating.p-rating-readonly .p-rating-icon{cursor:default}}\n"], dependencies: [{ kind: "directive", type: i0.forwardRef(() => i2.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgForOf), selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgIf), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgStyle), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: i0.forwardRef(() => StarFillIcon), selector: "StarFillIcon" }, { kind: "component", type: i0.forwardRef(() => StarIcon), selector: "StarIcon" }, { kind: "component", type: i0.forwardRef(() => BanIcon), selector: "BanIcon" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: Rating, decorators: [{
            type: Component,
            args: [{ selector: 'p-rating', template: `
        <div class="p-rating" [ngClass]="{ 'p-readonly': readonly, 'p-disabled': disabled }" [attr.data-pc-name]="'rating'" [attr.data-pc-section]="'root'">
            <ng-container *ngIf="!isCustomIcon; else customTemplate">
                <div *ngIf="cancel" [attr.data-pc-section]="'cancelItem'" (click)="onOptionClick($event, 0)" [ngClass]="{ 'p-focus': focusedOptionIndex() === 0 && isFocusVisible }" class="p-rating-item p-rating-cancel-item">
                    <span class="p-hidden-accessible" [attr.data-p-hidden-accessible]="true">
                        <input
                            type="radio"
                            value="0"
                            [name]="name"
                            [checked]="value === 0"
                            [disabled]="disabled"
                            [readonly]="readonly"
                            [attr.aria-label]="cancelAriaLabel()"
                            (focus)="onInputFocus($event, 0)"
                            (blur)="onInputBlur($event)"
                            (change)="onChange($event, 0)"
                        />
                    </span>
                    <span *ngIf="iconCancelClass" class="p-rating-icon p-rating-cancel" [ngClass]="iconCancelClass" [ngStyle]="iconCancelStyle"></span>
                    <BanIcon *ngIf="!iconCancelClass" [styleClass]="'p-rating-icon p-rating-cancel'" [ngStyle]="iconCancelStyle" [attr.data-pc-section]="'cancelIcon'" />
                </div>
                <ng-template ngFor [ngForOf]="starsArray" let-star let-i="index">
                    <div class="p-rating-item" [ngClass]="{ 'p-rating-item-active': star + 1 <= value, 'p-focus': star + 1 === focusedOptionIndex() && isFocusVisible }" (click)="onOptionClick($event, star + 1)">
                        <span class="p-hidden-accessible" [attr.data-p-hidden-accessible]="true">
                            <input
                                type="radio"
                                value="0"
                                [name]="name"
                                [checked]="value === 0"
                                [disabled]="disabled"
                                [readonly]="readonly"
                                [attr.aria-label]="starAriaLabel(star + 1)"
                                (focus)="onInputFocus($event, star + 1)"
                                (blur)="onInputBlur($event)"
                                (change)="onChange($event, star + 1)"
                            />
                        </span>
                        <ng-container *ngIf="!value || i >= value">
                            <span class="p-rating-icon" *ngIf="iconOffClass" [ngStyle]="iconOffStyle" [ngClass]="iconOffClass" [attr.data-pc-section]="'offIcon'"></span>
                            <StarIcon *ngIf="!iconOffClass" [ngStyle]="iconOffStyle" [styleClass]="'p-rating-icon'" [attr.data-pc-section]="'offIcon'" />
                        </ng-container>
                        <ng-container *ngIf="value && i < value">
                            <span class="p-rating-icon p-rating-icon-active" *ngIf="iconOnClass" [ngStyle]="iconOnStyle" [ngClass]="iconOnClass" [attr.data-pc-section]="'onIcon'"></span>
                            <StarFillIcon *ngIf="!iconOnClass" [ngStyle]="iconOnStyle" [styleClass]="'p-rating-icon p-rating-icon-active'" [attr.data-pc-section]="'onIcon'" />
                        </ng-container>
                    </div>
                </ng-template>
            </ng-container>
            <ng-template #customTemplate>
                <span *ngIf="cancel" (click)="onOptionClick($event, 0)" class="p-rating-icon p-rating-cancel" [ngStyle]="iconCancelStyle" [attr.data-pc-section]="'cancelIcon'">
                    <ng-container *ngTemplateOutlet="cancelIconTemplate"></ng-container>
                </span>
                <span *ngFor="let star of starsArray; let i = index" class="p-rating-icon" (click)="onOptionClick($event, star + 1)" [attr.data-pc-section]="'onIcon'">
                    <ng-container *ngTemplateOutlet="getIconTemplate(i)"></ng-container>
                </span>
            </ng-template>
        </div>
    `, providers: [RATING_VALUE_ACCESSOR], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: ["@layer primeng{.p-rating{display:inline-flex}.p-rating-icon{cursor:pointer}.p-rating.p-rating-readonly .p-rating-icon{cursor:default}}\n"] }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef }, { type: i1.PrimeNGConfig }], propDecorators: { disabled: [{
                type: Input
            }], readonly: [{
                type: Input
            }], stars: [{
                type: Input
            }], cancel: [{
                type: Input
            }], iconOnClass: [{
                type: Input
            }], iconOnStyle: [{
                type: Input
            }], iconOffClass: [{
                type: Input
            }], iconOffStyle: [{
                type: Input
            }], iconCancelClass: [{
                type: Input
            }], iconCancelStyle: [{
                type: Input
            }], onRate: [{
                type: Output
            }], onCancel: [{
                type: Output
            }], onFocus: [{
                type: Output
            }], onBlur: [{
                type: Output
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
export class RatingModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: RatingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.0.5", ngImport: i0, type: RatingModule, declarations: [Rating], imports: [CommonModule, StarFillIcon, StarIcon, BanIcon], exports: [Rating, SharedModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: RatingModule, imports: [CommonModule, StarFillIcon, StarIcon, BanIcon, SharedModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: RatingModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, StarFillIcon, StarIcon, BanIcon],
                    exports: [Rating, SharedModule],
                    declarations: [Rating]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmF0aW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL3JhdGluZy9yYXRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSx1QkFBdUIsRUFBcUIsU0FBUyxFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQVUsTUFBTSxFQUFhLE1BQU0sRUFBZSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyTixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFpQixhQUFhLEVBQUUsWUFBWSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM1QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDOUMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBR3RELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDekMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBRWxELE1BQU0sQ0FBQyxNQUFNLHFCQUFxQixHQUFRO0lBQ3RDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUM7SUFDckMsS0FBSyxFQUFFLElBQUk7Q0FDZCxDQUFDO0FBQ0Y7OztHQUdHO0FBcUVILE1BQU0sT0FBTyxNQUFNO0lBa0dLO0lBQStCO0lBakduRDs7O09BR0c7SUFDTSxRQUFRLENBQXNCO0lBQ3ZDOzs7T0FHRztJQUNNLFFBQVEsQ0FBc0I7SUFDdkM7OztPQUdHO0lBQ00sS0FBSyxHQUFXLENBQUMsQ0FB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WSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUM7b0JBQ3hELE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxZQUFZLENBQUM7b0JBQy9CLFlBQVksRUFBRSxDQUFDLE1BQU0sQ0FBQztpQkFDekIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIENvbnRlbnRDaGlsZHJlbiwgRXZlbnRFbWl0dGVyLCBmb3J3YXJkUmVmLCBJbnB1dCwgTmdNb2R1bGUsIE9uSW5pdCwgT3V0cHV0LCBRdWVyeUxpc3QsIHNpZ25hbCwgVGVtcGxhdGVSZWYsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBQcmltZU5HQ29uZmlnLCBQcmltZVRlbXBsYXRlLCBTaGFyZWRNb2R1bGUgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBCYW5JY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy9iYW4nO1xuaW1wb3J0IHsgU3Rhckljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL3N0YXInO1xuaW1wb3J0IHsgU3RhckZpbGxJY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy9zdGFyZmlsbCc7XG5pbXBvcnQgeyBOdWxsYWJsZSB9IGZyb20gJ3ByaW1lbmcvdHMtaGVscGVycyc7XG5pbXBvcnQgeyBSYXRpbmdSYXRlRXZlbnQgfSBmcm9tICcuL3JhdGluZy5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgRG9tSGFuZGxlciB9IGZyb20gJ3ByaW1lbmcvZG9tJztcbmltcG9ydCB7IFVuaXF1ZUNvbXBvbmVudElkIH0gZnJvbSAncHJpbWVuZy91dGlscyc7XG5cbmV4cG9ydCBjb25zdCBSQVRJTkdfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBSYXRpbmcpLFxuICAgIG11bHRpOiB0cnVlXG59O1xuLyoqXG4gKiBSYXRpbmcgaXMgYW4gZXh0ZW5zaW9uIHRvIHN0YW5kYXJkIHJhZGlvIGJ1dHRvbiBlbGVtZW50IHdpdGggdGhlbWluZy5cbiAqIEBncm91cCBDb21wb25lbnRzXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1yYXRpbmcnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwLXJhdGluZ1wiIFtuZ0NsYXNzXT1cInsgJ3AtcmVhZG9ubHknOiByZWFkb25seSwgJ3AtZGlzYWJsZWQnOiBkaXNhYmxlZCB9XCIgW2F0dHIuZGF0YS1wYy1uYW1lXT1cIidyYXRpbmcnXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidyb290J1wiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFpc0N1c3RvbUljb247IGVsc2UgY3VzdG9tVGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiY2FuY2VsXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidjYW5jZWxJdGVtJ1wiIChjbGljayk9XCJvbk9wdGlvbkNsaWNrKCRldmVudCwgMClcIiBbbmdDbGFzc109XCJ7ICdwLWZvY3VzJzogZm9jdXNlZE9wdGlvbkluZGV4KCkgPT09IDAgJiYgaXNGb2N1c1Zpc2libGUgfVwiIGNsYXNzPVwicC1yYXRpbmctaXRlbSBwLXJhdGluZy1jYW5jZWwtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtaGlkZGVuLWFjY2Vzc2libGVcIiBbYXR0ci5kYXRhLXAtaGlkZGVuLWFjY2Vzc2libGVdPVwidHJ1ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInJhZGlvXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT1cIjBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuYW1lXT1cIm5hbWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtjaGVja2VkXT1cInZhbHVlID09PSAwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtyZWFkb25seV09XCJyZWFkb25seVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJjYW5jZWxBcmlhTGFiZWwoKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGZvY3VzKT1cIm9uSW5wdXRGb2N1cygkZXZlbnQsIDApXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoYmx1cik9XCJvbklucHV0Qmx1cigkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoY2hhbmdlKT1cIm9uQ2hhbmdlKCRldmVudCwgMClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImljb25DYW5jZWxDbGFzc1wiIGNsYXNzPVwicC1yYXRpbmctaWNvbiBwLXJhdGluZy1jYW5jZWxcIiBbbmdDbGFzc109XCJpY29uQ2FuY2VsQ2xhc3NcIiBbbmdTdHlsZV09XCJpY29uQ2FuY2VsU3R5bGVcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxCYW5JY29uICpuZ0lmPVwiIWljb25DYW5jZWxDbGFzc1wiIFtzdHlsZUNsYXNzXT1cIidwLXJhdGluZy1pY29uIHAtcmF0aW5nLWNhbmNlbCdcIiBbbmdTdHlsZV09XCJpY29uQ2FuY2VsU3R5bGVcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ2NhbmNlbEljb24nXCIgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgbmdGb3IgW25nRm9yT2ZdPVwic3RhcnNBcnJheVwiIGxldC1zdGFyIGxldC1pPVwiaW5kZXhcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtcmF0aW5nLWl0ZW1cIiBbbmdDbGFzc109XCJ7ICdwLXJhdGluZy1pdGVtLWFjdGl2ZSc6IHN0YXIgKyAxIDw9IHZhbHVlLCAncC1mb2N1cyc6IHN0YXIgKyAxID09PSBmb2N1c2VkT3B0aW9uSW5kZXgoKSAmJiBpc0ZvY3VzVmlzaWJsZSB9XCIgKGNsaWNrKT1cIm9uT3B0aW9uQ2xpY2soJGV2ZW50LCBzdGFyICsgMSlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1oaWRkZW4tYWNjZXNzaWJsZVwiIFthdHRyLmRhdGEtcC1oaWRkZW4tYWNjZXNzaWJsZV09XCJ0cnVlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJyYWRpb1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPVwiMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuYW1lXT1cIm5hbWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbY2hlY2tlZF09XCJ2YWx1ZSA9PT0gMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtyZWFkb25seV09XCJyZWFkb25seVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwic3RhckFyaWFMYWJlbChzdGFyICsgMSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZm9jdXMpPVwib25JbnB1dEZvY3VzKCRldmVudCwgc3RhciArIDEpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGJsdXIpPVwib25JbnB1dEJsdXIoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjaGFuZ2UpPVwib25DaGFuZ2UoJGV2ZW50LCBzdGFyICsgMSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIXZhbHVlIHx8IGkgPj0gdmFsdWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtcmF0aW5nLWljb25cIiAqbmdJZj1cImljb25PZmZDbGFzc1wiIFtuZ1N0eWxlXT1cImljb25PZmZTdHlsZVwiIFtuZ0NsYXNzXT1cImljb25PZmZDbGFzc1wiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInb2ZmSWNvbidcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFN0YXJJY29uICpuZ0lmPVwiIWljb25PZmZDbGFzc1wiIFtuZ1N0eWxlXT1cImljb25PZmZTdHlsZVwiIFtzdHlsZUNsYXNzXT1cIidwLXJhdGluZy1pY29uJ1wiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInb2ZmSWNvbidcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwidmFsdWUgJiYgaSA8IHZhbHVlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLXJhdGluZy1pY29uIHAtcmF0aW5nLWljb24tYWN0aXZlXCIgKm5nSWY9XCJpY29uT25DbGFzc1wiIFtuZ1N0eWxlXT1cImljb25PblN0eWxlXCIgW25nQ2xhc3NdPVwiaWNvbk9uQ2xhc3NcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ29uSWNvbidcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFN0YXJGaWxsSWNvbiAqbmdJZj1cIiFpY29uT25DbGFzc1wiIFtuZ1N0eWxlXT1cImljb25PblN0eWxlXCIgW3N0eWxlQ2xhc3NdPVwiJ3AtcmF0aW5nLWljb24gcC1yYXRpbmctaWNvbi1hY3RpdmUnXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidvbkljb24nXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgI2N1c3RvbVRlbXBsYXRlPlxuICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiY2FuY2VsXCIgKGNsaWNrKT1cIm9uT3B0aW9uQ2xpY2soJGV2ZW50LCAwKVwiIGNsYXNzPVwicC1yYXRpbmctaWNvbiBwLXJhdGluZy1jYW5jZWxcIiBbbmdTdHlsZV09XCJpY29uQ2FuY2VsU3R5bGVcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ2NhbmNlbEljb24nXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJjYW5jZWxJY29uVGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gKm5nRm9yPVwibGV0IHN0YXIgb2Ygc3RhcnNBcnJheTsgbGV0IGkgPSBpbmRleFwiIGNsYXNzPVwicC1yYXRpbmctaWNvblwiIChjbGljayk9XCJvbk9wdGlvbkNsaWNrKCRldmVudCwgc3RhciArIDEpXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidvbkljb24nXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJnZXRJY29uVGVtcGxhdGUoaSlcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIHByb3ZpZGVyczogW1JBVElOR19WQUxVRV9BQ0NFU1NPUl0sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBzdHlsZVVybHM6IFsnLi9yYXRpbmcuY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ3AtZWxlbWVudCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIFJhdGluZyBpbXBsZW1lbnRzIE9uSW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICAgIC8qKlxuICAgICAqIFdoZW4gcHJlc2VudCwgaXQgc3BlY2lmaWVzIHRoYXQgdGhlIGVsZW1lbnQgc2hvdWxkIGJlIGRpc2FibGVkLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdoZW4gcHJlc2VudCwgY2hhbmdpbmcgdGhlIHZhbHVlIGlzIG5vdCBwb3NzaWJsZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSByZWFkb25seTogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBOdW1iZXIgb2Ygc3RhcnMuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc3RhcnM6IG51bWJlciA9IDU7XG4gICAgLyoqXG4gICAgICogV2hlbiBzcGVjaWZpZWQgYSBjYW5jZWwgaWNvbiBpcyBkaXNwbGF5ZWQgdG8gYWxsb3cgcmVtb3ZpbmcgdGhlIHZhbHVlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGNhbmNlbDogYm9vbGVhbiA9IHRydWU7XG4gICAgLyoqXG4gICAgICogU3R5bGUgY2xhc3Mgb2YgdGhlIG9uIGljb24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgaWNvbk9uQ2xhc3M6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBJbmxpbmUgc3R5bGUgb2YgdGhlIG9uIGljb24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgaWNvbk9uU3R5bGU6IHsgW2tsYXNzOiBzdHJpbmddOiBhbnkgfSB8IG51bGwgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogU3R5bGUgY2xhc3Mgb2YgdGhlIG9mZiBpY29uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGljb25PZmZDbGFzczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIElubGluZSBzdHlsZSBvZiB0aGUgb2ZmIGljb24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgaWNvbk9mZlN0eWxlOiB7IFtrbGFzczogc3RyaW5nXTogYW55IH0gfCBudWxsIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFN0eWxlIGNsYXNzIG9mIHRoZSBjYW5jZWwgaWNvbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBpY29uQ2FuY2VsQ2xhc3M6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBJbmxpbmUgc3R5bGUgb2YgdGhlIGNhbmNlbCBpY29uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGljb25DYW5jZWxTdHlsZTogeyBba2xhc3M6IHN0cmluZ106IGFueSB9IHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBFbWl0dGVkIG9uIHZhbHVlIGNoYW5nZS5cbiAgICAgKiBAcGFyYW0ge1JhdGluZ1JhdGVFdmVudH0gdmFsdWUgLSBDdXN0b20gcmF0ZSBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25SYXRlOiBFdmVudEVtaXR0ZXI8UmF0aW5nUmF0ZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8UmF0aW5nUmF0ZUV2ZW50PigpO1xuICAgIC8qKlxuICAgICAqIEVtaXR0ZWQgd2hlbiB0aGUgcmF0aW5nIGlzIGNhbmNlbGxlZC5cbiAgICAgKiBAcGFyYW0ge0V2ZW50fSB2YWx1ZSAtIEJyb3dzZXIgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uQ2FuY2VsOiBFdmVudEVtaXR0ZXI8RXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudD4oKTtcbiAgICAvKipcbiAgICAgKiBFbWl0dGVkIHdoZW4gdGhlIHJhdGluZyByZWNlaXZlcyBmb2N1cy5cbiAgICAgKiBAcGFyYW0ge0V2ZW50fSB2YWx1ZSAtIEJyb3dzZXIgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uRm9jdXM6IEV2ZW50RW1pdHRlcjxGb2N1c0V2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8Rm9jdXNFdmVudD4oKTtcbiAgICAvKipcbiAgICAgKiBFbWl0dGVkIHdoZW4gdGhlIHJhdGluZyBsb3NlcyBmb2N1cy5cbiAgICAgKiBAcGFyYW0ge0V2ZW50fSB2YWx1ZSAtIEJyb3dzZXIgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uQmx1cjogRXZlbnRFbWl0dGVyPEZvY3VzRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxGb2N1c0V2ZW50PigpO1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihQcmltZVRlbXBsYXRlKSB0ZW1wbGF0ZXMhOiBRdWVyeUxpc3Q8UHJpbWVUZW1wbGF0ZT47XG5cbiAgICBvbkljb25UZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBvZmZJY29uVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgY2FuY2VsSWNvblRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIHZhbHVlOiBOdWxsYWJsZTxudW1iZXI+O1xuXG4gICAgb25Nb2RlbENoYW5nZTogRnVuY3Rpb24gPSAoKSA9PiB7fTtcblxuICAgIG9uTW9kZWxUb3VjaGVkOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuXG4gICAgcHVibGljIHN0YXJzQXJyYXk6IE51bGxhYmxlPG51bWJlcltdPjtcblxuICAgIGlzRm9jdXNWaXNpYmxlSXRlbTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBmb2N1c2VkT3B0aW9uSW5kZXggPSBzaWduYWw8bnVtYmVyPigtMSk7XG5cbiAgICBuYW1lOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHJpdmF0ZSBjb25maWc6IFByaW1lTkdDb25maWcpIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gdGhpcy5uYW1lIHx8IFVuaXF1ZUNvbXBvbmVudElkKCk7XG4gICAgICAgIHRoaXMuc3RhcnNBcnJheSA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc3RhcnM7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5zdGFyc0FycmF5W2ldID0gaTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChpdGVtLmdldFR5cGUoKSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ29uaWNvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25JY29uVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ29mZmljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9mZkljb25UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnY2FuY2VsaWNvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FuY2VsSWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uT3B0aW9uQ2xpY2soZXZlbnQsIHZhbHVlKSB7XG4gICAgICAgIGlmICghdGhpcy5yZWFkb25seSAmJiAhdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5vbk9wdGlvblNlbGVjdChldmVudCwgdmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5pc0ZvY3VzVmlzaWJsZUl0ZW0gPSBmYWxzZTtcbiAgICAgICAgICAgIGNvbnN0IGZpcnN0Rm9jdXNhYmxlRWwgPSBEb21IYW5kbGVyLmdldEZpcnN0Rm9jdXNhYmxlRWxlbWVudChldmVudC5jdXJyZW50VGFyZ2V0LCAnJyk7XG5cbiAgICAgICAgICAgIGZpcnN0Rm9jdXNhYmxlRWwgJiYgRG9tSGFuZGxlci5mb2N1cyhmaXJzdEZvY3VzYWJsZUVsKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uT3B0aW9uU2VsZWN0KGV2ZW50LCB2YWx1ZSkge1xuICAgICAgICB0aGlzLmZvY3VzZWRPcHRpb25JbmRleC5zZXQodmFsdWUpO1xuICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsKGV2ZW50LCB2YWx1ZSB8fCBudWxsKTtcbiAgICB9XG5cbiAgICBvbkNoYW5nZShldmVudCwgdmFsdWUpIHtcbiAgICAgICAgdGhpcy5vbk9wdGlvblNlbGVjdChldmVudCwgdmFsdWUpO1xuICAgICAgICB0aGlzLmlzRm9jdXNWaXNpYmxlSXRlbSA9IHRydWU7XG4gICAgfVxuXG4gICAgb25JbnB1dEJsdXIoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5mb2N1c2VkT3B0aW9uSW5kZXguc2V0KC0xKTtcbiAgICAgICAgdGhpcy5vbkJsdXIuZW1pdChldmVudCk7XG4gICAgfVxuXG4gICAgb25JbnB1dEZvY3VzKGV2ZW50LCB2YWx1ZSkge1xuICAgICAgICB0aGlzLmZvY3VzZWRPcHRpb25JbmRleC5zZXQodmFsdWUpO1xuICAgICAgICB0aGlzLm9uRm9jdXMuZW1pdChldmVudCk7XG4gICAgfVxuXG4gICAgdXBkYXRlTW9kZWwoZXZlbnQsIHZhbHVlKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHRoaXMudmFsdWUpO1xuICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkKCk7XG5cbiAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5vbkNhbmNlbC5lbWl0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm9uUmF0ZS5lbWl0KHtcbiAgICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICB2YWx1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjYW5jZWxBcmlhTGFiZWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy50cmFuc2xhdGlvbi5jbGVhcjtcbiAgICB9XG5cbiAgICBzdGFyQXJpYUxhYmVsKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZSA9PT0gMSA/IHRoaXMuY29uZmlnLnRyYW5zbGF0aW9uLmFyaWEuc3RhciA6IHRoaXMuY29uZmlnLnRyYW5zbGF0aW9uLmFyaWEuc3RhcnMucmVwbGFjZSgve3N0YXJ9L2csIHZhbHVlKTtcbiAgICB9XG5cbiAgICBnZXRJY29uVGVtcGxhdGUoaTogbnVtYmVyKTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj4ge1xuICAgICAgICByZXR1cm4gIXRoaXMudmFsdWUgfHwgaSA+PSB0aGlzLnZhbHVlID8gdGhpcy5vZmZJY29uVGVtcGxhdGUgOiB0aGlzLm9uSWNvblRlbXBsYXRlO1xuICAgIH1cblxuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkID0gZm47XG4gICAgfVxuXG4gICAgc2V0RGlzYWJsZWRTdGF0ZSh2YWw6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IHZhbDtcbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBnZXQgaXNDdXN0b21JY29uKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy50ZW1wbGF0ZXMgJiYgdGhpcy50ZW1wbGF0ZXMubGVuZ3RoID4gMDtcbiAgICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgU3RhckZpbGxJY29uLCBTdGFySWNvbiwgQmFuSWNvbl0sXG4gICAgZXhwb3J0czogW1JhdGluZywgU2hhcmVkTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtSYXRpbmddXG59KVxuZXhwb3J0IGNsYXNzIFJhdGluZ01vZHVsZSB7fVxuIl19