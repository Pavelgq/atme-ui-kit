import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Icon } from './Icon';

describe('Icon', () => {
  it('renders correctly with children', () => {
    render(
      <Icon name="Test icon">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </Icon>
    );
    const svg = screen.getByRole('img');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('aria-label', 'Test icon');
  });

  it('renders with default viewBox', () => {
    render(
      <Icon name="Test icon">
        <circle cx="12" cy="12" r="10" />
      </Icon>
    );
    const svg = screen.getByRole('img');
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
  });

  it('renders with custom viewBox', () => {
    render(
      <Icon name="Test icon" viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="15" />
      </Icon>
    );
    const svg = screen.getByRole('img');
    expect(svg).toHaveAttribute('viewBox', '0 0 32 32');
  });

  it('renders with custom color', () => {
    render(
      <Icon name="Test icon" color="#ff0000">
        <circle cx="12" cy="12" r="10" />
      </Icon>
    );
    const svg = screen.getByRole('img');
    expect(svg).toHaveAttribute('color', '#ff0000');
  });

  it('renders with default color (currentColor)', () => {
    render(
      <Icon name="Test icon">
        <circle cx="12" cy="12" r="10" />
      </Icon>
    );
    const svg = screen.getByRole('img');
    expect(svg).toHaveAttribute('color', 'currentColor');
  });

  it('renders decorative icon (hidden from screen readers)', () => {
    const { container } = render(
      <Icon decorative>
        <circle cx="12" cy="12" r="10" />
      </Icon>
    );
    const svg = container.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg!).toHaveAttribute('aria-hidden', 'true');
    expect(svg!).not.toHaveAttribute('aria-label');
  });

  it('renders non-decorative icon with name', () => {
    render(
      <Icon name="Test icon" decorative={false}>
        <circle cx="12" cy="12" r="10" />
      </Icon>
    );
    const svg = screen.getByRole('img');
    expect(svg).toHaveAttribute('aria-label', 'Test icon');
    expect(svg).not.toHaveAttribute('aria-hidden', 'true');
  });

  it('renders with svg prop (custom SVG string)', () => {
    const customSvg = '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#ff0000"/></svg>';
    render(<Icon svg={customSvg} name="Custom icon" />);
    const svg = screen.getByRole('img');
    expect(svg).toBeInTheDocument();
    expect(svg.getAttribute('class')).toMatch(/icon--custom/);
  });

  it('forwards ref', () => {
    const ref = React.createRef<SVGSVGElement>();
    render(
      <Icon ref={ref} name="Test icon">
        <circle cx="12" cy="12" r="10" />
      </Icon>
    );
    expect(ref.current).toBeInstanceOf(SVGSVGElement);
    expect(ref.current?.tagName).toBe('svg');
  });

  it('applies custom className', () => {
    render(
      <Icon className="custom-class" name="Test icon">
        <circle cx="12" cy="12" r="10" />
      </Icon>
    );
    const svg = screen.getByRole('img');
    expect(svg).toHaveClass('custom-class');
  });

  it('applies default fill prop', () => {
    render(
      <Icon name="Test icon">
        <circle cx="12" cy="12" r="10" />
      </Icon>
    );
    const svg = screen.getByRole('img');
    expect(svg).toHaveAttribute('fill', 'none');
  });

  it('applies custom fill prop', () => {
    render(
      <Icon name="Test icon" fill="currentColor">
        <circle cx="12" cy="12" r="10" />
      </Icon>
    );
    const svg = screen.getByRole('img');
    expect(svg).toHaveAttribute('fill', 'currentColor');
  });

  it('applies default xmlns', () => {
    render(
      <Icon name="Test icon">
        <circle cx="12" cy="12" r="10" />
      </Icon>
    );
    const svg = screen.getByRole('img');
    expect(svg).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg');
  });

  it('passes through additional SVG props', () => {
    render(
      <Icon name="Test icon" width="32" height="32">
        <circle cx="12" cy="12" r="10" />
      </Icon>
    );
    const svg = screen.getByRole('img');
    expect(svg).toHaveAttribute('width', '32');
    expect(svg).toHaveAttribute('height', '32');
  });
});

