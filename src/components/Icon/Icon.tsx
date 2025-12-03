// components/Icon/Icon.tsx
import { FunctionComponent, JSX } from 'preact';
import { SVGAttributes } from 'preact';
import './Icon.css';

interface IconProps extends SVGAttributes<SVGSVGElement> {
  name: string;
  size?: number | string;
}

const Icon: FunctionComponent<IconProps> = ({
  name,
  // size = 24,
  // color = 'currentColor',
  // class: className,
  ...props
}) => {

  const icons: Record<string, JSX.Element> = {
  //   home: (
  //     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  //       <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
  //       <polyline points="9 22 9 12 15 12 15 22"/>
  //     </svg>
  //   ),
  //   user: (
  //     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  //       <circle cx="12" cy="7" r="4"/>
  //       <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
  //     </svg>
  //   ),
    trash: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="3 6 5 6 21 6"/>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
        <line x1="10" y1="11" x2="10" y2="17"/>
        <line x1="14" y1="11" x2="14" y2="17"/>
      </svg>
    ),
    check: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    ),
    plus: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="12" y1="5" x2="12" y2="19"/>
        <line x1="5" y1="12" x2="19" y2="12"/>
      </svg>
    ),
    'chevron-down': (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="6 9 12 15 18 9"/>
      </svg>
    ),
  //   edit: (
  //     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  //       <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
  //       <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  //     </svg>
  //   ),
  //   sun: (
  //     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  //       <circle cx="12" cy="12" r="5"/>
  //       <line x1="12" y1="1" x2="12" y2="3"/>
  //       <line x1="12" y1="21" x2="12" y2="23"/>
  //       <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
  //       <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
  //       <line x1="1" y1="12" x2="3" y2="12"/>
  //       <line x1="21" y1="12" x2="23" y2="12"/>
  //       <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
  //       <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  //     </svg>
  //   ),
  //   moon: (
  //     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  //       <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  //     </svg>
  //   ),
  //   menu: (
  //     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  //       <line x1="3" y1="12" x2="21" y2="12"/>
  //       <line x1="3" y1="6" x2="21" y2="6"/>
  //       <line x1="3" y1="18" x2="21" y2="18"/>
  //     </svg>
  //   ),
  //   close: (
  //     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  //       <line x1="18" y1="6" x2="6" y2="18"/>
  //       <line x1="6" y1="6" x2="18" y2="18"/>
  //     </svg>
  //   ),
  };

  const CurrentIcon = icons[name as keyof typeof icons];

  if (!CurrentIcon) {
    return <span class={`icon icon-${name}`} title={`Icon ${name} not found`} />;
  }

  // FIXED: Render directly, don't use as component
  return (
    <span class={`icon icon-${name}`} role="img" aria-hidden="true">
      {CurrentIcon}
    </span>
  );
};

export default Icon;
