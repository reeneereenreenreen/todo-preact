import { render } from 'preact';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { ClickBurst } from './components/ClickBurst';
import './css/settings.css';
import './css/reset.css';
import './css/font.css';
import './css/style.css';
import './css/field-text.css';
import './css/field-checkbox.css';
import './css/field-radio.css';
import './css/field-switch.css';
import './css/field-select.css';
import './css/field-textarea.css';
import './css/field-date.css';

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

// Ensure fade-in triggers after mount/paint
window.requestAnimationFrame(() => {
  document.body.classList.remove('app-not-ready');
});
