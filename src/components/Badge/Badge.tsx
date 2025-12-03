import { FunctionComponent } from 'preact'
import './Badge.css'

type BadgeProps = {
    label: string
    variant?: 'primary' | 'secondary'
}

const Badge: FunctionComponent<BadgeProps> = ({
    label,
    variant = 'primary',
    }) => {

    return (
        <span
            className={`badge badge--${variant}`}
            >
            {label}
        </span>
    )
}

export default Badge