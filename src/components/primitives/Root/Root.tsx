import React, { forwardRef } from 'react';
import { type BaseComponentProps } from '@components/types';

export interface RootProps extends BaseComponentProps {
  as?: React.ElementType;
  children?: React.ReactNode;
}

export const Root = forwardRef<HTMLElement, RootProps & Record<string, unknown>>(
  ({ as, className, testId, children, ...props }, ref) => {
    const Component = (as ?? 'div') as React.ElementType;
    return (
      <Component
        ref={ref as React.Ref<never>}
        data-atme-ui
        className={className}
        {...(testId !== undefined && { 'data-testid': testId })}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Root.displayName = 'Root';
