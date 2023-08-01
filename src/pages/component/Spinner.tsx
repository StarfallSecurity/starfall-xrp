import React from 'react';

interface SpinnerProps {
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 20, color = '#2563eb', style }) => {
  const spinnerStyle: React.CSSProperties = {
    border: `2px solid ${color}`,
    borderTop: '2px solid transparent',
    borderRadius: '50%',
    width: `${size}px`,
    height: `${size}px`,
    animation: 'spin 1s linear infinite',
    ...style
  };

  return <div className="animate-spin" style={spinnerStyle} />;
};

export default Spinner;
