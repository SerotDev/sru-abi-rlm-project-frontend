import { NgModule, Component, Input, Output, EventEmitter, ContentChild, forwardRef, ChangeDetectionStrategy, ViewEncapsulation, ContentChildren, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { SharedModule, Header, PrimeTemplate } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
//@ts-ignore
import Quill from 'quill';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export const EDITOR_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Editor),
    multi: true
};
/**
 * Editor groups a collection of contents in tabs.
 * @group Components
 */
export class Editor {
    platformId;
    el;
    /**
     * Inline style of the container.
     * @group Props
     */
    style;
    /**
     * Style class of the container.
     * @group Props
     */
    styleClass;
    /**
     * Placeholder text to show when editor is empty.
     * @group Props
     */
    placeholder;
    /**
     * Whitelist of formats to display, see here for available options.
     * @group Props
     */
    formats;
    /**
     * Modules configuration of Editor, see here for available options.
     * @group Props
     */
    modules;
    /**
     * DOM Element or a CSS selector for a DOM Element, within which the editor’s p elements (i.e. tooltips, etc.) should be confined. Currently, it only considers left and right boundaries.
     * @group Props
     */
    bounds;
    /**
     * DOM Element or a CSS selector for a DOM Element, specifying which container has the scrollbars (i.e. overflow-y: auto), if is has been changed from the default ql-editor with custom CSS. Necessary to fix scroll jumping bugs when Quill is set to auto grow its height, and another ancestor container is responsible from the scrolling..
     * @group Props
     */
    scrollingContainer;
    /**
     * Shortcut for debug. Note debug is a static method and will affect other instances of Quill editors on the page. Only warning and error messages are enabled by default.
     * @group Props
     */
    debug;
    /**
     * Whether to instantiate the editor to read-only mode.
     * @group Props
     */
    get readonly() {
        return this._readonly;
    }
    set readonly(val) {
        this._readonly = val;
        // if (this.quill) {
        //     if (this._readonly) this.quill.disable();
        //     else this.quill.enable();
        // }
    }
    /**
     * Callback to invoke when the quill modules are loaded.
     * @param {EditorInitEvent} event - custom event.
     * @group Emits
     */
    onInit = new EventEmitter();
    /**
     * Callback to invoke when text of editor changes.
     * @param {EditorTextChangeEvent} event - custom event.
     * @group Emits
     */
    onTextChange = new EventEmitter();
    /**
     * Callback to invoke when selection of the text changes.
     * @param {EditorSelectionChangeEvent} event - custom event.
     * @group Emits
     */
    onSelectionChange = new EventEmitter();
    templates;
    toolbar;
    value;
    delayedCommand = null;
    _readonly = false;
    onModelChange = () => { };
    onModelTouched = () => { };
    quill;
    headerTemplate;
    get isAttachedQuillEditorToDOM() {
        return this.quillElements?.editorElement?.isConnected;
    }
    quillElements;
    constructor(platformId, el) {
        this.platformId = platformId;
        this.el = el;
    }
    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.initQuillElements();
            if (this.isAttachedQuillEditorToDOM) {
                this.initQuillEditor();
            }
        }
    }
    ngAfterViewChecked() {
        if (isPlatformBrowser(this.platformId)) {
            // The problem is inside the `quill` library, we need to wait for a new release.
            // Function `isLine` - used `getComputedStyle`, it was rewritten in the next release.
            // (We need to wait for a release higher than 1.3.7).
            // These checks and code can be removed.
            if (!this.quill && this.isAttachedQuillEditorToDOM) {
                this.initQuillEditor();
            }
            // Can also be deleted after updating `quill`.
            if (this.delayedCommand && this.isAttachedQuillEditorToDOM) {
                this.delayedCommand();
                this.delayedCommand = null;
            }
        }
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'header':
                    this.headerTemplate = item.template;
                    break;
            }
        });
    }
    writeValue(value) {
        this.value = value;
        if (this.quill) {
            if (value) {
                const command = () => {
                    this.quill.setContents(this.quill.clipboard.convert(this.value));
                };
                if (this.isAttachedQuillEditorToDOM) {
                    command();
                }
                else {
                    this.delayedCommand = command;
                }
            }
            else {
                const command = () => {
                    this.quill.setText('');
                };
                if (this.isAttachedQuillEditorToDOM) {
                    command();
                }
                else {
                    this.delayedCommand = command;
                }
            }
        }
    }
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
    getQuill() {
        return this.quill;
    }
    initQuillEditor() {
        this.initQuillElements();
        const { toolbarElement, editorElement } = this.quillElements;
        let defaultModule = { toolbar: toolbarElement };
        let modules = this.modules ? { ...defaultModule, ...this.modules } : defaultModule;
        this.quill = new Quill(editorElement, {
            modules: modules,
            placeholder: this.placeholder,
            readOnly: this.readonly,
            theme: 'snow',
            formats: this.formats,
            bounds: this.bounds,
            debug: this.debug,
            scrollingContainer: this.scrollingContainer
        });
        if (this.value) {
            this.quill.setContents(this.quill.clipboard.convert(this.value));
        }
        this.quill.on('text-change', (delta, oldContents, source) => {
            if (source === 'user') {
                let html = DomHandler.findSingle(editorElement, '.ql-editor').innerHTML;
                let text = this.quill.getText().trim();
                if (html === '<p><br></p>') {
                    html = null;
                }
                this.onTextChange.emit({
                    htmlValue: html,
                    textValue: text,
                    delta: delta,
                    source: source
                });
                this.onModelChange(html);
                this.onModelTouched();
            }
        });
        this.quill.on('selection-change', (range, oldRange, source) => {
            this.onSelectionChange.emit({
                range: range,
                oldRange: oldRange,
                source: source
            });
        });
        this.onInit.emit({
            editor: this.quill
        });
    }
    initQuillElements() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.quillElements) {
                this.quillElements = {
                    editorElement: DomHandler.findSingle(this.el.nativeElement, 'div.p-editor-content'),
                    toolbarElement: DomHandler.findSingle(this.el.nativeElement, 'div.p-editor-toolbar')
                };
            }
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: Editor, deps: [{ token: PLATFORM_ID }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.5", type: Editor, selector: "p-editor", inputs: { style: "style", styleClass: "styleClass", placeholder: "placeholder", formats: "formats", modules: "modules", bounds: "bounds", scrollingContainer: "scrollingContainer", debug: "debug", readonly: "readonly" }, outputs: { onInit: "onInit", onTextChange: "onTextChange", onSelectionChange: "onSelectionChange" }, host: { classAttribute: "p-element" }, providers: [EDITOR_VALUE_ACCESSOR], queries: [{ propertyName: "toolbar", first: true, predicate: Header, descendants: true }, { propertyName: "templates", predicate: PrimeTemplate }], ngImport: i0, template: `
        <div [ngClass]="'p-editor-container'" [class]="styleClass">
            <div class="p-editor-toolbar" *ngIf="toolbar || headerTemplate">
                <ng-content select="p-header"></ng-content>
                <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
            </div>
            <div class="p-editor-toolbar" *ngIf="!toolbar && !headerTemplate">
                <span class="ql-formats">
                    <select class="ql-header">
                        <option value="1">Heading</option>
                        <option value="2">Subheading</option>
                        <option selected>Normal</option>
                    </select>
                    <select class="ql-font">
                        <option selected>Sans Serif</option>
                        <option value="serif">Serif</option>
                        <option value="monospace">Monospace</option>
                    </select>
                </span>
                <span class="ql-formats">
                    <button class="ql-bold" aria-label="Bold" type="button"></button>
                    <button class="ql-italic" aria-label="Italic" type="button"></button>
                    <button class="ql-underline" aria-label="Underline" type="button"></button>
                </span>
                <span class="ql-formats">
                    <select class="ql-color"></select>
                    <select class="ql-background"></select>
                </span>
                <span class="ql-formats">
                    <button class="ql-list" value="ordered" aria-label="Ordered List" type="button"></button>
                    <button class="ql-list" value="bullet" aria-label="Unordered List" type="button"></button>
                    <select class="ql-align">
                        <option selected></option>
                        <option value="center">center</option>
                        <option value="right">right</option>
                        <option value="justify">justify</option>
                    </select>
                </span>
                <span class="ql-formats">
                    <button class="ql-link" aria-label="Insert Link" type="button"></button>
                    <button class="ql-image" aria-label="Insert Image" type="button"></button>
                    <button class="ql-code-block" aria-label="Insert Code Block" type="button"></button>
                </span>
                <span class="ql-formats">
                    <button class="ql-clean" aria-label="Remove Styles" type="button"></button>
                </span>
            </div>
            <div class="p-editor-content" [ngStyle]="style"></div>
        </div>
    `, isInline: true, styles: [".p-editor-container .p-editor-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-options .ql-picker-item{width:auto;height:auto}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: Editor, decorators: [{
            type: Component,
            args: [{ selector: 'p-editor', template: `
        <div [ngClass]="'p-editor-container'" [class]="styleClass">
            <div class="p-editor-toolbar" *ngIf="toolbar || headerTemplate">
                <ng-content select="p-header"></ng-content>
                <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
            </div>
            <div class="p-editor-toolbar" *ngIf="!toolbar && !headerTemplate">
                <span class="ql-formats">
                    <select class="ql-header">
                        <option value="1">Heading</option>
                        <option value="2">Subheading</option>
                        <option selected>Normal</option>
                    </select>
                    <select class="ql-font">
                        <option selected>Sans Serif</option>
                        <option value="serif">Serif</option>
                        <option value="monospace">Monospace</option>
                    </select>
                </span>
                <span class="ql-formats">
                    <button class="ql-bold" aria-label="Bold" type="button"></button>
                    <button class="ql-italic" aria-label="Italic" type="button"></button>
                    <button class="ql-underline" aria-label="Underline" type="button"></button>
                </span>
                <span class="ql-formats">
                    <select class="ql-color"></select>
                    <select class="ql-background"></select>
                </span>
                <span class="ql-formats">
                    <button class="ql-list" value="ordered" aria-label="Ordered List" type="button"></button>
                    <button class="ql-list" value="bullet" aria-label="Unordered List" type="button"></button>
                    <select class="ql-align">
                        <option selected></option>
                        <option value="center">center</option>
                        <option value="right">right</option>
                        <option value="justify">justify</option>
                    </select>
                </span>
                <span class="ql-formats">
                    <button class="ql-link" aria-label="Insert Link" type="button"></button>
                    <button class="ql-image" aria-label="Insert Image" type="button"></button>
                    <button class="ql-code-block" aria-label="Insert Code Block" type="button"></button>
                </span>
                <span class="ql-formats">
                    <button class="ql-clean" aria-label="Remove Styles" type="button"></button>
                </span>
            </div>
            <div class="p-editor-content" [ngStyle]="style"></div>
        </div>
    `, providers: [EDITOR_VALUE_ACCESSOR], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: [".p-editor-container .p-editor-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-options .ql-picker-item{width:auto;height:auto}\n"] }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i0.ElementRef }], propDecorators: { style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], formats: [{
                type: Input
            }], modules: [{
                type: Input
            }], bounds: [{
                type: Input
            }], scrollingContainer: [{
                type: Input
            }], debug: [{
                type: Input
            }], readonly: [{
                type: Input
            }], onInit: [{
                type: Output
            }], onTextChange: [{
                type: Output
            }], onSelectionChange: [{
                type: Output
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }], toolbar: [{
                type: ContentChild,
                args: [Header]
            }] } });
export class EditorModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: EditorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.0.5", ngImport: i0, type: EditorModule, declarations: [Editor], imports: [CommonModule], exports: [Editor, SharedModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: EditorModule, imports: [CommonModule, SharedModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: EditorModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [Editor, SharedModule],
                    declarations: [Editor]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL2VkaXRvci9lZGl0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNILFFBQVEsRUFDUixTQUFTLEVBR1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osWUFBWSxFQUNaLFVBQVUsRUFDVix1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLGVBQWUsRUFLZixNQUFNLEVBQ04sV0FBVyxFQUNkLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDbEUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN6QyxPQUFPLEVBQUUsaUJBQWlCLEVBQXdCLE1BQU0sZ0JBQWdCLENBQUM7QUFHekUsWUFBWTtBQUNaLE9BQU8sS0FBSyxNQUFNLE9BQU8sQ0FBQzs7O0FBRTFCLE1BQU0sQ0FBQyxNQUFNLHFCQUFxQixHQUFRO0lBQ3RDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUM7SUFDckMsS0FBSyxFQUFFLElBQUk7Q0FDZCxDQUFDO0FBQ0Y7OztHQUdHO0FBNkRILE1BQU0sT0FBTyxNQUFNO0lBbUd5QjtJQUF3QjtJQWxHaEU7OztPQUdHO0lBQ00sS0FBSyxDQUE4QztJQUM1RDs7O09BR0c7SUFDTSxVQUFVLENBQXFCO0lBQ3hDOzs7T0FHRztJQUNNLFdBQVcsQ0FBcUI7SUFDekM7OztPQUdHO0lBQ00sT0FBTyxDQUF1QjtJQUN2Qzs7O09BR0c7SUFDTSxPQUFPLENBQXFCO0lBQ3JDOzs7T0FHRztJQUNNLE1BQU0sQ0FBbUM7SUFDbEQ7OztP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S0FpRFQsYUFDVSxDQUFDLHFCQUFxQixDQUFDLG1CQUNqQix1QkFBdUIsQ0FBQyxNQUFNLGlCQUVoQyxpQkFBaUIsQ0FBQyxJQUFJLFFBQy9CO3dCQUNGLEtBQUssRUFBRSxXQUFXO3FCQUNyQjs7MEJBcUdZLE1BQU07MkJBQUMsV0FBVztrRUE5RnRCLEtBQUs7c0JBQWIsS0FBSztnQkFLRyxVQUFVO3NCQUFsQixLQUFLO2dCQUtHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBS0csT0FBTztzQkFBZixLQUFLO2dCQUtHLE9BQU87c0JBQWYsS0FBSztnQkFLRyxNQUFNO3NCQUFkLEtBQUs7Z0JBS0csa0JBQWtCO3NCQUExQixLQUFLO2dCQUtHLEtBQUs7c0JBQWIsS0FBSztnQkFLTyxRQUFRO3NCQUFwQixLQUFLO2dCQWdCSSxNQUFNO3NCQUFmLE1BQU07Z0JBTUcsWUFBWTtzQkFBckIsTUFBTTtnQkFNRyxpQkFBaUI7c0JBQTFCLE1BQU07Z0JBRXlCLFNBQVM7c0JBQXhDLGVBQWU7dUJBQUMsYUFBYTtnQkFFUixPQUFPO3NCQUE1QixZQUFZO3VCQUFDLE1BQU07O0FBNEt4QixNQUFNLE9BQU8sWUFBWTt1R0FBWixZQUFZO3dHQUFaLFlBQVksaUJBelBaLE1BQU0sYUFxUEwsWUFBWSxhQXJQYixNQUFNLEVBc1BHLFlBQVk7d0dBR3JCLFlBQVksWUFKWCxZQUFZLEVBQ0osWUFBWTs7MkZBR3JCLFlBQVk7a0JBTHhCLFFBQVE7bUJBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsWUFBWSxDQUFDO29CQUMvQixZQUFZLEVBQUUsQ0FBQyxNQUFNLENBQUM7aUJBQ3pCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBOZ01vZHVsZSxcbiAgICBDb21wb25lbnQsXG4gICAgRWxlbWVudFJlZixcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIElucHV0LFxuICAgIE91dHB1dCxcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgQ29udGVudENoaWxkLFxuICAgIGZvcndhcmRSZWYsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgVmlld0VuY2Fwc3VsYXRpb24sXG4gICAgQ29udGVudENoaWxkcmVuLFxuICAgIFF1ZXJ5TGlzdCxcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIFRlbXBsYXRlUmVmLFxuICAgIEFmdGVyVmlld0NoZWNrZWQsXG4gICAgSW5qZWN0LFxuICAgIFBMQVRGT1JNX0lEXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIsIENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUsIEhlYWRlciwgUHJpbWVUZW1wbGF0ZSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IERvbUhhbmRsZXIgfSBmcm9tICdwcmltZW5nL2RvbSc7XG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBFZGl0b3JJbml0RXZlbnQsIEVkaXRvclRleHRDaGFuZ2VFdmVudCwgRWRpdG9yU2VsZWN0aW9uQ2hhbmdlRXZlbnQgfSBmcm9tICcuL2VkaXRvci5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgTnVsbGFibGUgfSBmcm9tICdwcmltZW5nL3RzLWhlbHBlcnMnO1xuLy9AdHMtaWdub3JlXG5pbXBvcnQgUXVpbGwgZnJvbSAncXVpbGwnO1xuXG5leHBvcnQgY29uc3QgRURJVE9SX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRWRpdG9yKSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcbi8qKlxuICogRWRpdG9yIGdyb3VwcyBhIGNvbGxlY3Rpb24gb2YgY29udGVudHMgaW4gdGFicy5cbiAqIEBncm91cCBDb21wb25lbnRzXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1lZGl0b3InLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgW25nQ2xhc3NdPVwiJ3AtZWRpdG9yLWNvbnRhaW5lcidcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtZWRpdG9yLXRvb2xiYXJcIiAqbmdJZj1cInRvb2xiYXIgfHwgaGVhZGVyVGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJwLWhlYWRlclwiPjwvbmctY29udGVudD5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiaGVhZGVyVGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtZWRpdG9yLXRvb2xiYXJcIiAqbmdJZj1cIiF0b29sYmFyICYmICFoZWFkZXJUZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicWwtZm9ybWF0c1wiPlxuICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IGNsYXNzPVwicWwtaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiMVwiPkhlYWRpbmc8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCIyXCI+U3ViaGVhZGluZzwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiBzZWxlY3RlZD5Ob3JtYWw8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgY2xhc3M9XCJxbC1mb250XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHNlbGVjdGVkPlNhbnMgU2VyaWY8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJzZXJpZlwiPlNlcmlmPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwibW9ub3NwYWNlXCI+TW9ub3NwYWNlPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInFsLWZvcm1hdHNcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInFsLWJvbGRcIiBhcmlhLWxhYmVsPVwiQm9sZFwiIHR5cGU9XCJidXR0b25cIj48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInFsLWl0YWxpY1wiIGFyaWEtbGFiZWw9XCJJdGFsaWNcIiB0eXBlPVwiYnV0dG9uXCI+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJxbC11bmRlcmxpbmVcIiBhcmlhLWxhYmVsPVwiVW5kZXJsaW5lXCIgdHlwZT1cImJ1dHRvblwiPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInFsLWZvcm1hdHNcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBjbGFzcz1cInFsLWNvbG9yXCI+PC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgY2xhc3M9XCJxbC1iYWNrZ3JvdW5kXCI+PC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicWwtZm9ybWF0c1wiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwicWwtbGlzdFwiIHZhbHVlPVwib3JkZXJlZFwiIGFyaWEtbGFiZWw9XCJPcmRlcmVkIExpc3RcIiB0eXBlPVwiYnV0dG9uXCI+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJxbC1saXN0XCIgdmFsdWU9XCJidWxsZXRcIiBhcmlhLWxhYmVsPVwiVW5vcmRlcmVkIExpc3RcIiB0eXBlPVwiYnV0dG9uXCI+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgY2xhc3M9XCJxbC1hbGlnblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiBzZWxlY3RlZD48L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJjZW50ZXJcIj5jZW50ZXI8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJyaWdodFwiPnJpZ2h0PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwianVzdGlmeVwiPmp1c3RpZnk8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicWwtZm9ybWF0c1wiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwicWwtbGlua1wiIGFyaWEtbGFiZWw9XCJJbnNlcnQgTGlua1wiIHR5cGU9XCJidXR0b25cIj48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInFsLWltYWdlXCIgYXJpYS1sYWJlbD1cIkluc2VydCBJbWFnZVwiIHR5cGU9XCJidXR0b25cIj48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInFsLWNvZGUtYmxvY2tcIiBhcmlhLWxhYmVsPVwiSW5zZXJ0IENvZGUgQmxvY2tcIiB0eXBlPVwiYnV0dG9uXCI+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicWwtZm9ybWF0c1wiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwicWwtY2xlYW5cIiBhcmlhLWxhYmVsPVwiUmVtb3ZlIFN0eWxlc1wiIHR5cGU9XCJidXR0b25cIj48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLWVkaXRvci1jb250ZW50XCIgW25nU3R5bGVdPVwic3R5bGVcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBwcm92aWRlcnM6IFtFRElUT1JfVkFMVUVfQUNDRVNTT1JdLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIHN0eWxlVXJsczogWycuL2VkaXRvci5jc3MnXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdwLWVsZW1lbnQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBFZGl0b3IgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBBZnRlclZpZXdDaGVja2VkLCBBZnRlckNvbnRlbnRJbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gICAgLyoqXG4gICAgICogSW5saW5lIHN0eWxlIG9mIHRoZSBjb250YWluZXIuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc3R5bGU6IHsgW2tsYXNzOiBzdHJpbmddOiBhbnkgfSB8IG51bGwgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogU3R5bGUgY2xhc3Mgb2YgdGhlIGNvbnRhaW5lci5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogUGxhY2Vob2xkZXIgdGV4dCB0byBzaG93IHdoZW4gZWRpdG9yIGlzIGVtcHR5LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hpdGVsaXN0IG9mIGZvcm1hdHMgdG8gZGlzcGxheSwgc2VlIGhlcmUgZm9yIGF2YWlsYWJsZSBvcHRpb25zLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGZvcm1hdHM6IHN0cmluZ1tdIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIE1vZHVsZXMgY29uZmlndXJhdGlvbiBvZiBFZGl0b3IsIHNlZSBoZXJlIGZvciBhdmFpbGFibGUgb3B0aW9ucy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBtb2R1bGVzOiBvYmplY3QgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogRE9NIEVsZW1lbnQgb3IgYSBDU1Mgc2VsZWN0b3IgZm9yIGEgRE9NIEVsZW1lbnQsIHdpdGhpbiB3aGljaCB0aGUgZWRpdG9y4oCZcyBwIGVsZW1lbnRzIChpLmUuIHRvb2x0aXBzLCBldGMuKSBzaG91bGQgYmUgY29uZmluZWQuIEN1cnJlbnRseSwgaXQgb25seSBjb25zaWRlcnMgbGVmdCBhbmQgcmlnaHQgYm91bmRhcmllcy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBib3VuZHM6IEhUTUxFbGVtZW50IHwgc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIERPTSBFbGVtZW50IG9yIGEgQ1NTIHNlbGVjdG9yIGZvciBhIERPTSBFbGVtZW50LCBzcGVjaWZ5aW5nIHdoaWNoIGNvbnRhaW5lciBoYXMgdGhlIHNjcm9sbGJhcnMgKGkuZS4gb3ZlcmZsb3cteTogYXV0byksIGlmIGlzIGhhcyBiZWVuIGNoYW5nZWQgZnJvbSB0aGUgZGVmYXVsdCBxbC1lZGl0b3Igd2l0aCBjdXN0b20gQ1NTLiBOZWNlc3NhcnkgdG8gZml4IHNjcm9sbCBqdW1waW5nIGJ1Z3Mgd2hlbiBRdWlsbCBpcyBzZXQgdG8gYXV0byBncm93IGl0cyBoZWlnaHQsIGFuZCBhbm90aGVyIGFuY2VzdG9yIGNvbnRhaW5lciBpcyByZXNwb25zaWJsZSBmcm9tIHRoZSBzY3JvbGxpbmcuLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHNjcm9sbGluZ0NvbnRhaW5lcjogSFRNTEVsZW1lbnQgfCBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogU2hvcnRjdXQgZm9yIGRlYnVnLiBOb3RlIGRlYnVnIGlzIGEgc3RhdGljIG1ldGhvZCBhbmQgd2lsbCBhZmZlY3Qgb3RoZXIgaW5zdGFuY2VzIG9mIFF1aWxsIGVkaXRvcnMgb24gdGhlIHBhZ2UuIE9ubHkgd2FybmluZyBhbmQgZXJyb3IgbWVzc2FnZXMgYXJlIGVuYWJsZWQgYnkgZGVmYXVsdC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBkZWJ1Zzogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gaW5zdGFudGlhdGUgdGhlIGVkaXRvciB0byByZWFkLW9ubHkgbW9kZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgcmVhZG9ubHkoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZWFkb25seTtcbiAgICB9XG4gICAgc2V0IHJlYWRvbmx5KHZhbDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9yZWFkb25seSA9IHZhbDtcblxuICAgICAgICAvLyBpZiAodGhpcy5xdWlsbCkge1xuICAgICAgICAvLyAgICAgaWYgKHRoaXMuX3JlYWRvbmx5KSB0aGlzLnF1aWxsLmRpc2FibGUoKTtcbiAgICAgICAgLy8gICAgIGVsc2UgdGhpcy5xdWlsbC5lbmFibGUoKTtcbiAgICAgICAgLy8gfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiB0aGUgcXVpbGwgbW9kdWxlcyBhcmUgbG9hZGVkLlxuICAgICAqIEBwYXJhbSB7RWRpdG9ySW5pdEV2ZW50fSBldmVudCAtIGN1c3RvbSBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25Jbml0OiBFdmVudEVtaXR0ZXI8RWRpdG9ySW5pdEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8RWRpdG9ySW5pdEV2ZW50PigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIHRleHQgb2YgZWRpdG9yIGNoYW5nZXMuXG4gICAgICogQHBhcmFtIHtFZGl0b3JUZXh0Q2hhbmdlRXZlbnR9IGV2ZW50IC0gY3VzdG9tIGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvblRleHRDaGFuZ2U6IEV2ZW50RW1pdHRlcjxFZGl0b3JUZXh0Q2hhbmdlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxFZGl0b3JUZXh0Q2hhbmdlRXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gc2VsZWN0aW9uIG9mIHRoZSB0ZXh0IGNoYW5nZXMuXG4gICAgICogQHBhcmFtIHtFZGl0b3JTZWxlY3Rpb25DaGFuZ2VFdmVudH0gZXZlbnQgLSBjdXN0b20gZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uU2VsZWN0aW9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8RWRpdG9yU2VsZWN0aW9uQ2hhbmdlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxFZGl0b3JTZWxlY3Rpb25DaGFuZ2VFdmVudD4oKTtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oUHJpbWVUZW1wbGF0ZSkgdGVtcGxhdGVzITogUXVlcnlMaXN0PFByaW1lVGVtcGxhdGU+O1xuXG4gICAgQENvbnRlbnRDaGlsZChIZWFkZXIpIHRvb2xiYXI6IGFueTtcblxuICAgIHZhbHVlOiBOdWxsYWJsZTxzdHJpbmc+O1xuXG4gICAgZGVsYXllZENvbW1hbmQ6IEZ1bmN0aW9uIHwgbnVsbCA9IG51bGw7XG5cbiAgICBfcmVhZG9ubHk6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIG9uTW9kZWxDaGFuZ2U6IEZ1bmN0aW9uID0gKCkgPT4ge307XG5cbiAgICBvbk1vZGVsVG91Y2hlZDogRnVuY3Rpb24gPSAoKSA9PiB7fTtcblxuICAgIHF1aWxsOiBhbnk7XG5cbiAgICBoZWFkZXJUZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBwcml2YXRlIGdldCBpc0F0dGFjaGVkUXVpbGxFZGl0b3JUb0RPTSgpOiBib29sZWFuIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucXVpbGxFbGVtZW50cz8uZWRpdG9yRWxlbWVudD8uaXNDb25uZWN0ZWQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBxdWlsbEVsZW1lbnRzITogeyBlZGl0b3JFbGVtZW50OiBIVE1MRWxlbWVudDsgdG9vbGJhckVsZW1lbnQ6IEhUTUxFbGVtZW50IH07XG5cbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KFBMQVRGT1JNX0lEKSBwdWJsaWMgcGxhdGZvcm1JZDogYW55LCBwdWJsaWMgZWw6IEVsZW1lbnRSZWYpIHt9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICAgICAgICB0aGlzLmluaXRRdWlsbEVsZW1lbnRzKCk7XG4gICAgICAgICAgICBpZiAodGhpcy5pc0F0dGFjaGVkUXVpbGxFZGl0b3JUb0RPTSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5pdFF1aWxsRWRpdG9yKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0NoZWNrZWQoKTogdm9pZCB7XG4gICAgICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICAgICAgICAvLyBUaGUgcHJvYmxlbSBpcyBpbnNpZGUgdGhlIGBxdWlsbGAgbGlicmFyeSwgd2UgbmVlZCB0byB3YWl0IGZvciBhIG5ldyByZWxlYXNlLlxuICAgICAgICAgICAgLy8gRnVuY3Rpb24gYGlzTGluZWAgLSB1c2VkIGBnZXRDb21wdXRlZFN0eWxlYCwgaXQgd2FzIHJld3JpdHRlbiBpbiB0aGUgbmV4dCByZWxlYXNlLlxuICAgICAgICAgICAgLy8gKFdlIG5lZWQgdG8gd2FpdCBmb3IgYSByZWxlYXNlIGhpZ2hlciB0aGFuIDEuMy43KS5cbiAgICAgICAgICAgIC8vIFRoZXNlIGNoZWNrcyBhbmQgY29kZSBjYW4gYmUgcmVtb3ZlZC5cbiAgICAgICAgICAgIGlmICghdGhpcy5xdWlsbCAmJiB0aGlzLmlzQXR0YWNoZWRRdWlsbEVkaXRvclRvRE9NKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbml0UXVpbGxFZGl0b3IoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gQ2FuIGFsc28gYmUgZGVsZXRlZCBhZnRlciB1cGRhdGluZyBgcXVpbGxgLlxuICAgICAgICAgICAgaWYgKHRoaXMuZGVsYXllZENvbW1hbmQgJiYgdGhpcy5pc0F0dGFjaGVkUXVpbGxFZGl0b3JUb0RPTSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGVsYXllZENvbW1hbmQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRlbGF5ZWRDb21tYW5kID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChpdGVtLmdldFR5cGUoKSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2hlYWRlcic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVhZGVyVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcblxuICAgICAgICBpZiAodGhpcy5xdWlsbCkge1xuICAgICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29tbWFuZCA9ICgpOiB2b2lkID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5xdWlsbC5zZXRDb250ZW50cyh0aGlzLnF1aWxsLmNsaXBib2FyZC5jb252ZXJ0KHRoaXMudmFsdWUpKTtcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNBdHRhY2hlZFF1aWxsRWRpdG9yVG9ET00pIHtcbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZCgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVsYXllZENvbW1hbmQgPSBjb21tYW5kO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29tbWFuZCA9ICgpOiB2b2lkID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5xdWlsbC5zZXRUZXh0KCcnKTtcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNBdHRhY2hlZFF1aWxsRWRpdG9yVG9ET00pIHtcbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZCgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVsYXllZENvbW1hbmQgPSBjb21tYW5kO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkID0gZm47XG4gICAgfVxuXG4gICAgZ2V0UXVpbGwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnF1aWxsO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdFF1aWxsRWRpdG9yKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmluaXRRdWlsbEVsZW1lbnRzKCk7XG5cbiAgICAgICAgY29uc3QgeyB0b29sYmFyRWxlbWVudCwgZWRpdG9yRWxlbWVudCB9ID0gdGhpcy5xdWlsbEVsZW1lbnRzO1xuICAgICAgICBsZXQgZGVmYXVsdE1vZHVsZSA9IHsgdG9vbGJhcjogdG9vbGJhckVsZW1lbnQgfTtcbiAgICAgICAgbGV0IG1vZHVsZXMgPSB0aGlzLm1vZHVsZXMgPyB7IC4uLmRlZmF1bHRNb2R1bGUsIC4uLnRoaXMubW9kdWxlcyB9IDogZGVmYXVsdE1vZHVsZTtcbiAgICAgICAgdGhpcy5xdWlsbCA9IG5ldyBRdWlsbChlZGl0b3JFbGVtZW50LCB7XG4gICAgICAgICAgICBtb2R1bGVzOiBtb2R1bGVzLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6IHRoaXMucGxhY2Vob2xkZXIsXG4gICAgICAgICAgICByZWFkT25seTogdGhpcy5yZWFkb25seSxcbiAgICAgICAgICAgIHRoZW1lOiAnc25vdycsXG4gICAgICAgICAgICBmb3JtYXRzOiB0aGlzLmZvcm1hdHMsXG4gICAgICAgICAgICBib3VuZHM6IHRoaXMuYm91bmRzLFxuICAgICAgICAgICAgZGVidWc6IHRoaXMuZGVidWcsXG4gICAgICAgICAgICBzY3JvbGxpbmdDb250YWluZXI6IHRoaXMuc2Nyb2xsaW5nQ29udGFpbmVyXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0aGlzLnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnF1aWxsLnNldENvbnRlbnRzKHRoaXMucXVpbGwuY2xpcGJvYXJkLmNvbnZlcnQodGhpcy52YWx1ZSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5xdWlsbC5vbigndGV4dC1jaGFuZ2UnLCAoZGVsdGE6IGFueSwgb2xkQ29udGVudHM6IGFueSwgc291cmNlOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGlmIChzb3VyY2UgPT09ICd1c2VyJykge1xuICAgICAgICAgICAgICAgIGxldCBodG1sID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKGVkaXRvckVsZW1lbnQsICcucWwtZWRpdG9yJykuaW5uZXJIVE1MO1xuICAgICAgICAgICAgICAgIGxldCB0ZXh0ID0gdGhpcy5xdWlsbC5nZXRUZXh0KCkudHJpbSgpO1xuICAgICAgICAgICAgICAgIGlmIChodG1sID09PSAnPHA+PGJyPjwvcD4nKSB7XG4gICAgICAgICAgICAgICAgICAgIGh0bWwgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMub25UZXh0Q2hhbmdlLmVtaXQoe1xuICAgICAgICAgICAgICAgICAgICBodG1sVmFsdWU6IGh0bWwsXG4gICAgICAgICAgICAgICAgICAgIHRleHRWYWx1ZTogdGV4dCxcbiAgICAgICAgICAgICAgICAgICAgZGVsdGE6IGRlbHRhLFxuICAgICAgICAgICAgICAgICAgICBzb3VyY2U6IHNvdXJjZVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKGh0bWwpO1xuICAgICAgICAgICAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5xdWlsbC5vbignc2VsZWN0aW9uLWNoYW5nZScsIChyYW5nZTogc3RyaW5nLCBvbGRSYW5nZTogc3RyaW5nLCBzb3VyY2U6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgdGhpcy5vblNlbGVjdGlvbkNoYW5nZS5lbWl0KHtcbiAgICAgICAgICAgICAgICByYW5nZTogcmFuZ2UsXG4gICAgICAgICAgICAgICAgb2xkUmFuZ2U6IG9sZFJhbmdlLFxuICAgICAgICAgICAgICAgIHNvdXJjZTogc291cmNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5vbkluaXQuZW1pdCh7XG4gICAgICAgICAgICBlZGl0b3I6IHRoaXMucXVpbGxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0UXVpbGxFbGVtZW50cygpOiB2b2lkIHtcbiAgICAgICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5xdWlsbEVsZW1lbnRzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5xdWlsbEVsZW1lbnRzID0ge1xuICAgICAgICAgICAgICAgICAgICBlZGl0b3JFbGVtZW50OiBEb21IYW5kbGVyLmZpbmRTaW5nbGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnZGl2LnAtZWRpdG9yLWNvbnRlbnQnKSxcbiAgICAgICAgICAgICAgICAgICAgdG9vbGJhckVsZW1lbnQ6IERvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdkaXYucC1lZGl0b3ItdG9vbGJhcicpXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbRWRpdG9yLCBTaGFyZWRNb2R1bGVdLFxuICAgIGRlY2xhcmF0aW9uczogW0VkaXRvcl1cbn0pXG5leHBvcnQgY2xhc3MgRWRpdG9yTW9kdWxlIHt9XG4iXX0=