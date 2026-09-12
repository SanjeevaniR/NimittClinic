'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn, initials } from '@/lib/utils';

interface DoctorAvatarProps {
  readonly src: string;
  readonly alt: string;
  readonly name: string;
  readonly size?: number;
  readonly className?: string;
  readonly rounded?: 'full' | 'card';
  readonly priority?: boolean;
  /** Fill the parent instead of using fixed dimensions. */
  readonly fill?: boolean;
  readonly sizes?: string;
}

/**
 * Doctor photograph with a graceful monogram fallback.
 *
 * The real photos are not in the repo yet, so a missing file must not render a
 * broken image on a clinic homepage — `onError` swaps in a plum/gold monogram
 * that looks intentional.
 */
export function DoctorAvatar({
  src,
  alt,
  name,
  size = 160,
  className,
  rounded = 'full',
  priority = false,
  fill = false,
  sizes,
}: DoctorAvatarProps) {
  const [failed, setFailed] = useState(false);
  const radius = rounded === 'full' ? 'rounded-full' : 'rounded-card';

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        style={fill ? undefined : { width: size, height: size }}
        className={cn(
          'from-plum-700 via-plum-800 to-plum-950 flex items-center justify-center bg-gradient-to-br',
          'ring-hairline-gold select-none',
          fill && 'absolute inset-0 h-full w-full',
          radius,
          className,
        )}
      >
        <span
          className="font-display text-gradient-gold font-bold"
          style={{ fontSize: fill ? '2.75rem' : Math.round(size * 0.34) }}
        >
          {initials(name)}
        </span>
      </div>
    );
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes ?? '(max-width: 768px) 90vw, 420px'}
        priority={priority}
        onError={() => setFailed(true)}
        className={cn('object-cover object-top', radius, className)}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      priority={priority}
      onError={() => setFailed(true)}
      className={cn('object-cover object-top', radius, className)}
    />
  );
}
