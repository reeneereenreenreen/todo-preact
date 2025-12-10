import { FunctionComponent } from 'preact';
import './Logo.css';

const Logo: FunctionComponent = () => {
  return (
    <h1 class="logo">
      {/* @todo überflüssigen span entfernen */}
      {/* <span class="logo__todo">
        <span class="logo__to">TO</span>
        <span class="logo__do">DO</span>
      </span> */}
      <div class="octopus">
        <div class="octopus__spots">
          <div class="octopus__spot octopus__spot--1"></div>
          <div class="octopus__spot octopus__spot--2"></div>
          <div class="octopus__spot octopus__spot--3"></div>
          <div class="octopus__spot octopus__spot--4"></div>
        </div>
        <div class="octopus__body">
          <div class="octopus__head">
            <div class="octopus__eyes">
              <div class="octopus__eye octopus__eye--left"></div>
              <div class="octopus__eye octopus__eye--right"></div>
            </div>
            <div class="octopus__mouth"></div>
          </div>
          <div class="octopus__logo">
            <span class="logo__todo">
              <span class="logo__to">TO</span>
              <span class="logo__do">DO</span>
            </span>
          </div>
          <div class="octopus__arms octopus__arms--left">
            <div class="octopus__arm octopus__arm--left-back-1"></div>
            <div class="octopus__arm octopus__arm--left-back-2"></div>
            <div class="octopus__arm octopus__arm--left-front-1"></div>
            <div class="octopus__arm octopus__arm--left-front-2"></div>
          </div>

          <div class="octopus__arms octopus__arms--right">
            <div class="octopus__arm octopus__arm--right-back-1"></div>
            <div class="octopus__arm octopus__arm--right-back-2"></div>
            <div class="octopus__arm octopus__arm--right-front-1"></div>
            <div class="octopus__arm octopus__arm--right-front-2"></div>
          </div>
        </div>
      </div>
    </h1>
  );
};

export default Logo;
