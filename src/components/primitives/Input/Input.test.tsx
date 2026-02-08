import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "./Input";

describe("Input", () => {
  it("renders correctly", () => {
    render(<Input placeholder="Введите текст" />);
    expect(screen.getByPlaceholderText("Введите текст")).toBeInTheDocument();
  });

  it("renders with size", () => {
    const { container } = render(<Input size="lg" placeholder="Large" />);
    const wrapper = container.querySelector('[class*="wrapper--lg"]');
    expect(wrapper).toBeInTheDocument();
  });

  it("renders with fullWidth", () => {
    const { container } = render(<Input fullWidth placeholder="Full" />);
    const wrapper = container.querySelector('[class*="wrapper--fullWidth"]');
    expect(wrapper).toBeInTheDocument();
  });

  it("renders with startIcon", () => {
    render(
      <Input startIcon={<span data-testid="start-icon">★</span>} placeholder="With icon" />
    );
    expect(screen.getByTestId("start-icon")).toBeInTheDocument();
  });

  it("renders with endIcon", () => {
    render(
      <Input endIcon={<span data-testid="end-icon">★</span>} placeholder="With icon" />
    );
    expect(screen.getByTestId("end-icon")).toBeInTheDocument();
  });

  it("renders with error state", () => {
    const { container } = render(<Input error placeholder="Error" />);
    const wrapper = container.querySelector('[class*="wrapper--error"]');
    expect(wrapper).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Error")).toHaveAttribute("aria-invalid", "true");
  });

  it("is disabled when disabled prop is true", () => {
    render(<Input disabled placeholder="Disabled" />);
    expect(screen.getByPlaceholderText("Disabled")).toBeDisabled();
  });

  it("passes value and onChange", async () => {
    const handleChange = vi.fn();
    render(<Input placeholder="Test" onChange={handleChange} />);
    const input = screen.getByPlaceholderText("Test");
    await userEvent.type(input, "a");
    expect(handleChange).toHaveBeenCalled();
    expect(input).toHaveValue("a");
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} placeholder="Ref test" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current?.getAttribute("placeholder")).toBe("Ref test");
  });

  it("applies custom className to input", () => {
    render(<Input className="custom-input" placeholder="Test" />);
    expect(screen.getByPlaceholderText("Test")).toHaveClass("custom-input");
  });

  it("supports aria-label", () => {
    render(<Input placeholder="P" aria-label="Поиск" />);
    expect(screen.getByLabelText("Поиск")).toBeInTheDocument();
  });

  it("supports errorMessageId for aria-describedby", () => {
    render(
      <>
        <Input error placeholder="Err" errorMessageId="err-msg" aria-label="Field" />
        <span id="err-msg">Error text</span>
      </>
    );
    expect(screen.getByLabelText("Field")).toHaveAttribute("aria-describedby", "err-msg");
  });

  it("default type is text", () => {
    render(<Input placeholder="Test" />);
    expect(screen.getByPlaceholderText("Test")).toHaveAttribute("type", "text");
  });

  it("allows type override", () => {
    render(<Input type="email" placeholder="Email" />);
    expect(screen.getByPlaceholderText("Email")).toHaveAttribute("type", "email");
  });
});
