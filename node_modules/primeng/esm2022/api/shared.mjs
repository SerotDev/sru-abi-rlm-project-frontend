import { CommonModule } from '@angular/common';
import { Component, Directive, Input, NgModule } from '@angular/core';
import * as i0 from "@angular/core";
export class Header {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: Header, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.5", type: Header, selector: "p-header", ngImport: i0, template: '<ng-content></ng-content>', isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: Header, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-header',
                    template: '<ng-content></ng-content>'
                }]
        }] });
export class Footer {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: Footer, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.5", type: Footer, selector: "p-footer", ngImport: i0, template: '<ng-content></ng-content>', isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: Footer, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-footer',
                    template: '<ng-content></ng-content>'
                }]
        }] });
export class PrimeTemplate {
    template;
    type;
    name;
    constructor(template) {
        this.template = template;
    }
    getType() {
        return this.name;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: PrimeTemplate, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.0.5", type: PrimeTemplate, selector: "[pTemplate]", inputs: { type: "type", name: ["pTemplate", "name"] }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: PrimeTemplate, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pTemplate]',
                    host: {}
                }]
        }], ctorParameters: () => [{ type: i0.TemplateRef }], propDecorators: { type: [{
                type: Input
            }], name: [{
                type: Input,
                args: ['pTemplate']
            }] } });
export class SharedModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: SharedModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.0.5", ngImport: i0, type: SharedModule, declarations: [Header, Footer, PrimeTemplate], imports: [CommonModule], exports: [Header, Footer, PrimeTemplate] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: SharedModule, imports: [CommonModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: SharedModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [Header, Footer, PrimeTemplate],
                    declarations: [Header, Footer, PrimeTemplate]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL2FwaS9zaGFyZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQWUsTUFBTSxlQUFlLENBQUM7O0FBTW5GLE1BQU0sT0FBTyxNQUFNO3VHQUFOLE1BQU07MkZBQU4sTUFBTSxnREFGTCwyQkFBMkI7OzJGQUU1QixNQUFNO2tCQUpsQixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxVQUFVO29CQUNwQixRQUFRLEVBQUUsMkJBQTJCO2lCQUN4Qzs7QUFPRCxNQUFNLE9BQU8sTUFBTTt1R0FBTixNQUFNOzJGQUFOLE1BQU0sZ0RBRkwsMkJBQTJCOzsyRkFFNUIsTUFBTTtrQkFKbEIsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUsVUFBVTtvQkFDcEIsUUFBUSxFQUFFLDJCQUEyQjtpQkFDeEM7O0FBT0QsTUFBTSxPQUFPLGFBQWE7SUFLSDtJQUpWLElBQUksQ0FBcUI7SUFFZCxJQUFJLENBQXFCO0lBRTdDLFlBQW1CLFFBQTBCO1FBQTFCLGFBQVEsR0FBUixRQUFRLENBQWtCO0lBQUcsQ0FBQztJQUVqRCxPQUFPO1FBQ0gsT0FBTyxJQUFJLENBQUMsSUFBSyxDQUFDO0lBQ3RCLENBQUM7dUdBVFEsYUFBYTsyRkFBYixhQUFhOzsyRkFBYixhQUFhO2tCQUp6QixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxhQUFhO29CQUN2QixJQUFJLEVBQUUsRUFBRTtpQkFDWDtnRkFFWSxJQUFJO3NCQUFaLEtBQUs7Z0JBRWMsSUFBSTtzQkFBdkIsS0FBSzt1QkFBQyxXQUFXOztBQWN0QixNQUFNLE9BQU8sWUFBWTt1R0FBWixZQUFZO3dHQUFaLFlBQVksaUJBN0JaLE1BQU0sRUFNTixNQUFNLEVBTU4sYUFBYSxhQWFaLFlBQVksYUF6QmIsTUFBTSxFQU1OLE1BQU0sRUFNTixhQUFhO3dHQWlCYixZQUFZLFlBSlgsWUFBWTs7MkZBSWIsWUFBWTtrQkFMeEIsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0JBQ3ZCLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsYUFBYSxDQUFDO29CQUN4QyxZQUFZLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLGFBQWEsQ0FBQztpQkFDaEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBEaXJlY3RpdmUsIElucHV0LCBOZ01vZHVsZSwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLWhlYWRlcicsXG4gICAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+J1xufSlcbmV4cG9ydCBjbGFzcyBIZWFkZXIge31cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLWZvb3RlcicsXG4gICAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+J1xufSlcbmV4cG9ydCBjbGFzcyBGb290ZXIge31cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbcFRlbXBsYXRlXScsXG4gICAgaG9zdDoge31cbn0pXG5leHBvcnQgY2xhc3MgUHJpbWVUZW1wbGF0ZSB7XG4gICAgQElucHV0KCkgdHlwZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICAgQElucHV0KCdwVGVtcGxhdGUnKSBuYW1lOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4pIHt9XG5cbiAgICBnZXRUeXBlKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLm5hbWUhO1xuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbSGVhZGVyLCBGb290ZXIsIFByaW1lVGVtcGxhdGVdLFxuICAgIGRlY2xhcmF0aW9uczogW0hlYWRlciwgRm9vdGVyLCBQcmltZVRlbXBsYXRlXVxufSlcbmV4cG9ydCBjbGFzcyBTaGFyZWRNb2R1bGUge31cbiJdfQ==