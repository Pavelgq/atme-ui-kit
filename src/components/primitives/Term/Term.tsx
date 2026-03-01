import React, { useState, useRef, useEffect } from "react";
import cn from "classnames";
import { Root } from "../Root";
import { BaseComponentProps } from "@components/types";
import styles from "./Term.module.pcss";

const HOVER_DELAY_MS = 300;
const VIEWPORT_PADDING = 8;
const GAP = 4;

export interface TermProps extends BaseComponentProps {
  definition: string;
  tooltipWidth?: number | string;
  children: React.ReactNode;
}

export function Term({ definition, tooltipWidth, children, className, testId }: TermProps) {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<{ top: number; left: number } | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLSpanElement>(null);

  const clearTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const updatePosition = () => {
    const wrapper = wrapperRef.current;
    const tooltip = tooltipRef.current;
    if (!wrapper || !tooltip) return;

    const wr = wrapper.getBoundingClientRect();
    const tr = tooltip.getBoundingClientRect();
    const maxLeft = window.innerWidth - tr.width - VIEWPORT_PADDING;
    const maxTop = window.innerHeight - tr.height - VIEWPORT_PADDING;

    let top = wr.top - tr.height - GAP;
    if (top < VIEWPORT_PADDING) {
      top = wr.bottom + GAP;
    }
    top = Math.max(VIEWPORT_PADDING, Math.min(top, maxTop));

    let left = wr.left + wr.width / 2 - tr.width / 2;
    left = Math.max(VIEWPORT_PADDING, Math.min(left, maxLeft));

    setPlacement({ top, left });
  };

  useEffect(() => {
    if (!open) {
      setPlacement(null);
      return;
    }
    updatePosition();
    const onUpdate = () => updatePosition();
    window.addEventListener("scroll", onUpdate, true);
    window.addEventListener("resize", onUpdate);
    return () => {
      window.removeEventListener("scroll", onUpdate, true);
      window.removeEventListener("resize", onUpdate);
    };
  }, [open, definition]);

  const handleEnter = () => {
    clearTimer();
    timeoutRef.current = setTimeout(() => setOpen(true), HOVER_DELAY_MS);
  };

  const handleLeave = () => {
    clearTimer();
    setOpen(false);
  };

  const tooltipStyle: React.CSSProperties = {
    ...(tooltipWidth != null
      ? { maxWidth: typeof tooltipWidth === "number" ? `${tooltipWidth}px` : tooltipWidth }
      : {}),
    ...(placement
      ? {
          position: "fixed",
          top: placement.top,
          left: placement.left,
          transform: "none",
          bottom: "auto",
        }
      : {}),
  };

  return (
    <Root
      ref={wrapperRef as React.Ref<HTMLSpanElement>}
      as="span"
      className={cn(styles.wrapper, className)}
      testId={testId}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <abbr className={styles.term} title={definition}>
        {children}
      </abbr>
      {open && (
        <span
          ref={tooltipRef}
          className={cn(styles.tooltip, placement == null && styles.tooltipMeasure)}
          role="tooltip"
          style={tooltipStyle}
        >
          {definition}
        </span>
      )}
    </Root>
  );
}

Term.displayName = "Term";
