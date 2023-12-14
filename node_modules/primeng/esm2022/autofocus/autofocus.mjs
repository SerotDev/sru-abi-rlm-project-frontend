import { CommonModule } from '@angular/common';
import { Directive, Input, NgModule } from '@angular/core';
import { DomHandler } from 'primeng/dom';
import * as i0 from "@angular/core";
/**
 * AutoFocus manages focus on focusable element on load.
 * @group Components
 */
export class AutoFocus {
    host;
    constructor(host) {
        this.host = host;
    }
    /**
     * When present, it specifies that the component should automatically get focus on load.
     * @group Props
     */
    autofocus;
    focused = false;
    ngAfterContentChecked() {
        if (!this.focused) {
            if (this.autofocus) {
                const focusableElements = DomHandler.getFocusableElements(this.host.nativeElement);
                if (focusableElements.length === 0) {
                    this.host.nativeElement.focus();
                }
                if (focusableElements.length > 0) {
                    focusableElements[0].focus();
                }
                this.focused = true;
            }
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: AutoFocus, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.0.5", type: AutoFocus, selector: "[pAutoFocus]", inputs: { autofocus: "autofocus" }, host: { classAttribute: "p-element" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: AutoFocus, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pAutoFocus]',
                    host: {
                        class: 'p-element'
                    }
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }], propDecorators: { autofocus: [{
                type: Input
            }] } });
export class AutoFocusModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: AutoFocusModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.0.5", ngImport: i0, type: AutoFocusModule, declarations: [AutoFocus], imports: [CommonModule], exports: [AutoFocus] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: AutoFocusModule, imports: [CommonModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: AutoFocusModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [AutoFocus],
                    declarations: [AutoFocus]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2ZvY3VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL2F1dG9mb2N1cy9hdXRvZm9jdXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxTQUFTLEVBQWMsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sYUFBYSxDQUFDOztBQUN6Qzs7O0dBR0c7QUFPSCxNQUFNLE9BQU8sU0FBUztJQUNFO0lBQXBCLFlBQW9CLElBQWdCO1FBQWhCLFNBQUksR0FBSixJQUFJLENBQVk7SUFBRyxDQUFDO0lBQ3hDOzs7T0FHRztJQUNNLFNBQVMsQ0FBc0I7SUFFeEMsT0FBTyxHQUFZLEtBQUssQ0FBQztJQUV6QixxQkFBcUI7UUFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZixJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ2hCLE1BQU0saUJBQWlCLEdBQUcsVUFBVSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBRW5GLElBQUksaUJBQWlCLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtvQkFDaEMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7aUJBQ25DO2dCQUNELElBQUksaUJBQWlCLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFDOUIsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7aUJBQ2hDO2dCQUVELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO2FBQ3ZCO1NBQ0o7SUFDTCxDQUFDO3VHQXpCUSxTQUFTOzJGQUFULFNBQVM7OzJGQUFULFNBQVM7a0JBTnJCLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLGNBQWM7b0JBQ3hCLElBQUksRUFBRTt3QkFDRixLQUFLLEVBQUUsV0FBVztxQkFDckI7aUJBQ0o7K0VBT1ksU0FBUztzQkFBakIsS0FBSzs7QUEyQlYsTUFBTSxPQUFPLGVBQWU7dUdBQWYsZUFBZTt3R0FBZixlQUFlLGlCQWpDZixTQUFTLGFBNkJSLFlBQVksYUE3QmIsU0FBUzt3R0FpQ1QsZUFBZSxZQUpkLFlBQVk7OzJGQUliLGVBQWU7a0JBTDNCLFFBQVE7bUJBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixPQUFPLEVBQUUsQ0FBQyxTQUFTLENBQUM7b0JBQ3BCLFlBQVksRUFBRSxDQUFDLFNBQVMsQ0FBQztpQkFDNUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERvbUhhbmRsZXIgfSBmcm9tICdwcmltZW5nL2RvbSc7XG4vKipcbiAqIEF1dG9Gb2N1cyBtYW5hZ2VzIGZvY3VzIG9uIGZvY3VzYWJsZSBlbGVtZW50IG9uIGxvYWQuXG4gKiBAZ3JvdXAgQ29tcG9uZW50c1xuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1twQXV0b0ZvY3VzXScsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ3AtZWxlbWVudCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIEF1dG9Gb2N1cyB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBob3N0OiBFbGVtZW50UmVmKSB7fVxuICAgIC8qKlxuICAgICAqIFdoZW4gcHJlc2VudCwgaXQgc3BlY2lmaWVzIHRoYXQgdGhlIGNvbXBvbmVudCBzaG91bGQgYXV0b21hdGljYWxseSBnZXQgZm9jdXMgb24gbG9hZC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBhdXRvZm9jdXM6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgICBmb2N1c2VkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XG4gICAgICAgIGlmICghdGhpcy5mb2N1c2VkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hdXRvZm9jdXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmb2N1c2FibGVFbGVtZW50cyA9IERvbUhhbmRsZXIuZ2V0Rm9jdXNhYmxlRWxlbWVudHModGhpcy5ob3N0Lm5hdGl2ZUVsZW1lbnQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZvY3VzYWJsZUVsZW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhvc3QubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZm9jdXNhYmxlRWxlbWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBmb2N1c2FibGVFbGVtZW50c1swXS5mb2N1cygpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gICAgZXhwb3J0czogW0F1dG9Gb2N1c10sXG4gICAgZGVjbGFyYXRpb25zOiBbQXV0b0ZvY3VzXVxufSlcbmV4cG9ydCBjbGFzcyBBdXRvRm9jdXNNb2R1bGUge31cbiJdfQ==