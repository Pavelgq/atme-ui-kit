import React, { forwardRef, useState, useCallback } from 'react';
import cn from 'classnames';
import { BaseComponentProps } from '@components/types';
import { Typography } from '../Typography';
import { HeartIcon } from '../Icon/Icons';
import styles from './LikeButton.module.pcss';

export interface LikeButtonProps
  extends BaseComponentProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'children'> {
  liked?: boolean;
  defaultLiked?: boolean;
  count?: number;
  onLike?: (liked: boolean) => void;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const LikeButton = forwardRef<HTMLButtonElement, LikeButtonProps>(
  (
    {
      liked: likedProp,
      defaultLiked = false,
      count,
      onLike,
      onClick,
      className,
      testId,
      disabled,
      ...props
    },
    ref
  ) => {
    const isControlled = likedProp !== undefined;
    const [uncontrolledLiked, setUncontrolledLiked] = useState(defaultLiked);
    const [isPopping, setIsPopping] = useState(false);
    const [countBump, setCountBump] = useState(false);

    const liked = isControlled ? likedProp : uncontrolledLiked;

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (disabled) return;
        const nextLiked = !liked;
        if (!isControlled) setUncontrolledLiked(nextLiked);
        onLike?.(nextLiked);
        onClick?.(e);
        if (nextLiked) {
          setIsPopping(true);
          if (count !== undefined) setCountBump(true);
        }
      },
      [disabled, liked, isControlled, onLike, onClick, count]
    );

    const handleHeartAnimationEnd = useCallback(() => {
      setIsPopping(false);
    }, []);

    const handleCountAnimationEnd = useCallback((e: React.AnimationEvent<HTMLSpanElement>) => {
      e.stopPropagation();
      setCountBump(false);
    }, []);

    return (
      <button
        ref={ref}
        type="button"
        data-atme-ui
        className={cn(
          styles.likeButton,
          liked && styles['likeButton--liked'],
          isPopping && styles['likeButton--pop'],
          disabled && styles['likeButton--disabled'],
          className
        )}
        aria-pressed={liked}
        aria-label={liked ? 'Убрать лайк' : 'Поставить лайк'}
        disabled={disabled}
        data-testid={testId}
        onClick={handleClick}
        onAnimationEnd={handleHeartAnimationEnd}
        {...props}
      >
        <span className={styles.heartWrap}>
          <HeartIcon filled={liked} className={styles.heart} decorative />
        </span>
        {count !== undefined && (
          <span
            className={cn(styles.countWrap, countBump && styles['countWrap--bump'])}
            onAnimationEnd={handleCountAnimationEnd}
          >
            <Typography variant="caption" className={styles.count} as="span">
              {count}
            </Typography>
          </span>
        )}
      </button>
    );
  }
);

LikeButton.displayName = 'LikeButton';
