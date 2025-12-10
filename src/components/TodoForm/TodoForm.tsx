import { FunctionComponent } from 'preact';
import { useState } from 'preact/hooks';
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
          <label for="todo-input" class="field__label">
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
        <div class="field field--text">
          <label for="todo-description" class="field__label">
            <span class="sr-only">Description</span>
          </label>
          <input
            id="todo-description"
            type="text"
            class="field__input"
            value={description}
            autoComplete="off"
            onInput={(e: any) => setDescription(e.target.value)}
            placeholder={descriptionPlaceholder}
            disabled={disabled}
          />
        </div>
        <div class="field field--text">
          <label for="todo-date" class="field__label">
            <span class="sr-only">Date</span>
          </label>
          <input
            id="todo-date"
            type="date"
            class="field__input"
            value={date}
            autoComplete="off"
            onInput={(e: any) => setDate(e.target.value)}
            placeholder={datePlaceholder}
            disabled={disabled}
          />
        </div>

        <Button
          icon="enter"
          type="submit"
          ariaLabel="Add to todo list"
          disabled={!input.trim() || disabled}
          variant="primary"
          appearance="solid"
        />
      </div>
    </form>
  );
};

export default TodoForm;
