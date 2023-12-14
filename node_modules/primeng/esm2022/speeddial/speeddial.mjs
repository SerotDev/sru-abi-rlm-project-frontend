import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Inject, Input, NgModule, Output, PLATFORM_ID, ViewChild, ViewEncapsulation, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DomHandler } from 'primeng/dom';
import { PlusIcon } from 'primeng/icons/plus';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { UniqueComponentId } from 'primeng/utils';
import { asapScheduler } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "primeng/button";
import * as i3 from "primeng/ripple";
import * as i4 from "primeng/tooltip";
import * as i5 from "@angular/router";
/**
 * When pressed, a floating action button can display multiple primary actions that can be performed on a page.
 * @group Components
 */
export class SpeedDial {
    platformId;
    el;
    cd;
    document;
    renderer;
    /**
     * List of items id.
     * @group Props
     */
    id;
    /**
     * MenuModel instance to define the action items.
     * @group Props
     */
    model = null;
    /**
     * Specifies the visibility of the overlay.
     * @defaultValue false
     * @group Props
     */
    get visible() {
        return this._visible;
    }
    set visible(value) {
        this._visible = value;
        if (this._visible) {
            this.bindDocumentClickListener();
        }
        else {
            this.unbindDocumentClickListener();
        }
    }
    /**
     * Inline style of the element.
     * @group Props
     */
    style;
    /**
     * Style class of the element.
     * @group Props
     */
    className;
    /**
     * Specifies the opening direction of actions.
     * @gruop Props
     */
    direction = 'up';
    /**
     * Transition delay step for each action item.
     * @group Props
     */
    transitionDelay = 30;
    /**
     * Specifies the opening type of actions.
     * @group Props
     */
    type = 'linear';
    /**
     * Radius for *circle types.
     * @group Props
     */
    radius = 0;
    /**
     * Whether to show a mask element behind the speeddial.
     * @group Props
     */
    mask = false;
    /**
     * Whether the component is disabled.
     * @group Props
     */
    disabled = false;
    /**
     * Whether the actions close when clicked outside.
     * @group Props
     */
    hideOnClickOutside = true;
    /**
     * Inline style of the button element.
     * @group Props
     */
    buttonStyle;
    /**
     * Style class of the button element.
     * @group Props
     */
    buttonClassName;
    /**
     * Inline style of the mask element.
     * @group Props
     */
    maskStyle;
    /**
     * Style class of the mask element.
     * @group Props
     */
    maskClassName;
    /**
     * Show icon of the button element.
     * @group Props
     */
    showIcon;
    /**
     * Hide icon of the button element.
     * @group Props
     */
    hideIcon;
    /**
     * Defined to rotate showIcon when hideIcon is not present.
     * @group Props
     */
    rotateAnimation = true;
    /**
     * Defines a string value that labels an interactive element.
     * @group Props
     */
    ariaLabel;
    /**
     * Identifier of the underlying input element.
     * @group Props
     */
    ariaLabelledBy;
    /**
     * Fired when the visibility of element changed.
     * @param {boolean} boolean - Visibility value.
     * @group Emits
     */
    onVisibleChange = new EventEmitter();
    /**
     * Fired when the visibility of element changed.
     * @param {boolean} boolean - Visibility value.
     * @group Emits
     */
    visibleChange = new EventEmitter();
    /**
     * Fired when the button element clicked.
     * @param {MouseEvent} event - Mouse event.
     * @group Emits
     */
    onClick = new EventEmitter();
    /**
     * Fired when the actions are visible.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onShow = new EventEmitter();
    /**
     * Fired when the actions are hidden.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onHide = new EventEmitter();
    container;
    list;
    templates;
    buttonTemplate;
    isItemClicked = false;
    _visible = false;
    documentClickListener;
    focusedOptionIndex = signal(null);
    focused = false;
    get focusedOptionId() {
        return this.focusedOptionIndex() !== -1 ? this.focusedOptionIndex() : null;
    }
    constructor(platformId, el, cd, document, renderer) {
        this.platformId = platformId;
        this.el = el;
        this.cd = cd;
        this.document = document;
        this.renderer = renderer;
    }
    ngOnInit() {
        this.id = this.id || UniqueComponentId();
    }
    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            if (this.type !== 'linear') {
                const button = DomHandler.findSingle(this.container?.nativeElement, '.p-speeddial-button');
                const firstItem = DomHandler.findSingle(this.list?.nativeElement, '.p-speeddial-item');
                if (button && firstItem) {
                    const wDiff = Math.abs(button.offsetWidth - firstItem.offsetWidth);
                    const hDiff = Math.abs(button.offsetHeight - firstItem.offsetHeight);
                    this.list?.nativeElement.style.setProperty('--item-diff-x', `${wDiff / 2}px`);
                    this.list?.nativeElement.style.setProperty('--item-diff-y', `${hDiff / 2}px`);
                }
            }
        }
    }
    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'button':
                    this.buttonTemplate = item.template;
                    break;
            }
        });
    }
    show() {
        this.onVisibleChange.emit(true);
        this.visibleChange.emit(true);
        this._visible = true;
        this.onShow.emit();
        this.bindDocumentClickListener();
        this.cd.markForCheck();
    }
    hide() {
        this.onVisibleChange.emit(false);
        this.visibleChange.emit(false);
        this._visible = false;
        this.onHide.emit();
        this.unbindDocumentClickListener();
        this.cd.markForCheck();
    }
    onButtonClick(event) {
        this.visible ? this.hide() : this.show();
        this.onClick.emit(event);
        this.isItemClicked = true;
    }
    onItemClick(e, item) {
        if (item.command) {
            item.command({ originalEvent: e, item });
        }
        this.hide();
        this.isItemClicked = true;
    }
    onKeyDown(event) {
        switch (event.code) {
            case 'ArrowDown':
                this.onArrowDown(event);
                break;
            case 'ArrowUp':
                this.onArrowUp(event);
                break;
            case 'ArrowLeft':
                this.onArrowLeft(event);
                break;
            case 'ArrowRight':
                this.onArrowRight(event);
                break;
            case 'Enter':
            case 'Space':
                this.onEnterKey(event);
                break;
            case 'Escape':
                this.onEscapeKey(event);
                break;
            case 'Home':
                this.onHomeKey(event);
                break;
            case 'End':
                this.onEndKey(event);
                break;
            default:
                break;
        }
    }
    onFocus(event) {
        this.focused = true;
    }
    onBlur(event) {
        this.focused = false;
        asapScheduler.schedule(() => this.focusedOptionIndex.set(-1));
    }
    onArrowUp(event) {
        if (this.direction === 'up') {
            this.navigateNextItem(event);
        }
        else if (this.direction === 'down') {
            this.navigatePrevItem(event);
        }
        else {
            this.navigateNextItem(event);
        }
    }
    onArrowDown(event) {
        if (this.direction === 'up') {
            this.navigatePrevItem(event);
        }
        else if (this.direction === 'down') {
            this.navigateNextItem(event);
        }
        else {
            this.navigatePrevItem(event);
        }
    }
    onArrowLeft(event) {
        const leftValidDirections = ['left', 'up-right', 'down-left'];
        const rightValidDirections = ['right', 'up-left', 'down-right'];
        if (leftValidDirections.includes(this.direction)) {
            this.navigateNextItem(event);
        }
        else if (rightValidDirections.includes(this.direction)) {
            this.navigatePrevItem(event);
        }
        else {
            this.navigatePrevItem(event);
        }
    }
    onArrowRight(event) {
        const leftValidDirections = ['left', 'up-right', 'down-left'];
        const rightValidDirections = ['right', 'up-left', 'down-right'];
        if (leftValidDirections.includes(this.direction)) {
            this.navigatePrevItem(event);
        }
        else if (rightValidDirections.includes(this.direction)) {
            this.navigateNextItem(event);
        }
        else {
            this.navigateNextItem(event);
        }
    }
    onEndKey(event) {
        event.preventDefault();
        this.focusedOptionIndex.set(-1);
        this.navigatePrevItem(event);
    }
    onHomeKey(event) {
        event.preventDefault();
        this.focusedOptionIndex.set(-1);
        this.navigateNextItem(event);
    }
    onEnterKey(event) {
        const items = DomHandler.find(this.container.nativeElement, '[data-pc-section="menuitem"]');
        const itemIndex = [...items].findIndex((item) => item.id === this.focusedOptionIndex);
        this.onItemClick(event, this.model[itemIndex]);
        this.onBlur(event);
        const buttonEl = DomHandler.findSingle(this.container.nativeElement, 'button');
        buttonEl && DomHandler.focus(buttonEl);
    }
    onEscapeKey(event) {
        this.hide();
        const buttonEl = DomHandler.findSingle(this.container.nativeElement, 'button');
        buttonEl && DomHandler.focus(buttonEl);
    }
    onTogglerKeydown(event) {
        switch (event.code) {
            case 'ArrowDown':
            case 'ArrowLeft':
                this.onTogglerArrowDown(event);
                break;
            case 'ArrowUp':
            case 'ArrowRight':
                this.onTogglerArrowUp(event);
                break;
            case 'Escape':
                this.onEscapeKey(event);
                break;
            default:
                break;
        }
    }
    onTogglerArrowUp(event) {
        this.focused = true;
        DomHandler.focus(this.list.nativeElement);
        this.show();
        this.navigatePrevItem(event);
        event.preventDefault();
    }
    onTogglerArrowDown(event) {
        this.focused = true;
        DomHandler.focus(this.list.nativeElement);
        this.show();
        this.navigateNextItem(event);
        event.preventDefault();
    }
    navigateNextItem(event) {
        const optionIndex = this.findNextOptionIndex(this.focusedOptionIndex());
        this.changeFocusedOptionIndex(optionIndex);
        event.preventDefault();
    }
    navigatePrevItem(event) {
        const optionIndex = this.findPrevOptionIndex(this.focusedOptionIndex());
        this.changeFocusedOptionIndex(optionIndex);
        event.preventDefault();
    }
    findPrevOptionIndex(index) {
        const items = DomHandler.find(this.container.nativeElement, '[data-pc-section="menuitem"]');
        const filteredItems = [...items].filter((item) => !DomHandler.hasClass(DomHandler.findSingle(item, 'a'), 'p-disabled'));
        const newIndex = index === -1 ? filteredItems[filteredItems.length - 1].id : index;
        let matchedOptionIndex = filteredItems.findIndex((link) => link.getAttribute('id') === newIndex);
        matchedOptionIndex = index === -1 ? filteredItems.length - 1 : matchedOptionIndex - 1;
        return matchedOptionIndex;
    }
    findNextOptionIndex(index) {
        const items = DomHandler.find(this.container.nativeElement, '[data-pc-section="menuitem"]');
        const filteredItems = [...items].filter((item) => !DomHandler.hasClass(DomHandler.findSingle(item, 'a'), 'p-disabled'));
        const newIndex = index === -1 ? filteredItems[0].id : index;
        let matchedOptionIndex = filteredItems.findIndex((link) => link.getAttribute('id') === newIndex);
        matchedOptionIndex = index === -1 ? 0 : matchedOptionIndex + 1;
        return matchedOptionIndex;
    }
    changeFocusedOptionIndex(index) {
        const items = DomHandler.find(this.container.nativeElement, '[data-pc-section="menuitem"]');
        const filteredItems = [...items].filter((item) => !DomHandler.hasClass(DomHandler.findSingle(item, 'a'), 'p-disabled'));
        if (filteredItems[index]) {
            this.focusedOptionIndex.set(filteredItems[index].getAttribute('id'));
        }
    }
    calculatePointStyle(index) {
        const type = this.type;
        if (type !== 'linear') {
            const length = this.model.length;
            const radius = this.radius || length * 20;
            if (type === 'circle') {
                const step = (2 * Math.PI) / length;
                return {
                    left: `calc(${radius * Math.cos(step * index)}px + var(--item-diff-x, 0px))`,
                    top: `calc(${radius * Math.sin(step * index)}px + var(--item-diff-y, 0px))`
                };
            }
            else if (type === 'semi-circle') {
                const direction = this.direction;
                const step = Math.PI / (length - 1);
                const x = `calc(${radius * Math.cos(step * index)}px + var(--item-diff-x, 0px))`;
                const y = `calc(${radius * Math.sin(step * index)}px + var(--item-diff-y, 0px))`;
                if (direction === 'up') {
                    return { left: x, bottom: y };
                }
                else if (direction === 'down') {
                    return { left: x, top: y };
                }
                else if (direction === 'left') {
                    return { right: y, top: x };
                }
                else if (direction === 'right') {
                    return { left: y, top: x };
                }
            }
            else if (type === 'quarter-circle') {
                const direction = this.direction;
                const step = Math.PI / (2 * (length - 1));
                const x = `calc(${radius * Math.cos(step * index)}px + var(--item-diff-x, 0px))`;
                const y = `calc(${radius * Math.sin(step * index)}px + var(--item-diff-y, 0px))`;
                if (direction === 'up-left') {
                    return { right: x, bottom: y };
                }
                else if (direction === 'up-right') {
                    return { left: x, bottom: y };
                }
                else if (direction === 'down-left') {
                    return { right: y, top: x };
                }
                else if (direction === 'down-right') {
                    return { left: y, top: x };
                }
            }
        }
        return {};
    }
    calculateTransitionDelay(index) {
        const length = this.model.length;
        return (this.visible ? index : length - index - 1) * this.transitionDelay;
    }
    containerClass() {
        return {
            ['p-speeddial p-component' + ` p-speeddial-${this.type}`]: true,
            [`p-speeddial-direction-${this.direction}`]: this.type !== 'circle',
            'p-speeddial-opened': this.visible,
            'p-disabled': this.disabled
        };
    }
    buttonClass() {
        return {
            'p-speeddial-button p-button-rounded': true,
            'p-speeddial-rotate': this.rotateAnimation && !this.hideIcon,
            [this.buttonClassName]: true
        };
    }
    get buttonIconClass() {
        return (!this.visible && this.showIcon) || !this.hideIcon ? this.showIcon : this.hideIcon;
    }
    getItemStyle(index) {
        const transitionDelay = this.calculateTransitionDelay(index);
        const pointStyle = this.calculatePointStyle(index);
        return {
            transitionDelay: `${transitionDelay}ms`,
            ...pointStyle
        };
    }
    isClickableRouterLink(item) {
        return item.routerLink && !this.disabled && !item.disabled;
    }
    isOutsideClicked(event) {
        return this.container && !(this.container.nativeElement.isSameNode(event.target) || this.container.nativeElement.contains(event.target) || this.isItemClicked);
    }
    bindDocumentClickListener() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.documentClickListener && this.hideOnClickOutside) {
                this.documentClickListener = this.renderer.listen(this.document, 'click', (event) => {
                    if (this.visible && this.isOutsideClicked(event)) {
                        this.hide();
                    }
                    this.isItemClicked = false;
                });
            }
        }
    }
    unbindDocumentClickListener() {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    }
    ngOnDestroy() {
        this.unbindDocumentClickListener();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: SpeedDial, deps: [{ token: PLATFORM_ID }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: DOCUMENT }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.5", type: SpeedDial, selector: "p-speedDial", inputs: { id: "id", model: "model", visible: "visible", style: "style", className: "className", direction: "direction", transitionDelay: "transitionDelay", type: "type", radius: "radius", mask: "mask", disabled: "disabled", hideOnClickOutside: "hideOnClickOutside", buttonStyle: "buttonStyle", buttonClassName: "buttonClassName", maskStyle: "maskStyle", maskClassName: "maskClassName", showIcon: "showIcon", hideIcon: "hideIcon", rotateAnimation: "rotateAnimation", ariaLabel: "ariaLabel", ariaLabelledBy: "ariaLabelledBy" }, outputs: { onVisibleChange: "onVisibleChange", visibleChange: "visibleChange", onClick: "onClick", onShow: "onShow", onHide: "onHide" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "container", first: true, predicate: ["container"], descendants: true }, { propertyName: "list", first: true, predicate: ["list"], descendants: true }], ngImport: i0, template: `
        <div #container [ngClass]="containerClass()" [class]="className" [ngStyle]="style" [attr.data-pc-name]="'speeddial'" [attr.data-pc-section]="'root'">
            <button
                pRipple
                pButton
                class="p-button-icon-only"
                [style]="buttonStyle"
                [icon]="buttonIconClass"
                [ngClass]="buttonClass()"
                [disabled]="disabled"
                [attr.aria-expanded]="visible"
                [attr.aria-haspopup]="true"
                [attr.aria-controls]="id + '_list'"
                [attr.aria-label]="ariaLabel"
                [attr.aria-labelledby]="ariaLabelledBy"
                (click)="onButtonClick($event)"
                (keydown)="onTogglerKeydown($event)"
                [attr.data-pc-name]="'button'"
            >
                <PlusIcon *ngIf="!showIcon && !buttonTemplate" />
                <ng-container *ngIf="buttonTemplate">
                    <ng-container *ngTemplateOutlet="buttonTemplate"></ng-container>
                </ng-container>
            </button>
            <ul
                #list
                class="p-speeddial-list"
                role="menu"
                [id]="id + '_list'"
                (focus)="onFocus($event)"
                (focusout)="onBlur($event)"
                (keydown)="onKeyDown($event)"
                [attr.aria-activedescendant]="focused ? focusedOptionId : undefined"
                [tabindex]="-1"
                [attr.data-pc-section]="'menu'"
            >
                <li
                    *ngFor="let item of model; let i = index"
                    [ngStyle]="getItemStyle(i)"
                    class="p-speeddial-item"
                    pTooltip
                    [tooltipOptions]="item.tooltipOptions"
                    [ngClass]="{ 'p-hidden': item.visible === false, 'p-focus': focusedOptionId == id + '_' + i }"
                    [id]="id + '_' + i"
                    [attr.aria-controls]="id + '_item'"
                    role="menuitem"
                    [attr.data-pc-section]="'menuitem'"
                >
                    <a
                        *ngIf="_visible && isClickableRouterLink(item); else elseBlock"
                        pRipple
                        [routerLink]="item.routerLink"
                        [queryParams]="item.queryParams"
                        class="p-speeddial-action"
                        [ngClass]="{ 'p-disabled': item.disabled }"
                        role="menuitem"
                        [routerLinkActiveOptions]="item.routerLinkActiveOptions || { exact: false }"
                        (click)="onItemClick($event, item)"
                        (keydown.enter)="onItemClick($event, item, i)"
                        [attr.target]="item.target"
                        [attr.tabindex]="item.disabled || readonly || !visible ? null : item.tabindex ? item.tabindex : '0'"
                        [fragment]="item.fragment"
                        [queryParamsHandling]="item.queryParamsHandling"
                        [preserveFragment]="item.preserveFragment"
                        [skipLocationChange]="item.skipLocationChange"
                        [replaceUrl]="item.replaceUrl"
                        [state]="item.state"
                        [attr.aria-label]="item.label"
                        [attr.data-pc-section]="'action'"
                    >
                        <span class="p-speeddial-action-icon" *ngIf="item.icon" [ngClass]="item.icon"></span>
                    </a>
                    <ng-template #elseBlock>
                        <a
                            *ngIf="_visible"
                            [attr.href]="item.url || null"
                            class="p-speeddial-action"
                            role="menuitem"
                            pRipple
                            (click)="onItemClick($event, item)"
                            [ngClass]="{ 'p-disabled': item.disabled }"
                            (keydown.enter)="onItemClick($event, item, i)"
                            [attr.target]="item.target"
                            [attr.data-pc-section]="'action'"
                            [attr.aria-label]="item.label"
                            [attr.tabindex]="item.disabled || (i !== activeIndex && readonly) || !visible ? null : item.tabindex ? item.tabindex : '0'"
                        >
                            <span class="p-speeddial-action-icon" *ngIf="item.icon" [ngClass]="item.icon"></span>
                        </a>
                    </ng-template>
                </li>
            </ul>
        </div>
        <div *ngIf="mask && visible" [ngClass]="{ 'p-speeddial-mask': true, 'p-speeddial-mask-visible': visible }" [class]="maskClassName" [ngStyle]="maskStyle"></div>
    `, isInline: true, styles: ["@layer primeng{.p-speeddial{position:absolute;display:flex;z-index:1}.p-speeddial-list{margin:0;padding:0;list-style:none;display:flex;align-items:center;justify-content:center;transition:top 0s linear .2s;pointer-events:none}.p-speeddial-item{transform:scale(0);opacity:0;transition:transform .2s cubic-bezier(.4,0,.2,1) 0ms,opacity .8s;will-change:transform}.p-speeddial-action{display:flex;align-items:center;justify-content:center;border-radius:50%;position:relative;overflow:hidden;cursor:pointer}.p-speeddial-circle .p-speeddial-item,.p-speeddial-semi-circle .p-speeddial-item,.p-speeddial-quarter-circle .p-speeddial-item{position:absolute}.p-speeddial-rotate{transition:transform .25s cubic-bezier(.4,0,.2,1) 0ms;will-change:transform}.p-speeddial-mask{position:absolute;left:0;top:0;width:100%;height:100%;opacity:0;transition:opacity .25s cubic-bezier(.25,.8,.25,1)}.p-speeddial-mask-visible{pointer-events:none;opacity:1;transition:opacity .4s cubic-bezier(.25,.8,.25,1)}.p-speeddial-opened .p-speeddial-list{pointer-events:auto}.p-speeddial-opened .p-speeddial-item{transform:scale(1);opacity:1}.p-speeddial-opened .p-speeddial-rotate{transform:rotate(45deg)}.p-speeddial-direction-up{align-items:center;flex-direction:column-reverse}.p-speeddial-direction-up .p-speeddial-list{flex-direction:column-reverse}.p-speeddial-direction-down{align-items:center;flex-direction:column}.p-speeddial-direction-down .p-speeddial-list{flex-direction:column}.p-speeddial-direction-left{justify-content:center;flex-direction:row-reverse}.p-speeddial-direction-left .p-speeddial-list{flex-direction:row-reverse}.p-speeddial-direction-right{justify-content:center;flex-direction:row}.p-speeddial-direction-right .p-speeddial-list{flex-direction:row}}\n"], dependencies: [{ kind: "directive", type: i0.forwardRef(() => i1.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgForOf), selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgIf), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgStyle), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i0.forwardRef(() => i2.ButtonDirective), selector: "[pButton]", inputs: ["iconPos", "loadingIcon", "label", "icon", "loading"] }, { kind: "directive", type: i0.forwardRef(() => i3.Ripple), selector: "[pRipple]" }, { kind: "directive", type: i0.forwardRef(() => i4.Tooltip), selector: "[pTooltip]", inputs: ["tooltipPosition", "tooltipEvent", "appendTo", "positionStyle", "tooltipStyleClass", "tooltipZIndex", "escape", "showDelay", "hideDelay", "life", "positionTop", "positionLeft", "autoHide", "fitContent", "hideOnEscape", "pTooltip", "tooltipDisabled", "tooltipOptions"] }, { kind: "directive", type: i0.forwardRef(() => i5.RouterLink), selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: i0.forwardRef(() => PlusIcon), selector: "PlusIcon" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: SpeedDial, decorators: [{
            type: Component,
            args: [{ selector: 'p-speedDial', template: `
        <div #container [ngClass]="containerClass()" [class]="className" [ngStyle]="style" [attr.data-pc-name]="'speeddial'" [attr.data-pc-section]="'root'">
            <button
                pRipple
                pButton
                class="p-button-icon-only"
                [style]="buttonStyle"
                [icon]="buttonIconClass"
                [ngClass]="buttonClass()"
                [disabled]="disabled"
                [attr.aria-expanded]="visible"
                [attr.aria-haspopup]="true"
                [attr.aria-controls]="id + '_list'"
                [attr.aria-label]="ariaLabel"
                [attr.aria-labelledby]="ariaLabelledBy"
                (click)="onButtonClick($event)"
                (keydown)="onTogglerKeydown($event)"
                [attr.data-pc-name]="'button'"
            >
                <PlusIcon *ngIf="!showIcon && !buttonTemplate" />
                <ng-container *ngIf="buttonTemplate">
                    <ng-container *ngTemplateOutlet="buttonTemplate"></ng-container>
                </ng-container>
            </button>
            <ul
                #list
                class="p-speeddial-list"
                role="menu"
                [id]="id + '_list'"
                (focus)="onFocus($event)"
                (focusout)="onBlur($event)"
                (keydown)="onKeyDown($event)"
                [attr.aria-activedescendant]="focused ? focusedOptionId : undefined"
                [tabindex]="-1"
                [attr.data-pc-section]="'menu'"
            >
                <li
                    *ngFor="let item of model; let i = index"
                    [ngStyle]="getItemStyle(i)"
                    class="p-speeddial-item"
                    pTooltip
                    [tooltipOptions]="item.tooltipOptions"
                    [ngClass]="{ 'p-hidden': item.visible === false, 'p-focus': focusedOptionId == id + '_' + i }"
                    [id]="id + '_' + i"
                    [attr.aria-controls]="id + '_item'"
                    role="menuitem"
                    [attr.data-pc-section]="'menuitem'"
                >
                    <a
                        *ngIf="_visible && isClickableRouterLink(item); else elseBlock"
                        pRipple
                        [routerLink]="item.routerLink"
                        [queryParams]="item.queryParams"
                        class="p-speeddial-action"
                        [ngClass]="{ 'p-disabled': item.disabled }"
                        role="menuitem"
                        [routerLinkActiveOptions]="item.routerLinkActiveOptions || { exact: false }"
                        (click)="onItemClick($event, item)"
                        (keydown.enter)="onItemClick($event, item, i)"
                        [attr.target]="item.target"
                        [attr.tabindex]="item.disabled || readonly || !visible ? null : item.tabindex ? item.tabindex : '0'"
                        [fragment]="item.fragment"
                        [queryParamsHandling]="item.queryParamsHandling"
                        [preserveFragment]="item.preserveFragment"
                        [skipLocationChange]="item.skipLocationChange"
                        [replaceUrl]="item.replaceUrl"
                        [state]="item.state"
                        [attr.aria-label]="item.label"
                        [attr.data-pc-section]="'action'"
                    >
                        <span class="p-speeddial-action-icon" *ngIf="item.icon" [ngClass]="item.icon"></span>
                    </a>
                    <ng-template #elseBlock>
                        <a
                            *ngIf="_visible"
                            [attr.href]="item.url || null"
                            class="p-speeddial-action"
                            role="menuitem"
                            pRipple
                            (click)="onItemClick($event, item)"
                            [ngClass]="{ 'p-disabled': item.disabled }"
                            (keydown.enter)="onItemClick($event, item, i)"
                            [attr.target]="item.target"
                            [attr.data-pc-section]="'action'"
                            [attr.aria-label]="item.label"
                            [attr.tabindex]="item.disabled || (i !== activeIndex && readonly) || !visible ? null : item.tabindex ? item.tabindex : '0'"
                        >
                            <span class="p-speeddial-action-icon" *ngIf="item.icon" [ngClass]="item.icon"></span>
                        </a>
                    </ng-template>
                </li>
            </ul>
        </div>
        <div *ngIf="mask && visible" [ngClass]="{ 'p-speeddial-mask': true, 'p-speeddial-mask-visible': visible }" [class]="maskClassName" [ngStyle]="maskStyle"></div>
    `, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: ["@layer primeng{.p-speeddial{position:absolute;display:flex;z-index:1}.p-speeddial-list{margin:0;padding:0;list-style:none;display:flex;align-items:center;justify-content:center;transition:top 0s linear .2s;pointer-events:none}.p-speeddial-item{transform:scale(0);opacity:0;transition:transform .2s cubic-bezier(.4,0,.2,1) 0ms,opacity .8s;will-change:transform}.p-speeddial-action{display:flex;align-items:center;justify-content:center;border-radius:50%;position:relative;overflow:hidden;cursor:pointer}.p-speeddial-circle .p-speeddial-item,.p-speeddial-semi-circle .p-speeddial-item,.p-speeddial-quarter-circle .p-speeddial-item{position:absolute}.p-speeddial-rotate{transition:transform .25s cubic-bezier(.4,0,.2,1) 0ms;will-change:transform}.p-speeddial-mask{position:absolute;left:0;top:0;width:100%;height:100%;opacity:0;transition:opacity .25s cubic-bezier(.25,.8,.25,1)}.p-speeddial-mask-visible{pointer-events:none;opacity:1;transition:opacity .4s cubic-bezier(.25,.8,.25,1)}.p-speeddial-opened .p-speeddial-list{pointer-events:auto}.p-speeddial-opened .p-speeddial-item{transform:scale(1);opacity:1}.p-speeddial-opened .p-speeddial-rotate{transform:rotate(45deg)}.p-speeddial-direction-up{align-items:center;flex-direction:column-reverse}.p-speeddial-direction-up .p-speeddial-list{flex-direction:column-reverse}.p-speeddial-direction-down{align-items:center;flex-direction:column}.p-speeddial-direction-down .p-speeddial-list{flex-direction:column}.p-speeddial-direction-left{justify-content:center;flex-direction:row-reverse}.p-speeddial-direction-left .p-speeddial-list{flex-direction:row-reverse}.p-speeddial-direction-right{justify-content:center;flex-direction:row}.p-speeddial-direction-right .p-speeddial-list{flex-direction:row}}\n"] }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.Renderer2 }], propDecorators: { id: [{
                type: Input
            }], model: [{
                type: Input
            }], visible: [{
                type: Input
            }], style: [{
                type: Input
            }], className: [{
                type: Input
            }], direction: [{
                type: Input
            }], transitionDelay: [{
                type: Input
            }], type: [{
                type: Input
            }], radius: [{
                type: Input
            }], mask: [{
                type: Input
            }], disabled: [{
                type: Input
            }], hideOnClickOutside: [{
                type: Input
            }], buttonStyle: [{
                type: Input
            }], buttonClassName: [{
                type: Input
            }], maskStyle: [{
                type: Input
            }], maskClassName: [{
                type: Input
            }], showIcon: [{
                type: Input
            }], hideIcon: [{
                type: Input
            }], rotateAnimation: [{
                type: Input
            }], ariaLabel: [{
                type: Input
            }], ariaLabelledBy: [{
                type: Input
            }], onVisibleChange: [{
                type: Output
            }], visibleChange: [{
                type: Output
            }], onClick: [{
                type: Output
            }], onShow: [{
                type: Output
            }], onHide: [{
                type: Output
            }], container: [{
                type: ViewChild,
                args: ['container']
            }], list: [{
                type: ViewChild,
                args: ['list']
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
export class SpeedDialModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: SpeedDialModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.0.5", ngImport: i0, type: SpeedDialModule, declarations: [SpeedDial], imports: [CommonModule, ButtonModule, RippleModule, TooltipModule, RouterModule, PlusIcon], exports: [SpeedDial, SharedModule, ButtonModule, TooltipModule, RouterModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: SpeedDialModule, imports: [CommonModule, ButtonModule, RippleModule, TooltipModule, RouterModule, PlusIcon, SharedModule, ButtonModule, TooltipModule, RouterModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: SpeedDialModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, ButtonModule, RippleModule, TooltipModule, RouterModule, PlusIcon],
                    exports: [SpeedDial, SharedModule, ButtonModule, TooltipModule, RouterModule],
                    declarations: [SpeedDial]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BlZWRkaWFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL3NwZWVkZGlhbC9zcGVlZGRpYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM1RSxPQUFPLEVBR0gsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxlQUFlLEVBRWYsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBQ0wsUUFBUSxFQUVSLE1BQU0sRUFDTixXQUFXLEVBSVgsU0FBUyxFQUNULGlCQUFpQixFQUNqQixNQUFNLEVBQ1QsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBWSxhQUFhLEVBQUUsWUFBWSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7Ozs7O0FBRXJDOzs7R0FHRztBQXlHSCxNQUFNLE9BQU8sU0FBUztJQTJLdUI7SUFBeUI7SUFBdUI7SUFBaUQ7SUFBNEI7SUExS3RLOzs7T0FHRztJQUNNLEVBQUUsQ0FBcUI7SUFDaEM7OztPQUdHO0lBQ00sS0FBSyxHQUFzQixJQUFJLENBQUM7SUFDekM7Ozs7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Q0FBQztvQkFDMUYsT0FBTyxFQUFFLENBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLFlBQVksQ0FBQztvQkFDN0UsWUFBWSxFQUFFLENBQUMsU0FBUyxDQUFDO2lCQUM1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSwgRE9DVU1FTlQsIGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBDb250ZW50Q2hpbGRyZW4sXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5qZWN0LFxuICAgIElucHV0LFxuICAgIE5nTW9kdWxlLFxuICAgIE9uRGVzdHJveSxcbiAgICBPdXRwdXQsXG4gICAgUExBVEZPUk1fSUQsXG4gICAgUXVlcnlMaXN0LFxuICAgIFJlbmRlcmVyMixcbiAgICBUZW1wbGF0ZVJlZixcbiAgICBWaWV3Q2hpbGQsXG4gICAgVmlld0VuY2Fwc3VsYXRpb24sXG4gICAgc2lnbmFsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IE1lbnVJdGVtLCBQcmltZVRlbXBsYXRlLCBTaGFyZWRNb2R1bGUgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBCdXR0b25Nb2R1bGUgfSBmcm9tICdwcmltZW5nL2J1dHRvbic7XG5pbXBvcnQgeyBEb21IYW5kbGVyIH0gZnJvbSAncHJpbWVuZy9kb20nO1xuaW1wb3J0IHsgUGx1c0ljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL3BsdXMnO1xuaW1wb3J0IHsgUmlwcGxlTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9yaXBwbGUnO1xuaW1wb3J0IHsgVG9vbHRpcE1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvdG9vbHRpcCc7XG5pbXBvcnQgeyBVbmlxdWVDb21wb25lbnRJZCB9IGZyb20gJ3ByaW1lbmcvdXRpbHMnO1xuaW1wb3J0IHsgYXNhcFNjaGVkdWxlciB9IGZyb20gJ3J4anMnO1xuXG4vKipcbiAqIFdoZW4gcHJlc3NlZCwgYSBmbG9hdGluZyBhY3Rpb24gYnV0dG9uIGNhbiBkaXNwbGF5IG11bHRpcGxlIHByaW1hcnkgYWN0aW9ucyB0aGF0IGNhbiBiZSBwZXJmb3JtZWQgb24gYSBwYWdlLlxuICogQGdyb3VwIENvbXBvbmVudHNcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLXNwZWVkRGlhbCcsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiAjY29udGFpbmVyIFtuZ0NsYXNzXT1cImNvbnRhaW5lckNsYXNzKClcIiBbY2xhc3NdPVwiY2xhc3NOYW1lXCIgW25nU3R5bGVdPVwic3R5bGVcIiBbYXR0ci5kYXRhLXBjLW5hbWVdPVwiJ3NwZWVkZGlhbCdcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ3Jvb3QnXCI+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgcFJpcHBsZVxuICAgICAgICAgICAgICAgIHBCdXR0b25cbiAgICAgICAgICAgICAgICBjbGFzcz1cInAtYnV0dG9uLWljb24tb25seVwiXG4gICAgICAgICAgICAgICAgW3N0eWxlXT1cImJ1dHRvblN0eWxlXCJcbiAgICAgICAgICAgICAgICBbaWNvbl09XCJidXR0b25JY29uQ2xhc3NcIlxuICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cImJ1dHRvbkNsYXNzKClcIlxuICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1leHBhbmRlZF09XCJ2aXNpYmxlXCJcbiAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWhhc3BvcHVwXT1cInRydWVcIlxuICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtY29udHJvbHNdPVwiaWQgKyAnX2xpc3QnXCJcbiAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImFyaWFMYWJlbFwiXG4gICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XT1cImFyaWFMYWJlbGxlZEJ5XCJcbiAgICAgICAgICAgICAgICAoY2xpY2spPVwib25CdXR0b25DbGljaygkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAoa2V5ZG93bik9XCJvblRvZ2dsZXJLZXlkb3duKCRldmVudClcIlxuICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtbmFtZV09XCInYnV0dG9uJ1wiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPFBsdXNJY29uICpuZ0lmPVwiIXNob3dJY29uICYmICFidXR0b25UZW1wbGF0ZVwiIC8+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImJ1dHRvblRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJidXR0b25UZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8dWxcbiAgICAgICAgICAgICAgICAjbGlzdFxuICAgICAgICAgICAgICAgIGNsYXNzPVwicC1zcGVlZGRpYWwtbGlzdFwiXG4gICAgICAgICAgICAgICAgcm9sZT1cIm1lbnVcIlxuICAgICAgICAgICAgICAgIFtpZF09XCJpZCArICdfbGlzdCdcIlxuICAgICAgICAgICAgICAgIChmb2N1cyk9XCJvbkZvY3VzKCRldmVudClcIlxuICAgICAgICAgICAgICAgIChmb2N1c291dCk9XCJvbkJsdXIoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgKGtleWRvd24pPVwib25LZXlEb3duKCRldmVudClcIlxuICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtYWN0aXZlZGVzY2VuZGFudF09XCJmb2N1c2VkID8gZm9jdXNlZE9wdGlvbklkIDogdW5kZWZpbmVkXCJcbiAgICAgICAgICAgICAgICBbdGFiaW5kZXhdPVwiLTFcIlxuICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInbWVudSdcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxsaVxuICAgICAgICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgaXRlbSBvZiBtb2RlbDsgbGV0IGkgPSBpbmRleFwiXG4gICAgICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cImdldEl0ZW1TdHlsZShpKVwiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC1zcGVlZGRpYWwtaXRlbVwiXG4gICAgICAgICAgICAgICAgICAgIHBUb29sdGlwXG4gICAgICAgICAgICAgICAgICAgIFt0b29sdGlwT3B0aW9uc109XCJpdGVtLnRvb2x0aXBPcHRpb25zXCJcbiAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyAncC1oaWRkZW4nOiBpdGVtLnZpc2libGUgPT09IGZhbHNlLCAncC1mb2N1cyc6IGZvY3VzZWRPcHRpb25JZCA9PSBpZCArICdfJyArIGkgfVwiXG4gICAgICAgICAgICAgICAgICAgIFtpZF09XCJpZCArICdfJyArIGlcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWNvbnRyb2xzXT1cImlkICsgJ19pdGVtJ1wiXG4gICAgICAgICAgICAgICAgICAgIHJvbGU9XCJtZW51aXRlbVwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInbWVudWl0ZW0nXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxhXG4gICAgICAgICAgICAgICAgICAgICAgICAqbmdJZj1cIl92aXNpYmxlICYmIGlzQ2xpY2thYmxlUm91dGVyTGluayhpdGVtKTsgZWxzZSBlbHNlQmxvY2tcIlxuICAgICAgICAgICAgICAgICAgICAgICAgcFJpcHBsZVxuICAgICAgICAgICAgICAgICAgICAgICAgW3JvdXRlckxpbmtdPVwiaXRlbS5yb3V0ZXJMaW5rXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtxdWVyeVBhcmFtc109XCJpdGVtLnF1ZXJ5UGFyYW1zXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC1zcGVlZGRpYWwtYWN0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsgJ3AtZGlzYWJsZWQnOiBpdGVtLmRpc2FibGVkIH1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgcm9sZT1cIm1lbnVpdGVtXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtyb3V0ZXJMaW5rQWN0aXZlT3B0aW9uc109XCJpdGVtLnJvdXRlckxpbmtBY3RpdmVPcHRpb25zIHx8IHsgZXhhY3Q6IGZhbHNlIH1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uSXRlbUNsaWNrKCRldmVudCwgaXRlbSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKGtleWRvd24uZW50ZXIpPVwib25JdGVtQ2xpY2soJGV2ZW50LCBpdGVtLCBpKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci50YXJnZXRdPVwiaXRlbS50YXJnZXRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIudGFiaW5kZXhdPVwiaXRlbS5kaXNhYmxlZCB8fCByZWFkb25seSB8fCAhdmlzaWJsZSA/IG51bGwgOiBpdGVtLnRhYmluZGV4ID8gaXRlbS50YWJpbmRleCA6ICcwJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBbZnJhZ21lbnRdPVwiaXRlbS5mcmFnbWVudFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbcXVlcnlQYXJhbXNIYW5kbGluZ109XCJpdGVtLnF1ZXJ5UGFyYW1zSGFuZGxpbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW3ByZXNlcnZlRnJhZ21lbnRdPVwiaXRlbS5wcmVzZXJ2ZUZyYWdtZW50XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtza2lwTG9jYXRpb25DaGFuZ2VdPVwiaXRlbS5za2lwTG9jYXRpb25DaGFuZ2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW3JlcGxhY2VVcmxdPVwiaXRlbS5yZXBsYWNlVXJsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtzdGF0ZV09XCJpdGVtLnN0YXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiaXRlbS5sYWJlbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ2FjdGlvbidcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtc3BlZWRkaWFsLWFjdGlvbi1pY29uXCIgKm5nSWY9XCJpdGVtLmljb25cIiBbbmdDbGFzc109XCJpdGVtLmljb25cIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNlbHNlQmxvY2s+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiX3Zpc2libGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmhyZWZdPVwiaXRlbS51cmwgfHwgbnVsbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLXNwZWVkZGlhbC1hY3Rpb25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGU9XCJtZW51aXRlbVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcFJpcHBsZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvbkl0ZW1DbGljaygkZXZlbnQsIGl0ZW0pXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7ICdwLWRpc2FibGVkJzogaXRlbS5kaXNhYmxlZCB9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoa2V5ZG93bi5lbnRlcik9XCJvbkl0ZW1DbGljaygkZXZlbnQsIGl0ZW0sIGkpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci50YXJnZXRdPVwiaXRlbS50YXJnZXRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInYWN0aW9uJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJpdGVtLmxhYmVsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci50YWJpbmRleF09XCJpdGVtLmRpc2FibGVkIHx8IChpICE9PSBhY3RpdmVJbmRleCAmJiByZWFkb25seSkgfHwgIXZpc2libGUgPyBudWxsIDogaXRlbS50YWJpbmRleCA/IGl0ZW0udGFiaW5kZXggOiAnMCdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1zcGVlZGRpYWwtYWN0aW9uLWljb25cIiAqbmdJZj1cIml0ZW0uaWNvblwiIFtuZ0NsYXNzXT1cIml0ZW0uaWNvblwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJtYXNrICYmIHZpc2libGVcIiBbbmdDbGFzc109XCJ7ICdwLXNwZWVkZGlhbC1tYXNrJzogdHJ1ZSwgJ3Atc3BlZWRkaWFsLW1hc2stdmlzaWJsZSc6IHZpc2libGUgfVwiIFtjbGFzc109XCJtYXNrQ2xhc3NOYW1lXCIgW25nU3R5bGVdPVwibWFza1N0eWxlXCI+PC9kaXY+XG4gICAgYCxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHN0eWxlVXJsczogWycuL3NwZWVkZGlhbC5jc3MnXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAncC1lbGVtZW50J1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgU3BlZWREaWFsIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcbiAgICAvKipcbiAgICAgKiBMaXN0IG9mIGl0ZW1zIGlkLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGlkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogTWVudU1vZGVsIGluc3RhbmNlIHRvIGRlZmluZSB0aGUgYWN0aW9uIGl0ZW1zLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIG1vZGVsOiBNZW51SXRlbVtdIHwgbnVsbCA9IG51bGw7XG4gICAgLyoqXG4gICAgICogU3BlY2lmaWVzIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSBvdmVybGF5LlxuICAgICAqIEBkZWZhdWx0VmFsdWUgZmFsc2VcbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgdmlzaWJsZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Zpc2libGU7XG4gICAgfVxuICAgIHNldCB2aXNpYmxlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3Zpc2libGUgPSB2YWx1ZTtcblxuICAgICAgICBpZiAodGhpcy5fdmlzaWJsZSkge1xuICAgICAgICAgICAgdGhpcy5iaW5kRG9jdW1lbnRDbGlja0xpc3RlbmVyKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnVuYmluZERvY3VtZW50Q2xpY2tMaXN0ZW5lcigpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIElubGluZSBzdHlsZSBvZiB0aGUgZWxlbWVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzdHlsZTogeyBba2xhc3M6IHN0cmluZ106IGFueSB9IHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBTdHlsZSBjbGFzcyBvZiB0aGUgZWxlbWVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBjbGFzc05hbWU6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBTcGVjaWZpZXMgdGhlIG9wZW5pbmcgZGlyZWN0aW9uIG9mIGFjdGlvbnMuXG4gICAgICogQGdydW9wIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZGlyZWN0aW9uOiAndXAnIHwgJ2Rvd24nIHwgJ2xlZnQnIHwgJ3JpZ2h0JyB8ICd1cC1sZWZ0JyB8ICd1cC1yaWdodCcgfCAnZG93bi1sZWZ0JyB8ICdkb3duLXJpZ2h0JyB8IHVuZGVmaW5lZCA9ICd1cCc7XG4gICAgLyoqXG4gICAgICogVHJhbnNpdGlvbiBkZWxheSBzdGVwIGZvciBlYWNoIGFjdGlvbiBpdGVtLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHRyYW5zaXRpb25EZWxheTogbnVtYmVyID0gMzA7XG4gICAgLyoqXG4gICAgICogU3BlY2lmaWVzIHRoZSBvcGVuaW5nIHR5cGUgb2YgYWN0aW9ucy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB0eXBlOiAnbGluZWFyJyB8ICdjaXJjbGUnIHwgJ3NlbWktY2lyY2xlJyB8ICdxdWFydGVyLWNpcmNsZScgfCB1bmRlZmluZWQgPSAnbGluZWFyJztcbiAgICAvKipcbiAgICAgKiBSYWRpdXMgZm9yICpjaXJjbGUgdHlwZXMuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgcmFkaXVzOiBudW1iZXIgPSAwO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gc2hvdyBhIG1hc2sgZWxlbWVudCBiZWhpbmQgdGhlIHNwZWVkZGlhbC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBtYXNrOiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgY29tcG9uZW50IGlzIGRpc2FibGVkLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgYWN0aW9ucyBjbG9zZSB3aGVuIGNsaWNrZWQgb3V0c2lkZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBoaWRlT25DbGlja091dHNpZGU6IGJvb2xlYW4gPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIElubGluZSBzdHlsZSBvZiB0aGUgYnV0dG9uIGVsZW1lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgYnV0dG9uU3R5bGU6IHsgW2tsYXNzOiBzdHJpbmddOiBhbnkgfSB8IG51bGwgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogU3R5bGUgY2xhc3Mgb2YgdGhlIGJ1dHRvbiBlbGVtZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGJ1dHRvbkNsYXNzTmFtZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIElubGluZSBzdHlsZSBvZiB0aGUgbWFzayBlbGVtZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIG1hc2tTdHlsZTogeyBba2xhc3M6IHN0cmluZ106IGFueSB9IHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBTdHlsZSBjbGFzcyBvZiB0aGUgbWFzayBlbGVtZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIG1hc2tDbGFzc05hbWU6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBTaG93IGljb24gb2YgdGhlIGJ1dHRvbiBlbGVtZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHNob3dJY29uOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogSGlkZSBpY29uIG9mIHRoZSBidXR0b24gZWxlbWVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBoaWRlSWNvbjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIERlZmluZWQgdG8gcm90YXRlIHNob3dJY29uIHdoZW4gaGlkZUljb24gaXMgbm90IHByZXNlbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgcm90YXRlQW5pbWF0aW9uOiBib29sZWFuID0gdHJ1ZTtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIGEgc3RyaW5nIHZhbHVlIHRoYXQgbGFiZWxzIGFuIGludGVyYWN0aXZlIGVsZW1lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgYXJpYUxhYmVsOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogSWRlbnRpZmllciBvZiB0aGUgdW5kZXJseWluZyBpbnB1dCBlbGVtZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGFyaWFMYWJlbGxlZEJ5OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogRmlyZWQgd2hlbiB0aGUgdmlzaWJpbGl0eSBvZiBlbGVtZW50IGNoYW5nZWQuXG4gICAgICogQHBhcmFtIHtib29sZWFufSBib29sZWFuIC0gVmlzaWJpbGl0eSB2YWx1ZS5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25WaXNpYmxlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gICAgLyoqXG4gICAgICogRmlyZWQgd2hlbiB0aGUgdmlzaWJpbGl0eSBvZiBlbGVtZW50IGNoYW5nZWQuXG4gICAgICogQHBhcmFtIHtib29sZWFufSBib29sZWFuIC0gVmlzaWJpbGl0eSB2YWx1ZS5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgdmlzaWJsZUNoYW5nZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICAgIC8qKlxuICAgICAqIEZpcmVkIHdoZW4gdGhlIGJ1dHRvbiBlbGVtZW50IGNsaWNrZWQuXG4gICAgICogQHBhcmFtIHtNb3VzZUV2ZW50fSBldmVudCAtIE1vdXNlIGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvbkNsaWNrOiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogRmlyZWQgd2hlbiB0aGUgYWN0aW9ucyBhcmUgdmlzaWJsZS5cbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIEJyb3dzZXIgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uU2hvdzogRXZlbnRFbWl0dGVyPEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogRmlyZWQgd2hlbiB0aGUgYWN0aW9ucyBhcmUgaGlkZGVuLlxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gQnJvd3NlciBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25IaWRlOiBFdmVudEVtaXR0ZXI8RXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudD4oKTtcblxuICAgIEBWaWV3Q2hpbGQoJ2NvbnRhaW5lcicpIGNvbnRhaW5lcjogRWxlbWVudFJlZiB8IHVuZGVmaW5lZDtcblxuICAgIEBWaWV3Q2hpbGQoJ2xpc3QnKSBsaXN0OiBFbGVtZW50UmVmIHwgdW5kZWZpbmVkO1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihQcmltZVRlbXBsYXRlKSB0ZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxQcmltZVRlbXBsYXRlPiB8IHVuZGVmaW5lZDtcblxuICAgIGJ1dHRvblRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xuXG4gICAgaXNJdGVtQ2xpY2tlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgX3Zpc2libGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGRvY3VtZW50Q2xpY2tMaXN0ZW5lcjogYW55O1xuXG4gICAgZm9jdXNlZE9wdGlvbkluZGV4ID0gc2lnbmFsPGFueT4obnVsbCk7XG5cbiAgICBmb2N1c2VkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBnZXQgZm9jdXNlZE9wdGlvbklkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mb2N1c2VkT3B0aW9uSW5kZXgoKSAhPT0gLTEgPyB0aGlzLmZvY3VzZWRPcHRpb25JbmRleCgpIDogbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IGFueSwgcHJpdmF0ZSBlbDogRWxlbWVudFJlZiwgcHVibGljIGNkOiBDaGFuZ2VEZXRlY3RvclJlZiwgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogRG9jdW1lbnQsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmlkID0gdGhpcy5pZCB8fCBVbmlxdWVDb21wb25lbnRJZCgpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnR5cGUgIT09ICdsaW5lYXInKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYnV0dG9uID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuY29udGFpbmVyPy5uYXRpdmVFbGVtZW50LCAnLnAtc3BlZWRkaWFsLWJ1dHRvbicpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpcnN0SXRlbSA9IERvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLmxpc3Q/Lm5hdGl2ZUVsZW1lbnQsICcucC1zcGVlZGRpYWwtaXRlbScpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGJ1dHRvbiAmJiBmaXJzdEl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgd0RpZmYgPSBNYXRoLmFicyhidXR0b24ub2Zmc2V0V2lkdGggLSBmaXJzdEl0ZW0ub2Zmc2V0V2lkdGgpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBoRGlmZiA9IE1hdGguYWJzKGJ1dHRvbi5vZmZzZXRIZWlnaHQgLSBmaXJzdEl0ZW0ub2Zmc2V0SGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0Py5uYXRpdmVFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLWl0ZW0tZGlmZi14JywgYCR7d0RpZmYgLyAyfXB4YCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdD8ubmF0aXZlRWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1pdGVtLWRpZmYteScsIGAke2hEaWZmIC8gMn1weGApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZXM/LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoaXRlbS5nZXRUeXBlKCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdidXR0b24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNob3coKSB7XG4gICAgICAgIHRoaXMub25WaXNpYmxlQ2hhbmdlLmVtaXQodHJ1ZSk7XG4gICAgICAgIHRoaXMudmlzaWJsZUNoYW5nZS5lbWl0KHRydWUpO1xuICAgICAgICB0aGlzLl92aXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5vblNob3cuZW1pdCgpO1xuICAgICAgICB0aGlzLmJpbmREb2N1bWVudENsaWNrTGlzdGVuZXIoKTtcbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBoaWRlKCkge1xuICAgICAgICB0aGlzLm9uVmlzaWJsZUNoYW5nZS5lbWl0KGZhbHNlKTtcbiAgICAgICAgdGhpcy52aXNpYmxlQ2hhbmdlLmVtaXQoZmFsc2UpO1xuICAgICAgICB0aGlzLl92aXNpYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMub25IaWRlLmVtaXQoKTtcbiAgICAgICAgdGhpcy51bmJpbmREb2N1bWVudENsaWNrTGlzdGVuZXIoKTtcbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBvbkJ1dHRvbkNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIHRoaXMudmlzaWJsZSA/IHRoaXMuaGlkZSgpIDogdGhpcy5zaG93KCk7XG4gICAgICAgIHRoaXMub25DbGljay5lbWl0KGV2ZW50KTtcbiAgICAgICAgdGhpcy5pc0l0ZW1DbGlja2VkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBvbkl0ZW1DbGljayhlOiBNb3VzZUV2ZW50LCBpdGVtOiBNZW51SXRlbSkge1xuICAgICAgICBpZiAoaXRlbS5jb21tYW5kKSB7XG4gICAgICAgICAgICBpdGVtLmNvbW1hbmQoeyBvcmlnaW5hbEV2ZW50OiBlLCBpdGVtIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5oaWRlKCk7XG5cbiAgICAgICAgdGhpcy5pc0l0ZW1DbGlja2VkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBvbktleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC5jb2RlKSB7XG4gICAgICAgICAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgICAgICAgICAgIHRoaXMub25BcnJvd0Rvd24oZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uQXJyb3dVcChldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0Fycm93TGVmdCc6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkFycm93TGVmdChldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOlxuICAgICAgICAgICAgICAgIHRoaXMub25BcnJvd1JpZ2h0KGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICAgICAgY2FzZSAnU3BhY2UnOlxuICAgICAgICAgICAgICAgIHRoaXMub25FbnRlcktleShldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0VzY2FwZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkVzY2FwZUtleShldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0hvbWUnOlxuICAgICAgICAgICAgICAgIHRoaXMub25Ib21lS2V5KGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnRW5kJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uRW5kS2V5KGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRm9jdXMoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5mb2N1c2VkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBvbkJsdXIoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5mb2N1c2VkID0gZmFsc2U7XG4gICAgICAgIGFzYXBTY2hlZHVsZXIuc2NoZWR1bGUoKCkgPT4gdGhpcy5mb2N1c2VkT3B0aW9uSW5kZXguc2V0KC0xKSk7XG4gICAgfVxuXG4gICAgb25BcnJvd1VwKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gJ3VwJykge1xuICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZU5leHRJdGVtKGV2ZW50KTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gJ2Rvd24nKSB7XG4gICAgICAgICAgICB0aGlzLm5hdmlnYXRlUHJldkl0ZW0oZXZlbnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZU5leHRJdGVtKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQXJyb3dEb3duKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gJ3VwJykge1xuICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZVByZXZJdGVtKGV2ZW50KTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gJ2Rvd24nKSB7XG4gICAgICAgICAgICB0aGlzLm5hdmlnYXRlTmV4dEl0ZW0oZXZlbnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZVByZXZJdGVtKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQXJyb3dMZWZ0KGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGxlZnRWYWxpZERpcmVjdGlvbnMgPSBbJ2xlZnQnLCAndXAtcmlnaHQnLCAnZG93bi1sZWZ0J107XG4gICAgICAgIGNvbnN0IHJpZ2h0VmFsaWREaXJlY3Rpb25zID0gWydyaWdodCcsICd1cC1sZWZ0JywgJ2Rvd24tcmlnaHQnXTtcblxuICAgICAgICBpZiAobGVmdFZhbGlkRGlyZWN0aW9ucy5pbmNsdWRlcyh0aGlzLmRpcmVjdGlvbikpIHtcbiAgICAgICAgICAgIHRoaXMubmF2aWdhdGVOZXh0SXRlbShldmVudCk7XG4gICAgICAgIH0gZWxzZSBpZiAocmlnaHRWYWxpZERpcmVjdGlvbnMuaW5jbHVkZXModGhpcy5kaXJlY3Rpb24pKSB7XG4gICAgICAgICAgICB0aGlzLm5hdmlnYXRlUHJldkl0ZW0oZXZlbnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZVByZXZJdGVtKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQXJyb3dSaWdodChldmVudCkge1xuICAgICAgICBjb25zdCBsZWZ0VmFsaWREaXJlY3Rpb25zID0gWydsZWZ0JywgJ3VwLXJpZ2h0JywgJ2Rvd24tbGVmdCddO1xuICAgICAgICBjb25zdCByaWdodFZhbGlkRGlyZWN0aW9ucyA9IFsncmlnaHQnLCAndXAtbGVmdCcsICdkb3duLXJpZ2h0J107XG5cbiAgICAgICAgaWYgKGxlZnRWYWxpZERpcmVjdGlvbnMuaW5jbHVkZXModGhpcy5kaXJlY3Rpb24pKSB7XG4gICAgICAgICAgICB0aGlzLm5hdmlnYXRlUHJldkl0ZW0oZXZlbnQpO1xuICAgICAgICB9IGVsc2UgaWYgKHJpZ2h0VmFsaWREaXJlY3Rpb25zLmluY2x1ZGVzKHRoaXMuZGlyZWN0aW9uKSkge1xuICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZU5leHRJdGVtKGV2ZW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubmF2aWdhdGVOZXh0SXRlbShldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkVuZEtleShldmVudDogYW55KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgdGhpcy5mb2N1c2VkT3B0aW9uSW5kZXguc2V0KC0xKTtcbiAgICAgICAgdGhpcy5uYXZpZ2F0ZVByZXZJdGVtKGV2ZW50KTtcbiAgICB9XG5cbiAgICBvbkhvbWVLZXkoZXZlbnQ6IGFueSkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIHRoaXMuZm9jdXNlZE9wdGlvbkluZGV4LnNldCgtMSk7XG4gICAgICAgIHRoaXMubmF2aWdhdGVOZXh0SXRlbShldmVudCk7XG4gICAgfVxuXG4gICAgb25FbnRlcktleShldmVudDogYW55KSB7XG4gICAgICAgIGNvbnN0IGl0ZW1zID0gRG9tSGFuZGxlci5maW5kKHRoaXMuY29udGFpbmVyLm5hdGl2ZUVsZW1lbnQsICdbZGF0YS1wYy1zZWN0aW9uPVwibWVudWl0ZW1cIl0nKTtcbiAgICAgICAgY29uc3QgaXRlbUluZGV4ID0gWy4uLml0ZW1zXS5maW5kSW5kZXgoKGl0ZW0pID0+IGl0ZW0uaWQgPT09IHRoaXMuZm9jdXNlZE9wdGlvbkluZGV4KTtcblxuICAgICAgICB0aGlzLm9uSXRlbUNsaWNrKGV2ZW50LCB0aGlzLm1vZGVsW2l0ZW1JbmRleF0pO1xuICAgICAgICB0aGlzLm9uQmx1cihldmVudCk7XG5cbiAgICAgICAgY29uc3QgYnV0dG9uRWwgPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUodGhpcy5jb250YWluZXIubmF0aXZlRWxlbWVudCwgJ2J1dHRvbicpO1xuXG4gICAgICAgIGJ1dHRvbkVsICYmIERvbUhhbmRsZXIuZm9jdXMoYnV0dG9uRWwpO1xuICAgIH1cblxuICAgIG9uRXNjYXBlS2V5KGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIHRoaXMuaGlkZSgpO1xuXG4gICAgICAgIGNvbnN0IGJ1dHRvbkVsID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuY29udGFpbmVyLm5hdGl2ZUVsZW1lbnQsICdidXR0b24nKTtcblxuICAgICAgICBidXR0b25FbCAmJiBEb21IYW5kbGVyLmZvY3VzKGJ1dHRvbkVsKTtcbiAgICB9XG5cbiAgICBvblRvZ2dsZXJLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQuY29kZSkge1xuICAgICAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICAgIGNhc2UgJ0Fycm93TGVmdCc6XG4gICAgICAgICAgICAgICAgdGhpcy5vblRvZ2dsZXJBcnJvd0Rvd24oZXZlbnQpO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICAgICAgY2FzZSAnQXJyb3dSaWdodCc6XG4gICAgICAgICAgICAgICAgdGhpcy5vblRvZ2dsZXJBcnJvd1VwKGV2ZW50KTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdFc2NhcGUnOlxuICAgICAgICAgICAgICAgIHRoaXMub25Fc2NhcGVLZXkoZXZlbnQpO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblRvZ2dsZXJBcnJvd1VwKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZm9jdXNlZCA9IHRydWU7XG4gICAgICAgIERvbUhhbmRsZXIuZm9jdXModGhpcy5saXN0Lm5hdGl2ZUVsZW1lbnQpO1xuXG4gICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICB0aGlzLm5hdmlnYXRlUHJldkl0ZW0oZXZlbnQpO1xuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgb25Ub2dnbGVyQXJyb3dEb3duKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZm9jdXNlZCA9IHRydWU7XG4gICAgICAgIERvbUhhbmRsZXIuZm9jdXModGhpcy5saXN0Lm5hdGl2ZUVsZW1lbnQpO1xuXG4gICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICB0aGlzLm5hdmlnYXRlTmV4dEl0ZW0oZXZlbnQpO1xuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgbmF2aWdhdGVOZXh0SXRlbShldmVudCkge1xuICAgICAgICBjb25zdCBvcHRpb25JbmRleCA9IHRoaXMuZmluZE5leHRPcHRpb25JbmRleCh0aGlzLmZvY3VzZWRPcHRpb25JbmRleCgpKTtcblxuICAgICAgICB0aGlzLmNoYW5nZUZvY3VzZWRPcHRpb25JbmRleChvcHRpb25JbmRleCk7XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBuYXZpZ2F0ZVByZXZJdGVtKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbkluZGV4ID0gdGhpcy5maW5kUHJldk9wdGlvbkluZGV4KHRoaXMuZm9jdXNlZE9wdGlvbkluZGV4KCkpO1xuXG4gICAgICAgIHRoaXMuY2hhbmdlRm9jdXNlZE9wdGlvbkluZGV4KG9wdGlvbkluZGV4KTtcblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIGZpbmRQcmV2T3B0aW9uSW5kZXgoaW5kZXgpIHtcbiAgICAgICAgY29uc3QgaXRlbXMgPSBEb21IYW5kbGVyLmZpbmQodGhpcy5jb250YWluZXIubmF0aXZlRWxlbWVudCwgJ1tkYXRhLXBjLXNlY3Rpb249XCJtZW51aXRlbVwiXScpO1xuXG4gICAgICAgIGNvbnN0IGZpbHRlcmVkSXRlbXMgPSBbLi4uaXRlbXNdLmZpbHRlcigoaXRlbSkgPT4gIURvbUhhbmRsZXIuaGFzQ2xhc3MoRG9tSGFuZGxlci5maW5kU2luZ2xlKGl0ZW0sICdhJyksICdwLWRpc2FibGVkJykpO1xuICAgICAgICBjb25zdCBuZXdJbmRleCA9IGluZGV4ID09PSAtMSA/IGZpbHRlcmVkSXRlbXNbZmlsdGVyZWRJdGVtcy5sZW5ndGggLSAxXS5pZCA6IGluZGV4O1xuICAgICAgICBsZXQgbWF0Y2hlZE9wdGlvbkluZGV4ID0gZmlsdGVyZWRJdGVtcy5maW5kSW5kZXgoKGxpbmspID0+IGxpbmsuZ2V0QXR0cmlidXRlKCdpZCcpID09PSBuZXdJbmRleCk7XG5cbiAgICAgICAgbWF0Y2hlZE9wdGlvbkluZGV4ID0gaW5kZXggPT09IC0xID8gZmlsdGVyZWRJdGVtcy5sZW5ndGggLSAxIDogbWF0Y2hlZE9wdGlvbkluZGV4IC0gMTtcblxuICAgICAgICByZXR1cm4gbWF0Y2hlZE9wdGlvbkluZGV4O1xuICAgIH1cblxuICAgIGZpbmROZXh0T3B0aW9uSW5kZXgoaW5kZXgpIHtcbiAgICAgICAgY29uc3QgaXRlbXMgPSBEb21IYW5kbGVyLmZpbmQodGhpcy5jb250YWluZXIubmF0aXZlRWxlbWVudCwgJ1tkYXRhLXBjLXNlY3Rpb249XCJtZW51aXRlbVwiXScpO1xuICAgICAgICBjb25zdCBmaWx0ZXJlZEl0ZW1zID0gWy4uLml0ZW1zXS5maWx0ZXIoKGl0ZW0pID0+ICFEb21IYW5kbGVyLmhhc0NsYXNzKERvbUhhbmRsZXIuZmluZFNpbmdsZShpdGVtLCAnYScpLCAncC1kaXNhYmxlZCcpKTtcbiAgICAgICAgY29uc3QgbmV3SW5kZXggPSBpbmRleCA9PT0gLTEgPyBmaWx0ZXJlZEl0ZW1zWzBdLmlkIDogaW5kZXg7XG4gICAgICAgIGxldCBtYXRjaGVkT3B0aW9uSW5kZXggPSBmaWx0ZXJlZEl0ZW1zLmZpbmRJbmRleCgobGluaykgPT4gbGluay5nZXRBdHRyaWJ1dGUoJ2lkJykgPT09IG5ld0luZGV4KTtcblxuICAgICAgICBtYXRjaGVkT3B0aW9uSW5kZXggPSBpbmRleCA9PT0gLTEgPyAwIDogbWF0Y2hlZE9wdGlvbkluZGV4ICsgMTtcblxuICAgICAgICByZXR1cm4gbWF0Y2hlZE9wdGlvbkluZGV4O1xuICAgIH1cblxuICAgIGNoYW5nZUZvY3VzZWRPcHRpb25JbmRleChpbmRleCkge1xuICAgICAgICBjb25zdCBpdGVtcyA9IERvbUhhbmRsZXIuZmluZCh0aGlzLmNvbnRhaW5lci5uYXRpdmVFbGVtZW50LCAnW2RhdGEtcGMtc2VjdGlvbj1cIm1lbnVpdGVtXCJdJyk7XG4gICAgICAgIGNvbnN0IGZpbHRlcmVkSXRlbXMgPSBbLi4uaXRlbXNdLmZpbHRlcigoaXRlbSkgPT4gIURvbUhhbmRsZXIuaGFzQ2xhc3MoRG9tSGFuZGxlci5maW5kU2luZ2xlKGl0ZW0sICdhJyksICdwLWRpc2FibGVkJykpO1xuXG4gICAgICAgIGlmIChmaWx0ZXJlZEl0ZW1zW2luZGV4XSkge1xuICAgICAgICAgICAgdGhpcy5mb2N1c2VkT3B0aW9uSW5kZXguc2V0KGZpbHRlcmVkSXRlbXNbaW5kZXhdLmdldEF0dHJpYnV0ZSgnaWQnKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjYWxjdWxhdGVQb2ludFN0eWxlKGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgdHlwZSA9IHRoaXMudHlwZTtcblxuICAgICAgICBpZiAodHlwZSAhPT0gJ2xpbmVhcicpIHtcbiAgICAgICAgICAgIGNvbnN0IGxlbmd0aCA9ICh0aGlzLm1vZGVsIGFzIE1lbnVJdGVtW10pLmxlbmd0aDtcbiAgICAgICAgICAgIGNvbnN0IHJhZGl1cyA9IHRoaXMucmFkaXVzIHx8IGxlbmd0aCAqIDIwO1xuXG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gJ2NpcmNsZScpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzdGVwID0gKDIgKiBNYXRoLlBJKSAvIGxlbmd0aDtcblxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IGBjYWxjKCR7cmFkaXVzICogTWF0aC5jb3Moc3RlcCAqIGluZGV4KX1weCArIHZhcigtLWl0ZW0tZGlmZi14LCAwcHgpKWAsXG4gICAgICAgICAgICAgICAgICAgIHRvcDogYGNhbGMoJHtyYWRpdXMgKiBNYXRoLnNpbihzdGVwICogaW5kZXgpfXB4ICsgdmFyKC0taXRlbS1kaWZmLXksIDBweCkpYFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdzZW1pLWNpcmNsZScpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSB0aGlzLmRpcmVjdGlvbjtcbiAgICAgICAgICAgICAgICBjb25zdCBzdGVwID0gTWF0aC5QSSAvIChsZW5ndGggLSAxKTtcbiAgICAgICAgICAgICAgICBjb25zdCB4ID0gYGNhbGMoJHtyYWRpdXMgKiBNYXRoLmNvcyhzdGVwICogaW5kZXgpfXB4ICsgdmFyKC0taXRlbS1kaWZmLXgsIDBweCkpYDtcbiAgICAgICAgICAgICAgICBjb25zdCB5ID0gYGNhbGMoJHtyYWRpdXMgKiBNYXRoLnNpbihzdGVwICogaW5kZXgpfXB4ICsgdmFyKC0taXRlbS1kaWZmLXksIDBweCkpYDtcbiAgICAgICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAndXAnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGxlZnQ6IHgsIGJvdHRvbTogeSB9O1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSAnZG93bicpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgbGVmdDogeCwgdG9wOiB5IH07XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09ICdsZWZ0Jykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyByaWdodDogeSwgdG9wOiB4IH07XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09ICdyaWdodCcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgbGVmdDogeSwgdG9wOiB4IH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAncXVhcnRlci1jaXJjbGUnKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGlyZWN0aW9uID0gdGhpcy5kaXJlY3Rpb247XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RlcCA9IE1hdGguUEkgLyAoMiAqIChsZW5ndGggLSAxKSk7XG4gICAgICAgICAgICAgICAgY29uc3QgeCA9IGBjYWxjKCR7cmFkaXVzICogTWF0aC5jb3Moc3RlcCAqIGluZGV4KX1weCArIHZhcigtLWl0ZW0tZGlmZi14LCAwcHgpKWA7XG4gICAgICAgICAgICAgICAgY29uc3QgeSA9IGBjYWxjKCR7cmFkaXVzICogTWF0aC5zaW4oc3RlcCAqIGluZGV4KX1weCArIHZhcigtLWl0ZW0tZGlmZi15LCAwcHgpKWA7XG4gICAgICAgICAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJ3VwLWxlZnQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IHJpZ2h0OiB4LCBib3R0b206IHkgfTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gJ3VwLXJpZ2h0Jykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBsZWZ0OiB4LCBib3R0b206IHkgfTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gJ2Rvd24tbGVmdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgcmlnaHQ6IHksIHRvcDogeCB9O1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSAnZG93bi1yaWdodCcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgbGVmdDogeSwgdG9wOiB4IH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHt9O1xuICAgIH1cblxuICAgIGNhbGN1bGF0ZVRyYW5zaXRpb25EZWxheShpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGxlbmd0aCA9ICh0aGlzLm1vZGVsIGFzIE1lbnVJdGVtW10pLmxlbmd0aDtcblxuICAgICAgICByZXR1cm4gKHRoaXMudmlzaWJsZSA/IGluZGV4IDogbGVuZ3RoIC0gaW5kZXggLSAxKSAqIHRoaXMudHJhbnNpdGlvbkRlbGF5O1xuICAgIH1cblxuICAgIGNvbnRhaW5lckNsYXNzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgWydwLXNwZWVkZGlhbCBwLWNvbXBvbmVudCcgKyBgIHAtc3BlZWRkaWFsLSR7dGhpcy50eXBlfWBdOiB0cnVlLFxuICAgICAgICAgICAgW2BwLXNwZWVkZGlhbC1kaXJlY3Rpb24tJHt0aGlzLmRpcmVjdGlvbn1gXTogdGhpcy50eXBlICE9PSAnY2lyY2xlJyxcbiAgICAgICAgICAgICdwLXNwZWVkZGlhbC1vcGVuZWQnOiB0aGlzLnZpc2libGUsXG4gICAgICAgICAgICAncC1kaXNhYmxlZCc6IHRoaXMuZGlzYWJsZWRcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBidXR0b25DbGFzcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICdwLXNwZWVkZGlhbC1idXR0b24gcC1idXR0b24tcm91bmRlZCc6IHRydWUsXG4gICAgICAgICAgICAncC1zcGVlZGRpYWwtcm90YXRlJzogdGhpcy5yb3RhdGVBbmltYXRpb24gJiYgIXRoaXMuaGlkZUljb24sXG4gICAgICAgICAgICBbdGhpcy5idXR0b25DbGFzc05hbWUhXTogdHJ1ZVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGdldCBidXR0b25JY29uQ2xhc3MoKSB7XG4gICAgICAgIHJldHVybiAoIXRoaXMudmlzaWJsZSAmJiB0aGlzLnNob3dJY29uKSB8fCAhdGhpcy5oaWRlSWNvbiA/IHRoaXMuc2hvd0ljb24gOiB0aGlzLmhpZGVJY29uO1xuICAgIH1cblxuICAgIGdldEl0ZW1TdHlsZShpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IHRyYW5zaXRpb25EZWxheSA9IHRoaXMuY2FsY3VsYXRlVHJhbnNpdGlvbkRlbGF5KGluZGV4KTtcbiAgICAgICAgY29uc3QgcG9pbnRTdHlsZSA9IHRoaXMuY2FsY3VsYXRlUG9pbnRTdHlsZShpbmRleCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0cmFuc2l0aW9uRGVsYXk6IGAke3RyYW5zaXRpb25EZWxheX1tc2AsXG4gICAgICAgICAgICAuLi5wb2ludFN0eWxlXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgaXNDbGlja2FibGVSb3V0ZXJMaW5rKGl0ZW06IE1lbnVJdGVtKSB7XG4gICAgICAgIHJldHVybiBpdGVtLnJvdXRlckxpbmsgJiYgIXRoaXMuZGlzYWJsZWQgJiYgIWl0ZW0uZGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgaXNPdXRzaWRlQ2xpY2tlZChldmVudDogRXZlbnQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGFpbmVyICYmICEodGhpcy5jb250YWluZXIubmF0aXZlRWxlbWVudC5pc1NhbWVOb2RlKGV2ZW50LnRhcmdldCkgfHwgdGhpcy5jb250YWluZXIubmF0aXZlRWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQpIHx8IHRoaXMuaXNJdGVtQ2xpY2tlZCk7XG4gICAgfVxuXG4gICAgYmluZERvY3VtZW50Q2xpY2tMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIgJiYgdGhpcy5oaWRlT25DbGlja091dHNpZGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMuZG9jdW1lbnQsICdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy52aXNpYmxlICYmIHRoaXMuaXNPdXRzaWRlQ2xpY2tlZChldmVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0l0ZW1DbGlja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1bmJpbmREb2N1bWVudENsaWNrTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnVuYmluZERvY3VtZW50Q2xpY2tMaXN0ZW5lcigpO1xuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBCdXR0b25Nb2R1bGUsIFJpcHBsZU1vZHVsZSwgVG9vbHRpcE1vZHVsZSwgUm91dGVyTW9kdWxlLCBQbHVzSWNvbl0sXG4gICAgZXhwb3J0czogW1NwZWVkRGlhbCwgU2hhcmVkTW9kdWxlLCBCdXR0b25Nb2R1bGUsIFRvb2x0aXBNb2R1bGUsIFJvdXRlck1vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbU3BlZWREaWFsXVxufSlcbmV4cG9ydCBjbGFzcyBTcGVlZERpYWxNb2R1bGUge31cbiJdfQ==