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
            <span className="badge__label">{label}</span>
        </span>
    )
}

export default Badge