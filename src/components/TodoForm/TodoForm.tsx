// components/TodoForm/TodoForm.tsx
import { h, FunctionComponent } from 'preact';
import { useState } from 'preact/hooks';
import './TodoForm.css';

import { Button } from '@components/Button';
import { Icon } from '../Icon';

interface Props {
  onAdd: (text: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

const TodoForm: FunctionComponent<Props> = ({ onAdd, disabled, placeholder = "Add new todo..." }) => {
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: Event) => {
    e.preventDefault();

    if (input.trim()) {
      onAdd(input);
      setInput('');
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
            autocomplete="off"
            onInput={(e: any) => setInput(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
          />
        </div>

        <Button
          icon="enter"
          type="submit"
          ariaLabel="Add to todo list"
          disabled={!input.trim() || disabled}
          variant="primary"
          appearance="ghost"
          />
      </div>
    </form>
  );
};

export default TodoForm;
