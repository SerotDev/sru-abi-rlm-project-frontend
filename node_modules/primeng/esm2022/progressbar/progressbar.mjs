import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, Input, NgModule, ViewEncapsulation } from '@angular/core';
import { PrimeTemplate } from 'primeng/api';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 * ProgressBar is a process status indicator.
 * @group Components
 */
export class ProgressBar {
    /**
     * Current value of the progress.
     * @group Props
     */
    value;
    /**
     * Whether to display the progress bar value.
     * @group Props
     */
    showValue = true;
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
     * Unit sign appended to the value.
     * @group Props
     */
    unit = '%';
    /**
     * Defines the mode of the progress
     * @group Props
     */
    mode = 'determinate';
    /**
     * Color for the background of the progress.
     * @group Props
     */
    color;
    templates;
    contentTemplate;
    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'content':
                    this.contentTemplate = item.template;
                    break;
                default:
                    this.contentTemplate = item.template;
            }
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: ProgressBar, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.5", type: ProgressBar, selector: "p-progressBar", inputs: { value: "value", showValue: "showValue", styleClass: "styleClass", style: "style", unit: "unit", mode: "mode", color: "color" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], ngImport: i0, template: `
        <div
            role="progressbar"
            [class]="styleClass"
            [ngStyle]="style"
            [attr.aria-valuemin]="0"
            [attr.aria-valuenow]="value"
            [attr.aria-valuemax]="100"
            [attr.data-pc-name]="'progressbar'"
            [attr.data-pc-section]="'root'"
            [ngClass]="{ 'p-progressbar p-component': true, 'p-progressbar-determinate': mode === 'determinate', 'p-progressbar-indeterminate': mode === 'indeterminate' }"
        >
            <div *ngIf="mode === 'determinate'" class="p-progressbar-value p-progressbar-value-animate" [style.width]="value + '%'" style="display:flex" [style.background]="color" [attr.data-pc-section]="'value'">
                <div class="p-progressbar-label">
                    <div *ngIf="showValue && !contentTemplate" [style.display]="value != null && value !== 0 ? 'flex' : 'none'" [attr.data-pc-section]="'label'">{{ value }}{{ unit }}</div>
                    <ng-container *ngTemplateOutlet="contentTemplate; context: { $implicit: value }"></ng-container>
                </div>
            </div>
            <div *ngIf="mode === 'indeterminate'" class="p-progressbar-indeterminate-container" [attr.data-pc-section]="'container'">
                <div class="p-progressbar-value p-progressbar-value-animate" [style.background]="color" [attr.data-pc-section]="'value'"></div>
            </div>
        </div>
    `, isInline: true, styles: ["@layer primeng{.p-progressbar{position:relative;overflow:hidden}.p-progressbar-determinate .p-progressbar-value{height:100%;width:0%;position:absolute;display:none;border:0 none;display:flex;align-items:center;justify-content:center;overflow:hidden}.p-progressbar-determinate .p-progressbar-label{display:inline-flex}.p-progressbar-determinate .p-progressbar-value-animate{transition:width 1s ease-in-out}.p-progressbar-indeterminate .p-progressbar-value:before{content:\"\";position:absolute;background-color:inherit;top:0;left:0;bottom:0;will-change:left,right;animation:p-progressbar-indeterminate-anim 2.1s cubic-bezier(.65,.815,.735,.395) infinite}.p-progressbar-indeterminate .p-progressbar-value:after{content:\"\";position:absolute;background-color:inherit;top:0;left:0;bottom:0;will-change:left,right;animation:p-progressbar-indeterminate-anim-short 2.1s cubic-bezier(.165,.84,.44,1) infinite;animation-delay:1.15s}}@keyframes p-progressbar-indeterminate-anim{0%{left:-35%;right:100%}60%{left:100%;right:-90%}to{left:100%;right:-90%}}@keyframes p-progressbar-indeterminate-anim-short{0%{left:-200%;right:100%}60%{left:107%;right:-8%}to{left:107%;right:-8%}}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: ProgressBar, decorators: [{
            type: Component,
            args: [{ selector: 'p-progressBar', template: `
        <div
            role="progressbar"
            [class]="styleClass"
            [ngStyle]="style"
            [attr.aria-valuemin]="0"
            [attr.aria-valuenow]="value"
            [attr.aria-valuemax]="100"
            [attr.data-pc-name]="'progressbar'"
            [attr.data-pc-section]="'root'"
            [ngClass]="{ 'p-progressbar p-component': true, 'p-progressbar-determinate': mode === 'determinate', 'p-progressbar-indeterminate': mode === 'indeterminate' }"
        >
            <div *ngIf="mode === 'determinate'" class="p-progressbar-value p-progressbar-value-animate" [style.width]="value + '%'" style="display:flex" [style.background]="color" [attr.data-pc-section]="'value'">
                <div class="p-progressbar-label">
                    <div *ngIf="showValue && !contentTemplate" [style.display]="value != null && value !== 0 ? 'flex' : 'none'" [attr.data-pc-section]="'label'">{{ value }}{{ unit }}</div>
                    <ng-container *ngTemplateOutlet="contentTemplate; context: { $implicit: value }"></ng-container>
                </div>
            </div>
            <div *ngIf="mode === 'indeterminate'" class="p-progressbar-indeterminate-container" [attr.data-pc-section]="'container'">
                <div class="p-progressbar-value p-progressbar-value-animate" [style.background]="color" [attr.data-pc-section]="'value'"></div>
            </div>
        </div>
    `, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: ["@layer primeng{.p-progressbar{position:relative;overflow:hidden}.p-progressbar-determinate .p-progressbar-value{height:100%;width:0%;position:absolute;display:none;border:0 none;display:flex;align-items:center;justify-content:center;overflow:hidden}.p-progressbar-determinate .p-progressbar-label{display:inline-flex}.p-progressbar-determinate .p-progressbar-value-animate{transition:width 1s ease-in-out}.p-progressbar-indeterminate .p-progressbar-value:before{content:\"\";position:absolute;background-color:inherit;top:0;left:0;bottom:0;will-change:left,right;animation:p-progressbar-indeterminate-anim 2.1s cubic-bezier(.65,.815,.735,.395) infinite}.p-progressbar-indeterminate .p-progressbar-value:after{content:\"\";position:absolute;background-color:inherit;top:0;left:0;bottom:0;will-change:left,right;animation:p-progressbar-indeterminate-anim-short 2.1s cubic-bezier(.165,.84,.44,1) infinite;animation-delay:1.15s}}@keyframes p-progressbar-indeterminate-anim{0%{left:-35%;right:100%}60%{left:100%;right:-90%}to{left:100%;right:-90%}}@keyframes p-progressbar-indeterminate-anim-short{0%{left:-200%;right:100%}60%{left:107%;right:-8%}to{left:107%;right:-8%}}\n"] }]
        }], propDecorators: { value: [{
                type: Input
            }], showValue: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], style: [{
                type: Input
            }], unit: [{
                type: Input
            }], mode: [{
                type: Input
            }], color: [{
                type: Input
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
export class ProgressBarModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: ProgressBarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.0.5", ngImport: i0, type: ProgressBarModule, declarations: [ProgressBar], imports: [CommonModule], exports: [ProgressBar] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: ProgressBarModule, imports: [CommonModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: ProgressBarModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [ProgressBar],
                    declarations: [ProgressBar]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3NiYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvcHJvZ3Jlc3NiYXIvcHJvZ3Jlc3NiYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQWUsZUFBZSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckksT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGFBQWEsQ0FBQzs7O0FBRTVDOzs7R0FHRztBQWlDSCxNQUFNLE9BQU8sV0FBVztJQUNwQjs7O09BR0c7SUFDTSxLQUFLLENBQXFCO0lBQ25DOzs7T0FHRztJQUNNLFNBQVMsR0FBWSxJQUFJLENBQUM7SUFDbkM7OztPQUdHO0lBQ00sVUFBVSxDQUFxQjtJQUN4Qzs7O09BR0c7SUFDTSxLQUFLLENBQThDO0lBQzVEOzs7T0FHRztJQUNNLElBQUksR0FBVyxHQUFHLENBQUM7SUFDNUI7OztPQUdHO0lBQ00sSUFBSSxHQUFXLGFBQWEsQ0FBQztJQUN0Qzs7O09BR0c7SUFDTSxLQUFLLENBQXFCO0lBRUgsU0FBUyxDQUF1QztJQUVoRixlQUFlLENBQStCO0lBRTlDLGtCQUFrQjtRQUNkLElBQUksQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDN0IsUUFBUSxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUU7Z0JBQ3BCLEtBQUssU0FBUztvQkFDVixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7b0JBQ3JDLE1BQU07Z0JBQ1Y7b0JBQ0ksSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO2FBQzVDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO3VHQW5EUSxXQUFXOzJGQUFYLFdBQVcsZ1FBcUNILGFBQWEsNkJBbkVwQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQXNCVDs7MkZBUVEsV0FBVztrQkFoQ3ZCLFNBQVM7K0JBQ0ksZUFBZSxZQUNmOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBc0JULG1CQUNnQix1QkFBdUIsQ0FBQyxNQUFNLGlCQUNoQyxpQkFBaUIsQ0FBQyxJQUFJLFFBRS9CO3dCQUNGLEtBQUssRUFBRSxXQUFXO3FCQUNyQjs4QkFPUSxLQUFLO3NCQUFiLEtBQUs7Z0JBS0csU0FBUztzQkFBakIsS0FBSztnQkFLRyxVQUFVO3NCQUFsQixLQUFLO2dCQUtHLEtBQUs7c0JBQWIsS0FBSztnQkFLRyxJQUFJO3NCQUFaLEtBQUs7Z0JBS0csSUFBSTtzQkFBWixLQUFLO2dCQUtHLEtBQUs7c0JBQWIsS0FBSztnQkFFMEIsU0FBUztzQkFBeEMsZUFBZTt1QkFBQyxhQUFhOztBQXNCbEMsTUFBTSxPQUFPLGlCQUFpQjt1R0FBakIsaUJBQWlCO3dHQUFqQixpQkFBaUIsaUJBM0RqQixXQUFXLGFBdURWLFlBQVksYUF2RGIsV0FBVzt3R0EyRFgsaUJBQWlCLFlBSmhCLFlBQVk7OzJGQUliLGlCQUFpQjtrQkFMN0IsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0JBQ3ZCLE9BQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQztvQkFDdEIsWUFBWSxFQUFFLENBQUMsV0FBVyxDQUFDO2lCQUM5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBUZW1wbGF0ZVJlZiwgQ29udGVudENoaWxkcmVuLCBJbnB1dCwgTmdNb2R1bGUsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQcmltZVRlbXBsYXRlIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgUXVlcnlMaXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4vKipcbiAqIFByb2dyZXNzQmFyIGlzIGEgcHJvY2VzcyBzdGF0dXMgaW5kaWNhdG9yLlxuICogQGdyb3VwIENvbXBvbmVudHNcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLXByb2dyZXNzQmFyJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgICByb2xlPVwicHJvZ3Jlc3NiYXJcIlxuICAgICAgICAgICAgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIlxuICAgICAgICAgICAgW25nU3R5bGVdPVwic3R5bGVcIlxuICAgICAgICAgICAgW2F0dHIuYXJpYS12YWx1ZW1pbl09XCIwXCJcbiAgICAgICAgICAgIFthdHRyLmFyaWEtdmFsdWVub3ddPVwidmFsdWVcIlxuICAgICAgICAgICAgW2F0dHIuYXJpYS12YWx1ZW1heF09XCIxMDBcIlxuICAgICAgICAgICAgW2F0dHIuZGF0YS1wYy1uYW1lXT1cIidwcm9ncmVzc2JhcidcIlxuICAgICAgICAgICAgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidyb290J1wiXG4gICAgICAgICAgICBbbmdDbGFzc109XCJ7ICdwLXByb2dyZXNzYmFyIHAtY29tcG9uZW50JzogdHJ1ZSwgJ3AtcHJvZ3Jlc3NiYXItZGV0ZXJtaW5hdGUnOiBtb2RlID09PSAnZGV0ZXJtaW5hdGUnLCAncC1wcm9ncmVzc2Jhci1pbmRldGVybWluYXRlJzogbW9kZSA9PT0gJ2luZGV0ZXJtaW5hdGUnIH1cIlxuICAgICAgICA+XG4gICAgICAgICAgICA8ZGl2ICpuZ0lmPVwibW9kZSA9PT0gJ2RldGVybWluYXRlJ1wiIGNsYXNzPVwicC1wcm9ncmVzc2Jhci12YWx1ZSBwLXByb2dyZXNzYmFyLXZhbHVlLWFuaW1hdGVcIiBbc3R5bGUud2lkdGhdPVwidmFsdWUgKyAnJSdcIiBzdHlsZT1cImRpc3BsYXk6ZmxleFwiIFtzdHlsZS5iYWNrZ3JvdW5kXT1cImNvbG9yXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIid2YWx1ZSdcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1wcm9ncmVzc2Jhci1sYWJlbFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwic2hvd1ZhbHVlICYmICFjb250ZW50VGVtcGxhdGVcIiBbc3R5bGUuZGlzcGxheV09XCJ2YWx1ZSAhPSBudWxsICYmIHZhbHVlICE9PSAwID8gJ2ZsZXgnIDogJ25vbmUnXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidsYWJlbCdcIj57eyB2YWx1ZSB9fXt7IHVuaXQgfX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImNvbnRlbnRUZW1wbGF0ZTsgY29udGV4dDogeyAkaW1wbGljaXQ6IHZhbHVlIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiAqbmdJZj1cIm1vZGUgPT09ICdpbmRldGVybWluYXRlJ1wiIGNsYXNzPVwicC1wcm9ncmVzc2Jhci1pbmRldGVybWluYXRlLWNvbnRhaW5lclwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInY29udGFpbmVyJ1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLXByb2dyZXNzYmFyLXZhbHVlIHAtcHJvZ3Jlc3NiYXItdmFsdWUtYW5pbWF0ZVwiIFtzdHlsZS5iYWNrZ3JvdW5kXT1cImNvbG9yXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIid2YWx1ZSdcIj48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgc3R5bGVVcmxzOiBbJy4vcHJvZ3Jlc3NiYXIuY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ3AtZWxlbWVudCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIFByb2dyZXNzQmFyIHtcbiAgICAvKipcbiAgICAgKiBDdXJyZW50IHZhbHVlIG9mIHRoZSBwcm9ncmVzcy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB2YWx1ZTogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gZGlzcGxheSB0aGUgcHJvZ3Jlc3MgYmFyIHZhbHVlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHNob3dWYWx1ZTogYm9vbGVhbiA9IHRydWU7XG4gICAgLyoqXG4gICAgICogQ2xhc3Mgb2YgdGhlIGVsZW1lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIElubGluZSBzdHlsZSBvZiB0aGUgZWxlbWVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzdHlsZTogeyBba2xhc3M6IHN0cmluZ106IGFueSB9IHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBVbml0IHNpZ24gYXBwZW5kZWQgdG8gdGhlIHZhbHVlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHVuaXQ6IHN0cmluZyA9ICclJztcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIHRoZSBtb2RlIG9mIHRoZSBwcm9ncmVzc1xuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIG1vZGU6IHN0cmluZyA9ICdkZXRlcm1pbmF0ZSc7XG4gICAgLyoqXG4gICAgICogQ29sb3IgZm9yIHRoZSBiYWNrZ3JvdW5kIG9mIHRoZSBwcm9ncmVzcy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBjb2xvcjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihQcmltZVRlbXBsYXRlKSB0ZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxQcmltZVRlbXBsYXRlPiB8IHVuZGVmaW5lZDtcblxuICAgIGNvbnRlbnRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZXM/LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoaXRlbS5nZXRUeXBlKCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdjb250ZW50JzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbUHJvZ3Jlc3NCYXJdLFxuICAgIGRlY2xhcmF0aW9uczogW1Byb2dyZXNzQmFyXVxufSlcbmV4cG9ydCBjbGFzcyBQcm9ncmVzc0Jhck1vZHVsZSB7fVxuIl19