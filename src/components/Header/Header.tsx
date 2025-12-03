import { FunctionComponent } from 'preact'
import './Header.css'

import { Logo } from '@components/Logo';
import { DarkmodeToggle } from '@components/DarkmodeToggle';

const Header: FunctionComponent = () => {
    return (
        <header class="header">
            <div class="header__content">
                <Logo />
                <DarkmodeToggle />
            </div>
        </header>
    )
}

export default Header