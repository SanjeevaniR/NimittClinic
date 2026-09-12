import Link from 'next/link';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { Icon, type IconName } from '@/components/icons';
import { cn } from '@/lib/utils';

export type ButtonVariant = 'primary' | 'plum' | 'outline' | 'ghost' | 'white' | 'whatsapp';
export type ButtonSize = 'sm' | 'md' | 'lg';

const base =
  'group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-pill font-display font-semibold tracking-tight transition-[transform,box-shadow,background-color,color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform active:translate-y-px disabled:pointer-events-none disabled:opacity-55';

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-gold-sweep text-plum-950 shadow-gold hover:-translate-y-0.5 hover:shadow-[0_14px_38px_-10px_rgb(212_175_55/0.7)]',
  plum: 'bg-plum-900 text-cream shadow-soft hover:-translate-y-0.5 hover:bg-plum-800 hover:shadow-lift',
  outline:
    'border-2 border-plum-900/25 text-plum-900 hover:-translate-y-0.5 hover:border-plum-900/50 hover:bg-plum-50',
  ghost: 'text-plum-900 hover:bg-plum-50',
  white:
    'bg-white/95 text-plum-900 shadow-soft hover:-translate-y-0.5 hover:bg-white hover:shadow-lift',
  whatsapp:
    'bg-[#25D366] text-white shadow-[0_8px_24px_-8px_rgb(37_211_102/0.7)] hover:-translate-y-0.5 hover:bg-[#1fb959]',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-[0.95rem]',
  lg: 'px-8 py-4 text-base sm:text-lg',
};

interface CommonProps {
  readonly children: ReactNode;
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  readonly className?: string;
  readonly icon?: IconName;
  readonly iconPosition?: 'left' | 'right';
  /** Animate the icon on hover — a nudge for arrows, nothing otherwise. */
  readonly nudgeIcon?: boolean;
  readonly fullWidth?: boolean;
}

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & { href?: undefined };

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

function Inner({
  children,
  icon,
  iconPosition,
  nudgeIcon,
  showSheen,
}: {
  children: ReactNode;
  icon?: IconName;
  iconPosition: 'left' | 'right';
  nudgeIcon: boolean;
  showSheen: boolean;
}) {
  const iconEl = icon ? (
    <Icon
      name={icon}
      size={18}
      className={cn(
        'shrink-0 transition-transform duration-300',
        nudgeIcon &&
          (iconPosition === 'right'
            ? 'group-hover/btn:translate-x-1'
            : 'group-hover/btn:-translate-x-1'),
      )}
    />
  ) : null;

  return (
    <>
      {/* Diagonal sheen that sweeps across on hover. */}
      {showSheen && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 ease-out group-hover/btn:translate-x-full"
        />
      )}
      {iconPosition === 'left' && iconEl}
      <span className="relative">{children}</span>
      {iconPosition === 'right' && iconEl}
    </>
  );
}

/**
 * One button for links and actions alike.
 * Internal `href` values route through `next/link`; anything starting with a
 * scheme (http, tel, mailto) renders a plain anchor with safe rel attributes.
 */
export function Button(props: ButtonProps) {
  const {
    children,
    variant = 'primary',
    size = 'md',
    className,
    icon,
    iconPosition = 'right',
    nudgeIcon = true,
    fullWidth = false,
  } = props;

  const classes = cn(base, variants[variant], sizes[size], fullWidth && 'w-full', className);

  const inner = (
    <Inner
      icon={icon}
      iconPosition={iconPosition}
      nudgeIcon={nudgeIcon && Boolean(icon)}
      showSheen={variant === 'primary' || variant === 'plum'}
    >
      {children}
    </Inner>
  );

  if (typeof props.href === 'string') {
    const {
      children: _c,
      variant: _v,
      size: _s,
      className: _cl,
      icon: _i,
      iconPosition: _ip,
      nudgeIcon: _n,
      fullWidth: _f,
      href,
      ...anchorRest
    } = props;

    // Scheme-prefixed hrefs are external destinations; everything else is a
    // route and goes through next/link for client-side navigation.
    if (/^(https?:|mailto:|tel:)/.test(href)) {
      const isHttp = href.startsWith('http');
      return (
        <a
          href={href}
          {...(isHttp ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className={classes}
          {...anchorRest}
        >
          {inner}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...anchorRest}>
        {inner}
      </Link>
    );
  }

  const {
    children: _c,
    variant: _v,
    size: _s,
    className: _cl,
    icon: _i,
    iconPosition: _ip,
    nudgeIcon: _n,
    fullWidth: _f,
    href: _h,
    type = 'button',
    ...buttonRest
  } = props;

  return (
    <button type={type} className={classes} {...buttonRest}>
      {inner}
    </button>
  );
}
