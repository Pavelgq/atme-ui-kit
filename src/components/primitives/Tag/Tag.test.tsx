import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tag } from './Tag';

describe('Tag', () => {
  it('renders correctly', () => {
    render(<Tag>Tag content</Tag>);
    expect(screen.getByText('Tag content')).toBeInTheDocument();
  });

  it('renders with variant', () => {
    render(<Tag variant="success">Success tag</Tag>);
    const tag = screen.getByText('Success tag').closest('[data-atme-ui]');
    expect(tag).toBeInTheDocument();
    expect(tag!.className).toMatch(/tag--success/);
  });

  it('renders with size', () => {
    render(<Tag size="lg">Large tag</Tag>);
    const tag = screen.getByText('Large tag').closest('[data-atme-ui]');
    expect(tag).toBeInTheDocument();
    expect(tag!.className).toMatch(/tag--lg/);
  });

  it('renders with icon on left', () => {
    render(
      <Tag icon={<span data-testid="icon">★</span>} iconPosition="left">
        With icon
      </Tag>
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    const icon = screen.getByTestId('icon');
    expect(icon.parentElement?.previousElementSibling).toBeNull();
  });

  it('renders with icon on right', () => {
    render(
      <Tag icon={<span data-testid="icon">★</span>} iconPosition="right">
        With icon
      </Tag>
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders closeable tag', () => {
    render(<Tag closeable>Closeable tag</Tag>);
    expect(screen.getByLabelText('Close tag')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();
    render(
      <Tag closeable onClose={handleClose}>
        Closeable tag
      </Tag>
    );
    const closeButton = screen.getByLabelText('Close tag');
    await user.click(closeButton);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<Tag ref={ref}>Ref test</Tag>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    expect(ref.current?.textContent).toContain('Ref test');
  });

  it('applies custom className', () => {
    render(<Tag className="custom-class">Test</Tag>);
    const tag = screen.getByText('Test').closest('[data-atme-ui]');
    expect(tag).toBeInTheDocument();
    expect(tag).toHaveClass('custom-class');
  });
});

