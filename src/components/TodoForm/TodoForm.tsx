// components/TodoForm/TodoForm.tsx
import { h, FunctionComponent } from 'preact';
import { useState } from 'preact/hooks';
import './TodoForm.css';

interface Props {
  onAdd: (text: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

const TodoForm: FunctionComponent<Props> = ({ onAdd, disabled, placeholder = "Add new todo..." }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (input.trim()) {
      onAdd(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} class="todo-form">
      <div class="field">
        <label for="todo-input" class="field__label sr-only">Add a new todo</label>
        <input
          id="todo-input"
          class="field__input"
          value={input}
          onInput={(e: any) => setInput(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
        />
      </div>
      <button type="submit" aria-label="Add to todo list" disabled={!input.trim() || disabled}>
        +
      </button>
    </form>
  );
};

export default TodoForm;
