import { CommonModule } from '@angular/common';
import { Directive, HostListener, Input, NgModule } from '@angular/core';
import { DomHandler } from 'primeng/dom';
import * as i0 from "@angular/core";
/**
 * StyleClass manages css classes declaratively to during enter/leave animations or just to toggle classes on an element.
 * @group Components
 */
export class StyleClass {
    el;
    renderer;
    zone;
    constructor(el, renderer, zone) {
        this.el = el;
        this.renderer = renderer;
        this.zone = zone;
    }
    /**
     * Selector to define the target element. Available selectors are '@next', '@prev', '@parent' and '@grandparent'.
     * @group Props
     */
    selector;
    /**
     * Style class to add when item begins to get displayed.
     * @group Props
     * @deprecated Use enterFromClass instead
     */
    set enterClass(value) {
        this._enterClass = value;
        console.warn('enterClass is deprecated, use enterFromClass instead');
    }
    get enterClass() {
        return this._enterClass;
    }
    /**
     * Style class to add when item begins to get displayed.
     * @group Props
     */
    enterFromClass;
    /**
     * Style class to add during enter animation.
     * @group Props
     */
    enterActiveClass;
    /**
     * Style class to add when item begins to get displayed.
     * @group Props
     */
    enterToClass;
    /**
     * Style class to add when item begins to get hidden.
     * @group Props
     * @deprecated Use leaveFromClass instead
     */
    set leaveClass(value) {
        this._leaveClass = value;
        console.warn('leaveClass is deprecated, use leaveFromClass instead');
    }
    get leaveClass() {
        return this._leaveClass;
    }
    /**
     * Style class to add when item begins to get hidden.
     * @group Props
     */
    leaveFromClass;
    /**
     * Style class to add during leave animation.
     * @group Props
     */
    leaveActiveClass;
    /**
     * Style class to add when leave animation is completed.
     * @group Props
     */
    leaveToClass;
    /**
     * Whether to trigger leave animation when outside of the element is clicked.
     * @group Props
     */
    hideOnOutsideClick;
    /**
     * Adds or removes a class when no enter-leave animation is required.
     * @group Props
     */
    toggleClass;
    /**
     * Whether to trigger leave animation when escape key pressed.
     * @group Props
     */
    hideOnEscape;
    eventListener;
    documentClickListener;
    documentKeydownListener;
    target;
    enterListener;
    leaveListener;
    animating;
    _enterClass;
    _leaveClass;
    clickListener() {
        this.target = this.resolveTarget();
        if (this.toggleClass) {
            this.toggle();
        }
        else {
            if (this.target.offsetParent === null)
                this.enter();
            else
                this.leave();
        }
    }
    toggle() {
        if (DomHandler.hasClass(this.target, this.toggleClass))
            DomHandler.removeClass(this.target, this.toggleClass);
        else
            DomHandler.addClass(this.target, this.toggleClass);
    }
    enter() {
        if (this.enterActiveClass) {
            if (!this.animating) {
                this.animating = true;
                if (this.enterActiveClass === 'slidedown') {
                    this.target.style.height = '0px';
                    DomHandler.removeClass(this.target, 'hidden');
                    this.target.style.maxHeight = this.target.scrollHeight + 'px';
                    DomHandler.addClass(this.target, 'hidden');
                    this.target.style.height = '';
                }
                DomHandler.addClass(this.target, this.enterActiveClass);
                if (this.enterClass || this.enterFromClass) {
                    DomHandler.removeClass(this.target, this.enterClass || this.enterFromClass);
                }
                this.enterListener = this.renderer.listen(this.target, 'animationend', () => {
                    DomHandler.removeClass(this.target, this.enterActiveClass);
                    if (this.enterToClass) {
                        DomHandler.addClass(this.target, this.enterToClass);
                    }
                    this.enterListener && this.enterListener();
                    if (this.enterActiveClass === 'slidedown') {
                        this.target.style.maxHeight = '';
                    }
                    this.animating = false;
                });
            }
        }
        else {
            if (this.enterClass || this.enterFromClass) {
                DomHandler.removeClass(this.target, this.enterClass || this.enterFromClass);
            }
            if (this.enterToClass) {
                DomHandler.addClass(this.target, this.enterToClass);
            }
        }
        if (this.hideOnOutsideClick) {
            this.bindDocumentClickListener();
        }
        if (this.hideOnEscape) {
            this.bindDocumentKeydownListener();
        }
    }
    leave() {
        if (this.leaveActiveClass) {
            if (!this.animating) {
                this.animating = true;
                DomHandler.addClass(this.target, this.leaveActiveClass);
                if (this.leaveClass || this.leaveFromClass) {
                    DomHandler.removeClass(this.target, this.leaveClass || this.leaveFromClass);
                }
                this.leaveListener = this.renderer.listen(this.target, 'animationend', () => {
                    DomHandler.removeClass(this.target, this.leaveActiveClass);
                    if (this.leaveToClass) {
                        DomHandler.addClass(this.target, this.leaveToClass);
                    }
                    this.leaveListener && this.leaveListener();
                    this.animating = false;
                });
            }
        }
        else {
            if (this.leaveClass || this.leaveFromClass) {
                DomHandler.removeClass(this.target, this.leaveClass || this.leaveFromClass);
            }
            if (this.leaveToClass) {
                DomHandler.addClass(this.target, this.leaveToClass);
            }
        }
        if (this.hideOnOutsideClick) {
            this.unbindDocumentClickListener();
        }
        if (this.hideOnEscape) {
            this.unbindDocumentKeydownListener();
        }
    }
    resolveTarget() {
        if (this.target) {
            return this.target;
        }
        switch (this.selector) {
            case '@next':
                return this.el.nativeElement.nextElementSibling;
            case '@prev':
                return this.el.nativeElement.previousElementSibling;
            case '@parent':
                return this.el.nativeElement.parentElement;
            case '@grandparent':
                return this.el.nativeElement.parentElement.parentElement;
            default:
                return document.querySelector(this.selector);
        }
    }
    bindDocumentClickListener() {
        if (!this.documentClickListener) {
            this.documentClickListener = this.renderer.listen(this.el.nativeElement.ownerDocument, 'click', (event) => {
                if (!this.isVisible() || getComputedStyle(this.target).getPropertyValue('position') === 'static')
                    this.unbindDocumentClickListener();
                else if (this.isOutsideClick(event))
                    this.leave();
            });
        }
    }
    bindDocumentKeydownListener() {
        if (!this.documentKeydownListener) {
            this.zone.runOutsideAngular(() => {
                this.documentKeydownListener = this.renderer.listen(this.el.nativeElement.ownerDocument, 'keydown', (event) => {
                    const { key, keyCode, which, type } = event;
                    if (!this.isVisible() || getComputedStyle(this.target).getPropertyValue('position') === 'static')
                        this.unbindDocumentKeydownListener();
                    if (this.isVisible() && key === 'Escape' && keyCode === 27 && which === 27)
                        this.leave();
                });
            });
        }
    }
    isVisible() {
        return this.target.offsetParent !== null;
    }
    isOutsideClick(event) {
        return !this.el.nativeElement.isSameNode(event.target) && !this.el.nativeElement.contains(event.target) && !this.target.contains(event.target);
    }
    unbindDocumentClickListener() {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    }
    unbindDocumentKeydownListener() {
        if (this.documentKeydownListener) {
            this.documentKeydownListener();
            this.documentKeydownListener = null;
        }
    }
    ngOnDestroy() {
        this.target = null;
        if (this.eventListener) {
            this.eventListener();
        }
        this.unbindDocumentClickListener();
        this.unbindDocumentKeydownListener();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: StyleClass, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.0.5", type: StyleClass, selector: "[pStyleClass]", inputs: { selector: ["pStyleClass", "selector"], enterClass: "enterClass", enterFromClass: "enterFromClass", enterActiveClass: "enterActiveClass", enterToClass: "enterToClass", leaveClass: "leaveClass", leaveFromClass: "leaveFromClass", leaveActiveClass: "leaveActiveClass", leaveToClass: "leaveToClass", hideOnOutsideClick: "hideOnOutsideClick", toggleClass: "toggleClass", hideOnEscape: "hideOnEscape" }, host: { listeners: { "click": "clickListener($event)" }, classAttribute: "p-element" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: StyleClass, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pStyleClass]',
                    host: {
                        class: 'p-element'
                    }
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.NgZone }], propDecorators: { selector: [{
                type: Input,
                args: ['pStyleClass']
            }], enterClass: [{
                type: Input
            }], enterFromClass: [{
                type: Input
            }], enterActiveClass: [{
                type: Input
            }], enterToClass: [{
                type: Input
            }], leaveClass: [{
                type: Input
            }], leaveFromClass: [{
                type: Input
            }], leaveActiveClass: [{
                type: Input
            }], leaveToClass: [{
                type: Input
            }], hideOnOutsideClick: [{
                type: Input
            }], toggleClass: [{
                type: Input
            }], hideOnEscape: [{
                type: Input
            }], clickListener: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });
export class StyleClassModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: StyleClassModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.0.5", ngImport: i0, type: StyleClassModule, declarations: [StyleClass], imports: [CommonModule], exports: [StyleClass] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: StyleClassModule, imports: [CommonModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: StyleClassModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [StyleClass],
                    declarations: [StyleClass]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGVjbGFzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvY29tcG9uZW50cy9zdHlsZWNsYXNzL3N0eWxlY2xhc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxTQUFTLEVBQWMsWUFBWSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQWdDLE1BQU0sZUFBZSxDQUFDO0FBQ25ILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxhQUFhLENBQUM7O0FBRXpDOzs7R0FHRztBQU9ILE1BQU0sT0FBTyxVQUFVO0lBQ0E7SUFBdUI7SUFBNkI7SUFBdkUsWUFBbUIsRUFBYyxFQUFTLFFBQW1CLEVBQVUsSUFBWTtRQUFoRSxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQVMsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUFVLFNBQUksR0FBSixJQUFJLENBQVE7SUFBRyxDQUFDO0lBQ3ZGOzs7T0FHRztJQUNtQixRQUFRLENBQXFCO0lBQ25EOzs7O09BSUc7SUFDSCxJQUFhLFVBQVUsQ0FBQyxLQUFhO1FBQ2pDLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLE9BQU8sQ0FBQyxJQUFJLENBQUMsc0RBQXNELENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBQ0QsSUFBSSxVQUFVO1FBQ1YsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzVCLENBQUM7SUFDRDs7O09BR0c7SUFDTSxjQUFjLENBQXFCO0lBQzVDOzs7T0FHRztJQUNNLGdCQUFnQixDQUFxQjtJQUM5Qzs7O09BR0c7SUFDTSxZQUFZLENBQXFCO0lBQzFDOzs7O09BSUc7SUFDSCxJQUFhLFVBQVUsQ0FBQyxLQUFhO1FBQ2pDLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLE9BQU8sQ0FBQyxJQUFJLENBQUMsc0RBQXNELENBQUMsQ0FBQztJQUN6RSxD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QUs7Z0JBS0csWUFBWTtzQkFBcEIsS0FBSztnQkFLRyxrQkFBa0I7c0JBQTFCLEtBQUs7Z0JBS0csV0FBVztzQkFBbkIsS0FBSztnQkFLRyxZQUFZO3NCQUFwQixLQUFLO2dCQXFCTixhQUFhO3NCQURaLFlBQVk7dUJBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDOztBQXlMckMsTUFBTSxPQUFPLGdCQUFnQjt1R0FBaEIsZ0JBQWdCO3dHQUFoQixnQkFBZ0IsaUJBeFJoQixVQUFVLGFBb1JULFlBQVksYUFwUmIsVUFBVTt3R0F3UlYsZ0JBQWdCLFlBSmYsWUFBWTs7MkZBSWIsZ0JBQWdCO2tCQUw1QixRQUFRO21CQUFDO29CQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztvQkFDdkIsT0FBTyxFQUFFLENBQUMsVUFBVSxDQUFDO29CQUNyQixZQUFZLEVBQUUsQ0FBQyxVQUFVLENBQUM7aUJBQzdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBJbnB1dCwgTmdNb2R1bGUsIE5nWm9uZSwgT25EZXN0cm95LCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERvbUhhbmRsZXIgfSBmcm9tICdwcmltZW5nL2RvbSc7XG5pbXBvcnQgeyBWb2lkTGlzdGVuZXIgfSBmcm9tICdwcmltZW5nL3RzLWhlbHBlcnMnO1xuLyoqXG4gKiBTdHlsZUNsYXNzIG1hbmFnZXMgY3NzIGNsYXNzZXMgZGVjbGFyYXRpdmVseSB0byBkdXJpbmcgZW50ZXIvbGVhdmUgYW5pbWF0aW9ucyBvciBqdXN0IHRvIHRvZ2dsZSBjbGFzc2VzIG9uIGFuIGVsZW1lbnQuXG4gKiBAZ3JvdXAgQ29tcG9uZW50c1xuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1twU3R5bGVDbGFzc10nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdwLWVsZW1lbnQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBTdHlsZUNsYXNzIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYsIHB1YmxpYyByZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIHpvbmU6IE5nWm9uZSkge31cbiAgICAvKipcbiAgICAgKiBTZWxlY3RvciB0byBkZWZpbmUgdGhlIHRhcmdldCBlbGVtZW50LiBBdmFpbGFibGUgc2VsZWN0b3JzIGFyZSAnQG5leHQnLCAnQHByZXYnLCAnQHBhcmVudCcgYW5kICdAZ3JhbmRwYXJlbnQnLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgncFN0eWxlQ2xhc3MnKSBzZWxlY3Rvcjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFN0eWxlIGNsYXNzIHRvIGFkZCB3aGVuIGl0ZW0gYmVnaW5zIHRvIGdldCBkaXNwbGF5ZWQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICogQGRlcHJlY2F0ZWQgVXNlIGVudGVyRnJvbUNsYXNzIGluc3RlYWRcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzZXQgZW50ZXJDbGFzcyh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX2VudGVyQ2xhc3MgPSB2YWx1ZTtcbiAgICAgICAgY29uc29sZS53YXJuKCdlbnRlckNsYXNzIGlzIGRlcHJlY2F0ZWQsIHVzZSBlbnRlckZyb21DbGFzcyBpbnN0ZWFkJyk7XG4gICAgfVxuICAgIGdldCBlbnRlckNsYXNzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZW50ZXJDbGFzcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3R5bGUgY2xhc3MgdG8gYWRkIHdoZW4gaXRlbSBiZWdpbnMgdG8gZ2V0IGRpc3BsYXllZC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBlbnRlckZyb21DbGFzczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFN0eWxlIGNsYXNzIHRvIGFkZCBkdXJpbmcgZW50ZXIgYW5pbWF0aW9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGVudGVyQWN0aXZlQ2xhc3M6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBTdHlsZSBjbGFzcyB0byBhZGQgd2hlbiBpdGVtIGJlZ2lucyB0byBnZXQgZGlzcGxheWVkLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGVudGVyVG9DbGFzczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFN0eWxlIGNsYXNzIHRvIGFkZCB3aGVuIGl0ZW0gYmVnaW5zIHRvIGdldCBoaWRkZW4uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICogQGRlcHJlY2F0ZWQgVXNlIGxlYXZlRnJvbUNsYXNzIGluc3RlYWRcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzZXQgbGVhdmVDbGFzcyh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX2xlYXZlQ2xhc3MgPSB2YWx1ZTtcbiAgICAgICAgY29uc29sZS53YXJuKCdsZWF2ZUNsYXNzIGlzIGRlcHJlY2F0ZWQsIHVzZSBsZWF2ZUZyb21DbGFzcyBpbnN0ZWFkJyk7XG4gICAgfVxuICAgIGdldCBsZWF2ZUNsYXNzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGVhdmVDbGFzcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3R5bGUgY2xhc3MgdG8gYWRkIHdoZW4gaXRlbSBiZWdpbnMgdG8gZ2V0IGhpZGRlbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBsZWF2ZUZyb21DbGFzczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFN0eWxlIGNsYXNzIHRvIGFkZCBkdXJpbmcgbGVhdmUgYW5pbWF0aW9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGxlYXZlQWN0aXZlQ2xhc3M6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBTdHlsZSBjbGFzcyB0byBhZGQgd2hlbiBsZWF2ZSBhbmltYXRpb24gaXMgY29tcGxldGVkLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGxlYXZlVG9DbGFzczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gdHJpZ2dlciBsZWF2ZSBhbmltYXRpb24gd2hlbiBvdXRzaWRlIG9mIHRoZSBlbGVtZW50IGlzIGNsaWNrZWQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgaGlkZU9uT3V0c2lkZUNsaWNrOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIEFkZHMgb3IgcmVtb3ZlcyBhIGNsYXNzIHdoZW4gbm8gZW50ZXItbGVhdmUgYW5pbWF0aW9uIGlzIHJlcXVpcmVkLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHRvZ2dsZUNsYXNzOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byB0cmlnZ2VyIGxlYXZlIGFuaW1hdGlvbiB3aGVuIGVzY2FwZSBrZXkgcHJlc3NlZC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBoaWRlT25Fc2NhcGU6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgICBldmVudExpc3RlbmVyOiBWb2lkTGlzdGVuZXI7XG5cbiAgICBkb2N1bWVudENsaWNrTGlzdGVuZXI6IFZvaWRMaXN0ZW5lcjtcblxuICAgIGRvY3VtZW50S2V5ZG93bkxpc3RlbmVyOiBWb2lkTGlzdGVuZXI7XG5cbiAgICB0YXJnZXQ6IEhUTUxFbGVtZW50IHwgbnVsbCB8IHVuZGVmaW5lZDtcblxuICAgIGVudGVyTGlzdGVuZXI6IFZvaWRMaXN0ZW5lcjtcblxuICAgIGxlYXZlTGlzdGVuZXI6IFZvaWRMaXN0ZW5lcjtcblxuICAgIGFuaW1hdGluZzogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIF9lbnRlckNsYXNzOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICBfbGVhdmVDbGFzczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxuICAgIGNsaWNrTGlzdGVuZXIoKSB7XG4gICAgICAgIHRoaXMudGFyZ2V0ID0gdGhpcy5yZXNvbHZlVGFyZ2V0KCk7XG5cbiAgICAgICAgaWYgKHRoaXMudG9nZ2xlQ2xhc3MpIHtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoKHRoaXMudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5vZmZzZXRQYXJlbnQgPT09IG51bGwpIHRoaXMuZW50ZXIoKTtcbiAgICAgICAgICAgIGVsc2UgdGhpcy5sZWF2ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdG9nZ2xlKCkge1xuICAgICAgICBpZiAoRG9tSGFuZGxlci5oYXNDbGFzcyh0aGlzLnRhcmdldCwgdGhpcy50b2dnbGVDbGFzcyBhcyBzdHJpbmcpKSBEb21IYW5kbGVyLnJlbW92ZUNsYXNzKHRoaXMudGFyZ2V0LCB0aGlzLnRvZ2dsZUNsYXNzIGFzIHN0cmluZyk7XG4gICAgICAgIGVsc2UgRG9tSGFuZGxlci5hZGRDbGFzcyh0aGlzLnRhcmdldCwgdGhpcy50b2dnbGVDbGFzcyBhcyBzdHJpbmcpO1xuICAgIH1cblxuICAgIGVudGVyKCkge1xuICAgICAgICBpZiAodGhpcy5lbnRlckFjdGl2ZUNsYXNzKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuYW5pbWF0aW5nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZW50ZXJBY3RpdmVDbGFzcyA9PT0gJ3NsaWRlZG93bicpIHtcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5zdHlsZS5oZWlnaHQgPSAnMHB4JztcbiAgICAgICAgICAgICAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyh0aGlzLnRhcmdldCwgJ2hpZGRlbicpO1xuICAgICAgICAgICAgICAgICAgICAodGhpcy50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLm1heEhlaWdodCA9ICh0aGlzLnRhcmdldCBhcyBIVE1MRWxlbWVudCkuc2Nyb2xsSGVpZ2h0ICsgJ3B4JztcbiAgICAgICAgICAgICAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyh0aGlzLnRhcmdldCwgJ2hpZGRlbicpO1xuICAgICAgICAgICAgICAgICAgICAodGhpcy50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmhlaWdodCA9ICcnO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3ModGhpcy50YXJnZXQsIHRoaXMuZW50ZXJBY3RpdmVDbGFzcyk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZW50ZXJDbGFzcyB8fCB0aGlzLmVudGVyRnJvbUNsYXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3ModGhpcy50YXJnZXQsIHRoaXMuZW50ZXJDbGFzcyB8fCB0aGlzLmVudGVyRnJvbUNsYXNzKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmVudGVyTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLnRhcmdldCwgJ2FuaW1hdGlvbmVuZCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyh0aGlzLnRhcmdldCwgdGhpcy5lbnRlckFjdGl2ZUNsYXNzIGFzIHN0cmluZyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmVudGVyVG9DbGFzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyh0aGlzLnRhcmdldCwgdGhpcy5lbnRlclRvQ2xhc3MpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW50ZXJMaXN0ZW5lciAmJiB0aGlzLmVudGVyTGlzdGVuZXIoKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5lbnRlckFjdGl2ZUNsYXNzID09PSAnc2xpZGVkb3duJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5zdHlsZS5tYXhIZWlnaHQgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuZW50ZXJDbGFzcyB8fCB0aGlzLmVudGVyRnJvbUNsYXNzKSB7XG4gICAgICAgICAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyh0aGlzLnRhcmdldCwgdGhpcy5lbnRlckNsYXNzIHx8IHRoaXMuZW50ZXJGcm9tQ2xhc3MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5lbnRlclRvQ2xhc3MpIHtcbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKHRoaXMudGFyZ2V0LCB0aGlzLmVudGVyVG9DbGFzcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5oaWRlT25PdXRzaWRlQ2xpY2spIHtcbiAgICAgICAgICAgIHRoaXMuYmluZERvY3VtZW50Q2xpY2tMaXN0ZW5lcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaGlkZU9uRXNjYXBlKSB7XG4gICAgICAgICAgICB0aGlzLmJpbmREb2N1bWVudEtleWRvd25MaXN0ZW5lcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbGVhdmUoKSB7XG4gICAgICAgIGlmICh0aGlzLmxlYXZlQWN0aXZlQ2xhc3MpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5hbmltYXRpbmcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyh0aGlzLnRhcmdldCwgdGhpcy5sZWF2ZUFjdGl2ZUNsYXNzKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5sZWF2ZUNsYXNzIHx8IHRoaXMubGVhdmVGcm9tQ2xhc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyh0aGlzLnRhcmdldCwgdGhpcy5sZWF2ZUNsYXNzIHx8IHRoaXMubGVhdmVGcm9tQ2xhc3MpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMubGVhdmVMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMudGFyZ2V0LCAnYW5pbWF0aW9uZW5kJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBEb21IYW5kbGVyLnJlbW92ZUNsYXNzKHRoaXMudGFyZ2V0LCB0aGlzLmxlYXZlQWN0aXZlQ2xhc3MgYXMgc3RyaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubGVhdmVUb0NsYXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKHRoaXMudGFyZ2V0LCB0aGlzLmxlYXZlVG9DbGFzcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sZWF2ZUxpc3RlbmVyICYmIHRoaXMubGVhdmVMaXN0ZW5lcigpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMubGVhdmVDbGFzcyB8fCB0aGlzLmxlYXZlRnJvbUNsYXNzKSB7XG4gICAgICAgICAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyh0aGlzLnRhcmdldCwgdGhpcy5sZWF2ZUNsYXNzIHx8IHRoaXMubGVhdmVGcm9tQ2xhc3MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5sZWF2ZVRvQ2xhc3MpIHtcbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKHRoaXMudGFyZ2V0LCB0aGlzLmxlYXZlVG9DbGFzcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5oaWRlT25PdXRzaWRlQ2xpY2spIHtcbiAgICAgICAgICAgIHRoaXMudW5iaW5kRG9jdW1lbnRDbGlja0xpc3RlbmVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5oaWRlT25Fc2NhcGUpIHtcbiAgICAgICAgICAgIHRoaXMudW5iaW5kRG9jdW1lbnRLZXlkb3duTGlzdGVuZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlc29sdmVUYXJnZXQoKSB7XG4gICAgICAgIGlmICh0aGlzLnRhcmdldCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0O1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoICh0aGlzLnNlbGVjdG9yKSB7XG4gICAgICAgICAgICBjYXNlICdAbmV4dCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWwubmF0aXZlRWxlbWVudC5uZXh0RWxlbWVudFNpYmxpbmc7XG5cbiAgICAgICAgICAgIGNhc2UgJ0BwcmV2JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lbC5uYXRpdmVFbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG5cbiAgICAgICAgICAgIGNhc2UgJ0BwYXJlbnQnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudDtcblxuICAgICAgICAgICAgY2FzZSAnQGdyYW5kcGFyZW50JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lbC5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLnNlbGVjdG9yIGFzIHN0cmluZyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBiaW5kRG9jdW1lbnRDbGlja0xpc3RlbmVyKCkge1xuICAgICAgICBpZiAoIXRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMuZWwubmF0aXZlRWxlbWVudC5vd25lckRvY3VtZW50LCAnY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNWaXNpYmxlKCkgfHwgZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLnRhcmdldCBhcyBIVE1MRWxlbWVudCkuZ2V0UHJvcGVydHlWYWx1ZSgncG9zaXRpb24nKSA9PT0gJ3N0YXRpYycpIHRoaXMudW5iaW5kRG9jdW1lbnRDbGlja0xpc3RlbmVyKCk7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5pc091dHNpZGVDbGljayhldmVudCkpIHRoaXMubGVhdmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmluZERvY3VtZW50S2V5ZG93bkxpc3RlbmVyKCkge1xuICAgICAgICBpZiAoIXRoaXMuZG9jdW1lbnRLZXlkb3duTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5kb2N1bWVudEtleWRvd25MaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMuZWwubmF0aXZlRWxlbWVudC5vd25lckRvY3VtZW50LCAna2V5ZG93bicsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB7IGtleSwga2V5Q29kZSwgd2hpY2gsIHR5cGUgfSA9IGV2ZW50O1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNWaXNpYmxlKCkgfHwgZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLnRhcmdldCBhcyBIVE1MRWxlbWVudCkuZ2V0UHJvcGVydHlWYWx1ZSgncG9zaXRpb24nKSA9PT0gJ3N0YXRpYycpIHRoaXMudW5iaW5kRG9jdW1lbnRLZXlkb3duTGlzdGVuZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNWaXNpYmxlKCkgJiYga2V5ID09PSAnRXNjYXBlJyAmJiBrZXlDb2RlID09PSAyNyAmJiB3aGljaCA9PT0gMjcpIHRoaXMubGVhdmUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNWaXNpYmxlKCkge1xuICAgICAgICByZXR1cm4gKHRoaXMudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5vZmZzZXRQYXJlbnQgIT09IG51bGw7XG4gICAgfVxuXG4gICAgaXNPdXRzaWRlQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuaXNTYW1lTm9kZShldmVudC50YXJnZXQpICYmICF0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KSAmJiAhKHRoaXMudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5jb250YWlucyg8SFRNTEVsZW1lbnQ+ZXZlbnQudGFyZ2V0KTtcbiAgICB9XG5cbiAgICB1bmJpbmREb2N1bWVudENsaWNrTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVuYmluZERvY3VtZW50S2V5ZG93bkxpc3RlbmVyKCkge1xuICAgICAgICBpZiAodGhpcy5kb2N1bWVudEtleWRvd25MaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudEtleWRvd25MaXN0ZW5lcigpO1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudEtleWRvd25MaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy50YXJnZXQgPSBudWxsO1xuICAgICAgICBpZiAodGhpcy5ldmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50TGlzdGVuZXIoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVuYmluZERvY3VtZW50Q2xpY2tMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLnVuYmluZERvY3VtZW50S2V5ZG93bkxpc3RlbmVyKCk7XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtTdHlsZUNsYXNzXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtTdHlsZUNsYXNzXVxufSlcbmV4cG9ydCBjbGFzcyBTdHlsZUNsYXNzTW9kdWxlIHt9XG4iXX0=