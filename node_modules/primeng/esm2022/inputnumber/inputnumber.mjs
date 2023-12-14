import { CommonModule, DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Inject, Input, NgModule, Output, ViewChild, ViewEncapsulation, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DomHandler } from 'primeng/dom';
import { AngleDownIcon } from 'primeng/icons/angledown';
import { AngleUpIcon } from 'primeng/icons/angleup';
import { TimesIcon } from 'primeng/icons/times';
import { InputTextModule } from 'primeng/inputtext';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "primeng/inputtext";
import * as i3 from "primeng/button";
export const INPUTNUMBER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputNumber),
    multi: true
};
/**
 * InputNumber is an input component to provide numerical input.
 * @group Components
 */
export class InputNumber {
    document;
    el;
    cd;
    injector;
    /**
     * Displays spinner buttons.
     * @group Props
     */
    showButtons = false;
    /**
     * Whether to format the value.
     * @group Props
     */
    format = true;
    /**
     * Layout of the buttons, valid values are "stacked" (default), "horizontal" and "vertical".
     * @group Props
     */
    buttonLayout = 'stacked';
    /**
     * Identifier of the focus input to match a label defined for the component.
     * @group Props
     */
    inputId;
    /**
     * Style class of the component.
     * @group Props
     */
    styleClass;
    /**
     * Inline style of the component.
     * @group Props
     */
    style;
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
     * Specifies one or more IDs in the DOM that labels the input field.
     * @group Props
     */
    ariaLabelledBy;
    /**
     * Used to define a string that labels the input element.
     * @group Props
     */
    ariaLabel;
    /**
     * Used to indicate that user input is required on an element before a form can be submitted.
     * @group Props
     */
    ariaRequired;
    /**
     * Name of the input field.
     * @group Props
     */
    name;
    /**
     * Indicates that whether the input field is required.
     * @group Props
     */
    required;
    /**
     * Used to define a string that autocomplete attribute the current element.
     * @group Props
     */
    autocomplete;
    /**
     * Mininum boundary value.
     * @group Props
     */
    min;
    /**
     * Maximum boundary value.
     * @group Props
     */
    max;
    /**
     * Style class of the increment button.
     * @group Props
     */
    incrementButtonClass;
    /**
     * Style class of the decrement button.
     * @group Props
     */
    decrementButtonClass;
    /**
     * Style class of the increment button.
     * @group Props
     */
    incrementButtonIcon;
    /**
     * Style class of the decrement button.
     * @group Props
     */
    decrementButtonIcon;
    /**
     * When present, it specifies that an input field is read-only.
     * @group Props
     */
    readonly = false;
    /**
     * Step factor to increment/decrement the value.
     * @group Props
     */
    step = 1;
    /**
     * Determines whether the input field is empty.
     * @group Props
     */
    allowEmpty = true;
    /**
     * Locale to be used in formatting.
     * @group Props
     */
    locale;
    /**
     * The locale matching algorithm to use. Possible values are "lookup" and "best fit"; the default is "best fit". See Locale Negotiation for details.
     * @group Props
     */
    localeMatcher;
    /**
     * Defines the behavior of the component, valid values are "decimal" and "currency".
     * @group Props
     */
    mode = 'decimal';
    /**
     * The currency to use in currency formatting. Possible values are the ISO 4217 currency codes, such as "USD" for the US dollar, "EUR" for the euro, or "CNY" for the Chinese RMB. There is no default value; if the style is "currency", the currency property must be provided.
     * @group Props
     */
    currency;
    /**
     * How to display the currency in currency formatting. Possible values are "symbol" to use a localized currency symbol such as €, ü"code" to use the ISO currency code, "name" to use a localized currency name such as "dollar"; the default is "symbol".
     * @group Props
     */
    currencyDisplay;
    /**
     * Whether to use grouping separators, such as thousands separators or thousand/lakh/crore separators.
     * @group Props
     */
    useGrouping = true;
    /**
     * The minimum number of fraction digits to use. Possible values are from 0 to 20; the default for plain number and percent formatting is 0; the default for currency formatting is the number of minor unit digits provided by the ISO 4217 currency code list (2 if the list doesn't provide that information).
     * @group Props
     */
    minFractionDigits;
    /**
     * The maximum number of fraction digits to use. Possible values are from 0 to 20; the default for plain number formatting is the larger of minimumFractionDigits and 3; the default for currency formatting is the larger of minimumFractionDigits and the number of minor unit digits provided by the ISO 4217 currency code list (2 if the list doesn't provide that information).
     * @group Props
     */
    maxFractionDigits;
    /**
     * Text to display before the value.
     * @group Props
     */
    prefix;
    /**
     * Text to display after the value.
     * @group Props
     */
    suffix;
    /**
     * Inline style of the input field.
     * @group Props
     */
    inputStyle;
    /**
     * Style class of the input field.
     * @group Props
     */
    inputStyleClass;
    /**
     * When enabled, a clear icon is displayed to clear the value.
     * @group Props
     */
    showClear = false;
    /**
     * When present, it specifies that the element should be disabled.
     * @group Props
     */
    get disabled() {
        return this._disabled;
    }
    set disabled(disabled) {
        if (disabled)
            this.focused = false;
        this._disabled = disabled;
        if (this.timer)
            this.clearTimer();
    }
    /**
     * Callback to invoke on input.
     * @param {InputNumberInputEvent} event - Custom input event.
     * @group Emits
     */
    onInput = new EventEmitter();
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
     * Callback to invoke on input key press.
     * @param {KeyboardEvent} event - Keyboard event.
     * @group Emits
     */
    onKeyDown = new EventEmitter();
    /**
     * Callback to invoke when clear token is clicked.
     * @group Emits
     */
    onClear = new EventEmitter();
    input;
    templates;
    clearIconTemplate;
    incrementButtonIconTemplate;
    decrementButtonIconTemplate;
    value;
    onModelChange = () => { };
    onModelTouched = () => { };
    focused;
    initialized;
    groupChar = '';
    prefixChar = '';
    suffixChar = '';
    isSpecialChar;
    timer;
    lastValue;
    _numeral;
    numberFormat;
    _decimal;
    _group;
    _minusSign;
    _currency;
    _prefix;
    _suffix;
    _index;
    _disabled;
    ngControl = null;
    constructor(document, el, cd, injector) {
        this.document = document;
        this.el = el;
        this.cd = cd;
        this.injector = injector;
    }
    ngOnChanges(simpleChange) {
        const props = ['locale', 'localeMatcher', 'mode', 'currency', 'currencyDisplay', 'useGrouping', 'minFractionDigits', 'maxFractionDigits', 'prefix', 'suffix'];
        if (props.some((p) => !!simpleChange[p])) {
            this.updateConstructParser();
        }
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'clearicon':
                    this.clearIconTemplate = item.template;
                    break;
                case 'incrementbuttonicon':
                    this.incrementButtonIconTemplate = item.template;
                    break;
                case 'decrementbuttonicon':
                    this.decrementButtonIconTemplate = item.template;
                    break;
            }
        });
    }
    ngOnInit() {
        this.ngControl = this.injector.get(NgControl, null, { optional: true });
        this.constructParser();
        this.initialized = true;
    }
    getOptions() {
        return {
            localeMatcher: this.localeMatcher,
            style: this.mode,
            currency: this.currency,
            currencyDisplay: this.currencyDisplay,
            useGrouping: this.useGrouping,
            minimumFractionDigits: this.minFractionDigits,
            maximumFractionDigits: this.maxFractionDigits
        };
    }
    constructParser() {
        this.numberFormat = new Intl.NumberFormat(this.locale, this.getOptions());
        const numerals = [...new Intl.NumberFormat(this.locale, { useGrouping: false }).format(9876543210)].reverse();
        const index = new Map(numerals.map((d, i) => [d, i]));
        this._numeral = new RegExp(`[${numerals.join('')}]`, 'g');
        this._group = this.getGroupingExpression();
        this._minusSign = this.getMinusSignExpression();
        this._currency = this.getCurrencyExpression();
        this._decimal = this.getDecimalExpression();
        this._suffix = this.getSuffixExpression();
        this._prefix = this.getPrefixExpression();
        this._index = (d) => index.get(d);
    }
    updateConstructParser() {
        if (this.initialized) {
            this.constructParser();
        }
    }
    escapeRegExp(text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    }
    getDecimalExpression() {
        const formatter = new Intl.NumberFormat(this.locale, { ...this.getOptions(), useGrouping: false });
        return new RegExp(`[${formatter
            .format(1.1)
            .replace(this._currency, '')
            .trim()
            .replace(this._numeral, '')}]`, 'g');
    }
    getGroupingExpression() {
        const formatter = new Intl.NumberFormat(this.locale, { useGrouping: true });
        this.groupChar = formatter.format(1000000).trim().replace(this._numeral, '').charAt(0);
        return new RegExp(`[${this.groupChar}]`, 'g');
    }
    getMinusSignExpression() {
        const formatter = new Intl.NumberFormat(this.locale, { useGrouping: false });
        return new RegExp(`[${formatter.format(-1).trim().replace(this._numeral, '')}]`, 'g');
    }
    getCurrencyExpression() {
        if (this.currency) {
            const formatter = new Intl.NumberFormat(this.locale, { style: 'currency', currency: this.currency, currencyDisplay: this.currencyDisplay, minimumFractionDigits: 0, maximumFractionDigits: 0 });
            return new RegExp(`[${formatter.format(1).replace(/\s/g, '').replace(this._numeral, '').replace(this._group, '')}]`, 'g');
        }
        return new RegExp(`[]`, 'g');
    }
    getPrefixExpression() {
        if (this.prefix) {
            this.prefixChar = this.prefix;
        }
        else {
            const formatter = new Intl.NumberFormat(this.locale, { style: this.mode, currency: this.currency, currencyDisplay: this.currencyDisplay });
            this.prefixChar = formatter.format(1).split('1')[0];
        }
        return new RegExp(`${this.escapeRegExp(this.prefixChar || '')}`, 'g');
    }
    getSuffixExpression() {
        if (this.suffix) {
            this.suffixChar = this.suffix;
        }
        else {
            const formatter = new Intl.NumberFormat(this.locale, { style: this.mode, currency: this.currency, currencyDisplay: this.currencyDisplay, minimumFractionDigits: 0, maximumFractionDigits: 0 });
            this.suffixChar = formatter.format(1).split('1')[1];
        }
        return new RegExp(`${this.escapeRegExp(this.suffixChar || '')}`, 'g');
    }
    formatValue(value) {
        if (value != null) {
            if (value === '-') {
                // Minus sign
                return value;
            }
            if (this.format) {
                let formatter = new Intl.NumberFormat(this.locale, this.getOptions());
                let formattedValue = formatter.format(value);
                if (this.prefix) {
                    formattedValue = this.prefix + formattedValue;
                }
                if (this.suffix) {
                    formattedValue = formattedValue + this.suffix;
                }
                return formattedValue;
            }
            return value.toString();
        }
        return '';
    }
    parseValue(text) {
        let filteredText = text
            .replace(this._suffix, '')
            .replace(this._prefix, '')
            .trim()
            .replace(/\s/g, '')
            .replace(this._currency, '')
            .replace(this._group, '')
            .replace(this._minusSign, '-')
            .replace(this._decimal, '.')
            .replace(this._numeral, this._index);
        if (filteredText) {
            if (filteredText === '-')
                // Minus sign
                return filteredText;
            let parsedValue = +filteredText;
            return isNaN(parsedValue) ? null : parsedValue;
        }
        return null;
    }
    repeat(event, interval, dir) {
        if (this.readonly) {
            return;
        }
        let i = interval || 500;
        this.clearTimer();
        this.timer = setTimeout(() => {
            this.repeat(event, 40, dir);
        }, i);
        this.spin(event, dir);
    }
    spin(event, dir) {
        let step = this.step * dir;
        let currentValue = this.parseValue(this.input?.nativeElement.value) || 0;
        let newValue = this.validateValue(currentValue + step);
        if (this.maxlength && this.maxlength < this.formatValue(newValue).length) {
            return;
        }
        this.updateInput(newValue, null, 'spin', null);
        this.updateModel(event, newValue);
        this.handleOnInput(event, currentValue, newValue);
    }
    clear() {
        this.value = null;
        this.onModelChange(this.value);
        this.onClear.emit();
    }
    onUpButtonMouseDown(event) {
        if (event.button === 2) {
            this.clearTimer();
            return;
        }
        if (!this.disabled) {
            this.input?.nativeElement.focus();
            this.repeat(event, null, 1);
            event.preventDefault();
        }
    }
    onUpButtonMouseUp() {
        if (!this.disabled) {
            this.clearTimer();
        }
    }
    onUpButtonMouseLeave() {
        if (!this.disabled) {
            this.clearTimer();
        }
    }
    onUpButtonKeyDown(event) {
        if (event.keyCode === 32 || event.keyCode === 13) {
            this.repeat(event, null, 1);
        }
    }
    onUpButtonKeyUp() {
        if (!this.disabled) {
            this.clearTimer();
        }
    }
    onDownButtonMouseDown(event) {
        if (event.button === 2) {
            this.clearTimer();
            return;
        }
        if (!this.disabled) {
            this.input?.nativeElement.focus();
            this.repeat(event, null, -1);
            event.preventDefault();
        }
    }
    onDownButtonMouseUp() {
        if (!this.disabled) {
            this.clearTimer();
        }
    }
    onDownButtonMouseLeave() {
        if (!this.disabled) {
            this.clearTimer();
        }
    }
    onDownButtonKeyUp() {
        if (!this.disabled) {
            this.clearTimer();
        }
    }
    onDownButtonKeyDown(event) {
        if (event.keyCode === 32 || event.keyCode === 13) {
            this.repeat(event, null, -1);
        }
    }
    onUserInput(event) {
        if (this.readonly) {
            return;
        }
        if (this.isSpecialChar) {
            event.target.value = this.lastValue;
        }
        this.isSpecialChar = false;
    }
    onInputKeyDown(event) {
        if (this.readonly) {
            return;
        }
        this.lastValue = event.target.value;
        if (event.shiftKey || event.altKey) {
            this.isSpecialChar = true;
            return;
        }
        let selectionStart = event.target.selectionStart;
        let selectionEnd = event.target.selectionEnd;
        let inputValue = event.target.value;
        let newValueStr = null;
        if (event.altKey) {
            event.preventDefault();
        }
        switch (event.code) {
            case 'ArrowUp':
                this.spin(event, 1);
                event.preventDefault();
                break;
            case 'ArrowDown':
                this.spin(event, -1);
                event.preventDefault();
                break;
            case 'ArrowLeft':
                if (!this.isNumeralChar(inputValue.charAt(selectionStart - 1))) {
                    event.preventDefault();
                }
                break;
            case 'ArrowRight':
                if (!this.isNumeralChar(inputValue.charAt(selectionStart))) {
                    event.preventDefault();
                }
                break;
            case 'Tab':
            case 'Enter':
                newValueStr = this.validateValue(this.parseValue(this.input.nativeElement.value));
                this.input.nativeElement.value = this.formatValue(newValueStr);
                this.input.nativeElement.setAttribute('aria-valuenow', newValueStr);
                this.updateModel(event, newValueStr);
                break;
            case 'Backspace': {
                event.preventDefault();
                if (selectionStart === selectionEnd) {
                    const deleteChar = inputValue.charAt(selectionStart - 1);
                    const { decimalCharIndex, decimalCharIndexWithoutPrefix } = this.getDecimalCharIndexes(inputValue);
                    if (this.isNumeralChar(deleteChar)) {
                        const decimalLength = this.getDecimalLength(inputValue);
                        if (this._group.test(deleteChar)) {
                            this._group.lastIndex = 0;
                            newValueStr = inputValue.slice(0, selectionStart - 2) + inputValue.slice(selectionStart - 1);
                        }
                        else if (this._decimal.test(deleteChar)) {
                            this._decimal.lastIndex = 0;
                            if (decimalLength) {
                                this.input?.nativeElement.setSelectionRange(selectionStart - 1, selectionStart - 1);
                            }
                            else {
                                newValueStr = inputValue.slice(0, selectionStart - 1) + inputValue.slice(selectionStart);
                            }
                        }
                        else if (decimalCharIndex > 0 && selectionStart > decimalCharIndex) {
                            const insertedText = this.isDecimalMode() && (this.minFractionDigits || 0) < decimalLength ? '' : '0';
                            newValueStr = inputValue.slice(0, selectionStart - 1) + insertedText + inputValue.slice(selectionStart);
                        }
                        else if (decimalCharIndexWithoutPrefix === 1) {
                            newValueStr = inputValue.slice(0, selectionStart - 1) + '0' + inputValue.slice(selectionStart);
                            newValueStr = this.parseValue(newValueStr) > 0 ? newValueStr : '';
                        }
                        else {
                            newValueStr = inputValue.slice(0, selectionStart - 1) + inputValue.slice(selectionStart);
                        }
                    }
                    this.updateValue(event, newValueStr, null, 'delete-single');
                }
                else {
                    newValueStr = this.deleteRange(inputValue, selectionStart, selectionEnd);
                    this.updateValue(event, newValueStr, null, 'delete-range');
                }
                break;
            }
            case 'Delete':
                event.preventDefault();
                if (selectionStart === selectionEnd) {
                    const deleteChar = inputValue.charAt(selectionStart);
                    const { decimalCharIndex, decimalCharIndexWithoutPrefix } = this.getDecimalCharIndexes(inputValue);
                    if (this.isNumeralChar(deleteChar)) {
                        const decimalLength = this.getDecimalLength(inputValue);
                        if (this._group.test(deleteChar)) {
                            this._group.lastIndex = 0;
                            newValueStr = inputValue.slice(0, selectionStart) + inputValue.slice(selectionStart + 2);
                        }
                        else if (this._decimal.test(deleteChar)) {
                            this._decimal.lastIndex = 0;
                            if (decimalLength) {
                                this.input?.nativeElement.setSelectionRange(selectionStart + 1, selectionStart + 1);
                            }
                            else {
                                newValueStr = inputValue.slice(0, selectionStart) + inputValue.slice(selectionStart + 1);
                            }
                        }
                        else if (decimalCharIndex > 0 && selectionStart > decimalCharIndex) {
                            const insertedText = this.isDecimalMode() && (this.minFractionDigits || 0) < decimalLength ? '' : '0';
                            newValueStr = inputValue.slice(0, selectionStart) + insertedText + inputValue.slice(selectionStart + 1);
                        }
                        else if (decimalCharIndexWithoutPrefix === 1) {
                            newValueStr = inputValue.slice(0, selectionStart) + '0' + inputValue.slice(selectionStart + 1);
                            newValueStr = this.parseValue(newValueStr) > 0 ? newValueStr : '';
                        }
                        else {
                            newValueStr = inputValue.slice(0, selectionStart) + inputValue.slice(selectionStart + 1);
                        }
                    }
                    this.updateValue(event, newValueStr, null, 'delete-back-single');
                }
                else {
                    newValueStr = this.deleteRange(inputValue, selectionStart, selectionEnd);
                    this.updateValue(event, newValueStr, null, 'delete-range');
                }
                break;
            case 'Home':
                if (this.min) {
                    this.updateModel(event, this.min);
                    event.preventDefault();
                }
                break;
            case 'End':
                if (this.max) {
                    this.updateModel(event, this.max);
                    event.preventDefault();
                }
                break;
            default:
                break;
        }
        this.onKeyDown.emit(event);
    }
    onInputKeyPress(event) {
        if (this.readonly) {
            return;
        }
        let code = event.which || event.keyCode;
        let char = String.fromCharCode(code);
        const isDecimalSign = this.isDecimalSign(char);
        const isMinusSign = this.isMinusSign(char);
        if (code != 13) {
            event.preventDefault();
        }
        const newValue = this.parseValue(this.input.nativeElement.value + char);
        const newValueStr = newValue != null ? newValue.toString() : '';
        if (this.maxlength && newValueStr.length > this.maxlength) {
            return;
        }
        if ((48 <= code && code <= 57) || isMinusSign || isDecimalSign) {
            this.insert(event, char, { isDecimalSign, isMinusSign });
        }
    }
    onPaste(event) {
        if (!this.disabled && !this.readonly) {
            event.preventDefault();
            let data = (event.clipboardData || this.document.defaultView['clipboardData']).getData('Text');
            if (data) {
                if (this.maxlength) {
                    data = data.toString().substring(0, this.maxlength);
                }
                let filteredData = this.parseValue(data);
                if (filteredData != null) {
                    this.insert(event, filteredData.toString());
                }
            }
        }
    }
    allowMinusSign() {
        return this.min == null || this.min < 0;
    }
    isMinusSign(char) {
        if (this._minusSign.test(char) || char === '-') {
            this._minusSign.lastIndex = 0;
            return true;
        }
        return false;
    }
    isDecimalSign(char) {
        if (this._decimal.test(char)) {
            this._decimal.lastIndex = 0;
            return true;
        }
        return false;
    }
    isDecimalMode() {
        return this.mode === 'decimal';
    }
    getDecimalCharIndexes(val) {
        let decimalCharIndex = val.search(this._decimal);
        this._decimal.lastIndex = 0;
        const filteredVal = val
            .replace(this._prefix, '')
            .trim()
            .replace(/\s/g, '')
            .replace(this._currency, '');
        const decimalCharIndexWithoutPrefix = filteredVal.search(this._decimal);
        this._decimal.lastIndex = 0;
        return { decimalCharIndex, decimalCharIndexWithoutPrefix };
    }
    getCharIndexes(val) {
        const decimalCharIndex = val.search(this._decimal);
        this._decimal.lastIndex = 0;
        const minusCharIndex = val.search(this._minusSign);
        this._minusSign.lastIndex = 0;
        const suffixCharIndex = val.search(this._suffix);
        this._suffix.lastIndex = 0;
        const currencyCharIndex = val.search(this._currency);
        this._currency.lastIndex = 0;
        return { decimalCharIndex, minusCharIndex, suffixCharIndex, currencyCharIndex };
    }
    insert(event, text, sign = { isDecimalSign: false, isMinusSign: false }) {
        const minusCharIndexOnText = text.search(this._minusSign);
        this._minusSign.lastIndex = 0;
        if (!this.allowMinusSign() && minusCharIndexOnText !== -1) {
            return;
        }
        let selectionStart = this.input?.nativeElement.selectionStart;
        let selectionEnd = this.input?.nativeElement.selectionEnd;
        let inputValue = this.input?.nativeElement.value.trim();
        const { decimalCharIndex, minusCharIndex, suffixCharIndex, currencyCharIndex } = this.getCharIndexes(inputValue);
        let newValueStr;
        if (sign.isMinusSign) {
            if (selectionStart === 0) {
                newValueStr = inputValue;
                if (minusCharIndex === -1 || selectionEnd !== 0) {
                    newValueStr = this.insertText(inputValue, text, 0, selectionEnd);
                }
                this.updateValue(event, newValueStr, text, 'insert');
            }
        }
        else if (sign.isDecimalSign) {
            if (decimalCharIndex > 0 && selectionStart === decimalCharIndex) {
                this.updateValue(event, inputValue, text, 'insert');
            }
            else if (decimalCharIndex > selectionStart && decimalCharIndex < selectionEnd) {
                newValueStr = this.insertText(inputValue, text, selectionStart, selectionEnd);
                this.updateValue(event, newValueStr, text, 'insert');
            }
            else if (decimalCharIndex === -1 && this.maxFractionDigits) {
                newValueStr = this.insertText(inputValue, text, selectionStart, selectionEnd);
                this.updateValue(event, newValueStr, text, 'insert');
            }
        }
        else {
            const maxFractionDigits = this.numberFormat.resolvedOptions().maximumFractionDigits;
            const operation = selectionStart !== selectionEnd ? 'range-insert' : 'insert';
            if (decimalCharIndex > 0 && selectionStart > decimalCharIndex) {
                if (selectionStart + text.length - (decimalCharIndex + 1) <= maxFractionDigits) {
                    const charIndex = currencyCharIndex >= selectionStart ? currencyCharIndex - 1 : suffixCharIndex >= selectionStart ? suffixCharIndex : inputValue.length;
                    newValueStr = inputValue.slice(0, selectionStart) + text + inputValue.slice(selectionStart + text.length, charIndex) + inputValue.slice(charIndex);
                    this.updateValue(event, newValueStr, text, operation);
                }
            }
            else {
                newValueStr = this.insertText(inputValue, text, selectionStart, selectionEnd);
                this.updateValue(event, newValueStr, text, operation);
            }
        }
    }
    insertText(value, text, start, end) {
        let textSplit = text === '.' ? text : text.split('.');
        if (textSplit.length === 2) {
            const decimalCharIndex = value.slice(start, end).search(this._decimal);
            this._decimal.lastIndex = 0;
            return decimalCharIndex > 0 ? value.slice(0, start) + this.formatValue(text) + value.slice(end) : value || this.formatValue(text);
        }
        else if (end - start === value.length) {
            return this.formatValue(text);
        }
        else if (start === 0) {
            return text + value.slice(end);
        }
        else if (end === value.length) {
            return value.slice(0, start) + text;
        }
        else {
            return value.slice(0, start) + text + value.slice(end);
        }
    }
    deleteRange(value, start, end) {
        let newValueStr;
        if (end - start === value.length)
            newValueStr = '';
        else if (start === 0)
            newValueStr = value.slice(end);
        else if (end === value.length)
            newValueStr = value.slice(0, start);
        else
            newValueStr = value.slice(0, start) + value.slice(end);
        return newValueStr;
    }
    initCursor() {
        let selectionStart = this.input?.nativeElement.selectionStart;
        let inputValue = this.input?.nativeElement.value;
        let valueLength = inputValue.length;
        let index = null;
        // remove prefix
        let prefixLength = (this.prefixChar || '').length;
        inputValue = inputValue.replace(this._prefix, '');
        selectionStart = selectionStart - prefixLength;
        let char = inputValue.charAt(selectionStart);
        if (this.isNumeralChar(char)) {
            return selectionStart + prefixLength;
        }
        //left
        let i = selectionStart - 1;
        while (i >= 0) {
            char = inputValue.charAt(i);
            if (this.isNumeralChar(char)) {
                index = i + prefixLength;
                break;
            }
            else {
                i--;
            }
        }
        if (index !== null) {
            this.input?.nativeElement.setSelectionRange(index + 1, index + 1);
        }
        else {
            i = selectionStart;
            while (i < valueLength) {
                char = inputValue.charAt(i);
                if (this.isNumeralChar(char)) {
                    index = i + prefixLength;
                    break;
                }
                else {
                    i++;
                }
            }
            if (index !== null) {
                this.input?.nativeElement.setSelectionRange(index, index);
            }
        }
        return index || 0;
    }
    onInputClick() {
        const currentValue = this.input?.nativeElement.value;
        if (!this.readonly && currentValue !== DomHandler.getSelection()) {
            this.initCursor();
        }
    }
    isNumeralChar(char) {
        if (char.length === 1 && (this._numeral.test(char) || this._decimal.test(char) || this._group.test(char) || this._minusSign.test(char))) {
            this.resetRegex();
            return true;
        }
        return false;
    }
    resetRegex() {
        this._numeral.lastIndex = 0;
        this._decimal.lastIndex = 0;
        this._group.lastIndex = 0;
        this._minusSign.lastIndex = 0;
    }
    updateValue(event, valueStr, insertedValueStr, operation) {
        let currentValue = this.input?.nativeElement.value;
        let newValue = null;
        if (valueStr != null) {
            newValue = this.parseValue(valueStr);
            newValue = !newValue && !this.allowEmpty ? 0 : newValue;
            this.updateInput(newValue, insertedValueStr, operation, valueStr);
            this.handleOnInput(event, currentValue, newValue);
        }
    }
    handleOnInput(event, currentValue, newValue) {
        if (this.isValueChanged(currentValue, newValue)) {
            this.input.nativeElement.value = this.formatValue(newValue);
            this.input?.nativeElement.setAttribute('aria-valuenow', newValue);
            this.updateModel(event, newValue);
            this.onInput.emit({ originalEvent: event, value: newValue, formattedValue: currentValue });
        }
    }
    isValueChanged(currentValue, newValue) {
        if (newValue === null && currentValue !== null) {
            return true;
        }
        if (newValue != null) {
            let parsedCurrentValue = typeof currentValue === 'string' ? this.parseValue(currentValue) : currentValue;
            return newValue !== parsedCurrentValue;
        }
        return false;
    }
    validateValue(value) {
        if (value === '-' || value == null) {
            return null;
        }
        if (this.min != null && value < this.min) {
            return this.min;
        }
        if (this.max != null && value > this.max) {
            return this.max;
        }
        return value;
    }
    updateInput(value, insertedValueStr, operation, valueStr) {
        insertedValueStr = insertedValueStr || '';
        let inputValue = this.input?.nativeElement.value;
        let newValue = this.formatValue(value);
        let currentLength = inputValue.length;
        if (newValue !== valueStr) {
            newValue = this.concatValues(newValue, valueStr);
        }
        if (currentLength === 0) {
            this.input.nativeElement.value = newValue;
            this.input.nativeElement.setSelectionRange(0, 0);
            const index = this.initCursor();
            const selectionEnd = index + insertedValueStr.length;
            this.input.nativeElement.setSelectionRange(selectionEnd, selectionEnd);
        }
        else {
            let selectionStart = this.input.nativeElement.selectionStart;
            let selectionEnd = this.input.nativeElement.selectionEnd;
            if (this.maxlength && newValue.length > this.maxlength) {
                newValue = newValue.slice(0, this.maxlength);
                selectionStart = Math.min(selectionStart, this.maxlength);
                selectionEnd = Math.min(selectionEnd, this.maxlength);
            }
            if (this.maxlength && this.maxlength < newValue.length) {
                return;
            }
            this.input.nativeElement.value = newValue;
            let newLength = newValue.length;
            if (operation === 'range-insert') {
                const startValue = this.parseValue((inputValue || '').slice(0, selectionStart));
                const startValueStr = startValue !== null ? startValue.toString() : '';
                const startExpr = startValueStr.split('').join(`(${this.groupChar})?`);
                const sRegex = new RegExp(startExpr, 'g');
                sRegex.test(newValue);
                const tExpr = insertedValueStr.split('').join(`(${this.groupChar})?`);
                const tRegex = new RegExp(tExpr, 'g');
                tRegex.test(newValue.slice(sRegex.lastIndex));
                selectionEnd = sRegex.lastIndex + tRegex.lastIndex;
                this.input.nativeElement.setSelectionRange(selectionEnd, selectionEnd);
            }
            else if (newLength === currentLength) {
                if (operation === 'insert' || operation === 'delete-back-single')
                    this.input.nativeElement.setSelectionRange(selectionEnd + 1, selectionEnd + 1);
                else if (operation === 'delete-single')
                    this.input.nativeElement.setSelectionRange(selectionEnd - 1, selectionEnd - 1);
                else if (operation === 'delete-range' || operation === 'spin')
                    this.input.nativeElement.setSelectionRange(selectionEnd, selectionEnd);
            }
            else if (operation === 'delete-back-single') {
                let prevChar = inputValue.charAt(selectionEnd - 1);
                let nextChar = inputValue.charAt(selectionEnd);
                let diff = currentLength - newLength;
                let isGroupChar = this._group.test(nextChar);
                if (isGroupChar && diff === 1) {
                    selectionEnd += 1;
                }
                else if (!isGroupChar && this.isNumeralChar(prevChar)) {
                    selectionEnd += -1 * diff + 1;
                }
                this._group.lastIndex = 0;
                this.input.nativeElement.setSelectionRange(selectionEnd, selectionEnd);
            }
            else if (inputValue === '-' && operation === 'insert') {
                this.input.nativeElement.setSelectionRange(0, 0);
                const index = this.initCursor();
                const selectionEnd = index + insertedValueStr.length + 1;
                this.input.nativeElement.setSelectionRange(selectionEnd, selectionEnd);
            }
            else {
                selectionEnd = selectionEnd + (newLength - currentLength);
                this.input.nativeElement.setSelectionRange(selectionEnd, selectionEnd);
            }
        }
        this.input.nativeElement.setAttribute('aria-valuenow', value);
    }
    concatValues(val1, val2) {
        if (val1 && val2) {
            let decimalCharIndex = val2.search(this._decimal);
            this._decimal.lastIndex = 0;
            if (this.suffixChar) {
                return val1.replace(this.suffixChar, '').split(this._decimal)[0] + val2.replace(this.suffixChar, '').slice(decimalCharIndex) + this.suffixChar;
            }
            else {
                return decimalCharIndex !== -1 ? val1.split(this._decimal)[0] + val2.slice(decimalCharIndex) : val1;
            }
        }
        return val1;
    }
    getDecimalLength(value) {
        if (value) {
            const valueSplit = value.split(this._decimal);
            if (valueSplit.length === 2) {
                return valueSplit[1]
                    .replace(this._suffix, '')
                    .trim()
                    .replace(/\s/g, '')
                    .replace(this._currency, '').length;
            }
        }
        return 0;
    }
    onInputFocus(event) {
        this.focused = true;
        this.onFocus.emit(event);
    }
    onInputBlur(event) {
        this.focused = false;
        let newValue = this.validateValue(this.parseValue(this.input.nativeElement.value));
        this.onBlur.emit(event);
        this.input.nativeElement.value = this.formatValue(newValue);
        this.input.nativeElement.setAttribute('aria-valuenow', newValue);
        this.updateModel(event, newValue);
    }
    formattedValue() {
        const val = !this.value && !this.allowEmpty ? 0 : this.value;
        return this.formatValue(val);
    }
    updateModel(event, value) {
        const isBlurUpdateOnMode = this.ngControl?.control?.updateOn === 'blur';
        if (this.value !== value) {
            this.value = value;
            if (!(isBlurUpdateOnMode && this.focused)) {
                this.onModelChange(value);
            }
        }
        else if (isBlurUpdateOnMode) {
            this.onModelChange(value);
        }
        this.onModelTouched();
    }
    writeValue(value) {
        this.value = value;
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
    get filled() {
        return this.value != null && this.value.toString().length > 0;
    }
    clearTimer() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }
    getFormatter() {
        return this.numberFormat;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: InputNumber, deps: [{ token: DOCUMENT }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.5", type: InputNumber, selector: "p-inputNumber", inputs: { showButtons: "showButtons", format: "format", buttonLayout: "buttonLayout", inputId: "inputId", styleClass: "styleClass", style: "style", placeholder: "placeholder", size: "size", maxlength: "maxlength", tabindex: "tabindex", title: "title", ariaLabelledBy: "ariaLabelledBy", ariaLabel: "ariaLabel", ariaRequired: "ariaRequired", name: "name", required: "required", autocomplete: "autocomplete", min: "min", max: "max", incrementButtonClass: "incrementButtonClass", decrementButtonClass: "decrementButtonClass", incrementButtonIcon: "incrementButtonIcon", decrementButtonIcon: "decrementButtonIcon", readonly: "readonly", step: "step", allowEmpty: "allowEmpty", locale: "locale", localeMatcher: "localeMatcher", mode: "mode", currency: "currency", currencyDisplay: "currencyDisplay", useGrouping: "useGrouping", minFractionDigits: "minFractionDigits", maxFractionDigits: "maxFractionDigits", prefix: "prefix", suffix: "suffix", inputStyle: "inputStyle", inputStyleClass: "inputStyleClass", showClear: "showClear", disabled: "disabled" }, outputs: { onInput: "onInput", onFocus: "onFocus", onBlur: "onBlur", onKeyDown: "onKeyDown", onClear: "onClear" }, host: { properties: { "class.p-inputwrapper-filled": "filled", "class.p-inputwrapper-focus": "focused", "class.p-inputnumber-clearable": "showClear && buttonLayout != \"vertical\"" }, classAttribute: "p-element p-inputwrapper" }, providers: [INPUTNUMBER_VALUE_ACCESSOR], queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "input", first: true, predicate: ["input"], descendants: true }], usesOnChanges: true, ngImport: i0, template: `
        <span
            [ngClass]="{
                'p-inputnumber p-component': true,
                'p-inputnumber-buttons-stacked': this.showButtons && this.buttonLayout === 'stacked',
                'p-inputnumber-buttons-horizontal': this.showButtons && this.buttonLayout === 'horizontal',
                'p-inputnumber-buttons-vertical': this.showButtons && this.buttonLayout === 'vertical'
            }"
            [ngStyle]="style"
            [class]="styleClass"
            [attr.data-pc-name]="'inputnumber'"
            [attr.data-pc-section]="'root'"
        >
            <input
                pInputText
                #input
                [attr.id]="inputId"
                role="spinbutton"
                [ngClass]="'p-inputnumber-input'"
                [ngStyle]="inputStyle"
                [class]="inputStyleClass"
                [value]="formattedValue()"
                [attr.aria-valuemin]="min"
                [attr.aria-valuemax]="max"
                [attr.aria-valuenow]="value"
                [disabled]="disabled"
                [readonly]="readonly"
                [attr.placeholder]="placeholder"
                [attr.aria-label]="ariaLabel"
                [attr.aria-labelledby]="ariaLabelledBy"
                [attr.title]="title"
                [attr.size]="size"
                [attr.name]="name"
                [attr.autocomplete]="autocomplete"
                [attr.maxlength]="maxlength"
                [attr.tabindex]="tabindex"
                [attr.aria-required]="ariaRequired"
                [attr.required]="required"
                [attr.min]="min"
                [attr.max]="max"
                inputmode="decimal"
                (input)="onUserInput($event)"
                (keydown)="onInputKeyDown($event)"
                (keypress)="onInputKeyPress($event)"
                (paste)="onPaste($event)"
                (click)="onInputClick()"
                (focus)="onInputFocus($event)"
                (blur)="onInputBlur($event)"
                [attr.data-pc-section]="'input'"
            />
            <ng-container *ngIf="buttonLayout != 'vertical' && showClear && value">
                <TimesIcon *ngIf="!clearIconTemplate" [ngClass]="'p-inputnumber-clear-icon'" (click)="clear()" [attr.data-pc-section]="'clearIcon'" />
                <span *ngIf="clearIconTemplate" (click)="clear()" class="p-inputnumber-clear-icon" [attr.data-pc-section]="'clearIcon'">
                    <ng-template *ngTemplateOutlet="clearIconTemplate"></ng-template>
                </span>
            </ng-container>
            <span class="p-inputnumber-button-group" *ngIf="showButtons && buttonLayout === 'stacked'" [attr.data-pc-section]="'buttonGroup'">
                <button
                    type="button"
                    pButton
                    [ngClass]="{ 'p-inputnumber-button p-inputnumber-button-up': true }"
                    class="p-button-icon-only"
                    [class]="incrementButtonClass"
                    [disabled]="disabled"
                    tabindex="-1"
                    (mousedown)="onUpButtonMouseDown($event)"
                    (mouseup)="onUpButtonMouseUp()"
                    (mouseleave)="onUpButtonMouseLeave()"
                    (keydown)="onUpButtonKeyDown($event)"
                    (keyup)="onUpButtonKeyUp()"
                    [attr.aria-hidden]="true"
                    [attr.data-pc-section]="'incrementbutton'"
                >
                    <span *ngIf="incrementButtonIcon" [ngClass]="incrementButtonIcon" [attr.data-pc-section]="'incrementbuttonicon'"></span>
                    <ng-container *ngIf="!incrementButtonIcon">
                        <AngleUpIcon *ngIf="!incrementButtonIconTemplate" [attr.data-pc-section]="'incrementbuttonicon'" />
                        <ng-template *ngTemplateOutlet="incrementButtonIconTemplate"></ng-template>
                    </ng-container>
                </button>
                <button
                    type="button"
                    pButton
                    [ngClass]="{ 'p-inputnumber-button p-inputnumber-button-down': true }"
                    class="p-button-icon-only"
                    [class]="decrementButtonClass"
                    [disabled]="disabled"
                    tabindex="-1"
                    [attr.aria-hidden]="true"
                    (mousedown)="onDownButtonMouseDown($event)"
                    (mouseup)="onDownButtonMouseUp()"
                    (mouseleave)="onDownButtonMouseLeave()"
                    (keydown)="onDownButtonKeyDown($event)"
                    (keyup)="onDownButtonKeyUp()"
                    [attr.data-pc-section]="decrementbutton"
                >
                    <span *ngIf="decrementButtonIcon" [ngClass]="decrementButtonIcon" [attr.data-pc-section]="'decrementbuttonicon'"></span>
                    <ng-container *ngIf="!decrementButtonIcon">
                        <AngleDownIcon *ngIf="!decrementButtonIconTemplate" [attr.data-pc-section]="'decrementbuttonicon'" />
                        <ng-template *ngTemplateOutlet="decrementButtonIconTemplate"></ng-template>
                    </ng-container>
                </button>
            </span>
            <button
                *ngIf="showButtons && buttonLayout !== 'stacked'"
                type="button"
                pButton
                [ngClass]="{ 'p-inputnumber-button p-inputnumber-button-up': true }"
                [class]="incrementButtonClass"
                class="p-button-icon-only"
                [disabled]="disabled"
                tabindex="-1"
                [attr.aria-hidden]="true"
                (mousedown)="onUpButtonMouseDown($event)"
                (mouseup)="onUpButtonMouseUp()"
                (mouseleave)="onUpButtonMouseLeave()"
                (keydown)="onUpButtonKeyDown($event)"
                (keyup)="onUpButtonKeyUp()"
                [attr.data-pc-section]="'incrementbutton'"
            >
                <span *ngIf="incrementButtonIcon" [ngClass]="incrementButtonIcon" [attr.data-pc-section]="'incrementbuttonicon'"></span>
                <ng-container *ngIf="!incrementButtonIcon">
                    <AngleUpIcon *ngIf="!incrementButtonIconTemplate" [attr.data-pc-section]="'incrementbuttonicon'" />
                    <ng-template *ngTemplateOutlet="incrementButtonIconTemplate"></ng-template>
                </ng-container>
            </button>
            <button
                *ngIf="showButtons && buttonLayout !== 'stacked'"
                type="button"
                pButton
                [ngClass]="{ 'p-inputnumber-button p-inputnumber-button-down': true }"
                class="p-button-icon-only"
                [class]="decrementButtonClass"
                [disabled]="disabled"
                tabindex="-1"
                [attr.aria-hidden]="true"
                (mousedown)="onDownButtonMouseDown($event)"
                (mouseup)="onDownButtonMouseUp()"
                (mouseleave)="onDownButtonMouseLeave()"
                (keydown)="onDownButtonKeyDown($event)"
                (keyup)="onDownButtonKeyUp()"
                [attr.data-pc-section]="'decrementbutton'"
            >
                <span *ngIf="decrementButtonIcon" [ngClass]="decrementButtonIcon" [attr.data-pc-section]="'decrementbuttonicon'"></span>
                <ng-container *ngIf="!decrementButtonIcon">
                    <AngleDownIcon *ngIf="!decrementButtonIconTemplate" [attr.data-pc-section]="'decrementbuttonicon'" />
                    <ng-template *ngTemplateOutlet="decrementButtonIconTemplate"></ng-template>
                </ng-container>
            </button>
        </span>
    `, isInline: true, styles: ["@layer primeng{p-inputnumber,.p-inputnumber{display:inline-flex}.p-inputnumber-button{display:flex;align-items:center;justify-content:center;flex:0 0 auto}.p-inputnumber-buttons-stacked .p-button.p-inputnumber-button .p-button-label,.p-inputnumber-buttons-horizontal .p-button.p-inputnumber-button .p-button-label{display:none}.p-inputnumber-buttons-stacked .p-button.p-inputnumber-button-up{border-top-left-radius:0;border-bottom-left-radius:0;border-bottom-right-radius:0;padding:0}.p-inputnumber-buttons-stacked .p-inputnumber-input{border-top-right-radius:0;border-bottom-right-radius:0}.p-inputnumber-buttons-stacked .p-button.p-inputnumber-button-down{border-top-left-radius:0;border-top-right-radius:0;border-bottom-left-radius:0;padding:0}.p-inputnumber-buttons-stacked .p-inputnumber-button-group{display:flex;flex-direction:column}.p-inputnumber-buttons-stacked .p-inputnumber-button-group .p-button.p-inputnumber-button{flex:1 1 auto}.p-inputnumber-buttons-horizontal .p-button.p-inputnumber-button-up{order:3;border-top-left-radius:0;border-bottom-left-radius:0}.p-inputnumber-buttons-horizontal .p-inputnumber-input{order:2;border-radius:0}.p-inputnumber-buttons-horizontal .p-button.p-inputnumber-button-down{order:1;border-top-right-radius:0;border-bottom-right-radius:0}.p-inputnumber-buttons-vertical{flex-direction:column}.p-inputnumber-buttons-vertical .p-button.p-inputnumber-button-up{order:1;border-bottom-left-radius:0;border-bottom-right-radius:0;width:100%}.p-inputnumber-buttons-vertical .p-inputnumber-input{order:2;border-radius:0;text-align:center}.p-inputnumber-buttons-vertical .p-button.p-inputnumber-button-down{order:3;border-top-left-radius:0;border-top-right-radius:0;width:100%}.p-inputnumber-input{flex:1 1 auto}.p-fluid p-inputnumber,.p-fluid .p-inputnumber{width:100%}.p-fluid .p-inputnumber .p-inputnumber-input{width:1%}.p-fluid .p-inputnumber-buttons-vertical .p-inputnumber-input{width:100%}.p-inputnumber-clear-icon{position:absolute;top:50%;margin-top:-.5rem;cursor:pointer}.p-inputnumber-clearable{position:relative}}\n"], dependencies: [{ kind: "directive", type: i0.forwardRef(() => i1.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgIf), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgStyle), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i0.forwardRef(() => i2.InputText), selector: "[pInputText]" }, { kind: "directive", type: i0.forwardRef(() => i3.ButtonDirective), selector: "[pButton]", inputs: ["iconPos", "loadingIcon", "label", "icon", "loading"] }, { kind: "component", type: i0.forwardRef(() => TimesIcon), selector: "TimesIcon" }, { kind: "component", type: i0.forwardRef(() => AngleUpIcon), selector: "AngleUpIcon" }, { kind: "component", type: i0.forwardRef(() => AngleDownIcon), selector: "AngleDownIcon" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: InputNumber, decorators: [{
            type: Component,
            args: [{ selector: 'p-inputNumber', template: `
        <span
            [ngClass]="{
                'p-inputnumber p-component': true,
                'p-inputnumber-buttons-stacked': this.showButtons && this.buttonLayout === 'stacked',
                'p-inputnumber-buttons-horizontal': this.showButtons && this.buttonLayout === 'horizontal',
                'p-inputnumber-buttons-vertical': this.showButtons && this.buttonLayout === 'vertical'
            }"
            [ngStyle]="style"
            [class]="styleClass"
            [attr.data-pc-name]="'inputnumber'"
            [attr.data-pc-section]="'root'"
        >
            <input
                pInputText
                #input
                [attr.id]="inputId"
                role="spinbutton"
                [ngClass]="'p-inputnumber-input'"
                [ngStyle]="inputStyle"
                [class]="inputStyleClass"
                [value]="formattedValue()"
                [attr.aria-valuemin]="min"
                [attr.aria-valuemax]="max"
                [attr.aria-valuenow]="value"
                [disabled]="disabled"
                [readonly]="readonly"
                [attr.placeholder]="placeholder"
                [attr.aria-label]="ariaLabel"
                [attr.aria-labelledby]="ariaLabelledBy"
                [attr.title]="title"
                [attr.size]="size"
                [attr.name]="name"
                [attr.autocomplete]="autocomplete"
                [attr.maxlength]="maxlength"
                [attr.tabindex]="tabindex"
                [attr.aria-required]="ariaRequired"
                [attr.required]="required"
                [attr.min]="min"
                [attr.max]="max"
                inputmode="decimal"
                (input)="onUserInput($event)"
                (keydown)="onInputKeyDown($event)"
                (keypress)="onInputKeyPress($event)"
                (paste)="onPaste($event)"
                (click)="onInputClick()"
                (focus)="onInputFocus($event)"
                (blur)="onInputBlur($event)"
                [attr.data-pc-section]="'input'"
            />
            <ng-container *ngIf="buttonLayout != 'vertical' && showClear && value">
                <TimesIcon *ngIf="!clearIconTemplate" [ngClass]="'p-inputnumber-clear-icon'" (click)="clear()" [attr.data-pc-section]="'clearIcon'" />
                <span *ngIf="clearIconTemplate" (click)="clear()" class="p-inputnumber-clear-icon" [attr.data-pc-section]="'clearIcon'">
                    <ng-template *ngTemplateOutlet="clearIconTemplate"></ng-template>
                </span>
            </ng-container>
            <span class="p-inputnumber-button-group" *ngIf="showButtons && buttonLayout === 'stacked'" [attr.data-pc-section]="'buttonGroup'">
                <button
                    type="button"
                    pButton
                    [ngClass]="{ 'p-inputnumber-button p-inputnumber-button-up': true }"
                    class="p-button-icon-only"
                    [class]="incrementButtonClass"
                    [disabled]="disabled"
                    tabindex="-1"
                    (mousedown)="onUpButtonMouseDown($event)"
                    (mouseup)="onUpButtonMouseUp()"
                    (mouseleave)="onUpButtonMouseLeave()"
                    (keydown)="onUpButtonKeyDown($event)"
                    (keyup)="onUpButtonKeyUp()"
                    [attr.aria-hidden]="true"
                    [attr.data-pc-section]="'incrementbutton'"
                >
                    <span *ngIf="incrementButtonIcon" [ngClass]="incrementButtonIcon" [attr.data-pc-section]="'incrementbuttonicon'"></span>
                    <ng-container *ngIf="!incrementButtonIcon">
                        <AngleUpIcon *ngIf="!incrementButtonIconTemplate" [attr.data-pc-section]="'incrementbuttonicon'" />
                        <ng-template *ngTemplateOutlet="incrementButtonIconTemplate"></ng-template>
                    </ng-container>
                </button>
                <button
                    type="button"
                    pButton
                    [ngClass]="{ 'p-inputnumber-button p-inputnumber-button-down': true }"
                    class="p-button-icon-only"
                    [class]="decrementButtonClass"
                    [disabled]="disabled"
                    tabindex="-1"
                    [attr.aria-hidden]="true"
                    (mousedown)="onDownButtonMouseDown($event)"
                    (mouseup)="onDownButtonMouseUp()"
                    (mouseleave)="onDownButtonMouseLeave()"
                    (keydown)="onDownButtonKeyDown($event)"
                    (keyup)="onDownButtonKeyUp()"
                    [attr.data-pc-section]="decrementbutton"
                >
                    <span *ngIf="decrementButtonIcon" [ngClass]="decrementButtonIcon" [attr.data-pc-section]="'decrementbuttonicon'"></span>
                    <ng-container *ngIf="!decrementButtonIcon">
                        <AngleDownIcon *ngIf="!decrementButtonIconTemplate" [attr.data-pc-section]="'decrementbuttonicon'" />
                        <ng-template *ngTemplateOutlet="decrementButtonIconTemplate"></ng-template>
                    </ng-container>
                </button>
            </span>
            <button
                *ngIf="showButtons && buttonLayout !== 'stacked'"
                type="button"
                pButton
                [ngClass]="{ 'p-inputnumber-button p-inputnumber-button-up': true }"
                [class]="incrementButtonClass"
                class="p-button-icon-only"
                [disabled]="disabled"
                tabindex="-1"
                [attr.aria-hidden]="true"
                (mousedown)="onUpButtonMouseDown($event)"
                (mouseup)="onUpButtonMouseUp()"
                (mouseleave)="onUpButtonMouseLeave()"
                (keydown)="onUpButtonKeyDown($event)"
                (keyup)="onUpButtonKeyUp()"
                [attr.data-pc-section]="'incrementbutton'"
            >
                <span *ngIf="incrementButtonIcon" [ngClass]="incrementButtonIcon" [attr.data-pc-section]="'incrementbuttonicon'"></span>
                <ng-container *ngIf="!incrementButtonIcon">
                    <AngleUpIcon *ngIf="!incrementButtonIconTemplate" [attr.data-pc-section]="'incrementbuttonicon'" />
                    <ng-template *ngTemplateOutlet="incrementButtonIconTemplate"></ng-template>
                </ng-container>
            </button>
            <button
                *ngIf="showButtons && buttonLayout !== 'stacked'"
                type="button"
                pButton
                [ngClass]="{ 'p-inputnumber-button p-inputnumber-button-down': true }"
                class="p-button-icon-only"
                [class]="decrementButtonClass"
                [disabled]="disabled"
                tabindex="-1"
                [attr.aria-hidden]="true"
                (mousedown)="onDownButtonMouseDown($event)"
                (mouseup)="onDownButtonMouseUp()"
                (mouseleave)="onDownButtonMouseLeave()"
                (keydown)="onDownButtonKeyDown($event)"
                (keyup)="onDownButtonKeyUp()"
                [attr.data-pc-section]="'decrementbutton'"
            >
                <span *ngIf="decrementButtonIcon" [ngClass]="decrementButtonIcon" [attr.data-pc-section]="'decrementbuttonicon'"></span>
                <ng-container *ngIf="!decrementButtonIcon">
                    <AngleDownIcon *ngIf="!decrementButtonIconTemplate" [attr.data-pc-section]="'decrementbuttonicon'" />
                    <ng-template *ngTemplateOutlet="decrementButtonIconTemplate"></ng-template>
                </ng-container>
            </button>
        </span>
    `, changeDetection: ChangeDetectionStrategy.OnPush, providers: [INPUTNUMBER_VALUE_ACCESSOR], encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element p-inputwrapper',
                        '[class.p-inputwrapper-filled]': 'filled',
                        '[class.p-inputwrapper-focus]': 'focused',
                        '[class.p-inputnumber-clearable]': 'showClear && buttonLayout != "vertical"'
                    }, styles: ["@layer primeng{p-inputnumber,.p-inputnumber{display:inline-flex}.p-inputnumber-button{display:flex;align-items:center;justify-content:center;flex:0 0 auto}.p-inputnumber-buttons-stacked .p-button.p-inputnumber-button .p-button-label,.p-inputnumber-buttons-horizontal .p-button.p-inputnumber-button .p-button-label{display:none}.p-inputnumber-buttons-stacked .p-button.p-inputnumber-button-up{border-top-left-radius:0;border-bottom-left-radius:0;border-bottom-right-radius:0;padding:0}.p-inputnumber-buttons-stacked .p-inputnumber-input{border-top-right-radius:0;border-bottom-right-radius:0}.p-inputnumber-buttons-stacked .p-button.p-inputnumber-button-down{border-top-left-radius:0;border-top-right-radius:0;border-bottom-left-radius:0;padding:0}.p-inputnumber-buttons-stacked .p-inputnumber-button-group{display:flex;flex-direction:column}.p-inputnumber-buttons-stacked .p-inputnumber-button-group .p-button.p-inputnumber-button{flex:1 1 auto}.p-inputnumber-buttons-horizontal .p-button.p-inputnumber-button-up{order:3;border-top-left-radius:0;border-bottom-left-radius:0}.p-inputnumber-buttons-horizontal .p-inputnumber-input{order:2;border-radius:0}.p-inputnumber-buttons-horizontal .p-button.p-inputnumber-button-down{order:1;border-top-right-radius:0;border-bottom-right-radius:0}.p-inputnumber-buttons-vertical{flex-direction:column}.p-inputnumber-buttons-vertical .p-button.p-inputnumber-button-up{order:1;border-bottom-left-radius:0;border-bottom-right-radius:0;width:100%}.p-inputnumber-buttons-vertical .p-inputnumber-input{order:2;border-radius:0;text-align:center}.p-inputnumber-buttons-vertical .p-button.p-inputnumber-button-down{order:3;border-top-left-radius:0;border-top-right-radius:0;width:100%}.p-inputnumber-input{flex:1 1 auto}.p-fluid p-inputnumber,.p-fluid .p-inputnumber{width:100%}.p-fluid .p-inputnumber .p-inputnumber-input{width:1%}.p-fluid .p-inputnumber-buttons-vertical .p-inputnumber-input{width:100%}.p-inputnumber-clear-icon{position:absolute;top:50%;margin-top:-.5rem;cursor:pointer}.p-inputnumber-clearable{position:relative}}\n"] }]
        }], ctorParameters: () => [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i0.Injector }], propDecorators: { showButtons: [{
                type: Input
            }], format: [{
                type: Input
            }], buttonLayout: [{
                type: Input
            }], inputId: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], style: [{
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
            }], ariaLabelledBy: [{
                type: Input
            }], ariaLabel: [{
                type: Input
            }], ariaRequired: [{
                type: Input
            }], name: [{
                type: Input
            }], required: [{
                type: Input
            }], autocomplete: [{
                type: Input
            }], min: [{
                type: Input
            }], max: [{
                type: Input
            }], incrementButtonClass: [{
                type: Input
            }], decrementButtonClass: [{
                type: Input
            }], incrementButtonIcon: [{
                type: Input
            }], decrementButtonIcon: [{
                type: Input
            }], readonly: [{
                type: Input
            }], step: [{
                type: Input
            }], allowEmpty: [{
                type: Input
            }], locale: [{
                type: Input
            }], localeMatcher: [{
                type: Input
            }], mode: [{
                type: Input
            }], currency: [{
                type: Input
            }], currencyDisplay: [{
                type: Input
            }], useGrouping: [{
                type: Input
            }], minFractionDigits: [{
                type: Input
            }], maxFractionDigits: [{
                type: Input
            }], prefix: [{
                type: Input
            }], suffix: [{
                type: Input
            }], inputStyle: [{
                type: Input
            }], inputStyleClass: [{
                type: Input
            }], showClear: [{
                type: Input
            }], disabled: [{
                type: Input
            }], onInput: [{
                type: Output
            }], onFocus: [{
                type: Output
            }], onBlur: [{
                type: Output
            }], onKeyDown: [{
                type: Output
            }], onClear: [{
                type: Output
            }], input: [{
                type: ViewChild,
                args: ['input']
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
export class InputNumberModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: InputNumberModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.0.5", ngImport: i0, type: InputNumberModule, declarations: [InputNumber], imports: [CommonModule, InputTextModule, ButtonModule, TimesIcon, AngleUpIcon, AngleDownIcon], exports: [InputNumber, SharedModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: InputNumberModule, imports: [CommonModule, InputTextModule, ButtonModule, TimesIcon, AngleUpIcon, AngleDownIcon, SharedModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: InputNumberModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, InputTextModule, ButtonModule, TimesIcon, AngleUpIcon, AngleDownIcon],
                    exports: [InputNumber, SharedModule],
                    declarations: [InputNumber]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXRudW1iZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvaW5wdXRudW1iZXIvaW5wdXRudW1iZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBRUgsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxlQUFlLEVBRWYsWUFBWSxFQUNaLE1BQU0sRUFFTixLQUFLLEVBQ0wsUUFBUSxFQUdSLE1BQU0sRUFJTixTQUFTLEVBQ1QsaUJBQWlCLEVBQ2pCLFVBQVUsRUFDYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3BGLE9BQU8sRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzFELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7Ozs7QUFJcEQsTUFBTSxDQUFDLE1BQU0sMEJBQTBCLEdBQVE7SUFDM0MsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQztJQUMxQyxLQUFLLEVBQUUsSUFBSTtDQUNkLENBQUM7QUFDRjs7O0dBR0c7QUFvS0gsTUFBTSxPQUFPLFdBQVc7SUFzU2tCO0lBQTJCO0lBQXdC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bEIsS0FBSztnQkFLRyxlQUFlO3NCQUF2QixLQUFLO2dCQUtHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBS08sUUFBUTtzQkFBcEIsS0FBSztnQkFlSSxPQUFPO3NCQUFoQixNQUFNO2dCQU1HLE9BQU87c0JBQWhCLE1BQU07Z0JBTUcsTUFBTTtzQkFBZixNQUFNO2dCQU1HLFNBQVM7c0JBQWxCLE1BQU07Z0JBS0csT0FBTztzQkFBaEIsTUFBTTtnQkFFYSxLQUFLO3NCQUF4QixTQUFTO3VCQUFDLE9BQU87Z0JBRWMsU0FBUztzQkFBeEMsZUFBZTt1QkFBQyxhQUFhOztBQXM5QmxDLE1BQU0sT0FBTyxpQkFBaUI7dUdBQWpCLGlCQUFpQjt3R0FBakIsaUJBQWlCLGlCQXhzQ2pCLFdBQVcsYUFvc0NWLFlBQVksRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsYUFBYSxhQXBzQ25GLFdBQVcsRUFxc0NHLFlBQVk7d0dBRzFCLGlCQUFpQixZQUpoQixZQUFZLEVBQUUsZUFBZSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLGFBQWEsRUFDckUsWUFBWTs7MkZBRzFCLGlCQUFpQjtrQkFMN0IsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsZUFBZSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLGFBQWEsQ0FBQztvQkFDN0YsT0FBTyxFQUFFLENBQUMsV0FBVyxFQUFFLFlBQVksQ0FBQztvQkFDcEMsWUFBWSxFQUFFLENBQUMsV0FBVyxDQUFDO2lCQUM5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSwgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBDb250ZW50Q2hpbGRyZW4sXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5qZWN0LFxuICAgIEluamVjdG9yLFxuICAgIElucHV0LFxuICAgIE5nTW9kdWxlLFxuICAgIE9uQ2hhbmdlcyxcbiAgICBPbkluaXQsXG4gICAgT3V0cHV0LFxuICAgIFF1ZXJ5TGlzdCxcbiAgICBTaW1wbGVDaGFuZ2VzLFxuICAgIFRlbXBsYXRlUmVmLFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgICBmb3J3YXJkUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SLCBOZ0NvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBQcmltZVRlbXBsYXRlLCBTaGFyZWRNb2R1bGUgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBCdXR0b25Nb2R1bGUgfSBmcm9tICdwcmltZW5nL2J1dHRvbic7XG5pbXBvcnQgeyBEb21IYW5kbGVyIH0gZnJvbSAncHJpbWVuZy9kb20nO1xuaW1wb3J0IHsgQW5nbGVEb3duSWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvYW5nbGVkb3duJztcbmltcG9ydCB7IEFuZ2xlVXBJY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy9hbmdsZXVwJztcbmltcG9ydCB7IFRpbWVzSWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvdGltZXMnO1xuaW1wb3J0IHsgSW5wdXRUZXh0TW9kdWxlIH0gZnJvbSAncHJpbWVuZy9pbnB1dHRleHQnO1xuaW1wb3J0IHsgTnVsbGFibGUgfSBmcm9tICdwcmltZW5nL3RzLWhlbHBlcnMnO1xuaW1wb3J0IHsgSW5wdXROdW1iZXJJbnB1dEV2ZW50IH0gZnJvbSAnLi9pbnB1dG51bWJlci5pbnRlcmZhY2UnO1xuXG5leHBvcnQgY29uc3QgSU5QVVROVU1CRVJfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBJbnB1dE51bWJlciksXG4gICAgbXVsdGk6IHRydWVcbn07XG4vKipcbiAqIElucHV0TnVtYmVyIGlzIGFuIGlucHV0IGNvbXBvbmVudCB0byBwcm92aWRlIG51bWVyaWNhbCBpbnB1dC5cbiAqIEBncm91cCBDb21wb25lbnRzXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1pbnB1dE51bWJlcicsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPHNwYW5cbiAgICAgICAgICAgIFtuZ0NsYXNzXT1cIntcbiAgICAgICAgICAgICAgICAncC1pbnB1dG51bWJlciBwLWNvbXBvbmVudCc6IHRydWUsXG4gICAgICAgICAgICAgICAgJ3AtaW5wdXRudW1iZXItYnV0dG9ucy1zdGFja2VkJzogdGhpcy5zaG93QnV0dG9ucyAmJiB0aGlzLmJ1dHRvbkxheW91dCA9PT0gJ3N0YWNrZWQnLFxuICAgICAgICAgICAgICAgICdwLWlucHV0bnVtYmVyLWJ1dHRvbnMtaG9yaXpvbnRhbCc6IHRoaXMuc2hvd0J1dHRvbnMgJiYgdGhpcy5idXR0b25MYXlvdXQgPT09ICdob3Jpem9udGFsJyxcbiAgICAgICAgICAgICAgICAncC1pbnB1dG51bWJlci1idXR0b25zLXZlcnRpY2FsJzogdGhpcy5zaG93QnV0dG9ucyAmJiB0aGlzLmJ1dHRvbkxheW91dCA9PT0gJ3ZlcnRpY2FsJ1xuICAgICAgICAgICAgfVwiXG4gICAgICAgICAgICBbbmdTdHlsZV09XCJzdHlsZVwiXG4gICAgICAgICAgICBbY2xhc3NdPVwic3R5bGVDbGFzc1wiXG4gICAgICAgICAgICBbYXR0ci5kYXRhLXBjLW5hbWVdPVwiJ2lucHV0bnVtYmVyJ1wiXG4gICAgICAgICAgICBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ3Jvb3QnXCJcbiAgICAgICAgPlxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgcElucHV0VGV4dFxuICAgICAgICAgICAgICAgICNpbnB1dFxuICAgICAgICAgICAgICAgIFthdHRyLmlkXT1cImlucHV0SWRcIlxuICAgICAgICAgICAgICAgIHJvbGU9XCJzcGluYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBbbmdDbGFzc109XCIncC1pbnB1dG51bWJlci1pbnB1dCdcIlxuICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cImlucHV0U3R5bGVcIlxuICAgICAgICAgICAgICAgIFtjbGFzc109XCJpbnB1dFN0eWxlQ2xhc3NcIlxuICAgICAgICAgICAgICAgIFt2YWx1ZV09XCJmb3JtYXR0ZWRWYWx1ZSgpXCJcbiAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLXZhbHVlbWluXT1cIm1pblwiXG4gICAgICAgICAgICAgICAgW2F0dHIuYXJpYS12YWx1ZW1heF09XCJtYXhcIlxuICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtdmFsdWVub3ddPVwidmFsdWVcIlxuICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgW3JlYWRvbmx5XT1cInJlYWRvbmx5XCJcbiAgICAgICAgICAgICAgICBbYXR0ci5wbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXG4gICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJhcmlhTGFiZWxcIlxuICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxsZWRieV09XCJhcmlhTGFiZWxsZWRCeVwiXG4gICAgICAgICAgICAgICAgW2F0dHIudGl0bGVdPVwidGl0bGVcIlxuICAgICAgICAgICAgICAgIFthdHRyLnNpemVdPVwic2l6ZVwiXG4gICAgICAgICAgICAgICAgW2F0dHIubmFtZV09XCJuYW1lXCJcbiAgICAgICAgICAgICAgICBbYXR0ci5hdXRvY29tcGxldGVdPVwiYXV0b2NvbXBsZXRlXCJcbiAgICAgICAgICAgICAgICBbYXR0ci5tYXhsZW5ndGhdPVwibWF4bGVuZ3RoXCJcbiAgICAgICAgICAgICAgICBbYXR0ci50YWJpbmRleF09XCJ0YWJpbmRleFwiXG4gICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1yZXF1aXJlZF09XCJhcmlhUmVxdWlyZWRcIlxuICAgICAgICAgICAgICAgIFthdHRyLnJlcXVpcmVkXT1cInJlcXVpcmVkXCJcbiAgICAgICAgICAgICAgICBbYXR0ci5taW5dPVwibWluXCJcbiAgICAgICAgICAgICAgICBbYXR0ci5tYXhdPVwibWF4XCJcbiAgICAgICAgICAgICAgICBpbnB1dG1vZGU9XCJkZWNpbWFsXCJcbiAgICAgICAgICAgICAgICAoaW5wdXQpPVwib25Vc2VySW5wdXQoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgKGtleWRvd24pPVwib25JbnB1dEtleURvd24oJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgKGtleXByZXNzKT1cIm9uSW5wdXRLZXlQcmVzcygkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAocGFzdGUpPVwib25QYXN0ZSgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAoY2xpY2spPVwib25JbnB1dENsaWNrKClcIlxuICAgICAgICAgICAgICAgIChmb2N1cyk9XCJvbklucHV0Rm9jdXMoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgKGJsdXIpPVwib25JbnB1dEJsdXIoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidpbnB1dCdcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJidXR0b25MYXlvdXQgIT0gJ3ZlcnRpY2FsJyAmJiBzaG93Q2xlYXIgJiYgdmFsdWVcIj5cbiAgICAgICAgICAgICAgICA8VGltZXNJY29uICpuZ0lmPVwiIWNsZWFySWNvblRlbXBsYXRlXCIgW25nQ2xhc3NdPVwiJ3AtaW5wdXRudW1iZXItY2xlYXItaWNvbidcIiAoY2xpY2spPVwiY2xlYXIoKVwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInY2xlYXJJY29uJ1wiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJjbGVhckljb25UZW1wbGF0ZVwiIChjbGljayk9XCJjbGVhcigpXCIgY2xhc3M9XCJwLWlucHV0bnVtYmVyLWNsZWFyLWljb25cIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ2NsZWFySWNvbidcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwiY2xlYXJJY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLWlucHV0bnVtYmVyLWJ1dHRvbi1ncm91cFwiICpuZ0lmPVwic2hvd0J1dHRvbnMgJiYgYnV0dG9uTGF5b3V0ID09PSAnc3RhY2tlZCdcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ2J1dHRvbkdyb3VwJ1wiPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIHBCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyAncC1pbnB1dG51bWJlci1idXR0b24gcC1pbnB1dG51bWJlci1idXR0b24tdXAnOiB0cnVlIH1cIlxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInAtYnV0dG9uLWljb24tb25seVwiXG4gICAgICAgICAgICAgICAgICAgIFtjbGFzc109XCJpbmNyZW1lbnRCdXR0b25DbGFzc1wiXG4gICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgICAgIHRhYmluZGV4PVwiLTFcIlxuICAgICAgICAgICAgICAgICAgICAobW91c2Vkb3duKT1cIm9uVXBCdXR0b25Nb3VzZURvd24oJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgIChtb3VzZXVwKT1cIm9uVXBCdXR0b25Nb3VzZVVwKClcIlxuICAgICAgICAgICAgICAgICAgICAobW91c2VsZWF2ZSk9XCJvblVwQnV0dG9uTW91c2VMZWF2ZSgpXCJcbiAgICAgICAgICAgICAgICAgICAgKGtleWRvd24pPVwib25VcEJ1dHRvbktleURvd24oJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgIChrZXl1cCk9XCJvblVwQnV0dG9uS2V5VXAoKVwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtaGlkZGVuXT1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ2luY3JlbWVudGJ1dHRvbidcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJpbmNyZW1lbnRCdXR0b25JY29uXCIgW25nQ2xhc3NdPVwiaW5jcmVtZW50QnV0dG9uSWNvblwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInaW5jcmVtZW50YnV0dG9uaWNvbidcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhaW5jcmVtZW50QnV0dG9uSWNvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEFuZ2xlVXBJY29uICpuZ0lmPVwiIWluY3JlbWVudEJ1dHRvbkljb25UZW1wbGF0ZVwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInaW5jcmVtZW50YnV0dG9uaWNvbidcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwiaW5jcmVtZW50QnV0dG9uSWNvblRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgcEJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7ICdwLWlucHV0bnVtYmVyLWJ1dHRvbiBwLWlucHV0bnVtYmVyLWJ1dHRvbi1kb3duJzogdHJ1ZSB9XCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLWJ1dHRvbi1pY29uLW9ubHlcIlxuICAgICAgICAgICAgICAgICAgICBbY2xhc3NdPVwiZGVjcmVtZW50QnV0dG9uQ2xhc3NcIlxuICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAgICAgICAgICAgICB0YWJpbmRleD1cIi0xXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1oaWRkZW5dPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgICAgIChtb3VzZWRvd24pPVwib25Eb3duQnV0dG9uTW91c2VEb3duKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAobW91c2V1cCk9XCJvbkRvd25CdXR0b25Nb3VzZVVwKClcIlxuICAgICAgICAgICAgICAgICAgICAobW91c2VsZWF2ZSk9XCJvbkRvd25CdXR0b25Nb3VzZUxlYXZlKClcIlxuICAgICAgICAgICAgICAgICAgICAoa2V5ZG93bik9XCJvbkRvd25CdXR0b25LZXlEb3duKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAoa2V5dXApPVwib25Eb3duQnV0dG9uS2V5VXAoKVwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCJkZWNyZW1lbnRidXR0b25cIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJkZWNyZW1lbnRCdXR0b25JY29uXCIgW25nQ2xhc3NdPVwiZGVjcmVtZW50QnV0dG9uSWNvblwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInZGVjcmVtZW50YnV0dG9uaWNvbidcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhZGVjcmVtZW50QnV0dG9uSWNvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEFuZ2xlRG93bkljb24gKm5nSWY9XCIhZGVjcmVtZW50QnV0dG9uSWNvblRlbXBsYXRlXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidkZWNyZW1lbnRidXR0b25pY29uJ1wiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJkZWNyZW1lbnRCdXR0b25JY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAqbmdJZj1cInNob3dCdXR0b25zICYmIGJ1dHRvbkxheW91dCAhPT0gJ3N0YWNrZWQnXCJcbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBwQnV0dG9uXG4gICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyAncC1pbnB1dG51bWJlci1idXR0b24gcC1pbnB1dG51bWJlci1idXR0b24tdXAnOiB0cnVlIH1cIlxuICAgICAgICAgICAgICAgIFtjbGFzc109XCJpbmNyZW1lbnRCdXR0b25DbGFzc1wiXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJwLWJ1dHRvbi1pY29uLW9ubHlcIlxuICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgdGFiaW5kZXg9XCItMVwiXG4gICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1oaWRkZW5dPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgKG1vdXNlZG93bik9XCJvblVwQnV0dG9uTW91c2VEb3duKCRldmVudClcIlxuICAgICAgICAgICAgICAgIChtb3VzZXVwKT1cIm9uVXBCdXR0b25Nb3VzZVVwKClcIlxuICAgICAgICAgICAgICAgIChtb3VzZWxlYXZlKT1cIm9uVXBCdXR0b25Nb3VzZUxlYXZlKClcIlxuICAgICAgICAgICAgICAgIChrZXlkb3duKT1cIm9uVXBCdXR0b25LZXlEb3duKCRldmVudClcIlxuICAgICAgICAgICAgICAgIChrZXl1cCk9XCJvblVwQnV0dG9uS2V5VXAoKVwiXG4gICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidpbmNyZW1lbnRidXR0b24nXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImluY3JlbWVudEJ1dHRvbkljb25cIiBbbmdDbGFzc109XCJpbmNyZW1lbnRCdXR0b25JY29uXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidpbmNyZW1lbnRidXR0b25pY29uJ1wiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWluY3JlbWVudEJ1dHRvbkljb25cIj5cbiAgICAgICAgICAgICAgICAgICAgPEFuZ2xlVXBJY29uICpuZ0lmPVwiIWluY3JlbWVudEJ1dHRvbkljb25UZW1wbGF0ZVwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInaW5jcmVtZW50YnV0dG9uaWNvbidcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJpbmNyZW1lbnRCdXR0b25JY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgKm5nSWY9XCJzaG93QnV0dG9ucyAmJiBidXR0b25MYXlvdXQgIT09ICdzdGFja2VkJ1wiXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgcEJ1dHRvblxuICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsgJ3AtaW5wdXRudW1iZXItYnV0dG9uIHAtaW5wdXRudW1iZXItYnV0dG9uLWRvd24nOiB0cnVlIH1cIlxuICAgICAgICAgICAgICAgIGNsYXNzPVwicC1idXR0b24taWNvbi1vbmx5XCJcbiAgICAgICAgICAgICAgICBbY2xhc3NdPVwiZGVjcmVtZW50QnV0dG9uQ2xhc3NcIlxuICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgdGFiaW5kZXg9XCItMVwiXG4gICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1oaWRkZW5dPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgKG1vdXNlZG93bik9XCJvbkRvd25CdXR0b25Nb3VzZURvd24oJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgKG1vdXNldXApPVwib25Eb3duQnV0dG9uTW91c2VVcCgpXCJcbiAgICAgICAgICAgICAgICAobW91c2VsZWF2ZSk9XCJvbkRvd25CdXR0b25Nb3VzZUxlYXZlKClcIlxuICAgICAgICAgICAgICAgIChrZXlkb3duKT1cIm9uRG93bkJ1dHRvbktleURvd24oJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgKGtleXVwKT1cIm9uRG93bkJ1dHRvbktleVVwKClcIlxuICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInZGVjcmVtZW50YnV0dG9uJ1wiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJkZWNyZW1lbnRCdXR0b25JY29uXCIgW25nQ2xhc3NdPVwiZGVjcmVtZW50QnV0dG9uSWNvblwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInZGVjcmVtZW50YnV0dG9uaWNvbidcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFkZWNyZW1lbnRCdXR0b25JY29uXCI+XG4gICAgICAgICAgICAgICAgICAgIDxBbmdsZURvd25JY29uICpuZ0lmPVwiIWRlY3JlbWVudEJ1dHRvbkljb25UZW1wbGF0ZVwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInZGVjcmVtZW50YnV0dG9uaWNvbidcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJkZWNyZW1lbnRCdXR0b25JY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvc3Bhbj5cbiAgICBgLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIHByb3ZpZGVyczogW0lOUFVUTlVNQkVSX1ZBTFVFX0FDQ0VTU09SXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHN0eWxlVXJsczogWycuL2lucHV0bnVtYmVyLmNzcyddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdwLWVsZW1lbnQgcC1pbnB1dHdyYXBwZXInLFxuICAgICAgICAnW2NsYXNzLnAtaW5wdXR3cmFwcGVyLWZpbGxlZF0nOiAnZmlsbGVkJyxcbiAgICAgICAgJ1tjbGFzcy5wLWlucHV0d3JhcHBlci1mb2N1c10nOiAnZm9jdXNlZCcsXG4gICAgICAgICdbY2xhc3MucC1pbnB1dG51bWJlci1jbGVhcmFibGVdJzogJ3Nob3dDbGVhciAmJiBidXR0b25MYXlvdXQgIT0gXCJ2ZXJ0aWNhbFwiJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgSW5wdXROdW1iZXIgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyQ29udGVudEluaXQsIE9uQ2hhbmdlcywgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICAgIC8qKlxuICAgICAqIERpc3BsYXlzIHNwaW5uZXIgYnV0dG9ucy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzaG93QnV0dG9uczogYm9vbGVhbiA9IGZhbHNlO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gZm9ybWF0IHRoZSB2YWx1ZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBmb3JtYXQ6IGJvb2xlYW4gPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIExheW91dCBvZiB0aGUgYnV0dG9ucywgdmFsaWQgdmFsdWVzIGFyZSBcInN0YWNrZWRcIiAoZGVmYXVsdCksIFwiaG9yaXpvbnRhbFwiIGFuZCBcInZlcnRpY2FsXCIuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgYnV0dG9uTGF5b3V0OiBzdHJpbmcgPSAnc3RhY2tlZCc7XG4gICAgLyoqXG4gICAgICogSWRlbnRpZmllciBvZiB0aGUgZm9jdXMgaW5wdXQgdG8gbWF0Y2ggYSBsYWJlbCBkZWZpbmVkIGZvciB0aGUgY29tcG9uZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGlucHV0SWQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBTdHlsZSBjbGFzcyBvZiB0aGUgY29tcG9uZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBJbmxpbmUgc3R5bGUgb2YgdGhlIGNvbXBvbmVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzdHlsZTogeyBba2xhc3M6IHN0cmluZ106IGFueSB9IHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBBZHZpc29yeSBpbmZvcm1hdGlvbiB0byBkaXNwbGF5IG9uIGlucHV0LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogU2l6ZSBvZiB0aGUgaW5wdXQgZmllbGQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc2l6ZTogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIE1heGltdW0gbnVtYmVyIG9mIGNoYXJhY3RlciBhbGxvd3MgaW4gdGhlIGlucHV0IGZpZWxkLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIG1heGxlbmd0aDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFNwZWNpZmllcyB0YWIgb3JkZXIgb2YgdGhlIGVsZW1lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgdGFiaW5kZXg6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBUaXRsZSB0ZXh0IG9mIHRoZSBpbnB1dCB0ZXh0LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHRpdGxlOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogU3BlY2lmaWVzIG9uZSBvciBtb3JlIElEcyBpbiB0aGUgRE9NIHRoYXQgbGFiZWxzIHRoZSBpbnB1dCBmaWVsZC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBhcmlhTGFiZWxsZWRCeTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFVzZWQgdG8gZGVmaW5lIGEgc3RyaW5nIHRoYXQgbGFiZWxzIHRoZSBpbnB1dCBlbGVtZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGFyaWFMYWJlbDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFVzZWQgdG8gaW5kaWNhdGUgdGhhdCB1c2VyIGlucHV0IGlzIHJlcXVpcmVkIG9uIGFuIGVsZW1lbnQgYmVmb3JlIGEgZm9ybSBjYW4gYmUgc3VibWl0dGVkLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGFyaWFSZXF1aXJlZDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBOYW1lIG9mIHRoZSBpbnB1dCBmaWVsZC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBuYW1lOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIHRoYXQgd2hldGhlciB0aGUgaW5wdXQgZmllbGQgaXMgcmVxdWlyZWQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgcmVxdWlyZWQ6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogVXNlZCB0byBkZWZpbmUgYSBzdHJpbmcgdGhhdCBhdXRvY29tcGxldGUgYXR0cmlidXRlIHRoZSBjdXJyZW50IGVsZW1lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgYXV0b2NvbXBsZXRlOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogTWluaW51bSBib3VuZGFyeSB2YWx1ZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBtaW46IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBNYXhpbXVtIGJvdW5kYXJ5IHZhbHVlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIG1heDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFN0eWxlIGNsYXNzIG9mIHRoZSBpbmNyZW1lbnQgYnV0dG9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGluY3JlbWVudEJ1dHRvbkNsYXNzOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogU3R5bGUgY2xhc3Mgb2YgdGhlIGRlY3JlbWVudCBidXR0b24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZGVjcmVtZW50QnV0dG9uQ2xhc3M6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBTdHlsZSBjbGFzcyBvZiB0aGUgaW5jcmVtZW50IGJ1dHRvbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBpbmNyZW1lbnRCdXR0b25JY29uOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogU3R5bGUgY2xhc3Mgb2YgdGhlIGRlY3JlbWVudCBidXR0b24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZGVjcmVtZW50QnV0dG9uSWNvbjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdoZW4gcHJlc2VudCwgaXQgc3BlY2lmaWVzIHRoYXQgYW4gaW5wdXQgZmllbGQgaXMgcmVhZC1vbmx5LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHJlYWRvbmx5OiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogU3RlcCBmYWN0b3IgdG8gaW5jcmVtZW50L2RlY3JlbWVudCB0aGUgdmFsdWUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc3RlcDogbnVtYmVyID0gMTtcbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIGlucHV0IGZpZWxkIGlzIGVtcHR5LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGFsbG93RW1wdHk6IGJvb2xlYW4gPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIExvY2FsZSB0byBiZSB1c2VkIGluIGZvcm1hdHRpbmcuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgbG9jYWxlOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogVGhlIGxvY2FsZSBtYXRjaGluZyBhbGdvcml0aG0gdG8gdXNlLiBQb3NzaWJsZSB2YWx1ZXMgYXJlIFwibG9va3VwXCIgYW5kIFwiYmVzdCBmaXRcIjsgdGhlIGRlZmF1bHQgaXMgXCJiZXN0IGZpdFwiLiBTZWUgTG9jYWxlIE5lZ290aWF0aW9uIGZvciBkZXRhaWxzLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGxvY2FsZU1hdGNoZXI6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIHRoZSBiZWhhdmlvciBvZiB0aGUgY29tcG9uZW50LCB2YWxpZCB2YWx1ZXMgYXJlIFwiZGVjaW1hbFwiIGFuZCBcImN1cnJlbmN5XCIuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgbW9kZTogc3RyaW5nID0gJ2RlY2ltYWwnO1xuICAgIC8qKlxuICAgICAqIFRoZSBjdXJyZW5jeSB0byB1c2UgaW4gY3VycmVuY3kgZm9ybWF0dGluZy4gUG9zc2libGUgdmFsdWVzIGFyZSB0aGUgSVNPIDQyMTcgY3VycmVuY3kgY29kZXMsIHN1Y2ggYXMgXCJVU0RcIiBmb3IgdGhlIFVTIGRvbGxhciwgXCJFVVJcIiBmb3IgdGhlIGV1cm8sIG9yIFwiQ05ZXCIgZm9yIHRoZSBDaGluZXNlIFJNQi4gVGhlcmUgaXMgbm8gZGVmYXVsdCB2YWx1ZTsgaWYgdGhlIHN0eWxlIGlzIFwiY3VycmVuY3lcIiwgdGhlIGN1cnJlbmN5IHByb3BlcnR5IG11c3QgYmUgcHJvdmlkZWQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgY3VycmVuY3k6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBIb3cgdG8gZGlzcGxheSB0aGUgY3VycmVuY3kgaW4gY3VycmVuY3kgZm9ybWF0dGluZy4gUG9zc2libGUgdmFsdWVzIGFyZSBcInN5bWJvbFwiIHRvIHVzZSBhIGxvY2FsaXplZCBjdXJyZW5jeSBzeW1ib2wgc3VjaCBhcyDigqwsIMO8XCJjb2RlXCIgdG8gdXNlIHRoZSBJU08gY3VycmVuY3kgY29kZSwgXCJuYW1lXCIgdG8gdXNlIGEgbG9jYWxpemVkIGN1cnJlbmN5IG5hbWUgc3VjaCBhcyBcImRvbGxhclwiOyB0aGUgZGVmYXVsdCBpcyBcInN5bWJvbFwiLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGN1cnJlbmN5RGlzcGxheTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gdXNlIGdyb3VwaW5nIHNlcGFyYXRvcnMsIHN1Y2ggYXMgdGhvdXNhbmRzIHNlcGFyYXRvcnMgb3IgdGhvdXNhbmQvbGFraC9jcm9yZSBzZXBhcmF0b3JzLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHVzZUdyb3VwaW5nOiBib29sZWFuID0gdHJ1ZTtcbiAgICAvKipcbiAgICAgKiBUaGUgbWluaW11bSBudW1iZXIgb2YgZnJhY3Rpb24gZGlnaXRzIHRvIHVzZS4gUG9zc2libGUgdmFsdWVzIGFyZSBmcm9tIDAgdG8gMjA7IHRoZSBkZWZhdWx0IGZvciBwbGFpbiBudW1iZXIgYW5kIHBlcmNlbnQgZm9ybWF0dGluZyBpcyAwOyB0aGUgZGVmYXVsdCBmb3IgY3VycmVuY3kgZm9ybWF0dGluZyBpcyB0aGUgbnVtYmVyIG9mIG1pbm9yIHVuaXQgZGlnaXRzIHByb3ZpZGVkIGJ5IHRoZSBJU08gNDIxNyBjdXJyZW5jeSBjb2RlIGxpc3QgKDIgaWYgdGhlIGxpc3QgZG9lc24ndCBwcm92aWRlIHRoYXQgaW5mb3JtYXRpb24pLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIG1pbkZyYWN0aW9uRGlnaXRzOiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogVGhlIG1heGltdW0gbnVtYmVyIG9mIGZyYWN0aW9uIGRpZ2l0cyB0byB1c2UuIFBvc3NpYmxlIHZhbHVlcyBhcmUgZnJvbSAwIHRvIDIwOyB0aGUgZGVmYXVsdCBmb3IgcGxhaW4gbnVtYmVyIGZvcm1hdHRpbmcgaXMgdGhlIGxhcmdlciBvZiBtaW5pbXVtRnJhY3Rpb25EaWdpdHMgYW5kIDM7IHRoZSBkZWZhdWx0IGZvciBjdXJyZW5jeSBmb3JtYXR0aW5nIGlzIHRoZSBsYXJnZXIgb2YgbWluaW11bUZyYWN0aW9uRGlnaXRzIGFuZCB0aGUgbnVtYmVyIG9mIG1pbm9yIHVuaXQgZGlnaXRzIHByb3ZpZGVkIGJ5IHRoZSBJU08gNDIxNyBjdXJyZW5jeSBjb2RlIGxpc3QgKDIgaWYgdGhlIGxpc3QgZG9lc24ndCBwcm92aWRlIHRoYXQgaW5mb3JtYXRpb24pLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIG1heEZyYWN0aW9uRGlnaXRzOiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogVGV4dCB0byBkaXNwbGF5IGJlZm9yZSB0aGUgdmFsdWUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgcHJlZml4OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogVGV4dCB0byBkaXNwbGF5IGFmdGVyIHRoZSB2YWx1ZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzdWZmaXg6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBJbmxpbmUgc3R5bGUgb2YgdGhlIGlucHV0IGZpZWxkLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGlucHV0U3R5bGU6IGFueTtcbiAgICAvKipcbiAgICAgKiBTdHlsZSBjbGFzcyBvZiB0aGUgaW5wdXQgZmllbGQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgaW5wdXRTdHlsZUNsYXNzOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hlbiBlbmFibGVkLCBhIGNsZWFyIGljb24gaXMgZGlzcGxheWVkIHRvIGNsZWFyIHRoZSB2YWx1ZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzaG93Q2xlYXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBXaGVuIHByZXNlbnQsIGl0IHNwZWNpZmllcyB0aGF0IHRoZSBlbGVtZW50IHNob3VsZCBiZSBkaXNhYmxlZC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgICB9XG4gICAgc2V0IGRpc2FibGVkKGRpc2FibGVkOiBib29sZWFuIHwgdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChkaXNhYmxlZCkgdGhpcy5mb2N1c2VkID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSBkaXNhYmxlZDtcblxuICAgICAgICBpZiAodGhpcy50aW1lcikgdGhpcy5jbGVhclRpbWVyKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSBvbiBpbnB1dC5cbiAgICAgKiBAcGFyYW0ge0lucHV0TnVtYmVySW5wdXRFdmVudH0gZXZlbnQgLSBDdXN0b20gaW5wdXQgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uSW5wdXQ6IEV2ZW50RW1pdHRlcjxJbnB1dE51bWJlcklucHV0RXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxJbnB1dE51bWJlcklucHV0RXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gdGhlIGNvbXBvbmVudCByZWNlaXZlcyBmb2N1cy5cbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIEJyb3dzZXIgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uRm9jdXM6IEV2ZW50RW1pdHRlcjxFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50PigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIHRoZSBjb21wb25lbnQgbG9zZXMgZm9jdXMuXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBCcm93c2VyIGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvbkJsdXI6IEV2ZW50RW1pdHRlcjxFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50PigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSBvbiBpbnB1dCBrZXkgcHJlc3MuXG4gICAgICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCAtIEtleWJvYXJkIGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvbktleURvd246IEV2ZW50RW1pdHRlcjxLZXlib2FyZEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8S2V5Ym9hcmRFdmVudD4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBjbGVhciB0b2tlbiBpcyBjbGlja2VkLlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvbkNsZWFyOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgICBAVmlld0NoaWxkKCdpbnB1dCcpIGlucHV0ITogRWxlbWVudFJlZjtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oUHJpbWVUZW1wbGF0ZSkgdGVtcGxhdGVzITogUXVlcnlMaXN0PFByaW1lVGVtcGxhdGU+O1xuXG4gICAgY2xlYXJJY29uVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgaW5jcmVtZW50QnV0dG9uSWNvblRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIGRlY3JlbWVudEJ1dHRvbkljb25UZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICB2YWx1ZTogTnVsbGFibGU8bnVtYmVyPjtcblxuICAgIG9uTW9kZWxDaGFuZ2U6IEZ1bmN0aW9uID0gKCkgPT4ge307XG5cbiAgICBvbk1vZGVsVG91Y2hlZDogRnVuY3Rpb24gPSAoKSA9PiB7fTtcblxuICAgIGZvY3VzZWQ6IE51bGxhYmxlPGJvb2xlYW4+O1xuXG4gICAgaW5pdGlhbGl6ZWQ6IE51bGxhYmxlPGJvb2xlYW4+O1xuXG4gICAgZ3JvdXBDaGFyOiBzdHJpbmcgPSAnJztcblxuICAgIHByZWZpeENoYXI6IHN0cmluZyA9ICcnO1xuXG4gICAgc3VmZml4Q2hhcjogc3RyaW5nID0gJyc7XG5cbiAgICBpc1NwZWNpYWxDaGFyOiBOdWxsYWJsZTxib29sZWFuPjtcblxuICAgIHRpbWVyOiBhbnk7XG5cbiAgICBsYXN0VmFsdWU6IE51bGxhYmxlPHN0cmluZz47XG5cbiAgICBfbnVtZXJhbDogYW55O1xuXG4gICAgbnVtYmVyRm9ybWF0OiBhbnk7XG5cbiAgICBfZGVjaW1hbDogYW55O1xuXG4gICAgX2dyb3VwOiBhbnk7XG5cbiAgICBfbWludXNTaWduOiBhbnk7XG5cbiAgICBfY3VycmVuY3k6IE51bGxhYmxlPFJlZ0V4cCB8IHN0cmluZz47XG5cbiAgICBfcHJlZml4OiBOdWxsYWJsZTxSZWdFeHA+O1xuXG4gICAgX3N1ZmZpeDogTnVsbGFibGU8UmVnRXhwPjtcblxuICAgIF9pbmRleDogbnVtYmVyIHwgYW55O1xuXG4gICAgX2Rpc2FibGVkOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gICAgcHJpdmF0ZSBuZ0NvbnRyb2w6IE5nQ29udHJvbCB8IG51bGwgPSBudWxsO1xuXG4gICAgY29uc3RydWN0b3IoQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogRG9jdW1lbnQsIHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsIHByaXZhdGUgcmVhZG9ubHkgaW5qZWN0b3I6IEluamVjdG9yKSB7fVxuXG4gICAgbmdPbkNoYW5nZXMoc2ltcGxlQ2hhbmdlOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIGNvbnN0IHByb3BzID0gWydsb2NhbGUnLCAnbG9jYWxlTWF0Y2hlcicsICdtb2RlJywgJ2N1cnJlbmN5JywgJ2N1cnJlbmN5RGlzcGxheScsICd1c2VHcm91cGluZycsICdtaW5GcmFjdGlvbkRpZ2l0cycsICdtYXhGcmFjdGlvbkRpZ2l0cycsICdwcmVmaXgnLCAnc3VmZml4J107XG4gICAgICAgIGlmIChwcm9wcy5zb21lKChwKSA9PiAhIXNpbXBsZUNoYW5nZVtwXSkpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ29uc3RydWN0UGFyc2VyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGVzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoaXRlbS5nZXRUeXBlKCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdjbGVhcmljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFySWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdpbmNyZW1lbnRidXR0b25pY29uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmNyZW1lbnRCdXR0b25JY29uVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2RlY3JlbWVudGJ1dHRvbmljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlY3JlbWVudEJ1dHRvbkljb25UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5uZ0NvbnRyb2wgPSB0aGlzLmluamVjdG9yLmdldChOZ0NvbnRyb2wsIG51bGwsIHsgb3B0aW9uYWw6IHRydWUgfSk7XG5cbiAgICAgICAgdGhpcy5jb25zdHJ1Y3RQYXJzZXIoKTtcblxuICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBnZXRPcHRpb25zKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbG9jYWxlTWF0Y2hlcjogdGhpcy5sb2NhbGVNYXRjaGVyLFxuICAgICAgICAgICAgc3R5bGU6IHRoaXMubW9kZSxcbiAgICAgICAgICAgIGN1cnJlbmN5OiB0aGlzLmN1cnJlbmN5LFxuICAgICAgICAgICAgY3VycmVuY3lEaXNwbGF5OiB0aGlzLmN1cnJlbmN5RGlzcGxheSxcbiAgICAgICAgICAgIHVzZUdyb3VwaW5nOiB0aGlzLnVzZUdyb3VwaW5nLFxuICAgICAgICAgICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiB0aGlzLm1pbkZyYWN0aW9uRGlnaXRzLFxuICAgICAgICAgICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiB0aGlzLm1heEZyYWN0aW9uRGlnaXRzXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY29uc3RydWN0UGFyc2VyKCkge1xuICAgICAgICB0aGlzLm51bWJlckZvcm1hdCA9IG5ldyBJbnRsLk51bWJlckZvcm1hdCh0aGlzLmxvY2FsZSwgdGhpcy5nZXRPcHRpb25zKCkpO1xuICAgICAgICBjb25zdCBudW1lcmFscyA9IFsuLi5uZXcgSW50bC5OdW1iZXJGb3JtYXQodGhpcy5sb2NhbGUsIHsgdXNlR3JvdXBpbmc6IGZhbHNlIH0pLmZvcm1hdCg5ODc2NTQzMjEwKV0ucmV2ZXJzZSgpO1xuICAgICAgICBjb25zdCBpbmRleCA9IG5ldyBNYXAobnVtZXJhbHMubWFwKChkLCBpKSA9PiBbZCwgaV0pKTtcbiAgICAgICAgdGhpcy5fbnVtZXJhbCA9IG5ldyBSZWdFeHAoYFske251bWVyYWxzLmpvaW4oJycpfV1gLCAnZycpO1xuICAgICAgICB0aGlzLl9ncm91cCA9IHRoaXMuZ2V0R3JvdXBpbmdFeHByZXNzaW9uKCk7XG4gICAgICAgIHRoaXMuX21pbnVzU2lnbiA9IHRoaXMuZ2V0TWludXNTaWduRXhwcmVzc2lvbigpO1xuICAgICAgICB0aGlzLl9jdXJyZW5jeSA9IHRoaXMuZ2V0Q3VycmVuY3lFeHByZXNzaW9uKCk7XG4gICAgICAgIHRoaXMuX2RlY2ltYWwgPSB0aGlzLmdldERlY2ltYWxFeHByZXNzaW9uKCk7XG4gICAgICAgIHRoaXMuX3N1ZmZpeCA9IHRoaXMuZ2V0U3VmZml4RXhwcmVzc2lvbigpO1xuICAgICAgICB0aGlzLl9wcmVmaXggPSB0aGlzLmdldFByZWZpeEV4cHJlc3Npb24oKTtcbiAgICAgICAgdGhpcy5faW5kZXggPSAoZDogYW55KSA9PiBpbmRleC5nZXQoZCk7XG4gICAgfVxuXG4gICAgdXBkYXRlQ29uc3RydWN0UGFyc2VyKCkge1xuICAgICAgICBpZiAodGhpcy5pbml0aWFsaXplZCkge1xuICAgICAgICAgICAgdGhpcy5jb25zdHJ1Y3RQYXJzZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGVzY2FwZVJlZ0V4cCh0ZXh0OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGV4dC5yZXBsYWNlKC9bLVtcXF17fSgpKis/LixcXFxcXiR8I1xcc10vZywgJ1xcXFwkJicpO1xuICAgIH1cblxuICAgIGdldERlY2ltYWxFeHByZXNzaW9uKCk6IFJlZ0V4cCB7XG4gICAgICAgIGNvbnN0IGZvcm1hdHRlciA9IG5ldyBJbnRsLk51bWJlckZvcm1hdCh0aGlzLmxvY2FsZSwgeyAuLi50aGlzLmdldE9wdGlvbnMoKSwgdXNlR3JvdXBpbmc6IGZhbHNlIH0pO1xuICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cChcbiAgICAgICAgICAgIGBbJHtmb3JtYXR0ZXJcbiAgICAgICAgICAgICAgICAuZm9ybWF0KDEuMSlcbiAgICAgICAgICAgICAgICAucmVwbGFjZSh0aGlzLl9jdXJyZW5jeSBhcyBSZWdFeHAgfCBzdHJpbmcsICcnKVxuICAgICAgICAgICAgICAgIC50cmltKClcbiAgICAgICAgICAgICAgICAucmVwbGFjZSh0aGlzLl9udW1lcmFsLCAnJyl9XWAsXG4gICAgICAgICAgICAnZydcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBnZXRHcm91cGluZ0V4cHJlc3Npb24oKTogUmVnRXhwIHtcbiAgICAgICAgY29uc3QgZm9ybWF0dGVyID0gbmV3IEludGwuTnVtYmVyRm9ybWF0KHRoaXMubG9jYWxlLCB7IHVzZUdyb3VwaW5nOiB0cnVlIH0pO1xuICAgICAgICB0aGlzLmdyb3VwQ2hhciA9IGZvcm1hdHRlci5mb3JtYXQoMTAwMDAwMCkudHJpbSgpLnJlcGxhY2UodGhpcy5fbnVtZXJhbCwgJycpLmNoYXJBdCgwKTtcbiAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoYFske3RoaXMuZ3JvdXBDaGFyfV1gLCAnZycpO1xuICAgIH1cblxuICAgIGdldE1pbnVzU2lnbkV4cHJlc3Npb24oKTogUmVnRXhwIHtcbiAgICAgICAgY29uc3QgZm9ybWF0dGVyID0gbmV3IEludGwuTnVtYmVyRm9ybWF0KHRoaXMubG9jYWxlLCB7IHVzZUdyb3VwaW5nOiBmYWxzZSB9KTtcbiAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoYFske2Zvcm1hdHRlci5mb3JtYXQoLTEpLnRyaW0oKS5yZXBsYWNlKHRoaXMuX251bWVyYWwsICcnKX1dYCwgJ2cnKTtcbiAgICB9XG5cbiAgICBnZXRDdXJyZW5jeUV4cHJlc3Npb24oKTogUmVnRXhwIHtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVuY3kpIHtcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdHRlciA9IG5ldyBJbnRsLk51bWJlckZvcm1hdCh0aGlzLmxvY2FsZSwgeyBzdHlsZTogJ2N1cnJlbmN5JywgY3VycmVuY3k6IHRoaXMuY3VycmVuY3ksIGN1cnJlbmN5RGlzcGxheTogdGhpcy5jdXJyZW5jeURpc3BsYXksIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMCwgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAwIH0pO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoYFske2Zvcm1hdHRlci5mb3JtYXQoMSkucmVwbGFjZSgvXFxzL2csICcnKS5yZXBsYWNlKHRoaXMuX251bWVyYWwsICcnKS5yZXBsYWNlKHRoaXMuX2dyb3VwLCAnJyl9XWAsICdnJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cChgW11gLCAnZycpO1xuICAgIH1cblxuICAgIGdldFByZWZpeEV4cHJlc3Npb24oKTogUmVnRXhwIHtcbiAgICAgICAgaWYgKHRoaXMucHJlZml4KSB7XG4gICAgICAgICAgICB0aGlzLnByZWZpeENoYXIgPSB0aGlzLnByZWZpeDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdHRlciA9IG5ldyBJbnRsLk51bWJlckZvcm1hdCh0aGlzLmxvY2FsZSwgeyBzdHlsZTogdGhpcy5tb2RlLCBjdXJyZW5jeTogdGhpcy5jdXJyZW5jeSwgY3VycmVuY3lEaXNwbGF5OiB0aGlzLmN1cnJlbmN5RGlzcGxheSB9KTtcbiAgICAgICAgICAgIHRoaXMucHJlZml4Q2hhciA9IGZvcm1hdHRlci5mb3JtYXQoMSkuc3BsaXQoJzEnKVswXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgUmVnRXhwKGAke3RoaXMuZXNjYXBlUmVnRXhwKHRoaXMucHJlZml4Q2hhciB8fCAnJyl9YCwgJ2cnKTtcbiAgICB9XG5cbiAgICBnZXRTdWZmaXhFeHByZXNzaW9uKCk6IFJlZ0V4cCB7XG4gICAgICAgIGlmICh0aGlzLnN1ZmZpeCkge1xuICAgICAgICAgICAgdGhpcy5zdWZmaXhDaGFyID0gdGhpcy5zdWZmaXg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBmb3JtYXR0ZXIgPSBuZXcgSW50bC5OdW1iZXJGb3JtYXQodGhpcy5sb2NhbGUsIHsgc3R5bGU6IHRoaXMubW9kZSwgY3VycmVuY3k6IHRoaXMuY3VycmVuY3ksIGN1cnJlbmN5RGlzcGxheTogdGhpcy5jdXJyZW5jeURpc3BsYXksIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMCwgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAwIH0pO1xuICAgICAgICAgICAgdGhpcy5zdWZmaXhDaGFyID0gZm9ybWF0dGVyLmZvcm1hdCgxKS5zcGxpdCgnMScpWzFdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoYCR7dGhpcy5lc2NhcGVSZWdFeHAodGhpcy5zdWZmaXhDaGFyIHx8ICcnKX1gLCAnZycpO1xuICAgIH1cblxuICAgIGZvcm1hdFZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgaWYgKHZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gJy0nKSB7XG4gICAgICAgICAgICAgICAgLy8gTWludXMgc2lnblxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuZm9ybWF0KSB7XG4gICAgICAgICAgICAgICAgbGV0IGZvcm1hdHRlciA9IG5ldyBJbnRsLk51bWJlckZvcm1hdCh0aGlzLmxvY2FsZSwgdGhpcy5nZXRPcHRpb25zKCkpO1xuICAgICAgICAgICAgICAgIGxldCBmb3JtYXR0ZWRWYWx1ZSA9IGZvcm1hdHRlci5mb3JtYXQodmFsdWUpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnByZWZpeCkge1xuICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZWRWYWx1ZSA9IHRoaXMucHJlZml4ICsgZm9ybWF0dGVkVmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3VmZml4KSB7XG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdHRlZFZhbHVlID0gZm9ybWF0dGVkVmFsdWUgKyB0aGlzLnN1ZmZpeDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZm9ybWF0dGVkVmFsdWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIHBhcnNlVmFsdWUodGV4dDogYW55KSB7XG4gICAgICAgIGxldCBmaWx0ZXJlZFRleHQgPSB0ZXh0XG4gICAgICAgICAgICAucmVwbGFjZSh0aGlzLl9zdWZmaXggYXMgUmVnRXhwLCAnJylcbiAgICAgICAgICAgIC5yZXBsYWNlKHRoaXMuX3ByZWZpeCBhcyBSZWdFeHAsICcnKVxuICAgICAgICAgICAgLnRyaW0oKVxuICAgICAgICAgICAgLnJlcGxhY2UoL1xccy9nLCAnJylcbiAgICAgICAgICAgIC5yZXBsYWNlKHRoaXMuX2N1cnJlbmN5IGFzIFJlZ0V4cCwgJycpXG4gICAgICAgICAgICAucmVwbGFjZSh0aGlzLl9ncm91cCwgJycpXG4gICAgICAgICAgICAucmVwbGFjZSh0aGlzLl9taW51c1NpZ24sICctJylcbiAgICAgICAgICAgIC5yZXBsYWNlKHRoaXMuX2RlY2ltYWwsICcuJylcbiAgICAgICAgICAgIC5yZXBsYWNlKHRoaXMuX251bWVyYWwsIHRoaXMuX2luZGV4KTtcblxuICAgICAgICBpZiAoZmlsdGVyZWRUZXh0KSB7XG4gICAgICAgICAgICBpZiAoZmlsdGVyZWRUZXh0ID09PSAnLScpXG4gICAgICAgICAgICAgICAgLy8gTWludXMgc2lnblxuICAgICAgICAgICAgICAgIHJldHVybiBmaWx0ZXJlZFRleHQ7XG5cbiAgICAgICAgICAgIGxldCBwYXJzZWRWYWx1ZSA9ICtmaWx0ZXJlZFRleHQ7XG4gICAgICAgICAgICByZXR1cm4gaXNOYU4ocGFyc2VkVmFsdWUpID8gbnVsbCA6IHBhcnNlZFZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmVwZWF0KGV2ZW50OiBFdmVudCwgaW50ZXJ2YWw6IG51bWJlciB8IG51bGwsIGRpcjogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLnJlYWRvbmx5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaSA9IGludGVydmFsIHx8IDUwMDtcblxuICAgICAgICB0aGlzLmNsZWFyVGltZXIoKTtcbiAgICAgICAgdGhpcy50aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZXBlYXQoZXZlbnQsIDQwLCBkaXIpO1xuICAgICAgICB9LCBpKTtcblxuICAgICAgICB0aGlzLnNwaW4oZXZlbnQsIGRpcik7XG4gICAgfVxuXG4gICAgc3BpbihldmVudDogRXZlbnQsIGRpcjogbnVtYmVyKSB7XG4gICAgICAgIGxldCBzdGVwID0gdGhpcy5zdGVwICogZGlyO1xuICAgICAgICBsZXQgY3VycmVudFZhbHVlID0gdGhpcy5wYXJzZVZhbHVlKHRoaXMuaW5wdXQ/Lm5hdGl2ZUVsZW1lbnQudmFsdWUpIHx8IDA7XG4gICAgICAgIGxldCBuZXdWYWx1ZSA9IHRoaXMudmFsaWRhdGVWYWx1ZSgoY3VycmVudFZhbHVlIGFzIG51bWJlcikgKyBzdGVwKTtcbiAgICAgICAgaWYgKHRoaXMubWF4bGVuZ3RoICYmIHRoaXMubWF4bGVuZ3RoIDwgdGhpcy5mb3JtYXRWYWx1ZShuZXdWYWx1ZSkubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51cGRhdGVJbnB1dChuZXdWYWx1ZSwgbnVsbCwgJ3NwaW4nLCBudWxsKTtcbiAgICAgICAgdGhpcy51cGRhdGVNb2RlbChldmVudCwgbmV3VmFsdWUpO1xuXG4gICAgICAgIHRoaXMuaGFuZGxlT25JbnB1dChldmVudCwgY3VycmVudFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgfVxuXG4gICAgY2xlYXIoKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSBudWxsO1xuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy52YWx1ZSk7XG4gICAgICAgIHRoaXMub25DbGVhci5lbWl0KCk7XG4gICAgfVxuXG4gICAgb25VcEJ1dHRvbk1vdXNlRG93bihldmVudDogTW91c2VFdmVudCkge1xuICAgICAgICBpZiAoZXZlbnQuYnV0dG9uID09PSAyKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyVGltZXIoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5pbnB1dD8ubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgdGhpcy5yZXBlYXQoZXZlbnQsIG51bGwsIDEpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uVXBCdXR0b25Nb3VzZVVwKCkge1xuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJUaW1lcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25VcEJ1dHRvbk1vdXNlTGVhdmUoKSB7XG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5jbGVhclRpbWVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblVwQnV0dG9uS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzIgfHwgZXZlbnQua2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgICAgICAgIHRoaXMucmVwZWF0KGV2ZW50LCBudWxsLCAxKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uVXBCdXR0b25LZXlVcCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyVGltZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRG93bkJ1dHRvbk1vdXNlRG93bihldmVudDogTW91c2VFdmVudCkge1xuICAgICAgICBpZiAoZXZlbnQuYnV0dG9uID09PSAyKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyVGltZXIoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuaW5wdXQ/Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgIHRoaXMucmVwZWF0KGV2ZW50LCBudWxsLCAtMSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Eb3duQnV0dG9uTW91c2VVcCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyVGltZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRG93bkJ1dHRvbk1vdXNlTGVhdmUoKSB7XG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5jbGVhclRpbWVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkRvd25CdXR0b25LZXlVcCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyVGltZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRG93bkJ1dHRvbktleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDMyIHx8IGV2ZW50LmtleUNvZGUgPT09IDEzKSB7XG4gICAgICAgICAgICB0aGlzLnJlcGVhdChldmVudCwgbnVsbCwgLTEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Vc2VySW5wdXQoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLnJlYWRvbmx5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pc1NwZWNpYWxDaGFyKSB7XG4gICAgICAgICAgICAoZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlID0gdGhpcy5sYXN0VmFsdWUgYXMgc3RyaW5nO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaXNTcGVjaWFsQ2hhciA9IGZhbHNlO1xuICAgIH1cblxuICAgIG9uSW5wdXRLZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLnJlYWRvbmx5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmxhc3RWYWx1ZSA9IChldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWU7XG4gICAgICAgIGlmICgoZXZlbnQgYXMgS2V5Ym9hcmRFdmVudCkuc2hpZnRLZXkgfHwgKGV2ZW50IGFzIEtleWJvYXJkRXZlbnQpLmFsdEtleSkge1xuICAgICAgICAgICAgdGhpcy5pc1NwZWNpYWxDaGFyID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzZWxlY3Rpb25TdGFydCA9IChldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyO1xuICAgICAgICBsZXQgc2VsZWN0aW9uRW5kID0gKGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS5zZWxlY3Rpb25FbmQgYXMgbnVtYmVyO1xuICAgICAgICBsZXQgaW5wdXRWYWx1ZSA9IChldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUgYXMgc3RyaW5nO1xuICAgICAgICBsZXQgbmV3VmFsdWVTdHIgPSBudWxsO1xuXG4gICAgICAgIGlmIChldmVudC5hbHRLZXkpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBzd2l0Y2ggKGV2ZW50LmNvZGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICAgICAgICAgIHRoaXMuc3BpbihldmVudCwgMSk7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICAgICAgICB0aGlzLnNwaW4oZXZlbnQsIC0xKTtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdBcnJvd0xlZnQnOlxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc051bWVyYWxDaGFyKGlucHV0VmFsdWUuY2hhckF0KHNlbGVjdGlvblN0YXJ0IC0gMSkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdBcnJvd1JpZ2h0JzpcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNOdW1lcmFsQ2hhcihpbnB1dFZhbHVlLmNoYXJBdChzZWxlY3Rpb25TdGFydCkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdUYWInOlxuICAgICAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICAgICAgICAgIG5ld1ZhbHVlU3RyID0gdGhpcy52YWxpZGF0ZVZhbHVlKHRoaXMucGFyc2VWYWx1ZSh0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB0aGlzLmZvcm1hdFZhbHVlKG5ld1ZhbHVlU3RyKTtcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLXZhbHVlbm93JywgbmV3VmFsdWVTdHIpO1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlTW9kZWwoZXZlbnQsIG5ld1ZhbHVlU3RyKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnQmFja3NwYWNlJzoge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0aW9uU3RhcnQgPT09IHNlbGVjdGlvbkVuZCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkZWxldGVDaGFyID0gaW5wdXRWYWx1ZS5jaGFyQXQoc2VsZWN0aW9uU3RhcnQgLSAxKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBkZWNpbWFsQ2hhckluZGV4LCBkZWNpbWFsQ2hhckluZGV4V2l0aG91dFByZWZpeCB9ID0gdGhpcy5nZXREZWNpbWFsQ2hhckluZGV4ZXMoaW5wdXRWYWx1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNOdW1lcmFsQ2hhcihkZWxldGVDaGFyKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVjaW1hbExlbmd0aCA9IHRoaXMuZ2V0RGVjaW1hbExlbmd0aChpbnB1dFZhbHVlKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2dyb3VwLnRlc3QoZGVsZXRlQ2hhcikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9ncm91cC5sYXN0SW5kZXggPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1ZhbHVlU3RyID0gaW5wdXRWYWx1ZS5zbGljZSgwLCBzZWxlY3Rpb25TdGFydCAtIDIpICsgaW5wdXRWYWx1ZS5zbGljZShzZWxlY3Rpb25TdGFydCAtIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9kZWNpbWFsLnRlc3QoZGVsZXRlQ2hhcikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9kZWNpbWFsLmxhc3RJbmRleCA9IDA7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVjaW1hbExlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlucHV0Py5uYXRpdmVFbGVtZW50LnNldFNlbGVjdGlvblJhbmdlKHNlbGVjdGlvblN0YXJ0IC0gMSwgc2VsZWN0aW9uU3RhcnQgLSAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdWYWx1ZVN0ciA9IGlucHV0VmFsdWUuc2xpY2UoMCwgc2VsZWN0aW9uU3RhcnQgLSAxKSArIGlucHV0VmFsdWUuc2xpY2Uoc2VsZWN0aW9uU3RhcnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGVjaW1hbENoYXJJbmRleCA+IDAgJiYgc2VsZWN0aW9uU3RhcnQgPiBkZWNpbWFsQ2hhckluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5zZXJ0ZWRUZXh0ID0gdGhpcy5pc0RlY2ltYWxNb2RlKCkgJiYgKHRoaXMubWluRnJhY3Rpb25EaWdpdHMgfHwgMCkgPCBkZWNpbWFsTGVuZ3RoID8gJycgOiAnMCc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3VmFsdWVTdHIgPSBpbnB1dFZhbHVlLnNsaWNlKDAsIHNlbGVjdGlvblN0YXJ0IC0gMSkgKyBpbnNlcnRlZFRleHQgKyBpbnB1dFZhbHVlLnNsaWNlKHNlbGVjdGlvblN0YXJ0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGVjaW1hbENoYXJJbmRleFdpdGhvdXRQcmVmaXggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdWYWx1ZVN0ciA9IGlucHV0VmFsdWUuc2xpY2UoMCwgc2VsZWN0aW9uU3RhcnQgLSAxKSArICcwJyArIGlucHV0VmFsdWUuc2xpY2Uoc2VsZWN0aW9uU3RhcnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1ZhbHVlU3RyID0gKHRoaXMucGFyc2VWYWx1ZShuZXdWYWx1ZVN0cikgYXMgbnVtYmVyKSA+IDAgPyBuZXdWYWx1ZVN0ciA6ICcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdWYWx1ZVN0ciA9IGlucHV0VmFsdWUuc2xpY2UoMCwgc2VsZWN0aW9uU3RhcnQgLSAxKSArIGlucHV0VmFsdWUuc2xpY2Uoc2VsZWN0aW9uU3RhcnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVWYWx1ZShldmVudCwgbmV3VmFsdWVTdHIsIG51bGwsICdkZWxldGUtc2luZ2xlJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3VmFsdWVTdHIgPSB0aGlzLmRlbGV0ZVJhbmdlKGlucHV0VmFsdWUsIHNlbGVjdGlvblN0YXJ0LCBzZWxlY3Rpb25FbmQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVZhbHVlKGV2ZW50LCBuZXdWYWx1ZVN0ciwgbnVsbCwgJ2RlbGV0ZS1yYW5nZScpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjYXNlICdEZWxldGUnOlxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0aW9uU3RhcnQgPT09IHNlbGVjdGlvbkVuZCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkZWxldGVDaGFyID0gaW5wdXRWYWx1ZS5jaGFyQXQoc2VsZWN0aW9uU3RhcnQpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB7IGRlY2ltYWxDaGFySW5kZXgsIGRlY2ltYWxDaGFySW5kZXhXaXRob3V0UHJlZml4IH0gPSB0aGlzLmdldERlY2ltYWxDaGFySW5kZXhlcyhpbnB1dFZhbHVlKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc051bWVyYWxDaGFyKGRlbGV0ZUNoYXIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkZWNpbWFsTGVuZ3RoID0gdGhpcy5nZXREZWNpbWFsTGVuZ3RoKGlucHV0VmFsdWUpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fZ3JvdXAudGVzdChkZWxldGVDaGFyKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2dyb3VwLmxhc3RJbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3VmFsdWVTdHIgPSBpbnB1dFZhbHVlLnNsaWNlKDAsIHNlbGVjdGlvblN0YXJ0KSArIGlucHV0VmFsdWUuc2xpY2Uoc2VsZWN0aW9uU3RhcnQgKyAyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fZGVjaW1hbC50ZXN0KGRlbGV0ZUNoYXIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGVjaW1hbC5sYXN0SW5kZXggPSAwO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlY2ltYWxMZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnB1dD8ubmF0aXZlRWxlbWVudC5zZXRTZWxlY3Rpb25SYW5nZShzZWxlY3Rpb25TdGFydCArIDEsIHNlbGVjdGlvblN0YXJ0ICsgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3VmFsdWVTdHIgPSBpbnB1dFZhbHVlLnNsaWNlKDAsIHNlbGVjdGlvblN0YXJ0KSArIGlucHV0VmFsdWUuc2xpY2Uoc2VsZWN0aW9uU3RhcnQgKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRlY2ltYWxDaGFySW5kZXggPiAwICYmIHNlbGVjdGlvblN0YXJ0ID4gZGVjaW1hbENoYXJJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGluc2VydGVkVGV4dCA9IHRoaXMuaXNEZWNpbWFsTW9kZSgpICYmICh0aGlzLm1pbkZyYWN0aW9uRGlnaXRzIHx8IDApIDwgZGVjaW1hbExlbmd0aCA/ICcnIDogJzAnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1ZhbHVlU3RyID0gaW5wdXRWYWx1ZS5zbGljZSgwLCBzZWxlY3Rpb25TdGFydCkgKyBpbnNlcnRlZFRleHQgKyBpbnB1dFZhbHVlLnNsaWNlKHNlbGVjdGlvblN0YXJ0ICsgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRlY2ltYWxDaGFySW5kZXhXaXRob3V0UHJlZml4ID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3VmFsdWVTdHIgPSBpbnB1dFZhbHVlLnNsaWNlKDAsIHNlbGVjdGlvblN0YXJ0KSArICcwJyArIGlucHV0VmFsdWUuc2xpY2Uoc2VsZWN0aW9uU3RhcnQgKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdWYWx1ZVN0ciA9ICh0aGlzLnBhcnNlVmFsdWUobmV3VmFsdWVTdHIpIGFzIG51bWJlcikgPiAwID8gbmV3VmFsdWVTdHIgOiAnJztcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3VmFsdWVTdHIgPSBpbnB1dFZhbHVlLnNsaWNlKDAsIHNlbGVjdGlvblN0YXJ0KSArIGlucHV0VmFsdWUuc2xpY2Uoc2VsZWN0aW9uU3RhcnQgKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVmFsdWUoZXZlbnQsIG5ld1ZhbHVlU3RyIGFzIHN0cmluZywgbnVsbCwgJ2RlbGV0ZS1iYWNrLXNpbmdsZScpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld1ZhbHVlU3RyID0gdGhpcy5kZWxldGVSYW5nZShpbnB1dFZhbHVlLCBzZWxlY3Rpb25TdGFydCwgc2VsZWN0aW9uRW5kKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVWYWx1ZShldmVudCwgbmV3VmFsdWVTdHIsIG51bGwsICdkZWxldGUtcmFuZ2UnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0hvbWUnOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1pbikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsKGV2ZW50LCB0aGlzLm1pbik7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdFbmQnOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1heCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsKGV2ZW50LCB0aGlzLm1heCk7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vbktleURvd24uZW1pdChldmVudCk7XG4gICAgfVxuXG4gICAgb25JbnB1dEtleVByZXNzKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLnJlYWRvbmx5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgY29kZSA9IGV2ZW50LndoaWNoIHx8IGV2ZW50LmtleUNvZGU7XG4gICAgICAgIGxldCBjaGFyID0gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlKTtcbiAgICAgICAgY29uc3QgaXNEZWNpbWFsU2lnbiA9IHRoaXMuaXNEZWNpbWFsU2lnbihjaGFyKTtcbiAgICAgICAgY29uc3QgaXNNaW51c1NpZ24gPSB0aGlzLmlzTWludXNTaWduKGNoYXIpO1xuXG4gICAgICAgIGlmIChjb2RlICE9IDEzKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbmV3VmFsdWUgPSB0aGlzLnBhcnNlVmFsdWUodGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlICsgY2hhcik7XG4gICAgICAgIGNvbnN0IG5ld1ZhbHVlU3RyID0gbmV3VmFsdWUgIT0gbnVsbCA/IG5ld1ZhbHVlLnRvU3RyaW5nKCkgOiAnJztcbiAgICAgICAgaWYgKHRoaXMubWF4bGVuZ3RoICYmIG5ld1ZhbHVlU3RyLmxlbmd0aCA+IHRoaXMubWF4bGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoKDQ4IDw9IGNvZGUgJiYgY29kZSA8PSA1NykgfHwgaXNNaW51c1NpZ24gfHwgaXNEZWNpbWFsU2lnbikge1xuICAgICAgICAgICAgdGhpcy5pbnNlcnQoZXZlbnQsIGNoYXIsIHsgaXNEZWNpbWFsU2lnbiwgaXNNaW51c1NpZ24gfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblBhc3RlKGV2ZW50OiBDbGlwYm9hcmRFdmVudCkge1xuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQgJiYgIXRoaXMucmVhZG9ubHkpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IChldmVudC5jbGlwYm9hcmREYXRhIHx8ICh0aGlzLmRvY3VtZW50IGFzIGFueSkuZGVmYXVsdFZpZXdbJ2NsaXBib2FyZERhdGEnXSkuZ2V0RGF0YSgnVGV4dCcpO1xuICAgICAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tYXhsZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IGRhdGEudG9TdHJpbmcoKS5zdWJzdHJpbmcoMCwgdGhpcy5tYXhsZW5ndGgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCBmaWx0ZXJlZERhdGEgPSB0aGlzLnBhcnNlVmFsdWUoZGF0YSk7XG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlcmVkRGF0YSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5zZXJ0KGV2ZW50LCBmaWx0ZXJlZERhdGEudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWxsb3dNaW51c1NpZ24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1pbiA9PSBudWxsIHx8IHRoaXMubWluIDwgMDtcbiAgICB9XG5cbiAgICBpc01pbnVzU2lnbihjaGFyOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHRoaXMuX21pbnVzU2lnbi50ZXN0KGNoYXIpIHx8IGNoYXIgPT09ICctJykge1xuICAgICAgICAgICAgdGhpcy5fbWludXNTaWduLmxhc3RJbmRleCA9IDA7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpc0RlY2ltYWxTaWduKGNoYXI6IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy5fZGVjaW1hbC50ZXN0KGNoYXIpKSB7XG4gICAgICAgICAgICB0aGlzLl9kZWNpbWFsLmxhc3RJbmRleCA9IDA7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpc0RlY2ltYWxNb2RlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb2RlID09PSAnZGVjaW1hbCc7XG4gICAgfVxuXG4gICAgZ2V0RGVjaW1hbENoYXJJbmRleGVzKHZhbDogc3RyaW5nKSB7XG4gICAgICAgIGxldCBkZWNpbWFsQ2hhckluZGV4ID0gdmFsLnNlYXJjaCh0aGlzLl9kZWNpbWFsKTtcbiAgICAgICAgdGhpcy5fZGVjaW1hbC5sYXN0SW5kZXggPSAwO1xuXG4gICAgICAgIGNvbnN0IGZpbHRlcmVkVmFsID0gdmFsXG4gICAgICAgICAgICAucmVwbGFjZSh0aGlzLl9wcmVmaXggYXMgUmVnRXhwLCAnJylcbiAgICAgICAgICAgIC50cmltKClcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXHMvZywgJycpXG4gICAgICAgICAgICAucmVwbGFjZSh0aGlzLl9jdXJyZW5jeSBhcyBSZWdFeHAsICcnKTtcbiAgICAgICAgY29uc3QgZGVjaW1hbENoYXJJbmRleFdpdGhvdXRQcmVmaXggPSBmaWx0ZXJlZFZhbC5zZWFyY2godGhpcy5fZGVjaW1hbCk7XG4gICAgICAgIHRoaXMuX2RlY2ltYWwubGFzdEluZGV4ID0gMDtcblxuICAgICAgICByZXR1cm4geyBkZWNpbWFsQ2hhckluZGV4LCBkZWNpbWFsQ2hhckluZGV4V2l0aG91dFByZWZpeCB9O1xuICAgIH1cblxuICAgIGdldENoYXJJbmRleGVzKHZhbDogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGRlY2ltYWxDaGFySW5kZXggPSB2YWwuc2VhcmNoKHRoaXMuX2RlY2ltYWwpO1xuICAgICAgICB0aGlzLl9kZWNpbWFsLmxhc3RJbmRleCA9IDA7XG4gICAgICAgIGNvbnN0IG1pbnVzQ2hhckluZGV4ID0gdmFsLnNlYXJjaCh0aGlzLl9taW51c1NpZ24pO1xuICAgICAgICB0aGlzLl9taW51c1NpZ24ubGFzdEluZGV4ID0gMDtcbiAgICAgICAgY29uc3Qgc3VmZml4Q2hhckluZGV4ID0gdmFsLnNlYXJjaCh0aGlzLl9zdWZmaXggYXMgUmVnRXhwKTtcbiAgICAgICAgKHRoaXMuX3N1ZmZpeCBhcyBSZWdFeHApLmxhc3RJbmRleCA9IDA7XG4gICAgICAgIGNvbnN0IGN1cnJlbmN5Q2hhckluZGV4ID0gdmFsLnNlYXJjaCh0aGlzLl9jdXJyZW5jeSBhcyBSZWdFeHApO1xuICAgICAgICAodGhpcy5fY3VycmVuY3kgYXMgUmVnRXhwKS5sYXN0SW5kZXggPSAwO1xuXG4gICAgICAgIHJldHVybiB7IGRlY2ltYWxDaGFySW5kZXgsIG1pbnVzQ2hhckluZGV4LCBzdWZmaXhDaGFySW5kZXgsIGN1cnJlbmN5Q2hhckluZGV4IH07XG4gICAgfVxuXG4gICAgaW5zZXJ0KGV2ZW50OiBFdmVudCwgdGV4dDogc3RyaW5nLCBzaWduID0geyBpc0RlY2ltYWxTaWduOiBmYWxzZSwgaXNNaW51c1NpZ246IGZhbHNlIH0pIHtcbiAgICAgICAgY29uc3QgbWludXNDaGFySW5kZXhPblRleHQgPSB0ZXh0LnNlYXJjaCh0aGlzLl9taW51c1NpZ24pO1xuICAgICAgICB0aGlzLl9taW51c1NpZ24ubGFzdEluZGV4ID0gMDtcbiAgICAgICAgaWYgKCF0aGlzLmFsbG93TWludXNTaWduKCkgJiYgbWludXNDaGFySW5kZXhPblRleHQgIT09IC0xKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgc2VsZWN0aW9uU3RhcnQgPSB0aGlzLmlucHV0Py5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0O1xuICAgICAgICBsZXQgc2VsZWN0aW9uRW5kID0gdGhpcy5pbnB1dD8ubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25FbmQ7XG4gICAgICAgIGxldCBpbnB1dFZhbHVlID0gdGhpcy5pbnB1dD8ubmF0aXZlRWxlbWVudC52YWx1ZS50cmltKCk7XG4gICAgICAgIGNvbnN0IHsgZGVjaW1hbENoYXJJbmRleCwgbWludXNDaGFySW5kZXgsIHN1ZmZpeENoYXJJbmRleCwgY3VycmVuY3lDaGFySW5kZXggfSA9IHRoaXMuZ2V0Q2hhckluZGV4ZXMoaW5wdXRWYWx1ZSk7XG4gICAgICAgIGxldCBuZXdWYWx1ZVN0cjtcblxuICAgICAgICBpZiAoc2lnbi5pc01pbnVzU2lnbikge1xuICAgICAgICAgICAgaWYgKHNlbGVjdGlvblN0YXJ0ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgbmV3VmFsdWVTdHIgPSBpbnB1dFZhbHVlO1xuICAgICAgICAgICAgICAgIGlmIChtaW51c0NoYXJJbmRleCA9PT0gLTEgfHwgc2VsZWN0aW9uRW5kICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld1ZhbHVlU3RyID0gdGhpcy5pbnNlcnRUZXh0KGlucHV0VmFsdWUsIHRleHQsIDAsIHNlbGVjdGlvbkVuZCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVWYWx1ZShldmVudCwgbmV3VmFsdWVTdHIsIHRleHQsICdpbnNlcnQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChzaWduLmlzRGVjaW1hbFNpZ24pIHtcbiAgICAgICAgICAgIGlmIChkZWNpbWFsQ2hhckluZGV4ID4gMCAmJiBzZWxlY3Rpb25TdGFydCA9PT0gZGVjaW1hbENoYXJJbmRleCkge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVmFsdWUoZXZlbnQsIGlucHV0VmFsdWUsIHRleHQsICdpbnNlcnQnKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGVjaW1hbENoYXJJbmRleCA+IHNlbGVjdGlvblN0YXJ0ICYmIGRlY2ltYWxDaGFySW5kZXggPCBzZWxlY3Rpb25FbmQpIHtcbiAgICAgICAgICAgICAgICBuZXdWYWx1ZVN0ciA9IHRoaXMuaW5zZXJ0VGV4dChpbnB1dFZhbHVlLCB0ZXh0LCBzZWxlY3Rpb25TdGFydCwgc2VsZWN0aW9uRW5kKTtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVZhbHVlKGV2ZW50LCBuZXdWYWx1ZVN0ciwgdGV4dCwgJ2luc2VydCcpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChkZWNpbWFsQ2hhckluZGV4ID09PSAtMSAmJiB0aGlzLm1heEZyYWN0aW9uRGlnaXRzKSB7XG4gICAgICAgICAgICAgICAgbmV3VmFsdWVTdHIgPSB0aGlzLmluc2VydFRleHQoaW5wdXRWYWx1ZSwgdGV4dCwgc2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvbkVuZCk7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVWYWx1ZShldmVudCwgbmV3VmFsdWVTdHIsIHRleHQsICdpbnNlcnQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IG1heEZyYWN0aW9uRGlnaXRzID0gdGhpcy5udW1iZXJGb3JtYXQucmVzb2x2ZWRPcHRpb25zKCkubWF4aW11bUZyYWN0aW9uRGlnaXRzO1xuICAgICAgICAgICAgY29uc3Qgb3BlcmF0aW9uID0gc2VsZWN0aW9uU3RhcnQgIT09IHNlbGVjdGlvbkVuZCA/ICdyYW5nZS1pbnNlcnQnIDogJ2luc2VydCc7XG5cbiAgICAgICAgICAgIGlmIChkZWNpbWFsQ2hhckluZGV4ID4gMCAmJiBzZWxlY3Rpb25TdGFydCA+IGRlY2ltYWxDaGFySW5kZXgpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0aW9uU3RhcnQgKyB0ZXh0Lmxlbmd0aCAtIChkZWNpbWFsQ2hhckluZGV4ICsgMSkgPD0gbWF4RnJhY3Rpb25EaWdpdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2hhckluZGV4ID0gY3VycmVuY3lDaGFySW5kZXggPj0gc2VsZWN0aW9uU3RhcnQgPyBjdXJyZW5jeUNoYXJJbmRleCAtIDEgOiBzdWZmaXhDaGFySW5kZXggPj0gc2VsZWN0aW9uU3RhcnQgPyBzdWZmaXhDaGFySW5kZXggOiBpbnB1dFZhbHVlLmxlbmd0aDtcblxuICAgICAgICAgICAgICAgICAgICBuZXdWYWx1ZVN0ciA9IGlucHV0VmFsdWUuc2xpY2UoMCwgc2VsZWN0aW9uU3RhcnQpICsgdGV4dCArIGlucHV0VmFsdWUuc2xpY2Uoc2VsZWN0aW9uU3RhcnQgKyB0ZXh0Lmxlbmd0aCwgY2hhckluZGV4KSArIGlucHV0VmFsdWUuc2xpY2UoY2hhckluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVWYWx1ZShldmVudCwgbmV3VmFsdWVTdHIsIHRleHQsIG9wZXJhdGlvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBuZXdWYWx1ZVN0ciA9IHRoaXMuaW5zZXJ0VGV4dChpbnB1dFZhbHVlLCB0ZXh0LCBzZWxlY3Rpb25TdGFydCwgc2VsZWN0aW9uRW5kKTtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVZhbHVlKGV2ZW50LCBuZXdWYWx1ZVN0ciwgdGV4dCwgb3BlcmF0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluc2VydFRleHQodmFsdWU6IHN0cmluZywgdGV4dDogc3RyaW5nLCBzdGFydDogbnVtYmVyLCBlbmQ6IG51bWJlcikge1xuICAgICAgICBsZXQgdGV4dFNwbGl0ID0gdGV4dCA9PT0gJy4nID8gdGV4dCA6IHRleHQuc3BsaXQoJy4nKTtcblxuICAgICAgICBpZiAodGV4dFNwbGl0Lmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgY29uc3QgZGVjaW1hbENoYXJJbmRleCA9IHZhbHVlLnNsaWNlKHN0YXJ0LCBlbmQpLnNlYXJjaCh0aGlzLl9kZWNpbWFsKTtcbiAgICAgICAgICAgIHRoaXMuX2RlY2ltYWwubGFzdEluZGV4ID0gMDtcbiAgICAgICAgICAgIHJldHVybiBkZWNpbWFsQ2hhckluZGV4ID4gMCA/IHZhbHVlLnNsaWNlKDAsIHN0YXJ0KSArIHRoaXMuZm9ybWF0VmFsdWUodGV4dCkgKyB2YWx1ZS5zbGljZShlbmQpIDogdmFsdWUgfHwgdGhpcy5mb3JtYXRWYWx1ZSh0ZXh0KTtcbiAgICAgICAgfSBlbHNlIGlmIChlbmQgLSBzdGFydCA9PT0gdmFsdWUubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXRWYWx1ZSh0ZXh0KTtcbiAgICAgICAgfSBlbHNlIGlmIChzdGFydCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRleHQgKyB2YWx1ZS5zbGljZShlbmQpO1xuICAgICAgICB9IGVsc2UgaWYgKGVuZCA9PT0gdmFsdWUubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUuc2xpY2UoMCwgc3RhcnQpICsgdGV4dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS5zbGljZSgwLCBzdGFydCkgKyB0ZXh0ICsgdmFsdWUuc2xpY2UoZW5kKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlbGV0ZVJhbmdlKHZhbHVlOiBzdHJpbmcsIHN0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyKSB7XG4gICAgICAgIGxldCBuZXdWYWx1ZVN0cjtcblxuICAgICAgICBpZiAoZW5kIC0gc3RhcnQgPT09IHZhbHVlLmxlbmd0aCkgbmV3VmFsdWVTdHIgPSAnJztcbiAgICAgICAgZWxzZSBpZiAoc3RhcnQgPT09IDApIG5ld1ZhbHVlU3RyID0gdmFsdWUuc2xpY2UoZW5kKTtcbiAgICAgICAgZWxzZSBpZiAoZW5kID09PSB2YWx1ZS5sZW5ndGgpIG5ld1ZhbHVlU3RyID0gdmFsdWUuc2xpY2UoMCwgc3RhcnQpO1xuICAgICAgICBlbHNlIG5ld1ZhbHVlU3RyID0gdmFsdWUuc2xpY2UoMCwgc3RhcnQpICsgdmFsdWUuc2xpY2UoZW5kKTtcblxuICAgICAgICByZXR1cm4gbmV3VmFsdWVTdHI7XG4gICAgfVxuXG4gICAgaW5pdEN1cnNvcigpIHtcbiAgICAgICAgbGV0IHNlbGVjdGlvblN0YXJ0ID0gdGhpcy5pbnB1dD8ubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydDtcbiAgICAgICAgbGV0IGlucHV0VmFsdWUgPSB0aGlzLmlucHV0Py5uYXRpdmVFbGVtZW50LnZhbHVlO1xuICAgICAgICBsZXQgdmFsdWVMZW5ndGggPSBpbnB1dFZhbHVlLmxlbmd0aDtcbiAgICAgICAgbGV0IGluZGV4ID0gbnVsbDtcblxuICAgICAgICAvLyByZW1vdmUgcHJlZml4XG4gICAgICAgIGxldCBwcmVmaXhMZW5ndGggPSAodGhpcy5wcmVmaXhDaGFyIHx8ICcnKS5sZW5ndGg7XG4gICAgICAgIGlucHV0VmFsdWUgPSBpbnB1dFZhbHVlLnJlcGxhY2UodGhpcy5fcHJlZml4LCAnJyk7XG4gICAgICAgIHNlbGVjdGlvblN0YXJ0ID0gc2VsZWN0aW9uU3RhcnQgLSBwcmVmaXhMZW5ndGg7XG5cbiAgICAgICAgbGV0IGNoYXIgPSBpbnB1dFZhbHVlLmNoYXJBdChzZWxlY3Rpb25TdGFydCk7XG4gICAgICAgIGlmICh0aGlzLmlzTnVtZXJhbENoYXIoY2hhcikpIHtcbiAgICAgICAgICAgIHJldHVybiBzZWxlY3Rpb25TdGFydCArIHByZWZpeExlbmd0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vbGVmdFxuICAgICAgICBsZXQgaSA9IHNlbGVjdGlvblN0YXJ0IC0gMTtcbiAgICAgICAgd2hpbGUgKGkgPj0gMCkge1xuICAgICAgICAgICAgY2hhciA9IGlucHV0VmFsdWUuY2hhckF0KGkpO1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNOdW1lcmFsQ2hhcihjaGFyKSkge1xuICAgICAgICAgICAgICAgIGluZGV4ID0gaSArIHByZWZpeExlbmd0aDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaS0tO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGluZGV4ICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmlucHV0Py5uYXRpdmVFbGVtZW50LnNldFNlbGVjdGlvblJhbmdlKGluZGV4ICsgMSwgaW5kZXggKyAxKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGkgPSBzZWxlY3Rpb25TdGFydDtcbiAgICAgICAgICAgIHdoaWxlIChpIDwgdmFsdWVMZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBjaGFyID0gaW5wdXRWYWx1ZS5jaGFyQXQoaSk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNOdW1lcmFsQ2hhcihjaGFyKSkge1xuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IGkgKyBwcmVmaXhMZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpbmRleCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5wdXQ/Lm5hdGl2ZUVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2UoaW5kZXgsIGluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpbmRleCB8fCAwO1xuICAgIH1cblxuICAgIG9uSW5wdXRDbGljaygpIHtcbiAgICAgICAgY29uc3QgY3VycmVudFZhbHVlID0gdGhpcy5pbnB1dD8ubmF0aXZlRWxlbWVudC52YWx1ZTtcblxuICAgICAgICBpZiAoIXRoaXMucmVhZG9ubHkgJiYgY3VycmVudFZhbHVlICE9PSBEb21IYW5kbGVyLmdldFNlbGVjdGlvbigpKSB7XG4gICAgICAgICAgICB0aGlzLmluaXRDdXJzb3IoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzTnVtZXJhbENoYXIoY2hhcjogc3RyaW5nKSB7XG4gICAgICAgIGlmIChjaGFyLmxlbmd0aCA9PT0gMSAmJiAodGhpcy5fbnVtZXJhbC50ZXN0KGNoYXIpIHx8IHRoaXMuX2RlY2ltYWwudGVzdChjaGFyKSB8fCB0aGlzLl9ncm91cC50ZXN0KGNoYXIpIHx8IHRoaXMuX21pbnVzU2lnbi50ZXN0KGNoYXIpKSkge1xuICAgICAgICAgICAgdGhpcy5yZXNldFJlZ2V4KCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXNldFJlZ2V4KCkge1xuICAgICAgICB0aGlzLl9udW1lcmFsLmxhc3RJbmRleCA9IDA7XG4gICAgICAgIHRoaXMuX2RlY2ltYWwubGFzdEluZGV4ID0gMDtcbiAgICAgICAgdGhpcy5fZ3JvdXAubGFzdEluZGV4ID0gMDtcbiAgICAgICAgdGhpcy5fbWludXNTaWduLmxhc3RJbmRleCA9IDA7XG4gICAgfVxuXG4gICAgdXBkYXRlVmFsdWUoZXZlbnQ6IEV2ZW50LCB2YWx1ZVN0cjogTnVsbGFibGU8c3RyaW5nPiwgaW5zZXJ0ZWRWYWx1ZVN0cjogTnVsbGFibGU8c3RyaW5nPiwgb3BlcmF0aW9uOiBOdWxsYWJsZTxzdHJpbmc+KSB7XG4gICAgICAgIGxldCBjdXJyZW50VmFsdWUgPSB0aGlzLmlucHV0Py5uYXRpdmVFbGVtZW50LnZhbHVlO1xuICAgICAgICBsZXQgbmV3VmFsdWUgPSBudWxsO1xuXG4gICAgICAgIGlmICh2YWx1ZVN0ciAhPSBudWxsKSB7XG4gICAgICAgICAgICBuZXdWYWx1ZSA9IHRoaXMucGFyc2VWYWx1ZSh2YWx1ZVN0cik7XG4gICAgICAgICAgICBuZXdWYWx1ZSA9ICFuZXdWYWx1ZSAmJiAhdGhpcy5hbGxvd0VtcHR5ID8gMCA6IG5ld1ZhbHVlO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVJbnB1dChuZXdWYWx1ZSwgaW5zZXJ0ZWRWYWx1ZVN0ciwgb3BlcmF0aW9uLCB2YWx1ZVN0cik7XG5cbiAgICAgICAgICAgIHRoaXMuaGFuZGxlT25JbnB1dChldmVudCwgY3VycmVudFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVPbklucHV0KGV2ZW50OiBFdmVudCwgY3VycmVudFZhbHVlOiBzdHJpbmcsIG5ld1ZhbHVlOiBhbnkpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNWYWx1ZUNoYW5nZWQoY3VycmVudFZhbHVlLCBuZXdWYWx1ZSkpIHtcbiAgICAgICAgICAgICh0aGlzLmlucHV0IGFzIEVsZW1lbnRSZWYpLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB0aGlzLmZvcm1hdFZhbHVlKG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMuaW5wdXQ/Lm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLXZhbHVlbm93JywgbmV3VmFsdWUpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVNb2RlbChldmVudCwgbmV3VmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5vbklucHV0LmVtaXQoeyBvcmlnaW5hbEV2ZW50OiBldmVudCwgdmFsdWU6IG5ld1ZhbHVlLCBmb3JtYXR0ZWRWYWx1ZTogY3VycmVudFZhbHVlIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNWYWx1ZUNoYW5nZWQoY3VycmVudFZhbHVlOiBzdHJpbmcsIG5ld1ZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKG5ld1ZhbHVlID09PSBudWxsICYmIGN1cnJlbnRWYWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobmV3VmFsdWUgIT0gbnVsbCkge1xuICAgICAgICAgICAgbGV0IHBhcnNlZEN1cnJlbnRWYWx1ZSA9IHR5cGVvZiBjdXJyZW50VmFsdWUgPT09ICdzdHJpbmcnID8gdGhpcy5wYXJzZVZhbHVlKGN1cnJlbnRWYWx1ZSkgOiBjdXJyZW50VmFsdWU7XG4gICAgICAgICAgICByZXR1cm4gbmV3VmFsdWUgIT09IHBhcnNlZEN1cnJlbnRWYWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB2YWxpZGF0ZVZhbHVlKHZhbHVlOiBudW1iZXIgfCBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHZhbHVlID09PSAnLScgfHwgdmFsdWUgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5taW4gIT0gbnVsbCAmJiAodmFsdWUgYXMgbnVtYmVyKSA8IHRoaXMubWluKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5taW47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5tYXggIT0gbnVsbCAmJiAodmFsdWUgYXMgbnVtYmVyKSA+IHRoaXMubWF4KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tYXg7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgdXBkYXRlSW5wdXQodmFsdWU6IGFueSwgaW5zZXJ0ZWRWYWx1ZVN0cjogTnVsbGFibGU8c3RyaW5nPiwgb3BlcmF0aW9uOiBOdWxsYWJsZTxzdHJpbmc+LCB2YWx1ZVN0cjogTnVsbGFibGU8c3RyaW5nPikge1xuICAgICAgICBpbnNlcnRlZFZhbHVlU3RyID0gaW5zZXJ0ZWRWYWx1ZVN0ciB8fCAnJztcblxuICAgICAgICBsZXQgaW5wdXRWYWx1ZSA9IHRoaXMuaW5wdXQ/Lm5hdGl2ZUVsZW1lbnQudmFsdWU7XG4gICAgICAgIGxldCBuZXdWYWx1ZSA9IHRoaXMuZm9ybWF0VmFsdWUodmFsdWUpO1xuICAgICAgICBsZXQgY3VycmVudExlbmd0aCA9IGlucHV0VmFsdWUubGVuZ3RoO1xuXG4gICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gdmFsdWVTdHIpIHtcbiAgICAgICAgICAgIG5ld1ZhbHVlID0gdGhpcy5jb25jYXRWYWx1ZXMobmV3VmFsdWUsIHZhbHVlU3RyIGFzIHN0cmluZyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY3VycmVudExlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlID0gbmV3VmFsdWU7XG4gICAgICAgICAgICB0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2UoMCwgMCk7XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuaW5pdEN1cnNvcigpO1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0aW9uRW5kID0gaW5kZXggKyBpbnNlcnRlZFZhbHVlU3RyLmxlbmd0aDtcbiAgICAgICAgICAgIHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudC5zZXRTZWxlY3Rpb25SYW5nZShzZWxlY3Rpb25FbmQsIHNlbGVjdGlvbkVuZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgc2VsZWN0aW9uU3RhcnQgPSB0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQ7XG4gICAgICAgICAgICBsZXQgc2VsZWN0aW9uRW5kID0gdGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50LnNlbGVjdGlvbkVuZDtcblxuICAgICAgICAgICAgaWYgKHRoaXMubWF4bGVuZ3RoICYmIG5ld1ZhbHVlLmxlbmd0aCA+IHRoaXMubWF4bGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgbmV3VmFsdWUgPSBuZXdWYWx1ZS5zbGljZSgwLCB0aGlzLm1heGxlbmd0aCk7XG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uU3RhcnQgPSBNYXRoLm1pbihzZWxlY3Rpb25TdGFydCwgdGhpcy5tYXhsZW5ndGgpO1xuICAgICAgICAgICAgICAgIHNlbGVjdGlvbkVuZCA9IE1hdGgubWluKHNlbGVjdGlvbkVuZCwgdGhpcy5tYXhsZW5ndGgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5tYXhsZW5ndGggJiYgdGhpcy5tYXhsZW5ndGggPCBuZXdWYWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICAgICAgbGV0IG5ld0xlbmd0aCA9IG5ld1ZhbHVlLmxlbmd0aDtcblxuICAgICAgICAgICAgaWYgKG9wZXJhdGlvbiA9PT0gJ3JhbmdlLWluc2VydCcpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzdGFydFZhbHVlID0gdGhpcy5wYXJzZVZhbHVlKChpbnB1dFZhbHVlIHx8ICcnKS5zbGljZSgwLCBzZWxlY3Rpb25TdGFydCkpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0YXJ0VmFsdWVTdHIgPSBzdGFydFZhbHVlICE9PSBudWxsID8gc3RhcnRWYWx1ZS50b1N0cmluZygpIDogJyc7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhcnRFeHByID0gc3RhcnRWYWx1ZVN0ci5zcGxpdCgnJykuam9pbihgKCR7dGhpcy5ncm91cENoYXJ9KT9gKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzUmVnZXggPSBuZXcgUmVnRXhwKHN0YXJ0RXhwciwgJ2cnKTtcbiAgICAgICAgICAgICAgICBzUmVnZXgudGVzdChuZXdWYWx1ZSk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCB0RXhwciA9IGluc2VydGVkVmFsdWVTdHIuc3BsaXQoJycpLmpvaW4oYCgke3RoaXMuZ3JvdXBDaGFyfSk/YCk7XG4gICAgICAgICAgICAgICAgY29uc3QgdFJlZ2V4ID0gbmV3IFJlZ0V4cCh0RXhwciwgJ2cnKTtcbiAgICAgICAgICAgICAgICB0UmVnZXgudGVzdChuZXdWYWx1ZS5zbGljZShzUmVnZXgubGFzdEluZGV4KSk7XG5cbiAgICAgICAgICAgICAgICBzZWxlY3Rpb25FbmQgPSBzUmVnZXgubGFzdEluZGV4ICsgdFJlZ2V4Lmxhc3RJbmRleDtcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2Uoc2VsZWN0aW9uRW5kLCBzZWxlY3Rpb25FbmQpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChuZXdMZW5ndGggPT09IGN1cnJlbnRMZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBpZiAob3BlcmF0aW9uID09PSAnaW5zZXJ0JyB8fCBvcGVyYXRpb24gPT09ICdkZWxldGUtYmFjay1zaW5nbGUnKSB0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2Uoc2VsZWN0aW9uRW5kICsgMSwgc2VsZWN0aW9uRW5kICsgMSk7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAob3BlcmF0aW9uID09PSAnZGVsZXRlLXNpbmdsZScpIHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudC5zZXRTZWxlY3Rpb25SYW5nZShzZWxlY3Rpb25FbmQgLSAxLCBzZWxlY3Rpb25FbmQgLSAxKTtcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChvcGVyYXRpb24gPT09ICdkZWxldGUtcmFuZ2UnIHx8IG9wZXJhdGlvbiA9PT0gJ3NwaW4nKSB0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2Uoc2VsZWN0aW9uRW5kLCBzZWxlY3Rpb25FbmQpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChvcGVyYXRpb24gPT09ICdkZWxldGUtYmFjay1zaW5nbGUnKSB7XG4gICAgICAgICAgICAgICAgbGV0IHByZXZDaGFyID0gaW5wdXRWYWx1ZS5jaGFyQXQoc2VsZWN0aW9uRW5kIC0gMSk7XG4gICAgICAgICAgICAgICAgbGV0IG5leHRDaGFyID0gaW5wdXRWYWx1ZS5jaGFyQXQoc2VsZWN0aW9uRW5kKTtcbiAgICAgICAgICAgICAgICBsZXQgZGlmZiA9IGN1cnJlbnRMZW5ndGggLSBuZXdMZW5ndGg7XG4gICAgICAgICAgICAgICAgbGV0IGlzR3JvdXBDaGFyID0gdGhpcy5fZ3JvdXAudGVzdChuZXh0Q2hhcik7XG5cbiAgICAgICAgICAgICAgICBpZiAoaXNHcm91cENoYXIgJiYgZGlmZiA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb25FbmQgKz0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFpc0dyb3VwQ2hhciAmJiB0aGlzLmlzTnVtZXJhbENoYXIocHJldkNoYXIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbkVuZCArPSAtMSAqIGRpZmYgKyAxO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuX2dyb3VwLmxhc3RJbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50LnNldFNlbGVjdGlvblJhbmdlKHNlbGVjdGlvbkVuZCwgc2VsZWN0aW9uRW5kKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaW5wdXRWYWx1ZSA9PT0gJy0nICYmIG9wZXJhdGlvbiA9PT0gJ2luc2VydCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2UoMCwgMCk7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmluaXRDdXJzb3IoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3Rpb25FbmQgPSBpbmRleCArIGluc2VydGVkVmFsdWVTdHIubGVuZ3RoICsgMTtcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2Uoc2VsZWN0aW9uRW5kLCBzZWxlY3Rpb25FbmQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb25FbmQgPSBzZWxlY3Rpb25FbmQgKyAobmV3TGVuZ3RoIC0gY3VycmVudExlbmd0aCk7XG4gICAgICAgICAgICAgICAgdGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50LnNldFNlbGVjdGlvblJhbmdlKHNlbGVjdGlvbkVuZCwgc2VsZWN0aW9uRW5kKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtdmFsdWVub3cnLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgY29uY2F0VmFsdWVzKHZhbDE6IHN0cmluZywgdmFsMjogc3RyaW5nKSB7XG4gICAgICAgIGlmICh2YWwxICYmIHZhbDIpIHtcbiAgICAgICAgICAgIGxldCBkZWNpbWFsQ2hhckluZGV4ID0gdmFsMi5zZWFyY2godGhpcy5fZGVjaW1hbCk7XG4gICAgICAgICAgICB0aGlzLl9kZWNpbWFsLmxhc3RJbmRleCA9IDA7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnN1ZmZpeENoYXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsMS5yZXBsYWNlKHRoaXMuc3VmZml4Q2hhciwgJycpLnNwbGl0KHRoaXMuX2RlY2ltYWwpWzBdICsgdmFsMi5yZXBsYWNlKHRoaXMuc3VmZml4Q2hhciwgJycpLnNsaWNlKGRlY2ltYWxDaGFySW5kZXgpICsgdGhpcy5zdWZmaXhDaGFyO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVjaW1hbENoYXJJbmRleCAhPT0gLTEgPyB2YWwxLnNwbGl0KHRoaXMuX2RlY2ltYWwpWzBdICsgdmFsMi5zbGljZShkZWNpbWFsQ2hhckluZGV4KSA6IHZhbDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbDE7XG4gICAgfVxuXG4gICAgZ2V0RGVjaW1hbExlbmd0aCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgY29uc3QgdmFsdWVTcGxpdCA9IHZhbHVlLnNwbGl0KHRoaXMuX2RlY2ltYWwpO1xuXG4gICAgICAgICAgICBpZiAodmFsdWVTcGxpdC5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWVTcGxpdFsxXVxuICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSh0aGlzLl9zdWZmaXggYXMgUmVnRXhwLCAnJylcbiAgICAgICAgICAgICAgICAgICAgLnRyaW0oKVxuICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFxzL2csICcnKVxuICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSh0aGlzLl9jdXJyZW5jeSBhcyBSZWdFeHAsICcnKS5sZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICBvbklucHV0Rm9jdXMoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIHRoaXMuZm9jdXNlZCA9IHRydWU7XG4gICAgICAgIHRoaXMub25Gb2N1cy5lbWl0KGV2ZW50KTtcbiAgICB9XG5cbiAgICBvbklucHV0Qmx1cihldmVudDogRXZlbnQpIHtcbiAgICAgICAgdGhpcy5mb2N1c2VkID0gZmFsc2U7XG5cbiAgICAgICAgbGV0IG5ld1ZhbHVlID0gdGhpcy52YWxpZGF0ZVZhbHVlKHRoaXMucGFyc2VWYWx1ZSh0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUpKTtcblxuICAgICAgICB0aGlzLm9uQmx1ci5lbWl0KGV2ZW50KTtcblxuICAgICAgICB0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB0aGlzLmZvcm1hdFZhbHVlKG5ld1ZhbHVlKTtcbiAgICAgICAgdGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS12YWx1ZW5vdycsIG5ld1ZhbHVlKTtcbiAgICAgICAgdGhpcy51cGRhdGVNb2RlbChldmVudCwgbmV3VmFsdWUpO1xuICAgIH1cblxuICAgIGZvcm1hdHRlZFZhbHVlKCkge1xuICAgICAgICBjb25zdCB2YWwgPSAhdGhpcy52YWx1ZSAmJiAhdGhpcy5hbGxvd0VtcHR5ID8gMCA6IHRoaXMudmFsdWU7XG4gICAgICAgIHJldHVybiB0aGlzLmZvcm1hdFZhbHVlKHZhbCk7XG4gICAgfVxuXG4gICAgdXBkYXRlTW9kZWwoZXZlbnQ6IEV2ZW50LCB2YWx1ZTogYW55KSB7XG4gICAgICAgIGNvbnN0IGlzQmx1clVwZGF0ZU9uTW9kZSA9IHRoaXMubmdDb250cm9sPy5jb250cm9sPy51cGRhdGVPbiA9PT0gJ2JsdXInO1xuXG4gICAgICAgIGlmICh0aGlzLnZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuXG4gICAgICAgICAgICBpZiAoIShpc0JsdXJVcGRhdGVPbk1vZGUgJiYgdGhpcy5mb2N1c2VkKSkge1xuICAgICAgICAgICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoaXNCbHVyVXBkYXRlT25Nb2RlKSB7XG4gICAgICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQoKTtcbiAgICB9XG5cbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkID0gZm47XG4gICAgfVxuXG4gICAgc2V0RGlzYWJsZWRTdGF0ZSh2YWw6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IHZhbDtcbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBnZXQgZmlsbGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZSAhPSBudWxsICYmIHRoaXMudmFsdWUudG9TdHJpbmcoKS5sZW5ndGggPiAwO1xuICAgIH1cblxuICAgIGNsZWFyVGltZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnRpbWVyKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMudGltZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0Rm9ybWF0dGVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5udW1iZXJGb3JtYXQ7XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIElucHV0VGV4dE1vZHVsZSwgQnV0dG9uTW9kdWxlLCBUaW1lc0ljb24sIEFuZ2xlVXBJY29uLCBBbmdsZURvd25JY29uXSxcbiAgICBleHBvcnRzOiBbSW5wdXROdW1iZXIsIFNoYXJlZE1vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbSW5wdXROdW1iZXJdXG59KVxuZXhwb3J0IGNsYXNzIElucHV0TnVtYmVyTW9kdWxlIHt9XG4iXX0=