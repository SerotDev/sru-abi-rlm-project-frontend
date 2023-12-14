import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule, DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, HostListener, Inject, Input, NgModule, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { EyeIcon } from 'primeng/icons/eye';
import { RefreshIcon } from 'primeng/icons/refresh';
import { SearchMinusIcon } from 'primeng/icons/searchminus';
import { SearchPlusIcon } from 'primeng/icons/searchplus';
import { TimesIcon } from 'primeng/icons/times';
import { UndoIcon } from 'primeng/icons/undo';
import { ZIndexUtils } from 'primeng/utils';
import { FocusTrapModule } from 'primeng/focustrap';
import * as i0 from "@angular/core";
import * as i1 from "primeng/api";
import * as i2 from "@angular/common";
import * as i3 from "primeng/focustrap";
/**
 * Displays an image with preview and tranformation options. For multiple image, see Galleria.
 * @group Components
 */
export class Image {
    document;
    config;
    cd;
    el;
    /**
     * Style class of the image element.
     * @group Props
     */
    imageClass;
    /**
     * Inline style of the image element.
     * @group Props
     */
    imageStyle;
    /**
     * Class of the element.
     * @group Props
     */
    styleClass;
    /**
     * Inline style of the element.
     * @group Props
     */
    style;
    /**
     * The source path for the main image.
     * @group Props
     */
    src;
    /**
     * The srcset definition for the main image.
     * @group Props
     */
    srcSet;
    /**
     * The sizes definition for the main image.
     * @group Props
     */
    sizes;
    /**
     * The source path for the preview image.
     * @group Props
     */
    previewImageSrc;
    /**
     * The srcset definition for the preview image.
     * @group Props
     */
    previewImageSrcSet;
    /**
     * The sizes definition for the preview image.
     * @group Props
     */
    previewImageSizes;
    /**
     * Attribute of the preview image element.
     * @group Props
     */
    alt;
    /**
     * Attribute of the image element.
     * @group Props
     */
    width;
    /**
     * Attribute of the image element.
     * @group Props
     */
    height;
    /**
     * Attribute of the image element.
     * @group Props
     */
    loading;
    /**
     * Target element to attach the dialog, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
     * @group Props
     */
    appendTo;
    /**
     * Controls the preview functionality.
     * @group Props
     */
    preview = false;
    /**
     * Transition options of the show animation
     * @group Props
     */
    showTransitionOptions = '150ms cubic-bezier(0, 0, 0.2, 1)';
    /**
     * Transition options of the hide animation
     * @group Props
     */
    hideTransitionOptions = '150ms cubic-bezier(0, 0, 0.2, 1)';
    /**
     * Triggered when the preview overlay is shown.
     * @group Emits
     */
    onShow = new EventEmitter();
    /**
     * Triggered when the preview overlay is hidden.
     * @group Emits
     */
    onHide = new EventEmitter();
    /**
     * This event is triggered if an error occurs while loading an image file.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onImageError = new EventEmitter();
    mask;
    previewButton;
    closeButton;
    templates;
    indicatorTemplate;
    rotateRightIconTemplate;
    rotateLeftIconTemplate;
    zoomOutIconTemplate;
    zoomInIconTemplate;
    closeIconTemplate;
    maskVisible = false;
    previewVisible = false;
    rotate = 0;
    scale = 1;
    previewClick = false;
    container;
    wrapper;
    get isZoomOutDisabled() {
        return this.scale - this.zoomSettings.step <= this.zoomSettings.min;
    }
    get isZoomInDisabled() {
        return this.scale + this.zoomSettings.step >= this.zoomSettings.max;
    }
    zoomSettings = {
        default: 1,
        step: 0.1,
        max: 1.5,
        min: 0.5
    };
    constructor(document, config, cd, el) {
        this.document = document;
        this.config = config;
        this.cd = cd;
        this.el = el;
    }
    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'indicator':
                    this.indicatorTemplate = item.template;
                    break;
                case 'rotaterighticon':
                    this.rotateRightIconTemplate = item.template;
                    break;
                case 'rotatelefticon':
                    this.rotateLeftIconTemplate = item.template;
                    break;
                case 'zoomouticon':
                    this.zoomOutIconTemplate = item.template;
                    break;
                case 'zoominicon':
                    this.zoomInIconTemplate = item.template;
                    break;
                case 'closeicon':
                    this.closeIconTemplate = item.template;
                    break;
                default:
                    this.indicatorTemplate = item.template;
                    break;
            }
        });
    }
    onImageClick() {
        if (this.preview) {
            this.maskVisible = true;
            this.previewVisible = true;
            DomHandler.blockBodyScroll();
        }
    }
    onMaskClick() {
        if (!this.previewClick) {
            this.closePreview();
        }
        this.previewClick = false;
    }
    onMaskKeydown(event) {
        switch (event.code) {
            case 'Escape':
                this.onMaskClick();
                setTimeout(() => {
                    DomHandler.focus(this.previewButton.nativeElement);
                }, 25);
                event.preventDefault();
                break;
            default:
                break;
        }
    }
    onPreviewImageClick() {
        this.previewClick = true;
    }
    rotateRight() {
        this.rotate += 90;
        this.previewClick = true;
    }
    rotateLeft() {
        this.rotate -= 90;
        this.previewClick = true;
    }
    zoomIn() {
        this.scale = this.scale + this.zoomSettings.step;
        this.previewClick = true;
    }
    zoomOut() {
        this.scale = this.scale - this.zoomSettings.step;
        this.previewClick = true;
    }
    onAnimationStart(event) {
        switch (event.toState) {
            case 'visible':
                this.container = event.element;
                this.wrapper = this.container?.parentElement;
                this.appendContainer();
                this.moveOnTop();
                setTimeout(() => {
                    DomHandler.focus(this.closeButton.nativeElement);
                }, 25);
                break;
            case 'void':
                DomHandler.addClass(this.wrapper, 'p-component-overlay-leave');
                break;
        }
    }
    onAnimationEnd(event) {
        switch (event.toState) {
            case 'void':
                ZIndexUtils.clear(this.wrapper);
                this.maskVisible = false;
                this.container = null;
                this.wrapper = null;
                this.cd.markForCheck();
                this.onHide.emit({});
                break;
            case 'visible':
                this.onShow.emit({});
                break;
        }
    }
    moveOnTop() {
        ZIndexUtils.set('modal', this.wrapper, this.config.zIndex.modal);
    }
    appendContainer() {
        if (this.appendTo) {
            if (this.appendTo === 'body')
                this.document.body.appendChild(this.wrapper);
            else
                DomHandler.appendChild(this.wrapper, this.appendTo);
        }
    }
    imagePreviewStyle() {
        return { transform: 'rotate(' + this.rotate + 'deg) scale(' + this.scale + ')' };
    }
    get zoomImageAriaLabel() {
        return this.config.translation.aria ? this.config.translation.aria.zoomImage : undefined;
    }
    containerClass() {
        return {
            'p-image p-component': true,
            'p-image-preview-container': this.preview
        };
    }
    handleToolbarClick(event) {
        event.stopPropagation();
    }
    closePreview() {
        this.previewVisible = false;
        this.rotate = 0;
        this.scale = this.zoomSettings.default;
        DomHandler.unblockBodyScroll();
    }
    imageError(event) {
        this.onImageError.emit(event);
    }
    rightAriaLabel() {
        return this.config.translation.aria ? this.config.translation.aria.rotateRight : undefined;
    }
    leftAriaLabel() {
        return this.config.translation.aria ? this.config.translation.aria.rotateLeft : undefined;
    }
    zoomInAriaLabel() {
        return this.config.translation.aria ? this.config.translation.aria.zoomIn : undefined;
    }
    zoomOutAriaLabel() {
        return this.config.translation.aria ? this.config.translation.aria.zoomOut : undefined;
    }
    closeAriaLabel() {
        return this.config.translation.aria ? this.config.translation.aria.close : undefined;
    }
    onKeydownHandler(event) {
        if (this.previewVisible) {
            this.closePreview();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: Image, deps: [{ token: DOCUMENT }, { token: i1.PrimeNGConfig }, { token: i0.ChangeDetectorRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.5", type: Image, selector: "p-image", inputs: { imageClass: "imageClass", imageStyle: "imageStyle", styleClass: "styleClass", style: "style", src: "src", srcSet: "srcSet", sizes: "sizes", previewImageSrc: "previewImageSrc", previewImageSrcSet: "previewImageSrcSet", previewImageSizes: "previewImageSizes", alt: "alt", width: "width", height: "height", loading: "loading", appendTo: "appendTo", preview: "preview", showTransitionOptions: "showTransitionOptions", hideTransitionOptions: "hideTransitionOptions" }, outputs: { onShow: "onShow", onHide: "onHide", onImageError: "onImageError" }, host: { listeners: { "document:keydown.escape": "onKeydownHandler($event)" }, classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "mask", first: true, predicate: ["mask"], descendants: true }, { propertyName: "previewButton", first: true, predicate: ["previewButton"], descendants: true }, { propertyName: "closeButton", first: true, predicate: ["closeButton"], descendants: true }], ngImport: i0, template: `
        <span [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="style">
            <img [attr.src]="src" [attr.srcset]="srcSet" [attr.sizes]="sizes" [attr.alt]="alt" [attr.width]="width" [attr.height]="height" [attr.loading]="loading" [ngStyle]="imageStyle" [class]="imageClass" (error)="imageError($event)" />
            <button *ngIf="preview" [attr.aria-label]="zoomImageAriaLabel" type="button" class="p-image-preview-indicator" (click)="onImageClick()" #previewButton [ngStyle]="{ height: height + 'px', width: width + 'px' }" style="border: 'none';">
                <ng-container *ngIf="indicatorTemplate; else defaultTemplate">
                    <ng-container *ngTemplateOutlet="indicatorTemplate"></ng-container>
                </ng-container>
                <ng-template #defaultTemplate>
                    <EyeIcon [styleClass]="'p-image-preview-icon'" />
                </ng-template>
            </button>
            <div #mask class="p-image-mask p-component-overlay p-component-overlay-enter" *ngIf="maskVisible" [attr.aria-modal]="maskVisible" role="dialog" (click)="onMaskClick()" (keydown)="onMaskKeydown($event)" pFocusTrap>
                <div class="p-image-toolbar" (click)="handleToolbarClick($event)">
                    <button class="p-image-action p-link" (click)="rotateRight()" type="button" [attr.aria-label]="rightAriaLabel()">
                        <RefreshIcon *ngIf="!rotateRightIconTemplate" />
                        <ng-template *ngTemplateOutlet="rotateRightIconTemplate"></ng-template>
                    </button>
                    <button class="p-image-action p-link" (click)="rotateLeft()" type="button" [attr.aria-label]="leftAriaLabel()">
                        <UndoIcon *ngIf="!rotateLeftIconTemplate" />
                        <ng-template *ngTemplateOutlet="rotateLeftIconTemplate"></ng-template>
                    </button>
                    <button class="p-image-action p-link" (click)="zoomOut()" type="button" [disabled]="isZoomOutDisabled" [attr.aria-label]="zoomOutAriaLabel()">
                        <SearchMinusIcon *ngIf="!zoomOutIconTemplate" />
                        <ng-template *ngTemplateOutlet="zoomOutIconTemplate"></ng-template>
                    </button>
                    <button class="p-image-action p-link" (click)="zoomIn()" type="button" [disabled]="isZoomInDisabled" [attr.aria-label]="zoomInAriaLabel()">
                        <SearchPlusIcon *ngIf="!zoomInIconTemplate" />
                        <ng-template *ngTemplateOutlet="zoomInIconTemplate"></ng-template>
                    </button>
                    <button class="p-image-action p-link" type="button" (click)="closePreview()" [attr.aria-label]="closeAriaLabel()" #closeButton>
                        <TimesIcon *ngIf="!closeIconTemplate" />
                        <ng-template *ngTemplateOutlet="closeIconTemplate"></ng-template>
                    </button>
                </div>
                <div
                    *ngIf="previewVisible"
                    [@animation]="{ value: 'visible', params: { showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions } }"
                    (@animation.start)="onAnimationStart($event)"
                    (@animation.done)="onAnimationEnd($event)"
                >
                    <img [attr.src]="previewImageSrc ? previewImageSrc : src" [attr.srcset]="previewImageSrcSet" [attr.sizes]="previewImageSizes" class="p-image-preview" [ngStyle]="imagePreviewStyle()" (click)="onPreviewImageClick()" />
                </div>
            </div>
        </span>
    `, isInline: true, styles: ["@layer primeng{.p-image-mask{display:flex;align-items:center;justify-content:center}.p-image-preview-container{position:relative;display:inline-block;line-height:0}.p-image-preview-indicator{position:absolute;left:0;top:0;width:100%;height:100%;outline:none;border:none;padding:0;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .3s}.p-image-preview-icon.pi{font-size:1.5rem}.p-image-preview-icon.p-icon{scale:1.5}.p-image-preview-container:hover>.p-image-preview-indicator{opacity:1;cursor:pointer}.p-image-preview-container>img{cursor:pointer}.p-image-toolbar{position:absolute;top:0;right:0;display:flex;z-index:1}.p-image-action.p-link{display:flex;justify-content:center;align-items:center}.p-image-action.p-link[disabled]{opacity:.5}.p-image-preview{transition:transform .15s;max-width:100vw;max-height:100vh}}\n"], dependencies: [{ kind: "directive", type: i0.forwardRef(() => i2.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgIf), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgStyle), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: i0.forwardRef(() => RefreshIcon), selector: "RefreshIcon" }, { kind: "component", type: i0.forwardRef(() => EyeIcon), selector: "EyeIcon" }, { kind: "component", type: i0.forwardRef(() => UndoIcon), selector: "UndoIcon" }, { kind: "component", type: i0.forwardRef(() => SearchMinusIcon), selector: "SearchMinusIcon" }, { kind: "component", type: i0.forwardRef(() => SearchPlusIcon), selector: "SearchPlusIcon" }, { kind: "component", type: i0.forwardRef(() => TimesIcon), selector: "TimesIcon" }, { kind: "directive", type: i0.forwardRef(() => i3.FocusTrap), selector: "[pFocusTrap]", inputs: ["pFocusTrapDisabled"] }], animations: [
            trigger('animation', [
                transition('void => visible', [style({ transform: 'scale(0.7)', opacity: 0 }), animate('{{showTransitionParams}}')]),
                transition('visible => void', [animate('{{hideTransitionParams}}', style({ transform: 'scale(0.7)', opacity: 0 }))])
            ])
        ], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: Image, decorators: [{
            type: Component,
            args: [{ selector: 'p-image', template: `
        <span [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="style">
            <img [attr.src]="src" [attr.srcset]="srcSet" [attr.sizes]="sizes" [attr.alt]="alt" [attr.width]="width" [attr.height]="height" [attr.loading]="loading" [ngStyle]="imageStyle" [class]="imageClass" (error)="imageError($event)" />
            <button *ngIf="preview" [attr.aria-label]="zoomImageAriaLabel" type="button" class="p-image-preview-indicator" (click)="onImageClick()" #previewButton [ngStyle]="{ height: height + 'px', width: width + 'px' }" style="border: 'none';">
                <ng-container *ngIf="indicatorTemplate; else defaultTemplate">
                    <ng-container *ngTemplateOutlet="indicatorTemplate"></ng-container>
                </ng-container>
                <ng-template #defaultTemplate>
                    <EyeIcon [styleClass]="'p-image-preview-icon'" />
                </ng-template>
            </button>
            <div #mask class="p-image-mask p-component-overlay p-component-overlay-enter" *ngIf="maskVisible" [attr.aria-modal]="maskVisible" role="dialog" (click)="onMaskClick()" (keydown)="onMaskKeydown($event)" pFocusTrap>
                <div class="p-image-toolbar" (click)="handleToolbarClick($event)">
                    <button class="p-image-action p-link" (click)="rotateRight()" type="button" [attr.aria-label]="rightAriaLabel()">
                        <RefreshIcon *ngIf="!rotateRightIconTemplate" />
                        <ng-template *ngTemplateOutlet="rotateRightIconTemplate"></ng-template>
                    </button>
                    <button class="p-image-action p-link" (click)="rotateLeft()" type="button" [attr.aria-label]="leftAriaLabel()">
                        <UndoIcon *ngIf="!rotateLeftIconTemplate" />
                        <ng-template *ngTemplateOutlet="rotateLeftIconTemplate"></ng-template>
                    </button>
                    <button class="p-image-action p-link" (click)="zoomOut()" type="button" [disabled]="isZoomOutDisabled" [attr.aria-label]="zoomOutAriaLabel()">
                        <SearchMinusIcon *ngIf="!zoomOutIconTemplate" />
                        <ng-template *ngTemplateOutlet="zoomOutIconTemplate"></ng-template>
                    </button>
                    <button class="p-image-action p-link" (click)="zoomIn()" type="button" [disabled]="isZoomInDisabled" [attr.aria-label]="zoomInAriaLabel()">
                        <SearchPlusIcon *ngIf="!zoomInIconTemplate" />
                        <ng-template *ngTemplateOutlet="zoomInIconTemplate"></ng-template>
                    </button>
                    <button class="p-image-action p-link" type="button" (click)="closePreview()" [attr.aria-label]="closeAriaLabel()" #closeButton>
                        <TimesIcon *ngIf="!closeIconTemplate" />
                        <ng-template *ngTemplateOutlet="closeIconTemplate"></ng-template>
                    </button>
                </div>
                <div
                    *ngIf="previewVisible"
                    [@animation]="{ value: 'visible', params: { showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions } }"
                    (@animation.start)="onAnimationStart($event)"
                    (@animation.done)="onAnimationEnd($event)"
                >
                    <img [attr.src]="previewImageSrc ? previewImageSrc : src" [attr.srcset]="previewImageSrcSet" [attr.sizes]="previewImageSizes" class="p-image-preview" [ngStyle]="imagePreviewStyle()" (click)="onPreviewImageClick()" />
                </div>
            </div>
        </span>
    `, animations: [
                        trigger('animation', [
                            transition('void => visible', [style({ transform: 'scale(0.7)', opacity: 0 }), animate('{{showTransitionParams}}')]),
                            transition('visible => void', [animate('{{hideTransitionParams}}', style({ transform: 'scale(0.7)', opacity: 0 }))])
                        ])
                    ], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: ["@layer primeng{.p-image-mask{display:flex;align-items:center;justify-content:center}.p-image-preview-container{position:relative;display:inline-block;line-height:0}.p-image-preview-indicator{position:absolute;left:0;top:0;width:100%;height:100%;outline:none;border:none;padding:0;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .3s}.p-image-preview-icon.pi{font-size:1.5rem}.p-image-preview-icon.p-icon{scale:1.5}.p-image-preview-container:hover>.p-image-preview-indicator{opacity:1;cursor:pointer}.p-image-preview-container>img{cursor:pointer}.p-image-toolbar{position:absolute;top:0;right:0;display:flex;z-index:1}.p-image-action.p-link{display:flex;justify-content:center;align-items:center}.p-image-action.p-link[disabled]{opacity:.5}.p-image-preview{transition:transform .15s;max-width:100vw;max-height:100vh}}\n"] }]
        }], ctorParameters: () => [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i1.PrimeNGConfig }, { type: i0.ChangeDetectorRef }, { type: i0.ElementRef }], propDecorators: { imageClass: [{
                type: Input
            }], imageStyle: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], style: [{
                type: Input
            }], src: [{
                type: Input
            }], srcSet: [{
                type: Input
            }], sizes: [{
                type: Input
            }], previewImageSrc: [{
                type: Input
            }], previewImageSrcSet: [{
                type: Input
            }], previewImageSizes: [{
                type: Input
            }], alt: [{
                type: Input
            }], width: [{
                type: Input
            }], height: [{
                type: Input
            }], loading: [{
                type: Input
            }], appendTo: [{
                type: Input
            }], preview: [{
                type: Input
            }], showTransitionOptions: [{
                type: Input
            }], hideTransitionOptions: [{
                type: Input
            }], onShow: [{
                type: Output
            }], onHide: [{
                type: Output
            }], onImageError: [{
                type: Output
            }], mask: [{
                type: ViewChild,
                args: ['mask']
            }], previewButton: [{
                type: ViewChild,
                args: ['previewButton']
            }], closeButton: [{
                type: ViewChild,
                args: ['closeButton']
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }], onKeydownHandler: [{
                type: HostListener,
                args: ['document:keydown.escape', ['$event']]
            }] } });
export class ImageModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: ImageModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.0.5", ngImport: i0, type: ImageModule, declarations: [Image], imports: [CommonModule, SharedModule, RefreshIcon, EyeIcon, UndoIcon, SearchMinusIcon, SearchPlusIcon, TimesIcon, FocusTrapModule], exports: [Image, SharedModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: ImageModule, imports: [CommonModule, SharedModule, RefreshIcon, EyeIcon, UndoIcon, SearchMinusIcon, SearchPlusIcon, TimesIcon, FocusTrapModule, SharedModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: ImageModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, SharedModule, RefreshIcon, EyeIcon, UndoIcon, SearchMinusIcon, SearchPlusIcon, TimesIcon, FocusTrapModule],
                    exports: [Image, SharedModule],
                    declarations: [Image]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvaW1hZ2UvaW1hZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFrQixPQUFPLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMxRixPQUFPLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pELE9BQU8sRUFBb0IsdUJBQXVCLEVBQXFCLFNBQVMsRUFBRSxlQUFlLEVBQWMsWUFBWSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQTBCLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV4UCxPQUFPLEVBQWlCLGFBQWEsRUFBRSxZQUFZLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDekUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN6QyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDNUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3BELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTVDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7Ozs7QUFFcEQ7OztHQUdHO0FBNkRILE1BQU0sT0FBTyxLQUFLO0lBNkp3QjtJQUE0QjtJQUErQjtJQUE4QjtJ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QUFXO2tCQUx2QixRQUFRO21CQUFDO29CQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFFLGNBQWMsRUFBRSxTQUFTLEVBQUUsZUFBZSxDQUFDO29CQUNsSSxPQUFPLEVBQUUsQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDO29CQUM5QixZQUFZLEVBQUUsQ0FBQyxLQUFLLENBQUM7aUJBQ3hCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQW5pbWF0aW9uRXZlbnQsIGFuaW1hdGUsIHN0eWxlLCB0cmFuc2l0aW9uLCB0cmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUsIERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEFmdGVyQ29udGVudEluaXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBDb250ZW50Q2hpbGRyZW4sIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSG9zdExpc3RlbmVyLCBJbmplY3QsIElucHV0LCBOZ01vZHVsZSwgT3V0cHV0LCBRdWVyeUxpc3QsIFRlbXBsYXRlUmVmLCBWaWV3Q2hpbGQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTYWZlVXJsIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBQcmltZU5HQ29uZmlnLCBQcmltZVRlbXBsYXRlLCBTaGFyZWRNb2R1bGUgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBEb21IYW5kbGVyIH0gZnJvbSAncHJpbWVuZy9kb20nO1xuaW1wb3J0IHsgRXllSWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvZXllJztcbmltcG9ydCB7IFJlZnJlc2hJY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy9yZWZyZXNoJztcbmltcG9ydCB7IFNlYXJjaE1pbnVzSWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvc2VhcmNobWludXMnO1xuaW1wb3J0IHsgU2VhcmNoUGx1c0ljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL3NlYXJjaHBsdXMnO1xuaW1wb3J0IHsgVGltZXNJY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy90aW1lcyc7XG5pbXBvcnQgeyBVbmRvSWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvdW5kbyc7XG5pbXBvcnQgeyBaSW5kZXhVdGlscyB9IGZyb20gJ3ByaW1lbmcvdXRpbHMnO1xuaW1wb3J0IHsgTnVsbGFibGUgfSBmcm9tICdwcmltZW5nL3RzLWhlbHBlcnMnO1xuaW1wb3J0IHsgRm9jdXNUcmFwTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9mb2N1c3RyYXAnO1xuXG4vKipcbiAqIERpc3BsYXlzIGFuIGltYWdlIHdpdGggcHJldmlldyBhbmQgdHJhbmZvcm1hdGlvbiBvcHRpb25zLiBGb3IgbXVsdGlwbGUgaW1hZ2UsIHNlZSBHYWxsZXJpYS5cbiAqIEBncm91cCBDb21wb25lbnRzXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1pbWFnZScsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPHNwYW4gW25nQ2xhc3NdPVwiY29udGFpbmVyQ2xhc3MoKVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCIgW25nU3R5bGVdPVwic3R5bGVcIj5cbiAgICAgICAgICAgIDxpbWcgW2F0dHIuc3JjXT1cInNyY1wiIFthdHRyLnNyY3NldF09XCJzcmNTZXRcIiBbYXR0ci5zaXplc109XCJzaXplc1wiIFthdHRyLmFsdF09XCJhbHRcIiBbYXR0ci53aWR0aF09XCJ3aWR0aFwiIFthdHRyLmhlaWdodF09XCJoZWlnaHRcIiBbYXR0ci5sb2FkaW5nXT1cImxvYWRpbmdcIiBbbmdTdHlsZV09XCJpbWFnZVN0eWxlXCIgW2NsYXNzXT1cImltYWdlQ2xhc3NcIiAoZXJyb3IpPVwiaW1hZ2VFcnJvcigkZXZlbnQpXCIgLz5cbiAgICAgICAgICAgIDxidXR0b24gKm5nSWY9XCJwcmV2aWV3XCIgW2F0dHIuYXJpYS1sYWJlbF09XCJ6b29tSW1hZ2VBcmlhTGFiZWxcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJwLWltYWdlLXByZXZpZXctaW5kaWNhdG9yXCIgKGNsaWNrKT1cIm9uSW1hZ2VDbGljaygpXCIgI3ByZXZpZXdCdXR0b24gW25nU3R5bGVdPVwieyBoZWlnaHQ6IGhlaWdodCArICdweCcsIHdpZHRoOiB3aWR0aCArICdweCcgfVwiIHN0eWxlPVwiYm9yZGVyOiAnbm9uZSc7XCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImluZGljYXRvclRlbXBsYXRlOyBlbHNlIGRlZmF1bHRUZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiaW5kaWNhdG9yVGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI2RlZmF1bHRUZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgPEV5ZUljb24gW3N0eWxlQ2xhc3NdPVwiJ3AtaW1hZ2UtcHJldmlldy1pY29uJ1wiIC8+XG4gICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGRpdiAjbWFzayBjbGFzcz1cInAtaW1hZ2UtbWFzayBwLWNvbXBvbmVudC1vdmVybGF5IHAtY29tcG9uZW50LW92ZXJsYXktZW50ZXJcIiAqbmdJZj1cIm1hc2tWaXNpYmxlXCIgW2F0dHIuYXJpYS1tb2RhbF09XCJtYXNrVmlzaWJsZVwiIHJvbGU9XCJkaWFsb2dcIiAoY2xpY2spPVwib25NYXNrQ2xpY2soKVwiIChrZXlkb3duKT1cIm9uTWFza0tleWRvd24oJGV2ZW50KVwiIHBGb2N1c1RyYXA+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtaW1hZ2UtdG9vbGJhclwiIChjbGljayk9XCJoYW5kbGVUb29sYmFyQ2xpY2soJGV2ZW50KVwiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwicC1pbWFnZS1hY3Rpb24gcC1saW5rXCIgKGNsaWNrKT1cInJvdGF0ZVJpZ2h0KClcIiB0eXBlPVwiYnV0dG9uXCIgW2F0dHIuYXJpYS1sYWJlbF09XCJyaWdodEFyaWFMYWJlbCgpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8UmVmcmVzaEljb24gKm5nSWY9XCIhcm90YXRlUmlnaHRJY29uVGVtcGxhdGVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwicm90YXRlUmlnaHRJY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInAtaW1hZ2UtYWN0aW9uIHAtbGlua1wiIChjbGljayk9XCJyb3RhdGVMZWZ0KClcIiB0eXBlPVwiYnV0dG9uXCIgW2F0dHIuYXJpYS1sYWJlbF09XCJsZWZ0QXJpYUxhYmVsKClcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxVbmRvSWNvbiAqbmdJZj1cIiFyb3RhdGVMZWZ0SWNvblRlbXBsYXRlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cInJvdGF0ZUxlZnRJY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInAtaW1hZ2UtYWN0aW9uIHAtbGlua1wiIChjbGljayk9XCJ6b29tT3V0KClcIiB0eXBlPVwiYnV0dG9uXCIgW2Rpc2FibGVkXT1cImlzWm9vbU91dERpc2FibGVkXCIgW2F0dHIuYXJpYS1sYWJlbF09XCJ6b29tT3V0QXJpYUxhYmVsKClcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxTZWFyY2hNaW51c0ljb24gKm5nSWY9XCIhem9vbU91dEljb25UZW1wbGF0ZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJ6b29tT3V0SWNvblRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJwLWltYWdlLWFjdGlvbiBwLWxpbmtcIiAoY2xpY2spPVwiem9vbUluKClcIiB0eXBlPVwiYnV0dG9uXCIgW2Rpc2FibGVkXT1cImlzWm9vbUluRGlzYWJsZWRcIiBbYXR0ci5hcmlhLWxhYmVsXT1cInpvb21JbkFyaWFMYWJlbCgpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8U2VhcmNoUGx1c0ljb24gKm5nSWY9XCIhem9vbUluSWNvblRlbXBsYXRlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cInpvb21Jbkljb25UZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwicC1pbWFnZS1hY3Rpb24gcC1saW5rXCIgdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJjbG9zZVByZXZpZXcoKVwiIFthdHRyLmFyaWEtbGFiZWxdPVwiY2xvc2VBcmlhTGFiZWwoKVwiICNjbG9zZUJ1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxUaW1lc0ljb24gKm5nSWY9XCIhY2xvc2VJY29uVGVtcGxhdGVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwiY2xvc2VJY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICpuZ0lmPVwicHJldmlld1Zpc2libGVcIlxuICAgICAgICAgICAgICAgICAgICBbQGFuaW1hdGlvbl09XCJ7IHZhbHVlOiAndmlzaWJsZScsIHBhcmFtczogeyBzaG93VHJhbnNpdGlvblBhcmFtczogc2hvd1RyYW5zaXRpb25PcHRpb25zLCBoaWRlVHJhbnNpdGlvblBhcmFtczogaGlkZVRyYW5zaXRpb25PcHRpb25zIH0gfVwiXG4gICAgICAgICAgICAgICAgICAgIChAYW5pbWF0aW9uLnN0YXJ0KT1cIm9uQW5pbWF0aW9uU3RhcnQoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgIChAYW5pbWF0aW9uLmRvbmUpPVwib25BbmltYXRpb25FbmQoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8aW1nIFthdHRyLnNyY109XCJwcmV2aWV3SW1hZ2VTcmMgPyBwcmV2aWV3SW1hZ2VTcmMgOiBzcmNcIiBbYXR0ci5zcmNzZXRdPVwicHJldmlld0ltYWdlU3JjU2V0XCIgW2F0dHIuc2l6ZXNdPVwicHJldmlld0ltYWdlU2l6ZXNcIiBjbGFzcz1cInAtaW1hZ2UtcHJldmlld1wiIFtuZ1N0eWxlXT1cImltYWdlUHJldmlld1N0eWxlKClcIiAoY2xpY2spPVwib25QcmV2aWV3SW1hZ2VDbGljaygpXCIgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3NwYW4+XG4gICAgYCxcbiAgICBhbmltYXRpb25zOiBbXG4gICAgICAgIHRyaWdnZXIoJ2FuaW1hdGlvbicsIFtcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ3ZvaWQgPT4gdmlzaWJsZScsIFtzdHlsZSh7IHRyYW5zZm9ybTogJ3NjYWxlKDAuNyknLCBvcGFjaXR5OiAwIH0pLCBhbmltYXRlKCd7e3Nob3dUcmFuc2l0aW9uUGFyYW1zfX0nKV0pLFxuICAgICAgICAgICAgdHJhbnNpdGlvbigndmlzaWJsZSA9PiB2b2lkJywgW2FuaW1hdGUoJ3t7aGlkZVRyYW5zaXRpb25QYXJhbXN9fScsIHN0eWxlKHsgdHJhbnNmb3JtOiAnc2NhbGUoMC43KScsIG9wYWNpdHk6IDAgfSkpXSlcbiAgICAgICAgXSlcbiAgICBdLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgc3R5bGVVcmxzOiBbJy4vaW1hZ2UuY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ3AtZWxlbWVudCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIEltYWdlIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XG4gICAgLyoqXG4gICAgICogU3R5bGUgY2xhc3Mgb2YgdGhlIGltYWdlIGVsZW1lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgaW1hZ2VDbGFzczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIElubGluZSBzdHlsZSBvZiB0aGUgaW1hZ2UgZWxlbWVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBpbWFnZVN0eWxlOiB7IFtrbGFzczogc3RyaW5nXTogYW55IH0gfCBudWxsIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIENsYXNzIG9mIHRoZSBlbGVtZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBJbmxpbmUgc3R5bGUgb2YgdGhlIGVsZW1lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc3R5bGU6IHsgW2tsYXNzOiBzdHJpbmddOiBhbnkgfSB8IG51bGwgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogVGhlIHNvdXJjZSBwYXRoIGZvciB0aGUgbWFpbiBpbWFnZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzcmM6IHN0cmluZyB8IFNhZmVVcmwgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogVGhlIHNyY3NldCBkZWZpbml0aW9uIGZvciB0aGUgbWFpbiBpbWFnZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzcmNTZXQ6IHN0cmluZyB8IFNhZmVVcmwgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogVGhlIHNpemVzIGRlZmluaXRpb24gZm9yIHRoZSBtYWluIGltYWdlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHNpemVzOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogVGhlIHNvdXJjZSBwYXRoIGZvciB0aGUgcHJldmlldyBpbWFnZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwcmV2aWV3SW1hZ2VTcmM6IHN0cmluZyB8IFNhZmVVcmwgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogVGhlIHNyY3NldCBkZWZpbml0aW9uIGZvciB0aGUgcHJldmlldyBpbWFnZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwcmV2aWV3SW1hZ2VTcmNTZXQ6IHN0cmluZyB8IFNhZmVVcmwgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogVGhlIHNpemVzIGRlZmluaXRpb24gZm9yIHRoZSBwcmV2aWV3IGltYWdlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHByZXZpZXdJbWFnZVNpemVzOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogQXR0cmlidXRlIG9mIHRoZSBwcmV2aWV3IGltYWdlIGVsZW1lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgYWx0OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogQXR0cmlidXRlIG9mIHRoZSBpbWFnZSBlbGVtZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHdpZHRoOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogQXR0cmlidXRlIG9mIHRoZSBpbWFnZSBlbGVtZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGhlaWdodDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIEF0dHJpYnV0ZSBvZiB0aGUgaW1hZ2UgZWxlbWVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBsb2FkaW5nOiAnbGF6eScgfCAnZWFnZXInIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFRhcmdldCBlbGVtZW50IHRvIGF0dGFjaCB0aGUgZGlhbG9nLCB2YWxpZCB2YWx1ZXMgYXJlIFwiYm9keVwiIG9yIGEgbG9jYWwgbmctdGVtcGxhdGUgdmFyaWFibGUgb2YgYW5vdGhlciBlbGVtZW50IChub3RlOiB1c2UgYmluZGluZyB3aXRoIGJyYWNrZXRzIGZvciB0ZW1wbGF0ZSB2YXJpYWJsZXMsIGUuZy4gW2FwcGVuZFRvXT1cIm15ZGl2XCIgZm9yIGEgZGl2IGVsZW1lbnQgaGF2aW5nICNteWRpdiBhcyB2YXJpYWJsZSBuYW1lKS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBhcHBlbmRUbzogSFRNTEVsZW1lbnQgfCBFbGVtZW50UmVmIHwgVGVtcGxhdGVSZWY8YW55PiB8IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQgfCBhbnk7XG4gICAgLyoqXG4gICAgICogQ29udHJvbHMgdGhlIHByZXZpZXcgZnVuY3Rpb25hbGl0eS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwcmV2aWV3OiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogVHJhbnNpdGlvbiBvcHRpb25zIG9mIHRoZSBzaG93IGFuaW1hdGlvblxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHNob3dUcmFuc2l0aW9uT3B0aW9uczogc3RyaW5nID0gJzE1MG1zIGN1YmljLWJlemllcigwLCAwLCAwLjIsIDEpJztcbiAgICAvKipcbiAgICAgKiBUcmFuc2l0aW9uIG9wdGlvbnMgb2YgdGhlIGhpZGUgYW5pbWF0aW9uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgaGlkZVRyYW5zaXRpb25PcHRpb25zOiBzdHJpbmcgPSAnMTUwbXMgY3ViaWMtYmV6aWVyKDAsIDAsIDAuMiwgMSknO1xuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCB3aGVuIHRoZSBwcmV2aWV3IG92ZXJsYXkgaXMgc2hvd24uXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uU2hvdzogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgd2hlbiB0aGUgcHJldmlldyBvdmVybGF5IGlzIGhpZGRlbi5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25IaWRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAgIC8qKlxuICAgICAqIFRoaXMgZXZlbnQgaXMgdHJpZ2dlcmVkIGlmIGFuIGVycm9yIG9jY3VycyB3aGlsZSBsb2FkaW5nIGFuIGltYWdlIGZpbGUuXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBCcm93c2VyIGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvbkltYWdlRXJyb3I6IEV2ZW50RW1pdHRlcjxFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50PigpO1xuXG4gICAgQFZpZXdDaGlsZCgnbWFzaycpIG1hc2s6IEVsZW1lbnRSZWYgfCB1bmRlZmluZWQ7XG5cbiAgICBAVmlld0NoaWxkKCdwcmV2aWV3QnV0dG9uJykgcHJldmlld0J1dHRvbjogRWxlbWVudFJlZiB8IHVuZGVmaW5lZDtcblxuICAgIEBWaWV3Q2hpbGQoJ2Nsb3NlQnV0dG9uJykgY2xvc2VCdXR0b246IEVsZW1lbnRSZWYgfCB1bmRlZmluZWQ7XG5cbiAgICBAQ29udGVudENoaWxkcmVuKFByaW1lVGVtcGxhdGUpIHRlbXBsYXRlczogUXVlcnlMaXN0PFByaW1lVGVtcGxhdGU+IHwgdW5kZWZpbmVkO1xuXG4gICAgaW5kaWNhdG9yVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG5cbiAgICByb3RhdGVSaWdodEljb25UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcblxuICAgIHJvdGF0ZUxlZnRJY29uVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG5cbiAgICB6b29tT3V0SWNvblRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xuXG4gICAgem9vbUluSWNvblRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xuXG4gICAgY2xvc2VJY29uVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG5cbiAgICBtYXNrVmlzaWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHJldmlld1Zpc2libGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHJvdGF0ZTogbnVtYmVyID0gMDtcblxuICAgIHNjYWxlOiBudW1iZXIgPSAxO1xuXG4gICAgcHJldmlld0NsaWNrOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBjb250YWluZXI6IE51bGxhYmxlPEhUTUxFbGVtZW50PjtcblxuICAgIHdyYXBwZXI6IE51bGxhYmxlPEhUTUxFbGVtZW50PjtcblxuICAgIHB1YmxpYyBnZXQgaXNab29tT3V0RGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNjYWxlIC0gdGhpcy56b29tU2V0dGluZ3Muc3RlcCA8PSB0aGlzLnpvb21TZXR0aW5ncy5taW47XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBpc1pvb21JbkRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zY2FsZSArIHRoaXMuem9vbVNldHRpbmdzLnN0ZXAgPj0gdGhpcy56b29tU2V0dGluZ3MubWF4O1xuICAgIH1cblxuICAgIHByaXZhdGUgem9vbVNldHRpbmdzID0ge1xuICAgICAgICBkZWZhdWx0OiAxLFxuICAgICAgICBzdGVwOiAwLjEsXG4gICAgICAgIG1heDogMS41LFxuICAgICAgICBtaW46IDAuNVxuICAgIH07XG5cbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBEb2N1bWVudCwgcHJpdmF0ZSBjb25maWc6IFByaW1lTkdDb25maWcsIHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmLCBwdWJsaWMgZWw6IEVsZW1lbnRSZWYpIHt9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGVzPy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKGl0ZW0uZ2V0VHlwZSgpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnaW5kaWNhdG9yJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmRpY2F0b3JUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAncm90YXRlcmlnaHRpY29uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3RhdGVSaWdodEljb25UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAncm90YXRlbGVmdGljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdGF0ZUxlZnRJY29uVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3pvb21vdXRpY29uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy56b29tT3V0SWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICd6b29taW5pY29uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy56b29tSW5JY29uVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2Nsb3NlaWNvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VJY29uVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5kaWNhdG9yVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25JbWFnZUNsaWNrKCkge1xuICAgICAgICBpZiAodGhpcy5wcmV2aWV3KSB7XG4gICAgICAgICAgICB0aGlzLm1hc2tWaXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMucHJldmlld1Zpc2libGUgPSB0cnVlO1xuICAgICAgICAgICAgRG9tSGFuZGxlci5ibG9ja0JvZHlTY3JvbGwoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uTWFza0NsaWNrKCkge1xuICAgICAgICBpZiAoIXRoaXMucHJldmlld0NsaWNrKSB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlUHJldmlldygpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wcmV2aWV3Q2xpY2sgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBvbk1hc2tLZXlkb3duKGV2ZW50KSB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQuY29kZSkge1xuICAgICAgICAgICAgY2FzZSAnRXNjYXBlJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uTWFza0NsaWNrKCk7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuZm9jdXModGhpcy5wcmV2aWV3QnV0dG9uLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIH0sIDI1KTtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblByZXZpZXdJbWFnZUNsaWNrKCkge1xuICAgICAgICB0aGlzLnByZXZpZXdDbGljayA9IHRydWU7XG4gICAgfVxuXG4gICAgcm90YXRlUmlnaHQoKSB7XG4gICAgICAgIHRoaXMucm90YXRlICs9IDkwO1xuICAgICAgICB0aGlzLnByZXZpZXdDbGljayA9IHRydWU7XG4gICAgfVxuXG4gICAgcm90YXRlTGVmdCgpIHtcbiAgICAgICAgdGhpcy5yb3RhdGUgLT0gOTA7XG4gICAgICAgIHRoaXMucHJldmlld0NsaWNrID0gdHJ1ZTtcbiAgICB9XG5cbiAgICB6b29tSW4oKSB7XG4gICAgICAgIHRoaXMuc2NhbGUgPSB0aGlzLnNjYWxlICsgdGhpcy56b29tU2V0dGluZ3Muc3RlcDtcbiAgICAgICAgdGhpcy5wcmV2aWV3Q2xpY2sgPSB0cnVlO1xuICAgIH1cblxuICAgIHpvb21PdXQoKSB7XG4gICAgICAgIHRoaXMuc2NhbGUgPSB0aGlzLnNjYWxlIC0gdGhpcy56b29tU2V0dGluZ3Muc3RlcDtcbiAgICAgICAgdGhpcy5wcmV2aWV3Q2xpY2sgPSB0cnVlO1xuICAgIH1cblxuICAgIG9uQW5pbWF0aW9uU3RhcnQoZXZlbnQ6IEFuaW1hdGlvbkV2ZW50KSB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQudG9TdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSAndmlzaWJsZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIgPSBldmVudC5lbGVtZW50O1xuICAgICAgICAgICAgICAgIHRoaXMud3JhcHBlciA9IHRoaXMuY29udGFpbmVyPy5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwZW5kQ29udGFpbmVyKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlT25Ub3AoKTtcblxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmZvY3VzKHRoaXMuY2xvc2VCdXR0b24ubmF0aXZlRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgfSwgMjUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICd2b2lkJzpcbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKHRoaXMud3JhcHBlciwgJ3AtY29tcG9uZW50LW92ZXJsYXktbGVhdmUnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQW5pbWF0aW9uRW5kKGV2ZW50OiBBbmltYXRpb25FdmVudCkge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LnRvU3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3ZvaWQnOlxuICAgICAgICAgICAgICAgIFpJbmRleFV0aWxzLmNsZWFyKHRoaXMud3JhcHBlcik7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXNrVmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLndyYXBwZXIgPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkhpZGUuZW1pdCh7fSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd2aXNpYmxlJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uU2hvdy5lbWl0KHt9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1vdmVPblRvcCgpIHtcbiAgICAgICAgWkluZGV4VXRpbHMuc2V0KCdtb2RhbCcsIHRoaXMud3JhcHBlciwgdGhpcy5jb25maWcuekluZGV4Lm1vZGFsKTtcbiAgICB9XG5cbiAgICBhcHBlbmRDb250YWluZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmFwcGVuZFRvKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hcHBlbmRUbyA9PT0gJ2JvZHknKSB0aGlzLmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy53cmFwcGVyIGFzIEhUTUxFbGVtZW50KTtcbiAgICAgICAgICAgIGVsc2UgRG9tSGFuZGxlci5hcHBlbmRDaGlsZCh0aGlzLndyYXBwZXIsIHRoaXMuYXBwZW5kVG8pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW1hZ2VQcmV2aWV3U3R5bGUoKSB7XG4gICAgICAgIHJldHVybiB7IHRyYW5zZm9ybTogJ3JvdGF0ZSgnICsgdGhpcy5yb3RhdGUgKyAnZGVnKSBzY2FsZSgnICsgdGhpcy5zY2FsZSArICcpJyB9O1xuICAgIH1cblxuICAgIGdldCB6b29tSW1hZ2VBcmlhTGFiZWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy50cmFuc2xhdGlvbi5hcmlhID8gdGhpcy5jb25maWcudHJhbnNsYXRpb24uYXJpYS56b29tSW1hZ2UgOiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgY29udGFpbmVyQ2xhc3MoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAncC1pbWFnZSBwLWNvbXBvbmVudCc6IHRydWUsXG4gICAgICAgICAgICAncC1pbWFnZS1wcmV2aWV3LWNvbnRhaW5lcic6IHRoaXMucHJldmlld1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGhhbmRsZVRvb2xiYXJDbGljayhldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG5cbiAgICBjbG9zZVByZXZpZXcoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucHJldmlld1Zpc2libGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5yb3RhdGUgPSAwO1xuICAgICAgICB0aGlzLnNjYWxlID0gdGhpcy56b29tU2V0dGluZ3MuZGVmYXVsdDtcbiAgICAgICAgRG9tSGFuZGxlci51bmJsb2NrQm9keVNjcm9sbCgpO1xuICAgIH1cblxuICAgIGltYWdlRXJyb3IoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIHRoaXMub25JbWFnZUVycm9yLmVtaXQoZXZlbnQpO1xuICAgIH1cblxuICAgIHJpZ2h0QXJpYUxhYmVsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcudHJhbnNsYXRpb24uYXJpYSA/IHRoaXMuY29uZmlnLnRyYW5zbGF0aW9uLmFyaWEucm90YXRlUmlnaHQgOiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgbGVmdEFyaWFMYWJlbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLnRyYW5zbGF0aW9uLmFyaWEgPyB0aGlzLmNvbmZpZy50cmFuc2xhdGlvbi5hcmlhLnJvdGF0ZUxlZnQgOiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgem9vbUluQXJpYUxhYmVsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcudHJhbnNsYXRpb24uYXJpYSA/IHRoaXMuY29uZmlnLnRyYW5zbGF0aW9uLmFyaWEuem9vbUluIDogdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHpvb21PdXRBcmlhTGFiZWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy50cmFuc2xhdGlvbi5hcmlhID8gdGhpcy5jb25maWcudHJhbnNsYXRpb24uYXJpYS56b29tT3V0IDogdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGNsb3NlQXJpYUxhYmVsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcudHJhbnNsYXRpb24uYXJpYSA/IHRoaXMuY29uZmlnLnRyYW5zbGF0aW9uLmFyaWEuY2xvc2UgOiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6a2V5ZG93bi5lc2NhcGUnLCBbJyRldmVudCddKSBvbktleWRvd25IYW5kbGVyKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLnByZXZpZXdWaXNpYmxlKSB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlUHJldmlldygpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIFNoYXJlZE1vZHVsZSwgUmVmcmVzaEljb24sIEV5ZUljb24sIFVuZG9JY29uLCBTZWFyY2hNaW51c0ljb24sIFNlYXJjaFBsdXNJY29uLCBUaW1lc0ljb24sIEZvY3VzVHJhcE1vZHVsZV0sXG4gICAgZXhwb3J0czogW0ltYWdlLCBTaGFyZWRNb2R1bGVdLFxuICAgIGRlY2xhcmF0aW9uczogW0ltYWdlXVxufSlcbmV4cG9ydCBjbGFzcyBJbWFnZU1vZHVsZSB7fVxuIl19