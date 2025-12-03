// components/TodoSection/TodoSection.tsx
import { h, FunctionComponent } from 'preact';
import { TodoItem } from '@components/TodoItem';
import { Badge } from '@components/Badge';
import './TodoSection.css';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface Props {
  title: string;
  count: number;
  todos: Todo[];
  editingId: string | null;
  editText: string;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEditStart: (id: string, text: string) => void;
  onUpdate: (id: string, text: string) => void;
  section: 'todo' | 'done';
}

const TodoSection: FunctionComponent<Props> = (props) => {
  return (
    <div
      class="todo-section"
      // onDragOver={(e) => e.preventDefault()}
    >
      <h3 class="todo-section__title">{props.title} <Badge label={String(props.count)} /></h3>

      <ul class="todo-section__items">
        {props.todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            editingId={props.editingId}
            editText={props.editText}
            onToggle={() => props.onToggle(todo.id)}
            onDelete={() => props.onDelete(todo.id)}
            onEditStart={() => props.onEditStart(todo.id, todo.text)}
            onUpdate={(text) => props.onUpdate(todo.id, text)}
            section={props.section}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoSection;
