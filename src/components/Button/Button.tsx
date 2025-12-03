import { FunctionComponent } from 'preact'
import './Button.css'

type ButtonProps = {
    label: string
    onClick?: () => void
    variant?: 'primary' | 'secondary' | 'ghost'
}

const Button: FunctionComponent<ButtonProps> = ({
    label,
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
        </button>
    )
}

export default Button