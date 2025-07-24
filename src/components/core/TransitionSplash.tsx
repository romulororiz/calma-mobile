import React, { useState } from 'react';
import SplashScreen from './SplashScreen';

interface TransitionSplashProps {
  children: React.ReactNode;
  shouldShow: boolean;
  onComplete: () => void;
  variant?: 'loading' | 'transition' | 'auth';
  duration?: number;
  message?: string;
}

const TransitionSplash: React.FC<TransitionSplashProps> = ({
  children,
  shouldShow,
  onComplete,
  variant = 'transition',
  duration = 1500,
  message,
}) => {
  if (shouldShow) {
    return (
      <SplashScreen
        variant={variant}
        duration={duration}
        onAnimationComplete={onComplete}
        showLogo={true}
        showText={true}
      />
    );
  }

  return <>{children}</>;
};

export default TransitionSplash;
