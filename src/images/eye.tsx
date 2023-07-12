import React, { SVGProps } from 'react';

interface IconProps extends SVGProps<SVGSVGElement> {
  // Additional props, if any
}

const EyeIcon: React.FC<IconProps> = ({ className, ...rest }) => (
  <svg
    className={`h-5 w-5 ${className}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    {...rest}
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

export default EyeIcon;
