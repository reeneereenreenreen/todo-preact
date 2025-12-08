import { FunctionComponent } from 'preact';
import './Logo.css';
// import { Icon } from '../Icon'

const Logo: FunctionComponent = () => {
  return (
    <h1 class="logo">
      {/* @todo überflüssigen span entfernen */}
      <span class="logo__todo">
        <span class="logo__to">TO</span>
        <span class="logo__do">DO</span>
      </span>
    </h1>
  );
};

export default Logo;
