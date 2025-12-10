import { FunctionComponent } from 'preact';
import { useState } from 'preact/hooks';
import Dialog from '../Dialog/Dialog';
import './TodoForm.css';

import Button from '../Button/Button';
import { Icon } from '../Icon';

interface Props {
  onAdd: (text: string, description?: string, date?: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

const TodoForm: FunctionComponent<
  Props & { descriptionPlaceholder?: string; datePlaceholder?: string }
> = ({
  onAdd,
  disabled,
  placeholder = 'Add new todo...',
  descriptionPlaceholder = 'My new todo ...',
  datePlaceholder = 'Date (optional)',
}) => {
  const [input, setInput] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleSubmit = (e: Event) => {
    e.preventDefault();

    if (input.trim()) {
      onAdd(input, description, date);
      setInput('');
      setDescription('');
      setDate('');
    }
  };

  return (
    <form onSubmit={handleSubmit} class="todo-form">
      <div class="field-group">
        <div class="field field--text">
          <label for="todo-input" class="field__label sr-only">
            <Icon name="plus" />
            <span class="sr-only">Add a new todo</span>
          </label>
          <input
            id="todo-input"
            type="text"
            class="field__input"
            value={input}
            autoComplete="off"
            onInput={(e: any) => setInput(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
          />
        </div>
        <div class="todo-form__actions">
          <Button
            icon="dots-vertical"
            type="button"
            ariaLabel="Edit description and date"
            disabled={!input.trim() || disabled}
            variant="primary"
            appearance="ghost"
            onClick={() => setDialogOpen(true)}
          >
            Details
          </Button>
          <Dialog
            isOpen={isDialogOpen}
            onClose={() => setDialogOpen(false)}
            title="Optional Details"
            icon="edit"
          >
            <div class="field field--textarea">
              <label for="todo-description" class="field__label">
                Description
              </label>
              <textarea
                value={description}
                onInput={(e) =>
                  setDescription((e.target as HTMLTextAreaElement).value)
                }
                placeholder={descriptionPlaceholder}
                disabled={disabled}
                rows={3}
                id="todo-description"
                class="field__control"
                // style={{ resize: 'vertical' }}
              ></textarea>
            </div>

            <div class="field field--date">
              <label for="todo-date" class="field__label">
                Date
              </label>
              <div class="field__body">
                <input
                  type="date"
                  value={date}
                  id="todo-date"
                  class="field__control"
                  onInput={(e) => setDate((e.target as HTMLInputElement).value)}
                  placeholder={datePlaceholder}
                  disabled={disabled}
                  ref={(input) => {
                    (window as any).todoDateInput = input;
                  }}
                />
                <Button
                  icon="datepicker"
                  type="button"
                  ariaLabel="Open date picker"
                  variant="primary"
                  appearance="solid"
                  onClick={() => {
                    const input = (window as any)
                      .todoDateInput as HTMLInputElement | null;
                    if (input) {
                      if (typeof input.showPicker === 'function') {
                        input.showPicker();
                      } else {
                        input.focus();
                      }
                    }
                  }}
                >
                  Select date
                </Button>
              </div>
            </div>

            <Button
              icon="enter"
              type="submit"
              label="Add to todo list"
              variant="primary"
              appearance="solid"
              onClick={() => setDialogOpen(false)}
            >
              Save
            </Button>
          </Dialog>
          <Button
            icon="enter"
            type="submit"
            ariaLabel="Add to todo list"
            disabled={!input.trim() || disabled}
            variant="primary"
            appearance="solid"
          />
        </div>
      </div>
    </form>
  );
};

export default TodoForm;
