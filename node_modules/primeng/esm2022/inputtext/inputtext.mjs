import { NgModule, Directive, HostListener, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
export class InputText {
    el;
    ngModel;
    cd;
    filled;
    constructor(el, ngModel, cd) {
        this.el = el;
        this.ngModel = ngModel;
        this.cd = cd;
    }
    ngAfterViewInit() {
        this.updateFilledState();
        this.cd.detectChanges();
    }
    ngDoCheck() {
        this.updateFilledState();
    }
    onInput() {
        this.updateFilledState();
    }
    updateFilledState() {
        this.filled = (this.el.nativeElement.value && this.el.nativeElement.value.length) || (this.ngModel && this.ngModel.model);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: InputText, deps: [{ token: i0.ElementRef }, { token: i1.NgModel, optional: true }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.0.5", type: InputText, selector: "[pInputText]", host: { listeners: { "input": "onInput($event)" }, properties: { "class.p-filled": "filled" }, classAttribute: "p-inputtext p-component p-element" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: InputText, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pInputText]',
                    host: {
                        class: 'p-inputtext p-component p-element',
                        '[class.p-filled]': 'filled'
                    }
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i1.NgModel, decorators: [{
                    type: Optional
                }] }, { type: i0.ChangeDetectorRef }], propDecorators: { onInput: [{
                type: HostListener,
                args: ['input', ['$event']]
            }] } });
export class InputTextModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: InputTextModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.0.5", ngImport: i0, type: InputTextModule, declarations: [InputText], imports: [CommonModule], exports: [InputText] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: InputTextModule, imports: [CommonModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: InputTextModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [InputText],
                    declarations: [InputText]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXR0ZXh0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL2lucHV0dGV4dC9pbnB1dHRleHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQWMsWUFBWSxFQUFXLFFBQVEsRUFBb0MsTUFBTSxlQUFlLENBQUM7QUFFbkksT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7QUFVL0MsTUFBTSxPQUFPLFNBQVM7SUFHQztJQUFtQztJQUEwQjtJQUZoRixNQUFNLENBQW9CO0lBRTFCLFlBQW1CLEVBQWMsRUFBcUIsT0FBZ0IsRUFBVSxFQUFxQjtRQUFsRixPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQXFCLFlBQU8sR0FBUCxPQUFPLENBQVM7UUFBVSxPQUFFLEdBQUYsRUFBRSxDQUFtQjtJQUFHLENBQUM7SUFFekcsZUFBZTtRQUNYLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELFNBQVM7UUFDTCxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBR0QsT0FBTztRQUNILElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCxpQkFBaUI7UUFDYixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5SCxDQUFDO3VHQXJCUSxTQUFTOzJGQUFULFNBQVM7OzJGQUFULFNBQVM7a0JBUHJCLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLGNBQWM7b0JBQ3hCLElBQUksRUFBRTt3QkFDRixLQUFLLEVBQUUsbUNBQW1DO3dCQUMxQyxrQkFBa0IsRUFBRSxRQUFRO3FCQUMvQjtpQkFDSjs7MEJBSXVDLFFBQVE7eUVBWTVDLE9BQU87c0JBRE4sWUFBWTt1QkFBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7O0FBZXJDLE1BQU0sT0FBTyxlQUFlO3VHQUFmLGVBQWU7d0dBQWYsZUFBZSxpQkE3QmYsU0FBUyxhQXlCUixZQUFZLGFBekJiLFNBQVM7d0dBNkJULGVBQWUsWUFKZCxZQUFZOzsyRkFJYixlQUFlO2tCQUwzQixRQUFRO21CQUFDO29CQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztvQkFDdkIsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDO29CQUNwQixZQUFZLEVBQUUsQ0FBQyxTQUFTLENBQUM7aUJBQzVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBEb0NoZWNrLCBPcHRpb25hbCwgQ2hhbmdlRGV0ZWN0b3JSZWYsIEFmdGVyVmlld0luaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nTW9kZWwgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTnVsbGFibGUgfSBmcm9tICdwcmltZW5nL3RzLWhlbHBlcnMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1twSW5wdXRUZXh0XScsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ3AtaW5wdXR0ZXh0IHAtY29tcG9uZW50IHAtZWxlbWVudCcsXG4gICAgICAgICdbY2xhc3MucC1maWxsZWRdJzogJ2ZpbGxlZCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIElucHV0VGV4dCBpbXBsZW1lbnRzIERvQ2hlY2ssIEFmdGVyVmlld0luaXQge1xuICAgIGZpbGxlZDogTnVsbGFibGU8Ym9vbGVhbj47XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYsIEBPcHRpb25hbCgpIHB1YmxpYyBuZ01vZGVsOiBOZ01vZGVsLCBwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgdGhpcy51cGRhdGVGaWxsZWRTdGF0ZSgpO1xuICAgICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG5cbiAgICBuZ0RvQ2hlY2soKSB7XG4gICAgICAgIHRoaXMudXBkYXRlRmlsbGVkU3RhdGUoKTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdpbnB1dCcsIFsnJGV2ZW50J10pXG4gICAgb25JbnB1dCgpIHtcbiAgICAgICAgdGhpcy51cGRhdGVGaWxsZWRTdGF0ZSgpO1xuICAgIH1cblxuICAgIHVwZGF0ZUZpbGxlZFN0YXRlKCkge1xuICAgICAgICB0aGlzLmZpbGxlZCA9ICh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQudmFsdWUgJiYgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnZhbHVlLmxlbmd0aCkgfHwgKHRoaXMubmdNb2RlbCAmJiB0aGlzLm5nTW9kZWwubW9kZWwpO1xuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbSW5wdXRUZXh0XSxcbiAgICBkZWNsYXJhdGlvbnM6IFtJbnB1dFRleHRdXG59KVxuZXhwb3J0IGNsYXNzIElucHV0VGV4dE1vZHVsZSB7fVxuIl19