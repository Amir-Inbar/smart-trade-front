import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface TypographyProps {
  children: ReactNode;
  className?: string;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'muted';
}

const variantStyles = {
  h1: 'text-4xl font-bold',
  h2: 'text-3xl font-bold',
  h3: 'text-2xl font-semibold',
  h4: 'text-xl font-semibold',
  h5: 'text-lg font-medium',
  h6: 'text-base font-medium',
  p: 'text-base',
  muted: 'text-sm text-muted-foreground',
};

export function Typography({
  children,
  className,
  variant = 'p',
}: TypographyProps) {
  if (variant === 'muted') {
    return <p className={cn(variantStyles.muted, className)}>{children}</p>;
  }

  const Component = variant as keyof JSX.IntrinsicElements;
  return (
    <Component className={cn(variantStyles[variant], className)}>
      {children}
    </Component>
  );
}
