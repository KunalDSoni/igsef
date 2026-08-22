import styles from "./HeroPathways.module.css";

/**
 * The hero backdrop. Decorative: the hero's meaning is carried entirely by its
 * heading, body copy and actions.
 */
export function HeroPathways() {
  return (
    <div className={styles.field} aria-hidden="true">
      <svg
        className={styles.svg}
        viewBox="0 0 1440 760"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        focusable="false"
        role="presentation"
      >
        <defs>
          <linearGradient id="hero-route-a" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#09D89A" stopOpacity="0.05" />
            <stop offset="45%" stopColor="#09D89A" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#D7FDCF" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="hero-route-b" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#FCB520" stopOpacity="0.06" />
            <stop offset="55%" stopColor="#FCB520" stopOpacity="0.62" />
            <stop offset="100%" stopColor="#FEEECD" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="hero-route-c" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#EBE1FD" stopOpacity="0.34" />
            <stop offset="100%" stopColor="#EBE1FD" stopOpacity="0.04" />
          </linearGradient>
        </defs>

        {/* Furthest-back route — the only element that drifts. */}
        <g className={styles.drift}>
          <path
            d="M-120 690C220 690 300 300 640 300s420 250 940 122"
            stroke="url(#hero-route-c)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M-120 760C260 760 320 220 700 220s440 300 900 180"
            stroke="url(#hero-route-c)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="3 14"
          />
        </g>

        {/* Primary routes */}
        <path
          d="M-80 640C240 640 300 250 620 250s380 210 940 96"
          stroke="url(#hero-route-a)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M-80 726C280 726 340 344 700 344s400 196 940 74"
          stroke="url(#hero-route-b)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M-80 560C200 560 260 168 560 168s340 240 960 60"
          stroke="#EBE1FD"
          strokeOpacity="0.16"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="8 16"
        />

        {/*
          Nodes and modules are grouped so they can be dropped on small screens.
          The hero uses `slice` scaling, so on a narrow viewport these land on
          top of the headline and read as artefacts rather than scenery.
        */}
        <g className={styles.detail}>
          {/* Nodes where routes meet — the "steps" in the pathway. */}
          <circle cx="620" cy="250" r="7" fill="#09D89A" fillOpacity="0.9" />
          <circle
            cx="620"
            cy="250"
            r="16"
            fill="none"
            stroke="#09D89A"
            strokeOpacity="0.28"
            strokeWidth="1.5"
          />
          <circle cx="700" cy="344" r="6" fill="#FCB520" fillOpacity="0.95" />
          <circle
            cx="700"
            cy="344"
            r="15"
            fill="none"
            stroke="#FCB520"
            strokeOpacity="0.3"
            strokeWidth="1.5"
          />
          <circle cx="1094" cy="286" r="5" fill="#EBE1FD" fillOpacity="0.75" />
          <circle
            cx="1240"
            cy="212"
            r="9"
            fill="none"
            stroke="#EBE1FD"
            strokeOpacity="0.34"
            strokeWidth="1.5"
          />
          {/* No node is placed on the lower-left: the hero's status note sits
              there, and a dot showing through the panel reads as a smudge on
              the words. */}

          {/*
            A single rounded module at the left edge echoes the card language of
            the page. The right-hand side is left clear: the hero's own focal
            cards sit there, and a translucent panel layered behind another
            translucent panel reads as a rendering fault rather than depth.
          */}
          <rect
            x="96"
            y="146"
            width="128"
            height="82"
            rx="20"
            fill="#09D89A"
            fillOpacity="0.04"
            stroke="#09D89A"
            strokeOpacity="0.16"
            strokeWidth="1.5"
          />
        </g>
      </svg>
    </div>
  );
}
