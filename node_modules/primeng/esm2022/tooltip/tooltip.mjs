import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Directive, HostListener, Inject, Input, NgModule, PLATFORM_ID, TemplateRef } from '@angular/core';
import { ConnectedOverlayScrollHandler, DomHandler } from 'primeng/dom';
import { UniqueComponentId, ZIndexUtils } from 'primeng/utils';
import * as i0 from "@angular/core";
import * as i1 from "primeng/api";
/**
 * Tooltip directive provides advisory information for a component.
 * @group Components
 */
export class Tooltip {
    platformId;
    el;
    zone;
    config;
    renderer;
    viewContainer;
    /**
     * Position of the tooltip.
     * @group Props
     */
    tooltipPosition;
    /**
     * Event to show the tooltip.
     * @group Props
     */
    tooltipEvent = 'hover';
    /**
     *  Target element to attach the overlay, valid values are "body", "target" or a local ng-F variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
     * @group Props
     */
    appendTo;
    /**
     * Type of CSS position.
     * @group Props
     */
    positionStyle;
    /**
     * Style class of the tooltip.
     * @group Props
     */
    tooltipStyleClass;
    /**
     * Whether the z-index should be managed automatically to always go on top or have a fixed value.
     * @group Props
     */
    tooltipZIndex;
    /**
     * By default the tooltip contents are rendered as text. Set to false to support html tags in the content.
     * @group Props
     */
    escape = true;
    /**
     * Delay to show the tooltip in milliseconds.
     * @group Props
     */
    showDelay;
    /**
     * Delay to hide the tooltip in milliseconds.
     * @group Props
     */
    hideDelay;
    /**
     * Time to wait in milliseconds to hide the tooltip even it is active.
     * @group Props
     */
    life;
    /**
     * Specifies the additional vertical offset of the tooltip from its default position.
     * @group Props
     */
    positionTop;
    /**
     * Specifies the additional horizontal offset of the tooltip from its default position.
     * @group Props
     */
    positionLeft;
    /**
     * Whether to hide tooltip when hovering over tooltip content.
     * @group Props
     */
    autoHide = true;
    /**
     * Automatically adjusts the element position when there is not enough space on the selected position.
     * @group Props
     */
    fitContent = true;
    /**
     * Whether to hide tooltip on escape key press.
     * @group Props
     */
    hideOnEscape = true;
    /**
     * Content of the tooltip.
     * @group Props
     */
    content;
    /**
     * When present, it specifies that the component should be disabled.
     * @defaultValue false
     * @group Props
     */
    get disabled() {
        return this._disabled;
    }
    set disabled(val) {
        this._disabled = val;
        this.deactivate();
    }
    /**
     * Specifies the tooltip configuration options for the component.
     * @group Props
     */
    tooltipOptions;
    _tooltipOptions = {
        tooltipLabel: null,
        tooltipPosition: 'right',
        tooltipEvent: 'hover',
        appendTo: 'body',
        positionStyle: null,
        tooltipStyleClass: null,
        tooltipZIndex: 'auto',
        escape: true,
        disabled: null,
        showDelay: null,
        hideDelay: null,
        positionTop: null,
        positionLeft: null,
        life: null,
        autoHide: true,
        hideOnEscape: true,
        id: UniqueComponentId() + '_tooltip'
    };
    _disabled;
    container;
    styleClass;
    tooltipText;
    showTimeout;
    hideTimeout;
    active;
    mouseEnterListener;
    mouseLeaveListener;
    containerMouseleaveListener;
    clickListener;
    focusListener;
    blurListener;
    scrollHandler;
    resizeListener;
    constructor(platformId, el, zone, config, renderer, viewContainer) {
        this.platformId = platformId;
        this.el = el;
        this.zone = zone;
        this.config = config;
        this.renderer = renderer;
        this.viewContainer = viewContainer;
    }
    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.zone.runOutsideAngular(() => {
                if (this.getOption('tooltipEvent') === 'hover') {
                    this.mouseEnterListener = this.onMouseEnter.bind(this);
                    this.mouseLeaveListener = this.onMouseLeave.bind(this);
                    this.clickListener = this.onInputClick.bind(this);
                    this.el.nativeElement.addEventListener('mouseenter', this.mouseEnterListener);
                    this.el.nativeElement.addEventListener('click', this.clickListener);
                    this.el.nativeElement.addEventListener('mouseleave', this.mouseLeaveListener);
                }
                else if (this.getOption('tooltipEvent') === 'focus') {
                    this.focusListener = this.onFocus.bind(this);
                    this.blurListener = this.onBlur.bind(this);
                    let target = this.getTarget(this.el.nativeElement);
                    target.addEventListener('focus', this.focusListener);
                    target.addEventListener('blur', this.blurListener);
                }
            });
        }
    }
    ngOnChanges(simpleChange) {
        if (simpleChange.tooltipPosition) {
            this.setOption({ tooltipPosition: simpleChange.tooltipPosition.currentValue });
        }
        if (simpleChange.tooltipEvent) {
            this.setOption({ tooltipEvent: simpleChange.tooltipEvent.currentValue });
        }
        if (simpleChange.appendTo) {
            this.setOption({ appendTo: simpleChange.appendTo.currentValue });
        }
        if (simpleChange.positionStyle) {
            this.setOption({ positionStyle: simpleChange.positionStyle.currentValue });
        }
        if (simpleChange.tooltipStyleClass) {
            this.setOption({ tooltipStyleClass: simpleChange.tooltipStyleClass.currentValue });
        }
        if (simpleChange.tooltipZIndex) {
            this.setOption({ tooltipZIndex: simpleChange.tooltipZIndex.currentValue });
        }
        if (simpleChange.escape) {
            this.setOption({ escape: simpleChange.escape.currentValue });
        }
        if (simpleChange.showDelay) {
            this.setOption({ showDelay: simpleChange.showDelay.currentValue });
        }
        if (simpleChange.hideDelay) {
            this.setOption({ hideDelay: simpleChange.hideDelay.currentValue });
        }
        if (simpleChange.life) {
            this.setOption({ life: simpleChange.life.currentValue });
        }
        if (simpleChange.positionTop) {
            this.setOption({ positionTop: simpleChange.positionTop.currentValue });
        }
        if (simpleChange.positionLeft) {
            this.setOption({ positionLeft: simpleChange.positionLeft.currentValue });
        }
        if (simpleChange.disabled) {
            this.setOption({ disabled: simpleChange.disabled.currentValue });
        }
        if (simpleChange.content) {
            this.setOption({ tooltipLabel: simpleChange.content.currentValue });
            if (this.active) {
                if (simpleChange.content.currentValue) {
                    if (this.container && this.container.offsetParent) {
                        this.updateText();
                        this.align();
                    }
                    else {
                        this.show();
                    }
                }
                else {
                    this.hide();
                }
            }
        }
        if (simpleChange.autoHide) {
            this.setOption({ autoHide: simpleChange.autoHide.currentValue });
        }
        if (simpleChange.id) {
            this.setOption({ id: simpleChange.id.currentValue });
        }
        if (simpleChange.tooltipOptions) {
            this._tooltipOptions = { ...this._tooltipOptions, ...simpleChange.tooltipOptions.currentValue };
            this.deactivate();
            if (this.active) {
                if (this.getOption('tooltipLabel')) {
                    if (this.container && this.container.offsetParent) {
                        this.updateText();
                        this.align();
                    }
                    else {
                        this.show();
                    }
                }
                else {
                    this.hide();
                }
            }
        }
    }
    isAutoHide() {
        return this.getOption('autoHide');
    }
    onMouseEnter(e) {
        if (!this.container && !this.showTimeout) {
            this.activate();
        }
    }
    onMouseLeave(e) {
        if (!this.isAutoHide()) {
            const valid = DomHandler.hasClass(e.relatedTarget, 'p-tooltip') || DomHandler.hasClass(e.relatedTarget, 'p-tooltip-text') || DomHandler.hasClass(e.relatedTarget, 'p-tooltip-arrow');
            !valid && this.deactivate();
        }
        else {
            this.deactivate();
        }
    }
    onFocus(e) {
        this.activate();
    }
    onBlur(e) {
        this.deactivate();
    }
    onInputClick(e) {
        this.deactivate();
    }
    onPressEscape() {
        if (this.hideOnEscape) {
            this.deactivate();
        }
    }
    activate() {
        this.active = true;
        this.clearHideTimeout();
        if (this.getOption('showDelay'))
            this.showTimeout = setTimeout(() => {
                this.show();
            }, this.getOption('showDelay'));
        else
            this.show();
        if (this.getOption('life')) {
            let duration = this.getOption('showDelay') ? this.getOption('life') + this.getOption('showDelay') : this.getOption('life');
            this.hideTimeout = setTimeout(() => {
                this.hide();
            }, duration);
        }
    }
    deactivate() {
        this.active = false;
        this.clearShowTimeout();
        if (this.getOption('hideDelay')) {
            this.clearHideTimeout(); //life timeout
            this.hideTimeout = setTimeout(() => {
                this.hide();
            }, this.getOption('hideDelay'));
        }
        else {
            this.hide();
        }
    }
    create() {
        if (this.container) {
            this.clearHideTimeout();
            this.remove();
        }
        this.container = document.createElement('div');
        this.container.setAttribute('id', this.getOption('id'));
        this.container.setAttribute('role', 'tooltip');
        let tooltipArrow = document.createElement('div');
        tooltipArrow.className = 'p-tooltip-arrow';
        this.container.appendChild(tooltipArrow);
        this.tooltipText = document.createElement('div');
        this.tooltipText.className = 'p-tooltip-text';
        this.updateText();
        if (this.getOption('positionStyle')) {
            this.container.style.position = this.getOption('positionStyle');
        }
        this.container.appendChild(this.tooltipText);
        if (this.getOption('appendTo') === 'body')
            document.body.appendChild(this.container);
        else if (this.getOption('appendTo') === 'target')
            DomHandler.appendChild(this.container, this.el.nativeElement);
        else
            DomHandler.appendChild(this.container, this.getOption('appendTo'));
        this.container.style.display = 'inline-block';
        if (this.fitContent) {
            this.container.style.width = 'fit-content';
        }
        if (this.isAutoHide()) {
            this.container.style.pointerEvents = 'none';
        }
        else {
            this.container.style.pointerEvents = 'unset';
            this.bindContainerMouseleaveListener();
        }
    }
    bindContainerMouseleaveListener() {
        if (!this.containerMouseleaveListener) {
            const targetEl = this.container ?? this.container.nativeElement;
            this.containerMouseleaveListener = this.renderer.listen(targetEl, 'mouseleave', (e) => {
                this.deactivate();
            });
        }
    }
    unbindContainerMouseleaveListener() {
        if (this.containerMouseleaveListener) {
            this.bindContainerMouseleaveListener();
            this.containerMouseleaveListener = null;
        }
    }
    show() {
        if (!this.getOption('tooltipLabel') || this.getOption('disabled')) {
            return;
        }
        this.create();
        this.align();
        DomHandler.fadeIn(this.container, 250);
        if (this.getOption('tooltipZIndex') === 'auto')
            ZIndexUtils.set('tooltip', this.container, this.config.zIndex.tooltip);
        else
            this.container.style.zIndex = this.getOption('tooltipZIndex');
        this.bindDocumentResizeListener();
        this.bindScrollListener();
    }
    hide() {
        if (this.getOption('tooltipZIndex') === 'auto') {
            ZIndexUtils.clear(this.container);
        }
        this.remove();
    }
    updateText() {
        const content = this.getOption('tooltipLabel');
        if (content instanceof TemplateRef) {
            const embeddedViewRef = this.viewContainer.createEmbeddedView(content);
            embeddedViewRef.detectChanges();
            embeddedViewRef.rootNodes.forEach((node) => this.tooltipText.appendChild(node));
        }
        else if (this.getOption('escape')) {
            this.tooltipText.innerHTML = '';
            this.tooltipText.appendChild(document.createTextNode(content));
        }
        else {
            this.tooltipText.innerHTML = content;
        }
    }
    align() {
        let position = this.getOption('tooltipPosition');
        switch (position) {
            case 'top':
                this.alignTop();
                if (this.isOutOfBounds()) {
                    this.alignBottom();
                    if (this.isOutOfBounds()) {
                        this.alignRight();
                        if (this.isOutOfBounds()) {
                            this.alignLeft();
                        }
                    }
                }
                break;
            case 'bottom':
                this.alignBottom();
                if (this.isOutOfBounds()) {
                    this.alignTop();
                    if (this.isOutOfBounds()) {
                        this.alignRight();
                        if (this.isOutOfBounds()) {
                            this.alignLeft();
                        }
                    }
                }
                break;
            case 'left':
                this.alignLeft();
                if (this.isOutOfBounds()) {
                    this.alignRight();
                    if (this.isOutOfBounds()) {
                        this.alignTop();
                        if (this.isOutOfBounds()) {
                            this.alignBottom();
                        }
                    }
                }
                break;
            case 'right':
                this.alignRight();
                if (this.isOutOfBounds()) {
                    this.alignLeft();
                    if (this.isOutOfBounds()) {
                        this.alignTop();
                        if (this.isOutOfBounds()) {
                            this.alignBottom();
                        }
                    }
                }
                break;
        }
    }
    getHostOffset() {
        if (this.getOption('appendTo') === 'body' || this.getOption('appendTo') === 'target') {
            let offset = this.el.nativeElement.getBoundingClientRect();
            let targetLeft = offset.left + DomHandler.getWindowScrollLeft();
            let targetTop = offset.top + DomHandler.getWindowScrollTop();
            return { left: targetLeft, top: targetTop };
        }
        else {
            return { left: 0, top: 0 };
        }
    }
    alignRight() {
        this.preAlign('right');
        let hostOffset = this.getHostOffset();
        let left = hostOffset.left + DomHandler.getOuterWidth(this.el.nativeElement);
        let top = hostOffset.top + (DomHandler.getOuterHeight(this.el.nativeElement) - DomHandler.getOuterHeight(this.container)) / 2;
        this.container.style.left = left + this.getOption('positionLeft') + 'px';
        this.container.style.top = top + this.getOption('positionTop') + 'px';
    }
    alignLeft() {
        this.preAlign('left');
        let hostOffset = this.getHostOffset();
        let left = hostOffset.left - DomHandler.getOuterWidth(this.container);
        let top = hostOffset.top + (DomHandler.getOuterHeight(this.el.nativeElement) - DomHandler.getOuterHeight(this.container)) / 2;
        this.container.style.left = left + this.getOption('positionLeft') + 'px';
        this.container.style.top = top + this.getOption('positionTop') + 'px';
    }
    alignTop() {
        this.preAlign('top');
        let hostOffset = this.getHostOffset();
        let left = hostOffset.left + (DomHandler.getOuterWidth(this.el.nativeElement) - DomHandler.getOuterWidth(this.container)) / 2;
        let top = hostOffset.top - DomHandler.getOuterHeight(this.container);
        this.container.style.left = left + this.getOption('positionLeft') + 'px';
        this.container.style.top = top + this.getOption('positionTop') + 'px';
    }
    alignBottom() {
        this.preAlign('bottom');
        let hostOffset = this.getHostOffset();
        let left = hostOffset.left + (DomHandler.getOuterWidth(this.el.nativeElement) - DomHandler.getOuterWidth(this.container)) / 2;
        let top = hostOffset.top + DomHandler.getOuterHeight(this.el.nativeElement);
        this.container.style.left = left + this.getOption('positionLeft') + 'px';
        this.container.style.top = top + this.getOption('positionTop') + 'px';
    }
    setOption(option) {
        this._tooltipOptions = { ...this._tooltipOptions, ...option };
    }
    getOption(option) {
        return this._tooltipOptions[option];
    }
    getTarget(el) {
        return DomHandler.hasClass(el, 'p-inputwrapper') ? DomHandler.findSingle(el, 'input') : el;
    }
    preAlign(position) {
        this.container.style.left = -999 + 'px';
        this.container.style.top = -999 + 'px';
        let defaultClassName = 'p-tooltip p-component p-tooltip-' + position;
        this.container.className = this.getOption('tooltipStyleClass') ? defaultClassName + ' ' + this.getOption('tooltipStyleClass') : defaultClassName;
    }
    isOutOfBounds() {
        let offset = this.container.getBoundingClientRect();
        let targetTop = offset.top;
        let targetLeft = offset.left;
        let width = DomHandler.getOuterWidth(this.container);
        let height = DomHandler.getOuterHeight(this.container);
        let viewport = DomHandler.getViewport();
        return targetLeft + width > viewport.width || targetLeft < 0 || targetTop < 0 || targetTop + height > viewport.height;
    }
    onWindowResize(e) {
        this.hide();
    }
    bindDocumentResizeListener() {
        this.zone.runOutsideAngular(() => {
            this.resizeListener = this.onWindowResize.bind(this);
            window.addEventListener('resize', this.resizeListener);
        });
    }
    unbindDocumentResizeListener() {
        if (this.resizeListener) {
            window.removeEventListener('resize', this.resizeListener);
            this.resizeListener = null;
        }
    }
    bindScrollListener() {
        if (!this.scrollHandler) {
            this.scrollHandler = new ConnectedOverlayScrollHandler(this.el.nativeElement, () => {
                if (this.container) {
                    this.hide();
                }
            });
        }
        this.scrollHandler.bindScrollListener();
    }
    unbindScrollListener() {
        if (this.scrollHandler) {
            this.scrollHandler.unbindScrollListener();
        }
    }
    unbindEvents() {
        if (this.getOption('tooltipEvent') === 'hover') {
            this.el.nativeElement.removeEventListener('mouseenter', this.mouseEnterListener);
            this.el.nativeElement.removeEventListener('mouseleave', this.mouseLeaveListener);
            this.el.nativeElement.removeEventListener('click', this.clickListener);
        }
        else if (this.getOption('tooltipEvent') === 'focus') {
            let target = this.getTarget(this.el.nativeElement);
            target.removeEventListener('focus', this.focusListener);
            target.removeEventListener('blur', this.blurListener);
        }
        this.unbindDocumentResizeListener();
    }
    remove() {
        if (this.container && this.container.parentElement) {
            if (this.getOption('appendTo') === 'body')
                document.body.removeChild(this.container);
            else if (this.getOption('appendTo') === 'target')
                this.el.nativeElement.removeChild(this.container);
            else
                DomHandler.removeChild(this.container, this.getOption('appendTo'));
        }
        this.unbindDocumentResizeListener();
        this.unbindScrollListener();
        this.unbindContainerMouseleaveListener();
        this.clearTimeouts();
        this.container = null;
        this.scrollHandler = null;
    }
    clearShowTimeout() {
        if (this.showTimeout) {
            clearTimeout(this.showTimeout);
            this.showTimeout = null;
        }
    }
    clearHideTimeout() {
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
            this.hideTimeout = null;
        }
    }
    clearTimeouts() {
        this.clearShowTimeout();
        this.clearHideTimeout();
    }
    ngOnDestroy() {
        this.unbindEvents();
        if (this.container) {
            ZIndexUtils.clear(this.container);
        }
        this.remove();
        if (this.scrollHandler) {
            this.scrollHandler.destroy();
            this.scrollHandler = null;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: Tooltip, deps: [{ token: PLATFORM_ID }, { token: i0.ElementRef }, { token: i0.NgZone }, { token: i1.PrimeNGConfig }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.0.5", type: Tooltip, selector: "[pTooltip]", inputs: { tooltipPosition: "tooltipPosition", tooltipEvent: "tooltipEvent", appendTo: "appendTo", positionStyle: "positionStyle", tooltipStyleClass: "tooltipStyleClass", tooltipZIndex: "tooltipZIndex", escape: "escape", showDelay: "showDelay", hideDelay: "hideDelay", life: "life", positionTop: "positionTop", positionLeft: "positionLeft", autoHide: "autoHide", fitContent: "fitContent", hideOnEscape: "hideOnEscape", content: ["pTooltip", "content"], disabled: ["tooltipDisabled", "disabled"], tooltipOptions: "tooltipOptions" }, host: { listeners: { "document:keydown.escape": "onPressEscape($event)" }, classAttribute: "p-element" }, usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: Tooltip, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pTooltip]',
                    host: {
                        class: 'p-element'
                    }
                }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i0.ElementRef }, { type: i0.NgZone }, { type: i1.PrimeNGConfig }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }], propDecorators: { tooltipPosition: [{
                type: Input
            }], tooltipEvent: [{
                type: Input
            }], appendTo: [{
                type: Input
            }], positionStyle: [{
                type: Input
            }], tooltipStyleClass: [{
                type: Input
            }], tooltipZIndex: [{
                type: Input
            }], escape: [{
                type: Input
            }], showDelay: [{
                type: Input
            }], hideDelay: [{
                type: Input
            }], life: [{
                type: Input
            }], positionTop: [{
                type: Input
            }], positionLeft: [{
                type: Input
            }], autoHide: [{
                type: Input
            }], fitContent: [{
                type: Input
            }], hideOnEscape: [{
                type: Input
            }], content: [{
                type: Input,
                args: ['pTooltip']
            }], disabled: [{
                type: Input,
                args: ['tooltipDisabled']
            }], tooltipOptions: [{
                type: Input
            }], onPressEscape: [{
                type: HostListener,
                args: ['document:keydown.escape', ['$event']]
            }] } });
export class TooltipModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: TooltipModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.0.5", ngImport: i0, type: TooltipModule, declarations: [Tooltip], imports: [CommonModule], exports: [Tooltip] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: TooltipModule, imports: [CommonModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: TooltipModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [Tooltip],
                    declarations: [Tooltip]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvY29tcG9uZW50cy90b29sdGlwL3Rvb2x0aXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2xFLE9BQU8sRUFBaUIsU0FBUyxFQUFjLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBcUIsV0FBVyxFQUE0QixXQUFXLEVBQW9CLE1BQU0sZUFBZSxDQUFDO0FBRXJNLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxVQUFVLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFeEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBRS9EOzs7R0FHRztBQU9ILE1BQU0sT0FBTyxPQUFPO0lBcUp5QjtJQUF3QjtJQUF1QjtJQUFxQjtJQUErQjtJQUE2QjtJQXBKeks7OztPQUdHO0lBQ00sZUFBZSxDQUEyRDtJQUNuRjs7O09BR0c7SUFDTSxZQUFZLEdBQXFDLE9BQU8sQ0FBQztJQUNsRTs7O09BR0c7SUFDTSxRQUFRLENBQWdGO0lBQ2pHOzs7T0FHRztJQUNNLGFBQWEsQ0FBcUI7SUFDM0M7OztPQUdHO0lBQ00saUJBQWlCLENBQXFCO0lBQy9DOzs7T0FHRztJQUNNLGFBQWEsQ0FBcUI7SUFDM0M7OztPQUdHO0lBQ00sTUFBTSxHQUFZLElBQUksQ0FBQztJQUNoQzs7O09BR0c7SUFDTSxTQUFTLENBQXFCO0lBQ3ZDOzs7T0FHRztJQUNNLFNBQVMsQ0FBcUI7SUFDdkM7OztPQUdHO0lBQ00sSUFBSSxDQUFxQjtJQUNsQzs7O09BR0c7SUFDTSxXQUFXLENBQXFCO0lBQ3pDOzs7T0FHRztJQUNNLFlBQVksQ0FBcUI7SUFDMUM7OztPQUdHO0lBQ00sUUFBUSxHQUFZLElBQUksQ0FBQztJQUNsQzs7O09BR0c7SUFDTSxVQUFV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QztRQUN0QyxJQUFJLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUM3RSxJQUFJLEdBQUcsR0FBRyxVQUFVLENBQUMsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzlILElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDekUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxHQUFHLElBQUksQ0FBQztJQUMxRSxDQUFDO0lBRUQsU0FBUztRQUNMLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdEIsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3RDLElBQUksSUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdEUsSUFBSSxHQUFHLEdBQUcsVUFBVSxDQUFDLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsR0FBRyxVQUFVLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5SCxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFD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O3NCQUFyQixLQUFLO2dCQUtHLGlCQUFpQjtzQkFBekIsS0FBSztnQkFLRyxhQUFhO3NCQUFyQixLQUFLO2dCQUtHLE1BQU07c0JBQWQsS0FBSztnQkFLRyxTQUFTO3NCQUFqQixLQUFLO2dCQUtHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBS0csSUFBSTtzQkFBWixLQUFLO2dCQUtHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBS0csWUFBWTtzQkFBcEIsS0FBSztnQkFLRyxRQUFRO3NCQUFoQixLQUFLO2dCQUtHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBS0csWUFBWTtzQkFBcEIsS0FBSztnQkFLYSxPQUFPO3NCQUF6QixLQUFLO3VCQUFDLFVBQVU7Z0JBTWEsUUFBUTtzQkFBckMsS0FBSzt1QkFBQyxpQkFBaUI7Z0JBV2YsY0FBYztzQkFBdEIsS0FBSztnQkE2TU4sYUFBYTtzQkFEWixZQUFZO3VCQUFDLHlCQUF5QixFQUFFLENBQUMsUUFBUSxDQUFDOztBQWtZdkQsTUFBTSxPQUFPLGFBQWE7dUdBQWIsYUFBYTt3R0FBYixhQUFhLGlCQS9xQmIsT0FBTyxhQTJxQk4sWUFBWSxhQTNxQmIsT0FBTzt3R0ErcUJQLGFBQWEsWUFKWixZQUFZOzsyRkFJYixhQUFhO2tCQUx6QixRQUFRO21CQUFDO29CQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztvQkFDdkIsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDO29CQUNsQixZQUFZLEVBQUUsQ0FBQyxPQUFPLENBQUM7aUJBQzFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlLCBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBBZnRlclZpZXdJbml0LCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgSW5qZWN0LCBJbnB1dCwgTmdNb2R1bGUsIE5nWm9uZSwgT25EZXN0cm95LCBQTEFURk9STV9JRCwgUmVuZGVyZXIyLCBTaW1wbGVDaGFuZ2VzLCBUZW1wbGF0ZVJlZiwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUHJpbWVOR0NvbmZpZywgVG9vbHRpcE9wdGlvbnMgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBDb25uZWN0ZWRPdmVybGF5U2Nyb2xsSGFuZGxlciwgRG9tSGFuZGxlciB9IGZyb20gJ3ByaW1lbmcvZG9tJztcbmltcG9ydCB7IE51bGxhYmxlIH0gZnJvbSAncHJpbWVuZy90cy1oZWxwZXJzJztcbmltcG9ydCB7IFVuaXF1ZUNvbXBvbmVudElkLCBaSW5kZXhVdGlscyB9IGZyb20gJ3ByaW1lbmcvdXRpbHMnO1xuXG4vKipcbiAqIFRvb2x0aXAgZGlyZWN0aXZlIHByb3ZpZGVzIGFkdmlzb3J5IGluZm9ybWF0aW9uIGZvciBhIGNvbXBvbmVudC5cbiAqIEBncm91cCBDb21wb25lbnRzXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3BUb29sdGlwXScsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ3AtZWxlbWVudCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIFRvb2x0aXAgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICAgIC8qKlxuICAgICAqIFBvc2l0aW9uIG9mIHRoZSB0b29sdGlwLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHRvb2x0aXBQb3NpdGlvbjogJ3JpZ2h0JyB8ICdsZWZ0JyB8ICd0b3AnIHwgJ2JvdHRvbScgfCBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogRXZlbnQgdG8gc2hvdyB0aGUgdG9vbHRpcC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB0b29sdGlwRXZlbnQ6ICdob3ZlcicgfCAnZm9jdXMnIHwgc3RyaW5nIHwgYW55ID0gJ2hvdmVyJztcbiAgICAvKipcbiAgICAgKiAgVGFyZ2V0IGVsZW1lbnQgdG8gYXR0YWNoIHRoZSBvdmVybGF5LCB2YWxpZCB2YWx1ZXMgYXJlIFwiYm9keVwiLCBcInRhcmdldFwiIG9yIGEgbG9jYWwgbmctRiB2YXJpYWJsZSBvZiBhbm90aGVyIGVsZW1lbnQgKG5vdGU6IHVzZSBiaW5kaW5nIHdpdGggYnJhY2tldHMgZm9yIHRlbXBsYXRlIHZhcmlhYmxlcywgZS5nLiBbYXBwZW5kVG9dPVwibXlkaXZcIiBmb3IgYSBkaXYgZWxlbWVudCBoYXZpbmcgI215ZGl2IGFzIHZhcmlhYmxlIG5hbWUpLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGFwcGVuZFRvOiBIVE1MRWxlbWVudCB8IEVsZW1lbnRSZWYgfCBUZW1wbGF0ZVJlZjxhbnk+IHwgc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZCB8IGFueTtcbiAgICAvKipcbiAgICAgKiBUeXBlIG9mIENTUyBwb3NpdGlvbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwb3NpdGlvblN0eWxlOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogU3R5bGUgY2xhc3Mgb2YgdGhlIHRvb2x0aXAuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgdG9vbHRpcFN0eWxlQ2xhc3M6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZSB6LWluZGV4IHNob3VsZCBiZSBtYW5hZ2VkIGF1dG9tYXRpY2FsbHkgdG8gYWx3YXlzIGdvIG9uIHRvcCBvciBoYXZlIGEgZml4ZWQgdmFsdWUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgdG9vbHRpcFpJbmRleDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIEJ5IGRlZmF1bHQgdGhlIHRvb2x0aXAgY29udGVudHMgYXJlIHJlbmRlcmVkIGFzIHRleHQuIFNldCB0byBmYWxzZSB0byBzdXBwb3J0IGh0bWwgdGFncyBpbiB0aGUgY29udGVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBlc2NhcGU6IGJvb2xlYW4gPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIERlbGF5IHRvIHNob3cgdGhlIHRvb2x0aXAgaW4gbWlsbGlzZWNvbmRzLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHNob3dEZWxheTogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIERlbGF5IHRvIGhpZGUgdGhlIHRvb2x0aXAgaW4gbWlsbGlzZWNvbmRzLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGhpZGVEZWxheTogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFRpbWUgdG8gd2FpdCBpbiBtaWxsaXNlY29uZHMgdG8gaGlkZSB0aGUgdG9vbHRpcCBldmVuIGl0IGlzIGFjdGl2ZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBsaWZlOiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogU3BlY2lmaWVzIHRoZSBhZGRpdGlvbmFsIHZlcnRpY2FsIG9mZnNldCBvZiB0aGUgdG9vbHRpcCBmcm9tIGl0cyBkZWZhdWx0IHBvc2l0aW9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHBvc2l0aW9uVG9wOiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogU3BlY2lmaWVzIHRoZSBhZGRpdGlvbmFsIGhvcml6b250YWwgb2Zmc2V0IG9mIHRoZSB0b29sdGlwIGZyb20gaXRzIGRlZmF1bHQgcG9zaXRpb24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgcG9zaXRpb25MZWZ0OiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byBoaWRlIHRvb2x0aXAgd2hlbiBob3ZlcmluZyBvdmVyIHRvb2x0aXAgY29udGVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBhdXRvSGlkZTogYm9vbGVhbiA9IHRydWU7XG4gICAgLyoqXG4gICAgICogQXV0b21hdGljYWxseSBhZGp1c3RzIHRoZSBlbGVtZW50IHBvc2l0aW9uIHdoZW4gdGhlcmUgaXMgbm90IGVub3VnaCBzcGFjZSBvbiB0aGUgc2VsZWN0ZWQgcG9zaXRpb24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZml0Q29udGVudDogYm9vbGVhbiA9IHRydWU7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byBoaWRlIHRvb2x0aXAgb24gZXNjYXBlIGtleSBwcmVzcy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBoaWRlT25Fc2NhcGU6IGJvb2xlYW4gPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIENvbnRlbnQgb2YgdGhlIHRvb2x0aXAuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCdwVG9vbHRpcCcpIGNvbnRlbnQ6IHN0cmluZyB8IFRlbXBsYXRlUmVmPEhUTUxFbGVtZW50PiB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBXaGVuIHByZXNlbnQsIGl0IHNwZWNpZmllcyB0aGF0IHRoZSBjb21wb25lbnQgc2hvdWxkIGJlIGRpc2FibGVkLlxuICAgICAqIEBkZWZhdWx0VmFsdWUgZmFsc2VcbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoJ3Rvb2x0aXBEaXNhYmxlZCcpIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkIGFzIGJvb2xlYW47XG4gICAgfVxuICAgIHNldCBkaXNhYmxlZCh2YWw6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSB2YWw7XG4gICAgICAgIHRoaXMuZGVhY3RpdmF0ZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTcGVjaWZpZXMgdGhlIHRvb2x0aXAgY29uZmlndXJhdGlvbiBvcHRpb25zIGZvciB0aGUgY29tcG9uZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHRvb2x0aXBPcHRpb25zOiBUb29sdGlwT3B0aW9ucyB8IHVuZGVmaW5lZDtcblxuICAgIF90b29sdGlwT3B0aW9ucyA9IHtcbiAgICAgICAgdG9vbHRpcExhYmVsOiBudWxsLFxuICAgICAgICB0b29sdGlwUG9zaXRpb246ICdyaWdodCcsXG4gICAgICAgIHRvb2x0aXBFdmVudDogJ2hvdmVyJyxcbiAgICAgICAgYXBwZW5kVG86ICdib2R5JyxcbiAgICAgICAgcG9zaXRpb25TdHlsZTogbnVsbCxcbiAgICAgICAgdG9vbHRpcFN0eWxlQ2xhc3M6IG51bGwsXG4gICAgICAgIHRvb2x0aXBaSW5kZXg6ICdhdXRvJyxcbiAgICAgICAgZXNjYXBlOiB0cnVlLFxuICAgICAgICBkaXNhYmxlZDogbnVsbCxcbiAgICAgICAgc2hvd0RlbGF5OiBudWxsLFxuICAgICAgICBoaWRlRGVsYXk6IG51bGwsXG4gICAgICAgIHBvc2l0aW9uVG9wOiBudWxsLFxuICAgICAgICBwb3NpdGlvbkxlZnQ6IG51bGwsXG4gICAgICAgIGxpZmU6IG51bGwsXG4gICAgICAgIGF1dG9IaWRlOiB0cnVlLFxuICAgICAgICBoaWRlT25Fc2NhcGU6IHRydWUsXG4gICAgICAgIGlkOiBVbmlxdWVDb21wb25lbnRJZCgpICsgJ190b29sdGlwJ1xuICAgIH07XG5cbiAgICBfZGlzYWJsZWQ6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgICBjb250YWluZXI6IGFueTtcblxuICAgIHN0eWxlQ2xhc3M6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgIHRvb2x0aXBUZXh0OiBhbnk7XG5cbiAgICBzaG93VGltZW91dDogYW55O1xuXG4gICAgaGlkZVRpbWVvdXQ6IGFueTtcblxuICAgIGFjdGl2ZTogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIG1vdXNlRW50ZXJMaXN0ZW5lcjogTnVsbGFibGU8RnVuY3Rpb24+O1xuXG4gICAgbW91c2VMZWF2ZUxpc3RlbmVyOiBOdWxsYWJsZTxGdW5jdGlvbj47XG5cbiAgICBjb250YWluZXJNb3VzZWxlYXZlTGlzdGVuZXI6IE51bGxhYmxlPEZ1bmN0aW9uPjtcblxuICAgIGNsaWNrTGlzdGVuZXI6IE51bGxhYmxlPEZ1bmN0aW9uPjtcblxuICAgIGZvY3VzTGlzdGVuZXI6IE51bGxhYmxlPEZ1bmN0aW9uPjtcblxuICAgIGJsdXJMaXN0ZW5lcjogTnVsbGFibGU8RnVuY3Rpb24+O1xuXG4gICAgc2Nyb2xsSGFuZGxlcjogYW55O1xuXG4gICAgcmVzaXplTGlzdGVuZXI6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogYW55LCBwdWJsaWMgZWw6IEVsZW1lbnRSZWYsIHB1YmxpYyB6b25lOiBOZ1pvbmUsIHB1YmxpYyBjb25maWc6IFByaW1lTkdDb25maWcsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSB2aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmKSB7fVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5nZXRPcHRpb24oJ3Rvb2x0aXBFdmVudCcpID09PSAnaG92ZXInKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW91c2VFbnRlckxpc3RlbmVyID0gdGhpcy5vbk1vdXNlRW50ZXIuYmluZCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3VzZUxlYXZlTGlzdGVuZXIgPSB0aGlzLm9uTW91c2VMZWF2ZS5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsaWNrTGlzdGVuZXIgPSB0aGlzLm9uSW5wdXRDbGljay5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIHRoaXMubW91c2VFbnRlckxpc3RlbmVyKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jbGlja0xpc3RlbmVyKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB0aGlzLm1vdXNlTGVhdmVMaXN0ZW5lcik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmdldE9wdGlvbigndG9vbHRpcEV2ZW50JykgPT09ICdmb2N1cycpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb2N1c0xpc3RlbmVyID0gdGhpcy5vbkZvY3VzLmJpbmQodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmx1ckxpc3RlbmVyID0gdGhpcy5vbkJsdXIuYmluZCh0aGlzKTtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0ID0gdGhpcy5nZXRUYXJnZXQodGhpcy5lbC5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcy5mb2N1c0xpc3RlbmVyKTtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCB0aGlzLmJsdXJMaXN0ZW5lcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhzaW1wbGVDaGFuZ2U6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgaWYgKHNpbXBsZUNoYW5nZS50b29sdGlwUG9zaXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuc2V0T3B0aW9uKHsgdG9vbHRpcFBvc2l0aW9uOiBzaW1wbGVDaGFuZ2UudG9vbHRpcFBvc2l0aW9uLmN1cnJlbnRWYWx1ZSB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzaW1wbGVDaGFuZ2UudG9vbHRpcEV2ZW50KSB7XG4gICAgICAgICAgICB0aGlzLnNldE9wdGlvbih7IHRvb2x0aXBFdmVudDogc2ltcGxlQ2hhbmdlLnRvb2x0aXBFdmVudC5jdXJyZW50VmFsdWUgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2ltcGxlQ2hhbmdlLmFwcGVuZFRvKSB7XG4gICAgICAgICAgICB0aGlzLnNldE9wdGlvbih7IGFwcGVuZFRvOiBzaW1wbGVDaGFuZ2UuYXBwZW5kVG8uY3VycmVudFZhbHVlIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNpbXBsZUNoYW5nZS5wb3NpdGlvblN0eWxlKSB7XG4gICAgICAgICAgICB0aGlzLnNldE9wdGlvbih7IHBvc2l0aW9uU3R5bGU6IHNpbXBsZUNoYW5nZS5wb3NpdGlvblN0eWxlLmN1cnJlbnRWYWx1ZSB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzaW1wbGVDaGFuZ2UudG9vbHRpcFN0eWxlQ2xhc3MpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0T3B0aW9uKHsgdG9vbHRpcFN0eWxlQ2xhc3M6IHNpbXBsZUNoYW5nZS50b29sdGlwU3R5bGVDbGFzcy5jdXJyZW50VmFsdWUgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2ltcGxlQ2hhbmdlLnRvb2x0aXBaSW5kZXgpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0T3B0aW9uKHsgdG9vbHRpcFpJbmRleDogc2ltcGxlQ2hhbmdlLnRvb2x0aXBaSW5kZXguY3VycmVudFZhbHVlIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNpbXBsZUNoYW5nZS5lc2NhcGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0T3B0aW9uKHsgZXNjYXBlOiBzaW1wbGVDaGFuZ2UuZXNjYXBlLmN1cnJlbnRWYWx1ZSB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzaW1wbGVDaGFuZ2Uuc2hvd0RlbGF5KSB7XG4gICAgICAgICAgICB0aGlzLnNldE9wdGlvbih7IHNob3dEZWxheTogc2ltcGxlQ2hhbmdlLnNob3dEZWxheS5jdXJyZW50VmFsdWUgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2ltcGxlQ2hhbmdlLmhpZGVEZWxheSkge1xuICAgICAgICAgICAgdGhpcy5zZXRPcHRpb24oeyBoaWRlRGVsYXk6IHNpbXBsZUNoYW5nZS5oaWRlRGVsYXkuY3VycmVudFZhbHVlIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNpbXBsZUNoYW5nZS5saWZlKSB7XG4gICAgICAgICAgICB0aGlzLnNldE9wdGlvbih7IGxpZmU6IHNpbXBsZUNoYW5nZS5saWZlLmN1cnJlbnRWYWx1ZSB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzaW1wbGVDaGFuZ2UucG9zaXRpb25Ub3ApIHtcbiAgICAgICAgICAgIHRoaXMuc2V0T3B0aW9uKHsgcG9zaXRpb25Ub3A6IHNpbXBsZUNoYW5nZS5wb3NpdGlvblRvcC5jdXJyZW50VmFsdWUgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2ltcGxlQ2hhbmdlLnBvc2l0aW9uTGVmdCkge1xuICAgICAgICAgICAgdGhpcy5zZXRPcHRpb24oeyBwb3NpdGlvbkxlZnQ6IHNpbXBsZUNoYW5nZS5wb3NpdGlvbkxlZnQuY3VycmVudFZhbHVlIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNpbXBsZUNoYW5nZS5kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5zZXRPcHRpb24oeyBkaXNhYmxlZDogc2ltcGxlQ2hhbmdlLmRpc2FibGVkLmN1cnJlbnRWYWx1ZSB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzaW1wbGVDaGFuZ2UuY29udGVudCkge1xuICAgICAgICAgICAgdGhpcy5zZXRPcHRpb24oeyB0b29sdGlwTGFiZWw6IHNpbXBsZUNoYW5nZS5jb250ZW50LmN1cnJlbnRWYWx1ZSB9KTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuYWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNpbXBsZUNoYW5nZS5jb250ZW50LmN1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jb250YWluZXIgJiYgdGhpcy5jb250YWluZXIub2Zmc2V0UGFyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVRleHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWxpZ24oKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNpbXBsZUNoYW5nZS5hdXRvSGlkZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRPcHRpb24oeyBhdXRvSGlkZTogc2ltcGxlQ2hhbmdlLmF1dG9IaWRlLmN1cnJlbnRWYWx1ZSB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzaW1wbGVDaGFuZ2UuaWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0T3B0aW9uKHsgaWQ6IHNpbXBsZUNoYW5nZS5pZC5jdXJyZW50VmFsdWUgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2ltcGxlQ2hhbmdlLnRvb2x0aXBPcHRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLl90b29sdGlwT3B0aW9ucyA9IHsgLi4udGhpcy5fdG9vbHRpcE9wdGlvbnMsIC4uLnNpbXBsZUNoYW5nZS50b29sdGlwT3B0aW9ucy5jdXJyZW50VmFsdWUgfTtcbiAgICAgICAgICAgIHRoaXMuZGVhY3RpdmF0ZSgpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5hY3RpdmUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5nZXRPcHRpb24oJ3Rvb2x0aXBMYWJlbCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbnRhaW5lciAmJiB0aGlzLmNvbnRhaW5lci5vZmZzZXRQYXJlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVGV4dCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hbGlnbigpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc0F1dG9IaWRlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRPcHRpb24oJ2F1dG9IaWRlJyk7XG4gICAgfVxuXG4gICAgb25Nb3VzZUVudGVyKGU6IEV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5jb250YWluZXIgJiYgIXRoaXMuc2hvd1RpbWVvdXQpIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZhdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uTW91c2VMZWF2ZShlOiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5pc0F1dG9IaWRlKCkpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbGlkID0gRG9tSGFuZGxlci5oYXNDbGFzcyhlLnJlbGF0ZWRUYXJnZXQsICdwLXRvb2x0aXAnKSB8fCBEb21IYW5kbGVyLmhhc0NsYXNzKGUucmVsYXRlZFRhcmdldCwgJ3AtdG9vbHRpcC10ZXh0JykgfHwgRG9tSGFuZGxlci5oYXNDbGFzcyhlLnJlbGF0ZWRUYXJnZXQsICdwLXRvb2x0aXAtYXJyb3cnKTtcbiAgICAgICAgICAgICF2YWxpZCAmJiB0aGlzLmRlYWN0aXZhdGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZGVhY3RpdmF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Gb2N1cyhlOiBFdmVudCkge1xuICAgICAgICB0aGlzLmFjdGl2YXRlKCk7XG4gICAgfVxuXG4gICAgb25CbHVyKGU6IEV2ZW50KSB7XG4gICAgICAgIHRoaXMuZGVhY3RpdmF0ZSgpO1xuICAgIH1cblxuICAgIG9uSW5wdXRDbGljayhlOiBFdmVudCkge1xuICAgICAgICB0aGlzLmRlYWN0aXZhdGUoKTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDprZXlkb3duLmVzY2FwZScsIFsnJGV2ZW50J10pXG4gICAgb25QcmVzc0VzY2FwZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaGlkZU9uRXNjYXBlKSB7XG4gICAgICAgICAgICB0aGlzLmRlYWN0aXZhdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFjdGl2YXRlKCkge1xuICAgICAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuY2xlYXJIaWRlVGltZW91dCgpO1xuXG4gICAgICAgIGlmICh0aGlzLmdldE9wdGlvbignc2hvd0RlbGF5JykpXG4gICAgICAgICAgICB0aGlzLnNob3dUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgICAgICB9LCB0aGlzLmdldE9wdGlvbignc2hvd0RlbGF5JykpO1xuICAgICAgICBlbHNlIHRoaXMuc2hvdygpO1xuXG4gICAgICAgIGlmICh0aGlzLmdldE9wdGlvbignbGlmZScpKSB7XG4gICAgICAgICAgICBsZXQgZHVyYXRpb24gPSB0aGlzLmdldE9wdGlvbignc2hvd0RlbGF5JykgPyB0aGlzLmdldE9wdGlvbignbGlmZScpICsgdGhpcy5nZXRPcHRpb24oJ3Nob3dEZWxheScpIDogdGhpcy5nZXRPcHRpb24oJ2xpZmUnKTtcbiAgICAgICAgICAgIHRoaXMuaGlkZVRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgIH0sIGR1cmF0aW9uKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlYWN0aXZhdGUoKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY2xlYXJTaG93VGltZW91dCgpO1xuXG4gICAgICAgIGlmICh0aGlzLmdldE9wdGlvbignaGlkZURlbGF5JykpIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJIaWRlVGltZW91dCgpOyAvL2xpZmUgdGltZW91dFxuICAgICAgICAgICAgdGhpcy5oaWRlVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgfSwgdGhpcy5nZXRPcHRpb24oJ2hpZGVEZWxheScpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY3JlYXRlKCkge1xuICAgICAgICBpZiAodGhpcy5jb250YWluZXIpIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJIaWRlVGltZW91dCgpO1xuICAgICAgICAgICAgdGhpcy5yZW1vdmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLnNldEF0dHJpYnV0ZSgnaWQnLCB0aGlzLmdldE9wdGlvbignaWQnKSk7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLnNldEF0dHJpYnV0ZSgncm9sZScsICd0b29sdGlwJyk7XG5cbiAgICAgICAgbGV0IHRvb2x0aXBBcnJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0b29sdGlwQXJyb3cuY2xhc3NOYW1lID0gJ3AtdG9vbHRpcC1hcnJvdyc7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHRvb2x0aXBBcnJvdyk7XG5cbiAgICAgICAgdGhpcy50b29sdGlwVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLnRvb2x0aXBUZXh0LmNsYXNzTmFtZSA9ICdwLXRvb2x0aXAtdGV4dCc7XG5cbiAgICAgICAgdGhpcy51cGRhdGVUZXh0KCk7XG5cbiAgICAgICAgaWYgKHRoaXMuZ2V0T3B0aW9uKCdwb3NpdGlvblN0eWxlJykpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLnBvc2l0aW9uID0gdGhpcy5nZXRPcHRpb24oJ3Bvc2l0aW9uU3R5bGUnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMudG9vbHRpcFRleHQpO1xuXG4gICAgICAgIGlmICh0aGlzLmdldE9wdGlvbignYXBwZW5kVG8nKSA9PT0gJ2JvZHknKSBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuY29udGFpbmVyKTtcbiAgICAgICAgZWxzZSBpZiAodGhpcy5nZXRPcHRpb24oJ2FwcGVuZFRvJykgPT09ICd0YXJnZXQnKSBEb21IYW5kbGVyLmFwcGVuZENoaWxkKHRoaXMuY29udGFpbmVyLCB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICBlbHNlIERvbUhhbmRsZXIuYXBwZW5kQ2hpbGQodGhpcy5jb250YWluZXIsIHRoaXMuZ2V0T3B0aW9uKCdhcHBlbmRUbycpKTtcblxuICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XG5cbiAgICAgICAgaWYgKHRoaXMuZml0Q29udGVudCkge1xuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUud2lkdGggPSAnZml0LWNvbnRlbnQnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNBdXRvSGlkZSgpKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ25vbmUnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUucG9pbnRlckV2ZW50cyA9ICd1bnNldCc7XG4gICAgICAgICAgICB0aGlzLmJpbmRDb250YWluZXJNb3VzZWxlYXZlTGlzdGVuZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJpbmRDb250YWluZXJNb3VzZWxlYXZlTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5jb250YWluZXJNb3VzZWxlYXZlTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldEVsOiBhbnkgPSB0aGlzLmNvbnRhaW5lciA/PyB0aGlzLmNvbnRhaW5lci5uYXRpdmVFbGVtZW50O1xuXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lck1vdXNlbGVhdmVMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHRhcmdldEVsLCAnbW91c2VsZWF2ZScsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZWFjdGl2YXRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVuYmluZENvbnRhaW5lck1vdXNlbGVhdmVMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKHRoaXMuY29udGFpbmVyTW91c2VsZWF2ZUxpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLmJpbmRDb250YWluZXJNb3VzZWxlYXZlTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyTW91c2VsZWF2ZUxpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3coKSB7XG4gICAgICAgIGlmICghdGhpcy5nZXRPcHRpb24oJ3Rvb2x0aXBMYWJlbCcpIHx8IHRoaXMuZ2V0T3B0aW9uKCdkaXNhYmxlZCcpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNyZWF0ZSgpO1xuICAgICAgICB0aGlzLmFsaWduKCk7XG4gICAgICAgIERvbUhhbmRsZXIuZmFkZUluKHRoaXMuY29udGFpbmVyLCAyNTApO1xuXG4gICAgICAgIGlmICh0aGlzLmdldE9wdGlvbigndG9vbHRpcFpJbmRleCcpID09PSAnYXV0bycpIFpJbmRleFV0aWxzLnNldCgndG9vbHRpcCcsIHRoaXMuY29udGFpbmVyLCB0aGlzLmNvbmZpZy56SW5kZXgudG9vbHRpcCk7XG4gICAgICAgIGVsc2UgdGhpcy5jb250YWluZXIuc3R5bGUuekluZGV4ID0gdGhpcy5nZXRPcHRpb24oJ3Rvb2x0aXBaSW5kZXgnKTtcblxuICAgICAgICB0aGlzLmJpbmREb2N1bWVudFJlc2l6ZUxpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMuYmluZFNjcm9sbExpc3RlbmVyKCk7XG4gICAgfVxuXG4gICAgaGlkZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2V0T3B0aW9uKCd0b29sdGlwWkluZGV4JykgPT09ICdhdXRvJykge1xuICAgICAgICAgICAgWkluZGV4VXRpbHMuY2xlYXIodGhpcy5jb250YWluZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICB1cGRhdGVUZXh0KCkge1xuICAgICAgICBjb25zdCBjb250ZW50ID0gdGhpcy5nZXRPcHRpb24oJ3Rvb2x0aXBMYWJlbCcpO1xuICAgICAgICBpZiAoY29udGVudCBpbnN0YW5jZW9mIFRlbXBsYXRlUmVmKSB7XG4gICAgICAgICAgICBjb25zdCBlbWJlZGRlZFZpZXdSZWYgPSB0aGlzLnZpZXdDb250YWluZXIuY3JlYXRlRW1iZWRkZWRWaWV3KGNvbnRlbnQpO1xuICAgICAgICAgICAgZW1iZWRkZWRWaWV3UmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgICAgIGVtYmVkZGVkVmlld1JlZi5yb290Tm9kZXMuZm9yRWFjaCgobm9kZSkgPT4gdGhpcy50b29sdGlwVGV4dC5hcHBlbmRDaGlsZChub2RlKSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5nZXRPcHRpb24oJ2VzY2FwZScpKSB7XG4gICAgICAgICAgICB0aGlzLnRvb2x0aXBUZXh0LmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgICAgdGhpcy50b29sdGlwVGV4dC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjb250ZW50KSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRvb2x0aXBUZXh0LmlubmVySFRNTCA9IGNvbnRlbnQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhbGlnbigpIHtcbiAgICAgICAgbGV0IHBvc2l0aW9uID0gdGhpcy5nZXRPcHRpb24oJ3Rvb2x0aXBQb3NpdGlvbicpO1xuXG4gICAgICAgIHN3aXRjaCAocG9zaXRpb24pIHtcbiAgICAgICAgICAgIGNhc2UgJ3RvcCc6XG4gICAgICAgICAgICAgICAgdGhpcy5hbGlnblRvcCgpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzT3V0T2ZCb3VuZHMoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFsaWduQm90dG9tKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzT3V0T2ZCb3VuZHMoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hbGlnblJpZ2h0KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzT3V0T2ZCb3VuZHMoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWxpZ25MZWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ2JvdHRvbSc6XG4gICAgICAgICAgICAgICAgdGhpcy5hbGlnbkJvdHRvbSgpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzT3V0T2ZCb3VuZHMoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFsaWduVG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzT3V0T2ZCb3VuZHMoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hbGlnblJpZ2h0KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzT3V0T2ZCb3VuZHMoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWxpZ25MZWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgICAgICAgIHRoaXMuYWxpZ25MZWZ0KCk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNPdXRPZkJvdW5kcygpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWxpZ25SaWdodCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzT3V0T2ZCb3VuZHMoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hbGlnblRvcCgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc091dE9mQm91bmRzKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFsaWduQm90dG9tKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgICAgICAgICB0aGlzLmFsaWduUmlnaHQoKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc091dE9mQm91bmRzKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbGlnbkxlZnQoKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc091dE9mQm91bmRzKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWxpZ25Ub3AoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNPdXRPZkJvdW5kcygpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hbGlnbkJvdHRvbSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0SG9zdE9mZnNldCgpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2V0T3B0aW9uKCdhcHBlbmRUbycpID09PSAnYm9keScgfHwgdGhpcy5nZXRPcHRpb24oJ2FwcGVuZFRvJykgPT09ICd0YXJnZXQnKSB7XG4gICAgICAgICAgICBsZXQgb2Zmc2V0ID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgbGV0IHRhcmdldExlZnQgPSBvZmZzZXQubGVmdCArIERvbUhhbmRsZXIuZ2V0V2luZG93U2Nyb2xsTGVmdCgpO1xuICAgICAgICAgICAgbGV0IHRhcmdldFRvcCA9IG9mZnNldC50b3AgKyBEb21IYW5kbGVyLmdldFdpbmRvd1Njcm9sbFRvcCgpO1xuXG4gICAgICAgICAgICByZXR1cm4geyBsZWZ0OiB0YXJnZXRMZWZ0LCB0b3A6IHRhcmdldFRvcCB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHsgbGVmdDogMCwgdG9wOiAwIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhbGlnblJpZ2h0KCkge1xuICAgICAgICB0aGlzLnByZUFsaWduKCdyaWdodCcpO1xuICAgICAgICBsZXQgaG9zdE9mZnNldCA9IHRoaXMuZ2V0SG9zdE9mZnNldCgpO1xuICAgICAgICBsZXQgbGVmdCA9IGhvc3RPZmZzZXQubGVmdCArIERvbUhhbmRsZXIuZ2V0T3V0ZXJXaWR0aCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICBsZXQgdG9wID0gaG9zdE9mZnNldC50b3AgKyAoRG9tSGFuZGxlci5nZXRPdXRlckhlaWdodCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpIC0gRG9tSGFuZGxlci5nZXRPdXRlckhlaWdodCh0aGlzLmNvbnRhaW5lcikpIC8gMjtcbiAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUubGVmdCA9IGxlZnQgKyB0aGlzLmdldE9wdGlvbigncG9zaXRpb25MZWZ0JykgKyAncHgnO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS50b3AgPSB0b3AgKyB0aGlzLmdldE9wdGlvbigncG9zaXRpb25Ub3AnKSArICdweCc7XG4gICAgfVxuXG4gICAgYWxpZ25MZWZ0KCkge1xuICAgICAgICB0aGlzLnByZUFsaWduKCdsZWZ0Jyk7XG4gICAgICAgIGxldCBob3N0T2Zmc2V0ID0gdGhpcy5nZXRIb3N0T2Zmc2V0KCk7XG4gICAgICAgIGxldCBsZWZ0ID0gaG9zdE9mZnNldC5sZWZ0IC0gRG9tSGFuZGxlci5nZXRPdXRlcldpZHRoKHRoaXMuY29udGFpbmVyKTtcbiAgICAgICAgbGV0IHRvcCA9IGhvc3RPZmZzZXQudG9wICsgKERvbUhhbmRsZXIuZ2V0T3V0ZXJIZWlnaHQodGhpcy5lbC5uYXRpdmVFbGVtZW50KSAtIERvbUhhbmRsZXIuZ2V0T3V0ZXJIZWlnaHQodGhpcy5jb250YWluZXIpKSAvIDI7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLmxlZnQgPSBsZWZ0ICsgdGhpcy5nZXRPcHRpb24oJ3Bvc2l0aW9uTGVmdCcpICsgJ3B4JztcbiAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUudG9wID0gdG9wICsgdGhpcy5nZXRPcHRpb24oJ3Bvc2l0aW9uVG9wJykgKyAncHgnO1xuICAgIH1cblxuICAgIGFsaWduVG9wKCkge1xuICAgICAgICB0aGlzLnByZUFsaWduKCd0b3AnKTtcbiAgICAgICAgbGV0IGhvc3RPZmZzZXQgPSB0aGlzLmdldEhvc3RPZmZzZXQoKTtcbiAgICAgICAgbGV0IGxlZnQgPSBob3N0T2Zmc2V0LmxlZnQgKyAoRG9tSGFuZGxlci5nZXRPdXRlcldpZHRoKHRoaXMuZWwubmF0aXZlRWxlbWVudCkgLSBEb21IYW5kbGVyLmdldE91dGVyV2lkdGgodGhpcy5jb250YWluZXIpKSAvIDI7XG4gICAgICAgIGxldCB0b3AgPSBob3N0T2Zmc2V0LnRvcCAtIERvbUhhbmRsZXIuZ2V0T3V0ZXJIZWlnaHQodGhpcy5jb250YWluZXIpO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS5sZWZ0ID0gbGVmdCArIHRoaXMuZ2V0T3B0aW9uKCdwb3NpdGlvbkxlZnQnKSArICdweCc7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLnRvcCA9IHRvcCArIHRoaXMuZ2V0T3B0aW9uKCdwb3NpdGlvblRvcCcpICsgJ3B4JztcbiAgICB9XG5cbiAgICBhbGlnbkJvdHRvbSgpIHtcbiAgICAgICAgdGhpcy5wcmVBbGlnbignYm90dG9tJyk7XG4gICAgICAgIGxldCBob3N0T2Zmc2V0ID0gdGhpcy5nZXRIb3N0T2Zmc2V0KCk7XG4gICAgICAgIGxldCBsZWZ0ID0gaG9zdE9mZnNldC5sZWZ0ICsgKERvbUhhbmRsZXIuZ2V0T3V0ZXJXaWR0aCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpIC0gRG9tSGFuZGxlci5nZXRPdXRlcldpZHRoKHRoaXMuY29udGFpbmVyKSkgLyAyO1xuICAgICAgICBsZXQgdG9wID0gaG9zdE9mZnNldC50b3AgKyBEb21IYW5kbGVyLmdldE91dGVySGVpZ2h0KHRoaXMuZWwubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLmxlZnQgPSBsZWZ0ICsgdGhpcy5nZXRPcHRpb24oJ3Bvc2l0aW9uTGVmdCcpICsgJ3B4JztcbiAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUudG9wID0gdG9wICsgdGhpcy5nZXRPcHRpb24oJ3Bvc2l0aW9uVG9wJykgKyAncHgnO1xuICAgIH1cblxuICAgIHNldE9wdGlvbihvcHRpb246IGFueSkge1xuICAgICAgICB0aGlzLl90b29sdGlwT3B0aW9ucyA9IHsgLi4udGhpcy5fdG9vbHRpcE9wdGlvbnMsIC4uLm9wdGlvbiB9O1xuICAgIH1cblxuICAgIGdldE9wdGlvbihvcHRpb246IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5fdG9vbHRpcE9wdGlvbnNbb3B0aW9uIGFzIGtleW9mIHR5cGVvZiB0aGlzLnRvb2x0aXBPcHRpb25zXTtcbiAgICB9XG5cbiAgICBnZXRUYXJnZXQoZWw6IEVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIERvbUhhbmRsZXIuaGFzQ2xhc3MoZWwsICdwLWlucHV0d3JhcHBlcicpID8gRG9tSGFuZGxlci5maW5kU2luZ2xlKGVsLCAnaW5wdXQnKSA6IGVsO1xuICAgIH1cblxuICAgIHByZUFsaWduKHBvc2l0aW9uOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUubGVmdCA9IC05OTkgKyAncHgnO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS50b3AgPSAtOTk5ICsgJ3B4JztcblxuICAgICAgICBsZXQgZGVmYXVsdENsYXNzTmFtZSA9ICdwLXRvb2x0aXAgcC1jb21wb25lbnQgcC10b29sdGlwLScgKyBwb3NpdGlvbjtcbiAgICAgICAgdGhpcy5jb250YWluZXIuY2xhc3NOYW1lID0gdGhpcy5nZXRPcHRpb24oJ3Rvb2x0aXBTdHlsZUNsYXNzJykgPyBkZWZhdWx0Q2xhc3NOYW1lICsgJyAnICsgdGhpcy5nZXRPcHRpb24oJ3Rvb2x0aXBTdHlsZUNsYXNzJykgOiBkZWZhdWx0Q2xhc3NOYW1lO1xuICAgIH1cblxuICAgIGlzT3V0T2ZCb3VuZHMoKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCBvZmZzZXQgPSB0aGlzLmNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgbGV0IHRhcmdldFRvcCA9IG9mZnNldC50b3A7XG4gICAgICAgIGxldCB0YXJnZXRMZWZ0ID0gb2Zmc2V0LmxlZnQ7XG4gICAgICAgIGxldCB3aWR0aCA9IERvbUhhbmRsZXIuZ2V0T3V0ZXJXaWR0aCh0aGlzLmNvbnRhaW5lcik7XG4gICAgICAgIGxldCBoZWlnaHQgPSBEb21IYW5kbGVyLmdldE91dGVySGVpZ2h0KHRoaXMuY29udGFpbmVyKTtcbiAgICAgICAgbGV0IHZpZXdwb3J0ID0gRG9tSGFuZGxlci5nZXRWaWV3cG9ydCgpO1xuXG4gICAgICAgIHJldHVybiB0YXJnZXRMZWZ0ICsgd2lkdGggPiB2aWV3cG9ydC53aWR0aCB8fCB0YXJnZXRMZWZ0IDwgMCB8fCB0YXJnZXRUb3AgPCAwIHx8IHRhcmdldFRvcCArIGhlaWdodCA+IHZpZXdwb3J0LmhlaWdodDtcbiAgICB9XG5cbiAgICBvbldpbmRvd1Jlc2l6ZShlOiBFdmVudCkge1xuICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICB9XG5cbiAgICBiaW5kRG9jdW1lbnRSZXNpemVMaXN0ZW5lcigpIHtcbiAgICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVzaXplTGlzdGVuZXIgPSB0aGlzLm9uV2luZG93UmVzaXplLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5yZXNpemVMaXN0ZW5lcik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHVuYmluZERvY3VtZW50UmVzaXplTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnJlc2l6ZUxpc3RlbmVyKSB7XG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5yZXNpemVMaXN0ZW5lcik7XG4gICAgICAgICAgICB0aGlzLnJlc2l6ZUxpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJpbmRTY3JvbGxMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNjcm9sbEhhbmRsZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsSGFuZGxlciA9IG5ldyBDb25uZWN0ZWRPdmVybGF5U2Nyb2xsSGFuZGxlcih0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb250YWluZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNjcm9sbEhhbmRsZXIuYmluZFNjcm9sbExpc3RlbmVyKCk7XG4gICAgfVxuXG4gICAgdW5iaW5kU2Nyb2xsTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnNjcm9sbEhhbmRsZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsSGFuZGxlci51bmJpbmRTY3JvbGxMaXN0ZW5lcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdW5iaW5kRXZlbnRzKCkge1xuICAgICAgICBpZiAodGhpcy5nZXRPcHRpb24oJ3Rvb2x0aXBFdmVudCcpID09PSAnaG92ZXInKSB7XG4gICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIHRoaXMubW91c2VFbnRlckxpc3RlbmVyKTtcbiAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdGhpcy5tb3VzZUxlYXZlTGlzdGVuZXIpO1xuICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jbGlja0xpc3RlbmVyKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmdldE9wdGlvbigndG9vbHRpcEV2ZW50JykgPT09ICdmb2N1cycpIHtcbiAgICAgICAgICAgIGxldCB0YXJnZXQgPSB0aGlzLmdldFRhcmdldCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpO1xuXG4gICAgICAgICAgICB0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLmZvY3VzTGlzdGVuZXIpO1xuICAgICAgICAgICAgdGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2JsdXInLCB0aGlzLmJsdXJMaXN0ZW5lcik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnVuYmluZERvY3VtZW50UmVzaXplTGlzdGVuZXIoKTtcbiAgICB9XG5cbiAgICByZW1vdmUoKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbnRhaW5lciAmJiB0aGlzLmNvbnRhaW5lci5wYXJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5nZXRPcHRpb24oJ2FwcGVuZFRvJykgPT09ICdib2R5JykgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0aGlzLmNvbnRhaW5lcik7XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLmdldE9wdGlvbignYXBwZW5kVG8nKSA9PT0gJ3RhcmdldCcpIHRoaXMuZWwubmF0aXZlRWxlbWVudC5yZW1vdmVDaGlsZCh0aGlzLmNvbnRhaW5lcik7XG4gICAgICAgICAgICBlbHNlIERvbUhhbmRsZXIucmVtb3ZlQ2hpbGQodGhpcy5jb250YWluZXIsIHRoaXMuZ2V0T3B0aW9uKCdhcHBlbmRUbycpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudW5iaW5kRG9jdW1lbnRSZXNpemVMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLnVuYmluZFNjcm9sbExpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMudW5iaW5kQ29udGFpbmVyTW91c2VsZWF2ZUxpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMuY2xlYXJUaW1lb3V0cygpO1xuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IG51bGw7XG4gICAgICAgIHRoaXMuc2Nyb2xsSGFuZGxlciA9IG51bGw7XG4gICAgfVxuXG4gICAgY2xlYXJTaG93VGltZW91dCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc2hvd1RpbWVvdXQpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnNob3dUaW1lb3V0KTtcbiAgICAgICAgICAgIHRoaXMuc2hvd1RpbWVvdXQgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xlYXJIaWRlVGltZW91dCgpIHtcbiAgICAgICAgaWYgKHRoaXMuaGlkZVRpbWVvdXQpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmhpZGVUaW1lb3V0KTtcbiAgICAgICAgICAgIHRoaXMuaGlkZVRpbWVvdXQgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xlYXJUaW1lb3V0cygpIHtcbiAgICAgICAgdGhpcy5jbGVhclNob3dUaW1lb3V0KCk7XG4gICAgICAgIHRoaXMuY2xlYXJIaWRlVGltZW91dCgpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnVuYmluZEV2ZW50cygpO1xuXG4gICAgICAgIGlmICh0aGlzLmNvbnRhaW5lcikge1xuICAgICAgICAgICAgWkluZGV4VXRpbHMuY2xlYXIodGhpcy5jb250YWluZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZW1vdmUoKTtcblxuICAgICAgICBpZiAodGhpcy5zY3JvbGxIYW5kbGVyKSB7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbEhhbmRsZXIuZGVzdHJveSgpO1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxIYW5kbGVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbVG9vbHRpcF0sXG4gICAgZGVjbGFyYXRpb25zOiBbVG9vbHRpcF1cbn0pXG5leHBvcnQgY2xhc3MgVG9vbHRpcE1vZHVsZSB7fVxuIl19