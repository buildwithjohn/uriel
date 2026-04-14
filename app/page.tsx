"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

/* ─── DATA ─── */
const LOGO_DESIGNS = [
  { id: 1, client: "StarHaven", tag: "Brand Identity", img: "/work/logo-starhaven.jpg" },
  { id: 2, client: "Angelic Choral", tag: "Logo Design", img: "/work/logo-angelic.jpg" },
  { id: 3, client: "SBS", tag: "Logo Design", img: "/work/logo-sbs.jpg" },
  { id: 4, client: "Aunty Lara", tag: "Brand Identity", img: "/work/logo-auntylara.jpg" },
  { id: 5, client: "FLC", tag: "Logo Design", img: "/work/logo-flc.jpg" },
  { id: 6, client: "AdeolaSarah", tag: "Brand Identity", img: "/work/logo-adeolasarah.jpg" },
  { id: 7, client: "KB Threads", tag: "Fashion Brand", img: "/work/logo-kbthreads.jpg" },
  { id: 8, client: "MadamCook", tag: "Brand Identity", img: "/work/logo-madamcook.jpg" },
];

const SERVICES = [
  {
    num: "01",
    title: "Brand Identity Design",
    body: "I combine design skills and market research to create the best identity for companies and startups — appealing, functional, and built to attract.",
  },
  {
    num: "02",
    title: "Logo Design",
    body: "Every logo I create tells a unique story. Minimalist, timeless marks that connect with your audience and put you ahead of the competition.",
  },
  {
    num: "03",
    title: "Marketing & Print Design",
    body: "Flyers, posters, media kits — designed with strategy and aesthetic intent to drive real results for your brand.",
  },
  {
    num: "04",
    title: "Social Media Visuals",
    body: "Scroll-stopping content that maintains brand consistency across every platform. Proven to improve engagement and brand recall.",
  },
  {
    num: "05",
    title: "Presentation Decks",
    body: "Clean, aesthetic, functional decks that make funding processes easy. Trusted by companies including Cybernalytix and August Secrets.",
  },
];

const PROCESS = [
  { step: "01", title: "Discovery", body: "I get quality answers through a strategic discovery session — understanding your goals, audience, and competitors before a single pixel is placed." },
  { step: "02", title: "Strategy", body: "Market research and positioning work happens here. I define the brand direction, moodboard, and design system before execution begins." },
  { step: "03", title: "Design", body: "With strategy as the foundation, I craft the visual identity — logo, colour palette, typography, and all brand assets." },
  { step: "04", title: "Delivery", body: "Final files, brand guidelines, and full handover. You leave with everything you need to use your new identity confidently." },
];

/* ─── HOOKS ─── */
function useInView(threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={className} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(36px)", transition: `opacity 0.95s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.95s cubic-bezier(.22,1,.36,1) ${delay}s` }}>
      {children}
    </div>
  );
}

/* ─── IMAGE PLACEHOLDER (swap with real <Image> when client adds assets) ─── */
function WorkSlot({ label, img, aspect = "aspect-square" }: { label: string; img: string; aspect?: string }) {
  const [err, setErr] = useState(false);
  return (
    <div style={{ width: "100%", aspectRatio: aspect === "aspect-square" ? "1/1" : aspect === "aspect-43" ? "4/3" : "3/4", position: "relative", background: "#E2D9CC", overflow: "hidden" }}>
      {!err ? (
        <Image src={img} alt={label} fill style={{ objectFit: "cover" }} onError={() => setErr(true)} />
      ) : (
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, background: "#E2D9CC" }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", border: "1px dashed #B8976A", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "'Jost',sans-serif", fontSize: 18, color: "#B8976A" }}>+</span>
          </div>
          <span style={{ fontFamily: "'Jost',sans-serif", fontSize: 10, letterSpacing: "0.18em", color: "#B8976A", textTransform: "uppercase", textAlign: "center", padding: "0 12px" }}>{label}</span>
        </div>
      )}
    </div>
  );
}

/* ─── MAIN ─── */
export default function VBUSite() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const [heroScale, setHeroScale] = useState(1);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 70);
      if (heroRef.current) {
        const progress = Math.min(window.scrollY / heroRef.current.offsetHeight, 1);
        setHeroScale(1 + progress * 0.06);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };

  const FILTERS = ["All", "Brand Identity", "Logo Design", "Marketing", "Social Media"];

  return (
    <main style={{ fontFamily: "'Jost','Helvetica Neue',sans-serif", background: "#F4EFE6", color: "#261A0A", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,200;0,300;0,400;0,500;1,200;1,300&family=Italiana&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        ::-webkit-scrollbar{width:2px}
        ::-webkit-scrollbar-thumb{background:#B8976A}
        ::selection{background:#D4B896;color:#261A0A}

        @keyframes fadeUp{from{opacity:0;transform:translateY(48px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}

        /* ── NAV ── */
        .vbu-nav{position:fixed;top:0;left:0;right:0;z-index:200;padding:28px 64px;display:flex;align-items:center;justify-content:space-between;transition:all 0.5s ease}
        .vbu-nav.on{background:rgba(244,239,230,0.97);backdrop-filter:blur(14px);padding:16px 64px;border-bottom:1px solid #DDD5C4}
        .brand{cursor:pointer;display:flex;align-items:center;gap:14px}
        .brand-logo{width:34px;height:34px;object-fit:contain}
        .brand-text{}
        .brand-name{font-family:'Italiana',serif;font-size:18px;color:#261A0A;letter-spacing:0.04em;line-height:1}
        .brand-tag{font-family:'Jost',sans-serif;font-size:7px;letter-spacing:0.32em;color:#B8976A;text-transform:uppercase;margin-top:2px}
        .nav-links{display:flex;gap:40px;align-items:center}
        .nl{font-family:'Jost',sans-serif;font-size:10.5px;letter-spacing:0.16em;color:#7A6650;text-transform:uppercase;background:none;border:none;cursor:pointer;transition:color 0.3s;padding:0}
        .nl:hover{color:#261A0A}
        .nl-cta{font-family:'Jost',sans-serif;font-size:10px;letter-spacing:0.18em;background:#261A0A;color:#F4EFE6;border:none;padding:11px 28px;cursor:pointer;transition:all 0.35s;text-transform:uppercase;text-decoration:none;display:inline-block}
        .nl-cta:hover{background:#8B6440}
        .burger{display:none;flex-direction:column;gap:5px;cursor:pointer;background:none;border:none;padding:4px}
        .burger span{display:block;width:22px;height:1px;background:#261A0A;transition:all 0.3s}
        .mob-nav{display:none;position:fixed;inset:0;z-index:199;background:#F4EFE6;flex-direction:column;align-items:center;justify-content:center;gap:36px}
        .mob-nav.open{display:flex}

        /* ── HERO ── */
        .hero{height:100vh;position:relative;display:flex;align-items:flex-end;overflow:hidden}
        .hero-bg{position:absolute;inset:0;will-change:transform}
        .hero-bg img{object-fit:cover;object-position:center 20%}
        .hero-veil{position:absolute;inset:0;background:linear-gradient(to top,rgba(20,12,4,0.78) 0%,rgba(20,12,4,0.25) 55%,transparent 100%)}
        .hero-content{position:relative;z-index:2;padding:0 64px 80px;width:100%;animation:fadeUp 1.1s cubic-bezier(.22,1,.36,1) 0.1s both}
        .hero-eyebrow{font-family:'Jost',sans-serif;font-size:10px;letter-spacing:0.38em;color:#D4B896;text-transform:uppercase;margin-bottom:20px}
        .hero-name{font-family:'Italiana',serif;font-size:clamp(56px,7.5vw,108px);color:#F4EFE6;line-height:0.88;letter-spacing:0.01em;margin-bottom:10px}
        .hero-brand{font-family:'Italiana',serif;font-size:clamp(22px,3vw,38px);color:#D4B896;font-style:italic;margin-bottom:28px}
        .hero-desc{font-family:'Jost',sans-serif;font-size:clamp(13px,1.2vw,15px);font-weight:300;color:rgba(244,239,230,0.72);max-width:440px;line-height:1.85;letter-spacing:0.025em;margin-bottom:44px}
        .hero-actions{display:flex;align-items:center;gap:20px;flex-wrap:wrap}
        .btn-light{font-family:'Jost',sans-serif;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#F4EFE6;border:1px solid rgba(244,239,230,0.45);padding:13px 32px;background:transparent;cursor:pointer;transition:all 0.35s;text-decoration:none;display:inline-block}
        .btn-light:hover{border-color:#F4EFE6;background:rgba(244,239,230,0.08)}
        .btn-gold{font-family:'Jost',sans-serif;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#261A0A;background:#D4B896;border:1px solid #D4B896;padding:13px 32px;cursor:pointer;transition:all 0.35s;text-decoration:none;display:inline-block}
        .btn-gold:hover{background:#C9A87A;border-color:#C9A87A}
        .hero-badge{position:absolute;right:64px;top:50%;transform:translateY(-50%);width:100px;height:100px;animation:spin 18s linear infinite;z-index:2}
        .hero-badge-circle{width:100px;height:100px;border-radius:50%;border:1px solid rgba(212,184,150,0.4);display:flex;align-items:center;justify-content:center}
        .hero-badge-text{font-family:'Jost',sans-serif;font-size:7.5px;letter-spacing:0.22em;color:rgba(212,184,150,0.7);text-transform:uppercase;text-align:center;line-height:1.6}

        /* ── TICKER ── */
        .ticker{background:#261A0A;padding:12px 0;overflow:hidden}
        .ticker-t{display:flex;animation:ticker 30s linear infinite;white-space:nowrap}
        .ti{font-family:'Jost',sans-serif;font-size:9px;letter-spacing:0.28em;color:#B8976A;text-transform:uppercase;margin-right:56px}

        /* ── SECTION LABEL ── */
        .sl{font-family:'Jost',sans-serif;font-size:9px;letter-spacing:0.36em;color:#B8976A;text-transform:uppercase;display:flex;align-items:center;gap:14px;margin-bottom:24px}
        .sl::before{content:'';width:28px;height:1px;background:#B8976A;flex-shrink:0}

        /* ── ABOUT ── */
        .about-wrap{display:grid;grid-template-columns:5fr 7fr;min-height:88vh}
        .about-photo{position:relative;overflow:hidden}
        .about-photo img{object-fit:cover;object-position:center top;transition:transform 1s cubic-bezier(.22,1,.36,1)}
        .about-photo:hover img{transform:scale(1.04)}
        .about-photo-cap{position:absolute;bottom:24px;left:24px;font-family:'Jost',sans-serif;font-size:8px;letter-spacing:0.18em;color:rgba(244,239,230,0.5);text-transform:uppercase}
        .about-photo-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(20,12,4,0.35) 0%,transparent 60%)}
        .about-text{padding:80px 72px;display:flex;flex-direction:column;justify-content:center;background:#F4EFE6}
        .about-h{font-family:'Italiana',serif;font-size:clamp(40px,4vw,60px);color:#261A0A;line-height:1.05;margin-bottom:12px}
        .about-h em{font-style:italic;color:#8B6440}
        .about-role{font-family:'Jost',sans-serif;font-size:11px;letter-spacing:0.22em;color:#B8976A;text-transform:uppercase;margin-bottom:32px}
        .about-body{font-family:'Jost',sans-serif;font-size:14px;font-weight:300;color:#6B5438;line-height:1.95;letter-spacing:0.02em;margin-bottom:16px}
        .about-highlight{border-left:2px solid #B8976A;padding:16px 20px;margin:28px 0;background:#EDE5D6}
        .about-highlight p{font-family:'Jost',sans-serif;font-size:13px;font-weight:300;color:#5A4028;line-height:1.85;letter-spacing:0.02em}
        .about-skills{display:flex;flex-wrap:wrap;gap:8px;margin:28px 0 40px}
        .skill-tag{font-family:'Jost',sans-serif;font-size:9px;letter-spacing:0.18em;text-transform:uppercase;color:#8B6440;border:1px solid #D4B896;padding:6px 14px}
        .about-cta-row{display:flex;gap:16px;flex-wrap:wrap;align-items:center}
        .btn-dark{font-family:'Jost',sans-serif;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#F4EFE6;background:#261A0A;border:1px solid #261A0A;padding:13px 32px;cursor:pointer;transition:all 0.35s;text-decoration:none;display:inline-block}
        .btn-dark:hover{background:#8B6440;border-color:#8B6440}
        .btn-outline{font-family:'Jost',sans-serif;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#261A0A;background:transparent;border:1px solid #261A0A;padding:13px 32px;cursor:pointer;transition:all 0.35s;text-decoration:none;display:inline-block}
        .btn-outline:hover{background:#261A0A;color:#F4EFE6}

        /* ── SERVICES ── */
        .svc-section{background:#261A0A;padding:96px 64px}
        .svc-h{font-family:'Italiana',serif;font-size:clamp(38px,4.5vw,64px);color:#F4EFE6;margin-bottom:64px;line-height:0.95}
        .svc-h em{font-style:italic;color:#D4B896}
        .svc-list{border-top:1px solid rgba(184,151,106,0.18)}
        .svc-row{display:grid;grid-template-columns:80px 1fr 1fr;gap:36px;padding:40px 0;border-bottom:1px solid rgba(184,151,106,0.12);align-items:start;transition:padding-left 0.4s}
        .svc-row:hover{padding-left:10px}
        .svc-num{font-family:'Italiana',serif;font-size:36px;color:#B8976A;opacity:0.55;line-height:1}
        .svc-title{font-family:'Italiana',serif;font-size:clamp(22px,2.2vw,30px);color:#F4EFE6;line-height:1.15}
        .svc-body{font-family:'Jost',sans-serif;font-size:13px;font-weight:300;color:#9A8470;line-height:1.9;letter-spacing:0.02em}

        /* ── WORK ── */
        .work-section{padding:96px 64px;background:#F4EFE6}
        .work-header{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:52px;flex-wrap:wrap;gap:20px}
        .work-h{font-family:'Italiana',serif;font-size:clamp(38px,4.5vw,64px);color:#261A0A;line-height:0.95}
        .work-h em{font-style:italic;color:#8B6440}
        .filter-row{display:flex;gap:2px;flex-wrap:wrap;margin-bottom:44px}
        .filter-btn{font-family:'Jost',sans-serif;font-size:9.5px;letter-spacing:0.16em;text-transform:uppercase;color:#8A7A60;background:transparent;border:1px solid #D9CEBC;padding:8px 18px;cursor:pointer;transition:all 0.3s}
        .filter-btn.active,.filter-btn:hover{background:#261A0A;color:#F4EFE6;border-color:#261A0A}

        /* Logo grid */
        .logo-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:2px}
        .logo-card{position:relative;overflow:hidden;cursor:pointer;background:#E2D9CC}
        .logo-card-overlay{position:absolute;inset:0;background:rgba(26,16,6,0);transition:background 0.4s;display:flex;align-items:flex-end;padding:20px}
        .logo-card:hover .logo-card-overlay{background:rgba(26,16,6,0.6)}
        .logo-card-info{opacity:0;transform:translateY(8px);transition:all 0.4s}
        .logo-card:hover .logo-card-info{opacity:1;transform:translateY(0)}
        .logo-card-client{font-family:'Italiana',serif;font-size:18px;color:#F4EFE6}
        .logo-card-tag{font-family:'Jost',sans-serif;font-size:8.5px;letter-spacing:0.18em;color:#D4B896;text-transform:uppercase;margin-top:3px}

        /* Marketing / Social 2-col */
        .work-2col{display:grid;grid-template-columns:1fr 1fr;gap:2px;margin-top:2px}
        .work-wide{grid-column:span 2}

        /* ── PROCESS ── */
        .process-section{background:#EDE5D6;padding:96px 64px}
        .process-h{font-family:'Italiana',serif;font-size:clamp(38px,4.5vw,64px);color:#261A0A;line-height:0.95;margin-bottom:64px}
        .process-h em{font-style:italic;color:#8B6440}
        .process-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:2px;background:#D9CEBC}
        .process-card{background:#EDE5D6;padding:48px 36px;border-top:3px solid transparent;transition:border-color 0.35s}
        .process-card:hover{border-top-color:#B8976A}
        .process-step{font-family:'Italiana',serif;font-size:44px;color:#B8976A;opacity:0.5;margin-bottom:20px;line-height:1}
        .process-title{font-family:'Italiana',serif;font-size:22px;color:#261A0A;margin-bottom:14px}
        .process-body{font-family:'Jost',sans-serif;font-size:13px;font-weight:300;color:#7A6650;line-height:1.9;letter-spacing:0.02em}

        /* ── TESTIMONIAL ── */
        .testi-section{background:#261A0A;padding:80px 64px;display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center}
        .testi-left{}
        .testi-mark{font-family:'Italiana',serif;font-size:80px;color:#B8976A;opacity:0.35;line-height:0.7;margin-bottom:24px}
        .testi-quote{font-family:'Jost',sans-serif;font-size:clamp(16px,1.6vw,20px);font-weight:200;font-style:italic;color:#E8DFD0;line-height:1.85;letter-spacing:0.02em;margin-bottom:28px}
        .testi-attr{font-family:'Jost',sans-serif;font-size:10px;letter-spacing:0.22em;color:#B8976A;text-transform:uppercase}
        .testi-right{display:flex;flex-direction:column;gap:20px}
        .avail-card{background:rgba(184,151,106,0.08);border:1px solid rgba(184,151,106,0.2);padding:28px 32px}
        .avail-label{font-family:'Jost',sans-serif;font-size:8.5px;letter-spacing:0.28em;color:#B8976A;text-transform:uppercase;margin-bottom:10px}
        .avail-text{font-family:'Italiana',serif;font-size:24px;color:#F4EFE6}
        .avail-sub{font-family:'Jost',sans-serif;font-size:12px;font-weight:300;color:#9A8470;margin-top:6px;line-height:1.7}
        .contact-pills{display:flex;flex-direction:column;gap:10px}
        .cpill{font-family:'Jost',sans-serif;font-size:10px;letter-spacing:0.15em;color:#D4B896;text-decoration:none;text-transform:uppercase;display:flex;align-items:center;gap:12px;transition:gap 0.3s}
        .cpill::before{content:'';width:20px;height:1px;background:#B8976A;flex-shrink:0}
        .cpill:hover{gap:20px;color:#F4EFE6}

        /* ── CONTACT ── */
        .contact-section{padding:96px 64px;background:#F4EFE6}
        .contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:96px;align-items:start}
        .contact-h{font-family:'Italiana',serif;font-size:clamp(40px,4.5vw,64px);color:#261A0A;line-height:0.95;margin-bottom:28px}
        .contact-h em{font-style:italic;color:#8B6440}
        .contact-body{font-family:'Jost',sans-serif;font-size:14px;font-weight:300;color:#7A6650;line-height:1.9;letter-spacing:0.02em;margin-bottom:40px}
        .contact-links{display:flex;flex-direction:column;gap:12px;margin-bottom:40px}
        .cl{font-family:'Jost',sans-serif;font-size:10px;letter-spacing:0.16em;color:#8B6440;text-decoration:none;text-transform:uppercase;display:flex;align-items:center;gap:12px;transition:gap 0.3s}
        .cl::before{content:'';width:22px;height:1px;background:#B8976A;flex-shrink:0}
        .cl:hover{gap:20px;color:#261A0A}
        .fl{font-family:'Jost',sans-serif;font-size:12px;font-weight:300;color:#8A7A60;line-height:1.7;letter-spacing:0.02em;margin-bottom:6px}
        .form-label{font-family:'Jost',sans-serif;font-size:8.5px;letter-spacing:0.24em;color:#B8976A;text-transform:uppercase;display:block;margin-bottom:9px}
        .form-input{font-family:'Jost',sans-serif;background:transparent;border:none;border-bottom:1px solid #D9CEBC;color:#261A0A;font-size:14px;font-weight:300;padding:10px 0;width:100%;outline:none;transition:border-color 0.3s;letter-spacing:0.02em}
        .form-input:focus{border-bottom-color:#8B6440}
        .form-input::placeholder{color:#C0B09C;font-weight:200}
        .form-ta{font-family:'Jost',sans-serif;background:transparent;border:none;border-bottom:1px solid #D9CEBC;color:#261A0A;font-size:14px;font-weight:300;padding:10px 0;width:100%;outline:none;resize:none;height:90px;transition:border-color 0.3s;letter-spacing:0.02em}
        .form-ta:focus{border-bottom-color:#8B6440}
        .form-ta::placeholder{color:#C0B09C;font-weight:200}
        .form-submit{font-family:'Jost',sans-serif;font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:#F4EFE6;background:#261A0A;border:none;padding:16px 0;width:100%;cursor:pointer;margin-top:20px;transition:background 0.35s}
        .form-submit:hover{background:#8B6440}

        /* ── FOOTER ── */
        .footer{background:#1A0E04;padding:52px 64px 36px}
        .footer-top{display:flex;justify-content:space-between;align-items:flex-start;padding-bottom:40px;border-bottom:1px solid rgba(184,151,106,0.15);flex-wrap:wrap;gap:32px}
        .footer-brand-name{font-family:'Italiana',serif;font-size:20px;color:#F4EFE6;letter-spacing:0.04em}
        .footer-brand-tag{font-family:'Jost',sans-serif;font-size:7px;letter-spacing:0.3em;color:#B8976A;margin-top:3px;text-transform:uppercase}
        .footer-links{display:flex;gap:32px;flex-wrap:wrap}
        .fl-btn{font-family:'Jost',sans-serif;font-size:10px;letter-spacing:0.16em;color:#6A5A4A;text-transform:uppercase;background:none;border:none;cursor:pointer;transition:color 0.3s;text-decoration:none;display:inline-block}
        .fl-btn:hover{color:#D4B896}
        .footer-bottom{display:flex;justify-content:space-between;align-items:center;padding-top:24px;flex-wrap:wrap;gap:10px}
        .footer-copy{font-family:'Jost',sans-serif;font-size:10px;letter-spacing:0.1em;color:#4A3A28}
        .footer-email{font-family:'Jost',sans-serif;font-size:10px;letter-spacing:0.1em;color:#6A5A4A}

        /* ── MOBILE ── */
        @media(max-width:768px){
          .vbu-nav{padding:18px 24px !important}
          .vbu-nav.on{padding:14px 24px !important}
          .nav-links,.hero-badge{display:none !important}
          .burger{display:flex !important}
          .hero-content{padding:0 24px 56px !important}
          .hero-actions{flex-direction:column;align-items:flex-start;gap:12px}
          .btn-light,.btn-gold,.btn-dark,.btn-outline,.btn-submit,.form-submit{width:100% !important;text-align:center !important;padding:14px 24px !important}
          .about-wrap{grid-template-columns:1fr !important}
          .about-photo{min-height:56vw}
          .about-text{padding:52px 24px !important}
          .about-cta-row{flex-direction:column;align-items:stretch}
          .svc-section{padding:72px 24px !important}
          .svc-row{grid-template-columns:44px 1fr !important;gap:16px}
          .svc-body{display:none}
          .work-section{padding:72px 24px !important}
          .logo-grid{grid-template-columns:repeat(2,1fr) !important}
          .work-2col{grid-template-columns:1fr !important}
          .work-wide{grid-column:span 1 !important}
          .process-section{padding:72px 24px !important}
          .process-grid{grid-template-columns:1fr 1fr !important}
          .testi-section{grid-template-columns:1fr !important;padding:64px 24px !important;gap:40px}
          .contact-section{padding:72px 24px !important}
          .contact-grid{grid-template-columns:1fr !important;gap:52px !important}
          .footer{padding:44px 24px 28px !important}
          .footer-top{flex-direction:column;gap:24px}
          .footer-bottom{flex-direction:column;gap:6px;text-align:center}
        }
        @media(max-width:480px){
          .logo-grid{grid-template-columns:1fr 1fr !important}
          .process-grid{grid-template-columns:1fr !important}
        }
      `}</style>

      {/* ── MOBILE MENU ── */}
      <div className={`mob-nav${menuOpen ? " open" : ""}`}>
        <button onClick={() => setMenuOpen(false)} style={{ position:"absolute",top:24,right:24,background:"none",border:"none",fontSize:22,cursor:"pointer",color:"#261A0A" }}>✕</button>
        {["Work","About","Services","Process","Contact"].map(n => (
          <button key={n} className="nl" onClick={() => nav(n.toLowerCase())} style={{ fontSize:14,letterSpacing:"0.22em" }}>{n}</button>
        ))}
        <a href="https://wa.me/2347068246856" target="_blank" rel="noreferrer" className="btn-dark" style={{ marginTop:8 }}>Hire Me</a>
      </div>

      {/* ── NAV ── */}
      <nav className={`vbu-nav${scrolled ? " on" : ""}`}>
        <div className="brand" onClick={() => nav("hero")}>
          <Image src="/logo.png" alt="VBU Logo" width={30} height={30} className="brand-logo" style={{ objectFit:"contain" }} />
          <div className="brand-text">
            <div className="brand-name">Visuals by Uriel</div>
            <div className="brand-tag">Brand · Design · Identity</div>
          </div>
        </div>
        <div className="nav-links">
          {["Work","About","Services","Process","Contact"].map(n => (
            <button key={n} className="nl" onClick={() => nav(n.toLowerCase())}>{n}</button>
          ))}
          <a href="https://wa.me/2347068246856" target="_blank" rel="noreferrer" className="nl-cta">Hire Me</a>
        </div>
        <button className="burger" onClick={() => setMenuOpen(true)}><span/><span/><span/></button>
      </nav>

      {/* ── HERO ── */}
      <section id="hero" ref={heroRef} className="hero">
        <div className="hero-bg" style={{ transform:`scale(${heroScale})`, transformOrigin:"center center" }}>
          <Image src="/uriel-studio.jpg" alt="Uriel Maforikan" fill priority style={{ objectFit:"cover", objectPosition:"center 15%" }} />
        </div>
        <div className="hero-veil" />
        {/* Spinning badge */}
        <div className="hero-badge" style={{ position:"absolute", right:64, top:"50%", transform:"translateY(-50%)" }}>
          <div style={{ position:"relative", width:108, height:108 }}>
            <svg viewBox="0 0 108 108" style={{ position:"absolute",inset:0,animation:"spin 18s linear infinite" }}>
              <path id="circle-path" d="M 54,54 m -42,0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0" fill="none"/>
              <text style={{ fontSize:"8.5px", fontFamily:"'Jost',sans-serif", letterSpacing:"0.22em", fill:"rgba(212,184,150,0.65)", textTransform:"uppercase" }}>
                <textPath href="#circle-path">Brand Designer · Osun · Nigeria · </textPath>
              </text>
            </svg>
            <div style={{ position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center" }}>
              <div style={{ width:36,height:36,borderRadius:"50%",background:"rgba(184,151,106,0.25)",border:"1px solid rgba(184,151,106,0.5)" }} />
            </div>
          </div>
        </div>

        <div className="hero-content">
          <p className="hero-eyebrow">Graphic Designer · Brand Identity Specialist</p>
          <h1 className="hero-name">Uriel<br />Maforikan</h1>
          <p className="hero-brand">Visuals by Uriel</p>
          <p className="hero-desc">
            I help brands stand out with unique, enduring identities — built on strategy, crafted with intention, and designed to inspire trust.
          </p>
          <div className="hero-actions">
            <button className="btn-light" onClick={() => nav("work")}>View Portfolio</button>
            <a href="https://www.behance.net/uriel01" target="_blank" rel="noreferrer" className="btn-gold">Behance Portfolio</a>
          </div>
        </div>
        <div style={{ position:"absolute",bottom:32,left:64,display:"flex",flexDirection:"column",alignItems:"center",gap:8,zIndex:2 }}>
          <div style={{ width:1,height:56,background:"linear-gradient(to bottom,rgba(212,184,150,0.8),transparent)" }} />
          <span style={{ fontFamily:"'Jost',sans-serif",fontSize:8,letterSpacing:"0.25em",color:"rgba(212,184,150,0.65)",textTransform:"uppercase",writingMode:"vertical-rl" }}>Scroll</span>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div className="ticker">
        <div className="ticker-t">
          {Array(4).fill(["Brand Identity","Logo Design","Marketing Design","Social Media","Presentation Decks","Available for Freelance","Based in Nigeria"]).flat().map((t,i) => (
            <span key={i} className="ti">{t}&nbsp;&nbsp;◦</span>
          ))}
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section id="about">
        <div className="about-wrap">
          <Reveal>
            <div className="about-photo" style={{ minHeight:640, position:"relative" }}>
              <Image src="/uriel-native.jpg" alt="Uriel Maforikan" fill style={{ objectFit:"cover", objectPosition:"center top" }} />
              <div className="about-photo-overlay" />
              <span className="about-photo-cap">Osun, Nigeria</span>
            </div>
          </Reveal>
          <div className="about-text">
            <Reveal delay={0.1}>
              <p className="sl">About</p>
              <h2 className="about-h">Hi, I&apos;m<br /><em>Uriel</em> 👋🏾</h2>
              <p className="about-role">Graphic Designer · Brand Identity · Video Editor</p>
              <p className="about-body">
                An experienced designer with over 3 years of expertise, committed to helping brands stand out with unique, enduring identities that inspire trust and surpass the competition. Based in Nigeria, I collaborate remotely with teams and clients across the globe.
              </p>
              <p className="about-body">
                I am a creative powerhouse with a passion for turning ideas into extraordinary visuals. I specialize in designing brands that leave lasting impressions — including brand identities for StarHaven, MadamCook, and more. I also host The Great You Talk Podcast, spotlighting inspiring stories of creative professionals.
              </p>
              <div className="about-highlight">
                <p>I help create a consistent professional experience using strategy, brand identity and marketing designs — putting my clients ahead of their competitors.</p>
              </div>
              <div className="about-skills">
                {["Brand Identity","Logo Design","Minimalist Design","Social Media Visuals","Print & Marketing","Presentation Decks","Video Editing","Storyboarding"].map(s => (
                  <span key={s} className="skill-tag">{s}</span>
                ))}
              </div>
              <div className="about-cta-row">
                <a href="https://drive.google.com/file/d/1y-V2lNExxFCyR2m2uouSO7z4C8fEcqWK/view?usp=sharing" target="_blank" rel="noreferrer" className="btn-dark">Download Resume</a>
                <a href="https://www.behance.net/uriel01" target="_blank" rel="noreferrer" className="btn-outline">Behance Portfolio</a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="svc-section">
        <Reveal>
          <p className="sl" style={{ color:"#B8976A" }}><span style={{ background:"#B8976A",display:"inline-block",width:28,height:1,verticalAlign:"middle",marginRight:14 }} />Services</p>
          <h2 className="svc-h">What I <em>Do</em></h2>
        </Reveal>
        <div className="svc-list">
          {SERVICES.map((s,i) => (
            <Reveal key={s.num} delay={i*0.07}>
              <div className="svc-row">
                <div className="svc-num">{s.num}</div>
                <div className="svc-title">{s.title}</div>
                <div className="svc-body">{s.body}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── WORK ── */}
      <section id="work" className="work-section">
        <div className="work-header">
          <Reveal>
            <p className="sl">Portfolio</p>
            <h2 className="work-h">Selected <em>Work</em></h2>
          </Reveal>
          <Reveal delay={0.1}>
            <a href="https://www.behance.net/uriel01" target="_blank" rel="noreferrer" style={{ fontFamily:"'Jost',sans-serif",fontSize:10,letterSpacing:"0.18em",color:"#8B6440",textDecoration:"none",textTransform:"uppercase",borderBottom:"1px solid #B8976A",paddingBottom:2 }}>
              Full Portfolio on Behance →
            </a>
          </Reveal>
        </div>

        {/* FILTER */}
        <Reveal>
          <div className="filter-row">
            {FILTERS.map(f => (
              <button key={f} className={`filter-btn${activeFilter===f?" active":""}`} onClick={() => setActiveFilter(f)}>{f}</button>
            ))}
          </div>
        </Reveal>

        {/* ── LOGO DESIGNS ── */}
        <Reveal>
          <p className="sl" style={{ marginBottom:20 }}>Logo &amp; Brand Identity</p>
        </Reveal>
        <div className="logo-grid">
          {LOGO_DESIGNS.map((w,i) => (
            <Reveal key={w.id} delay={i*0.05}>
              <div className="logo-card" style={{ aspectRatio:"1/1" }}>
                <WorkSlot label={`${w.client} — Add design image`} img={w.img} aspect="aspect-square" />
                <div className="logo-card-overlay">
                  <div className="logo-card-info">
                    <div className="logo-card-client">{w.client}</div>
                    <div className="logo-card-tag">{w.tag}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── MARKETING / PRESENTATION ── */}
        <div style={{ marginTop:48 }}>
          <Reveal><p className="sl" style={{ marginBottom:20 }}>Marketing &amp; Presentation Decks</p></Reveal>
          <div className="work-2col">
            <Reveal delay={0}>
              <div>
                <WorkSlot label="Marketing Design — Add image" img="/work/marketing-1.jpg" aspect="aspect-43" />
              </div>
            </Reveal>
            <Reveal delay={0.07}>
              <div>
                <WorkSlot label="Marketing Design — Add image" img="/work/marketing-2.jpg" aspect="aspect-43" />
              </div>
            </Reveal>
            <Reveal delay={0.12} className="work-wide">
              <div>
                <WorkSlot label="Presentation Deck — Add image" img="/work/deck-1.jpg" aspect="aspect-43" />
              </div>
            </Reveal>
          </div>
        </div>

        {/* ── SOCIAL MEDIA ── */}
        <div style={{ marginTop:48 }}>
          <Reveal><p className="sl" style={{ marginBottom:20 }}>Social Media Designs</p></Reveal>
          <div className="logo-grid">
            {[1,2,3,4].map((n,i) => (
              <Reveal key={n} delay={i*0.06}>
                <div className="logo-card" style={{ aspectRatio:"1/1" }}>
                  <WorkSlot label={`Social Design ${n} — Add image`} img={`/work/social-${n}.jpg`} aspect="aspect-square" />
                  <div className="logo-card-overlay">
                    <div className="logo-card-info">
                      <div className="logo-card-client">Social Media</div>
                      <div className="logo-card-tag">Visual Content</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process" className="process-section">
        <Reveal>
          <p className="sl">How I Work</p>
          <h2 className="process-h">My Design <em>Process</em></h2>
        </Reveal>
        <div className="process-grid">
          {PROCESS.map((p,i) => (
            <Reveal key={p.step} delay={i*0.08}>
              <div className="process-card">
                <div className="process-step">{p.step}</div>
                <div className="process-title">{p.title}</div>
                <div className="process-body">{p.body}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIAL + AVAILABILITY ── */}
      <section className="testi-section">
        <Reveal>
          <div className="testi-left">
            <div className="testi-mark">&ldquo;</div>
            <p className="testi-quote">
              Working with Uriel was fantastic. Communicates adequately and on time — and have you seen his work? Amazing.
            </p>
            <p className="testi-attr">Ademisoye Hannah — OLAD</p>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="testi-right">
            <div className="avail-card">
              <p className="avail-label">Current Status</p>
              <p className="avail-text">Available for Freelance</p>
              <p className="avail-sub">Open to brand identity design gigs — remote and contract roles welcome. Based in Osun, Nigeria.</p>
            </div>
            <div className="contact-pills">
              <a href="https://www.instagram.com/vburielmaforikan" target="_blank" rel="noreferrer" className="cpill">Instagram @vburielmaforikan</a>
              <a href="https://www.behance.net/uriel01" target="_blank" rel="noreferrer" className="cpill">Behance Portfolio</a>
              <a href="mailto:maforikanuriel2017@gmail.com" className="cpill">maforikanuriel2017@gmail.com</a>
              <a href="https://wa.me/2347068246856" target="_blank" rel="noreferrer" className="cpill">WhatsApp · 07068246856</a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="contact-section">
        <div className="contact-grid">
          <Reveal>
            <p className="sl">Get in Touch</p>
            <h2 className="contact-h">
              Enough about me.<br /><em>What about you?</em>
            </h2>
            <p className="contact-body">
              Want us to work on a project together? I promise I&apos;m a lot of fun to work with. Shoot me a message below or reach out directly.
            </p>
            <div className="contact-links">
              <a href="mailto:maforikanuriel2017@gmail.com" className="cl">maforikanuriel2017@gmail.com</a>
              <a href="https://wa.me/2347068246856" target="_blank" rel="noreferrer" className="cl">WhatsApp · 07068246856</a>
              <a href="https://www.instagram.com/vburielmaforikan" target="_blank" rel="noreferrer" className="cl">Instagram @vburielmaforikan</a>
              <a href="https://www.behance.net/uriel01" target="_blank" rel="noreferrer" className="cl">Behance · uriel01</a>
            </div>
            <div style={{ marginTop:16 }}>
              <p className="fl">📍 Based in Osun, Nigeria — available worldwide</p>
              <p className="fl">🌐 Open to remote, contract &amp; full-time roles</p>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            {!sent ? (
              <div>
                {[{l:"Your name",k:"name",ph:"Full name",ta:false},{l:"Email address",k:"email",ph:"your@email.com",ta:false},{l:"Tell me about your project",k:"message",ph:"What are you working on?",ta:true}].map(({l,k,ph,ta}) => (
                  <div key={k} style={{ marginBottom:30 }}>
                    <label className="form-label">{l}</label>
                    {ta
                      ? <textarea className="form-ta" placeholder={ph} value={formData[k as keyof typeof formData]} onChange={e => setFormData({...formData,[k]:e.target.value})} />
                      : <input className="form-input" placeholder={ph} value={formData[k as keyof typeof formData]} onChange={e => setFormData({...formData,[k]:e.target.value})} />
                    }
                  </div>
                ))}
                <button className="form-submit" onClick={() => { if(formData.name&&formData.email) setSent(true); }}>Send Message</button>
              </div>
            ) : (
              <div style={{ paddingTop:80,textAlign:"center" }}>
                <div style={{ width:72,height:72,borderRadius:"50%",background:"#EDE5D6",border:"1px solid #B8976A",margin:"0 auto 24px",display:"flex",alignItems:"center",justifyContent:"center" }}>
                  <div style={{ width:48,height:48,borderRadius:"50%",background:"#B8976A" }} />
                </div>
                <h3 style={{ fontFamily:"'Italiana',serif",fontSize:32,color:"#261A0A",marginBottom:10 }}>Message sent.</h3>
                <p style={{ fontFamily:"'Jost',sans-serif",fontSize:13,fontWeight:300,color:"#8B6440",letterSpacing:"0.04em" }}>Uriel will be in touch soon.</p>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-top">
          <div style={{ display:"flex",alignItems:"center",gap:12 }}>
            <Image src="/logo.png" alt="VBU" width={26} height={26} style={{ objectFit:"contain" }} />
            <div>
              <div className="footer-brand-name">Visuals by Uriel</div>
              <div className="footer-brand-tag">Brand · Design · Identity</div>
            </div>
          </div>
          <div className="footer-links">
            {["Work","About","Services","Process","Contact"].map(n => (
              <button key={n} className="fl-btn" onClick={() => nav(n.toLowerCase())}>{n}</button>
            ))}
            <a href="https://www.behance.net/uriel01" target="_blank" rel="noreferrer" className="fl-btn">Behance</a>
            <a href="https://www.instagram.com/vburielmaforikan" target="_blank" rel="noreferrer" className="fl-btn">Instagram</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-copy">© 2026 Visuals by Uriel — Uriel Maforikan. All rights reserved.</span>
          <span className="footer-email">maforikanuriel2017@gmail.com</span>
        </div>
      </footer>
    </main>
  );
}
