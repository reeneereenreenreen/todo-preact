import { FunctionComponent } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import './DarkmodeToggle.css';
import Icon from '../Icon/Icon';

const DarkmodeToggle: FunctionComponent = () => {
  const [theme, setTheme] = useState<'system' | 'dark' | 'light'>('system');

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') {
      setTheme(saved);
      document.documentElement.setAttribute('data-theme', saved);
    } else {
      setTheme('system');
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      document.documentElement.setAttribute(
        'data-theme',
        prefersDark ? 'dark' : 'light'
      );
    }
  }, []);

  const handleChange = (e: Event) => {
    const value = (e.target as HTMLInputElement).value as
      | 'system'
      | 'dark'
      | 'light';
    setTheme(value);
    if (value === 'system') {
      localStorage.removeItem('theme');
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      document.documentElement.setAttribute(
        'data-theme',
        prefersDark ? 'dark' : 'light'
      );
    } else {
      localStorage.setItem('theme', value);
      document.documentElement.setAttribute('data-theme', value);
    }
  };

  return (
    <div class="darkmode-toggle">
      <h3 class="darkmode-toggle__title">Theme</h3>
      <div class="darkmode-toggle__items">
        <div class="field field--radio">
          <input
            type="radio"
            name="theme"
            class="field__input"
            value="system"
            id="theme-system"
            checked={theme === 'system'}
            onChange={handleChange}
          />
          <label for="theme-system" class="field__label">
            <Icon name="computer" />
            System
          </label>
        </div>
        <div class="field field--radio">
          <input
            type="radio"
            name="theme"
            value="light"
            id="theme-light"
            checked={theme === 'light'}
            onChange={handleChange}
            class="field__input"
          />
          <label for="theme-light" class="field__label">
            <Icon name="sun" />
            Light
          </label>
        </div>
        <div class="field field--radio">
          <input
            type="radio"
            name="theme"
            value="dark"
            id="theme-dark"
            checked={theme === 'dark'}
            onChange={handleChange}
            class="field__input"
          />
          <label for="theme-dark" class="field__label">
            <Icon name="moon" />
            Dark
          </label>
        </div>
      </div>
    </div>
  );
};

export default DarkmodeToggle;
