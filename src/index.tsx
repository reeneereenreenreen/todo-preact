import { render } from 'preact';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { ClickBurst } from './components/ClickBurst';
import './css/settings.css';
import './css/reset.css';
import './css/font.css';
import './css/style.css';
import './css/field-checkbox.css';

export function App() {
  return (
    <main class="main">
      <ClickBurst />
      <Header />
      <TodoList />
    </main>
  );
}

render(<App />, document.getElementById('app'));
