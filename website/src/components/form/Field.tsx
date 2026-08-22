import type {
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
  InputHTMLAttributes,
} from "react";
import styles from "./Field.module.css";

/**
 * Builds the `aria-describedby` value for a control, listing only the
 * descriptions that are actually rendered.
 */
function describedBy(id: string, { hint, error }: { hint?: ReactNode; error?: string }) {
  const ids = [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean);
  return ids.length ? ids.join(" ") : undefined;
}

interface FieldShellProps {
  id: string;
  label: string;
  hint?: ReactNode;
  error?: string;
  required?: boolean;
  children: ReactNode;
  /** Rendered after the control, e.g. a character counter. */
  after?: ReactNode;
}

function FieldShell({ id, label, hint, error, required, children, after }: FieldShellProps) {
  return (
    <div className={styles.field}>
      <span className={styles.labelRow}>
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
        {/* Requirement is stated in words, not an asterisk or colour. */}
        <span className={styles.requirement}>{required ? "(required)" : "(optional)"}</span>
      </span>
      {hint ? (
        <p className={styles.hint} id={`${id}-hint`}>
          {hint}
        </p>
      ) : null}
      {children}
      {after}
      {error ? (
        <p className={styles.error} id={`${id}-error`}>
          <svg
            className={styles.errorIcon}
            viewBox="0 0 18 18"
            aria-hidden="true"
            focusable="false"
          >
            <circle cx="9" cy="9" r="8" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <path d="M9 4.6v5.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <circle cx="9" cy="12.8" r="1.05" fill="currentColor" />
          </svg>
          <span>
            <span className="visually-hidden">Error: </span>
            {error}
          </span>
        </p>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------- text input */

interface TextFieldProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "id" | "className" | "aria-invalid"
> {
  id: string;
  label: string;
  hint?: ReactNode;
  error?: string;
}

export function TextField({ id, label, hint, error, required, ...props }: TextFieldProps) {
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} required={required}>
      <input
        id={id}
        name={id}
        className={styles.control}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, { hint, error })}
        required={required}
        {...props}
      />
    </FieldShell>
  );
}

/* ---------------------------------------------------------------- select */

interface SelectFieldProps extends Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "id" | "className" | "aria-invalid"
> {
  id: string;
  label: string;
  hint?: ReactNode;
  error?: string;
  options: readonly { value: string; label: string }[];
  placeholderLabel: string;
}

export function SelectField({
  id,
  label,
  hint,
  error,
  required,
  options,
  placeholderLabel,
  ...props
}: SelectFieldProps) {
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} required={required}>
      <select
        id={id}
        name={id}
        className={styles.control}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, { hint, error })}
        required={required}
        {...props}
      >
        <option value="">{placeholderLabel}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}

/* -------------------------------------------------------------- textarea */

interface TextAreaFieldProps extends Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "id" | "className" | "aria-invalid"
> {
  id: string;
  label: string;
  hint?: ReactNode;
  error?: string;
  /** Shows a live character counter against this limit. */
  maxLength?: number;
  currentLength?: number;
}

export function TextAreaField({
  id,
  label,
  hint,
  error,
  required,
  maxLength,
  currentLength = 0,
  ...props
}: TextAreaFieldProps) {
  const over = maxLength !== undefined && currentLength > maxLength;

  return (
    <FieldShell
      id={id}
      label={label}
      hint={hint}
      error={error}
      required={required}
      after={
        maxLength !== undefined ? (
          /* Polite live region: a counter that interrupted on every keystroke
             would be unusable, so updates are announced only at rest. */
          <p
            className={[styles.counter, over ? styles.counterOver : ""].filter(Boolean).join(" ")}
            aria-live="polite"
          >
            {currentLength} of {maxLength} characters
          </p>
        ) : null
      }
    >
      <textarea
        id={id}
        name={id}
        className={styles.control}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, { hint, error })}
        required={required}
        {...props}
      />
    </FieldShell>
  );
}

/* -------------------------------------------------------------- checkbox */

interface CheckboxFieldProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "id" | "className" | "type" | "aria-invalid"
> {
  id: string;
  label: string;
  hint?: ReactNode;
  error?: string;
}

export function CheckboxField({ id, label, hint, error, required, ...props }: CheckboxFieldProps) {
  return (
    <div className={styles.checkboxField}>
      <label className={styles.checkboxRow} htmlFor={id}>
        <input
          id={id}
          name={id}
          type="checkbox"
          className={styles.checkbox}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, { hint, error })}
          required={required}
          {...props}
        />
        <span className={styles.checkboxLabel}>
          {label}{" "}
          <span className={styles.requirement}>{required ? "(required)" : "(optional)"}</span>
        </span>
      </label>
      {hint ? (
        <p className={styles.hint} id={`${id}-hint`}>
          {hint}
        </p>
      ) : null}
      {error ? (
        <p className={styles.error} id={`${id}-error`}>
          <svg
            className={styles.errorIcon}
            viewBox="0 0 18 18"
            aria-hidden="true"
            focusable="false"
          >
            <circle cx="9" cy="9" r="8" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <path d="M9 4.6v5.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <circle cx="9" cy="12.8" r="1.05" fill="currentColor" />
          </svg>
          <span>
            <span className="visually-hidden">Error: </span>
            {error}
          </span>
        </p>
      ) : null}
    </div>
  );
}

/* -------------------------------------------------------------- honeypot */

/**
 * Hidden bait field. Removed from the tab order and the accessibility tree, and
 * marked `autoComplete="off"` so a password manager will not fill it.
 */
export function HoneypotField({
  name,
  value,
  onChange,
  disabled,
}: {
  name: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}) {
  return (
    <div className={styles.honeypot} aria-hidden="true">
      <label htmlFor={name}>Leave this field empty</label>
      <input
        id={name}
        name={name}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
