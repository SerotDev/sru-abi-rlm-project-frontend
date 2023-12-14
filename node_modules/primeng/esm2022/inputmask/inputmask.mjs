/*
    Port of jQuery MaskedInput by DigitalBush as a Native Angular2 Component in Typescript without jQuery
    https://github.com/digitalBush/jquery.maskedinput/

    Copyright (c) 2007-2014 Josh Bush (digitalbush.com)

    Permission is hereby granted, free of charge, to any person
    obtaining a copy of this software and associated documentation
    files (the "Software"), to deal in the Software without
    restriction, including without limitation the rights to use,
    copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the
    Software is furnished to do so, subject to the following
    conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
    OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
    HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
    WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
    FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
    OTHER DEALINGS IN THE SOFTWARE.
*/
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Inject, Input, NgModule, Output, PLATFORM_ID, ViewChild, ViewEncapsulation, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { AutoFocusModule } from 'primeng/autofocus';
import { DomHandler } from 'primeng/dom';
import { TimesIcon } from 'primeng/icons/times';
import { InputTextModule } from 'primeng/inputtext';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "primeng/inputtext";
import * as i3 from "primeng/autofocus";
export const INPUTMASK_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputMask),
    multi: true
};
/**
 * InputMask component is used to enter input in a certain format such as numeric, date, currency, email and phone.
 * @group Components
 */
export class InputMask {
    document;
    platformId;
    el;
    cd;
    /**
     * HTML5 input type.
     * @group Props
     */
    type = 'text';
    /**
     * Placeholder character in mask, default is underscore.
     * @group Props
     */
    slotChar = '_';
    /**
     * Clears the incomplete value on blur.
     * @group Props
     */
    autoClear = true;
    /**
     * When enabled, a clear icon is displayed to clear the value.
     * @group Props
     */
    showClear = false;
    /**
     * Inline style of the input field.
     * @group Props
     */
    style;
    /**
     * Identifier of the focus input to match a label defined for the component.
     * @group Props
     */
    inputId;
    /**
     * Style class of the input field.
     * @group Props
     */
    styleClass;
    /**
     * Advisory information to display on input.
     * @group Props
     */
    placeholder;
    /**
     * Size of the input field.
     * @group Props
     */
    size;
    /**
     * Maximum number of character allows in the input field.
     * @group Props
     */
    maxlength;
    /**
     * Specifies tab order of the element.
     * @group Props
     */
    tabindex;
    /**
     * Title text of the input text.
     * @group Props
     */
    title;
    /**
     * Used to define a string that labels the input element.
     * @group Props
     */
    ariaLabel;
    /**
     * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
     * @group Props
     */
    ariaLabelledBy;
    /**
     * Used to indicate that user input is required on an element before a form can be submitted.
     * @group Props
     */
    ariaRequired;
    /**
     * When present, it specifies that the element value cannot be altered.
     * @group Props
     */
    disabled;
    /**
     * When present, it specifies that an input field is read-only.
     * @group Props
     */
    readonly;
    /**
     * Defines if ngModel sets the raw unmasked value to bound value or the formatted mask value.
     * @group Props
     */
    unmask;
    /**
     * Name of the input field.
     * @group Props
     */
    name;
    /**
     * When present, it specifies that an input field must be filled out before submitting the form.
     * @group Props
     */
    required;
    /**
     * Regex pattern for alpha characters
     * @group Props
     */
    characterPattern = '[A-Za-z]';
    /**
     * When present, the input gets a focus automatically on load.
     * @group Props
     */
    autoFocus;
    /**
     * Used to define a string that autocomplete attribute the current element.
     * @group Props
     */
    autocomplete;
    /**
     * When present, it specifies that whether to clean buffer value from model.
     * @group Props
     */
    keepBuffer = false;
    /**
     * Mask pattern.
     * @group Props
     */
    get mask() {
        return this._mask;
    }
    set mask(val) {
        this._mask = val;
        this.initMask();
        this.writeValue('');
        this.onModelChange(this.value);
    }
    /**
     * Callback to invoke when the mask is completed.
     * @group Emits
     */
    onComplete = new EventEmitter();
    /**
     * Callback to invoke when the component receives focus.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onFocus = new EventEmitter();
    /**
     * Callback to invoke when the component loses focus.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onBlur = new EventEmitter();
    /**
     * Callback to invoke on input.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onInput = new EventEmitter();
    /**
     * Callback to invoke on input key press.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onKeydown = new EventEmitter();
    /**
     * Callback to invoke when input field is cleared.
     * @group Emits
     */
    onClear = new EventEmitter();
    inputViewChild;
    templates;
    clearIconTemplate;
    value;
    _mask;
    onModelChange = () => { };
    onModelTouched = () => { };
    input;
    filled;
    defs;
    tests;
    partialPosition;
    firstNonMaskPos;
    lastRequiredNonMaskPos;
    len;
    oldVal;
    buffer;
    defaultBuffer;
    focusText;
    caretTimeoutId;
    androidChrome = true;
    focused;
    constructor(document, platformId, el, cd) {
        this.document = document;
        this.platformId = platformId;
        this.el = el;
        this.cd = cd;
    }
    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            let ua = navigator.userAgent;
            this.androidChrome = /chrome/i.test(ua) && /android/i.test(ua);
        }
        this.initMask();
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'clearicon':
                    this.clearIconTemplate = item.template;
                    break;
            }
        });
    }
    initMask() {
        this.tests = [];
        this.partialPosition = this.mask.length;
        this.len = this.mask.length;
        this.firstNonMaskPos = null;
        this.defs = {
            '9': '[0-9]',
            a: this.characterPattern,
            '*': `${this.characterPattern}|[0-9]`
        };
        let maskTokens = this.mask.split('');
        for (let i = 0; i < maskTokens.length; i++) {
            let c = maskTokens[i];
            if (c == '?') {
                this.len--;
                this.partialPosition = i;
            }
            else if (this.defs[c]) {
                this.tests.push(new RegExp(this.defs[c]));
                if (this.firstNonMaskPos === null) {
                    this.firstNonMaskPos = this.tests.length - 1;
                }
                if (i < this.partialPosition) {
                    this.lastRequiredNonMaskPos = this.tests.length - 1;
                }
            }
            else {
                this.tests.push(null);
            }
        }
        this.buffer = [];
        for (let i = 0; i < maskTokens.length; i++) {
            let c = maskTokens[i];
            if (c != '?') {
                if (this.defs[c])
                    this.buffer.push(this.getPlaceholder(i));
                else
                    this.buffer.push(c);
            }
        }
        this.defaultBuffer = this.buffer.join('');
    }
    writeValue(value) {
        this.value = value;
        if (this.inputViewChild && this.inputViewChild.nativeElement) {
            if (this.value == undefined || this.value == null)
                this.inputViewChild.nativeElement.value = '';
            else
                this.inputViewChild.nativeElement.value = this.value;
            this.checkVal();
            this.focusText = this.inputViewChild.nativeElement.value;
            this.updateFilledState();
        }
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
    caret(first, last) {
        let range, begin, end;
        if (!this.inputViewChild?.nativeElement.offsetParent || this.inputViewChild.nativeElement !== this.inputViewChild.nativeElement.ownerDocument.activeElement) {
            return;
        }
        if (typeof first == 'number') {
            begin = first;
            end = typeof last === 'number' ? last : begin;
            if (this.inputViewChild.nativeElement.setSelectionRange) {
                this.inputViewChild.nativeElement.setSelectionRange(begin, end);
            }
            else if (this.inputViewChild.nativeElement['createTextRange']) {
                range = this.inputViewChild.nativeElement['createTextRange']();
                range.collapse(true);
                range.moveEnd('character', end);
                range.moveStart('character', begin);
                range.select();
            }
        }
        else {
            if (this.inputViewChild.nativeElement.setSelectionRange) {
                begin = this.inputViewChild.nativeElement.selectionStart;
                end = this.inputViewChild.nativeElement.selectionEnd;
            }
            else if (this.document && this.document['selection'].createRange) {
                range = this.document.createRange();
                begin = 0 - range.duplicate().moveStart('character', -100000);
                end = begin + range.text.length;
            }
            return { begin: begin, end: end };
        }
    }
    isCompleted() {
        let completed;
        for (let i = this.firstNonMaskPos; i <= this.lastRequiredNonMaskPos; i++) {
            if (this.tests[i] && this.buffer[i] === this.getPlaceholder(i)) {
                return false;
            }
        }
        return true;
    }
    getPlaceholder(i) {
        if (i < this.slotChar.length) {
            return this.slotChar.charAt(i);
        }
        return this.slotChar.charAt(0);
    }
    seekNext(pos) {
        while (++pos < this.len && !this.tests[pos])
            ;
        return pos;
    }
    seekPrev(pos) {
        while (--pos >= 0 && !this.tests[pos])
            ;
        return pos;
    }
    shiftL(begin, end) {
        let i, j;
        if (begin < 0) {
            return;
        }
        for (i = begin, j = this.seekNext(end); i < this.len; i++) {
            if (this.tests[i]) {
                if (j < this.len && this.tests[i].test(this.buffer[j])) {
                    this.buffer[i] = this.buffer[j];
                    this.buffer[j] = this.getPlaceholder(j);
                }
                else {
                    break;
                }
                j = this.seekNext(j);
            }
        }
        this.writeBuffer();
        this.caret(Math.max(this.firstNonMaskPos, begin));
    }
    shiftR(pos) {
        let i, c, j, t;
        for (i = pos, c = this.getPlaceholder(pos); i < this.len; i++) {
            if (this.tests[i]) {
                j = this.seekNext(i);
                t = this.buffer[i];
                this.buffer[i] = c;
                if (j < this.len && this.tests[j].test(t)) {
                    c = t;
                }
                else {
                    break;
                }
            }
        }
    }
    handleAndroidInput(e) {
        var curVal = this.inputViewChild?.nativeElement.value;
        var pos = this.caret();
        if (this.oldVal && this.oldVal.length && this.oldVal.length > curVal.length) {
            // a deletion or backspace happened
            this.checkVal(true);
            while (pos.begin > 0 && !this.tests[pos.begin - 1])
                pos.begin--;
            if (pos.begin === 0) {
                while (pos.begin < this.firstNonMaskPos && !this.tests[pos.begin])
                    pos.begin++;
            }
            setTimeout(() => {
                this.caret(pos.begin, pos.begin);
                this.updateModel(e);
                if (this.isCompleted()) {
                    this.onComplete.emit();
                }
            }, 0);
        }
        else {
            this.checkVal(true);
            while (pos.begin < this.len && !this.tests[pos.begin])
                pos.begin++;
            setTimeout(() => {
                this.caret(pos.begin, pos.begin);
                this.updateModel(e);
                if (this.isCompleted()) {
                    this.onComplete.emit();
                }
            }, 0);
        }
    }
    onInputBlur(e) {
        this.focused = false;
        this.onModelTouched();
        if (!this.keepBuffer) {
            this.checkVal();
        }
        this.updateFilledState();
        this.onBlur.emit(e);
        if (this.inputViewChild?.nativeElement.value != this.focusText || this.inputViewChild?.nativeElement.value != this.value) {
            this.updateModel(e);
            let event = this.document.createEvent('HTMLEvents');
            event.initEvent('change', true, false);
            this.inputViewChild?.nativeElement.dispatchEvent(event);
        }
    }
    onInputKeydown(e) {
        if (this.readonly) {
            return;
        }
        let k = e.which || e.keyCode, pos, begin, end;
        let iPhone;
        if (isPlatformBrowser(this.platformId)) {
            iPhone = /iphone/i.test(DomHandler.getUserAgent());
        }
        this.oldVal = this.inputViewChild?.nativeElement.value;
        this.onKeydown.emit(e);
        //backspace, delete, and escape get special treatment
        if (k === 8 || k === 46 || (iPhone && k === 127)) {
            pos = this.caret();
            begin = pos.begin;
            end = pos.end;
            if (end - begin === 0) {
                begin = k !== 46 ? this.seekPrev(begin) : (end = this.seekNext(begin - 1));
                end = k === 46 ? this.seekNext(end) : end;
            }
            this.clearBuffer(begin, end);
            if (this.keepBuffer) {
                this.shiftL(begin, end - 2);
            }
            else {
                this.shiftL(begin, end - 1);
            }
            this.updateModel(e);
            this.onInput.emit(e);
            e.preventDefault();
        }
        else if (k === 13) {
            // enter
            this.onInputBlur(e);
            this.updateModel(e);
        }
        else if (k === 27) {
            // escape
            this.inputViewChild.nativeElement.value = this.focusText;
            this.caret(0, this.checkVal());
            this.updateModel(e);
            e.preventDefault();
        }
    }
    onKeyPress(e) {
        if (this.readonly) {
            return;
        }
        var k = e.which || e.keyCode, pos = this.caret(), p, c, next, completed;
        if (e.ctrlKey || e.altKey || e.metaKey || k < 32 || (k > 34 && k < 41)) {
            //Ignore
            return;
        }
        else if (k && k !== 13) {
            if (pos.end - pos.begin !== 0) {
                this.clearBuffer(pos.begin, pos.end);
                this.shiftL(pos.begin, pos.end - 1);
            }
            p = this.seekNext(pos.begin - 1);
            if (p < this.len) {
                c = String.fromCharCode(k);
                if (this.tests[p].test(c)) {
                    this.shiftR(p);
                    this.buffer[p] = c;
                    this.writeBuffer();
                    next = this.seekNext(p);
                    if (DomHandler.isClient() && /android/i.test(DomHandler.getUserAgent())) {
                        let proxy = () => {
                            this.caret(next);
                        };
                        setTimeout(proxy, 0);
                    }
                    else {
                        this.caret(next);
                    }
                    if (pos.begin <= this.lastRequiredNonMaskPos) {
                        completed = this.isCompleted();
                    }
                    this.onInput.emit(e);
                }
            }
            e.preventDefault();
        }
        this.updateModel(e);
        this.updateFilledState();
        if (completed) {
            this.onComplete.emit();
        }
    }
    clearBuffer(start, end) {
        if (!this.keepBuffer) {
            let i;
            for (i = start; i < end && i < this.len; i++) {
                if (this.tests[i]) {
                    this.buffer[i] = this.getPlaceholder(i);
                }
            }
        }
    }
    writeBuffer() {
        this.inputViewChild.nativeElement.value = this.buffer.join('');
    }
    checkVal(allow) {
        //try to place characters where they belong
        let test = this.inputViewChild?.nativeElement.value, lastMatch = -1, i, c, pos;
        for (i = 0, pos = 0; i < this.len; i++) {
            if (this.tests[i]) {
                this.buffer[i] = this.getPlaceholder(i);
                while (pos++ < test.length) {
                    c = test.charAt(pos - 1);
                    if (this.tests[i].test(c)) {
                        if (!this.keepBuffer) {
                            this.buffer[i] = c;
                        }
                        lastMatch = i;
                        break;
                    }
                }
                if (pos > test.length) {
                    this.clearBuffer(i + 1, this.len);
                    break;
                }
            }
            else {
                if (this.buffer[i] === test.charAt(pos)) {
                    pos++;
                }
                if (i < this.partialPosition) {
                    lastMatch = i;
                }
            }
        }
        if (allow) {
            this.writeBuffer();
        }
        else if (lastMatch + 1 < this.partialPosition) {
            if (this.autoClear || this.buffer.join('') === this.defaultBuffer) {
                // Invalid value. Remove it and replace it with the
                // mask, which is the default behavior.
                if (this.inputViewChild?.nativeElement.value)
                    this.inputViewChild.nativeElement.value = '';
                this.clearBuffer(0, this.len);
            }
            else {
                // Invalid value, but we opt to show the value to the
                // user and allow them to correct their mistake.
                this.writeBuffer();
            }
        }
        else {
            this.writeBuffer();
            this.inputViewChild.nativeElement.value = this.inputViewChild?.nativeElement.value.substring(0, lastMatch + 1);
        }
        return (this.partialPosition ? i : this.firstNonMaskPos);
    }
    onInputFocus(event) {
        if (this.readonly) {
            return;
        }
        this.focused = true;
        clearTimeout(this.caretTimeoutId);
        let pos;
        this.focusText = this.inputViewChild?.nativeElement.value;
        pos = this.keepBuffer ? this.inputViewChild?.nativeElement.value.length : this.checkVal();
        this.caretTimeoutId = setTimeout(() => {
            if (this.inputViewChild?.nativeElement !== this.inputViewChild?.nativeElement.ownerDocument.activeElement) {
                return;
            }
            this.writeBuffer();
            if (pos == this.mask?.replace('?', '').length) {
                this.caret(0, pos);
            }
            else {
                this.caret(pos);
            }
        }, 10);
        this.onFocus.emit(event);
    }
    onInputChange(event) {
        if (this.androidChrome)
            this.handleAndroidInput(event);
        else
            this.handleInputChange(event);
        this.onInput.emit(event);
    }
    handleInputChange(event) {
        if (this.readonly) {
            return;
        }
        setTimeout(() => {
            var pos = this.checkVal(true);
            this.caret(pos);
            this.updateModel(event);
            if (this.isCompleted()) {
                this.onComplete.emit();
            }
        }, 0);
    }
    getUnmaskedValue() {
        let unmaskedBuffer = [];
        for (let i = 0; i < this.buffer.length; i++) {
            let c = this.buffer[i];
            if (this.tests[i] && c != this.getPlaceholder(i)) {
                unmaskedBuffer.push(c);
            }
        }
        return unmaskedBuffer.join('');
    }
    updateModel(e) {
        const updatedValue = this.unmask ? this.getUnmaskedValue() : e.target.value;
        if (updatedValue !== null || updatedValue !== undefined) {
            this.value = updatedValue;
            this.onModelChange(this.value);
        }
    }
    updateFilledState() {
        this.filled = this.inputViewChild?.nativeElement && this.inputViewChild.nativeElement.value != '';
    }
    focus() {
        this.inputViewChild?.nativeElement.focus();
    }
    clear() {
        this.inputViewChild.nativeElement.value = '';
        this.value = null;
        this.onModelChange(this.value);
        this.onClear.emit();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: InputMask, deps: [{ token: DOCUMENT }, { token: PLATFORM_ID }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.5", type: InputMask, selector: "p-inputMask", inputs: { type: "type", slotChar: "slotChar", autoClear: "autoClear", showClear: "showClear", style: "style", inputId: "inputId", styleClass: "styleClass", placeholder: "placeholder", size: "size", maxlength: "maxlength", tabindex: "tabindex", title: "title", ariaLabel: "ariaLabel", ariaLabelledBy: "ariaLabelledBy", ariaRequired: "ariaRequired", disabled: "disabled", readonly: "readonly", unmask: "unmask", name: "name", required: "required", characterPattern: "characterPattern", autoFocus: "autoFocus", autocomplete: "autocomplete", keepBuffer: "keepBuffer", mask: "mask" }, outputs: { onComplete: "onComplete", onFocus: "onFocus", onBlur: "onBlur", onInput: "onInput", onKeydown: "onKeydown", onClear: "onClear" }, host: { properties: { "class.p-inputwrapper-filled": "filled", "class.p-inputwrapper-focus": "focused", "class.p-inputmask-clearable": "showClear && !disabled" }, classAttribute: "p-element" }, providers: [INPUTMASK_VALUE_ACCESSOR], queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "inputViewChild", first: true, predicate: ["input"], descendants: true, static: true }], ngImport: i0, template: `
        <input
            #input
            pInputText
            class="p-inputmask"
            [attr.id]="inputId"
            [attr.type]="type"
            [attr.name]="name"
            [ngStyle]="style"
            [ngClass]="styleClass"
            [attr.placeholder]="placeholder"
            [attr.title]="title"
            [attr.size]="size"
            [attr.autocomplete]="autocomplete"
            [attr.maxlength]="maxlength"
            [attr.tabindex]="tabindex"
            [attr.aria-label]="ariaLabel"
            [attr.aria-labelledBy]="ariaLabelledBy"
            [attr.aria-required]="ariaRequired"
            [disabled]="disabled"
            [readonly]="readonly"
            [attr.required]="required"
            (focus)="onInputFocus($event)"
            (blur)="onInputBlur($event)"
            (keydown)="onInputKeydown($event)"
            (keypress)="onKeyPress($event)"
            pAutoFocus
            [autofocus]="autoFocus"
            (input)="onInputChange($event)"
            (paste)="handleInputChange($event)"
            [attr.data-pc-name]="'inputmask'"
            [attr.data-pc-section]="'root'"
        />
        <ng-container *ngIf="value != null && filled && showClear && !disabled">
            <TimesIcon *ngIf="!clearIconTemplate" [styleClass]="'p-inputmask-clear-icon'" (click)="clear()" [attr.data-pc-section]="'clearIcon'" />
            <span *ngIf="clearIconTemplate" class="p-inputmask-clear-icon" (click)="clear()" [attr.data-pc-section]="'clearIcon'">
                <ng-template *ngTemplateOutlet="clearIconTemplate"></ng-template>
            </span>
        </ng-container>
    `, isInline: true, styles: ["@layer primeng{.p-inputmask-clear-icon{position:absolute;top:50%;margin-top:-.5rem;cursor:pointer}.p-inputmask-clearable{position:relative}}\n"], dependencies: [{ kind: "directive", type: i0.forwardRef(() => i1.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgIf), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgStyle), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i0.forwardRef(() => i2.InputText), selector: "[pInputText]" }, { kind: "directive", type: i0.forwardRef(() => i3.AutoFocus), selector: "[pAutoFocus]", inputs: ["autofocus"] }, { kind: "component", type: i0.forwardRef(() => TimesIcon), selector: "TimesIcon" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: InputMask, decorators: [{
            type: Component,
            args: [{ selector: 'p-inputMask', template: `
        <input
            #input
            pInputText
            class="p-inputmask"
            [attr.id]="inputId"
            [attr.type]="type"
            [attr.name]="name"
            [ngStyle]="style"
            [ngClass]="styleClass"
            [attr.placeholder]="placeholder"
            [attr.title]="title"
            [attr.size]="size"
            [attr.autocomplete]="autocomplete"
            [attr.maxlength]="maxlength"
            [attr.tabindex]="tabindex"
            [attr.aria-label]="ariaLabel"
            [attr.aria-labelledBy]="ariaLabelledBy"
            [attr.aria-required]="ariaRequired"
            [disabled]="disabled"
            [readonly]="readonly"
            [attr.required]="required"
            (focus)="onInputFocus($event)"
            (blur)="onInputBlur($event)"
            (keydown)="onInputKeydown($event)"
            (keypress)="onKeyPress($event)"
            pAutoFocus
            [autofocus]="autoFocus"
            (input)="onInputChange($event)"
            (paste)="handleInputChange($event)"
            [attr.data-pc-name]="'inputmask'"
            [attr.data-pc-section]="'root'"
        />
        <ng-container *ngIf="value != null && filled && showClear && !disabled">
            <TimesIcon *ngIf="!clearIconTemplate" [styleClass]="'p-inputmask-clear-icon'" (click)="clear()" [attr.data-pc-section]="'clearIcon'" />
            <span *ngIf="clearIconTemplate" class="p-inputmask-clear-icon" (click)="clear()" [attr.data-pc-section]="'clearIcon'">
                <ng-template *ngTemplateOutlet="clearIconTemplate"></ng-template>
            </span>
        </ng-container>
    `, host: {
                        class: 'p-element',
                        '[class.p-inputwrapper-filled]': 'filled',
                        '[class.p-inputwrapper-focus]': 'focused',
                        '[class.p-inputmask-clearable]': 'showClear && !disabled'
                    }, providers: [INPUTMASK_VALUE_ACCESSOR], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, styles: ["@layer primeng{.p-inputmask-clear-icon{position:absolute;top:50%;margin-top:-.5rem;cursor:pointer}.p-inputmask-clearable{position:relative}}\n"] }]
        }], ctorParameters: () => [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }], propDecorators: { type: [{
                type: Input
            }], slotChar: [{
                type: Input
            }], autoClear: [{
                type: Input
            }], showClear: [{
                type: Input
            }], style: [{
                type: Input
            }], inputId: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], size: [{
                type: Input
            }], maxlength: [{
                type: Input
            }], tabindex: [{
                type: Input
            }], title: [{
                type: Input
            }], ariaLabel: [{
                type: Input
            }], ariaLabelledBy: [{
                type: Input
            }], ariaRequired: [{
                type: Input
            }], disabled: [{
                type: Input
            }], readonly: [{
                type: Input
            }], unmask: [{
                type: Input
            }], name: [{
                type: Input
            }], required: [{
                type: Input
            }], characterPattern: [{
                type: Input
            }], autoFocus: [{
                type: Input
            }], autocomplete: [{
                type: Input
            }], keepBuffer: [{
                type: Input
            }], mask: [{
                type: Input
            }], onComplete: [{
                type: Output
            }], onFocus: [{
                type: Output
            }], onBlur: [{
                type: Output
            }], onInput: [{
                type: Output
            }], onKeydown: [{
                type: Output
            }], onClear: [{
                type: Output
            }], inputViewChild: [{
                type: ViewChild,
                args: ['input', { static: true }]
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
export class InputMaskModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: InputMaskModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.0.5", ngImport: i0, type: InputMaskModule, declarations: [InputMask], imports: [CommonModule, InputTextModule, AutoFocusModule, TimesIcon], exports: [InputMask, SharedModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: InputMaskModule, imports: [CommonModule, InputTextModule, AutoFocusModule, TimesIcon, SharedModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: InputMaskModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, InputTextModule, AutoFocusModule, TimesIcon],
                    exports: [InputMask, SharedModule],
                    declarations: [InputMask]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXRtYXNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL2lucHV0bWFzay9pbnB1dG1hc2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBMEJFO0FBQ0YsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM1RSxPQUFPLEVBQUUsdUJBQXVCLEVBQXFCLFNBQVMsRUFBRSxlQUFlLEVBQWMsWUFBWSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFVLE1BQU0sRUFBRSxXQUFXLEVBQTBCLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDelAsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzFELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7Ozs7O0FBSXBELE1BQU0sQ0FBQyxNQUFNLHdCQUF3QixHQUFRO0lBQ3pDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxTQUFTLENBQUM7SUFDeEMsS0FBSyxFQUFFLElBQUk7Q0FDZCxDQUFDO0FBQ0Y7OztHQUdHO0FBc0RILE1BQU0sT0FBTyxTQUFTO0lBc05vQjtJQUFpRDtJQUF3QjtJQUF1QjtJQXJOdEk7OztPQUdHO0lBQ00sSUFBSSxHQUFXLE1BQU0sQ0FB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QUFoQixLQUFLO2dCQUtHLGdCQUFnQjtzQkFBeEIsS0FBSztnQkFLRyxTQUFTO3NCQUFqQixLQUFLO2dCQUtHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBS0csVUFBVTtzQkFBbEIsS0FBSztnQkFLTyxJQUFJO3NCQUFoQixLQUFLO2dCQWNJLFVBQVU7c0JBQW5CLE1BQU07Z0JBTUcsT0FBTztzQkFBaEIsTUFBTTtnQkFNRyxNQUFNO3NCQUFmLE1BQU07Z0JBTUcsT0FBTztzQkFBaEIsTUFBTTtnQkFNRyxTQUFTO3NCQUFsQixNQUFNO2dCQUtHLE9BQU87c0JBQWhCLE1BQU07Z0JBRStCLGNBQWM7c0JBQW5ELFNBQVM7dUJBQUMsT0FBTyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtnQkFFSixTQUFTO3NCQUF4QyxlQUFlO3VCQUFDLGFBQWE7O0FBeWlCbEMsTUFBTSxPQUFPLGVBQWU7dUdBQWYsZUFBZTt3R0FBZixlQUFlLGlCQXJ0QmYsU0FBUyxhQWl0QlIsWUFBWSxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsU0FBUyxhQWp0QjFELFNBQVMsRUFrdEJHLFlBQVk7d0dBR3hCLGVBQWUsWUFKZCxZQUFZLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQzlDLFlBQVk7OzJGQUd4QixlQUFlO2tCQUwzQixRQUFRO21CQUFDO29CQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLFNBQVMsQ0FBQztvQkFDcEUsT0FBTyxFQUFFLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQztvQkFDbEMsWUFBWSxFQUFFLENBQUMsU0FBUyxDQUFDO2lCQUM1QiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gICAgUG9ydCBvZiBqUXVlcnkgTWFza2VkSW5wdXQgYnkgRGlnaXRhbEJ1c2ggYXMgYSBOYXRpdmUgQW5ndWxhcjIgQ29tcG9uZW50IGluIFR5cGVzY3JpcHQgd2l0aG91dCBqUXVlcnlcbiAgICBodHRwczovL2dpdGh1Yi5jb20vZGlnaXRhbEJ1c2gvanF1ZXJ5Lm1hc2tlZGlucHV0L1xuXG4gICAgQ29weXJpZ2h0IChjKSAyMDA3LTIwMTQgSm9zaCBCdXNoIChkaWdpdGFsYnVzaC5jb20pXG5cbiAgICBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvblxuICAgIG9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uXG4gICAgZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0XG4gICAgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsXG4gICAgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAgICBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGVcbiAgICBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZ1xuICAgIGNvbmRpdGlvbnM6XG5cbiAgICBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZVxuICAgIGluY2x1ZGVkIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG4gICAgVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCxcbiAgICBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVNcbiAgICBPRiBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORFxuICAgIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUXG4gICAgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksXG4gICAgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HXG4gICAgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUlxuICAgIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cbiovXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUsIERPQ1VNRU5ULCBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgQ29udGVudENoaWxkcmVuLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEluamVjdCwgSW5wdXQsIE5nTW9kdWxlLCBPbkluaXQsIE91dHB1dCwgUExBVEZPUk1fSUQsIFF1ZXJ5TGlzdCwgVGVtcGxhdGVSZWYsIFZpZXdDaGlsZCwgVmlld0VuY2Fwc3VsYXRpb24sIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFByaW1lVGVtcGxhdGUsIFNoYXJlZE1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IEF1dG9Gb2N1c01vZHVsZSB9IGZyb20gJ3ByaW1lbmcvYXV0b2ZvY3VzJztcbmltcG9ydCB7IERvbUhhbmRsZXIgfSBmcm9tICdwcmltZW5nL2RvbSc7XG5pbXBvcnQgeyBUaW1lc0ljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL3RpbWVzJztcbmltcG9ydCB7IElucHV0VGV4dE1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvaW5wdXR0ZXh0JztcbmltcG9ydCB7IE51bGxhYmxlIH0gZnJvbSAncHJpbWVuZy90cy1oZWxwZXJzJztcbmltcG9ydCB7IENhcmV0IH0gZnJvbSAnLi9pbnB1dG1hc2suaW50ZXJmYWNlJztcblxuZXhwb3J0IGNvbnN0IElOUFVUTUFTS19WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IElucHV0TWFzayksXG4gICAgbXVsdGk6IHRydWVcbn07XG4vKipcbiAqIElucHV0TWFzayBjb21wb25lbnQgaXMgdXNlZCB0byBlbnRlciBpbnB1dCBpbiBhIGNlcnRhaW4gZm9ybWF0IHN1Y2ggYXMgbnVtZXJpYywgZGF0ZSwgY3VycmVuY3ksIGVtYWlsIGFuZCBwaG9uZS5cbiAqIEBncm91cCBDb21wb25lbnRzXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1pbnB1dE1hc2snLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgI2lucHV0XG4gICAgICAgICAgICBwSW5wdXRUZXh0XG4gICAgICAgICAgICBjbGFzcz1cInAtaW5wdXRtYXNrXCJcbiAgICAgICAgICAgIFthdHRyLmlkXT1cImlucHV0SWRcIlxuICAgICAgICAgICAgW2F0dHIudHlwZV09XCJ0eXBlXCJcbiAgICAgICAgICAgIFthdHRyLm5hbWVdPVwibmFtZVwiXG4gICAgICAgICAgICBbbmdTdHlsZV09XCJzdHlsZVwiXG4gICAgICAgICAgICBbbmdDbGFzc109XCJzdHlsZUNsYXNzXCJcbiAgICAgICAgICAgIFthdHRyLnBsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcbiAgICAgICAgICAgIFthdHRyLnRpdGxlXT1cInRpdGxlXCJcbiAgICAgICAgICAgIFthdHRyLnNpemVdPVwic2l6ZVwiXG4gICAgICAgICAgICBbYXR0ci5hdXRvY29tcGxldGVdPVwiYXV0b2NvbXBsZXRlXCJcbiAgICAgICAgICAgIFthdHRyLm1heGxlbmd0aF09XCJtYXhsZW5ndGhcIlxuICAgICAgICAgICAgW2F0dHIudGFiaW5kZXhdPVwidGFiaW5kZXhcIlxuICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJhcmlhTGFiZWxcIlxuICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbGxlZEJ5XT1cImFyaWFMYWJlbGxlZEJ5XCJcbiAgICAgICAgICAgIFthdHRyLmFyaWEtcmVxdWlyZWRdPVwiYXJpYVJlcXVpcmVkXCJcbiAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICBbcmVhZG9ubHldPVwicmVhZG9ubHlcIlxuICAgICAgICAgICAgW2F0dHIucmVxdWlyZWRdPVwicmVxdWlyZWRcIlxuICAgICAgICAgICAgKGZvY3VzKT1cIm9uSW5wdXRGb2N1cygkZXZlbnQpXCJcbiAgICAgICAgICAgIChibHVyKT1cIm9uSW5wdXRCbHVyKCRldmVudClcIlxuICAgICAgICAgICAgKGtleWRvd24pPVwib25JbnB1dEtleWRvd24oJGV2ZW50KVwiXG4gICAgICAgICAgICAoa2V5cHJlc3MpPVwib25LZXlQcmVzcygkZXZlbnQpXCJcbiAgICAgICAgICAgIHBBdXRvRm9jdXNcbiAgICAgICAgICAgIFthdXRvZm9jdXNdPVwiYXV0b0ZvY3VzXCJcbiAgICAgICAgICAgIChpbnB1dCk9XCJvbklucHV0Q2hhbmdlKCRldmVudClcIlxuICAgICAgICAgICAgKHBhc3RlKT1cImhhbmRsZUlucHV0Q2hhbmdlKCRldmVudClcIlxuICAgICAgICAgICAgW2F0dHIuZGF0YS1wYy1uYW1lXT1cIidpbnB1dG1hc2snXCJcbiAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCIncm9vdCdcIlxuICAgICAgICAvPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwidmFsdWUgIT0gbnVsbCAmJiBmaWxsZWQgJiYgc2hvd0NsZWFyICYmICFkaXNhYmxlZFwiPlxuICAgICAgICAgICAgPFRpbWVzSWNvbiAqbmdJZj1cIiFjbGVhckljb25UZW1wbGF0ZVwiIFtzdHlsZUNsYXNzXT1cIidwLWlucHV0bWFzay1jbGVhci1pY29uJ1wiIChjbGljayk9XCJjbGVhcigpXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidjbGVhckljb24nXCIgLz5cbiAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiY2xlYXJJY29uVGVtcGxhdGVcIiBjbGFzcz1cInAtaW5wdXRtYXNrLWNsZWFyLWljb25cIiAoY2xpY2spPVwiY2xlYXIoKVwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInY2xlYXJJY29uJ1wiPlxuICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cImNsZWFySWNvblRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgYCxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAncC1lbGVtZW50JyxcbiAgICAgICAgJ1tjbGFzcy5wLWlucHV0d3JhcHBlci1maWxsZWRdJzogJ2ZpbGxlZCcsXG4gICAgICAgICdbY2xhc3MucC1pbnB1dHdyYXBwZXItZm9jdXNdJzogJ2ZvY3VzZWQnLFxuICAgICAgICAnW2NsYXNzLnAtaW5wdXRtYXNrLWNsZWFyYWJsZV0nOiAnc2hvd0NsZWFyICYmICFkaXNhYmxlZCdcbiAgICB9LFxuICAgIHByb3ZpZGVyczogW0lOUFVUTUFTS19WQUxVRV9BQ0NFU1NPUl0sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBzdHlsZVVybHM6IFsnLi9pbnB1dG1hc2suY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgSW5wdXRNYXNrIGltcGxlbWVudHMgT25Jbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gICAgLyoqXG4gICAgICogSFRNTDUgaW5wdXQgdHlwZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB0eXBlOiBzdHJpbmcgPSAndGV4dCc7XG4gICAgLyoqXG4gICAgICogUGxhY2Vob2xkZXIgY2hhcmFjdGVyIGluIG1hc2ssIGRlZmF1bHQgaXMgdW5kZXJzY29yZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzbG90Q2hhcjogc3RyaW5nID0gJ18nO1xuICAgIC8qKlxuICAgICAqIENsZWFycyB0aGUgaW5jb21wbGV0ZSB2YWx1ZSBvbiBibHVyLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGF1dG9DbGVhcjogYm9vbGVhbiA9IHRydWU7XG4gICAgLyoqXG4gICAgICogV2hlbiBlbmFibGVkLCBhIGNsZWFyIGljb24gaXMgZGlzcGxheWVkIHRvIGNsZWFyIHRoZSB2YWx1ZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzaG93Q2xlYXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBJbmxpbmUgc3R5bGUgb2YgdGhlIGlucHV0IGZpZWxkLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHN0eWxlOiB7IFtrbGFzczogc3RyaW5nXTogYW55IH0gfCBudWxsIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIElkZW50aWZpZXIgb2YgdGhlIGZvY3VzIGlucHV0IHRvIG1hdGNoIGEgbGFiZWwgZGVmaW5lZCBmb3IgdGhlIGNvbXBvbmVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBpbnB1dElkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogU3R5bGUgY2xhc3Mgb2YgdGhlIGlucHV0IGZpZWxkLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBBZHZpc29yeSBpbmZvcm1hdGlvbiB0byBkaXNwbGF5IG9uIGlucHV0LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogU2l6ZSBvZiB0aGUgaW5wdXQgZmllbGQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc2l6ZTogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIE1heGltdW0gbnVtYmVyIG9mIGNoYXJhY3RlciBhbGxvd3MgaW4gdGhlIGlucHV0IGZpZWxkLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIG1heGxlbmd0aDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFNwZWNpZmllcyB0YWIgb3JkZXIgb2YgdGhlIGVsZW1lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgdGFiaW5kZXg6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBUaXRsZSB0ZXh0IG9mIHRoZSBpbnB1dCB0ZXh0LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHRpdGxlOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogVXNlZCB0byBkZWZpbmUgYSBzdHJpbmcgdGhhdCBsYWJlbHMgdGhlIGlucHV0IGVsZW1lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgYXJpYUxhYmVsOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogRXN0YWJsaXNoZXMgcmVsYXRpb25zaGlwcyBiZXR3ZWVuIHRoZSBjb21wb25lbnQgYW5kIGxhYmVsKHMpIHdoZXJlIGl0cyB2YWx1ZSBzaG91bGQgYmUgb25lIG9yIG1vcmUgZWxlbWVudCBJRHMuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgYXJpYUxhYmVsbGVkQnk6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBVc2VkIHRvIGluZGljYXRlIHRoYXQgdXNlciBpbnB1dCBpcyByZXF1aXJlZCBvbiBhbiBlbGVtZW50IGJlZm9yZSBhIGZvcm0gY2FuIGJlIHN1Ym1pdHRlZC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBhcmlhUmVxdWlyZWQ6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hlbiBwcmVzZW50LCBpdCBzcGVjaWZpZXMgdGhhdCB0aGUgZWxlbWVudCB2YWx1ZSBjYW5ub3QgYmUgYWx0ZXJlZC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBXaGVuIHByZXNlbnQsIGl0IHNwZWNpZmllcyB0aGF0IGFuIGlucHV0IGZpZWxkIGlzIHJlYWQtb25seS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSByZWFkb25seTogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIGlmIG5nTW9kZWwgc2V0cyB0aGUgcmF3IHVubWFza2VkIHZhbHVlIHRvIGJvdW5kIHZhbHVlIG9yIHRoZSBmb3JtYXR0ZWQgbWFzayB2YWx1ZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB1bm1hc2s6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogTmFtZSBvZiB0aGUgaW5wdXQgZmllbGQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgbmFtZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdoZW4gcHJlc2VudCwgaXQgc3BlY2lmaWVzIHRoYXQgYW4gaW5wdXQgZmllbGQgbXVzdCBiZSBmaWxsZWQgb3V0IGJlZm9yZSBzdWJtaXR0aW5nIHRoZSBmb3JtLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHJlcXVpcmVkOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFJlZ2V4IHBhdHRlcm4gZm9yIGFscGhhIGNoYXJhY3RlcnNcbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBjaGFyYWN0ZXJQYXR0ZXJuOiBzdHJpbmcgPSAnW0EtWmEtel0nO1xuICAgIC8qKlxuICAgICAqIFdoZW4gcHJlc2VudCwgdGhlIGlucHV0IGdldHMgYSBmb2N1cyBhdXRvbWF0aWNhbGx5IG9uIGxvYWQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgYXV0b0ZvY3VzOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFVzZWQgdG8gZGVmaW5lIGEgc3RyaW5nIHRoYXQgYXV0b2NvbXBsZXRlIGF0dHJpYnV0ZSB0aGUgY3VycmVudCBlbGVtZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGF1dG9jb21wbGV0ZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdoZW4gcHJlc2VudCwgaXQgc3BlY2lmaWVzIHRoYXQgd2hldGhlciB0byBjbGVhbiBidWZmZXIgdmFsdWUgZnJvbSBtb2RlbC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBrZWVwQnVmZmVyOiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogTWFzayBwYXR0ZXJuLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCBtYXNrKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFzaztcbiAgICB9XG4gICAgc2V0IG1hc2sodmFsOiBzdHJpbmcgfCB1bmRlZmluZWQgfCBudWxsKSB7XG4gICAgICAgIHRoaXMuX21hc2sgPSB2YWw7XG5cbiAgICAgICAgdGhpcy5pbml0TWFzaygpO1xuICAgICAgICB0aGlzLndyaXRlVmFsdWUoJycpO1xuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy52YWx1ZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIHRoZSBtYXNrIGlzIGNvbXBsZXRlZC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25Db21wbGV0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiB0aGUgY29tcG9uZW50IHJlY2VpdmVzIGZvY3VzLlxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gQnJvd3NlciBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25Gb2N1czogRXZlbnRFbWl0dGVyPEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gdGhlIGNvbXBvbmVudCBsb3NlcyBmb2N1cy5cbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIEJyb3dzZXIgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uQmx1cjogRXZlbnRFbWl0dGVyPEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIG9uIGlucHV0LlxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gQnJvd3NlciBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25JbnB1dDogRXZlbnRFbWl0dGVyPEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIG9uIGlucHV0IGtleSBwcmVzcy5cbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIEJyb3dzZXIgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uS2V5ZG93bjogRXZlbnRFbWl0dGVyPEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gaW5wdXQgZmllbGQgaXMgY2xlYXJlZC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25DbGVhcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIEBWaWV3Q2hpbGQoJ2lucHV0JywgeyBzdGF0aWM6IHRydWUgfSkgaW5wdXRWaWV3Q2hpbGQ6IE51bGxhYmxlPEVsZW1lbnRSZWY+O1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihQcmltZVRlbXBsYXRlKSB0ZW1wbGF0ZXMhOiBRdWVyeUxpc3Q8UHJpbWVUZW1wbGF0ZT47XG5cbiAgICBjbGVhckljb25UZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICB2YWx1ZTogTnVsbGFibGU8c3RyaW5nPjtcblxuICAgIF9tYXNrOiBOdWxsYWJsZTxzdHJpbmc+O1xuXG4gICAgb25Nb2RlbENoYW5nZTogRnVuY3Rpb24gPSAoKSA9PiB7fTtcblxuICAgIG9uTW9kZWxUb3VjaGVkOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuXG4gICAgaW5wdXQ6IE51bGxhYmxlPEhUTUxJbnB1dEVsZW1lbnQ+O1xuXG4gICAgZmlsbGVkOiBOdWxsYWJsZTxib29sZWFuPjtcblxuICAgIGRlZnM6IE51bGxhYmxlPHsgW2tsYXNzOiBzdHJpbmddOiBhbnkgfT47XG5cbiAgICB0ZXN0czogUmVnRXhwW10gfCBhbnk7XG5cbiAgICBwYXJ0aWFsUG9zaXRpb246IE51bGxhYmxlPG51bWJlcj47XG5cbiAgICBmaXJzdE5vbk1hc2tQb3M6IE51bGxhYmxlPG51bWJlcj47XG5cbiAgICBsYXN0UmVxdWlyZWROb25NYXNrUG9zOiBOdWxsYWJsZTxudW1iZXI+O1xuXG4gICAgbGVuOiBOdWxsYWJsZTxudW1iZXI+O1xuXG4gICAgb2xkVmFsOiBOdWxsYWJsZTxzdHJpbmc+O1xuXG4gICAgYnVmZmVyOiBzdHJpbmdbXSB8IGFueTtcblxuICAgIGRlZmF1bHRCdWZmZXI6IE51bGxhYmxlPHN0cmluZz47XG5cbiAgICBmb2N1c1RleHQ6IE51bGxhYmxlPHN0cmluZz47XG5cbiAgICBjYXJldFRpbWVvdXRJZDogYW55O1xuXG4gICAgYW5kcm9pZENocm9tZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBmb2N1c2VkOiBOdWxsYWJsZTxib29sZWFuPjtcblxuICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IERvY3VtZW50LCBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IGFueSwgcHVibGljIGVsOiBFbGVtZW50UmVmLCBwdWJsaWMgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7fVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICAgICAgICBsZXQgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50O1xuICAgICAgICAgICAgdGhpcy5hbmRyb2lkQ2hyb21lID0gL2Nocm9tZS9pLnRlc3QodWEpICYmIC9hbmRyb2lkL2kudGVzdCh1YSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmluaXRNYXNrKCk7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICB0aGlzLnRlbXBsYXRlcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKGl0ZW0uZ2V0VHlwZSgpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnY2xlYXJpY29uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhckljb25UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpbml0TWFzaygpIHtcbiAgICAgICAgdGhpcy50ZXN0cyA9IFtdO1xuICAgICAgICB0aGlzLnBhcnRpYWxQb3NpdGlvbiA9ICh0aGlzLm1hc2sgYXMgc3RyaW5nKS5sZW5ndGg7XG4gICAgICAgIHRoaXMubGVuID0gKHRoaXMubWFzayBhcyBzdHJpbmcpLmxlbmd0aDtcbiAgICAgICAgdGhpcy5maXJzdE5vbk1hc2tQb3MgPSBudWxsO1xuICAgICAgICB0aGlzLmRlZnMgPSB7XG4gICAgICAgICAgICAnOSc6ICdbMC05XScsXG4gICAgICAgICAgICBhOiB0aGlzLmNoYXJhY3RlclBhdHRlcm4sXG4gICAgICAgICAgICAnKic6IGAke3RoaXMuY2hhcmFjdGVyUGF0dGVybn18WzAtOV1gXG4gICAgICAgIH07XG5cbiAgICAgICAgbGV0IG1hc2tUb2tlbnMgPSAodGhpcy5tYXNrIGFzIHN0cmluZykuc3BsaXQoJycpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1hc2tUb2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBjID0gbWFza1Rva2Vuc1tpXTtcbiAgICAgICAgICAgIGlmIChjID09ICc/Jykge1xuICAgICAgICAgICAgICAgIHRoaXMubGVuLS07XG4gICAgICAgICAgICAgICAgdGhpcy5wYXJ0aWFsUG9zaXRpb24gPSBpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRlZnNbY10pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRlc3RzLnB1c2gobmV3IFJlZ0V4cCh0aGlzLmRlZnNbY10pKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5maXJzdE5vbk1hc2tQb3MgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maXJzdE5vbk1hc2tQb3MgPSB0aGlzLnRlc3RzLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChpIDwgdGhpcy5wYXJ0aWFsUG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXN0UmVxdWlyZWROb25NYXNrUG9zID0gdGhpcy50ZXN0cy5sZW5ndGggLSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy50ZXN0cy5wdXNoKG51bGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5idWZmZXIgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXNrVG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgYyA9IG1hc2tUb2tlbnNbaV07XG4gICAgICAgICAgICBpZiAoYyAhPSAnPycpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kZWZzW2NdKSB0aGlzLmJ1ZmZlci5wdXNoKHRoaXMuZ2V0UGxhY2Vob2xkZXIoaSkpO1xuICAgICAgICAgICAgICAgIGVsc2UgdGhpcy5idWZmZXIucHVzaChjKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRlZmF1bHRCdWZmZXIgPSB0aGlzLmJ1ZmZlci5qb2luKCcnKTtcbiAgICB9XG5cbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuXG4gICAgICAgIGlmICh0aGlzLmlucHV0Vmlld0NoaWxkICYmIHRoaXMuaW5wdXRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgaWYgKHRoaXMudmFsdWUgPT0gdW5kZWZpbmVkIHx8IHRoaXMudmFsdWUgPT0gbnVsbCkgdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnZhbHVlID0gJyc7XG4gICAgICAgICAgICBlbHNlIHRoaXMuaW5wdXRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC52YWx1ZSA9IHRoaXMudmFsdWU7XG5cbiAgICAgICAgICAgIHRoaXMuY2hlY2tWYWwoKTtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNUZXh0ID0gdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnZhbHVlO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVGaWxsZWRTdGF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQgPSBmbjtcbiAgICB9XG5cbiAgICBzZXREaXNhYmxlZFN0YXRlKHZhbDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gdmFsO1xuICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIGNhcmV0KGZpcnN0PzogbnVtYmVyLCBsYXN0PzogbnVtYmVyKTogQ2FyZXQgfCB1bmRlZmluZWQge1xuICAgICAgICBsZXQgcmFuZ2UsIGJlZ2luLCBlbmQ7XG5cbiAgICAgICAgaWYgKCF0aGlzLmlucHV0Vmlld0NoaWxkPy5uYXRpdmVFbGVtZW50Lm9mZnNldFBhcmVudCB8fCB0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQgIT09IHRoaXMuaW5wdXRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5vd25lckRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgZmlyc3QgPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIGJlZ2luID0gZmlyc3Q7XG4gICAgICAgICAgICBlbmQgPSB0eXBlb2YgbGFzdCA9PT0gJ251bWJlcicgPyBsYXN0IDogYmVnaW47XG4gICAgICAgICAgICBpZiAodGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnNldFNlbGVjdGlvblJhbmdlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnNldFNlbGVjdGlvblJhbmdlKGJlZ2luLCBlbmQpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnRbJ2NyZWF0ZVRleHRSYW5nZSddKSB7XG4gICAgICAgICAgICAgICAgcmFuZ2UgPSB0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnRbJ2NyZWF0ZVRleHRSYW5nZSddKCk7XG4gICAgICAgICAgICAgICAgcmFuZ2UuY29sbGFwc2UodHJ1ZSk7XG4gICAgICAgICAgICAgICAgcmFuZ2UubW92ZUVuZCgnY2hhcmFjdGVyJywgZW5kKTtcbiAgICAgICAgICAgICAgICByYW5nZS5tb3ZlU3RhcnQoJ2NoYXJhY3RlcicsIGJlZ2luKTtcbiAgICAgICAgICAgICAgICByYW5nZS5zZWxlY3QoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2UpIHtcbiAgICAgICAgICAgICAgICBiZWdpbiA9IHRoaXMuaW5wdXRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydDtcbiAgICAgICAgICAgICAgICBlbmQgPSB0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uRW5kO1xuICAgICAgICAgICAgfSBlbHNlIGlmICgodGhpcy5kb2N1bWVudCBhcyBhbnlbJ3NlbGVjdGlvbiddKSAmJiAodGhpcy5kb2N1bWVudCBhcyBhbnkpWydzZWxlY3Rpb24nXS5jcmVhdGVSYW5nZSkge1xuICAgICAgICAgICAgICAgIHJhbmdlID0gKHRoaXMuZG9jdW1lbnQgYXMgYW55WydzZWxlY3Rpb24nXSkuY3JlYXRlUmFuZ2UoKTtcbiAgICAgICAgICAgICAgICBiZWdpbiA9IDAgLSByYW5nZS5kdXBsaWNhdGUoKS5tb3ZlU3RhcnQoJ2NoYXJhY3RlcicsIC0xMDAwMDApO1xuICAgICAgICAgICAgICAgIGVuZCA9IGJlZ2luICsgcmFuZ2UudGV4dC5sZW5ndGg7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB7IGJlZ2luOiBiZWdpbiwgZW5kOiBlbmQgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzQ29tcGxldGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgY29tcGxldGVkOiBib29sZWFuO1xuICAgICAgICBmb3IgKGxldCBpID0gdGhpcy5maXJzdE5vbk1hc2tQb3MgYXMgbnVtYmVyOyBpIDw9ICh0aGlzLmxhc3RSZXF1aXJlZE5vbk1hc2tQb3MgYXMgbnVtYmVyKTsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy50ZXN0c1tpXSAmJiAodGhpcy5idWZmZXIgYXMgc3RyaW5nW10pW2ldID09PSB0aGlzLmdldFBsYWNlaG9sZGVyKGkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgZ2V0UGxhY2Vob2xkZXIoaTogbnVtYmVyKSB7XG4gICAgICAgIGlmIChpIDwgdGhpcy5zbG90Q2hhci5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNsb3RDaGFyLmNoYXJBdChpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zbG90Q2hhci5jaGFyQXQoMCk7XG4gICAgfVxuXG4gICAgc2Vla05leHQocG9zOiBudW1iZXIpIHtcbiAgICAgICAgd2hpbGUgKCsrcG9zIDwgKHRoaXMubGVuIGFzIG51bWJlcikgJiYgIXRoaXMudGVzdHNbcG9zXSk7XG4gICAgICAgIHJldHVybiBwb3M7XG4gICAgfVxuXG4gICAgc2Vla1ByZXYocG9zOiBudW1iZXIpIHtcbiAgICAgICAgd2hpbGUgKC0tcG9zID49IDAgJiYgIXRoaXMudGVzdHNbcG9zXSk7XG4gICAgICAgIHJldHVybiBwb3M7XG4gICAgfVxuXG4gICAgc2hpZnRMKGJlZ2luOiBudW1iZXIsIGVuZDogbnVtYmVyKSB7XG4gICAgICAgIGxldCBpLCBqO1xuXG4gICAgICAgIGlmIChiZWdpbiA8IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoaSA9IGJlZ2luLCBqID0gdGhpcy5zZWVrTmV4dChlbmQpOyBpIDwgKHRoaXMubGVuIGFzIG51bWJlcik7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMudGVzdHNbaV0pIHtcbiAgICAgICAgICAgICAgICBpZiAoaiA8ICh0aGlzLmxlbiBhcyBudW1iZXIpICYmIHRoaXMudGVzdHNbaV0udGVzdCh0aGlzLmJ1ZmZlcltqXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idWZmZXJbaV0gPSB0aGlzLmJ1ZmZlcltqXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idWZmZXJbal0gPSB0aGlzLmdldFBsYWNlaG9sZGVyKGopO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGogPSB0aGlzLnNlZWtOZXh0KGopO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMud3JpdGVCdWZmZXIoKTtcbiAgICAgICAgdGhpcy5jYXJldChNYXRoLm1heCh0aGlzLmZpcnN0Tm9uTWFza1BvcyBhcyBudW1iZXIsIGJlZ2luKSk7XG4gICAgfVxuXG4gICAgc2hpZnRSKHBvczogbnVtYmVyKSB7XG4gICAgICAgIGxldCBpLCBjLCBqLCB0O1xuXG4gICAgICAgIGZvciAoaSA9IHBvcywgYyA9IHRoaXMuZ2V0UGxhY2Vob2xkZXIocG9zKTsgaSA8ICh0aGlzLmxlbiBhcyBudW1iZXIpOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnRlc3RzW2ldKSB7XG4gICAgICAgICAgICAgICAgaiA9IHRoaXMuc2Vla05leHQoaSk7XG4gICAgICAgICAgICAgICAgdCA9IHRoaXMuYnVmZmVyW2ldO1xuICAgICAgICAgICAgICAgIHRoaXMuYnVmZmVyW2ldID0gYztcbiAgICAgICAgICAgICAgICBpZiAoaiA8ICh0aGlzLmxlbiBhcyBudW1iZXIpICYmIHRoaXMudGVzdHNbal0udGVzdCh0KSkge1xuICAgICAgICAgICAgICAgICAgICBjID0gdDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVBbmRyb2lkSW5wdXQoZTogRXZlbnQpIHtcbiAgICAgICAgdmFyIGN1clZhbCA9IHRoaXMuaW5wdXRWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnQudmFsdWU7XG4gICAgICAgIHZhciBwb3MgPSB0aGlzLmNhcmV0KCkgYXMgQ2FyZXQ7XG4gICAgICAgIGlmICh0aGlzLm9sZFZhbCAmJiB0aGlzLm9sZFZhbC5sZW5ndGggJiYgdGhpcy5vbGRWYWwubGVuZ3RoID4gY3VyVmFsLmxlbmd0aCkge1xuICAgICAgICAgICAgLy8gYSBkZWxldGlvbiBvciBiYWNrc3BhY2UgaGFwcGVuZWRcbiAgICAgICAgICAgIHRoaXMuY2hlY2tWYWwodHJ1ZSk7XG4gICAgICAgICAgICB3aGlsZSAocG9zLmJlZ2luID4gMCAmJiAhdGhpcy50ZXN0c1twb3MuYmVnaW4gLSAxXSkgcG9zLmJlZ2luLS07XG4gICAgICAgICAgICBpZiAocG9zLmJlZ2luID09PSAwKSB7XG4gICAgICAgICAgICAgICAgd2hpbGUgKHBvcy5iZWdpbiA8ICh0aGlzLmZpcnN0Tm9uTWFza1BvcyBhcyBudW1iZXIpICYmICF0aGlzLnRlc3RzW3Bvcy5iZWdpbl0pIHBvcy5iZWdpbisrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhcmV0KHBvcy5iZWdpbiwgcG9zLmJlZ2luKTtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsKGUpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzQ29tcGxldGVkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkNvbXBsZXRlLmVtaXQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tWYWwodHJ1ZSk7XG4gICAgICAgICAgICB3aGlsZSAocG9zLmJlZ2luIDwgKHRoaXMubGVuIGFzIG51bWJlcikgJiYgIXRoaXMudGVzdHNbcG9zLmJlZ2luXSkgcG9zLmJlZ2luKys7XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FyZXQocG9zLmJlZ2luLCBwb3MuYmVnaW4pO1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlTW9kZWwoZSk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNDb21wbGV0ZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uQ29tcGxldGUuZW1pdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25JbnB1dEJsdXIoZTogRXZlbnQpIHtcbiAgICAgICAgdGhpcy5mb2N1c2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQoKTtcbiAgICAgICAgaWYgKCF0aGlzLmtlZXBCdWZmZXIpIHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tWYWwoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVwZGF0ZUZpbGxlZFN0YXRlKCk7XG4gICAgICAgIHRoaXMub25CbHVyLmVtaXQoZSk7XG5cbiAgICAgICAgaWYgKHRoaXMuaW5wdXRWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnQudmFsdWUgIT0gdGhpcy5mb2N1c1RleHQgfHwgdGhpcy5pbnB1dFZpZXdDaGlsZD8ubmF0aXZlRWxlbWVudC52YWx1ZSAhPSB0aGlzLnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsKGUpO1xuICAgICAgICAgICAgbGV0IGV2ZW50ID0gdGhpcy5kb2N1bWVudC5jcmVhdGVFdmVudCgnSFRNTEV2ZW50cycpO1xuICAgICAgICAgICAgZXZlbnQuaW5pdEV2ZW50KCdjaGFuZ2UnLCB0cnVlLCBmYWxzZSk7XG4gICAgICAgICAgICB0aGlzLmlucHV0Vmlld0NoaWxkPy5uYXRpdmVFbGVtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25JbnB1dEtleWRvd24oZTogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5yZWFkb25seSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGsgPSBlLndoaWNoIHx8IGUua2V5Q29kZSxcbiAgICAgICAgICAgIHBvcyxcbiAgICAgICAgICAgIGJlZ2luLFxuICAgICAgICAgICAgZW5kO1xuICAgICAgICBsZXQgaVBob25lO1xuICAgICAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgICAgICAgaVBob25lID0gL2lwaG9uZS9pLnRlc3QoRG9tSGFuZGxlci5nZXRVc2VyQWdlbnQoKSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vbGRWYWwgPSB0aGlzLmlucHV0Vmlld0NoaWxkPy5uYXRpdmVFbGVtZW50LnZhbHVlO1xuXG4gICAgICAgIHRoaXMub25LZXlkb3duLmVtaXQoZSk7XG5cbiAgICAgICAgLy9iYWNrc3BhY2UsIGRlbGV0ZSwgYW5kIGVzY2FwZSBnZXQgc3BlY2lhbCB0cmVhdG1lbnRcbiAgICAgICAgaWYgKGsgPT09IDggfHwgayA9PT0gNDYgfHwgKGlQaG9uZSAmJiBrID09PSAxMjcpKSB7XG4gICAgICAgICAgICBwb3MgPSB0aGlzLmNhcmV0KCkgYXMgQ2FyZXQ7XG4gICAgICAgICAgICBiZWdpbiA9IHBvcy5iZWdpbjtcbiAgICAgICAgICAgIGVuZCA9IHBvcy5lbmQ7XG5cbiAgICAgICAgICAgIGlmIChlbmQgLSBiZWdpbiA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGJlZ2luID0gayAhPT0gNDYgPyB0aGlzLnNlZWtQcmV2KGJlZ2luKSA6IChlbmQgPSB0aGlzLnNlZWtOZXh0KGJlZ2luIC0gMSkpO1xuICAgICAgICAgICAgICAgIGVuZCA9IGsgPT09IDQ2ID8gdGhpcy5zZWVrTmV4dChlbmQpIDogZW5kO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmNsZWFyQnVmZmVyKGJlZ2luLCBlbmQpO1xuICAgICAgICAgICAgaWYgKHRoaXMua2VlcEJ1ZmZlcikge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hpZnRMKGJlZ2luLCBlbmQgLSAyKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaGlmdEwoYmVnaW4sIGVuZCAtIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy51cGRhdGVNb2RlbChlKTtcbiAgICAgICAgICAgIHRoaXMub25JbnB1dC5lbWl0KGUpO1xuXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0gZWxzZSBpZiAoayA9PT0gMTMpIHtcbiAgICAgICAgICAgIC8vIGVudGVyXG4gICAgICAgICAgICB0aGlzLm9uSW5wdXRCbHVyKGUpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVNb2RlbChlKTtcbiAgICAgICAgfSBlbHNlIGlmIChrID09PSAyNykge1xuICAgICAgICAgICAgLy8gZXNjYXBlXG4gICAgICAgICAgICAodGhpcy5pbnB1dFZpZXdDaGlsZCBhcyBFbGVtZW50UmVmKS5uYXRpdmVFbGVtZW50LnZhbHVlID0gdGhpcy5mb2N1c1RleHQ7XG4gICAgICAgICAgICB0aGlzLmNhcmV0KDAsIHRoaXMuY2hlY2tWYWwoKSk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsKGUpO1xuXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbktleVByZXNzKGU6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMucmVhZG9ubHkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBrID0gZS53aGljaCB8fCBlLmtleUNvZGUsXG4gICAgICAgICAgICBwb3MgPSB0aGlzLmNhcmV0KCkgYXMgQ2FyZXQsXG4gICAgICAgICAgICBwOiBudW1iZXIsXG4gICAgICAgICAgICBjOiBzdHJpbmcsXG4gICAgICAgICAgICBuZXh0OiBudW1iZXIsXG4gICAgICAgICAgICBjb21wbGV0ZWQhOiBib29sZWFuO1xuXG4gICAgICAgIGlmIChlLmN0cmxLZXkgfHwgZS5hbHRLZXkgfHwgZS5tZXRhS2V5IHx8IGsgPCAzMiB8fCAoayA+IDM0ICYmIGsgPCA0MSkpIHtcbiAgICAgICAgICAgIC8vSWdub3JlXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSBpZiAoayAmJiBrICE9PSAxMykge1xuICAgICAgICAgICAgaWYgKHBvcy5lbmQgLSBwb3MuYmVnaW4gIT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyQnVmZmVyKHBvcy5iZWdpbiwgcG9zLmVuZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zaGlmdEwocG9zLmJlZ2luLCBwb3MuZW5kIC0gMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHAgPSB0aGlzLnNlZWtOZXh0KHBvcy5iZWdpbiAtIDEpO1xuICAgICAgICAgICAgaWYgKHAgPCAodGhpcy5sZW4gYXMgbnVtYmVyKSkge1xuICAgICAgICAgICAgICAgIGMgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGspO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRlc3RzW3BdLnRlc3QoYykpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaGlmdFIocCk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idWZmZXJbcF0gPSBjO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLndyaXRlQnVmZmVyKCk7XG4gICAgICAgICAgICAgICAgICAgIG5leHQgPSB0aGlzLnNlZWtOZXh0KHApO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChEb21IYW5kbGVyLmlzQ2xpZW50KCkgJiYgL2FuZHJvaWQvaS50ZXN0KERvbUhhbmRsZXIuZ2V0VXNlckFnZW50KCkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcHJveHkgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXJldChuZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQocHJveHksIDApO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXJldChuZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChwb3MuYmVnaW4gPD0gKHRoaXMubGFzdFJlcXVpcmVkTm9uTWFza1BvcyBhcyBudW1iZXIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZWQgPSB0aGlzLmlzQ29tcGxldGVkKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uSW5wdXQuZW1pdChlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsKGUpO1xuXG4gICAgICAgIHRoaXMudXBkYXRlRmlsbGVkU3RhdGUoKTtcblxuICAgICAgICBpZiAoY29tcGxldGVkKSB7XG4gICAgICAgICAgICB0aGlzLm9uQ29tcGxldGUuZW1pdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xlYXJCdWZmZXIoc3RhcnQ6IG51bWJlciwgZW5kOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKCF0aGlzLmtlZXBCdWZmZXIpIHtcbiAgICAgICAgICAgIGxldCBpO1xuICAgICAgICAgICAgZm9yIChpID0gc3RhcnQ7IGkgPCBlbmQgJiYgaSA8ICh0aGlzLmxlbiBhcyBudW1iZXIpOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50ZXN0c1tpXSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1ZmZlcltpXSA9IHRoaXMuZ2V0UGxhY2Vob2xkZXIoaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgd3JpdGVCdWZmZXIoKSB7XG4gICAgICAgICh0aGlzLmlucHV0Vmlld0NoaWxkIGFzIEVsZW1lbnRSZWYpLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB0aGlzLmJ1ZmZlci5qb2luKCcnKTtcbiAgICB9XG5cbiAgICBjaGVja1ZhbChhbGxvdz86IGJvb2xlYW4pOiBudW1iZXIge1xuICAgICAgICAvL3RyeSB0byBwbGFjZSBjaGFyYWN0ZXJzIHdoZXJlIHRoZXkgYmVsb25nXG4gICAgICAgIGxldCB0ZXN0ID0gdGhpcy5pbnB1dFZpZXdDaGlsZD8ubmF0aXZlRWxlbWVudC52YWx1ZSxcbiAgICAgICAgICAgIGxhc3RNYXRjaCA9IC0xLFxuICAgICAgICAgICAgaSxcbiAgICAgICAgICAgIGMsXG4gICAgICAgICAgICBwb3M7XG5cbiAgICAgICAgZm9yIChpID0gMCwgcG9zID0gMDsgaSA8ICh0aGlzLmxlbiBhcyBudW1iZXIpOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnRlc3RzW2ldKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5idWZmZXJbaV0gPSB0aGlzLmdldFBsYWNlaG9sZGVyKGkpO1xuICAgICAgICAgICAgICAgIHdoaWxlIChwb3MrKyA8IHRlc3QubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGMgPSB0ZXN0LmNoYXJBdChwb3MgLSAxKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudGVzdHNbaV0udGVzdChjKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmtlZXBCdWZmZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1ZmZlcltpXSA9IGM7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0TWF0Y2ggPSBpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHBvcyA+IHRlc3QubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJCdWZmZXIoaSArIDEsIHRoaXMubGVuIGFzIG51bWJlcik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYnVmZmVyW2ldID09PSB0ZXN0LmNoYXJBdChwb3MpKSB7XG4gICAgICAgICAgICAgICAgICAgIHBvcysrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaSA8ICh0aGlzLnBhcnRpYWxQb3NpdGlvbiBhcyBudW1iZXIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxhc3RNYXRjaCA9IGk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChhbGxvdykge1xuICAgICAgICAgICAgdGhpcy53cml0ZUJ1ZmZlcigpO1xuICAgICAgICB9IGVsc2UgaWYgKGxhc3RNYXRjaCArIDEgPCAodGhpcy5wYXJ0aWFsUG9zaXRpb24gYXMgbnVtYmVyKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuYXV0b0NsZWFyIHx8IHRoaXMuYnVmZmVyLmpvaW4oJycpID09PSB0aGlzLmRlZmF1bHRCdWZmZXIpIHtcbiAgICAgICAgICAgICAgICAvLyBJbnZhbGlkIHZhbHVlLiBSZW1vdmUgaXQgYW5kIHJlcGxhY2UgaXQgd2l0aCB0aGVcbiAgICAgICAgICAgICAgICAvLyBtYXNrLCB3aGljaCBpcyB0aGUgZGVmYXVsdCBiZWhhdmlvci5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pbnB1dFZpZXdDaGlsZD8ubmF0aXZlRWxlbWVudC52YWx1ZSkgdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnZhbHVlID0gJyc7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhckJ1ZmZlcigwLCB0aGlzLmxlbiBhcyBudW1iZXIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBJbnZhbGlkIHZhbHVlLCBidXQgd2Ugb3B0IHRvIHNob3cgdGhlIHZhbHVlIHRvIHRoZVxuICAgICAgICAgICAgICAgIC8vIHVzZXIgYW5kIGFsbG93IHRoZW0gdG8gY29ycmVjdCB0aGVpciBtaXN0YWtlLlxuICAgICAgICAgICAgICAgIHRoaXMud3JpdGVCdWZmZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMud3JpdGVCdWZmZXIoKTtcbiAgICAgICAgICAgICh0aGlzLmlucHV0Vmlld0NoaWxkIGFzIEVsZW1lbnRSZWYpLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB0aGlzLmlucHV0Vmlld0NoaWxkPy5uYXRpdmVFbGVtZW50LnZhbHVlLnN1YnN0cmluZygwLCBsYXN0TWF0Y2ggKyAxKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKHRoaXMucGFydGlhbFBvc2l0aW9uID8gaSA6IHRoaXMuZmlyc3ROb25NYXNrUG9zKSBhcyBudW1iZXI7XG4gICAgfVxuXG4gICAgb25JbnB1dEZvY3VzKGV2ZW50OiBFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5yZWFkb25seSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5mb2N1c2VkID0gdHJ1ZTtcblxuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5jYXJldFRpbWVvdXRJZCk7XG4gICAgICAgIGxldCBwb3M6IG51bWJlcjtcblxuICAgICAgICB0aGlzLmZvY3VzVGV4dCA9IHRoaXMuaW5wdXRWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnQudmFsdWU7XG5cbiAgICAgICAgcG9zID0gdGhpcy5rZWVwQnVmZmVyID8gdGhpcy5pbnB1dFZpZXdDaGlsZD8ubmF0aXZlRWxlbWVudC52YWx1ZS5sZW5ndGggOiB0aGlzLmNoZWNrVmFsKCk7XG5cbiAgICAgICAgdGhpcy5jYXJldFRpbWVvdXRJZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuaW5wdXRWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnQgIT09IHRoaXMuaW5wdXRWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnQub3duZXJEb2N1bWVudC5hY3RpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy53cml0ZUJ1ZmZlcigpO1xuICAgICAgICAgICAgaWYgKHBvcyA9PSB0aGlzLm1hc2s/LnJlcGxhY2UoJz8nLCAnJykubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYXJldCgwLCBwb3MpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhcmV0KHBvcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDEwKTtcblxuICAgICAgICB0aGlzLm9uRm9jdXMuZW1pdChldmVudCk7XG4gICAgfVxuXG4gICAgb25JbnB1dENoYW5nZShldmVudDogRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuYW5kcm9pZENocm9tZSkgdGhpcy5oYW5kbGVBbmRyb2lkSW5wdXQoZXZlbnQpO1xuICAgICAgICBlbHNlIHRoaXMuaGFuZGxlSW5wdXRDaGFuZ2UoZXZlbnQpO1xuXG4gICAgICAgIHRoaXMub25JbnB1dC5lbWl0KGV2ZW50KTtcbiAgICB9XG5cbiAgICBoYW5kbGVJbnB1dENoYW5nZShldmVudDogRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMucmVhZG9ubHkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdmFyIHBvcyA9IHRoaXMuY2hlY2tWYWwodHJ1ZSk7XG4gICAgICAgICAgICB0aGlzLmNhcmV0KHBvcyk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsKGV2ZW50KTtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzQ29tcGxldGVkKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ29tcGxldGUuZW1pdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAwKTtcbiAgICB9XG5cbiAgICBnZXRVbm1hc2tlZFZhbHVlKCkge1xuICAgICAgICBsZXQgdW5tYXNrZWRCdWZmZXIgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmJ1ZmZlci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGMgPSB0aGlzLmJ1ZmZlcltpXTtcbiAgICAgICAgICAgIGlmICh0aGlzLnRlc3RzW2ldICYmIGMgIT0gdGhpcy5nZXRQbGFjZWhvbGRlcihpKSkge1xuICAgICAgICAgICAgICAgIHVubWFza2VkQnVmZmVyLnB1c2goYyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdW5tYXNrZWRCdWZmZXIuam9pbignJyk7XG4gICAgfVxuXG4gICAgdXBkYXRlTW9kZWwoZTogRXZlbnQpIHtcbiAgICAgICAgY29uc3QgdXBkYXRlZFZhbHVlID0gdGhpcy51bm1hc2sgPyB0aGlzLmdldFVubWFza2VkVmFsdWUoKSA6IChlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZTtcbiAgICAgICAgaWYgKHVwZGF0ZWRWYWx1ZSAhPT0gbnVsbCB8fCB1cGRhdGVkVmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHVwZGF0ZWRWYWx1ZTtcbiAgICAgICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSh0aGlzLnZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZUZpbGxlZFN0YXRlKCkge1xuICAgICAgICB0aGlzLmZpbGxlZCA9IHRoaXMuaW5wdXRWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnQgJiYgdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnZhbHVlICE9ICcnO1xuICAgIH1cblxuICAgIGZvY3VzKCkge1xuICAgICAgICB0aGlzLmlucHV0Vmlld0NoaWxkPy5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuXG4gICAgY2xlYXIoKSB7XG4gICAgICAgICh0aGlzLmlucHV0Vmlld0NoaWxkIGFzIEVsZW1lbnRSZWYpLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnJztcbiAgICAgICAgdGhpcy52YWx1ZSA9IG51bGw7XG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSh0aGlzLnZhbHVlKTtcbiAgICAgICAgdGhpcy5vbkNsZWFyLmVtaXQoKTtcbiAgICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgSW5wdXRUZXh0TW9kdWxlLCBBdXRvRm9jdXNNb2R1bGUsIFRpbWVzSWNvbl0sXG4gICAgZXhwb3J0czogW0lucHV0TWFzaywgU2hhcmVkTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtJbnB1dE1hc2tdXG59KVxuZXhwb3J0IGNsYXNzIElucHV0TWFza01vZHVsZSB7fVxuIl19