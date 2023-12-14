import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * Message service used in messages and toast components.
 * @group Service
 */
export class MessageService {
    messageSource = new Subject();
    clearSource = new Subject();
    messageObserver = this.messageSource.asObservable();
    clearObserver = this.clearSource.asObservable();
    /**
     * Inserts single message.
     * @param {Message} message - Message to be added.
     * @group Method
     */
    add(message) {
        if (message) {
            this.messageSource.next(message);
        }
    }
    /**
     * Insterts new messages.
     * @param {Message[]} messages - Messages to be added.
     * @group Method
     */
    addAll(messages) {
        if (messages && messages.length) {
            this.messageSource.next(messages);
        }
    }
    /**
     * Clears the message with the given key.
     * @param {string} key - Key of the message to be cleared.
     * @group Method
     */
    clear(key) {
        this.clearSource.next(key || null);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: MessageService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: MessageService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: MessageService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvYXBpL21lc3NhZ2VzZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQzs7QUFFL0I7OztHQUdHO0FBRUgsTUFBTSxPQUFPLGNBQWM7SUFDZixhQUFhLEdBQUcsSUFBSSxPQUFPLEVBQXVCLENBQUM7SUFDbkQsV0FBVyxHQUFHLElBQUksT0FBTyxFQUFpQixDQUFDO0lBRW5ELGVBQWUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3BELGFBQWEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ2hEOzs7O09BSUc7SUFDSCxHQUFHLENBQUMsT0FBZ0I7UUFDaEIsSUFBSSxPQUFPLEVBQUU7WUFDVCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNwQztJQUNMLENBQUM7SUFDRDs7OztPQUlHO0lBQ0gsTUFBTSxDQUFDLFFBQW1CO1FBQ3RCLElBQUksUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEVBQUU7WUFDN0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDckM7SUFDTCxDQUFDO0lBQ0Q7Ozs7T0FJRztJQUNILEtBQUssQ0FBQyxHQUFZO1FBQ2QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7dUdBakNRLGNBQWM7MkdBQWQsY0FBYzs7MkZBQWQsY0FBYztrQkFEMUIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE1lc3NhZ2UgfSBmcm9tICcuL21lc3NhZ2UnO1xuLyoqXG4gKiBNZXNzYWdlIHNlcnZpY2UgdXNlZCBpbiBtZXNzYWdlcyBhbmQgdG9hc3QgY29tcG9uZW50cy5cbiAqIEBncm91cCBTZXJ2aWNlXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNZXNzYWdlU2VydmljZSB7XG4gICAgcHJpdmF0ZSBtZXNzYWdlU291cmNlID0gbmV3IFN1YmplY3Q8TWVzc2FnZSB8IE1lc3NhZ2VbXT4oKTtcbiAgICBwcml2YXRlIGNsZWFyU291cmNlID0gbmV3IFN1YmplY3Q8c3RyaW5nIHwgbnVsbD4oKTtcblxuICAgIG1lc3NhZ2VPYnNlcnZlciA9IHRoaXMubWVzc2FnZVNvdXJjZS5hc09ic2VydmFibGUoKTtcbiAgICBjbGVhck9ic2VydmVyID0gdGhpcy5jbGVhclNvdXJjZS5hc09ic2VydmFibGUoKTtcbiAgICAvKipcbiAgICAgKiBJbnNlcnRzIHNpbmdsZSBtZXNzYWdlLlxuICAgICAqIEBwYXJhbSB7TWVzc2FnZX0gbWVzc2FnZSAtIE1lc3NhZ2UgdG8gYmUgYWRkZWQuXG4gICAgICogQGdyb3VwIE1ldGhvZFxuICAgICAqL1xuICAgIGFkZChtZXNzYWdlOiBNZXNzYWdlKSB7XG4gICAgICAgIGlmIChtZXNzYWdlKSB7XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VTb3VyY2UubmV4dChtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbnN0ZXJ0cyBuZXcgbWVzc2FnZXMuXG4gICAgICogQHBhcmFtIHtNZXNzYWdlW119IG1lc3NhZ2VzIC0gTWVzc2FnZXMgdG8gYmUgYWRkZWQuXG4gICAgICogQGdyb3VwIE1ldGhvZFxuICAgICAqL1xuICAgIGFkZEFsbChtZXNzYWdlczogTWVzc2FnZVtdKSB7XG4gICAgICAgIGlmIChtZXNzYWdlcyAmJiBtZXNzYWdlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZVNvdXJjZS5uZXh0KG1lc3NhZ2VzKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDbGVhcnMgdGhlIG1lc3NhZ2Ugd2l0aCB0aGUgZ2l2ZW4ga2V5LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSBLZXkgb2YgdGhlIG1lc3NhZ2UgdG8gYmUgY2xlYXJlZC5cbiAgICAgKiBAZ3JvdXAgTWV0aG9kXG4gICAgICovXG4gICAgY2xlYXIoa2V5Pzogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuY2xlYXJTb3VyY2UubmV4dChrZXkgfHwgbnVsbCk7XG4gICAgfVxufVxuIl19