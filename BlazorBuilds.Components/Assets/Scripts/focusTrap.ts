
const _tabFocusElements = "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, [tabindex='0'], [contenteditable]";

function setChildFocus(element: HTMLElement, toFirstChild: boolean, offset: number): void {

    if (!element) return;

    const tabbableChildren  = element.querySelectorAll<HTMLElement>(_tabFocusElements);
    const lastItemIndex     = tabbableChildren.length - 1;

    if (lastItemIndex < 1) return;

    const focusElement = (toFirstChild ? tabbableChildren[offset] : tabbableChildren[lastItemIndex - offset]) as HTMLElement;

    focusElement?.focus();
}
function keyDownHandler(event: KeyboardEvent) {
    const element = event.currentTarget as HTMLElement;

    if (!element) return;

    const tabKey = 9;
    const elementList = element.querySelectorAll<HTMLElement>(_tabFocusElements);
    const lastItemIndex = elementList.length - 1;

    if (lastItemIndex < 1) return;

    const startTrap = elementList[0];
    const endTrap = elementList[lastItemIndex];

    if (document.activeElement !== startTrap && document.activeElement !== endTrap) return;

    if (document.activeElement === endTrap && event.shiftKey) return;

    if (event.key === 'Tab' || event.keyCode === tabKey) {
        if (document.activeElement === startTrap && event.shiftKey) {
            event.preventDefault();
            endTrap.focus();
            return;
        }

        if (document.activeElement === endTrap && !event.shiftKey) {
            event.preventDefault();
            startTrap.focus();
        }
    }
}

function registerKeyboardEvent(focusTrap: HTMLElement) {

    focusTrap?.addEventListener("keydown", keyDownHandler);
}

function unregisterKeyboardEvent(focusTrap: HTMLElement) {

    focusTrap?.removeEventListener("keydown", keyDownHandler);
}

function registerFocusTrapEvents(focusTrap: HTMLElement): void {

    unregisterKeyboardEvent(focusTrap);
    registerKeyboardEvent(focusTrap);
}
function unregisterFocusTrapEvents(focusTrap: HTMLElement): void {

    unregisterKeyboardEvent(focusTrap);
}

export { setChildFocus, registerFocusTrapEvents, unregisterFocusTrapEvents };
