import React from 'react';
import { clsx } from 'clsx';

interface CardProps {
  className?: string;
  children: React.ReactNode;
  variant?: 'default' | 'glass' | 'elevated';
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  className,
  children,
  variant = 'default',
  onClick
}) => {
  const baseClasses = 'rounded-card p-6 transition-all duration-300';

  const variantClasses = {
    default: 'bg-white shadow-md hover:shadow-lg',
    glass: 'glass shadow-3d hover:shadow-3d-hover hover:scale-[1.02]',
    elevated: 'bg-white shadow-3d hover:shadow-3d-hover hover:scale-[1.02]'
  };

  return (
    <div
      className={clsx(baseClasses, variantClasses[variant], onClick && 'cursor-pointer', className)}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
