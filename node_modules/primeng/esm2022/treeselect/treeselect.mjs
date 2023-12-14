import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, forwardRef, Input, NgModule, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { ChevronDownIcon } from 'primeng/icons/chevrondown';
import { SearchIcon } from 'primeng/icons/search';
import { TimesIcon } from 'primeng/icons/times';
import { OverlayModule } from 'primeng/overlay';
import { RippleModule } from 'primeng/ripple';
import { TreeModule } from 'primeng/tree';
import { ObjectUtils, UniqueComponentId } from 'primeng/utils';
import * as i0 from "@angular/core";
import * as i1 from "primeng/api";
import * as i2 from "@angular/common";
import * as i3 from "primeng/overlay";
import * as i4 from "primeng/tree";
export const TREESELECT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TreeSelect),
    multi: true
};
/**
 * TreeSelect is a form component to choose from hierarchical data.
 * @group Components
 */
export class TreeSelect {
    config;
    cd;
    el;
    overlayService;
    /**
     * Identifier of the underlying input element.
     * @group Props
     */
    inputId;
    /**
     * Height of the viewport, a scrollbar is defined if height of list exceeds this value.
     * @group Props
     */
    scrollHeight = '400px';
    /**
     * When present, it specifies that the component should be disabled.
     * @group Props
     */
    disabled;
    /**
     * Defines how multiple items can be selected, when true metaKey needs to be pressed to select or unselect an item and when set to false selection of each item can be toggled individually. On touch enabled devices, metaKeySelection is turned off automatically.
     * @group Props
     */
    metaKeySelection = true;
    /**
     * Defines how the selected items are displayed.
     * @group Props
     */
    display = 'comma';
    /**
     * Defines the selection mode.
     * @group Props
     */
    selectionMode = 'single';
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    tabindex = '0';
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
     * Label to display when there are no selections.
     * @group Props
     */
    placeholder;
    /**
     * Style class of the overlay panel.
     * @group Props
     */
    panelClass;
    /**
     * Inline style of the panel element.
     * @group Props
     */
    panelStyle;
    /**
     * Style class of the panel element.
     * @group Props
     */
    panelStyleClass;
    /**
     * Inline style of the container element.
     * @group Props
     */
    containerStyle;
    /**
     * Style class of the container element.
     * @group Props
     */
    containerStyleClass;
    /**
     * Inline style of the label element.
     * @group Props
     */
    labelStyle;
    /**
     * Style class of the label element.
     * @group Props
     */
    labelStyleClass;
    /**
     * Specifies the options for the overlay.
     * @group Props
     */
    overlayOptions;
    /**
     * Text to display when there are no options available. Defaults to value from PrimeNG locale configuration.
     * @group Props
     */
    emptyMessage = '';
    /**
     * A valid query selector or an HTMLElement to specify where the overlay gets attached. Special keywords are "body" for document body and "self" for the element itself.
     * @group Props
     */
    appendTo;
    /**
     * When specified, displays an input field to filter the items.
     * @group Props
     */
    filter = false;
    /**
     * When filtering is enabled, filterBy decides which field or fields (comma separated) to search against.
     * @group Props
     */
    filterBy = 'label';
    /**
     * Mode for filtering valid values are "lenient" and "strict". Default is lenient.
     * @group Props
     */
    filterMode = 'lenient';
    /**
     * Placeholder text to show when filter input is empty.
     * @group Props
     */
    filterPlaceholder;
    /**
     * Locale to use in filtering. The default locale is the host environment's current locale.
     * @group Props
     */
    filterLocale;
    /**
     * Determines whether the filter input should be automatically focused when the component is rendered.
     * @group Props
     */
    filterInputAutoFocus = true;
    /**
     * Whether checkbox selections propagate to descendant nodes.
     * @group Props
     */
    propagateSelectionDown = true;
    /**
     * Whether checkbox selections propagate to ancestor nodes.
     * @group Props
     */
    propagateSelectionUp = true;
    /**
     * When enabled, a clear icon is displayed to clear the value.
     * @group Props
     */
    showClear = false;
    /**
     * Clears the filter value when hiding the dropdown.
     * @group Props
     */
    resetFilterOnHide = true;
    /**
     * An array of treenodes.
     * @defaultValue undefined
     * @group Props
     */
    get options() {
        return this._options;
    }
    set options(options) {
        this._options = options;
        this.updateTreeState();
    }
    /**
     * Transition options of the show animation.
     * @group Props
     * @deprecated since v14.2.0 use overlayOptions property instead.
     */
    get showTransitionOptions() {
        return this._showTransitionOptions;
    }
    set showTransitionOptions(val) {
        this._showTransitionOptions = val;
        console.warn('The showTransitionOptions property is deprecated since v14.2.0, use overlayOptions property instead.');
    }
    /**
     * Transition options of the hide animation.
     * @group Props
     * @deprecated since v14.2.0 use overlayOptions property instead.
     */
    get hideTransitionOptions() {
        return this._hideTransitionOptions;
    }
    set hideTransitionOptions(val) {
        this._hideTransitionOptions = val;
        console.warn('The hideTransitionOptions property is deprecated since v14.2.0, use overlayOptions property instead.');
    }
    /**
     * Callback to invoke when a node is expanded.
     * @param {TreeSelectNodeExpandEvent} event - Custom node expand event.
     * @group Emits
     */
    onNodeExpand = new EventEmitter();
    /**
     * Callback to invoke when a node is collapsed.
     * @param {TreeSelectNodeCollapseEvent} event - Custom node collapse event.
     * @group Emits
     */
    onNodeCollapse = new EventEmitter();
    /**
     * Callback to invoke when the overlay is shown.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onShow = new EventEmitter();
    /**
     * Callback to invoke when the overlay is hidden.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onHide = new EventEmitter();
    /**
     * Callback to invoke when input field is cleared.
     * @group Emits
     */
    onClear = new EventEmitter();
    /**
     * Callback to invoke when data is filtered.
     * @group Emits
     */
    onFilter = new EventEmitter();
    /**
     * Callback to invoke when a node is unselected.
     * @param {TreeNode} node - Node instance.
     * @group Emits
     */
    onNodeUnselect = new EventEmitter();
    /**
     * Callback to invoke when a node is selected.
     * @param {TreeNode} node - Node instance.
     * @group Emits
     */
    onNodeSelect = new EventEmitter();
    _showTransitionOptions;
    _hideTransitionOptions;
    templates;
    containerEl;
    focusInput;
    filterViewChild;
    treeViewChild;
    panelEl;
    overlayViewChild;
    firstHiddenFocusableElementOnOverlay;
    lastHiddenFocusableElementOnOverlay;
    filteredNodes;
    filterValue = null;
    serializedValue;
    valueTemplate;
    headerTemplate;
    emptyTemplate;
    footerTemplate;
    clearIconTemplate;
    triggerIconTemplate;
    filterIconTemplate;
    closeIconTemplate;
    itemTogglerIconTemplate;
    itemCheckboxIconTemplate;
    itemLoadingIconTemplate;
    focused;
    overlayVisible;
    selfChange;
    value;
    expandedNodes = [];
    _options;
    templateMap;
    onModelChange = () => { };
    onModelTouched = () => { };
    listId = '';
    constructor(config, cd, el, overlayService) {
        this.config = config;
        this.cd = cd;
        this.el = el;
        this.overlayService = overlayService;
    }
    ngOnInit() {
        this.listId = UniqueComponentId() + '_list';
        this.updateTreeState();
    }
    ngAfterContentInit() {
        if (this.templates.length) {
            this.templateMap = {};
        }
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'value':
                    this.valueTemplate = item.template;
                    break;
                case 'header':
                    this.headerTemplate = item.template;
                    break;
                case 'empty':
                    this.emptyTemplate = item.template;
                    break;
                case 'footer':
                    this.footerTemplate = item.template;
                    break;
                case 'clearicon':
                    this.clearIconTemplate = item.template;
                    break;
                case 'triggericon':
                    this.triggerIconTemplate = item.template;
                    break;
                case 'filtericon':
                    this.filterIconTemplate = item.template;
                    break;
                case 'closeicon':
                    this.closeIconTemplate = item.template;
                    break;
                case 'itemtogglericon':
                    this.itemTogglerIconTemplate = item.template;
                    break;
                case 'itemcheckboxicon':
                    this.itemCheckboxIconTemplate = item.template;
                    break;
                case 'itemloadingicon':
                    this.itemLoadingIconTemplate = item.template;
                    break;
                default: //TODO: @deprecated Used "value" template instead
                    if (item.name)
                        this.templateMap[item.name] = item.template;
                    else
                        this.valueTemplate = item.template;
                    break;
            }
        });
    }
    onOverlayAnimationStart(event) {
        switch (event.toState) {
            case 'visible':
                if (this.filter) {
                    ObjectUtils.isNotEmpty(this.filterValue) && this.treeViewChild?._filter(this.filterValue);
                    this.filterInputAutoFocus && this.filterViewChild?.nativeElement.focus();
                }
                else {
                    let focusableElements = DomHandler.getFocusableElements(this.panelEl.nativeElement);
                    if (focusableElements && focusableElements.length > 0) {
                        focusableElements[0].focus();
                    }
                }
                break;
        }
    }
    onSelectionChange(event) {
        this.value = event;
        this.onModelChange(this.value);
        this.cd.markForCheck();
    }
    onClick(event) {
        if (this.disabled) {
            return;
        }
        if (!this.overlayViewChild?.el?.nativeElement?.contains(event.target) && !DomHandler.hasClass(event.target, 'p-treeselect-close')) {
            if (this.overlayVisible) {
                this.hide();
            }
            else {
                this.show();
            }
            this.focusInput?.nativeElement.focus();
        }
    }
    onKeyDown(event) {
        switch (event.code) {
            //down
            case 'ArrowDown':
                if (!this.overlayVisible) {
                    this.show();
                    event.preventDefault();
                }
                this.onArrowDown(event);
                event.preventDefault();
                break;
            //space
            case 'Space':
            case 'Enter':
                if (!this.overlayVisible) {
                    this.show();
                    event.preventDefault();
                }
                break;
            //escape
            case 'Escape':
                if (this.overlayVisible) {
                    this.hide();
                    this.focusInput?.nativeElement.focus();
                    event.preventDefault();
                }
                break;
            //tab
            case 'Tab':
                this.onTabKey(event);
                break;
            default:
                break;
        }
    }
    onFilterInput(event) {
        this.filterValue = event.target.value;
        this.treeViewChild?._filter(this.filterValue);
        this.onFilter.emit({
            originalEvent: event,
            filteredValue: this.treeViewChild?.filteredNodes
        });
    }
    onArrowDown(event) {
        if (this.overlayVisible && this.panelEl?.nativeElement) {
            let focusableElements = DomHandler.getFocusableElements(this.panelEl.nativeElement, '.p-treenode');
            if (focusableElements && focusableElements.length > 0) {
                focusableElements[0].focus();
            }
            event.preventDefault();
        }
    }
    onFirstHiddenFocus(event) {
        const focusableEl = event.relatedTarget === this.focusInput?.nativeElement ? DomHandler.getFirstFocusableElement(this.overlayViewChild?.overlayViewChild?.nativeElement, ':not([data-p-hidden-focusable="true"])') : this.focusInput?.nativeElement;
        DomHandler.focus(focusableEl);
    }
    onLastHiddenFocus(event) {
        const focusableEl = event.relatedTarget === this.focusInput?.nativeElement ? DomHandler.getLastFocusableElement(this.overlayViewChild?.overlayViewChild?.nativeElement, ':not([data-p-hidden-focusable="true"])') : this.focusInput?.nativeElement;
        DomHandler.focus(focusableEl);
    }
    show() {
        this.overlayVisible = true;
    }
    hide(event) {
        this.overlayVisible = false;
        this.resetFilter();
        this.onHide.emit(event);
        this.cd.markForCheck();
    }
    clear(event) {
        this.value = null;
        this.resetExpandedNodes();
        this.resetPartialSelected();
        this.onModelChange(this.value);
        this.onClear.emit();
        event.stopPropagation();
    }
    checkValue() {
        return this.value !== null && ObjectUtils.isNotEmpty(this.value);
    }
    onTabKey(event, pressedInInputText = false) {
        if (!pressedInInputText) {
            if (this.overlayVisible && this.hasFocusableElements()) {
                DomHandler.focus(event.shiftKey ? this.lastHiddenFocusableElementOnOverlay.nativeElement : this.firstHiddenFocusableElementOnOverlay.nativeElement);
                event.preventDefault();
            }
            else {
                this.overlayVisible && this.hide(this.filter);
            }
        }
    }
    hasFocusableElements() {
        return DomHandler.getFocusableElements(this.overlayViewChild.overlayViewChild.nativeElement, ':not([data-p-hidden-focusable="true"])').length > 0;
    }
    resetFilter() {
        if (this.filter && !this.resetFilterOnHide) {
            this.filteredNodes = this.treeViewChild?.filteredNodes;
            this.treeViewChild?.resetFilter();
        }
        else {
            this.filterValue = null;
        }
    }
    updateTreeState() {
        if (this.value) {
            let selectedNodes = this.selectionMode === 'single' ? [this.value] : [...this.value];
            this.resetExpandedNodes();
            this.resetPartialSelected();
            if (selectedNodes && this.options) {
                this.updateTreeBranchState(null, null, selectedNodes);
            }
        }
    }
    updateTreeBranchState(node, path, selectedNodes) {
        if (node) {
            if (this.isSelected(node)) {
                this.expandPath(path);
                selectedNodes.splice(selectedNodes.indexOf(node), 1);
            }
            if (selectedNodes.length > 0 && node.children) {
                for (let childNode of node.children) {
                    this.updateTreeBranchState(childNode, [...path, node], selectedNodes);
                }
            }
        }
        else {
            for (let childNode of this.options) {
                this.updateTreeBranchState(childNode, [], selectedNodes);
            }
        }
    }
    expandPath(expandedNodes) {
        for (let node of expandedNodes) {
            node.expanded = true;
        }
        this.expandedNodes = [...expandedNodes];
    }
    nodeExpand(event) {
        this.onNodeExpand.emit(event);
        this.expandedNodes.push(event.node);
    }
    nodeCollapse(event) {
        this.onNodeCollapse.emit(event);
        this.expandedNodes.splice(this.expandedNodes.indexOf(event.node), 1);
    }
    resetExpandedNodes() {
        for (let node of this.expandedNodes) {
            node.expanded = false;
        }
        this.expandedNodes = [];
    }
    resetPartialSelected(nodes = this.options) {
        if (!nodes) {
            return;
        }
        for (let node of nodes) {
            node.partialSelected = false;
            if (node.children && node.children?.length > 0) {
                this.resetPartialSelected(node.children);
            }
        }
    }
    findSelectedNodes(node, keys, selectedNodes) {
        if (node) {
            if (this.isSelected(node)) {
                selectedNodes.push(node);
                delete keys[node.key];
            }
            if (Object.keys(keys).length && node.children) {
                for (let childNode of node.children) {
                    this.findSelectedNodes(childNode, keys, selectedNodes);
                }
            }
        }
        else {
            for (let childNode of this.options) {
                this.findSelectedNodes(childNode, keys, selectedNodes);
            }
        }
    }
    isSelected(node) {
        return this.findIndexInSelection(node) != -1;
    }
    findIndexInSelection(node) {
        let index = -1;
        if (this.value) {
            if (this.selectionMode === 'single') {
                let areNodesEqual = (this.value.key && this.value.key === node.key) || this.value == node;
                index = areNodesEqual ? 0 : -1;
            }
            else {
                for (let i = 0; i < this.value.length; i++) {
                    let selectedNode = this.value[i];
                    let areNodesEqual = (selectedNode.key && selectedNode.key === node.key) || selectedNode == node;
                    if (areNodesEqual) {
                        index = i;
                        break;
                    }
                }
            }
        }
        return index;
    }
    onSelect(event) {
        this.onNodeSelect.emit(event);
        if (this.selectionMode === 'single') {
            this.hide();
            this.focusInput?.nativeElement.focus();
        }
    }
    onUnselect(event) {
        this.onNodeUnselect.emit(event);
    }
    onFocus() {
        this.focused = true;
    }
    onBlur() {
        this.focused = false;
    }
    writeValue(value) {
        this.value = value;
        this.updateTreeState();
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
    containerClass() {
        return {
            'p-treeselect p-component p-inputwrapper': true,
            'p-treeselect-chip': this.display === 'chip',
            'p-disabled': this.disabled,
            'p-focus': this.focused
        };
    }
    labelClass() {
        return {
            'p-treeselect-label': true,
            'p-placeholder': this.label === this.placeholder,
            'p-treeselect-label-empty': !this.placeholder && this.emptyValue
        };
    }
    get emptyValue() {
        return !this.value || Object.keys(this.value).length === 0;
    }
    get emptyOptions() {
        return !this.options || this.options.length === 0;
    }
    get label() {
        let value = this.value || [];
        return value.length ? value.map((node) => node.label).join(', ') : this.selectionMode === 'single' && this.value ? value.label : this.placeholder;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: TreeSelect, deps: [{ token: i1.PrimeNGConfig }, { token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i1.OverlayService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.5", type: TreeSelect, selector: "p-treeSelect", inputs: { inputId: "inputId", scrollHeight: "scrollHeight", disabled: "disabled", metaKeySelection: "metaKeySelection", display: "display", selectionMode: "selectionMode", tabindex: "tabindex", ariaLabel: "ariaLabel", ariaLabelledBy: "ariaLabelledBy", placeholder: "placeholder", panelClass: "panelClass", panelStyle: "panelStyle", panelStyleClass: "panelStyleClass", containerStyle: "containerStyle", containerStyleClass: "containerStyleClass", labelStyle: "labelStyle", labelStyleClass: "labelStyleClass", overlayOptions: "overlayOptions", emptyMessage: "emptyMessage", appendTo: "appendTo", filter: "filter", filterBy: "filterBy", filterMode: "filterMode", filterPlaceholder: "filterPlaceholder", filterLocale: "filterLocale", filterInputAutoFocus: "filterInputAutoFocus", propagateSelectionDown: "propagateSelectionDown", propagateSelectionUp: "propagateSelectionUp", showClear: "showClear", resetFilterOnHide: "resetFilterOnHide", options: "options", showTransitionOptions: "showTransitionOptions", hideTransitionOptions: "hideTransitionOptions" }, outputs: { onNodeExpand: "onNodeExpand", onNodeCollapse: "onNodeCollapse", onShow: "onShow", onHide: "onHide", onClear: "onClear", onFilter: "onFilter", onNodeUnselect: "onNodeUnselect", onNodeSelect: "onNodeSelect" }, host: { properties: { "class.p-inputwrapper-filled": "!emptyValue", "class.p-inputwrapper-focus": "focused", "class.p-treeselect-clearable": "showClear && !disabled" }, classAttribute: "p-element p-inputwrapper" }, providers: [TREESELECT_VALUE_ACCESSOR], queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "containerEl", first: true, predicate: ["container"], descendants: true }, { propertyName: "focusInput", first: true, predicate: ["focusInput"], descendants: true }, { propertyName: "filterViewChild", first: true, predicate: ["filter"], descendants: true }, { propertyName: "treeViewChild", first: true, predicate: ["tree"], descendants: true }, { propertyName: "panelEl", first: true, predicate: ["panel"], descendants: true }, { propertyName: "overlayViewChild", first: true, predicate: ["overlay"], descendants: true }, { propertyName: "firstHiddenFocusableElementOnOverlay", first: true, predicate: ["firstHiddenFocusableEl"], descendants: true }, { propertyName: "lastHiddenFocusableElementOnOverlay", first: true, predicate: ["lastHiddenFocusableEl"], descendants: true }], ngImport: i0, template: `
        <div #container [ngClass]="containerClass()" [class]="containerStyleClass" [ngStyle]="containerStyle" (click)="onClick($event)">
            <div class="p-hidden-accessible">
                <input
                    #focusInput
                    type="text"
                    role="combobox"
                    [attr.id]="inputId"
                    readonly
                    [disabled]="disabled"
                    (focus)="onFocus()"
                    (blur)="onBlur()"
                    (keydown)="onKeyDown($event)"
                    [attr.tabindex]="!disabled ? tabindex : -1"
                    [attr.aria-controls]="listId"
                    [attr.aria-haspopup]="'tree'"
                    [attr.aria-expanded]="overlayVisible"
                    [attr.aria-labelledby]="ariaLabelledBy"
                    [attr.aria-label]="ariaLabel || (label === 'p-emptylabel' ? undefined : label)"
                />
            </div>
            <div class="p-treeselect-label-container">
                <div [ngClass]="labelClass()" [class]="labelStyleClass" [ngStyle]="labelStyle">
                    <ng-container *ngIf="valueTemplate; else defaultValueTemplate">
                        <ng-container *ngTemplateOutlet="valueTemplate; context: { $implicit: value, placeholder: placeholder }"></ng-container>
                    </ng-container>
                    <ng-template #defaultValueTemplate>
                        <ng-container *ngIf="display === 'comma'; else chipsValueTemplate">
                            {{ label || 'empty' }}
                        </ng-container>
                        <ng-template #chipsValueTemplate>
                            <div *ngFor="let node of value" class="p-treeselect-token">
                                <span class="p-treeselect-token-label">{{ node.label }}</span>
                            </div>
                            <ng-container *ngIf="emptyValue">{{ placeholder || 'empty' }}</ng-container>
                        </ng-template>
                    </ng-template>
                </div>
                <ng-container *ngIf="checkValue() && !disabled && showClear">
                    <TimesIcon *ngIf="!clearIconTemplate" [styleClass]="'p-treeselect-clear-icon'" (click)="clear($event)" />
                    <span *ngIf="clearIconTemplate" class="p-treeselect-clear-icon" (click)="clear($event)">
                        <ng-template *ngTemplateOutlet="clearIconTemplate"></ng-template>
                    </span>
                </ng-container>
            </div>
            <div class="p-treeselect-trigger" role="button" aria-haspopup="tree" [attr.aria-expanded]="overlayVisible">
                <ChevronDownIcon *ngIf="!triggerIconTemplate" [styleClass]="'p-treeselect-trigger-icon'" />
                <span *ngIf="triggerIconTemplate" class="p-treeselect-trigger-icon">
                    <ng-template *ngTemplateOutlet="triggerIconTemplate"></ng-template>
                </span>
            </div>
            <p-overlay
                #overlay
                [(visible)]="overlayVisible"
                [options]="overlayOptions"
                [target]="'@parent'"
                [appendTo]="appendTo"
                [showTransitionOptions]="showTransitionOptions"
                [hideTransitionOptions]="hideTransitionOptions"
                (onAnimationStart)="onOverlayAnimationStart($event)"
                (onShow)="onShow.emit($event)"
                (onHide)="hide($event)"
            >
                <ng-template pTemplate="content">
                    <div #panel class="p-treeselect-panel p-component" [ngStyle]="panelStyle" [class]="panelStyleClass" [ngClass]="panelClass">
                        <span
                            #firstHiddenFocusableEl
                            role="presentation"
                            [attr.aria-hidden]="'true'"
                            class="p-hidden-accessible p-hidden-focusable"
                            [attr.tabindex]="0"
                            (focus)="onFirstHiddenFocus($event)"
                            [attr.data-p-hidden-accessible]="true"
                            [attr.data-p-hidden-focusable]="true"
                        >
                        </span>
                        <ng-container *ngTemplateOutlet="headerTemplate; context: { $implicit: value, options: options }"></ng-container>
                        <div class="p-treeselect-header" *ngIf="filter" (keydown.arrowdown)="onArrowDown($event)">
                            <div class="p-treeselect-filter-container">
                                <input
                                    #filter
                                    type="text"
                                    autocomplete="off"
                                    class="p-treeselect-filter p-inputtext p-component"
                                    [attr.placeholder]="filterPlaceholder"
                                    (keydown.enter)="$event.preventDefault()"
                                    (input)="onFilterInput($event)"
                                    [value]="filterValue"
                                />
                                <SearchIcon *ngIf="!filterIconTemplate" [styleClass]="'p-treeselect-filter-icon'" />
                                <span *ngIf="filterIconTemplate" class="p-treeselect-filter-icon">
                                    <ng-template *ngTemplateOutlet="filterIconTemplate"></ng-template>
                                </span>
                            </div>
                            <button class="p-treeselect-close p-link" (click)="hide()">
                                <TimesIcon *ngIf="!closeIconTemplate" />
                                <span *ngIf="closeIconTemplate">
                                    <ng-template *ngTemplateOutlet="closeIconTemplate"></ng-template>
                                </span>
                            </button>
                        </div>
                        <div class="p-treeselect-items-wrapper" [ngStyle]="{ 'max-height': scrollHeight }">
                            <p-tree
                                #tree
                                [value]="options"
                                [propagateSelectionDown]="propagateSelectionDown"
                                [propagateSelectionUp]="propagateSelectionUp"
                                [selectionMode]="selectionMode"
                                (selectionChange)="onSelectionChange($event)"
                                [selection]="value"
                                [metaKeySelection]="metaKeySelection"
                                (onNodeExpand)="nodeExpand($event)"
                                (onNodeCollapse)="nodeCollapse($event)"
                                (onNodeSelect)="onSelect($event)"
                                [emptyMessage]="emptyMessage"
                                (onNodeUnselect)="onUnselect($event)"
                                [filterBy]="filterBy"
                                [filterMode]="filterMode"
                                [filterPlaceholder]="filterPlaceholder"
                                [filterLocale]="filterLocale"
                                [filteredNodes]="filteredNodes"
                                [_templateMap]="templateMap"
                            >
                                <ng-container *ngIf="emptyTemplate">
                                    <ng-template pTemplate="empty">
                                        <ng-container *ngTemplateOutlet="emptyTemplate"></ng-container>
                                    </ng-template>
                                </ng-container>
                                <ng-template pTemplate="togglericon" let-expanded *ngIf="itemTogglerIconTemplate">
                                    <ng-container *ngTemplateOutlet="itemTogglerIconTemplate; context: { $implicit: expanded }"></ng-container>
                                </ng-template>
                                <ng-template pTemplate="checkboxicon" *ngIf="itemCheckboxIconTemplate">
                                    <ng-template *ngTemplateOutlet="itemCheckboxIconTemplate"></ng-template>
                                </ng-template>
                                <ng-template pTemplate="loadingicon" *ngIf="itemLoadingIconTemplate">
                                    <ng-container *ngTemplateOutlet="itemLoadingIconTemplate"></ng-container>
                                </ng-template>
                            </p-tree>
                        </div>
                        <ng-container *ngTemplateOutlet="footerTemplate; context: { $implicit: value, options: options }"></ng-container>
                        <span
                            #lastHiddenFocusableEl
                            role="presentation"
                            [attr.aria-hidden]="true"
                            class="p-hidden-accessible p-hidden-focusable"
                            [attr.tabindex]="0"
                            (focus)="onLastHiddenFocus($event)"
                            [attr.data-p-hidden-accessible]="true"
                            [attr.data-p-hidden-focusable]="true"
                        ></span>
                    </div>
                </ng-template>
            </p-overlay>
        </div>
    `, isInline: true, styles: ["@layer primeng{.p-treeselect{display:inline-flex;cursor:pointer;position:relative;-webkit-user-select:none;user-select:none}.p-treeselect-trigger{display:flex;align-items:center;justify-content:center;flex-shrink:0}.p-treeselect-label-container{overflow:hidden;flex:1 1 auto;cursor:pointer;display:flex}.p-treeselect-label{display:block;white-space:nowrap;cursor:pointer;overflow:hidden;text-overflow:ellipsis}.p-treeselect-label-empty{overflow:hidden;visibility:hidden}.p-treeselect-token{cursor:default;display:inline-flex;align-items:center;flex:0 0 auto}.p-treeselect-items-wrapper{overflow:auto}.p-treeselect-header{display:flex;align-items:center;justify-content:space-between}.p-treeselect-filter-container{position:relative;flex:1 1 auto}.p-treeselect-filter-icon{position:absolute;top:50%;margin-top:-.5rem}.p-treeselect-filter-container .p-inputtext{width:100%}.p-treeselect-close{display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden;position:relative;margin-left:auto}.p-treeselect-clear-icon{position:absolute;top:50%;margin-top:-.5rem}.p-fluid .p-treeselect{display:flex}.p-treeselect-clear-icon{position:absolute;top:50%;margin-top:-.5rem;cursor:pointer}.p-treeselect-clearable{position:relative}}\n"], dependencies: [{ kind: "directive", type: i0.forwardRef(() => i2.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgForOf), selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgIf), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgStyle), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: i0.forwardRef(() => i3.Overlay), selector: "p-overlay", inputs: ["visible", "mode", "style", "styleClass", "contentStyle", "contentStyleClass", "target", "appendTo", "autoZIndex", "baseZIndex", "showTransitionOptions", "hideTransitionOptions", "listener", "responsive", "options"], outputs: ["visibleChange", "onBeforeShow", "onShow", "onBeforeHide", "onHide", "onAnimationStart", "onAnimationDone"] }, { kind: "directive", type: i0.forwardRef(() => i1.PrimeTemplate), selector: "[pTemplate]", inputs: ["type", "pTemplate"] }, { kind: "component", type: i0.forwardRef(() => i4.Tree), selector: "p-tree", inputs: ["value", "selectionMode", "selection", "style", "styleClass", "contextMenu", "layout", "draggableScope", "droppableScope", "draggableNodes", "droppableNodes", "metaKeySelection", "propagateSelectionUp", "propagateSelectionDown", "loading", "loadingIcon", "emptyMessage", "ariaLabel", "togglerAriaLabel", "ariaLabelledBy", "validateDrop", "filter", "filterBy", "filterMode", "filterPlaceholder", "filteredNodes", "filterLocale", "scrollHeight", "lazy", "virtualScroll", "virtualScrollItemSize", "virtualScrollOptions", "indentation", "_templateMap", "trackBy", "virtualNodeHeight"], outputs: ["selectionChange", "onNodeSelect", "onNodeUnselect", "onNodeExpand", "onNodeCollapse", "onNodeContextMenuSelect", "onNodeDrop", "onLazyLoad", "onScroll", "onScrollIndexChange", "onFilter"] }, { kind: "component", type: i0.forwardRef(() => SearchIcon), selector: "SearchIcon" }, { kind: "component", type: i0.forwardRef(() => TimesIcon), selector: "TimesIcon" }, { kind: "component", type: i0.forwardRef(() => ChevronDownIcon), selector: "ChevronDownIcon" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: TreeSelect, decorators: [{
            type: Component,
            args: [{ selector: 'p-treeSelect', template: `
        <div #container [ngClass]="containerClass()" [class]="containerStyleClass" [ngStyle]="containerStyle" (click)="onClick($event)">
            <div class="p-hidden-accessible">
                <input
                    #focusInput
                    type="text"
                    role="combobox"
                    [attr.id]="inputId"
                    readonly
                    [disabled]="disabled"
                    (focus)="onFocus()"
                    (blur)="onBlur()"
                    (keydown)="onKeyDown($event)"
                    [attr.tabindex]="!disabled ? tabindex : -1"
                    [attr.aria-controls]="listId"
                    [attr.aria-haspopup]="'tree'"
                    [attr.aria-expanded]="overlayVisible"
                    [attr.aria-labelledby]="ariaLabelledBy"
                    [attr.aria-label]="ariaLabel || (label === 'p-emptylabel' ? undefined : label)"
                />
            </div>
            <div class="p-treeselect-label-container">
                <div [ngClass]="labelClass()" [class]="labelStyleClass" [ngStyle]="labelStyle">
                    <ng-container *ngIf="valueTemplate; else defaultValueTemplate">
                        <ng-container *ngTemplateOutlet="valueTemplate; context: { $implicit: value, placeholder: placeholder }"></ng-container>
                    </ng-container>
                    <ng-template #defaultValueTemplate>
                        <ng-container *ngIf="display === 'comma'; else chipsValueTemplate">
                            {{ label || 'empty' }}
                        </ng-container>
                        <ng-template #chipsValueTemplate>
                            <div *ngFor="let node of value" class="p-treeselect-token">
                                <span class="p-treeselect-token-label">{{ node.label }}</span>
                            </div>
                            <ng-container *ngIf="emptyValue">{{ placeholder || 'empty' }}</ng-container>
                        </ng-template>
                    </ng-template>
                </div>
                <ng-container *ngIf="checkValue() && !disabled && showClear">
                    <TimesIcon *ngIf="!clearIconTemplate" [styleClass]="'p-treeselect-clear-icon'" (click)="clear($event)" />
                    <span *ngIf="clearIconTemplate" class="p-treeselect-clear-icon" (click)="clear($event)">
                        <ng-template *ngTemplateOutlet="clearIconTemplate"></ng-template>
                    </span>
                </ng-container>
            </div>
            <div class="p-treeselect-trigger" role="button" aria-haspopup="tree" [attr.aria-expanded]="overlayVisible">
                <ChevronDownIcon *ngIf="!triggerIconTemplate" [styleClass]="'p-treeselect-trigger-icon'" />
                <span *ngIf="triggerIconTemplate" class="p-treeselect-trigger-icon">
                    <ng-template *ngTemplateOutlet="triggerIconTemplate"></ng-template>
                </span>
            </div>
            <p-overlay
                #overlay
                [(visible)]="overlayVisible"
                [options]="overlayOptions"
                [target]="'@parent'"
                [appendTo]="appendTo"
                [showTransitionOptions]="showTransitionOptions"
                [hideTransitionOptions]="hideTransitionOptions"
                (onAnimationStart)="onOverlayAnimationStart($event)"
                (onShow)="onShow.emit($event)"
                (onHide)="hide($event)"
            >
                <ng-template pTemplate="content">
                    <div #panel class="p-treeselect-panel p-component" [ngStyle]="panelStyle" [class]="panelStyleClass" [ngClass]="panelClass">
                        <span
                            #firstHiddenFocusableEl
                            role="presentation"
                            [attr.aria-hidden]="'true'"
                            class="p-hidden-accessible p-hidden-focusable"
                            [attr.tabindex]="0"
                            (focus)="onFirstHiddenFocus($event)"
                            [attr.data-p-hidden-accessible]="true"
                            [attr.data-p-hidden-focusable]="true"
                        >
                        </span>
                        <ng-container *ngTemplateOutlet="headerTemplate; context: { $implicit: value, options: options }"></ng-container>
                        <div class="p-treeselect-header" *ngIf="filter" (keydown.arrowdown)="onArrowDown($event)">
                            <div class="p-treeselect-filter-container">
                                <input
                                    #filter
                                    type="text"
                                    autocomplete="off"
                                    class="p-treeselect-filter p-inputtext p-component"
                                    [attr.placeholder]="filterPlaceholder"
                                    (keydown.enter)="$event.preventDefault()"
                                    (input)="onFilterInput($event)"
                                    [value]="filterValue"
                                />
                                <SearchIcon *ngIf="!filterIconTemplate" [styleClass]="'p-treeselect-filter-icon'" />
                                <span *ngIf="filterIconTemplate" class="p-treeselect-filter-icon">
                                    <ng-template *ngTemplateOutlet="filterIconTemplate"></ng-template>
                                </span>
                            </div>
                            <button class="p-treeselect-close p-link" (click)="hide()">
                                <TimesIcon *ngIf="!closeIconTemplate" />
                                <span *ngIf="closeIconTemplate">
                                    <ng-template *ngTemplateOutlet="closeIconTemplate"></ng-template>
                                </span>
                            </button>
                        </div>
                        <div class="p-treeselect-items-wrapper" [ngStyle]="{ 'max-height': scrollHeight }">
                            <p-tree
                                #tree
                                [value]="options"
                                [propagateSelectionDown]="propagateSelectionDown"
                                [propagateSelectionUp]="propagateSelectionUp"
                                [selectionMode]="selectionMode"
                                (selectionChange)="onSelectionChange($event)"
                                [selection]="value"
                                [metaKeySelection]="metaKeySelection"
                                (onNodeExpand)="nodeExpand($event)"
                                (onNodeCollapse)="nodeCollapse($event)"
                                (onNodeSelect)="onSelect($event)"
                                [emptyMessage]="emptyMessage"
                                (onNodeUnselect)="onUnselect($event)"
                                [filterBy]="filterBy"
                                [filterMode]="filterMode"
                                [filterPlaceholder]="filterPlaceholder"
                                [filterLocale]="filterLocale"
                                [filteredNodes]="filteredNodes"
                                [_templateMap]="templateMap"
                            >
                                <ng-container *ngIf="emptyTemplate">
                                    <ng-template pTemplate="empty">
                                        <ng-container *ngTemplateOutlet="emptyTemplate"></ng-container>
                                    </ng-template>
                                </ng-container>
                                <ng-template pTemplate="togglericon" let-expanded *ngIf="itemTogglerIconTemplate">
                                    <ng-container *ngTemplateOutlet="itemTogglerIconTemplate; context: { $implicit: expanded }"></ng-container>
                                </ng-template>
                                <ng-template pTemplate="checkboxicon" *ngIf="itemCheckboxIconTemplate">
                                    <ng-template *ngTemplateOutlet="itemCheckboxIconTemplate"></ng-template>
                                </ng-template>
                                <ng-template pTemplate="loadingicon" *ngIf="itemLoadingIconTemplate">
                                    <ng-container *ngTemplateOutlet="itemLoadingIconTemplate"></ng-container>
                                </ng-template>
                            </p-tree>
                        </div>
                        <ng-container *ngTemplateOutlet="footerTemplate; context: { $implicit: value, options: options }"></ng-container>
                        <span
                            #lastHiddenFocusableEl
                            role="presentation"
                            [attr.aria-hidden]="true"
                            class="p-hidden-accessible p-hidden-focusable"
                            [attr.tabindex]="0"
                            (focus)="onLastHiddenFocus($event)"
                            [attr.data-p-hidden-accessible]="true"
                            [attr.data-p-hidden-focusable]="true"
                        ></span>
                    </div>
                </ng-template>
            </p-overlay>
        </div>
    `, host: {
                        class: 'p-element p-inputwrapper',
                        '[class.p-inputwrapper-filled]': '!emptyValue',
                        '[class.p-inputwrapper-focus]': 'focused',
                        '[class.p-treeselect-clearable]': 'showClear && !disabled'
                    }, changeDetection: ChangeDetectionStrategy.OnPush, providers: [TREESELECT_VALUE_ACCESSOR], encapsulation: ViewEncapsulation.None, styles: ["@layer primeng{.p-treeselect{display:inline-flex;cursor:pointer;position:relative;-webkit-user-select:none;user-select:none}.p-treeselect-trigger{display:flex;align-items:center;justify-content:center;flex-shrink:0}.p-treeselect-label-container{overflow:hidden;flex:1 1 auto;cursor:pointer;display:flex}.p-treeselect-label{display:block;white-space:nowrap;cursor:pointer;overflow:hidden;text-overflow:ellipsis}.p-treeselect-label-empty{overflow:hidden;visibility:hidden}.p-treeselect-token{cursor:default;display:inline-flex;align-items:center;flex:0 0 auto}.p-treeselect-items-wrapper{overflow:auto}.p-treeselect-header{display:flex;align-items:center;justify-content:space-between}.p-treeselect-filter-container{position:relative;flex:1 1 auto}.p-treeselect-filter-icon{position:absolute;top:50%;margin-top:-.5rem}.p-treeselect-filter-container .p-inputtext{width:100%}.p-treeselect-close{display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden;position:relative;margin-left:auto}.p-treeselect-clear-icon{position:absolute;top:50%;margin-top:-.5rem}.p-fluid .p-treeselect{display:flex}.p-treeselect-clear-icon{position:absolute;top:50%;margin-top:-.5rem;cursor:pointer}.p-treeselect-clearable{position:relative}}\n"] }]
        }], ctorParameters: () => [{ type: i1.PrimeNGConfig }, { type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i1.OverlayService }], propDecorators: { inputId: [{
                type: Input
            }], scrollHeight: [{
                type: Input
            }], disabled: [{
                type: Input
            }], metaKeySelection: [{
                type: Input
            }], display: [{
                type: Input
            }], selectionMode: [{
                type: Input
            }], tabindex: [{
                type: Input
            }], ariaLabel: [{
                type: Input
            }], ariaLabelledBy: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], panelClass: [{
                type: Input
            }], panelStyle: [{
                type: Input
            }], panelStyleClass: [{
                type: Input
            }], containerStyle: [{
                type: Input
            }], containerStyleClass: [{
                type: Input
            }], labelStyle: [{
                type: Input
            }], labelStyleClass: [{
                type: Input
            }], overlayOptions: [{
                type: Input
            }], emptyMessage: [{
                type: Input
            }], appendTo: [{
                type: Input
            }], filter: [{
                type: Input
            }], filterBy: [{
                type: Input
            }], filterMode: [{
                type: Input
            }], filterPlaceholder: [{
                type: Input
            }], filterLocale: [{
                type: Input
            }], filterInputAutoFocus: [{
                type: Input
            }], propagateSelectionDown: [{
                type: Input
            }], propagateSelectionUp: [{
                type: Input
            }], showClear: [{
                type: Input
            }], resetFilterOnHide: [{
                type: Input
            }], options: [{
                type: Input
            }], showTransitionOptions: [{
                type: Input
            }], hideTransitionOptions: [{
                type: Input
            }], onNodeExpand: [{
                type: Output
            }], onNodeCollapse: [{
                type: Output
            }], onShow: [{
                type: Output
            }], onHide: [{
                type: Output
            }], onClear: [{
                type: Output
            }], onFilter: [{
                type: Output
            }], onNodeUnselect: [{
                type: Output
            }], onNodeSelect: [{
                type: Output
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }], containerEl: [{
                type: ViewChild,
                args: ['container']
            }], focusInput: [{
                type: ViewChild,
                args: ['focusInput']
            }], filterViewChild: [{
                type: ViewChild,
                args: ['filter']
            }], treeViewChild: [{
                type: ViewChild,
                args: ['tree']
            }], panelEl: [{
                type: ViewChild,
                args: ['panel']
            }], overlayViewChild: [{
                type: ViewChild,
                args: ['overlay']
            }], firstHiddenFocusableElementOnOverlay: [{
                type: ViewChild,
                args: ['firstHiddenFocusableEl']
            }], lastHiddenFocusableElementOnOverlay: [{
                type: ViewChild,
                args: ['lastHiddenFocusableEl']
            }] } });
export class TreeSelectModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: TreeSelectModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.0.5", ngImport: i0, type: TreeSelectModule, declarations: [TreeSelect], imports: [CommonModule, OverlayModule, RippleModule, SharedModule, TreeModule, SearchIcon, TimesIcon, ChevronDownIcon], exports: [TreeSelect, OverlayModule, SharedModule, TreeModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: TreeSelectModule, imports: [CommonModule, OverlayModule, RippleModule, SharedModule, TreeModule, SearchIcon, TimesIcon, ChevronDownIcon, OverlayModule, SharedModule, TreeModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: TreeSelectModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, OverlayModule, RippleModule, SharedModule, TreeModule, SearchIcon, TimesIcon, ChevronDownIcon],
                    exports: [TreeSelect, OverlayModule, SharedModule, TreeModule],
                    declarations: [TreeSelect]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZXNlbGVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvY29tcG9uZW50cy90cmVlc2VsZWN0L3RyZWVzZWxlY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBb0IsdUJBQXVCLEVBQXFCLFNBQVMsRUFBRSxlQUFlLEVBQWMsWUFBWSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBMEIsU0FBUyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlPLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25ELE9BQU8sRUFBaUQsYUFBYSxFQUFFLFlBQVksRUFBWSxNQUFNLGFBQWEsQ0FBQztBQUNuSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2hELE9BQU8sRUFBVyxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUMsT0FBTyxFQUFRLFVBQVUsRUFBOEMsTUFBTSxjQUFjLENBQUM7QUFDNUYsT0FBTyxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7O0FBSS9ELE1BQU0sQ0FBQyxNQUFNLHlCQUF5QixHQUFRO0lBQzFDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7SUFDekMsS0FBSyxFQUFFLElB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MUIsU0FBUzt1QkFBQyxPQUFPO2dCQUVJLGdCQUFnQjtzQkFBckMsU0FBUzt1QkFBQyxTQUFTO2dCQUVpQixvQ0FBb0M7c0JBQXhFLFNBQVM7dUJBQUMsd0JBQXdCO2dCQUVDLG1DQUFtQztzQkFBdEUsU0FBUzt1QkFBQyx1QkFBdUI7O0FBd2R0QyxNQUFNLE9BQU8sZ0JBQWdCO3VHQUFoQixnQkFBZ0I7d0dBQWhCLGdCQUFnQixpQkF0dEJoQixVQUFVLGFBa3RCVCxZQUFZLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsZUFBZSxhQWx0QjVHLFVBQVUsRUFtdEJHLGFBQWEsRUFBRSxZQUFZLEVBQUUsVUFBVTt3R0FHcEQsZ0JBQWdCLFlBSmYsWUFBWSxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFDL0YsYUFBYSxFQUFFLFlBQVksRUFBRSxVQUFVOzsyRkFHcEQsZ0JBQWdCO2tCQUw1QixRQUFRO21CQUFDO29CQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxlQUFlLENBQUM7b0JBQ3RILE9BQU8sRUFBRSxDQUFDLFVBQVUsRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLFVBQVUsQ0FBQztvQkFDOUQsWUFBWSxFQUFFLENBQUMsVUFBVSxDQUFDO2lCQUM3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFuaW1hdGlvbkV2ZW50IH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQWZ0ZXJDb250ZW50SW5pdCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIENvbnRlbnRDaGlsZHJlbiwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBmb3J3YXJkUmVmLCBJbnB1dCwgTmdNb2R1bGUsIE91dHB1dCwgUXVlcnlMaXN0LCBUZW1wbGF0ZVJlZiwgVmlld0NoaWxkLCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBPdmVybGF5T3B0aW9ucywgT3ZlcmxheVNlcnZpY2UsIFByaW1lTkdDb25maWcsIFByaW1lVGVtcGxhdGUsIFNoYXJlZE1vZHVsZSwgVHJlZU5vZGUgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBEb21IYW5kbGVyIH0gZnJvbSAncHJpbWVuZy9kb20nO1xuaW1wb3J0IHsgQ2hldnJvbkRvd25JY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy9jaGV2cm9uZG93bic7XG5pbXBvcnQgeyBTZWFyY2hJY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy9zZWFyY2gnO1xuaW1wb3J0IHsgVGltZXNJY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy90aW1lcyc7XG5pbXBvcnQgeyBPdmVybGF5LCBPdmVybGF5TW9kdWxlIH0gZnJvbSAncHJpbWVuZy9vdmVybGF5JztcbmltcG9ydCB7IFJpcHBsZU1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvcmlwcGxlJztcbmltcG9ydCB7IFRyZWUsIFRyZWVNb2R1bGUsIFRyZWVOb2RlU2VsZWN0RXZlbnQsIFRyZWVOb2RlVW5TZWxlY3RFdmVudCB9IGZyb20gJ3ByaW1lbmcvdHJlZSc7XG5pbXBvcnQgeyBPYmplY3RVdGlscywgVW5pcXVlQ29tcG9uZW50SWQgfSBmcm9tICdwcmltZW5nL3V0aWxzJztcbmltcG9ydCB7IE51bGxhYmxlIH0gZnJvbSAncHJpbWVuZy90cy1oZWxwZXJzJztcbmltcG9ydCB7IFRyZWVTZWxlY3ROb2RlQ29sbGFwc2VFdmVudCwgVHJlZVNlbGVjdE5vZGVFeHBhbmRFdmVudCB9IGZyb20gJy4vdHJlZXNlbGVjdC5pbnRlcmZhY2UnO1xuXG5leHBvcnQgY29uc3QgVFJFRVNFTEVDVF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFRyZWVTZWxlY3QpLFxuICAgIG11bHRpOiB0cnVlXG59O1xuLyoqXG4gKiBUcmVlU2VsZWN0IGlzIGEgZm9ybSBjb21wb25lbnQgdG8gY2hvb3NlIGZyb20gaGllcmFyY2hpY2FsIGRhdGEuXG4gKiBAZ3JvdXAgQ29tcG9uZW50c1xuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtdHJlZVNlbGVjdCcsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiAjY29udGFpbmVyIFtuZ0NsYXNzXT1cImNvbnRhaW5lckNsYXNzKClcIiBbY2xhc3NdPVwiY29udGFpbmVyU3R5bGVDbGFzc1wiIFtuZ1N0eWxlXT1cImNvbnRhaW5lclN0eWxlXCIgKGNsaWNrKT1cIm9uQ2xpY2soJGV2ZW50KVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtaGlkZGVuLWFjY2Vzc2libGVcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgI2ZvY3VzSW5wdXRcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICByb2xlPVwiY29tYm9ib3hcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5pZF09XCJpbnB1dElkXCJcbiAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHlcbiAgICAgICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgICAgICAgICAgICAgKGZvY3VzKT1cIm9uRm9jdXMoKVwiXG4gICAgICAgICAgICAgICAgICAgIChibHVyKT1cIm9uQmx1cigpXCJcbiAgICAgICAgICAgICAgICAgICAgKGtleWRvd24pPVwib25LZXlEb3duKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci50YWJpbmRleF09XCIhZGlzYWJsZWQgPyB0YWJpbmRleCA6IC0xXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1jb250cm9sc109XCJsaXN0SWRcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWhhc3BvcHVwXT1cIid0cmVlJ1wiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtZXhwYW5kZWRdPVwib3ZlcmxheVZpc2libGVcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwiYXJpYUxhYmVsbGVkQnlcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImFyaWFMYWJlbCB8fCAobGFiZWwgPT09ICdwLWVtcHR5bGFiZWwnID8gdW5kZWZpbmVkIDogbGFiZWwpXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC10cmVlc2VsZWN0LWxhYmVsLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgIDxkaXYgW25nQ2xhc3NdPVwibGFiZWxDbGFzcygpXCIgW2NsYXNzXT1cImxhYmVsU3R5bGVDbGFzc1wiIFtuZ1N0eWxlXT1cImxhYmVsU3R5bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInZhbHVlVGVtcGxhdGU7IGVsc2UgZGVmYXVsdFZhbHVlVGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJ2YWx1ZVRlbXBsYXRlOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogdmFsdWUsIHBsYWNlaG9sZGVyOiBwbGFjZWhvbGRlciB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI2RlZmF1bHRWYWx1ZVRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImRpc3BsYXkgPT09ICdjb21tYSc7IGVsc2UgY2hpcHNWYWx1ZVRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgbGFiZWwgfHwgJ2VtcHR5JyB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI2NoaXBzVmFsdWVUZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2ICpuZ0Zvcj1cImxldCBub2RlIG9mIHZhbHVlXCIgY2xhc3M9XCJwLXRyZWVzZWxlY3QtdG9rZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLXRyZWVzZWxlY3QtdG9rZW4tbGFiZWxcIj57eyBub2RlLmxhYmVsIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJlbXB0eVZhbHVlXCI+e3sgcGxhY2Vob2xkZXIgfHwgJ2VtcHR5JyB9fTwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY2hlY2tWYWx1ZSgpICYmICFkaXNhYmxlZCAmJiBzaG93Q2xlYXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPFRpbWVzSWNvbiAqbmdJZj1cIiFjbGVhckljb25UZW1wbGF0ZVwiIFtzdHlsZUNsYXNzXT1cIidwLXRyZWVzZWxlY3QtY2xlYXItaWNvbidcIiAoY2xpY2spPVwiY2xlYXIoJGV2ZW50KVwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiY2xlYXJJY29uVGVtcGxhdGVcIiBjbGFzcz1cInAtdHJlZXNlbGVjdC1jbGVhci1pY29uXCIgKGNsaWNrKT1cImNsZWFyKCRldmVudClcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cImNsZWFySWNvblRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC10cmVlc2VsZWN0LXRyaWdnZXJcIiByb2xlPVwiYnV0dG9uXCIgYXJpYS1oYXNwb3B1cD1cInRyZWVcIiBbYXR0ci5hcmlhLWV4cGFuZGVkXT1cIm92ZXJsYXlWaXNpYmxlXCI+XG4gICAgICAgICAgICAgICAgPENoZXZyb25Eb3duSWNvbiAqbmdJZj1cIiF0cmlnZ2VySWNvblRlbXBsYXRlXCIgW3N0eWxlQ2xhc3NdPVwiJ3AtdHJlZXNlbGVjdC10cmlnZ2VyLWljb24nXCIgLz5cbiAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cInRyaWdnZXJJY29uVGVtcGxhdGVcIiBjbGFzcz1cInAtdHJlZXNlbGVjdC10cmlnZ2VyLWljb25cIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwidHJpZ2dlckljb25UZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8cC1vdmVybGF5XG4gICAgICAgICAgICAgICAgI292ZXJsYXlcbiAgICAgICAgICAgICAgICBbKHZpc2libGUpXT1cIm92ZXJsYXlWaXNpYmxlXCJcbiAgICAgICAgICAgICAgICBbb3B0aW9uc109XCJvdmVybGF5T3B0aW9uc1wiXG4gICAgICAgICAgICAgICAgW3RhcmdldF09XCInQHBhcmVudCdcIlxuICAgICAgICAgICAgICAgIFthcHBlbmRUb109XCJhcHBlbmRUb1wiXG4gICAgICAgICAgICAgICAgW3Nob3dUcmFuc2l0aW9uT3B0aW9uc109XCJzaG93VHJhbnNpdGlvbk9wdGlvbnNcIlxuICAgICAgICAgICAgICAgIFtoaWRlVHJhbnNpdGlvbk9wdGlvbnNdPVwiaGlkZVRyYW5zaXRpb25PcHRpb25zXCJcbiAgICAgICAgICAgICAgICAob25BbmltYXRpb25TdGFydCk9XCJvbk92ZXJsYXlBbmltYXRpb25TdGFydCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAob25TaG93KT1cIm9uU2hvdy5lbWl0KCRldmVudClcIlxuICAgICAgICAgICAgICAgIChvbkhpZGUpPVwiaGlkZSgkZXZlbnQpXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgcFRlbXBsYXRlPVwiY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2ICNwYW5lbCBjbGFzcz1cInAtdHJlZXNlbGVjdC1wYW5lbCBwLWNvbXBvbmVudFwiIFtuZ1N0eWxlXT1cInBhbmVsU3R5bGVcIiBbY2xhc3NdPVwicGFuZWxTdHlsZUNsYXNzXCIgW25nQ2xhc3NdPVwicGFuZWxDbGFzc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAjZmlyc3RIaWRkZW5Gb2N1c2FibGVFbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGU9XCJwcmVzZW50YXRpb25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtaGlkZGVuXT1cIid0cnVlJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLWhpZGRlbi1hY2Nlc3NpYmxlIHAtaGlkZGVuLWZvY3VzYWJsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIudGFiaW5kZXhdPVwiMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGZvY3VzKT1cIm9uRmlyc3RIaWRkZW5Gb2N1cygkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLXAtaGlkZGVuLWFjY2Vzc2libGVdPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wLWhpZGRlbi1mb2N1c2FibGVdPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiaGVhZGVyVGVtcGxhdGU7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiB2YWx1ZSwgb3B0aW9uczogb3B0aW9ucyB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC10cmVlc2VsZWN0LWhlYWRlclwiICpuZ0lmPVwiZmlsdGVyXCIgKGtleWRvd24uYXJyb3dkb3duKT1cIm9uQXJyb3dEb3duKCRldmVudClcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC10cmVlc2VsZWN0LWZpbHRlci1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjZmlsdGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvY29tcGxldGU9XCJvZmZcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLXRyZWVzZWxlY3QtZmlsdGVyIHAtaW5wdXR0ZXh0IHAtY29tcG9uZW50XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLnBsYWNlaG9sZGVyXT1cImZpbHRlclBsYWNlaG9sZGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChrZXlkb3duLmVudGVyKT1cIiRldmVudC5wcmV2ZW50RGVmYXVsdCgpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChpbnB1dCk9XCJvbkZpbHRlcklucHV0KCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3ZhbHVlXT1cImZpbHRlclZhbHVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFNlYXJjaEljb24gKm5nSWY9XCIhZmlsdGVySWNvblRlbXBsYXRlXCIgW3N0eWxlQ2xhc3NdPVwiJ3AtdHJlZXNlbGVjdC1maWx0ZXItaWNvbidcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImZpbHRlckljb25UZW1wbGF0ZVwiIGNsYXNzPVwicC10cmVlc2VsZWN0LWZpbHRlci1pY29uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJmaWx0ZXJJY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInAtdHJlZXNlbGVjdC1jbG9zZSBwLWxpbmtcIiAoY2xpY2spPVwiaGlkZSgpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUaW1lc0ljb24gKm5nSWY9XCIhY2xvc2VJY29uVGVtcGxhdGVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImNsb3NlSWNvblRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJjbG9zZUljb25UZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtdHJlZXNlbGVjdC1pdGVtcy13cmFwcGVyXCIgW25nU3R5bGVdPVwieyAnbWF4LWhlaWdodCc6IHNjcm9sbEhlaWdodCB9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAtdHJlZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjdHJlZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdmFsdWVdPVwib3B0aW9uc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtwcm9wYWdhdGVTZWxlY3Rpb25Eb3duXT1cInByb3BhZ2F0ZVNlbGVjdGlvbkRvd25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcHJvcGFnYXRlU2VsZWN0aW9uVXBdPVwicHJvcGFnYXRlU2VsZWN0aW9uVXBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc2VsZWN0aW9uTW9kZV09XCJzZWxlY3Rpb25Nb2RlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHNlbGVjdGlvbkNoYW5nZSk9XCJvblNlbGVjdGlvbkNoYW5nZSgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3NlbGVjdGlvbl09XCJ2YWx1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFttZXRhS2V5U2VsZWN0aW9uXT1cIm1ldGFLZXlTZWxlY3Rpb25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAob25Ob2RlRXhwYW5kKT1cIm5vZGVFeHBhbmQoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvbk5vZGVDb2xsYXBzZSk9XCJub2RlQ29sbGFwc2UoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvbk5vZGVTZWxlY3QpPVwib25TZWxlY3QoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtlbXB0eU1lc3NhZ2VdPVwiZW1wdHlNZXNzYWdlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKG9uTm9kZVVuc2VsZWN0KT1cIm9uVW5zZWxlY3QoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtmaWx0ZXJCeV09XCJmaWx0ZXJCeVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtmaWx0ZXJNb2RlXT1cImZpbHRlck1vZGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZmlsdGVyUGxhY2Vob2xkZXJdPVwiZmlsdGVyUGxhY2Vob2xkZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZmlsdGVyTG9jYWxlXT1cImZpbHRlckxvY2FsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtmaWx0ZXJlZE5vZGVzXT1cImZpbHRlcmVkTm9kZXNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbX3RlbXBsYXRlTWFwXT1cInRlbXBsYXRlTWFwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJlbXB0eVRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgcFRlbXBsYXRlPVwiZW1wdHlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiZW1wdHlUZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBwVGVtcGxhdGU9XCJ0b2dnbGVyaWNvblwiIGxldC1leHBhbmRlZCAqbmdJZj1cIml0ZW1Ub2dnbGVySWNvblRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiaXRlbVRvZ2dsZXJJY29uVGVtcGxhdGU7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiBleHBhbmRlZCB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBwVGVtcGxhdGU9XCJjaGVja2JveGljb25cIiAqbmdJZj1cIml0ZW1DaGVja2JveEljb25UZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwiaXRlbUNoZWNrYm94SWNvblRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIHBUZW1wbGF0ZT1cImxvYWRpbmdpY29uXCIgKm5nSWY9XCJpdGVtTG9hZGluZ0ljb25UZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIml0ZW1Mb2FkaW5nSWNvblRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wLXRyZWU+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJmb290ZXJUZW1wbGF0ZTsgY29udGV4dDogeyAkaW1wbGljaXQ6IHZhbHVlLCBvcHRpb25zOiBvcHRpb25zIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgI2xhc3RIaWRkZW5Gb2N1c2FibGVFbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGU9XCJwcmVzZW50YXRpb25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtaGlkZGVuXT1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC1oaWRkZW4tYWNjZXNzaWJsZSBwLWhpZGRlbi1mb2N1c2FibGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLnRhYmluZGV4XT1cIjBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChmb2N1cyk9XCJvbkxhc3RIaWRkZW5Gb2N1cygkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLXAtaGlkZGVuLWFjY2Vzc2libGVdPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wLWhpZGRlbi1mb2N1c2FibGVdPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICA+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgPC9wLW92ZXJsYXk+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgc3R5bGVVcmxzOiBbJy4vdHJlZXNlbGVjdC5jc3MnXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAncC1lbGVtZW50IHAtaW5wdXR3cmFwcGVyJyxcbiAgICAgICAgJ1tjbGFzcy5wLWlucHV0d3JhcHBlci1maWxsZWRdJzogJyFlbXB0eVZhbHVlJyxcbiAgICAgICAgJ1tjbGFzcy5wLWlucHV0d3JhcHBlci1mb2N1c10nOiAnZm9jdXNlZCcsXG4gICAgICAgICdbY2xhc3MucC10cmVlc2VsZWN0LWNsZWFyYWJsZV0nOiAnc2hvd0NsZWFyICYmICFkaXNhYmxlZCdcbiAgICB9LFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIHByb3ZpZGVyczogW1RSRUVTRUxFQ1RfVkFMVUVfQUNDRVNTT1JdLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgVHJlZVNlbGVjdCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuICAgIC8qKlxuICAgICAqIElkZW50aWZpZXIgb2YgdGhlIHVuZGVybHlpbmcgaW5wdXQgZWxlbWVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBpbnB1dElkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogSGVpZ2h0IG9mIHRoZSB2aWV3cG9ydCwgYSBzY3JvbGxiYXIgaXMgZGVmaW5lZCBpZiBoZWlnaHQgb2YgbGlzdCBleGNlZWRzIHRoaXMgdmFsdWUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc2Nyb2xsSGVpZ2h0OiBzdHJpbmcgPSAnNDAwcHgnO1xuICAgIC8qKlxuICAgICAqIFdoZW4gcHJlc2VudCwgaXQgc3BlY2lmaWVzIHRoYXQgdGhlIGNvbXBvbmVudCBzaG91bGQgYmUgZGlzYWJsZWQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyBob3cgbXVsdGlwbGUgaXRlbXMgY2FuIGJlIHNlbGVjdGVkLCB3aGVuIHRydWUgbWV0YUtleSBuZWVkcyB0byBiZSBwcmVzc2VkIHRvIHNlbGVjdCBvciB1bnNlbGVjdCBhbiBpdGVtIGFuZCB3aGVuIHNldCB0byBmYWxzZSBzZWxlY3Rpb24gb2YgZWFjaCBpdGVtIGNhbiBiZSB0b2dnbGVkIGluZGl2aWR1YWxseS4gT24gdG91Y2ggZW5hYmxlZCBkZXZpY2VzLCBtZXRhS2V5U2VsZWN0aW9uIGlzIHR1cm5lZCBvZmYgYXV0b21hdGljYWxseS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBtZXRhS2V5U2VsZWN0aW9uOiBib29sZWFuID0gdHJ1ZTtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIGhvdyB0aGUgc2VsZWN0ZWQgaXRlbXMgYXJlIGRpc3BsYXllZC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBkaXNwbGF5OiAnY29tbWEnIHwgJ2NoaXAnID0gJ2NvbW1hJztcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIHRoZSBzZWxlY3Rpb24gbW9kZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzZWxlY3Rpb25Nb2RlOiAnc2luZ2xlJyB8ICdtdWx0aXBsZScgfCAnY2hlY2tib3gnID0gJ3NpbmdsZSc7XG4gICAgLyoqXG4gICAgICogSW5kZXggb2YgdGhlIGVsZW1lbnQgaW4gdGFiYmluZyBvcmRlci5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB0YWJpbmRleDogc3RyaW5nIHwgdW5kZWZpbmVkID0gJzAnO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgYSBzdHJpbmcgdGhhdCBsYWJlbHMgdGhlIGlucHV0IGZvciBhY2Nlc3NpYmlsaXR5LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGFyaWFMYWJlbDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIEVzdGFibGlzaGVzIHJlbGF0aW9uc2hpcHMgYmV0d2VlbiB0aGUgY29tcG9uZW50IGFuZCBsYWJlbChzKSB3aGVyZSBpdHMgdmFsdWUgc2hvdWxkIGJlIG9uZSBvciBtb3JlIGVsZW1lbnQgSURzLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGFyaWFMYWJlbGxlZEJ5OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogTGFiZWwgdG8gZGlzcGxheSB3aGVuIHRoZXJlIGFyZSBubyBzZWxlY3Rpb25zLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogU3R5bGUgY2xhc3Mgb2YgdGhlIG92ZXJsYXkgcGFuZWwuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgcGFuZWxDbGFzczogc3RyaW5nIHwgc3RyaW5nW10gfCBTZXQ8c3RyaW5nPiB8IHsgW2tsYXNzOiBzdHJpbmddOiBhbnkgfSB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBJbmxpbmUgc3R5bGUgb2YgdGhlIHBhbmVsIGVsZW1lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgcGFuZWxTdHlsZTogeyBba2xhc3M6IHN0cmluZ106IGFueSB9IHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBTdHlsZSBjbGFzcyBvZiB0aGUgcGFuZWwgZWxlbWVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwYW5lbFN0eWxlQ2xhc3M6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBJbmxpbmUgc3R5bGUgb2YgdGhlIGNvbnRhaW5lciBlbGVtZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGNvbnRhaW5lclN0eWxlOiB7IFtrbGFzczogc3RyaW5nXTogYW55IH0gfCBudWxsIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFN0eWxlIGNsYXNzIG9mIHRoZSBjb250YWluZXIgZWxlbWVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBjb250YWluZXJTdHlsZUNsYXNzOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogSW5saW5lIHN0eWxlIG9mIHRoZSBsYWJlbCBlbGVtZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGxhYmVsU3R5bGU6IHsgW2tsYXNzOiBzdHJpbmddOiBhbnkgfSB8IG51bGwgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogU3R5bGUgY2xhc3Mgb2YgdGhlIGxhYmVsIGVsZW1lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgbGFiZWxTdHlsZUNsYXNzOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogU3BlY2lmaWVzIHRoZSBvcHRpb25zIGZvciB0aGUgb3ZlcmxheS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBvdmVybGF5T3B0aW9uczogT3ZlcmxheU9wdGlvbnMgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogVGV4dCB0byBkaXNwbGF5IHdoZW4gdGhlcmUgYXJlIG5vIG9wdGlvbnMgYXZhaWxhYmxlLiBEZWZhdWx0cyB0byB2YWx1ZSBmcm9tIFByaW1lTkcgbG9jYWxlIGNvbmZpZ3VyYXRpb24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZW1wdHlNZXNzYWdlOiBzdHJpbmcgPSAnJztcbiAgICAvKipcbiAgICAgKiBBIHZhbGlkIHF1ZXJ5IHNlbGVjdG9yIG9yIGFuIEhUTUxFbGVtZW50IHRvIHNwZWNpZnkgd2hlcmUgdGhlIG92ZXJsYXkgZ2V0cyBhdHRhY2hlZC4gU3BlY2lhbCBrZXl3b3JkcyBhcmUgXCJib2R5XCIgZm9yIGRvY3VtZW50IGJvZHkgYW5kIFwic2VsZlwiIGZvciB0aGUgZWxlbWVudCBpdHNlbGYuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgYXBwZW5kVG86IEhUTUxFbGVtZW50IHwgRWxlbWVudFJlZiB8IFRlbXBsYXRlUmVmPGFueT4gfCBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkIHwgYW55O1xuICAgIC8qKlxuICAgICAqIFdoZW4gc3BlY2lmaWVkLCBkaXNwbGF5cyBhbiBpbnB1dCBmaWVsZCB0byBmaWx0ZXIgdGhlIGl0ZW1zLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGZpbHRlcjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIC8qKlxuICAgICAqIFdoZW4gZmlsdGVyaW5nIGlzIGVuYWJsZWQsIGZpbHRlckJ5IGRlY2lkZXMgd2hpY2ggZmllbGQgb3IgZmllbGRzIChjb21tYSBzZXBhcmF0ZWQpIHRvIHNlYXJjaCBhZ2FpbnN0LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGZpbHRlckJ5OiBzdHJpbmcgPSAnbGFiZWwnO1xuICAgIC8qKlxuICAgICAqIE1vZGUgZm9yIGZpbHRlcmluZyB2YWxpZCB2YWx1ZXMgYXJlIFwibGVuaWVudFwiIGFuZCBcInN0cmljdFwiLiBEZWZhdWx0IGlzIGxlbmllbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZmlsdGVyTW9kZTogc3RyaW5nID0gJ2xlbmllbnQnO1xuICAgIC8qKlxuICAgICAqIFBsYWNlaG9sZGVyIHRleHQgdG8gc2hvdyB3aGVuIGZpbHRlciBpbnB1dCBpcyBlbXB0eS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBmaWx0ZXJQbGFjZWhvbGRlcjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIExvY2FsZSB0byB1c2UgaW4gZmlsdGVyaW5nLiBUaGUgZGVmYXVsdCBsb2NhbGUgaXMgdGhlIGhvc3QgZW52aXJvbm1lbnQncyBjdXJyZW50IGxvY2FsZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBmaWx0ZXJMb2NhbGU6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIGZpbHRlciBpbnB1dCBzaG91bGQgYmUgYXV0b21hdGljYWxseSBmb2N1c2VkIHdoZW4gdGhlIGNvbXBvbmVudCBpcyByZW5kZXJlZC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBmaWx0ZXJJbnB1dEF1dG9Gb2N1czogYm9vbGVhbiA9IHRydWU7XG4gICAgLyoqXG4gICAgICogV2hldGhlciBjaGVja2JveCBzZWxlY3Rpb25zIHByb3BhZ2F0ZSB0byBkZXNjZW5kYW50IG5vZGVzLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHByb3BhZ2F0ZVNlbGVjdGlvbkRvd246IGJvb2xlYW4gPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgY2hlY2tib3ggc2VsZWN0aW9ucyBwcm9wYWdhdGUgdG8gYW5jZXN0b3Igbm9kZXMuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgcHJvcGFnYXRlU2VsZWN0aW9uVXA6IGJvb2xlYW4gPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIFdoZW4gZW5hYmxlZCwgYSBjbGVhciBpY29uIGlzIGRpc3BsYXllZCB0byBjbGVhciB0aGUgdmFsdWUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc2hvd0NsZWFyOiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogQ2xlYXJzIHRoZSBmaWx0ZXIgdmFsdWUgd2hlbiBoaWRpbmcgdGhlIGRyb3Bkb3duLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHJlc2V0RmlsdGVyT25IaWRlOiBib29sZWFuID0gdHJ1ZTtcbiAgICAvKipcbiAgICAgKiBBbiBhcnJheSBvZiB0cmVlbm9kZXMuXG4gICAgICogQGRlZmF1bHRWYWx1ZSB1bmRlZmluZWRcbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgb3B0aW9ucygpOiBUcmVlTm9kZVtdIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29wdGlvbnM7XG4gICAgfVxuICAgIHNldCBvcHRpb25zKG9wdGlvbnM6IFRyZWVOb2RlW10gfCB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgIHRoaXMudXBkYXRlVHJlZVN0YXRlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRyYW5zaXRpb24gb3B0aW9ucyBvZiB0aGUgc2hvdyBhbmltYXRpb24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICogQGRlcHJlY2F0ZWQgc2luY2UgdjE0LjIuMCB1c2Ugb3ZlcmxheU9wdGlvbnMgcHJvcGVydHkgaW5zdGVhZC5cbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgc2hvd1RyYW5zaXRpb25PcHRpb25zKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaG93VHJhbnNpdGlvbk9wdGlvbnM7XG4gICAgfVxuICAgIHNldCBzaG93VHJhbnNpdGlvbk9wdGlvbnModmFsOiBzdHJpbmcgfCB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5fc2hvd1RyYW5zaXRpb25PcHRpb25zID0gdmFsO1xuICAgICAgICBjb25zb2xlLndhcm4oJ1RoZSBzaG93VHJhbnNpdGlvbk9wdGlvbnMgcHJvcGVydHkgaXMgZGVwcmVjYXRlZCBzaW5jZSB2MTQuMi4wLCB1c2Ugb3ZlcmxheU9wdGlvbnMgcHJvcGVydHkgaW5zdGVhZC4nKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVHJhbnNpdGlvbiBvcHRpb25zIG9mIHRoZSBoaWRlIGFuaW1hdGlvbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKiBAZGVwcmVjYXRlZCBzaW5jZSB2MTQuMi4wIHVzZSBvdmVybGF5T3B0aW9ucyBwcm9wZXJ0eSBpbnN0ZWFkLlxuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCBoaWRlVHJhbnNpdGlvbk9wdGlvbnMoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hpZGVUcmFuc2l0aW9uT3B0aW9ucztcbiAgICB9XG4gICAgc2V0IGhpZGVUcmFuc2l0aW9uT3B0aW9ucyh2YWw6IHN0cmluZyB8IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLl9oaWRlVHJhbnNpdGlvbk9wdGlvbnMgPSB2YWw7XG4gICAgICAgIGNvbnNvbGUud2FybignVGhlIGhpZGVUcmFuc2l0aW9uT3B0aW9ucyBwcm9wZXJ0eSBpcyBkZXByZWNhdGVkIHNpbmNlIHYxNC4yLjAsIHVzZSBvdmVybGF5T3B0aW9ucyBwcm9wZXJ0eSBpbnN0ZWFkLicpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBhIG5vZGUgaXMgZXhwYW5kZWQuXG4gICAgICogQHBhcmFtIHtUcmVlU2VsZWN0Tm9kZUV4cGFuZEV2ZW50fSBldmVudCAtIEN1c3RvbSBub2RlIGV4cGFuZCBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25Ob2RlRXhwYW5kOiBFdmVudEVtaXR0ZXI8VHJlZVNlbGVjdE5vZGVFeHBhbmRFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFRyZWVTZWxlY3ROb2RlRXhwYW5kRXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gYSBub2RlIGlzIGNvbGxhcHNlZC5cbiAgICAgKiBAcGFyYW0ge1RyZWVTZWxlY3ROb2RlQ29sbGFwc2VFdmVudH0gZXZlbnQgLSBDdXN0b20gbm9kZSBjb2xsYXBzZSBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25Ob2RlQ29sbGFwc2U6IEV2ZW50RW1pdHRlcjxUcmVlU2VsZWN0Tm9kZUNvbGxhcHNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxUcmVlU2VsZWN0Tm9kZUNvbGxhcHNlRXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gdGhlIG92ZXJsYXkgaXMgc2hvd24uXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBCcm93c2VyIGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvblNob3c6IEV2ZW50RW1pdHRlcjxFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50PigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIHRoZSBvdmVybGF5IGlzIGhpZGRlbi5cbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIEJyb3dzZXIgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uSGlkZTogRXZlbnRFbWl0dGVyPEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gaW5wdXQgZmllbGQgaXMgY2xlYXJlZC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25DbGVhcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBkYXRhIGlzIGZpbHRlcmVkLlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvbkZpbHRlcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBhIG5vZGUgaXMgdW5zZWxlY3RlZC5cbiAgICAgKiBAcGFyYW0ge1RyZWVOb2RlfSBub2RlIC0gTm9kZSBpbnN0YW5jZS5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25Ob2RlVW5zZWxlY3Q6IEV2ZW50RW1pdHRlcjxUcmVlTm9kZVVuU2VsZWN0RXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxUcmVlTm9kZVVuU2VsZWN0RXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gYSBub2RlIGlzIHNlbGVjdGVkLlxuICAgICAqIEBwYXJhbSB7VHJlZU5vZGV9IG5vZGUgLSBOb2RlIGluc3RhbmNlLlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvbk5vZGVTZWxlY3Q6IEV2ZW50RW1pdHRlcjxUcmVlTm9kZVNlbGVjdEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8VHJlZU5vZGVTZWxlY3RFdmVudD4oKTtcblxuICAgIF9zaG93VHJhbnNpdGlvbk9wdGlvbnM6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgIF9oaWRlVHJhbnNpdGlvbk9wdGlvbnM6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oUHJpbWVUZW1wbGF0ZSkgdGVtcGxhdGVzOiBOdWxsYWJsZTxRdWVyeUxpc3Q8UHJpbWVUZW1wbGF0ZT4+O1xuXG4gICAgQFZpZXdDaGlsZCgnY29udGFpbmVyJykgY29udGFpbmVyRWw6IE51bGxhYmxlPEVsZW1lbnRSZWY+O1xuXG4gICAgQFZpZXdDaGlsZCgnZm9jdXNJbnB1dCcpIGZvY3VzSW5wdXQ6IE51bGxhYmxlPEVsZW1lbnRSZWY+O1xuXG4gICAgQFZpZXdDaGlsZCgnZmlsdGVyJykgZmlsdGVyVmlld0NoaWxkOiBOdWxsYWJsZTxFbGVtZW50UmVmPjtcblxuICAgIEBWaWV3Q2hpbGQoJ3RyZWUnKSB0cmVlVmlld0NoaWxkOiBOdWxsYWJsZTxUcmVlPjtcblxuICAgIEBWaWV3Q2hpbGQoJ3BhbmVsJykgcGFuZWxFbDogTnVsbGFibGU8RWxlbWVudFJlZj47XG5cbiAgICBAVmlld0NoaWxkKCdvdmVybGF5Jykgb3ZlcmxheVZpZXdDaGlsZDogTnVsbGFibGU8T3ZlcmxheT47XG5cbiAgICBAVmlld0NoaWxkKCdmaXJzdEhpZGRlbkZvY3VzYWJsZUVsJykgZmlyc3RIaWRkZW5Gb2N1c2FibGVFbGVtZW50T25PdmVybGF5OiBOdWxsYWJsZTxFbGVtZW50UmVmPjtcblxuICAgIEBWaWV3Q2hpbGQoJ2xhc3RIaWRkZW5Gb2N1c2FibGVFbCcpIGxhc3RIaWRkZW5Gb2N1c2FibGVFbGVtZW50T25PdmVybGF5OiBOdWxsYWJsZTxFbGVtZW50UmVmPjtcblxuICAgIHB1YmxpYyBmaWx0ZXJlZE5vZGVzOiBUcmVlTm9kZVtdIHwgdW5kZWZpbmVkIHwgbnVsbDtcblxuICAgIGZpbHRlclZhbHVlOiBOdWxsYWJsZTxzdHJpbmc+ID0gbnVsbDtcblxuICAgIHNlcmlhbGl6ZWRWYWx1ZTogTnVsbGFibGU8YW55W10+O1xuXG4gICAgdmFsdWVUZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBoZWFkZXJUZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBlbXB0eVRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIGZvb3RlclRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIGNsZWFySWNvblRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIHRyaWdnZXJJY29uVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgZmlsdGVySWNvblRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIGNsb3NlSWNvblRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIGl0ZW1Ub2dnbGVySWNvblRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIGl0ZW1DaGVja2JveEljb25UZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBpdGVtTG9hZGluZ0ljb25UZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBmb2N1c2VkOiBOdWxsYWJsZTxib29sZWFuPjtcblxuICAgIG92ZXJsYXlWaXNpYmxlOiBOdWxsYWJsZTxib29sZWFuPjtcblxuICAgIHNlbGZDaGFuZ2U6IE51bGxhYmxlPGJvb2xlYW4+O1xuXG4gICAgdmFsdWU6IGFueSB8IHVuZGVmaW5lZDtcblxuICAgIGV4cGFuZGVkTm9kZXM6IGFueVtdID0gW107XG5cbiAgICBfb3B0aW9uczogVHJlZU5vZGVbXSB8IHVuZGVmaW5lZDtcblxuICAgIHB1YmxpYyB0ZW1wbGF0ZU1hcDogYW55O1xuXG4gICAgb25Nb2RlbENoYW5nZTogRnVuY3Rpb24gPSAoKSA9PiB7fTtcblxuICAgIG9uTW9kZWxUb3VjaGVkOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuXG4gICAgbGlzdElkOiBzdHJpbmcgPSAnJztcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBjb25maWc6IFByaW1lTkdDb25maWcsIHB1YmxpYyBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsIHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHVibGljIG92ZXJsYXlTZXJ2aWNlOiBPdmVybGF5U2VydmljZSkge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmxpc3RJZCA9IFVuaXF1ZUNvbXBvbmVudElkKCkgKyAnX2xpc3QnO1xuICAgICAgICB0aGlzLnVwZGF0ZVRyZWVTdGF0ZSgpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgaWYgKCh0aGlzLnRlbXBsYXRlcyBhcyBRdWVyeUxpc3Q8UHJpbWVUZW1wbGF0ZT4pLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy50ZW1wbGF0ZU1hcCA9IHt9O1xuICAgICAgICB9XG5cbiAgICAgICAgKHRoaXMudGVtcGxhdGVzIGFzIFF1ZXJ5TGlzdDxQcmltZVRlbXBsYXRlPikuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChpdGVtLmdldFR5cGUoKSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ3ZhbHVlJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZVRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdoZWFkZXInOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlYWRlclRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdlbXB0eSc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1wdHlUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnZm9vdGVyJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb290ZXJUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnY2xlYXJpY29uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhckljb25UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAndHJpZ2dlcmljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXJJY29uVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2ZpbHRlcmljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbHRlckljb25UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnY2xvc2VpY29uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZUljb25UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnaXRlbXRvZ2dsZXJpY29uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtVG9nZ2xlckljb25UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnaXRlbWNoZWNrYm94aWNvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbUNoZWNrYm94SWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdpdGVtbG9hZGluZ2ljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1Mb2FkaW5nSWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OiAvL1RPRE86IEBkZXByZWNhdGVkIFVzZWQgXCJ2YWx1ZVwiIHRlbXBsYXRlIGluc3RlYWRcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0ubmFtZSkgdGhpcy50ZW1wbGF0ZU1hcFtpdGVtLm5hbWVdID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB0aGlzLnZhbHVlVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25PdmVybGF5QW5pbWF0aW9uU3RhcnQoZXZlbnQ6IEFuaW1hdGlvbkV2ZW50KSB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQudG9TdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSAndmlzaWJsZSc6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZmlsdGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdFV0aWxzLmlzTm90RW1wdHkodGhpcy5maWx0ZXJWYWx1ZSkgJiYgdGhpcy50cmVlVmlld0NoaWxkPy5fZmlsdGVyKDxhbnk+dGhpcy5maWx0ZXJWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVySW5wdXRBdXRvRm9jdXMgJiYgdGhpcy5maWx0ZXJWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZm9jdXNhYmxlRWxlbWVudHMgPSBEb21IYW5kbGVyLmdldEZvY3VzYWJsZUVsZW1lbnRzKHRoaXMucGFuZWxFbC5uYXRpdmVFbGVtZW50KTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoZm9jdXNhYmxlRWxlbWVudHMgJiYgZm9jdXNhYmxlRWxlbWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9jdXNhYmxlRWxlbWVudHNbMF0uZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uU2VsZWN0aW9uQ2hhbmdlKGV2ZW50OiBFdmVudCkge1xuICAgICAgICB0aGlzLnZhbHVlID0gZXZlbnQ7XG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSh0aGlzLnZhbHVlKTtcbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBvbkNsaWNrKGV2ZW50OiBFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLm92ZXJsYXlWaWV3Q2hpbGQ/LmVsPy5uYXRpdmVFbGVtZW50Py5jb250YWlucyhldmVudC50YXJnZXQpICYmICFEb21IYW5kbGVyLmhhc0NsYXNzKGV2ZW50LnRhcmdldCwgJ3AtdHJlZXNlbGVjdC1jbG9zZScpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5vdmVybGF5VmlzaWJsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5mb2N1c0lucHV0Py5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbktleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC5jb2RlKSB7XG4gICAgICAgICAgICAvL2Rvd25cbiAgICAgICAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm92ZXJsYXlWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLm9uQXJyb3dEb3duKGV2ZW50KTtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAvL3NwYWNlXG4gICAgICAgICAgICBjYXNlICdTcGFjZSc6XG4gICAgICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm92ZXJsYXlWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgLy9lc2NhcGVcbiAgICAgICAgICAgIGNhc2UgJ0VzY2FwZSc6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3ZlcmxheVZpc2libGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNJbnB1dD8ubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgLy90YWJcbiAgICAgICAgICAgIGNhc2UgJ1RhYic6XG4gICAgICAgICAgICAgICAgdGhpcy5vblRhYktleShldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkZpbHRlcklucHV0KGV2ZW50OiBFdmVudCkge1xuICAgICAgICB0aGlzLmZpbHRlclZhbHVlID0gKGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZTtcbiAgICAgICAgdGhpcy50cmVlVmlld0NoaWxkPy5fZmlsdGVyKHRoaXMuZmlsdGVyVmFsdWUpO1xuICAgICAgICB0aGlzLm9uRmlsdGVyLmVtaXQoe1xuICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgICAgICBmaWx0ZXJlZFZhbHVlOiB0aGlzLnRyZWVWaWV3Q2hpbGQ/LmZpbHRlcmVkTm9kZXNcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25BcnJvd0Rvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMub3ZlcmxheVZpc2libGUgJiYgdGhpcy5wYW5lbEVsPy5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICBsZXQgZm9jdXNhYmxlRWxlbWVudHMgPSBEb21IYW5kbGVyLmdldEZvY3VzYWJsZUVsZW1lbnRzKHRoaXMucGFuZWxFbC5uYXRpdmVFbGVtZW50LCAnLnAtdHJlZW5vZGUnKTtcblxuICAgICAgICAgICAgaWYgKGZvY3VzYWJsZUVsZW1lbnRzICYmIGZvY3VzYWJsZUVsZW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBmb2N1c2FibGVFbGVtZW50c1swXS5mb2N1cygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25GaXJzdEhpZGRlbkZvY3VzKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGZvY3VzYWJsZUVsID1cbiAgICAgICAgICAgIGV2ZW50LnJlbGF0ZWRUYXJnZXQgPT09IHRoaXMuZm9jdXNJbnB1dD8ubmF0aXZlRWxlbWVudCA/IERvbUhhbmRsZXIuZ2V0Rmlyc3RGb2N1c2FibGVFbGVtZW50KHRoaXMub3ZlcmxheVZpZXdDaGlsZD8ub3ZlcmxheVZpZXdDaGlsZD8ubmF0aXZlRWxlbWVudCwgJzpub3QoW2RhdGEtcC1oaWRkZW4tZm9jdXNhYmxlPVwidHJ1ZVwiXSknKSA6IHRoaXMuZm9jdXNJbnB1dD8ubmF0aXZlRWxlbWVudDtcblxuICAgICAgICBEb21IYW5kbGVyLmZvY3VzKGZvY3VzYWJsZUVsKTtcbiAgICB9XG5cbiAgICBvbkxhc3RIaWRkZW5Gb2N1cyhldmVudCkge1xuICAgICAgICBjb25zdCBmb2N1c2FibGVFbCA9XG4gICAgICAgICAgICBldmVudC5yZWxhdGVkVGFyZ2V0ID09PSB0aGlzLmZvY3VzSW5wdXQ/Lm5hdGl2ZUVsZW1lbnQgPyBEb21IYW5kbGVyLmdldExhc3RGb2N1c2FibGVFbGVtZW50KHRoaXMub3ZlcmxheVZpZXdDaGlsZD8ub3ZlcmxheVZpZXdDaGlsZD8ubmF0aXZlRWxlbWVudCwgJzpub3QoW2RhdGEtcC1oaWRkZW4tZm9jdXNhYmxlPVwidHJ1ZVwiXSknKSA6IHRoaXMuZm9jdXNJbnB1dD8ubmF0aXZlRWxlbWVudDtcblxuICAgICAgICBEb21IYW5kbGVyLmZvY3VzKGZvY3VzYWJsZUVsKTtcbiAgICB9XG5cbiAgICBzaG93KCkge1xuICAgICAgICB0aGlzLm92ZXJsYXlWaXNpYmxlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBoaWRlKGV2ZW50PzogYW55KSB7XG4gICAgICAgIHRoaXMub3ZlcmxheVZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5yZXNldEZpbHRlcigpO1xuXG4gICAgICAgIHRoaXMub25IaWRlLmVtaXQoZXZlbnQpO1xuICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIGNsZWFyKGV2ZW50OiBFdmVudCkge1xuICAgICAgICB0aGlzLnZhbHVlID0gbnVsbDtcbiAgICAgICAgdGhpcy5yZXNldEV4cGFuZGVkTm9kZXMoKTtcbiAgICAgICAgdGhpcy5yZXNldFBhcnRpYWxTZWxlY3RlZCgpO1xuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy52YWx1ZSk7XG4gICAgICAgIHRoaXMub25DbGVhci5lbWl0KCk7XG5cbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuXG4gICAgY2hlY2tWYWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWUgIT09IG51bGwgJiYgT2JqZWN0VXRpbHMuaXNOb3RFbXB0eSh0aGlzLnZhbHVlKTtcbiAgICB9XG5cbiAgICBvblRhYktleShldmVudCwgcHJlc3NlZEluSW5wdXRUZXh0ID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKCFwcmVzc2VkSW5JbnB1dFRleHQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm92ZXJsYXlWaXNpYmxlICYmIHRoaXMuaGFzRm9jdXNhYmxlRWxlbWVudHMoKSkge1xuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuZm9jdXMoZXZlbnQuc2hpZnRLZXkgPyB0aGlzLmxhc3RIaWRkZW5Gb2N1c2FibGVFbGVtZW50T25PdmVybGF5Lm5hdGl2ZUVsZW1lbnQgOiB0aGlzLmZpcnN0SGlkZGVuRm9jdXNhYmxlRWxlbWVudE9uT3ZlcmxheS5uYXRpdmVFbGVtZW50KTtcblxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheVZpc2libGUgJiYgdGhpcy5oaWRlKHRoaXMuZmlsdGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhc0ZvY3VzYWJsZUVsZW1lbnRzKCkge1xuICAgICAgICByZXR1cm4gRG9tSGFuZGxlci5nZXRGb2N1c2FibGVFbGVtZW50cyh0aGlzLm92ZXJsYXlWaWV3Q2hpbGQub3ZlcmxheVZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCAnOm5vdChbZGF0YS1wLWhpZGRlbi1mb2N1c2FibGU9XCJ0cnVlXCJdKScpLmxlbmd0aCA+IDA7XG4gICAgfVxuXG4gICAgcmVzZXRGaWx0ZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmZpbHRlciAmJiAhdGhpcy5yZXNldEZpbHRlck9uSGlkZSkge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJlZE5vZGVzID0gdGhpcy50cmVlVmlld0NoaWxkPy5maWx0ZXJlZE5vZGVzO1xuICAgICAgICAgICAgdGhpcy50cmVlVmlld0NoaWxkPy5yZXNldEZpbHRlcigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJWYWx1ZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVUcmVlU3RhdGUoKSB7XG4gICAgICAgIGlmICh0aGlzLnZhbHVlKSB7XG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWROb2RlcyA9IHRoaXMuc2VsZWN0aW9uTW9kZSA9PT0gJ3NpbmdsZScgPyBbdGhpcy52YWx1ZV0gOiBbLi4udGhpcy52YWx1ZV07XG4gICAgICAgICAgICB0aGlzLnJlc2V0RXhwYW5kZWROb2RlcygpO1xuICAgICAgICAgICAgdGhpcy5yZXNldFBhcnRpYWxTZWxlY3RlZCgpO1xuICAgICAgICAgICAgaWYgKHNlbGVjdGVkTm9kZXMgJiYgdGhpcy5vcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVUcmVlQnJhbmNoU3RhdGUobnVsbCwgbnVsbCwgc2VsZWN0ZWROb2Rlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVUcmVlQnJhbmNoU3RhdGUobm9kZTogVHJlZU5vZGUgfCBudWxsLCBwYXRoOiBhbnksIHNlbGVjdGVkTm9kZXM6IFRyZWVOb2RlW10pIHtcbiAgICAgICAgaWYgKG5vZGUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzU2VsZWN0ZWQobm9kZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmV4cGFuZFBhdGgocGF0aCk7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWROb2Rlcy5zcGxpY2Uoc2VsZWN0ZWROb2Rlcy5pbmRleE9mKG5vZGUpLCAxKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHNlbGVjdGVkTm9kZXMubGVuZ3RoID4gMCAmJiBub2RlLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgY2hpbGROb2RlIG9mIG5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVUcmVlQnJhbmNoU3RhdGUoY2hpbGROb2RlLCBbLi4ucGF0aCwgbm9kZV0sIHNlbGVjdGVkTm9kZXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvciAobGV0IGNoaWxkTm9kZSBvZiB0aGlzLm9wdGlvbnMgYXMgVHJlZU5vZGVbXSkge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVHJlZUJyYW5jaFN0YXRlKGNoaWxkTm9kZSwgW10sIHNlbGVjdGVkTm9kZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZXhwYW5kUGF0aChleHBhbmRlZE5vZGVzOiBUcmVlTm9kZVtdKSB7XG4gICAgICAgIGZvciAobGV0IG5vZGUgb2YgZXhwYW5kZWROb2Rlcykge1xuICAgICAgICAgICAgbm9kZS5leHBhbmRlZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmV4cGFuZGVkTm9kZXMgPSBbLi4uZXhwYW5kZWROb2Rlc107XG4gICAgfVxuXG4gICAgbm9kZUV4cGFuZChldmVudDogeyBvcmlnaW5hbEV2ZW50OiBFdmVudDsgbm9kZTogVHJlZU5vZGUgfSkge1xuICAgICAgICB0aGlzLm9uTm9kZUV4cGFuZC5lbWl0KGV2ZW50KTtcbiAgICAgICAgdGhpcy5leHBhbmRlZE5vZGVzLnB1c2goZXZlbnQubm9kZSk7XG4gICAgfVxuXG4gICAgbm9kZUNvbGxhcHNlKGV2ZW50OiB7IG9yaWdpbmFsRXZlbnQ6IEV2ZW50OyBub2RlOiBUcmVlTm9kZSB9KSB7XG4gICAgICAgIHRoaXMub25Ob2RlQ29sbGFwc2UuZW1pdChldmVudCk7XG4gICAgICAgIHRoaXMuZXhwYW5kZWROb2Rlcy5zcGxpY2UodGhpcy5leHBhbmRlZE5vZGVzLmluZGV4T2YoZXZlbnQubm9kZSksIDEpO1xuICAgIH1cblxuICAgIHJlc2V0RXhwYW5kZWROb2RlcygpIHtcbiAgICAgICAgZm9yIChsZXQgbm9kZSBvZiB0aGlzLmV4cGFuZGVkTm9kZXMpIHtcbiAgICAgICAgICAgIG5vZGUuZXhwYW5kZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZXhwYW5kZWROb2RlcyA9IFtdO1xuICAgIH1cblxuICAgIHJlc2V0UGFydGlhbFNlbGVjdGVkKG5vZGVzID0gdGhpcy5vcHRpb25zKTogdm9pZCB7XG4gICAgICAgIGlmICghbm9kZXMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IG5vZGUgb2Ygbm9kZXMpIHtcbiAgICAgICAgICAgIG5vZGUucGFydGlhbFNlbGVjdGVkID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGlmIChub2RlLmNoaWxkcmVuICYmIG5vZGUuY2hpbGRyZW4/Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0UGFydGlhbFNlbGVjdGVkKG5vZGUuY2hpbGRyZW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZmluZFNlbGVjdGVkTm9kZXMobm9kZTogVHJlZU5vZGUsIGtleXM6IGFueVtdLCBzZWxlY3RlZE5vZGVzOiBUcmVlTm9kZVtdKSB7XG4gICAgICAgIGlmIChub2RlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc1NlbGVjdGVkKG5vZGUpKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWROb2Rlcy5wdXNoKG5vZGUpO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBrZXlzW25vZGUua2V5IGFzIGFueV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChPYmplY3Qua2V5cyhrZXlzKS5sZW5ndGggJiYgbm9kZS5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGNoaWxkTm9kZSBvZiBub2RlLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmluZFNlbGVjdGVkTm9kZXMoY2hpbGROb2RlLCBrZXlzLCBzZWxlY3RlZE5vZGVzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGxldCBjaGlsZE5vZGUgb2YgdGhpcy5vcHRpb25zIGFzIFRyZWVOb2RlW10pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbmRTZWxlY3RlZE5vZGVzKGNoaWxkTm9kZSwga2V5cywgc2VsZWN0ZWROb2Rlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc1NlbGVjdGVkKG5vZGU6IFRyZWVOb2RlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbmRJbmRleEluU2VsZWN0aW9uKG5vZGUpICE9IC0xO1xuICAgIH1cblxuICAgIGZpbmRJbmRleEluU2VsZWN0aW9uKG5vZGU6IFRyZWVOb2RlKSB7XG4gICAgICAgIGxldCBpbmRleDogbnVtYmVyID0gLTE7XG5cbiAgICAgICAgaWYgKHRoaXMudmFsdWUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGlvbk1vZGUgPT09ICdzaW5nbGUnKSB7XG4gICAgICAgICAgICAgICAgbGV0IGFyZU5vZGVzRXF1YWwgPSAodGhpcy52YWx1ZS5rZXkgJiYgdGhpcy52YWx1ZS5rZXkgPT09IG5vZGUua2V5KSB8fCB0aGlzLnZhbHVlID09IG5vZGU7XG4gICAgICAgICAgICAgICAgaW5kZXggPSBhcmVOb2Rlc0VxdWFsID8gMCA6IC0xO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkTm9kZSA9IHRoaXMudmFsdWVbaV07XG4gICAgICAgICAgICAgICAgICAgIGxldCBhcmVOb2Rlc0VxdWFsID0gKHNlbGVjdGVkTm9kZS5rZXkgJiYgc2VsZWN0ZWROb2RlLmtleSA9PT0gbm9kZS5rZXkpIHx8IHNlbGVjdGVkTm9kZSA9PSBub2RlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYXJlTm9kZXNFcXVhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXggPSBpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuXG4gICAgb25TZWxlY3QoZXZlbnQ6IFRyZWVOb2RlU2VsZWN0RXZlbnQpIHtcbiAgICAgICAgdGhpcy5vbk5vZGVTZWxlY3QuZW1pdChldmVudCk7XG5cbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uTW9kZSA9PT0gJ3NpbmdsZScpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgdGhpcy5mb2N1c0lucHV0Py5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblVuc2VsZWN0KGV2ZW50OiBUcmVlTm9kZVVuU2VsZWN0RXZlbnQpIHtcbiAgICAgICAgdGhpcy5vbk5vZGVVbnNlbGVjdC5lbWl0KGV2ZW50KTtcbiAgICB9XG5cbiAgICBvbkZvY3VzKCkge1xuICAgICAgICB0aGlzLmZvY3VzZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIG9uQmx1cigpIHtcbiAgICAgICAgdGhpcy5mb2N1c2VkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy51cGRhdGVUcmVlU3RhdGUoKTtcbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbk1vZGVsVG91Y2hlZCA9IGZuO1xuICAgIH1cblxuICAgIHNldERpc2FibGVkU3RhdGUodmFsOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSB2YWw7XG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgY29udGFpbmVyQ2xhc3MoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAncC10cmVlc2VsZWN0IHAtY29tcG9uZW50IHAtaW5wdXR3cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICdwLXRyZWVzZWxlY3QtY2hpcCc6IHRoaXMuZGlzcGxheSA9PT0gJ2NoaXAnLFxuICAgICAgICAgICAgJ3AtZGlzYWJsZWQnOiB0aGlzLmRpc2FibGVkLFxuICAgICAgICAgICAgJ3AtZm9jdXMnOiB0aGlzLmZvY3VzZWRcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBsYWJlbENsYXNzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJ3AtdHJlZXNlbGVjdC1sYWJlbCc6IHRydWUsXG4gICAgICAgICAgICAncC1wbGFjZWhvbGRlcic6IHRoaXMubGFiZWwgPT09IHRoaXMucGxhY2Vob2xkZXIsXG4gICAgICAgICAgICAncC10cmVlc2VsZWN0LWxhYmVsLWVtcHR5JzogIXRoaXMucGxhY2Vob2xkZXIgJiYgdGhpcy5lbXB0eVZhbHVlXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZ2V0IGVtcHR5VmFsdWUoKSB7XG4gICAgICAgIHJldHVybiAhdGhpcy52YWx1ZSB8fCBPYmplY3Qua2V5cyh0aGlzLnZhbHVlKS5sZW5ndGggPT09IDA7XG4gICAgfVxuXG4gICAgZ2V0IGVtcHR5T3B0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLm9wdGlvbnMgfHwgdGhpcy5vcHRpb25zLmxlbmd0aCA9PT0gMDtcbiAgICB9XG5cbiAgICBnZXQgbGFiZWwoKSB7XG4gICAgICAgIGxldCB2YWx1ZSA9IHRoaXMudmFsdWUgfHwgW107XG4gICAgICAgIHJldHVybiB2YWx1ZS5sZW5ndGggPyB2YWx1ZS5tYXAoKG5vZGU6IFRyZWVOb2RlKSA9PiBub2RlLmxhYmVsKS5qb2luKCcsICcpIDogdGhpcy5zZWxlY3Rpb25Nb2RlID09PSAnc2luZ2xlJyAmJiB0aGlzLnZhbHVlID8gdmFsdWUubGFiZWwgOiB0aGlzLnBsYWNlaG9sZGVyO1xuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBPdmVybGF5TW9kdWxlLCBSaXBwbGVNb2R1bGUsIFNoYXJlZE1vZHVsZSwgVHJlZU1vZHVsZSwgU2VhcmNoSWNvbiwgVGltZXNJY29uLCBDaGV2cm9uRG93bkljb25dLFxuICAgIGV4cG9ydHM6IFtUcmVlU2VsZWN0LCBPdmVybGF5TW9kdWxlLCBTaGFyZWRNb2R1bGUsIFRyZWVNb2R1bGVdLFxuICAgIGRlY2xhcmF0aW9uczogW1RyZWVTZWxlY3RdXG59KVxuZXhwb3J0IGNsYXNzIFRyZWVTZWxlY3RNb2R1bGUge31cbiJdfQ==