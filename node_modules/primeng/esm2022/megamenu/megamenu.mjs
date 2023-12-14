import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Inject, Input, NgModule, Output, PLATFORM_ID, ViewChild, ViewEncapsulation, effect, forwardRef, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { AngleDownIcon } from 'primeng/icons/angledown';
import { AngleRightIcon } from 'primeng/icons/angleright';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { ObjectUtils, UniqueComponentId } from 'primeng/utils';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/router";
import * as i3 from "primeng/ripple";
import * as i4 from "primeng/tooltip";
import * as i5 from "primeng/api";
export class MegaMenuSub {
    el;
    megaMenu;
    id;
    items;
    itemTemplate;
    menuId;
    ariaLabel;
    ariaLabelledBy;
    level = 0;
    focusedItemId;
    disabled = false;
    orientation;
    activeItem;
    submenu;
    tabindex = 0;
    root = false;
    itemClick = new EventEmitter();
    itemMouseEnter = new EventEmitter();
    menuFocus = new EventEmitter();
    menuBlur = new EventEmitter();
    menuKeydown = new EventEmitter();
    menubarViewChild;
    constructor(el, megaMenu) {
        this.el = el;
        this.megaMenu = megaMenu;
    }
    onItemClick(event, processedItem) {
        this.getItemProp(processedItem, 'command', { originalEvent: event, item: processedItem.item });
        this.itemClick.emit({ originalEvent: event, processedItem, isFocus: true });
    }
    getItemProp(processedItem, name, params = null) {
        return processedItem && processedItem.item ? ObjectUtils.getItemValue(processedItem.item[name], params) : undefined;
    }
    getItemId(processedItem) {
        return processedItem.item && processedItem.item?.id ? processedItem.item.id : `${this.menuId}_${processedItem.key}`;
    }
    getSubListId(processedItem) {
        return `${this.getItemId(processedItem)}_list`;
    }
    getItemClass(processedItem) {
        return {
            ...this.getItemProp(processedItem, 'class'),
            'p-menuitem': true,
            'p-menuitem-active p-highlight': this.isItemActive(processedItem),
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
    getColumnClass(processedItem) {
        let length = this.isItemGroup(processedItem) ? processedItem.items.length : 0;
        let columnClass;
        switch (length) {
            case 2:
                columnClass = 'p-megamenu-col-6';
                break;
            case 3:
                columnClass = 'p-megamenu-col-4';
                break;
            case 4:
                columnClass = 'p-megamenu-col-3';
                break;
            case 6:
                columnClass = 'p-megamenu-col-2';
                break;
            default:
                columnClass = 'p-megamenu-col-12';
                break;
        }
        return columnClass;
    }
    getSubmenuHeaderClass(processedItem) {
        return {
            'p-megamenu-submenu-header p-submenu-header': true,
            'p-disabled': this.isItemDisabled(processedItem),
            ...this.getItemProp(processedItem, 'class')
        };
    }
    isItemVisible(processedItem) {
        return this.getItemProp(processedItem, 'visible') !== false;
    }
    isItemActive(processedItem) {
        return ObjectUtils.isNotEmpty(this.activeItem) ? this.activeItem.key === processedItem.key : false;
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
    getAriaSetSize() {
        return this.items.filter((processedItem) => this.isItemVisible(processedItem) && !this.getItemProp(processedItem, 'separator')).length;
    }
    getAriaPosInset(index) {
        return index - this.items.slice(0, index).filter((processedItem) => this.isItemVisible(processedItem) && this.getItemProp(processedItem, 'separator')).length + 1;
    }
    onItemMouseEnter(param) {
        const { event, processedItem } = param;
        this.itemMouseEnter.emit({ originalEvent: event, processedItem });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: MegaMenuSub, deps: [{ token: i0.ElementRef }, { token: forwardRef(() => MegaMenu) }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.5", type: MegaMenuSub, selector: "p-megaMenuSub", inputs: { id: "id", items: "items", itemTemplate: "itemTemplate", menuId: "menuId", ariaLabel: "ariaLabel", ariaLabelledBy: "ariaLabelledBy", level: "level", focusedItemId: "focusedItemId", disabled: "disabled", orientation: "orientation", activeItem: "activeItem", submenu: "submenu", tabindex: "tabindex", root: "root" }, outputs: { itemClick: "itemClick", itemMouseEnter: "itemMouseEnter", menuFocus: "menuFocus", menuBlur: "menuBlur", menuKeydown: "menuKeydown" }, host: { classAttribute: "p-element" }, viewQueries: [{ propertyName: "menubarViewChild", first: true, predicate: ["menubar"], descendants: true, static: true }], ngImport: i0, template: `
        <ul
            #menubar
            [ngClass]="{ 'p-megamenu-root-list': root, 'p-submenu-list p-megamenu-submenu': !root }"
            [attr.role]="root ? 'menubar' : 'menu'"
            [attr.id]="id"
            [attr.aria-orientation]="orientation"
            [tabindex]="tabindex"
            [attr.aria-activedescendant]="focusedItemId"
            [attr.data-pc-section]="root ? 'root' : 'submenu'"
            (keydown)="menuKeydown.emit($event)"
            (focus)="menuFocus.emit($event)"
            (blur)="menuBlur.emit($event)"
        >
            <li *ngIf="submenu" [ngClass]="getSubmenuHeaderClass(submenu)" [style]="getItemProp(submenu, 'style')" role="presentation">{{ getItemLabel(submenu) }}</li>
            <ng-template ngFor let-processedItem [ngForOf]="items" let-index="index">
                <li
                    *ngIf="isItemVisible(processedItem) && getItemProp(processedItem, 'separator')"
                    [attr.id]="getItemId(processedItem)"
                    [style]="getItemProp(processedItem, 'style')"
                    [ngClass]="getSeparatorItemClass(processedItem)"
                    role="separator"
                    [attr.data-pc-section]="'separator'"
                ></li>
                <li
                    #listItem
                    *ngIf="isItemVisible(processedItem) && !getItemProp(processedItem, 'separator')"
                    role="menuitem"
                    [attr.id]="getItemId(processedItem)"
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
                    <div class="p-menuitem-content" [attr.data-pc-section]="'content'" (click)="onItemClick($event, processedItem)" (mouseenter)="onItemMouseEnter({$event, processedItem})">
                        <ng-container *ngIf="!itemTemplate">
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
                                    <ng-container *ngIf="!megaMenu.submenuIconTemplate">
                                        <AngleDownIcon [styleClass]="'p-submenu-icon'" [attr.data-pc-section]="'submenuicon'" *ngIf="orientation === 'horizontal'" [attr.aria-hidden]="true" />
                                        <AngleRightIcon [styleClass]="'p-submenu-icon'" [attr.data-pc-section]="'submenuicon'" *ngIf="orientation === 'vertical'" [attr.aria-hidden]="true" />
                                    </ng-container>
                                    <ng-template *ngTemplateOutlet="megaMenu.submenuIconTemplate" [attr.data-pc-section]="'submenuicon'" [attr.aria-hidden]="true"></ng-template>
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
                                    class="p-menuitem-icon"
                                    *ngIf="getItemProp(processedItem, 'icon')"
                                    [ngClass]="getItemProp(processedItem, 'icon')"
                                    [ngStyle]="getItemProp(processedItem, 'iconStyle')"
                                    [attr.data-pc-section]="'icon'"
                                    [attr.aria-hidden]="true"
                                    [attr.tabindex]="-1"
                                ></span>
                                <span class="p-menuitem-text" *ngIf="getItemProp(processedItem, 'escape'); else htmlRouteLabel">{{ getItemLabel(processedItem) }}</span>
                                <ng-template #htmlRouteLabel><span class="p-menuitem-text" [innerHTML]="getItemLabel(processedItem)" [attr.data-pc-section]="'label'"></span></ng-template>
                                <span class="p-menuitem-badge" *ngIf="getItemProp(processedItem, 'badge')" [ngClass]="getItemProp(processedItem, 'badgeStyleClass')">{{ getItemProp(processedItem, 'badge') }}</span>
                                <ng-container *ngIf="isItemGroup(processedItem)">
                                    <ng-container *ngIf="!megaMenu.submenuIconTemplate">
                                        <AngleDownIcon [styleClass]="'p-submenu-icon'" [attr.data-pc-section]="'submenuicon'" *ngIf="orientation === 'horizontal'" [attr.aria-hidden]="true" />
                                        <AngleRightIcon [styleClass]="'p-submenu-icon'" [attr.data-pc-section]="'submenuicon'" *ngIf="orientation === 'vertical'" [attr.aria-hidden]="true" />
                                    </ng-container>
                                    <ng-template *ngTemplateOutlet="megaMenu.submenuIconTemplate" [attr.data-pc-section]="'submenuicon'" [attr.aria-hidden]="true"></ng-template>
                                </ng-container>
                            </a>
                        </ng-container>
                        <ng-container *ngIf="itemTemplate">
                            <ng-template *ngTemplateOutlet="itemTemplate; context: { $implicit: processedItem.item }"></ng-template>
                        </ng-container>
                    </div>
                    <div *ngIf="isItemVisible(processedItem) && isItemGroup(processedItem)" class="p-megamenu-panel" [attr.data-pc-section]="'panel'">
                        <div class="p-megamenu-grid" [attr.data-pc-section]="'grid'">
                            <div *ngFor="let col of processedItem.items" [ngClass]="getColumnClass(processedItem)">
                                <p-megaMenuSub
                                    *ngFor="let submenu of col"
                                    [id]="getSubListId(submenu)"
                                    [submenu]="submenu"
                                    [items]="submenu.items"
                                    [itemTemplate]="itemTemplate"
                                    [menuId]="menuId"
                                    [focusedItemId]="focusedItemId"
                                    [level]="level + 1"
                                    [root]="false"
                                    (itemClick)="itemClick.emit($event)"
                                    (itemMouseEnter)="onItemMouseEnter($event)"
                                >
                                </p-megaMenuSub>
                            </div>
                        </div>
                    </div>
                </li>
            </ng-template>
        </ul>
    `, isInline: true, dependencies: [{ kind: "directive", type: i0.forwardRef(() => i1.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgForOf), selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgIf), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgStyle), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i0.forwardRef(() => i2.RouterLink), selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "directive", type: i0.forwardRef(() => i2.RouterLinkActive), selector: "[routerLinkActive]", inputs: ["routerLinkActiveOptions", "ariaCurrentWhenActive", "routerLinkActive"], outputs: ["isActiveChange"], exportAs: ["routerLinkActive"] }, { kind: "directive", type: i0.forwardRef(() => i3.Ripple), selector: "[pRipple]" }, { kind: "directive", type: i0.forwardRef(() => i4.Tooltip), selector: "[pTooltip]", inputs: ["tooltipPosition", "tooltipEvent", "appendTo", "positionStyle", "tooltipStyleClass", "tooltipZIndex", "escape", "showDelay", "hideDelay", "life", "positionTop", "positionLeft", "autoHide", "fitContent", "hideOnEscape", "pTooltip", "tooltipDisabled", "tooltipOptions"] }, { kind: "component", type: i0.forwardRef(() => AngleDownIcon), selector: "AngleDownIcon" }, { kind: "component", type: i0.forwardRef(() => AngleRightIcon), selector: "AngleRightIcon" }, { kind: "component", type: i0.forwardRef(() => MegaMenuSub), selector: "p-megaMenuSub", inputs: ["id", "items", "itemTemplate", "menuId", "ariaLabel", "ariaLabelledBy", "level", "focusedItemId", "disabled", "orientation", "activeItem", "submenu", "tabindex", "root"], outputs: ["itemClick", "itemMouseEnter", "menuFocus", "menuBlur", "menuKeydown"] }], encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: MegaMenuSub, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-megaMenuSub',
                    template: `
        <ul
            #menubar
            [ngClass]="{ 'p-megamenu-root-list': root, 'p-submenu-list p-megamenu-submenu': !root }"
            [attr.role]="root ? 'menubar' : 'menu'"
            [attr.id]="id"
            [attr.aria-orientation]="orientation"
            [tabindex]="tabindex"
            [attr.aria-activedescendant]="focusedItemId"
            [attr.data-pc-section]="root ? 'root' : 'submenu'"
            (keydown)="menuKeydown.emit($event)"
            (focus)="menuFocus.emit($event)"
            (blur)="menuBlur.emit($event)"
        >
            <li *ngIf="submenu" [ngClass]="getSubmenuHeaderClass(submenu)" [style]="getItemProp(submenu, 'style')" role="presentation">{{ getItemLabel(submenu) }}</li>
            <ng-template ngFor let-processedItem [ngForOf]="items" let-index="index">
                <li
                    *ngIf="isItemVisible(processedItem) && getItemProp(processedItem, 'separator')"
                    [attr.id]="getItemId(processedItem)"
                    [style]="getItemProp(processedItem, 'style')"
                    [ngClass]="getSeparatorItemClass(processedItem)"
                    role="separator"
                    [attr.data-pc-section]="'separator'"
                ></li>
                <li
                    #listItem
                    *ngIf="isItemVisible(processedItem) && !getItemProp(processedItem, 'separator')"
                    role="menuitem"
                    [attr.id]="getItemId(processedItem)"
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
                    <div class="p-menuitem-content" [attr.data-pc-section]="'content'" (click)="onItemClick($event, processedItem)" (mouseenter)="onItemMouseEnter({$event, processedItem})">
                        <ng-container *ngIf="!itemTemplate">
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
                                    <ng-container *ngIf="!megaMenu.submenuIconTemplate">
                                        <AngleDownIcon [styleClass]="'p-submenu-icon'" [attr.data-pc-section]="'submenuicon'" *ngIf="orientation === 'horizontal'" [attr.aria-hidden]="true" />
                                        <AngleRightIcon [styleClass]="'p-submenu-icon'" [attr.data-pc-section]="'submenuicon'" *ngIf="orientation === 'vertical'" [attr.aria-hidden]="true" />
                                    </ng-container>
                                    <ng-template *ngTemplateOutlet="megaMenu.submenuIconTemplate" [attr.data-pc-section]="'submenuicon'" [attr.aria-hidden]="true"></ng-template>
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
                                    class="p-menuitem-icon"
                                    *ngIf="getItemProp(processedItem, 'icon')"
                                    [ngClass]="getItemProp(processedItem, 'icon')"
                                    [ngStyle]="getItemProp(processedItem, 'iconStyle')"
                                    [attr.data-pc-section]="'icon'"
                                    [attr.aria-hidden]="true"
                                    [attr.tabindex]="-1"
                                ></span>
                                <span class="p-menuitem-text" *ngIf="getItemProp(processedItem, 'escape'); else htmlRouteLabel">{{ getItemLabel(processedItem) }}</span>
                                <ng-template #htmlRouteLabel><span class="p-menuitem-text" [innerHTML]="getItemLabel(processedItem)" [attr.data-pc-section]="'label'"></span></ng-template>
                                <span class="p-menuitem-badge" *ngIf="getItemProp(processedItem, 'badge')" [ngClass]="getItemProp(processedItem, 'badgeStyleClass')">{{ getItemProp(processedItem, 'badge') }}</span>
                                <ng-container *ngIf="isItemGroup(processedItem)">
                                    <ng-container *ngIf="!megaMenu.submenuIconTemplate">
                                        <AngleDownIcon [styleClass]="'p-submenu-icon'" [attr.data-pc-section]="'submenuicon'" *ngIf="orientation === 'horizontal'" [attr.aria-hidden]="true" />
                                        <AngleRightIcon [styleClass]="'p-submenu-icon'" [attr.data-pc-section]="'submenuicon'" *ngIf="orientation === 'vertical'" [attr.aria-hidden]="true" />
                                    </ng-container>
                                    <ng-template *ngTemplateOutlet="megaMenu.submenuIconTemplate" [attr.data-pc-section]="'submenuicon'" [attr.aria-hidden]="true"></ng-template>
                                </ng-container>
                            </a>
                        </ng-container>
                        <ng-container *ngIf="itemTemplate">
                            <ng-template *ngTemplateOutlet="itemTemplate; context: { $implicit: processedItem.item }"></ng-template>
                        </ng-container>
                    </div>
                    <div *ngIf="isItemVisible(processedItem) && isItemGroup(processedItem)" class="p-megamenu-panel" [attr.data-pc-section]="'panel'">
                        <div class="p-megamenu-grid" [attr.data-pc-section]="'grid'">
                            <div *ngFor="let col of processedItem.items" [ngClass]="getColumnClass(processedItem)">
                                <p-megaMenuSub
                                    *ngFor="let submenu of col"
                                    [id]="getSubListId(submenu)"
                                    [submenu]="submenu"
                                    [items]="submenu.items"
                                    [itemTemplate]="itemTemplate"
                                    [menuId]="menuId"
                                    [focusedItemId]="focusedItemId"
                                    [level]="level + 1"
                                    [root]="false"
                                    (itemClick)="itemClick.emit($event)"
                                    (itemMouseEnter)="onItemMouseEnter($event)"
                                >
                                </p-megaMenuSub>
                            </div>
                        </div>
                    </div>
                </li>
            </ng-template>
        </ul>
    `,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        class: 'p-element'
                    }
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: MegaMenu, decorators: [{
                    type: Inject,
                    args: [forwardRef(() => MegaMenu)]
                }] }], propDecorators: { id: [{
                type: Input
            }], items: [{
                type: Input
            }], itemTemplate: [{
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
            }], disabled: [{
                type: Input
            }], orientation: [{
                type: Input
            }], activeItem: [{
                type: Input
            }], submenu: [{
                type: Input
            }], tabindex: [{
                type: Input
            }], root: [{
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
            }], menubarViewChild: [{
                type: ViewChild,
                args: ['menubar', { static: true }]
            }] } });
/**
 * MegaMenu is navigation component that displays submenus together.
 * @group Components
 */
export class MegaMenu {
    document;
    platformId;
    el;
    renderer;
    config;
    cd;
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
     * Inline style of the element.
     * @group Props
     */
    style;
    /**
     * Class of the element.
     * @group Props
     */
    styleClass;
    /**
     * Defines the orientation.
     * @group Props
     */
    orientation = 'horizontal';
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
     * When present, it specifies that the component should be disabled.
     * @group Props
     */
    disabled = false;
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    tabindex = 0;
    templates;
    menubutton;
    rootmenu;
    startTemplate;
    endTemplate;
    menuIconTemplate;
    submenuIconTemplate;
    itemTemplate;
    outsideClickListener;
    resizeListener;
    dirty = false;
    focused = false;
    activeItem = signal(null);
    focusedItemInfo = signal({ index: -1, level: 0, parentKey: '', item: null });
    searchValue = '';
    searchTimeout;
    _processedItems;
    _model;
    get visibleItems() {
        const processedItem = ObjectUtils.isNotEmpty(this.activeItem()) ? this.activeItem() : null;
        return processedItem && processedItem.key === this.focusedItemInfo().parentKey
            ? processedItem.items.reduce((items, col) => {
                col.forEach((submenu) => {
                    submenu.items.forEach((a) => {
                        items.push(a);
                    });
                });
                return items;
            }, [])
            : this.processedItems;
    }
    get processedItems() {
        if (!this._processedItems || !this._processedItems.length) {
            this._processedItems = this.createProcessedItems(this.model || []);
        }
        return this._processedItems;
    }
    get focusedItemId() {
        const focusedItem = this.focusedItemInfo();
        return focusedItem?.item && focusedItem.item?.id ? focusedItem.item.id : ObjectUtils.isNotEmpty(focusedItem.key) ? `${this.id}_${focusedItem.key}` : null;
    }
    constructor(document, platformId, el, renderer, config, cd) {
        this.document = document;
        this.platformId = platformId;
        this.el = el;
        this.renderer = renderer;
        this.config = config;
        this.cd = cd;
        effect(() => {
            const activeItem = this.activeItem();
            if (ObjectUtils.isNotEmpty(activeItem)) {
                this.bindOutsideClickListener();
                this.bindResizeListener();
            }
            else {
                this.unbindOutsideClickListener();
                this.unbindResizeListener();
            }
        });
    }
    ngOnInit() {
        this.id = this.id || UniqueComponentId();
    }
    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'start':
                    this.startTemplate = item.template;
                    break;
                case 'end':
                    this.endTemplate = item.template;
                    break;
                case 'menuicon':
                    this.menuIconTemplate = item.template;
                    break;
                case 'submenuicon':
                    this.submenuIconTemplate = item.template;
                    break;
                case 'item':
                    this.itemTemplate = item.template;
                    break;
                default:
                    this.itemTemplate = item.template;
                    break;
            }
        });
    }
    createProcessedItems(items, level = 0, parent = {}, parentKey = '', columnIndex) {
        const processedItems = [];
        items &&
            items.forEach((item, index) => {
                const key = (parentKey !== '' ? parentKey + '_' : '') + (columnIndex !== undefined ? columnIndex + '_' : '') + index;
                const newItem = {
                    item,
                    index,
                    level,
                    key,
                    parent,
                    parentKey,
                    columnIndex: columnIndex !== undefined ? columnIndex : parent.columnIndex !== undefined ? parent.columnIndex : index
                };
                newItem['items'] =
                    level === 0 && item.items && item.items.length > 0 ? item.items.map((_items, _index) => this.createProcessedItems(_items, level + 1, newItem, key, _index)) : this.createProcessedItems(item.items, level + 1, newItem, key);
                processedItems.push(newItem);
            });
        return processedItems;
    }
    getItemProp(item, name) {
        return item ? ObjectUtils.getItemValue(item[name]) : undefined;
    }
    onItemClick(event) {
        const { originalEvent, processedItem } = event;
        const grouped = this.isProcessedItemGroup(processedItem);
        const root = ObjectUtils.isEmpty(processedItem.parent);
        const selected = this.isSelected(processedItem);
        if (selected) {
            const { index, key, parentKey, item } = processedItem;
            this.activeItem.set(null);
            this.focusedItemInfo.set({ index, key, parentKey, item });
            this.dirty = !root;
            DomHandler.focus(this.rootmenu.menubarViewChild.nativeElement);
        }
        else {
            if (grouped) {
                this.onItemChange(event);
            }
            else {
                const rootProcessedItem = root ? processedItem : this.activeItem();
                this.hide(originalEvent);
                this.changeFocusedItemInfo(originalEvent, rootProcessedItem ? rootProcessedItem.index : -1);
                DomHandler.focus(this.rootmenu.menubarViewChild.nativeElement);
            }
        }
    }
    onItemMouseEnter(event) {
        if (!DomHandler.isTouchDevice()) {
            this.onItemChange(event);
        }
    }
    scrollInView(index = -1) {
        const id = index !== -1 ? `${this.id}_${index}` : this.focusedItemId;
        const element = DomHandler.findSingle(this.rootmenu.el.nativeElement, `li[id="${id}"]`);
        if (element) {
            element.scrollIntoView && element.scrollIntoView({ block: 'nearest', inline: 'nearest' });
        }
    }
    onItemChange(event) {
        const { processedItem, isFocus } = event;
        if (ObjectUtils.isEmpty(processedItem))
            return;
        const { index, key, parentKey, items, item } = processedItem;
        const grouped = ObjectUtils.isNotEmpty(items);
        if (grouped) {
            this.activeItem.set(processedItem);
        }
        this.focusedItemInfo.set({ index, key, parentKey, item });
        grouped && (this.dirty = true);
        isFocus && DomHandler.focus(this.rootmenu.menubarViewChild.nativeElement);
    }
    hide(event, isFocus) {
        this.activeItem.set(null);
        this.focusedItemInfo.set({ index: -1, key: '', parentKey: '', item: null });
        isFocus && DomHandler.focus(this.rootmenu.menubarViewChild.nativeElement);
        this.dirty = false;
    }
    onMenuFocus(event) {
        this.focused = true;
        if (this.focusedItemInfo().index === -1) {
            const index = this.findFirstFocusedItemIndex();
            const processedItem = this.findVisibleItem(index);
            this.focusedItemInfo.set({ index, key: processedItem.key, parentKey: processedItem.parentKey, item: processedItem.item });
        }
    }
    onMenuBlur(event) {
        this.focused = false;
        this.focusedItemInfo.set({ index: -1, level: 0, parentKey: '', item: null });
        this.searchValue = '';
        this.dirty = false;
    }
    onKeyDown(event) {
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
    isProcessedItemGroup(processedItem) {
        return processedItem && ObjectUtils.isNotEmpty(processedItem.items);
    }
    isSelected(processedItem) {
        return ObjectUtils.isNotEmpty(this.activeItem()) ? this.activeItem().key === processedItem.key : false;
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
            this.changeFocusedItemInfo(event, itemIndex);
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
    getProccessedItemLabel(processedItem) {
        return processedItem ? this.getItemLabel(processedItem.item) : undefined;
    }
    getItemLabel(item) {
        return this.getItemProp(item, 'label');
    }
    changeFocusedItemInfo(event, index) {
        const processedItem = this.findVisibleItem(index);
        if (ObjectUtils.isNotEmpty(processedItem)) {
            const { key, parentKey, item } = processedItem;
            this.focusedItemInfo.set({ index, key: key ? key : '', parentKey, item });
        }
        this.scrollInView();
    }
    onArrowDownKey(event) {
        if (this.orientation === 'horizontal') {
            if (ObjectUtils.isNotEmpty(this.activeItem()) && this.activeItem().key === this.focusedItemInfo().key) {
                const { key, item } = this.activeItem();
                this.focusedItemInfo.set({ index: -1, key: '', parentKey: key, item });
            }
            else {
                const processedItem = this.findVisibleItem(this.focusedItemInfo().index);
                const grouped = this.isProccessedItemGroup(processedItem);
                if (grouped) {
                    const { parentKey, key, item } = processedItem;
                    this.onItemChange({ originalEvent: event, processedItem });
                    this.focusedItemInfo.set({ index: -1, key: key, parentKey: parentKey, item: item });
                    this.searchValue = '';
                }
            }
        }
        const itemIndex = this.focusedItemInfo().index !== -1 ? this.findNextItemIndex(this.focusedItemInfo().index) : this.findFirstFocusedItemIndex();
        this.changeFocusedItemInfo(event, itemIndex);
        event.preventDefault();
    }
    onArrowRightKey(event) {
        const processedItem = this.findVisibleItem(this.focusedItemInfo().index);
        const grouped = this.isProccessedItemGroup(processedItem);
        if (grouped) {
            if (this.orientation === 'vertical') {
                if (ObjectUtils.isNotEmpty(this.activeItem()) && this.activeItem().key === processedItem.key) {
                    this.focusedItemInfo.set({ index: -1, key: '', parentKey: this.activeItem().key, item: processedItem.item });
                }
                else {
                    const processedItem = this.findVisibleItem(this.focusedItemInfo().index);
                    const grouped = this.isProccessedItemGroup(processedItem);
                    if (grouped) {
                        this.onItemChange({ originalEvent: event, processedItem });
                        this.focusedItemInfo.set({ index: -1, key: processedItem.key, parentKey: processedItem.parentKey, item: processedItem.item });
                        this.searchValue = '';
                    }
                }
            }
            const itemIndex = this.focusedItemInfo().index !== -1 ? this.findNextItemIndex(this.focusedItemInfo().index) : this.findFirstFocusedItemIndex();
            this.changeFocusedItemInfo(event, itemIndex);
        }
        else {
            const columnIndex = processedItem.columnIndex + 1;
            const itemIndex = this.visibleItems.findIndex((item) => item.columnIndex === columnIndex);
            itemIndex !== -1 && this.changeFocusedItemInfo(event, itemIndex);
        }
        event.preventDefault();
    }
    onArrowUpKey(event) {
        if (event.altKey && this.orientation === 'horizontal') {
            if (this.focusedItemInfo().index !== -1) {
                const processedItem = this.findVisibleItem(this.focusedItemInfo().index);
                const grouped = this.isProccessedItemGroup(processedItem);
                if (!grouped && ObjectUtils.isNotEmpty(this.activeItem)) {
                    if (this.focusedItemInfo().index === 0) {
                        this.focusedItemInfo.set({ index: this.activeItem().index, key: this.activeItem().key, parentKey: this.activeItem().parentKey, item: processedItem.item });
                        this.activeItem.set(null);
                    }
                    else {
                        this.changeFocusedItemInfo(event, this.findFirstItemIndex());
                    }
                }
            }
            event.preventDefault();
        }
        else {
            const itemIndex = this.focusedItemInfo().index !== -1 ? this.findPrevItemIndex(this.focusedItemInfo().index) : this.findLastFocusedItemIndex();
            this.changeFocusedItemInfo(event, itemIndex);
            event.preventDefault();
        }
    }
    onArrowLeftKey(event) {
        const processedItem = this.findVisibleItem(this.focusedItemInfo().index);
        const grouped = this.isProccessedItemGroup(processedItem);
        if (grouped) {
            if (this.orientation === 'horizontal') {
                const itemIndex = this.focusedItemInfo().index !== -1 ? this.findPrevItemIndex(this.focusedItemInfo().index) : this.findLastFocusedItemIndex();
                this.changeFocusedItemInfo(event, itemIndex);
            }
        }
        else {
            if (this.orientation === 'vertical' && ObjectUtils.isNotEmpty(this.activeItem())) {
                if (processedItem.columnIndex === 0) {
                    this.focusedItemInfo.set({ index: this.activeItem().index, key: this.activeItem().key, parentKey: this.activeItem().parentKey, item: processedItem.item });
                    this.activeItem.set(null);
                }
            }
            const columnIndex = processedItem.columnIndex - 1;
            const itemIndex = this.visibleItems.findIndex((item) => item.columnIndex === columnIndex);
            itemIndex !== -1 && this.changeFocusedItemInfo(event, itemIndex);
        }
        event.preventDefault();
    }
    onHomeKey(event) {
        this.changeFocusedItemInfo(event, this.findFirstItemIndex());
        event.preventDefault();
    }
    onEndKey(event) {
        this.changeFocusedItemInfo(event, this.findLastItemIndex());
        event.preventDefault();
    }
    onSpaceKey(event) {
        this.onEnterKey(event);
    }
    onEscapeKey(event) {
        if (ObjectUtils.isNotEmpty(this.activeItem())) {
            this.focusedItemInfo.set({ index: this.activeItem().index, key: this.activeItem().key, item: this.activeItem().item });
            this.activeItem.set(null);
        }
        event.preventDefault();
    }
    onTabKey(event) {
        if (this.focusedItemInfo().index !== -1) {
            const processedItem = this.findVisibleItem(this.focusedItemInfo().index);
            const grouped = this.isProccessedItemGroup(processedItem);
            !grouped && this.onItemChange({ originalEvent: event, processedItem });
        }
        this.hide();
    }
    onEnterKey(event) {
        if (this.focusedItemInfo().index !== -1) {
            const element = DomHandler.findSingle(this.rootmenu.el.nativeElement, `li[id="${`${this.focusedItemId}`}"]`);
            const anchorElement = element && DomHandler.findSingle(element, 'a[data-pc-section="action"]');
            anchorElement ? anchorElement.click() : element && element.click();
            const processedItem = this.visibleItems[this.focusedItemInfo().index];
            const grouped = this.isProccessedItemGroup(processedItem);
            !grouped && this.changeFocusedItemInfo(event, this.findFirstFocusedItemIndex());
        }
        event.preventDefault();
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
    bindResizeListener() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.resizeListener) {
                this.resizeListener = this.renderer.listen(this.document.defaultView, 'resize', (event) => {
                    this.hide(event, true);
                });
            }
        }
    }
    bindOutsideClickListener() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.outsideClickListener) {
                this.outsideClickListener = this.renderer.listen(this.document, 'click', (event) => {
                    const isOutsideContainer = this.rootmenu.el.nativeElement !== event.target && !this.rootmenu.el.nativeElement.contains(event.target);
                    if (isOutsideContainer) {
                        this.hide();
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
    ngOnDestroy() {
        this.unbindOutsideClickListener();
        this.unbindResizeListener();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: MegaMenu, deps: [{ token: DOCUMENT }, { token: PLATFORM_ID }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i5.PrimeNGConfig }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.5", type: MegaMenu, selector: "p-megaMenu", inputs: { model: "model", style: "style", styleClass: "styleClass", orientation: "orientation", id: "id", ariaLabel: "ariaLabel", ariaLabelledBy: "ariaLabelledBy", disabled: "disabled", tabindex: "tabindex" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "menubutton", first: true, predicate: ["menubutton"], descendants: true }, { propertyName: "rootmenu", first: true, predicate: ["rootmenu"], descendants: true }], ngImport: i0, template: `
        <div
            [ngClass]="{ 'p-megamenu p-component': true, 'p-megamenu-horizontal': orientation == 'horizontal', 'p-megamenu-vertical': orientation == 'vertical' }"
            [class]="styleClass"
            [ngStyle]="style"
            [attr.data-pc-section]="'root'"
            [attr.data-pc-name]="'megamenu'"
            [attr.id]="id"
        >
            <div class="p-megamenu-start" *ngIf="startTemplate">
                <ng-container *ngTemplateOutlet="startTemplate"></ng-container>
            </div>
            <p-megaMenuSub
                #rootmenu
                [itemTemplate]="itemTemplate"
                [items]="processedItems"
                [attr.id]="id + '_list'"
                [menuId]="id"
                [root]="true"
                [orientation]="orientation"
                [ariaLabel]="ariaLabel"
                [disabled]="disabled"
                [tabindex]="!disabled ? tabindex : -1"
                [activeItem]="activeItem()"
                [level]="0"
                [ariaLabelledBy]="ariaLabelledBy"
                [focusedItemId]="focused ? focusedItemId : undefined"
                (itemClick)="onItemClick($event)"
                (menuFocus)="onMenuFocus($event)"
                (menuBlur)="onMenuBlur($event)"
                (menuKeydown)="onKeyDown($event)"
                (itemMouseEnter)="onItemMouseEnter($event)"
            ></p-megaMenuSub>
            <div class="p-megamenu-end" *ngIf="endTemplate; else legacy">
                <ng-container *ngTemplateOutlet="endTemplate"></ng-container>
            </div>
            <ng-template #legacy>
                <div class="p-megamenu-end">
                    <ng-content></ng-content>
                </div>
            </ng-template>
        </div>
    `, isInline: true, styles: ["@layer primeng{.p-megamenu-root-list{margin:0;padding:0;list-style:none}.p-megamenu-root-list>.p-menuitem{position:relative}.p-megamenu .p-menuitem-link{cursor:pointer;display:flex;align-items:center;text-decoration:none;overflow:hidden;position:relative}.p-megamenu .p-menuitem-text{line-height:1}.p-megamenu-panel{display:none;position:absolute;width:auto;z-index:1}.p-megamenu-root-list>.p-menuitem-active>.p-megamenu-panel{display:block}.p-megamenu-submenu{margin:0;padding:0;list-style:none}.p-megamenu-horizontal{align-items:center}.p-megamenu-horizontal .p-megamenu-root-list{display:flex;align-items:center;flex-wrap:wrap}.p-megamenu-horizontal .p-megamenu-end{margin-left:auto;align-self:center}.p-megamenu-vertical .p-megamenu-root-list{flex-direction:column}.p-megamenu-vertical .p-megamenu-root-list>.p-menuitem-active>.p-megamenu-panel{left:100%;top:0}.p-megamenu-vertical .p-megamenu-root-list>.p-menuitem>.p-menuitem-content>.p-menuitem-link>.p-submenu-icon:not(svg){margin-left:auto}.p-megamenu-vertical .p-megamenu-root-list>.p-menuitem>.p-menuitem-content>.p-menuitem-link>.p-icon-wrapper{margin-left:auto}.p-megamenu-grid{display:flex}.p-megamenu-col-2,.p-megamenu-col-3,.p-megamenu-col-4,.p-megamenu-col-6,.p-megamenu-col-12{flex:0 0 auto;padding:.5rem}.p-megamenu-col-2{width:16.6667%}.p-megamenu-col-3{width:25%}.p-megamenu-col-4{width:33.3333%}.p-megamenu-col-6{width:50%}.p-megamenu-col-12{width:100%}}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: MegaMenuSub, selector: "p-megaMenuSub", inputs: ["id", "items", "itemTemplate", "menuId", "ariaLabel", "ariaLabelledBy", "level", "focusedItemId", "disabled", "orientation", "activeItem", "submenu", "tabindex", "root"], outputs: ["itemClick", "itemMouseEnter", "menuFocus", "menuBlur", "menuKeydown"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: MegaMenu, decorators: [{
            type: Component,
            args: [{ selector: 'p-megaMenu', template: `
        <div
            [ngClass]="{ 'p-megamenu p-component': true, 'p-megamenu-horizontal': orientation == 'horizontal', 'p-megamenu-vertical': orientation == 'vertical' }"
            [class]="styleClass"
            [ngStyle]="style"
            [attr.data-pc-section]="'root'"
            [attr.data-pc-name]="'megamenu'"
            [attr.id]="id"
        >
            <div class="p-megamenu-start" *ngIf="startTemplate">
                <ng-container *ngTemplateOutlet="startTemplate"></ng-container>
            </div>
            <p-megaMenuSub
                #rootmenu
                [itemTemplate]="itemTemplate"
                [items]="processedItems"
                [attr.id]="id + '_list'"
                [menuId]="id"
                [root]="true"
                [orientation]="orientation"
                [ariaLabel]="ariaLabel"
                [disabled]="disabled"
                [tabindex]="!disabled ? tabindex : -1"
                [activeItem]="activeItem()"
                [level]="0"
                [ariaLabelledBy]="ariaLabelledBy"
                [focusedItemId]="focused ? focusedItemId : undefined"
                (itemClick)="onItemClick($event)"
                (menuFocus)="onMenuFocus($event)"
                (menuBlur)="onMenuBlur($event)"
                (menuKeydown)="onKeyDown($event)"
                (itemMouseEnter)="onItemMouseEnter($event)"
            ></p-megaMenuSub>
            <div class="p-megamenu-end" *ngIf="endTemplate; else legacy">
                <ng-container *ngTemplateOutlet="endTemplate"></ng-container>
            </div>
            <ng-template #legacy>
                <div class="p-megamenu-end">
                    <ng-content></ng-content>
                </div>
            </ng-template>
        </div>
    `, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: ["@layer primeng{.p-megamenu-root-list{margin:0;padding:0;list-style:none}.p-megamenu-root-list>.p-menuitem{position:relative}.p-megamenu .p-menuitem-link{cursor:pointer;display:flex;align-items:center;text-decoration:none;overflow:hidden;position:relative}.p-megamenu .p-menuitem-text{line-height:1}.p-megamenu-panel{display:none;position:absolute;width:auto;z-index:1}.p-megamenu-root-list>.p-menuitem-active>.p-megamenu-panel{display:block}.p-megamenu-submenu{margin:0;padding:0;list-style:none}.p-megamenu-horizontal{align-items:center}.p-megamenu-horizontal .p-megamenu-root-list{display:flex;align-items:center;flex-wrap:wrap}.p-megamenu-horizontal .p-megamenu-end{margin-left:auto;align-self:center}.p-megamenu-vertical .p-megamenu-root-list{flex-direction:column}.p-megamenu-vertical .p-megamenu-root-list>.p-menuitem-active>.p-megamenu-panel{left:100%;top:0}.p-megamenu-vertical .p-megamenu-root-list>.p-menuitem>.p-menuitem-content>.p-menuitem-link>.p-submenu-icon:not(svg){margin-left:auto}.p-megamenu-vertical .p-megamenu-root-list>.p-menuitem>.p-menuitem-content>.p-menuitem-link>.p-icon-wrapper{margin-left:auto}.p-megamenu-grid{display:flex}.p-megamenu-col-2,.p-megamenu-col-3,.p-megamenu-col-4,.p-megamenu-col-6,.p-megamenu-col-12{flex:0 0 auto;padding:.5rem}.p-megamenu-col-2{width:16.6667%}.p-megamenu-col-3{width:25%}.p-megamenu-col-4{width:33.3333%}.p-megamenu-col-6{width:50%}.p-megamenu-col-12{width:100%}}\n"] }]
        }], ctorParameters: () => [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i5.PrimeNGConfig }, { type: i0.ChangeDetectorRef }], propDecorators: { model: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], orientation: [{
                type: Input
            }], id: [{
                type: Input
            }], ariaLabel: [{
                type: Input
            }], ariaLabelledBy: [{
                type: Input
            }], disabled: [{
                type: Input
            }], tabindex: [{
                type: Input
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }], menubutton: [{
                type: ViewChild,
                args: ['menubutton']
            }], rootmenu: [{
                type: ViewChild,
                args: ['rootmenu']
            }] } });
export class MegaMenuModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: MegaMenuModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.0.5", ngImport: i0, type: MegaMenuModule, declarations: [MegaMenu, MegaMenuSub], imports: [CommonModule, RouterModule, RippleModule, TooltipModule, SharedModule, AngleDownIcon, AngleRightIcon], exports: [MegaMenu, RouterModule, TooltipModule, SharedModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: MegaMenuModule, imports: [CommonModule, RouterModule, RippleModule, TooltipModule, SharedModule, AngleDownIcon, AngleRightIcon, RouterModule, TooltipModule, SharedModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: MegaMenuModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RouterModule, RippleModule, TooltipModule, SharedModule, AngleDownIcon, AngleRightIcon],
                    exports: [MegaMenu, RouterModule, TooltipModule, SharedModule],
                    declarations: [MegaMenu, MegaMenuSub]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVnYW1lbnUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvbWVnYW1lbnUvbWVnYW1lbnUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM1RSxPQUFPLEVBRUgsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxlQUFlLEVBRWYsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBQ0wsUUFBUSxFQUdSLE1BQU0sRUFDTixXQUFXLEVBSVgsU0FBUyxFQUNULGlCQUFpQixFQUNqQixNQUFNLEVBQ04sVUFBVSxFQUNWLE1BQU0sRUFDVCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUErQixhQUFhLEVBQUUsWUFBWSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDekMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRWhELE9BQU8sRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7QUFtSy9ELE1BQU0sT0FBTyxXQUFXO0lBeUNEO0lBQTJEO0lBeENyRSxFQUFFLENBQXFCO0lBRXZCLEtBQUssQ0FBb0I7SUFFekIsWUFBWSxDQUEwQjtJQUV0QyxNQUFNLENBQXFCO0lBRTNCLFNBQVMsQ0FBcUI7SUFFOUIsY0FBYyxDQUFxQjtJQUVuQyxLQUFLLEdBQVcsQ0FBQyxDQUFDO0lBRWxCLGFBQWEsQ0FBcUI7SUFFbEMsUUFBUSxHQUFZLEtBQUssQ0FBQztJQUUxQixXQUFXLENBQXFCO0lBRWhDLFVBQVUsQ0FBTTtJQUVoQixPQUFPLENBQU07SUFFYixRQUFRLEdBQVcsQ0FBQyxDQUFDO0lBRXJCLElBQUksR0FBWSxLQUFLLENBQUM7SUFFckIsU0FBUyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO0lBRWxELGNBQWMsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUV2RCxTQUFTLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7SUFFbEQsUUFBUSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO0lBRWpELFdBQVcsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUV0QixnQkFBZ0IsQ0FBYTtJQUVyRSxZQUFtQixFQUFjLEVBQTZDLFFBQWtCO1FBQTdFLE9BQUUsR0FBRixFQUFFLENBQVk7UUFBNkMsYUFBUSxHQUFSLFFBQVEsQ0FBVTtJQUFHLENBQUM7SUFFcEcsV0FBVyxDQUFDLEtBQVUsRUFBRSxhQUFrQjtRQUN0QyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxTQUFTLEVBQUUsRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUMvRixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ2hGLENBQUM7SUFFRCxXQUFXLENBQUMsYUFBa0IsRUFBRSxJQUFZLEVBQUUsU0FBcUIsSUFBSTtRQUNuRSxPQUFPLGFBQWEsSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUN4SCxDQUFDO0lBRUQsU0FBUyxDQUFDLGFBQWtCO1FBQ3hCLE9BQU8sYUFBYSxDQUFDLElBQUksSUFBSSxhQUFhLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxhQUFhLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDeEgsQ0FBQztJQUVELFlBQVksQ0FBQyxhQUFhO1FBQ3RCLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUM7SUFDbkQsQ0FBQztJQUVELFlBQVksQ0FBQyxhQUFrQjtRQUMzQixPQUFPO1lBQ0gsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUM7WUFDM0MsWUFBWSxFQUFFLElBQUk7WUFDbEIsK0JBQStCLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUM7WUFDakUsU0FBUyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDO1lBQzVDLFlBQVksRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQztTQUNuRCxDQUFDO0lBQ04sQ0FBQztJQUVELFlBQVksQ0FBQyxhQUFrQjtRQUMzQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRCxxQkFBcUIsQ0FBQyxhQUFrQjtRQUNwQyxPQUFPO1lBQ0gsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUM7WUFDM0Msc0JBQXNCLEVBQUUsSUFBSTtTQUMvQixDQUFDO0lBQ04sQ0FBQztJQUVELGNBQWMsQ0FBQyxhQUFhO1FBQ3hCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUUsSUFBSSxXQUFXLENBQUM7UUFFaEIsUUFBUSxNQUFNLEVBQUU7WUFDWixLQUFLLENBQUM7Z0JBQ0YsV0FBVyxHQUFHLGtCQUFrQixDQUFDO2dCQUNqQyxNQUFNO1lBRVYsS0FBSyxDQUFDO2dCQUNGLFdBQVcsR0FBRyxrQkFBa0IsQ0FBQztnQkFDakMsTUFBTTtZQUVWLEtBQUssQ0FBQztnQkFDRixXQUFXLEdBQUcsa0JBQWtCLENBQUM7Z0JBQ2pDLE1BQU07WUFFVixLQUFLLENBQUM7Z0JBQ0YsV0FBVyxHQUFHLGtCQUFrQixDQUFDO2dCQUNqQyxNQUFNO1lBRVY7Z0JBQ0ksV0FBVyxHQUFHLG1CQUFtQixDQUFDO2dCQUNsQyxNQUFNO1NBQ2I7UUFFRCxPQUFPLFdBQVcsQ0FBQztJQUN2QixDQUFDO0lBRUQscUJBQXFCLENBQUMsYUFBYTtRQUMvQixPQUFPO1lBQ0gsNENBQTRDLEVBQUUsSUFBSTtZQUNsRCxZQUFZLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUM7WUFDaEQsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUM7U0FDOUMsQ0FBQztJQUNOLENBQUM7SUFFRCxhQUFhLENBQUMsYUFBa0I7UUFDNUIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxTQUFTLENBQUMsS0FBSyxLQUFLLENBQUM7SUFDaEUsQ0FBQztJQUVELFlBQVksQ0FBQyxhQUFhO1FBQ3RCLE9BQU8sV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxLQUFLLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUN2RyxDQUFDO0lBRUQsY0FBYyxDQUFDLGFBQWtCO1FBQzdCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVELGFBQWEsQ0FBQyxhQUFrQjtRQUM1QixPQUFPLElBQUksQ0FBQyxhQUFhLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRUQsV0FBVyxDQUFDLGFBQWtCO1FBQzFCLE9BQU8sV0FBVyxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVELGNBQWM7UUFDVixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7SUFDM0ksQ0FBQztJQUVELGVBQWUsQ0FBQyxLQUFhO1FBQ3pCLE9BQU8sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ3RLLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxLQUFVO1FBQ3ZCLE1BQU0sRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLEdBQUcsS0FBSyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7dUdBckpRLFdBQVcsNENBeUN1QixVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDOzJGQXpDNUQsV0FBVyw0cUJBL0pWOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0F5SlQsd3FEQTgyQmdGLGFBQWEsK0VBQUUsY0FBYyxnRkF4MkJyRyxXQUFXOzsyRkFBWCxXQUFXO2tCQWpLdkIsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUsZUFBZTtvQkFDekIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0F5SlQ7b0JBQ0QsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLElBQUksRUFBRTt3QkFDRixLQUFLLEVBQUUsV0FBVztxQkFDckI7aUJBQ0o7OzBCQTBDdUMsTUFBTTsyQkFBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDO3lDQXhDNUQsRUFBRTtzQkFBVixLQUFLO2dCQUVHLEtBQUs7c0JBQWIsS0FBSztnQkFFRyxZQUFZO3NCQUFwQixLQUFLO2dCQUVHLE1BQU07c0JBQWQsS0FBSztnQkFFRyxTQUFTO3NCQUFqQixLQUFLO2dCQUVHLGNBQWM7c0JBQXRCLEtBQUs7Z0JBRUcsS0FBSztzQkFBYixLQUFLO2dCQUVHLGFBQWE7c0JBQXJCLEtBQUs7Z0JBRUcsUUFBUTtzQkFBaEIsS0FBSztnQkFFRyxXQUFXO3NCQUFuQixLQUFLO2dCQUVHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBRUcsT0FBTztzQkFBZixLQUFLO2dCQUVHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBRUcsSUFBSTtzQkFBWixLQUFLO2dCQUVJLFNBQVM7c0JBQWxCLE1BQU07Z0JBRUcsY0FBYztzQkFBdkIsTUFBTTtnQkFFRyxTQUFTO3NCQUFsQixNQUFNO2dCQUVHLFFBQVE7c0JBQWpCLE1BQU07Z0JBRUcsV0FBVztzQkFBcEIsTUFBTTtnQkFFaUMsZ0JBQWdCO3NCQUF2RCxTQUFTO3VCQUFDLFNBQVMsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7O0FBZ0gxQzs7O0dBR0c7QUFxREgsTUFBTSxPQUFPLFFBQVE7SUFxSHFCO0lBQWlEO0lBQXdCO0lBQXVCO0lBQTRCO0lBQThCO0lBcEhoTTs7O09BR0c7SUFDSCxJQUFhLEtBQUssQ0FBQyxLQUFpQztRQUNoRCxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFDRCxJQUFJLEtBQUs7UUFDTCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUNEOzs7T0FHRztJQUNNLEtBQUssQ0FBOEM7SUFDNUQ7OztPQUdHO0lBQ00sVUFBVSxDQUFxQjtJQUN4Qzs7O09BR0c7SUFDTSxXQUFXLEdBQXVDLFlBQVksQ0FBQztJQUN4RTs7O09BR0c7SUFDTSxFQUFFLENBQXFCO0lBQ2hDOzs7T0FHRztJQUNNLFNBQVMsQ0FBcUI7SUFDdkM7OztPQUdHO0lBQ00sY0FBYyxDQUFxQjtJQUM1Qzs7O09BR0c7SUFDTSxRQUFRLEdBQVksS0FBSyxDQUFDO0lBQ25DOzs7T0FHRztJQUNNLFFBQVEsR0FBVyxDQUFDLENBQUM7SUFFRSxTQUFTLENBQXVDO0lBRXZELFVBQVUsQ0FBeUI7SUFFckMsUUFBUSxDQUEwQjtJQUV6RCxhQUFhLENBQStCO0lBRTVDLFdBQVcsQ0FBK0I7SUFFMUMsZ0JBQWdCLENBQStCO0lBRS9DLG1CQUFtQixDQUErQjtJQUVsRCxZQUFZLENBQStCO0lBRTNDLG9CQUFvQixDQUFlO0lBRW5DLGNBQWMsQ0FBZTtJQUU3QixLQUFLLEdBQVksS0FBSyxDQUFDO0lBRXZCLE9BQU8sR0FBWSxLQUFLLENBQUM7SUFFekIsVUFBVSxHQUFHLE1BQU0sQ0FBTSxJQUFJLENBQUMsQ0FBQztJQUUvQixlQUFlLEdBQUcsTUFBTSxDQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUVsRixXQUFXLEdBQVcsRUFBRSxDQUFDO0lBRXpCLGFBQWEsQ0FBTTtJQUVuQixlQUFlLENBQVE7SUFFdkIsTUFBTSxDQUE2QjtJQUVuQyxJQUFJLFlBQVk7UUFDWixNQUFNLGFBQWEsR0FBRyxXQUFXLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUUzRixPQUFPLGFBQWEsSUFBSSxhQUFhLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxTQUFTO1lBQzFFLENBQUMsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsRUFBRTtnQkFDdEMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO29CQUNwQixPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO3dCQUN4QixLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNsQixDQUFDLENBQUMsQ0FBQztnQkFDUCxDQUFDLENBQUMsQ0FBQztnQkFFSCxPQUFPLEtBQUssQ0FBQztZQUNqQixDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ1IsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUM7SUFDOUIsQ0FBQztJQUVELElBQUksY0FBYztRQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUU7WUFDdkQsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUMsQ0FBQztTQUN0RTtRQUNELE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUNoQyxDQUFDO0lBRUQsSUFBSSxhQUFhO1FBQ2IsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQzNDLE9BQU8sV0FBVyxFQUFFLElBQUksSUFBSSxXQUFXLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLElBQUksV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDOUosQ0FBQztJQUVELFlBQXNDLFFBQWtCLEVBQStCLFVBQWUsRUFBUyxFQUFjLEVBQVMsUUFBbUIsRUFBUyxNQUFxQixFQUFTLEVBQXFCO1FBQS9LLGFBQVEsR0FBUixRQUFRLENBQVU7UUFBK0IsZUFBVSxHQUFWLFVBQVUsQ0FBSztRQUFTLE9BQUUsR0FBRixFQUFFLENBQVk7UUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQVMsV0FBTSxHQUFOLE1BQU0sQ0FBZTtRQUFTLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBQ2pOLE1BQU0sQ0FBQyxHQUFHLEVBQUU7WUFDUixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDckMsSUFBSSxXQUFXLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUNwQyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztnQkFDaEMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7YUFDN0I7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUM7Z0JBQ2xDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO2FBQy9CO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsSUFBSSxpQkFBaUIsRUFBRSxDQUFDO0lBQzdDLENBQUM7SUFFRCxrQkFBa0I7UUFDZCxJQUFJLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQzdCLFFBQVEsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFO2dCQUNwQixLQUFLLE9BQU87b0JBQ1IsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO29CQUNuQyxNQUFNO2dCQUVWLEtBQUssS0FBSztvQkFDTixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7b0JBQ2pDLE1BQU07Z0JBRVYsS0FBSyxVQUFVO29CQUNYLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO29CQUN0QyxNQUFNO2dCQUVWLEtBQUssYUFBYTtvQkFDZCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztvQkFDekMsTUFBTTtnQkFFVixLQUFLLE1BQU07b0JBQ1AsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO29CQUNsQyxNQUFNO2dCQUVWO29CQUNJLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztvQkFDbEMsTUFBTTthQUNiO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsb0JBQW9CLENBQUMsS0FBSyxFQUFFLEtBQUssR0FBRyxDQUFDLEVBQUUsTUFBTSxHQUFHLEVBQUUsRUFBRSxTQUFTLEdBQUcsRUFBRSxFQUFFLFdBQVk7UUFDNUUsTUFBTSxjQUFjLEdBQUcsRUFBRSxDQUFDO1FBRTFCLEtBQUs7WUFDRCxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO2dCQUMxQixNQUFNLEdBQUcsR0FBRyxDQUFDLFNBQVMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsV0FBVyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDO2dCQUNySCxNQUFNLE9BQU8sR0FBRztvQkFDWixJQUFJO29CQUNKLEtBQUs7b0JBQ0wsS0FBSztvQkFDTCxHQUFHO29CQUNILE1BQU07b0JBQ04sU0FBUztvQkFDVCxXQUFXLEVBQUUsV0FBVyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBTyxNQUFPLENBQUMsV0FBVyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQU8sTUFBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsS0FBSztpQkFDckksQ0FBQztnQkFFRixPQUFPLENBQUMsT0FBTyxDQUFDO29CQUNaLEtBQUssS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sRUFBRSxLQUFLLEdBQUcsQ0FBQyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxHQUFHLENBQUMsRUFBRSxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQ2pPLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDakMsQ0FBQyxDQUFDLENBQUM7UUFDUCxPQUFPLGNBQWMsQ0FBQztJQUMxQixDQUFDO0lBRUQsV0FBVyxDQUFDLElBQVMsRUFBRSxJQUFZO1FBQy9CLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7SUFDbkUsQ0FBQztJQUVELFdBQVcsQ0FBQyxLQUFVO1FBQ2xCLE1BQU0sRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLEdBQUcsS0FBSyxDQUFDO1FBQy9DLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN6RCxNQUFNLElBQUksR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2RCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRWhELElBQUksUUFBUSxFQUFFO1lBQ1YsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxHQUFHLGFBQWEsQ0FBQztZQUV0RCxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7WUFFMUQsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQztZQUNuQixVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDbEU7YUFBTTtZQUNILElBQUksT0FBTyxFQUFFO2dCQUNULElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDNUI7aUJBQU07Z0JBQ0gsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUNuRSxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUN6QixJQUFJLENBQUMscUJBQXFCLENBQUMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRTVGLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsQ0FBQzthQUNsRTtTQUNKO0lBQ0wsQ0FBQztJQUVELGdCQUFnQixDQUFDLEtBQVU7UUFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsRUFBRTtZQUM3QixJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzVCO0lBQ0wsQ0FBQztJQUVELFlBQVksQ0FBQyxRQUFnQixDQUFDLENBQUM7UUFDM0IsTUFBTSxFQUFFLEdBQUcsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLElBQUksS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDckUsTUFBTSxPQUFPLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRXhGLElBQUksT0FBTyxFQUFFO1lBQ1QsT0FBTyxDQUFDLGNBQWMsSUFBSSxPQUFPLENBQUMsY0FBYyxDQUFDLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQztTQUM3RjtJQUNMLENBQUM7SUFFRCxZQUFZLENBQUMsS0FBVTtRQUNuQixNQUFNLEVBQUUsYUFBYSxFQUFFLE9BQU8sRUFBRSxHQUFHLEtBQUssQ0FBQztRQUV6QyxJQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDO1lBQUUsT0FBTztRQUUvQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLGFBQWEsQ0FBQztRQUM3RCxNQUFNLE9BQU8sR0FBRyxXQUFXLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTlDLElBQUksT0FBTyxFQUFFO1lBQ1QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDdEM7UUFDRCxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFFMUQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQztRQUMvQixPQUFPLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzlFLENBQUM7SUFFRCxJQUFJLENBQUMsS0FBTSxFQUFFLE9BQWlCO1FBQzFCLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUU1RSxPQUFPLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzFFLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxXQUFXLENBQUMsS0FBVTtRQUNsQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDckMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7WUFDL0MsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUVsRCxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsYUFBYSxDQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsYUFBYSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7U0FDN0g7SUFDTCxDQUFDO0lBRUQsVUFBVSxDQUFDLEtBQVU7UUFDakIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDckIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQzdFLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxTQUFTLENBQUMsS0FBb0I7UUFDMUIsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDO1FBRS9DLFFBQVEsS0FBSyxDQUFDLElBQUksRUFBRTtZQUNoQixLQUFLLFdBQVc7Z0JBQ1osSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDM0IsTUFBTTtZQUVWLEtBQUssU0FBUztnQkFDVixJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN6QixNQUFNO1lBRVYsS0FBSyxXQUFXO2dCQUNaLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzNCLE1BQU07WUFFVixLQUFLLFlBQVk7Z0JBQ2IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDNUIsTUFBTTtZQUVWLEtBQUssTUFBTTtnQkFDUCxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN0QixNQUFNO1lBRVYsS0FBSyxLQUFLO2dCQUNOLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3JCLE1BQU07WUFFVixLQUFLLE9BQU87Z0JBQ1IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDdkIsTUFBTTtZQUVWLEtBQUssT0FBTztnQkFDUixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN2QixNQUFNO1lBRVYsS0FBSyxRQUFRO2dCQUNULElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3hCLE1BQU07WUFFVixLQUFLLEtBQUs7Z0JBQ04sSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDckIsTUFBTTtZQUVWLEtBQUssVUFBVSxDQUFDO1lBQ2hCLEtBQUssUUFBUSxDQUFDO1lBQ2QsS0FBSyxXQUFXLENBQUM7WUFDakIsS0FBSyxXQUFXLENBQUM7WUFDakIsS0FBSyxZQUFZO2dCQUNiLE1BQU07Z0JBQ04sTUFBTTtZQUVWO2dCQUNJLElBQUksQ0FBQyxPQUFPLElBQUksV0FBVyxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDekQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUN0QztnQkFFRCxNQUFNO1NBQ2I7SUFDTCxDQUFDO0lBRUQseUJBQXlCO1FBQ3JCLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBRW5ELE9BQU8sYUFBYSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQztJQUN6RSxDQUFDO0lBRUQsa0JBQWtCO1FBQ2QsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO0lBQzNGLENBQUM7SUFFRCxxQkFBcUI7UUFDakIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7SUFDbkcsQ0FBQztJQUVELG9CQUFvQixDQUFDLGFBQWtCO1FBQ25DLE9BQU8sYUFBYSxJQUFJLFdBQVcsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFFRCxVQUFVLENBQUMsYUFBa0I7UUFDekIsT0FBTyxXQUFXLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsR0FBRyxLQUFLLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUMzRyxDQUFDO0lBRUQsbUJBQW1CLENBQUMsYUFBa0I7UUFDbEMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQUVELFdBQVcsQ0FBQyxhQUFrQjtRQUMxQixPQUFPLENBQUMsQ0FBQyxhQUFhLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BILENBQUM7SUFFRCxjQUFjLENBQUMsSUFBUztRQUNwQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRCxlQUFlLENBQUMsSUFBUztRQUNyQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRCxhQUFhLENBQUMsYUFBa0I7UUFDNUIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxJQUFJLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxhQUFhLENBQUMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQztJQUM5SixDQUFDO0lBRUQscUJBQXFCLENBQUMsYUFBa0I7UUFDcEMsT0FBTyxhQUFhLElBQUksV0FBVyxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDeEUsQ0FBQztJQUVELFdBQVcsQ0FBQyxLQUFVLEVBQUUsSUFBWTtRQUNoQyxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUM7UUFFbkQsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDbkIsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBRXBCLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsRUFBRTtZQUNyQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQ2xJLFNBQVMsR0FBRyxTQUFTLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsS0FBSyxDQUFDO1NBQ3RNO2FBQU07WUFDSCxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztTQUNqRztRQUVELElBQUksU0FBUyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ2xCLE9BQU8sR0FBRyxJQUFJLENBQUM7U0FDbEI7UUFFRCxJQUFJLFNBQVMsS0FBSyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ3pELFNBQVMsR0FBRyxJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQztTQUNoRDtRQUVELElBQUksU0FBUyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLENBQUM7U0FDaEQ7UUFFRCxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDcEIsWUFBWSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUNwQztRQUVELElBQUksQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNqQyxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztZQUN0QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUM5QixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFUixPQUFPLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBRUQsc0JBQXNCLENBQUMsYUFBa0I7UUFDckMsT0FBTyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7SUFDN0UsQ0FBQztJQUVELFlBQVksQ0FBQyxJQUFTO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVELHFCQUFxQixDQUFDLEtBQUssRUFBRSxLQUFLO1FBQzlCLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEQsSUFBSSxXQUFXLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQ3ZDLE1BQU0sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxHQUFHLGFBQWEsQ0FBQztZQUMvQyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztTQUM3RTtRQUVELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQsY0FBYyxDQUFDLEtBQW9CO1FBQy9CLElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxZQUFZLEVBQUU7WUFDbkMsSUFBSSxXQUFXLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDLEdBQUcsRUFBRTtnQkFDbkcsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQ3hDLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO2FBQzFFO2lCQUFNO2dCQUNILE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN6RSxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBRTFELElBQUksT0FBTyxFQUFFO29CQUNULE1BQU0sRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLGFBQWEsQ0FBQztvQkFDL0MsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLENBQUMsQ0FBQztvQkFDM0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO29CQUNwRixJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztpQkFDekI7YUFDSjtTQUNKO1FBRUQsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7UUFDaEosSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQztRQUM3QyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELGVBQWUsQ0FBQyxLQUFvQjtRQUNoQyxNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6RSxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFMUQsSUFBSSxPQUFPLEVBQUU7WUFDVCxJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssVUFBVSxFQUFFO2dCQUNqQyxJQUFJLFdBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLEdBQUcsS0FBSyxhQUFhLENBQUMsR0FBRyxFQUFFO29CQUMxRixJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztpQkFDaEg7cUJBQU07b0JBQ0gsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3pFLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxhQUFhLENBQUMsQ0FBQztvQkFFMUQsSUFBSSxPQUFPLEVBQUU7d0JBQ1QsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLENBQUMsQ0FBQzt3QkFDM0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLGFBQWEsQ0FBQyxHQUFHLEVBQUUsU0FBUyxFQUFFLGFBQWEsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO3dCQUM5SCxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztxQkFDekI7aUJBQ0o7YUFDSjtZQUVELE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO1lBRWhKLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLENBQUM7U0FDaEQ7YUFBTTtZQUNILE1BQU0sV0FBVyxHQUFHLGFBQWEsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1lBQ2xELE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFLLFdBQVcsQ0FBQyxDQUFDO1lBRTFGLFNBQVMsS0FBSyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMscUJBQXFCLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1NBQ3BFO1FBRUQsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxZQUFZLENBQUMsS0FBb0I7UUFDN0IsSUFBSSxLQUFLLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssWUFBWSxFQUFFO1lBQ25ELElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsRUFBRTtnQkFDckMsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3pFLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFFMUQsSUFBSSxDQUFDLE9BQU8sSUFBSSxXQUFXLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtvQkFDckQsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsS0FBSyxLQUFLLENBQUMsRUFBRTt3QkFDcEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7d0JBQzNKLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO3FCQUM3Qjt5QkFBTTt3QkFDSCxJQUFJLENBQUMscUJBQXFCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLENBQUM7cUJBQ2hFO2lCQUNKO2FBQ0o7WUFFRCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDMUI7YUFBTTtZQUNILE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1lBRS9JLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDN0MsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQzFCO0lBQ0wsQ0FBQztJQUVELGNBQWMsQ0FBQyxLQUFvQjtRQUMvQixNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6RSxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFMUQsSUFBSSxPQUFPLEVBQUU7WUFDVCxJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssWUFBWSxFQUFFO2dCQUNuQyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztnQkFFL0ksSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQzthQUNoRDtTQUNKO2FBQU07WUFDSCxJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssVUFBVSxJQUFJLFdBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUU7Z0JBQzlFLElBQUksYUFBYSxDQUFDLFdBQVcsS0FBSyxDQUFDLEVBQUU7b0JBQ2pDLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO29CQUMzSixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDN0I7YUFDSjtZQUVELE1BQU0sV0FBVyxHQUFHLGFBQWEsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1lBQ2xELE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFLLFdBQVcsQ0FBQyxDQUFDO1lBRTFGLFNBQVMsS0FBSyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMscUJBQXFCLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1NBQ3BFO1FBRUQsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxTQUFTLENBQUMsS0FBb0I7UUFDMUIsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDO1FBQzdELEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsUUFBUSxDQUFDLEtBQW9CO1FBQ3pCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQztRQUM1RCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELFVBQVUsQ0FBQyxLQUFvQjtRQUMzQixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRCxXQUFXLENBQUMsS0FBb0I7UUFDNUIsSUFBSSxXQUFXLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFO1lBQzNDLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZILElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzdCO1FBRUQsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxRQUFRLENBQUMsS0FBb0I7UUFDekIsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ3JDLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3pFLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUUxRCxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsQ0FBQyxDQUFDO1NBQzFFO1FBRUQsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxVQUFVLENBQUMsS0FBb0I7UUFDM0IsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ3JDLE1BQU0sT0FBTyxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzdHLE1BQU0sYUFBYSxHQUFHLE9BQU8sSUFBSSxVQUFVLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSw2QkFBNkIsQ0FBQyxDQUFDO1lBRS9GLGFBQWEsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBRW5FLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3RFLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUUxRCxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMscUJBQXFCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDLENBQUM7U0FDbkY7UUFFRCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELGVBQWUsQ0FBQyxLQUFLO1FBQ2pCLE9BQU8sV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUN2RixDQUFDO0lBRUQsd0JBQXdCO1FBQ3BCLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQ25ELE9BQU8sYUFBYSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQztJQUN4RSxDQUFDO0lBRUQsaUJBQWlCO1FBQ2IsT0FBTyxXQUFXLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztJQUM1RyxDQUFDO0lBRUQsaUJBQWlCLENBQUMsS0FBYTtRQUMzQixNQUFNLGdCQUFnQixHQUFHLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTNKLE9BQU8sZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDNUQsQ0FBQztJQUVELGlCQUFpQixDQUFDLEtBQWE7UUFDM0IsTUFBTSxnQkFBZ0IsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXRLLE9BQU8sZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixHQUFHLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUN4RSxDQUFDO0lBRUQsa0JBQWtCO1FBQ2QsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDcEMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUU7Z0JBQ3RCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsUUFBUSxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7b0JBQ3RGLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUMzQixDQUFDLENBQUMsQ0FBQzthQUNOO1NBQ0o7SUFDTCxDQUFDO0lBRUQsd0JBQXdCO1FBQ3BCLElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3BDLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUU7Z0JBQzVCLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO29CQUMvRSxNQUFNLGtCQUFrQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLGFBQWEsS0FBSyxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBRXJJLElBQUksa0JBQWtCLEVBQUU7d0JBQ3BCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztxQkFDZjtnQkFDTCxDQUFDLENBQUMsQ0FBQzthQUNOO1NBQ0o7SUFDTCxDQUFDO0lBRUQsMEJBQTBCO1FBQ3RCLElBQUksSUFBSSxDQUFDLG9CQUFvQixFQUFFO1lBQzNCLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1lBQzVCLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUM7U0FDcEM7SUFDTCxDQUFDO0lBRUQsb0JBQW9CO1FBQ2hCLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUNyQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7U0FDOUI7SUFDTCxDQUFDO0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO0lBQ2hDLENBQUM7dUdBcnBCUSxRQUFRLGtCQXFIRyxRQUFRLGFBQXNDLFdBQVc7MkZBckhwRSxRQUFRLHFVQXFEQSxhQUFhLDhOQXZHcEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQTBDVCw0NURBdk1RLFdBQVc7OzJGQStNWCxRQUFRO2tCQXBEcEIsU0FBUzsrQkFDSSxZQUFZLFlBQ1o7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQTBDVCxtQkFDZ0IsdUJBQXVCLENBQUMsTUFBTSxpQkFDaEMsaUJBQWlCLENBQUMsSUFBSSxRQUUvQjt3QkFDRixLQUFLLEVBQUUsV0FBVztxQkFDckI7OzBCQXVIWSxNQUFNOzJCQUFDLFFBQVE7OzBCQUErQixNQUFNOzJCQUFDLFdBQVc7c0pBaEhoRSxLQUFLO3NCQUFqQixLQUFLO2dCQVdHLEtBQUs7c0JBQWIsS0FBSztnQkFLRyxVQUFVO3NCQUFsQixLQUFLO2dCQUtHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBS0csRUFBRTtzQkFBVixLQUFLO2dCQUtHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBS0csY0FBYztzQkFBdEIsS0FBSztnQkFLRyxRQUFRO3NCQUFoQixLQUFLO2dCQUtHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBRTBCLFNBQVM7c0JBQXhDLGVBQWU7dUJBQUMsYUFBYTtnQkFFTCxVQUFVO3NCQUFsQyxTQUFTO3VCQUFDLFlBQVk7Z0JBRUEsUUFBUTtzQkFBOUIsU0FBUzt1QkFBQyxVQUFVOztBQW9tQnpCLE1BQU0sT0FBTyxjQUFjO3VHQUFkLGNBQWM7d0dBQWQsY0FBYyxpQkE3cEJkLFFBQVEsRUEvTVIsV0FBVyxhQXcyQlYsWUFBWSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUUsY0FBYyxhQXpwQnJHLFFBQVEsRUEwcEJHLFlBQVksRUFBRSxhQUFhLEVBQUUsWUFBWTt3R0FHcEQsY0FBYyxZQUpiLFlBQVksRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLGNBQWMsRUFDMUYsWUFBWSxFQUFFLGFBQWEsRUFBRSxZQUFZOzsyRkFHcEQsY0FBYztrQkFMMUIsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxjQUFjLENBQUM7b0JBQy9HLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLFlBQVksQ0FBQztvQkFDOUQsWUFBWSxFQUFFLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQztpQkFDeEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUsIERPQ1VNRU5ULCBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZHJlbixcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbmplY3QsXG4gICAgSW5wdXQsXG4gICAgTmdNb2R1bGUsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBPdXRwdXQsXG4gICAgUExBVEZPUk1fSUQsXG4gICAgUXVlcnlMaXN0LFxuICAgIFJlbmRlcmVyMixcbiAgICBUZW1wbGF0ZVJlZixcbiAgICBWaWV3Q2hpbGQsXG4gICAgVmlld0VuY2Fwc3VsYXRpb24sXG4gICAgZWZmZWN0LFxuICAgIGZvcndhcmRSZWYsXG4gICAgc2lnbmFsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IE1lZ2FNZW51SXRlbSwgUHJpbWVOR0NvbmZpZywgUHJpbWVUZW1wbGF0ZSwgU2hhcmVkTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgRG9tSGFuZGxlciB9IGZyb20gJ3ByaW1lbmcvZG9tJztcbmltcG9ydCB7IEFuZ2xlRG93bkljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL2FuZ2xlZG93bic7XG5pbXBvcnQgeyBBbmdsZVJpZ2h0SWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvYW5nbGVyaWdodCc7XG5pbXBvcnQgeyBSaXBwbGVNb2R1bGUgfSBmcm9tICdwcmltZW5nL3JpcHBsZSc7XG5pbXBvcnQgeyBUb29sdGlwTW9kdWxlIH0gZnJvbSAncHJpbWVuZy90b29sdGlwJztcbmltcG9ydCB7IFZvaWRMaXN0ZW5lciB9IGZyb20gJ3ByaW1lbmcvdHMtaGVscGVycyc7XG5pbXBvcnQgeyBPYmplY3RVdGlscywgVW5pcXVlQ29tcG9uZW50SWQgfSBmcm9tICdwcmltZW5nL3V0aWxzJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLW1lZ2FNZW51U3ViJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8dWxcbiAgICAgICAgICAgICNtZW51YmFyXG4gICAgICAgICAgICBbbmdDbGFzc109XCJ7ICdwLW1lZ2FtZW51LXJvb3QtbGlzdCc6IHJvb3QsICdwLXN1Ym1lbnUtbGlzdCBwLW1lZ2FtZW51LXN1Ym1lbnUnOiAhcm9vdCB9XCJcbiAgICAgICAgICAgIFthdHRyLnJvbGVdPVwicm9vdCA/ICdtZW51YmFyJyA6ICdtZW51J1wiXG4gICAgICAgICAgICBbYXR0ci5pZF09XCJpZFwiXG4gICAgICAgICAgICBbYXR0ci5hcmlhLW9yaWVudGF0aW9uXT1cIm9yaWVudGF0aW9uXCJcbiAgICAgICAgICAgIFt0YWJpbmRleF09XCJ0YWJpbmRleFwiXG4gICAgICAgICAgICBbYXR0ci5hcmlhLWFjdGl2ZWRlc2NlbmRhbnRdPVwiZm9jdXNlZEl0ZW1JZFwiXG4gICAgICAgICAgICBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwicm9vdCA/ICdyb290JyA6ICdzdWJtZW51J1wiXG4gICAgICAgICAgICAoa2V5ZG93bik9XCJtZW51S2V5ZG93bi5lbWl0KCRldmVudClcIlxuICAgICAgICAgICAgKGZvY3VzKT1cIm1lbnVGb2N1cy5lbWl0KCRldmVudClcIlxuICAgICAgICAgICAgKGJsdXIpPVwibWVudUJsdXIuZW1pdCgkZXZlbnQpXCJcbiAgICAgICAgPlxuICAgICAgICAgICAgPGxpICpuZ0lmPVwic3VibWVudVwiIFtuZ0NsYXNzXT1cImdldFN1Ym1lbnVIZWFkZXJDbGFzcyhzdWJtZW51KVwiIFtzdHlsZV09XCJnZXRJdGVtUHJvcChzdWJtZW51LCAnc3R5bGUnKVwiIHJvbGU9XCJwcmVzZW50YXRpb25cIj57eyBnZXRJdGVtTGFiZWwoc3VibWVudSkgfX08L2xpPlxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC1wcm9jZXNzZWRJdGVtIFtuZ0Zvck9mXT1cIml0ZW1zXCIgbGV0LWluZGV4PVwiaW5kZXhcIj5cbiAgICAgICAgICAgICAgICA8bGlcbiAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJpc0l0ZW1WaXNpYmxlKHByb2Nlc3NlZEl0ZW0pICYmIGdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdzZXBhcmF0b3InKVwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmlkXT1cImdldEl0ZW1JZChwcm9jZXNzZWRJdGVtKVwiXG4gICAgICAgICAgICAgICAgICAgIFtzdHlsZV09XCJnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnc3R5bGUnKVwiXG4gICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cImdldFNlcGFyYXRvckl0ZW1DbGFzcyhwcm9jZXNzZWRJdGVtKVwiXG4gICAgICAgICAgICAgICAgICAgIHJvbGU9XCJzZXBhcmF0b3JcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ3NlcGFyYXRvcidcIlxuICAgICAgICAgICAgICAgID48L2xpPlxuICAgICAgICAgICAgICAgIDxsaVxuICAgICAgICAgICAgICAgICAgICAjbGlzdEl0ZW1cbiAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJpc0l0ZW1WaXNpYmxlKHByb2Nlc3NlZEl0ZW0pICYmICFnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnc2VwYXJhdG9yJylcIlxuICAgICAgICAgICAgICAgICAgICByb2xlPVwibWVudWl0ZW1cIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5pZF09XCJnZXRJdGVtSWQocHJvY2Vzc2VkSXRlbSlcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ21lbnVpdGVtJ1wiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcC1oaWdobGlnaHRdPVwiaXNJdGVtQWN0aXZlKHByb2Nlc3NlZEl0ZW0pXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wLWZvY3VzZWRdPVwiaXNJdGVtRm9jdXNlZChwcm9jZXNzZWRJdGVtKVwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcC1kaXNhYmxlZF09XCJpc0l0ZW1EaXNhYmxlZChwcm9jZXNzZWRJdGVtKVwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiZ2V0SXRlbUxhYmVsKHByb2Nlc3NlZEl0ZW0pXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1kaXNhYmxlZF09XCJpc0l0ZW1EaXNhYmxlZChwcm9jZXNzZWRJdGVtKSB8fCB1bmRlZmluZWRcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWhhc3BvcHVwXT1cImlzSXRlbUdyb3VwKHByb2Nlc3NlZEl0ZW0pICYmICFnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAndG8nKSA/ICdtZW51JyA6IHVuZGVmaW5lZFwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtZXhwYW5kZWRdPVwiaXNJdGVtR3JvdXAocHJvY2Vzc2VkSXRlbSkgPyBpc0l0ZW1BY3RpdmUocHJvY2Vzc2VkSXRlbSkgOiB1bmRlZmluZWRcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxldmVsXT1cImxldmVsICsgMVwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtc2V0c2l6ZV09XCJnZXRBcmlhU2V0U2l6ZSgpXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1wb3NpbnNldF09XCJnZXRBcmlhUG9zSW5zZXQoaW5kZXgpXCJcbiAgICAgICAgICAgICAgICAgICAgW25nU3R5bGVdPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ3N0eWxlJylcIlxuICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJnZXRJdGVtQ2xhc3MocHJvY2Vzc2VkSXRlbSlcIlxuICAgICAgICAgICAgICAgICAgICBbY2xhc3NdPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ3N0eWxlQ2xhc3MnKVwiXG4gICAgICAgICAgICAgICAgICAgIHBUb29sdGlwXG4gICAgICAgICAgICAgICAgICAgIFt0b29sdGlwT3B0aW9uc109XCJnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAndG9vbHRpcE9wdGlvbnMnKVwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1tZW51aXRlbS1jb250ZW50XCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidjb250ZW50J1wiIChjbGljayk9XCJvbkl0ZW1DbGljaygkZXZlbnQsIHByb2Nlc3NlZEl0ZW0pXCIgKG1vdXNlZW50ZXIpPVwib25JdGVtTW91c2VFbnRlcih7JGV2ZW50LCBwcm9jZXNzZWRJdGVtfSlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhaXRlbVRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCIhZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ3JvdXRlckxpbmsnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmhyZWZdPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ3VybCcpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1oaWRkZW5dPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtYXV0b21hdGlvbmlkXT1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdhdXRvbWF0aW9uSWQnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInYWN0aW9uJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0YXJnZXRdPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ3RhcmdldCcpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyAncC1tZW51aXRlbS1saW5rJzogdHJ1ZSwgJ3AtZGlzYWJsZWQnOiBnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnZGlzYWJsZWQnKSB9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIudGFiaW5kZXhdPVwiLTFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwUmlwcGxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnaWNvbicpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC1tZW51aXRlbS1pY29uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdpY29uJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nU3R5bGVdPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ2ljb25TdHlsZScpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInaWNvbidcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1oaWRkZW5dPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci50YWJpbmRleF09XCItMVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdlc2NhcGUnKTsgZWxzZSBodG1sTGFiZWxcIiBjbGFzcz1cInAtbWVudWl0ZW0tdGV4dFwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInbGFiZWwnXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyBnZXRJdGVtTGFiZWwocHJvY2Vzc2VkSXRlbSkgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI2h0bWxMYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1tZW51aXRlbS10ZXh0XCIgW2lubmVySFRNTF09XCJnZXRJdGVtTGFiZWwocHJvY2Vzc2VkSXRlbSlcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ2xhYmVsJ1wiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLW1lbnVpdGVtLWJhZGdlXCIgKm5nSWY9XCJnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnYmFkZ2UnKVwiIFtuZ0NsYXNzXT1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdiYWRnZVN0eWxlQ2xhc3MnKVwiPnt7IGdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdiYWRnZScpIH19PC9zcGFuPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJpc0l0ZW1Hcm91cChwcm9jZXNzZWRJdGVtKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFtZWdhTWVudS5zdWJtZW51SWNvblRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEFuZ2xlRG93bkljb24gW3N0eWxlQ2xhc3NdPVwiJ3Atc3VibWVudS1pY29uJ1wiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInc3VibWVudWljb24nXCIgKm5nSWY9XCJvcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnXCIgW2F0dHIuYXJpYS1oaWRkZW5dPVwidHJ1ZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEFuZ2xlUmlnaHRJY29uIFtzdHlsZUNsYXNzXT1cIidwLXN1Ym1lbnUtaWNvbidcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ3N1Ym1lbnVpY29uJ1wiICpuZ0lmPVwib3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCdcIiBbYXR0ci5hcmlhLWhpZGRlbl09XCJ0cnVlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwibWVnYU1lbnUuc3VibWVudUljb25UZW1wbGF0ZVwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInc3VibWVudWljb24nXCIgW2F0dHIuYXJpYS1oaWRkZW5dPVwidHJ1ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqbmdJZj1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdyb3V0ZXJMaW5rJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcm91dGVyTGlua109XCJnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAncm91dGVyTGluaycpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1hdXRvbWF0aW9uaWRdPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ2F1dG9tYXRpb25JZCcpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIudGFiaW5kZXhdPVwiLTFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWhpZGRlbl09XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidhY3Rpb24nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3F1ZXJ5UGFyYW1zXT1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdxdWVyeVBhcmFtcycpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3JvdXRlckxpbmtBY3RpdmVdPVwiJ3AtbWVudWl0ZW0tbGluay1hY3RpdmUnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3JvdXRlckxpbmtBY3RpdmVPcHRpb25zXT1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdyb3V0ZXJMaW5rQWN0aXZlT3B0aW9ucycpIHx8IHsgZXhhY3Q6IGZhbHNlIH1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGFyZ2V0XT1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICd0YXJnZXQnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsgJ3AtbWVudWl0ZW0tbGluayc6IHRydWUsICdwLWRpc2FibGVkJzogZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ2Rpc2FibGVkJykgfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtmcmFnbWVudF09XCJnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnZnJhZ21lbnQnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtxdWVyeVBhcmFtc0hhbmRsaW5nXT1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdxdWVyeVBhcmFtc0hhbmRsaW5nJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcHJlc2VydmVGcmFnbWVudF09XCJnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAncHJlc2VydmVGcmFnbWVudCcpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3NraXBMb2NhdGlvbkNoYW5nZV09XCJnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnc2tpcExvY2F0aW9uQ2hhbmdlJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcmVwbGFjZVVybF09XCJnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAncmVwbGFjZVVybCcpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3N0YXRlXT1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdzdGF0ZScpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcFJpcHBsZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC1tZW51aXRlbS1pY29uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ2ljb24nKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnaWNvbicpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdpY29uU3R5bGUnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ2ljb24nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtaGlkZGVuXT1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIudGFiaW5kZXhdPVwiLTFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtbWVudWl0ZW0tdGV4dFwiICpuZ0lmPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ2VzY2FwZScpOyBlbHNlIGh0bWxSb3V0ZUxhYmVsXCI+e3sgZ2V0SXRlbUxhYmVsKHByb2Nlc3NlZEl0ZW0pIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI2h0bWxSb3V0ZUxhYmVsPjxzcGFuIGNsYXNzPVwicC1tZW51aXRlbS10ZXh0XCIgW2lubmVySFRNTF09XCJnZXRJdGVtTGFiZWwocHJvY2Vzc2VkSXRlbSlcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ2xhYmVsJ1wiPjwvc3Bhbj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtbWVudWl0ZW0tYmFkZ2VcIiAqbmdJZj1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdiYWRnZScpXCIgW25nQ2xhc3NdPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ2JhZGdlU3R5bGVDbGFzcycpXCI+e3sgZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ2JhZGdlJykgfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJpc0l0ZW1Hcm91cChwcm9jZXNzZWRJdGVtKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFtZWdhTWVudS5zdWJtZW51SWNvblRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEFuZ2xlRG93bkljb24gW3N0eWxlQ2xhc3NdPVwiJ3Atc3VibWVudS1pY29uJ1wiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInc3VibWVudWljb24nXCIgKm5nSWY9XCJvcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnXCIgW2F0dHIuYXJpYS1oaWRkZW5dPVwidHJ1ZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEFuZ2xlUmlnaHRJY29uIFtzdHlsZUNsYXNzXT1cIidwLXN1Ym1lbnUtaWNvbidcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ3N1Ym1lbnVpY29uJ1wiICpuZ0lmPVwib3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCdcIiBbYXR0ci5hcmlhLWhpZGRlbl09XCJ0cnVlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwibWVnYU1lbnUuc3VibWVudUljb25UZW1wbGF0ZVwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInc3VibWVudWljb24nXCIgW2F0dHIuYXJpYS1oaWRkZW5dPVwidHJ1ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIml0ZW1UZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cIml0ZW1UZW1wbGF0ZTsgY29udGV4dDogeyAkaW1wbGljaXQ6IHByb2Nlc3NlZEl0ZW0uaXRlbSB9XCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cImlzSXRlbVZpc2libGUocHJvY2Vzc2VkSXRlbSkgJiYgaXNJdGVtR3JvdXAocHJvY2Vzc2VkSXRlbSlcIiBjbGFzcz1cInAtbWVnYW1lbnUtcGFuZWxcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ3BhbmVsJ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtbWVnYW1lbnUtZ3JpZFwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInZ3JpZCdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2ICpuZ0Zvcj1cImxldCBjb2wgb2YgcHJvY2Vzc2VkSXRlbS5pdGVtc1wiIFtuZ0NsYXNzXT1cImdldENvbHVtbkNsYXNzKHByb2Nlc3NlZEl0ZW0pXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwLW1lZ2FNZW51U3ViXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgc3VibWVudSBvZiBjb2xcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2lkXT1cImdldFN1Ykxpc3RJZChzdWJtZW51KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc3VibWVudV09XCJzdWJtZW51XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpdGVtc109XCJzdWJtZW51Lml0ZW1zXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpdGVtVGVtcGxhdGVdPVwiaXRlbVRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFttZW51SWRdPVwibWVudUlkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtmb2N1c2VkSXRlbUlkXT1cImZvY3VzZWRJdGVtSWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2xldmVsXT1cImxldmVsICsgMVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcm9vdF09XCJmYWxzZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoaXRlbUNsaWNrKT1cIml0ZW1DbGljay5lbWl0KCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGl0ZW1Nb3VzZUVudGVyKT1cIm9uSXRlbU1vdXNlRW50ZXIoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wLW1lZ2FNZW51U3ViPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8L3VsPlxuICAgIGAsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAncC1lbGVtZW50J1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWVnYU1lbnVTdWIge1xuICAgIEBJbnB1dCgpIGlkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoKSBpdGVtczogYW55W10gfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoKSBpdGVtVGVtcGxhdGU6IEhUTUxFbGVtZW50IHwgdW5kZWZpbmVkO1xuXG4gICAgQElucHV0KCkgbWVudUlkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoKSBhcmlhTGFiZWw6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCgpIGFyaWFMYWJlbGxlZEJ5OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoKSBsZXZlbDogbnVtYmVyID0gMDtcblxuICAgIEBJbnB1dCgpIGZvY3VzZWRJdGVtSWQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKSBvcmllbnRhdGlvbjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICAgQElucHV0KCkgYWN0aXZlSXRlbTogYW55O1xuXG4gICAgQElucHV0KCkgc3VibWVudTogYW55O1xuXG4gICAgQElucHV0KCkgdGFiaW5kZXg6IG51bWJlciA9IDA7XG5cbiAgICBASW5wdXQoKSByb290OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBAT3V0cHV0KCkgaXRlbUNsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBpdGVtTW91c2VFbnRlcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgbWVudUZvY3VzOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBtZW51Qmx1cjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgbWVudUtleWRvd246IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQFZpZXdDaGlsZCgnbWVudWJhcicsIHsgc3RhdGljOiB0cnVlIH0pIG1lbnViYXJWaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYsIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBNZWdhTWVudSkpIHB1YmxpYyBtZWdhTWVudTogTWVnYU1lbnUpIHt9XG5cbiAgICBvbkl0ZW1DbGljayhldmVudDogYW55LCBwcm9jZXNzZWRJdGVtOiBhbnkpIHtcbiAgICAgICAgdGhpcy5nZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnY29tbWFuZCcsIHsgb3JpZ2luYWxFdmVudDogZXZlbnQsIGl0ZW06IHByb2Nlc3NlZEl0ZW0uaXRlbSB9KTtcbiAgICAgICAgdGhpcy5pdGVtQ2xpY2suZW1pdCh7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50LCBwcm9jZXNzZWRJdGVtLCBpc0ZvY3VzOiB0cnVlIH0pO1xuICAgIH1cblxuICAgIGdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW06IGFueSwgbmFtZTogc3RyaW5nLCBwYXJhbXM6IGFueSB8IG51bGwgPSBudWxsKSB7XG4gICAgICAgIHJldHVybiBwcm9jZXNzZWRJdGVtICYmIHByb2Nlc3NlZEl0ZW0uaXRlbSA/IE9iamVjdFV0aWxzLmdldEl0ZW1WYWx1ZShwcm9jZXNzZWRJdGVtLml0ZW1bbmFtZV0sIHBhcmFtcykgOiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgZ2V0SXRlbUlkKHByb2Nlc3NlZEl0ZW06IGFueSk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBwcm9jZXNzZWRJdGVtLml0ZW0gJiYgcHJvY2Vzc2VkSXRlbS5pdGVtPy5pZCA/IHByb2Nlc3NlZEl0ZW0uaXRlbS5pZCA6IGAke3RoaXMubWVudUlkfV8ke3Byb2Nlc3NlZEl0ZW0ua2V5fWA7XG4gICAgfVxuXG4gICAgZ2V0U3ViTGlzdElkKHByb2Nlc3NlZEl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuZ2V0SXRlbUlkKHByb2Nlc3NlZEl0ZW0pfV9saXN0YDtcbiAgICB9XG5cbiAgICBnZXRJdGVtQ2xhc3MocHJvY2Vzc2VkSXRlbTogYW55KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi50aGlzLmdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdjbGFzcycpLFxuICAgICAgICAgICAgJ3AtbWVudWl0ZW0nOiB0cnVlLFxuICAgICAgICAgICAgJ3AtbWVudWl0ZW0tYWN0aXZlIHAtaGlnaGxpZ2h0JzogdGhpcy5pc0l0ZW1BY3RpdmUocHJvY2Vzc2VkSXRlbSksXG4gICAgICAgICAgICAncC1mb2N1cyc6IHRoaXMuaXNJdGVtRm9jdXNlZChwcm9jZXNzZWRJdGVtKSxcbiAgICAgICAgICAgICdwLWRpc2FibGVkJzogdGhpcy5pc0l0ZW1EaXNhYmxlZChwcm9jZXNzZWRJdGVtKVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGdldEl0ZW1MYWJlbChwcm9jZXNzZWRJdGVtOiBhbnkpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnbGFiZWwnKTtcbiAgICB9XG5cbiAgICBnZXRTZXBhcmF0b3JJdGVtQ2xhc3MocHJvY2Vzc2VkSXRlbTogYW55KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi50aGlzLmdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdjbGFzcycpLFxuICAgICAgICAgICAgJ3AtbWVudWl0ZW0tc2VwYXJhdG9yJzogdHJ1ZVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGdldENvbHVtbkNsYXNzKHByb2Nlc3NlZEl0ZW0pIHtcbiAgICAgICAgbGV0IGxlbmd0aCA9IHRoaXMuaXNJdGVtR3JvdXAocHJvY2Vzc2VkSXRlbSkgPyBwcm9jZXNzZWRJdGVtLml0ZW1zLmxlbmd0aCA6IDA7XG4gICAgICAgIGxldCBjb2x1bW5DbGFzcztcblxuICAgICAgICBzd2l0Y2ggKGxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIGNvbHVtbkNsYXNzID0gJ3AtbWVnYW1lbnUtY29sLTYnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgY29sdW1uQ2xhc3MgPSAncC1tZWdhbWVudS1jb2wtNCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICBjb2x1bW5DbGFzcyA9ICdwLW1lZ2FtZW51LWNvbC0zJztcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICAgIGNvbHVtbkNsYXNzID0gJ3AtbWVnYW1lbnUtY29sLTInO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGNvbHVtbkNsYXNzID0gJ3AtbWVnYW1lbnUtY29sLTEyJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjb2x1bW5DbGFzcztcbiAgICB9XG5cbiAgICBnZXRTdWJtZW51SGVhZGVyQ2xhc3MocHJvY2Vzc2VkSXRlbSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJ3AtbWVnYW1lbnUtc3VibWVudS1oZWFkZXIgcC1zdWJtZW51LWhlYWRlcic6IHRydWUsXG4gICAgICAgICAgICAncC1kaXNhYmxlZCc6IHRoaXMuaXNJdGVtRGlzYWJsZWQocHJvY2Vzc2VkSXRlbSksXG4gICAgICAgICAgICAuLi50aGlzLmdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdjbGFzcycpXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgaXNJdGVtVmlzaWJsZShwcm9jZXNzZWRJdGVtOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ3Zpc2libGUnKSAhPT0gZmFsc2U7XG4gICAgfVxuXG4gICAgaXNJdGVtQWN0aXZlKHByb2Nlc3NlZEl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdFV0aWxzLmlzTm90RW1wdHkodGhpcy5hY3RpdmVJdGVtKSA/IHRoaXMuYWN0aXZlSXRlbS5rZXkgPT09IHByb2Nlc3NlZEl0ZW0ua2V5IDogZmFsc2U7XG4gICAgfVxuXG4gICAgaXNJdGVtRGlzYWJsZWQocHJvY2Vzc2VkSXRlbTogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdkaXNhYmxlZCcpO1xuICAgIH1cblxuICAgIGlzSXRlbUZvY3VzZWQocHJvY2Vzc2VkSXRlbTogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmZvY3VzZWRJdGVtSWQgPT09IHRoaXMuZ2V0SXRlbUlkKHByb2Nlc3NlZEl0ZW0pO1xuICAgIH1cblxuICAgIGlzSXRlbUdyb3VwKHByb2Nlc3NlZEl0ZW06IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gT2JqZWN0VXRpbHMuaXNOb3RFbXB0eShwcm9jZXNzZWRJdGVtLml0ZW1zKTtcbiAgICB9XG5cbiAgICBnZXRBcmlhU2V0U2l6ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbXMuZmlsdGVyKChwcm9jZXNzZWRJdGVtKSA9PiB0aGlzLmlzSXRlbVZpc2libGUocHJvY2Vzc2VkSXRlbSkgJiYgIXRoaXMuZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ3NlcGFyYXRvcicpKS5sZW5ndGg7XG4gICAgfVxuXG4gICAgZ2V0QXJpYVBvc0luc2V0KGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIGluZGV4IC0gdGhpcy5pdGVtcy5zbGljZSgwLCBpbmRleCkuZmlsdGVyKChwcm9jZXNzZWRJdGVtKSA9PiB0aGlzLmlzSXRlbVZpc2libGUocHJvY2Vzc2VkSXRlbSkgJiYgdGhpcy5nZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnc2VwYXJhdG9yJykpLmxlbmd0aCArIDE7XG4gICAgfVxuXG4gICAgb25JdGVtTW91c2VFbnRlcihwYXJhbTogYW55KSB7XG4gICAgICAgIGNvbnN0IHsgZXZlbnQsIHByb2Nlc3NlZEl0ZW0gfSA9IHBhcmFtO1xuICAgICAgICB0aGlzLml0ZW1Nb3VzZUVudGVyLmVtaXQoeyBvcmlnaW5hbEV2ZW50OiBldmVudCwgcHJvY2Vzc2VkSXRlbSB9KTtcbiAgICB9XG59XG4vKipcbiAqIE1lZ2FNZW51IGlzIG5hdmlnYXRpb24gY29tcG9uZW50IHRoYXQgZGlzcGxheXMgc3VibWVudXMgdG9nZXRoZXIuXG4gKiBAZ3JvdXAgQ29tcG9uZW50c1xuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtbWVnYU1lbnUnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXZcbiAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsgJ3AtbWVnYW1lbnUgcC1jb21wb25lbnQnOiB0cnVlLCAncC1tZWdhbWVudS1ob3Jpem9udGFsJzogb3JpZW50YXRpb24gPT0gJ2hvcml6b250YWwnLCAncC1tZWdhbWVudS12ZXJ0aWNhbCc6IG9yaWVudGF0aW9uID09ICd2ZXJ0aWNhbCcgfVwiXG4gICAgICAgICAgICBbY2xhc3NdPVwic3R5bGVDbGFzc1wiXG4gICAgICAgICAgICBbbmdTdHlsZV09XCJzdHlsZVwiXG4gICAgICAgICAgICBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ3Jvb3QnXCJcbiAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtbmFtZV09XCInbWVnYW1lbnUnXCJcbiAgICAgICAgICAgIFthdHRyLmlkXT1cImlkXCJcbiAgICAgICAgPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtbWVnYW1lbnUtc3RhcnRcIiAqbmdJZj1cInN0YXJ0VGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwic3RhcnRUZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8cC1tZWdhTWVudVN1YlxuICAgICAgICAgICAgICAgICNyb290bWVudVxuICAgICAgICAgICAgICAgIFtpdGVtVGVtcGxhdGVdPVwiaXRlbVRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICBbaXRlbXNdPVwicHJvY2Vzc2VkSXRlbXNcIlxuICAgICAgICAgICAgICAgIFthdHRyLmlkXT1cImlkICsgJ19saXN0J1wiXG4gICAgICAgICAgICAgICAgW21lbnVJZF09XCJpZFwiXG4gICAgICAgICAgICAgICAgW3Jvb3RdPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgW29yaWVudGF0aW9uXT1cIm9yaWVudGF0aW9uXCJcbiAgICAgICAgICAgICAgICBbYXJpYUxhYmVsXT1cImFyaWFMYWJlbFwiXG4gICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgICAgICAgICBbdGFiaW5kZXhdPVwiIWRpc2FibGVkID8gdGFiaW5kZXggOiAtMVwiXG4gICAgICAgICAgICAgICAgW2FjdGl2ZUl0ZW1dPVwiYWN0aXZlSXRlbSgpXCJcbiAgICAgICAgICAgICAgICBbbGV2ZWxdPVwiMFwiXG4gICAgICAgICAgICAgICAgW2FyaWFMYWJlbGxlZEJ5XT1cImFyaWFMYWJlbGxlZEJ5XCJcbiAgICAgICAgICAgICAgICBbZm9jdXNlZEl0ZW1JZF09XCJmb2N1c2VkID8gZm9jdXNlZEl0ZW1JZCA6IHVuZGVmaW5lZFwiXG4gICAgICAgICAgICAgICAgKGl0ZW1DbGljayk9XCJvbkl0ZW1DbGljaygkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAobWVudUZvY3VzKT1cIm9uTWVudUZvY3VzKCRldmVudClcIlxuICAgICAgICAgICAgICAgIChtZW51Qmx1cik9XCJvbk1lbnVCbHVyKCRldmVudClcIlxuICAgICAgICAgICAgICAgIChtZW51S2V5ZG93bik9XCJvbktleURvd24oJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgKGl0ZW1Nb3VzZUVudGVyKT1cIm9uSXRlbU1vdXNlRW50ZXIoJGV2ZW50KVwiXG4gICAgICAgICAgICA+PC9wLW1lZ2FNZW51U3ViPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtbWVnYW1lbnUtZW5kXCIgKm5nSWY9XCJlbmRUZW1wbGF0ZTsgZWxzZSBsZWdhY3lcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiZW5kVGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNsZWdhY3k+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtbWVnYW1lbnUtZW5kXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBzdHlsZVVybHM6IFsnLi9tZWdhbWVudS5jc3MnXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAncC1lbGVtZW50J1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWVnYU1lbnUgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3ksIE9uSW5pdCB7XG4gICAgLyoqXG4gICAgICogQW4gYXJyYXkgb2YgbWVudWl0ZW1zLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHNldCBtb2RlbCh2YWx1ZTogTWVnYU1lbnVJdGVtW10gfCB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5fbW9kZWwgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5fcHJvY2Vzc2VkSXRlbXMgPSB0aGlzLmNyZWF0ZVByb2Nlc3NlZEl0ZW1zKHRoaXMuX21vZGVsIHx8IFtdKTtcbiAgICB9XG4gICAgZ2V0IG1vZGVsKCk6IE1lZ2FNZW51SXRlbVtdIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21vZGVsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbmxpbmUgc3R5bGUgb2YgdGhlIGVsZW1lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc3R5bGU6IHsgW2tsYXNzOiBzdHJpbmddOiBhbnkgfSB8IG51bGwgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogQ2xhc3Mgb2YgdGhlIGVsZW1lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgdGhlIG9yaWVudGF0aW9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIG9yaWVudGF0aW9uOiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnIHwgc3RyaW5nID0gJ2hvcml6b250YWwnO1xuICAgIC8qKlxuICAgICAqIEN1cnJlbnQgaWQgc3RhdGUgYXMgYSBzdHJpbmcuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgaWQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIGEgc3RyaW5nIHZhbHVlIHRoYXQgbGFiZWxzIGFuIGludGVyYWN0aXZlIGVsZW1lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgYXJpYUxhYmVsOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogSWRlbnRpZmllciBvZiB0aGUgdW5kZXJseWluZyBpbnB1dCBlbGVtZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGFyaWFMYWJlbGxlZEJ5OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hlbiBwcmVzZW50LCBpdCBzcGVjaWZpZXMgdGhhdCB0aGUgY29tcG9uZW50IHNob3VsZCBiZSBkaXNhYmxlZC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIC8qKlxuICAgICAqIEluZGV4IG9mIHRoZSBlbGVtZW50IGluIHRhYmJpbmcgb3JkZXIuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgdGFiaW5kZXg6IG51bWJlciA9IDA7XG5cbiAgICBAQ29udGVudENoaWxkcmVuKFByaW1lVGVtcGxhdGUpIHRlbXBsYXRlczogUXVlcnlMaXN0PFByaW1lVGVtcGxhdGU+IHwgdW5kZWZpbmVkO1xuXG4gICAgQFZpZXdDaGlsZCgnbWVudWJ1dHRvbicpIG1lbnVidXR0b246IEVsZW1lbnRSZWYgfCB1bmRlZmluZWQ7XG5cbiAgICBAVmlld0NoaWxkKCdyb290bWVudScpIHJvb3RtZW51OiBNZWdhTWVudVN1YiB8IHVuZGVmaW5lZDtcblxuICAgIHN0YXJ0VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG5cbiAgICBlbmRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcblxuICAgIG1lbnVJY29uVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG5cbiAgICBzdWJtZW51SWNvblRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xuXG4gICAgaXRlbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xuXG4gICAgb3V0c2lkZUNsaWNrTGlzdGVuZXI6IFZvaWRMaXN0ZW5lcjtcblxuICAgIHJlc2l6ZUxpc3RlbmVyOiBWb2lkTGlzdGVuZXI7XG5cbiAgICBkaXJ0eTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgZm9jdXNlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgYWN0aXZlSXRlbSA9IHNpZ25hbDxhbnk+KG51bGwpO1xuXG4gICAgZm9jdXNlZEl0ZW1JbmZvID0gc2lnbmFsPGFueT4oeyBpbmRleDogLTEsIGxldmVsOiAwLCBwYXJlbnRLZXk6ICcnLCBpdGVtOiBudWxsIH0pO1xuXG4gICAgc2VhcmNoVmFsdWU6IHN0cmluZyA9ICcnO1xuXG4gICAgc2VhcmNoVGltZW91dDogYW55O1xuXG4gICAgX3Byb2Nlc3NlZEl0ZW1zOiBhbnlbXTtcblxuICAgIF9tb2RlbDogTWVnYU1lbnVJdGVtW10gfCB1bmRlZmluZWQ7XG5cbiAgICBnZXQgdmlzaWJsZUl0ZW1zKCkge1xuICAgICAgICBjb25zdCBwcm9jZXNzZWRJdGVtID0gT2JqZWN0VXRpbHMuaXNOb3RFbXB0eSh0aGlzLmFjdGl2ZUl0ZW0oKSkgPyB0aGlzLmFjdGl2ZUl0ZW0oKSA6IG51bGw7XG5cbiAgICAgICAgcmV0dXJuIHByb2Nlc3NlZEl0ZW0gJiYgcHJvY2Vzc2VkSXRlbS5rZXkgPT09IHRoaXMuZm9jdXNlZEl0ZW1JbmZvKCkucGFyZW50S2V5XG4gICAgICAgICAgICA/IHByb2Nlc3NlZEl0ZW0uaXRlbXMucmVkdWNlKChpdGVtcywgY29sKSA9PiB7XG4gICAgICAgICAgICAgICAgICBjb2wuZm9yRWFjaCgoc3VibWVudSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIHN1Ym1lbnUuaXRlbXMuZm9yRWFjaCgoYSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtcy5wdXNoKGEpO1xuICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtcztcbiAgICAgICAgICAgICAgfSwgW10pXG4gICAgICAgICAgICA6IHRoaXMucHJvY2Vzc2VkSXRlbXM7XG4gICAgfVxuXG4gICAgZ2V0IHByb2Nlc3NlZEl0ZW1zKCkge1xuICAgICAgICBpZiAoIXRoaXMuX3Byb2Nlc3NlZEl0ZW1zIHx8ICF0aGlzLl9wcm9jZXNzZWRJdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuX3Byb2Nlc3NlZEl0ZW1zID0gdGhpcy5jcmVhdGVQcm9jZXNzZWRJdGVtcyh0aGlzLm1vZGVsIHx8IFtdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fcHJvY2Vzc2VkSXRlbXM7XG4gICAgfVxuXG4gICAgZ2V0IGZvY3VzZWRJdGVtSWQoKSB7XG4gICAgICAgIGNvbnN0IGZvY3VzZWRJdGVtID0gdGhpcy5mb2N1c2VkSXRlbUluZm8oKTtcbiAgICAgICAgcmV0dXJuIGZvY3VzZWRJdGVtPy5pdGVtICYmIGZvY3VzZWRJdGVtLml0ZW0/LmlkID8gZm9jdXNlZEl0ZW0uaXRlbS5pZCA6IE9iamVjdFV0aWxzLmlzTm90RW1wdHkoZm9jdXNlZEl0ZW0ua2V5KSA/IGAke3RoaXMuaWR9XyR7Zm9jdXNlZEl0ZW0ua2V5fWAgOiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IERvY3VtZW50LCBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IGFueSwgcHVibGljIGVsOiBFbGVtZW50UmVmLCBwdWJsaWMgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHVibGljIGNvbmZpZzogUHJpbWVOR0NvbmZpZywgcHVibGljIGNkOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgICAgICBlZmZlY3QoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYWN0aXZlSXRlbSA9IHRoaXMuYWN0aXZlSXRlbSgpO1xuICAgICAgICAgICAgaWYgKE9iamVjdFV0aWxzLmlzTm90RW1wdHkoYWN0aXZlSXRlbSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJpbmRPdXRzaWRlQ2xpY2tMaXN0ZW5lcigpO1xuICAgICAgICAgICAgICAgIHRoaXMuYmluZFJlc2l6ZUxpc3RlbmVyKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMudW5iaW5kT3V0c2lkZUNsaWNrTGlzdGVuZXIoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnVuYmluZFJlc2l6ZUxpc3RlbmVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmlkID0gdGhpcy5pZCB8fCBVbmlxdWVDb21wb25lbnRJZCgpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZXM/LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoaXRlbS5nZXRUeXBlKCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdzdGFydCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnZW5kJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmRUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnbWVudWljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1lbnVJY29uVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3N1Ym1lbnVpY29uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdWJtZW51SWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdpdGVtJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbVRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNyZWF0ZVByb2Nlc3NlZEl0ZW1zKGl0ZW1zLCBsZXZlbCA9IDAsIHBhcmVudCA9IHt9LCBwYXJlbnRLZXkgPSAnJywgY29sdW1uSW5kZXg/KSB7XG4gICAgICAgIGNvbnN0IHByb2Nlc3NlZEl0ZW1zID0gW107XG5cbiAgICAgICAgaXRlbXMgJiZcbiAgICAgICAgICAgIGl0ZW1zLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qga2V5ID0gKHBhcmVudEtleSAhPT0gJycgPyBwYXJlbnRLZXkgKyAnXycgOiAnJykgKyAoY29sdW1uSW5kZXggIT09IHVuZGVmaW5lZCA/IGNvbHVtbkluZGV4ICsgJ18nIDogJycpICsgaW5kZXg7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3SXRlbSA9IHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbSxcbiAgICAgICAgICAgICAgICAgICAgaW5kZXgsXG4gICAgICAgICAgICAgICAgICAgIGxldmVsLFxuICAgICAgICAgICAgICAgICAgICBrZXksXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudCxcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50S2V5LFxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5JbmRleDogY29sdW1uSW5kZXggIT09IHVuZGVmaW5lZCA/IGNvbHVtbkluZGV4IDogKDxhbnk+cGFyZW50KS5jb2x1bW5JbmRleCAhPT0gdW5kZWZpbmVkID8gKDxhbnk+cGFyZW50KS5jb2x1bW5JbmRleCA6IGluZGV4XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIG5ld0l0ZW1bJ2l0ZW1zJ10gPVxuICAgICAgICAgICAgICAgICAgICBsZXZlbCA9PT0gMCAmJiBpdGVtLml0ZW1zICYmIGl0ZW0uaXRlbXMubGVuZ3RoID4gMCA/IGl0ZW0uaXRlbXMubWFwKChfaXRlbXMsIF9pbmRleCkgPT4gdGhpcy5jcmVhdGVQcm9jZXNzZWRJdGVtcyhfaXRlbXMsIGxldmVsICsgMSwgbmV3SXRlbSwga2V5LCBfaW5kZXgpKSA6IHRoaXMuY3JlYXRlUHJvY2Vzc2VkSXRlbXMoaXRlbS5pdGVtcywgbGV2ZWwgKyAxLCBuZXdJdGVtLCBrZXkpO1xuICAgICAgICAgICAgICAgIHByb2Nlc3NlZEl0ZW1zLnB1c2gobmV3SXRlbSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHByb2Nlc3NlZEl0ZW1zO1xuICAgIH1cblxuICAgIGdldEl0ZW1Qcm9wKGl0ZW06IGFueSwgbmFtZTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBpdGVtID8gT2JqZWN0VXRpbHMuZ2V0SXRlbVZhbHVlKGl0ZW1bbmFtZV0pIDogdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIG9uSXRlbUNsaWNrKGV2ZW50OiBhbnkpIHtcbiAgICAgICAgY29uc3QgeyBvcmlnaW5hbEV2ZW50LCBwcm9jZXNzZWRJdGVtIH0gPSBldmVudDtcbiAgICAgICAgY29uc3QgZ3JvdXBlZCA9IHRoaXMuaXNQcm9jZXNzZWRJdGVtR3JvdXAocHJvY2Vzc2VkSXRlbSk7XG4gICAgICAgIGNvbnN0IHJvb3QgPSBPYmplY3RVdGlscy5pc0VtcHR5KHByb2Nlc3NlZEl0ZW0ucGFyZW50KTtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLmlzU2VsZWN0ZWQocHJvY2Vzc2VkSXRlbSk7XG5cbiAgICAgICAgaWYgKHNlbGVjdGVkKSB7XG4gICAgICAgICAgICBjb25zdCB7IGluZGV4LCBrZXksIHBhcmVudEtleSwgaXRlbSB9ID0gcHJvY2Vzc2VkSXRlbTtcblxuICAgICAgICAgICAgdGhpcy5hY3RpdmVJdGVtLnNldChudWxsKTtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNlZEl0ZW1JbmZvLnNldCh7IGluZGV4LCBrZXksIHBhcmVudEtleSwgaXRlbSB9KTtcblxuICAgICAgICAgICAgdGhpcy5kaXJ0eSA9ICFyb290O1xuICAgICAgICAgICAgRG9tSGFuZGxlci5mb2N1cyh0aGlzLnJvb3RtZW51Lm1lbnViYXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoZ3JvdXBlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMub25JdGVtQ2hhbmdlKGV2ZW50KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgcm9vdFByb2Nlc3NlZEl0ZW0gPSByb290ID8gcHJvY2Vzc2VkSXRlbSA6IHRoaXMuYWN0aXZlSXRlbSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZShvcmlnaW5hbEV2ZW50KTtcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUZvY3VzZWRJdGVtSW5mbyhvcmlnaW5hbEV2ZW50LCByb290UHJvY2Vzc2VkSXRlbSA/IHJvb3RQcm9jZXNzZWRJdGVtLmluZGV4IDogLTEpO1xuXG4gICAgICAgICAgICAgICAgRG9tSGFuZGxlci5mb2N1cyh0aGlzLnJvb3RtZW51Lm1lbnViYXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkl0ZW1Nb3VzZUVudGVyKGV2ZW50OiBhbnkpIHtcbiAgICAgICAgaWYgKCFEb21IYW5kbGVyLmlzVG91Y2hEZXZpY2UoKSkge1xuICAgICAgICAgICAgdGhpcy5vbkl0ZW1DaGFuZ2UoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2Nyb2xsSW5WaWV3KGluZGV4OiBudW1iZXIgPSAtMSkge1xuICAgICAgICBjb25zdCBpZCA9IGluZGV4ICE9PSAtMSA/IGAke3RoaXMuaWR9XyR7aW5kZXh9YCA6IHRoaXMuZm9jdXNlZEl0ZW1JZDtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IERvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLnJvb3RtZW51LmVsLm5hdGl2ZUVsZW1lbnQsIGBsaVtpZD1cIiR7aWR9XCJdYCk7XG5cbiAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuc2Nyb2xsSW50b1ZpZXcgJiYgZWxlbWVudC5zY3JvbGxJbnRvVmlldyh7IGJsb2NrOiAnbmVhcmVzdCcsIGlubGluZTogJ25lYXJlc3QnIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25JdGVtQ2hhbmdlKGV2ZW50OiBhbnkpIHtcbiAgICAgICAgY29uc3QgeyBwcm9jZXNzZWRJdGVtLCBpc0ZvY3VzIH0gPSBldmVudDtcblxuICAgICAgICBpZiAoT2JqZWN0VXRpbHMuaXNFbXB0eShwcm9jZXNzZWRJdGVtKSkgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IHsgaW5kZXgsIGtleSwgcGFyZW50S2V5LCBpdGVtcywgaXRlbSB9ID0gcHJvY2Vzc2VkSXRlbTtcbiAgICAgICAgY29uc3QgZ3JvdXBlZCA9IE9iamVjdFV0aWxzLmlzTm90RW1wdHkoaXRlbXMpO1xuXG4gICAgICAgIGlmIChncm91cGVkKSB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZUl0ZW0uc2V0KHByb2Nlc3NlZEl0ZW0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZm9jdXNlZEl0ZW1JbmZvLnNldCh7IGluZGV4LCBrZXksIHBhcmVudEtleSwgaXRlbSB9KTtcblxuICAgICAgICBncm91cGVkICYmICh0aGlzLmRpcnR5ID0gdHJ1ZSk7XG4gICAgICAgIGlzRm9jdXMgJiYgRG9tSGFuZGxlci5mb2N1cyh0aGlzLnJvb3RtZW51Lm1lbnViYXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuXG4gICAgaGlkZShldmVudD8sIGlzRm9jdXM/OiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlSXRlbS5zZXQobnVsbCk7XG4gICAgICAgIHRoaXMuZm9jdXNlZEl0ZW1JbmZvLnNldCh7IGluZGV4OiAtMSwga2V5OiAnJywgcGFyZW50S2V5OiAnJywgaXRlbTogbnVsbCB9KTtcblxuICAgICAgICBpc0ZvY3VzICYmIERvbUhhbmRsZXIuZm9jdXModGhpcy5yb290bWVudS5tZW51YmFyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICB0aGlzLmRpcnR5ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgb25NZW51Rm9jdXMoZXZlbnQ6IGFueSkge1xuICAgICAgICB0aGlzLmZvY3VzZWQgPSB0cnVlO1xuICAgICAgICBpZiAodGhpcy5mb2N1c2VkSXRlbUluZm8oKS5pbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5maW5kRmlyc3RGb2N1c2VkSXRlbUluZGV4KCk7XG4gICAgICAgICAgICBjb25zdCBwcm9jZXNzZWRJdGVtID0gdGhpcy5maW5kVmlzaWJsZUl0ZW0oaW5kZXgpO1xuXG4gICAgICAgICAgICB0aGlzLmZvY3VzZWRJdGVtSW5mby5zZXQoeyBpbmRleCwga2V5OiBwcm9jZXNzZWRJdGVtLmtleSwgcGFyZW50S2V5OiBwcm9jZXNzZWRJdGVtLnBhcmVudEtleSwgaXRlbTogcHJvY2Vzc2VkSXRlbS5pdGVtIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25NZW51Qmx1cihldmVudDogYW55KSB7XG4gICAgICAgIHRoaXMuZm9jdXNlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmZvY3VzZWRJdGVtSW5mby5zZXQoeyBpbmRleDogLTEsIGxldmVsOiAwLCBwYXJlbnRLZXk6ICcnLCBpdGVtOiBudWxsIH0pO1xuICAgICAgICB0aGlzLnNlYXJjaFZhbHVlID0gJyc7XG4gICAgICAgIHRoaXMuZGlydHkgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBvbktleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgY29uc3QgbWV0YUtleSA9IGV2ZW50Lm1ldGFLZXkgfHwgZXZlbnQuY3RybEtleTtcblxuICAgICAgICBzd2l0Y2ggKGV2ZW50LmNvZGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkFycm93RG93bktleShldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICAgICAgICAgIHRoaXMub25BcnJvd1VwS2V5KGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnQXJyb3dMZWZ0JzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uQXJyb3dMZWZ0S2V5KGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnQXJyb3dSaWdodCc6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkFycm93UmlnaHRLZXkoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdIb21lJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uSG9tZUtleShldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0VuZCc6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkVuZEtleShldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ1NwYWNlJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uU3BhY2VLZXkoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkVudGVyS2V5KGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnRXNjYXBlJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uRXNjYXBlS2V5KGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnVGFiJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uVGFiS2V5KGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnUGFnZURvd24nOlxuICAgICAgICAgICAgY2FzZSAnUGFnZVVwJzpcbiAgICAgICAgICAgIGNhc2UgJ0JhY2tzcGFjZSc6XG4gICAgICAgICAgICBjYXNlICdTaGlmdExlZnQnOlxuICAgICAgICAgICAgY2FzZSAnU2hpZnRSaWdodCc6XG4gICAgICAgICAgICAgICAgLy9OT09QXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgaWYgKCFtZXRhS2V5ICYmIE9iamVjdFV0aWxzLmlzUHJpbnRhYmxlQ2hhcmFjdGVyKGV2ZW50LmtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hJdGVtcyhldmVudCwgZXZlbnQua2V5KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZpbmRGaXJzdEZvY3VzZWRJdGVtSW5kZXgoKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkSW5kZXggPSB0aGlzLmZpbmRTZWxlY3RlZEl0ZW1JbmRleCgpO1xuXG4gICAgICAgIHJldHVybiBzZWxlY3RlZEluZGV4IDwgMCA/IHRoaXMuZmluZEZpcnN0SXRlbUluZGV4KCkgOiBzZWxlY3RlZEluZGV4O1xuICAgIH1cblxuICAgIGZpbmRGaXJzdEl0ZW1JbmRleCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmlzaWJsZUl0ZW1zLmZpbmRJbmRleCgocHJvY2Vzc2VkSXRlbSkgPT4gdGhpcy5pc1ZhbGlkSXRlbShwcm9jZXNzZWRJdGVtKSk7XG4gICAgfVxuXG4gICAgZmluZFNlbGVjdGVkSXRlbUluZGV4KCkge1xuICAgICAgICByZXR1cm4gdGhpcy52aXNpYmxlSXRlbXMuZmluZEluZGV4KChwcm9jZXNzZWRJdGVtKSA9PiB0aGlzLmlzVmFsaWRTZWxlY3RlZEl0ZW0ocHJvY2Vzc2VkSXRlbSkpO1xuICAgIH1cblxuICAgIGlzUHJvY2Vzc2VkSXRlbUdyb3VwKHByb2Nlc3NlZEl0ZW06IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gcHJvY2Vzc2VkSXRlbSAmJiBPYmplY3RVdGlscy5pc05vdEVtcHR5KHByb2Nlc3NlZEl0ZW0uaXRlbXMpO1xuICAgIH1cblxuICAgIGlzU2VsZWN0ZWQocHJvY2Vzc2VkSXRlbTogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBPYmplY3RVdGlscy5pc05vdEVtcHR5KHRoaXMuYWN0aXZlSXRlbSgpKSA/IHRoaXMuYWN0aXZlSXRlbSgpLmtleSA9PT0gcHJvY2Vzc2VkSXRlbS5rZXkgOiBmYWxzZTtcbiAgICB9XG5cbiAgICBpc1ZhbGlkU2VsZWN0ZWRJdGVtKHByb2Nlc3NlZEl0ZW06IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pc1ZhbGlkSXRlbShwcm9jZXNzZWRJdGVtKSAmJiB0aGlzLmlzU2VsZWN0ZWQocHJvY2Vzc2VkSXRlbSk7XG4gICAgfVxuXG4gICAgaXNWYWxpZEl0ZW0ocHJvY2Vzc2VkSXRlbTogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhIXByb2Nlc3NlZEl0ZW0gJiYgIXRoaXMuaXNJdGVtRGlzYWJsZWQocHJvY2Vzc2VkSXRlbS5pdGVtKSAmJiAhdGhpcy5pc0l0ZW1TZXBhcmF0b3IocHJvY2Vzc2VkSXRlbS5pdGVtKTtcbiAgICB9XG5cbiAgICBpc0l0ZW1EaXNhYmxlZChpdGVtOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SXRlbVByb3AoaXRlbSwgJ2Rpc2FibGVkJyk7XG4gICAgfVxuXG4gICAgaXNJdGVtU2VwYXJhdG9yKGl0ZW06IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRJdGVtUHJvcChpdGVtLCAnc2VwYXJhdG9yJyk7XG4gICAgfVxuXG4gICAgaXNJdGVtTWF0Y2hlZChwcm9jZXNzZWRJdGVtOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNWYWxpZEl0ZW0ocHJvY2Vzc2VkSXRlbSkgJiYgdGhpcy5nZXRQcm9jY2Vzc2VkSXRlbUxhYmVsKHByb2Nlc3NlZEl0ZW0pLnRvTG9jYWxlTG93ZXJDYXNlKCkuc3RhcnRzV2l0aCh0aGlzLnNlYXJjaFZhbHVlLnRvTG9jYWxlTG93ZXJDYXNlKCkpO1xuICAgIH1cblxuICAgIGlzUHJvY2Nlc3NlZEl0ZW1Hcm91cChwcm9jZXNzZWRJdGVtOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHByb2Nlc3NlZEl0ZW0gJiYgT2JqZWN0VXRpbHMuaXNOb3RFbXB0eShwcm9jZXNzZWRJdGVtLml0ZW1zKTtcbiAgICB9XG5cbiAgICBzZWFyY2hJdGVtcyhldmVudDogYW55LCBjaGFyOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5zZWFyY2hWYWx1ZSA9ICh0aGlzLnNlYXJjaFZhbHVlIHx8ICcnKSArIGNoYXI7XG5cbiAgICAgICAgbGV0IGl0ZW1JbmRleCA9IC0xO1xuICAgICAgICBsZXQgbWF0Y2hlZCA9IGZhbHNlO1xuXG4gICAgICAgIGlmICh0aGlzLmZvY3VzZWRJdGVtSW5mbygpLmluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgaXRlbUluZGV4ID0gdGhpcy52aXNpYmxlSXRlbXMuc2xpY2UodGhpcy5mb2N1c2VkSXRlbUluZm8oKS5pbmRleCkuZmluZEluZGV4KChwcm9jZXNzZWRJdGVtKSA9PiB0aGlzLmlzSXRlbU1hdGNoZWQocHJvY2Vzc2VkSXRlbSkpO1xuICAgICAgICAgICAgaXRlbUluZGV4ID0gaXRlbUluZGV4ID09PSAtMSA/IHRoaXMudmlzaWJsZUl0ZW1zLnNsaWNlKDAsIHRoaXMuZm9jdXNlZEl0ZW1JbmZvKCkuaW5kZXgpLmZpbmRJbmRleCgocHJvY2Vzc2VkSXRlbSkgPT4gdGhpcy5pc0l0ZW1NYXRjaGVkKHByb2Nlc3NlZEl0ZW0pKSA6IGl0ZW1JbmRleCArIHRoaXMuZm9jdXNlZEl0ZW1JbmZvKCkuaW5kZXg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpdGVtSW5kZXggPSB0aGlzLnZpc2libGVJdGVtcy5maW5kSW5kZXgoKHByb2Nlc3NlZEl0ZW0pID0+IHRoaXMuaXNJdGVtTWF0Y2hlZChwcm9jZXNzZWRJdGVtKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXRlbUluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgbWF0Y2hlZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXRlbUluZGV4ID09PSAtMSAmJiB0aGlzLmZvY3VzZWRJdGVtSW5mbygpLmluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgaXRlbUluZGV4ID0gdGhpcy5maW5kRmlyc3RGb2N1c2VkSXRlbUluZGV4KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXRlbUluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VGb2N1c2VkSXRlbUluZm8oZXZlbnQsIGl0ZW1JbmRleCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zZWFyY2hUaW1lb3V0KSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5zZWFyY2hUaW1lb3V0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2VhcmNoVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hWYWx1ZSA9ICcnO1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hUaW1lb3V0ID0gbnVsbDtcbiAgICAgICAgfSwgNTAwKTtcblxuICAgICAgICByZXR1cm4gbWF0Y2hlZDtcbiAgICB9XG5cbiAgICBnZXRQcm9jY2Vzc2VkSXRlbUxhYmVsKHByb2Nlc3NlZEl0ZW06IGFueSkge1xuICAgICAgICByZXR1cm4gcHJvY2Vzc2VkSXRlbSA/IHRoaXMuZ2V0SXRlbUxhYmVsKHByb2Nlc3NlZEl0ZW0uaXRlbSkgOiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgZ2V0SXRlbUxhYmVsKGl0ZW06IGFueSkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRJdGVtUHJvcChpdGVtLCAnbGFiZWwnKTtcbiAgICB9XG5cbiAgICBjaGFuZ2VGb2N1c2VkSXRlbUluZm8oZXZlbnQsIGluZGV4KSB7XG4gICAgICAgIGNvbnN0IHByb2Nlc3NlZEl0ZW0gPSB0aGlzLmZpbmRWaXNpYmxlSXRlbShpbmRleCk7XG4gICAgICAgIGlmIChPYmplY3RVdGlscy5pc05vdEVtcHR5KHByb2Nlc3NlZEl0ZW0pKSB7XG4gICAgICAgICAgICBjb25zdCB7IGtleSwgcGFyZW50S2V5LCBpdGVtIH0gPSBwcm9jZXNzZWRJdGVtO1xuICAgICAgICAgICAgdGhpcy5mb2N1c2VkSXRlbUluZm8uc2V0KHsgaW5kZXgsIGtleToga2V5ID8ga2V5IDogJycsIHBhcmVudEtleSwgaXRlbSB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2Nyb2xsSW5WaWV3KCk7XG4gICAgfVxuXG4gICAgb25BcnJvd0Rvd25LZXkoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMub3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICAgICAgaWYgKE9iamVjdFV0aWxzLmlzTm90RW1wdHkodGhpcy5hY3RpdmVJdGVtKCkpICYmIHRoaXMuYWN0aXZlSXRlbSgpLmtleSA9PT0gdGhpcy5mb2N1c2VkSXRlbUluZm8oKS5rZXkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGtleSwgaXRlbSB9ID0gdGhpcy5hY3RpdmVJdGVtKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5mb2N1c2VkSXRlbUluZm8uc2V0KHsgaW5kZXg6IC0xLCBrZXk6ICcnLCBwYXJlbnRLZXk6IGtleSwgaXRlbSB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvY2Vzc2VkSXRlbSA9IHRoaXMuZmluZFZpc2libGVJdGVtKHRoaXMuZm9jdXNlZEl0ZW1JbmZvKCkuaW5kZXgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGdyb3VwZWQgPSB0aGlzLmlzUHJvY2Nlc3NlZEl0ZW1Hcm91cChwcm9jZXNzZWRJdGVtKTtcblxuICAgICAgICAgICAgICAgIGlmIChncm91cGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgcGFyZW50S2V5LCBrZXksIGl0ZW0gfSA9IHByb2Nlc3NlZEl0ZW07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25JdGVtQ2hhbmdlKHsgb3JpZ2luYWxFdmVudDogZXZlbnQsIHByb2Nlc3NlZEl0ZW0gfSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNlZEl0ZW1JbmZvLnNldCh7IGluZGV4OiAtMSwga2V5OiBrZXksIHBhcmVudEtleTogcGFyZW50S2V5LCBpdGVtOiBpdGVtIH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaFZhbHVlID0gJyc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaXRlbUluZGV4ID0gdGhpcy5mb2N1c2VkSXRlbUluZm8oKS5pbmRleCAhPT0gLTEgPyB0aGlzLmZpbmROZXh0SXRlbUluZGV4KHRoaXMuZm9jdXNlZEl0ZW1JbmZvKCkuaW5kZXgpIDogdGhpcy5maW5kRmlyc3RGb2N1c2VkSXRlbUluZGV4KCk7XG4gICAgICAgIHRoaXMuY2hhbmdlRm9jdXNlZEl0ZW1JbmZvKGV2ZW50LCBpdGVtSW5kZXgpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIG9uQXJyb3dSaWdodEtleShldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBjb25zdCBwcm9jZXNzZWRJdGVtID0gdGhpcy5maW5kVmlzaWJsZUl0ZW0odGhpcy5mb2N1c2VkSXRlbUluZm8oKS5pbmRleCk7XG4gICAgICAgIGNvbnN0IGdyb3VwZWQgPSB0aGlzLmlzUHJvY2Nlc3NlZEl0ZW1Hcm91cChwcm9jZXNzZWRJdGVtKTtcblxuICAgICAgICBpZiAoZ3JvdXBlZCkge1xuICAgICAgICAgICAgaWYgKHRoaXMub3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgICAgICAgICAgICBpZiAoT2JqZWN0VXRpbHMuaXNOb3RFbXB0eSh0aGlzLmFjdGl2ZUl0ZW0oKSkgJiYgdGhpcy5hY3RpdmVJdGVtKCkua2V5ID09PSBwcm9jZXNzZWRJdGVtLmtleSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvY3VzZWRJdGVtSW5mby5zZXQoeyBpbmRleDogLTEsIGtleTogJycsIHBhcmVudEtleTogdGhpcy5hY3RpdmVJdGVtKCkua2V5LCBpdGVtOiBwcm9jZXNzZWRJdGVtLml0ZW0gfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvY2Vzc2VkSXRlbSA9IHRoaXMuZmluZFZpc2libGVJdGVtKHRoaXMuZm9jdXNlZEl0ZW1JbmZvKCkuaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBncm91cGVkID0gdGhpcy5pc1Byb2NjZXNzZWRJdGVtR3JvdXAocHJvY2Vzc2VkSXRlbSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGdyb3VwZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25JdGVtQ2hhbmdlKHsgb3JpZ2luYWxFdmVudDogZXZlbnQsIHByb2Nlc3NlZEl0ZW0gfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvY3VzZWRJdGVtSW5mby5zZXQoeyBpbmRleDogLTEsIGtleTogcHJvY2Vzc2VkSXRlbS5rZXksIHBhcmVudEtleTogcHJvY2Vzc2VkSXRlbS5wYXJlbnRLZXksIGl0ZW06IHByb2Nlc3NlZEl0ZW0uaXRlbSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoVmFsdWUgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgaXRlbUluZGV4ID0gdGhpcy5mb2N1c2VkSXRlbUluZm8oKS5pbmRleCAhPT0gLTEgPyB0aGlzLmZpbmROZXh0SXRlbUluZGV4KHRoaXMuZm9jdXNlZEl0ZW1JbmZvKCkuaW5kZXgpIDogdGhpcy5maW5kRmlyc3RGb2N1c2VkSXRlbUluZGV4KCk7XG5cbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRm9jdXNlZEl0ZW1JbmZvKGV2ZW50LCBpdGVtSW5kZXgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgY29sdW1uSW5kZXggPSBwcm9jZXNzZWRJdGVtLmNvbHVtbkluZGV4ICsgMTtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1JbmRleCA9IHRoaXMudmlzaWJsZUl0ZW1zLmZpbmRJbmRleCgoaXRlbSkgPT4gaXRlbS5jb2x1bW5JbmRleCA9PT0gY29sdW1uSW5kZXgpO1xuXG4gICAgICAgICAgICBpdGVtSW5kZXggIT09IC0xICYmIHRoaXMuY2hhbmdlRm9jdXNlZEl0ZW1JbmZvKGV2ZW50LCBpdGVtSW5kZXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvbkFycm93VXBLZXkoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LmFsdEtleSAmJiB0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmZvY3VzZWRJdGVtSW5mbygpLmluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb2Nlc3NlZEl0ZW0gPSB0aGlzLmZpbmRWaXNpYmxlSXRlbSh0aGlzLmZvY3VzZWRJdGVtSW5mbygpLmluZGV4KTtcbiAgICAgICAgICAgICAgICBjb25zdCBncm91cGVkID0gdGhpcy5pc1Byb2NjZXNzZWRJdGVtR3JvdXAocHJvY2Vzc2VkSXRlbSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWdyb3VwZWQgJiYgT2JqZWN0VXRpbHMuaXNOb3RFbXB0eSh0aGlzLmFjdGl2ZUl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmZvY3VzZWRJdGVtSW5mbygpLmluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvY3VzZWRJdGVtSW5mby5zZXQoeyBpbmRleDogdGhpcy5hY3RpdmVJdGVtKCkuaW5kZXgsIGtleTogdGhpcy5hY3RpdmVJdGVtKCkua2V5LCBwYXJlbnRLZXk6IHRoaXMuYWN0aXZlSXRlbSgpLnBhcmVudEtleSwgaXRlbTogcHJvY2Vzc2VkSXRlbS5pdGVtIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVJdGVtLnNldChudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRm9jdXNlZEl0ZW1JbmZvKGV2ZW50LCB0aGlzLmZpbmRGaXJzdEl0ZW1JbmRleCgpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1JbmRleCA9IHRoaXMuZm9jdXNlZEl0ZW1JbmZvKCkuaW5kZXggIT09IC0xID8gdGhpcy5maW5kUHJldkl0ZW1JbmRleCh0aGlzLmZvY3VzZWRJdGVtSW5mbygpLmluZGV4KSA6IHRoaXMuZmluZExhc3RGb2N1c2VkSXRlbUluZGV4KCk7XG5cbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRm9jdXNlZEl0ZW1JbmZvKGV2ZW50LCBpdGVtSW5kZXgpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQXJyb3dMZWZ0S2V5KGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHByb2Nlc3NlZEl0ZW0gPSB0aGlzLmZpbmRWaXNpYmxlSXRlbSh0aGlzLmZvY3VzZWRJdGVtSW5mbygpLmluZGV4KTtcbiAgICAgICAgY29uc3QgZ3JvdXBlZCA9IHRoaXMuaXNQcm9jY2Vzc2VkSXRlbUdyb3VwKHByb2Nlc3NlZEl0ZW0pO1xuXG4gICAgICAgIGlmIChncm91cGVkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5vcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbUluZGV4ID0gdGhpcy5mb2N1c2VkSXRlbUluZm8oKS5pbmRleCAhPT0gLTEgPyB0aGlzLmZpbmRQcmV2SXRlbUluZGV4KHRoaXMuZm9jdXNlZEl0ZW1JbmZvKCkuaW5kZXgpIDogdGhpcy5maW5kTGFzdEZvY3VzZWRJdGVtSW5kZXgoKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRm9jdXNlZEl0ZW1JbmZvKGV2ZW50LCBpdGVtSW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMub3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCcgJiYgT2JqZWN0VXRpbHMuaXNOb3RFbXB0eSh0aGlzLmFjdGl2ZUl0ZW0oKSkpIHtcbiAgICAgICAgICAgICAgICBpZiAocHJvY2Vzc2VkSXRlbS5jb2x1bW5JbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvY3VzZWRJdGVtSW5mby5zZXQoeyBpbmRleDogdGhpcy5hY3RpdmVJdGVtKCkuaW5kZXgsIGtleTogdGhpcy5hY3RpdmVJdGVtKCkua2V5LCBwYXJlbnRLZXk6IHRoaXMuYWN0aXZlSXRlbSgpLnBhcmVudEtleSwgaXRlbTogcHJvY2Vzc2VkSXRlbS5pdGVtIH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUl0ZW0uc2V0KG51bGwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgY29sdW1uSW5kZXggPSBwcm9jZXNzZWRJdGVtLmNvbHVtbkluZGV4IC0gMTtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1JbmRleCA9IHRoaXMudmlzaWJsZUl0ZW1zLmZpbmRJbmRleCgoaXRlbSkgPT4gaXRlbS5jb2x1bW5JbmRleCA9PT0gY29sdW1uSW5kZXgpO1xuXG4gICAgICAgICAgICBpdGVtSW5kZXggIT09IC0xICYmIHRoaXMuY2hhbmdlRm9jdXNlZEl0ZW1JbmZvKGV2ZW50LCBpdGVtSW5kZXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvbkhvbWVLZXkoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VGb2N1c2VkSXRlbUluZm8oZXZlbnQsIHRoaXMuZmluZEZpcnN0SXRlbUluZGV4KCkpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIG9uRW5kS2V5KGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIHRoaXMuY2hhbmdlRm9jdXNlZEl0ZW1JbmZvKGV2ZW50LCB0aGlzLmZpbmRMYXN0SXRlbUluZGV4KCkpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIG9uU3BhY2VLZXkoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgdGhpcy5vbkVudGVyS2V5KGV2ZW50KTtcbiAgICB9XG5cbiAgICBvbkVzY2FwZUtleShldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAoT2JqZWN0VXRpbHMuaXNOb3RFbXB0eSh0aGlzLmFjdGl2ZUl0ZW0oKSkpIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNlZEl0ZW1JbmZvLnNldCh7IGluZGV4OiB0aGlzLmFjdGl2ZUl0ZW0oKS5pbmRleCwga2V5OiB0aGlzLmFjdGl2ZUl0ZW0oKS5rZXksIGl0ZW06IHRoaXMuYWN0aXZlSXRlbSgpLml0ZW0gfSk7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZUl0ZW0uc2V0KG51bGwpO1xuICAgICAgICB9XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvblRhYktleShldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5mb2N1c2VkSXRlbUluZm8oKS5pbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgIGNvbnN0IHByb2Nlc3NlZEl0ZW0gPSB0aGlzLmZpbmRWaXNpYmxlSXRlbSh0aGlzLmZvY3VzZWRJdGVtSW5mbygpLmluZGV4KTtcbiAgICAgICAgICAgIGNvbnN0IGdyb3VwZWQgPSB0aGlzLmlzUHJvY2Nlc3NlZEl0ZW1Hcm91cChwcm9jZXNzZWRJdGVtKTtcblxuICAgICAgICAgICAgIWdyb3VwZWQgJiYgdGhpcy5vbkl0ZW1DaGFuZ2UoeyBvcmlnaW5hbEV2ZW50OiBldmVudCwgcHJvY2Vzc2VkSXRlbSB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaGlkZSgpO1xuICAgIH1cblxuICAgIG9uRW50ZXJLZXkoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuZm9jdXNlZEl0ZW1JbmZvKCkuaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMucm9vdG1lbnUuZWwubmF0aXZlRWxlbWVudCwgYGxpW2lkPVwiJHtgJHt0aGlzLmZvY3VzZWRJdGVtSWR9YH1cIl1gKTtcbiAgICAgICAgICAgIGNvbnN0IGFuY2hvckVsZW1lbnQgPSBlbGVtZW50ICYmIERvbUhhbmRsZXIuZmluZFNpbmdsZShlbGVtZW50LCAnYVtkYXRhLXBjLXNlY3Rpb249XCJhY3Rpb25cIl0nKTtcblxuICAgICAgICAgICAgYW5jaG9yRWxlbWVudCA/IGFuY2hvckVsZW1lbnQuY2xpY2soKSA6IGVsZW1lbnQgJiYgZWxlbWVudC5jbGljaygpO1xuXG4gICAgICAgICAgICBjb25zdCBwcm9jZXNzZWRJdGVtID0gdGhpcy52aXNpYmxlSXRlbXNbdGhpcy5mb2N1c2VkSXRlbUluZm8oKS5pbmRleF07XG4gICAgICAgICAgICBjb25zdCBncm91cGVkID0gdGhpcy5pc1Byb2NjZXNzZWRJdGVtR3JvdXAocHJvY2Vzc2VkSXRlbSk7XG5cbiAgICAgICAgICAgICFncm91cGVkICYmIHRoaXMuY2hhbmdlRm9jdXNlZEl0ZW1JbmZvKGV2ZW50LCB0aGlzLmZpbmRGaXJzdEZvY3VzZWRJdGVtSW5kZXgoKSk7XG4gICAgICAgIH1cblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIGZpbmRWaXNpYmxlSXRlbShpbmRleCkge1xuICAgICAgICByZXR1cm4gT2JqZWN0VXRpbHMuaXNOb3RFbXB0eSh0aGlzLnZpc2libGVJdGVtcykgPyB0aGlzLnZpc2libGVJdGVtc1tpbmRleF0gOiBudWxsO1xuICAgIH1cblxuICAgIGZpbmRMYXN0Rm9jdXNlZEl0ZW1JbmRleCgpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRJbmRleCA9IHRoaXMuZmluZFNlbGVjdGVkSXRlbUluZGV4KCk7XG4gICAgICAgIHJldHVybiBzZWxlY3RlZEluZGV4IDwgMCA/IHRoaXMuZmluZExhc3RJdGVtSW5kZXgoKSA6IHNlbGVjdGVkSW5kZXg7XG4gICAgfVxuXG4gICAgZmluZExhc3RJdGVtSW5kZXgoKSB7XG4gICAgICAgIHJldHVybiBPYmplY3RVdGlscy5maW5kTGFzdEluZGV4KHRoaXMudmlzaWJsZUl0ZW1zLCAocHJvY2Vzc2VkSXRlbSkgPT4gdGhpcy5pc1ZhbGlkSXRlbShwcm9jZXNzZWRJdGVtKSk7XG4gICAgfVxuXG4gICAgZmluZFByZXZJdGVtSW5kZXgoaW5kZXg6IG51bWJlcikge1xuICAgICAgICBjb25zdCBtYXRjaGVkSXRlbUluZGV4ID0gaW5kZXggPiAwID8gT2JqZWN0VXRpbHMuZmluZExhc3RJbmRleCh0aGlzLnZpc2libGVJdGVtcy5zbGljZSgwLCBpbmRleCksIChwcm9jZXNzZWRJdGVtKSA9PiB0aGlzLmlzVmFsaWRJdGVtKHByb2Nlc3NlZEl0ZW0pKSA6IC0xO1xuXG4gICAgICAgIHJldHVybiBtYXRjaGVkSXRlbUluZGV4ID4gLTEgPyBtYXRjaGVkSXRlbUluZGV4IDogaW5kZXg7XG4gICAgfVxuXG4gICAgZmluZE5leHRJdGVtSW5kZXgoaW5kZXg6IG51bWJlcikge1xuICAgICAgICBjb25zdCBtYXRjaGVkSXRlbUluZGV4ID0gaW5kZXggPCB0aGlzLnZpc2libGVJdGVtcy5sZW5ndGggLSAxID8gdGhpcy52aXNpYmxlSXRlbXMuc2xpY2UoaW5kZXggKyAxKS5maW5kSW5kZXgoKHByb2Nlc3NlZEl0ZW0pID0+IHRoaXMuaXNWYWxpZEl0ZW0ocHJvY2Vzc2VkSXRlbSkpIDogLTE7XG5cbiAgICAgICAgcmV0dXJuIG1hdGNoZWRJdGVtSW5kZXggPiAtMSA/IG1hdGNoZWRJdGVtSW5kZXggKyBpbmRleCArIDEgOiBpbmRleDtcbiAgICB9XG5cbiAgICBiaW5kUmVzaXplTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMucmVzaXplTGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2l6ZUxpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5kb2N1bWVudC5kZWZhdWx0VmlldywgJ3Jlc2l6ZScsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGUoZXZlbnQsIHRydWUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmluZE91dHNpZGVDbGlja0xpc3RlbmVyKCkge1xuICAgICAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLm91dHNpZGVDbGlja0xpc3RlbmVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vdXRzaWRlQ2xpY2tMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMuZG9jdW1lbnQsICdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpc091dHNpZGVDb250YWluZXIgPSB0aGlzLnJvb3RtZW51LmVsLm5hdGl2ZUVsZW1lbnQgIT09IGV2ZW50LnRhcmdldCAmJiAhdGhpcy5yb290bWVudS5lbC5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzT3V0c2lkZUNvbnRhaW5lcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVuYmluZE91dHNpZGVDbGlja0xpc3RlbmVyKCkge1xuICAgICAgICBpZiAodGhpcy5vdXRzaWRlQ2xpY2tMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5vdXRzaWRlQ2xpY2tMaXN0ZW5lcigpO1xuICAgICAgICAgICAgdGhpcy5vdXRzaWRlQ2xpY2tMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1bmJpbmRSZXNpemVMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKHRoaXMucmVzaXplTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMucmVzaXplTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIHRoaXMucmVzaXplTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMudW5iaW5kT3V0c2lkZUNsaWNrTGlzdGVuZXIoKTtcbiAgICAgICAgdGhpcy51bmJpbmRSZXNpemVMaXN0ZW5lcigpO1xuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBSb3V0ZXJNb2R1bGUsIFJpcHBsZU1vZHVsZSwgVG9vbHRpcE1vZHVsZSwgU2hhcmVkTW9kdWxlLCBBbmdsZURvd25JY29uLCBBbmdsZVJpZ2h0SWNvbl0sXG4gICAgZXhwb3J0czogW01lZ2FNZW51LCBSb3V0ZXJNb2R1bGUsIFRvb2x0aXBNb2R1bGUsIFNoYXJlZE1vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbTWVnYU1lbnUsIE1lZ2FNZW51U3ViXVxufSlcbmV4cG9ydCBjbGFzcyBNZWdhTWVudU1vZHVsZSB7fVxuIl19