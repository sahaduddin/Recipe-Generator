
import React from 'react';

const ChefHatIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M5 21a2 2 0 0 1-2-2V12a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5z" />
    <path d="M6 10V8c0-2.21 1.79-4 4-4s4 1.79 4 4v2" />
    <path d="M14 10V8c0-1.1.9-2 2-2s2 .9 2 2v2" />
  </svg>
);

export default ChefHatIcon;
