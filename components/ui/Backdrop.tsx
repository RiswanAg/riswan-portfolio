/**
 * Global fixed background: dotted mesh + two slow drifting aurora glows.
 * Server component — no interactivity. Grain is applied on <body>.
 */
export function Backdrop() {
  return (
    <div aria-hidden className="fixed inset-0 z-0 pointer-events-none">
      <div className="absolute inset-0 bg-grid" />
      <div
        className="aurora top-[-10%] left-[-5%] h-[42vw] w-[42vw] bg-emerald-500/12"
        style={{ animationDelay: "0s" }}
      />
      <div
        className="aurora bottom-[-15%] right-[-8%] h-[40vw] w-[40vw] bg-cyan-500/10"
        style={{ animationDelay: "6s" }}
      />
      {/* Vignette so edges fall to black */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,#050608_100%)]" />
    </div>
  );
}
