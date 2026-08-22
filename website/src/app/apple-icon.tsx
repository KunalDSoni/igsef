import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Apple touch icon, generated from the same glyph as the SVG favicon. */
export default async function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        paddingBottom: "46px",
        backgroundColor: "#520080",
      }}
    >
      <div style={{ display: "flex", position: "relative", width: "104px", height: "56px" }}>
        <div
          style={{
            position: "absolute",
            inset: "0",
            borderTop: "13px solid #FCFAED",
            borderLeft: "13px solid #FCFAED",
            borderRight: "13px solid #FCFAED",
            borderTopLeftRadius: "56px",
            borderTopRightRadius: "56px",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "22px",
            right: "22px",
            bottom: "0",
            height: "30px",
            borderTop: "13px solid #FCB520",
            borderLeft: "13px solid #FCB520",
            borderRight: "13px solid #FCB520",
            borderTopLeftRadius: "30px",
            borderTopRightRadius: "30px",
          }}
        />
      </div>
    </div>,
    { ...size },
  );
}
