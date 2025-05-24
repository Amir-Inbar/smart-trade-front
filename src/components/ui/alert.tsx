import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface AlertProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'destructive';
}

export function Alert({
  children,
  className,
  variant = 'default',
}: AlertProps) {
  return (
    <div
      className={cn(
        'relative w-full rounded-lg border p-4',
        variant === 'default' && 'bg-background text-foreground',
        variant === 'destructive' && 'border-destructive/50 text-destructive',
        className
      )}
    >
      {children}
    </div>
  );
}

interface AlertDescriptionProps {
  children: ReactNode;
  className?: string;
}

export function AlertDescription({
  children,
  className,
}: AlertDescriptionProps) {
  return (
    <div className={cn('text-sm [&_p]:leading-relaxed', className)}>
      {children}
    </div>
  );
}
