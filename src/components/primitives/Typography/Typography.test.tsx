import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Typography } from './Typography';

describe('Typography', () => {
  it('renders correctly', () => {
    render(<Typography>Hello World</Typography>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('renders with variant', () => {
    render(<Typography variant="h1">Heading</Typography>);
    const heading = screen.getByText('Heading');
    expect(heading.tagName).toBe('H1');
    expect(heading).toHaveClass('typography--h1');
  });

  it('renders with custom as prop', () => {
    render(
      <Typography as="div" variant="h1">
        Custom Element
      </Typography>
    );
    const element = screen.getByText('Custom Element');
    expect(element.tagName).toBe('DIV');
  });

  it('renders with size', () => {
    render(<Typography size="lg">Large Text</Typography>);
    expect(screen.getByText('Large Text')).toHaveClass('typography--lg');
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLElement>();
    render(
      <Typography ref={ref} variant="h1">
        Ref Test
      </Typography>
    );
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.textContent).toBe('Ref Test');
  });

  it('applies custom className', () => {
    render(<Typography className="custom-class">Test</Typography>);
    expect(screen.getByText('Test')).toHaveClass('custom-class');
  });

  it('renders body variant as p by default', () => {
    render(<Typography variant="body">Body text</Typography>);
    expect(screen.getByText('Body text').tagName).toBe('P');
  });

  it('renders caption variant as span by default', () => {
    render(<Typography variant="caption">Caption text</Typography>);
    expect(screen.getByText('Caption text').tagName).toBe('SPAN');
  });
});

