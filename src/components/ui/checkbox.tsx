import * as React from 'react';
import { Checkbox as CheckboxBase } from '@base-ui/react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CheckboxProps extends React.ComponentPropsWithoutRef<
  typeof CheckboxBase.Root
> {
  className?: string;
}

export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ className, ...props }, ref) => (
    <CheckboxBase.Root
      ref={ref}
      className={cn(
        'peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground flex items-center justify-center',
        className,
      )}
      {...props}
    >
      <CheckboxBase.Indicator>
        <Check className="h-3 w-3" />
      </CheckboxBase.Indicator>
    </CheckboxBase.Root>
  ),
);

Checkbox.displayName = 'Checkbox';
