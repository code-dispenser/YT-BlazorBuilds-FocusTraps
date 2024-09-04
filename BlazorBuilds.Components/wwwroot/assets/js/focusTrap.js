const _tabFocusElements = "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, [tabindex='0'], [contenteditable]";
function setChildFocus(element, toFirstChild, offset) {
    if (!element)
        return;
    const tabbableChildren = element.querySelectorAll(_tabFocusElements);
    const lastItemIndex = tabbableChildren.length - 1;
    if (lastItemIndex < 1)
        return;
    const focusElement = (toFirstChild ? tabbableChildren[offset] : tabbableChildren[lastItemIndex - offset]);
    focusElement === null || focusElement === void 0 ? void 0 : focusElement.focus();
}
function keyDownHandler(event) {
    const element = event.currentTarget;
    if (!element)
        return;
    const tabKey = 9;
    const elementList = element.querySelectorAll(_tabFocusElements);
    const lastItemIndex = elementList.length - 1;
    if (lastItemIndex < 1)
        return;
    const startTrap = elementList[0];
    const endTrap = elementList[lastItemIndex];
    if (document.activeElement !== startTrap && document.activeElement !== endTrap)
        return;
    if (document.activeElement === endTrap && event.shiftKey)
        return;
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
function registerKeyboardEvent(focusTrap) {
    focusTrap === null || focusTrap === void 0 ? void 0 : focusTrap.addEventListener("keydown", keyDownHandler);
}
function unregisterKeyboardEvent(focusTrap) {
    focusTrap === null || focusTrap === void 0 ? void 0 : focusTrap.removeEventListener("keydown", keyDownHandler);
}
function registerFocusTrapEvents(focusTrap) {
    unregisterKeyboardEvent(focusTrap);
    registerKeyboardEvent(focusTrap);
}
function unregisterFocusTrapEvents(focusTrap) {
    unregisterKeyboardEvent(focusTrap);
}
export { setChildFocus, registerFocusTrapEvents, unregisterFocusTrapEvents };
//# sourceMappingURL=focusTrap.js.map