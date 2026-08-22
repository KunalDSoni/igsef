"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Notice } from "@/components/ui/Notice";
import { routes } from "@/config/site";
import { trackEvent } from "@/lib/analytics";
import {
  ENQUIRY_TYPES,
  FIELD_LABELS,
  FIELD_ORDER,
  HONEYPOT_FIELD,
  LIMITS,
  type EnquiryErrors,
  type EnquiryField,
  type EnquiryResponse,
  type EnquiryResultCode,
  hasErrors,
  validateEnquiry,
} from "@/lib/enquiry/schema";
import { CheckboxField, HoneypotField, SelectField, TextAreaField, TextField } from "./Field";
import styles from "./EnquiryForm.module.css";

/**
 * Adult-only enquiry form.
 *
 * Delivery availability is decided on the server and passed in, so the browser
 * never guesses. Three modes:
 *
 * - `unavailable`: no provider is configured. Controls are disabled and an
 *   honest explanation replaces the call to action. Nothing can be submitted.
 * - `demo`: a mocked adapter is enabled for testing. A prominent, unmistakable
 *   banner says submissions are not delivered.
 * - `live`: a real endpoint is configured.
 */
export type EnquiryDeliveryMode = "unavailable" | "demo" | "live";

interface EnquiryFormProps {
  mode: EnquiryDeliveryMode;
  /** Preselects a routing category, e.g. "partnership" on Partner With Us. */
  defaultEnquiryType?: string;
  /** Response-time wording. Omitted while no SLA has been agreed. */
  responseSla?: string | null;
  /** A monitored public address, when one has been approved. */
  alternativeEmail?: string | null;
}

const EMPTY_VALUES = {
  enquiryType: "",
  name: "",
  email: "",
  organisation: "",
  role: "",
  subject: "",
  message: "",
  adultConfirmation: false,
  honeypot: "",
};

type Values = typeof EMPTY_VALUES;

type Phase = "editing" | "submitting" | "succeeded" | "failed";

export function EnquiryForm({
  mode,
  defaultEnquiryType = "",
  responseSla = null,
  alternativeEmail = null,
}: EnquiryFormProps) {
  const uid = useId().replace(/[:]/g, "");
  const fieldId = (field: EnquiryField) => `${uid}-${field}`;

  const [values, setValues] = useState<Values>({
    ...EMPTY_VALUES,
    enquiryType: defaultEnquiryType,
  });
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [phase, setPhase] = useState<Phase>("editing");
  const [failureCode, setFailureCode] = useState<EnquiryResultCode | null>(null);
  const [reference, setReference] = useState<string | null>(null);
  const [startedTracked, setStartedTracked] = useState(false);

  const summaryRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const disabled = mode === "unavailable" || phase === "submitting";

  function update<K extends keyof Values>(key: K, value: Values[K]) {
    setValues((current) => ({ ...current, [key]: value }));

    /* Clear a field's error as soon as the visitor starts correcting it. */
    if (key !== "honeypot" && errors[key as EnquiryField]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[key as EnquiryField];
        return next;
      });
    }

    if (!startedTracked) {
      setStartedTracked(true);
      trackEvent("form_start", { form_type: "enquiry" });
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (mode === "unavailable" || phase === "submitting") return;

    const validationErrors = validateEnquiry(values);

    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      setPhase("editing");
      setFailureCode(null);
      /* Move focus to the summary so the failure is announced and the first
         problem is one Tab away. Entered values are left untouched. */
      requestAnimationFrame(() => summaryRef.current?.focus());
      trackEvent("form_error", {
        form_type: "enquiry",
        error_code: "client_validation",
        field_count: Object.keys(validationErrors).length,
      });
      return;
    }

    setErrors({});
    setPhase("submitting");
    setFailureCode(null);

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...values, [HONEYPOT_FIELD]: values.honeypot }),
      });

      const result = (await response.json()) as EnquiryResponse;

      if (result.code === "accepted") {
        setPhase("succeeded");
        setReference(result.reference ?? null);
        setValues({ ...EMPTY_VALUES, enquiryType: defaultEnquiryType });
        trackEvent("form_submit_success", { form_type: "enquiry" });
        requestAnimationFrame(() => resultRef.current?.focus());
        return;
      }

      if (result.code === "validation_failed" && result.errors) {
        setErrors(result.errors);
        setPhase("editing");
        requestAnimationFrame(() => summaryRef.current?.focus());
        trackEvent("form_error", { form_type: "enquiry", error_code: "server_validation" });
        return;
      }

      setPhase("failed");
      setFailureCode(result.code);
      trackEvent("form_error", { form_type: "enquiry", error_code: result.code });
      requestAnimationFrame(() => resultRef.current?.focus());
    } catch {
      /* Network failure. The message was not sent, and the state says so. */
      setPhase("failed");
      setFailureCode("provider_unavailable");
      trackEvent("form_error", { form_type: "enquiry", error_code: "network" });
      requestAnimationFrame(() => resultRef.current?.focus());
    }
  }

  const errorFields = FIELD_ORDER.filter((field) => errors[field]);

  /* ----------------------------------------------------------- success view */

  if (phase === "succeeded") {
    return (
      <div className={styles.wrapper} id="enquiry">
        <div ref={resultRef} tabIndex={-1} className={styles.result}>
          <Notice tone="success" title="Your enquiry has been received." live="status">
            <p>
              Thank you. We have sent it to the appropriate team.
              {responseSla ? ` We aim to acknowledge your message within ${responseSla}.` : ""}
            </p>
            {reference ? (
              <p>
                Reference: <span className={styles.reference}>{reference}</span>
              </p>
            ) : null}
            {mode === "demo" ? (
              <p>
                <strong>Demo mode:</strong> this build uses a mocked adapter. No enquiry was
                transmitted, stored or delivered to anyone.
              </p>
            ) : null}
            <div className={styles.resultActions}>
              <ButtonLink href={routes.focusAreas} variant="secondary">
                Explore focus areas
              </ButtonLink>
            </div>
          </Notice>
        </div>
      </div>
    );
  }

  /* ------------------------------------------------------------- form view */

  return (
    <div className={styles.wrapper} id="enquiry">
      {mode === "unavailable" ? (
        <Notice tone="warning" title="Enquiries cannot be received through this form yet">
          <p>
            The form below is complete but switched off. Before it can accept a message we need a
            confirmed enquiry provider, a named owner for each enquiry type, an agreed response
            time, and approved retention and deletion rules. Sending your details somewhere that
            cannot yet handle them responsibly would not be right.
          </p>
          <p>
            No public email address or phone number has been approved for publication yet either, so
            we are not offering an alternative route we cannot monitor. This page will be updated as
            soon as the enquiry channel is open.
          </p>
        </Notice>
      ) : null}

      {mode === "demo" ? (
        <Notice tone="internal" title="Demo mode — submissions are not delivered">
          <p>
            This build runs a mocked submission adapter so the form can be tested end to end.
            Nothing entered here is transmitted, stored or seen by anyone.
          </p>
        </Notice>
      ) : null}

      {phase === "failed" ? (
        <div ref={resultRef} tabIndex={-1} className={styles.result}>
          <FailureNotice code={failureCode} alternativeEmail={alternativeEmail} />
        </div>
      ) : null}

      {errorFields.length > 0 ? (
        <div
          ref={summaryRef}
          tabIndex={-1}
          className={styles.summary}
          role="alert"
          aria-labelledby={`${uid}-summary-title`}
        >
          <p className={styles.summaryTitle} id={`${uid}-summary-title`}>
            <svg
              className={styles.summaryIcon}
              viewBox="0 0 22 22"
              aria-hidden="true"
              focusable="false"
            >
              <circle cx="11" cy="11" r="10" fill="none" stroke="currentColor" strokeWidth="1.8" />
              <path d="M11 5.6v6.2" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              <circle cx="11" cy="15.6" r="1.25" fill="currentColor" />
            </svg>
            There {errorFields.length === 1 ? "is 1 problem" : `are ${errorFields.length} problems`}{" "}
            with this form
          </p>
          <ul className={styles.summaryList}>
            {errorFields.map((field) => (
              <li key={field}>
                <a className={styles.summaryLink} href={`#${fieldId(field)}`}>
                  {FIELD_LABELS[field]}: {errors[field]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <fieldset className={styles.fieldset} disabled={disabled}>
          <legend className="visually-hidden">Enquiry details</legend>

          <SelectField
            id={fieldId("enquiryType")}
            label={FIELD_LABELS.enquiryType}
            placeholderLabel="Choose an enquiry type"
            options={ENQUIRY_TYPES}
            value={values.enquiryType}
            error={errors.enquiryType}
            required
            onChange={(event) => update("enquiryType", event.target.value)}
          />

          <div className={styles.row}>
            <TextField
              id={fieldId("name")}
              label={FIELD_LABELS.name}
              value={values.name}
              error={errors.name}
              required
              autoComplete="name"
              maxLength={LIMITS.name.max}
              onChange={(event) => update("name", event.target.value)}
            />
            <TextField
              id={fieldId("email")}
              label={FIELD_LABELS.email}
              type="email"
              inputMode="email"
              value={values.email}
              error={errors.email}
              required
              autoComplete="email"
              maxLength={LIMITS.email.max}
              onChange={(event) => update("email", event.target.value)}
            />
          </div>

          <div className={styles.row}>
            <TextField
              id={fieldId("organisation")}
              label={FIELD_LABELS.organisation}
              hint="If you are writing on behalf of an institution, employer or funder."
              value={values.organisation}
              error={errors.organisation}
              autoComplete="organization"
              maxLength={LIMITS.organisation.max}
              onChange={(event) => update("organisation", event.target.value)}
            />
            <TextField
              id={fieldId("role")}
              label={FIELD_LABELS.role}
              value={values.role}
              error={errors.role}
              autoComplete="organization-title"
              maxLength={LIMITS.role.max}
              onChange={(event) => update("role", event.target.value)}
            />
          </div>

          <TextField
            id={fieldId("subject")}
            label={FIELD_LABELS.subject}
            value={values.subject}
            error={errors.subject}
            required
            maxLength={LIMITS.subject.max}
            onChange={(event) => update("subject", event.target.value)}
          />

          <TextAreaField
            id={fieldId("message")}
            label={FIELD_LABELS.message}
            hint="Please do not include identity documents, financial information, education records, health information, or any details about a child."
            value={values.message}
            error={errors.message}
            required
            rows={7}
            maxLength={LIMITS.message.max}
            currentLength={values.message.length}
            onChange={(event) => update("message", event.target.value)}
          />

          <CheckboxField
            id={fieldId("adultConfirmation")}
            label="I confirm that I am 18 or older"
            hint="If you are under 18, please do not submit personal information. Ask a parent, guardian, or institution to contact us using their own details."
            checked={values.adultConfirmation}
            error={errors.adultConfirmation}
            required
            onChange={(event) => update("adultConfirmation", event.target.checked)}
          />

          <HoneypotField
            name={HONEYPOT_FIELD}
            value={values.honeypot}
            disabled={disabled}
            onChange={(value) => update("honeypot", value)}
          />

          <div>
            <p className={styles.collectionNotice}>
              We will use the information you provide to route and respond to this enquiry and to
              keep a limited record for follow-up and accountability. Do not include sensitive
              personal information. Read our <Link href={routes.privacy}>Privacy Notice</Link> to
              understand retention, service providers, and how to contact us about your data.
            </p>
          </div>

          <div className={styles.actions}>
            <Button
              type="submit"
              size="large"
              withArrow
              loading={phase === "submitting"}
              loadingLabel="Sending your enquiry…"
              aria-disabled={mode === "unavailable" ? true : undefined}
            >
              Send enquiry
            </Button>
            {mode === "unavailable" ? (
              <p className={styles.submitStatus}>
                Sending is switched off until the enquiry channel is open.
              </p>
            ) : null}
          </div>
        </fieldset>
      </form>
    </div>
  );
}

/** Failure states. Each says the message was not sent and what to do next. */
function FailureNotice({
  code,
  alternativeEmail,
}: {
  code: EnquiryResultCode | null;
  alternativeEmail: string | null;
}) {
  const alternative = alternativeEmail ? (
    <p>
      If the problem continues, email <a href={`mailto:${alternativeEmail}`}>{alternativeEmail}</a>.
    </p>
  ) : (
    <p>
      No alternative contact address has been approved for publication yet, so please try again
      shortly.
    </p>
  );

  if (code === "rate_limited") {
    return (
      <Notice tone="warning" title="Too many attempts from this connection" live="alert">
        <p>
          Your enquiry has not been submitted. Several enquiries have already been sent from this
          connection. Please wait a few minutes and try again.
        </p>
      </Notice>
    );
  }

  if (code === "provider_timeout") {
    return (
      <Notice tone="error" title="We could not send your enquiry." live="alert">
        <p>
          Your message has not been submitted. The request took too long to complete. Your answers
          are still here, so you can try again.
        </p>
        {alternative}
      </Notice>
    );
  }

  if (code === "delivery_not_configured") {
    return (
      <Notice tone="warning" title="Enquiries cannot be received yet." live="alert">
        <p>
          Your message has not been submitted. The enquiry channel is not open, so nothing was sent
          or stored. This page will be updated when it opens.
        </p>
      </Notice>
    );
  }

  return (
    <Notice tone="error" title="We could not send your enquiry." live="alert">
      <p>
        Your message has not been submitted. Please check the highlighted fields and try again. Your
        answers are still here.
      </p>
      {alternative}
    </Notice>
  );
}
