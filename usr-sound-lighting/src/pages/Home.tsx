import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroScene } from "../components/Scene";
import { ProductTile } from "../components/ProductTile";
import { brand } from "../brand";
import { categories, packages, products, type Category } from "../data/catalogue";
import { money, prefersReducedMotion, usePageTitle } from "../lib/format";
import { stageScroll, useStage } from "../store/stage";
import "./Home.css";

gsap.registerPlugin(ScrollTrigger);

const cues: { category: Category; title: string; body: string; link: string; linkLabel: string }[] = [
  {
    category: "sound",
    title: "Clear speeches. Full dance floors.",
    body: "From a pair of wireless mics for the ceremony to a line array for a thousand people. We tune every system to the room, so the best man is heard at the back and the bass never trips the venue's limiter.",
    link: "/hire?category=sound",
    linkLabel: "Browse sound hire",
  },
  {
    category: "lighting",
    title: "Colour the whole room.",
    body: "Uplighting in your colours, moving heads that sweep with the music, proper stage washes for bands and awards, and gobos that put your names on the dance floor.",
    link: "/hire?category=lighting",
    linkLabel: "Browse lighting hire",
  },
  {
    category: "staging",
    title: "Somewhere to stand out.",
    body: "Stage decks for the band, truss to hang it all from, a starlit dance floor under the first dance — and low fog or cold sparks when the moment needs it.",
    link: "/hire?category=staging",
    linkLabel: "Browse staging and effects",
  },
];

const steps = [
  { title: "Build your booking", body: "Add kit or a package, pick your date and choose whether we deliver, set up or run it." },
  { title: "We confirm the details", body: "We check the date, venue access and power, then send you a fixed quote. Nothing is charged until you accept." },
  { title: "We deliver and rig", body: "Our crew arrives with time to set up and sound-check before your guests do." },
  { title: "Enjoy the night", body: "We take everything away afterwards — or stay and run it, if you've booked a technician." },
];

export default function Home() {
  usePageTitle("");
  const stageRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [stageVisible, setStageVisible] = useState(true);
  const [touch, setTouch] = useState(false);
  const setCue = useStage((s) => s.setCue);
  const cue = useStage((s) => s.cue);

  useEffect(() => {
    setTouch(window.matchMedia("(hover: none)").matches);
  }, []);

  // Pause the 3D render loop once the stage has scrolled away.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setStageVisible(e.isIntersecting), { rootMargin: "100px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // scroll → 3D: continuous progress for the camera, discrete cues for the looks
      ScrollTrigger.create({
        trigger: stageRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          stageScroll.progress = self.progress;
        },
      });
      gsap.utils.toArray<HTMLElement>("[data-cue]").forEach((el) => {
        const index = Number(el.dataset.cue);
        ScrollTrigger.create({
          trigger: el,
          start: "top 62%",
          end: "bottom 38%",
          onToggle: (self) => self.isActive && setCue(index),
        });
      });

      // the one orchestrated moment: the headline is rigged in, line by line
      if (!prefersReducedMotion()) {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from(".hero__line", { yPercent: 110, duration: 0.9, stagger: 0.12, delay: 0.15 })
          .from(".hero__after", { opacity: 0, y: 14, duration: 0.6, stagger: 0.08 }, "-=0.45");
      }
    }, stageRef);
    return () => {
      ctx.revert();
      setCue(0);
      stageScroll.progress = 0;
    };
  }, [setCue]);

  const featured = products.filter((p) => p.featured).slice(0, 6);

  return (
    <>
      <section ref={stageRef} className="stage" aria-label="Introduction">
        <div className="stage__canvas">
          <HeroScene active={stageVisible} fallback={<div className="stage__fallback" />} />
          <div className="stage__scrim" />
        </div>

        <div className="stage__content">
          <div ref={heroRef} className="hero wrap" data-cue="0">
            <h1 className="hero__title">
              <span className="hero__mask">
                <span className="hero__line">We bring the sound,</span>
              </span>
              <span className="hero__mask">
                <span className="hero__line">the light and the</span>
              </span>
              <span className="hero__mask">
                <span className="hero__line">dance floor.</span>
              </span>
            </h1>
            <p className="hero__lede hero__after">
              Event production hire from {brand.base}. Hire the kit on its own, or let our crew deliver, rig and run it for
              your wedding, party, concert or corporate night.
            </p>
            <div className="hero__actions hero__after">
              <Link to="/hire" className="btn btn-primary">
                Browse hire kit
              </Link>
              <Link to="/packages" className="btn btn-ghost">
                See packages
              </Link>
            </div>
            <p className="hero__hint hero__after" aria-hidden>
              {touch ? "Tap anywhere to aim the lights" : "Move your pointer to aim the lights"}
            </p>
          </div>

          {cues.map((c, i) => {
            const cat = categories[c.category];
            return (
              <article
                key={c.category}
                className={`cue ${cue === i + 1 ? "is-live" : ""}`}
                data-cue={i + 1}
                style={{ ["--gel" as string]: cat.gel }}
              >
                <div className="wrap">
                  <div className="cue__panel">
                    <span className="gel" style={{ ["--gel" as string]: cat.gel }}>
                      {c.category === "staging" ? "Staging and effects" : cat.label}
                    </span>
                    <h2>{c.title}</h2>
                    <p>{c.body}</p>
                    <Link to={c.link} className="text-link">
                      {c.linkLabel}
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section" aria-labelledby="popular-title">
        <div className="wrap">
          <div className="section-head">
            <h2 id="popular-title">Most-booked kit</h2>
            <Link to="/hire" className="text-link">
              See all {products.length} items
            </Link>
          </div>
          <div className="tile-grid">
            {featured.map((p) => (
              <ProductTile key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="section packages-band" aria-labelledby="packages-title">
        <div className="wrap">
          <div className="section-head">
            <div>
              <h2 id="packages-title">Packages for the whole event</h2>
              <p className="lede">Everything for a typical event of each kind, delivered, set up and taken away by our crew.</p>
            </div>
            <Link to="/packages" className="text-link">
              Compare packages
            </Link>
          </div>
          <div className="pkg-row">
            {packages.map((p) => (
              <Link key={p.slug} to={`/packages#${p.slug}`} className="pkg-card" style={{ ["--gel" as string]: p.gel }}>
                <h3>{p.name}</h3>
                <p className="muted">{p.forWho}</p>
                <p className="pkg-card__price">
                  <span className="muted">from</span> <strong className="num">{money(p.from)}</strong>
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="how-title">
        <div className="wrap">
          <h2 id="how-title">How booking works</h2>
          <ol className="steps">
            {steps.map((s, i) => (
              <li key={s.title} className="step">
                <span className="step__n num" aria-hidden>
                  {i + 1}
                </span>
                <h3>{s.title}</h3>
                <p className="muted">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section coverage" aria-labelledby="coverage-title">
        <div className="wrap coverage__inner">
          <div>
            <h2 id="coverage-title">Based in Prestwich. On the road across the North West.</h2>
            <p className="lede">
              We deliver and set up across Greater Manchester every week, and travel further for larger events.
            </p>
            <div className="hero__actions">
              <Link to="/booking" className="btn btn-primary">
                Start a booking
              </Link>
              <Link to="/contact" className="btn btn-ghost">
                Ask us a question
              </Link>
            </div>
          </div>
          <ul className="coverage__list" aria-label="Areas we cover">
            {brand.serviceArea.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
