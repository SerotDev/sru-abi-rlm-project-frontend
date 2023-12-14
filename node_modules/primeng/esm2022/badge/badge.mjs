import { CommonModule, DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Directive, Inject, Input, NgModule, ViewEncapsulation } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { UniqueComponentId } from 'primeng/utils';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 * Badge Directive is directive usage of badge component.
 * @group Components
 */
export class BadgeDirective {
    document;
    el;
    renderer;
    /**
     * Icon position of the component.
     * @group Props
     */
    iconPos = 'left';
    /**
     * When specified, disables the component.
     * @group Props
     */
    get disabled() {
        return this._disabled;
    }
    set disabled(val) {
        this._disabled = val;
    }
    /**
     * Size of the badge, valid options are "large" and "xlarge".
     * @group Props
     */
    get size() {
        return this._size;
    }
    set size(val) {
        this._size = val;
        if (this.initialized) {
            this.setSizeClasses();
        }
    }
    /**
     * Value to display inside the badge.
     * @group Props
     */
    get value() {
        return this._value;
    }
    set value(val) {
        if (val !== this._value) {
            this._value = val;
            if (this.initialized) {
                let badge = document.getElementById(this.id);
                if (this._value) {
                    if (DomHandler.hasClass(badge, 'p-badge-dot'))
                        DomHandler.removeClass(badge, 'p-badge-dot');
                    if (String(this._value).length === 1) {
                        DomHandler.addClass(badge, 'p-badge-no-gutter');
                    }
                    else {
                        DomHandler.removeClass(badge, 'p-badge-no-gutter');
                    }
                }
                else if (!this._value && !DomHandler.hasClass(badge, 'p-badge-dot')) {
                    DomHandler.addClass(badge, 'p-badge-dot');
                }
                badge.innerHTML = '';
                this.renderer.appendChild(badge, document.createTextNode(this._value));
            }
        }
    }
    /**
     * Severity type of the badge.
     * @group Props
     */
    severity;
    _value;
    initialized = false;
    id;
    _disabled = false;
    _size;
    constructor(document, el, renderer) {
        this.document = document;
        this.el = el;
        this.renderer = renderer;
    }
    ngAfterViewInit() {
        this.id = UniqueComponentId() + '_badge';
        let el = this.el.nativeElement.nodeName.indexOf('-') != -1 ? this.el.nativeElement.firstChild : this.el.nativeElement;
        if (this._disabled) {
            return null;
        }
        let badge = this.document.createElement('span');
        badge.id = this.id;
        badge.className = 'p-badge p-component';
        if (this.severity) {
            DomHandler.addClass(badge, 'p-badge-' + this.severity);
        }
        this.setSizeClasses(badge);
        if (this.value != null) {
            this.renderer.appendChild(badge, this.document.createTextNode(this.value));
            if (String(this.value).length === 1) {
                DomHandler.addClass(badge, 'p-badge-no-gutter');
            }
        }
        else {
            DomHandler.addClass(badge, 'p-badge-dot');
        }
        DomHandler.addClass(el, 'p-overlay-badge');
        this.renderer.appendChild(el, badge);
        this.initialized = true;
    }
    setSizeClasses(element) {
        const badge = element ?? this.document.getElementById(this.id);
        if (!badge) {
            return;
        }
        if (this._size) {
            if (this._size === 'large') {
                DomHandler.addClass(badge, 'p-badge-lg');
                DomHandler.removeClass(badge, 'p-badge-xl');
            }
            if (this._size === 'xlarge') {
                DomHandler.addClass(badge, 'p-badge-xl');
                DomHandler.removeClass(badge, 'p-badge-lg');
            }
        }
        else {
            DomHandler.removeClass(badge, 'p-badge-lg');
            DomHandler.removeClass(badge, 'p-badge-xl');
        }
    }
    ngOnDestroy() {
        this.initialized = false;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: BadgeDirective, deps: [{ token: DOCUMENT }, { token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.0.5", type: BadgeDirective, selector: "[pBadge]", inputs: { iconPos: "iconPos", disabled: ["badgeDisabled", "disabled"], size: "size", value: "value", severity: "severity" }, host: { classAttribute: "p-element" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: BadgeDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pBadge]',
                    host: {
                        class: 'p-element'
                    }
                }]
        }], ctorParameters: () => [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.ElementRef }, { type: i0.Renderer2 }], propDecorators: { iconPos: [{
                type: Input
            }], disabled: [{
                type: Input,
                args: ['badgeDisabled']
            }], size: [{
                type: Input
            }], value: [{
                type: Input
            }], severity: [{
                type: Input
            }] } });
/**
 * Badge is a small status indicator for another element.
 * @group Components
 */
export class Badge {
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
     * Size of the badge, valid options are "large" and "xlarge".
     * @group Props
     */
    size;
    /**
     * Severity type of the badge.
     * @group Props
     */
    severity;
    /**
     * Value to display inside the badge.
     * @group Props
     */
    value;
    /**
     * When specified, disables the component.
     * @group Props
     */
    badgeDisabled = false;
    containerClass() {
        return {
            'p-badge p-component': true,
            'p-badge-no-gutter': this.value != undefined && String(this.value).length === 1,
            'p-badge-lg': this.size === 'large',
            'p-badge-xl': this.size === 'xlarge',
            'p-badge-info': this.severity === 'info',
            'p-badge-success': this.severity === 'success',
            'p-badge-warning': this.severity === 'warning',
            'p-badge-danger': this.severity === 'danger'
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: Badge, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.5", type: Badge, selector: "p-badge", inputs: { styleClass: "styleClass", style: "style", size: "size", severity: "severity", value: "value", badgeDisabled: "badgeDisabled" }, host: { classAttribute: "p-element" }, ngImport: i0, template: ` <span *ngIf="!badgeDisabled" [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="style">{{ value }}</span> `, isInline: true, styles: ["@layer primeng{.p-badge{display:inline-block;border-radius:10px;text-align:center;padding:0 .5rem}.p-overlay-badge{position:relative}.p-overlay-badge .p-badge{position:absolute;top:0;right:0;transform:translate(50%,-50%);transform-origin:100% 0;margin:0}.p-badge-dot{width:.5rem;min-width:.5rem;height:.5rem;border-radius:50%;padding:0}.p-badge-no-gutter{padding:0;border-radius:50%}}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: Badge, decorators: [{
            type: Component,
            args: [{ selector: 'p-badge', template: ` <span *ngIf="!badgeDisabled" [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="style">{{ value }}</span> `, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: ["@layer primeng{.p-badge{display:inline-block;border-radius:10px;text-align:center;padding:0 .5rem}.p-overlay-badge{position:relative}.p-overlay-badge .p-badge{position:absolute;top:0;right:0;transform:translate(50%,-50%);transform-origin:100% 0;margin:0}.p-badge-dot{width:.5rem;min-width:.5rem;height:.5rem;border-radius:50%;padding:0}.p-badge-no-gutter{padding:0;border-radius:50%}}\n"] }]
        }], propDecorators: { styleClass: [{
                type: Input
            }], style: [{
                type: Input
            }], size: [{
                type: Input
            }], severity: [{
                type: Input
            }], value: [{
                type: Input
            }], badgeDisabled: [{
                type: Input
            }] } });
export class BadgeModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: BadgeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.0.5", ngImport: i0, type: BadgeModule, declarations: [Badge, BadgeDirective], imports: [CommonModule], exports: [Badge, BadgeDirective, SharedModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: BadgeModule, imports: [CommonModule, SharedModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: BadgeModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [Badge, BadgeDirective, SharedModule],
                    declarations: [Badge, BadgeDirective]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFkZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvYmFkZ2UvYmFkZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBQWlCLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQWMsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNLLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN6QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQUNsRDs7O0dBR0c7QUFPSCxNQUFNLE9BQU8sY0FBYztJQTZFZTtJQUEyQjtJQUF3QjtJQTVFekY7OztPQUdHO0lBQ00sT0FBTyxHQUF3QyxNQUFNLENBQUM7SUFDL0Q7OztPQUdHO0lBQ0gsSUFBNEIsUUFBUTtRQUNoQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUNELElBQUksUUFBUSxDQUFDLEdBQVk7UUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7SUFDekIsQ0FBQztJQUNEOzs7T0FHRztJQUNILElBQW9CLElBQUk7UUFDcEIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFDRCxJQUFJLElBQUksQ0FBQyxHQUF1QjtRQUM1QixJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztRQUVqQixJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDbEIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQ3pCO0lBQ0wsQ0FBQztJQUNEOzs7T0FHRztJQUNILElBQWEsS0FBSztRQUNkLE9BQU8sSUFBSSxD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SSxLQUFLLFFBQVE7WUFDcEMsY0FBYyxFQUFFLElBQUksQ0FBQyxRQUFRLEtBQUssTUFBTTtZQUN4QyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsUUFBUSxLQUFLLFNBQVM7WUFDOUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLFFBQVEsS0FBSyxTQUFTO1lBQzlDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxRQUFRLEtBQUssUUFBUTtTQUMvQyxDQUFDO0lBQ04sQ0FBQzt1R0EzQ1EsS0FBSzsyRkFBTCxLQUFLLGdPQVJKLHVIQUF1SDs7MkZBUXhILEtBQUs7a0JBVmpCLFNBQVM7K0JBQ0ksU0FBUyxZQUNULHVIQUF1SCxtQkFDaEgsdUJBQXVCLENBQUMsTUFBTSxpQkFDaEMsaUJBQWlCLENBQUMsSUFBSSxRQUUvQjt3QkFDRixLQUFLLEVBQUUsV0FBVztxQkFDckI7OEJBT1EsVUFBVTtzQkFBbEIsS0FBSztnQkFLRyxLQUFLO3NCQUFiLEtBQUs7Z0JBS0csSUFBSTtzQkFBWixLQUFLO2dCQUtHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBS0csS0FBSztzQkFBYixLQUFLO2dCQUtHLGFBQWE7c0JBQXJCLEtBQUs7O0FBcUJWLE1BQU0sT0FBTyxXQUFXO3VHQUFYLFdBQVc7d0dBQVgsV0FBVyxpQkFuRFgsS0FBSyxFQTFKTCxjQUFjLGFBeU1iLFlBQVksYUEvQ2IsS0FBSyxFQTFKTCxjQUFjLEVBME1VLFlBQVk7d0dBR3BDLFdBQVcsWUFKVixZQUFZLEVBQ1csWUFBWTs7MkZBR3BDLFdBQVc7a0JBTHZCLFFBQVE7bUJBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixPQUFPLEVBQUUsQ0FBQyxLQUFLLEVBQUUsY0FBYyxFQUFFLFlBQVksQ0FBQztvQkFDOUMsWUFBWSxFQUFFLENBQUMsS0FBSyxFQUFFLGNBQWMsQ0FBQztpQkFDeEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUsIERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEFmdGVyVmlld0luaXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5qZWN0LCBJbnB1dCwgTmdNb2R1bGUsIE9uRGVzdHJveSwgUmVuZGVyZXIyLCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgRG9tSGFuZGxlciB9IGZyb20gJ3ByaW1lbmcvZG9tJztcbmltcG9ydCB7IFVuaXF1ZUNvbXBvbmVudElkIH0gZnJvbSAncHJpbWVuZy91dGlscyc7XG4vKipcbiAqIEJhZGdlIERpcmVjdGl2ZSBpcyBkaXJlY3RpdmUgdXNhZ2Ugb2YgYmFkZ2UgY29tcG9uZW50LlxuICogQGdyb3VwIENvbXBvbmVudHNcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbcEJhZGdlXScsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ3AtZWxlbWVudCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIEJhZGdlRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgICAvKipcbiAgICAgKiBJY29uIHBvc2l0aW9uIG9mIHRoZSBjb21wb25lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgaWNvblBvczogJ2xlZnQnIHwgJ3JpZ2h0JyB8ICd0b3AnIHwgJ2JvdHRvbScgPSAnbGVmdCc7XG4gICAgLyoqXG4gICAgICogV2hlbiBzcGVjaWZpZWQsIGRpc2FibGVzIHRoZSBjb21wb25lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCdiYWRnZURpc2FibGVkJykgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gICAgfVxuICAgIHNldCBkaXNhYmxlZCh2YWw6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSB2YWw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNpemUgb2YgdGhlIGJhZGdlLCB2YWxpZCBvcHRpb25zIGFyZSBcImxhcmdlXCIgYW5kIFwieGxhcmdlXCIuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgcHVibGljIGdldCBzaXplKCk6ICdsYXJnZScgfCAneGxhcmdlJyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaXplO1xuICAgIH1cbiAgICBzZXQgc2l6ZSh2YWw6ICdsYXJnZScgfCAneGxhcmdlJykge1xuICAgICAgICB0aGlzLl9zaXplID0gdmFsO1xuXG4gICAgICAgIGlmICh0aGlzLmluaXRpYWxpemVkKSB7XG4gICAgICAgICAgICB0aGlzLnNldFNpemVDbGFzc2VzKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogVmFsdWUgdG8gZGlzcGxheSBpbnNpZGUgdGhlIGJhZGdlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCB2YWx1ZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gICAgfVxuICAgIHNldCB2YWx1ZSh2YWw6IHN0cmluZykge1xuICAgICAgICBpZiAodmFsICE9PSB0aGlzLl92YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWw7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmluaXRpYWxpemVkKSB7XG4gICAgICAgICAgICAgICAgbGV0IGJhZGdlOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuaWQpIGFzIEhUTUxFbGVtZW50O1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChEb21IYW5kbGVyLmhhc0NsYXNzKGJhZGdlLCAncC1iYWRnZS1kb3QnKSkgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyhiYWRnZSwgJ3AtYmFkZ2UtZG90Jyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKFN0cmluZyh0aGlzLl92YWx1ZSkubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKGJhZGdlLCAncC1iYWRnZS1uby1ndXR0ZXInKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3MoYmFkZ2UsICdwLWJhZGdlLW5vLWd1dHRlcicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghdGhpcy5fdmFsdWUgJiYgIURvbUhhbmRsZXIuaGFzQ2xhc3MoYmFkZ2UsICdwLWJhZGdlLWRvdCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3MoYmFkZ2UsICdwLWJhZGdlLWRvdCcpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGJhZGdlLmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoYmFkZ2UsIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRoaXMuX3ZhbHVlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V2ZXJpdHkgdHlwZSBvZiB0aGUgYmFkZ2UuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc2V2ZXJpdHk6ICdzdWNjZXNzJyB8ICdpbmZvJyB8ICd3YXJuaW5nJyB8ICdkYW5nZXInIHwgbnVsbCB8IHVuZGVmaW5lZDtcblxuICAgIHB1YmxpYyBfdmFsdWUhOiBzdHJpbmc7XG5cbiAgICBwdWJsaWMgaW5pdGlhbGl6ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHByaXZhdGUgaWQhOiBzdHJpbmc7XG5cbiAgICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSBfc2l6ZSE6ICdsYXJnZScgfCAneGxhcmdlJztcblxuICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IERvY3VtZW50LCBwdWJsaWMgZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikge31cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgdGhpcy5pZCA9IFVuaXF1ZUNvbXBvbmVudElkKCkgKyAnX2JhZGdlJztcbiAgICAgICAgbGV0IGVsID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50Lm5vZGVOYW1lLmluZGV4T2YoJy0nKSAhPSAtMSA/IHRoaXMuZWwubmF0aXZlRWxlbWVudC5maXJzdENoaWxkIDogdGhpcy5lbC5uYXRpdmVFbGVtZW50O1xuXG4gICAgICAgIGlmICh0aGlzLl9kaXNhYmxlZCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgYmFkZ2UgPSB0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgYmFkZ2UuaWQgPSB0aGlzLmlkO1xuICAgICAgICBiYWRnZS5jbGFzc05hbWUgPSAncC1iYWRnZSBwLWNvbXBvbmVudCc7XG5cbiAgICAgICAgaWYgKHRoaXMuc2V2ZXJpdHkpIHtcbiAgICAgICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3MoYmFkZ2UsICdwLWJhZGdlLScgKyB0aGlzLnNldmVyaXR5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0U2l6ZUNsYXNzZXMoYmFkZ2UpO1xuXG4gICAgICAgIGlmICh0aGlzLnZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoYmFkZ2UsIHRoaXMuZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGhpcy52YWx1ZSkpO1xuXG4gICAgICAgICAgICBpZiAoU3RyaW5nKHRoaXMudmFsdWUpLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3MoYmFkZ2UsICdwLWJhZGdlLW5vLWd1dHRlcicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyhiYWRnZSwgJ3AtYmFkZ2UtZG90Jyk7XG4gICAgICAgIH1cblxuICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKGVsLCAncC1vdmVybGF5LWJhZGdlJyk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoZWwsIGJhZGdlKTtcblxuICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldFNpemVDbGFzc2VzKGVsZW1lbnQ/OiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgICAgICBjb25zdCBiYWRnZSA9IGVsZW1lbnQgPz8gdGhpcy5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmlkKTtcblxuICAgICAgICBpZiAoIWJhZGdlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fc2l6ZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX3NpemUgPT09ICdsYXJnZScpIHtcbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKGJhZGdlLCAncC1iYWRnZS1sZycpO1xuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3MoYmFkZ2UsICdwLWJhZGdlLXhsJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9zaXplID09PSAneGxhcmdlJykge1xuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3MoYmFkZ2UsICdwLWJhZGdlLXhsJyk7XG4gICAgICAgICAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyhiYWRnZSwgJ3AtYmFkZ2UtbGcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3MoYmFkZ2UsICdwLWJhZGdlLWxnJyk7XG4gICAgICAgICAgICBEb21IYW5kbGVyLnJlbW92ZUNsYXNzKGJhZGdlLCAncC1iYWRnZS14bCcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgICB9XG59XG4vKipcbiAqIEJhZGdlIGlzIGEgc21hbGwgc3RhdHVzIGluZGljYXRvciBmb3IgYW5vdGhlciBlbGVtZW50LlxuICogQGdyb3VwIENvbXBvbmVudHNcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLWJhZGdlJyxcbiAgICB0ZW1wbGF0ZTogYCA8c3BhbiAqbmdJZj1cIiFiYWRnZURpc2FibGVkXCIgW25nQ2xhc3NdPVwiY29udGFpbmVyQ2xhc3MoKVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCIgW25nU3R5bGVdPVwic3R5bGVcIj57eyB2YWx1ZSB9fTwvc3Bhbj4gYCxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHN0eWxlVXJsczogWycuL2JhZGdlLmNzcyddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdwLWVsZW1lbnQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBCYWRnZSB7XG4gICAgLyoqXG4gICAgICogQ2xhc3Mgb2YgdGhlIGVsZW1lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIElubGluZSBzdHlsZSBvZiB0aGUgZWxlbWVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzdHlsZTogeyBba2xhc3M6IHN0cmluZ106IGFueSB9IHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBTaXplIG9mIHRoZSBiYWRnZSwgdmFsaWQgb3B0aW9ucyBhcmUgXCJsYXJnZVwiIGFuZCBcInhsYXJnZVwiLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHNpemU6ICdsYXJnZScgfCAneGxhcmdlJyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBTZXZlcml0eSB0eXBlIG9mIHRoZSBiYWRnZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzZXZlcml0eTogJ3N1Y2Nlc3MnIHwgJ2luZm8nIHwgJ3dhcm5pbmcnIHwgJ2RhbmdlcicgfCBudWxsIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFZhbHVlIHRvIGRpc3BsYXkgaW5zaWRlIHRoZSBiYWRnZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB2YWx1ZTogc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBXaGVuIHNwZWNpZmllZCwgZGlzYWJsZXMgdGhlIGNvbXBvbmVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBiYWRnZURpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBjb250YWluZXJDbGFzcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICdwLWJhZGdlIHAtY29tcG9uZW50JzogdHJ1ZSxcbiAgICAgICAgICAgICdwLWJhZGdlLW5vLWd1dHRlcic6IHRoaXMudmFsdWUgIT0gdW5kZWZpbmVkICYmIFN0cmluZyh0aGlzLnZhbHVlKS5sZW5ndGggPT09IDEsXG4gICAgICAgICAgICAncC1iYWRnZS1sZyc6IHRoaXMuc2l6ZSA9PT0gJ2xhcmdlJyxcbiAgICAgICAgICAgICdwLWJhZGdlLXhsJzogdGhpcy5zaXplID09PSAneGxhcmdlJyxcbiAgICAgICAgICAgICdwLWJhZGdlLWluZm8nOiB0aGlzLnNldmVyaXR5ID09PSAnaW5mbycsXG4gICAgICAgICAgICAncC1iYWRnZS1zdWNjZXNzJzogdGhpcy5zZXZlcml0eSA9PT0gJ3N1Y2Nlc3MnLFxuICAgICAgICAgICAgJ3AtYmFkZ2Utd2FybmluZyc6IHRoaXMuc2V2ZXJpdHkgPT09ICd3YXJuaW5nJyxcbiAgICAgICAgICAgICdwLWJhZGdlLWRhbmdlcic6IHRoaXMuc2V2ZXJpdHkgPT09ICdkYW5nZXInXG4gICAgICAgIH07XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtCYWRnZSwgQmFkZ2VEaXJlY3RpdmUsIFNoYXJlZE1vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbQmFkZ2UsIEJhZGdlRGlyZWN0aXZlXVxufSlcbmV4cG9ydCBjbGFzcyBCYWRnZU1vZHVsZSB7fVxuIl19