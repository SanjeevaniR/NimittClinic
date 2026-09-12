'use client';

import {
  forwardRef,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from 'react';
import { Icon } from '@/components/icons';
import { cn } from '@/lib/utils';

const controlBase =
  'w-full rounded-2xl border-2 bg-white px-4 py-3 text-[0.95rem] text-ink shadow-sm transition-colors duration-200 placeholder:text-ink-soft/45 focus:outline-none disabled:cursor-not-allowed disabled:bg-mist';

const controlTone = {
  normal: 'border-plum-100 focus:border-plum-400',
  invalid: 'border-red-400/70 focus:border-red-500',
} as const;

interface FieldShellProps {
  readonly id: string;
  readonly label: string;
  readonly hint?: string;
  readonly error?: string;
  readonly required?: boolean;
  readonly children: ReactNode;
  readonly className?: string;
}

/** Label + control + hint/error, wired up with the right aria attributes. */
export function FieldShell({
  id,
  label,
  hint,
  error,
  required,
  children,
  className,
}: FieldShellProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={id} className="text-plum-900 text-sm font-semibold">
        {label}
        {required && (
          <span className="text-gold-600 ml-1" aria-hidden>
            *
          </span>
        )}
      </label>

      {children}

      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className="flex items-center gap-1.5 text-sm font-medium text-red-600"
        >
          <Icon name="alert" size={14} />
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${id}-hint`} className="text-ink-soft/75 text-xs">
            {hint}
          </p>
        )
      )}
    </div>
  );
}

/* ------------------------------- Input ------------------------------- */

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  readonly invalid?: boolean;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
  { className, invalid, ...rest },
  ref,
) {
  return (
    <input
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(controlBase, controlTone[invalid ? 'invalid' : 'normal'], className)}
      {...rest}
    />
  );
});

/* ------------------------------ Textarea ----------------------------- */

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  readonly invalid?: boolean;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  { className, invalid, rows = 5, ...rest },
  ref,
) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      aria-invalid={invalid || undefined}
      className={cn(
        controlBase,
        controlTone[invalid ? 'invalid' : 'normal'],
        'resize-y',
        className,
      )}
      {...rest}
    />
  );
});

/* ------------------------------- Select ------------------------------ */

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  readonly invalid?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { className, invalid, children, ...rest },
  ref,
) {
  return (
    <div className="relative">
      <select
        ref={ref}
        aria-invalid={invalid || undefined}
        className={cn(
          controlBase,
          controlTone[invalid ? 'invalid' : 'normal'],
          'cursor-pointer appearance-none pr-11',
          className,
        )}
        {...rest}
      >
        {children}
      </select>
      <Icon
        name="chevron-down"
        size={18}
        className="text-plum-500 pointer-events-none absolute top-1/2 right-4 -translate-y-1/2"
      />
    </div>
  );
});

/* ------------------------------ Honeypot ----------------------------- */

/**
 * Off-screen decoy field. Bots that fill every input get rejected server-side;
 * `aria-hidden` + `tabIndex={-1}` keep it away from real users entirely.
 */
export const HoneypotField = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function HoneypotField(props, ref) {
    return (
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company-website">Company website</label>
        <input
          ref={ref}
          id="company-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...props}
        />
      </div>
    );
  },
);
