import React, { useEffect, useMemo, useState } from "react";

const STREAM_COUNT = 620;
const STEP_HEIGHT = 175;
const PAGE_HEIGHT = 18000;

const VANISH_X = 50;
const HORIZON_Y = 34;
const FLOOR_NEAR_Y = 108;
const CEILING_NEAR_Y = 3;
const WALL_NEAR_X = 4;
const WALL_FAR_X = 96;

const LANE_OFFSETS = [-5.4, -4.5, -3.6, -2.7, -1.8, -0.9, 0.9, 1.8, 2.7, 3.6, 4.5, 5.4];
const GRID_GREEN = "#4e6d42";

const FLOATING_SCALE = 1.35;
const LIBERTY_SCALE = 1.5;

const imagePath = (fileName) => {
  const base = import.meta.env.BASE_URL || "/";
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;

  return [
    `${normalizedBase}images/${fileName}`,
    `/images/${fileName}`,
    `./images/${fileName}`,
  ];
};

const ASSETS = {
  avatarHero: imagePath("avatar-hero.png"),
  avatarSide: imagePath("avatar-side.png"),
  avatarBack: imagePath("avatar-back.png"),
  avatarInquiry: imagePath("avatar-inquiry.png"),
  skylineStrip: imagePath("skyline-strip.png"),
  bridgeSkylineExtended: imagePath("bridge-skyline-extended.png"),
  workStamp: imagePath("work-stamp.png"),
  workMedia: imagePath("work-media.png"),
  bottomLine: imagePath("bottom-line.png"),
  foregroundStreetCanyon: imagePath("foreground-street-canyon.png"),
  ynycGraffitiLogo: imagePath("ynyc_graffiti_logo_8.png"),
  waveB: imagePath("ynyc-wave-04.png"),
  waveA: imagePath("ynyc-wave-03.png"),
  riverStrip: imagePath("ynyc-river-strip-08.png"),
  moon: imagePath("ynyc-moon-09.png"),
  sun: imagePath("ynyc-sun-08.png"),
  skyBackground: imagePath("ynyc-background-sky-05.png"),
};


const CLOUD_IMAGE_FILES = [
  "ynyc-giants-cloud-01.png",
  "ynyc-giants-cloud-02.png",
  "ynyc-giants-cloud-03.png",
  "ynyc-knicks-cloud-01.png",
  "ynyc-knicks-cloud-02.png",
  "ynyc-knicks-cloud-03.png",
  "ynyc-mets-cloud-01.png",
  "ynyc-mets-cloud-02.png",
  "ynyc-mets-cloud-03.png",
  "ynyc-nets-cloud-01.png",
  "ynyc-nets-cloud-02.png",
  "ynyc-nets-cloud-03.png",
  "ynyc-rangers-cloud-01.png",
  "ynyc-rangers-cloud-02.png",
  "ynyc-rangers-cloud-03.png",
  "ynyc-yankees-cloud-01.png",
  "ynyc-yankees-cloud-02.png",
  "ynyc-yankees-cloud-03.png"
];
const AIRCRAFT_IMAGE_FILES = [
  "ynyc-blimp-05.png",
  "ynyc-blimp-07.png",
  "ynyc-blimp-10.png",
  "ynyc-drone-taxi-03.png",
  "ynyc-drone-taxi-07.png",
  "ynyc-drone-taxi-09.png",
  "ynyc-flying-saucer-01.png",
  "ynyc-flying-saucer-10.png",
  "ynyc-flying-saucer-12.png",
  "ynyc-helicopter-01.png",
  "ynyc-helicopter-03.png",
  "ynyc-helicopter-10.png",
  "ynyc-star-08.png",
  "ynyc-star-10.png",
  "ynyc-star-11.png"
];
const WATERCRAFT_IMAGE_FILES = [
  "ynyc-barge-17.png",
  "ynyc-barge-18.png",
  "ynyc-barge-19.png",
  "ynyc-cruise-ship-01.png",
  "ynyc-cruise-ship-06.png",
  "ynyc-cruise-ship-07.png",
  "ynyc-passenger-ferry-05.png",
  "ynyc-passenger-ferry-06.png",
  "ynyc-passenger-ferry-13.png"
];
const LAWDING_IMAGE_FILES = [
  "ynyc-lawding(1)-10-W2.png",
  "ynyc-lawding(1)-11-W2.png",
  "ynyc-lawding(1)-2-W2.png",
  "ynyc-lawding(1)-3-W2.png",
  "ynyc-lawding(1)-5-W2.png",
  "ynyc-lawding(1)-6-W2.png",
  "ynyc-lawding(1)-9-W2.png",
  "ynyc-lawding(10)-10-W3.png",
  "ynyc-lawding(10)-11-W3.png",
  "ynyc-lawding(10)-12-W3.png",
  "ynyc-lawding(10)-14-W3.png",
  "ynyc-lawding(10)-5-W3.png",
  "ynyc-lawding(10)-7-W3.png",
  "ynyc-lawding(10)-8-W3.png",
  "ynyc-lawding(10)-9-W3.png",
  "ynyc-lawding(2)-11-W2.png",
  "ynyc-lawding(2)-13-W2.png",
  "ynyc-lawding(2)-14-W2.png",
  "ynyc-lawding(2)-15-W2.png",
  "ynyc-lawding(2)-2-W2.png",
  "ynyc-lawding(2)-6-W2.png",
  "ynyc-lawding(2)-8-W2.png",
  "ynyc-lawding(2)-9-W2.png",
  "ynyc-lawding(3)-1-W3.png",
  "ynyc-lawding(3)-10-W3.png",
  "ynyc-lawding(3)-11-W3.png",
  "ynyc-lawding(3)-14-W3.png",
  "ynyc-lawding(3)-15-W3.png",
  "ynyc-lawding(3)-3-W3.png",
  "ynyc-lawding(3)-5-W3.png",
  "ynyc-lawding(3)-7-W3.png",
  "ynyc-lawding(3)-8-W3.png",
  "ynyc-lawding(3)-9-W3.png",
  "ynyc-lawding(4)-1-W2.png",
  "ynyc-lawding(4)-10-W2.png",
  "ynyc-lawding(4)-13-W2.png",
  "ynyc-lawding(4)-4-W2.png",
  "ynyc-lawding(4)-5-W2.png",
  "ynyc-lawding(4)-8-W2.png",
  "ynyc-lawding(4)-9-W2.png",
  "ynyc-lawding(5)-1-W3.png",
  "ynyc-lawding(5)-11-W3.png",
  "ynyc-lawding(5)-12-W3.png",
  "ynyc-lawding(5)-13-W3.png",
  "ynyc-lawding(5)-15-W3.png",
  "ynyc-lawding(5)-3-W3.png",
  "ynyc-lawding(5)-5-W3.png",
  "ynyc-lawding(5)-6-W3.png",
  "ynyc-lawding(5)-7-W3.png",
  "ynyc-lawding(6)-1-W1.png",
  "ynyc-lawding(6)-10-W1.png",
  "ynyc-lawding(6)-11-W1.png",
  "ynyc-lawding(6)-12-W1.png",
  "ynyc-lawding(6)-2-W1.png",
  "ynyc-lawding(6)-3-W1.png",
  "ynyc-lawding(6)-4-W1.png",
  "ynyc-lawding(6)-5-W1.png",
  "ynyc-lawding(6)-6-W1.png",
  "ynyc-lawding(6)-7-W1.png",
  "ynyc-lawding(7)-1-W1.png",
  "ynyc-lawding(7)-11-W1.png",
  "ynyc-lawding(7)-12-W1.png",
  "ynyc-lawding(7)-13-W1.png",
  "ynyc-lawding(7)-2-W1.png",
  "ynyc-lawding(7)-4-W1.png",
  "ynyc-lawding(7)-6-W1.png",
  "ynyc-lawding(7)-7-W1.png",
  "ynyc-lawding(7)-8-W1.png",
  "ynyc-lawding(8)-11-W1.png",
  "ynyc-lawding(8)-2-W1.png",
  "ynyc-lawding(8)-7-W1.png",
  "ynyc-lawding(9)-1-W1.png",
  "ynyc-lawding(9)-10-W1.png",
  "ynyc-lawding(9)-4-W1.png",
  "ynyc-lawding(9)-9-W1.png"
];

const CLOUD_IMAGES = CLOUD_IMAGE_FILES.map((fileName) => imagePath(`CLOUDS/${fileName}`));
const AIRCRAFT_IMAGES = AIRCRAFT_IMAGE_FILES.map((fileName) => imagePath(`AIRCRAFT/${fileName}`));
const WATERCRAFT_IMAGES = WATERCRAFT_IMAGE_FILES.map((fileName) => imagePath(`WATERCRAFT/${fileName}`));

const LAWDING_IMAGES = LAWDING_IMAGE_FILES.map((fileName) => {
  const match = fileName.match(/-W([123])\.png$/i);
  const weight = match ? Number(match[1]) : 1;
  return {
    src: imagePath(`LAWDINGS/${fileName}`),
    weight,
    fileName,
  };
});

const WEIGHTED_LAWDING_IMAGES = LAWDING_IMAGES.flatMap((item) =>
  Array.from({ length: item.weight }, () => item.src)
);

function seededNumber(seed) {
  const x = Math.sin(seed * 9999.731) * 10000;
  return x - Math.floor(x);
}

function seededIndex(seed, length) {
  if (!length) return 0;
  return Math.floor(seededNumber(seed) * length);
}

function pickSeeded(list, seed) {
  if (!list || list.length === 0) return null;
  return list[seededIndex(seed, list.length)];
}

const PRACTICE_TOKENS = [
  "JUSTICE",
  "FAIRNESS",
  "LOYALTY",
  "DISCRETION",
  "IP",
  "M&A",
  "MEDIA",
  "TRADEMARK",
  "COPYRIGHT",
  "LICENSING",
  "COUNSEL",
  "DEALS",
  "HOSPITALITY",
  "URBAN",
  "REAL ESTATE",
  "BRAND",
  "STRATEGY",
];

const SYMBOLS = ["©", "®", "™", "℠", "§", "¶"];

const SECTION_CONTENT = [
  {
    id: "learn",
    eyebrow: "01 — LEARN / EXPLORE",
    title: "Counsel for what comes next.",
    body:
      "At YOURNEWYORKCOUNSEL™ we believe most people only need one lawyer — one trusted point of entry for the legal questions, documents, decisions, and matters that come up in real life. So we created a legal tool that works like you do: fast, mobile, private, and useful.",
    action: "Explore YNYC",
  },
  {
    id: "quote",
    eyebrow: "02 — QUOTE A MATTER",
    title: "Ask about a legal issue. Get a path forward.",
    body:
      "Use YNYC™ to describe a specific legal matter confidentially, upload context, request a quote, and have the matter reviewed by a real attorney. The goal is to make the first legal step less intimidating and more organized.",
    action: "Quote a Matter",
  },
  {
    id: "matters",
    eyebrow: "03 — MY MATTERS",
    title: "Your matter window, open whenever you need it.",
    body:
      "For active matters, YNYC™ is designed to help you follow up, review status, organize matter information, and communicate from one useful window available 24/7 from your phone, tablet, or computer.",
    action: "Open My Matters",
  },
  {
    id: "subscription",
    eyebrow: "04 — SUBSCRIBE",
    title: "A premium legal layer for everyday life.",
    body:
      "For a limited time, YNYC™ will offer a free thirty-day trial of its premium subscription service. Subscribers can access enhanced tools, matter intake, learning resources, and attorney-supported workflows, subject to availability, conflicts, co-counsel, referral needs, and engagement terms.",
    action: "Start Trial",
  },
  {
    id: "how",
    eyebrow: "05 — HOW IT WORKS",
    title: "A portal between you, your records, and your attorney.",
    body:
      "YNYC™ connects your matter data, documents, questions, and communications to an attorney-supported review process. Attorney licensees may be assigned based on expertise, background, matter needs, conflicts, jurisdiction, and availability.",
    action: "See How It Works",
  },
  {
    id: "about",
    eyebrow: "06 — ABOUT YNYC",
    title: "Legal support built for modern clients.",
    body:
      "YNYC™ is a web and mobile optimized legal tool for people who want to educate themselves, prepare better questions, understand options, and move legal matters forward with structure and judgment.",
    action: "About YNYC",
  },
];

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function easeDepth(t) {
  return Math.pow(clamp(t, 0, 1.15), 1.82);
}

function ImageAsset({ src, alt, className = "", fallback = null }) {
  const candidates = Array.isArray(src) ? src : [src];
  const cleanCandidates = [...new Set(candidates.filter(Boolean))];
  const srcKey = cleanCandidates.join("|");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [srcKey]);

  const currentSrc = cleanCandidates[index];

  if (!currentSrc || index >= cleanCandidates.length) {
    return (
      fallback || (
        <div className="flex h-full w-full items-center justify-center border border-red-500 bg-white p-2 text-[10px] leading-tight text-red-600">
          Missing image. Tried: {cleanCandidates.join(" | ")}
        </div>
      )
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      style={{ objectFit: "contain" }}
      onError={() => setIndex((value) => value + 1)}
    />
  );
}

function TagStroke({
  children,
  flip = false,
  viewBox = "0 0 100 100",
  rotation = 0,
}) {
  return (
    <div
      className="h-full w-full"
      style={{
        transform: `${flip ? "rotate(180deg)" : ""} rotate(${rotation}deg)`,
      }}
    >
      <svg
        viewBox={viewBox}
        className="h-full w-full overflow-visible"
        fill="none"
        stroke="#111111"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <g opacity="0.22" strokeWidth="5.2" transform="translate(1.3 0.8)">
          {children}
        </g>

        <g opacity="0.12" strokeWidth="4.2" transform="translate(-1 0.6)">
          {children}
        </g>

        <g strokeWidth="3.2">{children}</g>

        <g opacity="0.08" fill="#111111" stroke="none">
          <circle cx="10" cy="16" r="1.1" />
          <circle cx="17" cy="12" r="0.8" />
          <circle cx="83" cy="18" r="1.1" />
          <circle cx="90" cy="14" r="0.7" />
          <circle cx="12" cy="82" r="0.95" />
          <circle cx="20" cy="86" r="0.7" />
          <circle cx="84" cy="88" r="1.1" />
          <circle cx="77" cy="84" r="0.8" />
          <circle cx="48" cy="8" r="0.7" />
          <circle cx="55" cy="10" r="0.55" />
        </g>
      </svg>
    </div>
  );
}

function SketchIcon({ type, flip = false }) {
  const rot =
    type === "argument"
      ? -6
      : type === "deal"
      ? 5
      : type === "court"
      ? -3
      : type === "gavel"
      ? 7
      : type === "orgchart"
      ? -4
      : 2;

  if (type === "orgchart") {
    return (
      <TagStroke flip={flip} rotation={rot}>
        <rect x="38" y="14" width="22" height="12" rx="2" />
        <rect x="8" y="60" width="22" height="12" rx="2" />
        <rect x="40" y="58" width="20" height="12" rx="2" />
        <rect x="70" y="60" width="20" height="12" rx="2" />
        <path d="M49 26v16" />
        <path d="M19 48h60" />
        <path d="M19 48v12" />
        <path d="M49 42v16" />
        <path d="M79 48v12" />
        <path d="M10 74c1 4 3 6 6 8" />
        <path d="M74 74c0 5 2 8 5 10" />
      </TagStroke>
    );
  }

  if (type === "deal") {
    return (
      <TagStroke flip={flip} rotation={rot}>
        <rect x="15" y="16" width="26" height="38" rx="2" />
        <rect x="58" y="30" width="24" height="36" rx="2" />
        <path d="M28 54l31-10" />
        <path d="M22 28h11" />
        <path d="M22 36h13" />
        <path d="M63 42h11" />
        <path d="M63 50h8" />
        <path d="M44 42l6-3 7 8" />
        <path d="M26 55c0 5-1 8-4 12" />
        <path d="M71 66c1 4 3 7 6 10" />
      </TagStroke>
    );
  }

  if (type === "notes") {
    return (
      <TagStroke flip={flip} rotation={rot}>
        <rect x="24" y="14" width="50" height="68" rx="2" />
        <path d="M34 28h28" />
        <path d="M34 39h34" />
        <path d="M34 50h20" />
        <path d="M34 62h30" />
        <path d="M60 20l10 10" />
        <path d="M55 66l5 6 11-13" />
        <path d="M28 82c0 5-2 8-5 12" />
      </TagStroke>
    );
  }

  if (type === "court") {
    return (
      <TagStroke flip={flip} rotation={rot}>
        <path d="M16 84h68" />
        <path d="M22 32h56" />
        <path d="M18 32l32-14 32 14" />
        <path d="M28 36v40" />
        <path d="M42 36v40" />
        <path d="M58 36v40" />
        <path d="M72 36v40" />
        <path d="M24 84c0 4-1 6-4 10" />
        <path d="M76 84c1 3 2 6 5 9" />
      </TagStroke>
    );
  }

  if (type === "argument") {
    return (
      <TagStroke flip={flip} rotation={rot}>
        <circle cx="34" cy="30" r="8" />
        <circle cx="66" cy="30" r="8" />
        <path d="M28 42c0 12-2 22-6 34" />
        <path d="M40 42c0 10 2 20 6 34" />
        <path d="M60 42c0 10-2 20-6 34" />
        <path d="M72 42c0 12 2 22 6 34" />
        <path d="M50 18h12l8 8H58z" />
        <path d="M30 50h8" />
        <path d="M62 50h8" />
        <path d="M22 76c0 6-2 10-5 13" />
        <path d="M81 77c0 5 2 9 5 12" />
      </TagStroke>
    );
  }

  if (type === "gavel") {
    return (
      <TagStroke flip={flip} rotation={rot}>
        <rect x="24" y="22" width="28" height="14" rx="2" />
        <rect x="42" y="32" width="18" height="10" rx="2" />
        <path d="M54 40l24 24" />
        <path d="M60 66l14 14" />
        <path d="M18 76h34" />
        <path d="M28 38c-2 4-3 6-6 9" />
        <path d="M72 78c0 5 2 8 5 11" />
      </TagStroke>
    );
  }

  return (
    <TagStroke flip={flip} rotation={rot}>
      <path d="M50 16v56" />
      <path d="M28 28h44" />
      <path d="M22 82h56" />
      <path d="M38 34l-12 20h24L38 34Z" />
      <path d="M62 34l-12 20h24L62 34Z" />
      <path d="M38 28v6" />
      <path d="M62 28v6" />
      <path d="M26 54c0 6-2 10-5 14" />
      <path d="M74 54c1 6 3 10 6 13" />
    </TagStroke>
  );
}

function FloatingText({ text, flip = false, symbol = false }) {
  return (
    <div
      className="flex h-full w-full items-center justify-center"
      style={{ transform: flip ? "rotate(180deg)" : "none" }}
    >
      <div className="relative">
        <span
          style={{
            color: "#111111",
            fontFamily: symbol
              ? `"Times New Roman", Georgia, serif`
              : `"Arial Black", "Helvetica Neue", Arial, sans-serif`,
            fontWeight: 900,
            letterSpacing: symbol ? "0.02em" : "0.08em",
            textTransform: symbol ? "none" : "uppercase",
            fontSize: symbol ? "0.92em" : "0.22em",
            lineHeight: 1,
            whiteSpace: "nowrap",
            display: "inline-block",
            transform: "rotate(-4deg)",
            textShadow:
              "1px 0 0 rgba(0,0,0,.18), -1px 0 0 rgba(0,0,0,.08), 0 1px 0 rgba(0,0,0,.12)",
          }}
        >
          {text}
        </span>
        <span
          className="absolute left-0 top-0"
          style={{
            color: "rgba(0,0,0,.10)",
            fontFamily: symbol
              ? `"Times New Roman", Georgia, serif`
              : `"Arial Black", "Helvetica Neue", Arial, sans-serif`,
            fontWeight: 900,
            letterSpacing: symbol ? "0.02em" : "0.08em",
            textTransform: symbol ? "none" : "uppercase",
            fontSize: symbol ? "0.92em" : "0.22em",
            lineHeight: 1,
            whiteSpace: "nowrap",
            transform: "translate(2px, 1px) rotate(-2deg)",
            pointerEvents: "none",
          }}
        >
          {text}
        </span>
      </div>
    </div>
  );
}

function RiverBoat({ type = "barge" }) {
  if (type === "ferry") {
    return (
      <svg
        viewBox="0 0 220 90"
        className="h-full w-full"
        fill="none"
        stroke="#111111"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 64h184" />
        <path d="M26 64l10 10h142l16-10" />
        <rect x="64" y="36" width="74" height="22" rx="2" />
        <rect x="90" y="22" width="24" height="14" rx="2" />
        <path d="M76 46h10" />
        <path d="M94 46h10" />
        <path d="M112 46h10" />
        <path d="M130 46h10" />
        <path d="M114 22v-8" />
        <path d="M114 14h18" />
        <path d="M32 76c18 4 42 4 60 0" opacity="0.35" />
        <path d="M118 76c18 4 42 4 60 0" opacity="0.35" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 260 90"
      className="h-full w-full"
      fill="none"
      stroke="#111111"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 66h218" />
      <path d="M28 66l18 10h154l22-10" />
      <rect x="58" y="44" width="84" height="18" rx="2" />
      <rect x="146" y="38" width="34" height="24" rx="2" />
      <path d="M180 38h14" />
      <path d="M192 38v-10" />
      <path d="M68 50h20" />
      <path d="M96 50h20" />
      <path d="M44 78c24 4 56 4 82 0" opacity="0.35" />
      <path d="M142 78c18 4 48 4 72 0" opacity="0.35" />
    </svg>
  );
}

function RiverTraffic({ scrollY }) {
  const rails = [
    { id: "water-1", top: "12%", width: "11vw", minWidth: "92px", maxWidth: "168px", direction: 1, durationPx: STEP_HEIGHT * 5.4, seed: 5100 },
    { id: "water-2", top: "28%", width: "14vw", minWidth: "112px", maxWidth: "220px", direction: -1, durationPx: STEP_HEIGHT * 6.2, seed: 5200 },
    { id: "water-3", top: "45%", width: "18vw", minWidth: "136px", maxWidth: "272px", direction: 1, durationPx: STEP_HEIGHT * 7.1, seed: 5300 },
    { id: "water-4", top: "63%", width: "13vw", minWidth: "104px", maxWidth: "208px", direction: -1, durationPx: STEP_HEIGHT * 5.8, seed: 5400 },
    { id: "water-5", top: "80%", width: "16vw", minWidth: "126px", maxWidth: "246px", direction: 1, durationPx: STEP_HEIGHT * 6.7, seed: 5500 },
  ];

  return (
    <div className="pointer-events-none absolute left-0 top-[31.4vh] z-[6] h-[11vh] w-full overflow-hidden">
      {rails.map((rail, index) => {
        const cycle = rail.durationPx;
        const raw = (((scrollY + index * cycle * 0.37) % cycle) + cycle) % cycle;
        const t = raw / cycle;
        const left = rail.direction > 0 ? lerp(-16, 116, t) : lerp(116, -16, t);
        const opacity = 0.22 + Math.sin(t * Math.PI) * 0.68;
        const src = pickSeeded(WATERCRAFT_IMAGES, rail.seed + Math.floor(scrollY / (cycle * 0.72)) + index * 19);

        if (!src) return null;

        return (
          <div
            key={rail.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${left}%`,
              top: rail.top,
              width: rail.width,
              minWidth: rail.minWidth,
              maxWidth: rail.maxWidth,
              opacity,
            }}
          >
            <ImageAsset src={src} alt="YNYC watercraft" className="h-full w-full" />
          </div>
        );
      })}
    </div>
  );
}

function ForegroundCityCanyon({ scrollY }) {
  const cycle = STEP_HEIGHT * 14;

  const layers = [
    { offset: 0, opacity: 0.34, blur: 0, z: 3 },
    { offset: 0.38, opacity: 0.22, blur: 0.15, z: 2 },
    { offset: 0.76, opacity: 0.14, blur: 0.3, z: 1 },
  ];

  return (
    <div
      className="pointer-events-none absolute left-0 top-[40.5vh] h-[62vh] w-full overflow-hidden"
      style={{
        zIndex: 4,
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 8%, black 88%, transparent 100%)",
      }}
    >
      {layers.map((layer, index) => {
        const raw = ((scrollY + cycle * layer.offset) % cycle) / cycle;
        const t = Math.pow(raw, 1.05);

        const topVh = lerp(2, 58, t);
        const widthVw = lerp(68, 210, Math.pow(t, 1.22));

        const fadeOut = Math.pow(clamp((t - 0.82) / 0.18, 0, 1), 1.4);
        const opacity = layer.opacity * (1 - fadeOut);

        return (
          <div
            key={`foreground-canyon-${index}`}
            className="absolute left-1/2"
            style={{
              top: `${topVh}vh`,
              width: `${widthVw}vw`,
              height: `${widthVw * 0.56}vw`,
              opacity,
              zIndex: layer.z,
              filter: `blur(${layer.blur}px)`,
              transform: `translateX(-50%) translateY(-50%) perspective(900px) rotateX(${lerp(
                0,
                4,
                t
              )}deg)`,
              transformOrigin: "center top",
            }}
          >
            <ImageAsset
              src={ASSETS.foregroundStreetCanyon}
              alt="Foreground NYC street canyon"
              className="h-full w-full"
            />
          </div>
        );
      })}
    </div>
  );
}


function DayNightSky({ scrollY }) {
  const cycle = STEP_HEIGHT * 70;
  const t = (((scrollY % cycle) + cycle) % cycle) / cycle;

  const sunX = lerp(-10, 110, t);
  const sunY = 22 - Math.sin(t * Math.PI) * 16;
  const moonT = (t + 0.52) % 1;
  const moonX = lerp(-10, 110, moonT);
  const moonY = 22 - Math.sin(moonT * Math.PI) * 16;

  const dayOpacity = 0.18 + Math.max(0, Math.sin(t * Math.PI)) * 0.36;
  const nightOpacity = 0.12 + Math.max(0, Math.sin(moonT * Math.PI)) * 0.24;

  return (
    <div className="pointer-events-none absolute left-0 top-0 z-[1] h-[33vh] w-full overflow-hidden">
      <div className="absolute inset-0" style={{ opacity: 0.42 }}>
        <ImageAsset src={ASSETS.skyBackground} alt="YNYC sky" className="h-full w-full object-cover" />
      </div>

      <div
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${sunX}%`,
          top: `${sunY}vh`,
          width: "clamp(78px, 12vw, 164px)",
          opacity: dayOpacity,
        }}
      >
        <ImageAsset src={ASSETS.sun} alt="Sun" className="h-full w-full" />
      </div>

      <div
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${moonX}%`,
          top: `${moonY}vh`,
          width: "clamp(62px, 9.5vw, 136px)",
          opacity: nightOpacity,
        }}
      >
        <ImageAsset src={ASSETS.moon} alt="Moon" className="h-full w-full" />
      </div>
    </div>
  );
}

function CloudRails() {
  const rails = [
    {
      id: "top-cloud-rail",
      top: "0.5vh",
      height: "13vh",
      count: 4,
      width: ["19.5vw", "24.7vw", "22.1vw", "27.3vw"],
      opacity: 0.38,
      duration: 28,
      direction: 1,
      seed: 1200,
    },
    {
      id: "middle-cloud-rail",
      top: "11.5vh",
      height: "8vh",
      count: 5,
      width: ["10.4vw", "13vw", "11.7vw", "14.3vw", "11.1vw"],
      opacity: 0.42,
      duration: 22,
      direction: -1,
      seed: 2200,
    },
    {
      id: "bottom-cloud-rail",
      top: "16.5vh",
      height: "10vh",
      count: 4,
      width: ["15.6vw", "19.5vw", "17.6vw", "22.1vw"],
      opacity: 0.45,
      duration: 24,
      direction: 1,
      seed: 3200,
    },
  ];

  return (
    <div className="pointer-events-none absolute left-0 top-0 z-[2] h-[28vh] w-full overflow-hidden">
      <style>{`
        @keyframes ynycCloudRailRight {
          0% { transform: translateX(-18%); }
          50% { transform: translateX(18%); }
          100% { transform: translateX(-18%); }
        }
        @keyframes ynycCloudRailLeft {
          0% { transform: translateX(18%); }
          50% { transform: translateX(-18%); }
          100% { transform: translateX(18%); }
        }
      `}</style>

      {rails.map((rail) => (
        <div
          key={rail.id}
          className="absolute left-0 w-full"
          style={{
            top: rail.top,
            height: rail.height,
            animation: `${rail.direction > 0 ? "ynycCloudRailRight" : "ynycCloudRailLeft"} ${rail.duration}s ease-in-out infinite`,
          }}
        >
          {Array.from({ length: rail.count }, (_, index) => {
            const src = pickSeeded(CLOUD_IMAGES, rail.seed + index * 17);
            if (!src) return null;

            return (
              <div
                key={`${rail.id}-${index}`}
                className="absolute top-1/2 -translate-y-1/2"
                style={{
                  left: `${-8 + (index * 112) / Math.max(rail.count - 1, 1)}%`,
                  width: rail.width[index % rail.width.length],
                  opacity: rail.opacity * (0.72 + seededNumber(rail.seed + index) * 0.32),
                }}
              >
                <ImageAsset src={src} alt="YNYC cloud" className="h-full w-full" />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function AircraftRails({ scrollY }) {
  const railDefs = [
    { id: "air-1", topStart: 34, topEnd: 4, width: "11vw", minWidth: "84px", maxWidth: "180px", direction: 1, durationPx: STEP_HEIGHT * 11.5, seed: 4100 },
    { id: "air-2", topStart: 35, topEnd: 9, width: "8.5vw", minWidth: "70px", maxWidth: "140px", direction: -1, durationPx: STEP_HEIGHT * 9.8, seed: 4200 },
    { id: "air-3", topStart: 36, topEnd: 14, width: "10vw", minWidth: "76px", maxWidth: "156px", direction: 1, durationPx: STEP_HEIGHT * 12.6, seed: 4300 },
    { id: "air-4", topStart: 37, topEnd: 19, width: "8vw", minWidth: "66px", maxWidth: "132px", direction: -1, durationPx: STEP_HEIGHT * 10.9, seed: 4400 },
    { id: "air-5", topStart: 38, topEnd: 24, width: "9.5vw", minWidth: "72px", maxWidth: "150px", direction: 1, durationPx: STEP_HEIGHT * 13.8, seed: 4500 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 z-[3] overflow-hidden">
      {railDefs.map((rail, index) => {
        const cycle = rail.durationPx;
        const raw = (((scrollY + index * cycle * 0.31) % cycle) + cycle) % cycle;
        const t = raw / cycle;
        const left = rail.direction > 0 ? lerp(-14, 114, t) : lerp(114, -14, t);
        const arc = Math.sin(t * Math.PI * 0.98);
        const top = lerp(rail.topStart, rail.topEnd, arc);
        const opacity = 0.24 + arc * 0.52;
        const src = pickSeeded(AIRCRAFT_IMAGES, rail.seed + Math.floor(scrollY / cycle) + index * 13);

        if (!src) return null;

        return (
          <div
            key={rail.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${left}%`,
              top: `${top}vh`,
              width: rail.width,
              minWidth: rail.minWidth,
              maxWidth: rail.maxWidth,
              opacity,
            }}
          >
            <ImageAsset src={src} alt="YNYC aircraft" className="h-full w-full" />
          </div>
        );
      })}
    </div>
  );
}

function RiverSurface({ scrollY }) {
  const shiftA = -((scrollY * 0.02) % 100);
  const shiftB = ((scrollY * 0.028) % 100);

  return (
    <div className="pointer-events-none absolute left-0 top-[31vh] z-[4] h-[12vh] w-full overflow-hidden opacity-80">
      <div className="absolute inset-0 opacity-48">
        <ImageAsset src={ASSETS.riverStrip} alt="YNYC river" className="h-full w-full object-cover" />
      </div>

      <div
        className="absolute left-0 top-[16%] flex h-[30%] w-[220vw]"
        style={{ transform: `translateX(${shiftA}vw)`, opacity: 0.62 }}
      >
        <div className="h-full w-[110vw]">
          <ImageAsset src={ASSETS.waveA} alt="YNYC wave" className="h-full w-full object-cover" />
        </div>
        <div className="h-full w-[110vw]">
          <ImageAsset src={ASSETS.waveA} alt="YNYC wave duplicate" className="h-full w-full object-cover" />
        </div>
      </div>

      <div
        className="absolute left-0 top-[46%] flex h-[28%] w-[220vw]"
        style={{ transform: `translateX(-${shiftB}vw)`, opacity: 0.5 }}
      >
        <div className="h-full w-[110vw]">
          <ImageAsset src={ASSETS.waveB} alt="YNYC wave" className="h-full w-full object-cover" />
        </div>
        <div className="h-full w-[110vw]">
          <ImageAsset src={ASSETS.waveB} alt="YNYC wave duplicate" className="h-full w-full object-cover" />
        </div>
      </div>
    </div>
  );
}

function BackgroundPerspective({ scrollY }) {
  const skylineShift = -((scrollY * 0.018) % 120);
  const cityscapeShift = -((scrollY * 0.03) % 120);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-white">
      <div className="absolute inset-0 bg-white" />
      <DayNightSky scrollY={scrollY} />
      <CloudRails />
      <AircraftRails scrollY={scrollY} />

      <ForegroundCityCanyon scrollY={scrollY} />

      <div
        className="absolute left-0 top-[28vh] h-[7vh] w-full overflow-hidden"
        style={{ opacity: 0.12 }}
      >
        <div
          className="absolute left-0 top-0 flex h-full w-[240vw]"
          style={{ transform: `translateX(${skylineShift}vw)` }}
        >
          <div className="h-full w-[120vw]">
            <ImageAsset
              src={ASSETS.skylineStrip}
              alt="Skyline strip"
              className="h-full w-full"
            />
          </div>
          <div className="h-full w-[120vw]">
            <ImageAsset
              src={ASSETS.skylineStrip}
              alt="Skyline strip duplicate"
              className="h-full w-full"
            />
          </div>
        </div>
      </div>

      <div
        className="absolute left-1/2 top-[18.5vh] h-[24vh] w-[92vw] md:w-[78vw] lg:w-[70vw] -translate-x-1/2"
        style={{ opacity: 0.4 }}
      >
        <ImageAsset
          src={ASSETS.bridgeSkylineExtended}
          alt="Extended bridge skyline"
          className="h-full w-full"
        />
      </div>

      <RiverSurface scrollY={scrollY} />
      <RiverTraffic scrollY={scrollY} />

      <div
        className="absolute left-0 top-[77vh] h-[9vh] w-full overflow-hidden"
        style={{
          opacity: 0.04,
          maskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}
      >
        <div
          className="absolute left-0 top-0 flex h-full w-[240vw]"
          style={{ transform: `translateX(${cityscapeShift}vw)` }}
        >
          <div className="h-full w-[120vw]">
            <ImageAsset
              src={ASSETS.bottomLine}
              alt="Lower cityscape line"
              className="h-full w-full"
            />
          </div>
          <div className="h-full w-[120vw]">
            <ImageAsset
              src={ASSETS.bottomLine}
              alt="Lower cityscape line duplicate"
              className="h-full w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function buildStreamItems() {
  return Array.from({ length: STREAM_COUNT }, (_, index) => {
    const plane = index % 3 === 0 ? "ceiling" : "floor";
    const lane = LANE_OFFSETS[index % LANE_OFFSETS.length];
    const lawdingSrc = pickSeeded(
      WEIGHTED_LAWDING_IMAGES.length ? WEIGHTED_LAWDING_IMAGES : LAWDING_IMAGES.map((item) => item.src),
      index + 777
    );

    return {
      id: index,
      plane,
      lane,
      itemType: "lawding",
      content: lawdingSrc,
      worldY: index * STEP_HEIGHT * 0.72,
    };
  });
}

function FixedHeader() {
  const buttons = [
    { label: "Quote a Matter", target: "quote" },
    { label: "Chat W A Lawyer", target: "hero-input" },
    { label: "E-Mail Us", target: "email" },
    { label: "Check Status", target: "matters" },
  ];

  const jumpTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="fixed left-0 top-0 z-50 w-full bg-white/10 px-2 pb-2 pt-1.5 backdrop-blur-[1px] md:px-4">
      <style>{`
        .ynyc-action-button {
          background-color: rgba(255,255,255,0.18);
          background-image: repeating-linear-gradient(-14deg, rgba(78,109,66,0.12) 0px, rgba(78,109,66,0.12) 1px, transparent 1px, transparent 9px);
        }
        .ynyc-action-button:hover {
          background-color: rgba(255,255,255,0.08);
          background-image: repeating-linear-gradient(-14deg, rgba(78,109,66,0.42) 0px, rgba(78,109,66,0.42) 2px, transparent 2px, transparent 10px);
        }
        .ynyc-action-button span {
          background: rgba(255,255,255,0.82);
          padding: 0 0.2em;
          border-radius: 999px;
        }
      `}</style>

      <div className="mx-auto max-w-6xl">
        <div className="flex justify-center">
          <ImageAsset
            src={ASSETS.ynycGraffitiLogo}
            alt="YNYC graffiti logo"
            className="h-[64px] w-[210px] object-contain mix-blend-multiply md:h-[130px] md:w-[414px]"
          />
        </div>

        <div className="mt-1 border-b border-black/70" />

        <nav className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-4">
          {buttons.map((button) => (
            <button
              key={button.label}
              type="button"
              onClick={() => jumpTo(button.target)}
              className="ynyc-action-button rounded-[12px] border px-3 py-2.5 text-[10px] font-black uppercase tracking-[0.08em] text-black transition md:px-3 md:py-2 md:text-[10px]"
              style={{ borderColor: GRID_GREEN }}
            >
              <span>{button.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

function FixedBrandLockup() {
  return (
    <div className="pointer-events-none fixed left-1/2 top-[39.4vh] z-40 -translate-x-1/2 text-center">
      <div
        className="whitespace-nowrap uppercase text-black"
        style={{
          fontSize: "clamp(10px, 1.35vw, 16px)",
          fontWeight: 500,
          letterSpacing: "0.14em",
          lineHeight: 1,
        }}
      >
        <span>YOUR</span>
        <span className="mx-[0.16em] font-black">NEWYORK</span>
        <span>COUNSEL</span>
      </div>
    </div>
  );
}

function HorizonLiberty({ scrollY, viewportH }) {
  const positions = [50, 34, 66, 50];

  const imageSources = [
    ASSETS.avatarInquiry,
    ASSETS.avatarSide,
    ASSETS.avatarBack,
    ASSETS.avatarHero,
  ];

  const PASS_PX = STEP_HEIGHT * 2.9;
  const RECEDE_PX = STEP_HEIGHT * 7.2;
  const PAUSE_PX = STEP_HEIGHT * 1.8;
  const TRAVEL_PX = PASS_PX + RECEDE_PX;
  const EVENT_PX = TRAVEL_PX + PAUSE_PX;

  const totalCyclePx = EVENT_PX * positions.length;
  const cycleOffset = ((scrollY % totalCyclePx) + totalCyclePx) % totalCyclePx;
  const eventIndex = Math.floor(cycleOffset / EVENT_PX);
  const eventLocal = cycleOffset - eventIndex * EVENT_PX;

  const x = positions[eventIndex];
  const horizonPx = (HORIZON_Y / 100) * viewportH;
  const midPx = viewportH * 0.68;
  const nearPx = viewportH * 0.92;

  const travelT = clamp(eventLocal / TRAVEL_PX, 0, 1);

  let topPx = nearPx;
  let widthVw = 34 * LIBERTY_SCALE;

  if (eventLocal <= PASS_PX) {
    const t = clamp(eventLocal / PASS_PX, 0, 1);
    topPx = lerp(nearPx, midPx, Math.pow(t, 0.92));
    widthVw = lerp(
      34 * LIBERTY_SCALE,
      18 * LIBERTY_SCALE,
      Math.pow(t, 1.02)
    );
  } else if (eventLocal <= TRAVEL_PX) {
    const t = clamp((eventLocal - PASS_PX) / RECEDE_PX, 0, 1);
    topPx = lerp(midPx, horizonPx, Math.pow(t, 1.08));
    widthVw = lerp(
      18 * LIBERTY_SCALE,
      7.5 * LIBERTY_SCALE,
      Math.pow(t, 1.12)
    );
  } else {
    topPx = horizonPx;
    widthVw = 7.5 * LIBERTY_SCALE;
  }

  const fadeInPx = STEP_HEIGHT * 0.7;
  const fadeOutPx = STEP_HEIGHT * 3.1;

  let baseOpacity = 0;
  if (eventLocal <= TRAVEL_PX) {
    const fadeIn = clamp(eventLocal / fadeInPx, 0, 1);
    const remainingPx = TRAVEL_PX - eventLocal;
    const fadeOut = clamp(remainingPx / fadeOutPx, 0, 1);

    const fadeInOpacity = Math.pow(fadeIn, 0.72);
    const fadeOutOpacity = Math.pow(fadeOut, 0.55);

    baseOpacity = 0.86 * Math.min(fadeInOpacity, fadeOutOpacity);
  }

  const framePosition = travelT * (imageSources.length - 1);
  const activeIndex = Math.floor(framePosition);
  const nextIndex = Math.min(activeIndex + 1, imageSources.length - 1);
  const mix = framePosition - activeIndex;

  return (
    <div
      className="pointer-events-none fixed -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${x}%`,
        top: `${topPx}px`,
        width: `${widthVw}vw`,
        height: `${widthVw * 1.45}vw`,
        opacity: baseOpacity,
        zIndex: 28,
      }}
    >
      <ImageAsset
        src={imageSources[activeIndex]}
        alt="YNYC Liberty avatar"
        className="absolute inset-0 h-full w-full"
      />

      {nextIndex !== activeIndex && (
        <div className="absolute inset-0" style={{ opacity: clamp(mix, 0, 1) }}>
          <ImageAsset
            src={imageSources[nextIndex]}
            alt="YNYC Liberty avatar transition"
            className="h-full w-full"
          />
        </div>
      )}
    </div>
  );
}

export default function YNYCTestSiteDraft() {
  const [scrollY, setScrollY] = useState(0);
  const [viewportH, setViewportH] = useState(900);

  useEffect(() => {
    const update = () => {
      setScrollY(window.scrollY || 0);
      setViewportH(window.innerHeight || 900);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const streamItems = useMemo(() => buildStreamItems(), []);

  const renderedItems = useMemo(() => {
    const horizonPx = (HORIZON_Y / 100) * viewportH;
    const floorNearPx = (FLOOR_NEAR_Y / 100) * viewportH;
    const ceilingNearPx = (CEILING_NEAR_Y / 100) * viewportH;
    const activeWindow = STEP_HEIGHT * 8.6;

    return streamItems
      .map((item) => {
        const local = (scrollY - item.worldY) / activeWindow;
        if (local < -0.06 || local > 1.1) return null;

        const z = easeDepth(local);
        const isCeiling = item.plane === "ceiling";
        const overshoot = clamp((local - 1) / 0.1, 0, 1);
        const startY = isCeiling ? horizonPx - 1 : horizonPx + 1;
        const endY = isCeiling ? ceilingNearPx : floorNearPx;

        let screenY = lerp(startY, endY, clamp(z, 0, 1));

        if (overshoot > 0) {
          screenY = isCeiling
            ? lerp(screenY, -160, overshoot)
            : lerp(screenY, viewportH + 160, overshoot);
        }

        const spreadMax = isCeiling ? 10.4 : 12.2;
        const spread = lerp(0.45, spreadMax, Math.pow(clamp(z, 0, 1), 1.05));
        const leftPercent = VANISH_X + item.lane * spread;

        let sizeNear = isCeiling ? 26 : 32;
        if (item.itemType === "lawding") sizeNear = isCeiling ? 30 : 36;

        sizeNear *= FLOATING_SCALE;

        const startSize = item.itemType === "lawding" ? 1.2 * FLOATING_SCALE : 0.42 * FLOATING_SCALE;

        let sizeVw = lerp(
          startSize,
          sizeNear,
          Math.pow(clamp(z, 0, 1), 1.26)
        );

        if (overshoot > 0) {
          sizeVw = lerp(sizeVw, sizeVw * 1.28, overshoot);
        }

        let opacity = clamp(0.18 + z * 1.12, 0, item.itemType === "lawding" ? 0.86 : 0.96);
        if (overshoot > 0) opacity *= 1 - overshoot;

        return {
          ...item,
          screenY,
          leftPercent,
          sizeVw,
          opacity,
          zIndex: Math.floor(z * 1000),
        };
      })
      .filter(Boolean)
      .sort((a, b) => a.zIndex - b.zIndex);
  }, [streamItems, scrollY, viewportH]);

  return (
    <main
      className="relative min-h-screen overflow-x-hidden bg-white text-black"
      style={{ minHeight: `${PAGE_HEIGHT}px` }}
    >
      <BackgroundPerspective scrollY={scrollY} />
      <FixedHeader />
      <HorizonLiberty scrollY={scrollY} viewportH={viewportH} />
      <FixedBrandLockup />

      <div className="pointer-events-none fixed inset-0 z-10">
        {renderedItems.map((item) => (
          <div
            key={item.id}
            className="fixed"
            style={{
              top: `${item.screenY}px`,
              left: `${item.leftPercent}%`,
              width: `${item.sizeVw}vw`,
              height: `${item.sizeVw}vw`,
              transform: "translate(-50%, -50%)",
              opacity: item.opacity,
              zIndex: item.zIndex + 10,
            }}
          >
            {item.itemType === "lawding" && (
              <ImageAsset
                src={item.content}
                alt="YNYC lawding"
                className="h-full w-full"
              />
            )}
          </div>
        ))}
      </div>

      <div className="relative z-30 mx-auto max-w-6xl px-6 pt-[48vh] md:px-12">
        <section className="mx-auto max-w-3xl pb-[26vh] text-center">
          <h1 className="mt-2 text-5xl font-black uppercase tracking-tight md:text-7xl">
            Counsel for
            <br />
            what comes next.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-black/70 md:text-lg md:leading-8">
            A mobile-first legal tool for learning, quoting matters, checking status, and getting attorney-supported guidance from one useful window. 
            Use the buttons or simply type what is going on in plain English below — if you are not sure where to begin, start there.
          </p>

          <div className="relative mt-6 h-[42vh]" id="hero-input">
            <div className="sticky top-[150px] z-50 mx-auto max-w-2xl md:top-[250px]">
              <div
                className="flex items-center rounded-[14px] border border-black/55 px-3 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.05)] backdrop-blur-[1px] md:px-4 md:py-3"
                style={{ backgroundColor: "rgba(255,255,255,0.10)" }}
              >
                <input
                  aria-label="Ask YNYC a question"
                  placeholder="ASK A QUESTION OR DESCRIBE A MATTER..."
                  className="h-8 flex-1 bg-transparent text-[10px] uppercase tracking-[0.12em] text-black outline-none placeholder:text-black/45 md:text-[11px]"
                />
                <button
                  type="button"
                  className="ml-3 h-8 w-8 rounded-full border border-black/45 bg-white/10 text-sm text-black/70"
                  aria-label="Submit"
                  title="Submit"
                >
                  ↵
                </button>
              </div>
            </div>
          </div>
        </section>

        {SECTION_CONTENT.map((section, index) => (
          <section
            id={section.id}
            key={section.title}
            style={{ scrollMarginTop: "132px" }}
            className="grid min-h-[88vh] items-center border-t border-black/10 py-20 md:grid-cols-12 md:gap-10"
          >
            <div className="md:col-span-4">
              <p className="text-[18px] font-black uppercase tracking-[0.12em] text-black underline underline-offset-[6px]">
                {section.eyebrow}
              </p>
            </div>

            <div className="mt-6 md:col-span-8 md:mt-0">
              <h2 className="max-w-3xl text-3xl font-semibold leading-tight md:text-5xl">
                {section.title}
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-black/68 md:text-lg">
                {section.body}
              </p>
              <button
                type="button"
                className="mt-8 border border-black bg-black px-5 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-black"
              >
                Activate — {section.action}
              </button>
            </div>
          </section>
        ))}

        <section className="grid min-h-[110vh] border-t border-black/10 py-20 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-4">
            <p className="text-[18px] font-black uppercase tracking-[0.12em] text-black underline underline-offset-[6px]">
              Projects / Teams / Referrals
            </p>
          </div>

          <div className="mt-6 grid gap-5 md:col-span-8 md:mt-0 md:grid-cols-3">
            {[
              "Org-chart structures",
              "Deal architecture",
              "Working notes",
              "Courtroom posture",
              "IP symbols",
              "Judgment / fairness / discretion",
            ].map((item) => (
              <div key={item} className="border border-black/12 bg-white p-6">
                <p className="text-sm uppercase tracking-[0.18em] text-black/55">
                  {item}
                </p>
                <p className="mt-4 text-base leading-7 text-black/70">
                  Placeholder block for later refinement. The motion system and
                  structure can stay while the final content evolves.
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="email" style={{ scrollMarginTop: "132px" }} className="border-t border-black/10 py-24">
          <div className="max-w-3xl">
            <p className="text-[12px] uppercase tracking-[0.28em] text-black/45">
              Email Us
            </p>
            <h2 className="mt-5 text-4xl font-semibold md:text-6xl">
              Structure first.
              <br />
              Messaging next.
            </h2>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-black/68">
              This pass is about the right atmosphere: fixed identity, vertical
              editorial scroll, wider moving field, green structural guides, and
              marked linework that feels more alive and less sterile.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
