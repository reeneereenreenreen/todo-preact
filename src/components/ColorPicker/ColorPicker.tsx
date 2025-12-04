import { FunctionComponent } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import './ColorPicker.css';

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
        document.documentElement.style.setProperty('--color-primary', selectedColor);
        localStorage.setItem(LOCAL_STORAGE_KEY, selectedColor);
    }, [selectedColor]);

    return (
        <div class="color-picker">
            <h3 class="color-picker__title">Primary Color</h3>
            <div class="color-picker__items">
                {colors.map((color) => (
                    <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        aria-label={`Select color ${color}`}
                        style={{
                            backgroundColor: color,
                            border: color === selectedColor ? '3px solid var(--color-primary)' : '2px solid #ddd',
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            cursor: 'pointer',
                            outline: 'none',
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default ColorPicker;
