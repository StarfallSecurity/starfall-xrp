import moment from 'moment';
import resolveConfig from 'tailwindcss/resolveConfig';

export const tailwindConfig = () => {
  // Tailwind config
  return resolveConfig('./src/css/tailwind.config.js');
};

export const hexToRGB = (h) => {
  let r = 0;
  let g = 0;
  let b = 0;
  if (h.length === 4) {
    r = `0x${h[1]}${h[1]}`;
    g = `0x${h[2]}${h[2]}`;
    b = `0x${h[3]}${h[3]}`;
  } else if (h.length === 7) {
    r = `0x${h[1]}${h[2]}`;
    g = `0x${h[3]}${h[4]}`;
    b = `0x${h[5]}${h[6]}`;
  }
  return `${+r},${+g},${+b}`;
};

export const formatValue = (value) =>
  Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumSignificantDigits: 3,
    notation: 'compact'
  }).format(value);

export const formatThousands = (value) =>
  Intl.NumberFormat('en-US', {
    maximumSignificantDigits: 3,
    notation: 'compact'
  }).format(value);

export const getFormattedDate = (date) => {
  return moment(date).format('DD/MM/YYYY');
};

export const typeColor = (type) => {
  switch (type) {
    case 'warning':
      return 'amber-500';
    case 'error':
      return 'rose-500';
    case 'success':
      return 'emerald-500';
    default:
      return 'indigo-500';
  }
};

export const typeIcon = (type) => {
  switch (type) {
    case 'warning':
      return (
        <svg
          className={`w-6 h-6 shrink-0 fill-${typeColor(type)} opacity-80 mt-[3px] mr-3`}
          viewBox="0 0 16 16"
        >
          <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z" />
        </svg>
      );
    case 'error':
      return (
        <svg
          className={`w-6 h-6 shrink-0 fill-${typeColor(type)} opacity-80 mt-[3px] mr-3`}
          viewBox="0 0 16 16"
        >
          <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm3.5 10.1l-1.4 1.4L8 9.4l-2.1 2.1-1.4-1.4L6.6 8 4.5 5.9l1.4-1.4L8 6.6l2.1-2.1 1.4 1.4L9.4 8l2.1 2.1z" />
        </svg>
      );
    case 'success':
      return (
        <svg
          className={`w-6 h-6 shrink-0 fill-${typeColor(type)} opacity-80 mt-[3px] mr-3`}
          viewBox="0 0 16 16"
        >
          <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM7 11.4L3.6 8 5 6.6l2 2 4-4L12.4 6 7 11.4z" />
        </svg>
      );
    default:
      return (
        <svg
          className={`w-6 h-6 shrink-0 fill-${typeColor(type)} opacity-80 mt-[3px] mr-3`}
          viewBox="0 0 16 16"
        >
          <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm1 12H7V7h2v5zM8 6c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" />
        </svg>
      );
  }
};
