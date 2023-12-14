import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Directive, Input, NgModule, Inject, PLATFORM_ID } from '@angular/core';
import { DomHandler } from 'primeng/dom';
import * as i0 from "@angular/core";
/**
 * AnimateOnScroll is used to apply animations to elements when entering or leaving the viewport during scrolling.
 * @group Components
 */
export class AnimateOnScroll {
    document;
    platformId;
    host;
    el;
    renderer;
    /**
     * Selector to define the CSS class for enter animation.
     * @group Props
     */
    enterClass;
    /**
     * Selector to define the CSS class for leave animation.
     * @group Props
     */
    leaveClass;
    /**
     * Specifies the root option of the IntersectionObserver API.
     * @group Props
     */
    root;
    /**
     * Specifies the rootMargin option of the IntersectionObserver API.
     * @group Props
     */
    rootMargin;
    /**
     * Specifies the threshold option of the IntersectionObserver API
     * @group Props
     */
    threshold;
    /**
     * Whether the scroll event listener should be removed after initial run.
     * @group Props
     */
    once = true;
    observer;
    resetObserver;
    isObserverActive = false;
    animationState;
    animationEndListener;
    constructor(document, platformId, host, el, renderer) {
        this.document = document;
        this.platformId = platformId;
        this.host = host;
        this.el = el;
        this.renderer = renderer;
    }
    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.renderer.setStyle(this.host.nativeElement, 'opacity', this.enterClass ? '0' : '');
        }
    }
    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.bindIntersectionObserver();
        }
    }
    get options() {
        return {
            root: this.root,
            rootMargin: this.rootMargin,
            threshold: this.threshold
        };
    }
    bindIntersectionObserver() {
        this.observer = new IntersectionObserver(([entry]) => {
            if (this.isObserverActive) {
                if (entry.boundingClientRect.top > 0) {
                    entry.isIntersecting ? this.enter() : this.leave();
                }
            }
            else if (entry.isIntersecting) {
                this.enter();
            }
            this.isObserverActive = true;
        }, this.options);
        setTimeout(() => this.observer.observe(this.host.nativeElement), 0);
        // Reset
        this.resetObserver = new IntersectionObserver(([entry]) => {
            if (entry.boundingClientRect.top > 0 && !entry.isIntersecting) {
                this.host.nativeElement.style.opacity = this.enterClass ? '0' : '';
                DomHandler.removeMultipleClasses(this.host.nativeElement, [this.enterClass, this.leaveClass]);
                this.resetObserver.unobserve(this.host.nativeElement);
            }
            this.animationState = undefined;
        }, { ...this.options, threshold: 0 });
    }
    enter() {
        if (this.animationState !== 'enter' && this.enterClass) {
            this.host.nativeElement.style.opacity = '';
            DomHandler.removeMultipleClasses(this.host.nativeElement, this.leaveClass);
            DomHandler.addMultipleClasses(this.host.nativeElement, this.enterClass);
            this.once && this.unbindIntersectionObserver();
            this.bindAnimationEvents();
            this.animationState = 'enter';
        }
    }
    leave() {
        if (this.animationState !== 'leave' && this.leaveClass) {
            this.host.nativeElement.style.opacity = this.enterClass ? '0' : '';
            DomHandler.removeMultipleClasses(this.host.nativeElement, this.enterClass);
            DomHandler.addMultipleClasses(this.host.nativeElement, this.leaveClass);
            this.bindAnimationEvents();
            this.animationState = 'leave';
        }
    }
    bindAnimationEvents() {
        if (!this.animationEndListener) {
            this.animationEndListener = this.renderer.listen(this.host.nativeElement, 'animationend', () => {
                DomHandler.removeMultipleClasses(this.host.nativeElement, [this.enterClass, this.leaveClass]);
                !this.once && this.resetObserver.observe(this.host.nativeElement);
                this.unbindAnimationEvents();
            });
        }
    }
    unbindAnimationEvents() {
        if (this.animationEndListener) {
            this.animationEndListener();
            this.animationEndListener = null;
        }
    }
    unbindIntersectionObserver() {
        this.observer?.unobserve(this.host.nativeElement);
        this.resetObserver?.unobserve(this.host.nativeElement);
        this.isObserverActive = false;
    }
    ngOnDestroy() {
        this.unbindAnimationEvents();
        this.unbindIntersectionObserver();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: AnimateOnScroll, deps: [{ token: DOCUMENT }, { token: PLATFORM_ID }, { token: i0.ElementRef }, { token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.0.5", type: AnimateOnScroll, selector: "[pAnimateOnScroll]", inputs: { enterClass: "enterClass", leaveClass: "leaveClass", root: "root", rootMargin: "rootMargin", threshold: "threshold", once: "once" }, host: { properties: { "class.p-animateonscroll": "true" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: AnimateOnScroll, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pAnimateOnScroll]',
                    host: {
                        '[class.p-animateonscroll]': 'true'
                    }
                }]
        }], ctorParameters: () => [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i0.ElementRef }, { type: i0.ElementRef }, { type: i0.Renderer2 }], propDecorators: { enterClass: [{
                type: Input
            }], leaveClass: [{
                type: Input
            }], root: [{
                type: Input
            }], rootMargin: [{
                type: Input
            }], threshold: [{
                type: Input
            }], once: [{
                type: Input
            }] } });
export class AnimateOnScrollModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: AnimateOnScrollModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.0.5", ngImport: i0, type: AnimateOnScrollModule, declarations: [AnimateOnScroll], imports: [CommonModule], exports: [AnimateOnScroll] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: AnimateOnScrollModule, imports: [CommonModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: AnimateOnScrollModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [AnimateOnScroll],
                    declarations: [AnimateOnScroll]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0ZW9uc2Nyb2xsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL2FuaW1hdGVvbnNjcm9sbC9hbmltYXRlb25zY3JvbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM1RSxPQUFPLEVBQWlCLFNBQVMsRUFBYyxLQUFLLEVBQUUsUUFBUSxFQUFxQixNQUFNLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxhQUFhLENBQUM7O0FBUXpDOzs7R0FHRztBQU9ILE1BQU0sT0FBTyxlQUFlO0lBMENjO0lBQWlEO0lBQXlCO0lBQXlCO0lBQXVCO0lBekNoSzs7O09BR0c7SUFDTSxVQUFVLENBQXFCO0lBQ3hDOzs7T0FHRztJQUNNLFVBQVUsQ0FBcUI7SUFDeEM7OztPQUdHO0lBQ00sSUFBSSxDQUFpQztJQUM5Qzs7O09BR0c7SUFDTSxVQUFVLENBQXFCO0lBQ3hDOzs7T0FHRztJQUNNLFNBQVMsQ0FBcUI7SUFDdkM7OztPQUdHO0lBQ00sSUFBSSxHQUFZLElBQUksQ0FBQztJQUU5QixRQUFRLENBQW1DO0lBRTNDLGFBQWEsQ0FBTTtJQUVuQixnQkFBZ0IsR0FBWSxLQUFLLENBQUM7SUFFbEMsY0FBYyxDQUFNO0lBRXBCLG9CQUFvQixDQUEyQjtJQUUvQyxZQUFzQyxRQUFrQixFQUErQixVQUFlLEVBQVUsSUFBZ0IsRUFBUyxFQUFjLEVBQVMsUUFBbUI7UUFBN0ksYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUErQixlQUFVLEdBQVYsVUFBVSxDQUFLO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUFTLE9BQUUsR0FBRixFQUFFLENBQVk7UUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFXO0lBQUcsQ0FBQztJQUV2TCxRQUFRO1FB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bEIsS0FBSztnQkFLRyxTQUFTO3NCQUFqQixLQUFLO2dCQUtHLElBQUk7c0JBQVosS0FBSzs7QUE0SFYsTUFBTSxPQUFPLHFCQUFxQjt1R0FBckIscUJBQXFCO3dHQUFyQixxQkFBcUIsaUJBMUpyQixlQUFlLGFBc0pkLFlBQVksYUF0SmIsZUFBZTt3R0EwSmYscUJBQXFCLFlBSnBCLFlBQVk7OzJGQUliLHFCQUFxQjtrQkFMakMsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0JBQ3ZCLE9BQU8sRUFBRSxDQUFDLGVBQWUsQ0FBQztvQkFDMUIsWUFBWSxFQUFFLENBQUMsZUFBZSxDQUFDO2lCQUNsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSwgRE9DVU1FTlQsIGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEFmdGVyVmlld0luaXQsIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQsIE5nTW9kdWxlLCBSZW5kZXJlcjIsIE9uSW5pdCwgSW5qZWN0LCBQTEFURk9STV9JRCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRG9tSGFuZGxlciB9IGZyb20gJ3ByaW1lbmcvZG9tJztcblxuaW50ZXJmYWNlIEFuaW1hdGVPblNjcm9sbE9wdGlvbnMge1xuICAgIHJvb3Q/OiBIVE1MRWxlbWVudDtcbiAgICByb290TWFyZ2luPzogc3RyaW5nO1xuICAgIHRocmVzaG9sZD86IG51bWJlcjtcbn1cblxuLyoqXG4gKiBBbmltYXRlT25TY3JvbGwgaXMgdXNlZCB0byBhcHBseSBhbmltYXRpb25zIHRvIGVsZW1lbnRzIHdoZW4gZW50ZXJpbmcgb3IgbGVhdmluZyB0aGUgdmlld3BvcnQgZHVyaW5nIHNjcm9sbGluZy5cbiAqIEBncm91cCBDb21wb25lbnRzXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3BBbmltYXRlT25TY3JvbGxdJyxcbiAgICBob3N0OiB7XG4gICAgICAgICdbY2xhc3MucC1hbmltYXRlb25zY3JvbGxdJzogJ3RydWUnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBBbmltYXRlT25TY3JvbGwgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xuICAgIC8qKlxuICAgICAqIFNlbGVjdG9yIHRvIGRlZmluZSB0aGUgQ1NTIGNsYXNzIGZvciBlbnRlciBhbmltYXRpb24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZW50ZXJDbGFzczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFNlbGVjdG9yIHRvIGRlZmluZSB0aGUgQ1NTIGNsYXNzIGZvciBsZWF2ZSBhbmltYXRpb24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgbGVhdmVDbGFzczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFNwZWNpZmllcyB0aGUgcm9vdCBvcHRpb24gb2YgdGhlIEludGVyc2VjdGlvbk9ic2VydmVyIEFQSS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSByb290OiBIVE1MRWxlbWVudCB8IHVuZGVmaW5lZCB8IG51bGw7XG4gICAgLyoqXG4gICAgICogU3BlY2lmaWVzIHRoZSByb290TWFyZ2luIG9wdGlvbiBvZiB0aGUgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgQVBJLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHJvb3RNYXJnaW46IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBTcGVjaWZpZXMgdGhlIHRocmVzaG9sZCBvcHRpb24gb2YgdGhlIEludGVyc2VjdGlvbk9ic2VydmVyIEFQSVxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHRocmVzaG9sZDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIHNjcm9sbCBldmVudCBsaXN0ZW5lciBzaG91bGQgYmUgcmVtb3ZlZCBhZnRlciBpbml0aWFsIHJ1bi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBvbmNlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIG9ic2VydmVyOiBJbnRlcnNlY3Rpb25PYnNlcnZlciB8IHVuZGVmaW5lZDtcblxuICAgIHJlc2V0T2JzZXJ2ZXI6IGFueTtcblxuICAgIGlzT2JzZXJ2ZXJBY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGFuaW1hdGlvblN0YXRlOiBhbnk7XG5cbiAgICBhbmltYXRpb25FbmRMaXN0ZW5lcjogVm9pZEZ1bmN0aW9uIHwgdW5kZWZpbmVkO1xuXG4gICAgY29uc3RydWN0b3IoQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogRG9jdW1lbnQsIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogYW55LCBwcml2YXRlIGhvc3Q6IEVsZW1lbnRSZWYsIHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHVibGljIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5ob3N0Lm5hdGl2ZUVsZW1lbnQsICdvcGFjaXR5JywgdGhpcy5lbnRlckNsYXNzID8gJzAnIDogJycpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgICAgICAgdGhpcy5iaW5kSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBvcHRpb25zKCk6IEFuaW1hdGVPblNjcm9sbE9wdGlvbnMge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcm9vdDogdGhpcy5yb290LFxuICAgICAgICAgICAgcm9vdE1hcmdpbjogdGhpcy5yb290TWFyZ2luLFxuICAgICAgICAgICAgdGhyZXNob2xkOiB0aGlzLnRocmVzaG9sZFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGJpbmRJbnRlcnNlY3Rpb25PYnNlcnZlcigpIHtcbiAgICAgICAgdGhpcy5vYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcigoW2VudHJ5XSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNPYnNlcnZlckFjdGl2ZSkge1xuICAgICAgICAgICAgICAgIGlmIChlbnRyeS5ib3VuZGluZ0NsaWVudFJlY3QudG9wID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBlbnRyeS5pc0ludGVyc2VjdGluZyA/IHRoaXMuZW50ZXIoKSA6IHRoaXMubGVhdmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGVudHJ5LmlzSW50ZXJzZWN0aW5nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbnRlcigpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmlzT2JzZXJ2ZXJBY3RpdmUgPSB0cnVlO1xuICAgICAgICB9LCB0aGlzLm9wdGlvbnMpO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5vYnNlcnZlci5vYnNlcnZlKHRoaXMuaG9zdC5uYXRpdmVFbGVtZW50KSwgMCk7XG5cbiAgICAgICAgLy8gUmVzZXRcblxuICAgICAgICB0aGlzLnJlc2V0T2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoXG4gICAgICAgICAgICAoW2VudHJ5XSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlbnRyeS5ib3VuZGluZ0NsaWVudFJlY3QudG9wID4gMCAmJiAhZW50cnkuaXNJbnRlcnNlY3RpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ob3N0Lm5hdGl2ZUVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IHRoaXMuZW50ZXJDbGFzcyA/ICcwJyA6ICcnO1xuICAgICAgICAgICAgICAgICAgICBEb21IYW5kbGVyLnJlbW92ZU11bHRpcGxlQ2xhc3Nlcyh0aGlzLmhvc3QubmF0aXZlRWxlbWVudCwgW3RoaXMuZW50ZXJDbGFzcywgdGhpcy5sZWF2ZUNsYXNzXSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNldE9ic2VydmVyLnVub2JzZXJ2ZSh0aGlzLmhvc3QubmF0aXZlRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb25TdGF0ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7IC4uLnRoaXMub3B0aW9ucywgdGhyZXNob2xkOiAwIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBlbnRlcigpIHtcbiAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uU3RhdGUgIT09ICdlbnRlcicgJiYgdGhpcy5lbnRlckNsYXNzKSB7XG4gICAgICAgICAgICB0aGlzLmhvc3QubmF0aXZlRWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gJyc7XG4gICAgICAgICAgICBEb21IYW5kbGVyLnJlbW92ZU11bHRpcGxlQ2xhc3Nlcyh0aGlzLmhvc3QubmF0aXZlRWxlbWVudCwgdGhpcy5sZWF2ZUNsYXNzKTtcbiAgICAgICAgICAgIERvbUhhbmRsZXIuYWRkTXVsdGlwbGVDbGFzc2VzKHRoaXMuaG9zdC5uYXRpdmVFbGVtZW50LCB0aGlzLmVudGVyQ2xhc3MpO1xuXG4gICAgICAgICAgICB0aGlzLm9uY2UgJiYgdGhpcy51bmJpbmRJbnRlcnNlY3Rpb25PYnNlcnZlcigpO1xuXG4gICAgICAgICAgICB0aGlzLmJpbmRBbmltYXRpb25FdmVudHMoKTtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uU3RhdGUgPSAnZW50ZXInO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbGVhdmUoKSB7XG4gICAgICAgIGlmICh0aGlzLmFuaW1hdGlvblN0YXRlICE9PSAnbGVhdmUnICYmIHRoaXMubGVhdmVDbGFzcykge1xuICAgICAgICAgICAgdGhpcy5ob3N0Lm5hdGl2ZUVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IHRoaXMuZW50ZXJDbGFzcyA/ICcwJyA6ICcnO1xuICAgICAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVNdWx0aXBsZUNsYXNzZXModGhpcy5ob3N0Lm5hdGl2ZUVsZW1lbnQsIHRoaXMuZW50ZXJDbGFzcyk7XG4gICAgICAgICAgICBEb21IYW5kbGVyLmFkZE11bHRpcGxlQ2xhc3Nlcyh0aGlzLmhvc3QubmF0aXZlRWxlbWVudCwgdGhpcy5sZWF2ZUNsYXNzKTtcblxuICAgICAgICAgICAgdGhpcy5iaW5kQW5pbWF0aW9uRXZlbnRzKCk7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvblN0YXRlID0gJ2xlYXZlJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJpbmRBbmltYXRpb25FdmVudHMoKSB7XG4gICAgICAgIGlmICghdGhpcy5hbmltYXRpb25FbmRMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25FbmRMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMuaG9zdC5uYXRpdmVFbGVtZW50LCAnYW5pbWF0aW9uZW5kJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIucmVtb3ZlTXVsdGlwbGVDbGFzc2VzKHRoaXMuaG9zdC5uYXRpdmVFbGVtZW50LCBbdGhpcy5lbnRlckNsYXNzLCB0aGlzLmxlYXZlQ2xhc3NdKTtcbiAgICAgICAgICAgICAgICAhdGhpcy5vbmNlICYmIHRoaXMucmVzZXRPYnNlcnZlci5vYnNlcnZlKHRoaXMuaG9zdC5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgICAgICAgICB0aGlzLnVuYmluZEFuaW1hdGlvbkV2ZW50cygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1bmJpbmRBbmltYXRpb25FdmVudHMoKSB7XG4gICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbkVuZExpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbkVuZExpc3RlbmVyKCk7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbkVuZExpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVuYmluZEludGVyc2VjdGlvbk9ic2VydmVyKCkge1xuICAgICAgICB0aGlzLm9ic2VydmVyPy51bm9ic2VydmUodGhpcy5ob3N0Lm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICB0aGlzLnJlc2V0T2JzZXJ2ZXI/LnVub2JzZXJ2ZSh0aGlzLmhvc3QubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIHRoaXMuaXNPYnNlcnZlckFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnVuYmluZEFuaW1hdGlvbkV2ZW50cygpO1xuICAgICAgICB0aGlzLnVuYmluZEludGVyc2VjdGlvbk9ic2VydmVyKCk7XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtBbmltYXRlT25TY3JvbGxdLFxuICAgIGRlY2xhcmF0aW9uczogW0FuaW1hdGVPblNjcm9sbF1cbn0pXG5leHBvcnQgY2xhc3MgQW5pbWF0ZU9uU2Nyb2xsTW9kdWxlIHt9XG4iXX0=