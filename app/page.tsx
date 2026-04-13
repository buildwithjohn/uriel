"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const WORKS = [
  { id: 1, title: "Mr. Perfect Series", category: "Film", year: "2024", color: "#C9A84C" },
  { id: 2, title: "Brand Identity Systems", category: "Branding", year: "2024", color: "#E8D5A3" },
  { id: 3, title: "Visual Storytelling", category: "Photography", year: "2023", color: "#B8A08A" },
  { id: 4, title: "Motion Design", category: "Animation", year: "2023", color: "#D4B896" },
  { id: 5, title: "Editorial Direction", category: "Creative", year: "2024", color: "#C4AA7C" },
  { id: 6, title: "Content Strategy", category: "Strategy", year: "2024", color: "#E0C88C" },
];

const SERVICES = [
  { icon: "◈", title: "Visual Storytelling", desc: "Crafting narratives through the lens — film, photography, and direction that moves people." },
  { icon: "◉", title: "Brand Design", desc: "Identity systems that communicate what words cannot. From logo to full brand world." },
  { icon: "◫", title: "Film & Direction", desc: "Directing short films, series, and brand films with cinematic precision and intent." },
  { icon: "◐", title: "Content Creation", desc: "Strategic content for brands seeking a distinctive voice in a noisy world." },
];

const TICKER_ITEMS = ["VISUAL STORYTELLING", "BRAND DESIGN", "FILM DIRECTION", "MR. PERFECT SERIES", "CREATIVE IDENTITY", "CONTENT CREATION"];

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

function AnimBlock({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={className} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(36px)", transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s` }}>
      {children}
    </div>
  );
}

export default function UrielSite() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <main className="uriel-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Space+Mono:wght@400;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .uriel-root { font-family: 'Cormorant Garamond', Georgia, serif; background: #080808; color: #F0EAD6; min-height: 100vh; overflow-x: hidden; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: #C9A84C; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .uriel-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; transition: all 0.4s ease; }
        .uriel-nav.scrolled { background: rgba(8,8,8,0.96); backdrop-filter: blur(20px); border-bottom: 1px solid #1A1A1A; }
        .nav-links { display: flex; gap: 36px; align-items: center; }
        .nav-btn { cursor: pointer; font-family: 'Space Mono', monospace; font-size: 10px; letter-spacing: 0.15em; color: #777; text-transform: uppercase; transition: color 0.3s; background: none; border: none; }
        .nav-btn:hover { color: #C9A84C; }
        .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; background: none; border: none; padding: 4px; }
        .hamburger span { display: block; width: 22px; height: 1.5px; background: #F0EAD6; }
        .mobile-menu { display: none; position: fixed; inset: 0; z-index: 99; background: #050505; flex-direction: column; align-items: center; justify-content: center; gap: 36px; }
        .mobile-menu.open { display: flex !important; }
        .work-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; }
        .work-card { border: 1px solid #1A1A1A; padding: 40px 28px; position: relative; overflow: hidden; background: #080808; cursor: pointer; transition: all 0.4s; }
        .work-card:hover { background: #0F0F0F; border-color: #C9A84C; }
        .work-card .card-top-line { position: absolute; top: 0; left: 0; right: 0; height: 2px; background: transparent; transition: background 0.3s; }
        .work-card:hover .card-top-line { background: #C9A84C; }
        .work-card .card-arrow { position: absolute; bottom: 18px; right: 20px; opacity: 0; font-size: 18px; color: #C9A84C; transition: opacity 0.3s; }
        .work-card:hover .card-arrow { opacity: 1; }
        .services-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2px; }
        .svc-card { border: 1px solid #1A1A1A; padding: 52px 44px; background: #080808; transition: all 0.4s; }
        .svc-card:hover { background: #111; border-color: #C9A84C44; }
        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; }
        .footer-row { display: flex; justify-content: space-between; align-items: center; }
        .cta-btn { border: 1px solid #C9A84C; background: transparent; color: #C9A84C; font-family: 'Space Mono', monospace; font-size: 11px; letter-spacing: 0.2em; cursor: pointer; transition: all 0.3s; }
        .cta-btn:hover { background: #C9A84C; color: #080808; }
        .social-lnk { font-family: 'Space Mono', monospace; font-size: 10px; letter-spacing: 0.12em; color: #555; text-decoration: none; transition: color 0.3s; }
        .social-lnk:hover { color: #C9A84C; }
        .u-input { font-family: 'Space Mono', monospace; background: transparent; border: none; border-bottom: 1px solid #2A2A2A; color: #F0EAD6; font-size: 12px; padding: 10px 0; width: 100%; outline: none; transition: border-color 0.3s; }
        .u-input:focus { border-bottom-color: #C9A84C; }
        .u-input::placeholder { color: #444; }
        .u-textarea { font-family: 'Space Mono', monospace; background: transparent; border: none; border-bottom: 1px solid #2A2A2A; color: #F0EAD6; font-size: 12px; padding: 10px 0; width: 100%; outline: none; resize: none; height: 80px; transition: border-color 0.3s; }
        .u-textarea:focus { border-bottom-color: #C9A84C; }
        .u-textarea::placeholder { color: #444; }
        .ticker-track { display: flex; animation: marquee 22s linear infinite; white-space: nowrap; }
        @media (max-width: 768px) {
          .uriel-nav { padding: 16px 20px !important; }
          .nav-links { display: none !important; }
          .hamburger { display: flex !important; }
          .hero-section { padding: 0 20px 64px !important; }
          .hero-title { font-size: clamp(48px, 13vw, 72px) !important; }
          .section-h2 { font-size: 40px !important; }
          .hero-cta-row { flex-direction: column !important; gap: 20px !important; }
          .hero-p { max-width: 100% !important; font-size: 17px !important; }
          .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .work-grid { grid-template-columns: 1fr !important; }
          .work-card { padding: 28px 20px !important; }
          .services-grid { grid-template-columns: 1fr !important; }
          .svc-card { padding: 36px 24px !important; }
          .contact-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .contact-h2 { font-size: 40px !important; }
          .footer-row { flex-direction: column !important; gap: 16px !important; text-align: center; }
          .footer-dots { display: none !important; }
          .footer-copy { font-size: 8px !important; }
          .sec-pad { padding: 72px 20px !important; }
          .corner-dec { display: none !important; }
          .cta-btn { width: 100% !important; padding: 14px 24px !important; font-size: 10px !important; }
        }
      `}</style>

      {/* MOBILE MENU */}
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        <button onClick={() => setMenuOpen(false)} style={{ position: "absolute", top: 20, right: 20, background: "none", border: "none", color: "#F0EAD6", fontSize: 28, cursor: "pointer" }}>✕</button>
        {["Work","About","Services","Contact"].map(n => (
          <button key={n} onClick={() => scrollTo(n.toLowerCase())} style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, letterSpacing: "0.2em", color: "#777", background: "none", border: "none", cursor: "pointer", textTransform: "uppercase" }}>{n}</button>
        ))}
        <a href="https://www.youtube.com/@urielmaforikan" target="_blank" rel="noreferrer" style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: "0.12em", color: "#080808", background: "#C9A84C", padding: "10px 22px", textDecoration: "none" }}>YOUTUBE</a>
      </div>

      {/* NAV */}
      <nav className={`uriel-nav${scrolled ? " scrolled" : ""}`} style={{ padding: "20px 48px" }}>
        <div onClick={() => scrollTo("hero")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
          <Image src="/logo.png" alt="Uriel Logo" width={28} height={28} style={{ filter: "invert(1)", objectFit: "contain" }} />
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 600, letterSpacing: "0.05em", color: "#F0EAD6", lineHeight: 1 }}>URIEL</div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 7, letterSpacing: "0.25em", color: "#C9A84C", marginTop: 1 }}>MAFORIKAN</div>
          </div>
        </div>
        <div className="nav-links">
          {["Work","About","Services","Contact"].map(n => (
            <button key={n} className="nav-btn" onClick={() => scrollTo(n.toLowerCase())}>{n}</button>
          ))}
          <a href="https://www.youtube.com/@urielmaforikan" target="_blank" rel="noreferrer" style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.12em", color: "#080808", background: "#C9A84C", padding: "8px 18px", textDecoration: "none" }}>YOUTUBE</a>
        </div>
        <button className="hamburger" onClick={() => setMenuOpen(true)}><span/><span/><span/></button>
      </nav>

      {/* HERO */}
      <section id="hero" className="hero-section" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 48px 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: "50%", height: "100%", background: "linear-gradient(135deg,transparent 55%,#C9A84C06 100%)", pointerEvents: "none" }} />
        <div className="corner-dec">
          <div style={{ position: "absolute", top: 84, left: 48, width: 44, height: 1, background: "#C9A84C" }} />
          <div style={{ position: "absolute", top: 84, left: 48, width: 1, height: 44, background: "#C9A84C" }} />
          <div style={{ position: "absolute", top: 84, right: 48, width: 44, height: 1, background: "#C9A84C" }} />
          <div style={{ position: "absolute", top: 84, right: 48, width: 1, height: 44, background: "#C9A84C" }} />
        </div>
        <div style={{ position: "absolute", top: "50%", right: -10, transform: "translateY(-50%)", fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(80px, 14vw, 200px)", fontWeight: 600, color: "transparent", WebkitTextStroke: "1px #C9A84C0D", letterSpacing: "-0.02em", pointerEvents: "none", userSelect: "none", lineHeight: 1 }}>URIEL</div>
        <div style={{ position: "relative", zIndex: 2, animation: "fadeUp 0.9s ease forwards" }}>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.28em", color: "#C9A84C", marginBottom: 20 }}>VISUAL STORYTELLER / BRAND DESIGNER / FILMMAKER</div>
          <h1 className="hero-title" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(52px, 9vw, 118px)", fontWeight: 300, lineHeight: 0.92, letterSpacing: "-0.02em", marginBottom: 36 }}>
            <span style={{ display: "block" }}>Uriel</span>
            <span style={{ display: "block", fontStyle: "italic", color: "#C9A84C" }}>Maforikan</span>
          </h1>
          <div className="hero-cta-row" style={{ display: "flex", alignItems: "center", gap: 40, flexWrap: "wrap" }}>
            <p className="hero-p" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 19, fontWeight: 300, color: "#888", maxWidth: 400, lineHeight: 1.65, fontStyle: "italic" }}>
              Telling stories through light, frame, and form. Turning brands into worlds people want to live in.
            </p>
            <button className="cta-btn" onClick={() => scrollTo("work")} style={{ padding: "14px 36px" }}>SEE THE WORK</button>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <div style={{ width: 1, height: 50, background: "linear-gradient(to bottom, transparent, #C9A84C)" }} />
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, letterSpacing: "0.2em", color: "#444" }}>SCROLL</div>
        </div>
      </section>

      {/* TICKER */}
      <div style={{ background: "#C9A84C", padding: "12px 0", overflow: "hidden" }}>
        <div className="ticker-track">
          {Array(3).fill(TICKER_ITEMS).flat().map((t, i) => (
            <span key={i} style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.2em", color: "#080808", fontWeight: 700, marginRight: 56 }}>{t}&nbsp;&nbsp;◆</span>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" className="sec-pad" style={{ padding: "100px 48px", background: "#0A0A0A" }}>
        <div className="about-grid">
          <AnimBlock>
            <div style={{ position: "relative", maxWidth: 440 }}>
              <div style={{ width: "100%", aspectRatio: "3/4", position: "relative", overflow: "hidden" }}>
                <Image src="/uriel-studio.jpg" alt="Uriel Maforikan" fill style={{ objectFit: "cover", objectPosition: "center top", filter: "contrast(1.05)" }} />
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 28, background: "#0A0A0A" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 28, background: "#0A0A0A" }} />
              </div>
              <div style={{ position: "absolute", top: -12, left: -12, width: 28, height: 28, borderTop: "2px solid #C9A84C", borderLeft: "2px solid #C9A84C" }} />
              <div style={{ position: "absolute", bottom: -12, right: -12, width: 28, height: 28, borderBottom: "2px solid #C9A84C", borderRight: "2px solid #C9A84C" }} />
              <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, letterSpacing: "0.12em", color: "#444" }}>© YOLO IMAGERY</span>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, letterSpacing: "0.12em", color: "#C9A84C" }}>LAGOS, NG</span>
              </div>
            </div>
          </AnimBlock>
          <AnimBlock delay={0.2}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.3em", color: "#C9A84C", marginBottom: 20 }}>ABOUT</div>
            <h2 className="section-h2" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 50, fontWeight: 300, lineHeight: 1.05, marginBottom: 28 }}>
              Framing the world<br /><em style={{ color: "#C9A84C" }}>differently.</em>
            </h2>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 19, fontWeight: 300, color: "#999", lineHeight: 1.8, marginBottom: 18, fontStyle: "italic" }}>
              Uriel Maforikan is a visual storyteller and brand designer based in Nigeria, creating work that bridges the emotional and the aesthetic.
            </p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontWeight: 300, color: "#666", lineHeight: 1.8, marginBottom: 48, fontStyle: "italic" }}>
              With an eye trained on cinema and a heart for human story, Uriel brings a rare combination of technical skill and cultural depth to every creative engagement.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
              {[["50+","PROJECTS"],["3+","YEARS"],["∞","STORIES"]].map(([n,l]) => (
                <div key={l}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 42, fontWeight: 300, color: "#C9A84C", lineHeight: 1 }}>{n}</div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, letterSpacing: "0.15em", color: "#444", marginTop: 5 }}>{l}</div>
                </div>
              ))}
            </div>
          </AnimBlock>
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="sec-pad" style={{ padding: "100px 48px", background: "#050505" }}>
        <AnimBlock>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 20, marginBottom: 56 }}>
            <div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.3em", color: "#C9A84C", marginBottom: 14 }}>SELECTED WORK</div>
              <h2 className="section-h2" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 58, fontWeight: 300, lineHeight: 0.92 }}>
                The<br /><em style={{ color: "#C9A84C" }}>Archive.</em>
              </h2>
            </div>
            <a href="https://www.youtube.com/@urielmaforikan" target="_blank" rel="noreferrer" className="social-lnk" style={{ borderBottom: "1px solid #2A2A2A", paddingBottom: 4 }}>VIEW FULL CHANNEL →</a>
          </div>
        </AnimBlock>
        <div className="work-grid">
          {WORKS.map((w, i) => (
            <AnimBlock key={w.id} delay={i * 0.07}>
              <div className="work-card">
                <div className="card-top-line" />
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, letterSpacing: "0.2em", color: "#444", marginBottom: 28 }}>{String(i+1).padStart(2,"0")} / {w.year}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 400, marginBottom: 12, lineHeight: 1.2 }}>{w.title}</h3>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, letterSpacing: "0.15em", color: w.color }}>{w.category}</div>
                <div className="card-arrow">→</div>
              </div>
            </AnimBlock>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="sec-pad" style={{ padding: "100px 48px", background: "#080808" }}>
        <AnimBlock>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.3em", color: "#C9A84C", marginBottom: 14 }}>WHAT I DO</div>
            <h2 className="section-h2" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 58, fontWeight: 300 }}>Creative <em style={{ color: "#C9A84C" }}>Services.</em></h2>
          </div>
        </AnimBlock>
        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <AnimBlock key={s.title} delay={i * 0.1}>
              <div className="svc-card">
                <div style={{ fontSize: 28, color: "#C9A84C", marginBottom: 20 }}>{s.icon}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 400, marginBottom: 14 }}>{s.title}</h3>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontWeight: 300, color: "#666", lineHeight: 1.7, fontStyle: "italic" }}>{s.desc}</p>
              </div>
            </AnimBlock>
          ))}
        </div>
      </section>

      {/* FILM STRIP */}
      <section style={{ padding: "72px 0", background: "#050505", overflow: "hidden" }}>
        <AnimBlock>
          <div style={{ padding: "0 48px", marginBottom: 36 }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.3em", color: "#C9A84C", marginBottom: 10 }}>FEATURED PROJECT</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 42, fontWeight: 300 }}>Mr. Perfect <em style={{ color: "#C9A84C" }}>Series</em></h2>
          </div>
        </AnimBlock>
        <div style={{ background: "#000", padding: "18px 0", position: "relative" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(90deg,transparent,transparent 58px,#050505 58px,#050505 66px)", pointerEvents: "none", zIndex: 2 }} />
          <div style={{ display: "flex", gap: 8, padding: "0 40px", overflowX: "auto", scrollbarWidth: "none" }}>
            {[["SERIES","MR. PERFECT"],["SCENE","E9.S9"],["TAKE","◆"],["DATE","14-12-2024"],["DIRECTOR","UMA"],["SOUND","✓"]].map(([label, val], i) => (
              <div key={i} style={{ background: "#111", border: "1px solid #1E1E1E", padding: "22px 22px", minWidth: 130, flexShrink: 0 }}>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, letterSpacing: "0.15em", color: "#444", marginBottom: 8 }}>{label}</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, color: i >= 4 ? "#C9A84C" : "#F0EAD6" }}>{val}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: 2, height: 180, overflow: "hidden", marginTop: 2 }}>
          {["/uriel-film.jpg","/uriel-studio.jpg","/uriel-native.jpg"].map((src,i) => (
            <div key={i} style={{ flex: 1, position: "relative", overflow: "hidden" }}>
              <Image src={src} alt="Uriel" fill style={{ objectFit: "cover", objectPosition: "center top", filter: "grayscale(25%)" }} />
              <div style={{ position: "absolute", inset: 0, background: "rgba(8,8,8,0.35)" }} />
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="sec-pad" style={{ padding: "100px 48px", background: "#0A0A0A" }}>
        <div className="contact-grid">
          <AnimBlock>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.3em", color: "#C9A84C", marginBottom: 20 }}>GET IN TOUCH</div>
            <h2 className="contact-h2" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 54, fontWeight: 300, lineHeight: 1, marginBottom: 28 }}>
              Let&apos;s make<br />something<br /><em style={{ color: "#C9A84C" }}>great.</em>
            </h2>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 300, color: "#666", lineHeight: 1.7, fontStyle: "italic", marginBottom: 40 }}>
              Whether it&apos;s a brand, a film, or a story waiting to be told, I&apos;m open to conversations that lead somewhere remarkable.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <a href="https://www.youtube.com/@urielmaforikan" target="_blank" rel="noreferrer" className="social-lnk">YOUTUBE @URIELMAFORIKAN →</a>
              <a href="https://www.notion.so/Hi-I-m-Uriel-Maforikan-3e9d350fe4e8432f9c14ed0b45d56255" target="_blank" rel="noreferrer" className="social-lnk">PORTFOLIO NOTION →</a>
            </div>
          </AnimBlock>
          <AnimBlock delay={0.2}>
            {!sent ? (
              <div style={{ paddingTop: 36 }}>
                {[{label:"YOUR NAME",key:"name",ph:"Full name",ta:false},{label:"EMAIL ADDRESS",key:"email",ph:"your@email.com",ta:false},{label:"YOUR MESSAGE",key:"message",ph:"Tell me about your project...",ta:true}].map(({label,key,ph,ta}) => (
                  <div key={key} style={{ marginBottom: 26 }}>
                    <label style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, letterSpacing: "0.2em", color: "#444", display: "block", marginBottom: 6 }}>{label}</label>
                    {ta
                      ? <textarea className="u-textarea" placeholder={ph} value={formData[key as keyof typeof formData]} onChange={e => setFormData({...formData,[key]:e.target.value})} />
                      : <input className="u-input" placeholder={ph} value={formData[key as keyof typeof formData]} onChange={e => setFormData({...formData,[key]:e.target.value})} />
                    }
                  </div>
                ))}
                <button className="cta-btn" onClick={() => { if(formData.name && formData.email) setSent(true); }} style={{ padding: "16px 0", width: "100%", marginTop: 8 }}>SEND MESSAGE</button>
              </div>
            ) : (
              <div style={{ textAlign: "center", paddingTop: 64 }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 68, color: "#C9A84C", marginBottom: 20 }}>◈</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 300, marginBottom: 10 }}>Message received.</h3>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, fontStyle: "italic", color: "#666" }}>Uriel will be in touch soon.</p>
              </div>
            )}
          </AnimBlock>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "28px 48px", borderTop: "1px solid #141414", background: "#050505" }}>
        <div className="footer-row">
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Image src="/logo.png" alt="Logo" width={20} height={20} style={{ filter: "invert(1)", objectFit: "contain" }} />
            <div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, fontWeight: 600, letterSpacing: "0.05em" }}>URIEL MAFORIKAN</div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 7, letterSpacing: "0.2em", color: "#3A3A3A", marginTop: 2 }}>VISUAL STORYTELLER & BRAND DESIGNER</div>
            </div>
          </div>
          <div className="footer-copy" style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.08em", color: "#3A3A3A" }}>© 2026 URIEL MAFORIKAN. ALL RIGHTS RESERVED.</div>
          <div className="footer-dots" style={{ display: "flex", gap: 5, alignItems: "center" }}>
            {[1,2,3].map(i => <div key={i} style={{ width: 5, height: 5, background: i===2?"#C9A84C":"#2A2A2A", borderRadius: "50%" }} />)}
          </div>
        </div>
      </footer>
    </main>
  );
}
