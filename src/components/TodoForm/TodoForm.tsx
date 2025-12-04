// components/TodoForm/TodoForm.tsx
import { h, FunctionComponent } from 'preact';
import { useState } from 'preact/hooks';
import './TodoForm.css';

import { Button } from '@components/Button';
import { Dialog } from '@components/Dialog';
import { DarkmodeToggle } from '@components/DarkmodeToggle';
import { ColorPicker } from '@components/ColorPicker';

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
          <label for="todo-input" class="field__label sr-only">Add a new todo</label>
          <input
            id="todo-input"
            class="field__input"
            value={input}
            autocomplete="off"
            onInput={(e: any) => setInput(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
          />
        </div>
        {/* <button type="submit" aria-label="Add to todo list" disabled={!input.trim() || disabled}>
          +
        </button> */}

        <Button
          icon="plus"
          type="submit"
          ariaLabel="Add to todo list"
          disabled={!input.trim() || disabled}
          variant="primary"
          appearance="ghost"
          />
        <Button
          icon="dots-vertical"
          ariaLabel="oPEN Menu"
          variant="primary"
          appearance="ghost"
          onClick={() => setIsOpen(true)}
        />
      </div>




      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Preferences"
        size="lg"
        // initiallyFocused="name-input"
      >
        <DarkmodeToggle />
        <ColorPicker />
      </Dialog>



    </form>
  );
};

export default TodoForm;
