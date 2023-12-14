import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { SharedModule } from 'primeng/api';
import * as i0 from "@angular/core";
/**
 * InputGroup displays text, icon, buttons and other content can be grouped next to an input.
 * @group Components
 */
export class InputGroup {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: InputGroup, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.5", type: InputGroup, selector: "p-inputGroup", host: { classAttribute: "p-element p-inputgroup" }, ngImport: i0, template: `
        <div class="p-inputgroup" [attr.data-pc-name]="'inputgroup'">
            <ng-content></ng-content>
        </div>
    `, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: InputGroup, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-inputGroup',
                    template: `
        <div class="p-inputgroup" [attr.data-pc-name]="'inputgroup'">
            <ng-content></ng-content>
        </div>
    `,
                    host: {
                        class: 'p-element p-inputgroup'
                    }
                }]
        }] });
export class InputGroupModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: InputGroupModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.0.5", ngImport: i0, type: InputGroupModule, declarations: [InputGroup], imports: [CommonModule], exports: [InputGroup, SharedModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: InputGroupModule, imports: [CommonModule, SharedModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: InputGroupModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [InputGroup, SharedModule],
                    declarations: [InputGroup]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXRncm91cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvY29tcG9uZW50cy9pbnB1dGdyb3VwL2lucHV0Z3JvdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3BELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxhQUFhLENBQUM7O0FBQzNDOzs7R0FHRztBQVlILE1BQU0sT0FBTyxVQUFVO3VHQUFWLFVBQVU7MkZBQVYsVUFBVSx3R0FUVDs7OztLQUlUOzsyRkFLUSxVQUFVO2tCQVh0QixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxjQUFjO29CQUN4QixRQUFRLEVBQUU7Ozs7S0FJVDtvQkFDRCxJQUFJLEVBQUU7d0JBQ0YsS0FBSyxFQUFFLHdCQUF3QjtxQkFDbEM7aUJBQ0o7O0FBUUQsTUFBTSxPQUFPLGdCQUFnQjt1R0FBaEIsZ0JBQWdCO3dHQUFoQixnQkFBZ0IsaUJBUGhCLFVBQVUsYUFHVCxZQUFZLGFBSGIsVUFBVSxFQUlHLFlBQVk7d0dBR3pCLGdCQUFnQixZQUpmLFlBQVksRUFDQSxZQUFZOzsyRkFHekIsZ0JBQWdCO2tCQUw1QixRQUFRO21CQUFDO29CQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztvQkFDdkIsT0FBTyxFQUFFLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQztvQkFDbkMsWUFBWSxFQUFFLENBQUMsVUFBVSxDQUFDO2lCQUM3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBDb21wb25lbnQsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUgfSBmcm9tICdwcmltZW5nL2FwaSc7XG4vKipcbiAqIElucHV0R3JvdXAgZGlzcGxheXMgdGV4dCwgaWNvbiwgYnV0dG9ucyBhbmQgb3RoZXIgY29udGVudCBjYW4gYmUgZ3JvdXBlZCBuZXh0IHRvIGFuIGlucHV0LlxuICogQGdyb3VwIENvbXBvbmVudHNcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLWlucHV0R3JvdXAnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwLWlucHV0Z3JvdXBcIiBbYXR0ci5kYXRhLXBjLW5hbWVdPVwiJ2lucHV0Z3JvdXAnXCI+XG4gICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ3AtZWxlbWVudCBwLWlucHV0Z3JvdXAnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBJbnB1dEdyb3VwIHt9XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gICAgZXhwb3J0czogW0lucHV0R3JvdXAsIFNoYXJlZE1vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbSW5wdXRHcm91cF1cbn0pXG5leHBvcnQgY2xhc3MgSW5wdXRHcm91cE1vZHVsZSB7fVxuIl19