import React, { useEffect, useMemo, useState } from "react";

const STREAM_COUNT = 340;
const STEP_HEIGHT = 175;
const PAGE_HEIGHT = 9800;

const VANISH_X = 50;
const HORIZON_Y = 34;
const FLOOR_NEAR_Y = 108;
const CEILING_NEAR_Y = 3;
const WALL_NEAR_X = 4;
const WALL_FAR_X = 96;

const LANE_OFFSETS = [-3.8, -2.8, -1.8, -0.8, 0.8, 1.8, 2.8, 3.8];
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
};

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
    eyebrow: "YNYC™",
    title: "Counsel with structure, judgment, and range.",
    body:
      "A prototype homepage built around a clean editorial scroll in front, with hand-marked legal sketches and symbolic matter imagery moving through a perspective field behind it.",
  },
  {
    eyebrow: "Practice",
    title: "Business, IP, transactions, media, and outside counsel work.",
    body:
      "The visual system is intentionally evocative rather than final. It suggests the kinds of matters you touch — intellectual property, deal structure, advocacy, governance, discretion, and practical commercial judgment.",
  },
  {
    eyebrow: "Visual system",
    title: "Graffiti marks, a green structural grid, and a steady brand anchor.",
    body:
      "The content scrolls vertically, while the background field continues to move independently. That keeps the site readable while preserving the dynamic spatial atmosphere.",
  },
  {
    eyebrow: "Prototype use",
    title: "A buildable structure before final messaging.",
    body:
      "This is a shell for future refinement. We can later swap in final copy, real practice areas, specific matter examples, and cleaner visual buckets without changing the motion system.",
  },
  {
    eyebrow: "Next step",
    title: "Refine the story once the chassis feels right.",
    body:
      "For now, this version prioritizes feel: white space, black marks, green structure lines, a centered YNYC™ mark, and Liberty-inspired motion cues tied to justice, fairness, loyalty, and discretion.",
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
  const [index, setIndex] = useState(0);
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
  const bargeCycle = STEP_HEIGHT * 12;
  const ferryCycle = STEP_HEIGHT * 15;

  const bargeRaw = ((scrollY % bargeCycle) + bargeCycle) % bargeCycle;
  const ferryRaw =
    (((scrollY + ferryCycle * 0.38) % ferryCycle) + ferryCycle) % ferryCycle;

  const bargeT = bargeRaw / bargeCycle;
  const ferryT = ferryRaw / ferryCycle;

  const bargeWindow = clamp((bargeT - 0.08) / 0.78, 0, 1);
  const ferryWindow = clamp((ferryT - 0.16) / 0.62, 0, 1);

  const bargeVisible = bargeT > 0.08 && bargeT < 0.86;
  const ferryVisible = ferryT > 0.16 && ferryT < 0.78;

  const bargeLeft = lerp(-18, 118, bargeT);
  const ferryLeft = lerp(118, -18, ferryT);

  const bargeOpacity = bargeVisible
    ? 0.12 + Math.sin(bargeWindow * Math.PI) * 0.58
    : 0;
  const ferryOpacity = ferryVisible
    ? 0.1 + Math.sin(ferryWindow * Math.PI) * 0.52
    : 0;

  const bargeBob = Math.sin(scrollY * 0.006) * 0.35;
  const ferryBob = Math.sin(scrollY * 0.007 + 1.8) * 0.45;

  return (
    <div className="pointer-events-none absolute left-0 top-[39vh] h-[8vh] w-full overflow-hidden">
      <div
        className="absolute"
        style={{
          left: `${bargeLeft}%`,
          top: `calc(28% + ${bargeBob}px)`,
          width: "18vw",
          minWidth: "150px",
          maxWidth: "280px",
          opacity: bargeOpacity,
          transform: "translate(-50%, -50%)",
        }}
      >
        <RiverBoat type="barge" />
      </div>

      <div
        className="absolute"
        style={{
          left: `${ferryLeft}%`,
          top: `calc(70% + ${ferryBob}px)`,
          width: "11vw",
          minWidth: "110px",
          maxWidth: "180px",
          opacity: ferryOpacity,
          transform: "translate(-50%, -50%)",
        }}
      >
        <RiverBoat type="ferry" />
      </div>
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
      className="pointer-events-none absolute left-0 top-[43vh] h-[60vh] w-full overflow-hidden"
      style={{
        zIndex: 4,
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 8%, black 88%, transparent 100%)",
      }}
    >
      {layers.map((layer, index) => {
        const raw = ((scrollY + cycle * layer.offset) % cycle) / cycle;
        const t = Math.pow(raw, 1.05);

        const topVh = lerp(4, 58, t);
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

function BackgroundPerspective({ scrollY }) {
  const skylineShift = -((scrollY * 0.018) % 120);
  const cityscapeShift = -((scrollY * 0.03) % 120);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-white">
      <div className="absolute inset-0 bg-white" />

      <ForegroundCityCanyon scrollY={scrollY} />

      <div
        className="absolute left-0 top-[27vh] h-[7vh] w-full overflow-hidden"
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
        className="absolute left-1/2 top-[18vh] h-[24vh] w-[92vw] md:w-[78vw] lg:w-[70vw] -translate-x-1/2"
        style={{ opacity: 0.4 }}
      >
        <ImageAsset
          src={ASSETS.bridgeSkylineExtended}
          alt="Extended bridge skyline"
          className="h-full w-full"
        />
      </div>

      <RiverTraffic scrollY={scrollY} />

      <div
        className="absolute left-0 top-[71vh] h-[10vh] w-full overflow-hidden"
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
  const iconTypes = [
    "orgchart",
    "deal",
    "notes",
    "court",
    "argument",
    "gavel",
    "balance",
  ];

  return Array.from({ length: STREAM_COUNT }, (_, index) => {
    const plane = index % 2 === 0 ? "floor" : "ceiling";
    const lane = LANE_OFFSETS[index % LANE_OFFSETS.length];
    const cycle = index % 4;

    let itemType = "icon";
    let content = iconTypes[index % iconTypes.length];

    if (cycle === 1) {
      itemType = "text";
      content = PRACTICE_TOKENS[index % PRACTICE_TOKENS.length];
    }

    if (cycle === 2) {
      itemType = "icon";
      content = iconTypes[(index + 3) % iconTypes.length];
    }

    if (cycle === 3) {
      itemType = "symbol";
      content = SYMBOLS[index % SYMBOLS.length];
    }

    return {
      id: index,
      plane,
      lane,
      itemType,
      content,
      worldY: index * STEP_HEIGHT,
    };
  });
}

function FixedHeader({ scrollY }) {
  const zoom = 1 + clamp(scrollY / 2200, 0, 0.16);

  return (
    <div className="pointer-events-none fixed left-1/2 top-6 z-50 -translate-x-1/2">
      <div
        className="text-center"
        style={{ transform: `scale(${zoom})`, transformOrigin: "center top" }}
      >
        <div
          className="font-sans text-[42px] font-bold uppercase tracking-[0.12em] text-black md:text-[64px]"
          style={{ lineHeight: 0.92 }}
        >
          YNYC™
        </div>
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
  const EVENT_PX = PASS_PX + RECEDE_PX + PAUSE_PX;

  const totalCyclePx = EVENT_PX * positions.length;
  const cycleOffset = ((scrollY % totalCyclePx) + totalCyclePx) % totalCyclePx;
  const eventIndex = Math.floor(cycleOffset / EVENT_PX);
  const eventLocal = cycleOffset - eventIndex * EVENT_PX;

  const x = positions[eventIndex];
  const imageSrc = imageSources[eventIndex % imageSources.length];

  const horizonPx = (HORIZON_Y / 100) * viewportH;
  const midPx = viewportH * 0.68;
  const nearPx = viewportH * 0.92;

  let topPx = nearPx;
  let widthVw = 34 * LIBERTY_SCALE;
  let opacity = 0.85;

  if (eventLocal <= PASS_PX) {
    const t = clamp(eventLocal / PASS_PX, 0, 1);

    topPx = lerp(nearPx, midPx, Math.pow(t, 0.92));
    widthVw = lerp(
      34 * LIBERTY_SCALE,
      18 * LIBERTY_SCALE,
      Math.pow(t, 1.02)
    );
    opacity = lerp(0.85, 0.62, Math.pow(t, 1.04));
  } else if (eventLocal <= PASS_PX + RECEDE_PX) {
    const t = clamp((eventLocal - PASS_PX) / RECEDE_PX, 0, 1);

    topPx = lerp(midPx, horizonPx, Math.pow(t, 1.08));
    widthVw = lerp(
      18 * LIBERTY_SCALE,
      7.5 * LIBERTY_SCALE,
      Math.pow(t, 1.12)
    );
    opacity = lerp(0.62, 0.12, Math.pow(t, 1.16));
  } else {
    topPx = horizonPx;
    widthVw = 7.5 * LIBERTY_SCALE;
    opacity = 0;
  }

  return (
    <div
      className="pointer-events-none fixed -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${x}%`,
        top: `${topPx}px`,
        width: `${widthVw}vw`,
        height: `${widthVw * 1.45}vw`,
        opacity,
        zIndex: 28,
      }}
    >
      <ImageAsset
        src={imageSrc}
        alt="YNYC Liberty avatar"
        className="h-full w-full"
      />
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

        let sizeNear = 22;
        if (item.itemType === "text") sizeNear = isCeiling ? 18 : 24;
        if (item.itemType === "symbol") sizeNear = isCeiling ? 14 : 18;
        if (item.itemType === "icon") sizeNear = isCeiling ? 18 : 22;

        sizeNear *= FLOATING_SCALE;

        const startSize = 0.42 * FLOATING_SCALE;

        let sizeVw = lerp(
          startSize,
          sizeNear,
          Math.pow(clamp(z, 0, 1), 1.26)
        );

        if (overshoot > 0) {
          sizeVw = lerp(sizeVw, sizeVw * 1.28, overshoot);
        }

        let opacity = clamp(0.05 + z * 1.08, 0, 0.96);
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
      <FixedHeader scrollY={scrollY} />
      <HorizonLiberty scrollY={scrollY} viewportH={viewportH} />

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
            {item.itemType === "icon" && (
              <SketchIcon type={item.content} flip={false} />
            )}
            {item.itemType === "text" && (
              <FloatingText text={item.content} flip={false} />
            )}
            {item.itemType === "symbol" && (
              <FloatingText text={item.content} flip={false} symbol />
            )}
          </div>
        ))}
      </div>

      <div className="relative z-30 mx-auto max-w-6xl px-8 pt-[26vh] md:px-12">
        <section className="mx-auto max-w-3xl pb-[24vh] text-center">
          <p className="text-[12px] uppercase tracking-[0.35em] text-black/55">
            Your New York Counsel™
          </p>

          <h1 className="mt-6 text-5xl font-semibold uppercase tracking-tight md:text-7xl">
            Counsel for
            <br />
            what comes next.
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-black/70">
            A black-and-white editorial prototype with a green structural field,
            hand-marked matter sketches, and a Liberty figure anchored at the
            horizon while the content scrolls above the motion system.
          </p>

        </section>

        {SECTION_CONTENT.map((section, index) => (
          <section
            key={section.title}
            className="grid min-h-[88vh] items-center border-t border-black/10 py-20 md:grid-cols-12 md:gap-10"
          >
            <div className="md:col-span-4">
              <p className="text-[12px] uppercase tracking-[0.28em] text-black/45">
                {String(index + 1).padStart(2, "0")} — {section.eyebrow}
              </p>
            </div>

            <div className="mt-6 md:col-span-8 md:mt-0">
              <h2 className="max-w-3xl text-3xl font-semibold leading-tight md:text-5xl">
                {section.title}
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-black/68 md:text-lg">
                {section.body}
              </p>
            </div>
          </section>
        ))}

        <section className="grid min-h-[110vh] border-t border-black/10 py-20 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-4">
            <p className="text-[12px] uppercase tracking-[0.28em] text-black/45">
              Matter vocabulary
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

        <section className="border-t border-black/10 py-24">
          <div className="max-w-3xl">
            <p className="text-[12px] uppercase tracking-[0.28em] text-black/45">
              End state
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
