import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, HostListener, Inject, Input, NgModule, Output, ViewEncapsulation, forwardRef } from '@angular/core';
import { Header, PrimeTemplate, SharedModule } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { ChevronDownIcon } from 'primeng/icons/chevrondown';
import { ChevronRightIcon } from 'primeng/icons/chevronright';
import { UniqueComponentId } from 'primeng/utils';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 * AccordionTab is a helper component for Accordion.
 * @group Components
 */
export class AccordionTab {
    el;
    changeDetector;
    /**
     * Current id state as a string.
     * @group Props
     */
    id;
    /**
     * Used to define the header of the tab.
     * @group Props
     */
    header;
    /**
     * Inline style of the tab header.
     * @group Props
     */
    headerStyle;
    /**
     * Inline style of the tab.
     * @group Props
     */
    tabStyle;
    /**
     * Inline style of the tab content.
     * @group Props
     */
    contentStyle;
    /**
     * Style class of the tab.
     * @group Props
     */
    tabStyleClass;
    /**
     * Style class of the tab header.
     * @group Props
     */
    headerStyleClass;
    /**
     * Style class of the tab content.
     * @group Props
     */
    contentStyleClass;
    /**
     * Whether the tab is disabled.
     * @group Props
     */
    disabled;
    /**
     * Whether a lazy loaded panel should avoid getting loaded again on reselection.
     * @group Props
     */
    cache = true;
    /**
     * Transition options of the animation.
     * @group Props
     */
    transitionOptions = '400ms cubic-bezier(0.86, 0, 0.07, 1)';
    /**
     * Position of the icon.
     * @group Props
     */
    iconPos = 'start';
    /**
     * The value that returns the selection.
     * @group Props
     */
    get selected() {
        return this._selected;
    }
    set selected(val) {
        this._selected = val;
        if (!this.loaded) {
            if (this._selected && this.cache) {
                this.loaded = true;
            }
            this.changeDetector.detectChanges();
        }
    }
    /**
     * The aria-level that each accordion header will have. The default value is 2 as per W3C specifications
     * @group Props
     */
    headerAriaLevel = 2;
    /**
     * Event triggered by changing the choice.
     * @param {boolean} value - Boolean value indicates that the option is changed.
     * @group Emits
     */
    selectedChange = new EventEmitter();
    headerFacet;
    templates;
    _selected = false;
    get iconClass() {
        if (this.iconPos === 'end') {
            return 'p-accordion-toggle-icon-end';
        }
        else {
            return 'p-accordion-toggle-icon';
        }
    }
    contentTemplate;
    headerTemplate;
    iconTemplate;
    loaded = false;
    accordion;
    constructor(accordion, el, changeDetector) {
        this.el = el;
        this.changeDetector = changeDetector;
        this.accordion = accordion;
        this.id = UniqueComponentId();
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'content':
                    this.contentTemplate = item.template;
                    break;
                case 'header':
                    this.headerTemplate = item.template;
                    break;
                case 'icon':
                    this.iconTemplate = item.template;
                    break;
                default:
                    this.contentTemplate = item.template;
                    break;
            }
        });
    }
    toggle(event) {
        if (this.disabled) {
            return false;
        }
        let index = this.findTabIndex();
        if (this.selected) {
            this.selected = false;
            this.accordion.onClose.emit({ originalEvent: event, index: index });
        }
        else {
            if (!this.accordion.multiple) {
                for (var i = 0; i < this.accordion.tabs.length; i++) {
                    if (this.accordion.tabs[i].selected) {
                        this.accordion.tabs[i].selected = false;
                        this.accordion.tabs[i].selectedChange.emit(false);
                        this.accordion.tabs[i].changeDetector.markForCheck();
                    }
                }
            }
            this.selected = true;
            this.loaded = true;
            this.accordion.onOpen.emit({ originalEvent: event, index: index });
        }
        this.selectedChange.emit(this.selected);
        this.accordion.updateActiveIndex();
        this.changeDetector.markForCheck();
        event?.preventDefault();
    }
    findTabIndex() {
        let index = -1;
        for (var i = 0; i < this.accordion.tabs.length; i++) {
            if (this.accordion.tabs[i] == this) {
                index = i;
                break;
            }
        }
        return index;
    }
    get hasHeaderFacet() {
        return this.headerFacet && this.headerFacet.length > 0;
    }
    onKeydown(event) {
        switch (event.code) {
            case 'Enter':
            case 'Space':
                this.toggle(event);
                event.preventDefault(); // ???
                break;
            default:
                break;
        }
    }
    getTabHeaderActionId(tabId) {
        return `${tabId}_header_action`;
    }
    getTabContentId(tabId) {
        return `${tabId}_content`;
    }
    ngOnDestroy() {
        this.accordion.tabs.splice(this.findTabIndex(), 1);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: AccordionTab, deps: [{ token: forwardRef(() => Accordion) }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.5", type: AccordionTab, selector: "p-accordionTab", inputs: { id: "id", header: "header", headerStyle: "headerStyle", tabStyle: "tabStyle", contentStyle: "contentStyle", tabStyleClass: "tabStyleClass", headerStyleClass: "headerStyleClass", contentStyleClass: "contentStyleClass", disabled: "disabled", cache: "cache", transitionOptions: "transitionOptions", iconPos: "iconPos", selected: "selected", headerAriaLevel: "headerAriaLevel" }, outputs: { selectedChange: "selectedChange" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "headerFacet", predicate: Header }, { propertyName: "templates", predicate: PrimeTemplate }], ngImport: i0, template: `
        <div class="p-accordion-tab" [class.p-accordion-tab-active]="selected" [ngClass]="tabStyleClass" [ngStyle]="tabStyle" [attr.data-pc-name]="'accordiontab'">
            <div class="p-accordion-header" role="heading" [attr.aria-level]="headerAriaLevel" [class.p-highlight]="selected" [class.p-disabled]="disabled" [attr.data-p-disabled]="disabled" [attr.data-pc-section]="'header'">
                <a
                    [ngClass]="headerStyleClass"
                    [style]="headerStyle"
                    role="button"
                    class="p-accordion-header-link"
                    (click)="toggle($event)"
                    (keydown)="onKeydown($event)"
                    [attr.tabindex]="disabled ? null : 0"
                    [attr.id]="getTabHeaderActionId(id)"
                    [attr.aria-controls]="getTabContentId(id)"
                    [attr.aria-expanded]="selected"
                    [attr.aria-disabled]="disabled"
                    [attr.data-pc-section]="'headeraction'"
                >
                    <ng-container *ngIf="!iconTemplate">
                        <ng-container *ngIf="selected">
                            <span *ngIf="accordion.collapseIcon" [class]="accordion.collapseIcon" [ngClass]="iconClass" [attr.aria-hidden]="true"></span>
                            <ChevronDownIcon *ngIf="!accordion.collapseIcon" [ngClass]="iconClass" [attr.aria-hidden]="true" />
                        </ng-container>
                        <ng-container *ngIf="!selected">
                            <span *ngIf="accordion.expandIcon" [class]="accordion.expandIcon" [ngClass]="iconClass" [attr.aria-hidden]="true"></span>
                            <ChevronRightIcon *ngIf="!accordion.expandIcon" [ngClass]="iconClass" [attr.aria-hidden]="true" />
                        </ng-container>
                    </ng-container>
                    <ng-template *ngTemplateOutlet="iconTemplate; context: { $implicit: selected }"></ng-template>
                    <span class="p-accordion-header-text" *ngIf="!hasHeaderFacet">
                        {{ header }}
                    </span>
                    <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                    <ng-content select="p-header" *ngIf="hasHeaderFacet"></ng-content>
                </a>
            </div>
            <div
                [attr.id]="getTabContentId(id)"
                class="p-toggleable-content"
                [@tabContent]="selected ? { value: 'visible', params: { transitionParams: transitionOptions } } : { value: 'hidden', params: { transitionParams: transitionOptions } }"
                role="region"
                [attr.aria-hidden]="!selected"
                [attr.aria-labelledby]="getTabHeaderActionId(id)"
                [attr.data-pc-section]="'toggleablecontent'"
            >
                <div class="p-accordion-content" [ngClass]="contentStyleClass" [ngStyle]="contentStyle">
                    <ng-content></ng-content>
                    <ng-container *ngIf="contentTemplate && (cache ? loaded : selected)">
                        <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
                    </ng-container>
                </div>
            </div>
        </div>
    `, isInline: true, styles: ["@layer primeng{.p-accordion-header-link{cursor:pointer;display:flex;align-items:center;-webkit-user-select:none;user-select:none;position:relative;text-decoration:none}.p-accordion-header-link:focus{z-index:1}.p-accordion-header-text{line-height:1}.p-accordion .p-toggleable-content{overflow:hidden}.p-accordion .p-accordion-tab-active>.p-toggleable-content:not(.ng-animating){overflow:inherit}.p-accordion-toggle-icon-end{order:1;margin-left:auto}.p-accordion-toggle-icon{order:0}}\n"], dependencies: [{ kind: "directive", type: i0.forwardRef(() => i1.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgIf), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgStyle), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: i0.forwardRef(() => ChevronRightIcon), selector: "ChevronRightIcon" }, { kind: "component", type: i0.forwardRef(() => ChevronDownIcon), selector: "ChevronDownIcon" }], animations: [
            trigger('tabContent', [
                state('hidden', style({
                    height: '0',
                    visibility: 'hidden'
                })),
                state('visible', style({
                    height: '*',
                    visibility: 'visible'
                })),
                transition('visible <=> hidden', [animate('{{transitionParams}}')]),
                transition('void => *', animate(0))
            ])
        ], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: AccordionTab, decorators: [{
            type: Component,
            args: [{ selector: 'p-accordionTab', template: `
        <div class="p-accordion-tab" [class.p-accordion-tab-active]="selected" [ngClass]="tabStyleClass" [ngStyle]="tabStyle" [attr.data-pc-name]="'accordiontab'">
            <div class="p-accordion-header" role="heading" [attr.aria-level]="headerAriaLevel" [class.p-highlight]="selected" [class.p-disabled]="disabled" [attr.data-p-disabled]="disabled" [attr.data-pc-section]="'header'">
                <a
                    [ngClass]="headerStyleClass"
                    [style]="headerStyle"
                    role="button"
                    class="p-accordion-header-link"
                    (click)="toggle($event)"
                    (keydown)="onKeydown($event)"
                    [attr.tabindex]="disabled ? null : 0"
                    [attr.id]="getTabHeaderActionId(id)"
                    [attr.aria-controls]="getTabContentId(id)"
                    [attr.aria-expanded]="selected"
                    [attr.aria-disabled]="disabled"
                    [attr.data-pc-section]="'headeraction'"
                >
                    <ng-container *ngIf="!iconTemplate">
                        <ng-container *ngIf="selected">
                            <span *ngIf="accordion.collapseIcon" [class]="accordion.collapseIcon" [ngClass]="iconClass" [attr.aria-hidden]="true"></span>
                            <ChevronDownIcon *ngIf="!accordion.collapseIcon" [ngClass]="iconClass" [attr.aria-hidden]="true" />
                        </ng-container>
                        <ng-container *ngIf="!selected">
                            <span *ngIf="accordion.expandIcon" [class]="accordion.expandIcon" [ngClass]="iconClass" [attr.aria-hidden]="true"></span>
                            <ChevronRightIcon *ngIf="!accordion.expandIcon" [ngClass]="iconClass" [attr.aria-hidden]="true" />
                        </ng-container>
                    </ng-container>
                    <ng-template *ngTemplateOutlet="iconTemplate; context: { $implicit: selected }"></ng-template>
                    <span class="p-accordion-header-text" *ngIf="!hasHeaderFacet">
                        {{ header }}
                    </span>
                    <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                    <ng-content select="p-header" *ngIf="hasHeaderFacet"></ng-content>
                </a>
            </div>
            <div
                [attr.id]="getTabContentId(id)"
                class="p-toggleable-content"
                [@tabContent]="selected ? { value: 'visible', params: { transitionParams: transitionOptions } } : { value: 'hidden', params: { transitionParams: transitionOptions } }"
                role="region"
                [attr.aria-hidden]="!selected"
                [attr.aria-labelledby]="getTabHeaderActionId(id)"
                [attr.data-pc-section]="'toggleablecontent'"
            >
                <div class="p-accordion-content" [ngClass]="contentStyleClass" [ngStyle]="contentStyle">
                    <ng-content></ng-content>
                    <ng-container *ngIf="contentTemplate && (cache ? loaded : selected)">
                        <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
                    </ng-container>
                </div>
            </div>
        </div>
    `, animations: [
                        trigger('tabContent', [
                            state('hidden', style({
                                height: '0',
                                visibility: 'hidden'
                            })),
                            state('visible', style({
                                height: '*',
                                visibility: 'visible'
                            })),
                            transition('visible <=> hidden', [animate('{{transitionParams}}')]),
                            transition('void => *', animate(0))
                        ])
                    ], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: ["@layer primeng{.p-accordion-header-link{cursor:pointer;display:flex;align-items:center;-webkit-user-select:none;user-select:none;position:relative;text-decoration:none}.p-accordion-header-link:focus{z-index:1}.p-accordion-header-text{line-height:1}.p-accordion .p-toggleable-content{overflow:hidden}.p-accordion .p-accordion-tab-active>.p-toggleable-content:not(.ng-animating){overflow:inherit}.p-accordion-toggle-icon-end{order:1;margin-left:auto}.p-accordion-toggle-icon{order:0}}\n"] }]
        }], ctorParameters: () => [{ type: Accordion, decorators: [{
                    type: Inject,
                    args: [forwardRef(() => Accordion)]
                }] }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }], propDecorators: { id: [{
                type: Input
            }], header: [{
                type: Input
            }], headerStyle: [{
                type: Input
            }], tabStyle: [{
                type: Input
            }], contentStyle: [{
                type: Input
            }], tabStyleClass: [{
                type: Input
            }], headerStyleClass: [{
                type: Input
            }], contentStyleClass: [{
                type: Input
            }], disabled: [{
                type: Input
            }], cache: [{
                type: Input
            }], transitionOptions: [{
                type: Input
            }], iconPos: [{
                type: Input
            }], selected: [{
                type: Input
            }], headerAriaLevel: [{
                type: Input
            }], selectedChange: [{
                type: Output
            }], headerFacet: [{
                type: ContentChildren,
                args: [Header]
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
/**
 * Accordion groups a collection of contents in tabs.
 * @group Components
 */
export class Accordion {
    el;
    changeDetector;
    /**
     * When enabled, multiple tabs can be activated at the same time.
     * @group Props
     */
    multiple = false;
    /**
     * Inline style of the tab header and content.
     * @group Props
     */
    style;
    /**
     * Class of the element.
     * @group Props
     */
    styleClass;
    /**
     * Icon of a collapsed tab.
     * @group Props
     */
    expandIcon;
    /**
     * Icon of an expanded tab.
     * @group Props
     */
    collapseIcon;
    /**
     * Index of the active tab or an array of indexes in multiple mode.
     * @group Props
     */
    get activeIndex() {
        return this._activeIndex;
    }
    set activeIndex(val) {
        this._activeIndex = val;
        if (this.preventActiveIndexPropagation) {
            this.preventActiveIndexPropagation = false;
            return;
        }
        this.updateSelectionState();
    }
    /**
     * When enabled, the focused tab is activated.
     * @group Props
     */
    selectOnFocus = false;
    /**
     * The aria-level that each accordion header will have. The default value is 2 as per W3C specifications
     * @group Props
     */
    get headerAriaLevel() {
        return this._headerAriaLevel;
    }
    set headerAriaLevel(val) {
        if (typeof val === 'number' && val > 0) {
            this._headerAriaLevel = val;
        }
        else if (this._headerAriaLevel !== 2) {
            this._headerAriaLevel = 2;
        }
    }
    /**
     * Callback to invoke when an active tab is collapsed by clicking on the header.
     * @param {AccordionTabCloseEvent} event - Custom tab close event.
     * @group Emits
     */
    onClose = new EventEmitter();
    /**
     * Callback to invoke when a tab gets expanded.
     * @param {AccordionTabOpenEvent} event - Custom tab open event.
     * @group Emits
     */
    onOpen = new EventEmitter();
    /**
     * Returns the active index.
     * @param {number | number[]} value - New index.
     * @group Emits
     */
    activeIndexChange = new EventEmitter();
    tabList;
    tabListSubscription = null;
    _activeIndex;
    _headerAriaLevel = 2;
    preventActiveIndexPropagation = false;
    tabs = [];
    constructor(el, changeDetector) {
        this.el = el;
        this.changeDetector = changeDetector;
    }
    onKeydown(event) {
        switch (event.code) {
            case 'ArrowDown':
                this.onTabArrowDownKey(event);
                break;
            case 'ArrowUp':
                this.onTabArrowUpKey(event);
                break;
            case 'Home':
                this.onTabHomeKey(event);
                break;
            case 'End':
                this.onTabEndKey(event);
                break;
        }
    }
    onTabArrowDownKey(event) {
        const nextHeaderAction = this.findNextHeaderAction(event.target.parentElement.parentElement.parentElement);
        nextHeaderAction ? this.changeFocusedTab(nextHeaderAction) : this.onTabHomeKey(event);
        event.preventDefault();
    }
    onTabArrowUpKey(event) {
        const prevHeaderAction = this.findPrevHeaderAction(event.target.parentElement.parentElement.parentElement);
        prevHeaderAction ? this.changeFocusedTab(prevHeaderAction) : this.onTabEndKey(event);
        event.preventDefault();
    }
    onTabHomeKey(event) {
        const firstHeaderAction = this.findFirstHeaderAction();
        this.changeFocusedTab(firstHeaderAction);
        event.preventDefault();
    }
    changeFocusedTab(element) {
        if (element) {
            DomHandler.focus(element);
            if (this.selectOnFocus) {
                this.tabs.forEach((tab, i) => {
                    let selected = this.multiple ? this._activeIndex.includes(i) : i === this._activeIndex;
                    if (this.multiple) {
                        if (!this._activeIndex) {
                            this._activeIndex = [];
                        }
                        if (tab.id == element.id) {
                            tab.selected = !tab.selected;
                            if (!this._activeIndex.includes(i)) {
                                this._activeIndex.push(i);
                            }
                            else {
                                this._activeIndex = this._activeIndex.filter((ind) => ind !== i);
                            }
                        }
                    }
                    else {
                        if (tab.id == element.id) {
                            tab.selected = !tab.selected;
                            this._activeIndex = i;
                        }
                        else {
                            tab.selected = false;
                        }
                    }
                    tab.selectedChange.emit(selected);
                    this.activeIndexChange.emit(this._activeIndex);
                    tab.changeDetector.markForCheck();
                });
            }
        }
    }
    findNextHeaderAction(tabElement, selfCheck = false) {
        const nextTabElement = selfCheck ? tabElement : tabElement.nextElementSibling;
        const headerElement = DomHandler.findSingle(nextTabElement, '[data-pc-section="header"]');
        return headerElement ? (DomHandler.getAttribute(headerElement, 'data-p-disabled') ? this.findNextHeaderAction(headerElement.parentElement.parentElement) : DomHandler.findSingle(headerElement, '[data-pc-section="headeraction"]')) : null;
    }
    findPrevHeaderAction(tabElement, selfCheck = false) {
        const prevTabElement = selfCheck ? tabElement : tabElement.previousElementSibling;
        const headerElement = DomHandler.findSingle(prevTabElement, '[data-pc-section="header"]');
        return headerElement ? (DomHandler.getAttribute(headerElement, 'data-p-disabled') ? this.findPrevHeaderAction(headerElement.parentElement.parentElement) : DomHandler.findSingle(headerElement, '[data-pc-section="headeraction"]')) : null;
    }
    findFirstHeaderAction() {
        const firstEl = this.el.nativeElement.firstElementChild.childNodes[0];
        return this.findNextHeaderAction(firstEl, true);
    }
    findLastHeaderAction() {
        const childNodes = this.el.nativeElement.firstElementChild.childNodes;
        const lastEl = childNodes[childNodes.length - 1];
        return this.findPrevHeaderAction(lastEl, true);
    }
    onTabEndKey(event) {
        const lastHeaderAction = this.findLastHeaderAction();
        this.changeFocusedTab(lastHeaderAction);
        event.preventDefault();
    }
    ngAfterContentInit() {
        this.initTabs();
        this.tabListSubscription = this.tabList.changes.subscribe((_) => {
            this.initTabs();
        });
    }
    initTabs() {
        this.tabs = this.tabList.toArray();
        this.tabs.forEach((tab) => {
            tab.headerAriaLevel = this._headerAriaLevel;
        });
        this.updateSelectionState();
        this.changeDetector.markForCheck();
    }
    getBlockableElement() {
        return this.el.nativeElement.children[0];
    }
    updateSelectionState() {
        if (this.tabs && this.tabs.length && this._activeIndex != null) {
            for (let i = 0; i < this.tabs.length; i++) {
                let selected = this.multiple ? this._activeIndex.includes(i) : i === this._activeIndex;
                let changed = selected !== this.tabs[i].selected;
                if (changed) {
                    this.tabs[i].selected = selected;
                    this.tabs[i].selectedChange.emit(selected);
                    this.tabs[i].changeDetector.markForCheck();
                }
            }
        }
    }
    isTabActive(index) {
        return this.multiple ? this._activeIndex && this._activeIndex.includes(index) : this._activeIndex === index;
    }
    getTabProp(tab, name) {
        return tab.props ? tab.props[name] : undefined;
    }
    updateActiveIndex() {
        let index = this.multiple ? [] : null;
        this.tabs.forEach((tab, i) => {
            if (tab.selected) {
                if (this.multiple) {
                    index.push(i);
                }
                else {
                    index = i;
                    return;
                }
            }
        });
        this.preventActiveIndexPropagation = true;
        this.activeIndexChange.emit(index);
    }
    ngOnDestroy() {
        if (this.tabListSubscription) {
            this.tabListSubscription.unsubscribe();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: Accordion, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.5", type: Accordion, selector: "p-accordion", inputs: { multiple: "multiple", style: "style", styleClass: "styleClass", expandIcon: "expandIcon", collapseIcon: "collapseIcon", activeIndex: "activeIndex", selectOnFocus: "selectOnFocus", headerAriaLevel: "headerAriaLevel" }, outputs: { onClose: "onClose", onOpen: "onOpen", activeIndexChange: "activeIndexChange" }, host: { listeners: { "keydown": "onKeydown($event)" }, classAttribute: "p-element" }, queries: [{ propertyName: "tabList", predicate: AccordionTab, descendants: true }], ngImport: i0, template: `
        <div [ngClass]="'p-accordion p-component'" [ngStyle]="style" [class]="styleClass">
            <ng-content></ng-content>
        </div>
    `, isInline: true, dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: Accordion, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-accordion',
                    template: `
        <div [ngClass]="'p-accordion p-component'" [ngStyle]="style" [class]="styleClass">
            <ng-content></ng-content>
        </div>
    `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    host: {
                        class: 'p-element'
                    }
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }], propDecorators: { multiple: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], expandIcon: [{
                type: Input
            }], collapseIcon: [{
                type: Input
            }], activeIndex: [{
                type: Input
            }], selectOnFocus: [{
                type: Input
            }], headerAriaLevel: [{
                type: Input
            }], onClose: [{
                type: Output
            }], onOpen: [{
                type: Output
            }], activeIndexChange: [{
                type: Output
            }], tabList: [{
                type: ContentChildren,
                args: [AccordionTab, { descendants: true }]
            }], onKeydown: [{
                type: HostListener,
                args: ['keydown', ['$event']]
            }] } });
export class AccordionModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: AccordionModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.0.5", ngImport: i0, type: AccordionModule, declarations: [Accordion, AccordionTab], imports: [CommonModule, ChevronRightIcon, ChevronDownIcon], exports: [Accordion, AccordionTab, SharedModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: AccordionModule, imports: [CommonModule, ChevronRightIcon, ChevronDownIcon, SharedModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: AccordionModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, ChevronRightIcon, ChevronDownIcon],
                    exports: [Accordion, AccordionTab, SharedModule],
                    declarations: [Accordion, AccordionTab]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3JkaW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL2FjY29yZGlvbi9hY2NvcmRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUVILHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsZUFBZSxFQUVmLFlBQVksRUFDWixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFDTCxRQUFRLEVBRVIsTUFBTSxFQUdOLGlCQUFpQixFQUNqQixVQUFVLEVBQ2IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFlLE1BQU0sRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQy9FLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDekMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzVELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRzlELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBRWxEOzs7R0FHRztBQW1GSCxNQUFNLE9BQU8sWUFBWTtJQW1IeUQ7SUFBdUI7SUFsSHJHOzs7T0FHRztJQUNNLEVBQUUsQ0FBcUI7SUFDaEM7OztPQUdHO0lBQ00sTUFBTSxDQUFxQjtJQUNwQzs7O09BR0c7SUFDTSxXQUFXLENBQThDO0lBQ2xFOzs7T0FHRztJQUNNLFFBQVEsQ0FBOEM7SUFDL0Q7OztPQUdHO0lBQ00sWUFBWSxDQUE4QztJQUNuRTs7O09BR0c7SUFDTSxhQUFhLENBQXFCO0lBQzNDOzs7T0FHRztJQUNNLGdCQUFnQixDQUFxQjtJ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QWpSaEQsU0FBUyxFQXZPVCxZQUFZLEVBeWZjLFlBQVk7d0dBR3RDLGVBQWUsWUFKZCxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsZUFBZSxFQUN0QixZQUFZOzsyRkFHdEMsZUFBZTtrQkFMM0IsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsZUFBZSxDQUFDO29CQUMxRCxPQUFPLEVBQUUsQ0FBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLFlBQVksQ0FBQztvQkFDaEQsWUFBWSxFQUFFLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQztpQkFDMUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhbmltYXRlLCBzdGF0ZSwgc3R5bGUsIHRyYW5zaXRpb24sIHRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZHJlbixcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBIb3N0TGlzdGVuZXIsXG4gICAgSW5qZWN0LFxuICAgIElucHV0LFxuICAgIE5nTW9kdWxlLFxuICAgIE9uRGVzdHJveSxcbiAgICBPdXRwdXQsXG4gICAgUXVlcnlMaXN0LFxuICAgIFRlbXBsYXRlUmVmLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uLFxuICAgIGZvcndhcmRSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCbG9ja2FibGVVSSwgSGVhZGVyLCBQcmltZVRlbXBsYXRlLCBTaGFyZWRNb2R1bGUgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBEb21IYW5kbGVyIH0gZnJvbSAncHJpbWVuZy9kb20nO1xuaW1wb3J0IHsgQ2hldnJvbkRvd25JY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy9jaGV2cm9uZG93bic7XG5pbXBvcnQgeyBDaGV2cm9uUmlnaHRJY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy9jaGV2cm9ucmlnaHQnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBBY2NvcmRpb25UYWJDbG9zZUV2ZW50LCBBY2NvcmRpb25UYWJPcGVuRXZlbnQgfSBmcm9tICcuL2FjY29yZGlvbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgVW5pcXVlQ29tcG9uZW50SWQgfSBmcm9tICdwcmltZW5nL3V0aWxzJztcblxuLyoqXG4gKiBBY2NvcmRpb25UYWIgaXMgYSBoZWxwZXIgY29tcG9uZW50IGZvciBBY2NvcmRpb24uXG4gKiBAZ3JvdXAgQ29tcG9uZW50c1xuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtYWNjb3JkaW9uVGFiJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IGNsYXNzPVwicC1hY2NvcmRpb24tdGFiXCIgW2NsYXNzLnAtYWNjb3JkaW9uLXRhYi1hY3RpdmVdPVwic2VsZWN0ZWRcIiBbbmdDbGFzc109XCJ0YWJTdHlsZUNsYXNzXCIgW25nU3R5bGVdPVwidGFiU3R5bGVcIiBbYXR0ci5kYXRhLXBjLW5hbWVdPVwiJ2FjY29yZGlvbnRhYidcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLWFjY29yZGlvbi1oZWFkZXJcIiByb2xlPVwiaGVhZGluZ1wiIFthdHRyLmFyaWEtbGV2ZWxdPVwiaGVhZGVyQXJpYUxldmVsXCIgW2NsYXNzLnAtaGlnaGxpZ2h0XT1cInNlbGVjdGVkXCIgW2NsYXNzLnAtZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiBbYXR0ci5kYXRhLXAtZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ2hlYWRlcidcIj5cbiAgICAgICAgICAgICAgICA8YVxuICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJoZWFkZXJTdHlsZUNsYXNzXCJcbiAgICAgICAgICAgICAgICAgICAgW3N0eWxlXT1cImhlYWRlclN0eWxlXCJcbiAgICAgICAgICAgICAgICAgICAgcm9sZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC1hY2NvcmRpb24taGVhZGVyLWxpbmtcIlxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwidG9nZ2xlKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAoa2V5ZG93bik9XCJvbktleWRvd24oJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLnRhYmluZGV4XT1cImRpc2FibGVkID8gbnVsbCA6IDBcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5pZF09XCJnZXRUYWJIZWFkZXJBY3Rpb25JZChpZClcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWNvbnRyb2xzXT1cImdldFRhYkNvbnRlbnRJZChpZClcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWV4cGFuZGVkXT1cInNlbGVjdGVkXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1kaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInaGVhZGVyYWN0aW9uJ1wiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWljb25UZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInNlbGVjdGVkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJhY2NvcmRpb24uY29sbGFwc2VJY29uXCIgW2NsYXNzXT1cImFjY29yZGlvbi5jb2xsYXBzZUljb25cIiBbbmdDbGFzc109XCJpY29uQ2xhc3NcIiBbYXR0ci5hcmlhLWhpZGRlbl09XCJ0cnVlXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDaGV2cm9uRG93bkljb24gKm5nSWY9XCIhYWNjb3JkaW9uLmNvbGxhcHNlSWNvblwiIFtuZ0NsYXNzXT1cImljb25DbGFzc1wiIFthdHRyLmFyaWEtaGlkZGVuXT1cInRydWVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIXNlbGVjdGVkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJhY2NvcmRpb24uZXhwYW5kSWNvblwiIFtjbGFzc109XCJhY2NvcmRpb24uZXhwYW5kSWNvblwiIFtuZ0NsYXNzXT1cImljb25DbGFzc1wiIFthdHRyLmFyaWEtaGlkZGVuXT1cInRydWVcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPENoZXZyb25SaWdodEljb24gKm5nSWY9XCIhYWNjb3JkaW9uLmV4cGFuZEljb25cIiBbbmdDbGFzc109XCJpY29uQ2xhc3NcIiBbYXR0ci5hcmlhLWhpZGRlbl09XCJ0cnVlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwiaWNvblRlbXBsYXRlOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogc2VsZWN0ZWQgfVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1hY2NvcmRpb24taGVhZGVyLXRleHRcIiAqbmdJZj1cIiFoYXNIZWFkZXJGYWNldFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge3sgaGVhZGVyIH19XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImhlYWRlclRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cInAtaGVhZGVyXCIgKm5nSWY9XCJoYXNIZWFkZXJGYWNldFwiPjwvbmctY29udGVudD5cbiAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBbYXR0ci5pZF09XCJnZXRUYWJDb250ZW50SWQoaWQpXCJcbiAgICAgICAgICAgICAgICBjbGFzcz1cInAtdG9nZ2xlYWJsZS1jb250ZW50XCJcbiAgICAgICAgICAgICAgICBbQHRhYkNvbnRlbnRdPVwic2VsZWN0ZWQgPyB7IHZhbHVlOiAndmlzaWJsZScsIHBhcmFtczogeyB0cmFuc2l0aW9uUGFyYW1zOiB0cmFuc2l0aW9uT3B0aW9ucyB9IH0gOiB7IHZhbHVlOiAnaGlkZGVuJywgcGFyYW1zOiB7IHRyYW5zaXRpb25QYXJhbXM6IHRyYW5zaXRpb25PcHRpb25zIH0gfVwiXG4gICAgICAgICAgICAgICAgcm9sZT1cInJlZ2lvblwiXG4gICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1oaWRkZW5dPVwiIXNlbGVjdGVkXCJcbiAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwiZ2V0VGFiSGVhZGVyQWN0aW9uSWQoaWQpXCJcbiAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ3RvZ2dsZWFibGVjb250ZW50J1wiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtYWNjb3JkaW9uLWNvbnRlbnRcIiBbbmdDbGFzc109XCJjb250ZW50U3R5bGVDbGFzc1wiIFtuZ1N0eWxlXT1cImNvbnRlbnRTdHlsZVwiPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjb250ZW50VGVtcGxhdGUgJiYgKGNhY2hlID8gbG9hZGVkIDogc2VsZWN0ZWQpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiY29udGVudFRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgYW5pbWF0aW9uczogW1xuICAgICAgICB0cmlnZ2VyKCd0YWJDb250ZW50JywgW1xuICAgICAgICAgICAgc3RhdGUoXG4gICAgICAgICAgICAgICAgJ2hpZGRlbicsXG4gICAgICAgICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICcwJyxcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJpbGl0eTogJ2hpZGRlbidcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHN0YXRlKFxuICAgICAgICAgICAgICAgICd2aXNpYmxlJyxcbiAgICAgICAgICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogJyonLFxuICAgICAgICAgICAgICAgICAgICB2aXNpYmlsaXR5OiAndmlzaWJsZSdcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ3Zpc2libGUgPD0+IGhpZGRlbicsIFthbmltYXRlKCd7e3RyYW5zaXRpb25QYXJhbXN9fScpXSksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IConLCBhbmltYXRlKDApKVxuICAgICAgICBdKVxuICAgIF0sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBzdHlsZVVybHM6IFsnLi9hY2NvcmRpb24uY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ3AtZWxlbWVudCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIEFjY29yZGlvblRhYiBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG4gICAgLyoqXG4gICAgICogQ3VycmVudCBpZCBzdGF0ZSBhcyBhIHN0cmluZy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBpZDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFVzZWQgdG8gZGVmaW5lIHRoZSBoZWFkZXIgb2YgdGhlIHRhYi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBoZWFkZXI6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBJbmxpbmUgc3R5bGUgb2YgdGhlIHRhYiBoZWFkZXIuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgaGVhZGVyU3R5bGU6IHsgW2tsYXNzOiBzdHJpbmddOiBhbnkgfSB8IG51bGwgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogSW5saW5lIHN0eWxlIG9mIHRoZSB0YWIuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgdGFiU3R5bGU6IHsgW2tsYXNzOiBzdHJpbmddOiBhbnkgfSB8IG51bGwgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogSW5saW5lIHN0eWxlIG9mIHRoZSB0YWIgY29udGVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBjb250ZW50U3R5bGU6IHsgW2tsYXNzOiBzdHJpbmddOiBhbnkgfSB8IG51bGwgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogU3R5bGUgY2xhc3Mgb2YgdGhlIHRhYi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB0YWJTdHlsZUNsYXNzOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogU3R5bGUgY2xhc3Mgb2YgdGhlIHRhYiBoZWFkZXIuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgaGVhZGVyU3R5bGVDbGFzczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFN0eWxlIGNsYXNzIG9mIHRoZSB0YWIgY29udGVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBjb250ZW50U3R5bGVDbGFzczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIHRhYiBpcyBkaXNhYmxlZC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIGEgbGF6eSBsb2FkZWQgcGFuZWwgc2hvdWxkIGF2b2lkIGdldHRpbmcgbG9hZGVkIGFnYWluIG9uIHJlc2VsZWN0aW9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGNhY2hlOiBib29sZWFuID0gdHJ1ZTtcbiAgICAvKipcbiAgICAgKiBUcmFuc2l0aW9uIG9wdGlvbnMgb2YgdGhlIGFuaW1hdGlvbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB0cmFuc2l0aW9uT3B0aW9uczogc3RyaW5nID0gJzQwMG1zIGN1YmljLWJlemllcigwLjg2LCAwLCAwLjA3LCAxKSc7XG4gICAgLyoqXG4gICAgICogUG9zaXRpb24gb2YgdGhlIGljb24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgaWNvblBvczogJ2VuZCcgfCAnc3RhcnQnID0gJ3N0YXJ0JztcbiAgICAvKipcbiAgICAgKiBUaGUgdmFsdWUgdGhhdCByZXR1cm5zIHRoZSBzZWxlY3Rpb24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IHNlbGVjdGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWQ7XG4gICAgfVxuICAgIHNldCBzZWxlY3RlZCh2YWw6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWQgPSB2YWw7XG5cbiAgICAgICAgaWYgKCF0aGlzLmxvYWRlZCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX3NlbGVjdGVkICYmIHRoaXMuY2FjaGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBhcmlhLWxldmVsIHRoYXQgZWFjaCBhY2NvcmRpb24gaGVhZGVyIHdpbGwgaGF2ZS4gVGhlIGRlZmF1bHQgdmFsdWUgaXMgMiBhcyBwZXIgVzNDIHNwZWNpZmljYXRpb25zXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgaGVhZGVyQXJpYUxldmVsOiBudW1iZXIgPSAyO1xuICAgIC8qKlxuICAgICAqIEV2ZW50IHRyaWdnZXJlZCBieSBjaGFuZ2luZyB0aGUgY2hvaWNlLlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gdmFsdWUgLSBCb29sZWFuIHZhbHVlIGluZGljYXRlcyB0aGF0IHRoZSBvcHRpb24gaXMgY2hhbmdlZC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgc2VsZWN0ZWRDaGFuZ2U6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oSGVhZGVyKSBoZWFkZXJGYWNldCE6IFF1ZXJ5TGlzdDxIZWFkZXI+O1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihQcmltZVRlbXBsYXRlKSB0ZW1wbGF0ZXMhOiBRdWVyeUxpc3Q8UHJpbWVUZW1wbGF0ZT47XG5cbiAgICBwcml2YXRlIF9zZWxlY3RlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgZ2V0IGljb25DbGFzcygpIHtcbiAgICAgICAgaWYgKHRoaXMuaWNvblBvcyA9PT0gJ2VuZCcpIHtcbiAgICAgICAgICAgIHJldHVybiAncC1hY2NvcmRpb24tdG9nZ2xlLWljb24tZW5kJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAncC1hY2NvcmRpb24tdG9nZ2xlLWljb24nO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29udGVudFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xuXG4gICAgaGVhZGVyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG5cbiAgICBpY29uVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG5cbiAgICBsb2FkZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGFjY29yZGlvbjogQWNjb3JkaW9uO1xuXG4gICAgY29uc3RydWN0b3IoQEluamVjdChmb3J3YXJkUmVmKCgpID0+IEFjY29yZGlvbikpIGFjY29yZGlvbjogQWNjb3JkaW9uLCBwdWJsaWMgZWw6IEVsZW1lbnRSZWYsIHB1YmxpYyBjaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICAgICAgdGhpcy5hY2NvcmRpb24gPSBhY2NvcmRpb24gYXMgQWNjb3JkaW9uO1xuICAgICAgICB0aGlzLmlkID0gVW5pcXVlQ29tcG9uZW50SWQoKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGVzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoaXRlbS5nZXRUeXBlKCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdjb250ZW50JzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2hlYWRlcic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVhZGVyVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2ljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmljb25UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdG9nZ2xlKGV2ZW50PzogTW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMuZmluZFRhYkluZGV4KCk7XG5cbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuYWNjb3JkaW9uLm9uQ2xvc2UuZW1pdCh7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50LCBpbmRleDogaW5kZXggfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuYWNjb3JkaW9uLm11bHRpcGxlKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmFjY29yZGlvbi50YWJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmFjY29yZGlvbi50YWJzW2ldLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjY29yZGlvbi50YWJzW2ldLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjY29yZGlvbi50YWJzW2ldLnNlbGVjdGVkQ2hhbmdlLmVtaXQoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hY2NvcmRpb24udGFic1tpXS5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmxvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmFjY29yZGlvbi5vbk9wZW4uZW1pdCh7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50LCBpbmRleDogaW5kZXggfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNlbGVjdGVkQ2hhbmdlLmVtaXQodGhpcy5zZWxlY3RlZCk7XG4gICAgICAgIHRoaXMuYWNjb3JkaW9uLnVwZGF0ZUFjdGl2ZUluZGV4KCk7XG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG5cbiAgICAgICAgZXZlbnQ/LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgZmluZFRhYkluZGV4KCkge1xuICAgICAgICBsZXQgaW5kZXggPSAtMTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmFjY29yZGlvbi50YWJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hY2NvcmRpb24udGFic1tpXSA9PSB0aGlzKSB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSBpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG5cbiAgICBnZXQgaGFzSGVhZGVyRmFjZXQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAodGhpcy5oZWFkZXJGYWNldCBhcyBRdWVyeUxpc3Q8SGVhZGVyPikgJiYgKHRoaXMuaGVhZGVyRmFjZXQgYXMgUXVlcnlMaXN0PEhlYWRlcj4pLmxlbmd0aCA+IDA7XG4gICAgfVxuXG4gICAgb25LZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQuY29kZSkge1xuICAgICAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICAgICAgY2FzZSAnU3BhY2UnOlxuICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlKGV2ZW50KTtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyAvLyA/Pz9cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRUYWJIZWFkZXJBY3Rpb25JZCh0YWJJZCkge1xuICAgICAgICByZXR1cm4gYCR7dGFiSWR9X2hlYWRlcl9hY3Rpb25gO1xuICAgIH1cblxuICAgIGdldFRhYkNvbnRlbnRJZCh0YWJJZCkge1xuICAgICAgICByZXR1cm4gYCR7dGFiSWR9X2NvbnRlbnRgO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmFjY29yZGlvbi50YWJzLnNwbGljZSh0aGlzLmZpbmRUYWJJbmRleCgpLCAxKTtcbiAgICB9XG59XG5cbi8qKlxuICogQWNjb3JkaW9uIGdyb3VwcyBhIGNvbGxlY3Rpb24gb2YgY29udGVudHMgaW4gdGFicy5cbiAqIEBncm91cCBDb21wb25lbnRzXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1hY2NvcmRpb24nLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgW25nQ2xhc3NdPVwiJ3AtYWNjb3JkaW9uIHAtY29tcG9uZW50J1wiIFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIj5cbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAncC1lbGVtZW50J1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgQWNjb3JkaW9uIGltcGxlbWVudHMgQmxvY2thYmxlVUksIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG4gICAgLyoqXG4gICAgICogV2hlbiBlbmFibGVkLCBtdWx0aXBsZSB0YWJzIGNhbiBiZSBhY3RpdmF0ZWQgYXQgdGhlIHNhbWUgdGltZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBtdWx0aXBsZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIC8qKlxuICAgICAqIElubGluZSBzdHlsZSBvZiB0aGUgdGFiIGhlYWRlciBhbmQgY29udGVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzdHlsZTogeyBba2xhc3M6IHN0cmluZ106IGFueSB9IHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBDbGFzcyBvZiB0aGUgZWxlbWVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogSWNvbiBvZiBhIGNvbGxhcHNlZCB0YWIuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZXhwYW5kSWNvbjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIEljb24gb2YgYW4gZXhwYW5kZWQgdGFiLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGNvbGxhcHNlSWNvbjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIEluZGV4IG9mIHRoZSBhY3RpdmUgdGFiIG9yIGFuIGFycmF5IG9mIGluZGV4ZXMgaW4gbXVsdGlwbGUgbW9kZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgYWN0aXZlSW5kZXgoKTogbnVtYmVyIHwgbnVtYmVyW10gfCBudWxsIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FjdGl2ZUluZGV4O1xuICAgIH1cbiAgICBzZXQgYWN0aXZlSW5kZXgodmFsOiBudW1iZXIgfCBudW1iZXJbXSB8IG51bGwgfCB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5fYWN0aXZlSW5kZXggPSB2YWw7XG4gICAgICAgIGlmICh0aGlzLnByZXZlbnRBY3RpdmVJbmRleFByb3BhZ2F0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnByZXZlbnRBY3RpdmVJbmRleFByb3BhZ2F0aW9uID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnVwZGF0ZVNlbGVjdGlvblN0YXRlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFdoZW4gZW5hYmxlZCwgdGhlIGZvY3VzZWQgdGFiIGlzIGFjdGl2YXRlZC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzZWxlY3RPbkZvY3VzOiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogVGhlIGFyaWEtbGV2ZWwgdGhhdCBlYWNoIGFjY29yZGlvbiBoZWFkZXIgd2lsbCBoYXZlLiBUaGUgZGVmYXVsdCB2YWx1ZSBpcyAyIGFzIHBlciBXM0Mgc3BlY2lmaWNhdGlvbnNcbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgaGVhZGVyQXJpYUxldmVsKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9oZWFkZXJBcmlhTGV2ZWw7XG4gICAgfVxuICAgIHNldCBoZWFkZXJBcmlhTGV2ZWwodmFsOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInICYmIHZhbCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuX2hlYWRlckFyaWFMZXZlbCA9IHZhbDtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9oZWFkZXJBcmlhTGV2ZWwgIT09IDIpIHtcbiAgICAgICAgICAgIHRoaXMuX2hlYWRlckFyaWFMZXZlbCA9IDI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gYW4gYWN0aXZlIHRhYiBpcyBjb2xsYXBzZWQgYnkgY2xpY2tpbmcgb24gdGhlIGhlYWRlci5cbiAgICAgKiBAcGFyYW0ge0FjY29yZGlvblRhYkNsb3NlRXZlbnR9IGV2ZW50IC0gQ3VzdG9tIHRhYiBjbG9zZSBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25DbG9zZTogRXZlbnRFbWl0dGVyPEFjY29yZGlvblRhYkNsb3NlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIGEgdGFiIGdldHMgZXhwYW5kZWQuXG4gICAgICogQHBhcmFtIHtBY2NvcmRpb25UYWJPcGVuRXZlbnR9IGV2ZW50IC0gQ3VzdG9tIHRhYiBvcGVuIGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvbk9wZW46IEV2ZW50RW1pdHRlcjxBY2NvcmRpb25UYWJPcGVuRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGFjdGl2ZSBpbmRleC5cbiAgICAgKiBAcGFyYW0ge251bWJlciB8IG51bWJlcltdfSB2YWx1ZSAtIE5ldyBpbmRleC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgYWN0aXZlSW5kZXhDaGFuZ2U6IEV2ZW50RW1pdHRlcjxudW1iZXIgfCBudW1iZXJbXT4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlciB8IG51bWJlcltdPigpO1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihBY2NvcmRpb25UYWIsIHsgZGVzY2VuZGFudHM6IHRydWUgfSkgdGFiTGlzdDogUXVlcnlMaXN0PEFjY29yZGlvblRhYj4gfCB1bmRlZmluZWQ7XG5cbiAgICB0YWJMaXN0U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gfCBudWxsID0gbnVsbDtcblxuICAgIHByaXZhdGUgX2FjdGl2ZUluZGV4OiBhbnk7XG4gICAgcHJpdmF0ZSBfaGVhZGVyQXJpYUxldmVsOiBudW1iZXIgPSAyO1xuXG4gICAgcHJldmVudEFjdGl2ZUluZGV4UHJvcGFnYXRpb246IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHB1YmxpYyB0YWJzOiBBY2NvcmRpb25UYWJbXSA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmLCBwdWJsaWMgY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmKSB7fVxuXG4gICAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bicsIFsnJGV2ZW50J10pXG4gICAgb25LZXlkb3duKGV2ZW50KSB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQuY29kZSkge1xuICAgICAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uVGFiQXJyb3dEb3duS2V5KGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgICAgICAgICAgdGhpcy5vblRhYkFycm93VXBLZXkoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdIb21lJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uVGFiSG9tZUtleShldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0VuZCc6XG4gICAgICAgICAgICAgICAgdGhpcy5vblRhYkVuZEtleShldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblRhYkFycm93RG93bktleShldmVudCkge1xuICAgICAgICBjb25zdCBuZXh0SGVhZGVyQWN0aW9uID0gdGhpcy5maW5kTmV4dEhlYWRlckFjdGlvbihldmVudC50YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQpO1xuICAgICAgICBuZXh0SGVhZGVyQWN0aW9uID8gdGhpcy5jaGFuZ2VGb2N1c2VkVGFiKG5leHRIZWFkZXJBY3Rpb24pIDogdGhpcy5vblRhYkhvbWVLZXkoZXZlbnQpO1xuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgb25UYWJBcnJvd1VwS2V5KGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHByZXZIZWFkZXJBY3Rpb24gPSB0aGlzLmZpbmRQcmV2SGVhZGVyQWN0aW9uKGV2ZW50LnRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudCk7XG4gICAgICAgIHByZXZIZWFkZXJBY3Rpb24gPyB0aGlzLmNoYW5nZUZvY3VzZWRUYWIocHJldkhlYWRlckFjdGlvbikgOiB0aGlzLm9uVGFiRW5kS2V5KGV2ZW50KTtcblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIG9uVGFiSG9tZUtleShldmVudCkge1xuICAgICAgICBjb25zdCBmaXJzdEhlYWRlckFjdGlvbiA9IHRoaXMuZmluZEZpcnN0SGVhZGVyQWN0aW9uKCk7XG4gICAgICAgIHRoaXMuY2hhbmdlRm9jdXNlZFRhYihmaXJzdEhlYWRlckFjdGlvbik7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgY2hhbmdlRm9jdXNlZFRhYihlbGVtZW50KSB7XG4gICAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgICAgICBEb21IYW5kbGVyLmZvY3VzKGVsZW1lbnQpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RPbkZvY3VzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50YWJzLmZvckVhY2goKHRhYiwgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWQgPSB0aGlzLm11bHRpcGxlID8gdGhpcy5fYWN0aXZlSW5kZXguaW5jbHVkZXMoaSkgOiBpID09PSB0aGlzLl9hY3RpdmVJbmRleDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9hY3RpdmVJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2FjdGl2ZUluZGV4ID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGFiLmlkID09IGVsZW1lbnQuaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWIuc2VsZWN0ZWQgPSAhdGFiLnNlbGVjdGVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5fYWN0aXZlSW5kZXguaW5jbHVkZXMoaSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYWN0aXZlSW5kZXgucHVzaChpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9hY3RpdmVJbmRleCA9IHRoaXMuX2FjdGl2ZUluZGV4LmZpbHRlcigoaW5kKSA9PiBpbmQgIT09IGkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0YWIuaWQgPT0gZWxlbWVudC5pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYi5zZWxlY3RlZCA9ICF0YWIuc2VsZWN0ZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYWN0aXZlSW5kZXggPSBpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWIuc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRhYi5zZWxlY3RlZENoYW5nZS5lbWl0KHNlbGVjdGVkKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVJbmRleENoYW5nZS5lbWl0KHRoaXMuX2FjdGl2ZUluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgdGFiLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZmluZE5leHRIZWFkZXJBY3Rpb24odGFiRWxlbWVudCwgc2VsZkNoZWNrID0gZmFsc2UpIHtcbiAgICAgICAgY29uc3QgbmV4dFRhYkVsZW1lbnQgPSBzZWxmQ2hlY2sgPyB0YWJFbGVtZW50IDogdGFiRWxlbWVudC5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgIGNvbnN0IGhlYWRlckVsZW1lbnQgPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUobmV4dFRhYkVsZW1lbnQsICdbZGF0YS1wYy1zZWN0aW9uPVwiaGVhZGVyXCJdJyk7XG5cbiAgICAgICAgcmV0dXJuIGhlYWRlckVsZW1lbnQgPyAoRG9tSGFuZGxlci5nZXRBdHRyaWJ1dGUoaGVhZGVyRWxlbWVudCwgJ2RhdGEtcC1kaXNhYmxlZCcpID8gdGhpcy5maW5kTmV4dEhlYWRlckFjdGlvbihoZWFkZXJFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudCkgOiBEb21IYW5kbGVyLmZpbmRTaW5nbGUoaGVhZGVyRWxlbWVudCwgJ1tkYXRhLXBjLXNlY3Rpb249XCJoZWFkZXJhY3Rpb25cIl0nKSkgOiBudWxsO1xuICAgIH1cblxuICAgIGZpbmRQcmV2SGVhZGVyQWN0aW9uKHRhYkVsZW1lbnQsIHNlbGZDaGVjayA9IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0IHByZXZUYWJFbGVtZW50ID0gc2VsZkNoZWNrID8gdGFiRWxlbWVudCA6IHRhYkVsZW1lbnQucHJldmlvdXNFbGVtZW50U2libGluZztcbiAgICAgICAgY29uc3QgaGVhZGVyRWxlbWVudCA9IERvbUhhbmRsZXIuZmluZFNpbmdsZShwcmV2VGFiRWxlbWVudCwgJ1tkYXRhLXBjLXNlY3Rpb249XCJoZWFkZXJcIl0nKTtcblxuICAgICAgICByZXR1cm4gaGVhZGVyRWxlbWVudCA/IChEb21IYW5kbGVyLmdldEF0dHJpYnV0ZShoZWFkZXJFbGVtZW50LCAnZGF0YS1wLWRpc2FibGVkJykgPyB0aGlzLmZpbmRQcmV2SGVhZGVyQWN0aW9uKGhlYWRlckVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50KSA6IERvbUhhbmRsZXIuZmluZFNpbmdsZShoZWFkZXJFbGVtZW50LCAnW2RhdGEtcGMtc2VjdGlvbj1cImhlYWRlcmFjdGlvblwiXScpKSA6IG51bGw7XG4gICAgfVxuXG4gICAgZmluZEZpcnN0SGVhZGVyQWN0aW9uKCkge1xuICAgICAgICBjb25zdCBmaXJzdEVsID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmZpcnN0RWxlbWVudENoaWxkLmNoaWxkTm9kZXNbMF07XG4gICAgICAgIHJldHVybiB0aGlzLmZpbmROZXh0SGVhZGVyQWN0aW9uKGZpcnN0RWwsIHRydWUpO1xuICAgIH1cblxuICAgIGZpbmRMYXN0SGVhZGVyQWN0aW9uKCkge1xuICAgICAgICBjb25zdCBjaGlsZE5vZGVzID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmZpcnN0RWxlbWVudENoaWxkLmNoaWxkTm9kZXM7XG4gICAgICAgIGNvbnN0IGxhc3RFbCA9IGNoaWxkTm9kZXNbY2hpbGROb2Rlcy5sZW5ndGggLSAxXTtcblxuICAgICAgICByZXR1cm4gdGhpcy5maW5kUHJldkhlYWRlckFjdGlvbihsYXN0RWwsIHRydWUpO1xuICAgIH1cblxuICAgIG9uVGFiRW5kS2V5KGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGxhc3RIZWFkZXJBY3Rpb24gPSB0aGlzLmZpbmRMYXN0SGVhZGVyQWN0aW9uKCk7XG4gICAgICAgIHRoaXMuY2hhbmdlRm9jdXNlZFRhYihsYXN0SGVhZGVyQWN0aW9uKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHRoaXMuaW5pdFRhYnMoKTtcblxuICAgICAgICB0aGlzLnRhYkxpc3RTdWJzY3JpcHRpb24gPSAodGhpcy50YWJMaXN0IGFzIFF1ZXJ5TGlzdDxBY2NvcmRpb25UYWI+KS5jaGFuZ2VzLnN1YnNjcmliZSgoXykgPT4ge1xuICAgICAgICAgICAgdGhpcy5pbml0VGFicygpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpbml0VGFicygpIHtcbiAgICAgICAgdGhpcy50YWJzID0gKHRoaXMudGFiTGlzdCBhcyBRdWVyeUxpc3Q8QWNjb3JkaW9uVGFiPikudG9BcnJheSgpO1xuXG4gICAgICAgIHRoaXMudGFicy5mb3JFYWNoKCh0YWIpID0+IHtcbiAgICAgICAgICAgIHRhYi5oZWFkZXJBcmlhTGV2ZWwgPSB0aGlzLl9oZWFkZXJBcmlhTGV2ZWw7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudXBkYXRlU2VsZWN0aW9uU3RhdGUoKTtcbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBnZXRCbG9ja2FibGVFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWwubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXTtcbiAgICB9XG5cbiAgICB1cGRhdGVTZWxlY3Rpb25TdGF0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMudGFicyAmJiB0aGlzLnRhYnMubGVuZ3RoICYmIHRoaXMuX2FjdGl2ZUluZGV4ICE9IG51bGwpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50YWJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkID0gdGhpcy5tdWx0aXBsZSA/IHRoaXMuX2FjdGl2ZUluZGV4LmluY2x1ZGVzKGkpIDogaSA9PT0gdGhpcy5fYWN0aXZlSW5kZXg7XG4gICAgICAgICAgICAgICAgbGV0IGNoYW5nZWQgPSBzZWxlY3RlZCAhPT0gdGhpcy50YWJzW2ldLnNlbGVjdGVkO1xuXG4gICAgICAgICAgICAgICAgaWYgKGNoYW5nZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YWJzW2ldLnNlbGVjdGVkID0gc2VsZWN0ZWQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFic1tpXS5zZWxlY3RlZENoYW5nZS5lbWl0KHNlbGVjdGVkKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YWJzW2ldLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzVGFiQWN0aXZlKGluZGV4KSB7XG4gICAgICAgIHJldHVybiB0aGlzLm11bHRpcGxlID8gdGhpcy5fYWN0aXZlSW5kZXggJiYgKDxudW1iZXJbXT50aGlzLl9hY3RpdmVJbmRleCkuaW5jbHVkZXMoaW5kZXgpIDogdGhpcy5fYWN0aXZlSW5kZXggPT09IGluZGV4O1xuICAgIH1cblxuICAgIGdldFRhYlByb3AodGFiLCBuYW1lKSB7XG4gICAgICAgIHJldHVybiB0YWIucHJvcHMgPyB0YWIucHJvcHNbbmFtZV0gOiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgdXBkYXRlQWN0aXZlSW5kZXgoKSB7XG4gICAgICAgIGxldCBpbmRleDogbnVtYmVyIHwgbnVtYmVyW10gfCBudWxsID0gdGhpcy5tdWx0aXBsZSA/IFtdIDogbnVsbDtcbiAgICAgICAgdGhpcy50YWJzLmZvckVhY2goKHRhYiwgaSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRhYi5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgICAgICAgICAgICAgIChpbmRleCBhcyBudW1iZXJbXSkucHVzaChpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnByZXZlbnRBY3RpdmVJbmRleFByb3BhZ2F0aW9uID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5hY3RpdmVJbmRleENoYW5nZS5lbWl0KGluZGV4IGFzIG51bWJlcltdIHwgbnVtYmVyKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMudGFiTGlzdFN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy50YWJMaXN0U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgQ2hldnJvblJpZ2h0SWNvbiwgQ2hldnJvbkRvd25JY29uXSxcbiAgICBleHBvcnRzOiBbQWNjb3JkaW9uLCBBY2NvcmRpb25UYWIsIFNoYXJlZE1vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbQWNjb3JkaW9uLCBBY2NvcmRpb25UYWJdXG59KVxuZXhwb3J0IGNsYXNzIEFjY29yZGlvbk1vZHVsZSB7fVxuIl19