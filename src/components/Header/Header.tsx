import { FunctionComponent } from 'preact'
import './Header.css'
import { Logo } from '@components/Logo';

const Header: FunctionComponent = () => {
    return (
        <header class="header">
            <Logo />
        </header>
    )
}

export default Header