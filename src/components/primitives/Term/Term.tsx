import React from 'react';
import cn from 'classnames';
import { Root } from '../Root';
import { type BaseComponentProps } from '@components/types';
import styles from './Term.module.pcss';

export interface TermProps extends BaseComponentProps {
  definition: string;
  children: React.ReactNode;
}

export function Term({ definition, children, className, testId }: TermProps) {
  return (
    <Root as="span" className={cn(styles.wrapper, className)} testId={testId}>
      <abbr className={styles.term} title={definition}>
        {children}
      </abbr>
    </Root>
  );
}

Term.displayName = 'Term';
