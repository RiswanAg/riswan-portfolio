import Image from "next/image";
import { SKILL_GROUPS } from "@/lib/data";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/site/section-header";

/** Compact skills strip under the About intro, grouped in data order. */
export function Toolkit() {
  return (
    <section aria-labelledby="toolkit-title" className="py-14">
      <Container>
        <h3 id="toolkit-title" className="text-center font-mono text-xs uppercase tracking-[0.3em] text-dim">
          Toolkit
        </h3>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {SKILL_GROUPS.map((group, index) => (
            <Reveal
              key={group.category}
              delay={index * 0.06}
              className="rounded-2xl border border-line bg-surface/60 p-4 backdrop-blur"
            >
              <p className="text-sm font-semibold text-ink">{group.category}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-canvas/60 py-1 pl-1 pr-3 text-xs font-medium text-ink"
                  >
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-white p-1">
                      <Image
                        src={skill.logo}
                        alt=""
                        width={16}
                        height={16}
                        className="h-4 w-4 object-contain [filter:drop-shadow(0_0_0.75px_rgb(2_48_71/0.6))]"
                      />
                    </span>
                    {skill.name}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
