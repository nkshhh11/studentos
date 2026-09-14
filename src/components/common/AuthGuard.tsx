'use client';

import React from 'react';
import { useStudentOS } from '../../context/StudentOSContext';

interface AuthGuardProps {
  children: React.ReactNode;
  fallbackMessage?: string;
  className?: string;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  fallbackMessage = 'Please sign in to save and manage your personal Student OS.',
  className = '',
}) => {
  const { isAuthenticated, openAuthModal } = useStudentOS();

  const handleClick = (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault();
      e.stopPropagation();
      openAuthModal('Sign In Required', fallbackMessage);
    }
  };

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
};
