import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, Inject, Input, NgModule, PLATFORM_ID, ViewChild, ViewEncapsulation } from '@angular/core';
import { PrimeTemplate } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 * ScrollPanel is a cross browser, lightweight and themable alternative to native browser scrollbar.
 * @group Components
 */
export class ScrollPanel {
    platformId;
    el;
    zone;
    cd;
    document;
    renderer;
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
     * Step factor to scroll the content while pressing the arrow keys.
     * @group Props
     */
    step = 5;
    containerViewChild;
    contentViewChild;
    xBarViewChild;
    yBarViewChild;
    templates;
    scrollYRatio;
    scrollXRatio;
    timeoutFrame = (fn) => setTimeout(fn, 0);
    initialized = false;
    lastPageY;
    lastPageX;
    isXBarClicked = false;
    isYBarClicked = false;
    contentTemplate;
    lastScrollLeft = 0;
    lastScrollTop = 0;
    orientation = 'vertical';
    timer;
    windowResizeListener;
    contentScrollListener;
    mouseEnterListener;
    xBarMouseDownListener;
    yBarMouseDownListener;
    documentMouseMoveListener;
    documentMouseUpListener;
    constructor(platformId, el, zone, cd, document, renderer) {
        this.platformId = platformId;
        this.el = el;
        this.zone = zone;
        this.cd = cd;
        this.document = document;
        this.renderer = renderer;
    }
    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.zone.runOutsideAngular(() => {
                this.moveBar();
                this.moveBar = this.moveBar.bind(this);
                this.onXBarMouseDown = this.onXBarMouseDown.bind(this);
                this.onYBarMouseDown = this.onYBarMouseDown.bind(this);
                this.onDocumentMouseMove = this.onDocumentMouseMove.bind(this);
                this.onDocumentMouseUp = this.onDocumentMouseUp.bind(this);
                this.windowResizeListener = this.renderer.listen(window, 'resize', this.moveBar);
                this.contentScrollListener = this.renderer.listen(this.contentViewChild.nativeElement, 'scroll', this.moveBar);
                this.mouseEnterListener = this.renderer.listen(this.contentViewChild.nativeElement, 'mouseenter', this.moveBar);
                this.xBarMouseDownListener = this.renderer.listen(this.xBarViewChild.nativeElement, 'mousedown', this.onXBarMouseDown);
                this.yBarMouseDownListener = this.renderer.listen(this.yBarViewChild.nativeElement, 'mousedown', this.onYBarMouseDown);
                this.calculateContainerHeight();
                this.initialized = true;
            });
        }
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'content':
                    this.contentTemplate = item.template;
                    break;
                default:
                    this.contentTemplate = item.template;
                    break;
            }
        });
    }
    calculateContainerHeight() {
        let container = this.containerViewChild.nativeElement;
        let content = this.contentViewChild.nativeElement;
        let xBar = this.xBarViewChild.nativeElement;
        const window = this.document.defaultView;
        let containerStyles = window.getComputedStyle(container), xBarStyles = window.getComputedStyle(xBar), pureContainerHeight = DomHandler.getHeight(container) - parseInt(xBarStyles['height'], 10);
        if (containerStyles['max-height'] != 'none' && pureContainerHeight == 0) {
            if (content.offsetHeight + parseInt(xBarStyles['height'], 10) > parseInt(containerStyles['max-height'], 10)) {
                container.style.height = containerStyles['max-height'];
            }
            else {
                container.style.height = content.offsetHeight + parseFloat(containerStyles.paddingTop) + parseFloat(containerStyles.paddingBottom) + parseFloat(containerStyles.borderTopWidth) + parseFloat(containerStyles.borderBottomWidth) + 'px';
            }
        }
    }
    moveBar() {
        let container = this.containerViewChild.nativeElement;
        let content = this.contentViewChild.nativeElement;
        /* horizontal scroll */
        let xBar = this.xBarViewChild.nativeElement;
        let totalWidth = content.scrollWidth;
        let ownWidth = content.clientWidth;
        let bottom = (container.clientHeight - xBar.clientHeight) * -1;
        this.scrollXRatio = ownWidth / totalWidth;
        /* vertical scroll */
        let yBar = this.yBarViewChild.nativeElement;
        let totalHeight = content.scrollHeight;
        let ownHeight = content.clientHeight;
        let right = (container.clientWidth - yBar.clientWidth) * -1;
        this.scrollYRatio = ownHeight / totalHeight;
        this.requestAnimationFrame(() => {
            if (this.scrollXRatio >= 1) {
                xBar.setAttribute('data-p-scrollpanel-hidden', 'true');
                DomHandler.addClass(xBar, 'p-scrollpanel-hidden');
            }
            else {
                xBar.setAttribute('data-p-scrollpanel-hidden', 'false');
                DomHandler.removeClass(xBar, 'p-scrollpanel-hidden');
                const xBarWidth = Math.max(this.scrollXRatio * 100, 10);
                const xBarLeft = (content.scrollLeft * (100 - xBarWidth)) / (totalWidth - ownWidth);
                xBar.style.cssText = 'width:' + xBarWidth + '%; left:' + xBarLeft + '%;bottom:' + bottom + 'px;';
            }
            if (this.scrollYRatio >= 1) {
                yBar.setAttribute('data-p-scrollpanel-hidden', 'true');
                DomHandler.addClass(yBar, 'p-scrollpanel-hidden');
            }
            else {
                yBar.setAttribute('data-p-scrollpanel-hidden', 'false');
                DomHandler.removeClass(yBar, 'p-scrollpanel-hidden');
                const yBarHeight = Math.max(this.scrollYRatio * 100, 10);
                const yBarTop = (content.scrollTop * (100 - yBarHeight)) / (totalHeight - ownHeight);
                yBar.style.cssText = 'height:' + yBarHeight + '%; top: calc(' + yBarTop + '% - ' + xBar.clientHeight + 'px);right:' + right + 'px;';
            }
        });
        this.cd.markForCheck();
    }
    onScroll(event) {
        if (this.lastScrollLeft !== event.target.scrollLeft) {
            this.lastScrollLeft = event.target.scrollLeft;
            this.orientation = 'horizontal';
        }
        else if (this.lastScrollTop !== event.target.scrollTop) {
            this.lastScrollTop = event.target.scrollTop;
            this.orientation = 'vertical';
        }
        this.moveBar();
    }
    onKeyDown(event) {
        if (this.orientation === 'vertical') {
            switch (event.code) {
                case 'ArrowDown': {
                    this.setTimer('scrollTop', this.step);
                    event.preventDefault();
                    break;
                }
                case 'ArrowUp': {
                    this.setTimer('scrollTop', this.step * -1);
                    event.preventDefault();
                    break;
                }
                case 'ArrowLeft':
                case 'ArrowRight': {
                    event.preventDefault();
                    break;
                }
                default:
                    //no op
                    break;
            }
        }
        else if (this.orientation === 'horizontal') {
            switch (event.code) {
                case 'ArrowRight': {
                    this.setTimer('scrollLeft', this.step);
                    event.preventDefault();
                    break;
                }
                case 'ArrowLeft': {
                    this.setTimer('scrollLeft', this.step * -1);
                    event.preventDefault();
                    break;
                }
                case 'ArrowDown':
                case 'ArrowUp': {
                    event.preventDefault();
                    break;
                }
                default:
                    //no op
                    break;
            }
        }
    }
    onKeyUp() {
        this.clearTimer();
    }
    repeat(bar, step) {
        this.contentViewChild.nativeElement[bar] += step;
        this.moveBar();
    }
    setTimer(bar, step) {
        this.clearTimer();
        this.timer = setTimeout(() => {
            this.repeat(bar, step);
        }, 40);
    }
    clearTimer() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }
    bindDocumentMouseListeners() {
        if (!this.documentMouseMoveListener) {
            this.documentMouseMoveListener = (e) => {
                this.onDocumentMouseMove(e);
            };
            this.document.addEventListener('mousemove', this.documentMouseMoveListener);
        }
        if (!this.documentMouseUpListener) {
            this.documentMouseUpListener = (e) => {
                this.onDocumentMouseUp(e);
            };
            this.document.addEventListener('mouseup', this.documentMouseUpListener);
        }
    }
    unbindDocumentMouseListeners() {
        if (this.documentMouseMoveListener) {
            this.document.removeEventListener('mousemove', this.documentMouseMoveListener);
            this.documentMouseMoveListener = null;
        }
        if (this.documentMouseUpListener) {
            document.removeEventListener('mouseup', this.documentMouseUpListener);
            this.documentMouseUpListener = null;
        }
    }
    onYBarMouseDown(e) {
        this.isYBarClicked = true;
        this.yBarViewChild.nativeElement.focus();
        this.lastPageY = e.pageY;
        this.yBarViewChild.nativeElement.setAttribute('data-p-scrollpanel-grabbed', 'true');
        DomHandler.addClass(this.yBarViewChild.nativeElement, 'p-scrollpanel-grabbed');
        this.document.body.setAttribute('data-p-scrollpanel-grabbed', 'true');
        DomHandler.addClass(this.document.body, 'p-scrollpanel-grabbed');
        this.bindDocumentMouseListeners();
        e.preventDefault();
    }
    onXBarMouseDown(e) {
        this.isXBarClicked = true;
        this.xBarViewChild.nativeElement.focus();
        this.lastPageX = e.pageX;
        this.xBarViewChild.nativeElement.setAttribute('data-p-scrollpanel-grabbed', 'false');
        DomHandler.addClass(this.xBarViewChild.nativeElement, 'p-scrollpanel-grabbed');
        this.document.body.setAttribute('data-p-scrollpanel-grabbed', 'false');
        DomHandler.addClass(this.document.body, 'p-scrollpanel-grabbed');
        this.bindDocumentMouseListeners();
        e.preventDefault();
    }
    onDocumentMouseMove(e) {
        if (this.isXBarClicked) {
            this.onMouseMoveForXBar(e);
        }
        else if (this.isYBarClicked) {
            this.onMouseMoveForYBar(e);
        }
        else {
            this.onMouseMoveForXBar(e);
            this.onMouseMoveForYBar(e);
        }
    }
    onMouseMoveForXBar(e) {
        let deltaX = e.pageX - this.lastPageX;
        this.lastPageX = e.pageX;
        this.requestAnimationFrame(() => {
            this.contentViewChild.nativeElement.scrollLeft += deltaX / this.scrollXRatio;
        });
    }
    onMouseMoveForYBar(e) {
        let deltaY = e.pageY - this.lastPageY;
        this.lastPageY = e.pageY;
        this.requestAnimationFrame(() => {
            this.contentViewChild.nativeElement.scrollTop += deltaY / this.scrollYRatio;
        });
    }
    /**
     * Scrolls the top location to the given value.
     * @param scrollTop
     * @group Method
     */
    scrollTop(scrollTop) {
        let scrollableHeight = this.contentViewChild.nativeElement.scrollHeight - this.contentViewChild.nativeElement.clientHeight;
        scrollTop = scrollTop > scrollableHeight ? scrollableHeight : scrollTop > 0 ? scrollTop : 0;
        this.contentViewChild.nativeElement.scrollTop = scrollTop;
    }
    onFocus(event) {
        if (this.xBarViewChild.nativeElement.isSameNode(event.target)) {
            this.orientation = 'horizontal';
        }
        else if (this.yBarViewChild.nativeElement.isSameNode(event.target)) {
            this.orientation = 'vertical';
        }
    }
    onBlur() {
        if (this.orientation === 'horizontal') {
            this.orientation = 'vertical';
        }
    }
    onDocumentMouseUp(e) {
        this.yBarViewChild.nativeElement.setAttribute('data-p-scrollpanel-grabbed', 'false');
        DomHandler.removeClass(this.yBarViewChild.nativeElement, 'p-scrollpanel-grabbed');
        this.xBarViewChild.nativeElement.setAttribute('data-p-scrollpanel-grabbed', 'false');
        DomHandler.removeClass(this.xBarViewChild.nativeElement, 'p-scrollpanel-grabbed');
        this.document.body.setAttribute('data-p-scrollpanel-grabbed', 'false');
        DomHandler.removeClass(this.document.body, 'p-scrollpanel-grabbed');
        this.unbindDocumentMouseListeners();
        this.isXBarClicked = false;
        this.isYBarClicked = false;
    }
    requestAnimationFrame(f) {
        let frame = window.requestAnimationFrame || this.timeoutFrame;
        frame(f);
    }
    unbindListeners() {
        if (this.windowResizeListener) {
            this.windowResizeListener();
            this.windowResizeListener = null;
        }
        if (this.contentScrollListener) {
            this.contentScrollListener();
            this.contentScrollListener = null;
        }
        if (this.mouseEnterListener) {
            this.mouseEnterListener();
            this.mouseEnterListener = null;
        }
        if (this.xBarMouseDownListener) {
            this.xBarMouseDownListener();
            this.xBarMouseDownListener = null;
        }
        if (this.yBarMouseDownListener) {
            this.yBarMouseDownListener();
            this.yBarMouseDownListener = null;
        }
    }
    ngOnDestroy() {
        if (this.initialized) {
            this.unbindListeners();
        }
    }
    /**
     * Refreshes the position and size of the scrollbar.
     * @group Method
     */
    refresh() {
        this.moveBar();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: ScrollPanel, deps: [{ token: PLATFORM_ID }, { token: i0.ElementRef }, { token: i0.NgZone }, { token: i0.ChangeDetectorRef }, { token: DOCUMENT }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.5", type: ScrollPanel, selector: "p-scrollPanel", inputs: { style: "style", styleClass: "styleClass", step: "step" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "containerViewChild", first: true, predicate: ["container"], descendants: true }, { propertyName: "contentViewChild", first: true, predicate: ["content"], descendants: true }, { propertyName: "xBarViewChild", first: true, predicate: ["xBar"], descendants: true }, { propertyName: "yBarViewChild", first: true, predicate: ["yBar"], descendants: true }], ngImport: i0, template: `
        <div #container [ngClass]="'p-scrollpanel p-component'" [ngStyle]="style" [class]="styleClass" [attr.data-pc-name]="'scrollpanel'">
            <div class="p-scrollpanel-wrapper" [attr.data-pc-section]="'wrapper'">
                <div #content class="p-scrollpanel-content" [attr.data-pc-section]="'content'" (mouseenter)="moveBar()" (scroll)="onScroll($event)">
                    <ng-content></ng-content>
                    <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
                </div>
            </div>
            <div
                #xBar
                class="p-scrollpanel-bar p-scrollpanel-bar-x"
                tabindex="0"
                role="scrollbar"
                [attr.aria-orientation]="'horizontal'"
                [attr.aria-valuenow]="lastScrollLeft"
                [attr.data-pc-section]="'barx'"
                (mousedown)="onXBarMouseDown($event)"
                (keydown)="onKeyDown($event)"
                (keyup)="onKeyUp()"
                (focus)="onFocus($event)"
                (blur)="onBlur()"
            ></div>
            <div
                #yBar
                class="p-scrollpanel-bar p-scrollpanel-bar-y"
                tabindex="0"
                role="scrollbar"
                [attr.aria-orientation]="'vertical'"
                [attr.aria-valuenow]="lastScrollTop"
                [attr.data-pc-section]="'bary'"
                (mousedown)="onYBarMouseDown($event)"
                (keydown)="onKeyDown($event)"
                (keyup)="onKeyUp()"
                (focus)="onFocus($event)"
            ></div>
        </div>
    `, isInline: true, styles: ["@layer primeng{.p-scrollpanel-wrapper{overflow:hidden;width:100%;height:100%;position:relative;float:left}.p-scrollpanel-content{height:calc(100% + 18px);width:calc(100% + 18px);padding:0 18px 18px 0;position:relative;overflow:auto;box-sizing:border-box}.p-scrollpanel-bar{position:relative;background:#c1c1c1;border-radius:3px;cursor:pointer;opacity:0;transition:opacity .25s linear}.p-scrollpanel-bar-y{width:9px;top:0}.p-scrollpanel-bar-x{height:9px;bottom:0}.p-scrollpanel-hidden{visibility:hidden}.p-scrollpanel:hover .p-scrollpanel-bar,.p-scrollpanel:active .p-scrollpanel-bar{opacity:1}.p-scrollpanel-grabbed{-webkit-user-select:none;user-select:none}}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: ScrollPanel, decorators: [{
            type: Component,
            args: [{ selector: 'p-scrollPanel', template: `
        <div #container [ngClass]="'p-scrollpanel p-component'" [ngStyle]="style" [class]="styleClass" [attr.data-pc-name]="'scrollpanel'">
            <div class="p-scrollpanel-wrapper" [attr.data-pc-section]="'wrapper'">
                <div #content class="p-scrollpanel-content" [attr.data-pc-section]="'content'" (mouseenter)="moveBar()" (scroll)="onScroll($event)">
                    <ng-content></ng-content>
                    <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
                </div>
            </div>
            <div
                #xBar
                class="p-scrollpanel-bar p-scrollpanel-bar-x"
                tabindex="0"
                role="scrollbar"
                [attr.aria-orientation]="'horizontal'"
                [attr.aria-valuenow]="lastScrollLeft"
                [attr.data-pc-section]="'barx'"
                (mousedown)="onXBarMouseDown($event)"
                (keydown)="onKeyDown($event)"
                (keyup)="onKeyUp()"
                (focus)="onFocus($event)"
                (blur)="onBlur()"
            ></div>
            <div
                #yBar
                class="p-scrollpanel-bar p-scrollpanel-bar-y"
                tabindex="0"
                role="scrollbar"
                [attr.aria-orientation]="'vertical'"
                [attr.aria-valuenow]="lastScrollTop"
                [attr.data-pc-section]="'bary'"
                (mousedown)="onYBarMouseDown($event)"
                (keydown)="onKeyDown($event)"
                (keyup)="onKeyUp()"
                (focus)="onFocus($event)"
            ></div>
        </div>
    `, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: ["@layer primeng{.p-scrollpanel-wrapper{overflow:hidden;width:100%;height:100%;position:relative;float:left}.p-scrollpanel-content{height:calc(100% + 18px);width:calc(100% + 18px);padding:0 18px 18px 0;position:relative;overflow:auto;box-sizing:border-box}.p-scrollpanel-bar{position:relative;background:#c1c1c1;border-radius:3px;cursor:pointer;opacity:0;transition:opacity .25s linear}.p-scrollpanel-bar-y{width:9px;top:0}.p-scrollpanel-bar-x{height:9px;bottom:0}.p-scrollpanel-hidden{visibility:hidden}.p-scrollpanel:hover .p-scrollpanel-bar,.p-scrollpanel:active .p-scrollpanel-bar{opacity:1}.p-scrollpanel-grabbed{-webkit-user-select:none;user-select:none}}\n"] }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i0.ElementRef }, { type: i0.NgZone }, { type: i0.ChangeDetectorRef }, { type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.Renderer2 }], propDecorators: { style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], step: [{
                type: Input
            }], containerViewChild: [{
                type: ViewChild,
                args: ['container']
            }], contentViewChild: [{
                type: ViewChild,
                args: ['content']
            }], xBarViewChild: [{
                type: ViewChild,
                args: ['xBar']
            }], yBarViewChild: [{
                type: ViewChild,
                args: ['yBar']
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
export class ScrollPanelModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: ScrollPanelModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.0.5", ngImport: i0, type: ScrollPanelModule, declarations: [ScrollPanel], imports: [CommonModule], exports: [ScrollPanel] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: ScrollPanelModule, imports: [CommonModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: ScrollPanelModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [ScrollPanel],
                    declarations: [ScrollPanel]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xscGFuZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvc2Nyb2xscGFuZWwvc2Nyb2xscGFuZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM1RSxPQUFPLEVBR0gsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxlQUFlLEVBRWYsTUFBTSxFQUNOLEtBQUssRUFDTCxRQUFRLEVBR1IsV0FBVyxFQUlYLFNBQVMsRUFDVCxpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUM1QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sYUFBYSxDQUFDOzs7QUFFekM7OztHQUdHO0FBK0NILE1BQU0sT0FBTyxXQUFXO0lBbUVxQjtJQUF3QjtJQUF1QjtJQUFxQjtJQUFpRDtJQUE0QjtJQWxFMUw7OztPQUdHO0lBQ00sS0FBSyxDQUE4QztJQUM1RDs7O09BR0c7SUFDTSxVQUFVLENBQXFCO0lBQ3hDOzs7T0FHRztJQUNNLElBQUksR0FBVyxDQUFDLENBQUM7SUFFRixrQkFBa0IsQ0FBeUI7SUFFN0MsZ0JBQWdCLENBQXlCO0lBRTVDLGFBQWEsQ0FBeUI7SUFFdEMsYUFBYSxDQUF5QjtJQUV6QixTQUFTLENBQXVDO0lBRWhGLFlBQVksQ0FBcUI7SUFFakMsWUFBWSxDQUFxQjtJQUVqQyxZQUFZLEdBQVEsQ0FBQyxFQUFnQixFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRTVELFdBQVcsR0FBWSxLQUFLLENBQUM7SUFFN0IsU0FBUyxDQUFxQjtJQUU5QixTQUFTLENBQXFCO0lBRTlCLGFBQWEsR0FBWSxLQUFLLENBQUM7SUFFL0IsYUFBYSxHQUFZLEtBQUssQ0FBQztJ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Q2Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQW9DVCxtQkFDZ0IsdUJBQXVCLENBQUMsTUFBTSxpQkFDaEMsaUJBQWlCLENBQUMsSUFBSSxRQUUvQjt3QkFDRixLQUFLLEVBQUUsV0FBVztxQkFDckI7OzBCQXFFWSxNQUFNOzJCQUFDLFdBQVc7OzBCQUFzRyxNQUFNOzJCQUFDLFFBQVE7aUVBOUQzSSxLQUFLO3NCQUFiLEtBQUs7Z0JBS0csVUFBVTtzQkFBbEIsS0FBSztnQkFLRyxJQUFJO3NCQUFaLEtBQUs7Z0JBRWtCLGtCQUFrQjtzQkFBekMsU0FBUzt1QkFBQyxXQUFXO2dCQUVBLGdCQUFnQjtzQkFBckMsU0FBUzt1QkFBQyxTQUFTO2dCQUVELGFBQWE7c0JBQS9CLFNBQVM7dUJBQUMsTUFBTTtnQkFFRSxhQUFhO3NCQUEvQixTQUFTO3VCQUFDLE1BQU07Z0JBRWUsU0FBUztzQkFBeEMsZUFBZTt1QkFBQyxhQUFhOztBQXVabEMsTUFBTSxPQUFPLGlCQUFpQjt1R0FBakIsaUJBQWlCO3dHQUFqQixpQkFBaUIsaUJBaGJqQixXQUFXLGFBNGFWLFlBQVksYUE1YWIsV0FBVzt3R0FnYlgsaUJBQWlCLFlBSmhCLFlBQVk7OzJGQUliLGlCQUFpQjtrQkFMN0IsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0JBQ3ZCLE9BQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQztvQkFDdEIsWUFBWSxFQUFFLENBQUMsV0FBVyxDQUFDO2lCQUM5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSwgRE9DVU1FTlQsIGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBDb250ZW50Q2hpbGRyZW4sXG4gICAgRWxlbWVudFJlZixcbiAgICBJbmplY3QsXG4gICAgSW5wdXQsXG4gICAgTmdNb2R1bGUsXG4gICAgTmdab25lLFxuICAgIE9uRGVzdHJveSxcbiAgICBQTEFURk9STV9JRCxcbiAgICBRdWVyeUxpc3QsXG4gICAgUmVuZGVyZXIyLFxuICAgIFRlbXBsYXRlUmVmLFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFByaW1lVGVtcGxhdGUgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBEb21IYW5kbGVyIH0gZnJvbSAncHJpbWVuZy9kb20nO1xuaW1wb3J0IHsgTnVsbGFibGUgfSBmcm9tICdwcmltZW5nL3RzLWhlbHBlcnMnO1xuLyoqXG4gKiBTY3JvbGxQYW5lbCBpcyBhIGNyb3NzIGJyb3dzZXIsIGxpZ2h0d2VpZ2h0IGFuZCB0aGVtYWJsZSBhbHRlcm5hdGl2ZSB0byBuYXRpdmUgYnJvd3NlciBzY3JvbGxiYXIuXG4gKiBAZ3JvdXAgQ29tcG9uZW50c1xuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Atc2Nyb2xsUGFuZWwnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgI2NvbnRhaW5lciBbbmdDbGFzc109XCIncC1zY3JvbGxwYW5lbCBwLWNvbXBvbmVudCdcIiBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCIgW2F0dHIuZGF0YS1wYy1uYW1lXT1cIidzY3JvbGxwYW5lbCdcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLXNjcm9sbHBhbmVsLXdyYXBwZXJcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ3dyYXBwZXInXCI+XG4gICAgICAgICAgICAgICAgPGRpdiAjY29udGVudCBjbGFzcz1cInAtc2Nyb2xscGFuZWwtY29udGVudFwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInY29udGVudCdcIiAobW91c2VlbnRlcik9XCJtb3ZlQmFyKClcIiAoc2Nyb2xsKT1cIm9uU2Nyb2xsKCRldmVudClcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiY29udGVudFRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAjeEJhclxuICAgICAgICAgICAgICAgIGNsYXNzPVwicC1zY3JvbGxwYW5lbC1iYXIgcC1zY3JvbGxwYW5lbC1iYXIteFwiXG4gICAgICAgICAgICAgICAgdGFiaW5kZXg9XCIwXCJcbiAgICAgICAgICAgICAgICByb2xlPVwic2Nyb2xsYmFyXCJcbiAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLW9yaWVudGF0aW9uXT1cIidob3Jpem9udGFsJ1wiXG4gICAgICAgICAgICAgICAgW2F0dHIuYXJpYS12YWx1ZW5vd109XCJsYXN0U2Nyb2xsTGVmdFwiXG4gICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidiYXJ4J1wiXG4gICAgICAgICAgICAgICAgKG1vdXNlZG93bik9XCJvblhCYXJNb3VzZURvd24oJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgKGtleWRvd24pPVwib25LZXlEb3duKCRldmVudClcIlxuICAgICAgICAgICAgICAgIChrZXl1cCk9XCJvbktleVVwKClcIlxuICAgICAgICAgICAgICAgIChmb2N1cyk9XCJvbkZvY3VzKCRldmVudClcIlxuICAgICAgICAgICAgICAgIChibHVyKT1cIm9uQmx1cigpXCJcbiAgICAgICAgICAgID48L2Rpdj5cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAjeUJhclxuICAgICAgICAgICAgICAgIGNsYXNzPVwicC1zY3JvbGxwYW5lbC1iYXIgcC1zY3JvbGxwYW5lbC1iYXIteVwiXG4gICAgICAgICAgICAgICAgdGFiaW5kZXg9XCIwXCJcbiAgICAgICAgICAgICAgICByb2xlPVwic2Nyb2xsYmFyXCJcbiAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLW9yaWVudGF0aW9uXT1cIid2ZXJ0aWNhbCdcIlxuICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtdmFsdWVub3ddPVwibGFzdFNjcm9sbFRvcFwiXG4gICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidiYXJ5J1wiXG4gICAgICAgICAgICAgICAgKG1vdXNlZG93bik9XCJvbllCYXJNb3VzZURvd24oJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgKGtleWRvd24pPVwib25LZXlEb3duKCRldmVudClcIlxuICAgICAgICAgICAgICAgIChrZXl1cCk9XCJvbktleVVwKClcIlxuICAgICAgICAgICAgICAgIChmb2N1cyk9XCJvbkZvY3VzKCRldmVudClcIlxuICAgICAgICAgICAgPjwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgc3R5bGVVcmxzOiBbJy4vc2Nyb2xscGFuZWwuY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ3AtZWxlbWVudCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIFNjcm9sbFBhbmVsIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcbiAgICAvKipcbiAgICAgKiBJbmxpbmUgc3R5bGUgb2YgdGhlIGNvbXBvbmVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzdHlsZTogeyBba2xhc3M6IHN0cmluZ106IGFueSB9IHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBTdHlsZSBjbGFzcyBvZiB0aGUgY29tcG9uZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBTdGVwIGZhY3RvciB0byBzY3JvbGwgdGhlIGNvbnRlbnQgd2hpbGUgcHJlc3NpbmcgdGhlIGFycm93IGtleXMuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc3RlcDogbnVtYmVyID0gNTtcblxuICAgIEBWaWV3Q2hpbGQoJ2NvbnRhaW5lcicpIGNvbnRhaW5lclZpZXdDaGlsZDogRWxlbWVudFJlZiB8IHVuZGVmaW5lZDtcblxuICAgIEBWaWV3Q2hpbGQoJ2NvbnRlbnQnKSBjb250ZW50Vmlld0NoaWxkOiBFbGVtZW50UmVmIHwgdW5kZWZpbmVkO1xuXG4gICAgQFZpZXdDaGlsZCgneEJhcicpIHhCYXJWaWV3Q2hpbGQ6IEVsZW1lbnRSZWYgfCB1bmRlZmluZWQ7XG5cbiAgICBAVmlld0NoaWxkKCd5QmFyJykgeUJhclZpZXdDaGlsZDogRWxlbWVudFJlZiB8IHVuZGVmaW5lZDtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oUHJpbWVUZW1wbGF0ZSkgdGVtcGxhdGVzOiBRdWVyeUxpc3Q8UHJpbWVUZW1wbGF0ZT4gfCB1bmRlZmluZWQ7XG5cbiAgICBzY3JvbGxZUmF0aW86IG51bWJlciB8IHVuZGVmaW5lZDtcblxuICAgIHNjcm9sbFhSYXRpbzogbnVtYmVyIHwgdW5kZWZpbmVkO1xuXG4gICAgdGltZW91dEZyYW1lOiBhbnkgPSAoZm46IFZvaWRGdW5jdGlvbikgPT4gc2V0VGltZW91dChmbiwgMCk7XG5cbiAgICBpbml0aWFsaXplZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgbGFzdFBhZ2VZOiBudW1iZXIgfCB1bmRlZmluZWQ7XG5cbiAgICBsYXN0UGFnZVg6IG51bWJlciB8IHVuZGVmaW5lZDtcblxuICAgIGlzWEJhckNsaWNrZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGlzWUJhckNsaWNrZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNvbnRlbnRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcblxuICAgIGxhc3RTY3JvbGxMZWZ0OiBudW1iZXIgPSAwO1xuXG4gICAgbGFzdFNjcm9sbFRvcDogbnVtYmVyID0gMDtcblxuICAgIG9yaWVudGF0aW9uOiBzdHJpbmcgPSAndmVydGljYWwnO1xuXG4gICAgdGltZXI6IGFueTtcblxuICAgIHdpbmRvd1Jlc2l6ZUxpc3RlbmVyOiBWb2lkRnVuY3Rpb24gfCBudWxsIHwgdW5kZWZpbmVkO1xuXG4gICAgY29udGVudFNjcm9sbExpc3RlbmVyOiBWb2lkRnVuY3Rpb24gfCBudWxsIHwgdW5kZWZpbmVkO1xuXG4gICAgbW91c2VFbnRlckxpc3RlbmVyOiBWb2lkRnVuY3Rpb24gfCBudWxsIHwgdW5kZWZpbmVkO1xuXG4gICAgeEJhck1vdXNlRG93bkxpc3RlbmVyOiBWb2lkRnVuY3Rpb24gfCBudWxsIHwgdW5kZWZpbmVkO1xuXG4gICAgeUJhck1vdXNlRG93bkxpc3RlbmVyOiBWb2lkRnVuY3Rpb24gfCBudWxsIHwgdW5kZWZpbmVkO1xuXG4gICAgZG9jdW1lbnRNb3VzZU1vdmVMaXN0ZW5lcjogTnVsbGFibGU8KGV2ZW50PzogYW55KSA9PiB2b2lkPjtcblxuICAgIGRvY3VtZW50TW91c2VVcExpc3RlbmVyOiBOdWxsYWJsZTwoZXZlbnQ/OiBhbnkpID0+IHZvaWQ+O1xuXG4gICAgY29uc3RydWN0b3IoQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBhbnksIHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHVibGljIHpvbmU6IE5nWm9uZSwgcHVibGljIGNkOiBDaGFuZ2VEZXRlY3RvclJlZiwgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogRG9jdW1lbnQsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikge31cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlQmFyKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlQmFyID0gdGhpcy5tb3ZlQmFyLmJpbmQodGhpcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5vblhCYXJNb3VzZURvd24gPSB0aGlzLm9uWEJhck1vdXNlRG93bi5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgICAgIHRoaXMub25ZQmFyTW91c2VEb3duID0gdGhpcy5vbllCYXJNb3VzZURvd24uYmluZCh0aGlzKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uRG9jdW1lbnRNb3VzZU1vdmUgPSB0aGlzLm9uRG9jdW1lbnRNb3VzZU1vdmUuYmluZCh0aGlzKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uRG9jdW1lbnRNb3VzZVVwID0gdGhpcy5vbkRvY3VtZW50TW91c2VVcC5iaW5kKHRoaXMpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy53aW5kb3dSZXNpemVMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHdpbmRvdywgJ3Jlc2l6ZScsIHRoaXMubW92ZUJhcik7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50U2Nyb2xsTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3RlbigodGhpcy5jb250ZW50Vmlld0NoaWxkIGFzIEVsZW1lbnRSZWYpLm5hdGl2ZUVsZW1lbnQsICdzY3JvbGwnLCB0aGlzLm1vdmVCYXIpO1xuICAgICAgICAgICAgICAgIHRoaXMubW91c2VFbnRlckxpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oKHRoaXMuY29udGVudFZpZXdDaGlsZCBhcyBFbGVtZW50UmVmKS5uYXRpdmVFbGVtZW50LCAnbW91c2VlbnRlcicsIHRoaXMubW92ZUJhcik7XG4gICAgICAgICAgICAgICAgdGhpcy54QmFyTW91c2VEb3duTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3RlbigodGhpcy54QmFyVmlld0NoaWxkIGFzIEVsZW1lbnRSZWYpLm5hdGl2ZUVsZW1lbnQsICdtb3VzZWRvd24nLCB0aGlzLm9uWEJhck1vdXNlRG93bik7XG4gICAgICAgICAgICAgICAgdGhpcy55QmFyTW91c2VEb3duTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3RlbigodGhpcy55QmFyVmlld0NoaWxkIGFzIEVsZW1lbnRSZWYpLm5hdGl2ZUVsZW1lbnQsICdtb3VzZWRvd24nLCB0aGlzLm9uWUJhck1vdXNlRG93bik7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVDb250YWluZXJIZWlnaHQoKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgICh0aGlzLnRlbXBsYXRlcyBhcyBRdWVyeUxpc3Q8UHJpbWVUZW1wbGF0ZT4pLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoaXRlbS5nZXRUeXBlKCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdjb250ZW50JzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudFRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNhbGN1bGF0ZUNvbnRhaW5lckhlaWdodCgpIHtcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9ICh0aGlzLmNvbnRhaW5lclZpZXdDaGlsZCBhcyBFbGVtZW50UmVmKS5uYXRpdmVFbGVtZW50O1xuICAgICAgICBsZXQgY29udGVudCA9ICh0aGlzLmNvbnRlbnRWaWV3Q2hpbGQgYXMgRWxlbWVudFJlZikubmF0aXZlRWxlbWVudDtcbiAgICAgICAgbGV0IHhCYXIgPSAodGhpcy54QmFyVmlld0NoaWxkIGFzIEVsZW1lbnRSZWYpLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IHdpbmRvdyA9IHRoaXMuZG9jdW1lbnQuZGVmYXVsdFZpZXcgYXMgV2luZG93O1xuXG4gICAgICAgIGxldCBjb250YWluZXJTdHlsZXM6IHsgW2tsYXNzOiBzdHJpbmddOiBhbnkgfSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGNvbnRhaW5lciksXG4gICAgICAgICAgICB4QmFyU3R5bGVzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoeEJhciksXG4gICAgICAgICAgICBwdXJlQ29udGFpbmVySGVpZ2h0ID0gRG9tSGFuZGxlci5nZXRIZWlnaHQoY29udGFpbmVyKSAtIHBhcnNlSW50KHhCYXJTdHlsZXNbJ2hlaWdodCddLCAxMCk7XG5cbiAgICAgICAgaWYgKGNvbnRhaW5lclN0eWxlc1snbWF4LWhlaWdodCddICE9ICdub25lJyAmJiBwdXJlQ29udGFpbmVySGVpZ2h0ID09IDApIHtcbiAgICAgICAgICAgIGlmIChjb250ZW50Lm9mZnNldEhlaWdodCArIHBhcnNlSW50KHhCYXJTdHlsZXNbJ2hlaWdodCddLCAxMCkgPiBwYXJzZUludChjb250YWluZXJTdHlsZXNbJ21heC1oZWlnaHQnXSwgMTApKSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLnN0eWxlLmhlaWdodCA9IGNvbnRhaW5lclN0eWxlc1snbWF4LWhlaWdodCddO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gY29udGVudC5vZmZzZXRIZWlnaHQgKyBwYXJzZUZsb2F0KGNvbnRhaW5lclN0eWxlcy5wYWRkaW5nVG9wKSArIHBhcnNlRmxvYXQoY29udGFpbmVyU3R5bGVzLnBhZGRpbmdCb3R0b20pICsgcGFyc2VGbG9hdChjb250YWluZXJTdHlsZXMuYm9yZGVyVG9wV2lkdGgpICsgcGFyc2VGbG9hdChjb250YWluZXJTdHlsZXMuYm9yZGVyQm90dG9tV2lkdGgpICsgJ3B4JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1vdmVCYXIoKSB7XG4gICAgICAgIGxldCBjb250YWluZXIgPSAodGhpcy5jb250YWluZXJWaWV3Q2hpbGQgYXMgRWxlbWVudFJlZikubmF0aXZlRWxlbWVudDtcbiAgICAgICAgbGV0IGNvbnRlbnQgPSAodGhpcy5jb250ZW50Vmlld0NoaWxkIGFzIEVsZW1lbnRSZWYpLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICAgICAgLyogaG9yaXpvbnRhbCBzY3JvbGwgKi9cbiAgICAgICAgbGV0IHhCYXIgPSAodGhpcy54QmFyVmlld0NoaWxkIGFzIEVsZW1lbnRSZWYpLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIGxldCB0b3RhbFdpZHRoID0gY29udGVudC5zY3JvbGxXaWR0aDtcbiAgICAgICAgbGV0IG93bldpZHRoID0gY29udGVudC5jbGllbnRXaWR0aDtcbiAgICAgICAgbGV0IGJvdHRvbSA9IChjb250YWluZXIuY2xpZW50SGVpZ2h0IC0geEJhci5jbGllbnRIZWlnaHQpICogLTE7XG5cbiAgICAgICAgdGhpcy5zY3JvbGxYUmF0aW8gPSBvd25XaWR0aCAvIHRvdGFsV2lkdGg7XG5cbiAgICAgICAgLyogdmVydGljYWwgc2Nyb2xsICovXG4gICAgICAgIGxldCB5QmFyID0gKHRoaXMueUJhclZpZXdDaGlsZCBhcyBFbGVtZW50UmVmKS5uYXRpdmVFbGVtZW50O1xuICAgICAgICBsZXQgdG90YWxIZWlnaHQgPSBjb250ZW50LnNjcm9sbEhlaWdodDtcbiAgICAgICAgbGV0IG93bkhlaWdodCA9IGNvbnRlbnQuY2xpZW50SGVpZ2h0O1xuICAgICAgICBsZXQgcmlnaHQgPSAoY29udGFpbmVyLmNsaWVudFdpZHRoIC0geUJhci5jbGllbnRXaWR0aCkgKiAtMTtcblxuICAgICAgICB0aGlzLnNjcm9sbFlSYXRpbyA9IG93bkhlaWdodCAvIHRvdGFsSGVpZ2h0O1xuXG4gICAgICAgIHRoaXMucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICAgIGlmICgodGhpcy5zY3JvbGxYUmF0aW8gYXMgbnVtYmVyKSA+PSAxKSB7XG4gICAgICAgICAgICAgICAgeEJhci5zZXRBdHRyaWJ1dGUoJ2RhdGEtcC1zY3JvbGxwYW5lbC1oaWRkZW4nLCAndHJ1ZScpO1xuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3MoeEJhciwgJ3Atc2Nyb2xscGFuZWwtaGlkZGVuJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHhCYXIuc2V0QXR0cmlidXRlKCdkYXRhLXAtc2Nyb2xscGFuZWwtaGlkZGVuJywgJ2ZhbHNlJyk7XG4gICAgICAgICAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyh4QmFyLCAncC1zY3JvbGxwYW5lbC1oaWRkZW4nKTtcbiAgICAgICAgICAgICAgICBjb25zdCB4QmFyV2lkdGggPSBNYXRoLm1heCgodGhpcy5zY3JvbGxYUmF0aW8gYXMgbnVtYmVyKSAqIDEwMCwgMTApO1xuICAgICAgICAgICAgICAgIGNvbnN0IHhCYXJMZWZ0ID0gKGNvbnRlbnQuc2Nyb2xsTGVmdCAqICgxMDAgLSB4QmFyV2lkdGgpKSAvICh0b3RhbFdpZHRoIC0gb3duV2lkdGgpO1xuICAgICAgICAgICAgICAgIHhCYXIuc3R5bGUuY3NzVGV4dCA9ICd3aWR0aDonICsgeEJhcldpZHRoICsgJyU7IGxlZnQ6JyArIHhCYXJMZWZ0ICsgJyU7Ym90dG9tOicgKyBib3R0b20gKyAncHg7JztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCh0aGlzLnNjcm9sbFlSYXRpbyBhcyBudW1iZXIpID49IDEpIHtcbiAgICAgICAgICAgICAgICB5QmFyLnNldEF0dHJpYnV0ZSgnZGF0YS1wLXNjcm9sbHBhbmVsLWhpZGRlbicsICd0cnVlJyk7XG4gICAgICAgICAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyh5QmFyLCAncC1zY3JvbGxwYW5lbC1oaWRkZW4nKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgeUJhci5zZXRBdHRyaWJ1dGUoJ2RhdGEtcC1zY3JvbGxwYW5lbC1oaWRkZW4nLCAnZmFsc2UnKTtcbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLnJlbW92ZUNsYXNzKHlCYXIsICdwLXNjcm9sbHBhbmVsLWhpZGRlbicpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHlCYXJIZWlnaHQgPSBNYXRoLm1heCgodGhpcy5zY3JvbGxZUmF0aW8gYXMgbnVtYmVyKSAqIDEwMCwgMTApO1xuICAgICAgICAgICAgICAgIGNvbnN0IHlCYXJUb3AgPSAoY29udGVudC5zY3JvbGxUb3AgKiAoMTAwIC0geUJhckhlaWdodCkpIC8gKHRvdGFsSGVpZ2h0IC0gb3duSGVpZ2h0KTtcbiAgICAgICAgICAgICAgICB5QmFyLnN0eWxlLmNzc1RleHQgPSAnaGVpZ2h0OicgKyB5QmFySGVpZ2h0ICsgJyU7IHRvcDogY2FsYygnICsgeUJhclRvcCArICclIC0gJyArIHhCYXIuY2xpZW50SGVpZ2h0ICsgJ3B4KTtyaWdodDonICsgcmlnaHQgKyAncHg7JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgb25TY3JvbGwoZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMubGFzdFNjcm9sbExlZnQgIT09IGV2ZW50LnRhcmdldC5zY3JvbGxMZWZ0KSB7XG4gICAgICAgICAgICB0aGlzLmxhc3RTY3JvbGxMZWZ0ID0gZXZlbnQudGFyZ2V0LnNjcm9sbExlZnQ7XG4gICAgICAgICAgICB0aGlzLm9yaWVudGF0aW9uID0gJ2hvcml6b250YWwnO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMubGFzdFNjcm9sbFRvcCAhPT0gZXZlbnQudGFyZ2V0LnNjcm9sbFRvcCkge1xuICAgICAgICAgICAgdGhpcy5sYXN0U2Nyb2xsVG9wID0gZXZlbnQudGFyZ2V0LnNjcm9sbFRvcDtcbiAgICAgICAgICAgIHRoaXMub3JpZW50YXRpb24gPSAndmVydGljYWwnO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tb3ZlQmFyKCk7XG4gICAgfVxuXG4gICAgb25LZXlEb3duKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLm9yaWVudGF0aW9uID09PSAndmVydGljYWwnKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKGV2ZW50LmNvZGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdBcnJvd0Rvd24nOiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VGltZXIoJ3Njcm9sbFRvcCcsIHRoaXMuc3RlcCk7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNhc2UgJ0Fycm93VXAnOiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VGltZXIoJ3Njcm9sbFRvcCcsIHRoaXMuc3RlcCAqIC0xKTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY2FzZSAnQXJyb3dMZWZ0JzpcblxuICAgICAgICAgICAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOiB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIC8vbm8gb3BcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5vcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKGV2ZW50LmNvZGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdBcnJvd1JpZ2h0Jzoge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFRpbWVyKCdzY3JvbGxMZWZ0JywgdGhpcy5zdGVwKTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY2FzZSAnQXJyb3dMZWZ0Jzoge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFRpbWVyKCdzY3JvbGxMZWZ0JywgdGhpcy5zdGVwICogLTEpO1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjYXNlICdBcnJvd0Rvd24nOlxuXG4gICAgICAgICAgICAgICAgY2FzZSAnQXJyb3dVcCc6IHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgLy9ubyBvcFxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uS2V5VXAoKSB7XG4gICAgICAgIHRoaXMuY2xlYXJUaW1lcigpO1xuICAgIH1cblxuICAgIHJlcGVhdChiYXIsIHN0ZXApIHtcbiAgICAgICAgdGhpcy5jb250ZW50Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnRbYmFyXSArPSBzdGVwO1xuICAgICAgICB0aGlzLm1vdmVCYXIoKTtcbiAgICB9XG5cbiAgICBzZXRUaW1lcihiYXIsIHN0ZXApIHtcbiAgICAgICAgdGhpcy5jbGVhclRpbWVyKCk7XG4gICAgICAgIHRoaXMudGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVwZWF0KGJhciwgc3RlcCk7XG4gICAgICAgIH0sIDQwKTtcbiAgICB9XG5cbiAgICBjbGVhclRpbWVyKCkge1xuICAgICAgICBpZiAodGhpcy50aW1lcikge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmluZERvY3VtZW50TW91c2VMaXN0ZW5lcnMoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5kb2N1bWVudE1vdXNlTW92ZUxpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50TW91c2VNb3ZlTGlzdGVuZXIgPSAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMub25Eb2N1bWVudE1vdXNlTW92ZShlKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuZG9jdW1lbnRNb3VzZU1vdmVMaXN0ZW5lcik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuZG9jdW1lbnRNb3VzZVVwTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRNb3VzZVVwTGlzdGVuZXIgPSAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMub25Eb2N1bWVudE1vdXNlVXAoZSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5kb2N1bWVudE1vdXNlVXBMaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1bmJpbmREb2N1bWVudE1vdXNlTGlzdGVuZXJzKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5kb2N1bWVudE1vdXNlTW92ZUxpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuZG9jdW1lbnRNb3VzZU1vdmVMaXN0ZW5lcik7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50TW91c2VNb3ZlTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZG9jdW1lbnRNb3VzZVVwTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmRvY3VtZW50TW91c2VVcExpc3RlbmVyKTtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRNb3VzZVVwTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25ZQmFyTW91c2VEb3duKGU6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgdGhpcy5pc1lCYXJDbGlja2VkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy55QmFyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgdGhpcy5sYXN0UGFnZVkgPSBlLnBhZ2VZO1xuXG4gICAgICAgIHRoaXMueUJhclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS1wLXNjcm9sbHBhbmVsLWdyYWJiZWQnLCAndHJ1ZScpO1xuICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKCh0aGlzLnlCYXJWaWV3Q2hpbGQgYXMgRWxlbWVudFJlZikubmF0aXZlRWxlbWVudCwgJ3Atc2Nyb2xscGFuZWwtZ3JhYmJlZCcpO1xuXG4gICAgICAgIHRoaXMuZG9jdW1lbnQuYm9keS5zZXRBdHRyaWJ1dGUoJ2RhdGEtcC1zY3JvbGxwYW5lbC1ncmFiYmVkJywgJ3RydWUnKTtcbiAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyh0aGlzLmRvY3VtZW50LmJvZHksICdwLXNjcm9sbHBhbmVsLWdyYWJiZWQnKTtcbiAgICAgICAgdGhpcy5iaW5kRG9jdW1lbnRNb3VzZUxpc3RlbmVycygpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgb25YQmFyTW91c2VEb3duKGU6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgdGhpcy5pc1hCYXJDbGlja2VkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy54QmFyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgdGhpcy5sYXN0UGFnZVggPSBlLnBhZ2VYO1xuXG4gICAgICAgIHRoaXMueEJhclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS1wLXNjcm9sbHBhbmVsLWdyYWJiZWQnLCAnZmFsc2UnKTtcbiAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcygodGhpcy54QmFyVmlld0NoaWxkIGFzIEVsZW1lbnRSZWYpLm5hdGl2ZUVsZW1lbnQsICdwLXNjcm9sbHBhbmVsLWdyYWJiZWQnKTtcblxuICAgICAgICB0aGlzLmRvY3VtZW50LmJvZHkuc2V0QXR0cmlidXRlKCdkYXRhLXAtc2Nyb2xscGFuZWwtZ3JhYmJlZCcsICdmYWxzZScpO1xuICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKHRoaXMuZG9jdW1lbnQuYm9keSwgJ3Atc2Nyb2xscGFuZWwtZ3JhYmJlZCcpO1xuXG4gICAgICAgIHRoaXMuYmluZERvY3VtZW50TW91c2VMaXN0ZW5lcnMoKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIG9uRG9jdW1lbnRNb3VzZU1vdmUoZTogTW91c2VFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5pc1hCYXJDbGlja2VkKSB7XG4gICAgICAgICAgICB0aGlzLm9uTW91c2VNb3ZlRm9yWEJhcihlKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzWUJhckNsaWNrZWQpIHtcbiAgICAgICAgICAgIHRoaXMub25Nb3VzZU1vdmVGb3JZQmFyKGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5vbk1vdXNlTW92ZUZvclhCYXIoZSk7XG4gICAgICAgICAgICB0aGlzLm9uTW91c2VNb3ZlRm9yWUJhcihlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uTW91c2VNb3ZlRm9yWEJhcihlOiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIGxldCBkZWx0YVggPSBlLnBhZ2VYIC0gKHRoaXMubGFzdFBhZ2VYIGFzIG51bWJlcik7XG4gICAgICAgIHRoaXMubGFzdFBhZ2VYID0gZS5wYWdlWDtcblxuICAgICAgICB0aGlzLnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgICAgICAodGhpcy5jb250ZW50Vmlld0NoaWxkIGFzIEVsZW1lbnRSZWYpLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsTGVmdCArPSBkZWx0YVggLyAodGhpcy5zY3JvbGxYUmF0aW8gYXMgbnVtYmVyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25Nb3VzZU1vdmVGb3JZQmFyKGU6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgbGV0IGRlbHRhWSA9IGUucGFnZVkgLSAodGhpcy5sYXN0UGFnZVkgYXMgbnVtYmVyKTtcbiAgICAgICAgdGhpcy5sYXN0UGFnZVkgPSBlLnBhZ2VZO1xuXG4gICAgICAgIHRoaXMucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICAgICh0aGlzLmNvbnRlbnRWaWV3Q2hpbGQgYXMgRWxlbWVudFJlZikubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AgKz0gZGVsdGFZIC8gKHRoaXMuc2Nyb2xsWVJhdGlvIGFzIG51bWJlcik7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTY3JvbGxzIHRoZSB0b3AgbG9jYXRpb24gdG8gdGhlIGdpdmVuIHZhbHVlLlxuICAgICAqIEBwYXJhbSBzY3JvbGxUb3BcbiAgICAgKiBAZ3JvdXAgTWV0aG9kXG4gICAgICovXG4gICAgc2Nyb2xsVG9wKHNjcm9sbFRvcDogbnVtYmVyKSB7XG4gICAgICAgIGxldCBzY3JvbGxhYmxlSGVpZ2h0ID0gKHRoaXMuY29udGVudFZpZXdDaGlsZCBhcyBFbGVtZW50UmVmKS5uYXRpdmVFbGVtZW50LnNjcm9sbEhlaWdodCAtICh0aGlzLmNvbnRlbnRWaWV3Q2hpbGQgYXMgRWxlbWVudFJlZikubmF0aXZlRWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gICAgICAgIHNjcm9sbFRvcCA9IHNjcm9sbFRvcCA+IHNjcm9sbGFibGVIZWlnaHQgPyBzY3JvbGxhYmxlSGVpZ2h0IDogc2Nyb2xsVG9wID4gMCA/IHNjcm9sbFRvcCA6IDA7XG4gICAgICAgICh0aGlzLmNvbnRlbnRWaWV3Q2hpbGQgYXMgRWxlbWVudFJlZikubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AgPSBzY3JvbGxUb3A7XG4gICAgfVxuXG4gICAgb25Gb2N1cyhldmVudCkge1xuICAgICAgICBpZiAodGhpcy54QmFyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuaXNTYW1lTm9kZShldmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICB0aGlzLm9yaWVudGF0aW9uID0gJ2hvcml6b250YWwnO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMueUJhclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LmlzU2FtZU5vZGUoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgdGhpcy5vcmllbnRhdGlvbiA9ICd2ZXJ0aWNhbCc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkJsdXIoKSB7XG4gICAgICAgIGlmICh0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgICAgIHRoaXMub3JpZW50YXRpb24gPSAndmVydGljYWwnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Eb2N1bWVudE1vdXNlVXAoZTogRXZlbnQpIHtcbiAgICAgICAgdGhpcy55QmFyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLXAtc2Nyb2xscGFuZWwtZ3JhYmJlZCcsICdmYWxzZScpO1xuICAgICAgICBEb21IYW5kbGVyLnJlbW92ZUNsYXNzKCh0aGlzLnlCYXJWaWV3Q2hpbGQgYXMgRWxlbWVudFJlZikubmF0aXZlRWxlbWVudCwgJ3Atc2Nyb2xscGFuZWwtZ3JhYmJlZCcpO1xuICAgICAgICB0aGlzLnhCYXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtcC1zY3JvbGxwYW5lbC1ncmFiYmVkJywgJ2ZhbHNlJyk7XG4gICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3MoKHRoaXMueEJhclZpZXdDaGlsZCBhcyBFbGVtZW50UmVmKS5uYXRpdmVFbGVtZW50LCAncC1zY3JvbGxwYW5lbC1ncmFiYmVkJyk7XG4gICAgICAgIHRoaXMuZG9jdW1lbnQuYm9keS5zZXRBdHRyaWJ1dGUoJ2RhdGEtcC1zY3JvbGxwYW5lbC1ncmFiYmVkJywgJ2ZhbHNlJyk7XG4gICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3ModGhpcy5kb2N1bWVudC5ib2R5LCAncC1zY3JvbGxwYW5lbC1ncmFiYmVkJyk7XG5cbiAgICAgICAgdGhpcy51bmJpbmREb2N1bWVudE1vdXNlTGlzdGVuZXJzKCk7XG4gICAgICAgIHRoaXMuaXNYQmFyQ2xpY2tlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzWUJhckNsaWNrZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZjogVm9pZEZ1bmN0aW9uKSB7XG4gICAgICAgIGxldCBmcmFtZSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgdGhpcy50aW1lb3V0RnJhbWU7XG4gICAgICAgIGZyYW1lKGYpO1xuICAgIH1cblxuICAgIHVuYmluZExpc3RlbmVycygpIHtcbiAgICAgICAgaWYgKHRoaXMud2luZG93UmVzaXplTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMud2luZG93UmVzaXplTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIHRoaXMud2luZG93UmVzaXplTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY29udGVudFNjcm9sbExpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRTY3JvbGxMaXN0ZW5lcigpO1xuICAgICAgICAgICAgdGhpcy5jb250ZW50U2Nyb2xsTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubW91c2VFbnRlckxpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLm1vdXNlRW50ZXJMaXN0ZW5lcigpO1xuICAgICAgICAgICAgdGhpcy5tb3VzZUVudGVyTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMueEJhck1vdXNlRG93bkxpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLnhCYXJNb3VzZURvd25MaXN0ZW5lcigpO1xuICAgICAgICAgICAgdGhpcy54QmFyTW91c2VEb3duTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMueUJhck1vdXNlRG93bkxpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLnlCYXJNb3VzZURvd25MaXN0ZW5lcigpO1xuICAgICAgICAgICAgdGhpcy55QmFyTW91c2VEb3duTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLmluaXRpYWxpemVkKSB7XG4gICAgICAgICAgICB0aGlzLnVuYmluZExpc3RlbmVycygpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlZnJlc2hlcyB0aGUgcG9zaXRpb24gYW5kIHNpemUgb2YgdGhlIHNjcm9sbGJhci5cbiAgICAgKiBAZ3JvdXAgTWV0aG9kXG4gICAgICovXG4gICAgcmVmcmVzaCgpIHtcbiAgICAgICAgdGhpcy5tb3ZlQmFyKCk7XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtTY3JvbGxQYW5lbF0sXG4gICAgZGVjbGFyYXRpb25zOiBbU2Nyb2xsUGFuZWxdXG59KVxuZXhwb3J0IGNsYXNzIFNjcm9sbFBhbmVsTW9kdWxlIHt9XG4iXX0=