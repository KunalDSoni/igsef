import { ImageResponse } from "next/og";
import { site } from "@/config/site";

/**
 * Default social card, generated at build time.
 *
 * Built rather than shipped as a binary so it stays in sync with the brand line
 * and contains no stale template text. It carries the working name and brand
 * line only — no statistic, no claim, no corporate fact.
 */
export const alt = `${site.legalNameWorking} — ${site.brandLine}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px",
        backgroundColor: "#17131C",
        backgroundImage:
          "radial-gradient(900px 560px at 88% 6%, rgba(82,0,128,0.85), transparent 68%), radial-gradient(620px 460px at 4% 100%, rgba(47,0,74,0.9), transparent 70%)",
        color: "#FFFFFF",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "14px",
            backgroundColor: "#520080",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            paddingBottom: "12px",
          }}
        >
          <div
            style={{
              width: "30px",
              height: "15px",
              borderTop: "5px solid #FCB520",
              borderLeft: "5px solid #FCB520",
              borderRight: "5px solid #FCB520",
              borderTopLeftRadius: "16px",
              borderTopRightRadius: "16px",
            }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: "30px", fontWeight: 700, letterSpacing: "-0.5px" }}>
            Indo-Global
          </div>
          <div style={{ fontSize: "17px", letterSpacing: "2px", color: "rgba(255,255,255,0.75)" }}>
            SKILLS &amp; EDU FOUNDATION
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div
          style={{
            fontSize: "82px",
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-2px",
            maxWidth: "880px",
          }}
        >
          {site.brandLine}
        </div>
        <div style={{ fontSize: "28px", color: "rgba(255,255,255,0.82)", maxWidth: "800px" }}>
          Education · Skills · Opportunity
        </div>
      </div>

      {/* Pathway rule — the site's motif reduced to a single connecting line. */}
      <div style={{ display: "flex", alignItems: "center", gap: "0px" }}>
        <div
          style={{ width: "120px", height: "6px", borderRadius: "3px", backgroundColor: "#09D89A" }}
        />
        <div
          style={{ width: "220px", height: "6px", borderRadius: "3px", backgroundColor: "#FCB520" }}
        />
        <div
          style={{ width: "80px", height: "6px", borderRadius: "3px", backgroundColor: "#EBE1FD" }}
        />
      </div>
    </div>,
    { ...size },
  );
}
