import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { Component, NgModule } from '@angular/core';
import { SharedModule } from 'primeng/api';

/**
 * InputGroup displays text, icon, buttons and other content can be grouped next to an input.
 * @group Components
 */
class InputGroup {
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
class InputGroupModule {
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

/**
 * Generated bundle index. Do not edit.
 */

export { InputGroup, InputGroupModule };
//# sourceMappingURL=primeng-inputgroup.mjs.map
