import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, NgModule, Output, PLATFORM_ID, ViewChild, ViewEncapsulation, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomHandler } from 'primeng/dom';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export const SLIDER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Slider),
    multi: true
};
/**
 * Slider is a component to provide input with a drag handle.
 * @group Components
 */
export class Slider {
    document;
    platformId;
    el;
    renderer;
    ngZone;
    cd;
    /**
     * When enabled, displays an animation on click of the slider bar.
     * @group Props
     */
    animate;
    /**
     * When present, it specifies that the element should be disabled.
     * @group Props
     */
    disabled;
    /**
     * Mininum boundary value.
     * @group Props
     */
    min = 0;
    /**
     * Maximum boundary value.
     * @group Props
     */
    max = 100;
    /**
     * Orientation of the slider.
     * @group Props
     */
    orientation = 'horizontal';
    /**
     * Step factor to increment/decrement the value.
     * @group Props
     */
    step;
    /**
     * When specified, allows two boundary values to be picked.
     * @group Props
     */
    range;
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
     * Defines a string that labels the input for accessibility.
     * @group Props
     */
    ariaLabel;
    /**
     * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
     * @group Props
     */
    ariaLabelledBy;
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    tabindex = 0;
    /**
     * Callback to invoke on value change.
     * @param {SliderChangeEvent} event - Custom value change event.
     * @group Emits
     */
    onChange = new EventEmitter();
    /**
     * Callback to invoke when slide ended.
     * @param {SliderSlideEndEvent} event - Custom slide end event.
     * @group Emits
     */
    onSlideEnd = new EventEmitter();
    sliderHandle;
    sliderHandleStart;
    sliderHandleEnd;
    value;
    values;
    handleValue;
    handleValues = [];
    diff;
    offset;
    bottom;
    onModelChange = () => { };
    onModelTouched = () => { };
    dragging;
    dragListener;
    mouseupListener;
    initX;
    initY;
    barWidth;
    barHeight;
    sliderHandleClick;
    handleIndex = 0;
    startHandleValue;
    startx;
    starty;
    constructor(document, platformId, el, renderer, ngZone, cd) {
        this.document = document;
        this.platformId = platformId;
        this.el = el;
        this.renderer = renderer;
        this.ngZone = ngZone;
        this.cd = cd;
    }
    onMouseDown(event, index) {
        if (this.disabled) {
            return;
        }
        this.dragging = true;
        this.updateDomData();
        this.sliderHandleClick = true;
        if (this.range && this.handleValues && this.handleValues[0] === this.max) {
            this.handleIndex = 0;
        }
        else {
            this.handleIndex = index;
        }
        this.bindDragListeners();
        event.target.focus();
        event.preventDefault();
        if (this.animate) {
            DomHandler.removeClass(this.el.nativeElement.children[0], 'p-slider-animate');
        }
    }
    onDragStart(event, index) {
        if (this.disabled) {
            return;
        }
        var touchobj = event.changedTouches[0];
        this.startHandleValue = this.range ? this.handleValues[index] : this.handleValue;
        this.dragging = true;
        if (this.range && this.handleValues && this.handleValues[0] === this.max) {
            this.handleIndex = 0;
        }
        else {
            this.handleIndex = index;
        }
        if (this.orientation === 'horizontal') {
            this.startx = parseInt(touchobj.clientX, 10);
            this.barWidth = this.el.nativeElement.children[0].offsetWidth;
        }
        else {
            this.starty = parseInt(touchobj.clientY, 10);
            this.barHeight = this.el.nativeElement.children[0].offsetHeight;
        }
        if (this.animate) {
            DomHandler.removeClass(this.el.nativeElement.children[0], 'p-slider-animate');
        }
        event.preventDefault();
    }
    onDrag(event) {
        if (this.disabled) {
            return;
        }
        var touchobj = event.changedTouches[0], handleValue = 0;
        if (this.orientation === 'horizontal') {
            handleValue = Math.floor(((parseInt(touchobj.clientX, 10) - this.startx) * 100) / this.barWidth) + this.startHandleValue;
        }
        else {
            handleValue = Math.floor(((this.starty - parseInt(touchobj.clientY, 10)) * 100) / this.barHeight) + this.startHandleValue;
        }
        this.setValueFromHandle(event, handleValue);
        event.preventDefault();
    }
    onDragEnd(event) {
        if (this.disabled) {
            return;
        }
        this.dragging = false;
        if (this.range)
            this.onSlideEnd.emit({ originalEvent: event, values: this.values });
        else
            this.onSlideEnd.emit({ originalEvent: event, value: this.value });
        if (this.animate) {
            DomHandler.addClass(this.el.nativeElement.children[0], 'p-slider-animate');
        }
        event.preventDefault();
    }
    onBarClick(event) {
        if (this.disabled) {
            return;
        }
        if (!this.sliderHandleClick) {
            this.updateDomData();
            this.handleChange(event);
            if (this.range)
                this.onSlideEnd.emit({ originalEvent: event, values: this.values });
            else
                this.onSlideEnd.emit({ originalEvent: event, value: this.value });
        }
        this.sliderHandleClick = false;
    }
    onKeyDown(event, index) {
        this.handleIndex = index;
        switch (event.code) {
            case 'ArrowDown':
            case 'ArrowLeft':
                this.decrementValue(event, index);
                event.preventDefault();
                break;
            case 'ArrowUp':
            case 'ArrowRight':
                this.incrementValue(event, index);
                event.preventDefault();
                break;
            case 'PageDown':
                this.decrementValue(event, index, true);
                event.preventDefault();
                break;
            case 'PageUp':
                this.incrementValue(event, index, true);
                event.preventDefault();
                break;
            case 'Home':
                this.updateValue(this.min, event);
                event.preventDefault();
                break;
            case 'End':
                this.updateValue(this.max, event);
                event.preventDefault();
                break;
            default:
                break;
        }
    }
    decrementValue(event, index, pageKey = false) {
        let newValue;
        if (this.range) {
            if (this.step)
                newValue = this.values[index] - this.step;
            else
                newValue = this.values[index] - 1;
        }
        else {
            if (this.step)
                newValue = this.value - this.step;
            else if (!this.step && pageKey)
                newValue = this.value - 10;
            else
                newValue = this.value - 1;
        }
        this.updateValue(newValue, event);
        event.preventDefault();
    }
    incrementValue(event, index, pageKey = false) {
        let newValue;
        if (this.range) {
            if (this.step)
                newValue = this.values[index] + this.step;
            else
                newValue = this.values[index] + 1;
        }
        else {
            if (this.step)
                newValue = this.value + this.step;
            else if (!this.step && pageKey)
                newValue = this.value + 10;
            else
                newValue = this.value + 1;
        }
        this.updateValue(newValue, event);
        event.preventDefault();
    }
    handleChange(event) {
        let handleValue = this.calculateHandleValue(event);
        this.setValueFromHandle(event, handleValue);
    }
    bindDragListeners() {
        if (isPlatformBrowser(this.platformId)) {
            this.ngZone.runOutsideAngular(() => {
                const documentTarget = this.el ? this.el.nativeElement.ownerDocument : this.document;
                if (!this.dragListener) {
                    this.dragListener = this.renderer.listen(documentTarget, 'mousemove', (event) => {
                        if (this.dragging) {
                            this.ngZone.run(() => {
                                this.handleChange(event);
                            });
                        }
                    });
                }
                if (!this.mouseupListener) {
                    this.mouseupListener = this.renderer.listen(documentTarget, 'mouseup', (event) => {
                        if (this.dragging) {
                            this.dragging = false;
                            this.ngZone.run(() => {
                                if (this.range)
                                    this.onSlideEnd.emit({ originalEvent: event, values: this.values });
                                else
                                    this.onSlideEnd.emit({ originalEvent: event, value: this.value });
                                if (this.animate) {
                                    DomHandler.addClass(this.el.nativeElement.children[0], 'p-slider-animate');
                                }
                            });
                        }
                    });
                }
            });
        }
    }
    unbindDragListeners() {
        if (this.dragListener) {
            this.dragListener();
            this.dragListener = null;
        }
        if (this.mouseupListener) {
            this.mouseupListener();
            this.mouseupListener = null;
        }
    }
    setValueFromHandle(event, handleValue) {
        let newValue = this.getValueFromHandle(handleValue);
        if (this.range) {
            if (this.step) {
                this.handleStepChange(newValue, this.values[this.handleIndex]);
            }
            else {
                this.handleValues[this.handleIndex] = handleValue;
                this.updateValue(newValue, event);
            }
        }
        else {
            if (this.step) {
                this.handleStepChange(newValue, this.value);
            }
            else {
                this.handleValue = handleValue;
                this.updateValue(newValue, event);
            }
        }
        this.cd.markForCheck();
    }
    handleStepChange(newValue, oldValue) {
        let diff = newValue - oldValue;
        let val = oldValue;
        let _step = this.step;
        if (diff < 0) {
            val = oldValue + Math.ceil(newValue / _step - oldValue / _step) * _step;
        }
        else if (diff > 0) {
            val = oldValue + Math.floor(newValue / _step - oldValue / _step) * _step;
        }
        this.updateValue(val);
        this.updateHandleValue();
    }
    writeValue(value) {
        if (this.range)
            this.values = value || [0, 0];
        else
            this.value = value || 0;
        this.updateHandleValue();
        this.updateDiffAndOffset();
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
    get rangeStartLeft() {
        if (!this.isVertical())
            return this.handleValues[0] > 100 ? 100 + '%' : this.handleValues[0] + '%';
        return null;
    }
    get rangeStartBottom() {
        return this.isVertical() ? this.handleValues[0] + '%' : 'auto';
    }
    get rangeEndLeft() {
        return this.isVertical() ? null : this.handleValues[1] + '%';
    }
    get rangeEndBottom() {
        return this.isVertical() ? this.handleValues[1] + '%' : 'auto';
    }
    isVertical() {
        return this.orientation === 'vertical';
    }
    updateDomData() {
        let rect = this.el.nativeElement.children[0].getBoundingClientRect();
        this.initX = rect.left + DomHandler.getWindowScrollLeft();
        this.initY = rect.top + DomHandler.getWindowScrollTop();
        this.barWidth = this.el.nativeElement.children[0].offsetWidth;
        this.barHeight = this.el.nativeElement.children[0].offsetHeight;
    }
    calculateHandleValue(event) {
        if (this.orientation === 'horizontal')
            return ((event.pageX - this.initX) * 100) / this.barWidth;
        else
            return ((this.initY + this.barHeight - event.pageY) * 100) / this.barHeight;
    }
    updateHandleValue() {
        if (this.range) {
            this.handleValues[0] = ((this.values[0] < this.min ? 0 : this.values[0] - this.min) * 100) / (this.max - this.min);
            this.handleValues[1] = ((this.values[1] > this.max ? 100 : this.values[1] - this.min) * 100) / (this.max - this.min);
        }
        else {
            if (this.value < this.min)
                this.handleValue = 0;
            else if (this.value > this.max)
                this.handleValue = 100;
            else
                this.handleValue = ((this.value - this.min) * 100) / (this.max - this.min);
        }
        if (this.step) {
            this.updateDiffAndOffset();
        }
    }
    updateDiffAndOffset() {
        this.diff = this.getDiff();
        this.offset = this.getOffset();
    }
    getDiff() {
        return Math.abs(this.handleValues[0] - this.handleValues[1]);
    }
    getOffset() {
        return Math.min(this.handleValues[0], this.handleValues[1]);
    }
    updateValue(val, event) {
        if (this.range) {
            let value = val;
            if (this.handleIndex == 0) {
                if (value < this.min) {
                    value = this.min;
                    this.handleValues[0] = 0;
                }
                else if (value > this.values[1]) {
                    if (value > this.max) {
                        value = this.max;
                        this.handleValues[0] = 100;
                    }
                }
                this.sliderHandleStart?.nativeElement.focus();
            }
            else {
                if (value > this.max) {
                    value = this.max;
                    this.handleValues[1] = 100;
                    this.offset = this.handleValues[1];
                }
                else if (value < this.min) {
                    value = this.min;
                    this.handleValues[1] = 0;
                }
                else if (value < this.values[0]) {
                    this.offset = this.handleValues[1];
                }
                this.sliderHandleEnd?.nativeElement.focus();
            }
            if (this.step) {
                this.updateHandleValue();
            }
            else {
                this.updateDiffAndOffset();
            }
            this.values[this.handleIndex] = this.getNormalizedValue(value);
            let newValues = [this.minVal, this.maxVal];
            this.onModelChange(newValues);
            this.onChange.emit({ event: event, values: this.values });
        }
        else {
            if (val < this.min) {
                val = this.min;
                this.handleValue = 0;
            }
            else if (val > this.max) {
                val = this.max;
                this.handleValue = 100;
            }
            this.value = this.getNormalizedValue(val);
            this.onModelChange(this.value);
            this.onChange.emit({ event: event, value: this.value });
            this.sliderHandle?.nativeElement.focus();
        }
        this.updateHandleValue();
    }
    getValueFromHandle(handleValue) {
        return (this.max - this.min) * (handleValue / 100) + this.min;
    }
    getDecimalsCount(value) {
        if (value && Math.floor(value) !== value)
            return value.toString().split('.')[1].length || 0;
        return 0;
    }
    getNormalizedValue(val) {
        let decimalsCount = this.getDecimalsCount(this.step);
        if (decimalsCount > 0) {
            return +parseFloat(val.toString()).toFixed(decimalsCount);
        }
        else {
            return Math.floor(val);
        }
    }
    ngOnDestroy() {
        this.unbindDragListeners();
    }
    get minVal() {
        return Math.min(this.values[1], this.values[0]);
    }
    get maxVal() {
        return Math.max(this.values[1], this.values[0]);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: Slider, deps: [{ token: DOCUMENT }, { token: PLATFORM_ID }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.NgZone }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.5", type: Slider, selector: "p-slider", inputs: { animate: "animate", disabled: "disabled", min: "min", max: "max", orientation: "orientation", step: "step", range: "range", style: "style", styleClass: "styleClass", ariaLabel: "ariaLabel", ariaLabelledBy: "ariaLabelledBy", tabindex: "tabindex" }, outputs: { onChange: "onChange", onSlideEnd: "onSlideEnd" }, host: { classAttribute: "p-element" }, providers: [SLIDER_VALUE_ACCESSOR], viewQueries: [{ propertyName: "sliderHandle", first: true, predicate: ["sliderHandle"], descendants: true }, { propertyName: "sliderHandleStart", first: true, predicate: ["sliderHandleStart"], descendants: true }, { propertyName: "sliderHandleEnd", first: true, predicate: ["sliderHandleEnd"], descendants: true }], ngImport: i0, template: `
        <div
            [ngStyle]="style"
            [class]="styleClass"
            [ngClass]="{ 'p-slider p-component': true, 'p-disabled': disabled, 'p-slider-horizontal': orientation == 'horizontal', 'p-slider-vertical': orientation == 'vertical', 'p-slider-animate': animate }"
            (click)="onBarClick($event)"
            [attr.data-pc-name]="'slider'"
            [attr.data-pc-section]="'root'"
        >
            <span
                *ngIf="range && orientation == 'horizontal'"
                class="p-slider-range"
                [ngStyle]="{ left: offset !== null && offset !== undefined ? offset + '%' : handleValues[0] + '%', width: diff ? diff + '%' : handleValues[1] - handleValues[0] + '%' }"
                [attr.data-pc-section]="'range'"
            ></span>
            <span
                *ngIf="range && orientation == 'vertical'"
                class="p-slider-range"
                [ngStyle]="{ bottom: offset !== null && offset !== undefined ? offset + '%' : handleValues[0] + '%', height: diff ? diff + '%' : handleValues[1] - handleValues[0] + '%' }"
                [attr.data-pc-section]="'range'"
            ></span>
            <span *ngIf="!range && orientation == 'vertical'" class="p-slider-range" [attr.data-pc-section]="'range'" [ngStyle]="{ height: handleValue + '%' }"></span>
            <span *ngIf="!range && orientation == 'horizontal'" class="p-slider-range" [attr.data-pc-section]="'range'" [ngStyle]="{ width: handleValue + '%' }"></span>
            <span
                *ngIf="!range"
                #sliderHandle
                class="p-slider-handle"
                [style.transition]="dragging ? 'none' : null"
                [ngStyle]="{ left: orientation == 'horizontal' ? handleValue + '%' : null, bottom: orientation == 'vertical' ? handleValue + '%' : null }"
                (touchstart)="onDragStart($event)"
                (touchmove)="onDrag($event)"
                (touchend)="onDragEnd($event)"
                (mousedown)="onMouseDown($event)"
                (keydown)="onKeyDown($event)"
                [attr.tabindex]="disabled ? null : tabindex"
                role="slider"
                [attr.aria-valuemin]="min"
                [attr.aria-valuenow]="value"
                [attr.aria-valuemax]="max"
                [attr.aria-labelledby]="ariaLabelledBy"
                [attr.aria-label]="ariaLabel"
                [attr.aria-orientation]="orientation"
                [attr.data-pc-section]="'handle'"
            ></span>
            <span
                *ngIf="range"
                #sliderHandleStart
                [style.transition]="dragging ? 'none' : null"
                class="p-slider-handle"
                [ngStyle]="{ left: rangeStartLeft, bottom: rangeStartBottom }"
                [ngClass]="{ 'p-slider-handle-active': handleIndex == 0 }"
                (keydown)="onKeyDown($event, 0)"
                (mousedown)="onMouseDown($event, 0)"
                (touchstart)="onDragStart($event, 0)"
                (touchmove)="onDrag($event, 0)"
                (touchend)="onDragEnd($event)"
                [attr.tabindex]="disabled ? null : tabindex"
                role="slider"
                [attr.aria-valuemin]="min"
                [attr.aria-valuenow]="value ? value[0] : null"
                [attr.aria-valuemax]="max"
                [attr.aria-labelledby]="ariaLabelledBy"
                [attr.aria-label]="ariaLabel"
                [attr.aria-orientation]="orientation"
                [attr.data-pc-section]="'startHandler'"
            ></span>
            <span
                *ngIf="range"
                #sliderHandleEnd
                [style.transition]="dragging ? 'none' : null"
                class="p-slider-handle"
                [ngStyle]="{ left: rangeEndLeft, bottom: rangeEndBottom }"
                [ngClass]="{ 'p-slider-handle-active': handleIndex == 1 }"
                (keydown)="onKeyDown($event, 1)"
                (mousedown)="onMouseDown($event, 1)"
                (touchstart)="onDragStart($event, 1)"
                (touchmove)="onDrag($event, 1)"
                (touchend)="onDragEnd($event)"
                [attr.tabindex]="disabled ? null : tabindex"
                [attr.aria-valuemin]="min"
                [attr.aria-valuenow]="value ? value[1] : null"
                [attr.aria-valuemax]="max"
                [attr.aria-labelledby]="ariaLabelledBy"
                [attr.aria-label]="ariaLabel"
                [attr.aria-orientation]="orientation"
                [attr.data-pc-section]="'endHandler'"
            ></span>
        </div>
    `, isInline: true, styles: ["@layer primeng{.p-slider{position:relative}.p-slider .p-slider-handle{position:absolute;cursor:grab;touch-action:none;display:block}.p-slider-range{position:absolute;display:block}.p-slider-horizontal .p-slider-range{top:0;left:0;height:100%}.p-slider-horizontal .p-slider-handle{top:50%}.p-slider-vertical{height:100px}.p-slider-vertical .p-slider-handle{left:50%}.p-slider-vertical .p-slider-range{bottom:0;left:0;width:100%}}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: Slider, decorators: [{
            type: Component,
            args: [{ selector: 'p-slider', template: `
        <div
            [ngStyle]="style"
            [class]="styleClass"
            [ngClass]="{ 'p-slider p-component': true, 'p-disabled': disabled, 'p-slider-horizontal': orientation == 'horizontal', 'p-slider-vertical': orientation == 'vertical', 'p-slider-animate': animate }"
            (click)="onBarClick($event)"
            [attr.data-pc-name]="'slider'"
            [attr.data-pc-section]="'root'"
        >
            <span
                *ngIf="range && orientation == 'horizontal'"
                class="p-slider-range"
                [ngStyle]="{ left: offset !== null && offset !== undefined ? offset + '%' : handleValues[0] + '%', width: diff ? diff + '%' : handleValues[1] - handleValues[0] + '%' }"
                [attr.data-pc-section]="'range'"
            ></span>
            <span
                *ngIf="range && orientation == 'vertical'"
                class="p-slider-range"
                [ngStyle]="{ bottom: offset !== null && offset !== undefined ? offset + '%' : handleValues[0] + '%', height: diff ? diff + '%' : handleValues[1] - handleValues[0] + '%' }"
                [attr.data-pc-section]="'range'"
            ></span>
            <span *ngIf="!range && orientation == 'vertical'" class="p-slider-range" [attr.data-pc-section]="'range'" [ngStyle]="{ height: handleValue + '%' }"></span>
            <span *ngIf="!range && orientation == 'horizontal'" class="p-slider-range" [attr.data-pc-section]="'range'" [ngStyle]="{ width: handleValue + '%' }"></span>
            <span
                *ngIf="!range"
                #sliderHandle
                class="p-slider-handle"
                [style.transition]="dragging ? 'none' : null"
                [ngStyle]="{ left: orientation == 'horizontal' ? handleValue + '%' : null, bottom: orientation == 'vertical' ? handleValue + '%' : null }"
                (touchstart)="onDragStart($event)"
                (touchmove)="onDrag($event)"
                (touchend)="onDragEnd($event)"
                (mousedown)="onMouseDown($event)"
                (keydown)="onKeyDown($event)"
                [attr.tabindex]="disabled ? null : tabindex"
                role="slider"
                [attr.aria-valuemin]="min"
                [attr.aria-valuenow]="value"
                [attr.aria-valuemax]="max"
                [attr.aria-labelledby]="ariaLabelledBy"
                [attr.aria-label]="ariaLabel"
                [attr.aria-orientation]="orientation"
                [attr.data-pc-section]="'handle'"
            ></span>
            <span
                *ngIf="range"
                #sliderHandleStart
                [style.transition]="dragging ? 'none' : null"
                class="p-slider-handle"
                [ngStyle]="{ left: rangeStartLeft, bottom: rangeStartBottom }"
                [ngClass]="{ 'p-slider-handle-active': handleIndex == 0 }"
                (keydown)="onKeyDown($event, 0)"
                (mousedown)="onMouseDown($event, 0)"
                (touchstart)="onDragStart($event, 0)"
                (touchmove)="onDrag($event, 0)"
                (touchend)="onDragEnd($event)"
                [attr.tabindex]="disabled ? null : tabindex"
                role="slider"
                [attr.aria-valuemin]="min"
                [attr.aria-valuenow]="value ? value[0] : null"
                [attr.aria-valuemax]="max"
                [attr.aria-labelledby]="ariaLabelledBy"
                [attr.aria-label]="ariaLabel"
                [attr.aria-orientation]="orientation"
                [attr.data-pc-section]="'startHandler'"
            ></span>
            <span
                *ngIf="range"
                #sliderHandleEnd
                [style.transition]="dragging ? 'none' : null"
                class="p-slider-handle"
                [ngStyle]="{ left: rangeEndLeft, bottom: rangeEndBottom }"
                [ngClass]="{ 'p-slider-handle-active': handleIndex == 1 }"
                (keydown)="onKeyDown($event, 1)"
                (mousedown)="onMouseDown($event, 1)"
                (touchstart)="onDragStart($event, 1)"
                (touchmove)="onDrag($event, 1)"
                (touchend)="onDragEnd($event)"
                [attr.tabindex]="disabled ? null : tabindex"
                [attr.aria-valuemin]="min"
                [attr.aria-valuenow]="value ? value[1] : null"
                [attr.aria-valuemax]="max"
                [attr.aria-labelledby]="ariaLabelledBy"
                [attr.aria-label]="ariaLabel"
                [attr.aria-orientation]="orientation"
                [attr.data-pc-section]="'endHandler'"
            ></span>
        </div>
    `, providers: [SLIDER_VALUE_ACCESSOR], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: ["@layer primeng{.p-slider{position:relative}.p-slider .p-slider-handle{position:absolute;cursor:grab;touch-action:none;display:block}.p-slider-range{position:absolute;display:block}.p-slider-horizontal .p-slider-range{top:0;left:0;height:100%}.p-slider-horizontal .p-slider-handle{top:50%}.p-slider-vertical{height:100px}.p-slider-vertical .p-slider-handle{left:50%}.p-slider-vertical .p-slider-range{bottom:0;left:0;width:100%}}\n"] }]
        }], ctorParameters: () => [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.NgZone }, { type: i0.ChangeDetectorRef }], propDecorators: { animate: [{
                type: Input
            }], disabled: [{
                type: Input
            }], min: [{
                type: Input
            }], max: [{
                type: Input
            }], orientation: [{
                type: Input
            }], step: [{
                type: Input
            }], range: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], ariaLabel: [{
                type: Input
            }], ariaLabelledBy: [{
                type: Input
            }], tabindex: [{
                type: Input
            }], onChange: [{
                type: Output
            }], onSlideEnd: [{
                type: Output
            }], sliderHandle: [{
                type: ViewChild,
                args: ['sliderHandle']
            }], sliderHandleStart: [{
                type: ViewChild,
                args: ['sliderHandleStart']
            }], sliderHandleEnd: [{
                type: ViewChild,
                args: ['sliderHandleEnd']
            }] } });
export class SliderModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: SliderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.0.5", ngImport: i0, type: SliderModule, declarations: [Slider], imports: [CommonModule], exports: [Slider] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: SliderModule, imports: [CommonModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: SliderModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [Slider],
                    declarations: [Slider]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL3NsaWRlci9zbGlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM1RSxPQUFPLEVBQUUsdUJBQXVCLEVBQXFCLFNBQVMsRUFBYyxZQUFZLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQXFCLE1BQU0sRUFBRSxXQUFXLEVBQWEsU0FBUyxFQUFFLGlCQUFpQixFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN0TyxPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQzs7O0FBSXpDLE1BQU0sQ0FBQyxNQUFNLHFCQUFxQixHQUFRO0lBQ3RDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUM7SUFDckMsS0FBSyxFQUFFLElBQUk7Q0FDZCxDQUFDO0FBQ0Y7OztHQUdHO0FBb0dILE1BQU0sT0FBTyxNQUFNO0lBMEh1QjtJQUFpRDtJQUF3QjtJQUF1QjtJQUE2QjtJQUF1QjtJQXpIMUw7OztPQUdHO0lBQ00sT0FBTyxDQUFzQjtJQUN0Qzs7O09BR0c7SUFDTSxRQUFRLENBQXNCO0lBQ3ZDOzs7T0FHRztJQUNNLEdBQUcsR0FBVyxDQUFDLENBQUM7SUFDekI7OztPQUdHO0lBQ00sR0FBRyxHQUFXLEdBQUcsQ0FBQztJQUMzQjs7O09BR0c7SUFDTSxXQUFXLEdBQThCLFlBQVksQ0FBQztJQUMvRDs7O09BR0c7SUFDTSxJQUFJLENBQXFCO0lBQ2xDOzs7T0FHRztJQUNNLEtBQUssQ0FBc0I7SUFDcEM7OztPQUdHO0lBQ00sS0FBSyxDQUE4QztJ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O0FBdWVoQyxNQUFNLE9BQU8sWUFBWTt1R0FBWixZQUFZO3dHQUFaLFlBQVksaUJBcmpCWixNQUFNLGFBaWpCTCxZQUFZLGFBampCYixNQUFNO3dHQXFqQk4sWUFBWSxZQUpYLFlBQVk7OzJGQUliLFlBQVk7a0JBTHhCLFFBQVE7bUJBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUM7b0JBQ2pCLFlBQVksRUFBRSxDQUFDLE1BQU0sQ0FBQztpQkFDekIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUsIERPQ1VNRU5ULCBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbmplY3QsIElucHV0LCBOZ01vZHVsZSwgTmdab25lLCBPbkRlc3Ryb3ksIE91dHB1dCwgUExBVEZPUk1fSUQsIFJlbmRlcmVyMiwgVmlld0NoaWxkLCBWaWV3RW5jYXBzdWxhdGlvbiwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRG9tSGFuZGxlciB9IGZyb20gJ3ByaW1lbmcvZG9tJztcbmltcG9ydCB7IE51bGxhYmxlLCBWb2lkTGlzdGVuZXIgfSBmcm9tICdwcmltZW5nL3RzLWhlbHBlcnMnO1xuaW1wb3J0IHsgU2xpZGVyQ2hhbmdlRXZlbnQsIFNsaWRlclNsaWRlRW5kRXZlbnQgfSBmcm9tICcuL3NsaWRlci5pbnRlcmZhY2UnO1xuXG5leHBvcnQgY29uc3QgU0xJREVSX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gU2xpZGVyKSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcbi8qKlxuICogU2xpZGVyIGlzIGEgY29tcG9uZW50IHRvIHByb3ZpZGUgaW5wdXQgd2l0aCBhIGRyYWcgaGFuZGxlLlxuICogQGdyb3VwIENvbXBvbmVudHNcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLXNsaWRlcicsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdlxuICAgICAgICAgICAgW25nU3R5bGVdPVwic3R5bGVcIlxuICAgICAgICAgICAgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIlxuICAgICAgICAgICAgW25nQ2xhc3NdPVwieyAncC1zbGlkZXIgcC1jb21wb25lbnQnOiB0cnVlLCAncC1kaXNhYmxlZCc6IGRpc2FibGVkLCAncC1zbGlkZXItaG9yaXpvbnRhbCc6IG9yaWVudGF0aW9uID09ICdob3Jpem9udGFsJywgJ3Atc2xpZGVyLXZlcnRpY2FsJzogb3JpZW50YXRpb24gPT0gJ3ZlcnRpY2FsJywgJ3Atc2xpZGVyLWFuaW1hdGUnOiBhbmltYXRlIH1cIlxuICAgICAgICAgICAgKGNsaWNrKT1cIm9uQmFyQ2xpY2soJGV2ZW50KVwiXG4gICAgICAgICAgICBbYXR0ci5kYXRhLXBjLW5hbWVdPVwiJ3NsaWRlcidcIlxuICAgICAgICAgICAgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidyb290J1wiXG4gICAgICAgID5cbiAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgKm5nSWY9XCJyYW5nZSAmJiBvcmllbnRhdGlvbiA9PSAnaG9yaXpvbnRhbCdcIlxuICAgICAgICAgICAgICAgIGNsYXNzPVwicC1zbGlkZXItcmFuZ2VcIlxuICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cInsgbGVmdDogb2Zmc2V0ICE9PSBudWxsICYmIG9mZnNldCAhPT0gdW5kZWZpbmVkID8gb2Zmc2V0ICsgJyUnIDogaGFuZGxlVmFsdWVzWzBdICsgJyUnLCB3aWR0aDogZGlmZiA/IGRpZmYgKyAnJScgOiBoYW5kbGVWYWx1ZXNbMV0gLSBoYW5kbGVWYWx1ZXNbMF0gKyAnJScgfVwiXG4gICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidyYW5nZSdcIlxuICAgICAgICAgICAgPjwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgKm5nSWY9XCJyYW5nZSAmJiBvcmllbnRhdGlvbiA9PSAndmVydGljYWwnXCJcbiAgICAgICAgICAgICAgICBjbGFzcz1cInAtc2xpZGVyLXJhbmdlXCJcbiAgICAgICAgICAgICAgICBbbmdTdHlsZV09XCJ7IGJvdHRvbTogb2Zmc2V0ICE9PSBudWxsICYmIG9mZnNldCAhPT0gdW5kZWZpbmVkID8gb2Zmc2V0ICsgJyUnIDogaGFuZGxlVmFsdWVzWzBdICsgJyUnLCBoZWlnaHQ6IGRpZmYgPyBkaWZmICsgJyUnIDogaGFuZGxlVmFsdWVzWzFdIC0gaGFuZGxlVmFsdWVzWzBdICsgJyUnIH1cIlxuICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCIncmFuZ2UnXCJcbiAgICAgICAgICAgID48L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiAqbmdJZj1cIiFyYW5nZSAmJiBvcmllbnRhdGlvbiA9PSAndmVydGljYWwnXCIgY2xhc3M9XCJwLXNsaWRlci1yYW5nZVwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCIncmFuZ2UnXCIgW25nU3R5bGVdPVwieyBoZWlnaHQ6IGhhbmRsZVZhbHVlICsgJyUnIH1cIj48L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiAqbmdJZj1cIiFyYW5nZSAmJiBvcmllbnRhdGlvbiA9PSAnaG9yaXpvbnRhbCdcIiBjbGFzcz1cInAtc2xpZGVyLXJhbmdlXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidyYW5nZSdcIiBbbmdTdHlsZV09XCJ7IHdpZHRoOiBoYW5kbGVWYWx1ZSArICclJyB9XCI+PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAqbmdJZj1cIiFyYW5nZVwiXG4gICAgICAgICAgICAgICAgI3NsaWRlckhhbmRsZVxuICAgICAgICAgICAgICAgIGNsYXNzPVwicC1zbGlkZXItaGFuZGxlXCJcbiAgICAgICAgICAgICAgICBbc3R5bGUudHJhbnNpdGlvbl09XCJkcmFnZ2luZyA/ICdub25lJyA6IG51bGxcIlxuICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cInsgbGVmdDogb3JpZW50YXRpb24gPT0gJ2hvcml6b250YWwnID8gaGFuZGxlVmFsdWUgKyAnJScgOiBudWxsLCBib3R0b206IG9yaWVudGF0aW9uID09ICd2ZXJ0aWNhbCcgPyBoYW5kbGVWYWx1ZSArICclJyA6IG51bGwgfVwiXG4gICAgICAgICAgICAgICAgKHRvdWNoc3RhcnQpPVwib25EcmFnU3RhcnQoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgKHRvdWNobW92ZSk9XCJvbkRyYWcoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgKHRvdWNoZW5kKT1cIm9uRHJhZ0VuZCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAobW91c2Vkb3duKT1cIm9uTW91c2VEb3duKCRldmVudClcIlxuICAgICAgICAgICAgICAgIChrZXlkb3duKT1cIm9uS2V5RG93bigkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICBbYXR0ci50YWJpbmRleF09XCJkaXNhYmxlZCA/IG51bGwgOiB0YWJpbmRleFwiXG4gICAgICAgICAgICAgICAgcm9sZT1cInNsaWRlclwiXG4gICAgICAgICAgICAgICAgW2F0dHIuYXJpYS12YWx1ZW1pbl09XCJtaW5cIlxuICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtdmFsdWVub3ddPVwidmFsdWVcIlxuICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtdmFsdWVtYXhdPVwibWF4XCJcbiAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwiYXJpYUxhYmVsbGVkQnlcIlxuICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiYXJpYUxhYmVsXCJcbiAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLW9yaWVudGF0aW9uXT1cIm9yaWVudGF0aW9uXCJcbiAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ2hhbmRsZSdcIlxuICAgICAgICAgICAgPjwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgKm5nSWY9XCJyYW5nZVwiXG4gICAgICAgICAgICAgICAgI3NsaWRlckhhbmRsZVN0YXJ0XG4gICAgICAgICAgICAgICAgW3N0eWxlLnRyYW5zaXRpb25dPVwiZHJhZ2dpbmcgPyAnbm9uZScgOiBudWxsXCJcbiAgICAgICAgICAgICAgICBjbGFzcz1cInAtc2xpZGVyLWhhbmRsZVwiXG4gICAgICAgICAgICAgICAgW25nU3R5bGVdPVwieyBsZWZ0OiByYW5nZVN0YXJ0TGVmdCwgYm90dG9tOiByYW5nZVN0YXJ0Qm90dG9tIH1cIlxuICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsgJ3Atc2xpZGVyLWhhbmRsZS1hY3RpdmUnOiBoYW5kbGVJbmRleCA9PSAwIH1cIlxuICAgICAgICAgICAgICAgIChrZXlkb3duKT1cIm9uS2V5RG93bigkZXZlbnQsIDApXCJcbiAgICAgICAgICAgICAgICAobW91c2Vkb3duKT1cIm9uTW91c2VEb3duKCRldmVudCwgMClcIlxuICAgICAgICAgICAgICAgICh0b3VjaHN0YXJ0KT1cIm9uRHJhZ1N0YXJ0KCRldmVudCwgMClcIlxuICAgICAgICAgICAgICAgICh0b3VjaG1vdmUpPVwib25EcmFnKCRldmVudCwgMClcIlxuICAgICAgICAgICAgICAgICh0b3VjaGVuZCk9XCJvbkRyYWdFbmQoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgW2F0dHIudGFiaW5kZXhdPVwiZGlzYWJsZWQgPyBudWxsIDogdGFiaW5kZXhcIlxuICAgICAgICAgICAgICAgIHJvbGU9XCJzbGlkZXJcIlxuICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtdmFsdWVtaW5dPVwibWluXCJcbiAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLXZhbHVlbm93XT1cInZhbHVlID8gdmFsdWVbMF0gOiBudWxsXCJcbiAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLXZhbHVlbWF4XT1cIm1heFwiXG4gICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XT1cImFyaWFMYWJlbGxlZEJ5XCJcbiAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImFyaWFMYWJlbFwiXG4gICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1vcmllbnRhdGlvbl09XCJvcmllbnRhdGlvblwiXG4gICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidzdGFydEhhbmRsZXInXCJcbiAgICAgICAgICAgID48L3NwYW4+XG4gICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICpuZ0lmPVwicmFuZ2VcIlxuICAgICAgICAgICAgICAgICNzbGlkZXJIYW5kbGVFbmRcbiAgICAgICAgICAgICAgICBbc3R5bGUudHJhbnNpdGlvbl09XCJkcmFnZ2luZyA/ICdub25lJyA6IG51bGxcIlxuICAgICAgICAgICAgICAgIGNsYXNzPVwicC1zbGlkZXItaGFuZGxlXCJcbiAgICAgICAgICAgICAgICBbbmdTdHlsZV09XCJ7IGxlZnQ6IHJhbmdlRW5kTGVmdCwgYm90dG9tOiByYW5nZUVuZEJvdHRvbSB9XCJcbiAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7ICdwLXNsaWRlci1oYW5kbGUtYWN0aXZlJzogaGFuZGxlSW5kZXggPT0gMSB9XCJcbiAgICAgICAgICAgICAgICAoa2V5ZG93bik9XCJvbktleURvd24oJGV2ZW50LCAxKVwiXG4gICAgICAgICAgICAgICAgKG1vdXNlZG93bik9XCJvbk1vdXNlRG93bigkZXZlbnQsIDEpXCJcbiAgICAgICAgICAgICAgICAodG91Y2hzdGFydCk9XCJvbkRyYWdTdGFydCgkZXZlbnQsIDEpXCJcbiAgICAgICAgICAgICAgICAodG91Y2htb3ZlKT1cIm9uRHJhZygkZXZlbnQsIDEpXCJcbiAgICAgICAgICAgICAgICAodG91Y2hlbmQpPVwib25EcmFnRW5kKCRldmVudClcIlxuICAgICAgICAgICAgICAgIFthdHRyLnRhYmluZGV4XT1cImRpc2FibGVkID8gbnVsbCA6IHRhYmluZGV4XCJcbiAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLXZhbHVlbWluXT1cIm1pblwiXG4gICAgICAgICAgICAgICAgW2F0dHIuYXJpYS12YWx1ZW5vd109XCJ2YWx1ZSA/IHZhbHVlWzFdIDogbnVsbFwiXG4gICAgICAgICAgICAgICAgW2F0dHIuYXJpYS12YWx1ZW1heF09XCJtYXhcIlxuICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxsZWRieV09XCJhcmlhTGFiZWxsZWRCeVwiXG4gICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJhcmlhTGFiZWxcIlxuICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtb3JpZW50YXRpb25dPVwib3JpZW50YXRpb25cIlxuICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInZW5kSGFuZGxlcidcIlxuICAgICAgICAgICAgPjwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBwcm92aWRlcnM6IFtTTElERVJfVkFMVUVfQUNDRVNTT1JdLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgc3R5bGVVcmxzOiBbJy4vc2xpZGVyLmNzcyddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdwLWVsZW1lbnQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBTbGlkZXIgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgICAvKipcbiAgICAgKiBXaGVuIGVuYWJsZWQsIGRpc3BsYXlzIGFuIGFuaW1hdGlvbiBvbiBjbGljayBvZiB0aGUgc2xpZGVyIGJhci5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBhbmltYXRlOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdoZW4gcHJlc2VudCwgaXQgc3BlY2lmaWVzIHRoYXQgdGhlIGVsZW1lbnQgc2hvdWxkIGJlIGRpc2FibGVkLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIE1pbmludW0gYm91bmRhcnkgdmFsdWUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgbWluOiBudW1iZXIgPSAwO1xuICAgIC8qKlxuICAgICAqIE1heGltdW0gYm91bmRhcnkgdmFsdWUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgbWF4OiBudW1iZXIgPSAxMDA7XG4gICAgLyoqXG4gICAgICogT3JpZW50YXRpb24gb2YgdGhlIHNsaWRlci5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBvcmllbnRhdGlvbjogJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJyA9ICdob3Jpem9udGFsJztcbiAgICAvKipcbiAgICAgKiBTdGVwIGZhY3RvciB0byBpbmNyZW1lbnQvZGVjcmVtZW50IHRoZSB2YWx1ZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzdGVwOiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hlbiBzcGVjaWZpZWQsIGFsbG93cyB0d28gYm91bmRhcnkgdmFsdWVzIHRvIGJlIHBpY2tlZC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSByYW5nZTogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBJbmxpbmUgc3R5bGUgb2YgdGhlIGNvbXBvbmVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzdHlsZTogeyBba2xhc3M6IHN0cmluZ106IGFueSB9IHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBTdHlsZSBjbGFzcyBvZiB0aGUgY29tcG9uZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIGEgc3RyaW5nIHRoYXQgbGFiZWxzIHRoZSBpbnB1dCBmb3IgYWNjZXNzaWJpbGl0eS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBhcmlhTGFiZWw6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBFc3RhYmxpc2hlcyByZWxhdGlvbnNoaXBzIGJldHdlZW4gdGhlIGNvbXBvbmVudCBhbmQgbGFiZWwocykgd2hlcmUgaXRzIHZhbHVlIHNob3VsZCBiZSBvbmUgb3IgbW9yZSBlbGVtZW50IElEcy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBhcmlhTGFiZWxsZWRCeTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIEluZGV4IG9mIHRoZSBlbGVtZW50IGluIHRhYmJpbmcgb3JkZXIuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgdGFiaW5kZXg6IG51bWJlciA9IDA7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIG9uIHZhbHVlIGNoYW5nZS5cbiAgICAgKiBAcGFyYW0ge1NsaWRlckNoYW5nZUV2ZW50fSBldmVudCAtIEN1c3RvbSB2YWx1ZSBjaGFuZ2UgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8U2xpZGVyQ2hhbmdlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxTbGlkZXJDaGFuZ2VFdmVudD4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBzbGlkZSBlbmRlZC5cbiAgICAgKiBAcGFyYW0ge1NsaWRlclNsaWRlRW5kRXZlbnR9IGV2ZW50IC0gQ3VzdG9tIHNsaWRlIGVuZCBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25TbGlkZUVuZDogRXZlbnRFbWl0dGVyPFNsaWRlclNsaWRlRW5kRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxTbGlkZXJTbGlkZUVuZEV2ZW50PigpO1xuXG4gICAgQFZpZXdDaGlsZCgnc2xpZGVySGFuZGxlJykgc2xpZGVySGFuZGxlOiBOdWxsYWJsZTxFbGVtZW50UmVmPjtcblxuICAgIEBWaWV3Q2hpbGQoJ3NsaWRlckhhbmRsZVN0YXJ0Jykgc2xpZGVySGFuZGxlU3RhcnQ6IE51bGxhYmxlPEVsZW1lbnRSZWY+O1xuXG4gICAgQFZpZXdDaGlsZCgnc2xpZGVySGFuZGxlRW5kJykgc2xpZGVySGFuZGxlRW5kOiBOdWxsYWJsZTxFbGVtZW50UmVmPjtcblxuICAgIHB1YmxpYyB2YWx1ZTogTnVsbGFibGU8bnVtYmVyPjtcblxuICAgIHB1YmxpYyB2YWx1ZXM6IE51bGxhYmxlPG51bWJlcltdPjtcblxuICAgIHB1YmxpYyBoYW5kbGVWYWx1ZTogTnVsbGFibGU8bnVtYmVyPjtcblxuICAgIHB1YmxpYyBoYW5kbGVWYWx1ZXM6IG51bWJlcltdID0gW107XG5cbiAgICBkaWZmOiBOdWxsYWJsZTxudW1iZXI+O1xuXG4gICAgb2Zmc2V0OiBOdWxsYWJsZTxudW1iZXI+O1xuXG4gICAgYm90dG9tOiBOdWxsYWJsZTxudW1iZXI+O1xuXG4gICAgcHVibGljIG9uTW9kZWxDaGFuZ2U6IEZ1bmN0aW9uID0gKCkgPT4ge307XG5cbiAgICBwdWJsaWMgb25Nb2RlbFRvdWNoZWQ6IEZ1bmN0aW9uID0gKCkgPT4ge307XG5cbiAgICBwdWJsaWMgZHJhZ2dpbmc6IE51bGxhYmxlPGJvb2xlYW4+O1xuXG4gICAgcHVibGljIGRyYWdMaXN0ZW5lcjogVm9pZExpc3RlbmVyO1xuXG4gICAgcHVibGljIG1vdXNldXBMaXN0ZW5lcjogVm9pZExpc3RlbmVyO1xuXG4gICAgcHVibGljIGluaXRYOiBOdWxsYWJsZTxudW1iZXI+O1xuXG4gICAgcHVibGljIGluaXRZOiBOdWxsYWJsZTxudW1iZXI+O1xuXG4gICAgcHVibGljIGJhcldpZHRoOiBOdWxsYWJsZTxudW1iZXI+O1xuXG4gICAgcHVibGljIGJhckhlaWdodDogTnVsbGFibGU8bnVtYmVyPjtcblxuICAgIHB1YmxpYyBzbGlkZXJIYW5kbGVDbGljazogTnVsbGFibGU8Ym9vbGVhbj47XG5cbiAgICBwdWJsaWMgaGFuZGxlSW5kZXg6IG51bWJlciA9IDA7XG5cbiAgICBwdWJsaWMgc3RhcnRIYW5kbGVWYWx1ZTogYW55O1xuXG4gICAgcHVibGljIHN0YXJ0eDogTnVsbGFibGU8bnVtYmVyPjtcblxuICAgIHB1YmxpYyBzdGFydHk6IE51bGxhYmxlPG51bWJlcj47XG5cbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBEb2N1bWVudCwgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBhbnksIHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHVibGljIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsIHB1YmxpYyBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgICBvbk1vdXNlRG93bihldmVudDogRXZlbnQsIGluZGV4PzogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRyYWdnaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy51cGRhdGVEb21EYXRhKCk7XG4gICAgICAgIHRoaXMuc2xpZGVySGFuZGxlQ2xpY2sgPSB0cnVlO1xuICAgICAgICBpZiAodGhpcy5yYW5nZSAmJiB0aGlzLmhhbmRsZVZhbHVlcyAmJiB0aGlzLmhhbmRsZVZhbHVlc1swXSA9PT0gdGhpcy5tYXgpIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlSW5kZXggPSAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgKHRoaXMuaGFuZGxlSW5kZXggYXMgYW55KSA9IGluZGV4O1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5iaW5kRHJhZ0xpc3RlbmVycygpO1xuICAgICAgICAoZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLmZvY3VzKCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgaWYgKHRoaXMuYW5pbWF0ZSkge1xuICAgICAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF0sICdwLXNsaWRlci1hbmltYXRlJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkRyYWdTdGFydChldmVudDogVG91Y2hFdmVudCwgaW5kZXg/OiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB0b3VjaG9iaiA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdO1xuICAgICAgICB0aGlzLnN0YXJ0SGFuZGxlVmFsdWUgPSB0aGlzLnJhbmdlID8gdGhpcy5oYW5kbGVWYWx1ZXNbaW5kZXggYXMgbnVtYmVyXSA6IHRoaXMuaGFuZGxlVmFsdWU7XG4gICAgICAgIHRoaXMuZHJhZ2dpbmcgPSB0cnVlO1xuICAgICAgICBpZiAodGhpcy5yYW5nZSAmJiB0aGlzLmhhbmRsZVZhbHVlcyAmJiB0aGlzLmhhbmRsZVZhbHVlc1swXSA9PT0gdGhpcy5tYXgpIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlSW5kZXggPSAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVJbmRleCA9IGluZGV4IGFzIG51bWJlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnR4ID0gcGFyc2VJbnQoKHRvdWNob2JqIGFzIGFueSkuY2xpZW50WCwgMTApO1xuICAgICAgICAgICAgdGhpcy5iYXJXaWR0aCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXS5vZmZzZXRXaWR0aDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnR5ID0gcGFyc2VJbnQoKHRvdWNob2JqIGFzIGFueSkuY2xpZW50WSwgMTApO1xuICAgICAgICAgICAgdGhpcy5iYXJIZWlnaHQgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF0ub2Zmc2V0SGVpZ2h0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuYW5pbWF0ZSkge1xuICAgICAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF0sICdwLXNsaWRlci1hbmltYXRlJyk7XG4gICAgICAgIH1cblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIG9uRHJhZyhldmVudDogVG91Y2hFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHRvdWNob2JqID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0sXG4gICAgICAgICAgICBoYW5kbGVWYWx1ZSA9IDA7XG5cbiAgICAgICAgaWYgKHRoaXMub3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICAgICAgaGFuZGxlVmFsdWUgPSBNYXRoLmZsb29yKCgocGFyc2VJbnQoKHRvdWNob2JqIGFzIGFueSkuY2xpZW50WCwgMTApIC0gKHRoaXMuc3RhcnR4IGFzIG51bWJlcikpICogMTAwKSAvICh0aGlzLmJhcldpZHRoIGFzIG51bWJlcikpICsgdGhpcy5zdGFydEhhbmRsZVZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaGFuZGxlVmFsdWUgPSBNYXRoLmZsb29yKCgoKHRoaXMuc3RhcnR5IGFzIG51bWJlcikgLSBwYXJzZUludCgodG91Y2hvYmogYXMgYW55KS5jbGllbnRZLCAxMCkpICogMTAwKSAvICh0aGlzLmJhckhlaWdodCBhcyBudW1iZXIpKSArIHRoaXMuc3RhcnRIYW5kbGVWYWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0VmFsdWVGcm9tSGFuZGxlKGV2ZW50LCBoYW5kbGVWYWx1ZSk7XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvbkRyYWdFbmQoZXZlbnQ6IFRvdWNoRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcblxuICAgICAgICBpZiAodGhpcy5yYW5nZSkgdGhpcy5vblNsaWRlRW5kLmVtaXQoeyBvcmlnaW5hbEV2ZW50OiBldmVudCwgdmFsdWVzOiB0aGlzLnZhbHVlcyBhcyBudW1iZXJbXSB9KTtcbiAgICAgICAgZWxzZSB0aGlzLm9uU2xpZGVFbmQuZW1pdCh7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50LCB2YWx1ZTogdGhpcy52YWx1ZSBhcyBudW1iZXIgfSk7XG5cbiAgICAgICAgaWYgKHRoaXMuYW5pbWF0ZSkge1xuICAgICAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF0sICdwLXNsaWRlci1hbmltYXRlJyk7XG4gICAgICAgIH1cblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIG9uQmFyQ2xpY2soZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuc2xpZGVySGFuZGxlQ2xpY2spIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRG9tRGF0YSgpO1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVDaGFuZ2UoZXZlbnQpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5yYW5nZSkgdGhpcy5vblNsaWRlRW5kLmVtaXQoeyBvcmlnaW5hbEV2ZW50OiBldmVudCwgdmFsdWVzOiB0aGlzLnZhbHVlcyBhcyBudW1iZXJbXSB9KTtcbiAgICAgICAgICAgIGVsc2UgdGhpcy5vblNsaWRlRW5kLmVtaXQoeyBvcmlnaW5hbEV2ZW50OiBldmVudCwgdmFsdWU6IHRoaXMudmFsdWUgYXMgbnVtYmVyIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zbGlkZXJIYW5kbGVDbGljayA9IGZhbHNlO1xuICAgIH1cblxuICAgIG9uS2V5RG93bihldmVudCwgaW5kZXgpIHtcbiAgICAgICAgdGhpcy5oYW5kbGVJbmRleCA9IGluZGV4O1xuXG4gICAgICAgIHN3aXRjaCAoZXZlbnQuY29kZSkge1xuICAgICAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICAgIGNhc2UgJ0Fycm93TGVmdCc6XG4gICAgICAgICAgICAgICAgdGhpcy5kZWNyZW1lbnRWYWx1ZShldmVudCwgaW5kZXgpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICAgICAgY2FzZSAnQXJyb3dSaWdodCc6XG4gICAgICAgICAgICAgICAgdGhpcy5pbmNyZW1lbnRWYWx1ZShldmVudCwgaW5kZXgpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ1BhZ2VEb3duJzpcbiAgICAgICAgICAgICAgICB0aGlzLmRlY3JlbWVudFZhbHVlKGV2ZW50LCBpbmRleCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnUGFnZVVwJzpcbiAgICAgICAgICAgICAgICB0aGlzLmluY3JlbWVudFZhbHVlKGV2ZW50LCBpbmRleCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnSG9tZSc6XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVWYWx1ZSh0aGlzLm1pbiwgZXZlbnQpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0VuZCc6XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVWYWx1ZSh0aGlzLm1heCwgZXZlbnQpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZWNyZW1lbnRWYWx1ZShldmVudCwgaW5kZXgsIHBhZ2VLZXkgPSBmYWxzZSkge1xuICAgICAgICBsZXQgbmV3VmFsdWU7XG5cbiAgICAgICAgaWYgKHRoaXMucmFuZ2UpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0ZXApIG5ld1ZhbHVlID0gdGhpcy52YWx1ZXNbaW5kZXhdIC0gdGhpcy5zdGVwO1xuICAgICAgICAgICAgZWxzZSBuZXdWYWx1ZSA9IHRoaXMudmFsdWVzW2luZGV4XSAtIDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zdGVwKSBuZXdWYWx1ZSA9IHRoaXMudmFsdWUgLSB0aGlzLnN0ZXA7XG4gICAgICAgICAgICBlbHNlIGlmICghdGhpcy5zdGVwICYmIHBhZ2VLZXkpIG5ld1ZhbHVlID0gdGhpcy52YWx1ZSAtIDEwO1xuICAgICAgICAgICAgZWxzZSBuZXdWYWx1ZSA9IHRoaXMudmFsdWUgLSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy51cGRhdGVWYWx1ZShuZXdWYWx1ZSwgZXZlbnQpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIGluY3JlbWVudFZhbHVlKGV2ZW50LCBpbmRleCwgcGFnZUtleSA9IGZhbHNlKSB7XG4gICAgICAgIGxldCBuZXdWYWx1ZTtcblxuICAgICAgICBpZiAodGhpcy5yYW5nZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RlcCkgbmV3VmFsdWUgPSB0aGlzLnZhbHVlc1tpbmRleF0gKyB0aGlzLnN0ZXA7XG4gICAgICAgICAgICBlbHNlIG5ld1ZhbHVlID0gdGhpcy52YWx1ZXNbaW5kZXhdICsgMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0ZXApIG5ld1ZhbHVlID0gdGhpcy52YWx1ZSArIHRoaXMuc3RlcDtcbiAgICAgICAgICAgIGVsc2UgaWYgKCF0aGlzLnN0ZXAgJiYgcGFnZUtleSkgbmV3VmFsdWUgPSB0aGlzLnZhbHVlICsgMTA7XG4gICAgICAgICAgICBlbHNlIG5ld1ZhbHVlID0gdGhpcy52YWx1ZSArIDE7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnVwZGF0ZVZhbHVlKG5ld1ZhbHVlLCBldmVudCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgaGFuZGxlQ2hhbmdlKGV2ZW50OiBFdmVudCkge1xuICAgICAgICBsZXQgaGFuZGxlVmFsdWUgPSB0aGlzLmNhbGN1bGF0ZUhhbmRsZVZhbHVlKGV2ZW50KTtcbiAgICAgICAgdGhpcy5zZXRWYWx1ZUZyb21IYW5kbGUoZXZlbnQsIGhhbmRsZVZhbHVlKTtcbiAgICB9XG5cbiAgICBiaW5kRHJhZ0xpc3RlbmVycygpIHtcbiAgICAgICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgICAgICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBkb2N1bWVudFRhcmdldDogYW55ID0gdGhpcy5lbCA/IHRoaXMuZWwubmF0aXZlRWxlbWVudC5vd25lckRvY3VtZW50IDogdGhpcy5kb2N1bWVudDtcblxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5kcmFnTGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmFnTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbihkb2N1bWVudFRhcmdldCwgJ21vdXNlbW92ZScsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZHJhZ2dpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUNoYW5nZShldmVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5tb3VzZXVwTGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3VzZXVwTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbihkb2N1bWVudFRhcmdldCwgJ21vdXNldXAnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRyYWdnaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnJhbmdlKSB0aGlzLm9uU2xpZGVFbmQuZW1pdCh7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50LCB2YWx1ZXM6IHRoaXMudmFsdWVzIGFzIG51bWJlcltdIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHRoaXMub25TbGlkZUVuZC5lbWl0KHsgb3JpZ2luYWxFdmVudDogZXZlbnQsIHZhbHVlOiB0aGlzLnZhbHVlIGFzIG51bWJlciB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hbmltYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXSwgJ3Atc2xpZGVyLWFuaW1hdGUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVuYmluZERyYWdMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGlmICh0aGlzLmRyYWdMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5kcmFnTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIHRoaXMuZHJhZ0xpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm1vdXNldXBMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5tb3VzZXVwTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIHRoaXMubW91c2V1cExpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldFZhbHVlRnJvbUhhbmRsZShldmVudDogRXZlbnQsIGhhbmRsZVZhbHVlOiBhbnkpIHtcbiAgICAgICAgbGV0IG5ld1ZhbHVlID0gdGhpcy5nZXRWYWx1ZUZyb21IYW5kbGUoaGFuZGxlVmFsdWUpO1xuXG4gICAgICAgIGlmICh0aGlzLnJhbmdlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zdGVwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVTdGVwQ2hhbmdlKG5ld1ZhbHVlLCAodGhpcy52YWx1ZXMgYXMgYW55KVt0aGlzLmhhbmRsZUluZGV4XSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlVmFsdWVzW3RoaXMuaGFuZGxlSW5kZXhdID0gaGFuZGxlVmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVWYWx1ZShuZXdWYWx1ZSwgZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RlcCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlU3RlcENoYW5nZShuZXdWYWx1ZSwgdGhpcy52YWx1ZSBhcyBhbnkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVZhbHVlID0gaGFuZGxlVmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVWYWx1ZShuZXdWYWx1ZSwgZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBoYW5kbGVTdGVwQ2hhbmdlKG5ld1ZhbHVlOiBudW1iZXIsIG9sZFZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGRpZmYgPSBuZXdWYWx1ZSAtIG9sZFZhbHVlO1xuICAgICAgICBsZXQgdmFsID0gb2xkVmFsdWU7XG4gICAgICAgIGxldCBfc3RlcCA9IHRoaXMuc3RlcCBhcyBudW1iZXI7XG5cbiAgICAgICAgaWYgKGRpZmYgPCAwKSB7XG4gICAgICAgICAgICB2YWwgPSBvbGRWYWx1ZSArIE1hdGguY2VpbChuZXdWYWx1ZSAvIF9zdGVwIC0gb2xkVmFsdWUgLyBfc3RlcCkgKiBfc3RlcDtcbiAgICAgICAgfSBlbHNlIGlmIChkaWZmID4gMCkge1xuICAgICAgICAgICAgdmFsID0gb2xkVmFsdWUgKyBNYXRoLmZsb29yKG5ld1ZhbHVlIC8gX3N0ZXAgLSBvbGRWYWx1ZSAvIF9zdGVwKSAqIF9zdGVwO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy51cGRhdGVWYWx1ZSh2YWwpO1xuICAgICAgICB0aGlzLnVwZGF0ZUhhbmRsZVZhbHVlKCk7XG4gICAgfVxuXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnJhbmdlKSB0aGlzLnZhbHVlcyA9IHZhbHVlIHx8IFswLCAwXTtcbiAgICAgICAgZWxzZSB0aGlzLnZhbHVlID0gdmFsdWUgfHwgMDtcblxuICAgICAgICB0aGlzLnVwZGF0ZUhhbmRsZVZhbHVlKCk7XG4gICAgICAgIHRoaXMudXBkYXRlRGlmZkFuZE9mZnNldCgpO1xuICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkID0gZm47XG4gICAgfVxuXG4gICAgc2V0RGlzYWJsZWRTdGF0ZSh2YWw6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IHZhbDtcbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBnZXQgcmFuZ2VTdGFydExlZnQoKSB7XG4gICAgICAgIGlmICghdGhpcy5pc1ZlcnRpY2FsKCkpIHJldHVybiB0aGlzLmhhbmRsZVZhbHVlc1swXSA+IDEwMCA/IDEwMCArICclJyA6IHRoaXMuaGFuZGxlVmFsdWVzWzBdICsgJyUnO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBnZXQgcmFuZ2VTdGFydEJvdHRvbSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNWZXJ0aWNhbCgpID8gdGhpcy5oYW5kbGVWYWx1ZXNbMF0gKyAnJScgOiAnYXV0byc7XG4gICAgfVxuXG4gICAgZ2V0IHJhbmdlRW5kTGVmdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNWZXJ0aWNhbCgpID8gbnVsbCA6IHRoaXMuaGFuZGxlVmFsdWVzWzFdICsgJyUnO1xuICAgIH1cblxuICAgIGdldCByYW5nZUVuZEJvdHRvbSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNWZXJ0aWNhbCgpID8gdGhpcy5oYW5kbGVWYWx1ZXNbMV0gKyAnJScgOiAnYXV0byc7XG4gICAgfVxuXG4gICAgaXNWZXJ0aWNhbCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCc7XG4gICAgfVxuXG4gICAgdXBkYXRlRG9tRGF0YSgpOiB2b2lkIHtcbiAgICAgICAgbGV0IHJlY3QgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIHRoaXMuaW5pdFggPSByZWN0LmxlZnQgKyBEb21IYW5kbGVyLmdldFdpbmRvd1Njcm9sbExlZnQoKTtcbiAgICAgICAgdGhpcy5pbml0WSA9IHJlY3QudG9wICsgRG9tSGFuZGxlci5nZXRXaW5kb3dTY3JvbGxUb3AoKTtcbiAgICAgICAgdGhpcy5iYXJXaWR0aCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXS5vZmZzZXRXaWR0aDtcbiAgICAgICAgdGhpcy5iYXJIZWlnaHQgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF0ub2Zmc2V0SGVpZ2h0O1xuICAgIH1cblxuICAgIGNhbGN1bGF0ZUhhbmRsZVZhbHVlKGV2ZW50OiBFdmVudCk6IG51bWJlciB7XG4gICAgICAgIGlmICh0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpIHJldHVybiAoKChldmVudCBhcyBNb3VzZUV2ZW50KS5wYWdlWCAtICh0aGlzLmluaXRYIGFzIG51bWJlcikpICogMTAwKSAvICh0aGlzLmJhcldpZHRoIGFzIG51bWJlcik7XG4gICAgICAgIGVsc2UgcmV0dXJuICgoKHRoaXMuaW5pdFkgYXMgbnVtYmVyKSArICh0aGlzLmJhckhlaWdodCBhcyBudW1iZXIpIC0gKGV2ZW50IGFzIE1vdXNlRXZlbnQpLnBhZ2VZKSAqIDEwMCkgLyAodGhpcy5iYXJIZWlnaHQgYXMgbnVtYmVyKTtcbiAgICB9XG5cbiAgICB1cGRhdGVIYW5kbGVWYWx1ZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMucmFuZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlVmFsdWVzWzBdID0gKCgodGhpcy52YWx1ZXMgYXMgbnVtYmVyW10pWzBdIDwgdGhpcy5taW4gPyAwIDogKHRoaXMudmFsdWVzIGFzIG51bWJlcltdKVswXSAtIHRoaXMubWluKSAqIDEwMCkgLyAodGhpcy5tYXggLSB0aGlzLm1pbik7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZVZhbHVlc1sxXSA9ICgoKHRoaXMudmFsdWVzIGFzIG51bWJlcltdKVsxXSA+IHRoaXMubWF4ID8gMTAwIDogKHRoaXMudmFsdWVzIGFzIG51bWJlcltdKVsxXSAtIHRoaXMubWluKSAqIDEwMCkgLyAodGhpcy5tYXggLSB0aGlzLm1pbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoKHRoaXMudmFsdWUgYXMgbnVtYmVyKSA8IHRoaXMubWluKSB0aGlzLmhhbmRsZVZhbHVlID0gMDtcbiAgICAgICAgICAgIGVsc2UgaWYgKCh0aGlzLnZhbHVlIGFzIG51bWJlcikgPiB0aGlzLm1heCkgdGhpcy5oYW5kbGVWYWx1ZSA9IDEwMDtcbiAgICAgICAgICAgIGVsc2UgdGhpcy5oYW5kbGVWYWx1ZSA9ICgoKHRoaXMudmFsdWUgYXMgbnVtYmVyKSAtIHRoaXMubWluKSAqIDEwMCkgLyAodGhpcy5tYXggLSB0aGlzLm1pbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zdGVwKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZURpZmZBbmRPZmZzZXQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZURpZmZBbmRPZmZzZXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlmZiA9IHRoaXMuZ2V0RGlmZigpO1xuICAgICAgICB0aGlzLm9mZnNldCA9IHRoaXMuZ2V0T2Zmc2V0KCk7XG4gICAgfVxuXG4gICAgZ2V0RGlmZigpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gTWF0aC5hYnModGhpcy5oYW5kbGVWYWx1ZXNbMF0gLSB0aGlzLmhhbmRsZVZhbHVlc1sxXSk7XG4gICAgfVxuXG4gICAgZ2V0T2Zmc2V0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBNYXRoLm1pbih0aGlzLmhhbmRsZVZhbHVlc1swXSwgdGhpcy5oYW5kbGVWYWx1ZXNbMV0pO1xuICAgIH1cblxuICAgIHVwZGF0ZVZhbHVlKHZhbDogbnVtYmVyLCBldmVudD86IEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnJhbmdlKSB7XG4gICAgICAgICAgICBsZXQgdmFsdWUgPSB2YWw7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmhhbmRsZUluZGV4ID09IDApIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPCB0aGlzLm1pbikge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHRoaXMubWluO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVZhbHVlc1swXSA9IDA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA+ICh0aGlzLnZhbHVlcyBhcyBudW1iZXJbXSlbMV0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID4gdGhpcy5tYXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdGhpcy5tYXg7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVZhbHVlc1swXSA9IDEwMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnNsaWRlckhhbmRsZVN0YXJ0Py5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA+IHRoaXMubWF4KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdGhpcy5tYXg7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlVmFsdWVzWzFdID0gMTAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9mZnNldCA9IHRoaXMuaGFuZGxlVmFsdWVzWzFdO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPCB0aGlzLm1pbikge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHRoaXMubWluO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVZhbHVlc1sxXSA9IDA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA8ICh0aGlzLnZhbHVlcyBhcyBudW1iZXJbXSlbMF0pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vZmZzZXQgPSB0aGlzLmhhbmRsZVZhbHVlc1sxXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5zbGlkZXJIYW5kbGVFbmQ/Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuc3RlcCkge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlSGFuZGxlVmFsdWUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVEaWZmQW5kT2Zmc2V0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICh0aGlzLnZhbHVlcyBhcyBudW1iZXJbXSlbdGhpcy5oYW5kbGVJbmRleF0gPSB0aGlzLmdldE5vcm1hbGl6ZWRWYWx1ZSh2YWx1ZSk7XG4gICAgICAgICAgICBsZXQgbmV3VmFsdWVzID0gW3RoaXMubWluVmFsLCB0aGlzLm1heFZhbF07XG4gICAgICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UobmV3VmFsdWVzKTtcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2UuZW1pdCh7IGV2ZW50OiBldmVudCBhcyBFdmVudCwgdmFsdWVzOiB0aGlzLnZhbHVlcyBhcyBudW1iZXJbXSB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh2YWwgPCB0aGlzLm1pbikge1xuICAgICAgICAgICAgICAgIHZhbCA9IHRoaXMubWluO1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlVmFsdWUgPSAwO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh2YWwgPiB0aGlzLm1heCkge1xuICAgICAgICAgICAgICAgIHZhbCA9IHRoaXMubWF4O1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlVmFsdWUgPSAxMDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLmdldE5vcm1hbGl6ZWRWYWx1ZSh2YWwpO1xuXG4gICAgICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy52YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLm9uQ2hhbmdlLmVtaXQoeyBldmVudDogZXZlbnQgYXMgRXZlbnQsIHZhbHVlOiB0aGlzLnZhbHVlIH0pO1xuICAgICAgICAgICAgdGhpcy5zbGlkZXJIYW5kbGU/Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVwZGF0ZUhhbmRsZVZhbHVlKCk7XG4gICAgfVxuXG4gICAgZ2V0VmFsdWVGcm9tSGFuZGxlKGhhbmRsZVZhbHVlOiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gKHRoaXMubWF4IC0gdGhpcy5taW4pICogKGhhbmRsZVZhbHVlIC8gMTAwKSArIHRoaXMubWluO1xuICAgIH1cblxuICAgIGdldERlY2ltYWxzQ291bnQodmFsdWU6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIGlmICh2YWx1ZSAmJiBNYXRoLmZsb29yKHZhbHVlKSAhPT0gdmFsdWUpIHJldHVybiB2YWx1ZS50b1N0cmluZygpLnNwbGl0KCcuJylbMV0ubGVuZ3RoIHx8IDA7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIGdldE5vcm1hbGl6ZWRWYWx1ZSh2YWw6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIGxldCBkZWNpbWFsc0NvdW50ID0gdGhpcy5nZXREZWNpbWFsc0NvdW50KHRoaXMuc3RlcCBhcyBudW1iZXIpO1xuICAgICAgICBpZiAoZGVjaW1hbHNDb3VudCA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiArcGFyc2VGbG9hdCh2YWwudG9TdHJpbmcoKSkudG9GaXhlZChkZWNpbWFsc0NvdW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmZsb29yKHZhbCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy51bmJpbmREcmFnTGlzdGVuZXJzKCk7XG4gICAgfVxuXG4gICAgZ2V0IG1pblZhbCgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgubWluKCh0aGlzLnZhbHVlcyBhcyBudW1iZXJbXSlbMV0sICh0aGlzLnZhbHVlcyBhcyBudW1iZXJbXSlbMF0pO1xuICAgIH1cbiAgICBnZXQgbWF4VmFsKCkge1xuICAgICAgICByZXR1cm4gTWF0aC5tYXgoKHRoaXMudmFsdWVzIGFzIG51bWJlcltdKVsxXSwgKHRoaXMudmFsdWVzIGFzIG51bWJlcltdKVswXSk7XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtTbGlkZXJdLFxuICAgIGRlY2xhcmF0aW9uczogW1NsaWRlcl1cbn0pXG5leHBvcnQgY2xhc3MgU2xpZGVyTW9kdWxlIHt9XG4iXX0=