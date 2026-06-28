import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { hero } from "../data/content";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const wordVariant: Variants = {
  hidden: { y: "110%" },
  show: {
    y: "0%",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 + i * 0.12 },
  }),
};

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [pointer, setPointer] = useState({ x: 50, y: 38 });
  const [fine, setFine] = useState(false);

  useEffect(() => {
    setFine(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.22]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const veilOpacity = useTransform(scrollYProgress, [0, 1], [0.5, 0.82]);

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !fine) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPointer({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
  };

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-void"
    >
      {/* Background photo with Ken-Burns + scroll scale */}
      <motion.div
        className="absolute inset-0"
        style={reduce ? undefined : { scale: imgScale, y: imgY }}
      >
        <img
          src="/img/hero-interior.jpg"
          alt="Интерьер ЛУМА в тёплом кинематографичном свете"
          fetchPriority="high"
          className={`h-full w-full object-cover object-center ${reduce ? "" : "kenburns"}`}
        />
      </motion.div>

      {/* Warm light + legibility veil */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 78% 8%, rgba(201,167,124,0.20), transparent 55%)",
        }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: reduce ? 0.7 : veilOpacity,
          background:
            "linear-gradient(90deg, rgba(10,10,11,0.72) 0%, rgba(10,10,11,0.30) 42%, rgba(10,10,11,0) 70%), linear-gradient(270deg, rgba(10,10,11,0.55) 0%, rgba(10,10,11,0) 42%), linear-gradient(180deg, rgba(10,10,11,0.45) 0%, rgba(10,10,11,0.20) 30%, rgba(10,10,11,0.55) 66%, rgba(10,10,11,0.97) 100%)",
        }}
      />
      {/* Cursor-follow soft light */}
      {!reduce && fine && (
        <div
          className="pointer-events-none absolute inset-0 transition-[background] duration-300"
          style={{
            background: `radial-gradient(420px 420px at ${pointer.x}% ${pointer.y}%, rgba(245,241,234,0.10), transparent 70%)`,
          }}
        />
      )}

      {/* Soft scrim behind principles for legibility over bright arches */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-[5] hidden w-1/2 lg:block"
        style={{
          background:
            "radial-gradient(58% 40% at 90% 50%, rgba(10,10,11,0.82), rgba(10,10,11,0) 72%)",
        }}
      />

      {/* Rotating brand principles */}
      <RotatingPrinciples reduce={!!reduce} />

      {/* Content */}
      <motion.div
        className="container-luma relative z-10 flex h-full flex-col justify-end pb-[12vh] md:pb-[14vh]"
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="meta mb-6 text-[var(--color-accent)] md:mb-8"
          style={{ textShadow: "0 1px 24px rgba(0,0,0,0.55)" }}
        >
          {hero.kicker}
        </motion.p>

        <motion.h1
          variants={container}
          initial="hidden"
          animate="show"
          className="font-display text-chalk"
          style={{
            fontSize: "clamp(2.5rem, 7vw, 5.75rem)",
            lineHeight: 1.04,
            letterSpacing: "-0.025em",
          }}
        >
          {hero.titleWords.map((word, i) => (
            <span key={i} className="block overflow-hidden pb-[0.06em]">
              <motion.span variants={wordVariant} className="block">
                {word}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="mt-7 max-w-xl text-base leading-relaxed text-chalk/80 md:mt-9 md:text-lg"
          style={{ textShadow: "0 1px 24px rgba(0,0,0,0.55)" }}
        >
          {hero.subtitle}
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center md:mt-11"
        >
          <a href={hero.ctaPrimary.href} className="pill pill-primary justify-center">
            {hero.ctaPrimary.label}
          </a>
          <a href={hero.ctaSecondary.href} className="pill pill-ghost justify-center">
            {hero.ctaSecondary.label}
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      {!reduce && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 md:block"
        >
          <div className="flex h-11 w-6 items-start justify-center rounded-full border border-white/25 p-1.5">
            <motion.span
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="block h-1.5 w-1 rounded-full bg-[var(--color-accent)]"
            />
          </div>
        </motion.div>
      )}
    </section>
  );
}

function RotatingPrinciples({ reduce }: { reduce: boolean }) {
  const items = hero.principles;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, 3200);
    return () => clearInterval(id);
  }, [reduce, items.length]);

  const shadow = { textShadow: "0 2px 18px rgba(0,0,0,0.9)" } as const;

  return (
    <div className="pointer-events-none absolute right-[6%] top-1/2 z-10 hidden w-[22rem] -translate-y-1/2 text-right lg:block">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="meta mb-5 text-[var(--color-accent)]"
        style={shadow}
      >
        {hero.principlesLabel}
      </motion.p>

      {reduce ? (
        <div className="space-y-3.5">
          {items.map((lines) => (
            <p
              key={lines.join(" ")}
              className="font-display text-[1.5rem] leading-[1.12] text-chalk"
              style={shadow}
            >
              {lines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </p>
          ))}
        </div>
      ) : (
        <>
          <div className="relative h-[4.5rem] w-full md:h-[5.25rem]">
            <AnimatePresence mode="wait">
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute right-0 top-0 w-full font-display text-[1.6rem] leading-[1.12] text-chalk md:text-[1.75rem]"
                style={shadow}
              >
                {items[index].map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="mt-5 flex justify-end gap-2">
            {items.map((_, i) => (
              <span
                key={i}
                className="h-1.5 w-1.5 rounded-full transition-colors duration-500"
                style={{
                  backgroundColor:
                    i === index ? "var(--color-accent)" : "rgba(245,241,234,0.25)",
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
