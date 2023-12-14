import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule, DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, HostListener, Inject, Input, NgModule, ViewEncapsulation } from '@angular/core';
import { PrimeTemplate, SharedModule, TranslationKeys } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConnectedOverlayScrollHandler, DomHandler } from 'primeng/dom';
import { ZIndexUtils } from 'primeng/utils';
import * as i0 from "@angular/core";
import * as i1 from "primeng/api";
import * as i2 from "@angular/common";
import * as i3 from "primeng/button";
/**
 * ConfirmPopup displays a confirmation overlay displayed relatively to its target.
 * @group Components
 */
export class ConfirmPopup {
    el;
    confirmationService;
    renderer;
    cd;
    config;
    overlayService;
    document;
    /**
     * Optional key to match the key of confirm object, necessary to use when component tree has multiple confirm dialogs.
     * @group Props
     */
    key;
    /**
     * Element to receive the focus when the popup gets visible, valid values are "accept", "reject", and "none".
     * @group Props
     */
    defaultFocus = 'accept';
    /**
     * Transition options of the show animation.
     * @group Props
     */
    showTransitionOptions = '.12s cubic-bezier(0, 0, 0.2, 1)';
    /**
     * Transition options of the hide animation.
     * @group Props
     */
    hideTransitionOptions = '.1s linear';
    /**
     * Whether to automatically manage layering.
     * @group Props
     */
    autoZIndex = true;
    /**
     * Base zIndex value to use in layering.
     * @group Props
     */
    baseZIndex = 0;
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
     * Defines if the component is visible.
     * @group Props
     */
    get visible() {
        return this._visible;
    }
    set visible(value) {
        this._visible = value;
        this.cd.markForCheck();
    }
    templates;
    container;
    subscription;
    confirmation;
    contentTemplate;
    acceptIconTemplate;
    rejectIconTemplate;
    headlessTemplate;
    _visible;
    documentClickListener;
    documentResizeListener;
    scrollHandler;
    window;
    constructor(el, confirmationService, renderer, cd, config, overlayService, document) {
        this.el = el;
        this.confirmationService = confirmationService;
        this.renderer = renderer;
        this.cd = cd;
        this.config = config;
        this.overlayService = overlayService;
        this.document = document;
        this.window = this.document.defaultView;
        this.subscription = this.confirmationService.requireConfirmation$.subscribe((confirmation) => {
            if (!confirmation) {
                this.hide();
                return;
            }
            if (confirmation.key === this.key) {
                this.confirmation = confirmation;
                if (this.confirmation.accept) {
                    this.confirmation.acceptEvent = new EventEmitter();
                    this.confirmation.acceptEvent.subscribe(this.confirmation.accept);
                }
                if (this.confirmation.reject) {
                    this.confirmation.rejectEvent = new EventEmitter();
                    this.confirmation.rejectEvent.subscribe(this.confirmation.reject);
                }
                this.visible = true;
            }
        });
    }
    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'content':
                    this.contentTemplate = item.template;
                    break;
                case 'rejecticon':
                    this.rejectIconTemplate = item.template;
                    break;
                case 'accepticon':
                    this.acceptIconTemplate = item.template;
                    break;
                case 'headless':
                    this.headlessTemplate = item.template;
                    break;
            }
        });
    }
    onEscapeKeydown(event) {
        if (this.confirmation && this.confirmation.closeOnEscape) {
            this.reject();
        }
    }
    onAnimationStart(event) {
        if (event.toState === 'open') {
            this.container = event.element;
            this.renderer.appendChild(this.document.body, this.container);
            this.align();
            this.bindListeners();
            const element = this.getElementToFocus();
            if (element) {
                element.focus();
            }
        }
    }
    onAnimationEnd(event) {
        switch (event.toState) {
            case 'void':
                this.onContainerDestroy();
                break;
        }
    }
    getElementToFocus() {
        switch (this.defaultFocus) {
            case 'accept':
                return DomHandler.findSingle(this.container, '.p-confirm-popup-accept');
            case 'reject':
                return DomHandler.findSingle(this.container, '.p-confirm-popup-reject');
            case 'none':
                return null;
        }
    }
    align() {
        if (this.autoZIndex) {
            ZIndexUtils.set('overlay', this.container, this.config.zIndex.overlay);
        }
        if (!this.confirmation) {
            return;
        }
        DomHandler.absolutePosition(this.container, this.confirmation?.target);
        const containerOffset = DomHandler.getOffset(this.container);
        const targetOffset = DomHandler.getOffset(this.confirmation?.target);
        let arrowLeft = 0;
        if (containerOffset.left < targetOffset.left) {
            arrowLeft = targetOffset.left - containerOffset.left;
        }
        this.container.style.setProperty('--overlayArrowLeft', `${arrowLeft}px`);
        if (containerOffset.top < targetOffset.top) {
            DomHandler.addClass(this.container, 'p-confirm-popup-flipped');
        }
    }
    hide() {
        this.visible = false;
    }
    accept() {
        if (this.confirmation?.acceptEvent) {
            this.confirmation.acceptEvent.emit();
        }
        this.hide();
    }
    reject() {
        if (this.confirmation?.rejectEvent) {
            this.confirmation.rejectEvent.emit();
        }
        this.hide();
    }
    onOverlayClick(event) {
        this.overlayService.add({
            originalEvent: event,
            target: this.el.nativeElement
        });
    }
    bindListeners() {
        /*
         * Called inside `setTimeout` to avoid listening to the click event that appears when `confirm` is first called(bubbling).
         * Need wait when bubbling event up and hang the handler on the next tick.
         * This is the case when eventTarget and confirmation.target do not match when the `confirm` method is called.
         */
        setTimeout(() => {
            this.bindDocumentClickListener();
            this.bindDocumentResizeListener();
            this.bindScrollListener();
        });
    }
    unbindListeners() {
        this.unbindDocumentClickListener();
        this.unbindDocumentResizeListener();
        this.unbindScrollListener();
    }
    bindDocumentClickListener() {
        if (!this.documentClickListener) {
            let documentEvent = DomHandler.isIOS() ? 'touchstart' : 'click';
            const documentTarget = this.el ? this.el.nativeElement.ownerDocument : this.document;
            this.documentClickListener = this.renderer.listen(documentTarget, documentEvent, (event) => {
                if (this.confirmation && this.confirmation.dismissableMask !== false) {
                    let targetElement = this.confirmation.target;
                    if (this.container !== event.target && !this.container?.contains(event.target) && targetElement !== event.target && !targetElement.contains(event.target)) {
                        this.hide();
                    }
                }
            });
        }
    }
    unbindDocumentClickListener() {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    }
    onWindowResize() {
        if (this.visible && !DomHandler.isTouchDevice()) {
            this.hide();
        }
    }
    bindDocumentResizeListener() {
        if (!this.documentResizeListener) {
            this.documentResizeListener = this.renderer.listen(this.window, 'resize', this.onWindowResize.bind(this));
        }
    }
    unbindDocumentResizeListener() {
        if (this.documentResizeListener) {
            this.documentResizeListener();
            this.documentResizeListener = null;
        }
    }
    bindScrollListener() {
        if (!this.scrollHandler) {
            this.scrollHandler = new ConnectedOverlayScrollHandler(this.confirmation?.target, () => {
                if (this.visible) {
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
    unsubscribeConfirmationSubscriptions() {
        if (this.confirmation) {
            if (this.confirmation.acceptEvent) {
                this.confirmation.acceptEvent.unsubscribe();
            }
            if (this.confirmation.rejectEvent) {
                this.confirmation.rejectEvent.unsubscribe();
            }
        }
    }
    onContainerDestroy() {
        this.unbindListeners();
        this.unsubscribeConfirmationSubscriptions();
        if (this.autoZIndex) {
            ZIndexUtils.clear(this.container);
        }
        this.confirmation = null;
        this.container = null;
    }
    restoreAppend() {
        if (this.container) {
            this.renderer.removeChild(this.document.body, this.container);
        }
        this.onContainerDestroy();
    }
    get acceptButtonLabel() {
        return this.confirmation?.acceptLabel || this.config.getTranslation(TranslationKeys.ACCEPT);
    }
    get rejectButtonLabel() {
        return this.confirmation?.rejectLabel || this.config.getTranslation(TranslationKeys.REJECT);
    }
    ngOnDestroy() {
        this.restoreAppend();
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: ConfirmPopup, deps: [{ token: i0.ElementRef }, { token: i1.ConfirmationService }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }, { token: i1.PrimeNGConfig }, { token: i1.OverlayService }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.5", type: ConfirmPopup, selector: "p-confirmPopup", inputs: { key: "key", defaultFocus: "defaultFocus", showTransitionOptions: "showTransitionOptions", hideTransitionOptions: "hideTransitionOptions", autoZIndex: "autoZIndex", baseZIndex: "baseZIndex", style: "style", styleClass: "styleClass", visible: "visible" }, host: { listeners: { "document:keydown.escape": "onEscapeKeydown($event)" }, classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], ngImport: i0, template: `
        <div
            *ngIf="visible"
            [ngClass]="'p-confirm-popup p-component'"
            [ngStyle]="style"
            [class]="styleClass"
            role="alertdialog"
            (click)="onOverlayClick($event)"
            [@animation]="{ value: 'open', params: { showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions } }"
            (@animation.start)="onAnimationStart($event)"
            (@animation.done)="onAnimationEnd($event)"
        >
            <ng-container *ngIf="headlessTemplate; else notHeadless">
                <ng-container *ngTemplateOutlet="headlessTemplate; context: { $implicit: confirmation }"></ng-container>
            </ng-container>
            <ng-template #notHeadless>
                <div #content class="p-confirm-popup-content">
                    <ng-container *ngIf="contentTemplate; else withoutContentTemplate">
                        <ng-container *ngTemplateOutlet="contentTemplate; context: { $implicit: confirmation }"></ng-container>
                    </ng-container>
                    <ng-template #withoutContentTemplate>
                        <i [ngClass]="'p-confirm-popup-icon'" [class]="confirmation?.icon" *ngIf="confirmation?.icon"></i>
                        <span class="p-confirm-popup-message">{{ confirmation?.message }}</span>
                    </ng-template>
                </div>
                <div class="p-confirm-popup-footer">
                    <button
                        type="button"
                        pButton
                        [label]="rejectButtonLabel"
                        (click)="reject()"
                        [ngClass]="'p-confirm-popup-reject p-button-sm'"
                        [class]="confirmation?.rejectButtonStyleClass || 'p-button-text'"
                        *ngIf="confirmation?.rejectVisible !== false"
                        [attr.aria-label]="rejectButtonLabel"
                    >
                        <i [class]="confirmation?.rejectIcon" *ngIf="confirmation?.rejectIcon; else rejecticon"></i>
                        <ng-template #rejecticon *ngTemplateOutlet="rejectIconTemplate"></ng-template>
                    </button>
                    <button
                        type="button"
                        pButton
                        [label]="acceptButtonLabel"
                        (click)="accept()"
                        [ngClass]="'p-confirm-popup-accept p-button-sm'"
                        [class]="confirmation?.acceptButtonStyleClass"
                        *ngIf="confirmation?.acceptVisible !== false"
                        [attr.aria-label]="acceptButtonLabel"
                    >
                        <i [class]="confirmation?.acceptIcon" *ngIf="confirmation?.acceptIcon; else accepticon"></i>
                        <ng-template #accepticon *ngTemplateOutlet="acceptIconTemplate"></ng-template>
                    </button>
                </div>
            </ng-template>
        </div>
    `, isInline: true, styles: ["@layer primeng{.p-confirm-popup{position:absolute;margin-top:10px;top:0;left:0}.p-confirm-popup-flipped{margin-top:0;margin-bottom:10px}.p-confirm-popup:after,.p-confirm-popup:before{bottom:100%;left:calc(var(--overlayArrowLeft, 0) + 1.25rem);content:\" \";height:0;width:0;position:absolute;pointer-events:none}.p-confirm-popup:after{border-width:8px;margin-left:-8px}.p-confirm-popup:before{border-width:10px;margin-left:-10px}.p-confirm-popup-flipped:after,.p-confirm-popup-flipped:before{bottom:auto;top:100%}.p-confirm-popup.p-confirm-popup-flipped:after{border-bottom-color:transparent}.p-confirm-popup.p-confirm-popup-flipped:before{border-bottom-color:transparent}.p-confirm-popup .p-confirm-popup-content{display:flex;align-items:center}}\n"], dependencies: [{ kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i3.ButtonDirective, selector: "[pButton]", inputs: ["iconPos", "loadingIcon", "label", "icon", "loading"] }], animations: [
            trigger('animation', [
                state('void', style({
                    transform: 'scaleY(0.8)',
                    opacity: 0
                })),
                state('open', style({
                    transform: 'translateY(0)',
                    opacity: 1
                })),
                transition('void => open', animate('{{showTransitionParams}}')),
                transition('open => void', animate('{{hideTransitionParams}}'))
            ])
        ], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: ConfirmPopup, decorators: [{
            type: Component,
            args: [{ selector: 'p-confirmPopup', template: `
        <div
            *ngIf="visible"
            [ngClass]="'p-confirm-popup p-component'"
            [ngStyle]="style"
            [class]="styleClass"
            role="alertdialog"
            (click)="onOverlayClick($event)"
            [@animation]="{ value: 'open', params: { showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions } }"
            (@animation.start)="onAnimationStart($event)"
            (@animation.done)="onAnimationEnd($event)"
        >
            <ng-container *ngIf="headlessTemplate; else notHeadless">
                <ng-container *ngTemplateOutlet="headlessTemplate; context: { $implicit: confirmation }"></ng-container>
            </ng-container>
            <ng-template #notHeadless>
                <div #content class="p-confirm-popup-content">
                    <ng-container *ngIf="contentTemplate; else withoutContentTemplate">
                        <ng-container *ngTemplateOutlet="contentTemplate; context: { $implicit: confirmation }"></ng-container>
                    </ng-container>
                    <ng-template #withoutContentTemplate>
                        <i [ngClass]="'p-confirm-popup-icon'" [class]="confirmation?.icon" *ngIf="confirmation?.icon"></i>
                        <span class="p-confirm-popup-message">{{ confirmation?.message }}</span>
                    </ng-template>
                </div>
                <div class="p-confirm-popup-footer">
                    <button
                        type="button"
                        pButton
                        [label]="rejectButtonLabel"
                        (click)="reject()"
                        [ngClass]="'p-confirm-popup-reject p-button-sm'"
                        [class]="confirmation?.rejectButtonStyleClass || 'p-button-text'"
                        *ngIf="confirmation?.rejectVisible !== false"
                        [attr.aria-label]="rejectButtonLabel"
                    >
                        <i [class]="confirmation?.rejectIcon" *ngIf="confirmation?.rejectIcon; else rejecticon"></i>
                        <ng-template #rejecticon *ngTemplateOutlet="rejectIconTemplate"></ng-template>
                    </button>
                    <button
                        type="button"
                        pButton
                        [label]="acceptButtonLabel"
                        (click)="accept()"
                        [ngClass]="'p-confirm-popup-accept p-button-sm'"
                        [class]="confirmation?.acceptButtonStyleClass"
                        *ngIf="confirmation?.acceptVisible !== false"
                        [attr.aria-label]="acceptButtonLabel"
                    >
                        <i [class]="confirmation?.acceptIcon" *ngIf="confirmation?.acceptIcon; else accepticon"></i>
                        <ng-template #accepticon *ngTemplateOutlet="acceptIconTemplate"></ng-template>
                    </button>
                </div>
            </ng-template>
        </div>
    `, animations: [
                        trigger('animation', [
                            state('void', style({
                                transform: 'scaleY(0.8)',
                                opacity: 0
                            })),
                            state('open', style({
                                transform: 'translateY(0)',
                                opacity: 1
                            })),
                            transition('void => open', animate('{{showTransitionParams}}')),
                            transition('open => void', animate('{{hideTransitionParams}}'))
                        ])
                    ], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: ["@layer primeng{.p-confirm-popup{position:absolute;margin-top:10px;top:0;left:0}.p-confirm-popup-flipped{margin-top:0;margin-bottom:10px}.p-confirm-popup:after,.p-confirm-popup:before{bottom:100%;left:calc(var(--overlayArrowLeft, 0) + 1.25rem);content:\" \";height:0;width:0;position:absolute;pointer-events:none}.p-confirm-popup:after{border-width:8px;margin-left:-8px}.p-confirm-popup:before{border-width:10px;margin-left:-10px}.p-confirm-popup-flipped:after,.p-confirm-popup-flipped:before{bottom:auto;top:100%}.p-confirm-popup.p-confirm-popup-flipped:after{border-bottom-color:transparent}.p-confirm-popup.p-confirm-popup-flipped:before{border-bottom-color:transparent}.p-confirm-popup .p-confirm-popup-content{display:flex;align-items:center}}\n"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i1.ConfirmationService }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }, { type: i1.PrimeNGConfig }, { type: i1.OverlayService }, { type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }], propDecorators: { key: [{
                type: Input
            }], defaultFocus: [{
                type: Input
            }], showTransitionOptions: [{
                type: Input
            }], hideTransitionOptions: [{
                type: Input
            }], autoZIndex: [{
                type: Input
            }], baseZIndex: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], visible: [{
                type: Input
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }], onEscapeKeydown: [{
                type: HostListener,
                args: ['document:keydown.escape', ['$event']]
            }] } });
export class ConfirmPopupModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: ConfirmPopupModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.0.5", ngImport: i0, type: ConfirmPopupModule, declarations: [ConfirmPopup], imports: [CommonModule, ButtonModule, SharedModule], exports: [ConfirmPopup, SharedModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: ConfirmPopupModule, imports: [CommonModule, ButtonModule, SharedModule, SharedModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: ConfirmPopupModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, ButtonModule, SharedModule],
                    exports: [ConfirmPopup, SharedModule],
                    declarations: [ConfirmPopup]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlybXBvcHVwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL2NvbmZpcm1wb3B1cC9jb25maXJtcG9wdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFrQixPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDakcsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBRUgsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxlQUFlLEVBRWYsWUFBWSxFQUNaLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUNMLFFBQVEsRUFLUixpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFvRSxhQUFhLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUM3SSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUMsT0FBTyxFQUFFLDZCQUE2QixFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUV4RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7OztBQUU1Qzs7O0dBR0c7QUFzRkgsTUFBTSxPQUFPLFlBQVk7SUFnRlY7SUFDQztJQUNEO0lBQ0M7SUFDRDtJQUNBO0lBQ21CO0lBckY5Qjs7O09BR0c7SUFDTSxHQUFHLENBQXFCO0lBQ2pDOzs7T0FHRztJQUNNLFlBQVksR0FBVyxRQUFRLENBQUM7SUFDekM7OztPQUdHO0lBQ00scUJBQXFCLEdBQVcsaUNBQWlDLENBQUM7SUFDM0U7OztPQUdHO0lBQ00scUJBQXFCLEdBQVcsWUFBWSxDQUFDO0lBQ3REOzs7T0FHRztJQUNNLFVBQVUsR0FBWSxJQUFJLENBQUM7SUFDcEM7OztPQUdHO0lBQ00sVUFBVSxHQUFX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QztxQkFDTCxtQkFDZ0IsdUJBQXVCLENBQUMsTUFBTSxpQkFDaEMsaUJBQWlCLENBQUMsSUFBSSxRQUUvQjt3QkFDRixLQUFLLEVBQUUsV0FBVztxQkFDckI7OzBCQXdGSSxNQUFNOzJCQUFDLFFBQVE7eUNBakZYLEdBQUc7c0JBQVgsS0FBSztnQkFLRyxZQUFZO3NCQUFwQixLQUFLO2dCQUtHLHFCQUFxQjtzQkFBN0IsS0FBSztnQkFLRyxxQkFBcUI7c0JBQTdCLEtBQUs7Z0JBS0csVUFBVTtzQkFBbEIsS0FBSztnQkFLRyxVQUFVO3NCQUFsQixLQUFLO2dCQUtHLEtBQUs7c0JBQWIsS0FBSztnQkFLRyxVQUFVO3NCQUFsQixLQUFLO2dCQUtPLE9BQU87c0JBQW5CLEtBQUs7Z0JBUTBCLFNBQVM7c0JBQXhDLGVBQWU7dUJBQUMsYUFBYTtnQkFrRjlCLGVBQWU7c0JBRGQsWUFBWTt1QkFBQyx5QkFBeUIsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7QUFrT3ZELE1BQU0sT0FBTyxrQkFBa0I7dUdBQWxCLGtCQUFrQjt3R0FBbEIsa0JBQWtCLGlCQXhXbEIsWUFBWSxhQW9XWCxZQUFZLEVBQUUsWUFBWSxFQUFFLFlBQVksYUFwV3pDLFlBQVksRUFxV0csWUFBWTt3R0FHM0Isa0JBQWtCLFlBSmpCLFlBQVksRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUMxQixZQUFZOzsyRkFHM0Isa0JBQWtCO2tCQUw5QixRQUFRO21CQUFDO29CQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsWUFBWSxDQUFDO29CQUNuRCxPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBWSxDQUFDO29CQUNyQyxZQUFZLEVBQUUsQ0FBQyxZQUFZLENBQUM7aUJBQy9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQW5pbWF0aW9uRXZlbnQsIGFuaW1hdGUsIHN0YXRlLCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlLCBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZHJlbixcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBIb3N0TGlzdGVuZXIsXG4gICAgSW5qZWN0LFxuICAgIElucHV0LFxuICAgIE5nTW9kdWxlLFxuICAgIE9uRGVzdHJveSxcbiAgICBRdWVyeUxpc3QsXG4gICAgUmVuZGVyZXIyLFxuICAgIFRlbXBsYXRlUmVmLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29uZmlybWF0aW9uLCBDb25maXJtYXRpb25TZXJ2aWNlLCBPdmVybGF5U2VydmljZSwgUHJpbWVOR0NvbmZpZywgUHJpbWVUZW1wbGF0ZSwgU2hhcmVkTW9kdWxlLCBUcmFuc2xhdGlvbktleXMgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBCdXR0b25Nb2R1bGUgfSBmcm9tICdwcmltZW5nL2J1dHRvbic7XG5pbXBvcnQgeyBDb25uZWN0ZWRPdmVybGF5U2Nyb2xsSGFuZGxlciwgRG9tSGFuZGxlciB9IGZyb20gJ3ByaW1lbmcvZG9tJztcbmltcG9ydCB7IE51bGxhYmxlLCBWb2lkTGlzdGVuZXIgfSBmcm9tICdwcmltZW5nL3RzLWhlbHBlcnMnO1xuaW1wb3J0IHsgWkluZGV4VXRpbHMgfSBmcm9tICdwcmltZW5nL3V0aWxzJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuLyoqXG4gKiBDb25maXJtUG9wdXAgZGlzcGxheXMgYSBjb25maXJtYXRpb24gb3ZlcmxheSBkaXNwbGF5ZWQgcmVsYXRpdmVseSB0byBpdHMgdGFyZ2V0LlxuICogQGdyb3VwIENvbXBvbmVudHNcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLWNvbmZpcm1Qb3B1cCcsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdlxuICAgICAgICAgICAgKm5nSWY9XCJ2aXNpYmxlXCJcbiAgICAgICAgICAgIFtuZ0NsYXNzXT1cIidwLWNvbmZpcm0tcG9wdXAgcC1jb21wb25lbnQnXCJcbiAgICAgICAgICAgIFtuZ1N0eWxlXT1cInN0eWxlXCJcbiAgICAgICAgICAgIFtjbGFzc109XCJzdHlsZUNsYXNzXCJcbiAgICAgICAgICAgIHJvbGU9XCJhbGVydGRpYWxvZ1wiXG4gICAgICAgICAgICAoY2xpY2spPVwib25PdmVybGF5Q2xpY2soJGV2ZW50KVwiXG4gICAgICAgICAgICBbQGFuaW1hdGlvbl09XCJ7IHZhbHVlOiAnb3BlbicsIHBhcmFtczogeyBzaG93VHJhbnNpdGlvblBhcmFtczogc2hvd1RyYW5zaXRpb25PcHRpb25zLCBoaWRlVHJhbnNpdGlvblBhcmFtczogaGlkZVRyYW5zaXRpb25PcHRpb25zIH0gfVwiXG4gICAgICAgICAgICAoQGFuaW1hdGlvbi5zdGFydCk9XCJvbkFuaW1hdGlvblN0YXJ0KCRldmVudClcIlxuICAgICAgICAgICAgKEBhbmltYXRpb24uZG9uZSk9XCJvbkFuaW1hdGlvbkVuZCgkZXZlbnQpXCJcbiAgICAgICAgPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImhlYWRsZXNzVGVtcGxhdGU7IGVsc2Ugbm90SGVhZGxlc3NcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiaGVhZGxlc3NUZW1wbGF0ZTsgY29udGV4dDogeyAkaW1wbGljaXQ6IGNvbmZpcm1hdGlvbiB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjbm90SGVhZGxlc3M+XG4gICAgICAgICAgICAgICAgPGRpdiAjY29udGVudCBjbGFzcz1cInAtY29uZmlybS1wb3B1cC1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjb250ZW50VGVtcGxhdGU7IGVsc2Ugd2l0aG91dENvbnRlbnRUZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImNvbnRlbnRUZW1wbGF0ZTsgY29udGV4dDogeyAkaW1wbGljaXQ6IGNvbmZpcm1hdGlvbiB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI3dpdGhvdXRDb250ZW50VGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aSBbbmdDbGFzc109XCIncC1jb25maXJtLXBvcHVwLWljb24nXCIgW2NsYXNzXT1cImNvbmZpcm1hdGlvbj8uaWNvblwiICpuZ0lmPVwiY29uZmlybWF0aW9uPy5pY29uXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLWNvbmZpcm0tcG9wdXAtbWVzc2FnZVwiPnt7IGNvbmZpcm1hdGlvbj8ubWVzc2FnZSB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1jb25maXJtLXBvcHVwLWZvb3RlclwiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIFtsYWJlbF09XCJyZWplY3RCdXR0b25MYWJlbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwicmVqZWN0KClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwiJ3AtY29uZmlybS1wb3B1cC1yZWplY3QgcC1idXR0b24tc20nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtjbGFzc109XCJjb25maXJtYXRpb24/LnJlamVjdEJ1dHRvblN0eWxlQ2xhc3MgfHwgJ3AtYnV0dG9uLXRleHQnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiY29uZmlybWF0aW9uPy5yZWplY3RWaXNpYmxlICE9PSBmYWxzZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cInJlamVjdEJ1dHRvbkxhYmVsXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGkgW2NsYXNzXT1cImNvbmZpcm1hdGlvbj8ucmVqZWN0SWNvblwiICpuZ0lmPVwiY29uZmlybWF0aW9uPy5yZWplY3RJY29uOyBlbHNlIHJlamVjdGljb25cIj48L2k+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI3JlamVjdGljb24gKm5nVGVtcGxhdGVPdXRsZXQ9XCJyZWplY3RJY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICBwQnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICBbbGFiZWxdPVwiYWNjZXB0QnV0dG9uTGFiZWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cImFjY2VwdCgpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cIidwLWNvbmZpcm0tcG9wdXAtYWNjZXB0IHAtYnV0dG9uLXNtJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBbY2xhc3NdPVwiY29uZmlybWF0aW9uPy5hY2NlcHRCdXR0b25TdHlsZUNsYXNzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiY29uZmlybWF0aW9uPy5hY2NlcHRWaXNpYmxlICE9PSBmYWxzZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImFjY2VwdEJ1dHRvbkxhYmVsXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGkgW2NsYXNzXT1cImNvbmZpcm1hdGlvbj8uYWNjZXB0SWNvblwiICpuZ0lmPVwiY29uZmlybWF0aW9uPy5hY2NlcHRJY29uOyBlbHNlIGFjY2VwdGljb25cIj48L2k+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI2FjY2VwdGljb24gKm5nVGVtcGxhdGVPdXRsZXQ9XCJhY2NlcHRJY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgYW5pbWF0aW9uczogW1xuICAgICAgICB0cmlnZ2VyKCdhbmltYXRpb24nLCBbXG4gICAgICAgICAgICBzdGF0ZShcbiAgICAgICAgICAgICAgICAndm9pZCcsXG4gICAgICAgICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICdzY2FsZVkoMC44KScsXG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHN0YXRlKFxuICAgICAgICAgICAgICAgICdvcGVuJyxcbiAgICAgICAgICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoMCknLFxuICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAxXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IG9wZW4nLCBhbmltYXRlKCd7e3Nob3dUcmFuc2l0aW9uUGFyYW1zfX0nKSksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCdvcGVuID0+IHZvaWQnLCBhbmltYXRlKCd7e2hpZGVUcmFuc2l0aW9uUGFyYW1zfX0nKSlcbiAgICAgICAgXSlcbiAgICBdLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgc3R5bGVVcmxzOiBbJy4vY29uZmlybXBvcHVwLmNzcyddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdwLWVsZW1lbnQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBDb25maXJtUG9wdXAgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuICAgIC8qKlxuICAgICAqIE9wdGlvbmFsIGtleSB0byBtYXRjaCB0aGUga2V5IG9mIGNvbmZpcm0gb2JqZWN0LCBuZWNlc3NhcnkgdG8gdXNlIHdoZW4gY29tcG9uZW50IHRyZWUgaGFzIG11bHRpcGxlIGNvbmZpcm0gZGlhbG9ncy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBrZXk6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBFbGVtZW50IHRvIHJlY2VpdmUgdGhlIGZvY3VzIHdoZW4gdGhlIHBvcHVwIGdldHMgdmlzaWJsZSwgdmFsaWQgdmFsdWVzIGFyZSBcImFjY2VwdFwiLCBcInJlamVjdFwiLCBhbmQgXCJub25lXCIuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZGVmYXVsdEZvY3VzOiBzdHJpbmcgPSAnYWNjZXB0JztcbiAgICAvKipcbiAgICAgKiBUcmFuc2l0aW9uIG9wdGlvbnMgb2YgdGhlIHNob3cgYW5pbWF0aW9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHNob3dUcmFuc2l0aW9uT3B0aW9uczogc3RyaW5nID0gJy4xMnMgY3ViaWMtYmV6aWVyKDAsIDAsIDAuMiwgMSknO1xuICAgIC8qKlxuICAgICAqIFRyYW5zaXRpb24gb3B0aW9ucyBvZiB0aGUgaGlkZSBhbmltYXRpb24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgaGlkZVRyYW5zaXRpb25PcHRpb25zOiBzdHJpbmcgPSAnLjFzIGxpbmVhcic7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byBhdXRvbWF0aWNhbGx5IG1hbmFnZSBsYXllcmluZy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBhdXRvWkluZGV4OiBib29sZWFuID0gdHJ1ZTtcbiAgICAvKipcbiAgICAgKiBCYXNlIHpJbmRleCB2YWx1ZSB0byB1c2UgaW4gbGF5ZXJpbmcuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgYmFzZVpJbmRleDogbnVtYmVyID0gMDtcbiAgICAvKipcbiAgICAgKiBJbmxpbmUgc3R5bGUgb2YgdGhlIGNvbXBvbmVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzdHlsZTogeyBba2xhc3M6IHN0cmluZ106IGFueSB9IHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBTdHlsZSBjbGFzcyBvZiB0aGUgY29tcG9uZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIGlmIHRoZSBjb21wb25lbnQgaXMgdmlzaWJsZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgdmlzaWJsZSgpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmlzaWJsZTtcbiAgICB9XG4gICAgc2V0IHZpc2libGUodmFsdWU6IGFueSkge1xuICAgICAgICB0aGlzLl92aXNpYmxlID0gdmFsdWU7XG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgQENvbnRlbnRDaGlsZHJlbihQcmltZVRlbXBsYXRlKSB0ZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxQcmltZVRlbXBsYXRlPiB8IHVuZGVmaW5lZDtcblxuICAgIGNvbnRhaW5lcjogTnVsbGFibGU8SFRNTERpdkVsZW1lbnQ+O1xuXG4gICAgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBjb25maXJtYXRpb246IE51bGxhYmxlPENvbmZpcm1hdGlvbj47XG5cbiAgICBjb250ZW50VGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgYWNjZXB0SWNvblRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIHJlamVjdEljb25UZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBoZWFkbGVzc1RlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIF92aXNpYmxlOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gICAgZG9jdW1lbnRDbGlja0xpc3RlbmVyOiBWb2lkTGlzdGVuZXI7XG5cbiAgICBkb2N1bWVudFJlc2l6ZUxpc3RlbmVyOiBWb2lkTGlzdGVuZXI7XG5cbiAgICBzY3JvbGxIYW5kbGVyOiBOdWxsYWJsZTxDb25uZWN0ZWRPdmVybGF5U2Nyb2xsSGFuZGxlcj47XG5cbiAgICBwcml2YXRlIHdpbmRvdzogV2luZG93O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBlbDogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSBjb25maXJtYXRpb25TZXJ2aWNlOiBDb25maXJtYXRpb25TZXJ2aWNlLFxuICAgICAgICBwdWJsaWMgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICAgICAgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIHB1YmxpYyBjb25maWc6IFByaW1lTkdDb25maWcsXG4gICAgICAgIHB1YmxpYyBvdmVybGF5U2VydmljZTogT3ZlcmxheVNlcnZpY2UsXG4gICAgICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IERvY3VtZW50XG4gICAgKSB7XG4gICAgICAgIHRoaXMud2luZG93ID0gdGhpcy5kb2N1bWVudC5kZWZhdWx0VmlldyBhcyBXaW5kb3c7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5jb25maXJtYXRpb25TZXJ2aWNlLnJlcXVpcmVDb25maXJtYXRpb24kLnN1YnNjcmliZSgoY29uZmlybWF0aW9uKSA9PiB7XG4gICAgICAgICAgICBpZiAoIWNvbmZpcm1hdGlvbikge1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGNvbmZpcm1hdGlvbi5rZXkgPT09IHRoaXMua2V5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb25maXJtYXRpb24gPSBjb25maXJtYXRpb247XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlybWF0aW9uLmFjY2VwdCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpcm1hdGlvbi5hY2NlcHRFdmVudCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25maXJtYXRpb24uYWNjZXB0RXZlbnQuc3Vic2NyaWJlKHRoaXMuY29uZmlybWF0aW9uLmFjY2VwdCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlybWF0aW9uLnJlamVjdCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpcm1hdGlvbi5yZWplY3RFdmVudCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25maXJtYXRpb24ucmVqZWN0RXZlbnQuc3Vic2NyaWJlKHRoaXMuY29uZmlybWF0aW9uLnJlamVjdCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy52aXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICB0aGlzLnRlbXBsYXRlcz8uZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChpdGVtLmdldFR5cGUoKSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2NvbnRlbnQnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAncmVqZWN0aWNvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVqZWN0SWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdhY2NlcHRpY29uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY2NlcHRJY29uVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2hlYWRsZXNzJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZWFkbGVzc1RlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmtleWRvd24uZXNjYXBlJywgWyckZXZlbnQnXSlcbiAgICBvbkVzY2FwZUtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuY29uZmlybWF0aW9uICYmIHRoaXMuY29uZmlybWF0aW9uLmNsb3NlT25Fc2NhcGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVqZWN0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkFuaW1hdGlvblN0YXJ0KGV2ZW50OiBBbmltYXRpb25FdmVudCkge1xuICAgICAgICBpZiAoZXZlbnQudG9TdGF0ZSA9PT0gJ29wZW4nKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGV2ZW50LmVsZW1lbnQ7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuZG9jdW1lbnQuYm9keSwgdGhpcy5jb250YWluZXIpO1xuICAgICAgICAgICAgdGhpcy5hbGlnbigpO1xuICAgICAgICAgICAgdGhpcy5iaW5kTGlzdGVuZXJzKCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmdldEVsZW1lbnRUb0ZvY3VzKCk7XG4gICAgICAgICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQW5pbWF0aW9uRW5kKGV2ZW50OiBBbmltYXRpb25FdmVudCkge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LnRvU3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3ZvaWQnOlxuICAgICAgICAgICAgICAgIHRoaXMub25Db250YWluZXJEZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRFbGVtZW50VG9Gb2N1cygpIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLmRlZmF1bHRGb2N1cykge1xuICAgICAgICAgICAgY2FzZSAnYWNjZXB0JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuY29udGFpbmVyLCAnLnAtY29uZmlybS1wb3B1cC1hY2NlcHQnKTtcblxuICAgICAgICAgICAgY2FzZSAncmVqZWN0JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuY29udGFpbmVyLCAnLnAtY29uZmlybS1wb3B1cC1yZWplY3QnKTtcblxuICAgICAgICAgICAgY2FzZSAnbm9uZSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhbGlnbigpIHtcbiAgICAgICAgaWYgKHRoaXMuYXV0b1pJbmRleCkge1xuICAgICAgICAgICAgWkluZGV4VXRpbHMuc2V0KCdvdmVybGF5JywgdGhpcy5jb250YWluZXIsIHRoaXMuY29uZmlnLnpJbmRleC5vdmVybGF5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5jb25maXJtYXRpb24pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBEb21IYW5kbGVyLmFic29sdXRlUG9zaXRpb24odGhpcy5jb250YWluZXIsIHRoaXMuY29uZmlybWF0aW9uPy50YXJnZXQpO1xuXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lck9mZnNldCA9IERvbUhhbmRsZXIuZ2V0T2Zmc2V0KHRoaXMuY29udGFpbmVyKTtcbiAgICAgICAgY29uc3QgdGFyZ2V0T2Zmc2V0ID0gRG9tSGFuZGxlci5nZXRPZmZzZXQodGhpcy5jb25maXJtYXRpb24/LnRhcmdldCk7XG4gICAgICAgIGxldCBhcnJvd0xlZnQgPSAwO1xuXG4gICAgICAgIGlmIChjb250YWluZXJPZmZzZXQubGVmdCA8IHRhcmdldE9mZnNldC5sZWZ0KSB7XG4gICAgICAgICAgICBhcnJvd0xlZnQgPSB0YXJnZXRPZmZzZXQubGVmdCAtIGNvbnRhaW5lck9mZnNldC5sZWZ0O1xuICAgICAgICB9XG4gICAgICAgICh0aGlzLmNvbnRhaW5lciBhcyBIVE1MRGl2RWxlbWVudCkuc3R5bGUuc2V0UHJvcGVydHkoJy0tb3ZlcmxheUFycm93TGVmdCcsIGAke2Fycm93TGVmdH1weGApO1xuXG4gICAgICAgIGlmIChjb250YWluZXJPZmZzZXQudG9wIDwgdGFyZ2V0T2Zmc2V0LnRvcCkge1xuICAgICAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyh0aGlzLmNvbnRhaW5lciwgJ3AtY29uZmlybS1wb3B1cC1mbGlwcGVkJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoaWRlKCkge1xuICAgICAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBhY2NlcHQoKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbmZpcm1hdGlvbj8uYWNjZXB0RXZlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuY29uZmlybWF0aW9uLmFjY2VwdEV2ZW50LmVtaXQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaGlkZSgpO1xuICAgIH1cblxuICAgIHJlamVjdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuY29uZmlybWF0aW9uPy5yZWplY3RFdmVudCkge1xuICAgICAgICAgICAgdGhpcy5jb25maXJtYXRpb24ucmVqZWN0RXZlbnQuZW1pdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgfVxuXG4gICAgb25PdmVybGF5Q2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgdGhpcy5vdmVybGF5U2VydmljZS5hZGQoe1xuICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgICAgICB0YXJnZXQ6IHRoaXMuZWwubmF0aXZlRWxlbWVudFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBiaW5kTGlzdGVuZXJzKCk6IHZvaWQge1xuICAgICAgICAvKlxuICAgICAgICAgKiBDYWxsZWQgaW5zaWRlIGBzZXRUaW1lb3V0YCB0byBhdm9pZCBsaXN0ZW5pbmcgdG8gdGhlIGNsaWNrIGV2ZW50IHRoYXQgYXBwZWFycyB3aGVuIGBjb25maXJtYCBpcyBmaXJzdCBjYWxsZWQoYnViYmxpbmcpLlxuICAgICAgICAgKiBOZWVkIHdhaXQgd2hlbiBidWJibGluZyBldmVudCB1cCBhbmQgaGFuZyB0aGUgaGFuZGxlciBvbiB0aGUgbmV4dCB0aWNrLlxuICAgICAgICAgKiBUaGlzIGlzIHRoZSBjYXNlIHdoZW4gZXZlbnRUYXJnZXQgYW5kIGNvbmZpcm1hdGlvbi50YXJnZXQgZG8gbm90IG1hdGNoIHdoZW4gdGhlIGBjb25maXJtYCBtZXRob2QgaXMgY2FsbGVkLlxuICAgICAgICAgKi9cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmJpbmREb2N1bWVudENsaWNrTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIHRoaXMuYmluZERvY3VtZW50UmVzaXplTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIHRoaXMuYmluZFNjcm9sbExpc3RlbmVyKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHVuYmluZExpc3RlbmVycygpIHtcbiAgICAgICAgdGhpcy51bmJpbmREb2N1bWVudENsaWNrTGlzdGVuZXIoKTtcbiAgICAgICAgdGhpcy51bmJpbmREb2N1bWVudFJlc2l6ZUxpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMudW5iaW5kU2Nyb2xsTGlzdGVuZXIoKTtcbiAgICB9XG5cbiAgICBiaW5kRG9jdW1lbnRDbGlja0xpc3RlbmVyKCkge1xuICAgICAgICBpZiAoIXRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyKSB7XG4gICAgICAgICAgICBsZXQgZG9jdW1lbnRFdmVudCA9IERvbUhhbmRsZXIuaXNJT1MoKSA/ICd0b3VjaHN0YXJ0JyA6ICdjbGljayc7XG4gICAgICAgICAgICBjb25zdCBkb2N1bWVudFRhcmdldDogYW55ID0gdGhpcy5lbCA/IHRoaXMuZWwubmF0aXZlRWxlbWVudC5vd25lckRvY3VtZW50IDogdGhpcy5kb2N1bWVudDtcblxuICAgICAgICAgICAgdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbihkb2N1bWVudFRhcmdldCwgZG9jdW1lbnRFdmVudCwgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlybWF0aW9uICYmIHRoaXMuY29uZmlybWF0aW9uLmRpc21pc3NhYmxlTWFzayAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRhcmdldEVsZW1lbnQgPSA8SFRNTEVsZW1lbnQ+dGhpcy5jb25maXJtYXRpb24udGFyZ2V0O1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jb250YWluZXIgIT09IGV2ZW50LnRhcmdldCAmJiAhdGhpcy5jb250YWluZXI/LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkgJiYgdGFyZ2V0RWxlbWVudCAhPT0gZXZlbnQudGFyZ2V0ICYmICF0YXJnZXRFbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1bmJpbmREb2N1bWVudENsaWNrTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uV2luZG93UmVzaXplKCkge1xuICAgICAgICBpZiAodGhpcy52aXNpYmxlICYmICFEb21IYW5kbGVyLmlzVG91Y2hEZXZpY2UoKSkge1xuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBiaW5kRG9jdW1lbnRSZXNpemVMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMud2luZG93LCAncmVzaXplJywgdGhpcy5vbldpbmRvd1Jlc2l6ZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVuYmluZERvY3VtZW50UmVzaXplTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lcigpO1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJpbmRTY3JvbGxMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNjcm9sbEhhbmRsZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsSGFuZGxlciA9IG5ldyBDb25uZWN0ZWRPdmVybGF5U2Nyb2xsSGFuZGxlcih0aGlzLmNvbmZpcm1hdGlvbj8udGFyZ2V0LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudmlzaWJsZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2Nyb2xsSGFuZGxlci5iaW5kU2Nyb2xsTGlzdGVuZXIoKTtcbiAgICB9XG5cbiAgICB1bmJpbmRTY3JvbGxMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKHRoaXMuc2Nyb2xsSGFuZGxlcikge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxIYW5kbGVyLnVuYmluZFNjcm9sbExpc3RlbmVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1bnN1YnNjcmliZUNvbmZpcm1hdGlvblN1YnNjcmlwdGlvbnMoKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbmZpcm1hdGlvbikge1xuICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlybWF0aW9uLmFjY2VwdEV2ZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb25maXJtYXRpb24uYWNjZXB0RXZlbnQudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlybWF0aW9uLnJlamVjdEV2ZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb25maXJtYXRpb24ucmVqZWN0RXZlbnQudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQ29udGFpbmVyRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy51bmJpbmRMaXN0ZW5lcnMoKTtcbiAgICAgICAgdGhpcy51bnN1YnNjcmliZUNvbmZpcm1hdGlvblN1YnNjcmlwdGlvbnMoKTtcblxuICAgICAgICBpZiAodGhpcy5hdXRvWkluZGV4KSB7XG4gICAgICAgICAgICBaSW5kZXhVdGlscy5jbGVhcih0aGlzLmNvbnRhaW5lcik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNvbmZpcm1hdGlvbiA9IG51bGw7XG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gbnVsbDtcbiAgICB9XG5cbiAgICByZXN0b3JlQXBwZW5kKCkge1xuICAgICAgICBpZiAodGhpcy5jb250YWluZXIpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2hpbGQodGhpcy5kb2N1bWVudC5ib2R5LCB0aGlzLmNvbnRhaW5lcik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9uQ29udGFpbmVyRGVzdHJveSgpO1xuICAgIH1cblxuICAgIGdldCBhY2NlcHRCdXR0b25MYWJlbCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maXJtYXRpb24/LmFjY2VwdExhYmVsIHx8IHRoaXMuY29uZmlnLmdldFRyYW5zbGF0aW9uKFRyYW5zbGF0aW9uS2V5cy5BQ0NFUFQpO1xuICAgIH1cblxuICAgIGdldCByZWplY3RCdXR0b25MYWJlbCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maXJtYXRpb24/LnJlamVjdExhYmVsIHx8IHRoaXMuY29uZmlnLmdldFRyYW5zbGF0aW9uKFRyYW5zbGF0aW9uS2V5cy5SRUpFQ1QpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnJlc3RvcmVBcHBlbmQoKTtcblxuICAgICAgICBpZiAodGhpcy5zdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgQnV0dG9uTW9kdWxlLCBTaGFyZWRNb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtDb25maXJtUG9wdXAsIFNoYXJlZE1vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbQ29uZmlybVBvcHVwXVxufSlcbmV4cG9ydCBjbGFzcyBDb25maXJtUG9wdXBNb2R1bGUge31cbiJdfQ==