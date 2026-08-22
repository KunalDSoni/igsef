import "server-only";

import { isEnquiryDeliveryConfigured, isEnquiryTestMode } from "@/config/features";
import { isProduction } from "@/config/site";
import type { EnquiryDeliveryMode } from "@/components/form/EnquiryForm";

/**
 * Resolves the delivery mode on the server so the browser never has to guess,
 * and so no provider setting is exposed to the client bundle.
 *
 * Test mode is refused in production builds, matching the adapter: a mocked
 * success must never be reachable by a real visitor.
 */
export function resolveEnquiryMode(): EnquiryDeliveryMode {
  if (isEnquiryTestMode() && !isProduction) return "demo";
  if (isEnquiryDeliveryConfigured()) return "live";
  return "unavailable";
}
