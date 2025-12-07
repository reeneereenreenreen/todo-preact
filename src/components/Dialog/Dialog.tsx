import { h, FunctionComponent } from 'preact';
import { useRef, useEffect, useCallback, useId } from 'preact/hooks';
import Icon from '../Icon/Icon';
import './Dialog.css';
import { Button } from '../Button';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: preact.ComponentChildren;
  icon?: string;
  initiallyFocused?: string; // ID of element to focus when opened
}

const Dialog: FunctionComponent<DialogProps> = ({
  isOpen,
  onClose,
  title,
  children,
  icon,
  initiallyFocused
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const uniqueId = useId ? useId() : Math.random().toString(36).slice(2, 10); // fallback for older Preact

  const titleId = `dialog-title-${uniqueId}`;
  const descId = `dialog-description-${uniqueId}`;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
      const focusTarget = initiallyFocused
        ? dialog.querySelector(`#${initiallyFocused}`) as HTMLElement
        : dialog.querySelector(`#${titleId}, [data-autofocus]`) as HTMLElement;
      focusTarget?.focus();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen, initiallyFocused, titleId]);

  const handleCancel = useCallback((e: Event) => {
    e.preventDefault();
    onClose();
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      class="dialog"
      onClose={onClose}
      onCancel={handleCancel}
      aria-modal="true"
      aria-labelledby={title ? titleId : undefined}
      aria-describedby={descId}
    >
      <div class="dialog__content">
        {title && (
          <div class="dialog__header">
            <h2 class="dialog__title" id={titleId}>
              {icon && <Icon name={icon} />}
              {title}
            </h2>
            <Button
              icon="close"
              ariaLabel="Close dialog"
              variant="primary"
              appearance="ghost"
              onClick={onClose}
            />
          </div>
        )}

        <div class="dialog__body" id={descId}>
          {children}
        </div>
      </div>
    </dialog>
  );
};

export default Dialog;
