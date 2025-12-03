import { FunctionComponent } from 'preact'
import './Header.css'

import { Logo } from '@components/Logo';
import { DarkmodeToggle } from '@components/DarkmodeToggle';
import { Icon } from '../Icon';
import Button from '../Button/Button';
import { Dialog } from '../Dialog';
import { useState } from 'preact/compat';

const Header: FunctionComponent = () => {

const [isOpen, setIsOpen] = useState(false);

    return (
        <header class="header">
            <div class="header__content">
                {/* @todo auslagern */}
                <span class="real-logo">
                    <Icon name="check" size="lg" />
                </span>
                <Logo />


                <Button
                    icon="dots-vertical"
                    ariaLabel="oPEN Menu"
                    variant="primary"
                    appearance="ghost"
                    onClick={() => setIsOpen(true)}
                />

      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Dialog Title"
        size="lg"
        // initiallyFocused="name-input"
      >
        <form>
                      <button
              type="button"
              onClick={() => setIsOpen(false)}
              style={{ padding: '0.5rem 1rem' }}
            >
              Cancel
            </button>
        </form>
        <DarkmodeToggle />
      </Dialog>
            </div>
        </header>
    )
}

export default Header