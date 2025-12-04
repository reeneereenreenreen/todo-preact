import { FunctionComponent } from 'preact'
import './Header.css'

import { Logo } from '@components/Logo';
// import { DarkmodeToggle } from '@components/DarkmodeToggle';
// import { Icon } from '../Icon';
// import Button from '../Button/Button';
// import { Dialog } from '../Dialog';
// import { useState } from 'preact/compat';
// import { ColorPicker } from '../ColorPicker';

const Header: FunctionComponent = () => {
    return (
        <header class="header">
            {/* <div class="header__content"> */}
                <Logo />
            {/* </div> */}
        </header>
    )
}

export default Header