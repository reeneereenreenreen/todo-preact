// components/TodoItem/TodoItem.tsx
import { h, FunctionComponent } from 'preact';
import './TodoItem.css';

import { Button } from '@components/Button';
import { Icon } from '@components/Icon';
// import Icon from '@components/Icon'; // default export

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface Props {
  todo: Todo;
  editingId: string | null;
  editText: string;
  onToggle: () => void;
  onDelete: () => void;
  onEditStart: () => void;
  onUpdate: (text: string) => void;
  section: 'todo' | 'done';
}

const TodoItem: FunctionComponent<Props> = ({
  todo,
  editingId,
  editText,
  onToggle,
  onDelete,
  onEditStart,
  onUpdate,
  section,
}) => {
  const isEditing = editingId === todo.id;

  return (
    // <li class="todo-item" draggable={!isEditing}>
    <li class="todo-item">
      <div class="field field--checkbox">
        <input
          type="checkbox"
          id={`todo-${todo.id}`}
          checked={todo.completed}
          onClick={onToggle}
          disabled={isEditing}
          class="field__control"
        />
        <label for={`todo-${todo.id}`} class="field__label">
          <span class="field__icon">
            <Icon name="check" />
          </span>
          <span class="sr-only">
            {section === 'done' ? 'Not done' : 'Make it done'}
          </span>
        </label>
      </div>
      {isEditing ? (
        <input
          autoFocus
          value={editText}
          // onInput={(e: any) => onUpdate(e.target.value)}
          onBlur={(e: any) => onUpdate(e.target.value)}
          onKeyDown={(e: any) => {
            if (e.key === 'Enter') onUpdate(e.target.value);
            if (e.key === 'Escape') onEditStart();
          }}
        />
      ) : (
        <span
          class={todo.completed ? 'completed' : ''}
          onDblClick={onEditStart}
        >
          {todo.text}
        </span>
      )}
      {/* <button class="button button--ghost button--delete" onClick={onDelete}>×</button> */}

			<Button
        icon="trash"
				onClick={onDelete}
				variant="danger"
        appearance="ghost"
				/>
    </li>
  );
};

export default TodoItem;
