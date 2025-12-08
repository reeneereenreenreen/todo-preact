import { FunctionComponent } from 'preact';
import './Header.css';
import Logo from '../Logo/Logo';

const Header: FunctionComponent = () => {
  return (
    <header class="header">
      <Logo />
    </header>
  );
};

export default Header;
