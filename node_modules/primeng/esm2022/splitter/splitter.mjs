import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Inject, Input, NgModule, Output, PLATFORM_ID, ViewChild, ViewEncapsulation } from '@angular/core';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 * Splitter is utilized to separate and resize panels.
 * @group Components
 */
export class Splitter {
    document;
    platformId;
    renderer;
    cd;
    el;
    /**
     * Style class of the component.
     * @group Props
     */
    styleClass;
    /**
     * Style class of the panel.
     * @group Props
     */
    panelStyleClass;
    /**
     * Inline style of the component.
     * @group Props
     */
    style;
    /**
     * Inline style of the panel.
     * @group Props
     */
    panelStyle;
    /**
     * Defines where a stateful splitter keeps its state, valid values are 'session' for sessionStorage and 'local' for localStorage.
     * @group Props
     */
    stateStorage = 'session';
    /**
     * Storage identifier of a stateful Splitter.
     * @group Props
     */
    stateKey = null;
    /**
     * Orientation of the panels. Valid values are 'horizontal' and 'vertical'.
     * @group Props
     */
    layout = 'horizontal';
    /**
     * Size of the divider in pixels.
     * @group Props
     */
    gutterSize = 4;
    /**
     * Step factor to increment/decrement the size of the panels while pressing the arrow keys.
     * @group Props
     */
    step = 5;
    /**
     * Minimum size of the elements relative to 100%.
     * @group Props
     */
    minSizes = [];
    /**
     * Size of the elements relative to 100%.
     * @group Props
     */
    get panelSizes() {
        return this._panelSizes;
    }
    set panelSizes(val) {
        this._panelSizes = val;
        if (this.el && this.el.nativeElement && this.panels.length > 0) {
            let children = [...this.el.nativeElement.children[0].children].filter((child) => DomHandler.hasClass(child, 'p-splitter-panel'));
            let _panelSizes = [];
            this.panels.map((panel, i) => {
                let panelInitialSize = this.panelSizes.length - 1 >= i ? this.panelSizes[i] : null;
                let panelSize = panelInitialSize || 100 / this.panels.length;
                _panelSizes[i] = panelSize;
                children[i].style.flexBasis = 'calc(' + panelSize + '% - ' + (this.panels.length - 1) * this.gutterSize + 'px)';
            });
        }
    }
    /**
     * Callback to invoke when resize ends.
     * @param {SplitterResizeEndEvent} event - Custom panel resize end event
     * @group Emits
     */
    onResizeEnd = new EventEmitter();
    /**
     * Callback to invoke when resize starts.
     * @param {SplitterResizeStartEvent} event - Custom panel resize start event
     * @group Emits
     */
    onResizeStart = new EventEmitter();
    templates;
    containerViewChild;
    nested = false;
    panels = [];
    dragging = false;
    mouseMoveListener;
    mouseUpListener;
    touchMoveListener;
    touchEndListener;
    size;
    gutterElement;
    startPos;
    prevPanelElement;
    nextPanelElement;
    nextPanelSize;
    prevPanelSize;
    _panelSizes = [];
    prevPanelIndex;
    timer;
    prevSize;
    window;
    constructor(document, platformId, renderer, cd, el) {
        this.document = document;
        this.platformId = platformId;
        this.renderer = renderer;
        this.cd = cd;
        this.el = el;
        this.window = this.document.defaultView;
    }
    ngOnInit() {
        this.nested = this.isNested();
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'panel':
                    this.panels.push(item.template);
                    break;
                default:
                    this.panels.push(item.template);
                    break;
            }
        });
    }
    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            if (this.panels && this.panels.length) {
                let initialized = false;
                if (this.isStateful()) {
                    initialized = this.restoreState();
                }
                if (!initialized) {
                    let children = [...this.el.nativeElement.children[0].children].filter((child) => DomHandler.hasClass(child, 'p-splitter-panel'));
                    let _panelSizes = [];
                    this.panels.map((panel, i) => {
                        let panelInitialSize = this.panelSizes.length - 1 >= i ? this.panelSizes[i] : null;
                        let panelSize = panelInitialSize || 100 / this.panels.length;
                        _panelSizes[i] = panelSize;
                        children[i].style.flexBasis = 'calc(' + panelSize + '% - ' + (this.panels.length - 1) * this.gutterSize + 'px)';
                    });
                    this._panelSizes = _panelSizes;
                    this.prevSize = parseFloat(_panelSizes[0]).toFixed(4);
                }
            }
        }
    }
    resizeStart(event, index, isKeyDown) {
        this.gutterElement = event.currentTarget || event.target.parentElement;
        this.size = this.horizontal() ? DomHandler.getWidth(this.containerViewChild.nativeElement) : DomHandler.getHeight(this.containerViewChild.nativeElement);
        if (!isKeyDown) {
            this.dragging = true;
            this.startPos = this.horizontal() ? (event instanceof MouseEvent ? event.pageX : event.changedTouches[0].pageX) : event instanceof MouseEvent ? event.pageY : event.changedTouches[0].pageY;
        }
        this.prevPanelElement = this.gutterElement.previousElementSibling;
        this.nextPanelElement = this.gutterElement.nextElementSibling;
        if (isKeyDown) {
            this.prevPanelSize = this.horizontal() ? DomHandler.getOuterWidth(this.prevPanelElement, true) : DomHandler.getOuterHeight(this.prevPanelElement, true);
            this.nextPanelSize = this.horizontal() ? DomHandler.getOuterWidth(this.nextPanelElement, true) : DomHandler.getOuterHeight(this.nextPanelElement, true);
        }
        else {
            this.prevPanelSize = (100 * (this.horizontal() ? DomHandler.getOuterWidth(this.prevPanelElement, true) : DomHandler.getOuterHeight(this.prevPanelElement, true))) / this.size;
            this.nextPanelSize = (100 * (this.horizontal() ? DomHandler.getOuterWidth(this.nextPanelElement, true) : DomHandler.getOuterHeight(this.nextPanelElement, true))) / this.size;
        }
        this.prevPanelIndex = index;
        DomHandler.addClass(this.gutterElement, 'p-splitter-gutter-resizing');
        this.gutterElement.setAttribute('data-p-gutter-resizing', 'true');
        DomHandler.addClass(this.containerViewChild.nativeElement, 'p-splitter-resizing');
        this.containerViewChild.nativeElement.setAttribute('data-p-resizing', 'true');
        this.onResizeStart.emit({ originalEvent: event, sizes: this._panelSizes });
    }
    onResize(event, step, isKeyDown) {
        let newPos, newPrevPanelSize, newNextPanelSize;
        if (isKeyDown) {
            if (this.horizontal()) {
                newPrevPanelSize = (100 * (this.prevPanelSize + step)) / this.size;
                newNextPanelSize = (100 * (this.nextPanelSize - step)) / this.size;
            }
            else {
                newPrevPanelSize = (100 * (this.prevPanelSize - step)) / this.size;
                newNextPanelSize = (100 * (this.nextPanelSize + step)) / this.size;
            }
        }
        else {
            if (this.horizontal())
                newPos = (event.pageX * 100) / this.size - (this.startPos * 100) / this.size;
            else
                newPos = (event.pageY * 100) / this.size - (this.startPos * 100) / this.size;
            newPrevPanelSize = this.prevPanelSize + newPos;
            newNextPanelSize = this.nextPanelSize - newPos;
        }
        this.prevSize = parseFloat(newPrevPanelSize).toFixed(4);
        if (this.validateResize(newPrevPanelSize, newNextPanelSize)) {
            this.prevPanelElement.style.flexBasis = 'calc(' + newPrevPanelSize + '% - ' + (this.panels.length - 1) * this.gutterSize + 'px)';
            this.nextPanelElement.style.flexBasis = 'calc(' + newNextPanelSize + '% - ' + (this.panels.length - 1) * this.gutterSize + 'px)';
            this._panelSizes[this.prevPanelIndex] = newPrevPanelSize;
            this._panelSizes[this.prevPanelIndex + 1] = newNextPanelSize;
        }
    }
    resizeEnd(event) {
        if (this.isStateful()) {
            this.saveState();
        }
        this.onResizeEnd.emit({ originalEvent: event, sizes: this._panelSizes });
        DomHandler.removeClass(this.gutterElement, 'p-splitter-gutter-resizing');
        DomHandler.removeClass(this.containerViewChild.nativeElement, 'p-splitter-resizing');
        this.clear();
    }
    onGutterMouseDown(event, index) {
        this.resizeStart(event, index);
        this.bindMouseListeners();
    }
    onGutterTouchStart(event, index) {
        if (event.cancelable) {
            this.resizeStart(event, index);
            this.bindTouchListeners();
            event.preventDefault();
        }
    }
    onGutterTouchMove(event) {
        this.onResize(event);
        event.preventDefault();
    }
    onGutterTouchEnd(event) {
        this.resizeEnd(event);
        this.unbindTouchListeners();
        if (event.cancelable)
            event.preventDefault();
    }
    repeat(event, index, step) {
        this.resizeStart(event, index, true);
        this.onResize(event, step, true);
    }
    setTimer(event, index, step) {
        this.clearTimer();
        this.timer = setTimeout(() => {
            this.repeat(event, index, step);
        }, 40);
    }
    clearTimer() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }
    onGutterKeyUp(event) {
        this.clearTimer();
        this.resizeEnd(event);
    }
    onGutterKeyDown(event, index) {
        switch (event.code) {
            case 'ArrowLeft': {
                if (this.layout === 'horizontal') {
                    this.setTimer(event, index, this.step * -1);
                }
                event.preventDefault();
                break;
            }
            case 'ArrowRight': {
                if (this.layout === 'horizontal') {
                    this.setTimer(event, index, this.step);
                }
                event.preventDefault();
                break;
            }
            case 'ArrowDown': {
                if (this.layout === 'vertical') {
                    this.setTimer(event, index, this.step * -1);
                }
                event.preventDefault();
                break;
            }
            case 'ArrowUp': {
                if (this.layout === 'vertical') {
                    this.setTimer(event, index, this.step);
                }
                event.preventDefault();
                break;
            }
            default:
                //no op
                break;
        }
    }
    validateResize(newPrevPanelSize, newNextPanelSize) {
        if (this.minSizes.length >= 1 && this.minSizes[0] && this.minSizes[0] > newPrevPanelSize) {
            return false;
        }
        if (this.minSizes.length > 1 && this.minSizes[1] && this.minSizes[1] > newNextPanelSize) {
            return false;
        }
        return true;
    }
    bindMouseListeners() {
        if (!this.mouseMoveListener) {
            this.mouseMoveListener = this.renderer.listen(this.document, 'mousemove', (event) => {
                this.onResize(event);
            });
        }
        if (!this.mouseUpListener) {
            this.mouseUpListener = this.renderer.listen(this.document, 'mouseup', (event) => {
                this.resizeEnd(event);
                this.unbindMouseListeners();
            });
        }
    }
    bindTouchListeners() {
        if (!this.touchMoveListener) {
            this.touchMoveListener = this.renderer.listen(this.document, 'touchmove', (event) => {
                this.onResize(event.changedTouches[0]);
            });
        }
        if (!this.touchEndListener) {
            this.touchEndListener = this.renderer.listen(this.document, 'touchend', (event) => {
                this.resizeEnd(event);
                this.unbindTouchListeners();
            });
        }
    }
    unbindMouseListeners() {
        if (this.mouseMoveListener) {
            this.mouseMoveListener();
            this.mouseMoveListener = null;
        }
        if (this.mouseUpListener) {
            this.mouseUpListener();
            this.mouseUpListener = null;
        }
    }
    unbindTouchListeners() {
        if (this.touchMoveListener) {
            this.touchMoveListener();
            this.touchMoveListener = null;
        }
        if (this.touchEndListener) {
            this.touchEndListener();
            this.touchEndListener = null;
        }
    }
    clear() {
        this.dragging = false;
        this.size = null;
        this.startPos = null;
        this.prevPanelElement = null;
        this.nextPanelElement = null;
        this.prevPanelSize = null;
        this.nextPanelSize = null;
        this.gutterElement = null;
        this.prevPanelIndex = null;
    }
    isNested() {
        if (this.el.nativeElement) {
            let parent = this.el.nativeElement.parentElement;
            while (parent && !DomHandler.hasClass(parent, 'p-splitter')) {
                parent = parent.parentElement;
            }
            return parent !== null;
        }
        else {
            return false;
        }
    }
    isStateful() {
        return this.stateKey != null;
    }
    getStorage() {
        if (isPlatformBrowser(this.platformId)) {
            switch (this.stateStorage) {
                case 'local':
                    return this.window.localStorage;
                case 'session':
                    return this.window.sessionStorage;
                default:
                    throw new Error(this.stateStorage + ' is not a valid value for the state storage, supported values are "local" and "session".');
            }
        }
        else {
            throw new Error('Storage is not a available by default on the server.');
        }
    }
    saveState() {
        this.getStorage().setItem(this.stateKey, JSON.stringify(this._panelSizes));
    }
    restoreState() {
        const storage = this.getStorage();
        const stateString = storage.getItem(this.stateKey);
        if (stateString) {
            this._panelSizes = JSON.parse(stateString);
            let children = [...this.containerViewChild.nativeElement.children].filter((child) => DomHandler.hasClass(child, 'p-splitter-panel'));
            children.forEach((child, i) => {
                child.style.flexBasis = 'calc(' + this._panelSizes[i] + '% - ' + (this.panels.length - 1) * this.gutterSize + 'px)';
            });
            return true;
        }
        return false;
    }
    containerClass() {
        return {
            'p-splitter p-component': true,
            'p-splitter-horizontal': this.layout === 'horizontal',
            'p-splitter-vertical': this.layout === 'vertical'
        };
    }
    panelContainerClass() {
        return {
            'p-splitter-panel': true,
            'p-splitter-panel-nested': true
        };
    }
    gutterStyle() {
        if (this.horizontal())
            return { width: this.gutterSize + 'px' };
        else
            return { height: this.gutterSize + 'px' };
    }
    horizontal() {
        return this.layout === 'horizontal';
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: Splitter, deps: [{ token: DOCUMENT }, { token: PLATFORM_ID }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.5", type: Splitter, selector: "p-splitter", inputs: { styleClass: "styleClass", panelStyleClass: "panelStyleClass", style: "style", panelStyle: "panelStyle", stateStorage: "stateStorage", stateKey: "stateKey", layout: "layout", gutterSize: "gutterSize", step: "step", minSizes: "minSizes", panelSizes: "panelSizes" }, outputs: { onResizeEnd: "onResizeEnd", onResizeStart: "onResizeStart" }, host: { properties: { "class.p-splitter-panel-nested": "nested" }, classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "containerViewChild", first: true, predicate: ["container"], descendants: true }], ngImport: i0, template: `
        <div #container [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="style" [attr.data-pc-name]="'splitter'" [attr.data-p-gutter-resizing]="false" [attr.data-pc-section]="'root'">
            <ng-template ngFor let-panel [ngForOf]="panels" let-i="index">
                <div [ngClass]="panelContainerClass()" [class]="panelStyleClass" [ngStyle]="panelStyle" tabindex="-1" [attr.data-pc-name]="'splitter'" [attr.data-pc-section]="'root'">
                    <ng-container *ngTemplateOutlet="panel"></ng-container>
                </div>
                <div
                    *ngIf="i !== panels.length - 1"
                    class="p-splitter-gutter"
                    role="separator"
                    tabindex="-1"
                    (mousedown)="onGutterMouseDown($event, i)"
                    (touchstart)="onGutterTouchStart($event, i)"
                    (touchmove)="onGutterTouchMove($event)"
                    (touchend)="onGutterTouchEnd($event, i)"
                    [attr.data-p-gutter-resizing]="false"
                    [attr.data-pc-section]="'gutter'"
                >
                    <div
                        class="p-splitter-gutter-handle"
                        tabindex="0"
                        [ngStyle]="gutterStyle()"
                        [attr.aria-orientation]="layout"
                        [attr.aria-valuenow]="prevSize"
                        [attr.data-pc-section]="'gutterhandle'"
                        (keyup)="onGutterKeyUp($event)"
                        (keydown)="onGutterKeyDown($event, i)"
                    ></div>
                </div>
            </ng-template>
        </div>
    `, isInline: true, styles: ["@layer primeng{.p-splitter{display:flex;flex-wrap:nowrap}.p-splitter-vertical{flex-direction:column}.p-splitter-panel{flex-grow:1}.p-splitter-panel-nested{display:flex;min-width:0}.p-splitter-panel p-splitter{flex-grow:1}.p-splitter-panel .p-splitter{flex-grow:1;border:0 none}.p-splitter-gutter{flex-grow:0;flex-shrink:0;display:flex;align-items:center;justify-content:center;cursor:col-resize}.p-splitter-horizontal.p-splitter-resizing{cursor:col-resize;-webkit-user-select:none;user-select:none}.p-splitter-horizontal>.p-splitter-gutter>.p-splitter-gutter-handle{height:24px;width:100%}.p-splitter-horizontal>.p-splitter-gutter{cursor:col-resize}.p-splitter-vertical.p-splitter-resizing{cursor:row-resize;-webkit-user-select:none;user-select:none}.p-splitter-vertical>.p-splitter-gutter{cursor:row-resize}.p-splitter-vertical>.p-splitter-gutter>.p-splitter-gutter-handle{width:24px;height:100%}}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: Splitter, decorators: [{
            type: Component,
            args: [{ selector: 'p-splitter', template: `
        <div #container [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="style" [attr.data-pc-name]="'splitter'" [attr.data-p-gutter-resizing]="false" [attr.data-pc-section]="'root'">
            <ng-template ngFor let-panel [ngForOf]="panels" let-i="index">
                <div [ngClass]="panelContainerClass()" [class]="panelStyleClass" [ngStyle]="panelStyle" tabindex="-1" [attr.data-pc-name]="'splitter'" [attr.data-pc-section]="'root'">
                    <ng-container *ngTemplateOutlet="panel"></ng-container>
                </div>
                <div
                    *ngIf="i !== panels.length - 1"
                    class="p-splitter-gutter"
                    role="separator"
                    tabindex="-1"
                    (mousedown)="onGutterMouseDown($event, i)"
                    (touchstart)="onGutterTouchStart($event, i)"
                    (touchmove)="onGutterTouchMove($event)"
                    (touchend)="onGutterTouchEnd($event, i)"
                    [attr.data-p-gutter-resizing]="false"
                    [attr.data-pc-section]="'gutter'"
                >
                    <div
                        class="p-splitter-gutter-handle"
                        tabindex="0"
                        [ngStyle]="gutterStyle()"
                        [attr.aria-orientation]="layout"
                        [attr.aria-valuenow]="prevSize"
                        [attr.data-pc-section]="'gutterhandle'"
                        (keyup)="onGutterKeyUp($event)"
                        (keydown)="onGutterKeyDown($event, i)"
                    ></div>
                </div>
            </ng-template>
        </div>
    `, encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        class: 'p-element',
                        '[class.p-splitter-panel-nested]': 'nested'
                    }, styles: ["@layer primeng{.p-splitter{display:flex;flex-wrap:nowrap}.p-splitter-vertical{flex-direction:column}.p-splitter-panel{flex-grow:1}.p-splitter-panel-nested{display:flex;min-width:0}.p-splitter-panel p-splitter{flex-grow:1}.p-splitter-panel .p-splitter{flex-grow:1;border:0 none}.p-splitter-gutter{flex-grow:0;flex-shrink:0;display:flex;align-items:center;justify-content:center;cursor:col-resize}.p-splitter-horizontal.p-splitter-resizing{cursor:col-resize;-webkit-user-select:none;user-select:none}.p-splitter-horizontal>.p-splitter-gutter>.p-splitter-gutter-handle{height:24px;width:100%}.p-splitter-horizontal>.p-splitter-gutter{cursor:col-resize}.p-splitter-vertical.p-splitter-resizing{cursor:row-resize;-webkit-user-select:none;user-select:none}.p-splitter-vertical>.p-splitter-gutter{cursor:row-resize}.p-splitter-vertical>.p-splitter-gutter>.p-splitter-gutter-handle{width:24px;height:100%}}\n"] }]
        }], ctorParameters: () => [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }, { type: i0.ElementRef }], propDecorators: { styleClass: [{
                type: Input
            }], panelStyleClass: [{
                type: Input
            }], style: [{
                type: Input
            }], panelStyle: [{
                type: Input
            }], stateStorage: [{
                type: Input
            }], stateKey: [{
                type: Input
            }], layout: [{
                type: Input
            }], gutterSize: [{
                type: Input
            }], step: [{
                type: Input
            }], minSizes: [{
                type: Input
            }], panelSizes: [{
                type: Input
            }], onResizeEnd: [{
                type: Output
            }], onResizeStart: [{
                type: Output
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }], containerViewChild: [{
                type: ViewChild,
                args: ['container', { static: false }]
            }] } });
export class SplitterModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: SplitterModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.0.5", ngImport: i0, type: SplitterModule, declarations: [Splitter], imports: [CommonModule], exports: [Splitter, SharedModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: SplitterModule, imports: [CommonModule, SharedModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: SplitterModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [Splitter, SharedModule],
                    declarations: [Splitter]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXR0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvc3BsaXR0ZXIvc3BsaXR0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM1RSxPQUFPLEVBQUUsdUJBQXVCLEVBQXFCLFNBQVMsRUFBRSxlQUFlLEVBQWMsWUFBWSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQXdCLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuTyxPQUFPLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUMxRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sYUFBYSxDQUFDOzs7QUFHekM7OztHQUdHO0FBMkNILE1BQU0sT0FBTyxRQUFRO0lBZ0lxQjtJQUFpRDtJQUF5QjtJQUE0QjtJQUErQjtJQS9IM0s7OztPQUdHO0lBQ00sVUFBVSxDQUFxQjtJQUN4Qzs7O09BR0c7SUFDTSxlQUFlLENBQXFCO0lBQzdDOzs7T0FHRztJQUNNLEtBQUssQ0FBOEM7SUFDNUQ7OztPQUdHO0lBQ00sVUFBVSxDQUE4QztJQUNqRTs7O09BR0c7SUFDTSxZQUFZLEdBQXVCLFNBQVMsQ0FBQztJQUN0RDs7O09BR0c7SUFDTSxRQUFRLEdBQThCLElBQUksQ0FBQztJQUNwRDs7O09BR0c7SUFDTSxNQUFNLEdBQXVCLFlBQVksQ0FBQztJQUNuRDs7O09BR0c7SUFDTSxVQUFVLEdBQVcsQ0FBQyxDQUFDO0lBQ2hDOzs7T0FHRztJQUNNLElBQUksR0FBVyxDQUFDLENBQUM7SUFDMUI7OztPQUdHO0lBQ00sUUFBUSxHQUFhLEVBQUUsQ0FBQztJQUNqQzs7O09BR0c7SUFDSCxJQUFhLFVBQVU7UUFDbkIsT0FBTyxJQUFJLENB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Q04sT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUUsWUFBWSxDQUFDO29CQUNqQyxZQUFZLEVBQUUsQ0FBQyxRQUFRLENBQUM7aUJBQzNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlLCBET0NVTUVOVCwgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIENvbnRlbnRDaGlsZHJlbiwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbmplY3QsIElucHV0LCBOZ01vZHVsZSwgT3V0cHV0LCBQTEFURk9STV9JRCwgUXVlcnlMaXN0LCBSZW5kZXJlcjIsIFZpZXdDaGlsZCwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFByaW1lVGVtcGxhdGUsIFNoYXJlZE1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IERvbUhhbmRsZXIgfSBmcm9tICdwcmltZW5nL2RvbSc7XG5pbXBvcnQgeyBOdWxsYWJsZSwgVm9pZExpc3RlbmVyIH0gZnJvbSAncHJpbWVuZy90cy1oZWxwZXJzJztcbmltcG9ydCB7IFNwbGl0dGVyUmVzaXplRW5kRXZlbnQsIFNwbGl0dGVyUmVzaXplU3RhcnRFdmVudCB9IGZyb20gJy4vc3BsaXR0ZXIuaW50ZXJmYWNlJztcbi8qKlxuICogU3BsaXR0ZXIgaXMgdXRpbGl6ZWQgdG8gc2VwYXJhdGUgYW5kIHJlc2l6ZSBwYW5lbHMuXG4gKiBAZ3JvdXAgQ29tcG9uZW50c1xuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Atc3BsaXR0ZXInLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgI2NvbnRhaW5lciBbbmdDbGFzc109XCJjb250YWluZXJDbGFzcygpXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIiBbbmdTdHlsZV09XCJzdHlsZVwiIFthdHRyLmRhdGEtcGMtbmFtZV09XCInc3BsaXR0ZXInXCIgW2F0dHIuZGF0YS1wLWd1dHRlci1yZXNpemluZ109XCJmYWxzZVwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCIncm9vdCdcIj5cbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtcGFuZWwgW25nRm9yT2ZdPVwicGFuZWxzXCIgbGV0LWk9XCJpbmRleFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgW25nQ2xhc3NdPVwicGFuZWxDb250YWluZXJDbGFzcygpXCIgW2NsYXNzXT1cInBhbmVsU3R5bGVDbGFzc1wiIFtuZ1N0eWxlXT1cInBhbmVsU3R5bGVcIiB0YWJpbmRleD1cIi0xXCIgW2F0dHIuZGF0YS1wYy1uYW1lXT1cIidzcGxpdHRlcidcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ3Jvb3QnXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJwYW5lbFwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJpICE9PSBwYW5lbHMubGVuZ3RoIC0gMVwiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC1zcGxpdHRlci1ndXR0ZXJcIlxuICAgICAgICAgICAgICAgICAgICByb2xlPVwic2VwYXJhdG9yXCJcbiAgICAgICAgICAgICAgICAgICAgdGFiaW5kZXg9XCItMVwiXG4gICAgICAgICAgICAgICAgICAgIChtb3VzZWRvd24pPVwib25HdXR0ZXJNb3VzZURvd24oJGV2ZW50LCBpKVwiXG4gICAgICAgICAgICAgICAgICAgICh0b3VjaHN0YXJ0KT1cIm9uR3V0dGVyVG91Y2hTdGFydCgkZXZlbnQsIGkpXCJcbiAgICAgICAgICAgICAgICAgICAgKHRvdWNobW92ZSk9XCJvbkd1dHRlclRvdWNoTW92ZSgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgKHRvdWNoZW5kKT1cIm9uR3V0dGVyVG91Y2hFbmQoJGV2ZW50LCBpKVwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcC1ndXR0ZXItcmVzaXppbmddPVwiZmFsc2VcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ2d1dHRlcidcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLXNwbGl0dGVyLWd1dHRlci1oYW5kbGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgdGFiaW5kZXg9XCIwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cImd1dHRlclN0eWxlKClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1vcmllbnRhdGlvbl09XCJsYXlvdXRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS12YWx1ZW5vd109XCJwcmV2U2l6ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ2d1dHRlcmhhbmRsZSdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKGtleXVwKT1cIm9uR3V0dGVyS2V5VXAoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAoa2V5ZG93bik9XCJvbkd1dHRlcktleURvd24oJGV2ZW50LCBpKVwiXG4gICAgICAgICAgICAgICAgICAgID48L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBzdHlsZVVybHM6IFsnLi9zcGxpdHRlci5jc3MnXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAncC1lbGVtZW50JyxcbiAgICAgICAgJ1tjbGFzcy5wLXNwbGl0dGVyLXBhbmVsLW5lc3RlZF0nOiAnbmVzdGVkJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgU3BsaXR0ZXIge1xuICAgIC8qKlxuICAgICAqIFN0eWxlIGNsYXNzIG9mIHRoZSBjb21wb25lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFN0eWxlIGNsYXNzIG9mIHRoZSBwYW5lbC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwYW5lbFN0eWxlQ2xhc3M6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBJbmxpbmUgc3R5bGUgb2YgdGhlIGNvbXBvbmVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzdHlsZTogeyBba2xhc3M6IHN0cmluZ106IGFueSB9IHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBJbmxpbmUgc3R5bGUgb2YgdGhlIHBhbmVsLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHBhbmVsU3R5bGU6IHsgW2tsYXNzOiBzdHJpbmddOiBhbnkgfSB8IG51bGwgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyB3aGVyZSBhIHN0YXRlZnVsIHNwbGl0dGVyIGtlZXBzIGl0cyBzdGF0ZSwgdmFsaWQgdmFsdWVzIGFyZSAnc2Vzc2lvbicgZm9yIHNlc3Npb25TdG9yYWdlIGFuZCAnbG9jYWwnIGZvciBsb2NhbFN0b3JhZ2UuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc3RhdGVTdG9yYWdlOiBzdHJpbmcgfCB1bmRlZmluZWQgPSAnc2Vzc2lvbic7XG4gICAgLyoqXG4gICAgICogU3RvcmFnZSBpZGVudGlmaWVyIG9mIGEgc3RhdGVmdWwgU3BsaXR0ZXIuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc3RhdGVLZXk6IHN0cmluZyB8IHVuZGVmaW5lZCB8IG51bGwgPSBudWxsO1xuICAgIC8qKlxuICAgICAqIE9yaWVudGF0aW9uIG9mIHRoZSBwYW5lbHMuIFZhbGlkIHZhbHVlcyBhcmUgJ2hvcml6b250YWwnIGFuZCAndmVydGljYWwnLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGxheW91dDogc3RyaW5nIHwgdW5kZWZpbmVkID0gJ2hvcml6b250YWwnO1xuICAgIC8qKlxuICAgICAqIFNpemUgb2YgdGhlIGRpdmlkZXIgaW4gcGl4ZWxzLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGd1dHRlclNpemU6IG51bWJlciA9IDQ7XG4gICAgLyoqXG4gICAgICogU3RlcCBmYWN0b3IgdG8gaW5jcmVtZW50L2RlY3JlbWVudCB0aGUgc2l6ZSBvZiB0aGUgcGFuZWxzIHdoaWxlIHByZXNzaW5nIHRoZSBhcnJvdyBrZXlzLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHN0ZXA6IG51bWJlciA9IDU7XG4gICAgLyoqXG4gICAgICogTWluaW11bSBzaXplIG9mIHRoZSBlbGVtZW50cyByZWxhdGl2ZSB0byAxMDAlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIG1pblNpemVzOiBudW1iZXJbXSA9IFtdO1xuICAgIC8qKlxuICAgICAqIFNpemUgb2YgdGhlIGVsZW1lbnRzIHJlbGF0aXZlIHRvIDEwMCUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IHBhbmVsU2l6ZXMoKTogbnVtYmVyW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGFuZWxTaXplcztcbiAgICB9XG4gICAgc2V0IHBhbmVsU2l6ZXModmFsOiBudW1iZXJbXSkge1xuICAgICAgICB0aGlzLl9wYW5lbFNpemVzID0gdmFsO1xuXG4gICAgICAgIGlmICh0aGlzLmVsICYmIHRoaXMuZWwubmF0aXZlRWxlbWVudCAmJiB0aGlzLnBhbmVscy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsZXQgY2hpbGRyZW4gPSBbLi4udGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdLmNoaWxkcmVuXS5maWx0ZXIoKGNoaWxkKSA9PiBEb21IYW5kbGVyLmhhc0NsYXNzKGNoaWxkLCAncC1zcGxpdHRlci1wYW5lbCcpKTtcbiAgICAgICAgICAgIGxldCBfcGFuZWxTaXplcyA9IFtdO1xuXG4gICAgICAgICAgICB0aGlzLnBhbmVscy5tYXAoKHBhbmVsLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHBhbmVsSW5pdGlhbFNpemUgPSB0aGlzLnBhbmVsU2l6ZXMubGVuZ3RoIC0gMSA+PSBpID8gdGhpcy5wYW5lbFNpemVzW2ldIDogbnVsbDtcbiAgICAgICAgICAgICAgICBsZXQgcGFuZWxTaXplID0gcGFuZWxJbml0aWFsU2l6ZSB8fCAxMDAgLyB0aGlzLnBhbmVscy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgX3BhbmVsU2l6ZXNbaV0gPSBwYW5lbFNpemU7XG4gICAgICAgICAgICAgICAgY2hpbGRyZW5baV0uc3R5bGUuZmxleEJhc2lzID0gJ2NhbGMoJyArIHBhbmVsU2l6ZSArICclIC0gJyArICh0aGlzLnBhbmVscy5sZW5ndGggLSAxKSAqIHRoaXMuZ3V0dGVyU2l6ZSArICdweCknO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gcmVzaXplIGVuZHMuXG4gICAgICogQHBhcmFtIHtTcGxpdHRlclJlc2l6ZUVuZEV2ZW50fSBldmVudCAtIEN1c3RvbSBwYW5lbCByZXNpemUgZW5kIGV2ZW50XG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uUmVzaXplRW5kOiBFdmVudEVtaXR0ZXI8U3BsaXR0ZXJSZXNpemVFbmRFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFNwbGl0dGVyUmVzaXplRW5kRXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gcmVzaXplIHN0YXJ0cy5cbiAgICAgKiBAcGFyYW0ge1NwbGl0dGVyUmVzaXplU3RhcnRFdmVudH0gZXZlbnQgLSBDdXN0b20gcGFuZWwgcmVzaXplIHN0YXJ0IGV2ZW50XG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uUmVzaXplU3RhcnQ6IEV2ZW50RW1pdHRlcjxTcGxpdHRlclJlc2l6ZVN0YXJ0RXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxTcGxpdHRlclJlc2l6ZVN0YXJ0RXZlbnQ+KCk7XG5cbiAgICBAQ29udGVudENoaWxkcmVuKFByaW1lVGVtcGxhdGUpIHRlbXBsYXRlcyE6IFF1ZXJ5TGlzdDxQcmltZVRlbXBsYXRlPjtcblxuICAgIEBWaWV3Q2hpbGQoJ2NvbnRhaW5lcicsIHsgc3RhdGljOiBmYWxzZSB9KSBjb250YWluZXJWaWV3Q2hpbGQ6IE51bGxhYmxlPEVsZW1lbnRSZWY+O1xuXG4gICAgbmVzdGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBwYW5lbHM6IGFueVtdID0gW107XG5cbiAgICBkcmFnZ2luZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgbW91c2VNb3ZlTGlzdGVuZXI6IFZvaWRMaXN0ZW5lcjtcblxuICAgIG1vdXNlVXBMaXN0ZW5lcjogVm9pZExpc3RlbmVyO1xuXG4gICAgdG91Y2hNb3ZlTGlzdGVuZXI6IFZvaWRMaXN0ZW5lcjtcblxuICAgIHRvdWNoRW5kTGlzdGVuZXI6IFZvaWRMaXN0ZW5lcjtcblxuICAgIHNpemU6IE51bGxhYmxlPG51bWJlcj47XG5cbiAgICBndXR0ZXJFbGVtZW50OiBOdWxsYWJsZTxFbGVtZW50UmVmIHwgSFRNTEVsZW1lbnQ+O1xuXG4gICAgc3RhcnRQb3M6IE51bGxhYmxlPG51bWJlcj47XG5cbiAgICBwcmV2UGFuZWxFbGVtZW50OiBOdWxsYWJsZTxFbGVtZW50UmVmIHwgSFRNTEVsZW1lbnQ+O1xuXG4gICAgbmV4dFBhbmVsRWxlbWVudDogTnVsbGFibGU8RWxlbWVudFJlZiB8IEhUTUxFbGVtZW50PjtcblxuICAgIG5leHRQYW5lbFNpemU6IE51bGxhYmxlPG51bWJlcj47XG5cbiAgICBwcmV2UGFuZWxTaXplOiBOdWxsYWJsZTxudW1iZXI+O1xuXG4gICAgX3BhbmVsU2l6ZXM6IG51bWJlcltdID0gW107XG5cbiAgICBwcmV2UGFuZWxJbmRleDogTnVsbGFibGU8bnVtYmVyPjtcblxuICAgIHRpbWVyOiBhbnk7XG5cbiAgICBwcmV2U2l6ZTogYW55O1xuXG4gICAgcHJpdmF0ZSB3aW5kb3c6IFdpbmRvdztcblxuICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IERvY3VtZW50LCBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IGFueSwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLCBwdWJsaWMgY2Q6IENoYW5nZURldGVjdG9yUmVmLCBwcml2YXRlIGVsOiBFbGVtZW50UmVmKSB7XG4gICAgICAgIHRoaXMud2luZG93ID0gdGhpcy5kb2N1bWVudC5kZWZhdWx0VmlldyBhcyBXaW5kb3c7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMubmVzdGVkID0gdGhpcy5pc05lc3RlZCgpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChpdGVtLmdldFR5cGUoKSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ3BhbmVsJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYW5lbHMucHVzaChpdGVtLnRlbXBsYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYW5lbHMucHVzaChpdGVtLnRlbXBsYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnBhbmVscyAmJiB0aGlzLnBhbmVscy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBsZXQgaW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1N0YXRlZnVsKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbGl6ZWQgPSB0aGlzLnJlc3RvcmVTdGF0ZSgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICghaW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkcmVuID0gWy4uLnRoaXMuZWwubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXS5jaGlsZHJlbl0uZmlsdGVyKChjaGlsZCkgPT4gRG9tSGFuZGxlci5oYXNDbGFzcyhjaGlsZCwgJ3Atc3BsaXR0ZXItcGFuZWwnKSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBfcGFuZWxTaXplcyA9IFtdO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFuZWxzLm1hcCgocGFuZWwsIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwYW5lbEluaXRpYWxTaXplID0gdGhpcy5wYW5lbFNpemVzLmxlbmd0aCAtIDEgPj0gaSA/IHRoaXMucGFuZWxTaXplc1tpXSA6IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcGFuZWxTaXplID0gcGFuZWxJbml0aWFsU2l6ZSB8fCAxMDAgLyB0aGlzLnBhbmVscy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICBfcGFuZWxTaXplc1tpXSA9IHBhbmVsU2l6ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuW2ldLnN0eWxlLmZsZXhCYXNpcyA9ICdjYWxjKCcgKyBwYW5lbFNpemUgKyAnJSAtICcgKyAodGhpcy5wYW5lbHMubGVuZ3RoIC0gMSkgKiAodGhpcy5ndXR0ZXJTaXplIGFzIG51bWJlcikgKyAncHgpJztcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcGFuZWxTaXplcyA9IF9wYW5lbFNpemVzO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJldlNpemUgPSBwYXJzZUZsb2F0KF9wYW5lbFNpemVzWzBdKS50b0ZpeGVkKDQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlc2l6ZVN0YXJ0KGV2ZW50OiBUb3VjaEV2ZW50IHwgTW91c2VFdmVudCwgaW5kZXg6IG51bWJlciwgaXNLZXlEb3duPzogYm9vbGVhbikge1xuICAgICAgICB0aGlzLmd1dHRlckVsZW1lbnQgPSAoZXZlbnQuY3VycmVudFRhcmdldCBhcyBIVE1MRWxlbWVudCkgfHwgKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkucGFyZW50RWxlbWVudDtcbiAgICAgICAgdGhpcy5zaXplID0gdGhpcy5ob3Jpem9udGFsKCkgPyBEb21IYW5kbGVyLmdldFdpZHRoKCh0aGlzLmNvbnRhaW5lclZpZXdDaGlsZCBhcyBFbGVtZW50UmVmKS5uYXRpdmVFbGVtZW50KSA6IERvbUhhbmRsZXIuZ2V0SGVpZ2h0KCh0aGlzLmNvbnRhaW5lclZpZXdDaGlsZCBhcyBFbGVtZW50UmVmKS5uYXRpdmVFbGVtZW50KTtcblxuICAgICAgICBpZiAoIWlzS2V5RG93bikge1xuICAgICAgICAgICAgdGhpcy5kcmFnZ2luZyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0UG9zID0gdGhpcy5ob3Jpem9udGFsKCkgPyAoZXZlbnQgaW5zdGFuY2VvZiBNb3VzZUV2ZW50ID8gZXZlbnQucGFnZVggOiBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWCkgOiBldmVudCBpbnN0YW5jZW9mIE1vdXNlRXZlbnQgPyBldmVudC5wYWdlWSA6IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VZO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wcmV2UGFuZWxFbGVtZW50ID0gdGhpcy5ndXR0ZXJFbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmcgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgIHRoaXMubmV4dFBhbmVsRWxlbWVudCA9IHRoaXMuZ3V0dGVyRWxlbWVudC5uZXh0RWxlbWVudFNpYmxpbmcgYXMgSFRNTEVsZW1lbnQ7XG5cbiAgICAgICAgaWYgKGlzS2V5RG93bikge1xuICAgICAgICAgICAgdGhpcy5wcmV2UGFuZWxTaXplID0gdGhpcy5ob3Jpem9udGFsKCkgPyBEb21IYW5kbGVyLmdldE91dGVyV2lkdGgodGhpcy5wcmV2UGFuZWxFbGVtZW50LCB0cnVlKSA6IERvbUhhbmRsZXIuZ2V0T3V0ZXJIZWlnaHQodGhpcy5wcmV2UGFuZWxFbGVtZW50LCB0cnVlKTtcbiAgICAgICAgICAgIHRoaXMubmV4dFBhbmVsU2l6ZSA9IHRoaXMuaG9yaXpvbnRhbCgpID8gRG9tSGFuZGxlci5nZXRPdXRlcldpZHRoKHRoaXMubmV4dFBhbmVsRWxlbWVudCwgdHJ1ZSkgOiBEb21IYW5kbGVyLmdldE91dGVySGVpZ2h0KHRoaXMubmV4dFBhbmVsRWxlbWVudCwgdHJ1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnByZXZQYW5lbFNpemUgPSAoMTAwICogKHRoaXMuaG9yaXpvbnRhbCgpID8gRG9tSGFuZGxlci5nZXRPdXRlcldpZHRoKHRoaXMucHJldlBhbmVsRWxlbWVudCwgdHJ1ZSkgOiBEb21IYW5kbGVyLmdldE91dGVySGVpZ2h0KHRoaXMucHJldlBhbmVsRWxlbWVudCwgdHJ1ZSkpKSAvIHRoaXMuc2l6ZTtcbiAgICAgICAgICAgIHRoaXMubmV4dFBhbmVsU2l6ZSA9ICgxMDAgKiAodGhpcy5ob3Jpem9udGFsKCkgPyBEb21IYW5kbGVyLmdldE91dGVyV2lkdGgodGhpcy5uZXh0UGFuZWxFbGVtZW50LCB0cnVlKSA6IERvbUhhbmRsZXIuZ2V0T3V0ZXJIZWlnaHQodGhpcy5uZXh0UGFuZWxFbGVtZW50LCB0cnVlKSkpIC8gdGhpcy5zaXplO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wcmV2UGFuZWxJbmRleCA9IGluZGV4O1xuICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKHRoaXMuZ3V0dGVyRWxlbWVudCwgJ3Atc3BsaXR0ZXItZ3V0dGVyLXJlc2l6aW5nJyk7XG4gICAgICAgIHRoaXMuZ3V0dGVyRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtcC1ndXR0ZXItcmVzaXppbmcnLCAndHJ1ZScpO1xuICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKCh0aGlzLmNvbnRhaW5lclZpZXdDaGlsZCBhcyBFbGVtZW50UmVmKS5uYXRpdmVFbGVtZW50LCAncC1zcGxpdHRlci1yZXNpemluZycpO1xuICAgICAgICB0aGlzLmNvbnRhaW5lclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS1wLXJlc2l6aW5nJywgJ3RydWUnKTtcbiAgICAgICAgdGhpcy5vblJlc2l6ZVN0YXJ0LmVtaXQoeyBvcmlnaW5hbEV2ZW50OiBldmVudCwgc2l6ZXM6IHRoaXMuX3BhbmVsU2l6ZXMgYXMgbnVtYmVyW10gfSk7XG4gICAgfVxuXG4gICAgb25SZXNpemUoZXZlbnQ6IE1vdXNlRXZlbnQsIHN0ZXA/OiBudW1iZXIsIGlzS2V5RG93bj86IGJvb2xlYW4pIHtcbiAgICAgICAgbGV0IG5ld1BvcywgbmV3UHJldlBhbmVsU2l6ZSwgbmV3TmV4dFBhbmVsU2l6ZTtcblxuICAgICAgICBpZiAoaXNLZXlEb3duKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5ob3Jpem9udGFsKCkpIHtcbiAgICAgICAgICAgICAgICBuZXdQcmV2UGFuZWxTaXplID0gKDEwMCAqICh0aGlzLnByZXZQYW5lbFNpemUgKyBzdGVwKSkgLyB0aGlzLnNpemU7XG4gICAgICAgICAgICAgICAgbmV3TmV4dFBhbmVsU2l6ZSA9ICgxMDAgKiAodGhpcy5uZXh0UGFuZWxTaXplIC0gc3RlcCkpIC8gdGhpcy5zaXplO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBuZXdQcmV2UGFuZWxTaXplID0gKDEwMCAqICh0aGlzLnByZXZQYW5lbFNpemUgLSBzdGVwKSkgLyB0aGlzLnNpemU7XG4gICAgICAgICAgICAgICAgbmV3TmV4dFBhbmVsU2l6ZSA9ICgxMDAgKiAodGhpcy5uZXh0UGFuZWxTaXplICsgc3RlcCkpIC8gdGhpcy5zaXplO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuaG9yaXpvbnRhbCgpKSBuZXdQb3MgPSAoZXZlbnQucGFnZVggKiAxMDApIC8gdGhpcy5zaXplIC0gKHRoaXMuc3RhcnRQb3MgKiAxMDApIC8gdGhpcy5zaXplO1xuICAgICAgICAgICAgZWxzZSBuZXdQb3MgPSAoZXZlbnQucGFnZVkgKiAxMDApIC8gdGhpcy5zaXplIC0gKHRoaXMuc3RhcnRQb3MgKiAxMDApIC8gdGhpcy5zaXplO1xuXG4gICAgICAgICAgICBuZXdQcmV2UGFuZWxTaXplID0gKHRoaXMucHJldlBhbmVsU2l6ZSBhcyBudW1iZXIpICsgbmV3UG9zO1xuICAgICAgICAgICAgbmV3TmV4dFBhbmVsU2l6ZSA9ICh0aGlzLm5leHRQYW5lbFNpemUgYXMgbnVtYmVyKSAtIG5ld1BvcztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucHJldlNpemUgPSBwYXJzZUZsb2F0KG5ld1ByZXZQYW5lbFNpemUpLnRvRml4ZWQoNCk7XG5cbiAgICAgICAgaWYgKHRoaXMudmFsaWRhdGVSZXNpemUobmV3UHJldlBhbmVsU2l6ZSwgbmV3TmV4dFBhbmVsU2l6ZSkpIHtcbiAgICAgICAgICAgICh0aGlzLnByZXZQYW5lbEVsZW1lbnQgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmZsZXhCYXNpcyA9ICdjYWxjKCcgKyBuZXdQcmV2UGFuZWxTaXplICsgJyUgLSAnICsgKHRoaXMucGFuZWxzLmxlbmd0aCAtIDEpICogdGhpcy5ndXR0ZXJTaXplICsgJ3B4KSc7XG4gICAgICAgICAgICAodGhpcy5uZXh0UGFuZWxFbGVtZW50IGFzIEhUTUxFbGVtZW50KS5zdHlsZS5mbGV4QmFzaXMgPSAnY2FsYygnICsgbmV3TmV4dFBhbmVsU2l6ZSArICclIC0gJyArICh0aGlzLnBhbmVscy5sZW5ndGggLSAxKSAqIHRoaXMuZ3V0dGVyU2l6ZSArICdweCknO1xuICAgICAgICAgICAgdGhpcy5fcGFuZWxTaXplc1t0aGlzLnByZXZQYW5lbEluZGV4IGFzIG51bWJlcl0gPSBuZXdQcmV2UGFuZWxTaXplO1xuICAgICAgICAgICAgdGhpcy5fcGFuZWxTaXplc1sodGhpcy5wcmV2UGFuZWxJbmRleCBhcyBudW1iZXIpICsgMV0gPSBuZXdOZXh0UGFuZWxTaXplO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVzaXplRW5kKGV2ZW50OiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5pc1N0YXRlZnVsKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2F2ZVN0YXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9uUmVzaXplRW5kLmVtaXQoeyBvcmlnaW5hbEV2ZW50OiBldmVudCwgc2l6ZXM6IHRoaXMuX3BhbmVsU2l6ZXMgfSk7XG4gICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3ModGhpcy5ndXR0ZXJFbGVtZW50LCAncC1zcGxpdHRlci1ndXR0ZXItcmVzaXppbmcnKTtcbiAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcygodGhpcy5jb250YWluZXJWaWV3Q2hpbGQgYXMgRWxlbWVudFJlZikubmF0aXZlRWxlbWVudCwgJ3Atc3BsaXR0ZXItcmVzaXppbmcnKTtcbiAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgIH1cblxuICAgIG9uR3V0dGVyTW91c2VEb3duKGV2ZW50OiBNb3VzZUV2ZW50LCBpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMucmVzaXplU3RhcnQoZXZlbnQsIGluZGV4KTtcbiAgICAgICAgdGhpcy5iaW5kTW91c2VMaXN0ZW5lcnMoKTtcbiAgICB9XG5cbiAgICBvbkd1dHRlclRvdWNoU3RhcnQoZXZlbnQ6IFRvdWNoRXZlbnQsIGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgaWYgKGV2ZW50LmNhbmNlbGFibGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVzaXplU3RhcnQoZXZlbnQsIGluZGV4KTtcbiAgICAgICAgICAgIHRoaXMuYmluZFRvdWNoTGlzdGVuZXJzKCk7XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkd1dHRlclRvdWNoTW92ZShldmVudCkge1xuICAgICAgICB0aGlzLm9uUmVzaXplKGV2ZW50KTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvbkd1dHRlclRvdWNoRW5kKGV2ZW50OiBUb3VjaEV2ZW50KSB7XG4gICAgICAgIHRoaXMucmVzaXplRW5kKGV2ZW50KTtcbiAgICAgICAgdGhpcy51bmJpbmRUb3VjaExpc3RlbmVycygpO1xuXG4gICAgICAgIGlmIChldmVudC5jYW5jZWxhYmxlKSBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIHJlcGVhdChldmVudCwgaW5kZXgsIHN0ZXApIHtcbiAgICAgICAgdGhpcy5yZXNpemVTdGFydChldmVudCwgaW5kZXgsIHRydWUpO1xuICAgICAgICB0aGlzLm9uUmVzaXplKGV2ZW50LCBzdGVwLCB0cnVlKTtcbiAgICB9XG5cbiAgICBzZXRUaW1lcihldmVudCwgaW5kZXgsIHN0ZXApIHtcbiAgICAgICAgdGhpcy5jbGVhclRpbWVyKCk7XG4gICAgICAgIHRoaXMudGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVwZWF0KGV2ZW50LCBpbmRleCwgc3RlcCk7XG4gICAgICAgIH0sIDQwKTtcbiAgICB9XG5cbiAgICBjbGVhclRpbWVyKCkge1xuICAgICAgICBpZiAodGhpcy50aW1lcikge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25HdXR0ZXJLZXlVcChldmVudCkge1xuICAgICAgICB0aGlzLmNsZWFyVGltZXIoKTtcbiAgICAgICAgdGhpcy5yZXNpemVFbmQoZXZlbnQpO1xuICAgIH1cblxuICAgIG9uR3V0dGVyS2V5RG93bihldmVudCwgaW5kZXgpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC5jb2RlKSB7XG4gICAgICAgICAgICBjYXNlICdBcnJvd0xlZnQnOiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubGF5b3V0ID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRUaW1lcihldmVudCwgaW5kZXgsIHRoaXMuc3RlcCAqIC0xKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjYXNlICdBcnJvd1JpZ2h0Jzoge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxheW91dCA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VGltZXIoZXZlbnQsIGluZGV4LCB0aGlzLnN0ZXApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNhc2UgJ0Fycm93RG93bic6IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5sYXlvdXQgPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRUaW1lcihldmVudCwgaW5kZXgsIHRoaXMuc3RlcCAqIC0xKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjYXNlICdBcnJvd1VwJzoge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxheW91dCA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFRpbWVyKGV2ZW50LCBpbmRleCwgdGhpcy5zdGVwKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIC8vbm8gb3BcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhbGlkYXRlUmVzaXplKG5ld1ByZXZQYW5lbFNpemU6IG51bWJlciwgbmV3TmV4dFBhbmVsU2l6ZTogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLm1pblNpemVzLmxlbmd0aCA+PSAxICYmIHRoaXMubWluU2l6ZXNbMF0gJiYgdGhpcy5taW5TaXplc1swXSA+IG5ld1ByZXZQYW5lbFNpemUpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm1pblNpemVzLmxlbmd0aCA+IDEgJiYgdGhpcy5taW5TaXplc1sxXSAmJiB0aGlzLm1pblNpemVzWzFdID4gbmV3TmV4dFBhbmVsU2l6ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgYmluZE1vdXNlTGlzdGVuZXJzKCkge1xuICAgICAgICBpZiAoIXRoaXMubW91c2VNb3ZlTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMubW91c2VNb3ZlTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLmRvY3VtZW50LCAnbW91c2Vtb3ZlJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vblJlc2l6ZShldmVudCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5tb3VzZVVwTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMubW91c2VVcExpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5kb2N1bWVudCwgJ21vdXNldXAnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2l6ZUVuZChldmVudCk7XG4gICAgICAgICAgICAgICAgdGhpcy51bmJpbmRNb3VzZUxpc3RlbmVycygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBiaW5kVG91Y2hMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGlmICghdGhpcy50b3VjaE1vdmVMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy50b3VjaE1vdmVMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMuZG9jdW1lbnQsICd0b3VjaG1vdmUnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uUmVzaXplKGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLnRvdWNoRW5kTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMudG91Y2hFbmRMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMuZG9jdW1lbnQsICd0b3VjaGVuZCcsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzaXplRW5kKGV2ZW50KTtcbiAgICAgICAgICAgICAgICB0aGlzLnVuYmluZFRvdWNoTGlzdGVuZXJzKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVuYmluZE1vdXNlTGlzdGVuZXJzKCkge1xuICAgICAgICBpZiAodGhpcy5tb3VzZU1vdmVMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5tb3VzZU1vdmVMaXN0ZW5lcigpO1xuICAgICAgICAgICAgdGhpcy5tb3VzZU1vdmVMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5tb3VzZVVwTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMubW91c2VVcExpc3RlbmVyKCk7XG4gICAgICAgICAgICB0aGlzLm1vdXNlVXBMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1bmJpbmRUb3VjaExpc3RlbmVycygpIHtcbiAgICAgICAgaWYgKHRoaXMudG91Y2hNb3ZlTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMudG91Y2hNb3ZlTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIHRoaXMudG91Y2hNb3ZlTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMudG91Y2hFbmRMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy50b3VjaEVuZExpc3RlbmVyKCk7XG4gICAgICAgICAgICB0aGlzLnRvdWNoRW5kTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xlYXIoKSB7XG4gICAgICAgIHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zaXplID0gbnVsbDtcbiAgICAgICAgdGhpcy5zdGFydFBvcyA9IG51bGw7XG4gICAgICAgIHRoaXMucHJldlBhbmVsRWxlbWVudCA9IG51bGw7XG4gICAgICAgIHRoaXMubmV4dFBhbmVsRWxlbWVudCA9IG51bGw7XG4gICAgICAgIHRoaXMucHJldlBhbmVsU2l6ZSA9IG51bGw7XG4gICAgICAgIHRoaXMubmV4dFBhbmVsU2l6ZSA9IG51bGw7XG4gICAgICAgIHRoaXMuZ3V0dGVyRWxlbWVudCA9IG51bGw7XG4gICAgICAgIHRoaXMucHJldlBhbmVsSW5kZXggPSBudWxsO1xuICAgIH1cblxuICAgIGlzTmVzdGVkKCkge1xuICAgICAgICBpZiAodGhpcy5lbC5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICBsZXQgcGFyZW50ID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICB3aGlsZSAocGFyZW50ICYmICFEb21IYW5kbGVyLmhhc0NsYXNzKHBhcmVudCwgJ3Atc3BsaXR0ZXInKSkge1xuICAgICAgICAgICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcGFyZW50ICE9PSBudWxsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNTdGF0ZWZ1bCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGVLZXkgIT0gbnVsbDtcbiAgICB9XG5cbiAgICBnZXRTdG9yYWdlKCkge1xuICAgICAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgICAgICAgc3dpdGNoICh0aGlzLnN0YXRlU3RvcmFnZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2xvY2FsJzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMud2luZG93LmxvY2FsU3RvcmFnZTtcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3Nlc3Npb24nOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy53aW5kb3cuc2Vzc2lvblN0b3JhZ2U7XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5zdGF0ZVN0b3JhZ2UgKyAnIGlzIG5vdCBhIHZhbGlkIHZhbHVlIGZvciB0aGUgc3RhdGUgc3RvcmFnZSwgc3VwcG9ydGVkIHZhbHVlcyBhcmUgXCJsb2NhbFwiIGFuZCBcInNlc3Npb25cIi4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU3RvcmFnZSBpcyBub3QgYSBhdmFpbGFibGUgYnkgZGVmYXVsdCBvbiB0aGUgc2VydmVyLicpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2F2ZVN0YXRlKCkge1xuICAgICAgICB0aGlzLmdldFN0b3JhZ2UoKS5zZXRJdGVtKHRoaXMuc3RhdGVLZXkgYXMgc3RyaW5nLCBKU09OLnN0cmluZ2lmeSh0aGlzLl9wYW5lbFNpemVzKSk7XG4gICAgfVxuXG4gICAgcmVzdG9yZVN0YXRlKCkge1xuICAgICAgICBjb25zdCBzdG9yYWdlID0gdGhpcy5nZXRTdG9yYWdlKCk7XG4gICAgICAgIGNvbnN0IHN0YXRlU3RyaW5nID0gc3RvcmFnZS5nZXRJdGVtKHRoaXMuc3RhdGVLZXkgYXMgc3RyaW5nKTtcblxuICAgICAgICBpZiAoc3RhdGVTdHJpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuX3BhbmVsU2l6ZXMgPSBKU09OLnBhcnNlKHN0YXRlU3RyaW5nKTtcbiAgICAgICAgICAgIGxldCBjaGlsZHJlbiA9IFsuLi4odGhpcy5jb250YWluZXJWaWV3Q2hpbGQgYXMgRWxlbWVudFJlZikubmF0aXZlRWxlbWVudC5jaGlsZHJlbl0uZmlsdGVyKChjaGlsZCkgPT4gRG9tSGFuZGxlci5oYXNDbGFzcyhjaGlsZCwgJ3Atc3BsaXR0ZXItcGFuZWwnKSk7XG4gICAgICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKChjaGlsZCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIGNoaWxkLnN0eWxlLmZsZXhCYXNpcyA9ICdjYWxjKCcgKyB0aGlzLl9wYW5lbFNpemVzW2ldICsgJyUgLSAnICsgKHRoaXMucGFuZWxzLmxlbmd0aCAtIDEpICogdGhpcy5ndXR0ZXJTaXplICsgJ3B4KSc7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29udGFpbmVyQ2xhc3MoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAncC1zcGxpdHRlciBwLWNvbXBvbmVudCc6IHRydWUsXG4gICAgICAgICAgICAncC1zcGxpdHRlci1ob3Jpem9udGFsJzogdGhpcy5sYXlvdXQgPT09ICdob3Jpem9udGFsJyxcbiAgICAgICAgICAgICdwLXNwbGl0dGVyLXZlcnRpY2FsJzogdGhpcy5sYXlvdXQgPT09ICd2ZXJ0aWNhbCdcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwYW5lbENvbnRhaW5lckNsYXNzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJ3Atc3BsaXR0ZXItcGFuZWwnOiB0cnVlLFxuICAgICAgICAgICAgJ3Atc3BsaXR0ZXItcGFuZWwtbmVzdGVkJzogdHJ1ZVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGd1dHRlclN0eWxlKCkge1xuICAgICAgICBpZiAodGhpcy5ob3Jpem9udGFsKCkpIHJldHVybiB7IHdpZHRoOiB0aGlzLmd1dHRlclNpemUgKyAncHgnIH07XG4gICAgICAgIGVsc2UgcmV0dXJuIHsgaGVpZ2h0OiB0aGlzLmd1dHRlclNpemUgKyAncHgnIH07XG4gICAgfVxuXG4gICAgaG9yaXpvbnRhbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGF5b3V0ID09PSAnaG9yaXpvbnRhbCc7XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtTcGxpdHRlciwgU2hhcmVkTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtTcGxpdHRlcl1cbn0pXG5leHBvcnQgY2xhc3MgU3BsaXR0ZXJNb2R1bGUge31cbiJdfQ==