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
      <div className={`mb-4 flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}>
        <span className="h-px w-8 bg-gradient-to-r from-[#DF2531] to-transparent" />
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#DF2531]">
          {eyebrow}
        </p>
        <span className="h-px w-8 bg-gradient-to-l from-[#DF2531] to-transparent" />
      </div>
      <h2 className="text-4xl font-black tracking-tight text-white md:text-5xl">
        {title}
      </h2>
    </Reveal>
  );
}
