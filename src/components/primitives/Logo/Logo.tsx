import React, { forwardRef, useCallback, useRef } from 'react';
import cn from 'classnames';
import { Root } from '@components/primitives/Root';
import { BaseComponentProps } from '@components/types';
import keyClickUrl from './assets/button-click-clear-soft.mp3';
import styles from './Logo.module.pcss';

export type LogoVariant = 'wordmark' | 'mark' | 'lockup' | 'keyboard';
export type LogoSize = 'sm' | 'md' | 'lg' | 'xl';
export type LogoTone = 'primary' | 'mono' | 'inverse';

export interface LogoProps
  extends BaseComponentProps,
    Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  variant?: LogoVariant;
  size?: LogoSize;
  tone?: LogoTone;
  animated?: boolean;
  sound?: boolean;
  soundVolume?: number;
  title?: string;
  href?: string;
  as?: React.ElementType;
}

const KEYBOARD_KEYS: ReadonlyArray<{ label: string; tone: 'd' | 'e' | 'v' | 'dot' | 'l' | 'a' | 'b' }> = [
  { label: 'D', tone: 'd' },
  { label: 'e', tone: 'e' },
  { label: 'v', tone: 'v' },
  { label: '.', tone: 'dot' },
  { label: 'l', tone: 'l' },
  { label: 'a', tone: 'a' },
  { label: 'b', tone: 'b' },
];

const AUDIO_POOL_SIZE = 6;

export const Logo = forwardRef<HTMLElement, LogoProps>(
  (
    {
      variant = 'wordmark',
      size = 'md',
      tone = 'primary',
      animated = true,
      sound = false,
      soundVolume = 0.4,
      title = 'Dev.lab',
      href,
      as,
      className,
      testId,
      ...props
    },
    ref
  ) => {
    const Component = (as ?? (href ? 'a' : 'span')) as React.ElementType;
    const extraProps: Record<string, unknown> = href ? { href } : {};

    const showMark = variant === 'mark' || variant === 'lockup';
    const showWord = variant === 'wordmark' || variant === 'lockup';
    const showKeyboard = variant === 'keyboard';

    const audioPoolRef = useRef<HTMLAudioElement[] | null>(null);
    const audioIndexRef = useRef(0);

    const playClickSound = useCallback(() => {
      if (!sound || typeof window === 'undefined' || typeof Audio === 'undefined') return;

      let pool = audioPoolRef.current;
      if (!pool) {
        pool = Array.from({ length: AUDIO_POOL_SIZE }, () => {
          const audio = new Audio(keyClickUrl);
          audio.preload = 'auto';
          audio.volume = soundVolume;
          return audio;
        });
        audioPoolRef.current = pool;
      }

      const audio = pool[audioIndexRef.current];
      audioIndexRef.current = (audioIndexRef.current + 1) % AUDIO_POOL_SIZE;

      if (audio) {
        audio.volume = soundVolume;
        audio.currentTime = 0;
        // Autoplay-policy может заблокировать звук до user-gesture; mouseenter — это и есть gesture,
        // но в Storybook docs page возможны странные кейсы — ловим тихо.
        void audio.play().catch(() => undefined);
      }
    }, [sound, soundVolume]);

    const handleKeyMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLSpanElement>) => {
        const node = e.currentTarget;
        const pressedClass = styles.keyPressed;
        if (pressedClass) {
          node.classList.remove(pressedClass);
          void node.offsetWidth;
          node.classList.add(pressedClass);
        }
        playClickSound();
      },
      [playClickSound]
    );

    return (
      <Root
        ref={ref}
        as={Component}
        className={cn(
          styles.root,
          styles[`root--${variant}`],
          styles[`root--size-${size}`],
          styles[`root--tone-${tone}`],
          animated && styles.animated,
          className
        )}
        role="img"
        aria-label={title}
        testId={testId}
        {...extraProps}
        {...props}
      >
        {showMark && (
          <span className={styles.mark} aria-hidden="true">
            <span className={cn(styles.markPixel, styles.markPixelTL)} />
            <span className={cn(styles.markPixel, styles.markPixelTR)} />
            <span className={cn(styles.markPixel, styles.markPixelBL)} />
            <span className={cn(styles.markPixel, styles.markPixelBR)} />
            <span className={styles.markGlyph}>D</span>
          </span>
        )}

        {showWord && (
          <span className={styles.wordmark} aria-hidden="true">
            <span className={styles.wordPrimary}>Dev</span>
            <span className={styles.wordDot}>
              <span className={styles.wordDotInner} />
              <span className={styles.wordDotGlow} />
            </span>
            <span className={styles.wordSecondary}>lab</span>
          </span>
        )}

        {showKeyboard && (
          <span
            className={cn(styles.keyboard, animated && styles.keyboardPlaying)}
            aria-hidden="true"
          >
            {KEYBOARD_KEYS.map(({ label, tone: keyTone }, idx) => (
              <span
                key={`${keyTone}-${idx}`}
                className={cn(
                  styles.key,
                  styles[`key--${keyTone}`],
                  keyTone === 'dot' && styles.keyAccent
                )}
                onMouseEnter={handleKeyMouseEnter}
              >
                <span className={styles.keyCap}>
                  <span className={styles.keyLabel}>{label}</span>
                </span>
              </span>
            ))}
          </span>
        )}
      </Root>
    );
  }
);

Logo.displayName = 'Logo';
