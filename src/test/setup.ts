import '@testing-library/jest-dom';

// INFO: The error occurs because the Dialog component likely uses the HTMLDialogElement API, which is not fully supported by jsdom (used by @testing-library/preact); you can mock the showModal and close methods on HTMLDialogElement to fix this.

// Mock HTMLDialogElement for jsdom
class MockDialogElement extends HTMLElement {
  open = false;
  returnValue = '';
  inert = false;

  showModal() {
    this.open = true;
    this.inert = true;
    this.dispatchEvent(
      new Event('close', { bubbles: false, cancelable: false })
    );
  }

  close(returnValue?: string) {
    this.open = false;
    this.inert = false;
    this.returnValue = returnValue || '';
    this.dispatchEvent(
      new Event('close', { bubbles: false, cancelable: false })
    );
  }
}

// Add to global scope
Object.defineProperty(window, 'HTMLDialogElement', {
  value: MockDialogElement,
  writable: true,
});

// Polyfill ::backdrop if needed
Object.defineProperty(HTMLElement.prototype, 'showModal', {
  value() {
    (this as any).open = true;
  },
  writable: true,
});
Object.defineProperty(HTMLElement.prototype, 'close', {
  value() {
    (this as any).open = false;
  },
  writable: true,
});
