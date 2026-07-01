import { Reveal } from "./Reveal";

/** Eyebrow + title block used to open most sections. */
export function SectionHeading({
  eyebrow,
  title,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  align?: "center" | "left";
}) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <Reveal className={`mb-14 max-w-2xl ${alignment}`}>
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-[#DF2531]">
        {eyebrow}
      </p>
      <h2 className="text-4xl font-black tracking-tight text-white md:text-5xl">
        {title}
      </h2>
    </Reveal>
  );
}
