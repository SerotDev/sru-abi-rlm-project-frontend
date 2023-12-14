import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { Component, NgModule } from '@angular/core';
import { SharedModule } from 'primeng/api';

/**
 * InputGroupAddon displays text, icon, buttons and other content can be grouped next to an input.
 * @group Components
 */
class InputGroupAddon {
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
class InputGroupAddonModule {
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

/**
 * Generated bundle index. Do not edit.
 */

export { InputGroupAddon, InputGroupAddonModule };
//# sourceMappingURL=primeng-inputgroupaddon.mjs.map
