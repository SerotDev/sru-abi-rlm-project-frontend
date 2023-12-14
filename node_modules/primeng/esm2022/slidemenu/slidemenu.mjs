import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Inject, Input, NgModule, Output, PLATFORM_ID, ViewChild, ViewEncapsulation, effect, forwardRef, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { AngleRightIcon } from 'primeng/icons/angleright';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { ObjectUtils, UniqueComponentId, ZIndexUtils } from 'primeng/utils';
import { CaretLeftIcon } from 'primeng/icons/caretleft';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/router";
import * as i3 from "primeng/ripple";
import * as i4 from "primeng/tooltip";
import * as i5 from "primeng/api";
export class SlideMenuSub {
    document;
    el;
    renderer;
    cd;
    slideMenu;
    items;
    menuWidth;
    root = false;
    easing = 'ease-out';
    effectDuration;
    autoDisplay;
    autoZIndex = true;
    baseZIndex = 0;
    popup;
    menuId;
    ariaLabel;
    ariaLabelledBy;
    level = 0;
    focusedItemId;
    activeItemPath;
    tabindex = 0;
    itemClick = new EventEmitter();
    itemMouseEnter = new EventEmitter();
    menuFocus = new EventEmitter();
    menuBlur = new EventEmitter();
    menuKeydown = new EventEmitter();
    sublistViewChild;
    get isActive() {
        return -this.slideMenu.left == this.level * this.menuWidth;
    }
    constructor(document, el, renderer, cd, slideMenu) {
        this.document = document;
        this.el = el;
        this.renderer = renderer;
        this.cd = cd;
        this.slideMenu = slideMenu;
    }
    getItemProp(processedItem, name, params = null) {
        return processedItem && processedItem.item ? ObjectUtils.getItemValue(processedItem.item[name], params) : undefined;
    }
    getItemId(processedItem) {
        return processedItem.item && processedItem.item?.id ? processedItem.item.id : `${this.menuId}_${processedItem.key}`;
    }
    getItemKey(processedItem) {
        return this.getItemId(processedItem);
    }
    getItemClass(processedItem) {
        return {
            ...this.getItemProp(processedItem, 'class'),
            'p-menuitem': true,
            'p-menuitem-active': this.isItemActive(processedItem),
            'p-focus': this.isItemFocused(processedItem),
            'p-disabled': this.isItemDisabled(processedItem)
        };
    }
    getItemLabel(processedItem) {
        return this.getItemProp(processedItem, 'label');
    }
    getSeparatorItemClass(processedItem) {
        return {
            ...this.getItemProp(processedItem, 'class'),
            'p-menuitem-separator': true
        };
    }
    getAriaSetSize() {
        return this.items.filter((processedItem) => this.isItemVisible(processedItem) && !this.getItemProp(processedItem, 'separator')).length;
    }
    getAriaPosInset(index) {
        return index - this.items.slice(0, index).filter((processedItem) => this.isItemVisible(processedItem) && this.getItemProp(processedItem, 'separator')).length + 1;
    }
    isItemVisible(processedItem) {
        return this.getItemProp(processedItem, 'visible') !== false;
    }
    isItemActive(processedItem) {
        if (this.activeItemPath) {
            return this.activeItemPath.some((path) => path.key === processedItem.key);
        }
    }
    isItemDisabled(processedItem) {
        return this.getItemProp(processedItem, 'disabled');
    }
    isItemFocused(processedItem) {
        return this.focusedItemId === this.getItemId(processedItem);
    }
    isItemGroup(processedItem) {
        return ObjectUtils.isNotEmpty(processedItem.items);
    }
    onItemClick(event, processedItem) {
        this.getItemProp(processedItem, 'command', { originalEvent: event, item: processedItem.item });
        this.itemClick.emit({ originalEvent: event, processedItem, isFocus: true });
        event.preventDefault();
    }
    onMenuKeyDown(event) {
        this.menuKeydown.emit(event);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: SlideMenuSub, deps: [{ token: DOCUMENT }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }, { token: forwardRef(() => SlideMenu) }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.5", type: SlideMenuSub, selector: "p-slideMenuSub", inputs: { items: "items", menuWidth: "menuWidth", root: "root", easing: "easing", effectDuration: "effectDuration", autoDisplay: "autoDisplay", autoZIndex: "autoZIndex", baseZIndex: "baseZIndex", popup: "popup", menuId: "menuId", ariaLabel: "ariaLabel", ariaLabelledBy: "ariaLabelledBy", level: "level", focusedItemId: "focusedItemId", activeItemPath: "activeItemPath", tabindex: "tabindex" }, outputs: { itemClick: "itemClick", itemMouseEnter: "itemMouseEnter", menuFocus: "menuFocus", menuBlur: "menuBlur", menuKeydown: "menuKeydown" }, host: { classAttribute: "p-element" }, viewQueries: [{ propertyName: "sublistViewChild", first: true, predicate: ["sublist"], descendants: true, static: true }], ngImport: i0, template: `
        <ul
            #sublist
            role="menu"
            [ngClass]="{ 'p-submenu-list': !root, 'p-slidemenu-root-list': root, 'p-active-submenu': isActive }"
            [id]="menuId + '_list'"
            [style.width.px]="menuWidth"
            [style.left.px]="root ? slideMenu.left : slideMenu.menuWidth"
            [style.transitionProperty]="root ? 'left' : 'none'"
            [style.transitionDuration]="effectDuration + 'ms'"
            [style.transitionTimingFunction]="easing"
            [tabindex]="tabindex"
            [attr.aria-label]="ariaLabel"
            [attr.aria-labelledBy]="ariaLabelledBy"
            [attr.aria-aria-activedescendant]="focusedItemId"
            [attr.aria-orientation]="'vertical'"
            [attr.data-pc-section]="'menu'"
            (keydown)="menuKeydown.emit($event)"
            (focusin)="menuFocus.emit($event)"
            [attr.data-pc-state]="isActive ? 'active' : 'inactive'"
        >
            <ng-template ngFor let-processedItem [ngForOf]="items" let-index="index">
                <li
                    *ngIf="isItemVisible(processedItem) && getItemProp(processedItem, 'separator')"
                    [id]="getItemId(processedItem)"
                    [style]="getItemProp(processedItem, 'style')"
                    [ngClass]="getSeparatorItemClass(processedItem)"
                    role="separator"
                    [attr.data-pc-section]="'separator'"
                ></li>
                <li
                    #listItem
                    *ngIf="isItemVisible(processedItem) && !getItemProp(processedItem, 'separator')"
                    role="menuitem"
                    [id]="getItemId(processedItem)"
                    [attr.data-pc-section]="'menuitem'"
                    [attr.data-p-highlight]="isItemActive(processedItem)"
                    [attr.data-p-focused]="isItemFocused(processedItem)"
                    [attr.data-p-disabled]="isItemDisabled(processedItem)"
                    [attr.aria-label]="getItemLabel(processedItem)"
                    [attr.aria-disabled]="isItemDisabled(processedItem) || undefined"
                    [attr.aria-haspopup]="isItemGroup(processedItem) && !getItemProp(processedItem, 'to') ? 'menu' : undefined"
                    [attr.aria-expanded]="isItemGroup(processedItem) ? isItemActive(processedItem) : undefined"
                    [attr.aria-level]="level + 1"
                    [attr.aria-setsize]="getAriaSetSize()"
                    [attr.aria-posinset]="getAriaPosInset(index)"
                    [ngStyle]="getItemProp(processedItem, 'style')"
                    [ngClass]="getItemClass(processedItem)"
                    [class]="getItemProp(processedItem, 'styleClass')"
                    pTooltip
                    [tooltipOptions]="getItemProp(processedItem, 'tooltipOptions')"
                >
                    <div [attr.data-pc-section]="'content'" class="p-menuitem-content" (click)="onItemClick($event, processedItem)" (mouseenter)="itemMouseEnter.emit({ originalEvent: $event, processedItem })">
                        <a
                            *ngIf="!getItemProp(processedItem, 'routerLink')"
                            [attr.href]="getItemProp(processedItem, 'url')"
                            [attr.aria-hidden]="true"
                            [attr.data-automationid]="getItemProp(processedItem, 'automationId')"
                            [attr.data-pc-section]="'action'"
                            [target]="getItemProp(processedItem, 'target')"
                            [ngClass]="{ 'p-menuitem-link': true, 'p-disabled': getItemProp(processedItem, 'disabled') }"
                            [attr.tabindex]="-1"
                            pRipple
                        >
                            <span
                                *ngIf="getItemProp(processedItem, 'icon')"
                                class="p-menuitem-icon"
                                [ngClass]="getItemProp(processedItem, 'icon')"
                                [ngStyle]="getItemProp(processedItem, 'iconStyle')"
                                [attr.data-pc-section]="'icon'"
                                [attr.aria-hidden]="true"
                                [attr.tabindex]="-1"
                            >
                            </span>
                            <span *ngIf="getItemProp(processedItem, 'escape'); else htmlLabel" class="p-menuitem-text" [attr.data-pc-section]="'label'">
                                {{ getItemLabel(processedItem) }}
                            </span>
                            <ng-template #htmlLabel>
                                <span class="p-menuitem-text" [innerHTML]="getItemLabel(processedItem)" [attr.data-pc-section]="'label'"></span>
                            </ng-template>
                            <span class="p-menuitem-badge" *ngIf="getItemProp(processedItem, 'badge')" [ngClass]="getItemProp(processedItem, 'badgeStyleClass')">{{ getItemProp(processedItem, 'badge') }}</span>

                            <ng-container *ngIf="isItemGroup(processedItem)">
                                <AngleRightIcon *ngIf="!slideMenu.submenuIconTemplate" [styleClass]="'p-submenu-icon'" [attr.data-pc-section]="'submenuicon'" [attr.aria-hidden]="true" />
                                <ng-template *ngTemplateOutlet="slideMenu.submenuIconTemplate" [attr.data-pc-section]="'submenuicon'" [attr.aria-hidden]="true"></ng-template>
                            </ng-container>
                        </a>
                        <a
                            *ngIf="getItemProp(processedItem, 'routerLink')"
                            [routerLink]="getItemProp(processedItem, 'routerLink')"
                            [attr.data-automationid]="getItemProp(processedItem, 'automationId')"
                            [attr.tabindex]="-1"
                            [attr.aria-hidden]="true"
                            [attr.data-pc-section]="'action'"
                            [queryParams]="getItemProp(processedItem, 'queryParams')"
                            [routerLinkActive]="'p-menuitem-link-active'"
                            [routerLinkActiveOptions]="getItemProp(processedItem, 'routerLinkActiveOptions') || { exact: false }"
                            [target]="getItemProp(processedItem, 'target')"
                            [ngClass]="{ 'p-menuitem-link': true, 'p-disabled': getItemProp(processedItem, 'disabled') }"
                            [fragment]="getItemProp(processedItem, 'fragment')"
                            [queryParamsHandling]="getItemProp(processedItem, 'queryParamsHandling')"
                            [preserveFragment]="getItemProp(processedItem, 'preserveFragment')"
                            [skipLocationChange]="getItemProp(processedItem, 'skipLocationChange')"
                            [replaceUrl]="getItemProp(processedItem, 'replaceUrl')"
                            [state]="getItemProp(processedItem, 'state')"
                            pRipple
                        >
                            <span
                                *ngIf="getItemProp(processedItem, 'icon')"
                                class="p-menuitem-icon"
                                [ngClass]="getItemProp(processedItem, 'icon')"
                                [ngStyle]="getItemProp(processedItem, 'iconStyle')"
                                [attr.data-pc-section]="'icon'"
                                [attr.aria-hidden]="true"
                                [attr.tabindex]="-1"
                            >
                            </span>
                            <span *ngIf="getItemProp(processedItem, 'escape'); else htmlLabel" class="p-menuitem-text" [attr.data-pc-section]="'label'">
                                {{ getItemLabel(processedItem) }}
                            </span>
                            <ng-template #htmlLabel>
                                <span class="p-menuitem-text" [innerHTML]="getItemLabel(processedItem)" [attr.data-pc-section]="'label'"></span>
                            </ng-template>
                            <span class="p-menuitem-badge" *ngIf="getItemProp(processedItem, 'badge')" [ngClass]="getItemProp(processedItem, 'badgeStyleClass')">{{ getItemProp(processedItem, 'badge') }}</span>

                            <ng-container *ngIf="isItemGroup(processedItem)">
                                <AngleRightIcon *ngIf="!slideMenu.submenuIconTemplate" [styleClass]="'p-submenu-icon'" [attr.data-pc-section]="'submenuicon'" [attr.aria-hidden]="true" />
                                <ng-template *ngTemplateOutlet="slideMenu.submenuIconTemplate" [attr.data-pc-section]="'submenuicon'" [attr.aria-hidden]="true"></ng-template>
                            </ng-container>
                        </a>
                    </div>

                    <p-slideMenuSub
                        *ngIf="isItemVisible(processedItem) && isItemGroup(processedItem)"
                        class="p-submenu"
                        [items]="processedItem.items"
                        [autoDisplay]="autoDisplay"
                        [menuId]="menuId"
                        [activeItemPath]="activeItemPath"
                        [focusedItemId]="focusedItemId"
                        [level]="level + 1"
                        [menuWidth]="menuWidth"
                        (itemClick)="itemClick.emit($event)"
                        (itemMouseEnter)="itemMouseEnter.emit($event)"
                    ></p-slideMenuSub>
                </li>
            </ng-template>
        </ul>
    `, isInline: true, dependencies: [{ kind: "directive", type: i0.forwardRef(() => i1.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgForOf), selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgIf), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgStyle), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i0.forwardRef(() => i2.RouterLink), selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "directive", type: i0.forwardRef(() => i2.RouterLinkActive), selector: "[routerLinkActive]", inputs: ["routerLinkActiveOptions", "ariaCurrentWhenActive", "routerLinkActive"], outputs: ["isActiveChange"], exportAs: ["routerLinkActive"] }, { kind: "directive", type: i0.forwardRef(() => i3.Ripple), selector: "[pRipple]" }, { kind: "directive", type: i0.forwardRef(() => i4.Tooltip), selector: "[pTooltip]", inputs: ["tooltipPosition", "tooltipEvent", "appendTo", "positionStyle", "tooltipStyleClass", "tooltipZIndex", "escape", "showDelay", "hideDelay", "life", "positionTop", "positionLeft", "autoHide", "fitContent", "hideOnEscape", "pTooltip", "tooltipDisabled", "tooltipOptions"] }, { kind: "component", type: i0.forwardRef(() => AngleRightIcon), selector: "AngleRightIcon" }, { kind: "component", type: i0.forwardRef(() => SlideMenuSub), selector: "p-slideMenuSub", inputs: ["items", "menuWidth", "root", "easing", "effectDuration", "autoDisplay", "autoZIndex", "baseZIndex", "popup", "menuId", "ariaLabel", "ariaLabelledBy", "level", "focusedItemId", "activeItemPath", "tabindex"], outputs: ["itemClick", "itemMouseEnter", "menuFocus", "menuBlur", "menuKeydown"] }], encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: SlideMenuSub, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-slideMenuSub',
                    template: `
        <ul
            #sublist
            role="menu"
            [ngClass]="{ 'p-submenu-list': !root, 'p-slidemenu-root-list': root, 'p-active-submenu': isActive }"
            [id]="menuId + '_list'"
            [style.width.px]="menuWidth"
            [style.left.px]="root ? slideMenu.left : slideMenu.menuWidth"
            [style.transitionProperty]="root ? 'left' : 'none'"
            [style.transitionDuration]="effectDuration + 'ms'"
            [style.transitionTimingFunction]="easing"
            [tabindex]="tabindex"
            [attr.aria-label]="ariaLabel"
            [attr.aria-labelledBy]="ariaLabelledBy"
            [attr.aria-aria-activedescendant]="focusedItemId"
            [attr.aria-orientation]="'vertical'"
            [attr.data-pc-section]="'menu'"
            (keydown)="menuKeydown.emit($event)"
            (focusin)="menuFocus.emit($event)"
            [attr.data-pc-state]="isActive ? 'active' : 'inactive'"
        >
            <ng-template ngFor let-processedItem [ngForOf]="items" let-index="index">
                <li
                    *ngIf="isItemVisible(processedItem) && getItemProp(processedItem, 'separator')"
                    [id]="getItemId(processedItem)"
                    [style]="getItemProp(processedItem, 'style')"
                    [ngClass]="getSeparatorItemClass(processedItem)"
                    role="separator"
                    [attr.data-pc-section]="'separator'"
                ></li>
                <li
                    #listItem
                    *ngIf="isItemVisible(processedItem) && !getItemProp(processedItem, 'separator')"
                    role="menuitem"
                    [id]="getItemId(processedItem)"
                    [attr.data-pc-section]="'menuitem'"
                    [attr.data-p-highlight]="isItemActive(processedItem)"
                    [attr.data-p-focused]="isItemFocused(processedItem)"
                    [attr.data-p-disabled]="isItemDisabled(processedItem)"
                    [attr.aria-label]="getItemLabel(processedItem)"
                    [attr.aria-disabled]="isItemDisabled(processedItem) || undefined"
                    [attr.aria-haspopup]="isItemGroup(processedItem) && !getItemProp(processedItem, 'to') ? 'menu' : undefined"
                    [attr.aria-expanded]="isItemGroup(processedItem) ? isItemActive(processedItem) : undefined"
                    [attr.aria-level]="level + 1"
                    [attr.aria-setsize]="getAriaSetSize()"
                    [attr.aria-posinset]="getAriaPosInset(index)"
                    [ngStyle]="getItemProp(processedItem, 'style')"
                    [ngClass]="getItemClass(processedItem)"
                    [class]="getItemProp(processedItem, 'styleClass')"
                    pTooltip
                    [tooltipOptions]="getItemProp(processedItem, 'tooltipOptions')"
                >
                    <div [attr.data-pc-section]="'content'" class="p-menuitem-content" (click)="onItemClick($event, processedItem)" (mouseenter)="itemMouseEnter.emit({ originalEvent: $event, processedItem })">
                        <a
                            *ngIf="!getItemProp(processedItem, 'routerLink')"
                            [attr.href]="getItemProp(processedItem, 'url')"
                            [attr.aria-hidden]="true"
                            [attr.data-automationid]="getItemProp(processedItem, 'automationId')"
                            [attr.data-pc-section]="'action'"
                            [target]="getItemProp(processedItem, 'target')"
                            [ngClass]="{ 'p-menuitem-link': true, 'p-disabled': getItemProp(processedItem, 'disabled') }"
                            [attr.tabindex]="-1"
                            pRipple
                        >
                            <span
                                *ngIf="getItemProp(processedItem, 'icon')"
                                class="p-menuitem-icon"
                                [ngClass]="getItemProp(processedItem, 'icon')"
                                [ngStyle]="getItemProp(processedItem, 'iconStyle')"
                                [attr.data-pc-section]="'icon'"
                                [attr.aria-hidden]="true"
                                [attr.tabindex]="-1"
                            >
                            </span>
                            <span *ngIf="getItemProp(processedItem, 'escape'); else htmlLabel" class="p-menuitem-text" [attr.data-pc-section]="'label'">
                                {{ getItemLabel(processedItem) }}
                            </span>
                            <ng-template #htmlLabel>
                                <span class="p-menuitem-text" [innerHTML]="getItemLabel(processedItem)" [attr.data-pc-section]="'label'"></span>
                            </ng-template>
                            <span class="p-menuitem-badge" *ngIf="getItemProp(processedItem, 'badge')" [ngClass]="getItemProp(processedItem, 'badgeStyleClass')">{{ getItemProp(processedItem, 'badge') }}</span>

                            <ng-container *ngIf="isItemGroup(processedItem)">
                                <AngleRightIcon *ngIf="!slideMenu.submenuIconTemplate" [styleClass]="'p-submenu-icon'" [attr.data-pc-section]="'submenuicon'" [attr.aria-hidden]="true" />
                                <ng-template *ngTemplateOutlet="slideMenu.submenuIconTemplate" [attr.data-pc-section]="'submenuicon'" [attr.aria-hidden]="true"></ng-template>
                            </ng-container>
                        </a>
                        <a
                            *ngIf="getItemProp(processedItem, 'routerLink')"
                            [routerLink]="getItemProp(processedItem, 'routerLink')"
                            [attr.data-automationid]="getItemProp(processedItem, 'automationId')"
                            [attr.tabindex]="-1"
                            [attr.aria-hidden]="true"
                            [attr.data-pc-section]="'action'"
                            [queryParams]="getItemProp(processedItem, 'queryParams')"
                            [routerLinkActive]="'p-menuitem-link-active'"
                            [routerLinkActiveOptions]="getItemProp(processedItem, 'routerLinkActiveOptions') || { exact: false }"
                            [target]="getItemProp(processedItem, 'target')"
                            [ngClass]="{ 'p-menuitem-link': true, 'p-disabled': getItemProp(processedItem, 'disabled') }"
                            [fragment]="getItemProp(processedItem, 'fragment')"
                            [queryParamsHandling]="getItemProp(processedItem, 'queryParamsHandling')"
                            [preserveFragment]="getItemProp(processedItem, 'preserveFragment')"
                            [skipLocationChange]="getItemProp(processedItem, 'skipLocationChange')"
                            [replaceUrl]="getItemProp(processedItem, 'replaceUrl')"
                            [state]="getItemProp(processedItem, 'state')"
                            pRipple
                        >
                            <span
                                *ngIf="getItemProp(processedItem, 'icon')"
                                class="p-menuitem-icon"
                                [ngClass]="getItemProp(processedItem, 'icon')"
                                [ngStyle]="getItemProp(processedItem, 'iconStyle')"
                                [attr.data-pc-section]="'icon'"
                                [attr.aria-hidden]="true"
                                [attr.tabindex]="-1"
                            >
                            </span>
                            <span *ngIf="getItemProp(processedItem, 'escape'); else htmlLabel" class="p-menuitem-text" [attr.data-pc-section]="'label'">
                                {{ getItemLabel(processedItem) }}
                            </span>
                            <ng-template #htmlLabel>
                                <span class="p-menuitem-text" [innerHTML]="getItemLabel(processedItem)" [attr.data-pc-section]="'label'"></span>
                            </ng-template>
                            <span class="p-menuitem-badge" *ngIf="getItemProp(processedItem, 'badge')" [ngClass]="getItemProp(processedItem, 'badgeStyleClass')">{{ getItemProp(processedItem, 'badge') }}</span>

                            <ng-container *ngIf="isItemGroup(processedItem)">
                                <AngleRightIcon *ngIf="!slideMenu.submenuIconTemplate" [styleClass]="'p-submenu-icon'" [attr.data-pc-section]="'submenuicon'" [attr.aria-hidden]="true" />
                                <ng-template *ngTemplateOutlet="slideMenu.submenuIconTemplate" [attr.data-pc-section]="'submenuicon'" [attr.aria-hidden]="true"></ng-template>
                            </ng-container>
                        </a>
                    </div>

                    <p-slideMenuSub
                        *ngIf="isItemVisible(processedItem) && isItemGroup(processedItem)"
                        class="p-submenu"
                        [items]="processedItem.items"
                        [autoDisplay]="autoDisplay"
                        [menuId]="menuId"
                        [activeItemPath]="activeItemPath"
                        [focusedItemId]="focusedItemId"
                        [level]="level + 1"
                        [menuWidth]="menuWidth"
                        (itemClick)="itemClick.emit($event)"
                        (itemMouseEnter)="itemMouseEnter.emit($event)"
                    ></p-slideMenuSub>
                </li>
            </ng-template>
        </ul>
    `,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        class: 'p-element'
                    }
                }]
        }], ctorParameters: () => [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }, { type: SlideMenu, decorators: [{
                    type: Inject,
                    args: [forwardRef(() => SlideMenu)]
                }] }], propDecorators: { items: [{
                type: Input
            }], menuWidth: [{
                type: Input
            }], root: [{
                type: Input
            }], easing: [{
                type: Input
            }], effectDuration: [{
                type: Input
            }], autoDisplay: [{
                type: Input
            }], autoZIndex: [{
                type: Input
            }], baseZIndex: [{
                type: Input
            }], popup: [{
                type: Input
            }], menuId: [{
                type: Input
            }], ariaLabel: [{
                type: Input
            }], ariaLabelledBy: [{
                type: Input
            }], level: [{
                type: Input
            }], focusedItemId: [{
                type: Input
            }], activeItemPath: [{
                type: Input
            }], tabindex: [{
                type: Input
            }], itemClick: [{
                type: Output
            }], itemMouseEnter: [{
                type: Output
            }], menuFocus: [{
                type: Output
            }], menuBlur: [{
                type: Output
            }], menuKeydown: [{
                type: Output
            }], sublistViewChild: [{
                type: ViewChild,
                args: ['sublist', { static: true }]
            }] } });
/**
 * SlideMenu displays submenus with slide animation.
 * @group Components
 */
export class SlideMenu {
    document;
    platformId;
    el;
    renderer;
    cd;
    config;
    overlayService;
    /**
     * An array of menuitems.
     * @group Props
     */
    set model(value) {
        this._model = value;
        this._processedItems = this.createProcessedItems(this._model || []);
    }
    get model() {
        return this._model;
    }
    /**
     * Width of the submenus.
     * @group Props
     */
    menuWidth = 190;
    /**
     * Height of the scrollable area, a scrollbar appears if a menu height is longer than this value.
     * @group Props
     */
    viewportHeight = 180;
    /**
     * Duration of the sliding animation in milliseconds.
     * @group Props
     */
    effectDuration = 250;
    /**
     * Easing animation to use for sliding.
     * @group Props
     */
    easing = 'ease-out';
    /**
     * Label of element to navigate back.
     * @group Props
     */
    backLabel = 'Back';
    /**
     * When present, it specifies that the component should be disabled.
     * @group Props
     */
    disabled = false;
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    tabindex = 0;
    /**
     * Defines if menu would displayed as a popup.
     * @group Props
     */
    popup;
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
     * Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element.
     * @group Props
     */
    appendTo;
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
     * Whether to show a root submenu on mouse over.
     * @defaultValue true
     * @group Props
     */
    autoDisplay = true;
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
     * Current id state as a string.
     * @group Props
     */
    id;
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
     * Callback to invoke when overlay menu is shown.
     * @group Emits
     */
    onShow = new EventEmitter();
    /**
     * Callback to invoke when overlay menu is hidden.
     * @group Emits
     */
    onHide = new EventEmitter();
    templates;
    rootmenu;
    containerViewChild;
    set backward(element) {
        this.backwardViewChild = element;
    }
    slideMenuContentViewChild;
    submenuIconTemplate;
    backIconTemplate;
    outsideClickListener;
    resizeListener;
    transitionEndListener;
    transitionStartListener;
    backwardViewChild;
    transition = false;
    left = 0;
    animating = false;
    target;
    visible;
    relativeAlign;
    window;
    focused = false;
    activeItemPath = signal([]);
    focusedItemInfo = signal({ index: -1, level: 0, parentKey: '' });
    searchValue = '';
    searchTimeout;
    _processedItems;
    _model;
    container;
    itemClick = false;
    get visibleItems() {
        const processedItem = this.activeItemPath().find((p) => p.key === this.focusedItemInfo().parentKey);
        return processedItem ? processedItem.items : this.processedItems;
    }
    get processedItems() {
        if (!this._processedItems || !this._processedItems.length) {
            this._processedItems = this.createProcessedItems(this.model || []);
        }
        return this._processedItems;
    }
    get focusedItemId() {
        const focusedItem = this.focusedItemInfo();
        return focusedItem.item && focusedItem.item?.id ? focusedItem.item.id : focusedItem.index !== -1 ? `${this.id}${ObjectUtils.isNotEmpty(focusedItem.parentKey) ? '_' + focusedItem.parentKey : ''}_${focusedItem.index}` : null;
    }
    constructor(document, platformId, el, renderer, cd, config, overlayService) {
        this.document = document;
        this.platformId = platformId;
        this.el = el;
        this.renderer = renderer;
        this.cd = cd;
        this.config = config;
        this.overlayService = overlayService;
        this.window = this.document.defaultView;
        effect(() => {
            const path = this.activeItemPath();
            if (this.popup) {
                if (ObjectUtils.isNotEmpty(path)) {
                    this.bindOutsideClickListener();
                    this.bindResizeListener();
                }
                else {
                    this.unbindOutsideClickListener();
                    this.unbindResizeListener();
                }
            }
        });
    }
    documentFocusListener;
    ngOnInit() {
        this.id = this.id || UniqueComponentId();
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'backicon':
                    this.backIconTemplate = item.template;
                    break;
                case 'submenuicon':
                    this.submenuIconTemplate = item.template;
                    break;
            }
        });
    }
    createProcessedItems(items, level = 0, parent = {}, parentKey = '') {
        const processedItems = [];
        items &&
            items.forEach((item, index) => {
                const key = (parentKey !== '' ? parentKey + '_' : '') + index;
                const newItem = {
                    item,
                    index,
                    level,
                    key,
                    parent,
                    parentKey
                };
                newItem['items'] = this.createProcessedItems(item.items, level + 1, newItem, key);
                processedItems.push(newItem);
            });
        return processedItems;
    }
    getItemProp(item, name) {
        return item ? ObjectUtils.getItemValue(item[name]) : undefined;
    }
    getProccessedItemLabel(processedItem) {
        return processedItem ? this.getItemLabel(processedItem.item) : undefined;
    }
    getItemLabel(item) {
        return this.getItemProp(item, 'label');
    }
    isProcessedItemGroup(processedItem) {
        return processedItem && ObjectUtils.isNotEmpty(processedItem.items);
    }
    isSelected(processedItem) {
        return this.activeItemPath().some((p) => p.key === processedItem.key);
    }
    isValidSelectedItem(processedItem) {
        return this.isValidItem(processedItem) && this.isSelected(processedItem);
    }
    isValidItem(processedItem) {
        return !!processedItem && !this.isItemDisabled(processedItem.item) && !this.isItemSeparator(processedItem.item);
    }
    isItemDisabled(item) {
        return this.getItemProp(item, 'disabled');
    }
    isItemSeparator(item) {
        return this.getItemProp(item, 'separator');
    }
    isItemMatched(processedItem) {
        return this.isValidItem(processedItem) && this.getProccessedItemLabel(processedItem).toLocaleLowerCase().startsWith(this.searchValue.toLocaleLowerCase());
    }
    isProccessedItemGroup(processedItem) {
        return processedItem && ObjectUtils.isNotEmpty(processedItem.items);
    }
    onOverlayClick(event) {
        if (this.popup) {
            this.overlayService.add({
                originalEvent: event,
                target: this.el.nativeElement
            });
        }
    }
    goBack(event) {
        this.animate('left');
        event.stopPropagation();
        event.preventDefault();
    }
    onItemClick(event) {
        if (this.transition) {
            return;
        }
        else {
            if (!this.itemClick) {
                this.itemClick = true;
                this.onMenuFocus();
            }
            const { originalEvent, processedItem } = event;
            const grouped = this.isProcessedItemGroup(processedItem);
            const focusedItemInfo = this.focusedItemInfo();
            if (grouped) {
                this.focusedItemInfo.set({ ...focusedItemInfo, index: -1, level: focusedItemInfo.level + 1, parentKey: processedItem.key, item: processedItem.item });
                this.animate('right');
            }
            else {
                this.onItemChange(event);
                this.popup && this.hide();
            }
        }
    }
    onItemMouseEnter(event) {
        this.onItemChange(event);
    }
    onKeyDown(event) {
        if (!this.transition) {
            const metaKey = event.metaKey || event.ctrlKey;
            switch (event.code) {
                case 'ArrowDown':
                    this.onArrowDownKey(event);
                    break;
                case 'ArrowUp':
                    this.onArrowUpKey(event);
                    break;
                case 'ArrowLeft':
                    this.onArrowLeftKey(event);
                    break;
                case 'ArrowRight':
                    this.onArrowRightKey(event);
                    break;
                case 'Home':
                    this.onHomeKey(event);
                    break;
                case 'End':
                    this.onEndKey(event);
                    break;
                case 'Space':
                    this.onSpaceKey(event);
                    break;
                case 'Enter':
                    this.onEnterKey(event);
                    break;
                case 'Escape':
                    this.onEscapeKey(event);
                    break;
                case 'Tab':
                    this.onTabKey(event);
                    break;
                case 'PageDown':
                case 'PageUp':
                case 'Backspace':
                case 'ShiftLeft':
                case 'ShiftRight':
                    //NOOP
                    break;
                default:
                    if (!metaKey && ObjectUtils.isPrintableCharacter(event.key)) {
                        this.searchItems(event, event.key);
                    }
                    break;
            }
        }
    }
    onNavigationKeyDown(event) {
        switch (event.code) {
            case 'Enter':
            case 'Space':
                this.onArrowLeftKey(event);
                const focusedItemInfo = this.focusedItemInfo();
                this.focusedItemInfo.set({
                    ...focusedItemInfo,
                    index: -1,
                    item: null
                });
                break;
            default:
                break;
        }
    }
    animate(to) {
        switch (to) {
            case 'right':
                this.left -= this.menuWidth;
                break;
            case 'left':
                this.left += this.menuWidth;
                break;
            default:
                break;
        }
        this.animating = true;
        setTimeout(() => (this.animating = false), this.effectDuration);
    }
    onArrowDownKey(event) {
        const itemIndex = this.focusedItemInfo().index !== -1 ? this.findNextItemIndex(this.focusedItemInfo().index) : this.findFirstFocusedItemIndex();
        this.changeFocusedItemIndex(event, itemIndex);
        event.preventDefault();
    }
    onArrowRightKey(event) {
        const focusedItemInfo = this.focusedItemInfo();
        if (focusedItemInfo.index === -1) {
            focusedItemInfo.index = 0;
        }
        const processedItem = this.visibleItems[this.focusedItemInfo().index];
        const grouped = this.isProccessedItemGroup(processedItem);
        if (grouped) {
            let { index, level, key, item } = processedItem;
            this.onItemChange({ originalEvent: event, processedItem });
            this.focusedItemInfo.set({ index: 0, level: level, parentKey: key });
            this.searchValue = '';
            this.animate('right');
        }
        event.preventDefault();
    }
    onArrowUpKey(event) {
        if (event.altKey) {
            if (this.focusedItemInfo().index !== -1) {
                const processedItem = this.visibleItems[this.focusedItemInfo().index];
                const grouped = this.isProccessedItemGroup(processedItem);
                !grouped && this.onItemChange({ originalEvent: event, processedItem });
            }
            this.popup && this.hide(event, true);
            event.preventDefault();
        }
        else {
            const itemIndex = this.focusedItemInfo().index !== -1 ? this.findPrevItemIndex(this.focusedItemInfo().index) : this.findLastFocusedItemIndex();
            this.changeFocusedItemIndex(event, itemIndex);
            event.preventDefault();
        }
    }
    onArrowLeftKey(event) {
        const focusedItemInfo = this.focusedItemInfo();
        if (focusedItemInfo.index === -1) {
            focusedItemInfo.index = 0;
        }
        const processedItem = this.visibleItems[focusedItemInfo.index];
        const parentItem = this.activeItemPath().find((p) => p.key === processedItem.parentKey);
        const root = ObjectUtils.isEmpty(processedItem.parent);
        if (!root) {
            let { level, index, parentKey } = parentItem;
            this.focusedItemInfo.set({ index, level, parentKey, item: parentItem.item });
            this.searchValue = '';
        }
        const activeItemPath = this.activeItemPath().filter((p) => p.parentKey !== focusedItemInfo.parentKey);
        this.activeItemPath.set(activeItemPath);
        parentItem && this.animate('left');
        event.preventDefault();
    }
    onHomeKey(event) {
        this.changeFocusedItemIndex(event, this.findFirstItemIndex());
        event.preventDefault();
    }
    onEndKey(event) {
        this.changeFocusedItemIndex(event, this.findLastItemIndex());
        event.preventDefault();
    }
    onSpaceKey(event) {
        this.onEnterKey(event);
    }
    onEscapeKey(event) {
        if (this.popup) {
            this.hide(event, true);
            const focusedItemInfo = this.focusedItemInfo();
            this.focusedItemInfo.set({
                ...focusedItemInfo,
                index: this.findLastFocusedItemIndex(),
                item: null
            });
            event.preventDefault();
        }
    }
    onTabKey(event) {
        if (this.backwardViewChild.nativeElement.style.display !== 'none') {
            this.backwardViewChild.nativeElement.focus();
        }
        if (this.popup && !this.containerViewChild.nativeElement.contains(event.target)) {
            this.hide();
        }
        event.preventDefault();
    }
    onEnterKey(event) {
        if (this.focusedItemInfo().index !== -1) {
            const processedItem = this.visibleItems[this.focusedItemInfo().index];
            const grouped = this.isProccessedItemGroup(processedItem);
            if (grouped) {
                this.onArrowRightKey(event);
            }
            else {
                const element = DomHandler.findSingle(this.rootmenu.el.nativeElement, `li[id="${`${this.focusedItemId}`}"]`);
                const anchorElement = element && DomHandler.findSingle(element, 'a[data-pc-section="action"]');
                anchorElement ? anchorElement.click() : element && element.click();
                const focusedItemInfo = this.focusedItemInfo();
                this.focusedItemInfo.set({
                    ...focusedItemInfo,
                    index: processedItem.index,
                    item: processedItem.item
                });
            }
        }
        event.preventDefault();
    }
    onItemChange(event) {
        const { processedItem, isFocus } = event;
        if (ObjectUtils.isEmpty(processedItem))
            return;
        const { index, key, level, parentKey, items, item } = processedItem;
        const grouped = ObjectUtils.isNotEmpty(items);
        const activeItemPath = this.activeItemPath().filter((p) => p.parentKey !== parentKey && p.parentKey !== key);
        grouped && activeItemPath.push(processedItem);
        this.focusedItemInfo.set({ index, level, parentKey, item });
        this.activeItemPath.set(activeItemPath);
        isFocus && DomHandler.focus(this.rootmenu.sublistViewChild.nativeElement);
    }
    onMenuFocus() {
        this.focused = true;
        this.bindOutsideClickListener();
        this.bindTransitionListeners();
        if (!this.left && this.focusedItemInfo().level > 0) {
            this.focusedItemInfo.set({ index: 0, level: 0, parentKey: '', item: this.findVisibleItem(0).item });
        }
        if (this.focusedItemInfo().index === -1 && this.left < 0) {
            this.focusedItemInfo.set({ ...this.focusedItemInfo(), index: 0 });
        }
        if (this.focusedItemInfo().index === -1 && !this.left) {
            this.focusedItemInfo.set({ index: 0, level: 0, parentKey: '', item: this.findVisibleItem(0).item });
        }
    }
    onMenuBlur() {
        this.focused = false;
        this.popup && this.focusedItemInfo.set({ index: -1, level: 0, parentKey: '', item: null });
        if (!this.popup) {
            this.focusedItemInfo.set({
                ...this.focusedItemInfo(),
                index: -1,
                item: null
            });
        }
        this.searchValue = '';
        !this.popup && this.unbindOutsideClickListener();
    }
    activeLevel = signal(0);
    bindTransitionListeners() {
        if (!this.transitionStartListener) {
            this.transitionStartListener = this.renderer.listen(this.rootmenu.sublistViewChild.nativeElement, 'transitionstart', (event) => {
                this.transition = true;
                event.preventDefault();
            });
        }
        if (!this.transitionEndListener) {
            this.transitionEndListener = this.renderer.listen(this.rootmenu.sublistViewChild.nativeElement, 'transitionend', (event) => {
                const activeMenu = DomHandler.findSingle(this.rootmenu.el.nativeElement, `ul[data-pc-state="active"]`);
                const activeLevel = DomHandler.getAttribute(activeMenu.firstElementChild, 'aria-level') - 1;
                this.activeLevel.set(activeLevel);
                if (!this.left) {
                    this.rootmenu.sublistViewChild.nativeElement.focus();
                }
                else {
                    const activeLevel = DomHandler.getAttribute(activeMenu.firstElementChild, 'aria-level') - 1;
                    this.activeLevel.set(activeLevel);
                    if (this.focusedItemInfo().level > this.activeLevel()) {
                        let newActiveItemPath = this.activeItemPath().slice(0, this.activeItemPath().length - 1);
                        let lastActiveParent = newActiveItemPath[newActiveItemPath.length - 1];
                        this.focusedItemInfo.set({ index: -1, level: this.activeLevel(), parentKey: lastActiveParent.key });
                        this.activeItemPath.set(newActiveItemPath);
                    }
                }
                this.transition = false;
                event.preventDefault();
            });
        }
    }
    unbindTransitionListeners() {
        if (this.transitionEndListener) {
            this.transitionEndListener();
            this.transitionEndListener = null;
        }
        if (this.transitionStartListener) {
            this.transitionStartListener();
            this.transitionStartListener = null;
        }
    }
    onOverlayAnimationStart(event) {
        switch (event.toState) {
            case 'visible':
                if (this.popup) {
                    this.container = event.element;
                    this.moveOnTop();
                    this.onShow.emit({});
                    this.appendOverlay();
                    this.alignOverlay();
                    this.bindOutsideClickListener();
                    this.bindResizeListener();
                    DomHandler.focus(this.rootmenu.sublistViewChild.nativeElement);
                    this.scrollInView();
                }
                break;
            case 'void':
                this.onOverlayHide();
                this.onHide.emit({});
                break;
        }
    }
    alignOverlay() {
        if (this.relativeAlign)
            DomHandler.relativePosition(this.container, this.target);
        else
            DomHandler.absolutePosition(this.container, this.target);
    }
    onOverlayAnimationEnd(event) {
        switch (event.toState) {
            case 'void':
                ZIndexUtils.clear(event.element);
                break;
        }
    }
    appendOverlay() {
        if (this.appendTo) {
            if (this.appendTo === 'body')
                this.renderer.appendChild(this.document.body, this.containerViewChild.nativeElement);
            else
                DomHandler.appendChild(this.container, this.appendTo);
        }
    }
    restoreOverlayAppend() {
        if (this.containerViewChild && this.appendTo) {
            this.renderer.appendChild(this.el.nativeElement, this.container);
        }
    }
    moveOnTop() {
        if (this.autoZIndex) {
            ZIndexUtils.set('menu', this.container, this.baseZIndex + this.config.zIndex.menu);
        }
    }
    /**
     * Hides the popup menu.
     * @group Method
     */
    hide(event, isFocus) {
        if (this.popup) {
            this.onHide.emit({});
            this.visible = false;
        }
        isFocus && DomHandler.focus(this.target || this.rootmenu.sublistViewChild.nativeElement);
    }
    /**
     * Toggles the visibility of the popup menu.
     * @param {Event} event - Browser event.
     * @group Method
     */
    toggle(event) {
        this.visible ? this.hide(event, true) : this.show(event);
    }
    /**
     * Displays the popup menu.
     * @param {Event} even - Browser event.
     * @group Method
     */
    show(event, isFocus) {
        if (this.popup) {
            this.visible = true;
            this.target = event.currentTarget;
        }
        this.focusedItemInfo.set({ index: this.findFirstFocusedItemIndex(), level: 0, parentKey: '' });
        if (!this.popup) {
            isFocus && DomHandler.focus(this.rootmenu.sublistViewChild.nativeElement);
        }
        this.cd.markForCheck();
    }
    searchItems(event, char) {
        this.searchValue = (this.searchValue || '') + char;
        let itemIndex = -1;
        let matched = false;
        if (this.focusedItemInfo().index !== -1) {
            itemIndex = this.visibleItems.slice(this.focusedItemInfo().index).findIndex((processedItem) => this.isItemMatched(processedItem));
            itemIndex = itemIndex === -1 ? this.visibleItems.slice(0, this.focusedItemInfo().index).findIndex((processedItem) => this.isItemMatched(processedItem)) : itemIndex + this.focusedItemInfo().index;
        }
        else {
            itemIndex = this.visibleItems.findIndex((processedItem) => this.isItemMatched(processedItem));
        }
        if (itemIndex !== -1) {
            matched = true;
        }
        if (itemIndex === -1 && this.focusedItemInfo().index === -1) {
            itemIndex = this.findFirstFocusedItemIndex();
        }
        if (itemIndex !== -1) {
            this.changeFocusedItemIndex(event, itemIndex);
        }
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }
        this.searchTimeout = setTimeout(() => {
            this.searchValue = '';
            this.searchTimeout = null;
        }, 500);
        return matched;
    }
    findVisibleItem(index) {
        return ObjectUtils.isNotEmpty(this.visibleItems) ? this.visibleItems[index] : null;
    }
    findLastFocusedItemIndex() {
        const selectedIndex = this.findSelectedItemIndex();
        return selectedIndex < 0 ? this.findLastItemIndex() : selectedIndex;
    }
    findLastItemIndex() {
        return ObjectUtils.findLastIndex(this.visibleItems, (processedItem) => this.isValidItem(processedItem));
    }
    findPrevItemIndex(index) {
        const matchedItemIndex = index > 0 ? ObjectUtils.findLastIndex(this.visibleItems.slice(0, index), (processedItem) => this.isValidItem(processedItem)) : -1;
        return matchedItemIndex > -1 ? matchedItemIndex : index;
    }
    findNextItemIndex(index) {
        const matchedItemIndex = index < this.visibleItems.length - 1 ? this.visibleItems.slice(index + 1).findIndex((processedItem) => this.isValidItem(processedItem)) : -1;
        return matchedItemIndex > -1 ? matchedItemIndex + index + 1 : index;
    }
    findFirstFocusedItemIndex() {
        const selectedIndex = this.findSelectedItemIndex();
        return selectedIndex < 0 ? this.findFirstItemIndex() : selectedIndex;
    }
    findFirstItemIndex() {
        return this.visibleItems.findIndex((processedItem) => this.isValidItem(processedItem));
    }
    findSelectedItemIndex() {
        return this.visibleItems.findIndex((processedItem) => this.isValidSelectedItem(processedItem));
    }
    changeFocusedItemIndex(event, index) {
        if (this.focusedItemInfo().index !== index) {
            this.focusedItemInfo.set({ ...this.focusedItemInfo(), index });
            this.scrollInView();
        }
    }
    scrollInView(index = -1) {
        const id = index !== -1 ? `${this.id}_${index}` : this.focusedItemId;
        const element = DomHandler.findSingle(this.rootmenu.el.nativeElement, `li[id="${id}"]`);
        if (element) {
            element.scrollIntoView && element.scrollIntoView({ block: 'nearest', inline: 'nearest' });
        }
    }
    bindResizeListener() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.resizeListener) {
                this.resizeListener = this.renderer.listen(this.document.defaultView, 'resize', (event) => {
                    if (!DomHandler.isTouchDevice()) {
                        this.hide(event, true);
                    }
                });
            }
        }
    }
    bindOutsideClickListener() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.outsideClickListener) {
                this.outsideClickListener = this.renderer.listen(this.document, 'click', (event) => {
                    const isOutsideContainer = this.containerViewChild && !this.containerViewChild.nativeElement.contains(event.target);
                    const isOutsideTarget = this.popup ? !(this.target && (this.target === event.target || this.target.contains(event.target))) : true;
                    if (this.popup) {
                        if (isOutsideContainer && isOutsideTarget) {
                            this.onMenuBlur();
                            this.hide();
                        }
                    }
                    else {
                        if (isOutsideContainer && isOutsideTarget && this.focused) {
                            this.onMenuBlur();
                        }
                    }
                });
            }
        }
    }
    unbindOutsideClickListener() {
        if (this.outsideClickListener) {
            this.outsideClickListener();
            this.outsideClickListener = null;
        }
    }
    unbindResizeListener() {
        if (this.resizeListener) {
            this.resizeListener();
            this.resizeListener = null;
        }
    }
    onOverlayHide() {
        this.unbindOutsideClickListener();
        this.unbindResizeListener();
        this.left = 0;
        if (!this.cd.destroyed) {
            this.target = null;
        }
        if (this.container) {
            this.container = null;
        }
    }
    ngOnDestroy() {
        if (this.popup) {
            if (this.container && this.autoZIndex) {
                ZIndexUtils.clear(this.container);
            }
            this.restoreOverlayAppend();
            this.onOverlayHide();
        }
        this.unbindTransitionListeners();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: SlideMenu, deps: [{ token: DOCUMENT }, { token: PLATFORM_ID }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }, { token: i5.PrimeNGConfig }, { token: i5.OverlayService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.5", type: SlideMenu, selector: "p-slideMenu", inputs: { model: "model", menuWidth: "menuWidth", viewportHeight: "viewportHeight", effectDuration: "effectDuration", easing: "easing", backLabel: "backLabel", disabled: "disabled", tabindex: "tabindex", popup: "popup", style: "style", styleClass: "styleClass", appendTo: "appendTo", autoZIndex: "autoZIndex", baseZIndex: "baseZIndex", autoDisplay: "autoDisplay", showTransitionOptions: "showTransitionOptions", hideTransitionOptions: "hideTransitionOptions", id: "id", ariaLabel: "ariaLabel", ariaLabelledBy: "ariaLabelledBy" }, outputs: { onShow: "onShow", onHide: "onHide" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "rootmenu", first: true, predicate: ["rootmenu"], descendants: true }, { propertyName: "containerViewChild", first: true, predicate: ["container"], descendants: true }, { propertyName: "backward", first: true, predicate: ["backward"], descendants: true }, { propertyName: "slideMenuContentViewChild", first: true, predicate: ["slideMenuContent"], descendants: true }], ngImport: i0, template: `
        <div
            #container
            [attr.data-pc-section]="'root'"
            [attr.data-pc-name]="'slidemenu'"
            [id]="id"
            [ngClass]="{ 'p-slidemenu p-component': true, 'p-slidemenu-overlay': popup }"
            [class]="styleClass"
            [ngStyle]="style"
            (click)="onOverlayClick($event)"
            [@overlayAnimation]="{ value: 'visible', params: { showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions } }"
            [@.disabled]="popup !== true"
            (@overlayAnimation.start)="onOverlayAnimationStart($event)"
            (@overlayAnimation.done)="onOverlayAnimationEnd($event)"
            *ngIf="!popup || visible"
        >
            <div class="p-slidemenu-wrapper" [style.height]="left ? viewportHeight + 'px' : 'auto'" [style.width]="menuWidth + 'px'">
                <div #slideMenuContent class="p-slidemenu-content" (focus)="logFocus($event, slideMenuContent)">
                    <p-slideMenuSub
                        #rootmenu
                        [root]="true"
                        [items]="processedItems"
                        [menuId]="id"
                        [tabindex]="!disabled ? tabindex : -1"
                        [ariaLabel]="ariaLabel"
                        [ariaLabelledBy]="ariaLabelledBy"
                        [baseZIndex]="baseZIndex"
                        [autoZIndex]="autoZIndex"
                        [autoDisplay]="autoDisplay"
                        [menuWidth]="menuWidth"
                        [popup]="popup"
                        [effectDuration]="effectDuration"
                        [easing]="easing"
                        [focusedItemId]="focused ? focusedItemId : undefined"
                        [activeItemPath]="activeItemPath()"
                        (itemClick)="onItemClick($event)"
                        (menuFocus)="onMenuFocus($event)"
                        (menuKeydown)="onKeyDown($event)"
                        (itemMouseEnter)="onItemMouseEnter($event)"
                    ></p-slideMenuSub>
                </div>
                <a #backward class="p-slidemenu-backward p-menuitem-link" tabindex="0" [style.display]="left ? 'block' : 'none'" (click)="goBack($event)" (keydown)="onNavigationKeyDown($event)" [attr.data-pc-section]="'navigation'">
                    <CaretLeftIcon *ngIf="!backIconTemplate" [styleClass]="'p-slidemenu-backward-icon'" [ngStyle]="{ 'vertical-align': 'middle' }" />
                    <ng-template *ngTemplateOutlet="backIconTemplate"></ng-template>
                    <span>{{ backLabel }}</span>
                </a>
            </div>
        </div>
    `, isInline: true, styles: ["@layer primeng{.p-slidemenu .p-slidemenu-root-list{position:relative;top:0}.p-slidemenu-overlay{position:absolute;top:0;left:0}.p-slidemenu .p-menuitem-active{position:static}.p-slidemenu .p-slidemenu-wrapper{position:relative}.p-slidemenu ul{margin:0;padding:0;list-style:none}.p-slidemenu .p-submenu-list{position:absolute;min-width:100%;z-index:1;display:none}.p-slidemenu .p-slidemenu-content{overflow-x:hidden;overflow-y:auto;position:relative;height:100%}.p-slidemenu .p-menuitem-link:not(.p-slidemenu-backward){cursor:pointer;display:flex;align-items:center;text-decoration:none;overflow:hidden;position:relative}.p-slidemenu .p-menuitem-text{line-height:1}.p-slidemenu .p-menuitem{position:relative}.p-slidemenu .p-menuitem-link .p-submenu-icon:not(svg){margin-left:auto}.p-slidemenu .p-menuitem-link .p-icon-wrapper{margin-left:auto}.p-slidemenu .p-menuitem-active>p-slidemenusub>.p-submenu-list{display:block;left:100%;top:0}.p-slidemenu .p-menuitem-active>.p-menuitem-content>.p-submenu>.p-submenu-list{display:block}.p-slidemenu ul:not(.p-active-submenu)>.p-menuitem:not(.p-menuitem-active),.p-slidemenu .p-active-submenu>.p-menuitem-active>.p-menuitem-content>.p-submenu>.p-submenu-list{display:none}.p-slidemenu .p-active-submenu>.p-menuitem-active~.p-menuitem{display:block}.p-slidemenu-backward{position:absolute;bottom:0;width:100%;cursor:pointer;display:none}.p-slidemenu-backward .p-slidemenu-backward-icon,.p-slidemenu-backward span{vertical-align:middle}}\n"], dependencies: [{ kind: "directive", type: i0.forwardRef(() => i1.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgIf), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgStyle), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: i0.forwardRef(() => CaretLeftIcon), selector: "CaretLeftIcon" }, { kind: "component", type: i0.forwardRef(() => SlideMenuSub), selector: "p-slideMenuSub", inputs: ["items", "menuWidth", "root", "easing", "effectDuration", "autoDisplay", "autoZIndex", "baseZIndex", "popup", "menuId", "ariaLabel", "ariaLabelledBy", "level", "focusedItemId", "activeItemPath", "tabindex"], outputs: ["itemClick", "itemMouseEnter", "menuFocus", "menuBlur", "menuKeydown"] }], animations: [trigger('overlayAnimation', [transition(':enter', [style({ opacity: 0, transform: 'scaleY(0.8)' }), animate('{{showTransitionParams}}')]), transition(':leave', [animate('{{hideTransitionParams}}', style({ opacity: 0 }))])])], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: SlideMenu, decorators: [{
            type: Component,
            args: [{ selector: 'p-slideMenu', template: `
        <div
            #container
            [attr.data-pc-section]="'root'"
            [attr.data-pc-name]="'slidemenu'"
            [id]="id"
            [ngClass]="{ 'p-slidemenu p-component': true, 'p-slidemenu-overlay': popup }"
            [class]="styleClass"
            [ngStyle]="style"
            (click)="onOverlayClick($event)"
            [@overlayAnimation]="{ value: 'visible', params: { showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions } }"
            [@.disabled]="popup !== true"
            (@overlayAnimation.start)="onOverlayAnimationStart($event)"
            (@overlayAnimation.done)="onOverlayAnimationEnd($event)"
            *ngIf="!popup || visible"
        >
            <div class="p-slidemenu-wrapper" [style.height]="left ? viewportHeight + 'px' : 'auto'" [style.width]="menuWidth + 'px'">
                <div #slideMenuContent class="p-slidemenu-content" (focus)="logFocus($event, slideMenuContent)">
                    <p-slideMenuSub
                        #rootmenu
                        [root]="true"
                        [items]="processedItems"
                        [menuId]="id"
                        [tabindex]="!disabled ? tabindex : -1"
                        [ariaLabel]="ariaLabel"
                        [ariaLabelledBy]="ariaLabelledBy"
                        [baseZIndex]="baseZIndex"
                        [autoZIndex]="autoZIndex"
                        [autoDisplay]="autoDisplay"
                        [menuWidth]="menuWidth"
                        [popup]="popup"
                        [effectDuration]="effectDuration"
                        [easing]="easing"
                        [focusedItemId]="focused ? focusedItemId : undefined"
                        [activeItemPath]="activeItemPath()"
                        (itemClick)="onItemClick($event)"
                        (menuFocus)="onMenuFocus($event)"
                        (menuKeydown)="onKeyDown($event)"
                        (itemMouseEnter)="onItemMouseEnter($event)"
                    ></p-slideMenuSub>
                </div>
                <a #backward class="p-slidemenu-backward p-menuitem-link" tabindex="0" [style.display]="left ? 'block' : 'none'" (click)="goBack($event)" (keydown)="onNavigationKeyDown($event)" [attr.data-pc-section]="'navigation'">
                    <CaretLeftIcon *ngIf="!backIconTemplate" [styleClass]="'p-slidemenu-backward-icon'" [ngStyle]="{ 'vertical-align': 'middle' }" />
                    <ng-template *ngTemplateOutlet="backIconTemplate"></ng-template>
                    <span>{{ backLabel }}</span>
                </a>
            </div>
        </div>
    `, animations: [trigger('overlayAnimation', [transition(':enter', [style({ opacity: 0, transform: 'scaleY(0.8)' }), animate('{{showTransitionParams}}')]), transition(':leave', [animate('{{hideTransitionParams}}', style({ opacity: 0 }))])])], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: ["@layer primeng{.p-slidemenu .p-slidemenu-root-list{position:relative;top:0}.p-slidemenu-overlay{position:absolute;top:0;left:0}.p-slidemenu .p-menuitem-active{position:static}.p-slidemenu .p-slidemenu-wrapper{position:relative}.p-slidemenu ul{margin:0;padding:0;list-style:none}.p-slidemenu .p-submenu-list{position:absolute;min-width:100%;z-index:1;display:none}.p-slidemenu .p-slidemenu-content{overflow-x:hidden;overflow-y:auto;position:relative;height:100%}.p-slidemenu .p-menuitem-link:not(.p-slidemenu-backward){cursor:pointer;display:flex;align-items:center;text-decoration:none;overflow:hidden;position:relative}.p-slidemenu .p-menuitem-text{line-height:1}.p-slidemenu .p-menuitem{position:relative}.p-slidemenu .p-menuitem-link .p-submenu-icon:not(svg){margin-left:auto}.p-slidemenu .p-menuitem-link .p-icon-wrapper{margin-left:auto}.p-slidemenu .p-menuitem-active>p-slidemenusub>.p-submenu-list{display:block;left:100%;top:0}.p-slidemenu .p-menuitem-active>.p-menuitem-content>.p-submenu>.p-submenu-list{display:block}.p-slidemenu ul:not(.p-active-submenu)>.p-menuitem:not(.p-menuitem-active),.p-slidemenu .p-active-submenu>.p-menuitem-active>.p-menuitem-content>.p-submenu>.p-submenu-list{display:none}.p-slidemenu .p-active-submenu>.p-menuitem-active~.p-menuitem{display:block}.p-slidemenu-backward{position:absolute;bottom:0;width:100%;cursor:pointer;display:none}.p-slidemenu-backward .p-slidemenu-backward-icon,.p-slidemenu-backward span{vertical-align:middle}}\n"] }]
        }], ctorParameters: () => [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }, { type: i5.PrimeNGConfig }, { type: i5.OverlayService }], propDecorators: { model: [{
                type: Input
            }], menuWidth: [{
                type: Input
            }], viewportHeight: [{
                type: Input
            }], effectDuration: [{
                type: Input
            }], easing: [{
                type: Input
            }], backLabel: [{
                type: Input
            }], disabled: [{
                type: Input
            }], tabindex: [{
                type: Input
            }], popup: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], appendTo: [{
                type: Input
            }], autoZIndex: [{
                type: Input
            }], baseZIndex: [{
                type: Input
            }], autoDisplay: [{
                type: Input
            }], showTransitionOptions: [{
                type: Input
            }], hideTransitionOptions: [{
                type: Input
            }], id: [{
                type: Input
            }], ariaLabel: [{
                type: Input
            }], ariaLabelledBy: [{
                type: Input
            }], onShow: [{
                type: Output
            }], onHide: [{
                type: Output
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }], rootmenu: [{
                type: ViewChild,
                args: ['rootmenu']
            }], containerViewChild: [{
                type: ViewChild,
                args: ['container']
            }], backward: [{
                type: ViewChild,
                args: ['backward']
            }], slideMenuContentViewChild: [{
                type: ViewChild,
                args: ['slideMenuContent']
            }] } });
export class SlideMenuModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: SlideMenuModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.0.5", ngImport: i0, type: SlideMenuModule, declarations: [SlideMenu, SlideMenuSub], imports: [CommonModule, RouterModule, RippleModule, TooltipModule, AngleRightIcon, SharedModule, CaretLeftIcon], exports: [SlideMenu, RouterModule, TooltipModule, SharedModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: SlideMenuModule, imports: [CommonModule, RouterModule, RippleModule, TooltipModule, AngleRightIcon, SharedModule, CaretLeftIcon, RouterModule, TooltipModule, SharedModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: SlideMenuModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RouterModule, RippleModule, TooltipModule, AngleRightIcon, SharedModule, CaretLeftIcon],
                    exports: [SlideMenu, RouterModule, TooltipModule, SharedModule],
                    declarations: [SlideMenu, SlideMenuSub]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVtZW51LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL3NsaWRlbWVudS9zbGlkZW1lbnUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFrQixPQUFPLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMxRixPQUFPLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzVFLE9BQU8sRUFFSCx1QkFBdUIsRUFFdkIsU0FBUyxFQUNULGVBQWUsRUFFZixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFDTCxRQUFRLEVBR1IsTUFBTSxFQUNOLFdBQVcsRUFJWCxTQUFTLEVBQ1QsaUJBQWlCLEVBRWpCLE1BQU0sRUFDTixVQUFVLEVBQ1YsTUFBTSxFQUNULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQTJDLGFBQWEsRUFBRSxZQUFZLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDbkcsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN6QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsV0FBVyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU1RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUJBQXlCLENBQUM7Ozs7Ozs7QUE4SnhELE1BQU0sT0FBTyxZQUFZO0lBaURpQjtJQUEyQjtJQUF1QjtJQUE2QjtJQUFtRTtJQWhEL0ssS0FBSyxDQUFR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QWU7dUJBQUMsYUFBYTtnQkFFUCxRQUFRO3NCQUE5QixTQUFTO3VCQUFDLFVBQVU7Z0JBRUcsa0JBQWtCO3NCQUF6QyxTQUFTO3VCQUFDLFdBQVc7Z0JBRUssUUFBUTtzQkFBbEMsU0FBUzt1QkFBQyxVQUFVO2dCQUlVLHlCQUF5QjtzQkFBdkQsU0FBUzt1QkFBQyxrQkFBa0I7O0FBeXlCakMsTUFBTSxPQUFPLGVBQWU7dUdBQWYsZUFBZTt3R0FBZixlQUFlLGlCQTE2QmYsU0FBUyxFQTNMVCxZQUFZLGFBaW1DWCxZQUFZLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUUsY0FBYyxFQUFFLFlBQVksRUFBRSxhQUFhLGFBdDZCckcsU0FBUyxFQXU2QkcsWUFBWSxFQUFFLGFBQWEsRUFBRSxZQUFZO3dHQUdyRCxlQUFlLFlBSmQsWUFBWSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLGNBQWMsRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUN6RixZQUFZLEVBQUUsYUFBYSxFQUFFLFlBQVk7OzJGQUdyRCxlQUFlO2tCQUwzQixRQUFRO21CQUFDO29CQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxjQUFjLEVBQUUsWUFBWSxFQUFFLGFBQWEsQ0FBQztvQkFDL0csT0FBTyxFQUFFLENBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUUsWUFBWSxDQUFDO29CQUMvRCxZQUFZLEVBQUUsQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDO2lCQUMxQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFuaW1hdGlvbkV2ZW50LCBhbmltYXRlLCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlLCBET0NVTUVOVCwgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBDb250ZW50Q2hpbGRyZW4sXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5qZWN0LFxuICAgIElucHV0LFxuICAgIE5nTW9kdWxlLFxuICAgIE9uRGVzdHJveSxcbiAgICBPbkluaXQsXG4gICAgT3V0cHV0LFxuICAgIFBMQVRGT1JNX0lELFxuICAgIFF1ZXJ5TGlzdCxcbiAgICBSZW5kZXJlcjIsXG4gICAgVGVtcGxhdGVSZWYsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uLFxuICAgIFZpZXdSZWYsXG4gICAgZWZmZWN0LFxuICAgIGZvcndhcmRSZWYsXG4gICAgc2lnbmFsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IE1lbnVJdGVtLCBPdmVybGF5U2VydmljZSwgUHJpbWVOR0NvbmZpZywgUHJpbWVUZW1wbGF0ZSwgU2hhcmVkTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgRG9tSGFuZGxlciB9IGZyb20gJ3ByaW1lbmcvZG9tJztcbmltcG9ydCB7IEFuZ2xlUmlnaHRJY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy9hbmdsZXJpZ2h0JztcbmltcG9ydCB7IFJpcHBsZU1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvcmlwcGxlJztcbmltcG9ydCB7IFRvb2x0aXBNb2R1bGUgfSBmcm9tICdwcmltZW5nL3Rvb2x0aXAnO1xuaW1wb3J0IHsgT2JqZWN0VXRpbHMsIFVuaXF1ZUNvbXBvbmVudElkLCBaSW5kZXhVdGlscyB9IGZyb20gJ3ByaW1lbmcvdXRpbHMnO1xuaW1wb3J0IHsgTnVsbGFibGUsIFZvaWRMaXN0ZW5lciB9IGZyb20gJ3ByaW1lbmcvdHMtaGVscGVycyc7XG5pbXBvcnQgeyBDYXJldExlZnRJY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy9jYXJldGxlZnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Atc2xpZGVNZW51U3ViJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8dWxcbiAgICAgICAgICAgICNzdWJsaXN0XG4gICAgICAgICAgICByb2xlPVwibWVudVwiXG4gICAgICAgICAgICBbbmdDbGFzc109XCJ7ICdwLXN1Ym1lbnUtbGlzdCc6ICFyb290LCAncC1zbGlkZW1lbnUtcm9vdC1saXN0Jzogcm9vdCwgJ3AtYWN0aXZlLXN1Ym1lbnUnOiBpc0FjdGl2ZSB9XCJcbiAgICAgICAgICAgIFtpZF09XCJtZW51SWQgKyAnX2xpc3QnXCJcbiAgICAgICAgICAgIFtzdHlsZS53aWR0aC5weF09XCJtZW51V2lkdGhcIlxuICAgICAgICAgICAgW3N0eWxlLmxlZnQucHhdPVwicm9vdCA/IHNsaWRlTWVudS5sZWZ0IDogc2xpZGVNZW51Lm1lbnVXaWR0aFwiXG4gICAgICAgICAgICBbc3R5bGUudHJhbnNpdGlvblByb3BlcnR5XT1cInJvb3QgPyAnbGVmdCcgOiAnbm9uZSdcIlxuICAgICAgICAgICAgW3N0eWxlLnRyYW5zaXRpb25EdXJhdGlvbl09XCJlZmZlY3REdXJhdGlvbiArICdtcydcIlxuICAgICAgICAgICAgW3N0eWxlLnRyYW5zaXRpb25UaW1pbmdGdW5jdGlvbl09XCJlYXNpbmdcIlxuICAgICAgICAgICAgW3RhYmluZGV4XT1cInRhYmluZGV4XCJcbiAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiYXJpYUxhYmVsXCJcbiAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxsZWRCeV09XCJhcmlhTGFiZWxsZWRCeVwiXG4gICAgICAgICAgICBbYXR0ci5hcmlhLWFyaWEtYWN0aXZlZGVzY2VuZGFudF09XCJmb2N1c2VkSXRlbUlkXCJcbiAgICAgICAgICAgIFthdHRyLmFyaWEtb3JpZW50YXRpb25dPVwiJ3ZlcnRpY2FsJ1wiXG4gICAgICAgICAgICBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ21lbnUnXCJcbiAgICAgICAgICAgIChrZXlkb3duKT1cIm1lbnVLZXlkb3duLmVtaXQoJGV2ZW50KVwiXG4gICAgICAgICAgICAoZm9jdXNpbik9XCJtZW51Rm9jdXMuZW1pdCgkZXZlbnQpXCJcbiAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtc3RhdGVdPVwiaXNBY3RpdmUgPyAnYWN0aXZlJyA6ICdpbmFjdGl2ZSdcIlxuICAgICAgICA+XG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LXByb2Nlc3NlZEl0ZW0gW25nRm9yT2ZdPVwiaXRlbXNcIiBsZXQtaW5kZXg9XCJpbmRleFwiPlxuICAgICAgICAgICAgICAgIDxsaVxuICAgICAgICAgICAgICAgICAgICAqbmdJZj1cImlzSXRlbVZpc2libGUocHJvY2Vzc2VkSXRlbSkgJiYgZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ3NlcGFyYXRvcicpXCJcbiAgICAgICAgICAgICAgICAgICAgW2lkXT1cImdldEl0ZW1JZChwcm9jZXNzZWRJdGVtKVwiXG4gICAgICAgICAgICAgICAgICAgIFtzdHlsZV09XCJnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnc3R5bGUnKVwiXG4gICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cImdldFNlcGFyYXRvckl0ZW1DbGFzcyhwcm9jZXNzZWRJdGVtKVwiXG4gICAgICAgICAgICAgICAgICAgIHJvbGU9XCJzZXBhcmF0b3JcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ3NlcGFyYXRvcidcIlxuICAgICAgICAgICAgICAgID48L2xpPlxuICAgICAgICAgICAgICAgIDxsaVxuICAgICAgICAgICAgICAgICAgICAjbGlzdEl0ZW1cbiAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJpc0l0ZW1WaXNpYmxlKHByb2Nlc3NlZEl0ZW0pICYmICFnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnc2VwYXJhdG9yJylcIlxuICAgICAgICAgICAgICAgICAgICByb2xlPVwibWVudWl0ZW1cIlxuICAgICAgICAgICAgICAgICAgICBbaWRdPVwiZ2V0SXRlbUlkKHByb2Nlc3NlZEl0ZW0pXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidtZW51aXRlbSdcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLXAtaGlnaGxpZ2h0XT1cImlzSXRlbUFjdGl2ZShwcm9jZXNzZWRJdGVtKVwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcC1mb2N1c2VkXT1cImlzSXRlbUZvY3VzZWQocHJvY2Vzc2VkSXRlbSlcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLXAtZGlzYWJsZWRdPVwiaXNJdGVtRGlzYWJsZWQocHJvY2Vzc2VkSXRlbSlcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImdldEl0ZW1MYWJlbChwcm9jZXNzZWRJdGVtKVwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtZGlzYWJsZWRdPVwiaXNJdGVtRGlzYWJsZWQocHJvY2Vzc2VkSXRlbSkgfHwgdW5kZWZpbmVkXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1oYXNwb3B1cF09XCJpc0l0ZW1Hcm91cChwcm9jZXNzZWRJdGVtKSAmJiAhZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ3RvJykgPyAnbWVudScgOiB1bmRlZmluZWRcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWV4cGFuZGVkXT1cImlzSXRlbUdyb3VwKHByb2Nlc3NlZEl0ZW0pID8gaXNJdGVtQWN0aXZlKHByb2Nlc3NlZEl0ZW0pIDogdW5kZWZpbmVkXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sZXZlbF09XCJsZXZlbCArIDFcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLXNldHNpemVdPVwiZ2V0QXJpYVNldFNpemUoKVwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtcG9zaW5zZXRdPVwiZ2V0QXJpYVBvc0luc2V0KGluZGV4KVwiXG4gICAgICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdzdHlsZScpXCJcbiAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwiZ2V0SXRlbUNsYXNzKHByb2Nlc3NlZEl0ZW0pXCJcbiAgICAgICAgICAgICAgICAgICAgW2NsYXNzXT1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdzdHlsZUNsYXNzJylcIlxuICAgICAgICAgICAgICAgICAgICBwVG9vbHRpcFxuICAgICAgICAgICAgICAgICAgICBbdG9vbHRpcE9wdGlvbnNdPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ3Rvb2x0aXBPcHRpb25zJylcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ2NvbnRlbnQnXCIgY2xhc3M9XCJwLW1lbnVpdGVtLWNvbnRlbnRcIiAoY2xpY2spPVwib25JdGVtQ2xpY2soJGV2ZW50LCBwcm9jZXNzZWRJdGVtKVwiIChtb3VzZWVudGVyKT1cIml0ZW1Nb3VzZUVudGVyLmVtaXQoeyBvcmlnaW5hbEV2ZW50OiAkZXZlbnQsIHByb2Nlc3NlZEl0ZW0gfSlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCIhZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ3JvdXRlckxpbmsnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuaHJlZl09XCJnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAndXJsJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtaGlkZGVuXT1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtYXV0b21hdGlvbmlkXT1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdhdXRvbWF0aW9uSWQnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidhY3Rpb24nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGFyZ2V0XT1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICd0YXJnZXQnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyAncC1tZW51aXRlbS1saW5rJzogdHJ1ZSwgJ3AtZGlzYWJsZWQnOiBnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnZGlzYWJsZWQnKSB9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci50YWJpbmRleF09XCItMVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcFJpcHBsZVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ2ljb24nKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC1tZW51aXRlbS1pY29uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ2ljb24nKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdpY29uU3R5bGUnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInaWNvbidcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWhpZGRlbl09XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIudGFiaW5kZXhdPVwiLTFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnZXNjYXBlJyk7IGVsc2UgaHRtbExhYmVsXCIgY2xhc3M9XCJwLW1lbnVpdGVtLXRleHRcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ2xhYmVsJ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyBnZXRJdGVtTGFiZWwocHJvY2Vzc2VkSXRlbSkgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNodG1sTGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1tZW51aXRlbS10ZXh0XCIgW2lubmVySFRNTF09XCJnZXRJdGVtTGFiZWwocHJvY2Vzc2VkSXRlbSlcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ2xhYmVsJ1wiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1tZW51aXRlbS1iYWRnZVwiICpuZ0lmPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ2JhZGdlJylcIiBbbmdDbGFzc109XCJnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnYmFkZ2VTdHlsZUNsYXNzJylcIj57eyBnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnYmFkZ2UnKSB9fTwvc3Bhbj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJpc0l0ZW1Hcm91cChwcm9jZXNzZWRJdGVtKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QW5nbGVSaWdodEljb24gKm5nSWY9XCIhc2xpZGVNZW51LnN1Ym1lbnVJY29uVGVtcGxhdGVcIiBbc3R5bGVDbGFzc109XCIncC1zdWJtZW51LWljb24nXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidzdWJtZW51aWNvbidcIiBbYXR0ci5hcmlhLWhpZGRlbl09XCJ0cnVlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwic2xpZGVNZW51LnN1Ym1lbnVJY29uVGVtcGxhdGVcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ3N1Ym1lbnVpY29uJ1wiIFthdHRyLmFyaWEtaGlkZGVuXT1cInRydWVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAqbmdJZj1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdyb3V0ZXJMaW5rJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtyb3V0ZXJMaW5rXT1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdyb3V0ZXJMaW5rJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtYXV0b21hdGlvbmlkXT1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdhdXRvbWF0aW9uSWQnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIudGFiaW5kZXhdPVwiLTFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtaGlkZGVuXT1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInYWN0aW9uJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3F1ZXJ5UGFyYW1zXT1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdxdWVyeVBhcmFtcycpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcm91dGVyTGlua0FjdGl2ZV09XCIncC1tZW51aXRlbS1saW5rLWFjdGl2ZSdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtyb3V0ZXJMaW5rQWN0aXZlT3B0aW9uc109XCJnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAncm91dGVyTGlua0FjdGl2ZU9wdGlvbnMnKSB8fCB7IGV4YWN0OiBmYWxzZSB9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGFyZ2V0XT1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICd0YXJnZXQnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyAncC1tZW51aXRlbS1saW5rJzogdHJ1ZSwgJ3AtZGlzYWJsZWQnOiBnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnZGlzYWJsZWQnKSB9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZnJhZ21lbnRdPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ2ZyYWdtZW50JylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtxdWVyeVBhcmFtc0hhbmRsaW5nXT1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdxdWVyeVBhcmFtc0hhbmRsaW5nJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtwcmVzZXJ2ZUZyYWdtZW50XT1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdwcmVzZXJ2ZUZyYWdtZW50JylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtza2lwTG9jYXRpb25DaGFuZ2VdPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ3NraXBMb2NhdGlvbkNoYW5nZScpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcmVwbGFjZVVybF09XCJnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAncmVwbGFjZVVybCcpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc3RhdGVdPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ3N0YXRlJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBSaXBwbGVcbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqbmdJZj1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdpY29uJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInAtbWVudWl0ZW0taWNvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdpY29uJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdTdHlsZV09XCJnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnaWNvblN0eWxlJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ2ljb24nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1oaWRkZW5dPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLnRhYmluZGV4XT1cIi0xXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ2VzY2FwZScpOyBlbHNlIGh0bWxMYWJlbFwiIGNsYXNzPVwicC1tZW51aXRlbS10ZXh0XCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidsYWJlbCdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgZ2V0SXRlbUxhYmVsKHByb2Nlc3NlZEl0ZW0pIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjaHRtbExhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtbWVudWl0ZW0tdGV4dFwiIFtpbm5lckhUTUxdPVwiZ2V0SXRlbUxhYmVsKHByb2Nlc3NlZEl0ZW0pXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidsYWJlbCdcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtbWVudWl0ZW0tYmFkZ2VcIiAqbmdJZj1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdiYWRnZScpXCIgW25nQ2xhc3NdPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ2JhZGdlU3R5bGVDbGFzcycpXCI+e3sgZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ2JhZGdlJykgfX08L3NwYW4+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiaXNJdGVtR3JvdXAocHJvY2Vzc2VkSXRlbSlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEFuZ2xlUmlnaHRJY29uICpuZ0lmPVwiIXNsaWRlTWVudS5zdWJtZW51SWNvblRlbXBsYXRlXCIgW3N0eWxlQ2xhc3NdPVwiJ3Atc3VibWVudS1pY29uJ1wiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInc3VibWVudWljb24nXCIgW2F0dHIuYXJpYS1oaWRkZW5dPVwidHJ1ZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cInNsaWRlTWVudS5zdWJtZW51SWNvblRlbXBsYXRlXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidzdWJtZW51aWNvbidcIiBbYXR0ci5hcmlhLWhpZGRlbl09XCJ0cnVlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgPHAtc2xpZGVNZW51U3ViXG4gICAgICAgICAgICAgICAgICAgICAgICAqbmdJZj1cImlzSXRlbVZpc2libGUocHJvY2Vzc2VkSXRlbSkgJiYgaXNJdGVtR3JvdXAocHJvY2Vzc2VkSXRlbSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLXN1Ym1lbnVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2l0ZW1zXT1cInByb2Nlc3NlZEl0ZW0uaXRlbXNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2F1dG9EaXNwbGF5XT1cImF1dG9EaXNwbGF5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFttZW51SWRdPVwibWVudUlkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFthY3RpdmVJdGVtUGF0aF09XCJhY3RpdmVJdGVtUGF0aFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbZm9jdXNlZEl0ZW1JZF09XCJmb2N1c2VkSXRlbUlkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtsZXZlbF09XCJsZXZlbCArIDFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW21lbnVXaWR0aF09XCJtZW51V2lkdGhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKGl0ZW1DbGljayk9XCJpdGVtQ2xpY2suZW1pdCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChpdGVtTW91c2VFbnRlcik9XCJpdGVtTW91c2VFbnRlci5lbWl0KCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICA+PC9wLXNsaWRlTWVudVN1Yj5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPC91bD5cbiAgICBgLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ3AtZWxlbWVudCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIFNsaWRlTWVudVN1YiB7XG4gICAgQElucHV0KCkgaXRlbXM6IGFueVtdO1xuXG4gICAgQElucHV0KCkgbWVudVdpZHRoOiBudW1iZXI7XG5cbiAgICBASW5wdXQoKSByb290OiBib29sZWFuIHwgdW5kZWZpbmVkID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKSBlYXNpbmc6IHN0cmluZyA9ICdlYXNlLW91dCc7XG5cbiAgICBASW5wdXQoKSBlZmZlY3REdXJhdGlvbjogYW55O1xuXG4gICAgQElucHV0KCkgYXV0b0Rpc3BsYXk6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoKSBhdXRvWkluZGV4OiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIGJhc2VaSW5kZXg6IG51bWJlciA9IDA7XG5cbiAgICBASW5wdXQoKSBwb3B1cDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCgpIG1lbnVJZDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICAgQElucHV0KCkgYXJpYUxhYmVsOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoKSBhcmlhTGFiZWxsZWRCeTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICAgQElucHV0KCkgbGV2ZWw6IG51bWJlciA9IDA7XG5cbiAgICBASW5wdXQoKSBmb2N1c2VkSXRlbUlkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoKSBhY3RpdmVJdGVtUGF0aDogYW55W107XG5cbiAgICBASW5wdXQoKSB0YWJpbmRleDogbnVtYmVyID0gMDtcblxuICAgIEBPdXRwdXQoKSBpdGVtQ2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIGl0ZW1Nb3VzZUVudGVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBtZW51Rm9jdXM6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG1lbnVCbHVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBtZW51S2V5ZG93bjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAVmlld0NoaWxkKCdzdWJsaXN0JywgeyBzdGF0aWM6IHRydWUgfSkgc3VibGlzdFZpZXdDaGlsZDogRWxlbWVudFJlZjtcblxuICAgIGdldCBpc0FjdGl2ZSgpIHtcbiAgICAgICAgcmV0dXJuIC10aGlzLnNsaWRlTWVudS5sZWZ0ID09IHRoaXMubGV2ZWwgKiB0aGlzLm1lbnVXaWR0aDtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBEb2N1bWVudCwgcHVibGljIGVsOiBFbGVtZW50UmVmLCBwdWJsaWMgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBTbGlkZU1lbnUpKSBwdWJsaWMgc2xpZGVNZW51OiBTbGlkZU1lbnUpIHt9XG5cbiAgICBnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtOiBhbnksIG5hbWU6IHN0cmluZywgcGFyYW1zOiBhbnkgfCBudWxsID0gbnVsbCkge1xuICAgICAgICByZXR1cm4gcHJvY2Vzc2VkSXRlbSAmJiBwcm9jZXNzZWRJdGVtLml0ZW0gPyBPYmplY3RVdGlscy5nZXRJdGVtVmFsdWUocHJvY2Vzc2VkSXRlbS5pdGVtW25hbWVdLCBwYXJhbXMpIDogdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGdldEl0ZW1JZChwcm9jZXNzZWRJdGVtOiBhbnkpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gcHJvY2Vzc2VkSXRlbS5pdGVtICYmIHByb2Nlc3NlZEl0ZW0uaXRlbT8uaWQgPyBwcm9jZXNzZWRJdGVtLml0ZW0uaWQgOiBgJHt0aGlzLm1lbnVJZH1fJHtwcm9jZXNzZWRJdGVtLmtleX1gO1xuICAgIH1cblxuICAgIGdldEl0ZW1LZXkocHJvY2Vzc2VkSXRlbTogYW55KTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SXRlbUlkKHByb2Nlc3NlZEl0ZW0pO1xuICAgIH1cblxuICAgIGdldEl0ZW1DbGFzcyhwcm9jZXNzZWRJdGVtOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ2NsYXNzJyksXG4gICAgICAgICAgICAncC1tZW51aXRlbSc6IHRydWUsXG4gICAgICAgICAgICAncC1tZW51aXRlbS1hY3RpdmUnOiB0aGlzLmlzSXRlbUFjdGl2ZShwcm9jZXNzZWRJdGVtKSxcbiAgICAgICAgICAgICdwLWZvY3VzJzogdGhpcy5pc0l0ZW1Gb2N1c2VkKHByb2Nlc3NlZEl0ZW0pLFxuICAgICAgICAgICAgJ3AtZGlzYWJsZWQnOiB0aGlzLmlzSXRlbURpc2FibGVkKHByb2Nlc3NlZEl0ZW0pXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZ2V0SXRlbUxhYmVsKHByb2Nlc3NlZEl0ZW06IGFueSk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdsYWJlbCcpO1xuICAgIH1cblxuICAgIGdldFNlcGFyYXRvckl0ZW1DbGFzcyhwcm9jZXNzZWRJdGVtOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ2NsYXNzJyksXG4gICAgICAgICAgICAncC1tZW51aXRlbS1zZXBhcmF0b3InOiB0cnVlXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZ2V0QXJpYVNldFNpemUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLml0ZW1zLmZpbHRlcigocHJvY2Vzc2VkSXRlbSkgPT4gdGhpcy5pc0l0ZW1WaXNpYmxlKHByb2Nlc3NlZEl0ZW0pICYmICF0aGlzLmdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdzZXBhcmF0b3InKSkubGVuZ3RoO1xuICAgIH1cblxuICAgIGdldEFyaWFQb3NJbnNldChpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiBpbmRleCAtIHRoaXMuaXRlbXMuc2xpY2UoMCwgaW5kZXgpLmZpbHRlcigocHJvY2Vzc2VkSXRlbSkgPT4gdGhpcy5pc0l0ZW1WaXNpYmxlKHByb2Nlc3NlZEl0ZW0pICYmIHRoaXMuZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ3NlcGFyYXRvcicpKS5sZW5ndGggKyAxO1xuICAgIH1cblxuICAgIGlzSXRlbVZpc2libGUocHJvY2Vzc2VkSXRlbTogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICd2aXNpYmxlJykgIT09IGZhbHNlO1xuICAgIH1cblxuICAgIGlzSXRlbUFjdGl2ZShwcm9jZXNzZWRJdGVtOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMuYWN0aXZlSXRlbVBhdGgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFjdGl2ZUl0ZW1QYXRoLnNvbWUoKHBhdGgpID0+IHBhdGgua2V5ID09PSBwcm9jZXNzZWRJdGVtLmtleSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc0l0ZW1EaXNhYmxlZChwcm9jZXNzZWRJdGVtOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ2Rpc2FibGVkJyk7XG4gICAgfVxuXG4gICAgaXNJdGVtRm9jdXNlZChwcm9jZXNzZWRJdGVtOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9jdXNlZEl0ZW1JZCA9PT0gdGhpcy5nZXRJdGVtSWQocHJvY2Vzc2VkSXRlbSk7XG4gICAgfVxuXG4gICAgaXNJdGVtR3JvdXAocHJvY2Vzc2VkSXRlbTogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBPYmplY3RVdGlscy5pc05vdEVtcHR5KHByb2Nlc3NlZEl0ZW0uaXRlbXMpO1xuICAgIH1cblxuICAgIG9uSXRlbUNsaWNrKGV2ZW50OiBhbnksIHByb2Nlc3NlZEl0ZW06IGFueSkge1xuICAgICAgICB0aGlzLmdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdjb21tYW5kJywgeyBvcmlnaW5hbEV2ZW50OiBldmVudCwgaXRlbTogcHJvY2Vzc2VkSXRlbS5pdGVtIH0pO1xuICAgICAgICB0aGlzLml0ZW1DbGljay5lbWl0KHsgb3JpZ2luYWxFdmVudDogZXZlbnQsIHByb2Nlc3NlZEl0ZW0sIGlzRm9jdXM6IHRydWUgfSk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgb25NZW51S2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICB0aGlzLm1lbnVLZXlkb3duLmVtaXQoZXZlbnQpO1xuICAgIH1cbn1cbi8qKlxuICogU2xpZGVNZW51IGRpc3BsYXlzIHN1Ym1lbnVzIHdpdGggc2xpZGUgYW5pbWF0aW9uLlxuICogQGdyb3VwIENvbXBvbmVudHNcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLXNsaWRlTWVudScsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdlxuICAgICAgICAgICAgI2NvbnRhaW5lclxuICAgICAgICAgICAgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidyb290J1wiXG4gICAgICAgICAgICBbYXR0ci5kYXRhLXBjLW5hbWVdPVwiJ3NsaWRlbWVudSdcIlxuICAgICAgICAgICAgW2lkXT1cImlkXCJcbiAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsgJ3Atc2xpZGVtZW51IHAtY29tcG9uZW50JzogdHJ1ZSwgJ3Atc2xpZGVtZW51LW92ZXJsYXknOiBwb3B1cCB9XCJcbiAgICAgICAgICAgIFtjbGFzc109XCJzdHlsZUNsYXNzXCJcbiAgICAgICAgICAgIFtuZ1N0eWxlXT1cInN0eWxlXCJcbiAgICAgICAgICAgIChjbGljayk9XCJvbk92ZXJsYXlDbGljaygkZXZlbnQpXCJcbiAgICAgICAgICAgIFtAb3ZlcmxheUFuaW1hdGlvbl09XCJ7IHZhbHVlOiAndmlzaWJsZScsIHBhcmFtczogeyBzaG93VHJhbnNpdGlvblBhcmFtczogc2hvd1RyYW5zaXRpb25PcHRpb25zLCBoaWRlVHJhbnNpdGlvblBhcmFtczogaGlkZVRyYW5zaXRpb25PcHRpb25zIH0gfVwiXG4gICAgICAgICAgICBbQC5kaXNhYmxlZF09XCJwb3B1cCAhPT0gdHJ1ZVwiXG4gICAgICAgICAgICAoQG92ZXJsYXlBbmltYXRpb24uc3RhcnQpPVwib25PdmVybGF5QW5pbWF0aW9uU3RhcnQoJGV2ZW50KVwiXG4gICAgICAgICAgICAoQG92ZXJsYXlBbmltYXRpb24uZG9uZSk9XCJvbk92ZXJsYXlBbmltYXRpb25FbmQoJGV2ZW50KVwiXG4gICAgICAgICAgICAqbmdJZj1cIiFwb3B1cCB8fCB2aXNpYmxlXCJcbiAgICAgICAgPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtc2xpZGVtZW51LXdyYXBwZXJcIiBbc3R5bGUuaGVpZ2h0XT1cImxlZnQgPyB2aWV3cG9ydEhlaWdodCArICdweCcgOiAnYXV0bydcIiBbc3R5bGUud2lkdGhdPVwibWVudVdpZHRoICsgJ3B4J1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgI3NsaWRlTWVudUNvbnRlbnQgY2xhc3M9XCJwLXNsaWRlbWVudS1jb250ZW50XCIgKGZvY3VzKT1cImxvZ0ZvY3VzKCRldmVudCwgc2xpZGVNZW51Q29udGVudClcIj5cbiAgICAgICAgICAgICAgICAgICAgPHAtc2xpZGVNZW51U3ViXG4gICAgICAgICAgICAgICAgICAgICAgICAjcm9vdG1lbnVcbiAgICAgICAgICAgICAgICAgICAgICAgIFtyb290XT1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2l0ZW1zXT1cInByb2Nlc3NlZEl0ZW1zXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFttZW51SWRdPVwiaWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW3RhYmluZGV4XT1cIiFkaXNhYmxlZCA/IHRhYmluZGV4IDogLTFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2FyaWFMYWJlbF09XCJhcmlhTGFiZWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2FyaWFMYWJlbGxlZEJ5XT1cImFyaWFMYWJlbGxlZEJ5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtiYXNlWkluZGV4XT1cImJhc2VaSW5kZXhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2F1dG9aSW5kZXhdPVwiYXV0b1pJbmRleFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbYXV0b0Rpc3BsYXldPVwiYXV0b0Rpc3BsYXlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW21lbnVXaWR0aF09XCJtZW51V2lkdGhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW3BvcHVwXT1cInBvcHVwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtlZmZlY3REdXJhdGlvbl09XCJlZmZlY3REdXJhdGlvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbZWFzaW5nXT1cImVhc2luZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBbZm9jdXNlZEl0ZW1JZF09XCJmb2N1c2VkID8gZm9jdXNlZEl0ZW1JZCA6IHVuZGVmaW5lZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbYWN0aXZlSXRlbVBhdGhdPVwiYWN0aXZlSXRlbVBhdGgoKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAoaXRlbUNsaWNrKT1cIm9uSXRlbUNsaWNrKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKG1lbnVGb2N1cyk9XCJvbk1lbnVGb2N1cygkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChtZW51S2V5ZG93bik9XCJvbktleURvd24oJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAoaXRlbU1vdXNlRW50ZXIpPVwib25JdGVtTW91c2VFbnRlcigkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgPjwvcC1zbGlkZU1lbnVTdWI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGEgI2JhY2t3YXJkIGNsYXNzPVwicC1zbGlkZW1lbnUtYmFja3dhcmQgcC1tZW51aXRlbS1saW5rXCIgdGFiaW5kZXg9XCIwXCIgW3N0eWxlLmRpc3BsYXldPVwibGVmdCA/ICdibG9jaycgOiAnbm9uZSdcIiAoY2xpY2spPVwiZ29CYWNrKCRldmVudClcIiAoa2V5ZG93bik9XCJvbk5hdmlnYXRpb25LZXlEb3duKCRldmVudClcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ25hdmlnYXRpb24nXCI+XG4gICAgICAgICAgICAgICAgICAgIDxDYXJldExlZnRJY29uICpuZ0lmPVwiIWJhY2tJY29uVGVtcGxhdGVcIiBbc3R5bGVDbGFzc109XCIncC1zbGlkZW1lbnUtYmFja3dhcmQtaWNvbidcIiBbbmdTdHlsZV09XCJ7ICd2ZXJ0aWNhbC1hbGlnbic6ICdtaWRkbGUnIH1cIiAvPlxuICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJiYWNrSWNvblRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3sgYmFja0xhYmVsIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIGFuaW1hdGlvbnM6IFt0cmlnZ2VyKCdvdmVybGF5QW5pbWF0aW9uJywgW3RyYW5zaXRpb24oJzplbnRlcicsIFtzdHlsZSh7IG9wYWNpdHk6IDAsIHRyYW5zZm9ybTogJ3NjYWxlWSgwLjgpJyB9KSwgYW5pbWF0ZSgne3tzaG93VHJhbnNpdGlvblBhcmFtc319JyldKSwgdHJhbnNpdGlvbignOmxlYXZlJywgW2FuaW1hdGUoJ3t7aGlkZVRyYW5zaXRpb25QYXJhbXN9fScsIHN0eWxlKHsgb3BhY2l0eTogMCB9KSldKV0pXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHN0eWxlVXJsczogWycuL3NsaWRlbWVudS5jc3MnXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAncC1lbGVtZW50J1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgU2xpZGVNZW51IGltcGxlbWVudHMgT25Jbml0LCBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuICAgIC8qKlxuICAgICAqIEFuIGFycmF5IG9mIG1lbnVpdGVtcy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzZXQgbW9kZWwodmFsdWU6IE1lbnVJdGVtW10gfCB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5fbW9kZWwgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5fcHJvY2Vzc2VkSXRlbXMgPSB0aGlzLmNyZWF0ZVByb2Nlc3NlZEl0ZW1zKHRoaXMuX21vZGVsIHx8IFtdKTtcbiAgICB9XG4gICAgZ2V0IG1vZGVsKCk6IE1lbnVJdGVtW10gfCB1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gdGhpcy5fbW9kZWw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFdpZHRoIG9mIHRoZSBzdWJtZW51cy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBtZW51V2lkdGg6IG51bWJlciA9IDE5MDtcbiAgICAvKipcbiAgICAgKiBIZWlnaHQgb2YgdGhlIHNjcm9sbGFibGUgYXJlYSwgYSBzY3JvbGxiYXIgYXBwZWFycyBpZiBhIG1lbnUgaGVpZ2h0IGlzIGxvbmdlciB0aGFuIHRoaXMgdmFsdWUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgdmlld3BvcnRIZWlnaHQ6IG51bWJlciA9IDE4MDtcbiAgICAvKipcbiAgICAgKiBEdXJhdGlvbiBvZiB0aGUgc2xpZGluZyBhbmltYXRpb24gaW4gbWlsbGlzZWNvbmRzLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGVmZmVjdER1cmF0aW9uOiBhbnkgPSAyNTA7XG4gICAgLyoqXG4gICAgICogRWFzaW5nIGFuaW1hdGlvbiB0byB1c2UgZm9yIHNsaWRpbmcuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZWFzaW5nOiBzdHJpbmcgPSAnZWFzZS1vdXQnO1xuICAgIC8qKlxuICAgICAqIExhYmVsIG9mIGVsZW1lbnQgdG8gbmF2aWdhdGUgYmFjay5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBiYWNrTGFiZWw6IHN0cmluZyA9ICdCYWNrJztcbiAgICAvKipcbiAgICAgKiBXaGVuIHByZXNlbnQsIGl0IHNwZWNpZmllcyB0aGF0IHRoZSBjb21wb25lbnQgc2hvdWxkIGJlIGRpc2FibGVkLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogSW5kZXggb2YgdGhlIGVsZW1lbnQgaW4gdGFiYmluZyBvcmRlci5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB0YWJpbmRleDogbnVtYmVyID0gMDtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIGlmIG1lbnUgd291bGQgZGlzcGxheWVkIGFzIGEgcG9wdXAuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgcG9wdXA6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogSW5saW5lIHN0eWxlIG9mIHRoZSBjb21wb25lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc3R5bGU6IHsgW2tsYXNzOiBzdHJpbmddOiBhbnkgfSB8IG51bGwgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogU3R5bGUgY2xhc3Mgb2YgdGhlIGNvbXBvbmVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogVGFyZ2V0IGVsZW1lbnQgdG8gYXR0YWNoIHRoZSBvdmVybGF5LCB2YWxpZCB2YWx1ZXMgYXJlIFwiYm9keVwiIG9yIGEgbG9jYWwgbmctdGVtcGxhdGUgdmFyaWFibGUgb2YgYW5vdGhlciBlbGVtZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGFwcGVuZFRvOiBIVE1MRWxlbWVudCB8IEVsZW1lbnRSZWYgfCBUZW1wbGF0ZVJlZjxhbnk+IHwgc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZCB8IGFueTtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIGF1dG9tYXRpY2FsbHkgbWFuYWdlIGxheWVyaW5nLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGF1dG9aSW5kZXg6IGJvb2xlYW4gPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIEJhc2UgekluZGV4IHZhbHVlIHRvIHVzZSBpbiBsYXllcmluZy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBiYXNlWkluZGV4OiBudW1iZXIgPSAwO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gc2hvdyBhIHJvb3Qgc3VibWVudSBvbiBtb3VzZSBvdmVyLlxuICAgICAqIEBkZWZhdWx0VmFsdWUgdHJ1ZVxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGF1dG9EaXNwbGF5OiBib29sZWFuIHwgdW5kZWZpbmVkID0gdHJ1ZTtcbiAgICAvKipcbiAgICAgKiBUcmFuc2l0aW9uIG9wdGlvbnMgb2YgdGhlIHNob3cgYW5pbWF0aW9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHNob3dUcmFuc2l0aW9uT3B0aW9uczogc3RyaW5nID0gJy4xMnMgY3ViaWMtYmV6aWVyKDAsIDAsIDAuMiwgMSknO1xuICAgIC8qKlxuICAgICAqIFRyYW5zaXRpb24gb3B0aW9ucyBvZiB0aGUgaGlkZSBhbmltYXRpb24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgaGlkZVRyYW5zaXRpb25PcHRpb25zOiBzdHJpbmcgPSAnLjFzIGxpbmVhcic7XG4gICAgLyoqXG4gICAgICogQ3VycmVudCBpZCBzdGF0ZSBhcyBhIHN0cmluZy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBpZDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgYSBzdHJpbmcgdmFsdWUgdGhhdCBsYWJlbHMgYW4gaW50ZXJhY3RpdmUgZWxlbWVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBhcmlhTGFiZWw6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBJZGVudGlmaWVyIG9mIHRoZSB1bmRlcmx5aW5nIGlucHV0IGVsZW1lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgYXJpYUxhYmVsbGVkQnk6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBvdmVybGF5IG1lbnUgaXMgc2hvd24uXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uU2hvdzogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBvdmVybGF5IG1lbnUgaXMgaGlkZGVuLlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvbkhpZGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgICBAQ29udGVudENoaWxkcmVuKFByaW1lVGVtcGxhdGUpIHRlbXBsYXRlczogUXVlcnlMaXN0PFByaW1lVGVtcGxhdGU+IHwgdW5kZWZpbmVkO1xuXG4gICAgQFZpZXdDaGlsZCgncm9vdG1lbnUnKSByb290bWVudTogU2xpZGVNZW51U3ViIHwgdW5kZWZpbmVkO1xuXG4gICAgQFZpZXdDaGlsZCgnY29udGFpbmVyJykgY29udGFpbmVyVmlld0NoaWxkOiBFbGVtZW50UmVmPGFueT4gfCB1bmRlZmluZWQ7XG5cbiAgICBAVmlld0NoaWxkKCdiYWNrd2FyZCcpIHNldCBiYWNrd2FyZChlbGVtZW50OiBFbGVtZW50UmVmKSB7XG4gICAgICAgIHRoaXMuYmFja3dhcmRWaWV3Q2hpbGQgPSBlbGVtZW50O1xuICAgIH1cblxuICAgIEBWaWV3Q2hpbGQoJ3NsaWRlTWVudUNvbnRlbnQnKSBzbGlkZU1lbnVDb250ZW50Vmlld0NoaWxkOiBFbGVtZW50UmVmPGFueT4gfCB1bmRlZmluZWQ7XG5cbiAgICBzdWJtZW51SWNvblRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIGJhY2tJY29uVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBvdXRzaWRlQ2xpY2tMaXN0ZW5lcjogVm9pZExpc3RlbmVyO1xuXG4gICAgcmVzaXplTGlzdGVuZXI6IFZvaWRMaXN0ZW5lcjtcblxuICAgIHRyYW5zaXRpb25FbmRMaXN0ZW5lcjogVm9pZExpc3RlbmVyO1xuXG4gICAgdHJhbnNpdGlvblN0YXJ0TGlzdGVuZXI6IFZvaWRMaXN0ZW5lcjtcblxuICAgIGJhY2t3YXJkVmlld0NoaWxkOiBFbGVtZW50UmVmO1xuXG4gICAgdHJhbnNpdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgbGVmdDogbnVtYmVyID0gMDtcblxuICAgIGFuaW1hdGluZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgdGFyZ2V0OiBhbnk7XG5cbiAgICB2aXNpYmxlOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gICAgcmVsYXRpdmVBbGlnbjogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIHByaXZhdGUgd2luZG93OiBXaW5kb3c7XG5cbiAgICBmb2N1c2VkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBhY3RpdmVJdGVtUGF0aCA9IHNpZ25hbDxhbnk+KFtdKTtcblxuICAgIGZvY3VzZWRJdGVtSW5mbyA9IHNpZ25hbDxhbnk+KHsgaW5kZXg6IC0xLCBsZXZlbDogMCwgcGFyZW50S2V5OiAnJyB9KTtcblxuICAgIHNlYXJjaFZhbHVlOiBzdHJpbmcgPSAnJztcblxuICAgIHNlYXJjaFRpbWVvdXQ6IGFueTtcblxuICAgIF9wcm9jZXNzZWRJdGVtczogYW55W107XG5cbiAgICBfbW9kZWw6IE1lbnVJdGVtW10gfCB1bmRlZmluZWQ7XG5cbiAgICBjb250YWluZXI6IGFueTtcblxuICAgIGl0ZW1DbGljazogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgZ2V0IHZpc2libGVJdGVtcygpIHtcbiAgICAgICAgY29uc3QgcHJvY2Vzc2VkSXRlbSA9IHRoaXMuYWN0aXZlSXRlbVBhdGgoKS5maW5kKChwKSA9PiBwLmtleSA9PT0gdGhpcy5mb2N1c2VkSXRlbUluZm8oKS5wYXJlbnRLZXkpO1xuXG4gICAgICAgIHJldHVybiBwcm9jZXNzZWRJdGVtID8gcHJvY2Vzc2VkSXRlbS5pdGVtcyA6IHRoaXMucHJvY2Vzc2VkSXRlbXM7XG4gICAgfVxuXG4gICAgZ2V0IHByb2Nlc3NlZEl0ZW1zKCkge1xuICAgICAgICBpZiAoIXRoaXMuX3Byb2Nlc3NlZEl0ZW1zIHx8ICF0aGlzLl9wcm9jZXNzZWRJdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuX3Byb2Nlc3NlZEl0ZW1zID0gdGhpcy5jcmVhdGVQcm9jZXNzZWRJdGVtcyh0aGlzLm1vZGVsIHx8IFtdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fcHJvY2Vzc2VkSXRlbXM7XG4gICAgfVxuXG4gICAgZ2V0IGZvY3VzZWRJdGVtSWQoKSB7XG4gICAgICAgIGNvbnN0IGZvY3VzZWRJdGVtID0gdGhpcy5mb2N1c2VkSXRlbUluZm8oKTtcbiAgICAgICAgcmV0dXJuIGZvY3VzZWRJdGVtLml0ZW0gJiYgZm9jdXNlZEl0ZW0uaXRlbT8uaWQgPyBmb2N1c2VkSXRlbS5pdGVtLmlkIDogZm9jdXNlZEl0ZW0uaW5kZXggIT09IC0xID8gYCR7dGhpcy5pZH0ke09iamVjdFV0aWxzLmlzTm90RW1wdHkoZm9jdXNlZEl0ZW0ucGFyZW50S2V5KSA/ICdfJyArIGZvY3VzZWRJdGVtLnBhcmVudEtleSA6ICcnfV8ke2ZvY3VzZWRJdGVtLmluZGV4fWAgOiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBEb2N1bWVudCxcbiAgICAgICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBhbnksXG4gICAgICAgIHB1YmxpYyBlbDogRWxlbWVudFJlZixcbiAgICAgICAgcHVibGljIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgICAgIHB1YmxpYyBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIHB1YmxpYyBjb25maWc6IFByaW1lTkdDb25maWcsXG4gICAgICAgIHB1YmxpYyBvdmVybGF5U2VydmljZTogT3ZlcmxheVNlcnZpY2VcbiAgICApIHtcbiAgICAgICAgdGhpcy53aW5kb3cgPSB0aGlzLmRvY3VtZW50LmRlZmF1bHRWaWV3IGFzIFdpbmRvdztcbiAgICAgICAgZWZmZWN0KCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHBhdGggPSB0aGlzLmFjdGl2ZUl0ZW1QYXRoKCk7XG4gICAgICAgICAgICBpZiAodGhpcy5wb3B1cCkge1xuICAgICAgICAgICAgICAgIGlmIChPYmplY3RVdGlscy5pc05vdEVtcHR5KHBhdGgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmluZE91dHNpZGVDbGlja0xpc3RlbmVyKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmluZFJlc2l6ZUxpc3RlbmVyKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bmJpbmRPdXRzaWRlQ2xpY2tMaXN0ZW5lcigpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuYmluZFJlc2l6ZUxpc3RlbmVyKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkb2N1bWVudEZvY3VzTGlzdGVuZXI6IGFueTtcblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmlkID0gdGhpcy5pZCB8fCBVbmlxdWVDb21wb25lbnRJZCgpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChpdGVtLmdldFR5cGUoKSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2JhY2tpY29uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iYWNrSWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdzdWJtZW51aWNvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3VibWVudUljb25UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjcmVhdGVQcm9jZXNzZWRJdGVtcyhpdGVtczogYW55LCBsZXZlbDogbnVtYmVyID0gMCwgcGFyZW50OiBhbnkgPSB7fSwgcGFyZW50S2V5OiBhbnkgPSAnJykge1xuICAgICAgICBjb25zdCBwcm9jZXNzZWRJdGVtcyA9IFtdO1xuXG4gICAgICAgIGl0ZW1zICYmXG4gICAgICAgICAgICBpdGVtcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGtleSA9IChwYXJlbnRLZXkgIT09ICcnID8gcGFyZW50S2V5ICsgJ18nIDogJycpICsgaW5kZXg7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3SXRlbSA9IHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbSxcbiAgICAgICAgICAgICAgICAgICAgaW5kZXgsXG4gICAgICAgICAgICAgICAgICAgIGxldmVsLFxuICAgICAgICAgICAgICAgICAgICBrZXksXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudCxcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50S2V5XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIG5ld0l0ZW1bJ2l0ZW1zJ10gPSB0aGlzLmNyZWF0ZVByb2Nlc3NlZEl0ZW1zKGl0ZW0uaXRlbXMsIGxldmVsICsgMSwgbmV3SXRlbSwga2V5KTtcbiAgICAgICAgICAgICAgICBwcm9jZXNzZWRJdGVtcy5wdXNoKG5ld0l0ZW0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHByb2Nlc3NlZEl0ZW1zO1xuICAgIH1cblxuICAgIGdldEl0ZW1Qcm9wKGl0ZW06IGFueSwgbmFtZTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBpdGVtID8gT2JqZWN0VXRpbHMuZ2V0SXRlbVZhbHVlKGl0ZW1bbmFtZV0pIDogdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGdldFByb2NjZXNzZWRJdGVtTGFiZWwocHJvY2Vzc2VkSXRlbTogYW55KSB7XG4gICAgICAgIHJldHVybiBwcm9jZXNzZWRJdGVtID8gdGhpcy5nZXRJdGVtTGFiZWwocHJvY2Vzc2VkSXRlbS5pdGVtKSA6IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBnZXRJdGVtTGFiZWwoaXRlbTogYW55KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEl0ZW1Qcm9wKGl0ZW0sICdsYWJlbCcpO1xuICAgIH1cblxuICAgIGlzUHJvY2Vzc2VkSXRlbUdyb3VwKHByb2Nlc3NlZEl0ZW06IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gcHJvY2Vzc2VkSXRlbSAmJiBPYmplY3RVdGlscy5pc05vdEVtcHR5KHByb2Nlc3NlZEl0ZW0uaXRlbXMpO1xuICAgIH1cblxuICAgIGlzU2VsZWN0ZWQocHJvY2Vzc2VkSXRlbTogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmFjdGl2ZUl0ZW1QYXRoKCkuc29tZSgocCkgPT4gcC5rZXkgPT09IHByb2Nlc3NlZEl0ZW0ua2V5KTtcbiAgICB9XG5cbiAgICBpc1ZhbGlkU2VsZWN0ZWRJdGVtKHByb2Nlc3NlZEl0ZW06IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pc1ZhbGlkSXRlbShwcm9jZXNzZWRJdGVtKSAmJiB0aGlzLmlzU2VsZWN0ZWQocHJvY2Vzc2VkSXRlbSk7XG4gICAgfVxuXG4gICAgaXNWYWxpZEl0ZW0ocHJvY2Vzc2VkSXRlbTogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhIXByb2Nlc3NlZEl0ZW0gJiYgIXRoaXMuaXNJdGVtRGlzYWJsZWQocHJvY2Vzc2VkSXRlbS5pdGVtKSAmJiAhdGhpcy5pc0l0ZW1TZXBhcmF0b3IocHJvY2Vzc2VkSXRlbS5pdGVtKTtcbiAgICB9XG5cbiAgICBpc0l0ZW1EaXNhYmxlZChpdGVtOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SXRlbVByb3AoaXRlbSwgJ2Rpc2FibGVkJyk7XG4gICAgfVxuXG4gICAgaXNJdGVtU2VwYXJhdG9yKGl0ZW06IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRJdGVtUHJvcChpdGVtLCAnc2VwYXJhdG9yJyk7XG4gICAgfVxuXG4gICAgaXNJdGVtTWF0Y2hlZChwcm9jZXNzZWRJdGVtOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNWYWxpZEl0ZW0ocHJvY2Vzc2VkSXRlbSkgJiYgdGhpcy5nZXRQcm9jY2Vzc2VkSXRlbUxhYmVsKHByb2Nlc3NlZEl0ZW0pLnRvTG9jYWxlTG93ZXJDYXNlKCkuc3RhcnRzV2l0aCh0aGlzLnNlYXJjaFZhbHVlLnRvTG9jYWxlTG93ZXJDYXNlKCkpO1xuICAgIH1cblxuICAgIGlzUHJvY2Nlc3NlZEl0ZW1Hcm91cChwcm9jZXNzZWRJdGVtOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHByb2Nlc3NlZEl0ZW0gJiYgT2JqZWN0VXRpbHMuaXNOb3RFbXB0eShwcm9jZXNzZWRJdGVtLml0ZW1zKTtcbiAgICB9XG5cbiAgICBvbk92ZXJsYXlDbGljayhldmVudDogTW91c2VFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5wb3B1cCkge1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5U2VydmljZS5hZGQoe1xuICAgICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgIHRhcmdldDogdGhpcy5lbC5uYXRpdmVFbGVtZW50XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdvQmFjayhldmVudCkge1xuICAgICAgICB0aGlzLmFuaW1hdGUoJ2xlZnQnKTtcblxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvbkl0ZW1DbGljayhldmVudDogYW55KSB7XG4gICAgICAgIGlmICh0aGlzLnRyYW5zaXRpb24pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5pdGVtQ2xpY2spIHtcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1DbGljayA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5vbk1lbnVGb2N1cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgeyBvcmlnaW5hbEV2ZW50LCBwcm9jZXNzZWRJdGVtIH0gPSBldmVudDtcbiAgICAgICAgICAgIGNvbnN0IGdyb3VwZWQgPSB0aGlzLmlzUHJvY2Vzc2VkSXRlbUdyb3VwKHByb2Nlc3NlZEl0ZW0pO1xuICAgICAgICAgICAgY29uc3QgZm9jdXNlZEl0ZW1JbmZvID0gdGhpcy5mb2N1c2VkSXRlbUluZm8oKTtcblxuICAgICAgICAgICAgaWYgKGdyb3VwZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZvY3VzZWRJdGVtSW5mby5zZXQoeyAuLi5mb2N1c2VkSXRlbUluZm8sIGluZGV4OiAtMSwgbGV2ZWw6IGZvY3VzZWRJdGVtSW5mby5sZXZlbCArIDEsIHBhcmVudEtleTogcHJvY2Vzc2VkSXRlbS5rZXksIGl0ZW06IHByb2Nlc3NlZEl0ZW0uaXRlbSB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGUoJ3JpZ2h0Jyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMub25JdGVtQ2hhbmdlKGV2ZW50KTtcbiAgICAgICAgICAgICAgICB0aGlzLnBvcHVwICYmIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25JdGVtTW91c2VFbnRlcihldmVudDogYW55KSB7XG4gICAgICAgIHRoaXMub25JdGVtQ2hhbmdlKGV2ZW50KTtcbiAgICB9XG5cbiAgICBvbktleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLnRyYW5zaXRpb24pIHtcbiAgICAgICAgICAgIGNvbnN0IG1ldGFLZXkgPSBldmVudC5tZXRhS2V5IHx8IGV2ZW50LmN0cmxLZXk7XG4gICAgICAgICAgICBzd2l0Y2ggKGV2ZW50LmNvZGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uQXJyb3dEb3duS2V5KGV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkFycm93VXBLZXkoZXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ0Fycm93TGVmdCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25BcnJvd0xlZnRLZXkoZXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uQXJyb3dSaWdodEtleShldmVudCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnSG9tZSc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25Ib21lS2V5KGV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdFbmQnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uRW5kS2V5KGV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdTcGFjZSc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25TcGFjZUtleShldmVudCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uRW50ZXJLZXkoZXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ0VzY2FwZSc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25Fc2NhcGVLZXkoZXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ1RhYic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25UYWJLZXkoZXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ1BhZ2VEb3duJzpcbiAgICAgICAgICAgICAgICBjYXNlICdQYWdlVXAnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ0JhY2tzcGFjZSc6XG4gICAgICAgICAgICAgICAgY2FzZSAnU2hpZnRMZWZ0JzpcbiAgICAgICAgICAgICAgICBjYXNlICdTaGlmdFJpZ2h0JzpcbiAgICAgICAgICAgICAgICAgICAgLy9OT09QXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFtZXRhS2V5ICYmIE9iamVjdFV0aWxzLmlzUHJpbnRhYmxlQ2hhcmFjdGVyKGV2ZW50LmtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoSXRlbXMoZXZlbnQsIGV2ZW50LmtleSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uTmF2aWdhdGlvbktleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC5jb2RlKSB7XG4gICAgICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgICAgICBjYXNlICdTcGFjZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkFycm93TGVmdEtleShldmVudCk7XG4gICAgICAgICAgICAgICAgY29uc3QgZm9jdXNlZEl0ZW1JbmZvID0gdGhpcy5mb2N1c2VkSXRlbUluZm8oKTtcbiAgICAgICAgICAgICAgICB0aGlzLmZvY3VzZWRJdGVtSW5mby5zZXQoe1xuICAgICAgICAgICAgICAgICAgICAuLi5mb2N1c2VkSXRlbUluZm8sXG4gICAgICAgICAgICAgICAgICAgIGluZGV4OiAtMSxcbiAgICAgICAgICAgICAgICAgICAgaXRlbTogbnVsbFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFuaW1hdGUodG86IHN0cmluZykge1xuICAgICAgICBzd2l0Y2ggKHRvKSB7XG4gICAgICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgICAgICAgdGhpcy5sZWZ0IC09IHRoaXMubWVudVdpZHRoO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgICAgICAgdGhpcy5sZWZ0ICs9IHRoaXMubWVudVdpZHRoO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hbmltYXRpbmcgPSB0cnVlO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+ICh0aGlzLmFuaW1hdGluZyA9IGZhbHNlKSwgdGhpcy5lZmZlY3REdXJhdGlvbik7XG4gICAgfVxuXG4gICAgb25BcnJvd0Rvd25LZXkoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgY29uc3QgaXRlbUluZGV4ID0gdGhpcy5mb2N1c2VkSXRlbUluZm8oKS5pbmRleCAhPT0gLTEgPyB0aGlzLmZpbmROZXh0SXRlbUluZGV4KHRoaXMuZm9jdXNlZEl0ZW1JbmZvKCkuaW5kZXgpIDogdGhpcy5maW5kRmlyc3RGb2N1c2VkSXRlbUluZGV4KCk7XG5cbiAgICAgICAgdGhpcy5jaGFuZ2VGb2N1c2VkSXRlbUluZGV4KGV2ZW50LCBpdGVtSW5kZXgpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIG9uQXJyb3dSaWdodEtleShldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBjb25zdCBmb2N1c2VkSXRlbUluZm8gPSB0aGlzLmZvY3VzZWRJdGVtSW5mbygpO1xuXG4gICAgICAgIGlmIChmb2N1c2VkSXRlbUluZm8uaW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICBmb2N1c2VkSXRlbUluZm8uaW5kZXggPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcHJvY2Vzc2VkSXRlbSA9IHRoaXMudmlzaWJsZUl0ZW1zW3RoaXMuZm9jdXNlZEl0ZW1JbmZvKCkuaW5kZXhdO1xuICAgICAgICBjb25zdCBncm91cGVkID0gdGhpcy5pc1Byb2NjZXNzZWRJdGVtR3JvdXAocHJvY2Vzc2VkSXRlbSk7XG4gICAgICAgIGlmIChncm91cGVkKSB7XG4gICAgICAgICAgICBsZXQgeyBpbmRleCwgbGV2ZWwsIGtleSwgaXRlbSB9ID0gcHJvY2Vzc2VkSXRlbTtcbiAgICAgICAgICAgIHRoaXMub25JdGVtQ2hhbmdlKHsgb3JpZ2luYWxFdmVudDogZXZlbnQsIHByb2Nlc3NlZEl0ZW0gfSk7XG4gICAgICAgICAgICB0aGlzLmZvY3VzZWRJdGVtSW5mby5zZXQoeyBpbmRleDogMCwgbGV2ZWw6IGxldmVsLCBwYXJlbnRLZXk6IGtleSB9KTtcblxuICAgICAgICAgICAgdGhpcy5zZWFyY2hWYWx1ZSA9ICcnO1xuICAgICAgICAgICAgdGhpcy5hbmltYXRlKCdyaWdodCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvbkFycm93VXBLZXkoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LmFsdEtleSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZm9jdXNlZEl0ZW1JbmZvKCkuaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvY2Vzc2VkSXRlbSA9IHRoaXMudmlzaWJsZUl0ZW1zW3RoaXMuZm9jdXNlZEl0ZW1JbmZvKCkuaW5kZXhdO1xuICAgICAgICAgICAgICAgIGNvbnN0IGdyb3VwZWQgPSB0aGlzLmlzUHJvY2Nlc3NlZEl0ZW1Hcm91cChwcm9jZXNzZWRJdGVtKTtcblxuICAgICAgICAgICAgICAgICFncm91cGVkICYmIHRoaXMub25JdGVtQ2hhbmdlKHsgb3JpZ2luYWxFdmVudDogZXZlbnQsIHByb2Nlc3NlZEl0ZW0gfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMucG9wdXAgJiYgdGhpcy5oaWRlKGV2ZW50LCB0cnVlKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBpdGVtSW5kZXggPSB0aGlzLmZvY3VzZWRJdGVtSW5mbygpLmluZGV4ICE9PSAtMSA/IHRoaXMuZmluZFByZXZJdGVtSW5kZXgodGhpcy5mb2N1c2VkSXRlbUluZm8oKS5pbmRleCkgOiB0aGlzLmZpbmRMYXN0Rm9jdXNlZEl0ZW1JbmRleCgpO1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VGb2N1c2VkSXRlbUluZGV4KGV2ZW50LCBpdGVtSW5kZXgpO1xuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25BcnJvd0xlZnRLZXkoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgY29uc3QgZm9jdXNlZEl0ZW1JbmZvID0gdGhpcy5mb2N1c2VkSXRlbUluZm8oKTtcbiAgICAgICAgaWYgKGZvY3VzZWRJdGVtSW5mby5pbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgIGZvY3VzZWRJdGVtSW5mby5pbmRleCA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwcm9jZXNzZWRJdGVtID0gdGhpcy52aXNpYmxlSXRlbXNbZm9jdXNlZEl0ZW1JbmZvLmluZGV4XTtcbiAgICAgICAgY29uc3QgcGFyZW50SXRlbSA9IHRoaXMuYWN0aXZlSXRlbVBhdGgoKS5maW5kKChwKSA9PiBwLmtleSA9PT0gcHJvY2Vzc2VkSXRlbS5wYXJlbnRLZXkpO1xuICAgICAgICBjb25zdCByb290ID0gT2JqZWN0VXRpbHMuaXNFbXB0eShwcm9jZXNzZWRJdGVtLnBhcmVudCk7XG5cbiAgICAgICAgaWYgKCFyb290KSB7XG4gICAgICAgICAgICBsZXQgeyBsZXZlbCwgaW5kZXgsIHBhcmVudEtleSB9ID0gcGFyZW50SXRlbTtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNlZEl0ZW1JbmZvLnNldCh7IGluZGV4LCBsZXZlbCwgcGFyZW50S2V5LCBpdGVtOiBwYXJlbnRJdGVtLml0ZW0gfSk7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaFZhbHVlID0gJyc7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBhY3RpdmVJdGVtUGF0aCA9IHRoaXMuYWN0aXZlSXRlbVBhdGgoKS5maWx0ZXIoKHApID0+IHAucGFyZW50S2V5ICE9PSBmb2N1c2VkSXRlbUluZm8ucGFyZW50S2V5KTtcbiAgICAgICAgdGhpcy5hY3RpdmVJdGVtUGF0aC5zZXQoYWN0aXZlSXRlbVBhdGgpO1xuICAgICAgICBwYXJlbnRJdGVtICYmIHRoaXMuYW5pbWF0ZSgnbGVmdCcpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIG9uSG9tZUtleShldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICB0aGlzLmNoYW5nZUZvY3VzZWRJdGVtSW5kZXgoZXZlbnQsIHRoaXMuZmluZEZpcnN0SXRlbUluZGV4KCkpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIG9uRW5kS2V5KGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIHRoaXMuY2hhbmdlRm9jdXNlZEl0ZW1JbmRleChldmVudCwgdGhpcy5maW5kTGFzdEl0ZW1JbmRleCgpKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvblNwYWNlS2V5KGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIHRoaXMub25FbnRlcktleShldmVudCk7XG4gICAgfVxuXG4gICAgb25Fc2NhcGVLZXkoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMucG9wdXApIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZShldmVudCwgdHJ1ZSk7XG4gICAgICAgICAgICBjb25zdCBmb2N1c2VkSXRlbUluZm8gPSB0aGlzLmZvY3VzZWRJdGVtSW5mbygpO1xuICAgICAgICAgICAgdGhpcy5mb2N1c2VkSXRlbUluZm8uc2V0KHtcbiAgICAgICAgICAgICAgICAuLi5mb2N1c2VkSXRlbUluZm8sXG4gICAgICAgICAgICAgICAgaW5kZXg6IHRoaXMuZmluZExhc3RGb2N1c2VkSXRlbUluZGV4KCksXG4gICAgICAgICAgICAgICAgaXRlbTogbnVsbFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblRhYktleShldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5iYWNrd2FyZFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnN0eWxlLmRpc3BsYXkgIT09ICdub25lJykge1xuICAgICAgICAgICAgdGhpcy5iYWNrd2FyZFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wb3B1cCAmJiAhdGhpcy5jb250YWluZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgfVxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIG9uRW50ZXJLZXkoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuZm9jdXNlZEl0ZW1JbmZvKCkuaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICBjb25zdCBwcm9jZXNzZWRJdGVtID0gdGhpcy52aXNpYmxlSXRlbXNbdGhpcy5mb2N1c2VkSXRlbUluZm8oKS5pbmRleF07XG4gICAgICAgICAgICBjb25zdCBncm91cGVkID0gdGhpcy5pc1Byb2NjZXNzZWRJdGVtR3JvdXAocHJvY2Vzc2VkSXRlbSk7XG5cbiAgICAgICAgICAgIGlmIChncm91cGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkFycm93UmlnaHRLZXkoZXZlbnQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMucm9vdG1lbnUuZWwubmF0aXZlRWxlbWVudCwgYGxpW2lkPVwiJHtgJHt0aGlzLmZvY3VzZWRJdGVtSWR9YH1cIl1gKTtcbiAgICAgICAgICAgICAgICBjb25zdCBhbmNob3JFbGVtZW50ID0gZWxlbWVudCAmJiBEb21IYW5kbGVyLmZpbmRTaW5nbGUoZWxlbWVudCwgJ2FbZGF0YS1wYy1zZWN0aW9uPVwiYWN0aW9uXCJdJyk7XG5cbiAgICAgICAgICAgICAgICBhbmNob3JFbGVtZW50ID8gYW5jaG9yRWxlbWVudC5jbGljaygpIDogZWxlbWVudCAmJiBlbGVtZW50LmNsaWNrKCk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBmb2N1c2VkSXRlbUluZm8gPSB0aGlzLmZvY3VzZWRJdGVtSW5mbygpO1xuICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNlZEl0ZW1JbmZvLnNldCh7XG4gICAgICAgICAgICAgICAgICAgIC4uLmZvY3VzZWRJdGVtSW5mbyxcbiAgICAgICAgICAgICAgICAgICAgaW5kZXg6IHByb2Nlc3NlZEl0ZW0uaW5kZXgsXG4gICAgICAgICAgICAgICAgICAgIGl0ZW06IHByb2Nlc3NlZEl0ZW0uaXRlbVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvbkl0ZW1DaGFuZ2UoZXZlbnQ6IGFueSkge1xuICAgICAgICBjb25zdCB7IHByb2Nlc3NlZEl0ZW0sIGlzRm9jdXMgfSA9IGV2ZW50O1xuICAgICAgICBpZiAoT2JqZWN0VXRpbHMuaXNFbXB0eShwcm9jZXNzZWRJdGVtKSkgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IHsgaW5kZXgsIGtleSwgbGV2ZWwsIHBhcmVudEtleSwgaXRlbXMsIGl0ZW0gfSA9IHByb2Nlc3NlZEl0ZW07XG4gICAgICAgIGNvbnN0IGdyb3VwZWQgPSBPYmplY3RVdGlscy5pc05vdEVtcHR5KGl0ZW1zKTtcbiAgICAgICAgY29uc3QgYWN0aXZlSXRlbVBhdGggPSB0aGlzLmFjdGl2ZUl0ZW1QYXRoKCkuZmlsdGVyKChwKSA9PiBwLnBhcmVudEtleSAhPT0gcGFyZW50S2V5ICYmIHAucGFyZW50S2V5ICE9PSBrZXkpO1xuXG4gICAgICAgIGdyb3VwZWQgJiYgYWN0aXZlSXRlbVBhdGgucHVzaChwcm9jZXNzZWRJdGVtKTtcbiAgICAgICAgdGhpcy5mb2N1c2VkSXRlbUluZm8uc2V0KHsgaW5kZXgsIGxldmVsLCBwYXJlbnRLZXksIGl0ZW0gfSk7XG4gICAgICAgIHRoaXMuYWN0aXZlSXRlbVBhdGguc2V0KGFjdGl2ZUl0ZW1QYXRoKTtcbiAgICAgICAgaXNGb2N1cyAmJiBEb21IYW5kbGVyLmZvY3VzKHRoaXMucm9vdG1lbnUuc3VibGlzdFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG5cbiAgICBvbk1lbnVGb2N1cygpIHtcbiAgICAgICAgdGhpcy5mb2N1c2VkID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLmJpbmRPdXRzaWRlQ2xpY2tMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLmJpbmRUcmFuc2l0aW9uTGlzdGVuZXJzKCk7XG5cbiAgICAgICAgaWYgKCF0aGlzLmxlZnQgJiYgdGhpcy5mb2N1c2VkSXRlbUluZm8oKS5sZXZlbCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNlZEl0ZW1JbmZvLnNldCh7IGluZGV4OiAwLCBsZXZlbDogMCwgcGFyZW50S2V5OiAnJywgaXRlbTogdGhpcy5maW5kVmlzaWJsZUl0ZW0oMCkuaXRlbSB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmZvY3VzZWRJdGVtSW5mbygpLmluZGV4ID09PSAtMSAmJiB0aGlzLmxlZnQgPCAwKSB7XG4gICAgICAgICAgICB0aGlzLmZvY3VzZWRJdGVtSW5mby5zZXQoeyAuLi50aGlzLmZvY3VzZWRJdGVtSW5mbygpLCBpbmRleDogMCB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmZvY3VzZWRJdGVtSW5mbygpLmluZGV4ID09PSAtMSAmJiAhdGhpcy5sZWZ0KSB7XG4gICAgICAgICAgICB0aGlzLmZvY3VzZWRJdGVtSW5mby5zZXQoeyBpbmRleDogMCwgbGV2ZWw6IDAsIHBhcmVudEtleTogJycsIGl0ZW06IHRoaXMuZmluZFZpc2libGVJdGVtKDApLml0ZW0gfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbk1lbnVCbHVyKCkge1xuICAgICAgICB0aGlzLmZvY3VzZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5wb3B1cCAmJiB0aGlzLmZvY3VzZWRJdGVtSW5mby5zZXQoeyBpbmRleDogLTEsIGxldmVsOiAwLCBwYXJlbnRLZXk6ICcnLCBpdGVtOiBudWxsIH0pO1xuICAgICAgICBpZiAoIXRoaXMucG9wdXApIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNlZEl0ZW1JbmZvLnNldCh7XG4gICAgICAgICAgICAgICAgLi4udGhpcy5mb2N1c2VkSXRlbUluZm8oKSxcbiAgICAgICAgICAgICAgICBpbmRleDogLTEsXG4gICAgICAgICAgICAgICAgaXRlbTogbnVsbFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZWFyY2hWYWx1ZSA9ICcnO1xuICAgICAgICAhdGhpcy5wb3B1cCAmJiB0aGlzLnVuYmluZE91dHNpZGVDbGlja0xpc3RlbmVyKCk7XG4gICAgfVxuXG4gICAgYWN0aXZlTGV2ZWwgPSBzaWduYWw8bnVtYmVyPigwKTtcblxuICAgIGJpbmRUcmFuc2l0aW9uTGlzdGVuZXJzKCkge1xuICAgICAgICBpZiAoIXRoaXMudHJhbnNpdGlvblN0YXJ0TGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMudHJhbnNpdGlvblN0YXJ0TGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLnJvb3RtZW51LnN1Ymxpc3RWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCwgJ3RyYW5zaXRpb25zdGFydCcsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudHJhbnNpdGlvbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy50cmFuc2l0aW9uRW5kTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMudHJhbnNpdGlvbkVuZExpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5yb290bWVudS5zdWJsaXN0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQsICd0cmFuc2l0aW9uZW5kJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgYWN0aXZlTWVudSA9IERvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLnJvb3RtZW51LmVsLm5hdGl2ZUVsZW1lbnQsIGB1bFtkYXRhLXBjLXN0YXRlPVwiYWN0aXZlXCJdYCk7XG4gICAgICAgICAgICAgICAgY29uc3QgYWN0aXZlTGV2ZWwgPSBEb21IYW5kbGVyLmdldEF0dHJpYnV0ZShhY3RpdmVNZW51LmZpcnN0RWxlbWVudENoaWxkLCAnYXJpYS1sZXZlbCcpIC0gMTtcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUxldmVsLnNldChhY3RpdmVMZXZlbCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMubGVmdCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvb3RtZW51LnN1Ymxpc3RWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFjdGl2ZUxldmVsID0gRG9tSGFuZGxlci5nZXRBdHRyaWJ1dGUoYWN0aXZlTWVudS5maXJzdEVsZW1lbnRDaGlsZCwgJ2FyaWEtbGV2ZWwnKSAtIDE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlTGV2ZWwuc2V0KGFjdGl2ZUxldmVsKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5mb2N1c2VkSXRlbUluZm8oKS5sZXZlbCA+IHRoaXMuYWN0aXZlTGV2ZWwoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld0FjdGl2ZUl0ZW1QYXRoID0gdGhpcy5hY3RpdmVJdGVtUGF0aCgpLnNsaWNlKDAsIHRoaXMuYWN0aXZlSXRlbVBhdGgoKS5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsYXN0QWN0aXZlUGFyZW50ID0gbmV3QWN0aXZlSXRlbVBhdGhbbmV3QWN0aXZlSXRlbVBhdGgubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvY3VzZWRJdGVtSW5mby5zZXQoeyBpbmRleDogLTEsIGxldmVsOiB0aGlzLmFjdGl2ZUxldmVsKCksIHBhcmVudEtleTogbGFzdEFjdGl2ZVBhcmVudC5rZXkgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUl0ZW1QYXRoLnNldChuZXdBY3RpdmVJdGVtUGF0aCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy50cmFuc2l0aW9uID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdW5iaW5kVHJhbnNpdGlvbkxpc3RlbmVycygpIHtcbiAgICAgICAgaWYgKHRoaXMudHJhbnNpdGlvbkVuZExpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLnRyYW5zaXRpb25FbmRMaXN0ZW5lcigpO1xuICAgICAgICAgICAgdGhpcy50cmFuc2l0aW9uRW5kTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMudHJhbnNpdGlvblN0YXJ0TGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMudHJhbnNpdGlvblN0YXJ0TGlzdGVuZXIoKTtcbiAgICAgICAgICAgIHRoaXMudHJhbnNpdGlvblN0YXJ0TGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25PdmVybGF5QW5pbWF0aW9uU3RhcnQoZXZlbnQ6IEFuaW1hdGlvbkV2ZW50KSB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQudG9TdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSAndmlzaWJsZSc6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucG9wdXApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIgPSBldmVudC5lbGVtZW50O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVPblRvcCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uU2hvdy5lbWl0KHt9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBlbmRPdmVybGF5KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWxpZ25PdmVybGF5KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmluZE91dHNpZGVDbGlja0xpc3RlbmVyKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmluZFJlc2l6ZUxpc3RlbmVyKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgRG9tSGFuZGxlci5mb2N1cyh0aGlzLnJvb3RtZW51LnN1Ymxpc3RWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsSW5WaWV3KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICd2b2lkJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uT3ZlcmxheUhpZGUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uSGlkZS5lbWl0KHt9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFsaWduT3ZlcmxheSgpIHtcbiAgICAgICAgaWYgKHRoaXMucmVsYXRpdmVBbGlnbikgRG9tSGFuZGxlci5yZWxhdGl2ZVBvc2l0aW9uKHRoaXMuY29udGFpbmVyLCB0aGlzLnRhcmdldCk7XG4gICAgICAgIGVsc2UgRG9tSGFuZGxlci5hYnNvbHV0ZVBvc2l0aW9uKHRoaXMuY29udGFpbmVyLCB0aGlzLnRhcmdldCk7XG4gICAgfVxuXG4gICAgb25PdmVybGF5QW5pbWF0aW9uRW5kKGV2ZW50OiBBbmltYXRpb25FdmVudCkge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LnRvU3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3ZvaWQnOlxuICAgICAgICAgICAgICAgIFpJbmRleFV0aWxzLmNsZWFyKGV2ZW50LmVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXBwZW5kT3ZlcmxheSgpIHtcbiAgICAgICAgaWYgKHRoaXMuYXBwZW5kVG8pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmFwcGVuZFRvID09PSAnYm9keScpIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5kb2N1bWVudC5ib2R5LCB0aGlzLmNvbnRhaW5lclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgICAgIGVsc2UgRG9tSGFuZGxlci5hcHBlbmRDaGlsZCh0aGlzLmNvbnRhaW5lciwgdGhpcy5hcHBlbmRUbyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXN0b3JlT3ZlcmxheUFwcGVuZCgpIHtcbiAgICAgICAgaWYgKHRoaXMuY29udGFpbmVyVmlld0NoaWxkICYmIHRoaXMuYXBwZW5kVG8pIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5lbC5uYXRpdmVFbGVtZW50LCB0aGlzLmNvbnRhaW5lcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtb3ZlT25Ub3AoKSB7XG4gICAgICAgIGlmICh0aGlzLmF1dG9aSW5kZXgpIHtcbiAgICAgICAgICAgIFpJbmRleFV0aWxzLnNldCgnbWVudScsIHRoaXMuY29udGFpbmVyLCB0aGlzLmJhc2VaSW5kZXggKyB0aGlzLmNvbmZpZy56SW5kZXgubWVudSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIaWRlcyB0aGUgcG9wdXAgbWVudS5cbiAgICAgKiBAZ3JvdXAgTWV0aG9kXG4gICAgICovXG4gICAgaGlkZShldmVudD8sIGlzRm9jdXM/OiBib29sZWFuKSB7XG4gICAgICAgIGlmICh0aGlzLnBvcHVwKSB7XG4gICAgICAgICAgICB0aGlzLm9uSGlkZS5lbWl0KHt9KTtcbiAgICAgICAgICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlzRm9jdXMgJiYgRG9tSGFuZGxlci5mb2N1cyh0aGlzLnRhcmdldCB8fCB0aGlzLnJvb3RtZW51LnN1Ymxpc3RWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVG9nZ2xlcyB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgcG9wdXAgbWVudS5cbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIEJyb3dzZXIgZXZlbnQuXG4gICAgICogQGdyb3VwIE1ldGhvZFxuICAgICAqL1xuICAgIHRvZ2dsZShldmVudDogYW55KSB7XG4gICAgICAgIHRoaXMudmlzaWJsZSA/IHRoaXMuaGlkZShldmVudCwgdHJ1ZSkgOiB0aGlzLnNob3coZXZlbnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERpc3BsYXlzIHRoZSBwb3B1cCBtZW51LlxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW4gLSBCcm93c2VyIGV2ZW50LlxuICAgICAqIEBncm91cCBNZXRob2RcbiAgICAgKi9cbiAgICBzaG93KGV2ZW50OiBhbnksIGlzRm9jdXM/KSB7XG4gICAgICAgIGlmICh0aGlzLnBvcHVwKSB7XG4gICAgICAgICAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy50YXJnZXQgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5mb2N1c2VkSXRlbUluZm8uc2V0KHsgaW5kZXg6IHRoaXMuZmluZEZpcnN0Rm9jdXNlZEl0ZW1JbmRleCgpLCBsZXZlbDogMCwgcGFyZW50S2V5OiAnJyB9KTtcblxuICAgICAgICBpZiAoIXRoaXMucG9wdXApIHtcbiAgICAgICAgICAgIGlzRm9jdXMgJiYgRG9tSGFuZGxlci5mb2N1cyh0aGlzLnJvb3RtZW51LnN1Ymxpc3RWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBzZWFyY2hJdGVtcyhldmVudDogYW55LCBjaGFyOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5zZWFyY2hWYWx1ZSA9ICh0aGlzLnNlYXJjaFZhbHVlIHx8ICcnKSArIGNoYXI7XG5cbiAgICAgICAgbGV0IGl0ZW1JbmRleCA9IC0xO1xuICAgICAgICBsZXQgbWF0Y2hlZCA9IGZhbHNlO1xuXG4gICAgICAgIGlmICh0aGlzLmZvY3VzZWRJdGVtSW5mbygpLmluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgaXRlbUluZGV4ID0gdGhpcy52aXNpYmxlSXRlbXMuc2xpY2UodGhpcy5mb2N1c2VkSXRlbUluZm8oKS5pbmRleCkuZmluZEluZGV4KChwcm9jZXNzZWRJdGVtKSA9PiB0aGlzLmlzSXRlbU1hdGNoZWQocHJvY2Vzc2VkSXRlbSkpO1xuICAgICAgICAgICAgaXRlbUluZGV4ID0gaXRlbUluZGV4ID09PSAtMSA/IHRoaXMudmlzaWJsZUl0ZW1zLnNsaWNlKDAsIHRoaXMuZm9jdXNlZEl0ZW1JbmZvKCkuaW5kZXgpLmZpbmRJbmRleCgocHJvY2Vzc2VkSXRlbSkgPT4gdGhpcy5pc0l0ZW1NYXRjaGVkKHByb2Nlc3NlZEl0ZW0pKSA6IGl0ZW1JbmRleCArIHRoaXMuZm9jdXNlZEl0ZW1JbmZvKCkuaW5kZXg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpdGVtSW5kZXggPSB0aGlzLnZpc2libGVJdGVtcy5maW5kSW5kZXgoKHByb2Nlc3NlZEl0ZW0pID0+IHRoaXMuaXNJdGVtTWF0Y2hlZChwcm9jZXNzZWRJdGVtKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXRlbUluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgbWF0Y2hlZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXRlbUluZGV4ID09PSAtMSAmJiB0aGlzLmZvY3VzZWRJdGVtSW5mbygpLmluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgaXRlbUluZGV4ID0gdGhpcy5maW5kRmlyc3RGb2N1c2VkSXRlbUluZGV4KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXRlbUluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VGb2N1c2VkSXRlbUluZGV4KGV2ZW50LCBpdGVtSW5kZXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuc2VhcmNoVGltZW91dCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuc2VhcmNoVGltZW91dCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNlYXJjaFRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoVmFsdWUgPSAnJztcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoVGltZW91dCA9IG51bGw7XG4gICAgICAgIH0sIDUwMCk7XG5cbiAgICAgICAgcmV0dXJuIG1hdGNoZWQ7XG4gICAgfVxuXG4gICAgZmluZFZpc2libGVJdGVtKGluZGV4KSB7XG4gICAgICAgIHJldHVybiBPYmplY3RVdGlscy5pc05vdEVtcHR5KHRoaXMudmlzaWJsZUl0ZW1zKSA/IHRoaXMudmlzaWJsZUl0ZW1zW2luZGV4XSA6IG51bGw7XG4gICAgfVxuXG4gICAgZmluZExhc3RGb2N1c2VkSXRlbUluZGV4KCkge1xuICAgICAgICBjb25zdCBzZWxlY3RlZEluZGV4ID0gdGhpcy5maW5kU2VsZWN0ZWRJdGVtSW5kZXgoKTtcbiAgICAgICAgcmV0dXJuIHNlbGVjdGVkSW5kZXggPCAwID8gdGhpcy5maW5kTGFzdEl0ZW1JbmRleCgpIDogc2VsZWN0ZWRJbmRleDtcbiAgICB9XG5cbiAgICBmaW5kTGFzdEl0ZW1JbmRleCgpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdFV0aWxzLmZpbmRMYXN0SW5kZXgodGhpcy52aXNpYmxlSXRlbXMsIChwcm9jZXNzZWRJdGVtKSA9PiB0aGlzLmlzVmFsaWRJdGVtKHByb2Nlc3NlZEl0ZW0pKTtcbiAgICB9XG5cbiAgICBmaW5kUHJldkl0ZW1JbmRleChpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IG1hdGNoZWRJdGVtSW5kZXggPSBpbmRleCA+IDAgPyBPYmplY3RVdGlscy5maW5kTGFzdEluZGV4KHRoaXMudmlzaWJsZUl0ZW1zLnNsaWNlKDAsIGluZGV4KSwgKHByb2Nlc3NlZEl0ZW0pID0+IHRoaXMuaXNWYWxpZEl0ZW0ocHJvY2Vzc2VkSXRlbSkpIDogLTE7XG5cbiAgICAgICAgcmV0dXJuIG1hdGNoZWRJdGVtSW5kZXggPiAtMSA/IG1hdGNoZWRJdGVtSW5kZXggOiBpbmRleDtcbiAgICB9XG5cbiAgICBmaW5kTmV4dEl0ZW1JbmRleChpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IG1hdGNoZWRJdGVtSW5kZXggPSBpbmRleCA8IHRoaXMudmlzaWJsZUl0ZW1zLmxlbmd0aCAtIDEgPyB0aGlzLnZpc2libGVJdGVtcy5zbGljZShpbmRleCArIDEpLmZpbmRJbmRleCgocHJvY2Vzc2VkSXRlbSkgPT4gdGhpcy5pc1ZhbGlkSXRlbShwcm9jZXNzZWRJdGVtKSkgOiAtMTtcblxuICAgICAgICByZXR1cm4gbWF0Y2hlZEl0ZW1JbmRleCA+IC0xID8gbWF0Y2hlZEl0ZW1JbmRleCArIGluZGV4ICsgMSA6IGluZGV4O1xuICAgIH1cblxuICAgIGZpbmRGaXJzdEZvY3VzZWRJdGVtSW5kZXgoKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkSW5kZXggPSB0aGlzLmZpbmRTZWxlY3RlZEl0ZW1JbmRleCgpO1xuXG4gICAgICAgIHJldHVybiBzZWxlY3RlZEluZGV4IDwgMCA/IHRoaXMuZmluZEZpcnN0SXRlbUluZGV4KCkgOiBzZWxlY3RlZEluZGV4O1xuICAgIH1cblxuICAgIGZpbmRGaXJzdEl0ZW1JbmRleCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmlzaWJsZUl0ZW1zLmZpbmRJbmRleCgocHJvY2Vzc2VkSXRlbSkgPT4gdGhpcy5pc1ZhbGlkSXRlbShwcm9jZXNzZWRJdGVtKSk7XG4gICAgfVxuXG4gICAgZmluZFNlbGVjdGVkSXRlbUluZGV4KCkge1xuICAgICAgICByZXR1cm4gdGhpcy52aXNpYmxlSXRlbXMuZmluZEluZGV4KChwcm9jZXNzZWRJdGVtKSA9PiB0aGlzLmlzVmFsaWRTZWxlY3RlZEl0ZW0ocHJvY2Vzc2VkSXRlbSkpO1xuICAgIH1cblxuICAgIGNoYW5nZUZvY3VzZWRJdGVtSW5kZXgoZXZlbnQ6IGFueSwgaW5kZXg6IG51bWJlcikge1xuICAgICAgICBpZiAodGhpcy5mb2N1c2VkSXRlbUluZm8oKS5pbmRleCAhPT0gaW5kZXgpIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNlZEl0ZW1JbmZvLnNldCh7IC4uLnRoaXMuZm9jdXNlZEl0ZW1JbmZvKCksIGluZGV4IH0pO1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxJblZpZXcoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNjcm9sbEluVmlldyhpbmRleDogbnVtYmVyID0gLTEpIHtcbiAgICAgICAgY29uc3QgaWQgPSBpbmRleCAhPT0gLTEgPyBgJHt0aGlzLmlkfV8ke2luZGV4fWAgOiB0aGlzLmZvY3VzZWRJdGVtSWQ7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUodGhpcy5yb290bWVudS5lbC5uYXRpdmVFbGVtZW50LCBgbGlbaWQ9XCIke2lkfVwiXWApO1xuXG4gICAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgICAgICBlbGVtZW50LnNjcm9sbEludG9WaWV3ICYmIGVsZW1lbnQuc2Nyb2xsSW50b1ZpZXcoeyBibG9jazogJ25lYXJlc3QnLCBpbmxpbmU6ICduZWFyZXN0JyB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJpbmRSZXNpemVMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5yZXNpemVMaXN0ZW5lcikge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzaXplTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLmRvY3VtZW50LmRlZmF1bHRWaWV3LCAncmVzaXplJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghRG9tSGFuZGxlci5pc1RvdWNoRGV2aWNlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZShldmVudCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJpbmRPdXRzaWRlQ2xpY2tMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5vdXRzaWRlQ2xpY2tMaXN0ZW5lcikge1xuICAgICAgICAgICAgICAgIHRoaXMub3V0c2lkZUNsaWNrTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLmRvY3VtZW50LCAnY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXNPdXRzaWRlQ29udGFpbmVyID0gdGhpcy5jb250YWluZXJWaWV3Q2hpbGQgJiYgIXRoaXMuY29udGFpbmVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXNPdXRzaWRlVGFyZ2V0ID0gdGhpcy5wb3B1cCA/ICEodGhpcy50YXJnZXQgJiYgKHRoaXMudGFyZ2V0ID09PSBldmVudC50YXJnZXQgfHwgdGhpcy50YXJnZXQuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkpIDogdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wb3B1cCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzT3V0c2lkZUNvbnRhaW5lciAmJiBpc091dHNpZGVUYXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uTWVudUJsdXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc091dHNpZGVDb250YWluZXIgJiYgaXNPdXRzaWRlVGFyZ2V0ICYmIHRoaXMuZm9jdXNlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25NZW51Qmx1cigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1bmJpbmRPdXRzaWRlQ2xpY2tMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKHRoaXMub3V0c2lkZUNsaWNrTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMub3V0c2lkZUNsaWNrTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIHRoaXMub3V0c2lkZUNsaWNrTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdW5iaW5kUmVzaXplTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnJlc2l6ZUxpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2l6ZUxpc3RlbmVyKCk7XG4gICAgICAgICAgICB0aGlzLnJlc2l6ZUxpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uT3ZlcmxheUhpZGUoKSB7XG4gICAgICAgIHRoaXMudW5iaW5kT3V0c2lkZUNsaWNrTGlzdGVuZXIoKTtcbiAgICAgICAgdGhpcy51bmJpbmRSZXNpemVMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLmxlZnQgPSAwO1xuXG4gICAgICAgIGlmICghKHRoaXMuY2QgYXMgVmlld1JlZikuZGVzdHJveWVkKSB7XG4gICAgICAgICAgICB0aGlzLnRhcmdldCA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jb250YWluZXIpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5wb3B1cCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuY29udGFpbmVyICYmIHRoaXMuYXV0b1pJbmRleCkge1xuICAgICAgICAgICAgICAgIFpJbmRleFV0aWxzLmNsZWFyKHRoaXMuY29udGFpbmVyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5yZXN0b3JlT3ZlcmxheUFwcGVuZCgpO1xuICAgICAgICAgICAgdGhpcy5vbk92ZXJsYXlIaWRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnVuYmluZFRyYW5zaXRpb25MaXN0ZW5lcnMoKTtcbiAgICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgUm91dGVyTW9kdWxlLCBSaXBwbGVNb2R1bGUsIFRvb2x0aXBNb2R1bGUsIEFuZ2xlUmlnaHRJY29uLCBTaGFyZWRNb2R1bGUsIENhcmV0TGVmdEljb25dLFxuICAgIGV4cG9ydHM6IFtTbGlkZU1lbnUsIFJvdXRlck1vZHVsZSwgVG9vbHRpcE1vZHVsZSwgU2hhcmVkTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtTbGlkZU1lbnUsIFNsaWRlTWVudVN1Yl1cbn0pXG5leHBvcnQgY2xhc3MgU2xpZGVNZW51TW9kdWxlIHt9XG4iXX0=