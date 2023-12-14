import { Component, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { ObjectUtils } from 'primeng/utils';
import * as i0 from "@angular/core";
export class BaseIcon {
    label;
    spin = false;
    styleClass;
    role;
    ariaLabel;
    ariaHidden;
    ngOnInit() {
        this.getAttributes();
    }
    getAttributes() {
        const isLabelEmpty = ObjectUtils.isEmpty(this.label);
        this.role = !isLabelEmpty ? 'img' : undefined;
        this.ariaLabel = !isLabelEmpty ? this.label : undefined;
        this.ariaHidden = isLabelEmpty;
    }
    getClassNames() {
        return `p-icon ${this.styleClass ? this.styleClass + ' ' : ''}${this.spin ? 'p-icon-spin' : ''}`;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: BaseIcon, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.5", type: BaseIcon, isStandalone: true, selector: "ng-component", inputs: { label: "label", spin: "spin", styleClass: "styleClass" }, host: { classAttribute: "p-element p-icon-wrapper" }, ngImport: i0, template: ` <ng-content></ng-content> `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: BaseIcon, decorators: [{
            type: Component,
            args: [{
                    template: ` <ng-content></ng-content> `,
                    standalone: true,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        class: 'p-element p-icon-wrapper'
                    }
                }]
        }], propDecorators: { label: [{
                type: Input
            }], spin: [{
                type: Input
            }], styleClass: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZWljb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvYmFzZWljb24vYmFzZWljb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQTJCLE1BQU0sZUFBZSxDQUFDO0FBQ3RILE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBVzVDLE1BQU0sT0FBTyxRQUFRO0lBQ1IsS0FBSyxDQUFTO0lBRWQsSUFBSSxHQUFZLEtBQUssQ0FBQztJQUV0QixVQUFVLENBQVM7SUFFNUIsSUFBSSxDQUFTO0lBRWIsU0FBUyxDQUFTO0lBRWxCLFVBQVUsQ0FBVTtJQUVwQixRQUFRO1FBQ0osSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxhQUFhO1FBQ1QsTUFBTSxZQUFZLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDOUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQ3hELElBQUksQ0FBQyxVQUFVLEdBQUcsWUFBWSxDQUFDO0lBQ25DLENBQUM7SUFFRCxhQUFhO1FBQ1QsT0FBTyxVQUFVLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUNyRyxDQUFDO3VHQTFCUSxRQUFROzJGQUFSLFFBQVEsa01BUlAsNkJBQTZCOzsyRkFROUIsUUFBUTtrQkFUcEIsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUsNkJBQTZCO29CQUN2QyxVQUFVLEVBQUUsSUFBSTtvQkFDaEIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxJQUFJLEVBQUU7d0JBQ0YsS0FBSyxFQUFFLDBCQUEwQjtxQkFDcEM7aUJBQ0o7OEJBRVksS0FBSztzQkFBYixLQUFLO2dCQUVHLElBQUk7c0JBQVosS0FBSztnQkFFRyxVQUFVO3NCQUFsQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFZpZXdFbmNhcHN1bGF0aW9uLCBFbGVtZW50UmVmLCBIb3N0QmluZGluZyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JqZWN0VXRpbHMgfSBmcm9tICdwcmltZW5nL3V0aWxzJztcblxuQENvbXBvbmVudCh7XG4gICAgdGVtcGxhdGU6IGAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PiBgLFxuICAgIHN0YW5kYWxvbmU6IHRydWUsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAncC1lbGVtZW50IHAtaWNvbi13cmFwcGVyJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgQmFzZUljb24ge1xuICAgIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBzcGluOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XG5cbiAgICByb2xlOiBzdHJpbmc7XG5cbiAgICBhcmlhTGFiZWw6IHN0cmluZztcblxuICAgIGFyaWFIaWRkZW46IGJvb2xlYW47XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5nZXRBdHRyaWJ1dGVzKCk7XG4gICAgfVxuXG4gICAgZ2V0QXR0cmlidXRlcygpIHtcbiAgICAgICAgY29uc3QgaXNMYWJlbEVtcHR5ID0gT2JqZWN0VXRpbHMuaXNFbXB0eSh0aGlzLmxhYmVsKTtcbiAgICAgICAgdGhpcy5yb2xlID0gIWlzTGFiZWxFbXB0eSA/ICdpbWcnIDogdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmFyaWFMYWJlbCA9ICFpc0xhYmVsRW1wdHkgPyB0aGlzLmxhYmVsIDogdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmFyaWFIaWRkZW4gPSBpc0xhYmVsRW1wdHk7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lcygpIHtcbiAgICAgICAgcmV0dXJuIGBwLWljb24gJHt0aGlzLnN0eWxlQ2xhc3MgPyB0aGlzLnN0eWxlQ2xhc3MgKyAnICcgOiAnJ30ke3RoaXMuc3BpbiA/ICdwLWljb24tc3BpbicgOiAnJ31gO1xuICAgIH1cbn1cbiJdfQ==