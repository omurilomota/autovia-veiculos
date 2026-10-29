export function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <span
      className="grid shrink-0 place-items-center rounded-xl"
      style={{
        width: size,
        height: size,
        background: "var(--pine-900)",
        boxShadow: "inset 0 0 0 1.5px rgba(200,241,105,0.25)",
      }}
      aria-hidden="true"
    >
      <svg
        width={size * 0.62}
        height={size * 0.62}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* estrada em perspectiva */}
        <path
          d="M3.5 20.5 L9.4 3.5 H14.6 L20.5 20.5"
          stroke="var(--lime)"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 5.5 V8 M12 11 V14 M12 17 V20"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export function Wordmark({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  return (
    <span className="flex min-w-0 flex-col leading-none">
      <span
        className={`font-display font-extrabold uppercase tracking-tight ${
          compact ? "text-[18px] sm:text-[21px]" : "text-[22px]"
        }`}
        style={{ color: light ? "#fff" : "var(--pine-900)" }}
      >
        Auto&nbsp;Via
      </span>
      <span
        className={`font-bold uppercase tracking-[0.24em] ${
          compact ? "text-[8px] sm:text-[8.5px]" : "text-[9px]"
        }`}
        style={{ color: light ? "rgba(255,255,255,0.55)" : "var(--faint)" }}
      >
        Veículos
      </span>
    </span>
  );
}

export function Brand({
  light = false,
  size,
  compact = false,
}: {
  light?: boolean;
  size?: number;
  compact?: boolean;
}) {
  return (
    <span className="inline-flex min-w-0 items-center gap-2 sm:gap-2.5">
      <span className={compact ? "scale-[0.85] origin-left sm:scale-100" : ""}>
        <LogoMark size={size ?? (compact ? 36 : 40)} />
      </span>
      <Wordmark light={light} compact={compact} />
    </span>
  );
}

export function Plate({ text = "AUTOVIA" }: { text?: string }) {
  return (
    <span className="plate" aria-hidden="true">
      <span className="plate-top">BRASIL</span>
      <span className="plate-body">{text}</span>
    </span>
  );
}
