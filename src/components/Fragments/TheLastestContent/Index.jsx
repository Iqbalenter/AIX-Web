import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

import bgCard1 from "../../../assets/SynFutures AI Framework_ A Full-Stack AI Agent Ecosystem.png";
import bgCard2 from "../../../assets/Experience DeFi on Easy Mode with Synthia and SynFutures AI Framework.png";
import bgCard3 from "../../../assets/AIX 2025 Roadmap_ An Overview.png";
import bgCard4 from "../../../assets/AIX Airdrop.png";

const TheLastestContent = ({
  items = DEFAULT_ITEMS,
  delayMs = 220,
  transitionMs = 450,
}) => {
  const slides = useMemo(() => [...items, items[0]], [items]);

  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const firstSlideRef = useRef(null);

  const [slideW, setSlideW] = useState(0);
  const [index, setIndex] = useState(0);
  const [anim, setAnim] = useState(false);
  const [pending, setPending] = useState(false);

  const measure = () => {
    if (!trackRef.current || !firstSlideRef.current) return;
    const gapPx = parseFloat(
      getComputedStyle(trackRef.current).columnGap ||
        getComputedStyle(trackRef.current).gap ||
        "0"
    );
    setSlideW(firstSlideRef.current.offsetWidth + gapPx);
  };

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    if (firstSlideRef.current) ro.observe(firstSlideRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onEnd = () => {
      setAnim(false);
      if (index === items.length) {
        el.style.transition = "none";
        setIndex(0);
        void el.offsetHeight;
        el.style.transition = `transform ${transitionMs}ms cubic-bezier(.25,.8,.25,1)`;
      }
    };
    el.addEventListener("transitionend", onEnd);
    return () => el.removeEventListener("transitionend", onEnd);
  }, [index, items.length, transitionMs]);

  const handleNext = async () => {
    if (anim || pending) return;
    setPending(true);
    await wait(delayMs);
    setPending(false);
    setAnim(true);
    setIndex((i) => Math.min(i + 1, items.length));
  };

  const handlePrev = async () => {
    if (anim || pending) return;
    setPending(true);
    await wait(delayMs);
    setPending(false);
    setAnim(true);

    if (index === 0) {
      const el = trackRef.current;
      if (!el) return;
      el.style.transition = "none";
      setIndex(items.length);
      void el.offsetHeight;
      el.style.transition = `transform ${transitionMs}ms cubic-bezier(.25,.8,.25,1)`;
      requestAnimationFrame(() => setIndex(items.length - 1));
    } else {
      setIndex((i) => i - 1);
    }
  };

  const translateX = -(index * slideW);
  return (
    <div className="lastest-content py-12 sm:py-16 md:py-24 lg:py-32 xl:py-40 px-4 sm:px-6 md:px-8 lg:px-30 xl:px-30">
      <div className="max-w-7xl mx-auto">
        <div className="lastest-header mb-8 sm:mb-10 md:mb-12">
          <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-4xl leading-tight">
            The latest
          </h1>
          <div className="mt-3 sm:mt-4">
            <span className="inline-block bg-gradient-to-b from-[#7A6126] to-[#554519] px-4 sm:px-5 py-1.5 sm:py-2 text-center text-sm sm:text-base rounded-2xl border border-[rgba(255,255,255,0.5)] text-white font-medium">
              News
            </span>
          </div>
        </div>

        <div className="lastest-card">
          <section className="w-full">
            <div className="mx-auto max-w-7xl">
              {/* Controls */}
              <div className="mb-4 sm:mb-6 flex justify-center sm:justify-end">
                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    onClick={handlePrev}
                    disabled={anim || pending}
                    className="inline-flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-white/30 hover:border-white/50 disabled:opacity-40 transition-colors"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M15 6l-6 6 6 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={anim || pending}
                    className="inline-flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-white/30 hover:border-white/50 disabled:opacity-40 transition-colors"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M9 6l6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Slider */}
              <div ref={containerRef} className="overflow-hidden">
                <div
                  ref={trackRef}
                  className="flex gap-3 sm:gap-4 md:gap-5 lg:gap-6 will-change-transform"
                  style={{
                    transform: `translateX(${translateX}px)`,
                    transition: `transform ${transitionMs}ms cubic-bezier(.25,.8,.25,1)`,
                  }}
                >
                  {slides.map((it, i) => (
                    <article
                      key={`${it.title}-${i}`}
                      ref={i === 0 ? firstSlideRef : undefined}
                      className="
                        relative shrink-0
                        w-[240px] sm:w-[260px] md:w-[280px] lg:w-[300px] xl:w-[320px]
                        h-[280px] sm:h-[300px] md:h-[320px] lg:h-[340px] xl:h-[360px]
                        rounded-2xl sm:rounded-[22px] overflow-hidden
                        text-white hover:scale-[1.02] transition-transform duration-300
                      "
                      style={{
                        backgroundImage: `url(${it.bg})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                      }}
                    >
                      {/* Overlay gradient biar teks tetap terbaca */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#D4AF37]/45 via-[#D4AF37]/15 to-transparent" />

                      {/* Konten card */}
                      <div className="relative z-10 p-4 sm:p-5 md:p-6 flex h-full flex-col">
                        <span className="text-[10px] sm:text-[11px] md:text-xs tracking-wider text-yellow-300 font-medium">
                          {it.tag?.toUpperCase() ||
                            (it.year ? String(it.year) : "SOON")}
                        </span>
                        <h3 className="mt-2 sm:mt-3 line-clamp-3 text-base sm:text-lg md:text-xl font-semibold text-white/95 leading-tight">
                          {it.title}
                        </h3>
                        <div className="mt-auto">
                          {it.href ? (
                            <a
                              href={it.href}
                              target={it.external ? "_blank" : undefined}
                              rel={
                                it.external ? "noopener noreferrer" : undefined
                              }
                              className="inline-flex items-center gap-2 rounded-full bg-[#726300] hover:bg-[#8A7700] text-[#F1DB4A] px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 text-[11px] sm:text-[12px] md:text-sm font-medium shadow-sm focus:outline-none focus:ring focus:ring-white/30 transition-colors"
                              aria-label={`Read: ${it.title}`}
                            >
                              {it.reading}
                              <svg
                                width="12"
                                height="12"
                                className="sm:w-[14px] sm:h-[14px]"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                              >
                                <path
                                  d="M9 6l6 6-6 6"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </a>
                          ) : (
                            <span
                              className="inline-flex items-center gap-2 rounded-full bg-[#726300] text-[#F1DB4A] px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 text-[11px] sm:text-[12px] md:text-sm font-medium shadow-sm opacity-70 cursor-not-allowed"
                              aria-disabled="true"
                              title="Link belum tersedia"
                            >
                              {it.reading}
                              <svg
                                width="12"
                                height="12"
                                className="sm:w-[14px] sm:h-[14px]"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                              >
                                <path
                                  d="M9 6l6 6-6 6"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                          )}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const DEFAULT_ITEMS = [
  {
    tag: "Soon",
    title: "AIX AI Framework: A Full-Stack AI Agent Ecosystem",
    reading: "5 min read",
    bg: bgCard1,
    href: "https://aix-whitepaper.gitbook.io/docs",
    external: false,
  },
  {
    tag: "Soon",
    title:
      "Experience DeFi on Easy Mode with Synthia and SynFutures AI Framework",
    reading: "3 min read",
    bg: bgCard2,
    href: "https://aix-whitepaper.gitbook.io/docs",
    external: false,
  },
  {
    year: 2025,
    title: "AIX 2025 Roadmap: An Overview",
    reading: "2 min read",
    bg: bgCard3,
    href: "https://aix-whitepaper.gitbook.io/docs/overview/roadmap",
    external: true,
  },
  {
    tag: "Soon",
    title: "AIX Airdrop",
    reading: "4 min read",
    bg: bgCard4,
    href: "https://aix-whitepaper.gitbook.io/docs/overview/roadmap#phase-i",
    external: false,
  },
];

export default TheLastestContent;
