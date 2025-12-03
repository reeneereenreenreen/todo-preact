import { FunctionComponent } from 'preact'
import './Header.css'

import { Logo } from '@components/Logo';
import { DarkmodeToggle } from '@components/DarkmodeToggle';
import { Icon } from '../Icon';

const Header: FunctionComponent = () => {
    return (
        <header class="header">
            <div class="header__content">

        <span class="real-logo">
    <Icon name="check" size="lg" />
        </span>


                <Logo />
                <DarkmodeToggle />
            </div>
        </header>
    )
}

export default Header