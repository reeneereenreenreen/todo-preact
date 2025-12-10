import { FunctionComponent } from 'preact';
import './Logo.css';

const Logo: FunctionComponent = () => {
  return (
    <h1 class="logo">
      <span
        class="octopus"
        onClick={(e) => {
          const target = e.currentTarget as HTMLElement;
          target.classList.add('octopus--clicked');
          setTimeout(() => {
            target.classList.remove('octopus--clicked');
          }, 600);
        }}
      >
        <span class="octopus__spots">
          <span class="octopus__spot octopus__spot--1" />
          <span class="octopus__spot octopus__spot--2" />
          <span class="octopus__spot octopus__spot--3" />
          <span class="octopus__spot octopus__spot--4" />
        </span>
        <span class="octopus__body">
          <span class="octopus__head">
            <span class="octopus__eyes">
              <span class="octopus__eye octopus__eye--left" />
              <span class="octopus__eye octopus__eye--right" />
            </span>
            <span class="octopus__mouth" />
          </span>
          <span class="octopus__logo">
            <span class="logo__todo">
              <span class="logo__to">TO</span>
              <span class="logo__do">DO</span>
            </span>
          </span>
          <span class="octopus__arms octopus__arms--left">
            <span class="octopus__arm octopus__arm--left-back-1" />
            <span class="octopus__arm octopus__arm--left-back-2" />
            <span class="octopus__arm octopus__arm--left-front-1" />
            <span class="octopus__arm octopus__arm--left-front-2" />
          </span>
          <span class="octopus__arms octopus__arms--right">
            <span class="octopus__arm octopus__arm--right-back-1" />
            <span class="octopus__arm octopus__arm--right-back-2" />
            <span class="octopus__arm octopus__arm--right-front-1" />
            <span class="octopus__arm octopus__arm--right-front-2" />
          </span>
        </span>
      </span>
    </h1>
  );
};

export default Logo;
