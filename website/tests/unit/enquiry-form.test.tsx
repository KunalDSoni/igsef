import { cleanup, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { EnquiryForm } from "@/components/form/EnquiryForm";

/**
 * Component tests for the enquiry form.
 *
 * These cover the accessibility contract that is easy to break silently:
 * persistent labels, associated errors, a focused error summary, preserved
 * values, and honest result states. The network call is mocked — the form is
 * exercised, not a provider.
 */

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

function mockFetch(response: unknown, status = 200) {
  const spy = vi.fn().mockResolvedValue({
    ok: status < 400,
    status,
    json: async () => response,
  });
  vi.stubGlobal("fetch", spy);
  return spy;
}

async function fillValidForm(user: ReturnType<typeof userEvent.setup>) {
  await user.selectOptions(screen.getByLabelText(/what would you like to discuss/i), "partnership");
  await user.type(screen.getByLabelText(/your name/i), "Asha Menon");
  await user.type(screen.getByLabelText(/work or personal email/i), "asha@example.org");
  await user.type(screen.getByLabelText(/^subject/i), "Curriculum collaboration");
  await user.type(
    screen.getByLabelText(/how can we help/i),
    "We would like to explore a joint initiative for our diploma learners.",
  );
  await user.click(screen.getByLabelText(/i confirm that i am 18 or older/i));
}

describe("EnquiryForm — field contract", () => {
  it("renders a persistent visible label for every control", () => {
    render(<EnquiryForm mode="demo" />);
    for (const label of [
      /what would you like to discuss/i,
      /your name/i,
      /work or personal email/i,
      /^organisation/i,
      /your role/i,
      /^subject/i,
      /how can we help/i,
      /i confirm that i am 18 or older/i,
    ]) {
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    }
  });

  it("marks required and optional state in words, not only in colour", () => {
    render(<EnquiryForm mode="demo" />);
    expect(screen.getAllByText("(required)").length).toBeGreaterThan(0);
    expect(screen.getAllByText("(optional)").length).toBeGreaterThan(0);
  });

  it("collects no phone number, date of birth or identity field", () => {
    render(<EnquiryForm mode="demo" />);
    for (const forbidden of [/phone/i, /date of birth/i, /aadhaar/i, /^pan\b/i, /income/i]) {
      expect(screen.queryByLabelText(forbidden)).toBeNull();
    }
  });

  it("warns against sending sensitive or children's information", () => {
    render(<EnquiryForm mode="demo" />);
    expect(screen.getByText(/do not include identity documents/i)).toBeInTheDocument();
    expect(screen.getByText(/any details about a child/i)).toBeInTheDocument();
  });

  it("shows the point-of-collection notice and links to the Privacy Notice", () => {
    render(<EnquiryForm mode="demo" />);
    expect(screen.getByText(/we will use the information you provide/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /privacy notice/i })).toHaveAttribute(
      "href",
      "/privacy",
    );
  });

  it("offers no marketing consent or newsletter option", () => {
    render(<EnquiryForm mode="demo" />);
    expect(screen.queryByLabelText(/newsletter/i)).toBeNull();
    expect(screen.queryByLabelText(/marketing/i)).toBeNull();
  });

  it("leaves the adult confirmation unchecked by default", () => {
    render(<EnquiryForm mode="demo" />);
    expect(screen.getByLabelText(/i confirm that i am 18 or older/i)).not.toBeChecked();
  });

  it("hides the honeypot from assistive technology and the tab order", () => {
    const { container } = render(<EnquiryForm mode="demo" />);
    const honeypot = container.querySelector<HTMLInputElement>("#organisation_website");
    expect(honeypot).not.toBeNull();
    expect(honeypot!.tabIndex).toBe(-1);
    expect(honeypot!.closest("[aria-hidden='true']")).not.toBeNull();
  });
});

describe("EnquiryForm — validation", () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it("shows an error summary listing every problem and moves focus to it", async () => {
    render(<EnquiryForm mode="demo" />);
    await user.click(screen.getByRole("button", { name: /send enquiry/i }));

    const summary = await screen.findByRole("alert");
    expect(within(summary).getByText(/there are \d+ problems with this form/i)).toBeInTheDocument();
    await waitFor(() => expect(summary).toHaveFocus());
  });

  it("links each summary entry to the field it describes", async () => {
    render(<EnquiryForm mode="demo" />);
    await user.click(screen.getByRole("button", { name: /send enquiry/i }));

    const summary = await screen.findByRole("alert");
    const links = within(summary).getAllByRole("link");
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      const id = link.getAttribute("href")!.slice(1);
      expect(document.getElementById(id), `no field with id ${id}`).not.toBeNull();
    }
  });

  it("marks invalid fields and associates the message with the control", async () => {
    render(<EnquiryForm mode="demo" />);
    await user.click(screen.getByRole("button", { name: /send enquiry/i }));

    const name = await screen.findByLabelText(/your name/i);
    expect(name).toHaveAttribute("aria-invalid", "true");
    const describedBy = name.getAttribute("aria-describedby")!;
    expect(document.getElementById(describedBy.split(" ").pop()!)!.textContent).toMatch(
      /enter your name/i,
    );
  });

  it("preserves entered values after a failed submission", async () => {
    render(<EnquiryForm mode="demo" />);
    await user.type(screen.getByLabelText(/your name/i), "Asha Menon");
    await user.click(screen.getByRole("button", { name: /send enquiry/i }));

    await screen.findByRole("alert");
    expect(screen.getByLabelText(/your name/i)).toHaveValue("Asha Menon");
  });

  it("clears a field error as soon as the visitor starts correcting it", async () => {
    render(<EnquiryForm mode="demo" />);
    await user.click(screen.getByRole("button", { name: /send enquiry/i }));
    await screen.findByRole("alert");

    await user.type(screen.getByLabelText(/your name/i), "A");
    await waitFor(() =>
      expect(screen.getByLabelText(/your name/i)).not.toHaveAttribute("aria-invalid"),
    );
  });

  it("requires the adult confirmation", async () => {
    render(<EnquiryForm mode="demo" />);
    await user.click(screen.getByRole("button", { name: /send enquiry/i }));
    const summary = await screen.findByRole("alert");
    expect(within(summary).getByText(/18 or older/i)).toBeInTheDocument();
  });

  it("does not contact the server when client validation fails", async () => {
    const fetchSpy = mockFetch({ code: "accepted" });
    render(<EnquiryForm mode="demo" />);
    await user.click(screen.getByRole("button", { name: /send enquiry/i }));
    await screen.findByRole("alert");
    expect(fetchSpy).not.toHaveBeenCalled();
  });
});

describe("EnquiryForm — result states", () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it("shows the success state and labels demo mode honestly", async () => {
    mockFetch({ code: "accepted", testMode: true, reference: "TEST-MODE-NO-DELIVERY" });
    render(<EnquiryForm mode="demo" />);
    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /send enquiry/i }));

    expect(await screen.findByText(/your enquiry has been received/i)).toBeInTheDocument();
    expect(screen.getByText(/no enquiry was transmitted/i)).toBeInTheDocument();
  });

  it("announces success through a live region", async () => {
    mockFetch({ code: "accepted" });
    render(<EnquiryForm mode="demo" />);
    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /send enquiry/i }));

    const status = await screen.findByRole("status");
    expect(within(status).getByText(/your enquiry has been received/i)).toBeInTheDocument();
  });

  it("states plainly that nothing was sent when the provider is unavailable", async () => {
    mockFetch({ code: "provider_unavailable" }, 502);
    render(<EnquiryForm mode="demo" />);
    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /send enquiry/i }));

    expect(await screen.findByText(/could not send your enquiry/i)).toBeInTheDocument();
    expect(screen.getByText(/has not been submitted/i)).toBeInTheDocument();
  });

  it("reports a timeout as a timeout, not a generic failure", async () => {
    mockFetch({ code: "provider_timeout" }, 504);
    render(<EnquiryForm mode="demo" />);
    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /send enquiry/i }));

    expect(await screen.findByText(/took too long/i)).toBeInTheDocument();
  });

  it("explains rate limiting without implying the message was sent", async () => {
    mockFetch({ code: "rate_limited" }, 429);
    render(<EnquiryForm mode="demo" />);
    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /send enquiry/i }));

    expect(await screen.findByText(/too many attempts/i)).toBeInTheDocument();
    expect(screen.getByText(/has not been submitted/i)).toBeInTheDocument();
  });

  it("surfaces server-side validation errors in the summary", async () => {
    mockFetch({ code: "validation_failed", errors: { email: "That address was rejected." } }, 422);
    render(<EnquiryForm mode="demo" />);
    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /send enquiry/i }));

    const summary = await screen.findByRole("alert");
    expect(within(summary).getByText(/that address was rejected/i)).toBeInTheDocument();
  });

  it("offers no alternative email address when none has been approved", async () => {
    mockFetch({ code: "provider_unavailable" }, 502);
    render(<EnquiryForm mode="demo" alternativeEmail={null} />);
    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /send enquiry/i }));

    await screen.findByText(/could not send your enquiry/i);
    expect(
      screen.getByText(/no alternative contact address has been approved/i),
    ).toBeInTheDocument();
    expect(document.querySelector('a[href^="mailto:"]')).toBeNull();
  });
});

describe("EnquiryForm — unavailable mode", () => {
  it("disables every control and explains why", () => {
    render(<EnquiryForm mode="unavailable" />);
    expect(
      screen.getByText(/enquiries cannot be received through this form yet/i),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/your name/i)).toBeDisabled();
    expect(screen.getByRole("button", { name: /send enquiry/i })).toBeDisabled();
    expect(screen.getByText(/sending is switched off/i)).toBeInTheDocument();
  });

  it("never submits, even if the form element is submitted directly", async () => {
    const fetchSpy = mockFetch({ code: "accepted" });
    const { container } = render(<EnquiryForm mode="unavailable" />);
    container.querySelector("form")!.requestSubmit();
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("shows no demo banner", () => {
    render(<EnquiryForm mode="unavailable" />);
    expect(screen.queryByText(/demo mode/i)).toBeNull();
  });
});

describe("EnquiryForm — live mode", () => {
  it("shows neither the unavailable notice nor the demo banner", () => {
    render(<EnquiryForm mode="live" />);
    expect(screen.queryByText(/enquiries cannot be received/i)).toBeNull();
    expect(screen.queryByText(/demo mode/i)).toBeNull();
    expect(screen.getByRole("button", { name: /send enquiry/i })).toBeEnabled();
  });
});
