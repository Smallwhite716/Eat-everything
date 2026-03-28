import { ReactNode, useEffect, useState } from 'react';

interface AnimatePageProps {
  children: ReactNode;
}

export function AnimatePage({ children }: AnimatePageProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 触发入场动画
    requestAnimationFrame(() => {
      setIsVisible(true);
    });
  }, []);

  return (
    <div
      className={`h-full transition-all duration-300 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4'
      }`}
    >
      {children}
    </div>
  );
}
