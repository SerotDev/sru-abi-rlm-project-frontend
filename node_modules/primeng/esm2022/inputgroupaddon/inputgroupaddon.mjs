import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { SharedModule } from 'primeng/api';
import * as i0 from "@angular/core";
/**
 * InputGroupAddon displays text, icon, buttons and other content can be grouped next to an input.
 * @group Components
 */
export class InputGroupAddon {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: InputGroupAddon, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.5", type: InputGroupAddon, selector: "p-inputGroupAddon", host: { classAttribute: "p-element p-inputgroup-addon" }, ngImport: i0, template: `
        <div [attr.data-pc-name]="'inputgroupaddon'">
            <ng-content></ng-content>
        </div>
    `, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: InputGroupAddon, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-inputGroupAddon',
                    template: `
        <div [attr.data-pc-name]="'inputgroupaddon'">
            <ng-content></ng-content>
        </div>
    `,
                    host: {
                        class: 'p-element p-inputgroup-addon'
                    }
                }]
        }] });
export class InputGroupAddonModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: InputGroupAddonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.0.5", ngImport: i0, type: InputGroupAddonModule, declarations: [InputGroupAddon], imports: [CommonModule], exports: [InputGroupAddon, SharedModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: InputGroupAddonModule, imports: [CommonModule, SharedModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: InputGroupAddonModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [InputGroupAddon, SharedModule],
                    declarations: [InputGroupAddon]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXRncm91cGFkZG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL2lucHV0Z3JvdXBhZGRvbi9pbnB1dGdyb3VwYWRkb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3BELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxhQUFhLENBQUM7O0FBQzNDOzs7R0FHRztBQVlILE1BQU0sT0FBTyxlQUFlO3VHQUFmLGVBQWU7MkZBQWYsZUFBZSxtSEFUZDs7OztLQUlUOzsyRkFLUSxlQUFlO2tCQVgzQixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLFFBQVEsRUFBRTs7OztLQUlUO29CQUNELElBQUksRUFBRTt3QkFDRixLQUFLLEVBQUUsOEJBQThCO3FCQUN4QztpQkFDSjs7QUFRRCxNQUFNLE9BQU8scUJBQXFCO3VHQUFyQixxQkFBcUI7d0dBQXJCLHFCQUFxQixpQkFQckIsZUFBZSxhQUdkLFlBQVksYUFIYixlQUFlLEVBSUcsWUFBWTt3R0FHOUIscUJBQXFCLFlBSnBCLFlBQVksRUFDSyxZQUFZOzsyRkFHOUIscUJBQXFCO2tCQUxqQyxRQUFRO21CQUFDO29CQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztvQkFDdkIsT0FBTyxFQUFFLENBQUMsZUFBZSxFQUFFLFlBQVksQ0FBQztvQkFDeEMsWUFBWSxFQUFFLENBQUMsZUFBZSxDQUFDO2lCQUNsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBDb21wb25lbnQsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUgfSBmcm9tICdwcmltZW5nL2FwaSc7XG4vKipcbiAqIElucHV0R3JvdXBBZGRvbiBkaXNwbGF5cyB0ZXh0LCBpY29uLCBidXR0b25zIGFuZCBvdGhlciBjb250ZW50IGNhbiBiZSBncm91cGVkIG5leHQgdG8gYW4gaW5wdXQuXG4gKiBAZ3JvdXAgQ29tcG9uZW50c1xuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtaW5wdXRHcm91cEFkZG9uJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IFthdHRyLmRhdGEtcGMtbmFtZV09XCInaW5wdXRncm91cGFkZG9uJ1wiPlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdwLWVsZW1lbnQgcC1pbnB1dGdyb3VwLWFkZG9uJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgSW5wdXRHcm91cEFkZG9uIHt9XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gICAgZXhwb3J0czogW0lucHV0R3JvdXBBZGRvbiwgU2hhcmVkTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtJbnB1dEdyb3VwQWRkb25dXG59KVxuZXhwb3J0IGNsYXNzIElucHV0R3JvdXBBZGRvbk1vZHVsZSB7fVxuIl19