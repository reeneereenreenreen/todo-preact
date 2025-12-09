import { FunctionComponent } from 'preact';
import './Button.css';
import { Icon } from '../Icon';

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  label?: string;
  icon?: string;
  ariaLabel?: string;
  disabled?: boolean;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  appearance?: 'solid' | 'outlined' | 'ghost';
};

const Button: FunctionComponent<ButtonProps> = ({
  type = 'button',
  label,
  icon,
  ariaLabel,
  disabled,
  appearance = 'filled',
  onClick,
  variant = 'primary',
}) => {
  return (
    <button
      className={`button button--${variant} button--${appearance}`}
      aria-label={ariaLabel}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {icon && <Icon name={icon} />}
      {label}
    </button>
  );
};

export default Button;
