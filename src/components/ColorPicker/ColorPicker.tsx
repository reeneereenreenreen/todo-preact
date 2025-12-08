import { FunctionComponent } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import './ColorPicker.css';
import { Icon } from '../Icon';

const defaultColors = [
  '#ef4444', // red
  '#f59e0b', // amber
  '#10b981', // emerald
  '#3b82f6', // blue
  '#8b5cf6', // violet
  '#ec4899', // pink
];

interface ColorPickerProps {
  colors?: string[];
  initialColor?: string;
}

const LOCAL_STORAGE_KEY = 'color-picker-selected-color';

const ColorPicker: FunctionComponent<ColorPickerProps> = ({
  colors = defaultColors,
  initialColor = colors[0],
}) => {
  const getInitialColor = () => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored && colors.includes(stored) ? stored : initialColor;
  };

  const [selectedColor, setSelectedColor] = useState(getInitialColor);

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--color-primary',
      selectedColor
    );
    localStorage.setItem(LOCAL_STORAGE_KEY, selectedColor);
  }, [selectedColor]);

  return (
    <div class="color-picker">
      <h3 class="color-picker__title">Primary Color</h3>
      <ul class="color-picker__items">
        {colors.map((color) => (
          <li class="color-picker__item" key={color}>
            <button
              onClick={() => setSelectedColor(color)}
              aria-label={`Select color ${color}`}
              class={`color-picker__button${color === selectedColor ? ' is-selected' : ''}`}
              style={{
                backgroundColor: color,
              }}
            >
              <Icon name="check" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ColorPicker;
