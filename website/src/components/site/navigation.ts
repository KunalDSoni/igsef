import { features } from "@/config/features";
import { routes } from "@/config/site";

export interface NavItem {
  label: string;
  href: string;
}

/**
 * Primary navigation (Requirement.md §8.1).
 *
 * Updates appears only when an approved item exists; Corporate Disclosures is
 * never in the header and is linked from the footer only once verified.
 */
export function primaryNav(): NavItem[] {
  const items: NavItem[] = [
    { label: "About", href: routes.about },
    { label: "Focus Areas", href: routes.focusAreas },
    { label: "Partner With Us", href: routes.partner },
  ];

  if (features.updates) {
    items.push({ label: "Updates", href: routes.updates });
  }

  items.push({ label: "Contact", href: routes.contact });
  return items;
}

/** Footer groups (content.md §4). Blocked destinations are omitted, not stubbed. */
export function footerNav(): { heading: string; items: NavItem[] }[] {
  const explore: NavItem[] = [
    { label: "About", href: routes.about },
    { label: "Focus Areas", href: routes.focusAreas },
  ];
  if (features.updates) {
    explore.push({ label: "Updates", href: routes.updates });
  }

  const transparency: NavItem[] = [];
  if (features.corporateDisclosures) {
    transparency.push({ label: "Corporate Disclosures", href: routes.corporateDisclosures });
  }
  transparency.push(
    { label: "Privacy Notice", href: routes.privacy },
    { label: "Terms of Use", href: routes.terms },
    { label: "Accessibility", href: routes.accessibility },
  );

  return [
    { heading: "Explore", items: explore },
    {
      heading: "Work with us",
      items: [
        { label: "Partner With Us", href: routes.partner },
        { label: "Contact", href: routes.contact },
      ],
    },
    { heading: "Transparency", items: transparency },
  ];
}
