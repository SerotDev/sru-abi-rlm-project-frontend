/**
 * @dynamic is for runtime initializing DomHandler.browser
 *
 * If delete below comment, we can see this error message:
 *  Metadata collected contains an error that will be reported at runtime:
 *  Only initialized variables and constants can be referenced
 *  because the value of this variable is needed by the template compiler.
 */
// @dynamic
export class DomHandler {
    static zindex = 1000;
    static calculatedScrollbarWidth = null;
    static calculatedScrollbarHeight = null;
    static browser;
    static addClass(element, className) {
        if (element && className) {
            if (element.classList)
                element.classList.add(className);
            else
                element.className += ' ' + className;
        }
    }
    static addMultipleClasses(element, className) {
        if (element && className) {
            if (element.classList) {
                let styles = className.trim().split(' ');
                for (let i = 0; i < styles.length; i++) {
                    element.classList.add(styles[i]);
                }
            }
            else {
                let styles = className.split(' ');
                for (let i = 0; i < styles.length; i++) {
                    element.className += ' ' + styles[i];
                }
            }
        }
    }
    static removeClass(element, className) {
        if (element && className) {
            if (element.classList)
                element.classList.remove(className);
            else
                element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }
    static removeMultipleClasses(element, classNames) {
        if (element && classNames) {
            [classNames]
                .flat()
                .filter(Boolean)
                .forEach((cNames) => cNames.split(' ').forEach((className) => this.removeClass(element, className)));
        }
    }
    static hasClass(element, className) {
        if (element && className) {
            if (element.classList)
                return element.classList.contains(className);
            else
                return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
        }
        return false;
    }
    static siblings(element) {
        return Array.prototype.filter.call(element.parentNode.children, function (child) {
            return child !== element;
        });
    }
    static find(element, selector) {
        return Array.from(element.querySelectorAll(selector));
    }
    static findSingle(element, selector) {
        return this.isElement(element) ? element.querySelector(selector) : null;
    }
    static index(element) {
        let children = element.parentNode.childNodes;
        let num = 0;
        for (var i = 0; i < children.length; i++) {
            if (children[i] == element)
                return num;
            if (children[i].nodeType == 1)
                num++;
        }
        return -1;
    }
    static indexWithinGroup(element, attributeName) {
        let children = element.parentNode ? element.parentNode.childNodes : [];
        let num = 0;
        for (var i = 0; i < children.length; i++) {
            if (children[i] == element)
                return num;
            if (children[i].attributes && children[i].attributes[attributeName] && children[i].nodeType == 1)
                num++;
        }
        return -1;
    }
    static appendOverlay(overlay, target, appendTo = 'self') {
        if (appendTo !== 'self' && overlay && target) {
            this.appendChild(overlay, target);
        }
    }
    static alignOverlay(overlay, target, appendTo = 'self', calculateMinWidth = true) {
        if (overlay && target) {
            if (calculateMinWidth) {
                overlay.style.minWidth = `${DomHandler.getOuterWidth(target)}px`;
            }
            if (appendTo === 'self') {
                this.relativePosition(overlay, target);
            }
            else {
                this.absolutePosition(overlay, target);
            }
        }
    }
    static relativePosition(element, target) {
        const getClosestRelativeElement = (el) => {
            if (!el)
                return;
            return getComputedStyle(el).getPropertyValue('position') === 'relative' ? el : getClosestRelativeElement(el.parentElement);
        };
        const elementDimensions = element.offsetParent ? { width: element.offsetWidth, height: element.offsetHeight } : this.getHiddenElementDimensions(element);
        const targetHeight = target.offsetHeight;
        const targetOffset = target.getBoundingClientRect();
        const windowScrollTop = this.getWindowScrollTop();
        const windowScrollLeft = this.getWindowScrollLeft();
        const viewport = this.getViewport();
        const relativeElement = getClosestRelativeElement(element);
        const relativeElementOffset = relativeElement?.getBoundingClientRect() || { top: -1 * windowScrollTop, left: -1 * windowScrollLeft };
        let top, left;
        if (targetOffset.top + targetHeight + elementDimensions.height > viewport.height) {
            top = targetOffset.top - relativeElementOffset.top - elementDimensions.height;
            element.style.transformOrigin = 'bottom';
            if (targetOffset.top + top < 0) {
                top = -1 * targetOffset.top;
            }
        }
        else {
            top = targetHeight + targetOffset.top - relativeElementOffset.top;
            element.style.transformOrigin = 'top';
        }
        const horizontalOverflow = targetOffset.left + elementDimensions.width - viewport.width;
        const targetLeftOffsetInSpaceOfRelativeElement = targetOffset.left - relativeElementOffset.left;
        if (elementDimensions.width > viewport.width) {
            // element wider then viewport and cannot fit on screen (align at left side of viewport)
            left = (targetOffset.left - relativeElementOffset.left) * -1;
        }
        else if (horizontalOverflow > 0) {
            // element wider then viewport but can be fit on screen (align at right side of viewport)
            left = targetLeftOffsetInSpaceOfRelativeElement - horizontalOverflow;
        }
        else {
            // element fits on screen (align with target)
            left = targetOffset.left - relativeElementOffset.left;
        }
        element.style.top = top + 'px';
        element.style.left = left + 'px';
    }
    static absolutePosition(element, target) {
        const elementDimensions = element.offsetParent ? { width: element.offsetWidth, height: element.offsetHeight } : this.getHiddenElementDimensions(element);
        const elementOuterHeight = elementDimensions.height;
        const elementOuterWidth = elementDimensions.width;
        const targetOuterHeight = target.offsetHeight;
        const targetOuterWidth = target.offsetWidth;
        const targetOffset = target.getBoundingClientRect();
        const windowScrollTop = this.getWindowScrollTop();
        const windowScrollLeft = this.getWindowScrollLeft();
        const viewport = this.getViewport();
        let top, left;
        if (targetOffset.top + targetOuterHeight + elementOuterHeight > viewport.height) {
            top = targetOffset.top + windowScrollTop - elementOuterHeight;
            element.style.transformOrigin = 'bottom';
            if (top < 0) {
                top = windowScrollTop;
            }
        }
        else {
            top = targetOuterHeight + targetOffset.top + windowScrollTop;
            element.style.transformOrigin = 'top';
        }
        if (targetOffset.left + elementOuterWidth > viewport.width)
            left = Math.max(0, targetOffset.left + windowScrollLeft + targetOuterWidth - elementOuterWidth);
        else
            left = targetOffset.left + windowScrollLeft;
        element.style.top = top + 'px';
        element.style.left = left + 'px';
    }
    static getParents(element, parents = []) {
        return element['parentNode'] === null ? parents : this.getParents(element.parentNode, parents.concat([element.parentNode]));
    }
    static getScrollableParents(element) {
        let scrollableParents = [];
        if (element) {
            let parents = this.getParents(element);
            const overflowRegex = /(auto|scroll)/;
            const overflowCheck = (node) => {
                let styleDeclaration = window['getComputedStyle'](node, null);
                return overflowRegex.test(styleDeclaration.getPropertyValue('overflow')) || overflowRegex.test(styleDeclaration.getPropertyValue('overflowX')) || overflowRegex.test(styleDeclaration.getPropertyValue('overflowY'));
            };
            for (let parent of parents) {
                let scrollSelectors = parent.nodeType === 1 && parent.dataset['scrollselectors'];
                if (scrollSelectors) {
                    let selectors = scrollSelectors.split(',');
                    for (let selector of selectors) {
                        let el = this.findSingle(parent, selector);
                        if (el && overflowCheck(el)) {
                            scrollableParents.push(el);
                        }
                    }
                }
                if (parent.nodeType !== 9 && overflowCheck(parent)) {
                    scrollableParents.push(parent);
                }
            }
        }
        return scrollableParents;
    }
    static getHiddenElementOuterHeight(element) {
        element.style.visibility = 'hidden';
        element.style.display = 'block';
        let elementHeight = element.offsetHeight;
        element.style.display = 'none';
        element.style.visibility = 'visible';
        return elementHeight;
    }
    static getHiddenElementOuterWidth(element) {
        element.style.visibility = 'hidden';
        element.style.display = 'block';
        let elementWidth = element.offsetWidth;
        element.style.display = 'none';
        element.style.visibility = 'visible';
        return elementWidth;
    }
    static getHiddenElementDimensions(element) {
        let dimensions = {};
        element.style.visibility = 'hidden';
        element.style.display = 'block';
        dimensions.width = element.offsetWidth;
        dimensions.height = element.offsetHeight;
        element.style.display = 'none';
        element.style.visibility = 'visible';
        return dimensions;
    }
    static scrollInView(container, item) {
        let borderTopValue = getComputedStyle(container).getPropertyValue('borderTopWidth');
        let borderTop = borderTopValue ? parseFloat(borderTopValue) : 0;
        let paddingTopValue = getComputedStyle(container).getPropertyValue('paddingTop');
        let paddingTop = paddingTopValue ? parseFloat(paddingTopValue) : 0;
        let containerRect = container.getBoundingClientRect();
        let itemRect = item.getBoundingClientRect();
        let offset = itemRect.top + document.body.scrollTop - (containerRect.top + document.body.scrollTop) - borderTop - paddingTop;
        let scroll = container.scrollTop;
        let elementHeight = container.clientHeight;
        let itemHeight = this.getOuterHeight(item);
        if (offset < 0) {
            container.scrollTop = scroll + offset;
        }
        else if (offset + itemHeight > elementHeight) {
            container.scrollTop = scroll + offset - elementHeight + itemHeight;
        }
    }
    static fadeIn(element, duration) {
        element.style.opacity = 0;
        let last = +new Date();
        let opacity = 0;
        let tick = function () {
            opacity = +element.style.opacity.replace(',', '.') + (new Date().getTime() - last) / duration;
            element.style.opacity = opacity;
            last = +new Date();
            if (+opacity < 1) {
                (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
            }
        };
        tick();
    }
    static fadeOut(element, ms) {
        var opacity = 1, interval = 50, duration = ms, gap = interval / duration;
        let fading = setInterval(() => {
            opacity = opacity - gap;
            if (opacity <= 0) {
                opacity = 0;
                clearInterval(fading);
            }
            element.style.opacity = opacity;
        }, interval);
    }
    static getWindowScrollTop() {
        let doc = document.documentElement;
        return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    }
    static getWindowScrollLeft() {
        let doc = document.documentElement;
        return (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
    }
    static matches(element, selector) {
        var p = Element.prototype;
        var f = p['matches'] ||
            p.webkitMatchesSelector ||
            p['mozMatchesSelector'] ||
            p['msMatchesSelector'] ||
            function (s) {
                return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
            };
        return f.call(element, selector);
    }
    static getOuterWidth(el, margin) {
        let width = el.offsetWidth;
        if (margin) {
            let style = getComputedStyle(el);
            width += parseFloat(style.marginLeft) + parseFloat(style.marginRight);
        }
        return width;
    }
    static getHorizontalPadding(el) {
        let style = getComputedStyle(el);
        return parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
    }
    static getHorizontalMargin(el) {
        let style = getComputedStyle(el);
        return parseFloat(style.marginLeft) + parseFloat(style.marginRight);
    }
    static innerWidth(el) {
        let width = el.offsetWidth;
        let style = getComputedStyle(el);
        width += parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
        return width;
    }
    static width(el) {
        let width = el.offsetWidth;
        let style = getComputedStyle(el);
        width -= parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
        return width;
    }
    static getInnerHeight(el) {
        let height = el.offsetHeight;
        let style = getComputedStyle(el);
        height += parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
        return height;
    }
    static getOuterHeight(el, margin) {
        let height = el.offsetHeight;
        if (margin) {
            let style = getComputedStyle(el);
            height += parseFloat(style.marginTop) + parseFloat(style.marginBottom);
        }
        return height;
    }
    static getHeight(el) {
        let height = el.offsetHeight;
        let style = getComputedStyle(el);
        height -= parseFloat(style.paddingTop) + parseFloat(style.paddingBottom) + parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
        return height;
    }
    static getWidth(el) {
        let width = el.offsetWidth;
        let style = getComputedStyle(el);
        width -= parseFloat(style.paddingLeft) + parseFloat(style.paddingRight) + parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
        return width;
    }
    static getViewport() {
        let win = window, d = document, e = d.documentElement, g = d.getElementsByTagName('body')[0], w = win.innerWidth || e.clientWidth || g.clientWidth, h = win.innerHeight || e.clientHeight || g.clientHeight;
        return { width: w, height: h };
    }
    static getOffset(el) {
        var rect = el.getBoundingClientRect();
        return {
            top: rect.top + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0),
            left: rect.left + (window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0)
        };
    }
    static replaceElementWith(element, replacementElement) {
        let parentNode = element.parentNode;
        if (!parentNode)
            throw `Can't replace element`;
        return parentNode.replaceChild(replacementElement, element);
    }
    static getUserAgent() {
        if (navigator && this.isClient()) {
            return navigator.userAgent;
        }
    }
    static isIE() {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            // IE 10 or older => return version number
            return true;
        }
        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            var rv = ua.indexOf('rv:');
            return true;
        }
        var edge = ua.indexOf('Edge/');
        if (edge > 0) {
            // Edge (IE 12+) => return version number
            return true;
        }
        // other browser
        return false;
    }
    static isIOS() {
        return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window['MSStream'];
    }
    static isAndroid() {
        return /(android)/i.test(navigator.userAgent);
    }
    static isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }
    static appendChild(element, target) {
        if (this.isElement(target))
            target.appendChild(element);
        else if (target && target.el && target.el.nativeElement)
            target.el.nativeElement.appendChild(element);
        else
            throw 'Cannot append ' + target + ' to ' + element;
    }
    static removeChild(element, target) {
        if (this.isElement(target))
            target.removeChild(element);
        else if (target.el && target.el.nativeElement)
            target.el.nativeElement.removeChild(element);
        else
            throw 'Cannot remove ' + element + ' from ' + target;
    }
    static removeElement(element) {
        if (!('remove' in Element.prototype))
            element.parentNode.removeChild(element);
        else
            element.remove();
    }
    static isElement(obj) {
        return typeof HTMLElement === 'object' ? obj instanceof HTMLElement : obj && typeof obj === 'object' && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === 'string';
    }
    static calculateScrollbarWidth(el) {
        if (el) {
            let style = getComputedStyle(el);
            return el.offsetWidth - el.clientWidth - parseFloat(style.borderLeftWidth) - parseFloat(style.borderRightWidth);
        }
        else {
            if (this.calculatedScrollbarWidth !== null)
                return this.calculatedScrollbarWidth;
            let scrollDiv = document.createElement('div');
            scrollDiv.className = 'p-scrollbar-measure';
            document.body.appendChild(scrollDiv);
            let scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
            document.body.removeChild(scrollDiv);
            this.calculatedScrollbarWidth = scrollbarWidth;
            return scrollbarWidth;
        }
    }
    static calculateScrollbarHeight() {
        if (this.calculatedScrollbarHeight !== null)
            return this.calculatedScrollbarHeight;
        let scrollDiv = document.createElement('div');
        scrollDiv.className = 'p-scrollbar-measure';
        document.body.appendChild(scrollDiv);
        let scrollbarHeight = scrollDiv.offsetHeight - scrollDiv.clientHeight;
        document.body.removeChild(scrollDiv);
        this.calculatedScrollbarWidth = scrollbarHeight;
        return scrollbarHeight;
    }
    static invokeElementMethod(element, methodName, args) {
        element[methodName].apply(element, args);
    }
    static clearSelection() {
        if (window.getSelection) {
            if (window.getSelection().empty) {
                window.getSelection().empty();
            }
            else if (window.getSelection().removeAllRanges && window.getSelection().rangeCount > 0 && window.getSelection().getRangeAt(0).getClientRects().length > 0) {
                window.getSelection().removeAllRanges();
            }
        }
        else if (document['selection'] && document['selection'].empty) {
            try {
                document['selection'].empty();
            }
            catch (error) {
                //ignore IE bug
            }
        }
    }
    static getBrowser() {
        if (!this.browser) {
            let matched = this.resolveUserAgent();
            this.browser = {};
            if (matched.browser) {
                this.browser[matched.browser] = true;
                this.browser['version'] = matched.version;
            }
            if (this.browser['chrome']) {
                this.browser['webkit'] = true;
            }
            else if (this.browser['webkit']) {
                this.browser['safari'] = true;
            }
        }
        return this.browser;
    }
    static resolveUserAgent() {
        let ua = navigator.userAgent.toLowerCase();
        let match = /(chrome)[ \/]([\w.]+)/.exec(ua) || /(webkit)[ \/]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || (ua.indexOf('compatible') < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua)) || [];
        return {
            browser: match[1] || '',
            version: match[2] || '0'
        };
    }
    static isInteger(value) {
        if (Number.isInteger) {
            return Number.isInteger(value);
        }
        else {
            return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
        }
    }
    static isHidden(element) {
        return !element || element.offsetParent === null;
    }
    static isVisible(element) {
        return element && element.offsetParent != null;
    }
    static isExist(element) {
        return element !== null && typeof element !== 'undefined' && element.nodeName && element.parentNode;
    }
    static focus(element, options) {
        element && document.activeElement !== element && element.focus(options);
    }
    static getFocusableElements(element, selector = '') {
        let focusableElements = this.find(element, `button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
                [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
                input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
                select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
                textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
                [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
                [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector}`);
        let visibleFocusableElements = [];
        for (let focusableElement of focusableElements) {
            if (getComputedStyle(focusableElement).display != 'none' && getComputedStyle(focusableElement).visibility != 'hidden')
                visibleFocusableElements.push(focusableElement);
        }
        return visibleFocusableElements;
    }
    static getFirstFocusableElement(element, selector) {
        const focusableElements = this.getFocusableElements(element, selector);
        return focusableElements.length > 0 ? focusableElements[0] : null;
    }
    static getLastFocusableElement(element, selector) {
        const focusableElements = this.getFocusableElements(element, selector);
        return focusableElements.length > 0 ? focusableElements[focusableElements.length - 1] : null;
    }
    static getNextFocusableElement(element, reverse = false) {
        const focusableElements = DomHandler.getFocusableElements(element);
        let index = 0;
        if (focusableElements && focusableElements.length > 0) {
            const focusedIndex = focusableElements.indexOf(focusableElements[0].ownerDocument.activeElement);
            if (reverse) {
                if (focusedIndex == -1 || focusedIndex === 0) {
                    index = focusableElements.length - 1;
                }
                else {
                    index = focusedIndex - 1;
                }
            }
            else if (focusedIndex != -1 && focusedIndex !== focusableElements.length - 1) {
                index = focusedIndex + 1;
            }
        }
        return focusableElements[index];
    }
    static generateZIndex() {
        this.zindex = this.zindex || 999;
        return ++this.zindex;
    }
    static getSelection() {
        if (window.getSelection)
            return window.getSelection().toString();
        else if (document.getSelection)
            return document.getSelection().toString();
        else if (document['selection'])
            return document['selection'].createRange().text;
        return null;
    }
    static getTargetElement(target, el) {
        if (!target)
            return null;
        switch (target) {
            case 'document':
                return document;
            case 'window':
                return window;
            case '@next':
                return el?.nextElementSibling;
            case '@prev':
                return el?.previousElementSibling;
            case '@parent':
                return el?.parentElement;
            case '@grandparent':
                return el?.parentElement.parentElement;
            default:
                const type = typeof target;
                if (type === 'string') {
                    return document.querySelector(target);
                }
                else if (type === 'object' && target.hasOwnProperty('nativeElement')) {
                    return this.isExist(target.nativeElement) ? target.nativeElement : undefined;
                }
                const isFunction = (obj) => !!(obj && obj.constructor && obj.call && obj.apply);
                const element = isFunction(target) ? target() : target;
                return (element && element.nodeType === 9) || this.isExist(element) ? element : null;
        }
    }
    static isClient() {
        return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
    }
    static getAttribute(element, name) {
        if (element) {
            const value = element.getAttribute(name);
            if (!isNaN(value)) {
                return +value;
            }
            if (value === 'true' || value === 'false') {
                return value === 'true';
            }
            return value;
        }
        return undefined;
    }
    static calculateBodyScrollbarWidth() {
        return window.innerWidth - document.documentElement.offsetWidth;
    }
    static blockBodyScroll(className = 'p-overflow-hidden') {
        document.body.style.setProperty('--scrollbar-width', this.calculateBodyScrollbarWidth() + 'px');
        this.addClass(document.body, className);
    }
    static unblockBodyScroll(className = 'p-overflow-hidden') {
        document.body.style.removeProperty('--scrollbar-width');
        this.removeClass(document.body, className);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9taGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvY29tcG9uZW50cy9kb20vZG9taGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztHQU9HO0FBQ0gsV0FBVztBQUNYLE1BQU0sT0FBTyxVQUFVO0lBQ1osTUFBTSxDQUFDLE1BQU0sR0FBVyxJQUFJLENBQUM7SUFFNUIsTUFBTSxDQUFDLHdCQUF3QixHQUFXLElBQUksQ0FBQztJQUUvQyxNQUFNLENBQUMseUJBQXlCLEdBQVcsSUFBSSxDQUFDO0lBRWhELE1BQU0sQ0FBQyxPQUFPLENBQU07SUFFckIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFZLEVBQUUsU0FBaUI7UUFDbEQsSUFBSSxPQUFPLElBQUksU0FBUyxFQUFFO1lBQ3RCLElBQUksT0FBTyxDQUFDLFNBQVM7Z0JBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7O2dCQUNuRCxPQUFPLENBQUMsU0FBUyxJQUFJLEdBQUcsR0FBRyxTQUFTLENBQUM7U0FDN0M7SUFDTCxDQUFDO0lBRU0sTUFBTSxDQUFDLGtCQUFrQixDQUFDLE9BQVksRUFBRSxTQUFpQjtRQUM1RCxJQUFJLE9BQU8sSUFBSSxTQUFTLEVBQUU7WUFDdEIsSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFFO2dCQUNuQixJQUFJLE1BQU0sR0FBYSxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNuRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDcEMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ3BDO2FBQ0o7aUJBQU07Z0JBQ0gsSUFBSSxNQUFNLEdBQWEsU0FB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QU0sQ0FBQzthQUMzQjtZQUVELE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBRUQsT0FBTyxTQUFTLENBQUM7SUFDckIsQ0FBQztJQUVNLE1BQU0sQ0FBQywyQkFBMkI7UUFDckMsT0FBTyxNQUFNLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDO0lBQ3BFLENBQUM7SUFFTSxNQUFNLENBQUMsZUFBZSxDQUFDLFNBQVMsR0FBRyxtQkFBbUI7UUFDekQsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQywyQkFBMkIsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQ2hHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRU0sTUFBTSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsR0FBRyxtQkFBbUI7UUFDM0QsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQy9DLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBkeW5hbWljIGlzIGZvciBydW50aW1lIGluaXRpYWxpemluZyBEb21IYW5kbGVyLmJyb3dzZXJcbiAqXG4gKiBJZiBkZWxldGUgYmVsb3cgY29tbWVudCwgd2UgY2FuIHNlZSB0aGlzIGVycm9yIG1lc3NhZ2U6XG4gKiAgTWV0YWRhdGEgY29sbGVjdGVkIGNvbnRhaW5zIGFuIGVycm9yIHRoYXQgd2lsbCBiZSByZXBvcnRlZCBhdCBydW50aW1lOlxuICogIE9ubHkgaW5pdGlhbGl6ZWQgdmFyaWFibGVzIGFuZCBjb25zdGFudHMgY2FuIGJlIHJlZmVyZW5jZWRcbiAqICBiZWNhdXNlIHRoZSB2YWx1ZSBvZiB0aGlzIHZhcmlhYmxlIGlzIG5lZWRlZCBieSB0aGUgdGVtcGxhdGUgY29tcGlsZXIuXG4gKi9cbi8vIEBkeW5hbWljXG5leHBvcnQgY2xhc3MgRG9tSGFuZGxlciB7XG4gICAgcHVibGljIHN0YXRpYyB6aW5kZXg6IG51bWJlciA9IDEwMDA7XG5cbiAgICBwcml2YXRlIHN0YXRpYyBjYWxjdWxhdGVkU2Nyb2xsYmFyV2lkdGg6IG51bWJlciA9IG51bGw7XG5cbiAgICBwcml2YXRlIHN0YXRpYyBjYWxjdWxhdGVkU2Nyb2xsYmFySGVpZ2h0OiBudW1iZXIgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBzdGF0aWMgYnJvd3NlcjogYW55O1xuXG4gICAgcHVibGljIHN0YXRpYyBhZGRDbGFzcyhlbGVtZW50OiBhbnksIGNsYXNzTmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGlmIChlbGVtZW50ICYmIGNsYXNzTmFtZSkge1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0KSBlbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICAgICAgICAgIGVsc2UgZWxlbWVudC5jbGFzc05hbWUgKz0gJyAnICsgY2xhc3NOYW1lO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBhZGRNdWx0aXBsZUNsYXNzZXMoZWxlbWVudDogYW55LCBjbGFzc05hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBpZiAoZWxlbWVudCAmJiBjbGFzc05hbWUpIHtcbiAgICAgICAgICAgIGlmIChlbGVtZW50LmNsYXNzTGlzdCkge1xuICAgICAgICAgICAgICAgIGxldCBzdHlsZXM6IHN0cmluZ1tdID0gY2xhc3NOYW1lLnRyaW0oKS5zcGxpdCgnICcpO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChzdHlsZXNbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IHN0eWxlczogc3RyaW5nW10gPSBjbGFzc05hbWUuc3BsaXQoJyAnKTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmNsYXNzTmFtZSArPSAnICcgKyBzdHlsZXNbaV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyByZW1vdmVDbGFzcyhlbGVtZW50OiBhbnksIGNsYXNzTmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGlmIChlbGVtZW50ICYmIGNsYXNzTmFtZSkge1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0KSBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICAgICAgICAgIGVsc2UgZWxlbWVudC5jbGFzc05hbWUgPSBlbGVtZW50LmNsYXNzTmFtZS5yZXBsYWNlKG5ldyBSZWdFeHAoJyhefFxcXFxiKScgKyBjbGFzc05hbWUuc3BsaXQoJyAnKS5qb2luKCd8JykgKyAnKFxcXFxifCQpJywgJ2dpJyksICcgJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHJlbW92ZU11bHRpcGxlQ2xhc3NlcyhlbGVtZW50LCBjbGFzc05hbWVzKSB7XG4gICAgICAgIGlmIChlbGVtZW50ICYmIGNsYXNzTmFtZXMpIHtcbiAgICAgICAgICAgIFtjbGFzc05hbWVzXVxuICAgICAgICAgICAgICAgIC5mbGF0KClcbiAgICAgICAgICAgICAgICAuZmlsdGVyKEJvb2xlYW4pXG4gICAgICAgICAgICAgICAgLmZvckVhY2goKGNOYW1lcykgPT4gY05hbWVzLnNwbGl0KCcgJykuZm9yRWFjaCgoY2xhc3NOYW1lKSA9PiB0aGlzLnJlbW92ZUNsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSkpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgaGFzQ2xhc3MoZWxlbWVudDogYW55LCBjbGFzc05hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoZWxlbWVudCAmJiBjbGFzc05hbWUpIHtcbiAgICAgICAgICAgIGlmIChlbGVtZW50LmNsYXNzTGlzdCkgcmV0dXJuIGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSk7XG4gICAgICAgICAgICBlbHNlIHJldHVybiBuZXcgUmVnRXhwKCcoXnwgKScgKyBjbGFzc05hbWUgKyAnKCB8JCknLCAnZ2knKS50ZXN0KGVsZW1lbnQuY2xhc3NOYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHNpYmxpbmdzKGVsZW1lbnQ6IGFueSk6IGFueSB7XG4gICAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuZmlsdGVyLmNhbGwoZWxlbWVudC5wYXJlbnROb2RlLmNoaWxkcmVuLCBmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICAgICAgICAgIHJldHVybiBjaGlsZCAhPT0gZWxlbWVudDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBmaW5kKGVsZW1lbnQ6IGFueSwgc2VsZWN0b3I6IHN0cmluZyk6IGFueVtdIHtcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20oZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBmaW5kU2luZ2xlKGVsZW1lbnQ6IGFueSwgc2VsZWN0b3I6IHN0cmluZyk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzRWxlbWVudChlbGVtZW50KSA/IGVsZW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcikgOiBudWxsO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgaW5kZXgoZWxlbWVudDogYW55KTogbnVtYmVyIHtcbiAgICAgICAgbGV0IGNoaWxkcmVuID0gZWxlbWVudC5wYXJlbnROb2RlLmNoaWxkTm9kZXM7XG4gICAgICAgIGxldCBudW0gPSAwO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoY2hpbGRyZW5baV0gPT0gZWxlbWVudCkgcmV0dXJuIG51bTtcbiAgICAgICAgICAgIGlmIChjaGlsZHJlbltpXS5ub2RlVHlwZSA9PSAxKSBudW0rKztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLTE7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBpbmRleFdpdGhpbkdyb3VwKGVsZW1lbnQ6IGFueSwgYXR0cmlidXRlTmFtZTogc3RyaW5nKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IGNoaWxkcmVuID0gZWxlbWVudC5wYXJlbnROb2RlID8gZWxlbWVudC5wYXJlbnROb2RlLmNoaWxkTm9kZXMgOiBbXTtcbiAgICAgICAgbGV0IG51bSA9IDA7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChjaGlsZHJlbltpXSA9PSBlbGVtZW50KSByZXR1cm4gbnVtO1xuICAgICAgICAgICAgaWYgKGNoaWxkcmVuW2ldLmF0dHJpYnV0ZXMgJiYgY2hpbGRyZW5baV0uYXR0cmlidXRlc1thdHRyaWJ1dGVOYW1lXSAmJiBjaGlsZHJlbltpXS5ub2RlVHlwZSA9PSAxKSBudW0rKztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLTE7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBhcHBlbmRPdmVybGF5KG92ZXJsYXk6IGFueSwgdGFyZ2V0OiBhbnksIGFwcGVuZFRvOiBhbnkgPSAnc2VsZicpIHtcbiAgICAgICAgaWYgKGFwcGVuZFRvICE9PSAnc2VsZicgJiYgb3ZlcmxheSAmJiB0YXJnZXQpIHtcbiAgICAgICAgICAgIHRoaXMuYXBwZW5kQ2hpbGQob3ZlcmxheSwgdGFyZ2V0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgYWxpZ25PdmVybGF5KG92ZXJsYXk6IGFueSwgdGFyZ2V0OiBhbnksIGFwcGVuZFRvOiBhbnkgPSAnc2VsZicsIGNhbGN1bGF0ZU1pbldpZHRoOiBib29sZWFuID0gdHJ1ZSkge1xuICAgICAgICBpZiAob3ZlcmxheSAmJiB0YXJnZXQpIHtcbiAgICAgICAgICAgIGlmIChjYWxjdWxhdGVNaW5XaWR0aCkge1xuICAgICAgICAgICAgICAgIG92ZXJsYXkuc3R5bGUubWluV2lkdGggPSBgJHtEb21IYW5kbGVyLmdldE91dGVyV2lkdGgodGFyZ2V0KX1weGA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChhcHBlbmRUbyA9PT0gJ3NlbGYnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWxhdGl2ZVBvc2l0aW9uKG92ZXJsYXksIHRhcmdldCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuYWJzb2x1dGVQb3NpdGlvbihvdmVybGF5LCB0YXJnZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyByZWxhdGl2ZVBvc2l0aW9uKGVsZW1lbnQ6IGFueSwgdGFyZ2V0OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZ2V0Q2xvc2VzdFJlbGF0aXZlRWxlbWVudCA9IChlbCkgPT4ge1xuICAgICAgICAgICAgaWYgKCFlbCkgcmV0dXJuO1xuXG4gICAgICAgICAgICByZXR1cm4gZ2V0Q29tcHV0ZWRTdHlsZShlbCkuZ2V0UHJvcGVydHlWYWx1ZSgncG9zaXRpb24nKSA9PT0gJ3JlbGF0aXZlJyA/IGVsIDogZ2V0Q2xvc2VzdFJlbGF0aXZlRWxlbWVudChlbC5wYXJlbnRFbGVtZW50KTtcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBlbGVtZW50RGltZW5zaW9ucyA9IGVsZW1lbnQub2Zmc2V0UGFyZW50ID8geyB3aWR0aDogZWxlbWVudC5vZmZzZXRXaWR0aCwgaGVpZ2h0OiBlbGVtZW50Lm9mZnNldEhlaWdodCB9IDogdGhpcy5nZXRIaWRkZW5FbGVtZW50RGltZW5zaW9ucyhlbGVtZW50KTtcbiAgICAgICAgY29uc3QgdGFyZ2V0SGVpZ2h0ID0gdGFyZ2V0Lm9mZnNldEhlaWdodDtcbiAgICAgICAgY29uc3QgdGFyZ2V0T2Zmc2V0ID0gdGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBjb25zdCB3aW5kb3dTY3JvbGxUb3AgPSB0aGlzLmdldFdpbmRvd1Njcm9sbFRvcCgpO1xuICAgICAgICBjb25zdCB3aW5kb3dTY3JvbGxMZWZ0ID0gdGhpcy5nZXRXaW5kb3dTY3JvbGxMZWZ0KCk7XG4gICAgICAgIGNvbnN0IHZpZXdwb3J0ID0gdGhpcy5nZXRWaWV3cG9ydCgpO1xuICAgICAgICBjb25zdCByZWxhdGl2ZUVsZW1lbnQgPSBnZXRDbG9zZXN0UmVsYXRpdmVFbGVtZW50KGVsZW1lbnQpO1xuICAgICAgICBjb25zdCByZWxhdGl2ZUVsZW1lbnRPZmZzZXQgPSByZWxhdGl2ZUVsZW1lbnQ/LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpIHx8IHsgdG9wOiAtMSAqIHdpbmRvd1Njcm9sbFRvcCwgbGVmdDogLTEgKiB3aW5kb3dTY3JvbGxMZWZ0IH07XG4gICAgICAgIGxldCB0b3A6IG51bWJlciwgbGVmdDogbnVtYmVyO1xuXG4gICAgICAgIGlmICh0YXJnZXRPZmZzZXQudG9wICsgdGFyZ2V0SGVpZ2h0ICsgZWxlbWVudERpbWVuc2lvbnMuaGVpZ2h0ID4gdmlld3BvcnQuaGVpZ2h0KSB7XG4gICAgICAgICAgICB0b3AgPSB0YXJnZXRPZmZzZXQudG9wIC0gcmVsYXRpdmVFbGVtZW50T2Zmc2V0LnRvcCAtIGVsZW1lbnREaW1lbnNpb25zLmhlaWdodDtcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUudHJhbnNmb3JtT3JpZ2luID0gJ2JvdHRvbSc7XG4gICAgICAgICAgICBpZiAodGFyZ2V0T2Zmc2V0LnRvcCArIHRvcCA8IDApIHtcbiAgICAgICAgICAgICAgICB0b3AgPSAtMSAqIHRhcmdldE9mZnNldC50b3A7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0b3AgPSB0YXJnZXRIZWlnaHQgKyB0YXJnZXRPZmZzZXQudG9wIC0gcmVsYXRpdmVFbGVtZW50T2Zmc2V0LnRvcDtcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUudHJhbnNmb3JtT3JpZ2luID0gJ3RvcCc7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBob3Jpem9udGFsT3ZlcmZsb3cgPSB0YXJnZXRPZmZzZXQubGVmdCArIGVsZW1lbnREaW1lbnNpb25zLndpZHRoIC0gdmlld3BvcnQud2lkdGg7XG4gICAgICAgIGNvbnN0IHRhcmdldExlZnRPZmZzZXRJblNwYWNlT2ZSZWxhdGl2ZUVsZW1lbnQgPSB0YXJnZXRPZmZzZXQubGVmdCAtIHJlbGF0aXZlRWxlbWVudE9mZnNldC5sZWZ0O1xuICAgICAgICBpZiAoZWxlbWVudERpbWVuc2lvbnMud2lkdGggPiB2aWV3cG9ydC53aWR0aCkge1xuICAgICAgICAgICAgLy8gZWxlbWVudCB3aWRlciB0aGVuIHZpZXdwb3J0IGFuZCBjYW5ub3QgZml0IG9uIHNjcmVlbiAoYWxpZ24gYXQgbGVmdCBzaWRlIG9mIHZpZXdwb3J0KVxuICAgICAgICAgICAgbGVmdCA9ICh0YXJnZXRPZmZzZXQubGVmdCAtIHJlbGF0aXZlRWxlbWVudE9mZnNldC5sZWZ0KSAqIC0xO1xuICAgICAgICB9IGVsc2UgaWYgKGhvcml6b250YWxPdmVyZmxvdyA+IDApIHtcbiAgICAgICAgICAgIC8vIGVsZW1lbnQgd2lkZXIgdGhlbiB2aWV3cG9ydCBidXQgY2FuIGJlIGZpdCBvbiBzY3JlZW4gKGFsaWduIGF0IHJpZ2h0IHNpZGUgb2Ygdmlld3BvcnQpXG4gICAgICAgICAgICBsZWZ0ID0gdGFyZ2V0TGVmdE9mZnNldEluU3BhY2VPZlJlbGF0aXZlRWxlbWVudCAtIGhvcml6b250YWxPdmVyZmxvdztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGVsZW1lbnQgZml0cyBvbiBzY3JlZW4gKGFsaWduIHdpdGggdGFyZ2V0KVxuICAgICAgICAgICAgbGVmdCA9IHRhcmdldE9mZnNldC5sZWZ0IC0gcmVsYXRpdmVFbGVtZW50T2Zmc2V0LmxlZnQ7XG4gICAgICAgIH1cblxuICAgICAgICBlbGVtZW50LnN0eWxlLnRvcCA9IHRvcCArICdweCc7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUubGVmdCA9IGxlZnQgKyAncHgnO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgYWJzb2x1dGVQb3NpdGlvbihlbGVtZW50OiBhbnksIHRhcmdldDogYW55KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnREaW1lbnNpb25zID0gZWxlbWVudC5vZmZzZXRQYXJlbnQgPyB7IHdpZHRoOiBlbGVtZW50Lm9mZnNldFdpZHRoLCBoZWlnaHQ6IGVsZW1lbnQub2Zmc2V0SGVpZ2h0IH0gOiB0aGlzLmdldEhpZGRlbkVsZW1lbnREaW1lbnNpb25zKGVsZW1lbnQpO1xuICAgICAgICBjb25zdCBlbGVtZW50T3V0ZXJIZWlnaHQgPSBlbGVtZW50RGltZW5zaW9ucy5oZWlnaHQ7XG4gICAgICAgIGNvbnN0IGVsZW1lbnRPdXRlcldpZHRoID0gZWxlbWVudERpbWVuc2lvbnMud2lkdGg7XG4gICAgICAgIGNvbnN0IHRhcmdldE91dGVySGVpZ2h0ID0gdGFyZ2V0Lm9mZnNldEhlaWdodDtcbiAgICAgICAgY29uc3QgdGFyZ2V0T3V0ZXJXaWR0aCA9IHRhcmdldC5vZmZzZXRXaWR0aDtcbiAgICAgICAgY29uc3QgdGFyZ2V0T2Zmc2V0ID0gdGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBjb25zdCB3aW5kb3dTY3JvbGxUb3AgPSB0aGlzLmdldFdpbmRvd1Njcm9sbFRvcCgpO1xuICAgICAgICBjb25zdCB3aW5kb3dTY3JvbGxMZWZ0ID0gdGhpcy5nZXRXaW5kb3dTY3JvbGxMZWZ0KCk7XG4gICAgICAgIGNvbnN0IHZpZXdwb3J0ID0gdGhpcy5nZXRWaWV3cG9ydCgpO1xuICAgICAgICBsZXQgdG9wOiBudW1iZXIsIGxlZnQ6IG51bWJlcjtcblxuICAgICAgICBpZiAodGFyZ2V0T2Zmc2V0LnRvcCArIHRhcmdldE91dGVySGVpZ2h0ICsgZWxlbWVudE91dGVySGVpZ2h0ID4gdmlld3BvcnQuaGVpZ2h0KSB7XG4gICAgICAgICAgICB0b3AgPSB0YXJnZXRPZmZzZXQudG9wICsgd2luZG93U2Nyb2xsVG9wIC0gZWxlbWVudE91dGVySGVpZ2h0O1xuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS50cmFuc2Zvcm1PcmlnaW4gPSAnYm90dG9tJztcblxuICAgICAgICAgICAgaWYgKHRvcCA8IDApIHtcbiAgICAgICAgICAgICAgICB0b3AgPSB3aW5kb3dTY3JvbGxUb3A7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0b3AgPSB0YXJnZXRPdXRlckhlaWdodCArIHRhcmdldE9mZnNldC50b3AgKyB3aW5kb3dTY3JvbGxUb3A7XG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlLnRyYW5zZm9ybU9yaWdpbiA9ICd0b3AnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRhcmdldE9mZnNldC5sZWZ0ICsgZWxlbWVudE91dGVyV2lkdGggPiB2aWV3cG9ydC53aWR0aCkgbGVmdCA9IE1hdGgubWF4KDAsIHRhcmdldE9mZnNldC5sZWZ0ICsgd2luZG93U2Nyb2xsTGVmdCArIHRhcmdldE91dGVyV2lkdGggLSBlbGVtZW50T3V0ZXJXaWR0aCk7XG4gICAgICAgIGVsc2UgbGVmdCA9IHRhcmdldE9mZnNldC5sZWZ0ICsgd2luZG93U2Nyb2xsTGVmdDtcblxuICAgICAgICBlbGVtZW50LnN0eWxlLnRvcCA9IHRvcCArICdweCc7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUubGVmdCA9IGxlZnQgKyAncHgnO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXRQYXJlbnRzKGVsZW1lbnQ6IGFueSwgcGFyZW50czogYW55ID0gW10pOiBhbnkge1xuICAgICAgICByZXR1cm4gZWxlbWVudFsncGFyZW50Tm9kZSddID09PSBudWxsID8gcGFyZW50cyA6IHRoaXMuZ2V0UGFyZW50cyhlbGVtZW50LnBhcmVudE5vZGUsIHBhcmVudHMuY29uY2F0KFtlbGVtZW50LnBhcmVudE5vZGVdKSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldFNjcm9sbGFibGVQYXJlbnRzKGVsZW1lbnQ6IGFueSkge1xuICAgICAgICBsZXQgc2Nyb2xsYWJsZVBhcmVudHMgPSBbXTtcblxuICAgICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICAgICAgbGV0IHBhcmVudHMgPSB0aGlzLmdldFBhcmVudHMoZWxlbWVudCk7XG4gICAgICAgICAgICBjb25zdCBvdmVyZmxvd1JlZ2V4ID0gLyhhdXRvfHNjcm9sbCkvO1xuICAgICAgICAgICAgY29uc3Qgb3ZlcmZsb3dDaGVjayA9IChub2RlOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgc3R5bGVEZWNsYXJhdGlvbiA9IHdpbmRvd1snZ2V0Q29tcHV0ZWRTdHlsZSddKG5vZGUsIG51bGwpO1xuICAgICAgICAgICAgICAgIHJldHVybiBvdmVyZmxvd1JlZ2V4LnRlc3Qoc3R5bGVEZWNsYXJhdGlvbi5nZXRQcm9wZXJ0eVZhbHVlKCdvdmVyZmxvdycpKSB8fCBvdmVyZmxvd1JlZ2V4LnRlc3Qoc3R5bGVEZWNsYXJhdGlvbi5nZXRQcm9wZXJ0eVZhbHVlKCdvdmVyZmxvd1gnKSkgfHwgb3ZlcmZsb3dSZWdleC50ZXN0KHN0eWxlRGVjbGFyYXRpb24uZ2V0UHJvcGVydHlWYWx1ZSgnb3ZlcmZsb3dZJykpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZm9yIChsZXQgcGFyZW50IG9mIHBhcmVudHMpIHtcbiAgICAgICAgICAgICAgICBsZXQgc2Nyb2xsU2VsZWN0b3JzID0gcGFyZW50Lm5vZGVUeXBlID09PSAxICYmIHBhcmVudC5kYXRhc2V0WydzY3JvbGxzZWxlY3RvcnMnXTtcbiAgICAgICAgICAgICAgICBpZiAoc2Nyb2xsU2VsZWN0b3JzKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzZWxlY3RvcnMgPSBzY3JvbGxTZWxlY3RvcnMuc3BsaXQoJywnKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgc2VsZWN0b3Igb2Ygc2VsZWN0b3JzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZWwgPSB0aGlzLmZpbmRTaW5nbGUocGFyZW50LCBzZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWwgJiYgb3ZlcmZsb3dDaGVjayhlbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxhYmxlUGFyZW50cy5wdXNoKGVsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChwYXJlbnQubm9kZVR5cGUgIT09IDkgJiYgb3ZlcmZsb3dDaGVjayhwYXJlbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbGFibGVQYXJlbnRzLnB1c2gocGFyZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc2Nyb2xsYWJsZVBhcmVudHM7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXRIaWRkZW5FbGVtZW50T3V0ZXJIZWlnaHQoZWxlbWVudDogYW55KTogbnVtYmVyIHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIGxldCBlbGVtZW50SGVpZ2h0ID0gZWxlbWVudC5vZmZzZXRIZWlnaHQ7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgZWxlbWVudC5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xuXG4gICAgICAgIHJldHVybiBlbGVtZW50SGVpZ2h0O1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SGlkZGVuRWxlbWVudE91dGVyV2lkdGgoZWxlbWVudDogYW55KTogbnVtYmVyIHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIGxldCBlbGVtZW50V2lkdGggPSBlbGVtZW50Lm9mZnNldFdpZHRoO1xuICAgICAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcblxuICAgICAgICByZXR1cm4gZWxlbWVudFdpZHRoO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SGlkZGVuRWxlbWVudERpbWVuc2lvbnMoZWxlbWVudDogYW55KTogYW55IHtcbiAgICAgICAgbGV0IGRpbWVuc2lvbnM6IGFueSA9IHt9O1xuICAgICAgICBlbGVtZW50LnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcbiAgICAgICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgZGltZW5zaW9ucy53aWR0aCA9IGVsZW1lbnQub2Zmc2V0V2lkdGg7XG4gICAgICAgIGRpbWVuc2lvbnMuaGVpZ2h0ID0gZWxlbWVudC5vZmZzZXRIZWlnaHQ7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgZWxlbWVudC5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xuXG4gICAgICAgIHJldHVybiBkaW1lbnNpb25zO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgc2Nyb2xsSW5WaWV3KGNvbnRhaW5lciwgaXRlbSkge1xuICAgICAgICBsZXQgYm9yZGVyVG9wVmFsdWU6IHN0cmluZyA9IGdldENvbXB1dGVkU3R5bGUoY29udGFpbmVyKS5nZXRQcm9wZXJ0eVZhbHVlKCdib3JkZXJUb3BXaWR0aCcpO1xuICAgICAgICBsZXQgYm9yZGVyVG9wOiBudW1iZXIgPSBib3JkZXJUb3BWYWx1ZSA/IHBhcnNlRmxvYXQoYm9yZGVyVG9wVmFsdWUpIDogMDtcbiAgICAgICAgbGV0IHBhZGRpbmdUb3BWYWx1ZTogc3RyaW5nID0gZ2V0Q29tcHV0ZWRTdHlsZShjb250YWluZXIpLmdldFByb3BlcnR5VmFsdWUoJ3BhZGRpbmdUb3AnKTtcbiAgICAgICAgbGV0IHBhZGRpbmdUb3A6IG51bWJlciA9IHBhZGRpbmdUb3BWYWx1ZSA/IHBhcnNlRmxvYXQocGFkZGluZ1RvcFZhbHVlKSA6IDA7XG4gICAgICAgIGxldCBjb250YWluZXJSZWN0ID0gY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBsZXQgaXRlbVJlY3QgPSBpdGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBsZXQgb2Zmc2V0ID0gaXRlbVJlY3QudG9wICsgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgLSAoY29udGFpbmVyUmVjdC50b3AgKyBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCkgLSBib3JkZXJUb3AgLSBwYWRkaW5nVG9wO1xuICAgICAgICBsZXQgc2Nyb2xsID0gY29udGFpbmVyLnNjcm9sbFRvcDtcbiAgICAgICAgbGV0IGVsZW1lbnRIZWlnaHQgPSBjb250YWluZXIuY2xpZW50SGVpZ2h0O1xuICAgICAgICBsZXQgaXRlbUhlaWdodCA9IHRoaXMuZ2V0T3V0ZXJIZWlnaHQoaXRlbSk7XG5cbiAgICAgICAgaWYgKG9mZnNldCA8IDApIHtcbiAgICAgICAgICAgIGNvbnRhaW5lci5zY3JvbGxUb3AgPSBzY3JvbGwgKyBvZmZzZXQ7XG4gICAgICAgIH0gZWxzZSBpZiAob2Zmc2V0ICsgaXRlbUhlaWdodCA+IGVsZW1lbnRIZWlnaHQpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lci5zY3JvbGxUb3AgPSBzY3JvbGwgKyBvZmZzZXQgLSBlbGVtZW50SGVpZ2h0ICsgaXRlbUhlaWdodDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZmFkZUluKGVsZW1lbnQsIGR1cmF0aW9uOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gMDtcblxuICAgICAgICBsZXQgbGFzdCA9ICtuZXcgRGF0ZSgpO1xuICAgICAgICBsZXQgb3BhY2l0eSA9IDA7XG4gICAgICAgIGxldCB0aWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgb3BhY2l0eSA9ICtlbGVtZW50LnN0eWxlLm9wYWNpdHkucmVwbGFjZSgnLCcsICcuJykgKyAobmV3IERhdGUoKS5nZXRUaW1lKCkgLSBsYXN0KSAvIGR1cmF0aW9uO1xuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gb3BhY2l0eTtcbiAgICAgICAgICAgIGxhc3QgPSArbmV3IERhdGUoKTtcblxuICAgICAgICAgICAgaWYgKCtvcGFjaXR5IDwgMSkge1xuICAgICAgICAgICAgICAgICh3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lICYmIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aWNrKSkgfHwgc2V0VGltZW91dCh0aWNrLCAxNik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdGljaygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZmFkZU91dChlbGVtZW50LCBtcykge1xuICAgICAgICB2YXIgb3BhY2l0eSA9IDEsXG4gICAgICAgICAgICBpbnRlcnZhbCA9IDUwLFxuICAgICAgICAgICAgZHVyYXRpb24gPSBtcyxcbiAgICAgICAgICAgIGdhcCA9IGludGVydmFsIC8gZHVyYXRpb247XG5cbiAgICAgICAgbGV0IGZhZGluZyA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgIG9wYWNpdHkgPSBvcGFjaXR5IC0gZ2FwO1xuXG4gICAgICAgICAgICBpZiAob3BhY2l0eSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgb3BhY2l0eSA9IDA7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChmYWRpbmcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlLm9wYWNpdHkgPSBvcGFjaXR5O1xuICAgICAgICB9LCBpbnRlcnZhbCk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXRXaW5kb3dTY3JvbGxUb3AoKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IGRvYyA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICAgICAgcmV0dXJuICh3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jLnNjcm9sbFRvcCkgLSAoZG9jLmNsaWVudFRvcCB8fCAwKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldFdpbmRvd1Njcm9sbExlZnQoKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IGRvYyA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICAgICAgcmV0dXJuICh3aW5kb3cucGFnZVhPZmZzZXQgfHwgZG9jLnNjcm9sbExlZnQpIC0gKGRvYy5jbGllbnRMZWZ0IHx8IDApO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgbWF0Y2hlcyhlbGVtZW50LCBzZWxlY3Rvcjogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIHZhciBwID0gRWxlbWVudC5wcm90b3R5cGU7XG4gICAgICAgIHZhciBmID1cbiAgICAgICAgICAgIHBbJ21hdGNoZXMnXSB8fFxuICAgICAgICAgICAgcC53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHxcbiAgICAgICAgICAgIHBbJ21vek1hdGNoZXNTZWxlY3RvciddIHx8XG4gICAgICAgICAgICBwWydtc01hdGNoZXNTZWxlY3RvciddIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAocykge1xuICAgICAgICAgICAgICAgIHJldHVybiBbXS5pbmRleE9mLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzKSwgdGhpcykgIT09IC0xO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGYuY2FsbChlbGVtZW50LCBzZWxlY3Rvcik7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXRPdXRlcldpZHRoKGVsLCBtYXJnaW4/KSB7XG4gICAgICAgIGxldCB3aWR0aCA9IGVsLm9mZnNldFdpZHRoO1xuXG4gICAgICAgIGlmIChtYXJnaW4pIHtcbiAgICAgICAgICAgIGxldCBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUoZWwpO1xuICAgICAgICAgICAgd2lkdGggKz0gcGFyc2VGbG9hdChzdHlsZS5tYXJnaW5MZWZ0KSArIHBhcnNlRmxvYXQoc3R5bGUubWFyZ2luUmlnaHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHdpZHRoO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SG9yaXpvbnRhbFBhZGRpbmcoZWwpIHtcbiAgICAgICAgbGV0IHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShlbCk7XG4gICAgICAgIHJldHVybiBwYXJzZUZsb2F0KHN0eWxlLnBhZGRpbmdMZWZ0KSArIHBhcnNlRmxvYXQoc3R5bGUucGFkZGluZ1JpZ2h0KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldEhvcml6b250YWxNYXJnaW4oZWwpIHtcbiAgICAgICAgbGV0IHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShlbCk7XG4gICAgICAgIHJldHVybiBwYXJzZUZsb2F0KHN0eWxlLm1hcmdpbkxlZnQpICsgcGFyc2VGbG9hdChzdHlsZS5tYXJnaW5SaWdodCk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBpbm5lcldpZHRoKGVsKSB7XG4gICAgICAgIGxldCB3aWR0aCA9IGVsLm9mZnNldFdpZHRoO1xuICAgICAgICBsZXQgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKGVsKTtcblxuICAgICAgICB3aWR0aCArPSBwYXJzZUZsb2F0KHN0eWxlLnBhZGRpbmdMZWZ0KSArIHBhcnNlRmxvYXQoc3R5bGUucGFkZGluZ1JpZ2h0KTtcbiAgICAgICAgcmV0dXJuIHdpZHRoO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgd2lkdGgoZWwpIHtcbiAgICAgICAgbGV0IHdpZHRoID0gZWwub2Zmc2V0V2lkdGg7XG4gICAgICAgIGxldCBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUoZWwpO1xuXG4gICAgICAgIHdpZHRoIC09IHBhcnNlRmxvYXQoc3R5bGUucGFkZGluZ0xlZnQpICsgcGFyc2VGbG9hdChzdHlsZS5wYWRkaW5nUmlnaHQpO1xuICAgICAgICByZXR1cm4gd2lkdGg7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbm5lckhlaWdodChlbCkge1xuICAgICAgICBsZXQgaGVpZ2h0ID0gZWwub2Zmc2V0SGVpZ2h0O1xuICAgICAgICBsZXQgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKGVsKTtcblxuICAgICAgICBoZWlnaHQgKz0gcGFyc2VGbG9hdChzdHlsZS5wYWRkaW5nVG9wKSArIHBhcnNlRmxvYXQoc3R5bGUucGFkZGluZ0JvdHRvbSk7XG4gICAgICAgIHJldHVybiBoZWlnaHQ7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXRPdXRlckhlaWdodChlbCwgbWFyZ2luPykge1xuICAgICAgICBsZXQgaGVpZ2h0ID0gZWwub2Zmc2V0SGVpZ2h0O1xuXG4gICAgICAgIGlmIChtYXJnaW4pIHtcbiAgICAgICAgICAgIGxldCBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUoZWwpO1xuICAgICAgICAgICAgaGVpZ2h0ICs9IHBhcnNlRmxvYXQoc3R5bGUubWFyZ2luVG9wKSArIHBhcnNlRmxvYXQoc3R5bGUubWFyZ2luQm90dG9tKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBoZWlnaHQ7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXRIZWlnaHQoZWwpOiBudW1iZXIge1xuICAgICAgICBsZXQgaGVpZ2h0ID0gZWwub2Zmc2V0SGVpZ2h0O1xuICAgICAgICBsZXQgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKGVsKTtcblxuICAgICAgICBoZWlnaHQgLT0gcGFyc2VGbG9hdChzdHlsZS5wYWRkaW5nVG9wKSArIHBhcnNlRmxvYXQoc3R5bGUucGFkZGluZ0JvdHRvbSkgKyBwYXJzZUZsb2F0KHN0eWxlLmJvcmRlclRvcFdpZHRoKSArIHBhcnNlRmxvYXQoc3R5bGUuYm9yZGVyQm90dG9tV2lkdGgpO1xuXG4gICAgICAgIHJldHVybiBoZWlnaHQ7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXRXaWR0aChlbCk6IG51bWJlciB7XG4gICAgICAgIGxldCB3aWR0aCA9IGVsLm9mZnNldFdpZHRoO1xuICAgICAgICBsZXQgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKGVsKTtcblxuICAgICAgICB3aWR0aCAtPSBwYXJzZUZsb2F0KHN0eWxlLnBhZGRpbmdMZWZ0KSArIHBhcnNlRmxvYXQoc3R5bGUucGFkZGluZ1JpZ2h0KSArIHBhcnNlRmxvYXQoc3R5bGUuYm9yZGVyTGVmdFdpZHRoKSArIHBhcnNlRmxvYXQoc3R5bGUuYm9yZGVyUmlnaHRXaWR0aCk7XG5cbiAgICAgICAgcmV0dXJuIHdpZHRoO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0Vmlld3BvcnQoKTogYW55IHtcbiAgICAgICAgbGV0IHdpbiA9IHdpbmRvdyxcbiAgICAgICAgICAgIGQgPSBkb2N1bWVudCxcbiAgICAgICAgICAgIGUgPSBkLmRvY3VtZW50RWxlbWVudCxcbiAgICAgICAgICAgIGcgPSBkLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF0sXG4gICAgICAgICAgICB3ID0gd2luLmlubmVyV2lkdGggfHwgZS5jbGllbnRXaWR0aCB8fCBnLmNsaWVudFdpZHRoLFxuICAgICAgICAgICAgaCA9IHdpbi5pbm5lckhlaWdodCB8fCBlLmNsaWVudEhlaWdodCB8fCBnLmNsaWVudEhlaWdodDtcblxuICAgICAgICByZXR1cm4geyB3aWR0aDogdywgaGVpZ2h0OiBoIH07XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXRPZmZzZXQoZWwpIHtcbiAgICAgICAgdmFyIHJlY3QgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdG9wOiByZWN0LnRvcCArICh3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCB8fCAwKSxcbiAgICAgICAgICAgIGxlZnQ6IHJlY3QubGVmdCArICh3aW5kb3cucGFnZVhPZmZzZXQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbExlZnQgfHwgZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0IHx8IDApXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyByZXBsYWNlRWxlbWVudFdpdGgoZWxlbWVudDogYW55LCByZXBsYWNlbWVudEVsZW1lbnQ6IGFueSk6IGFueSB7XG4gICAgICAgIGxldCBwYXJlbnROb2RlID0gZWxlbWVudC5wYXJlbnROb2RlO1xuICAgICAgICBpZiAoIXBhcmVudE5vZGUpIHRocm93IGBDYW4ndCByZXBsYWNlIGVsZW1lbnRgO1xuICAgICAgICByZXR1cm4gcGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQocmVwbGFjZW1lbnRFbGVtZW50LCBlbGVtZW50KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldFVzZXJBZ2VudCgpOiBzdHJpbmcge1xuICAgICAgICBpZiAobmF2aWdhdG9yICYmIHRoaXMuaXNDbGllbnQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5hdmlnYXRvci51c2VyQWdlbnQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGlzSUUoKSB7XG4gICAgICAgIHZhciB1YSA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50O1xuXG4gICAgICAgIHZhciBtc2llID0gdWEuaW5kZXhPZignTVNJRSAnKTtcbiAgICAgICAgaWYgKG1zaWUgPiAwKSB7XG4gICAgICAgICAgICAvLyBJRSAxMCBvciBvbGRlciA9PiByZXR1cm4gdmVyc2lvbiBudW1iZXJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHRyaWRlbnQgPSB1YS5pbmRleE9mKCdUcmlkZW50LycpO1xuICAgICAgICBpZiAodHJpZGVudCA+IDApIHtcbiAgICAgICAgICAgIC8vIElFIDExID0+IHJldHVybiB2ZXJzaW9uIG51bWJlclxuICAgICAgICAgICAgdmFyIHJ2ID0gdWEuaW5kZXhPZigncnY6Jyk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBlZGdlID0gdWEuaW5kZXhPZignRWRnZS8nKTtcbiAgICAgICAgaWYgKGVkZ2UgPiAwKSB7XG4gICAgICAgICAgICAvLyBFZGdlIChJRSAxMispID0+IHJldHVybiB2ZXJzaW9uIG51bWJlclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBvdGhlciBicm93c2VyXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGlzSU9TKCkge1xuICAgICAgICByZXR1cm4gL2lQYWR8aVBob25lfGlQb2QvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkgJiYgIXdpbmRvd1snTVNTdHJlYW0nXTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGlzQW5kcm9pZCgpIHtcbiAgICAgICAgcmV0dXJuIC8oYW5kcm9pZCkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgaXNUb3VjaERldmljZSgpIHtcbiAgICAgICAgcmV0dXJuICdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdyB8fCBuYXZpZ2F0b3IubWF4VG91Y2hQb2ludHMgPiAwO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgYXBwZW5kQ2hpbGQoZWxlbWVudDogYW55LCB0YXJnZXQ6IGFueSkge1xuICAgICAgICBpZiAodGhpcy5pc0VsZW1lbnQodGFyZ2V0KSkgdGFyZ2V0LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgICAgICBlbHNlIGlmICh0YXJnZXQgJiYgdGFyZ2V0LmVsICYmIHRhcmdldC5lbC5uYXRpdmVFbGVtZW50KSB0YXJnZXQuZWwubmF0aXZlRWxlbWVudC5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICAgICAgZWxzZSB0aHJvdyAnQ2Fubm90IGFwcGVuZCAnICsgdGFyZ2V0ICsgJyB0byAnICsgZWxlbWVudDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHJlbW92ZUNoaWxkKGVsZW1lbnQ6IGFueSwgdGFyZ2V0OiBhbnkpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFbGVtZW50KHRhcmdldCkpIHRhcmdldC5yZW1vdmVDaGlsZChlbGVtZW50KTtcbiAgICAgICAgZWxzZSBpZiAodGFyZ2V0LmVsICYmIHRhcmdldC5lbC5uYXRpdmVFbGVtZW50KSB0YXJnZXQuZWwubmF0aXZlRWxlbWVudC5yZW1vdmVDaGlsZChlbGVtZW50KTtcbiAgICAgICAgZWxzZSB0aHJvdyAnQ2Fubm90IHJlbW92ZSAnICsgZWxlbWVudCArICcgZnJvbSAnICsgdGFyZ2V0O1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgcmVtb3ZlRWxlbWVudChlbGVtZW50OiBFbGVtZW50KSB7XG4gICAgICAgIGlmICghKCdyZW1vdmUnIGluIEVsZW1lbnQucHJvdG90eXBlKSkgZWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsZW1lbnQpO1xuICAgICAgICBlbHNlIGVsZW1lbnQucmVtb3ZlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBpc0VsZW1lbnQob2JqOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBIVE1MRWxlbWVudCA9PT0gJ29iamVjdCcgPyBvYmogaW5zdGFuY2VvZiBIVE1MRWxlbWVudCA6IG9iaiAmJiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiBvYmogIT09IG51bGwgJiYgb2JqLm5vZGVUeXBlID09PSAxICYmIHR5cGVvZiBvYmoubm9kZU5hbWUgPT09ICdzdHJpbmcnO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgY2FsY3VsYXRlU2Nyb2xsYmFyV2lkdGgoZWw/OiBIVE1MRWxlbWVudCk6IG51bWJlciB7XG4gICAgICAgIGlmIChlbCkge1xuICAgICAgICAgICAgbGV0IHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShlbCk7XG4gICAgICAgICAgICByZXR1cm4gZWwub2Zmc2V0V2lkdGggLSBlbC5jbGllbnRXaWR0aCAtIHBhcnNlRmxvYXQoc3R5bGUuYm9yZGVyTGVmdFdpZHRoKSAtIHBhcnNlRmxvYXQoc3R5bGUuYm9yZGVyUmlnaHRXaWR0aCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jYWxjdWxhdGVkU2Nyb2xsYmFyV2lkdGggIT09IG51bGwpIHJldHVybiB0aGlzLmNhbGN1bGF0ZWRTY3JvbGxiYXJXaWR0aDtcblxuICAgICAgICAgICAgbGV0IHNjcm9sbERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgc2Nyb2xsRGl2LmNsYXNzTmFtZSA9ICdwLXNjcm9sbGJhci1tZWFzdXJlJztcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2Nyb2xsRGl2KTtcblxuICAgICAgICAgICAgbGV0IHNjcm9sbGJhcldpZHRoID0gc2Nyb2xsRGl2Lm9mZnNldFdpZHRoIC0gc2Nyb2xsRGl2LmNsaWVudFdpZHRoO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChzY3JvbGxEaXYpO1xuXG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZWRTY3JvbGxiYXJXaWR0aCA9IHNjcm9sbGJhcldpZHRoO1xuXG4gICAgICAgICAgICByZXR1cm4gc2Nyb2xsYmFyV2lkdGg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGNhbGN1bGF0ZVNjcm9sbGJhckhlaWdodCgpOiBudW1iZXIge1xuICAgICAgICBpZiAodGhpcy5jYWxjdWxhdGVkU2Nyb2xsYmFySGVpZ2h0ICE9PSBudWxsKSByZXR1cm4gdGhpcy5jYWxjdWxhdGVkU2Nyb2xsYmFySGVpZ2h0O1xuXG4gICAgICAgIGxldCBzY3JvbGxEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgc2Nyb2xsRGl2LmNsYXNzTmFtZSA9ICdwLXNjcm9sbGJhci1tZWFzdXJlJztcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JvbGxEaXYpO1xuXG4gICAgICAgIGxldCBzY3JvbGxiYXJIZWlnaHQgPSBzY3JvbGxEaXYub2Zmc2V0SGVpZ2h0IC0gc2Nyb2xsRGl2LmNsaWVudEhlaWdodDtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChzY3JvbGxEaXYpO1xuXG4gICAgICAgIHRoaXMuY2FsY3VsYXRlZFNjcm9sbGJhcldpZHRoID0gc2Nyb2xsYmFySGVpZ2h0O1xuXG4gICAgICAgIHJldHVybiBzY3JvbGxiYXJIZWlnaHQ7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBpbnZva2VFbGVtZW50TWV0aG9kKGVsZW1lbnQ6IGFueSwgbWV0aG9kTmFtZTogc3RyaW5nLCBhcmdzPzogYW55W10pOiB2b2lkIHtcbiAgICAgICAgKGVsZW1lbnQgYXMgYW55KVttZXRob2ROYW1lXS5hcHBseShlbGVtZW50LCBhcmdzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGNsZWFyU2VsZWN0aW9uKCk6IHZvaWQge1xuICAgICAgICBpZiAod2luZG93LmdldFNlbGVjdGlvbikge1xuICAgICAgICAgICAgaWYgKHdpbmRvdy5nZXRTZWxlY3Rpb24oKS5lbXB0eSkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5nZXRTZWxlY3Rpb24oKS5lbXB0eSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh3aW5kb3cuZ2V0U2VsZWN0aW9uKCkucmVtb3ZlQWxsUmFuZ2VzICYmIHdpbmRvdy5nZXRTZWxlY3Rpb24oKS5yYW5nZUNvdW50ID4gMCAmJiB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkuZ2V0UmFuZ2VBdCgwKS5nZXRDbGllbnRSZWN0cygpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnRbJ3NlbGVjdGlvbiddICYmIGRvY3VtZW50WydzZWxlY3Rpb24nXS5lbXB0eSkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudFsnc2VsZWN0aW9uJ10uZW1wdHkoKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgLy9pZ25vcmUgSUUgYnVnXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldEJyb3dzZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5icm93c2VyKSB7XG4gICAgICAgICAgICBsZXQgbWF0Y2hlZCA9IHRoaXMucmVzb2x2ZVVzZXJBZ2VudCgpO1xuICAgICAgICAgICAgdGhpcy5icm93c2VyID0ge307XG5cbiAgICAgICAgICAgIGlmIChtYXRjaGVkLmJyb3dzZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJyb3dzZXJbbWF0Y2hlZC5icm93c2VyXSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5icm93c2VyWyd2ZXJzaW9uJ10gPSBtYXRjaGVkLnZlcnNpb247XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmJyb3dzZXJbJ2Nocm9tZSddKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5icm93c2VyWyd3ZWJraXQnXSA9IHRydWU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYnJvd3Nlclsnd2Via2l0J10pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJyb3dzZXJbJ3NhZmFyaSddID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmJyb3dzZXI7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyByZXNvbHZlVXNlckFnZW50KCkge1xuICAgICAgICBsZXQgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGxldCBtYXRjaCA9XG4gICAgICAgICAgICAvKGNocm9tZSlbIFxcL10oW1xcdy5dKykvLmV4ZWModWEpIHx8IC8od2Via2l0KVsgXFwvXShbXFx3Ll0rKS8uZXhlYyh1YSkgfHwgLyhvcGVyYSkoPzouKnZlcnNpb258KVsgXFwvXShbXFx3Ll0rKS8uZXhlYyh1YSkgfHwgLyhtc2llKSAoW1xcdy5dKykvLmV4ZWModWEpIHx8ICh1YS5pbmRleE9mKCdjb21wYXRpYmxlJykgPCAwICYmIC8obW96aWxsYSkoPzouKj8gcnY6KFtcXHcuXSspfCkvLmV4ZWModWEpKSB8fCBbXTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYnJvd3NlcjogbWF0Y2hbMV0gfHwgJycsXG4gICAgICAgICAgICB2ZXJzaW9uOiBtYXRjaFsyXSB8fCAnMCdcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGlzSW50ZWdlcih2YWx1ZSk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoTnVtYmVyLmlzSW50ZWdlcikge1xuICAgICAgICAgICAgcmV0dXJuIE51bWJlci5pc0ludGVnZXIodmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgJiYgaXNGaW5pdGUodmFsdWUpICYmIE1hdGguZmxvb3IodmFsdWUpID09PSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgaXNIaWRkZW4oZWxlbWVudDogSFRNTEVsZW1lbnQpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICFlbGVtZW50IHx8IGVsZW1lbnQub2Zmc2V0UGFyZW50ID09PSBudWxsO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgaXNWaXNpYmxlKGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBlbGVtZW50ICYmIGVsZW1lbnQub2Zmc2V0UGFyZW50ICE9IG51bGw7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBpc0V4aXN0KGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBlbGVtZW50ICE9PSBudWxsICYmIHR5cGVvZiBlbGVtZW50ICE9PSAndW5kZWZpbmVkJyAmJiBlbGVtZW50Lm5vZGVOYW1lICYmIGVsZW1lbnQucGFyZW50Tm9kZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGZvY3VzKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBvcHRpb25zPzogRm9jdXNPcHRpb25zKTogdm9pZCB7XG4gICAgICAgIGVsZW1lbnQgJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAhPT0gZWxlbWVudCAmJiBlbGVtZW50LmZvY3VzKG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0Rm9jdXNhYmxlRWxlbWVudHMoZWxlbWVudCwgc2VsZWN0b3IgPSAnJykge1xuICAgICAgICBsZXQgZm9jdXNhYmxlRWxlbWVudHMgPSB0aGlzLmZpbmQoXG4gICAgICAgICAgICBlbGVtZW50LFxuICAgICAgICAgICAgYGJ1dHRvbjpub3QoW3RhYmluZGV4ID0gXCItMVwiXSk6bm90KFtkaXNhYmxlZF0pOm5vdChbc3R5bGUqPVwiZGlzcGxheTpub25lXCJdKTpub3QoW2hpZGRlbl0pJHtzZWxlY3Rvcn0sXG4gICAgICAgICAgICAgICAgW2hyZWZdW2NsaWVudEhlaWdodF1bY2xpZW50V2lkdGhdOm5vdChbdGFiaW5kZXggPSBcIi0xXCJdKTpub3QoW2Rpc2FibGVkXSk6bm90KFtzdHlsZSo9XCJkaXNwbGF5Om5vbmVcIl0pOm5vdChbaGlkZGVuXSkke3NlbGVjdG9yfSxcbiAgICAgICAgICAgICAgICBpbnB1dDpub3QoW3RhYmluZGV4ID0gXCItMVwiXSk6bm90KFtkaXNhYmxlZF0pOm5vdChbc3R5bGUqPVwiZGlzcGxheTpub25lXCJdKTpub3QoW2hpZGRlbl0pJHtzZWxlY3Rvcn0sXG4gICAgICAgICAgICAgICAgc2VsZWN0Om5vdChbdGFiaW5kZXggPSBcIi0xXCJdKTpub3QoW2Rpc2FibGVkXSk6bm90KFtzdHlsZSo9XCJkaXNwbGF5Om5vbmVcIl0pOm5vdChbaGlkZGVuXSkke3NlbGVjdG9yfSxcbiAgICAgICAgICAgICAgICB0ZXh0YXJlYTpub3QoW3RhYmluZGV4ID0gXCItMVwiXSk6bm90KFtkaXNhYmxlZF0pOm5vdChbc3R5bGUqPVwiZGlzcGxheTpub25lXCJdKTpub3QoW2hpZGRlbl0pJHtzZWxlY3Rvcn0sXG4gICAgICAgICAgICAgICAgW3RhYkluZGV4XTpub3QoW3RhYkluZGV4ID0gXCItMVwiXSk6bm90KFtkaXNhYmxlZF0pOm5vdChbc3R5bGUqPVwiZGlzcGxheTpub25lXCJdKTpub3QoW2hpZGRlbl0pJHtzZWxlY3Rvcn0sXG4gICAgICAgICAgICAgICAgW2NvbnRlbnRlZGl0YWJsZV06bm90KFt0YWJJbmRleCA9IFwiLTFcIl0pOm5vdChbZGlzYWJsZWRdKTpub3QoW3N0eWxlKj1cImRpc3BsYXk6bm9uZVwiXSk6bm90KFtoaWRkZW5dKSR7c2VsZWN0b3J9YFxuICAgICAgICApO1xuXG4gICAgICAgIGxldCB2aXNpYmxlRm9jdXNhYmxlRWxlbWVudHMgPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBmb2N1c2FibGVFbGVtZW50IG9mIGZvY3VzYWJsZUVsZW1lbnRzKSB7XG4gICAgICAgICAgICBpZiAoZ2V0Q29tcHV0ZWRTdHlsZShmb2N1c2FibGVFbGVtZW50KS5kaXNwbGF5ICE9ICdub25lJyAmJiBnZXRDb21wdXRlZFN0eWxlKGZvY3VzYWJsZUVsZW1lbnQpLnZpc2liaWxpdHkgIT0gJ2hpZGRlbicpIHZpc2libGVGb2N1c2FibGVFbGVtZW50cy5wdXNoKGZvY3VzYWJsZUVsZW1lbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHZpc2libGVGb2N1c2FibGVFbGVtZW50cztcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldEZpcnN0Rm9jdXNhYmxlRWxlbWVudChlbGVtZW50LCBzZWxlY3Rvcikge1xuICAgICAgICBjb25zdCBmb2N1c2FibGVFbGVtZW50cyA9IHRoaXMuZ2V0Rm9jdXNhYmxlRWxlbWVudHMoZWxlbWVudCwgc2VsZWN0b3IpO1xuXG4gICAgICAgIHJldHVybiBmb2N1c2FibGVFbGVtZW50cy5sZW5ndGggPiAwID8gZm9jdXNhYmxlRWxlbWVudHNbMF0gOiBudWxsO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0TGFzdEZvY3VzYWJsZUVsZW1lbnQoZWxlbWVudCwgc2VsZWN0b3IpIHtcbiAgICAgICAgY29uc3QgZm9jdXNhYmxlRWxlbWVudHMgPSB0aGlzLmdldEZvY3VzYWJsZUVsZW1lbnRzKGVsZW1lbnQsIHNlbGVjdG9yKTtcblxuICAgICAgICByZXR1cm4gZm9jdXNhYmxlRWxlbWVudHMubGVuZ3RoID4gMCA/IGZvY3VzYWJsZUVsZW1lbnRzW2ZvY3VzYWJsZUVsZW1lbnRzLmxlbmd0aCAtIDFdIDogbnVsbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldE5leHRGb2N1c2FibGVFbGVtZW50KGVsZW1lbnQ6IEhUTUxFbGVtZW50LCByZXZlcnNlID0gZmFsc2UpIHtcbiAgICAgICAgY29uc3QgZm9jdXNhYmxlRWxlbWVudHMgPSBEb21IYW5kbGVyLmdldEZvY3VzYWJsZUVsZW1lbnRzKGVsZW1lbnQpO1xuICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICBpZiAoZm9jdXNhYmxlRWxlbWVudHMgJiYgZm9jdXNhYmxlRWxlbWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3QgZm9jdXNlZEluZGV4ID0gZm9jdXNhYmxlRWxlbWVudHMuaW5kZXhPZihmb2N1c2FibGVFbGVtZW50c1swXS5vd25lckRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpO1xuXG4gICAgICAgICAgICBpZiAocmV2ZXJzZSkge1xuICAgICAgICAgICAgICAgIGlmIChmb2N1c2VkSW5kZXggPT0gLTEgfHwgZm9jdXNlZEluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gZm9jdXNhYmxlRWxlbWVudHMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IGZvY3VzZWRJbmRleCAtIDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChmb2N1c2VkSW5kZXggIT0gLTEgJiYgZm9jdXNlZEluZGV4ICE9PSBmb2N1c2FibGVFbGVtZW50cy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSBmb2N1c2VkSW5kZXggKyAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZvY3VzYWJsZUVsZW1lbnRzW2luZGV4XTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2VuZXJhdGVaSW5kZXgoKSB7XG4gICAgICAgIHRoaXMuemluZGV4ID0gdGhpcy56aW5kZXggfHwgOTk5O1xuICAgICAgICByZXR1cm4gKyt0aGlzLnppbmRleDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldFNlbGVjdGlvbigpIHtcbiAgICAgICAgaWYgKHdpbmRvdy5nZXRTZWxlY3Rpb24pIHJldHVybiB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkudG9TdHJpbmcoKTtcbiAgICAgICAgZWxzZSBpZiAoZG9jdW1lbnQuZ2V0U2VsZWN0aW9uKSByZXR1cm4gZG9jdW1lbnQuZ2V0U2VsZWN0aW9uKCkudG9TdHJpbmcoKTtcbiAgICAgICAgZWxzZSBpZiAoZG9jdW1lbnRbJ3NlbGVjdGlvbiddKSByZXR1cm4gZG9jdW1lbnRbJ3NlbGVjdGlvbiddLmNyZWF0ZVJhbmdlKCkudGV4dDtcblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldFRhcmdldEVsZW1lbnQodGFyZ2V0OiBhbnksIGVsPzogSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgaWYgKCF0YXJnZXQpIHJldHVybiBudWxsO1xuXG4gICAgICAgIHN3aXRjaCAodGFyZ2V0KSB7XG4gICAgICAgICAgICBjYXNlICdkb2N1bWVudCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50O1xuICAgICAgICAgICAgY2FzZSAnd2luZG93JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gd2luZG93O1xuICAgICAgICAgICAgY2FzZSAnQG5leHQnOlxuICAgICAgICAgICAgICAgIHJldHVybiBlbD8ubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgY2FzZSAnQHByZXYnOlxuICAgICAgICAgICAgICAgIHJldHVybiBlbD8ucHJldmlvdXNFbGVtZW50U2libGluZztcbiAgICAgICAgICAgIGNhc2UgJ0BwYXJlbnQnOlxuICAgICAgICAgICAgICAgIHJldHVybiBlbD8ucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgIGNhc2UgJ0BncmFuZHBhcmVudCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsPy5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSB0eXBlb2YgdGFyZ2V0O1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnb2JqZWN0JyAmJiB0YXJnZXQuaGFzT3duUHJvcGVydHkoJ25hdGl2ZUVsZW1lbnQnKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pc0V4aXN0KHRhcmdldC5uYXRpdmVFbGVtZW50KSA/IHRhcmdldC5uYXRpdmVFbGVtZW50IDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IGlzRnVuY3Rpb24gPSAob2JqOiBhbnkpID0+ICEhKG9iaiAmJiBvYmouY29uc3RydWN0b3IgJiYgb2JqLmNhbGwgJiYgb2JqLmFwcGx5KTtcbiAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gaXNGdW5jdGlvbih0YXJnZXQpID8gdGFyZ2V0KCkgOiB0YXJnZXQ7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKGVsZW1lbnQgJiYgZWxlbWVudC5ub2RlVHlwZSA9PT0gOSkgfHwgdGhpcy5pc0V4aXN0KGVsZW1lbnQpID8gZWxlbWVudCA6IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGlzQ2xpZW50KCkge1xuICAgICAgICByZXR1cm4gISEodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50ICYmIHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldEF0dHJpYnV0ZShlbGVtZW50LCBuYW1lKSB7XG4gICAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKG5hbWUpO1xuXG4gICAgICAgICAgICBpZiAoIWlzTmFOKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiArdmFsdWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gJ3RydWUnIHx8IHZhbHVlID09PSAnZmFsc2UnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlID09PSAndHJ1ZSc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBjYWxjdWxhdGVCb2R5U2Nyb2xsYmFyV2lkdGgoKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cuaW5uZXJXaWR0aCAtIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5vZmZzZXRXaWR0aDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGJsb2NrQm9keVNjcm9sbChjbGFzc05hbWUgPSAncC1vdmVyZmxvdy1oaWRkZW4nKSB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuc2V0UHJvcGVydHkoJy0tc2Nyb2xsYmFyLXdpZHRoJywgdGhpcy5jYWxjdWxhdGVCb2R5U2Nyb2xsYmFyV2lkdGgoKSArICdweCcpO1xuICAgICAgICB0aGlzLmFkZENsYXNzKGRvY3VtZW50LmJvZHksIGNsYXNzTmFtZSk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyB1bmJsb2NrQm9keVNjcm9sbChjbGFzc05hbWUgPSAncC1vdmVyZmxvdy1oaWRkZW4nKSB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUucmVtb3ZlUHJvcGVydHkoJy0tc2Nyb2xsYmFyLXdpZHRoJyk7XG4gICAgICAgIHRoaXMucmVtb3ZlQ2xhc3MoZG9jdW1lbnQuYm9keSwgY2xhc3NOYW1lKTtcbiAgICB9XG59XG4iXX0=