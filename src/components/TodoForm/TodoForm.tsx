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


const TodoForm: FunctionComponent<Props & { descriptionPlaceholder?: string, datePlaceholder?: string }> = ({
  onAdd,
  disabled,
  placeholder = 'Add new todo...',
  descriptionPlaceholder = 'Description (optional)',
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
        >Details</Button>
        <Dialog
          isOpen={isDialogOpen}
          onClose={() => setDialogOpen(false)}
          title="Add Details"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label>
              Description:
              <textarea
                value={description}
                onInput={e => setDescription((e.target as HTMLTextAreaElement).value)}
                placeholder={descriptionPlaceholder}
                disabled={disabled}
                rows={3}
                style={{ resize: 'vertical' }}
              ></textarea>
            </label>
            <label>
              Date:
              <input
                type="date"
                value={date}
                onInput={e => setDate((e.target as HTMLInputElement).value)}
                placeholder={datePlaceholder}
                disabled={disabled}
              />
            </label>
            <Button
              icon="enter"
              type="button"
              ariaLabel="Save details"
              variant="primary"
              appearance="solid"
              onClick={() => setDialogOpen(false)}
            >Save</Button>
          </div>
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
