// components/Dialog/Dialog.tsx
import { h, FunctionComponent, RefObject } from 'preact';
import { useRef, useEffect, useCallback } from 'preact/hooks';
import Icon from '../Icon/Icon';
import './Dialog.css';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: preact.ComponentChildren;
  closeOnBackdrop?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  initiallyFocused?: string; // ID of element to focus when opened
}

const Dialog: FunctionComponent<DialogProps> = ({
  isOpen,
  onClose,
  title,
  children,
  closeOnBackdrop = true,
  size = 'md',
  initiallyFocused
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  // Sync isOpen state with native dialog
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
      // Focus initial element or title
      const focusTarget = initiallyFocused
        ? dialog.querySelector(`#${initiallyFocused}`) as HTMLElement
        : dialog.querySelector('h2, [data-autofocus]') as HTMLElement;
      focusTarget?.focus();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen, initiallyFocused]);

  // Focus trapping
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    const focusableElements = dialog.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;

    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable.focus();
      }
    }
  }, []);

  // Close on Escape
  const handleCancel = useCallback((e: Event) => {
    e.preventDefault();
    onClose();
  }, [onClose]);

  // Close on backdrop click
  const handleBackdropClick = useCallback((e: MouseEvent) => {
    if (e.target === backdropRef.current && closeOnBackdrop) {
      onClose();
    }
  }, [closeOnBackdrop, onClose]);

  return (
    <dialog
      ref={dialogRef}
      class={`dialog ${size}`}
      onKeyDown={handleKeyDown}
      onClose={onClose}
      onCancel={handleCancel}
      aria-modal="true"
      aria-labelledby={title ? 'dialog-title' : undefined}
      aria-describedby="dialog-description"
    >
      {/* Backdrop for click handling */}
      <div
        ref={backdropRef}
        class="dialog-backdrop"
        onClick={handleBackdropClick}
      />

      <div class="dialog-content">
        {title && (
          <div class="dialog-header">
            <h2 id="dialog-title">{title}</h2>
            <button
              class="dialog-close"
              onClick={onClose}
              aria-label="Close dialog"
            >
              <Icon name="close" size={20} />
            </button>
          </div>
        )}

        <div class="dialog-body" id="dialog-description">
          {children}
        </div>
      </div>
    </dialog>
  );
};

export default Dialog;
