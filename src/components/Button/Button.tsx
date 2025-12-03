import { FunctionComponent } from 'preact'
import './Button.css'
import { Icon } from '../Icon'

type ButtonProps = {
    // @todo add aria-label support
    label?: string
    icon?: string
    onClick?: () => void
    variant?: 'primary' | 'secondary' | 'ghost'
}

const Button: FunctionComponent<ButtonProps> = ({
    label,
    icon,
    onClick,
        variant = 'primary',
    }) => {

    return (
        <button
            className={`button button--${variant}`}
            type="button"
            onClick={onClick}
            >
            {label}
            <Icon name={icon} />
        </button>
    )
}

export default Button