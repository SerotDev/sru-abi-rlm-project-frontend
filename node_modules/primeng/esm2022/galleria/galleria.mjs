import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Inject, Input, NgModule, Output, PLATFORM_ID, ViewChild, ViewEncapsulation } from '@angular/core';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { ChevronLeftIcon } from 'primeng/icons/chevronleft';
import { ChevronRightIcon } from 'primeng/icons/chevronright';
import { TimesIcon } from 'primeng/icons/times';
import { WindowMaximizeIcon } from 'primeng/icons/windowmaximize';
import { WindowMinimizeIcon } from 'primeng/icons/windowminimize';
import { RippleModule } from 'primeng/ripple';
import { UniqueComponentId, ZIndexUtils } from 'primeng/utils';
import { FocusTrapModule } from 'primeng/focustrap';
import { platformBrowser } from '@angular/platform-browser';
import * as i0 from "@angular/core";
import * as i1 from "primeng/api";
import * as i2 from "@angular/common";
import * as i3 from "primeng/ripple";
import * as i4 from "primeng/focustrap";
/**
 * Galleria is an advanced content gallery component.
 * @group Components
 */
export class Galleria {
    document;
    platformId;
    element;
    cd;
    config;
    /**
     * Index of the first item.
     * @group Props
     */
    get activeIndex() {
        return this._activeIndex;
    }
    set activeIndex(activeIndex) {
        this._activeIndex = activeIndex;
    }
    /**
     * Whether to display the component on fullscreen.
     * @group Props
     */
    fullScreen = false;
    /**
     * Unique identifier of the element.
     * @group Props
     */
    id;
    /**
     * An array of objects to display.
     * @group Props
     */
    value;
    /**
     * Number of items per page.
     * @group Props
     */
    numVisible = 3;
    /**
     * An array of options for responsive design.
     * @see {GalleriaResponsiveOptions}
     * @group Props
     */
    responsiveOptions;
    /**
     * Whether to display navigation buttons in item section.
     * @group Props
     */
    showItemNavigators = false;
    /**
     * Whether to display navigation buttons in thumbnail container.
     * @group Props
     */
    showThumbnailNavigators = true;
    /**
     * Whether to display navigation buttons on item hover.
     * @group Props
     */
    showItemNavigatorsOnHover = false;
    /**
     * When enabled, item is changed on indicator hover.
     * @group Props
     */
    changeItemOnIndicatorHover = false;
    /**
     * Defines if scrolling would be infinite.
     * @group Props
     */
    circular = false;
    /**
     * Items are displayed with a slideshow in autoPlay mode.
     * @group Props
     */
    autoPlay = false;
    /**
     * When enabled, autorun should stop by click.
     * @group Props
     */
    shouldStopAutoplayByClick = true;
    /**
     * Time in milliseconds to scroll items.
     * @group Props
     */
    transitionInterval = 4000;
    /**
     * Whether to display thumbnail container.
     * @group Props
     */
    showThumbnails = true;
    /**
     * Position of thumbnails.
     * @group Props
     */
    thumbnailsPosition = 'bottom';
    /**
     * Height of the viewport in vertical thumbnail.
     * @group Props
     */
    verticalThumbnailViewPortHeight = '300px';
    /**
     * Whether to display indicator container.
     * @group Props
     */
    showIndicators = false;
    /**
     * When enabled, indicator container is displayed on item container.
     * @group Props
     */
    showIndicatorsOnItem = false;
    /**
     * Position of indicators.
     * @group Props
     */
    indicatorsPosition = 'bottom';
    /**
     * Base zIndex value to use in layering.
     * @group Props
     */
    baseZIndex = 0;
    /**
     * Style class of the mask on fullscreen mode.
     * @group Props
     */
    maskClass;
    /**
     * Style class of the component on fullscreen mode. Otherwise, the 'class' property can be used.
     * @group Props
     */
    containerClass;
    /**
     * Inline style of the component on fullscreen mode. Otherwise, the 'style' property can be used.
     * @group Props
     */
    containerStyle;
    /**
     * Transition options of the show animation.
     * @group Props
     */
    showTransitionOptions = '150ms cubic-bezier(0, 0, 0.2, 1)';
    /**
     * Transition options of the hide animation.
     * @group Props
     */
    hideTransitionOptions = '150ms cubic-bezier(0, 0, 0.2, 1)';
    /**
     * Specifies the visibility of the mask on fullscreen mode.
     * @group Props
     */
    get visible() {
        return this._visible;
    }
    set visible(visible) {
        this._visible = visible;
        if (this._visible && !this.maskVisible) {
            this.maskVisible = true;
        }
    }
    /**
     * Callback to invoke on active index change.
     * @param {number} number - Active index.
     * @group Emits
     */
    activeIndexChange = new EventEmitter();
    /**
     * Callback to invoke on visiblity change.
     * @param {boolean} boolean - Visible value.
     * @group Emits
     */
    visibleChange = new EventEmitter();
    mask;
    container;
    templates;
    _visible = false;
    _activeIndex = 0;
    headerFacet;
    footerFacet;
    indicatorFacet;
    captionFacet;
    closeIconTemplate;
    previousThumbnailIconTemplate;
    nextThumbnailIconTemplate;
    itemPreviousIconTemplate;
    itemNextIconTemplate;
    maskVisible = false;
    constructor(document, platformId, element, cd, config) {
        this.document = document;
        this.platformId = platformId;
        this.element = element;
        this.cd = cd;
        this.config = config;
    }
    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'header':
                    this.headerFacet = item.template;
                    break;
                case 'footer':
                    this.footerFacet = item.template;
                    break;
                case 'indicator':
                    this.indicatorFacet = item.template;
                    break;
                case 'closeicon':
                    this.closeIconTemplate = item.template;
                    break;
                case 'itemnexticon':
                    this.itemNextIconTemplate = item.template;
                    break;
                case 'itempreviousicon':
                    this.itemPreviousIconTemplate = item.template;
                    break;
                case 'previousthumbnailicon':
                    this.previousThumbnailIconTemplate = item.template;
                    break;
                case 'nextthumbnailicon':
                    this.nextThumbnailIconTemplate = item.template;
                    break;
                case 'caption':
                    this.captionFacet = item.template;
                    break;
            }
        });
    }
    ngOnChanges(simpleChanges) {
        if (simpleChanges.value && simpleChanges.value.currentValue?.length < this.numVisible) {
            this.numVisible = simpleChanges.value.currentValue.length;
        }
    }
    onMaskHide() {
        this.visible = false;
        this.visibleChange.emit(false);
    }
    onActiveItemChange(index) {
        if (this.activeIndex !== index) {
            this.activeIndex = index;
            this.activeIndexChange.emit(index);
        }
    }
    onAnimationStart(event) {
        switch (event.toState) {
            case 'visible':
                this.enableModality();
                setTimeout(() => {
                    DomHandler.focus(DomHandler.findSingle(this.container.nativeElement, '[data-pc-section="closebutton"]'));
                }, 25);
                break;
            case 'void':
                DomHandler.addClass(this.mask?.nativeElement, 'p-component-overlay-leave');
                break;
        }
    }
    onAnimationEnd(event) {
        switch (event.toState) {
            case 'void':
                this.disableModality();
                break;
        }
    }
    enableModality() {
        DomHandler.blockBodyScroll();
        this.cd.markForCheck();
        if (this.mask) {
            ZIndexUtils.set('modal', this.mask.nativeElement, this.baseZIndex || this.config.zIndex.modal);
        }
    }
    disableModality() {
        DomHandler.unblockBodyScroll();
        this.maskVisible = false;
        this.cd.markForCheck();
        if (this.mask) {
            ZIndexUtils.clear(this.mask.nativeElement);
        }
    }
    ngOnDestroy() {
        if (this.fullScreen) {
            DomHandler.removeClass(this.document.body, 'p-overflow-hidden');
        }
        if (this.mask) {
            this.disableModality();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: Galleria, deps: [{ token: DOCUMENT }, { token: PLATFORM_ID }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i1.PrimeNGConfig }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.5", type: Galleria, selector: "p-galleria", inputs: { activeIndex: "activeIndex", fullScreen: "fullScreen", id: "id", value: "value", numVisible: "numVisible", responsiveOptions: "responsiveOptions", showItemNavigators: "showItemNavigators", showThumbnailNavigators: "showThumbnailNavigators", showItemNavigatorsOnHover: "showItemNavigatorsOnHover", changeItemOnIndicatorHover: "changeItemOnIndicatorHover", circular: "circular", autoPlay: "autoPlay", shouldStopAutoplayByClick: "shouldStopAutoplayByClick", transitionInterval: "transitionInterval", showThumbnails: "showThumbnails", thumbnailsPosition: "thumbnailsPosition", verticalThumbnailViewPortHeight: "verticalThumbnailViewPortHeight", showIndicators: "showIndicators", showIndicatorsOnItem: "showIndicatorsOnItem", indicatorsPosition: "indicatorsPosition", baseZIndex: "baseZIndex", maskClass: "maskClass", containerClass: "containerClass", containerStyle: "containerStyle", showTransitionOptions: "showTransitionOptions", hideTransitionOptions: "hideTransitionOptions", visible: "visible" }, outputs: { activeIndexChange: "activeIndexChange", visibleChange: "visibleChange" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "mask", first: true, predicate: ["mask"], descendants: true }, { propertyName: "container", first: true, predicate: ["container"], descendants: true }], usesOnChanges: true, ngImport: i0, template: `
        <div *ngIf="fullScreen; else windowed" #container>
            <div
                *ngIf="maskVisible"
                #mask
                [ngClass]="{ 'p-galleria-mask p-component-overlay p-component-overlay-enter': true, 'p-galleria-visible': this.visible }"
                [class]="maskClass"
                [attr.role]="fullScreen ? 'dialog' : 'region'"
                [attr.aria-modal]="fullScreen ? 'true' : undefined"
            >
                <p-galleriaContent
                    *ngIf="visible"
                    [@animation]="{ value: 'visible', params: { showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions } }"
                    (@animation.start)="onAnimationStart($event)"
                    (@animation.done)="onAnimationEnd($event)"
                    [value]="value"
                    [activeIndex]="activeIndex"
                    [numVisible]="numVisible"
                    (maskHide)="onMaskHide()"
                    (activeItemChange)="onActiveItemChange($event)"
                    [ngStyle]="containerStyle"
                ></p-galleriaContent>
            </div>
        </div>

        <ng-template #windowed>
            <p-galleriaContent [value]="value" [activeIndex]="activeIndex" [numVisible]="numVisible" (activeItemChange)="onActiveItemChange($event)"></p-galleriaContent>
        </ng-template>
    `, isInline: true, styles: ["@layer primeng{.p-galleria-content{display:flex;flex-direction:column}.p-galleria-item-wrapper{display:flex;flex-direction:column;position:relative}.p-galleria-item-container{position:relative;display:flex;height:100%}.p-galleria-item-nav{position:absolute;top:50%;margin-top:-.5rem;display:inline-flex;justify-content:center;align-items:center;overflow:hidden}.p-galleria-item-prev{left:0;border-top-left-radius:0;border-bottom-left-radius:0}.p-galleria-item-next{right:0;border-top-right-radius:0;border-bottom-right-radius:0}.p-galleria-item{display:flex;justify-content:center;align-items:center;height:100%;width:100%}.p-galleria-item-nav-onhover .p-galleria-item-nav{pointer-events:none;opacity:0;transition:opacity .2s ease-in-out}.p-galleria-item-nav-onhover .p-galleria-item-wrapper:hover .p-galleria-item-nav{pointer-events:all;opacity:1}.p-galleria-item-nav-onhover .p-galleria-item-wrapper:hover .p-galleria-item-nav.p-disabled{pointer-events:none}.p-galleria-caption{position:absolute;bottom:0;left:0;width:100%}.p-galleria-thumbnail-wrapper{display:flex;flex-direction:column;overflow:auto;flex-shrink:0}.p-galleria-thumbnail-prev,.p-galleria-thumbnail-next{align-self:center;flex:0 0 auto;display:flex;justify-content:center;align-items:center;overflow:hidden;position:relative}.p-galleria-thumbnail-prev span,.p-galleria-thumbnail-next span{display:flex;justify-content:center;align-items:center}.p-galleria-thumbnail-container{display:flex;flex-direction:row}.p-galleria-thumbnail-items-container{overflow:hidden;width:100%}.p-galleria-thumbnail-items{display:flex}.p-galleria-thumbnail-item{overflow:auto;display:flex;align-items:center;justify-content:center;cursor:pointer;opacity:.5}.p-galleria-thumbnail-item:hover{opacity:1;transition:opacity .3s}.p-galleria-thumbnail-item-current{opacity:1}.p-galleria-thumbnails-left .p-galleria-content,.p-galleria-thumbnails-right .p-galleria-content,.p-galleria-thumbnails-left .p-galleria-item-wrapper,.p-galleria-thumbnails-right .p-galleria-item-wrapper{flex-direction:row}.p-galleria-thumbnails-left p-galleriaitem,.p-galleria-thumbnails-top p-galleriaitem{order:2}.p-galleria-thumbnails-left p-galleriathumbnails,.p-galleria-thumbnails-top p-galleriathumbnails{order:1}.p-galleria-thumbnails-left .p-galleria-thumbnail-container,.p-galleria-thumbnails-right .p-galleria-thumbnail-container{flex-direction:column;flex-grow:1}.p-galleria-thumbnails-left .p-galleria-thumbnail-items,.p-galleria-thumbnails-right .p-galleria-thumbnail-items{flex-direction:column;height:100%}.p-galleria-thumbnails-left .p-galleria-thumbnail-wrapper,.p-galleria-thumbnails-right .p-galleria-thumbnail-wrapper{height:100%}.p-galleria-indicators{display:flex;align-items:center;justify-content:center}.p-galleria-indicator>button{display:inline-flex;align-items:center}.p-galleria-indicators-left .p-galleria-item-wrapper,.p-galleria-indicators-right .p-galleria-item-wrapper{flex-direction:row;align-items:center}.p-galleria-indicators-left .p-galleria-item-container,.p-galleria-indicators-top .p-galleria-item-container{order:2}.p-galleria-indicators-left .p-galleria-indicators,.p-galleria-indicators-top .p-galleria-indicators{order:1}.p-galleria-indicators-left .p-galleria-indicators,.p-galleria-indicators-right .p-galleria-indicators{flex-direction:column}.p-galleria-indicator-onitem .p-galleria-indicators{position:absolute;display:flex;z-index:1}.p-galleria-indicator-onitem.p-galleria-indicators-top .p-galleria-indicators{top:0;left:0;width:100%;align-items:flex-start}.p-galleria-indicator-onitem.p-galleria-indicators-right .p-galleria-indicators{right:0;top:0;height:100%;align-items:flex-end}.p-galleria-indicator-onitem.p-galleria-indicators-bottom .p-galleria-indicators{bottom:0;left:0;width:100%;align-items:flex-end}.p-galleria-indicator-onitem.p-galleria-indicators-left .p-galleria-indicators{left:0;top:0;height:100%;align-items:flex-start}.p-galleria-mask{position:fixed;top:0;left:0;width:100%;height:100%;display:flex;align-items:center;justify-content:center;background-color:transparent;transition-property:background-color}.p-galleria-close{position:absolute;top:0;right:0;display:flex;justify-content:center;align-items:center;overflow:hidden}.p-galleria-mask .p-galleria-item-nav{position:fixed;top:50%;margin-top:-.5rem}.p-galleria-mask.p-galleria-mask-leave{background-color:transparent}.p-items-hidden .p-galleria-thumbnail-item{visibility:hidden}.p-items-hidden .p-galleria-thumbnail-item.p-galleria-thumbnail-item-active{visibility:visible}}\n"], dependencies: [{ kind: "directive", type: i0.forwardRef(() => i2.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgIf), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgStyle), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: i0.forwardRef(() => GalleriaContent), selector: "p-galleriaContent", inputs: ["activeIndex", "value", "numVisible"], outputs: ["maskHide", "activeItemChange"] }], animations: [
            trigger('animation', [
                transition('void => visible', [style({ transform: 'scale(0.7)', opacity: 0 }), animate('{{showTransitionParams}}')]),
                transition('visible => void', [animate('{{hideTransitionParams}}', style({ transform: 'scale(0.7)', opacity: 0 }))])
            ])
        ], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: Galleria, decorators: [{
            type: Component,
            args: [{ selector: 'p-galleria', template: `
        <div *ngIf="fullScreen; else windowed" #container>
            <div
                *ngIf="maskVisible"
                #mask
                [ngClass]="{ 'p-galleria-mask p-component-overlay p-component-overlay-enter': true, 'p-galleria-visible': this.visible }"
                [class]="maskClass"
                [attr.role]="fullScreen ? 'dialog' : 'region'"
                [attr.aria-modal]="fullScreen ? 'true' : undefined"
            >
                <p-galleriaContent
                    *ngIf="visible"
                    [@animation]="{ value: 'visible', params: { showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions } }"
                    (@animation.start)="onAnimationStart($event)"
                    (@animation.done)="onAnimationEnd($event)"
                    [value]="value"
                    [activeIndex]="activeIndex"
                    [numVisible]="numVisible"
                    (maskHide)="onMaskHide()"
                    (activeItemChange)="onActiveItemChange($event)"
                    [ngStyle]="containerStyle"
                ></p-galleriaContent>
            </div>
        </div>

        <ng-template #windowed>
            <p-galleriaContent [value]="value" [activeIndex]="activeIndex" [numVisible]="numVisible" (activeItemChange)="onActiveItemChange($event)"></p-galleriaContent>
        </ng-template>
    `, animations: [
                        trigger('animation', [
                            transition('void => visible', [style({ transform: 'scale(0.7)', opacity: 0 }), animate('{{showTransitionParams}}')]),
                            transition('visible => void', [animate('{{hideTransitionParams}}', style({ transform: 'scale(0.7)', opacity: 0 }))])
                        ])
                    ], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: ["@layer primeng{.p-galleria-content{display:flex;flex-direction:column}.p-galleria-item-wrapper{display:flex;flex-direction:column;position:relative}.p-galleria-item-container{position:relative;display:flex;height:100%}.p-galleria-item-nav{position:absolute;top:50%;margin-top:-.5rem;display:inline-flex;justify-content:center;align-items:center;overflow:hidden}.p-galleria-item-prev{left:0;border-top-left-radius:0;border-bottom-left-radius:0}.p-galleria-item-next{right:0;border-top-right-radius:0;border-bottom-right-radius:0}.p-galleria-item{display:flex;justify-content:center;align-items:center;height:100%;width:100%}.p-galleria-item-nav-onhover .p-galleria-item-nav{pointer-events:none;opacity:0;transition:opacity .2s ease-in-out}.p-galleria-item-nav-onhover .p-galleria-item-wrapper:hover .p-galleria-item-nav{pointer-events:all;opacity:1}.p-galleria-item-nav-onhover .p-galleria-item-wrapper:hover .p-galleria-item-nav.p-disabled{pointer-events:none}.p-galleria-caption{position:absolute;bottom:0;left:0;width:100%}.p-galleria-thumbnail-wrapper{display:flex;flex-direction:column;overflow:auto;flex-shrink:0}.p-galleria-thumbnail-prev,.p-galleria-thumbnail-next{align-self:center;flex:0 0 auto;display:flex;justify-content:center;align-items:center;overflow:hidden;position:relative}.p-galleria-thumbnail-prev span,.p-galleria-thumbnail-next span{display:flex;justify-content:center;align-items:center}.p-galleria-thumbnail-container{display:flex;flex-direction:row}.p-galleria-thumbnail-items-container{overflow:hidden;width:100%}.p-galleria-thumbnail-items{display:flex}.p-galleria-thumbnail-item{overflow:auto;display:flex;align-items:center;justify-content:center;cursor:pointer;opacity:.5}.p-galleria-thumbnail-item:hover{opacity:1;transition:opacity .3s}.p-galleria-thumbnail-item-current{opacity:1}.p-galleria-thumbnails-left .p-galleria-content,.p-galleria-thumbnails-right .p-galleria-content,.p-galleria-thumbnails-left .p-galleria-item-wrapper,.p-galleria-thumbnails-right .p-galleria-item-wrapper{flex-direction:row}.p-galleria-thumbnails-left p-galleriaitem,.p-galleria-thumbnails-top p-galleriaitem{order:2}.p-galleria-thumbnails-left p-galleriathumbnails,.p-galleria-thumbnails-top p-galleriathumbnails{order:1}.p-galleria-thumbnails-left .p-galleria-thumbnail-container,.p-galleria-thumbnails-right .p-galleria-thumbnail-container{flex-direction:column;flex-grow:1}.p-galleria-thumbnails-left .p-galleria-thumbnail-items,.p-galleria-thumbnails-right .p-galleria-thumbnail-items{flex-direction:column;height:100%}.p-galleria-thumbnails-left .p-galleria-thumbnail-wrapper,.p-galleria-thumbnails-right .p-galleria-thumbnail-wrapper{height:100%}.p-galleria-indicators{display:flex;align-items:center;justify-content:center}.p-galleria-indicator>button{display:inline-flex;align-items:center}.p-galleria-indicators-left .p-galleria-item-wrapper,.p-galleria-indicators-right .p-galleria-item-wrapper{flex-direction:row;align-items:center}.p-galleria-indicators-left .p-galleria-item-container,.p-galleria-indicators-top .p-galleria-item-container{order:2}.p-galleria-indicators-left .p-galleria-indicators,.p-galleria-indicators-top .p-galleria-indicators{order:1}.p-galleria-indicators-left .p-galleria-indicators,.p-galleria-indicators-right .p-galleria-indicators{flex-direction:column}.p-galleria-indicator-onitem .p-galleria-indicators{position:absolute;display:flex;z-index:1}.p-galleria-indicator-onitem.p-galleria-indicators-top .p-galleria-indicators{top:0;left:0;width:100%;align-items:flex-start}.p-galleria-indicator-onitem.p-galleria-indicators-right .p-galleria-indicators{right:0;top:0;height:100%;align-items:flex-end}.p-galleria-indicator-onitem.p-galleria-indicators-bottom .p-galleria-indicators{bottom:0;left:0;width:100%;align-items:flex-end}.p-galleria-indicator-onitem.p-galleria-indicators-left .p-galleria-indicators{left:0;top:0;height:100%;align-items:flex-start}.p-galleria-mask{position:fixed;top:0;left:0;width:100%;height:100%;display:flex;align-items:center;justify-content:center;background-color:transparent;transition-property:background-color}.p-galleria-close{position:absolute;top:0;right:0;display:flex;justify-content:center;align-items:center;overflow:hidden}.p-galleria-mask .p-galleria-item-nav{position:fixed;top:50%;margin-top:-.5rem}.p-galleria-mask.p-galleria-mask-leave{background-color:transparent}.p-items-hidden .p-galleria-thumbnail-item{visibility:hidden}.p-items-hidden .p-galleria-thumbnail-item.p-galleria-thumbnail-item-active{visibility:visible}}\n"] }]
        }], ctorParameters: () => [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i1.PrimeNGConfig }], propDecorators: { activeIndex: [{
                type: Input
            }], fullScreen: [{
                type: Input
            }], id: [{
                type: Input
            }], value: [{
                type: Input
            }], numVisible: [{
                type: Input
            }], responsiveOptions: [{
                type: Input
            }], showItemNavigators: [{
                type: Input
            }], showThumbnailNavigators: [{
                type: Input
            }], showItemNavigatorsOnHover: [{
                type: Input
            }], changeItemOnIndicatorHover: [{
                type: Input
            }], circular: [{
                type: Input
            }], autoPlay: [{
                type: Input
            }], shouldStopAutoplayByClick: [{
                type: Input
            }], transitionInterval: [{
                type: Input
            }], showThumbnails: [{
                type: Input
            }], thumbnailsPosition: [{
                type: Input
            }], verticalThumbnailViewPortHeight: [{
                type: Input
            }], showIndicators: [{
                type: Input
            }], showIndicatorsOnItem: [{
                type: Input
            }], indicatorsPosition: [{
                type: Input
            }], baseZIndex: [{
                type: Input
            }], maskClass: [{
                type: Input
            }], containerClass: [{
                type: Input
            }], containerStyle: [{
                type: Input
            }], showTransitionOptions: [{
                type: Input
            }], hideTransitionOptions: [{
                type: Input
            }], visible: [{
                type: Input
            }], activeIndexChange: [{
                type: Output
            }], visibleChange: [{
                type: Output
            }], mask: [{
                type: ViewChild,
                args: ['mask']
            }], container: [{
                type: ViewChild,
                args: ['container']
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
export class GalleriaContent {
    galleria;
    cd;
    differs;
    config;
    get activeIndex() {
        return this._activeIndex;
    }
    set activeIndex(activeIndex) {
        this._activeIndex = activeIndex;
    }
    value = [];
    numVisible;
    maskHide = new EventEmitter();
    activeItemChange = new EventEmitter();
    closeButton;
    id;
    _activeIndex = 0;
    slideShowActive = true;
    interval;
    styleClass;
    differ;
    constructor(galleria, cd, differs, config) {
        this.galleria = galleria;
        this.cd = cd;
        this.differs = differs;
        this.config = config;
        this.id = this.galleria.id || UniqueComponentId();
        this.differ = this.differs.find(this.galleria).create();
    }
    ngDoCheck() {
        if (isPlatformBrowser(this.galleria.platformId)) {
            const changes = this.differ.diff(this.galleria);
            if (changes && changes.forEachItem.length > 0) {
                // Because we change the properties of the parent component,
                // and the children take our entity from the injector.
                // We can tell the children to redraw themselves when we change the properties of the parent component.
                // Since we have an onPush strategy
                this.cd.markForCheck();
            }
        }
    }
    galleriaClass() {
        const thumbnailsPosClass = this.galleria.showThumbnails && this.getPositionClass('p-galleria-thumbnails', this.galleria.thumbnailsPosition);
        const indicatorPosClass = this.galleria.showIndicators && this.getPositionClass('p-galleria-indicators', this.galleria.indicatorsPosition);
        return (this.galleria.containerClass ? this.galleria.containerClass + ' ' : '') + (thumbnailsPosClass ? thumbnailsPosClass + ' ' : '') + (indicatorPosClass ? indicatorPosClass + ' ' : '');
    }
    startSlideShow() {
        if (isPlatformBrowser(this.galleria.platformId)) {
            this.interval = setInterval(() => {
                let activeIndex = this.galleria.circular && this.value.length - 1 === this.activeIndex ? 0 : this.activeIndex + 1;
                this.onActiveIndexChange(activeIndex);
                this.activeIndex = activeIndex;
            }, this.galleria.transitionInterval);
            this.slideShowActive = true;
        }
    }
    stopSlideShow() {
        if (this.galleria.autoPlay && !this.galleria.shouldStopAutoplayByClick) {
            return;
        }
        if (this.interval) {
            clearInterval(this.interval);
        }
        this.slideShowActive = false;
    }
    getPositionClass(preClassName, position) {
        const positions = ['top', 'left', 'bottom', 'right'];
        const pos = positions.find((item) => item === position);
        return pos ? `${preClassName}-${pos}` : '';
    }
    isVertical() {
        return this.galleria.thumbnailsPosition === 'left' || this.galleria.thumbnailsPosition === 'right';
    }
    onActiveIndexChange(index) {
        if (this.activeIndex !== index) {
            this.activeIndex = index;
            this.activeItemChange.emit(this.activeIndex);
        }
    }
    closeAriaLabel() {
        return this.config.translation.aria ? this.config.translation.aria.close : undefined;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: GalleriaContent, deps: [{ token: Galleria }, { token: i0.ChangeDetectorRef }, { token: i0.KeyValueDiffers }, { token: i1.PrimeNGConfig }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.5", type: GalleriaContent, selector: "p-galleriaContent", inputs: { activeIndex: "activeIndex", value: "value", numVisible: "numVisible" }, outputs: { maskHide: "maskHide", activeItemChange: "activeItemChange" }, viewQueries: [{ propertyName: "closeButton", first: true, predicate: ["closeButton"], descendants: true }], ngImport: i0, template: `
        <div
            [attr.id]="id"
            [attr.role]="'region'"
            *ngIf="value && value.length > 0"
            [ngClass]="{
                'p-galleria p-component': true,
                'p-galleria-fullscreen': this.galleria.fullScreen,
                'p-galleria-indicator-onitem': this.galleria.showIndicatorsOnItem,
                'p-galleria-item-nav-onhover': this.galleria.showItemNavigatorsOnHover && !this.galleria.fullScreen
            }"
            [ngStyle]="!galleria.fullScreen ? galleria.containerStyle : {}"
            [class]="galleriaClass()"
            pFocusTrap
        >
            <button *ngIf="galleria.fullScreen" type="button" class="p-galleria-close p-link" (click)="maskHide.emit()" pRipple [attr.aria-label]="closeAriaLabel()" [attr.data-pc-section]="'closebutton'">
                <TimesIcon *ngIf="!galleria.closeIconTemplate" [styleClass]="'p-galleria-close-icon'" />
                <ng-template *ngTemplateOutlet="galleria.closeIconTemplate"></ng-template>
            </button>
            <div *ngIf="galleria.templates && galleria.headerFacet" class="p-galleria-header">
                <p-galleriaItemSlot type="header" [templates]="galleria.templates"></p-galleriaItemSlot>
            </div>
            <div class="p-galleria-content" [attr.aria-live]="galleria.autoPlay ? 'polite' : 'off'">
                <p-galleriaItem
                    [id]="id"
                    [value]="value"
                    [activeIndex]="activeIndex"
                    [circular]="galleria.circular"
                    [templates]="galleria.templates"
                    (onActiveIndexChange)="onActiveIndexChange($event)"
                    [showIndicators]="galleria.showIndicators"
                    [changeItemOnIndicatorHover]="galleria.changeItemOnIndicatorHover"
                    [indicatorFacet]="galleria.indicatorFacet"
                    [captionFacet]="galleria.captionFacet"
                    [showItemNavigators]="galleria.showItemNavigators"
                    [autoPlay]="galleria.autoPlay"
                    [slideShowActive]="slideShowActive"
                    (startSlideShow)="startSlideShow()"
                    (stopSlideShow)="stopSlideShow()"
                ></p-galleriaItem>

                <p-galleriaThumbnails
                    *ngIf="galleria.showThumbnails"
                    [containerId]="id"
                    [value]="value"
                    (onActiveIndexChange)="onActiveIndexChange($event)"
                    [activeIndex]="activeIndex"
                    [templates]="galleria.templates"
                    [numVisible]="numVisible"
                    [responsiveOptions]="galleria.responsiveOptions"
                    [circular]="galleria.circular"
                    [isVertical]="isVertical()"
                    [contentHeight]="galleria.verticalThumbnailViewPortHeight"
                    [showThumbnailNavigators]="galleria.showThumbnailNavigators"
                    [slideShowActive]="slideShowActive"
                    (stopSlideShow)="stopSlideShow()"
                ></p-galleriaThumbnails>
            </div>
            <div *ngIf="galleria.templates && galleria.footerFacet" class="p-galleria-footer">
                <p-galleriaItemSlot type="footer" [templates]="galleria.templates"></p-galleriaItemSlot>
            </div>
        </div>
    `, isInline: true, dependencies: [{ kind: "directive", type: i0.forwardRef(() => i2.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgIf), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgStyle), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i0.forwardRef(() => i3.Ripple), selector: "[pRipple]" }, { kind: "component", type: i0.forwardRef(() => TimesIcon), selector: "TimesIcon" }, { kind: "directive", type: i0.forwardRef(() => i4.FocusTrap), selector: "[pFocusTrap]", inputs: ["pFocusTrapDisabled"] }, { kind: "component", type: i0.forwardRef(() => GalleriaItemSlot), selector: "p-galleriaItemSlot", inputs: ["templates", "index", "item", "type"] }, { kind: "component", type: i0.forwardRef(() => GalleriaItem), selector: "p-galleriaItem", inputs: ["id", "circular", "value", "showItemNavigators", "showIndicators", "slideShowActive", "changeItemOnIndicatorHover", "autoPlay", "templates", "indicatorFacet", "captionFacet", "activeIndex"], outputs: ["startSlideShow", "stopSlideShow", "onActiveIndexChange"] }, { kind: "component", type: i0.forwardRef(() => GalleriaThumbnails), selector: "p-galleriaThumbnails", inputs: ["containerId", "value", "isVertical", "slideShowActive", "circular", "responsiveOptions", "contentHeight", "showThumbnailNavigators", "templates", "numVisible", "activeIndex"], outputs: ["onActiveIndexChange", "stopSlideShow"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: GalleriaContent, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-galleriaContent',
                    template: `
        <div
            [attr.id]="id"
            [attr.role]="'region'"
            *ngIf="value && value.length > 0"
            [ngClass]="{
                'p-galleria p-component': true,
                'p-galleria-fullscreen': this.galleria.fullScreen,
                'p-galleria-indicator-onitem': this.galleria.showIndicatorsOnItem,
                'p-galleria-item-nav-onhover': this.galleria.showItemNavigatorsOnHover && !this.galleria.fullScreen
            }"
            [ngStyle]="!galleria.fullScreen ? galleria.containerStyle : {}"
            [class]="galleriaClass()"
            pFocusTrap
        >
            <button *ngIf="galleria.fullScreen" type="button" class="p-galleria-close p-link" (click)="maskHide.emit()" pRipple [attr.aria-label]="closeAriaLabel()" [attr.data-pc-section]="'closebutton'">
                <TimesIcon *ngIf="!galleria.closeIconTemplate" [styleClass]="'p-galleria-close-icon'" />
                <ng-template *ngTemplateOutlet="galleria.closeIconTemplate"></ng-template>
            </button>
            <div *ngIf="galleria.templates && galleria.headerFacet" class="p-galleria-header">
                <p-galleriaItemSlot type="header" [templates]="galleria.templates"></p-galleriaItemSlot>
            </div>
            <div class="p-galleria-content" [attr.aria-live]="galleria.autoPlay ? 'polite' : 'off'">
                <p-galleriaItem
                    [id]="id"
                    [value]="value"
                    [activeIndex]="activeIndex"
                    [circular]="galleria.circular"
                    [templates]="galleria.templates"
                    (onActiveIndexChange)="onActiveIndexChange($event)"
                    [showIndicators]="galleria.showIndicators"
                    [changeItemOnIndicatorHover]="galleria.changeItemOnIndicatorHover"
                    [indicatorFacet]="galleria.indicatorFacet"
                    [captionFacet]="galleria.captionFacet"
                    [showItemNavigators]="galleria.showItemNavigators"
                    [autoPlay]="galleria.autoPlay"
                    [slideShowActive]="slideShowActive"
                    (startSlideShow)="startSlideShow()"
                    (stopSlideShow)="stopSlideShow()"
                ></p-galleriaItem>

                <p-galleriaThumbnails
                    *ngIf="galleria.showThumbnails"
                    [containerId]="id"
                    [value]="value"
                    (onActiveIndexChange)="onActiveIndexChange($event)"
                    [activeIndex]="activeIndex"
                    [templates]="galleria.templates"
                    [numVisible]="numVisible"
                    [responsiveOptions]="galleria.responsiveOptions"
                    [circular]="galleria.circular"
                    [isVertical]="isVertical()"
                    [contentHeight]="galleria.verticalThumbnailViewPortHeight"
                    [showThumbnailNavigators]="galleria.showThumbnailNavigators"
                    [slideShowActive]="slideShowActive"
                    (stopSlideShow)="stopSlideShow()"
                ></p-galleriaThumbnails>
            </div>
            <div *ngIf="galleria.templates && galleria.footerFacet" class="p-galleria-footer">
                <p-galleriaItemSlot type="footer" [templates]="galleria.templates"></p-galleriaItemSlot>
            </div>
        </div>
    `,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: () => [{ type: Galleria }, { type: i0.ChangeDetectorRef }, { type: i0.KeyValueDiffers }, { type: i1.PrimeNGConfig }], propDecorators: { activeIndex: [{
                type: Input
            }], value: [{
                type: Input
            }], numVisible: [{
                type: Input
            }], maskHide: [{
                type: Output
            }], activeItemChange: [{
                type: Output
            }], closeButton: [{
                type: ViewChild,
                args: ['closeButton']
            }] } });
export class GalleriaItemSlot {
    templates;
    index;
    get item() {
        return this._item;
    }
    set item(item) {
        this._item = item;
        if (this.templates) {
            this.templates.forEach((item) => {
                if (item.getType() === this.type) {
                    switch (this.type) {
                        case 'item':
                        case 'caption':
                        case 'thumbnail':
                            this.context = { $implicit: this.item };
                            this.contentTemplate = item.template;
                            break;
                    }
                }
            });
        }
    }
    type;
    contentTemplate;
    context;
    _item;
    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            if (item.getType() === this.type) {
                switch (this.type) {
                    case 'item':
                    case 'caption':
                    case 'thumbnail':
                        this.context = { $implicit: this.item };
                        this.contentTemplate = item.template;
                        break;
                    case 'indicator':
                        this.context = { $implicit: this.index };
                        this.contentTemplate = item.template;
                        break;
                    default:
                        this.context = {};
                        this.contentTemplate = item.template;
                        break;
                }
            }
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: GalleriaItemSlot, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.5", type: GalleriaItemSlot, selector: "p-galleriaItemSlot", inputs: { templates: "templates", index: "index", item: "item", type: "type" }, ngImport: i0, template: `
        <ng-container *ngIf="contentTemplate">
            <ng-container *ngTemplateOutlet="contentTemplate; context: context"></ng-container>
        </ng-container>
    `, isInline: true, dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: GalleriaItemSlot, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-galleriaItemSlot',
                    template: `
        <ng-container *ngIf="contentTemplate">
            <ng-container *ngTemplateOutlet="contentTemplate; context: context"></ng-container>
        </ng-container>
    `,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], propDecorators: { templates: [{
                type: Input
            }], index: [{
                type: Input
            }], item: [{
                type: Input
            }], type: [{
                type: Input
            }] } });
export class GalleriaItem {
    galleria;
    id;
    circular = false;
    value;
    showItemNavigators = false;
    showIndicators = true;
    slideShowActive = true;
    changeItemOnIndicatorHover = true;
    autoPlay = false;
    templates;
    indicatorFacet;
    captionFacet;
    startSlideShow = new EventEmitter();
    stopSlideShow = new EventEmitter();
    onActiveIndexChange = new EventEmitter();
    get activeIndex() {
        return this._activeIndex;
    }
    set activeIndex(activeIndex) {
        this._activeIndex = activeIndex;
    }
    get activeItem() {
        return this.value && this.value[this._activeIndex];
    }
    _activeIndex = 0;
    constructor(galleria) {
        this.galleria = galleria;
    }
    ngOnChanges({ autoPlay }) {
        if (autoPlay?.currentValue) {
            this.startSlideShow.emit();
        }
        if (autoPlay && autoPlay.currentValue === false) {
            this.stopTheSlideShow();
        }
    }
    next() {
        let nextItemIndex = this.activeIndex + 1;
        let activeIndex = this.circular && this.value.length - 1 === this.activeIndex ? 0 : nextItemIndex;
        this.onActiveIndexChange.emit(activeIndex);
    }
    prev() {
        let prevItemIndex = this.activeIndex !== 0 ? this.activeIndex - 1 : 0;
        let activeIndex = this.circular && this.activeIndex === 0 ? this.value.length - 1 : prevItemIndex;
        this.onActiveIndexChange.emit(activeIndex);
    }
    stopTheSlideShow() {
        if (this.slideShowActive && this.stopSlideShow) {
            this.stopSlideShow.emit();
        }
    }
    navForward(e) {
        this.stopTheSlideShow();
        this.next();
        if (e && e.cancelable) {
            e.preventDefault();
        }
    }
    navBackward(e) {
        this.stopTheSlideShow();
        this.prev();
        if (e && e.cancelable) {
            e.preventDefault();
        }
    }
    onIndicatorClick(index) {
        this.stopTheSlideShow();
        this.onActiveIndexChange.emit(index);
    }
    onIndicatorMouseEnter(index) {
        if (this.changeItemOnIndicatorHover) {
            this.stopTheSlideShow();
            this.onActiveIndexChange.emit(index);
        }
    }
    onIndicatorKeyDown(event, index) {
        switch (event.code) {
            case 'Enter':
            case 'Space':
                this.stopTheSlideShow();
                this.onActiveIndexChange.emit(index);
                event.preventDefault();
                break;
            case 'ArrowDown':
            case 'ArrowUp':
                event.preventDefault();
                break;
            default:
                break;
        }
    }
    isNavForwardDisabled() {
        return !this.circular && this.activeIndex === this.value.length - 1;
    }
    isNavBackwardDisabled() {
        return !this.circular && this.activeIndex === 0;
    }
    isIndicatorItemActive(index) {
        return this.activeIndex === index;
    }
    ariaSlideLabel() {
        return this.galleria.config.translation.aria ? this.galleria.config.translation.aria.slide : undefined;
    }
    ariaSlideNumber(value) {
        return this.galleria.config.translation.aria ? this.galleria.config.translation.aria.slideNumber.replace(/{slideNumber}/g, value) : undefined;
    }
    ariaPageLabel(value) {
        return this.galleria.config.translation.aria ? this.galleria.config.translation.aria.pageLabel.replace(/{page}/g, value) : undefined;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: GalleriaItem, deps: [{ token: Galleria }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.5", type: GalleriaItem, selector: "p-galleriaItem", inputs: { id: "id", circular: "circular", value: "value", showItemNavigators: "showItemNavigators", showIndicators: "showIndicators", slideShowActive: "slideShowActive", changeItemOnIndicatorHover: "changeItemOnIndicatorHover", autoPlay: "autoPlay", templates: "templates", indicatorFacet: "indicatorFacet", captionFacet: "captionFacet", activeIndex: "activeIndex" }, outputs: { startSlideShow: "startSlideShow", stopSlideShow: "stopSlideShow", onActiveIndexChange: "onActiveIndexChange" }, usesOnChanges: true, ngImport: i0, template: `
        <div class="p-galleria-item-wrapper">
            <div class="p-galleria-item-container">
                <button
                    *ngIf="showItemNavigators"
                    type="button"
                    role="navigation"
                    [ngClass]="{ 'p-galleria-item-prev p-galleria-item-nav p-link': true, 'p-disabled': this.isNavBackwardDisabled() }"
                    (click)="navBackward($event)"
                    [disabled]="isNavBackwardDisabled()"
                    pRipple
                >
                    <ChevronLeftIcon *ngIf="!galleria.itemPreviousIconTemplate" [styleClass]="'p-galleria-item-prev-icon'" />
                    <ng-template *ngTemplateOutlet="galleria.itemPreviousIconTemplate"></ng-template>
                </button>
                <div [id]="id + '_item_' + activeIndex" role="group" [attr.aria-label]="ariaSlideNumber(activeIndex + 1)" [attr.aria-roledescription]="ariaSlideLabel()" [style.width]="'100%'">
                    <p-galleriaItemSlot type="item" [item]="activeItem" [templates]="templates" class="p-galleria-item"></p-galleriaItemSlot>
                </div>
                <button
                    *ngIf="showItemNavigators"
                    type="button"
                    [ngClass]="{ 'p-galleria-item-next p-galleria-item-nav p-link': true, 'p-disabled': this.isNavForwardDisabled() }"
                    (click)="navForward($event)"
                    [disabled]="isNavForwardDisabled()"
                    pRipple
                    role="navigation"
                >
                    <ChevronRightIcon *ngIf="!galleria.itemNextIconTemplate" [styleClass]="'p-galleria-item-next-icon'" />
                    <ng-template *ngTemplateOutlet="galleria.itemNextIconTemplate"></ng-template>
                </button>
                <div class="p-galleria-caption" *ngIf="captionFacet">
                    <p-galleriaItemSlot type="caption" [item]="activeItem" [templates]="templates"></p-galleriaItemSlot>
                </div>
            </div>
            <ul *ngIf="showIndicators" class="p-galleria-indicators p-reset">
                <li
                    *ngFor="let item of value; let index = index"
                    tabindex="0"
                    (click)="onIndicatorClick(index)"
                    (mouseenter)="onIndicatorMouseEnter(index)"
                    (keydown)="onIndicatorKeyDown($event, index)"
                    [ngClass]="{ 'p-galleria-indicator': true, 'p-highlight': isIndicatorItemActive(index) }"
                    [attr.aria-label]="ariaPageLabel(index + 1)"
                    [attr.aria-selected]="activeIndex === index"
                    [attr.aria-controls]="id + '_item_' + index"
                >
                    <button type="button" tabIndex="-1" class="p-link" *ngIf="!indicatorFacet"></button>
                    <p-galleriaItemSlot type="indicator" [index]="index" [templates]="templates"></p-galleriaItemSlot>
                </li>
            </ul>
        </div>
    `, isInline: true, dependencies: [{ kind: "directive", type: i0.forwardRef(() => i2.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgForOf), selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgIf), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(() => i3.Ripple), selector: "[pRipple]" }, { kind: "component", type: i0.forwardRef(() => ChevronRightIcon), selector: "ChevronRightIcon" }, { kind: "component", type: i0.forwardRef(() => ChevronLeftIcon), selector: "ChevronLeftIcon" }, { kind: "component", type: i0.forwardRef(() => GalleriaItemSlot), selector: "p-galleriaItemSlot", inputs: ["templates", "index", "item", "type"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: GalleriaItem, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-galleriaItem',
                    template: `
        <div class="p-galleria-item-wrapper">
            <div class="p-galleria-item-container">
                <button
                    *ngIf="showItemNavigators"
                    type="button"
                    role="navigation"
                    [ngClass]="{ 'p-galleria-item-prev p-galleria-item-nav p-link': true, 'p-disabled': this.isNavBackwardDisabled() }"
                    (click)="navBackward($event)"
                    [disabled]="isNavBackwardDisabled()"
                    pRipple
                >
                    <ChevronLeftIcon *ngIf="!galleria.itemPreviousIconTemplate" [styleClass]="'p-galleria-item-prev-icon'" />
                    <ng-template *ngTemplateOutlet="galleria.itemPreviousIconTemplate"></ng-template>
                </button>
                <div [id]="id + '_item_' + activeIndex" role="group" [attr.aria-label]="ariaSlideNumber(activeIndex + 1)" [attr.aria-roledescription]="ariaSlideLabel()" [style.width]="'100%'">
                    <p-galleriaItemSlot type="item" [item]="activeItem" [templates]="templates" class="p-galleria-item"></p-galleriaItemSlot>
                </div>
                <button
                    *ngIf="showItemNavigators"
                    type="button"
                    [ngClass]="{ 'p-galleria-item-next p-galleria-item-nav p-link': true, 'p-disabled': this.isNavForwardDisabled() }"
                    (click)="navForward($event)"
                    [disabled]="isNavForwardDisabled()"
                    pRipple
                    role="navigation"
                >
                    <ChevronRightIcon *ngIf="!galleria.itemNextIconTemplate" [styleClass]="'p-galleria-item-next-icon'" />
                    <ng-template *ngTemplateOutlet="galleria.itemNextIconTemplate"></ng-template>
                </button>
                <div class="p-galleria-caption" *ngIf="captionFacet">
                    <p-galleriaItemSlot type="caption" [item]="activeItem" [templates]="templates"></p-galleriaItemSlot>
                </div>
            </div>
            <ul *ngIf="showIndicators" class="p-galleria-indicators p-reset">
                <li
                    *ngFor="let item of value; let index = index"
                    tabindex="0"
                    (click)="onIndicatorClick(index)"
                    (mouseenter)="onIndicatorMouseEnter(index)"
                    (keydown)="onIndicatorKeyDown($event, index)"
                    [ngClass]="{ 'p-galleria-indicator': true, 'p-highlight': isIndicatorItemActive(index) }"
                    [attr.aria-label]="ariaPageLabel(index + 1)"
                    [attr.aria-selected]="activeIndex === index"
                    [attr.aria-controls]="id + '_item_' + index"
                >
                    <button type="button" tabIndex="-1" class="p-link" *ngIf="!indicatorFacet"></button>
                    <p-galleriaItemSlot type="indicator" [index]="index" [templates]="templates"></p-galleriaItemSlot>
                </li>
            </ul>
        </div>
    `,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: () => [{ type: Galleria }], propDecorators: { id: [{
                type: Input
            }], circular: [{
                type: Input
            }], value: [{
                type: Input
            }], showItemNavigators: [{
                type: Input
            }], showIndicators: [{
                type: Input
            }], slideShowActive: [{
                type: Input
            }], changeItemOnIndicatorHover: [{
                type: Input
            }], autoPlay: [{
                type: Input
            }], templates: [{
                type: Input
            }], indicatorFacet: [{
                type: Input
            }], captionFacet: [{
                type: Input
            }], startSlideShow: [{
                type: Output
            }], stopSlideShow: [{
                type: Output
            }], onActiveIndexChange: [{
                type: Output
            }], activeIndex: [{
                type: Input
            }] } });
export class GalleriaThumbnails {
    galleria;
    document;
    platformId;
    renderer;
    cd;
    containerId;
    value;
    isVertical = false;
    slideShowActive = false;
    circular = false;
    responsiveOptions;
    contentHeight = '300px';
    showThumbnailNavigators = true;
    templates;
    onActiveIndexChange = new EventEmitter();
    stopSlideShow = new EventEmitter();
    itemsContainer;
    get numVisible() {
        return this._numVisible;
    }
    set numVisible(numVisible) {
        this._numVisible = numVisible;
        this._oldNumVisible = this.d_numVisible;
        this.d_numVisible = numVisible;
    }
    get activeIndex() {
        return this._activeIndex;
    }
    set activeIndex(activeIndex) {
        this._oldactiveIndex = this._activeIndex;
        this._activeIndex = activeIndex;
    }
    index;
    startPos = null;
    thumbnailsStyle = null;
    sortedResponsiveOptions = null;
    totalShiftedItems = 0;
    page = 0;
    documentResizeListener;
    _numVisible = 0;
    d_numVisible = 0;
    _oldNumVisible = 0;
    _activeIndex = 0;
    _oldactiveIndex = 0;
    constructor(galleria, document, platformId, renderer, cd) {
        this.galleria = galleria;
        this.document = document;
        this.platformId = platformId;
        this.renderer = renderer;
        this.cd = cd;
    }
    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.createStyle();
            if (this.responsiveOptions) {
                this.bindDocumentListeners();
            }
        }
    }
    ngAfterContentChecked() {
        let totalShiftedItems = this.totalShiftedItems;
        if ((this._oldNumVisible !== this.d_numVisible || this._oldactiveIndex !== this._activeIndex) && this.itemsContainer) {
            if (this._activeIndex <= this.getMedianItemIndex()) {
                totalShiftedItems = 0;
            }
            else if (this.value.length - this.d_numVisible + this.getMedianItemIndex() < this._activeIndex) {
                totalShiftedItems = this.d_numVisible - this.value.length;
            }
            else if (this.value.length - this.d_numVisible < this._activeIndex && this.d_numVisible % 2 === 0) {
                totalShiftedItems = this._activeIndex * -1 + this.getMedianItemIndex() + 1;
            }
            else {
                totalShiftedItems = this._activeIndex * -1 + this.getMedianItemIndex();
            }
            if (totalShiftedItems !== this.totalShiftedItems) {
                this.totalShiftedItems = totalShiftedItems;
            }
            if (this.itemsContainer && this.itemsContainer.nativeElement) {
                this.itemsContainer.nativeElement.style.transform = this.isVertical ? `translate3d(0, ${totalShiftedItems * (100 / this.d_numVisible)}%, 0)` : `translate3d(${totalShiftedItems * (100 / this.d_numVisible)}%, 0, 0)`;
            }
            if (this._oldactiveIndex !== this._activeIndex) {
                DomHandler.removeClass(this.itemsContainer.nativeElement, 'p-items-hidden');
                this.itemsContainer.nativeElement.style.transition = 'transform 500ms ease 0s';
            }
            this._oldactiveIndex = this._activeIndex;
            this._oldNumVisible = this.d_numVisible;
        }
    }
    ngAfterViewInit() {
        if (platformBrowser(this.platformId)) {
            this.calculatePosition();
        }
    }
    createStyle() {
        if (!this.thumbnailsStyle) {
            this.thumbnailsStyle = this.document.createElement('style');
            this.document.body.appendChild(this.thumbnailsStyle);
        }
        let innerHTML = `
            #${this.containerId} .p-galleria-thumbnail-item {
                flex: 1 0 ${100 / this.d_numVisible}%
            }
        `;
        if (this.responsiveOptions) {
            this.sortedResponsiveOptions = [...this.responsiveOptions];
            this.sortedResponsiveOptions.sort((data1, data2) => {
                const value1 = data1.breakpoint;
                const value2 = data2.breakpoint;
                let result = null;
                if (value1 == null && value2 != null)
                    result = -1;
                else if (value1 != null && value2 == null)
                    result = 1;
                else if (value1 == null && value2 == null)
                    result = 0;
                else if (typeof value1 === 'string' && typeof value2 === 'string')
                    result = value1.localeCompare(value2, undefined, { numeric: true });
                else
                    result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
                return -1 * result;
            });
            for (let i = 0; i < this.sortedResponsiveOptions.length; i++) {
                let res = this.sortedResponsiveOptions[i];
                innerHTML += `
                    @media screen and (max-width: ${res.breakpoint}) {
                        #${this.containerId} .p-galleria-thumbnail-item {
                            flex: 1 0 ${100 / res.numVisible}%
                        }
                    }
                `;
            }
        }
        this.thumbnailsStyle.innerHTML = innerHTML;
    }
    calculatePosition() {
        if (isPlatformBrowser(this.platformId)) {
            if (this.itemsContainer && this.sortedResponsiveOptions) {
                let windowWidth = window.innerWidth;
                let matchedResponsiveData = {
                    numVisible: this._numVisible
                };
                for (let i = 0; i < this.sortedResponsiveOptions.length; i++) {
                    let res = this.sortedResponsiveOptions[i];
                    if (parseInt(res.breakpoint, 10) >= windowWidth) {
                        matchedResponsiveData = res;
                    }
                }
                if (this.d_numVisible !== matchedResponsiveData.numVisible) {
                    this.d_numVisible = matchedResponsiveData.numVisible;
                    this.cd.markForCheck();
                }
            }
        }
    }
    getTabIndex(index) {
        return this.isItemActive(index) ? 0 : null;
    }
    navForward(e) {
        this.stopTheSlideShow();
        let nextItemIndex = this._activeIndex + 1;
        if (nextItemIndex + this.totalShiftedItems > this.getMedianItemIndex() && (-1 * this.totalShiftedItems < this.getTotalPageNumber() - 1 || this.circular)) {
            this.step(-1);
        }
        let activeIndex = this.circular && this.value.length - 1 === this._activeIndex ? 0 : nextItemIndex;
        this.onActiveIndexChange.emit(activeIndex);
        if (e.cancelable) {
            e.preventDefault();
        }
    }
    navBackward(e) {
        this.stopTheSlideShow();
        let prevItemIndex = this._activeIndex !== 0 ? this._activeIndex - 1 : 0;
        let diff = prevItemIndex + this.totalShiftedItems;
        if (this.d_numVisible - diff - 1 > this.getMedianItemIndex() && (-1 * this.totalShiftedItems !== 0 || this.circular)) {
            this.step(1);
        }
        let activeIndex = this.circular && this._activeIndex === 0 ? this.value.length - 1 : prevItemIndex;
        this.onActiveIndexChange.emit(activeIndex);
        if (e.cancelable) {
            e.preventDefault();
        }
    }
    onItemClick(index) {
        this.stopTheSlideShow();
        let selectedItemIndex = index;
        if (selectedItemIndex !== this._activeIndex) {
            const diff = selectedItemIndex + this.totalShiftedItems;
            let dir = 0;
            if (selectedItemIndex < this._activeIndex) {
                dir = this.d_numVisible - diff - 1 - this.getMedianItemIndex();
                if (dir > 0 && -1 * this.totalShiftedItems !== 0) {
                    this.step(dir);
                }
            }
            else {
                dir = this.getMedianItemIndex() - diff;
                if (dir < 0 && -1 * this.totalShiftedItems < this.getTotalPageNumber() - 1) {
                    this.step(dir);
                }
            }
            this.activeIndex = selectedItemIndex;
            this.onActiveIndexChange.emit(this.activeIndex);
        }
    }
    onThumbnailKeydown(event, index) {
        if (event.code === 'Enter' || event.code === 'Space') {
            this.onItemClick(index);
            event.preventDefault();
        }
        switch (event.code) {
            case 'ArrowRight':
                this.onRightKey();
                break;
            case 'ArrowLeft':
                this.onLeftKey();
                break;
            case 'Home':
                this.onHomeKey();
                event.preventDefault();
                break;
            case 'End':
                this.onEndKey();
                event.preventDefault();
                break;
            case 'ArrowUp':
            case 'ArrowDown':
                event.preventDefault();
                break;
            case 'Tab':
                this.onTabKey();
                break;
            default:
                break;
        }
    }
    onRightKey() {
        const indicators = DomHandler.find(this.itemsContainer.nativeElement, '[data-pc-section="thumbnailitem"]');
        const activeIndex = this.findFocusedIndicatorIndex();
        this.changedFocusedIndicator(activeIndex, activeIndex + 1 === indicators.length ? indicators.length - 1 : activeIndex + 1);
    }
    onLeftKey() {
        const activeIndex = this.findFocusedIndicatorIndex();
        this.changedFocusedIndicator(activeIndex, activeIndex - 1 <= 0 ? 0 : activeIndex - 1);
    }
    onHomeKey() {
        const activeIndex = this.findFocusedIndicatorIndex();
        this.changedFocusedIndicator(activeIndex, 0);
    }
    onEndKey() {
        const indicators = DomHandler.find(this.itemsContainer.nativeElement, '[data-pc-section="thumbnailitem"]');
        const activeIndex = this.findFocusedIndicatorIndex();
        this.changedFocusedIndicator(activeIndex, indicators.length - 1);
    }
    onTabKey() {
        const indicators = [...DomHandler.find(this.itemsContainer.nativeElement, '[data-pc-section="thumbnailitem"]')];
        const highlightedIndex = indicators.findIndex((ind) => DomHandler.getAttribute(ind, 'data-p-active') === true);
        const activeIndicator = DomHandler.findSingle(this.itemsContainer.nativeElement, '[tabindex="0"]');
        const activeIndex = indicators.findIndex((ind) => ind === activeIndicator.parentElement);
        indicators[activeIndex].children[0].tabIndex = '-1';
        indicators[highlightedIndex].children[0].tabIndex = '0';
    }
    findFocusedIndicatorIndex() {
        const indicators = [...DomHandler.find(this.itemsContainer.nativeElement, '[data-pc-section="thumbnailitem"]')];
        const activeIndicator = DomHandler.findSingle(this.itemsContainer.nativeElement, '[data-pc-section="thumbnailitem"] > [tabindex="0"]');
        return indicators.findIndex((ind) => ind === activeIndicator.parentElement);
    }
    changedFocusedIndicator(prevInd, nextInd) {
        const indicators = DomHandler.find(this.itemsContainer.nativeElement, '[data-pc-section="thumbnailitem"]');
        indicators[prevInd].children[0].tabIndex = '-1';
        indicators[nextInd].children[0].tabIndex = '0';
        indicators[nextInd].children[0].focus();
    }
    step(dir) {
        let totalShiftedItems = this.totalShiftedItems + dir;
        if (dir < 0 && -1 * totalShiftedItems + this.d_numVisible > this.value.length - 1) {
            totalShiftedItems = this.d_numVisible - this.value.length;
        }
        else if (dir > 0 && totalShiftedItems > 0) {
            totalShiftedItems = 0;
        }
        if (this.circular) {
            if (dir < 0 && this.value.length - 1 === this._activeIndex) {
                totalShiftedItems = 0;
            }
            else if (dir > 0 && this._activeIndex === 0) {
                totalShiftedItems = this.d_numVisible - this.value.length;
            }
        }
        if (this.itemsContainer) {
            DomHandler.removeClass(this.itemsContainer.nativeElement, 'p-items-hidden');
            this.itemsContainer.nativeElement.style.transform = this.isVertical ? `translate3d(0, ${totalShiftedItems * (100 / this.d_numVisible)}%, 0)` : `translate3d(${totalShiftedItems * (100 / this.d_numVisible)}%, 0, 0)`;
            this.itemsContainer.nativeElement.style.transition = 'transform 500ms ease 0s';
        }
        this.totalShiftedItems = totalShiftedItems;
    }
    stopTheSlideShow() {
        if (this.slideShowActive && this.stopSlideShow) {
            this.stopSlideShow.emit();
        }
    }
    changePageOnTouch(e, diff) {
        if (diff < 0) {
            // left
            this.navForward(e);
        }
        else {
            // right
            this.navBackward(e);
        }
    }
    getTotalPageNumber() {
        return this.value.length > this.d_numVisible ? this.value.length - this.d_numVisible + 1 : 0;
    }
    getMedianItemIndex() {
        let index = Math.floor(this.d_numVisible / 2);
        return this.d_numVisible % 2 ? index : index - 1;
    }
    onTransitionEnd() {
        if (this.itemsContainer && this.itemsContainer.nativeElement) {
            DomHandler.addClass(this.itemsContainer.nativeElement, 'p-items-hidden');
            this.itemsContainer.nativeElement.style.transition = '';
        }
    }
    onTouchEnd(e) {
        let touchobj = e.changedTouches[0];
        if (this.isVertical) {
            this.changePageOnTouch(e, touchobj.pageY - this.startPos.y);
        }
        else {
            this.changePageOnTouch(e, touchobj.pageX - this.startPos.x);
        }
    }
    onTouchMove(e) {
        if (e.cancelable) {
            e.preventDefault();
        }
    }
    onTouchStart(e) {
        let touchobj = e.changedTouches[0];
        this.startPos = {
            x: touchobj.pageX,
            y: touchobj.pageY
        };
    }
    isNavBackwardDisabled() {
        return (!this.circular && this._activeIndex === 0) || this.value.length <= this.d_numVisible;
    }
    isNavForwardDisabled() {
        return (!this.circular && this._activeIndex === this.value.length - 1) || this.value.length <= this.d_numVisible;
    }
    firstItemAciveIndex() {
        return this.totalShiftedItems * -1;
    }
    lastItemActiveIndex() {
        return this.firstItemAciveIndex() + this.d_numVisible - 1;
    }
    isItemActive(index) {
        return this.firstItemAciveIndex() <= index && this.lastItemActiveIndex() >= index;
    }
    bindDocumentListeners() {
        if (isPlatformBrowser(this.platformId)) {
            const window = this.document.defaultView || 'window';
            this.documentResizeListener = this.renderer.listen(window, 'resize', () => {
                this.calculatePosition();
            });
        }
    }
    unbindDocumentListeners() {
        if (this.documentResizeListener) {
            this.documentResizeListener();
            this.documentResizeListener = null;
        }
    }
    ngOnDestroy() {
        if (this.responsiveOptions) {
            this.unbindDocumentListeners();
        }
        if (this.thumbnailsStyle) {
            this.thumbnailsStyle.parentNode?.removeChild(this.thumbnailsStyle);
        }
    }
    ariaPrevButtonLabel() {
        return this.galleria.config.translation.aria ? this.galleria.config.translation.aria.prevPageLabel : undefined;
    }
    ariaNextButtonLabel() {
        return this.galleria.config.translation.aria ? this.galleria.config.translation.aria.nextPageLabel : undefined;
    }
    ariaPageLabel(value) {
        return this.galleria.config.translation.aria ? this.galleria.config.translation.aria.pageLabel.replace(/{page}/g, value) : undefined;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: GalleriaThumbnails, deps: [{ token: Galleria }, { token: DOCUMENT }, { token: PLATFORM_ID }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.5", type: GalleriaThumbnails, selector: "p-galleriaThumbnails", inputs: { containerId: "containerId", value: "value", isVertical: "isVertical", slideShowActive: "slideShowActive", circular: "circular", responsiveOptions: "responsiveOptions", contentHeight: "contentHeight", showThumbnailNavigators: "showThumbnailNavigators", templates: "templates", numVisible: "numVisible", activeIndex: "activeIndex" }, outputs: { onActiveIndexChange: "onActiveIndexChange", stopSlideShow: "stopSlideShow" }, viewQueries: [{ propertyName: "itemsContainer", first: true, predicate: ["itemsContainer"], descendants: true }], ngImport: i0, template: `
        <div class="p-galleria-thumbnail-wrapper">
            <div class="p-galleria-thumbnail-container">
                <button
                    *ngIf="showThumbnailNavigators"
                    type="button"
                    [ngClass]="{ 'p-galleria-thumbnail-prev p-link': true, 'p-disabled': this.isNavBackwardDisabled() }"
                    (click)="navBackward($event)"
                    [disabled]="isNavBackwardDisabled()"
                    pRipple
                    [attr.aria-label]="ariaPrevButtonLabel()"
                >
                    <ng-container *ngIf="!galleria.previousThumbnailIconTemplate">
                        <ChevronLeftIcon *ngIf="!isVertical" [styleClass]="'p-galleria-thumbnail-prev-icon'" />
                        <ChevronUpIcon *ngIf="isVertical" [styleClass]="'p-galleria-thumbnail-prev-icon'" />
                    </ng-container>
                    <ng-template *ngTemplateOutlet="galleria.previousThumbnailIconTemplate"></ng-template>
                </button>
                <div class="p-galleria-thumbnail-items-container" [ngStyle]="{ height: isVertical ? contentHeight : '' }">
                    <div #itemsContainer class="p-galleria-thumbnail-items" (transitionend)="onTransitionEnd()" (touchstart)="onTouchStart($event)" (touchmove)="onTouchMove($event)" role="tablist">
                        <div
                            *ngFor="let item of value; let index = index"
                            [ngClass]="{
                                'p-galleria-thumbnail-item': true,
                                'p-galleria-thumbnail-item-current': activeIndex === index,
                                'p-galleria-thumbnail-item-active': isItemActive(index),
                                'p-galleria-thumbnail-item-start': firstItemAciveIndex() === index,
                                'p-galleria-thumbnail-item-end': lastItemActiveIndex() === index
                            }"
                            [attr.aria-selected]="activeIndex === index"
                            [attr.aria-controls]="containerId + '_item_' + index"
                            [attr.data-pc-section]="'thumbnailitem'"
                            [attr.data-p-active]="activeIndex === index"
                            (keydown)="onThumbnailKeydown($event, index)"
                        >
                            <div
                                class="p-galleria-thumbnail-item-content"
                                [attr.tabindex]="activeIndex === index ? 0 : -1"
                                [attr.aria-current]="activeIndex === index ? 'page' : undefined"
                                [attr.aria-label]="ariaPageLabel(index + 1)"
                                (click)="onItemClick(index)"
                                (touchend)="onItemClick(index)"
                                (keydown.enter)="onItemClick(index)"
                            >
                                <p-galleriaItemSlot type="thumbnail" [item]="item" [templates]="templates"></p-galleriaItemSlot>
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    *ngIf="showThumbnailNavigators"
                    type="button"
                    [ngClass]="{ 'p-galleria-thumbnail-next p-link': true, 'p-disabled': this.isNavForwardDisabled() }"
                    (click)="navForward($event)"
                    [disabled]="isNavForwardDisabled()"
                    pRipple
                    [attr.aria-label]="ariaNextButtonLabel()"
                >
                    <ng-container *ngIf="!galleria.nextThumbnailIconTemplate">
                        <ChevronRightIcon *ngIf="!isVertical" [ngClass]="'p-galleria-thumbnail-next-icon'" />
                        <ChevronDownIcon *ngIf="isVertical" [ngClass]="'p-galleria-thumbnail-next-icon'" />
                    </ng-container>
                    <ng-template *ngTemplateOutlet="galleria.nextThumbnailIconTemplate"></ng-template>
                </button>
            </div>
        </div>
    `, isInline: true, dependencies: [{ kind: "directive", type: i0.forwardRef(() => i2.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgForOf), selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgIf), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgStyle), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i0.forwardRef(() => i3.Ripple), selector: "[pRipple]" }, { kind: "component", type: i0.forwardRef(() => ChevronRightIcon), selector: "ChevronRightIcon" }, { kind: "component", type: i0.forwardRef(() => ChevronLeftIcon), selector: "ChevronLeftIcon" }, { kind: "component", type: i0.forwardRef(() => GalleriaItemSlot), selector: "p-galleriaItemSlot", inputs: ["templates", "index", "item", "type"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: GalleriaThumbnails, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-galleriaThumbnails',
                    template: `
        <div class="p-galleria-thumbnail-wrapper">
            <div class="p-galleria-thumbnail-container">
                <button
                    *ngIf="showThumbnailNavigators"
                    type="button"
                    [ngClass]="{ 'p-galleria-thumbnail-prev p-link': true, 'p-disabled': this.isNavBackwardDisabled() }"
                    (click)="navBackward($event)"
                    [disabled]="isNavBackwardDisabled()"
                    pRipple
                    [attr.aria-label]="ariaPrevButtonLabel()"
                >
                    <ng-container *ngIf="!galleria.previousThumbnailIconTemplate">
                        <ChevronLeftIcon *ngIf="!isVertical" [styleClass]="'p-galleria-thumbnail-prev-icon'" />
                        <ChevronUpIcon *ngIf="isVertical" [styleClass]="'p-galleria-thumbnail-prev-icon'" />
                    </ng-container>
                    <ng-template *ngTemplateOutlet="galleria.previousThumbnailIconTemplate"></ng-template>
                </button>
                <div class="p-galleria-thumbnail-items-container" [ngStyle]="{ height: isVertical ? contentHeight : '' }">
                    <div #itemsContainer class="p-galleria-thumbnail-items" (transitionend)="onTransitionEnd()" (touchstart)="onTouchStart($event)" (touchmove)="onTouchMove($event)" role="tablist">
                        <div
                            *ngFor="let item of value; let index = index"
                            [ngClass]="{
                                'p-galleria-thumbnail-item': true,
                                'p-galleria-thumbnail-item-current': activeIndex === index,
                                'p-galleria-thumbnail-item-active': isItemActive(index),
                                'p-galleria-thumbnail-item-start': firstItemAciveIndex() === index,
                                'p-galleria-thumbnail-item-end': lastItemActiveIndex() === index
                            }"
                            [attr.aria-selected]="activeIndex === index"
                            [attr.aria-controls]="containerId + '_item_' + index"
                            [attr.data-pc-section]="'thumbnailitem'"
                            [attr.data-p-active]="activeIndex === index"
                            (keydown)="onThumbnailKeydown($event, index)"
                        >
                            <div
                                class="p-galleria-thumbnail-item-content"
                                [attr.tabindex]="activeIndex === index ? 0 : -1"
                                [attr.aria-current]="activeIndex === index ? 'page' : undefined"
                                [attr.aria-label]="ariaPageLabel(index + 1)"
                                (click)="onItemClick(index)"
                                (touchend)="onItemClick(index)"
                                (keydown.enter)="onItemClick(index)"
                            >
                                <p-galleriaItemSlot type="thumbnail" [item]="item" [templates]="templates"></p-galleriaItemSlot>
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    *ngIf="showThumbnailNavigators"
                    type="button"
                    [ngClass]="{ 'p-galleria-thumbnail-next p-link': true, 'p-disabled': this.isNavForwardDisabled() }"
                    (click)="navForward($event)"
                    [disabled]="isNavForwardDisabled()"
                    pRipple
                    [attr.aria-label]="ariaNextButtonLabel()"
                >
                    <ng-container *ngIf="!galleria.nextThumbnailIconTemplate">
                        <ChevronRightIcon *ngIf="!isVertical" [ngClass]="'p-galleria-thumbnail-next-icon'" />
                        <ChevronDownIcon *ngIf="isVertical" [ngClass]="'p-galleria-thumbnail-next-icon'" />
                    </ng-container>
                    <ng-template *ngTemplateOutlet="galleria.nextThumbnailIconTemplate"></ng-template>
                </button>
            </div>
        </div>
    `,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: () => [{ type: Galleria }, { type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }], propDecorators: { containerId: [{
                type: Input
            }], value: [{
                type: Input
            }], isVertical: [{
                type: Input
            }], slideShowActive: [{
                type: Input
            }], circular: [{
                type: Input
            }], responsiveOptions: [{
                type: Input
            }], contentHeight: [{
                type: Input
            }], showThumbnailNavigators: [{
                type: Input
            }], templates: [{
                type: Input
            }], onActiveIndexChange: [{
                type: Output
            }], stopSlideShow: [{
                type: Output
            }], itemsContainer: [{
                type: ViewChild,
                args: ['itemsContainer']
            }], numVisible: [{
                type: Input
            }], activeIndex: [{
                type: Input
            }] } });
export class GalleriaModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: GalleriaModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.0.5", ngImport: i0, type: GalleriaModule, declarations: [Galleria, GalleriaContent, GalleriaItemSlot, GalleriaItem, GalleriaThumbnails], imports: [CommonModule, SharedModule, RippleModule, TimesIcon, ChevronRightIcon, ChevronLeftIcon, WindowMaximizeIcon, WindowMinimizeIcon, FocusTrapModule], exports: [CommonModule, Galleria, GalleriaContent, GalleriaItemSlot, GalleriaItem, GalleriaThumbnails, SharedModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: GalleriaModule, imports: [CommonModule, SharedModule, RippleModule, TimesIcon, ChevronRightIcon, ChevronLeftIcon, WindowMaximizeIcon, WindowMinimizeIcon, FocusTrapModule, CommonModule, SharedModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: GalleriaModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, SharedModule, RippleModule, TimesIcon, ChevronRightIcon, ChevronLeftIcon, WindowMaximizeIcon, WindowMinimizeIcon, FocusTrapModule],
                    exports: [CommonModule, Galleria, GalleriaContent, GalleriaItemSlot, GalleriaItem, GalleriaThumbnails, SharedModule],
                    declarations: [Galleria, GalleriaContent, GalleriaItemSlot, GalleriaItem, GalleriaThumbnails]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FsbGVyaWEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvZ2FsbGVyaWEvZ2FsbGVyaWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFrQixPQUFPLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMxRixPQUFPLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzVFLE9BQU8sRUFHSCx1QkFBdUIsRUFFdkIsU0FBUyxFQUNULGVBQWUsRUFHZixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFFTCxRQUFRLEVBSVIsTUFBTSxFQUNOLFdBQVcsRUFLWCxTQUFTLEVBQ1QsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBaUIsYUFBYSxFQUFFLFlBQVksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN6RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDbEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTlDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFL0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxlQUFlLEVBQUUs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Y0FBYyxpQkE3eENkLFFBQVEsRUF3WFIsZUFBZSxFQStHZixnQkFBZ0IsRUFxSGhCLFlBQVksRUEwTlosa0JBQWtCLGFBbWVqQixZQUFZLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsZUFBZSxFQUFFLGtCQUFrQixFQUFFLGtCQUFrQixFQUFFLGVBQWUsYUFDL0ksWUFBWSxFQTF4Q2IsUUFBUSxFQXdYUixlQUFlLEVBK0dmLGdCQUFnQixFQXFIaEIsWUFBWSxFQTBOWixrQkFBa0IsRUFvZTRFLFlBQVk7d0dBRzFHLGNBQWMsWUFKYixZQUFZLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsZUFBZSxFQUFFLGtCQUFrQixFQUFFLGtCQUFrQixFQUFFLGVBQWUsRUFDL0ksWUFBWSxFQUFpRixZQUFZOzsyRkFHMUcsY0FBYztrQkFMMUIsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsZUFBZSxFQUFFLGtCQUFrQixFQUFFLGtCQUFrQixFQUFFLGVBQWUsQ0FBQztvQkFDMUosT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLEVBQUUsWUFBWSxFQUFFLGtCQUFrQixFQUFFLFlBQVksQ0FBQztvQkFDcEgsWUFBWSxFQUFFLENBQUMsUUFBUSxFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRSxZQUFZLEVBQUUsa0JBQWtCLENBQUM7aUJBQ2hHIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQW5pbWF0aW9uRXZlbnQsIGFuaW1hdGUsIHN0eWxlLCB0cmFuc2l0aW9uLCB0cmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUsIERPQ1VNRU5ULCBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICAgIEFmdGVyQ29udGVudENoZWNrZWQsXG4gICAgQWZ0ZXJWaWV3SW5pdCxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkcmVuLFxuICAgIERvQ2hlY2ssXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5qZWN0LFxuICAgIElucHV0LFxuICAgIEtleVZhbHVlRGlmZmVycyxcbiAgICBOZ01vZHVsZSxcbiAgICBPbkNoYW5nZXMsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBPdXRwdXQsXG4gICAgUExBVEZPUk1fSUQsXG4gICAgUXVlcnlMaXN0LFxuICAgIFJlbmRlcmVyMixcbiAgICBTaW1wbGVDaGFuZ2VzLFxuICAgIFRlbXBsYXRlUmVmLFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFByaW1lTkdDb25maWcsIFByaW1lVGVtcGxhdGUsIFNoYXJlZE1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IERvbUhhbmRsZXIgfSBmcm9tICdwcmltZW5nL2RvbSc7XG5pbXBvcnQgeyBDaGV2cm9uTGVmdEljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL2NoZXZyb25sZWZ0JztcbmltcG9ydCB7IENoZXZyb25SaWdodEljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL2NoZXZyb25yaWdodCc7XG5pbXBvcnQgeyBUaW1lc0ljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL3RpbWVzJztcbmltcG9ydCB7IFdpbmRvd01heGltaXplSWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvd2luZG93bWF4aW1pemUnO1xuaW1wb3J0IHsgV2luZG93TWluaW1pemVJY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy93aW5kb3dtaW5pbWl6ZSc7XG5pbXBvcnQgeyBSaXBwbGVNb2R1bGUgfSBmcm9tICdwcmltZW5nL3JpcHBsZSc7XG5pbXBvcnQgeyBWb2lkTGlzdGVuZXIgfSBmcm9tICdwcmltZW5nL3RzLWhlbHBlcnMnO1xuaW1wb3J0IHsgVW5pcXVlQ29tcG9uZW50SWQsIFpJbmRleFV0aWxzIH0gZnJvbSAncHJpbWVuZy91dGlscyc7XG5pbXBvcnQgeyBHYWxsZXJpYVJlc3BvbnNpdmVPcHRpb25zIH0gZnJvbSAnLi9nYWxsZXJpYS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgRm9jdXNUcmFwTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9mb2N1c3RyYXAnO1xuaW1wb3J0IHsgcGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG4vKipcbiAqIEdhbGxlcmlhIGlzIGFuIGFkdmFuY2VkIGNvbnRlbnQgZ2FsbGVyeSBjb21wb25lbnQuXG4gKiBAZ3JvdXAgQ29tcG9uZW50c1xuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtZ2FsbGVyaWEnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgKm5nSWY9XCJmdWxsU2NyZWVuOyBlbHNlIHdpbmRvd2VkXCIgI2NvbnRhaW5lcj5cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAqbmdJZj1cIm1hc2tWaXNpYmxlXCJcbiAgICAgICAgICAgICAgICAjbWFza1xuICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsgJ3AtZ2FsbGVyaWEtbWFzayBwLWNvbXBvbmVudC1vdmVybGF5IHAtY29tcG9uZW50LW92ZXJsYXktZW50ZXInOiB0cnVlLCAncC1nYWxsZXJpYS12aXNpYmxlJzogdGhpcy52aXNpYmxlIH1cIlxuICAgICAgICAgICAgICAgIFtjbGFzc109XCJtYXNrQ2xhc3NcIlxuICAgICAgICAgICAgICAgIFthdHRyLnJvbGVdPVwiZnVsbFNjcmVlbiA/ICdkaWFsb2cnIDogJ3JlZ2lvbidcIlxuICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbW9kYWxdPVwiZnVsbFNjcmVlbiA/ICd0cnVlJyA6IHVuZGVmaW5lZFwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHAtZ2FsbGVyaWFDb250ZW50XG4gICAgICAgICAgICAgICAgICAgICpuZ0lmPVwidmlzaWJsZVwiXG4gICAgICAgICAgICAgICAgICAgIFtAYW5pbWF0aW9uXT1cInsgdmFsdWU6ICd2aXNpYmxlJywgcGFyYW1zOiB7IHNob3dUcmFuc2l0aW9uUGFyYW1zOiBzaG93VHJhbnNpdGlvbk9wdGlvbnMsIGhpZGVUcmFuc2l0aW9uUGFyYW1zOiBoaWRlVHJhbnNpdGlvbk9wdGlvbnMgfSB9XCJcbiAgICAgICAgICAgICAgICAgICAgKEBhbmltYXRpb24uc3RhcnQpPVwib25BbmltYXRpb25TdGFydCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgKEBhbmltYXRpb24uZG9uZSk9XCJvbkFuaW1hdGlvbkVuZCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgW3ZhbHVlXT1cInZhbHVlXCJcbiAgICAgICAgICAgICAgICAgICAgW2FjdGl2ZUluZGV4XT1cImFjdGl2ZUluZGV4XCJcbiAgICAgICAgICAgICAgICAgICAgW251bVZpc2libGVdPVwibnVtVmlzaWJsZVwiXG4gICAgICAgICAgICAgICAgICAgIChtYXNrSGlkZSk9XCJvbk1hc2tIaWRlKClcIlxuICAgICAgICAgICAgICAgICAgICAoYWN0aXZlSXRlbUNoYW5nZSk9XCJvbkFjdGl2ZUl0ZW1DaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cImNvbnRhaW5lclN0eWxlXCJcbiAgICAgICAgICAgICAgICA+PC9wLWdhbGxlcmlhQ29udGVudD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8bmctdGVtcGxhdGUgI3dpbmRvd2VkPlxuICAgICAgICAgICAgPHAtZ2FsbGVyaWFDb250ZW50IFt2YWx1ZV09XCJ2YWx1ZVwiIFthY3RpdmVJbmRleF09XCJhY3RpdmVJbmRleFwiIFtudW1WaXNpYmxlXT1cIm51bVZpc2libGVcIiAoYWN0aXZlSXRlbUNoYW5nZSk9XCJvbkFjdGl2ZUl0ZW1DaGFuZ2UoJGV2ZW50KVwiPjwvcC1nYWxsZXJpYUNvbnRlbnQ+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgYCxcbiAgICBhbmltYXRpb25zOiBbXG4gICAgICAgIHRyaWdnZXIoJ2FuaW1hdGlvbicsIFtcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ3ZvaWQgPT4gdmlzaWJsZScsIFtzdHlsZSh7IHRyYW5zZm9ybTogJ3NjYWxlKDAuNyknLCBvcGFjaXR5OiAwIH0pLCBhbmltYXRlKCd7e3Nob3dUcmFuc2l0aW9uUGFyYW1zfX0nKV0pLFxuICAgICAgICAgICAgdHJhbnNpdGlvbigndmlzaWJsZSA9PiB2b2lkJywgW2FuaW1hdGUoJ3t7aGlkZVRyYW5zaXRpb25QYXJhbXN9fScsIHN0eWxlKHsgdHJhbnNmb3JtOiAnc2NhbGUoMC43KScsIG9wYWNpdHk6IDAgfSkpXSlcbiAgICAgICAgXSlcbiAgICBdLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgc3R5bGVVcmxzOiBbJy4vZ2FsbGVyaWEuY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ3AtZWxlbWVudCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIEdhbGxlcmlhIGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICAgIC8qKlxuICAgICAqIEluZGV4IG9mIHRoZSBmaXJzdCBpdGVtLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCBhY3RpdmVJbmRleCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWN0aXZlSW5kZXg7XG4gICAgfVxuICAgIHNldCBhY3RpdmVJbmRleChhY3RpdmVJbmRleCkge1xuICAgICAgICB0aGlzLl9hY3RpdmVJbmRleCA9IGFjdGl2ZUluZGV4O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIGRpc3BsYXkgdGhlIGNvbXBvbmVudCBvbiBmdWxsc2NyZWVuLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGZ1bGxTY3JlZW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBVbmlxdWUgaWRlbnRpZmllciBvZiB0aGUgZWxlbWVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBpZDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIEFuIGFycmF5IG9mIG9iamVjdHMgdG8gZGlzcGxheS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB2YWx1ZTogYW55W10gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogTnVtYmVyIG9mIGl0ZW1zIHBlciBwYWdlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIG51bVZpc2libGU6IG51bWJlciA9IDM7XG4gICAgLyoqXG4gICAgICogQW4gYXJyYXkgb2Ygb3B0aW9ucyBmb3IgcmVzcG9uc2l2ZSBkZXNpZ24uXG4gICAgICogQHNlZSB7R2FsbGVyaWFSZXNwb25zaXZlT3B0aW9uc31cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSByZXNwb25zaXZlT3B0aW9uczogR2FsbGVyaWFSZXNwb25zaXZlT3B0aW9uc1tdIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gZGlzcGxheSBuYXZpZ2F0aW9uIGJ1dHRvbnMgaW4gaXRlbSBzZWN0aW9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHNob3dJdGVtTmF2aWdhdG9yczogYm9vbGVhbiA9IGZhbHNlO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gZGlzcGxheSBuYXZpZ2F0aW9uIGJ1dHRvbnMgaW4gdGh1bWJuYWlsIGNvbnRhaW5lci5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzaG93VGh1bWJuYWlsTmF2aWdhdG9yczogYm9vbGVhbiA9IHRydWU7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byBkaXNwbGF5IG5hdmlnYXRpb24gYnV0dG9ucyBvbiBpdGVtIGhvdmVyLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHNob3dJdGVtTmF2aWdhdG9yc09uSG92ZXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBXaGVuIGVuYWJsZWQsIGl0ZW0gaXMgY2hhbmdlZCBvbiBpbmRpY2F0b3IgaG92ZXIuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgY2hhbmdlSXRlbU9uSW5kaWNhdG9ySG92ZXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIGlmIHNjcm9sbGluZyB3b3VsZCBiZSBpbmZpbml0ZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBjaXJjdWxhcjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIC8qKlxuICAgICAqIEl0ZW1zIGFyZSBkaXNwbGF5ZWQgd2l0aCBhIHNsaWRlc2hvdyBpbiBhdXRvUGxheSBtb2RlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGF1dG9QbGF5OiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogV2hlbiBlbmFibGVkLCBhdXRvcnVuIHNob3VsZCBzdG9wIGJ5IGNsaWNrLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHNob3VsZFN0b3BBdXRvcGxheUJ5Q2xpY2s6IGJvb2xlYW4gPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIFRpbWUgaW4gbWlsbGlzZWNvbmRzIHRvIHNjcm9sbCBpdGVtcy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB0cmFuc2l0aW9uSW50ZXJ2YWw6IG51bWJlciA9IDQwMDA7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byBkaXNwbGF5IHRodW1ibmFpbCBjb250YWluZXIuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc2hvd1RodW1ibmFpbHM6IGJvb2xlYW4gPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIFBvc2l0aW9uIG9mIHRodW1ibmFpbHMuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgdGh1bWJuYWlsc1Bvc2l0aW9uOiAnYm90dG9tJyB8ICd0b3AnIHwgJ2xlZnQnIHwgJ3JpZ2h0JyB8IHVuZGVmaW5lZCA9ICdib3R0b20nO1xuICAgIC8qKlxuICAgICAqIEhlaWdodCBvZiB0aGUgdmlld3BvcnQgaW4gdmVydGljYWwgdGh1bWJuYWlsLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHZlcnRpY2FsVGh1bWJuYWlsVmlld1BvcnRIZWlnaHQ6IHN0cmluZyA9ICczMDBweCc7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byBkaXNwbGF5IGluZGljYXRvciBjb250YWluZXIuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc2hvd0luZGljYXRvcnM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBXaGVuIGVuYWJsZWQsIGluZGljYXRvciBjb250YWluZXIgaXMgZGlzcGxheWVkIG9uIGl0ZW0gY29udGFpbmVyLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHNob3dJbmRpY2F0b3JzT25JdGVtOiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogUG9zaXRpb24gb2YgaW5kaWNhdG9ycy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBpbmRpY2F0b3JzUG9zaXRpb246ICdib3R0b20nIHwgJ3RvcCcgfCAnbGVmdCcgfCAncmlnaHQnIHwgdW5kZWZpbmVkID0gJ2JvdHRvbSc7XG4gICAgLyoqXG4gICAgICogQmFzZSB6SW5kZXggdmFsdWUgdG8gdXNlIGluIGxheWVyaW5nLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGJhc2VaSW5kZXg6IG51bWJlciA9IDA7XG4gICAgLyoqXG4gICAgICogU3R5bGUgY2xhc3Mgb2YgdGhlIG1hc2sgb24gZnVsbHNjcmVlbiBtb2RlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIG1hc2tDbGFzczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFN0eWxlIGNsYXNzIG9mIHRoZSBjb21wb25lbnQgb24gZnVsbHNjcmVlbiBtb2RlLiBPdGhlcndpc2UsIHRoZSAnY2xhc3MnIHByb3BlcnR5IGNhbiBiZSB1c2VkLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGNvbnRhaW5lckNsYXNzOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogSW5saW5lIHN0eWxlIG9mIHRoZSBjb21wb25lbnQgb24gZnVsbHNjcmVlbiBtb2RlLiBPdGhlcndpc2UsIHRoZSAnc3R5bGUnIHByb3BlcnR5IGNhbiBiZSB1c2VkLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGNvbnRhaW5lclN0eWxlOiB7IFtrbGFzczogc3RyaW5nXTogYW55IH0gfCBudWxsIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFRyYW5zaXRpb24gb3B0aW9ucyBvZiB0aGUgc2hvdyBhbmltYXRpb24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc2hvd1RyYW5zaXRpb25PcHRpb25zOiBzdHJpbmcgPSAnMTUwbXMgY3ViaWMtYmV6aWVyKDAsIDAsIDAuMiwgMSknO1xuICAgIC8qKlxuICAgICAqIFRyYW5zaXRpb24gb3B0aW9ucyBvZiB0aGUgaGlkZSBhbmltYXRpb24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgaGlkZVRyYW5zaXRpb25PcHRpb25zOiBzdHJpbmcgPSAnMTUwbXMgY3ViaWMtYmV6aWVyKDAsIDAsIDAuMiwgMSknO1xuICAgIC8qKlxuICAgICAqIFNwZWNpZmllcyB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgbWFzayBvbiBmdWxsc2NyZWVuIG1vZGUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IHZpc2libGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl92aXNpYmxlO1xuICAgIH1cbiAgICBzZXQgdmlzaWJsZSh2aXNpYmxlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3Zpc2libGUgPSB2aXNpYmxlO1xuXG4gICAgICAgIGlmICh0aGlzLl92aXNpYmxlICYmICF0aGlzLm1hc2tWaXNpYmxlKSB7XG4gICAgICAgICAgICB0aGlzLm1hc2tWaXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugb24gYWN0aXZlIGluZGV4IGNoYW5nZS5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbnVtYmVyIC0gQWN0aXZlIGluZGV4LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBhY3RpdmVJbmRleENoYW5nZTogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugb24gdmlzaWJsaXR5IGNoYW5nZS5cbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGJvb2xlYW4gLSBWaXNpYmxlIHZhbHVlLlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSB2aXNpYmxlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgICBAVmlld0NoaWxkKCdtYXNrJykgbWFzazogRWxlbWVudFJlZiB8IHVuZGVmaW5lZDtcblxuICAgIEBWaWV3Q2hpbGQoJ2NvbnRhaW5lcicpIGNvbnRhaW5lcjogRWxlbWVudFJlZiB8IHVuZGVmaW5lZDtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oUHJpbWVUZW1wbGF0ZSkgdGVtcGxhdGVzOiBRdWVyeUxpc3Q8UHJpbWVUZW1wbGF0ZT4gfCB1bmRlZmluZWQ7XG5cbiAgICBfdmlzaWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgX2FjdGl2ZUluZGV4OiBudW1iZXIgPSAwO1xuXG4gICAgaGVhZGVyRmFjZXQ6IGFueTtcblxuICAgIGZvb3RlckZhY2V0OiBhbnk7XG5cbiAgICBpbmRpY2F0b3JGYWNldDogYW55O1xuXG4gICAgY2FwdGlvbkZhY2V0OiBhbnk7XG5cbiAgICBjbG9zZUljb25UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcblxuICAgIHByZXZpb3VzVGh1bWJuYWlsSWNvblRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xuXG4gICAgbmV4dFRodW1ibmFpbEljb25UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcblxuICAgIGl0ZW1QcmV2aW91c0ljb25UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcblxuICAgIGl0ZW1OZXh0SWNvblRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xuXG4gICAgbWFza1Zpc2libGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IERvY3VtZW50LCBASW5qZWN0KFBMQVRGT1JNX0lEKSBwdWJsaWMgcGxhdGZvcm1JZDogYW55LCBwdWJsaWMgZWxlbWVudDogRWxlbWVudFJlZiwgcHVibGljIGNkOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHVibGljIGNvbmZpZzogUHJpbWVOR0NvbmZpZykge31cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZXM/LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoaXRlbS5nZXRUeXBlKCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdoZWFkZXInOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlYWRlckZhY2V0ID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdmb290ZXInOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvb3RlckZhY2V0ID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdpbmRpY2F0b3InOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmluZGljYXRvckZhY2V0ID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdjbG9zZWljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlSWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdpdGVtbmV4dGljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1OZXh0SWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdpdGVtcHJldmlvdXNpY29uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtUHJldmlvdXNJY29uVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3ByZXZpb3VzdGh1bWJuYWlsaWNvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJldmlvdXNUaHVtYm5haWxJY29uVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ25leHR0aHVtYm5haWxpY29uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0VGh1bWJuYWlsSWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdjYXB0aW9uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXB0aW9uRmFjZXQgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoc2ltcGxlQ2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICBpZiAoc2ltcGxlQ2hhbmdlcy52YWx1ZSAmJiBzaW1wbGVDaGFuZ2VzLnZhbHVlLmN1cnJlbnRWYWx1ZT8ubGVuZ3RoIDwgdGhpcy5udW1WaXNpYmxlKSB7XG4gICAgICAgICAgICB0aGlzLm51bVZpc2libGUgPSBzaW1wbGVDaGFuZ2VzLnZhbHVlLmN1cnJlbnRWYWx1ZS5sZW5ndGg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbk1hc2tIaWRlKCkge1xuICAgICAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy52aXNpYmxlQ2hhbmdlLmVtaXQoZmFsc2UpO1xuICAgIH1cblxuICAgIG9uQWN0aXZlSXRlbUNoYW5nZShpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLmFjdGl2ZUluZGV4ICE9PSBpbmRleCkge1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVJbmRleCA9IGluZGV4O1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVJbmRleENoYW5nZS5lbWl0KGluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQW5pbWF0aW9uU3RhcnQoZXZlbnQ6IEFuaW1hdGlvbkV2ZW50KSB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQudG9TdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSAndmlzaWJsZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5lbmFibGVNb2RhbGl0eSgpO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmZvY3VzKERvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLmNvbnRhaW5lci5uYXRpdmVFbGVtZW50LCAnW2RhdGEtcGMtc2VjdGlvbj1cImNsb3NlYnV0dG9uXCJdJykpO1xuICAgICAgICAgICAgICAgIH0sIDI1KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAndm9pZCc6XG4gICAgICAgICAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyh0aGlzLm1hc2s/Lm5hdGl2ZUVsZW1lbnQsICdwLWNvbXBvbmVudC1vdmVybGF5LWxlYXZlJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkFuaW1hdGlvbkVuZChldmVudDogQW5pbWF0aW9uRXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC50b1N0YXRlKSB7XG4gICAgICAgICAgICBjYXNlICd2b2lkJzpcbiAgICAgICAgICAgICAgICB0aGlzLmRpc2FibGVNb2RhbGl0eSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZW5hYmxlTW9kYWxpdHkoKSB7XG4gICAgICAgIERvbUhhbmRsZXIuYmxvY2tCb2R5U2Nyb2xsKCk7XG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG5cbiAgICAgICAgaWYgKHRoaXMubWFzaykge1xuICAgICAgICAgICAgWkluZGV4VXRpbHMuc2V0KCdtb2RhbCcsIHRoaXMubWFzay5uYXRpdmVFbGVtZW50LCB0aGlzLmJhc2VaSW5kZXggfHwgdGhpcy5jb25maWcuekluZGV4Lm1vZGFsKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRpc2FibGVNb2RhbGl0eSgpIHtcbiAgICAgICAgRG9tSGFuZGxlci51bmJsb2NrQm9keVNjcm9sbCgpO1xuICAgICAgICB0aGlzLm1hc2tWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG5cbiAgICAgICAgaWYgKHRoaXMubWFzaykge1xuICAgICAgICAgICAgWkluZGV4VXRpbHMuY2xlYXIodGhpcy5tYXNrLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLmZ1bGxTY3JlZW4pIHtcbiAgICAgICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3ModGhpcy5kb2N1bWVudC5ib2R5LCAncC1vdmVyZmxvdy1oaWRkZW4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm1hc2spIHtcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZU1vZGFsaXR5KCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1nYWxsZXJpYUNvbnRlbnQnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXZcbiAgICAgICAgICAgIFthdHRyLmlkXT1cImlkXCJcbiAgICAgICAgICAgIFthdHRyLnJvbGVdPVwiJ3JlZ2lvbidcIlxuICAgICAgICAgICAgKm5nSWY9XCJ2YWx1ZSAmJiB2YWx1ZS5sZW5ndGggPiAwXCJcbiAgICAgICAgICAgIFtuZ0NsYXNzXT1cIntcbiAgICAgICAgICAgICAgICAncC1nYWxsZXJpYSBwLWNvbXBvbmVudCc6IHRydWUsXG4gICAgICAgICAgICAgICAgJ3AtZ2FsbGVyaWEtZnVsbHNjcmVlbic6IHRoaXMuZ2FsbGVyaWEuZnVsbFNjcmVlbixcbiAgICAgICAgICAgICAgICAncC1nYWxsZXJpYS1pbmRpY2F0b3Itb25pdGVtJzogdGhpcy5nYWxsZXJpYS5zaG93SW5kaWNhdG9yc09uSXRlbSxcbiAgICAgICAgICAgICAgICAncC1nYWxsZXJpYS1pdGVtLW5hdi1vbmhvdmVyJzogdGhpcy5nYWxsZXJpYS5zaG93SXRlbU5hdmlnYXRvcnNPbkhvdmVyICYmICF0aGlzLmdhbGxlcmlhLmZ1bGxTY3JlZW5cbiAgICAgICAgICAgIH1cIlxuICAgICAgICAgICAgW25nU3R5bGVdPVwiIWdhbGxlcmlhLmZ1bGxTY3JlZW4gPyBnYWxsZXJpYS5jb250YWluZXJTdHlsZSA6IHt9XCJcbiAgICAgICAgICAgIFtjbGFzc109XCJnYWxsZXJpYUNsYXNzKClcIlxuICAgICAgICAgICAgcEZvY3VzVHJhcFxuICAgICAgICA+XG4gICAgICAgICAgICA8YnV0dG9uICpuZ0lmPVwiZ2FsbGVyaWEuZnVsbFNjcmVlblwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInAtZ2FsbGVyaWEtY2xvc2UgcC1saW5rXCIgKGNsaWNrKT1cIm1hc2tIaWRlLmVtaXQoKVwiIHBSaXBwbGUgW2F0dHIuYXJpYS1sYWJlbF09XCJjbG9zZUFyaWFMYWJlbCgpXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidjbG9zZWJ1dHRvbidcIj5cbiAgICAgICAgICAgICAgICA8VGltZXNJY29uICpuZ0lmPVwiIWdhbGxlcmlhLmNsb3NlSWNvblRlbXBsYXRlXCIgW3N0eWxlQ2xhc3NdPVwiJ3AtZ2FsbGVyaWEtY2xvc2UtaWNvbidcIiAvPlxuICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cImdhbGxlcmlhLmNsb3NlSWNvblRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGRpdiAqbmdJZj1cImdhbGxlcmlhLnRlbXBsYXRlcyAmJiBnYWxsZXJpYS5oZWFkZXJGYWNldFwiIGNsYXNzPVwicC1nYWxsZXJpYS1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICA8cC1nYWxsZXJpYUl0ZW1TbG90IHR5cGU9XCJoZWFkZXJcIiBbdGVtcGxhdGVzXT1cImdhbGxlcmlhLnRlbXBsYXRlc1wiPjwvcC1nYWxsZXJpYUl0ZW1TbG90PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1nYWxsZXJpYS1jb250ZW50XCIgW2F0dHIuYXJpYS1saXZlXT1cImdhbGxlcmlhLmF1dG9QbGF5ID8gJ3BvbGl0ZScgOiAnb2ZmJ1wiPlxuICAgICAgICAgICAgICAgIDxwLWdhbGxlcmlhSXRlbVxuICAgICAgICAgICAgICAgICAgICBbaWRdPVwiaWRcIlxuICAgICAgICAgICAgICAgICAgICBbdmFsdWVdPVwidmFsdWVcIlxuICAgICAgICAgICAgICAgICAgICBbYWN0aXZlSW5kZXhdPVwiYWN0aXZlSW5kZXhcIlxuICAgICAgICAgICAgICAgICAgICBbY2lyY3VsYXJdPVwiZ2FsbGVyaWEuY2lyY3VsYXJcIlxuICAgICAgICAgICAgICAgICAgICBbdGVtcGxhdGVzXT1cImdhbGxlcmlhLnRlbXBsYXRlc1wiXG4gICAgICAgICAgICAgICAgICAgIChvbkFjdGl2ZUluZGV4Q2hhbmdlKT1cIm9uQWN0aXZlSW5kZXhDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgIFtzaG93SW5kaWNhdG9yc109XCJnYWxsZXJpYS5zaG93SW5kaWNhdG9yc1wiXG4gICAgICAgICAgICAgICAgICAgIFtjaGFuZ2VJdGVtT25JbmRpY2F0b3JIb3Zlcl09XCJnYWxsZXJpYS5jaGFuZ2VJdGVtT25JbmRpY2F0b3JIb3ZlclwiXG4gICAgICAgICAgICAgICAgICAgIFtpbmRpY2F0b3JGYWNldF09XCJnYWxsZXJpYS5pbmRpY2F0b3JGYWNldFwiXG4gICAgICAgICAgICAgICAgICAgIFtjYXB0aW9uRmFjZXRdPVwiZ2FsbGVyaWEuY2FwdGlvbkZhY2V0XCJcbiAgICAgICAgICAgICAgICAgICAgW3Nob3dJdGVtTmF2aWdhdG9yc109XCJnYWxsZXJpYS5zaG93SXRlbU5hdmlnYXRvcnNcIlxuICAgICAgICAgICAgICAgICAgICBbYXV0b1BsYXldPVwiZ2FsbGVyaWEuYXV0b1BsYXlcIlxuICAgICAgICAgICAgICAgICAgICBbc2xpZGVTaG93QWN0aXZlXT1cInNsaWRlU2hvd0FjdGl2ZVwiXG4gICAgICAgICAgICAgICAgICAgIChzdGFydFNsaWRlU2hvdyk9XCJzdGFydFNsaWRlU2hvdygpXCJcbiAgICAgICAgICAgICAgICAgICAgKHN0b3BTbGlkZVNob3cpPVwic3RvcFNsaWRlU2hvdygpXCJcbiAgICAgICAgICAgICAgICA+PC9wLWdhbGxlcmlhSXRlbT5cblxuICAgICAgICAgICAgICAgIDxwLWdhbGxlcmlhVGh1bWJuYWlsc1xuICAgICAgICAgICAgICAgICAgICAqbmdJZj1cImdhbGxlcmlhLnNob3dUaHVtYm5haWxzXCJcbiAgICAgICAgICAgICAgICAgICAgW2NvbnRhaW5lcklkXT1cImlkXCJcbiAgICAgICAgICAgICAgICAgICAgW3ZhbHVlXT1cInZhbHVlXCJcbiAgICAgICAgICAgICAgICAgICAgKG9uQWN0aXZlSW5kZXhDaGFuZ2UpPVwib25BY3RpdmVJbmRleENoYW5nZSgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgW2FjdGl2ZUluZGV4XT1cImFjdGl2ZUluZGV4XCJcbiAgICAgICAgICAgICAgICAgICAgW3RlbXBsYXRlc109XCJnYWxsZXJpYS50ZW1wbGF0ZXNcIlxuICAgICAgICAgICAgICAgICAgICBbbnVtVmlzaWJsZV09XCJudW1WaXNpYmxlXCJcbiAgICAgICAgICAgICAgICAgICAgW3Jlc3BvbnNpdmVPcHRpb25zXT1cImdhbGxlcmlhLnJlc3BvbnNpdmVPcHRpb25zXCJcbiAgICAgICAgICAgICAgICAgICAgW2NpcmN1bGFyXT1cImdhbGxlcmlhLmNpcmN1bGFyXCJcbiAgICAgICAgICAgICAgICAgICAgW2lzVmVydGljYWxdPVwiaXNWZXJ0aWNhbCgpXCJcbiAgICAgICAgICAgICAgICAgICAgW2NvbnRlbnRIZWlnaHRdPVwiZ2FsbGVyaWEudmVydGljYWxUaHVtYm5haWxWaWV3UG9ydEhlaWdodFwiXG4gICAgICAgICAgICAgICAgICAgIFtzaG93VGh1bWJuYWlsTmF2aWdhdG9yc109XCJnYWxsZXJpYS5zaG93VGh1bWJuYWlsTmF2aWdhdG9yc1wiXG4gICAgICAgICAgICAgICAgICAgIFtzbGlkZVNob3dBY3RpdmVdPVwic2xpZGVTaG93QWN0aXZlXCJcbiAgICAgICAgICAgICAgICAgICAgKHN0b3BTbGlkZVNob3cpPVwic3RvcFNsaWRlU2hvdygpXCJcbiAgICAgICAgICAgICAgICA+PC9wLWdhbGxlcmlhVGh1bWJuYWlscz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiAqbmdJZj1cImdhbGxlcmlhLnRlbXBsYXRlcyAmJiBnYWxsZXJpYS5mb290ZXJGYWNldFwiIGNsYXNzPVwicC1nYWxsZXJpYS1mb290ZXJcIj5cbiAgICAgICAgICAgICAgICA8cC1nYWxsZXJpYUl0ZW1TbG90IHR5cGU9XCJmb290ZXJcIiBbdGVtcGxhdGVzXT1cImdhbGxlcmlhLnRlbXBsYXRlc1wiPjwvcC1nYWxsZXJpYUl0ZW1TbG90PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgR2FsbGVyaWFDb250ZW50IGltcGxlbWVudHMgRG9DaGVjayB7XG4gICAgQElucHV0KCkgZ2V0IGFjdGl2ZUluZGV4KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hY3RpdmVJbmRleDtcbiAgICB9XG4gICAgc2V0IGFjdGl2ZUluZGV4KGFjdGl2ZUluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fYWN0aXZlSW5kZXggPSBhY3RpdmVJbmRleDtcbiAgICB9XG5cbiAgICBASW5wdXQoKSB2YWx1ZTogYW55W10gPSBbXTtcblxuICAgIEBJbnB1dCgpIG51bVZpc2libGU6IG51bWJlciB8IHVuZGVmaW5lZDtcblxuICAgIEBPdXRwdXQoKSBtYXNrSGlkZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIGFjdGl2ZUl0ZW1DaGFuZ2U6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQFZpZXdDaGlsZCgnY2xvc2VCdXR0b24nKSBjbG9zZUJ1dHRvbjogRWxlbWVudFJlZiB8IHVuZGVmaW5lZDtcblxuICAgIGlkOiBzdHJpbmc7XG5cbiAgICBfYWN0aXZlSW5kZXg6IG51bWJlciA9IDA7XG5cbiAgICBzbGlkZVNob3dBY3RpdmU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgaW50ZXJ2YWw6IGFueTtcblxuICAgIHN0eWxlQ2xhc3M6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgIHByaXZhdGUgZGlmZmVyOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZ2FsbGVyaWE6IEdhbGxlcmlhLCBwdWJsaWMgY2Q6IENoYW5nZURldGVjdG9yUmVmLCBwcml2YXRlIGRpZmZlcnM6IEtleVZhbHVlRGlmZmVycywgcHVibGljIGNvbmZpZzogUHJpbWVOR0NvbmZpZykge1xuICAgICAgICB0aGlzLmlkID0gdGhpcy5nYWxsZXJpYS5pZCB8fCBVbmlxdWVDb21wb25lbnRJZCgpO1xuICAgICAgICB0aGlzLmRpZmZlciA9IHRoaXMuZGlmZmVycy5maW5kKHRoaXMuZ2FsbGVyaWEpLmNyZWF0ZSgpO1xuICAgIH1cblxuICAgIG5nRG9DaGVjaygpOiB2b2lkIHtcbiAgICAgICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMuZ2FsbGVyaWEucGxhdGZvcm1JZCkpIHtcbiAgICAgICAgICAgIGNvbnN0IGNoYW5nZXMgPSB0aGlzLmRpZmZlci5kaWZmKHRoaXMuZ2FsbGVyaWEgYXMgdW5rbm93biBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik7XG4gICAgICAgICAgICBpZiAoY2hhbmdlcyAmJiBjaGFuZ2VzLmZvckVhY2hJdGVtLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAvLyBCZWNhdXNlIHdlIGNoYW5nZSB0aGUgcHJvcGVydGllcyBvZiB0aGUgcGFyZW50IGNvbXBvbmVudCxcbiAgICAgICAgICAgICAgICAvLyBhbmQgdGhlIGNoaWxkcmVuIHRha2Ugb3VyIGVudGl0eSBmcm9tIHRoZSBpbmplY3Rvci5cbiAgICAgICAgICAgICAgICAvLyBXZSBjYW4gdGVsbCB0aGUgY2hpbGRyZW4gdG8gcmVkcmF3IHRoZW1zZWx2ZXMgd2hlbiB3ZSBjaGFuZ2UgdGhlIHByb3BlcnRpZXMgb2YgdGhlIHBhcmVudCBjb21wb25lbnQuXG4gICAgICAgICAgICAgICAgLy8gU2luY2Ugd2UgaGF2ZSBhbiBvblB1c2ggc3RyYXRlZ3lcbiAgICAgICAgICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2FsbGVyaWFDbGFzcygpIHtcbiAgICAgICAgY29uc3QgdGh1bWJuYWlsc1Bvc0NsYXNzID0gdGhpcy5nYWxsZXJpYS5zaG93VGh1bWJuYWlscyAmJiB0aGlzLmdldFBvc2l0aW9uQ2xhc3MoJ3AtZ2FsbGVyaWEtdGh1bWJuYWlscycsIHRoaXMuZ2FsbGVyaWEudGh1bWJuYWlsc1Bvc2l0aW9uIGFzIHN0cmluZyk7XG4gICAgICAgIGNvbnN0IGluZGljYXRvclBvc0NsYXNzID0gdGhpcy5nYWxsZXJpYS5zaG93SW5kaWNhdG9ycyAmJiB0aGlzLmdldFBvc2l0aW9uQ2xhc3MoJ3AtZ2FsbGVyaWEtaW5kaWNhdG9ycycsIHRoaXMuZ2FsbGVyaWEuaW5kaWNhdG9yc1Bvc2l0aW9uIGFzIHN0cmluZyk7XG5cbiAgICAgICAgcmV0dXJuICh0aGlzLmdhbGxlcmlhLmNvbnRhaW5lckNsYXNzID8gdGhpcy5nYWxsZXJpYS5jb250YWluZXJDbGFzcyArICcgJyA6ICcnKSArICh0aHVtYm5haWxzUG9zQ2xhc3MgPyB0aHVtYm5haWxzUG9zQ2xhc3MgKyAnICcgOiAnJykgKyAoaW5kaWNhdG9yUG9zQ2xhc3MgPyBpbmRpY2F0b3JQb3NDbGFzcyArICcgJyA6ICcnKTtcbiAgICB9XG5cbiAgICBzdGFydFNsaWRlU2hvdygpIHtcbiAgICAgICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMuZ2FsbGVyaWEucGxhdGZvcm1JZCkpIHtcbiAgICAgICAgICAgIHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGFjdGl2ZUluZGV4ID0gdGhpcy5nYWxsZXJpYS5jaXJjdWxhciAmJiB0aGlzLnZhbHVlLmxlbmd0aCAtIDEgPT09IHRoaXMuYWN0aXZlSW5kZXggPyAwIDogdGhpcy5hY3RpdmVJbmRleCArIDE7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkFjdGl2ZUluZGV4Q2hhbmdlKGFjdGl2ZUluZGV4KTtcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUluZGV4ID0gYWN0aXZlSW5kZXg7XG4gICAgICAgICAgICB9LCB0aGlzLmdhbGxlcmlhLnRyYW5zaXRpb25JbnRlcnZhbCk7XG5cbiAgICAgICAgICAgIHRoaXMuc2xpZGVTaG93QWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0b3BTbGlkZVNob3coKSB7XG4gICAgICAgIGlmICh0aGlzLmdhbGxlcmlhLmF1dG9QbGF5ICYmICF0aGlzLmdhbGxlcmlhLnNob3VsZFN0b3BBdXRvcGxheUJ5Q2xpY2spIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmludGVydmFsKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zbGlkZVNob3dBY3RpdmUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBnZXRQb3NpdGlvbkNsYXNzKHByZUNsYXNzTmFtZTogc3RyaW5nLCBwb3NpdGlvbjogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9ucyA9IFsndG9wJywgJ2xlZnQnLCAnYm90dG9tJywgJ3JpZ2h0J107XG4gICAgICAgIGNvbnN0IHBvcyA9IHBvc2l0aW9ucy5maW5kKChpdGVtKSA9PiBpdGVtID09PSBwb3NpdGlvbik7XG5cbiAgICAgICAgcmV0dXJuIHBvcyA/IGAke3ByZUNsYXNzTmFtZX0tJHtwb3N9YCA6ICcnO1xuICAgIH1cblxuICAgIGlzVmVydGljYWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdhbGxlcmlhLnRodW1ibmFpbHNQb3NpdGlvbiA9PT0gJ2xlZnQnIHx8IHRoaXMuZ2FsbGVyaWEudGh1bWJuYWlsc1Bvc2l0aW9uID09PSAncmlnaHQnO1xuICAgIH1cblxuICAgIG9uQWN0aXZlSW5kZXhDaGFuZ2UoaW5kZXg6IG51bWJlcikge1xuICAgICAgICBpZiAodGhpcy5hY3RpdmVJbmRleCAhPT0gaW5kZXgpIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlSW5kZXggPSBpbmRleDtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlSXRlbUNoYW5nZS5lbWl0KHRoaXMuYWN0aXZlSW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xvc2VBcmlhTGFiZWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy50cmFuc2xhdGlvbi5hcmlhID8gdGhpcy5jb25maWcudHJhbnNsYXRpb24uYXJpYS5jbG9zZSA6IHVuZGVmaW5lZDtcbiAgICB9XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1nYWxsZXJpYUl0ZW1TbG90JyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY29udGVudFRlbXBsYXRlXCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiY29udGVudFRlbXBsYXRlOyBjb250ZXh0OiBjb250ZXh0XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIGAsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgR2FsbGVyaWFJdGVtU2xvdCB7XG4gICAgQElucHV0KCkgdGVtcGxhdGVzOiBRdWVyeUxpc3Q8UHJpbWVUZW1wbGF0ZT4gfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoKSBpbmRleDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuXG4gICAgQElucHV0KCkgZ2V0IGl0ZW0oKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2l0ZW07XG4gICAgfVxuXG4gICAgc2V0IGl0ZW0oaXRlbTogYW55KSB7XG4gICAgICAgIHRoaXMuX2l0ZW0gPSBpdGVtO1xuICAgICAgICBpZiAodGhpcy50ZW1wbGF0ZXMpIHtcbiAgICAgICAgICAgIHRoaXMudGVtcGxhdGVzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5nZXRUeXBlKCkgPT09IHRoaXMudHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHRoaXMudHlwZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnaXRlbSc6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdjYXB0aW9uJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3RodW1ibmFpbCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0ID0geyAkaW1wbGljaXQ6IHRoaXMuaXRlbSB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudFRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQElucHV0KCkgdHlwZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICAgY29udGVudFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xuXG4gICAgY29udGV4dDogYW55O1xuXG4gICAgX2l0ZW06IGFueTtcblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZXM/LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGlmIChpdGVtLmdldFR5cGUoKSA9PT0gdGhpcy50eXBlKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnaXRlbSc6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NhcHRpb24nOlxuICAgICAgICAgICAgICAgICAgICBjYXNlICd0aHVtYm5haWwnOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0ID0geyAkaW1wbGljaXQ6IHRoaXMuaXRlbSB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnaW5kaWNhdG9yJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dCA9IHsgJGltcGxpY2l0OiB0aGlzLmluZGV4IH07XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0ID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLWdhbGxlcmlhSXRlbScsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cInAtZ2FsbGVyaWEtaXRlbS13cmFwcGVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1nYWxsZXJpYS1pdGVtLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJzaG93SXRlbU5hdmlnYXRvcnNcIlxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgcm9sZT1cIm5hdmlnYXRpb25cIlxuICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7ICdwLWdhbGxlcmlhLWl0ZW0tcHJldiBwLWdhbGxlcmlhLWl0ZW0tbmF2IHAtbGluayc6IHRydWUsICdwLWRpc2FibGVkJzogdGhpcy5pc05hdkJhY2t3YXJkRGlzYWJsZWQoKSB9XCJcbiAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm5hdkJhY2t3YXJkKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiaXNOYXZCYWNrd2FyZERpc2FibGVkKClcIlxuICAgICAgICAgICAgICAgICAgICBwUmlwcGxlXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8Q2hldnJvbkxlZnRJY29uICpuZ0lmPVwiIWdhbGxlcmlhLml0ZW1QcmV2aW91c0ljb25UZW1wbGF0ZVwiIFtzdHlsZUNsYXNzXT1cIidwLWdhbGxlcmlhLWl0ZW0tcHJldi1pY29uJ1wiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cImdhbGxlcmlhLml0ZW1QcmV2aW91c0ljb25UZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGRpdiBbaWRdPVwiaWQgKyAnX2l0ZW1fJyArIGFjdGl2ZUluZGV4XCIgcm9sZT1cImdyb3VwXCIgW2F0dHIuYXJpYS1sYWJlbF09XCJhcmlhU2xpZGVOdW1iZXIoYWN0aXZlSW5kZXggKyAxKVwiIFthdHRyLmFyaWEtcm9sZWRlc2NyaXB0aW9uXT1cImFyaWFTbGlkZUxhYmVsKClcIiBbc3R5bGUud2lkdGhdPVwiJzEwMCUnXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwLWdhbGxlcmlhSXRlbVNsb3QgdHlwZT1cIml0ZW1cIiBbaXRlbV09XCJhY3RpdmVJdGVtXCIgW3RlbXBsYXRlc109XCJ0ZW1wbGF0ZXNcIiBjbGFzcz1cInAtZ2FsbGVyaWEtaXRlbVwiPjwvcC1nYWxsZXJpYUl0ZW1TbG90PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJzaG93SXRlbU5hdmlnYXRvcnNcIlxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyAncC1nYWxsZXJpYS1pdGVtLW5leHQgcC1nYWxsZXJpYS1pdGVtLW5hdiBwLWxpbmsnOiB0cnVlLCAncC1kaXNhYmxlZCc6IHRoaXMuaXNOYXZGb3J3YXJkRGlzYWJsZWQoKSB9XCJcbiAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm5hdkZvcndhcmQoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJpc05hdkZvcndhcmREaXNhYmxlZCgpXCJcbiAgICAgICAgICAgICAgICAgICAgcFJpcHBsZVxuICAgICAgICAgICAgICAgICAgICByb2xlPVwibmF2aWdhdGlvblwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8Q2hldnJvblJpZ2h0SWNvbiAqbmdJZj1cIiFnYWxsZXJpYS5pdGVtTmV4dEljb25UZW1wbGF0ZVwiIFtzdHlsZUNsYXNzXT1cIidwLWdhbGxlcmlhLWl0ZW0tbmV4dC1pY29uJ1wiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cImdhbGxlcmlhLml0ZW1OZXh0SWNvblRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1nYWxsZXJpYS1jYXB0aW9uXCIgKm5nSWY9XCJjYXB0aW9uRmFjZXRcIj5cbiAgICAgICAgICAgICAgICAgICAgPHAtZ2FsbGVyaWFJdGVtU2xvdCB0eXBlPVwiY2FwdGlvblwiIFtpdGVtXT1cImFjdGl2ZUl0ZW1cIiBbdGVtcGxhdGVzXT1cInRlbXBsYXRlc1wiPjwvcC1nYWxsZXJpYUl0ZW1TbG90PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8dWwgKm5nSWY9XCJzaG93SW5kaWNhdG9yc1wiIGNsYXNzPVwicC1nYWxsZXJpYS1pbmRpY2F0b3JzIHAtcmVzZXRcIj5cbiAgICAgICAgICAgICAgICA8bGlcbiAgICAgICAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IGl0ZW0gb2YgdmFsdWU7IGxldCBpbmRleCA9IGluZGV4XCJcbiAgICAgICAgICAgICAgICAgICAgdGFiaW5kZXg9XCIwXCJcbiAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uSW5kaWNhdG9yQ2xpY2soaW5kZXgpXCJcbiAgICAgICAgICAgICAgICAgICAgKG1vdXNlZW50ZXIpPVwib25JbmRpY2F0b3JNb3VzZUVudGVyKGluZGV4KVwiXG4gICAgICAgICAgICAgICAgICAgIChrZXlkb3duKT1cIm9uSW5kaWNhdG9yS2V5RG93bigkZXZlbnQsIGluZGV4KVwiXG4gICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsgJ3AtZ2FsbGVyaWEtaW5kaWNhdG9yJzogdHJ1ZSwgJ3AtaGlnaGxpZ2h0JzogaXNJbmRpY2F0b3JJdGVtQWN0aXZlKGluZGV4KSB9XCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJhcmlhUGFnZUxhYmVsKGluZGV4ICsgMSlcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLXNlbGVjdGVkXT1cImFjdGl2ZUluZGV4ID09PSBpbmRleFwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtY29udHJvbHNdPVwiaWQgKyAnX2l0ZW1fJyArIGluZGV4XCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIHRhYkluZGV4PVwiLTFcIiBjbGFzcz1cInAtbGlua1wiICpuZ0lmPVwiIWluZGljYXRvckZhY2V0XCI+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxwLWdhbGxlcmlhSXRlbVNsb3QgdHlwZT1cImluZGljYXRvclwiIFtpbmRleF09XCJpbmRleFwiIFt0ZW1wbGF0ZXNdPVwidGVtcGxhdGVzXCI+PC9wLWdhbGxlcmlhSXRlbVNsb3Q+XG4gICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgR2FsbGVyaWFJdGVtIGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgICBASW5wdXQoKSBpZDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICAgQElucHV0KCkgY2lyY3VsYXI6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpIHZhbHVlOiBhbnlbXSB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCgpIHNob3dJdGVtTmF2aWdhdG9yczogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KCkgc2hvd0luZGljYXRvcnM6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgc2xpZGVTaG93QWN0aXZlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIGNoYW5nZUl0ZW1PbkluZGljYXRvckhvdmVyOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIGF1dG9QbGF5OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKSB0ZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxQcmltZVRlbXBsYXRlPiB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCgpIGluZGljYXRvckZhY2V0OiBhbnk7XG5cbiAgICBASW5wdXQoKSBjYXB0aW9uRmFjZXQ6IGFueTtcblxuICAgIEBPdXRwdXQoKSBzdGFydFNsaWRlU2hvdzogRXZlbnRFbWl0dGVyPEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBzdG9wU2xpZGVTaG93OiBFdmVudEVtaXR0ZXI8RXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uQWN0aXZlSW5kZXhDaGFuZ2U6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQElucHV0KCkgZ2V0IGFjdGl2ZUluZGV4KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hY3RpdmVJbmRleDtcbiAgICB9XG5cbiAgICBzZXQgYWN0aXZlSW5kZXgoYWN0aXZlSW5kZXgpIHtcbiAgICAgICAgdGhpcy5fYWN0aXZlSW5kZXggPSBhY3RpdmVJbmRleDtcbiAgICB9XG5cbiAgICBnZXQgYWN0aXZlSXRlbSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWUgJiYgdGhpcy52YWx1ZVt0aGlzLl9hY3RpdmVJbmRleF07XG4gICAgfVxuXG4gICAgX2FjdGl2ZUluZGV4OiBudW1iZXIgPSAwO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGdhbGxlcmlhOiBHYWxsZXJpYSkge31cblxuICAgIG5nT25DaGFuZ2VzKHsgYXV0b1BsYXkgfTogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgICAgICBpZiAoYXV0b1BsYXk/LmN1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5zdGFydFNsaWRlU2hvdy5lbWl0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYXV0b1BsYXkgJiYgYXV0b1BsYXkuY3VycmVudFZhbHVlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdGhpcy5zdG9wVGhlU2xpZGVTaG93KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZXh0KCkge1xuICAgICAgICBsZXQgbmV4dEl0ZW1JbmRleCA9IHRoaXMuYWN0aXZlSW5kZXggKyAxO1xuICAgICAgICBsZXQgYWN0aXZlSW5kZXggPSB0aGlzLmNpcmN1bGFyICYmICg8YW55W10+dGhpcy52YWx1ZSkubGVuZ3RoIC0gMSA9PT0gdGhpcy5hY3RpdmVJbmRleCA/IDAgOiBuZXh0SXRlbUluZGV4O1xuICAgICAgICB0aGlzLm9uQWN0aXZlSW5kZXhDaGFuZ2UuZW1pdChhY3RpdmVJbmRleCk7XG4gICAgfVxuXG4gICAgcHJldigpIHtcbiAgICAgICAgbGV0IHByZXZJdGVtSW5kZXggPSB0aGlzLmFjdGl2ZUluZGV4ICE9PSAwID8gdGhpcy5hY3RpdmVJbmRleCAtIDEgOiAwO1xuICAgICAgICBsZXQgYWN0aXZlSW5kZXggPSB0aGlzLmNpcmN1bGFyICYmIHRoaXMuYWN0aXZlSW5kZXggPT09IDAgPyAoPGFueVtdPnRoaXMudmFsdWUpLmxlbmd0aCAtIDEgOiBwcmV2SXRlbUluZGV4O1xuICAgICAgICB0aGlzLm9uQWN0aXZlSW5kZXhDaGFuZ2UuZW1pdChhY3RpdmVJbmRleCk7XG4gICAgfVxuXG4gICAgc3RvcFRoZVNsaWRlU2hvdygpIHtcbiAgICAgICAgaWYgKHRoaXMuc2xpZGVTaG93QWN0aXZlICYmIHRoaXMuc3RvcFNsaWRlU2hvdykge1xuICAgICAgICAgICAgdGhpcy5zdG9wU2xpZGVTaG93LmVtaXQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5hdkZvcndhcmQoZTogTW91c2VFdmVudCkge1xuICAgICAgICB0aGlzLnN0b3BUaGVTbGlkZVNob3coKTtcbiAgICAgICAgdGhpcy5uZXh0KCk7XG5cbiAgICAgICAgaWYgKGUgJiYgZS5jYW5jZWxhYmxlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuYXZCYWNrd2FyZChlOiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIHRoaXMuc3RvcFRoZVNsaWRlU2hvdygpO1xuICAgICAgICB0aGlzLnByZXYoKTtcblxuICAgICAgICBpZiAoZSAmJiBlLmNhbmNlbGFibGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uSW5kaWNhdG9yQ2xpY2soaW5kZXg6IG51bWJlcikge1xuICAgICAgICB0aGlzLnN0b3BUaGVTbGlkZVNob3coKTtcbiAgICAgICAgdGhpcy5vbkFjdGl2ZUluZGV4Q2hhbmdlLmVtaXQoaW5kZXgpO1xuICAgIH1cblxuICAgIG9uSW5kaWNhdG9yTW91c2VFbnRlcihpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLmNoYW5nZUl0ZW1PbkluZGljYXRvckhvdmVyKSB7XG4gICAgICAgICAgICB0aGlzLnN0b3BUaGVTbGlkZVNob3coKTtcbiAgICAgICAgICAgIHRoaXMub25BY3RpdmVJbmRleENoYW5nZS5lbWl0KGluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uSW5kaWNhdG9yS2V5RG93bihldmVudCwgaW5kZXg6IG51bWJlcikge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LmNvZGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgICAgIGNhc2UgJ1NwYWNlJzpcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3BUaGVTbGlkZVNob3coKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uQWN0aXZlSW5kZXhDaGFuZ2UuZW1pdChpbmRleCk7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc05hdkZvcndhcmREaXNhYmxlZCgpIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLmNpcmN1bGFyICYmIHRoaXMuYWN0aXZlSW5kZXggPT09ICg8YW55W10+dGhpcy52YWx1ZSkubGVuZ3RoIC0gMTtcbiAgICB9XG5cbiAgICBpc05hdkJhY2t3YXJkRGlzYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiAhdGhpcy5jaXJjdWxhciAmJiB0aGlzLmFjdGl2ZUluZGV4ID09PSAwO1xuICAgIH1cblxuICAgIGlzSW5kaWNhdG9ySXRlbUFjdGl2ZShpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFjdGl2ZUluZGV4ID09PSBpbmRleDtcbiAgICB9XG5cbiAgICBhcmlhU2xpZGVMYWJlbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2FsbGVyaWEuY29uZmlnLnRyYW5zbGF0aW9uLmFyaWEgPyB0aGlzLmdhbGxlcmlhLmNvbmZpZy50cmFuc2xhdGlvbi5hcmlhLnNsaWRlIDogdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGFyaWFTbGlkZU51bWJlcih2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5nYWxsZXJpYS5jb25maWcudHJhbnNsYXRpb24uYXJpYSA/IHRoaXMuZ2FsbGVyaWEuY29uZmlnLnRyYW5zbGF0aW9uLmFyaWEuc2xpZGVOdW1iZXIucmVwbGFjZSgve3NsaWRlTnVtYmVyfS9nLCB2YWx1ZSkgOiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgYXJpYVBhZ2VMYWJlbCh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5nYWxsZXJpYS5jb25maWcudHJhbnNsYXRpb24uYXJpYSA/IHRoaXMuZ2FsbGVyaWEuY29uZmlnLnRyYW5zbGF0aW9uLmFyaWEucGFnZUxhYmVsLnJlcGxhY2UoL3twYWdlfS9nLCB2YWx1ZSkgOiB1bmRlZmluZWQ7XG4gICAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtZ2FsbGVyaWFUaHVtYm5haWxzJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IGNsYXNzPVwicC1nYWxsZXJpYS10aHVtYm5haWwtd3JhcHBlclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtZ2FsbGVyaWEtdGh1bWJuYWlsLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJzaG93VGh1bWJuYWlsTmF2aWdhdG9yc1wiXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7ICdwLWdhbGxlcmlhLXRodW1ibmFpbC1wcmV2IHAtbGluayc6IHRydWUsICdwLWRpc2FibGVkJzogdGhpcy5pc05hdkJhY2t3YXJkRGlzYWJsZWQoKSB9XCJcbiAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm5hdkJhY2t3YXJkKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiaXNOYXZCYWNrd2FyZERpc2FibGVkKClcIlxuICAgICAgICAgICAgICAgICAgICBwUmlwcGxlXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiYXJpYVByZXZCdXR0b25MYWJlbCgpXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhZ2FsbGVyaWEucHJldmlvdXNUaHVtYm5haWxJY29uVGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxDaGV2cm9uTGVmdEljb24gKm5nSWY9XCIhaXNWZXJ0aWNhbFwiIFtzdHlsZUNsYXNzXT1cIidwLWdhbGxlcmlhLXRodW1ibmFpbC1wcmV2LWljb24nXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxDaGV2cm9uVXBJY29uICpuZ0lmPVwiaXNWZXJ0aWNhbFwiIFtzdHlsZUNsYXNzXT1cIidwLWdhbGxlcmlhLXRodW1ibmFpbC1wcmV2LWljb24nXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cImdhbGxlcmlhLnByZXZpb3VzVGh1bWJuYWlsSWNvblRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1nYWxsZXJpYS10aHVtYm5haWwtaXRlbXMtY29udGFpbmVyXCIgW25nU3R5bGVdPVwieyBoZWlnaHQ6IGlzVmVydGljYWwgPyBjb250ZW50SGVpZ2h0IDogJycgfVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2ICNpdGVtc0NvbnRhaW5lciBjbGFzcz1cInAtZ2FsbGVyaWEtdGh1bWJuYWlsLWl0ZW1zXCIgKHRyYW5zaXRpb25lbmQpPVwib25UcmFuc2l0aW9uRW5kKClcIiAodG91Y2hzdGFydCk9XCJvblRvdWNoU3RhcnQoJGV2ZW50KVwiICh0b3VjaG1vdmUpPVwib25Ub3VjaE1vdmUoJGV2ZW50KVwiIHJvbGU9XCJ0YWJsaXN0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IGl0ZW0gb2YgdmFsdWU7IGxldCBpbmRleCA9IGluZGV4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdwLWdhbGxlcmlhLXRodW1ibmFpbC1pdGVtJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3AtZ2FsbGVyaWEtdGh1bWJuYWlsLWl0ZW0tY3VycmVudCc6IGFjdGl2ZUluZGV4ID09PSBpbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3AtZ2FsbGVyaWEtdGh1bWJuYWlsLWl0ZW0tYWN0aXZlJzogaXNJdGVtQWN0aXZlKGluZGV4KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3AtZ2FsbGVyaWEtdGh1bWJuYWlsLWl0ZW0tc3RhcnQnOiBmaXJzdEl0ZW1BY2l2ZUluZGV4KCkgPT09IGluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAncC1nYWxsZXJpYS10aHVtYm5haWwtaXRlbS1lbmQnOiBsYXN0SXRlbUFjdGl2ZUluZGV4KCkgPT09IGluZGV4XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1zZWxlY3RlZF09XCJhY3RpdmVJbmRleCA9PT0gaW5kZXhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtY29udHJvbHNdPVwiY29udGFpbmVySWQgKyAnX2l0ZW1fJyArIGluZGV4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ3RodW1ibmFpbGl0ZW0nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLXAtYWN0aXZlXT1cImFjdGl2ZUluZGV4ID09PSBpbmRleFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGtleWRvd24pPVwib25UaHVtYm5haWxLZXlkb3duKCRldmVudCwgaW5kZXgpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC1nYWxsZXJpYS10aHVtYm5haWwtaXRlbS1jb250ZW50XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIudGFiaW5kZXhdPVwiYWN0aXZlSW5kZXggPT09IGluZGV4ID8gMCA6IC0xXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1jdXJyZW50XT1cImFjdGl2ZUluZGV4ID09PSBpbmRleCA/ICdwYWdlJyA6IHVuZGVmaW5lZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiYXJpYVBhZ2VMYWJlbChpbmRleCArIDEpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uSXRlbUNsaWNrKGluZGV4KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh0b3VjaGVuZCk9XCJvbkl0ZW1DbGljayhpbmRleClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoa2V5ZG93bi5lbnRlcik9XCJvbkl0ZW1DbGljayhpbmRleClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAtZ2FsbGVyaWFJdGVtU2xvdCB0eXBlPVwidGh1bWJuYWlsXCIgW2l0ZW1dPVwiaXRlbVwiIFt0ZW1wbGF0ZXNdPVwidGVtcGxhdGVzXCI+PC9wLWdhbGxlcmlhSXRlbVNsb3Q+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAqbmdJZj1cInNob3dUaHVtYm5haWxOYXZpZ2F0b3JzXCJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsgJ3AtZ2FsbGVyaWEtdGh1bWJuYWlsLW5leHQgcC1saW5rJzogdHJ1ZSwgJ3AtZGlzYWJsZWQnOiB0aGlzLmlzTmF2Rm9yd2FyZERpc2FibGVkKCkgfVwiXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJuYXZGb3J3YXJkKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiaXNOYXZGb3J3YXJkRGlzYWJsZWQoKVwiXG4gICAgICAgICAgICAgICAgICAgIHBSaXBwbGVcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJhcmlhTmV4dEJ1dHRvbkxhYmVsKClcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFnYWxsZXJpYS5uZXh0VGh1bWJuYWlsSWNvblRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Q2hldnJvblJpZ2h0SWNvbiAqbmdJZj1cIiFpc1ZlcnRpY2FsXCIgW25nQ2xhc3NdPVwiJ3AtZ2FsbGVyaWEtdGh1bWJuYWlsLW5leHQtaWNvbidcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPENoZXZyb25Eb3duSWNvbiAqbmdJZj1cImlzVmVydGljYWxcIiBbbmdDbGFzc109XCIncC1nYWxsZXJpYS10aHVtYm5haWwtbmV4dC1pY29uJ1wiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJnYWxsZXJpYS5uZXh0VGh1bWJuYWlsSWNvblRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEdhbGxlcmlhVGh1bWJuYWlscyBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJDb250ZW50Q2hlY2tlZCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgICBASW5wdXQoKSBjb250YWluZXJJZDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICAgQElucHV0KCkgdmFsdWU6IGFueVtdIHwgdW5kZWZpbmVkO1xuXG4gICAgQElucHV0KCkgaXNWZXJ0aWNhbDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KCkgc2xpZGVTaG93QWN0aXZlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKSBjaXJjdWxhcjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KCkgcmVzcG9uc2l2ZU9wdGlvbnM6IEdhbGxlcmlhUmVzcG9uc2l2ZU9wdGlvbnNbXSB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCgpIGNvbnRlbnRIZWlnaHQ6IHN0cmluZyA9ICczMDBweCc7XG5cbiAgICBASW5wdXQoKSBzaG93VGh1bWJuYWlsTmF2aWdhdG9ycyA9IHRydWU7XG5cbiAgICBASW5wdXQoKSB0ZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxQcmltZVRlbXBsYXRlPiB8IHVuZGVmaW5lZDtcblxuICAgIEBPdXRwdXQoKSBvbkFjdGl2ZUluZGV4Q2hhbmdlOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBzdG9wU2xpZGVTaG93OiBFdmVudEVtaXR0ZXI8RXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQFZpZXdDaGlsZCgnaXRlbXNDb250YWluZXInKSBpdGVtc0NvbnRhaW5lcjogRWxlbWVudFJlZiB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCgpIGdldCBudW1WaXNpYmxlKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9udW1WaXNpYmxlO1xuICAgIH1cblxuICAgIHNldCBudW1WaXNpYmxlKG51bVZpc2libGUpIHtcbiAgICAgICAgdGhpcy5fbnVtVmlzaWJsZSA9IG51bVZpc2libGU7XG4gICAgICAgIHRoaXMuX29sZE51bVZpc2libGUgPSB0aGlzLmRfbnVtVmlzaWJsZTtcbiAgICAgICAgdGhpcy5kX251bVZpc2libGUgPSBudW1WaXNpYmxlO1xuICAgIH1cblxuICAgIEBJbnB1dCgpIGdldCBhY3RpdmVJbmRleCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWN0aXZlSW5kZXg7XG4gICAgfVxuXG4gICAgc2V0IGFjdGl2ZUluZGV4KGFjdGl2ZUluZGV4KSB7XG4gICAgICAgIHRoaXMuX29sZGFjdGl2ZUluZGV4ID0gdGhpcy5fYWN0aXZlSW5kZXg7XG4gICAgICAgIHRoaXMuX2FjdGl2ZUluZGV4ID0gYWN0aXZlSW5kZXg7XG4gICAgfVxuXG4gICAgaW5kZXg6IG51bWJlciB8IHVuZGVmaW5lZDtcblxuICAgIHN0YXJ0UG9zOiB7IHg6IG51bWJlcjsgeTogbnVtYmVyIH0gfCBudWxsID0gbnVsbDtcblxuICAgIHRodW1ibmFpbHNTdHlsZTogSFRNTFN0eWxlRWxlbWVudCB8IG51bGwgPSBudWxsO1xuXG4gICAgc29ydGVkUmVzcG9uc2l2ZU9wdGlvbnM6IEdhbGxlcmlhUmVzcG9uc2l2ZU9wdGlvbnNbXSB8IG51bGwgPSBudWxsO1xuXG4gICAgdG90YWxTaGlmdGVkSXRlbXM6IG51bWJlciA9IDA7XG5cbiAgICBwYWdlOiBudW1iZXIgPSAwO1xuXG4gICAgZG9jdW1lbnRSZXNpemVMaXN0ZW5lcjogVm9pZExpc3RlbmVyO1xuXG4gICAgX251bVZpc2libGU6IG51bWJlciA9IDA7XG5cbiAgICBkX251bVZpc2libGU6IG51bWJlciA9IDA7XG5cbiAgICBfb2xkTnVtVmlzaWJsZTogbnVtYmVyID0gMDtcblxuICAgIF9hY3RpdmVJbmRleDogbnVtYmVyID0gMDtcblxuICAgIF9vbGRhY3RpdmVJbmRleDogbnVtYmVyID0gMDtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBnYWxsZXJpYTogR2FsbGVyaWEsIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IERvY3VtZW50LCBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IGFueSwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVTdHlsZSgpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5yZXNwb25zaXZlT3B0aW9ucykge1xuICAgICAgICAgICAgICAgIHRoaXMuYmluZERvY3VtZW50TGlzdGVuZXJzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XG4gICAgICAgIGxldCB0b3RhbFNoaWZ0ZWRJdGVtcyA9IHRoaXMudG90YWxTaGlmdGVkSXRlbXM7XG5cbiAgICAgICAgaWYgKCh0aGlzLl9vbGROdW1WaXNpYmxlICE9PSB0aGlzLmRfbnVtVmlzaWJsZSB8fCB0aGlzLl9vbGRhY3RpdmVJbmRleCAhPT0gdGhpcy5fYWN0aXZlSW5kZXgpICYmIHRoaXMuaXRlbXNDb250YWluZXIpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9hY3RpdmVJbmRleCA8PSB0aGlzLmdldE1lZGlhbkl0ZW1JbmRleCgpKSB7XG4gICAgICAgICAgICAgICAgdG90YWxTaGlmdGVkSXRlbXMgPSAwO1xuICAgICAgICAgICAgfSBlbHNlIGlmICgoPGFueVtdPnRoaXMudmFsdWUpLmxlbmd0aCAtIHRoaXMuZF9udW1WaXNpYmxlICsgdGhpcy5nZXRNZWRpYW5JdGVtSW5kZXgoKSA8IHRoaXMuX2FjdGl2ZUluZGV4KSB7XG4gICAgICAgICAgICAgICAgdG90YWxTaGlmdGVkSXRlbXMgPSB0aGlzLmRfbnVtVmlzaWJsZSAtICg8YW55W10+dGhpcy52YWx1ZSkubGVuZ3RoO1xuICAgICAgICAgICAgfSBlbHNlIGlmICgoPGFueVtdPnRoaXMudmFsdWUpLmxlbmd0aCAtIHRoaXMuZF9udW1WaXNpYmxlIDwgdGhpcy5fYWN0aXZlSW5kZXggJiYgdGhpcy5kX251bVZpc2libGUgJSAyID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdG90YWxTaGlmdGVkSXRlbXMgPSB0aGlzLl9hY3RpdmVJbmRleCAqIC0xICsgdGhpcy5nZXRNZWRpYW5JdGVtSW5kZXgoKSArIDE7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRvdGFsU2hpZnRlZEl0ZW1zID0gdGhpcy5fYWN0aXZlSW5kZXggKiAtMSArIHRoaXMuZ2V0TWVkaWFuSXRlbUluZGV4KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0b3RhbFNoaWZ0ZWRJdGVtcyAhPT0gdGhpcy50b3RhbFNoaWZ0ZWRJdGVtcykge1xuICAgICAgICAgICAgICAgIHRoaXMudG90YWxTaGlmdGVkSXRlbXMgPSB0b3RhbFNoaWZ0ZWRJdGVtcztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuaXRlbXNDb250YWluZXIgJiYgdGhpcy5pdGVtc0NvbnRhaW5lci5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtc0NvbnRhaW5lci5uYXRpdmVFbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IHRoaXMuaXNWZXJ0aWNhbCA/IGB0cmFuc2xhdGUzZCgwLCAke3RvdGFsU2hpZnRlZEl0ZW1zICogKDEwMCAvIHRoaXMuZF9udW1WaXNpYmxlKX0lLCAwKWAgOiBgdHJhbnNsYXRlM2QoJHt0b3RhbFNoaWZ0ZWRJdGVtcyAqICgxMDAgLyB0aGlzLmRfbnVtVmlzaWJsZSl9JSwgMCwgMClgO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5fb2xkYWN0aXZlSW5kZXggIT09IHRoaXMuX2FjdGl2ZUluZGV4KSB7XG4gICAgICAgICAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyh0aGlzLml0ZW1zQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQsICdwLWl0ZW1zLWhpZGRlbicpO1xuICAgICAgICAgICAgICAgIHRoaXMuaXRlbXNDb250YWluZXIubmF0aXZlRWxlbWVudC5zdHlsZS50cmFuc2l0aW9uID0gJ3RyYW5zZm9ybSA1MDBtcyBlYXNlIDBzJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fb2xkYWN0aXZlSW5kZXggPSB0aGlzLl9hY3RpdmVJbmRleDtcbiAgICAgICAgICAgIHRoaXMuX29sZE51bVZpc2libGUgPSB0aGlzLmRfbnVtVmlzaWJsZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgaWYgKHBsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZVBvc2l0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjcmVhdGVTdHlsZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnRodW1ibmFpbHNTdHlsZSkge1xuICAgICAgICAgICAgdGhpcy50aHVtYm5haWxzU3R5bGUgPSB0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy50aHVtYm5haWxzU3R5bGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGlubmVySFRNTCA9IGBcbiAgICAgICAgICAgICMke3RoaXMuY29udGFpbmVySWR9IC5wLWdhbGxlcmlhLXRodW1ibmFpbC1pdGVtIHtcbiAgICAgICAgICAgICAgICBmbGV4OiAxIDAgJHsxMDAgLyB0aGlzLmRfbnVtVmlzaWJsZX0lXG4gICAgICAgICAgICB9XG4gICAgICAgIGA7XG5cbiAgICAgICAgaWYgKHRoaXMucmVzcG9uc2l2ZU9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMuc29ydGVkUmVzcG9uc2l2ZU9wdGlvbnMgPSBbLi4udGhpcy5yZXNwb25zaXZlT3B0aW9uc107XG4gICAgICAgICAgICB0aGlzLnNvcnRlZFJlc3BvbnNpdmVPcHRpb25zLnNvcnQoKGRhdGExLCBkYXRhMikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlMSA9IGRhdGExLmJyZWFrcG9pbnQ7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWUyID0gZGF0YTIuYnJlYWtwb2ludDtcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZTEgPT0gbnVsbCAmJiB2YWx1ZTIgIT0gbnVsbCkgcmVzdWx0ID0gLTE7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodmFsdWUxICE9IG51bGwgJiYgdmFsdWUyID09IG51bGwpIHJlc3VsdCA9IDE7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodmFsdWUxID09IG51bGwgJiYgdmFsdWUyID09IG51bGwpIHJlc3VsdCA9IDA7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIHZhbHVlMSA9PT0gJ3N0cmluZycgJiYgdHlwZW9mIHZhbHVlMiA9PT0gJ3N0cmluZycpIHJlc3VsdCA9IHZhbHVlMS5sb2NhbGVDb21wYXJlKHZhbHVlMiwgdW5kZWZpbmVkLCB7IG51bWVyaWM6IHRydWUgfSk7XG4gICAgICAgICAgICAgICAgZWxzZSByZXN1bHQgPSB2YWx1ZTEgPCB2YWx1ZTIgPyAtMSA6IHZhbHVlMSA+IHZhbHVlMiA/IDEgOiAwO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIC0xICogcmVzdWx0O1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zb3J0ZWRSZXNwb25zaXZlT3B0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCByZXMgPSB0aGlzLnNvcnRlZFJlc3BvbnNpdmVPcHRpb25zW2ldO1xuXG4gICAgICAgICAgICAgICAgaW5uZXJIVE1MICs9IGBcbiAgICAgICAgICAgICAgICAgICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogJHtyZXMuYnJlYWtwb2ludH0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICMke3RoaXMuY29udGFpbmVySWR9IC5wLWdhbGxlcmlhLXRodW1ibmFpbC1pdGVtIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGV4OiAxIDAgJHsxMDAgLyByZXMubnVtVmlzaWJsZX0lXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBgO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50aHVtYm5haWxzU3R5bGUuaW5uZXJIVE1MID0gaW5uZXJIVE1MO1xuICAgIH1cblxuICAgIGNhbGN1bGF0ZVBvc2l0aW9uKCkge1xuICAgICAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXRlbXNDb250YWluZXIgJiYgdGhpcy5zb3J0ZWRSZXNwb25zaXZlT3B0aW9ucykge1xuICAgICAgICAgICAgICAgIGxldCB3aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICAgICAgICAgIGxldCBtYXRjaGVkUmVzcG9uc2l2ZURhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgIG51bVZpc2libGU6IHRoaXMuX251bVZpc2libGVcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNvcnRlZFJlc3BvbnNpdmVPcHRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZXMgPSB0aGlzLnNvcnRlZFJlc3BvbnNpdmVPcHRpb25zW2ldO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJzZUludChyZXMuYnJlYWtwb2ludCwgMTApID49IHdpbmRvd1dpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGVkUmVzcG9uc2l2ZURhdGEgPSByZXM7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kX251bVZpc2libGUgIT09IG1hdGNoZWRSZXNwb25zaXZlRGF0YS5udW1WaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZF9udW1WaXNpYmxlID0gbWF0Y2hlZFJlc3BvbnNpdmVEYXRhLm51bVZpc2libGU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0VGFiSW5kZXgoaW5kZXg6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5pc0l0ZW1BY3RpdmUoaW5kZXgpID8gMCA6IG51bGw7XG4gICAgfVxuXG4gICAgbmF2Rm9yd2FyZChlOiBUb3VjaEV2ZW50IHwgTW91c2VFdmVudCkge1xuICAgICAgICB0aGlzLnN0b3BUaGVTbGlkZVNob3coKTtcblxuICAgICAgICBsZXQgbmV4dEl0ZW1JbmRleCA9IHRoaXMuX2FjdGl2ZUluZGV4ICsgMTtcbiAgICAgICAgaWYgKG5leHRJdGVtSW5kZXggKyB0aGlzLnRvdGFsU2hpZnRlZEl0ZW1zID4gdGhpcy5nZXRNZWRpYW5JdGVtSW5kZXgoKSAmJiAoLTEgKiB0aGlzLnRvdGFsU2hpZnRlZEl0ZW1zIDwgdGhpcy5nZXRUb3RhbFBhZ2VOdW1iZXIoKSAtIDEgfHwgdGhpcy5jaXJjdWxhcikpIHtcbiAgICAgICAgICAgIHRoaXMuc3RlcCgtMSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgYWN0aXZlSW5kZXggPSB0aGlzLmNpcmN1bGFyICYmICg8YW55W10+dGhpcy52YWx1ZSkubGVuZ3RoIC0gMSA9PT0gdGhpcy5fYWN0aXZlSW5kZXggPyAwIDogbmV4dEl0ZW1JbmRleDtcbiAgICAgICAgdGhpcy5vbkFjdGl2ZUluZGV4Q2hhbmdlLmVtaXQoYWN0aXZlSW5kZXgpO1xuXG4gICAgICAgIGlmIChlLmNhbmNlbGFibGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5hdkJhY2t3YXJkKGU6IFRvdWNoRXZlbnQgfCBNb3VzZUV2ZW50KSB7XG4gICAgICAgIHRoaXMuc3RvcFRoZVNsaWRlU2hvdygpO1xuXG4gICAgICAgIGxldCBwcmV2SXRlbUluZGV4ID0gdGhpcy5fYWN0aXZlSW5kZXggIT09IDAgPyB0aGlzLl9hY3RpdmVJbmRleCAtIDEgOiAwO1xuICAgICAgICBsZXQgZGlmZiA9IHByZXZJdGVtSW5kZXggKyB0aGlzLnRvdGFsU2hpZnRlZEl0ZW1zO1xuICAgICAgICBpZiAodGhpcy5kX251bVZpc2libGUgLSBkaWZmIC0gMSA+IHRoaXMuZ2V0TWVkaWFuSXRlbUluZGV4KCkgJiYgKC0xICogdGhpcy50b3RhbFNoaWZ0ZWRJdGVtcyAhPT0gMCB8fCB0aGlzLmNpcmN1bGFyKSkge1xuICAgICAgICAgICAgdGhpcy5zdGVwKDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGFjdGl2ZUluZGV4ID0gdGhpcy5jaXJjdWxhciAmJiB0aGlzLl9hY3RpdmVJbmRleCA9PT0gMCA/ICg8YW55W10+dGhpcy52YWx1ZSkubGVuZ3RoIC0gMSA6IHByZXZJdGVtSW5kZXg7XG4gICAgICAgIHRoaXMub25BY3RpdmVJbmRleENoYW5nZS5lbWl0KGFjdGl2ZUluZGV4KTtcblxuICAgICAgICBpZiAoZS5jYW5jZWxhYmxlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkl0ZW1DbGljayhpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuc3RvcFRoZVNsaWRlU2hvdygpO1xuXG4gICAgICAgIGxldCBzZWxlY3RlZEl0ZW1JbmRleCA9IGluZGV4O1xuICAgICAgICBpZiAoc2VsZWN0ZWRJdGVtSW5kZXggIT09IHRoaXMuX2FjdGl2ZUluZGV4KSB7XG4gICAgICAgICAgICBjb25zdCBkaWZmID0gc2VsZWN0ZWRJdGVtSW5kZXggKyB0aGlzLnRvdGFsU2hpZnRlZEl0ZW1zO1xuICAgICAgICAgICAgbGV0IGRpciA9IDA7XG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWRJdGVtSW5kZXggPCB0aGlzLl9hY3RpdmVJbmRleCkge1xuICAgICAgICAgICAgICAgIGRpciA9IHRoaXMuZF9udW1WaXNpYmxlIC0gZGlmZiAtIDEgLSB0aGlzLmdldE1lZGlhbkl0ZW1JbmRleCgpO1xuICAgICAgICAgICAgICAgIGlmIChkaXIgPiAwICYmIC0xICogdGhpcy50b3RhbFNoaWZ0ZWRJdGVtcyAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0ZXAoZGlyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRpciA9IHRoaXMuZ2V0TWVkaWFuSXRlbUluZGV4KCkgLSBkaWZmO1xuICAgICAgICAgICAgICAgIGlmIChkaXIgPCAwICYmIC0xICogdGhpcy50b3RhbFNoaWZ0ZWRJdGVtcyA8IHRoaXMuZ2V0VG90YWxQYWdlTnVtYmVyKCkgLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RlcChkaXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5hY3RpdmVJbmRleCA9IHNlbGVjdGVkSXRlbUluZGV4O1xuICAgICAgICAgICAgdGhpcy5vbkFjdGl2ZUluZGV4Q2hhbmdlLmVtaXQodGhpcy5hY3RpdmVJbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblRodW1ibmFpbEtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQsIGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgaWYgKGV2ZW50LmNvZGUgPT09ICdFbnRlcicgfHwgZXZlbnQuY29kZSA9PT0gJ1NwYWNlJykge1xuICAgICAgICAgICAgdGhpcy5vbkl0ZW1DbGljayhpbmRleCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoIChldmVudC5jb2RlKSB7XG4gICAgICAgICAgICBjYXNlICdBcnJvd1JpZ2h0JzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uUmlnaHRLZXkoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnQXJyb3dMZWZ0JzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uTGVmdEtleSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdIb21lJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uSG9tZUtleSgpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0VuZCc6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkVuZEtleSgpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdUYWInOlxuICAgICAgICAgICAgICAgIHRoaXMub25UYWJLZXkoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uUmlnaHRLZXkoKSB7XG4gICAgICAgIGNvbnN0IGluZGljYXRvcnMgPSBEb21IYW5kbGVyLmZpbmQodGhpcy5pdGVtc0NvbnRhaW5lci5uYXRpdmVFbGVtZW50LCAnW2RhdGEtcGMtc2VjdGlvbj1cInRodW1ibmFpbGl0ZW1cIl0nKTtcbiAgICAgICAgY29uc3QgYWN0aXZlSW5kZXggPSB0aGlzLmZpbmRGb2N1c2VkSW5kaWNhdG9ySW5kZXgoKTtcblxuICAgICAgICB0aGlzLmNoYW5nZWRGb2N1c2VkSW5kaWNhdG9yKGFjdGl2ZUluZGV4LCBhY3RpdmVJbmRleCArIDEgPT09IGluZGljYXRvcnMubGVuZ3RoID8gaW5kaWNhdG9ycy5sZW5ndGggLSAxIDogYWN0aXZlSW5kZXggKyAxKTtcbiAgICB9XG5cbiAgICBvbkxlZnRLZXkoKSB7XG4gICAgICAgIGNvbnN0IGFjdGl2ZUluZGV4ID0gdGhpcy5maW5kRm9jdXNlZEluZGljYXRvckluZGV4KCk7XG5cbiAgICAgICAgdGhpcy5jaGFuZ2VkRm9jdXNlZEluZGljYXRvcihhY3RpdmVJbmRleCwgYWN0aXZlSW5kZXggLSAxIDw9IDAgPyAwIDogYWN0aXZlSW5kZXggLSAxKTtcbiAgICB9XG5cbiAgICBvbkhvbWVLZXkoKSB7XG4gICAgICAgIGNvbnN0IGFjdGl2ZUluZGV4ID0gdGhpcy5maW5kRm9jdXNlZEluZGljYXRvckluZGV4KCk7XG5cbiAgICAgICAgdGhpcy5jaGFuZ2VkRm9jdXNlZEluZGljYXRvcihhY3RpdmVJbmRleCwgMCk7XG4gICAgfVxuXG4gICAgb25FbmRLZXkoKSB7XG4gICAgICAgIGNvbnN0IGluZGljYXRvcnMgPSBEb21IYW5kbGVyLmZpbmQodGhpcy5pdGVtc0NvbnRhaW5lci5uYXRpdmVFbGVtZW50LCAnW2RhdGEtcGMtc2VjdGlvbj1cInRodW1ibmFpbGl0ZW1cIl0nKTtcbiAgICAgICAgY29uc3QgYWN0aXZlSW5kZXggPSB0aGlzLmZpbmRGb2N1c2VkSW5kaWNhdG9ySW5kZXgoKTtcblxuICAgICAgICB0aGlzLmNoYW5nZWRGb2N1c2VkSW5kaWNhdG9yKGFjdGl2ZUluZGV4LCBpbmRpY2F0b3JzLmxlbmd0aCAtIDEpO1xuICAgIH1cblxuICAgIG9uVGFiS2V5KCkge1xuICAgICAgICBjb25zdCBpbmRpY2F0b3JzID0gWy4uLkRvbUhhbmRsZXIuZmluZCh0aGlzLml0ZW1zQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQsICdbZGF0YS1wYy1zZWN0aW9uPVwidGh1bWJuYWlsaXRlbVwiXScpXTtcbiAgICAgICAgY29uc3QgaGlnaGxpZ2h0ZWRJbmRleCA9IGluZGljYXRvcnMuZmluZEluZGV4KChpbmQpID0+IERvbUhhbmRsZXIuZ2V0QXR0cmlidXRlKGluZCwgJ2RhdGEtcC1hY3RpdmUnKSA9PT0gdHJ1ZSk7XG5cbiAgICAgICAgY29uc3QgYWN0aXZlSW5kaWNhdG9yID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuaXRlbXNDb250YWluZXIubmF0aXZlRWxlbWVudCwgJ1t0YWJpbmRleD1cIjBcIl0nKTtcblxuICAgICAgICBjb25zdCBhY3RpdmVJbmRleCA9IGluZGljYXRvcnMuZmluZEluZGV4KChpbmQpID0+IGluZCA9PT0gYWN0aXZlSW5kaWNhdG9yLnBhcmVudEVsZW1lbnQpO1xuXG4gICAgICAgIGluZGljYXRvcnNbYWN0aXZlSW5kZXhdLmNoaWxkcmVuWzBdLnRhYkluZGV4ID0gJy0xJztcbiAgICAgICAgaW5kaWNhdG9yc1toaWdobGlnaHRlZEluZGV4XS5jaGlsZHJlblswXS50YWJJbmRleCA9ICcwJztcbiAgICB9XG5cbiAgICBmaW5kRm9jdXNlZEluZGljYXRvckluZGV4KCkge1xuICAgICAgICBjb25zdCBpbmRpY2F0b3JzID0gWy4uLkRvbUhhbmRsZXIuZmluZCh0aGlzLml0ZW1zQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQsICdbZGF0YS1wYy1zZWN0aW9uPVwidGh1bWJuYWlsaXRlbVwiXScpXTtcbiAgICAgICAgY29uc3QgYWN0aXZlSW5kaWNhdG9yID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuaXRlbXNDb250YWluZXIubmF0aXZlRWxlbWVudCwgJ1tkYXRhLXBjLXNlY3Rpb249XCJ0aHVtYm5haWxpdGVtXCJdID4gW3RhYmluZGV4PVwiMFwiXScpO1xuXG4gICAgICAgIHJldHVybiBpbmRpY2F0b3JzLmZpbmRJbmRleCgoaW5kKSA9PiBpbmQgPT09IGFjdGl2ZUluZGljYXRvci5wYXJlbnRFbGVtZW50KTtcbiAgICB9XG5cbiAgICBjaGFuZ2VkRm9jdXNlZEluZGljYXRvcihwcmV2SW5kLCBuZXh0SW5kKSB7XG4gICAgICAgIGNvbnN0IGluZGljYXRvcnMgPSBEb21IYW5kbGVyLmZpbmQodGhpcy5pdGVtc0NvbnRhaW5lci5uYXRpdmVFbGVtZW50LCAnW2RhdGEtcGMtc2VjdGlvbj1cInRodW1ibmFpbGl0ZW1cIl0nKTtcblxuICAgICAgICBpbmRpY2F0b3JzW3ByZXZJbmRdLmNoaWxkcmVuWzBdLnRhYkluZGV4ID0gJy0xJztcbiAgICAgICAgaW5kaWNhdG9yc1tuZXh0SW5kXS5jaGlsZHJlblswXS50YWJJbmRleCA9ICcwJztcbiAgICAgICAgaW5kaWNhdG9yc1tuZXh0SW5kXS5jaGlsZHJlblswXS5mb2N1cygpO1xuICAgIH1cblxuICAgIHN0ZXAoZGlyOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IHRvdGFsU2hpZnRlZEl0ZW1zID0gdGhpcy50b3RhbFNoaWZ0ZWRJdGVtcyArIGRpcjtcblxuICAgICAgICBpZiAoZGlyIDwgMCAmJiAtMSAqIHRvdGFsU2hpZnRlZEl0ZW1zICsgdGhpcy5kX251bVZpc2libGUgPiAoPGFueVtdPnRoaXMudmFsdWUpLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIHRvdGFsU2hpZnRlZEl0ZW1zID0gdGhpcy5kX251bVZpc2libGUgLSAoPGFueVtdPnRoaXMudmFsdWUpLmxlbmd0aDtcbiAgICAgICAgfSBlbHNlIGlmIChkaXIgPiAwICYmIHRvdGFsU2hpZnRlZEl0ZW1zID4gMCkge1xuICAgICAgICAgICAgdG90YWxTaGlmdGVkSXRlbXMgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY2lyY3VsYXIpIHtcbiAgICAgICAgICAgIGlmIChkaXIgPCAwICYmICg8YW55W10+dGhpcy52YWx1ZSkubGVuZ3RoIC0gMSA9PT0gdGhpcy5fYWN0aXZlSW5kZXgpIHtcbiAgICAgICAgICAgICAgICB0b3RhbFNoaWZ0ZWRJdGVtcyA9IDA7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRpciA+IDAgJiYgdGhpcy5fYWN0aXZlSW5kZXggPT09IDApIHtcbiAgICAgICAgICAgICAgICB0b3RhbFNoaWZ0ZWRJdGVtcyA9IHRoaXMuZF9udW1WaXNpYmxlIC0gKDxhbnlbXT50aGlzLnZhbHVlKS5sZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pdGVtc0NvbnRhaW5lcikge1xuICAgICAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyh0aGlzLml0ZW1zQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQsICdwLWl0ZW1zLWhpZGRlbicpO1xuICAgICAgICAgICAgdGhpcy5pdGVtc0NvbnRhaW5lci5uYXRpdmVFbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IHRoaXMuaXNWZXJ0aWNhbCA/IGB0cmFuc2xhdGUzZCgwLCAke3RvdGFsU2hpZnRlZEl0ZW1zICogKDEwMCAvIHRoaXMuZF9udW1WaXNpYmxlKX0lLCAwKWAgOiBgdHJhbnNsYXRlM2QoJHt0b3RhbFNoaWZ0ZWRJdGVtcyAqICgxMDAgLyB0aGlzLmRfbnVtVmlzaWJsZSl9JSwgMCwgMClgO1xuICAgICAgICAgICAgdGhpcy5pdGVtc0NvbnRhaW5lci5uYXRpdmVFbGVtZW50LnN0eWxlLnRyYW5zaXRpb24gPSAndHJhbnNmb3JtIDUwMG1zIGVhc2UgMHMnO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50b3RhbFNoaWZ0ZWRJdGVtcyA9IHRvdGFsU2hpZnRlZEl0ZW1zO1xuICAgIH1cblxuICAgIHN0b3BUaGVTbGlkZVNob3coKSB7XG4gICAgICAgIGlmICh0aGlzLnNsaWRlU2hvd0FjdGl2ZSAmJiB0aGlzLnN0b3BTbGlkZVNob3cpIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcFNsaWRlU2hvdy5lbWl0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGFuZ2VQYWdlT25Ub3VjaChlOiBUb3VjaEV2ZW50LCBkaWZmOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKGRpZmYgPCAwKSB7XG4gICAgICAgICAgICAvLyBsZWZ0XG4gICAgICAgICAgICB0aGlzLm5hdkZvcndhcmQoZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyByaWdodFxuICAgICAgICAgICAgdGhpcy5uYXZCYWNrd2FyZChlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFRvdGFsUGFnZU51bWJlcigpIHtcbiAgICAgICAgcmV0dXJuICg8YW55W10+dGhpcy52YWx1ZSkubGVuZ3RoID4gdGhpcy5kX251bVZpc2libGUgPyAoPGFueVtdPnRoaXMudmFsdWUpLmxlbmd0aCAtIHRoaXMuZF9udW1WaXNpYmxlICsgMSA6IDA7XG4gICAgfVxuXG4gICAgZ2V0TWVkaWFuSXRlbUluZGV4KCkge1xuICAgICAgICBsZXQgaW5kZXggPSBNYXRoLmZsb29yKHRoaXMuZF9udW1WaXNpYmxlIC8gMik7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZF9udW1WaXNpYmxlICUgMiA/IGluZGV4IDogaW5kZXggLSAxO1xuICAgIH1cblxuICAgIG9uVHJhbnNpdGlvbkVuZCgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXRlbXNDb250YWluZXIgJiYgdGhpcy5pdGVtc0NvbnRhaW5lci5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKHRoaXMuaXRlbXNDb250YWluZXIubmF0aXZlRWxlbWVudCwgJ3AtaXRlbXMtaGlkZGVuJyk7XG4gICAgICAgICAgICB0aGlzLml0ZW1zQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuc3R5bGUudHJhbnNpdGlvbiA9ICcnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Ub3VjaEVuZChlOiBUb3VjaEV2ZW50KSB7XG4gICAgICAgIGxldCB0b3VjaG9iaiA9IGUuY2hhbmdlZFRvdWNoZXNbMF07XG5cbiAgICAgICAgaWYgKHRoaXMuaXNWZXJ0aWNhbCkge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VQYWdlT25Ub3VjaChlLCB0b3VjaG9iai5wYWdlWSAtICg8eyB4OiBudW1iZXI7IHk6IG51bWJlciB9PnRoaXMuc3RhcnRQb3MpLnkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VQYWdlT25Ub3VjaChlLCB0b3VjaG9iai5wYWdlWCAtICg8eyB4OiBudW1iZXI7IHk6IG51bWJlciB9PnRoaXMuc3RhcnRQb3MpLngpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Ub3VjaE1vdmUoZTogVG91Y2hFdmVudCkge1xuICAgICAgICBpZiAoZS5jYW5jZWxhYmxlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblRvdWNoU3RhcnQoZTogVG91Y2hFdmVudCkge1xuICAgICAgICBsZXQgdG91Y2hvYmogPSBlLmNoYW5nZWRUb3VjaGVzWzBdO1xuXG4gICAgICAgIHRoaXMuc3RhcnRQb3MgPSB7XG4gICAgICAgICAgICB4OiB0b3VjaG9iai5wYWdlWCxcbiAgICAgICAgICAgIHk6IHRvdWNob2JqLnBhZ2VZXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgaXNOYXZCYWNrd2FyZERpc2FibGVkKCkge1xuICAgICAgICByZXR1cm4gKCF0aGlzLmNpcmN1bGFyICYmIHRoaXMuX2FjdGl2ZUluZGV4ID09PSAwKSB8fCAoPGFueVtdPnRoaXMudmFsdWUpLmxlbmd0aCA8PSB0aGlzLmRfbnVtVmlzaWJsZTtcbiAgICB9XG5cbiAgICBpc05hdkZvcndhcmREaXNhYmxlZCgpIHtcbiAgICAgICAgcmV0dXJuICghdGhpcy5jaXJjdWxhciAmJiB0aGlzLl9hY3RpdmVJbmRleCA9PT0gKDxhbnlbXT50aGlzLnZhbHVlKS5sZW5ndGggLSAxKSB8fCAoPGFueVtdPnRoaXMudmFsdWUpLmxlbmd0aCA8PSB0aGlzLmRfbnVtVmlzaWJsZTtcbiAgICB9XG5cbiAgICBmaXJzdEl0ZW1BY2l2ZUluZGV4KCkge1xuICAgICAgICByZXR1cm4gdGhpcy50b3RhbFNoaWZ0ZWRJdGVtcyAqIC0xO1xuICAgIH1cblxuICAgIGxhc3RJdGVtQWN0aXZlSW5kZXgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpcnN0SXRlbUFjaXZlSW5kZXgoKSArIHRoaXMuZF9udW1WaXNpYmxlIC0gMTtcbiAgICB9XG5cbiAgICBpc0l0ZW1BY3RpdmUoaW5kZXg6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5maXJzdEl0ZW1BY2l2ZUluZGV4KCkgPD0gaW5kZXggJiYgdGhpcy5sYXN0SXRlbUFjdGl2ZUluZGV4KCkgPj0gaW5kZXg7XG4gICAgfVxuXG4gICAgYmluZERvY3VtZW50TGlzdGVuZXJzKCkge1xuICAgICAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgICAgICAgY29uc3Qgd2luZG93ID0gdGhpcy5kb2N1bWVudC5kZWZhdWx0VmlldyB8fCAnd2luZG93JztcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHdpbmRvdywgJ3Jlc2l6ZScsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZVBvc2l0aW9uKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVuYmluZERvY3VtZW50TGlzdGVuZXJzKCkge1xuICAgICAgICBpZiAodGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMucmVzcG9uc2l2ZU9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMudW5iaW5kRG9jdW1lbnRMaXN0ZW5lcnMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnRodW1ibmFpbHNTdHlsZSkge1xuICAgICAgICAgICAgdGhpcy50aHVtYm5haWxzU3R5bGUucGFyZW50Tm9kZT8ucmVtb3ZlQ2hpbGQodGhpcy50aHVtYm5haWxzU3R5bGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXJpYVByZXZCdXR0b25MYWJlbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2FsbGVyaWEuY29uZmlnLnRyYW5zbGF0aW9uLmFyaWEgPyB0aGlzLmdhbGxlcmlhLmNvbmZpZy50cmFuc2xhdGlvbi5hcmlhLnByZXZQYWdlTGFiZWwgOiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgYXJpYU5leHRCdXR0b25MYWJlbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2FsbGVyaWEuY29uZmlnLnRyYW5zbGF0aW9uLmFyaWEgPyB0aGlzLmdhbGxlcmlhLmNvbmZpZy50cmFuc2xhdGlvbi5hcmlhLm5leHRQYWdlTGFiZWwgOiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgYXJpYVBhZ2VMYWJlbCh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5nYWxsZXJpYS5jb25maWcudHJhbnNsYXRpb24uYXJpYSA/IHRoaXMuZ2FsbGVyaWEuY29uZmlnLnRyYW5zbGF0aW9uLmFyaWEucGFnZUxhYmVsLnJlcGxhY2UoL3twYWdlfS9nLCB2YWx1ZSkgOiB1bmRlZmluZWQ7XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIFNoYXJlZE1vZHVsZSwgUmlwcGxlTW9kdWxlLCBUaW1lc0ljb24sIENoZXZyb25SaWdodEljb24sIENoZXZyb25MZWZ0SWNvbiwgV2luZG93TWF4aW1pemVJY29uLCBXaW5kb3dNaW5pbWl6ZUljb24sIEZvY3VzVHJhcE1vZHVsZV0sXG4gICAgZXhwb3J0czogW0NvbW1vbk1vZHVsZSwgR2FsbGVyaWEsIEdhbGxlcmlhQ29udGVudCwgR2FsbGVyaWFJdGVtU2xvdCwgR2FsbGVyaWFJdGVtLCBHYWxsZXJpYVRodW1ibmFpbHMsIFNoYXJlZE1vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbR2FsbGVyaWEsIEdhbGxlcmlhQ29udGVudCwgR2FsbGVyaWFJdGVtU2xvdCwgR2FsbGVyaWFJdGVtLCBHYWxsZXJpYVRodW1ibmFpbHNdXG59KVxuZXhwb3J0IGNsYXNzIEdhbGxlcmlhTW9kdWxlIHt9XG4iXX0=