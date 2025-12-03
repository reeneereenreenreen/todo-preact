// components/TodoList/TodoList.tsx
import { h, FunctionComponent } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { TodoForm } from '@components/TodoForm';
import { TodoSection } from '@components/TodoSection';
import './TodoList.css';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const TodoList: FunctionComponent = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('todos');
    if (saved) setTodos(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    setTodos([{ id: crypto.randomUUID(), text, completed: false }, ...todos]);
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const startEdit = (id: string, text: string) => {
    setEditingId(id);
    setEditText(text);
  };

  const updateTodo = (id: string, text: string) => {
    if (!text.trim()) {
      deleteTodo(id);
      return;
    }
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: text.trim() } : todo
    ));
    setEditingId(null);
    setEditText('');
  };

  const activeTodos = todos.filter(t => !t.completed);
  const doneTodos = todos.filter(t => t.completed);

  return (
    <div class="todo-list">
      <div class="todo-list__content">
        <h2 class="todo-list__title">My Todo List</h2>

        <TodoSection
          title={`Todo`}
          count={activeTodos.length}
          todos={activeTodos}
          editingId={editingId}
          editText={editText}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEditStart={startEdit}
          onUpdate={updateTodo}
          section="todo"
        />

        <TodoForm
          onAdd={addTodo}
          disabled={!!editingId}
          placeholder="A new todo..."
        />

        <TodoSection
          title={`Done`}
          count={doneTodos.length}
          todos={doneTodos}
          editingId={editingId}
          editText={editText}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEditStart={startEdit}
          onUpdate={updateTodo}
          section="done"
        />
      </div>
    </div>
  );
};

export default TodoList
