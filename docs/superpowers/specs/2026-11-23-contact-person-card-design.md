# Contact Person Card

**Date:** 2026-11-23
**Scope:** Redesign how the contact person appears in the contact details (Contact page and the Partner page's "Contact us" box)
**Status:** Design approved, ready for implementation

## Why

The contact person was added as one more row in the contact list. The bold text is the generic label "Contact person". The name, which is what visitors need, is small grey text sharing a line with the designation. Nothing shows that the phone number reaches this person. The section should make the point of contact obvious and reachable in one tap.

## Goals

- A contact card at the top of the contact details, showing:
  - a "KR" initials circle
  - **Krishnakumar R.** in large display type
  - **Senior Vice President** below the name
- The phone number and email move into the card as buttons. The phone is a filled indigo button that calls (`tel:`), and the email is a pale teal button that opens an email (`mailto:`).
- The office address sits inside the card, below the buttons, in the current row style.
- *Revised 2026-11-23 at the owner's request after launch:* the "Your point of contact" label was removed, and the office address moved from below the card into it.
- Phone and email are no longer repeated as separate rows.
- The same card appears on both the Contact page and the Partner page's "Contact us" box.

## Non-goals

- No photo. None has been provided. If a real photo arrives later, it can replace the initials the same way the leadership cards do.
- No changes to the enquiry form, the footer, or other pages.

## Anti-goals

- No invented details. The phone number stays exactly `+91 9323802631`, and the email stays the general `info@igsef.org` inbox. Neither is presented as a personal line.
- The card must not look bolted on. It uses only existing site tokens: indigo, teal, the tint colours, the 20px card radius and the hairline border. The initials circle and the role styling match the leadership cards.

## Approaches

- **A · Contact card (chosen):** Strongest emphasis, and links the person to call and email. This is the bigger change, because phone and email move out of the list.
- **B · Refined row:** Keeps the list and fixes the emphasis: initials, a small label, then the name and the designation on its own line. This is the smallest change, but the person stays disconnected from the phone number.
- **C · Two-column panel (dropped):** Person on the left, details on the right. Dropped because the contact column (680–760px) is too narrow for a side-by-side split.

## Decided how

- Data stays in `src/data/site.js`: a new `contactPerson` object (`name`, `role`), and the phone/email values are still read from `site.contact` so the number lives in one place.
- A new `ContactCard.astro` component renders the card, and both `contact.astro` and `partner.astro` use it. Initials are derived from the name.
- Styles live in `src/styles/global.css` next to the existing `.cfact` rules.
- The card is white with a hairline border, so it reads on both the white Contact section and the off-white Partner section.
- On phones, the initials and name stay side by side, and the two buttons wrap onto their own lines.
- The existing tests and the content guard must still pass. A data test covers `contactPerson`.

## Left to the builder

Exact spacing and button hover states, following the existing `.btn` hover.
