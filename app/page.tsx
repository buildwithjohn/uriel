"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const WORKS = [
  { id: 1, title: "Mr. Perfect Series", category: "Film Direction", year: "2024", accent: "#8B6440" },
  { id: 2, title: "Brand Identity Systems", category: "Branding", year: "2024", accent: "#6B7C5A" },
  { id: 3, title: "Visual Storytelling", category: "Photography", year: "2023", accent: "#8B6440" },
  { id: 4, title: "Motion Design", category: "Animation", year: "2023", accent: "#6B7C5A" },
  { id: 5, title: "Editorial Direction", category: "Creative", year: "2024", accent: "#8B6440" },
  { id: 6, title: "Content Creation", category: "Strategy", year: "2024", accent: "#6B7C5A" },
];

const SERVICES = [
  { num: "I", title: "Visual Storytelling", body: "Every frame is a choice. Every edit, a decision. From short film to documentary, I craft visual narratives that endure." },
  { num: "II", title: "Brand Design", body: "Identity is not a logo. It is a feeling, a world, a promise. I build brand systems that carry that weight with grace." },
  { num: "III", title: "Film & Direction", body: "The Mr. Perfect Series was born here — from the discipline of the director's chair and the freedom of a singular vision." },
  { num: "IV", title: "Content Creation", body: "Strategic, intentional content for brands that understand that attention is sacred and must be earned, not stolen." },
];

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

function Reveal({ children, delay = 0, y = 40 }: { children: React.ReactNode; delay?: number; y?: number }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : `translateY(${y}px)`, transition: `opacity 1s cubic-bezier(.22,1,.36,1) ${delay}s, transform 1s cubic-bezier(.22,1,.36,1) ${delay}s` }}>
      {children}
    </div>
  );
}

export default function UrielSite() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeWork, setActiveWork] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const [heroOpacity, setHeroOpacity] = useState(1);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
      if (heroRef.current) {
        const h = heroRef.current.offsetHeight;
        setHeroOpacity(Math.max(0, 1 - window.scrollY / (h * 0.6)));
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <main style={{ fontFamily: "'Jost', 'Helvetica Neue', sans-serif", background: "#F0EBE1", color: "#2C1F0E", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500&family=Italiana&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 2px; }
        ::-webkit-scrollbar-thumb { background: #B8976A; }
        ::selection { background: #D4B896; color: #2C1F0E; }

        /* Eased reveal */
        @keyframes fadeUp { from { opacity:0; transform:translateY(50px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes ticker { from { transform:translateX(0); } to { transform:translateX(-50%); } }

        /* ─── NAV ─── */
        .u-nav { position:fixed; top:0; left:0; right:0; z-index:200; transition:all 0.6s ease; padding:28px 60px; display:flex; align-items:center; justify-content:space-between; }
        .u-nav.scrolled { background:rgba(240,235,225,0.96); backdrop-filter:blur(12px); padding:18px 60px; border-bottom:1px solid #D9CEBC; }
        .logo-mark { display:flex; flex-direction:column; cursor:pointer; }
        .logo-u { font-family:'Italiana',serif; font-size:22px; color:#2C1F0E; letter-spacing:0.04em; line-height:1; }
        .logo-sub { font-family:'Jost',sans-serif; font-size:7.5px; letter-spacing:0.35em; color:#B8976A; margin-top:2px; text-transform:uppercase; }
        .nav-center { display:flex; gap:44px; }
        .nav-link { font-family:'Jost',sans-serif; font-size:11px; letter-spacing:0.18em; color:#7A6650; text-transform:uppercase; cursor:pointer; background:none; border:none; transition:color 0.3s; }
        .nav-link:hover { color:#2C1F0E; }
        .nav-cta { font-family:'Jost',sans-serif; font-size:10px; letter-spacing:0.18em; color:#2C1F0E; text-decoration:none; text-transform:uppercase; border-bottom:1px solid #B8976A; padding-bottom:2px; transition:border-color 0.3s; }
        .nav-cta:hover { border-color:#2C1F0E; }
        .hamburger { display:none; flex-direction:column; gap:6px; cursor:pointer; background:none; border:none; }
        .hamburger span { display:block; width:24px; height:1px; background:#2C1F0E; transition:all 0.3s; }
        .mob-menu { display:none; position:fixed; inset:0; z-index:199; background:#F0EBE1; flex-direction:column; align-items:center; justify-content:center; gap:40px; }
        .mob-menu.open { display:flex; }

        /* ─── HERO ─── */
        .hero { height:100vh; position:relative; display:flex; align-items:flex-end; overflow:hidden; }
        .hero-img { position:absolute; inset:0; }
        .hero-img img { object-fit:cover; object-position:center top; filter:brightness(0.88) contrast(1.05); }
        .hero-veil { position:absolute; inset:0; background:linear-gradient(to top, rgba(26,16,6,0.72) 0%, rgba(26,16,6,0.2) 50%, transparent 100%); }
        .hero-content { position:relative; z-index:2; padding:0 60px 72px; width:100%; }
        .hero-eyebrow { font-family:'Jost',sans-serif; font-size:10px; letter-spacing:0.35em; color:#D4B896; text-transform:uppercase; margin-bottom:20px; animation:fadeIn 1.2s ease forwards; }
        .hero-name { font-family:'Italiana',serif; font-size:clamp(64px,8vw,112px); color:#F0EBE1; line-height:0.9; letter-spacing:0.01em; margin-bottom:28px; animation:fadeUp 1.2s cubic-bezier(.22,1,.36,1) 0.2s both; }
        .hero-name em { font-style:italic; color:#D4B896; }
        .hero-tagline { font-family:'Cormorant Garamond',serif; font-size:clamp(16px,1.6vw,20px); color:rgba(240,235,225,0.75); font-style:italic; font-weight:300; max-width:500px; line-height:1.7; margin-bottom:44px; animation:fadeUp 1.2s cubic-bezier(.22,1,.36,1) 0.4s both; }
        .hero-actions { display:flex; align-items:center; gap:36px; animation:fadeUp 1.2s cubic-bezier(.22,1,.36,1) 0.55s both; flex-wrap:wrap; }
        .btn-ghost { font-family:'Jost',sans-serif; font-size:10px; letter-spacing:0.22em; text-transform:uppercase; color:#F0EBE1; border:1px solid rgba(240,235,225,0.5); padding:14px 36px; background:transparent; cursor:pointer; transition:all 0.4s; }
        .btn-ghost:hover { background:rgba(240,235,225,0.1); border-color:#F0EBE1; }
        .btn-solid { font-family:'Jost',sans-serif; font-size:10px; letter-spacing:0.22em; text-transform:uppercase; color:#2C1F0E; background:#D4B896; border:1px solid #D4B896; padding:14px 36px; cursor:pointer; transition:all 0.4s; text-decoration:none; display:inline-block; }
        .btn-solid:hover { background:#C9A87A; border-color:#C9A87A; }
        .hero-scroll { position:absolute; bottom:32px; right:60px; display:flex; flex-direction:column; align-items:center; gap:8px; z-index:2; }
        .hero-scroll-line { width:1px; height:56px; background:linear-gradient(to bottom, rgba(212,184,150,0.8), transparent); }
        .hero-scroll-txt { font-family:'Jost',sans-serif; font-size:8px; letter-spacing:0.25em; color:rgba(212,184,150,0.7); text-transform:uppercase; writing-mode:vertical-rl; }

        /* ─── TICKER ─── */
        .ticker { background:#2C1F0E; padding:13px 0; overflow:hidden; }
        .ticker-track { display:flex; animation:ticker 28s linear infinite; white-space:nowrap; }
        .ticker-item { font-family:'Jost',sans-serif; font-size:9px; letter-spacing:0.28em; color:#B8976A; text-transform:uppercase; margin-right:64px; }
        .ticker-dot { color:#D4B896; margin-right:64px; font-size:8px; }

        /* ─── ABOUT ─── */
        .about-wrap { display:grid; grid-template-columns:1fr 1fr; min-height:92vh; }
        .about-left { position:relative; overflow:hidden; }
        .about-left img { width:100%; height:100%; object-fit:cover; object-position:center top; filter:brightness(0.92); transition:transform 0.8s ease; }
        .about-left:hover img { transform:scale(1.04); }
        .about-caption { position:absolute; bottom:28px; left:28px; font-family:'Jost',sans-serif; font-size:8px; letter-spacing:0.2em; color:rgba(240,235,225,0.6); text-transform:uppercase; }
        .about-right { padding:80px 72px; display:flex; flex-direction:column; justify-content:center; background:#F0EBE1; }
        .section-label { font-family:'Jost',sans-serif; font-size:9px; letter-spacing:0.35em; color:#B8976A; text-transform:uppercase; margin-bottom:28px; display:flex; align-items:center; gap:16px; }
        .section-label::before { content:''; width:32px; height:1px; background:#B8976A; }
        .about-heading { font-family:'Italiana',serif; font-size:clamp(44px,4.5vw,68px); color:#2C1F0E; line-height:1.05; margin-bottom:32px; }
        .about-heading em { font-style:italic; color:#8B6440; }
        .about-body { font-family:'Cormorant Garamond',serif; font-size:19px; font-weight:300; color:#6B5438; line-height:1.9; font-style:italic; margin-bottom:20px; }
        .about-body-2 { font-family:'Jost',sans-serif; font-size:13px; font-weight:300; color:#9A8470; line-height:1.9; letter-spacing:0.02em; margin-bottom:52px; }
        .stats-row { display:grid; grid-template-columns:repeat(3,1fr); gap:0; border-top:1px solid #D9CEBC; padding-top:40px; }
        .stat { padding-right:32px; border-right:1px solid #D9CEBC; padding-left:0; }
        .stat:first-child { padding-left:0; }
        .stat:last-child { border-right:none; padding-right:0; padding-left:32px; }
        .stat:nth-child(2) { padding-left:32px; }
        .stat-num { font-family:'Italiana',serif; font-size:52px; color:#2C1F0E; line-height:1; }
        .stat-label { font-family:'Jost',sans-serif; font-size:9px; letter-spacing:0.25em; color:#B8976A; text-transform:uppercase; margin-top:6px; }

        /* ─── CIRCLE MOTIF ─── */
        .circle-section { padding:100px 60px; background:#E8DFD0; position:relative; overflow:hidden; }
        .circle-deco { position:absolute; border-radius:50%; border:1px solid rgba(184,151,106,0.25); pointer-events:none; }
        .circle-words { display:flex; align-items:center; gap:48px; flex-wrap:wrap; }
        .circle-quote { font-family:'Cormorant Garamond',serif; font-size:clamp(22px,3vw,36px); font-style:italic; font-weight:300; color:#4A3520; line-height:1.6; max-width:600px; }
        .circle-mark { width:80px; height:80px; border-radius:50%; border:1px solid #B8976A; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .circle-mark-inner { width:56px; height:56px; border-radius:50%; background:#B8976A; display:flex; align-items:center; justify-content:center; }
        .circle-mark svg { width:20px; height:20px; fill:#F0EBE1; }

        /* ─── WORK ─── */
        .work-section { padding:100px 60px; background:#F0EBE1; }
        .work-header { display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:64px; flex-wrap:wrap; gap:20px; }
        .work-heading { font-family:'Italiana',serif; font-size:clamp(40px,5vw,72px); color:#2C1F0E; line-height:0.95; }
        .work-heading em { font-style:italic; color:#8B6440; }
        .work-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:2px; }
        .work-card { position:relative; aspect-ratio:4/5; overflow:hidden; cursor:pointer; background:#D9CEBC; }
        .work-card-img { position:absolute; inset:0; transition:transform 0.8s cubic-bezier(.22,1,.36,1); }
        .work-card-img img { object-fit:cover; object-position:center top; filter:brightness(0.85); }
        .work-card:hover .work-card-img { transform:scale(1.06); }
        .work-card-veil { position:absolute; inset:0; background:linear-gradient(to top, rgba(26,16,6,0.75) 0%, transparent 55%); transition:opacity 0.4s; }
        .work-card-body { position:absolute; bottom:0; left:0; right:0; padding:28px; z-index:2; transform:translateY(8px); transition:transform 0.4s cubic-bezier(.22,1,.36,1); }
        .work-card:hover .work-card-body { transform:translateY(0); }
        .work-card-num { font-family:'Jost',sans-serif; font-size:9px; letter-spacing:0.25em; color:rgba(212,184,150,0.7); margin-bottom:8px; }
        .work-card-title { font-family:'Italiana',serif; font-size:22px; color:#F0EBE1; line-height:1.1; margin-bottom:6px; }
        .work-card-cat { font-family:'Jost',sans-serif; font-size:9px; letter-spacing:0.2em; color:#D4B896; text-transform:uppercase; }
        /* Placeholder tiles when no image */
        .work-tile-1 { background:linear-gradient(135deg,#C4A882,#A08060); }
        .work-tile-2 { background:linear-gradient(135deg,#8B9A78,#6B7A58); }
        .work-tile-3 { background:linear-gradient(135deg,#B89878,#907858); }
        .work-tile-4 { background:linear-gradient(135deg,#9AA888,#7A8868); }
        .work-tile-5 { background:linear-gradient(135deg,#C8A888,#A88868); }
        .work-tile-6 { background:linear-gradient(135deg,#88A090,#687870); }

        /* ─── SERVICES ─── */
        .services-section { background:#2C1F0E; padding:100px 60px; }
        .services-heading { font-family:'Italiana',serif; font-size:clamp(40px,5vw,68px); color:#F0EBE1; margin-bottom:72px; line-height:1; }
        .services-heading em { font-style:italic; color:#D4B896; }
        .services-list { display:flex; flex-direction:column; border-top:1px solid rgba(184,151,106,0.2); }
        .service-row { display:grid; grid-template-columns:80px 1fr 1fr; gap:40px; padding:44px 0; border-bottom:1px solid rgba(184,151,106,0.15); align-items:center; transition:background 0.3s; cursor:default; }
        .service-row:hover { padding-left:12px; }
        .service-num { font-family:'Italiana',serif; font-size:40px; color:#B8976A; opacity:0.6; }
        .service-title { font-family:'Italiana',serif; font-size:clamp(24px,2.5vw,34px); color:#F0EBE1; }
        .service-body { font-family:'Jost',sans-serif; font-size:13px; font-weight:300; color:#9A8470; line-height:1.85; letter-spacing:0.02em; }

        /* ─── FILM / FEATURED ─── */
        .film-section { background:#E8DFD0; }
        .film-fullbleed { width:100%; aspect-ratio:21/9; position:relative; overflow:hidden; }
        .film-fullbleed img { object-fit:cover; object-position:center 20%; filter:brightness(0.8) sepia(0.15); }
        .film-overlay { position:absolute; inset:0; background:linear-gradient(to right, rgba(26,16,6,0.65) 0%, transparent 60%); display:flex; align-items:center; }
        .film-text { padding:60px; }
        .film-eyebrow { font-family:'Jost',sans-serif; font-size:9px; letter-spacing:0.35em; color:#D4B896; text-transform:uppercase; margin-bottom:20px; }
        .film-title { font-family:'Italiana',serif; font-size:clamp(40px,5vw,68px); color:#F0EBE1; line-height:0.95; margin-bottom:24px; }
        .film-title em { font-style:italic; color:#D4B896; }
        .film-meta { display:flex; gap:32px; margin-top:32px; }
        .film-meta-item { text-align:left; }
        .film-meta-label { font-family:'Jost',sans-serif; font-size:8px; letter-spacing:0.25em; color:rgba(212,184,150,0.6); text-transform:uppercase; margin-bottom:4px; }
        .film-meta-val { font-family:'Cormorant Garamond',serif; font-size:16px; color:#F0EBE1; font-style:italic; }
        .film-strip { display:flex; }
        .film-strip-pane { flex:1; aspect-ratio:1; position:relative; overflow:hidden; }
        .film-strip-pane img { object-fit:cover; object-position:center top; filter:sepia(25%) brightness(0.9); transition:filter 0.6s; }
        .film-strip-pane:hover img { filter:sepia(5%) brightness(1); }

        /* ─── CONTACT ─── */
        .contact-section { padding:100px 60px; background:#F0EBE1; }
        .contact-grid { display:grid; grid-template-columns:1fr 1fr; gap:100px; align-items:start; }
        .contact-heading { font-family:'Italiana',serif; font-size:clamp(40px,5vw,68px); color:#2C1F0E; line-height:1; margin-bottom:28px; }
        .contact-heading em { font-style:italic; color:#8B6440; }
        .contact-body { font-family:'Cormorant Garamond',serif; font-size:19px; font-style:italic; font-weight:300; color:#7A6650; line-height:1.8; margin-bottom:44px; }
        .contact-links { display:flex; flex-direction:column; gap:14px; }
        .contact-link { font-family:'Jost',sans-serif; font-size:10px; letter-spacing:0.18em; color:#8B6440; text-decoration:none; text-transform:uppercase; display:flex; align-items:center; gap:12px; transition:gap 0.3s; }
        .contact-link:hover { gap:20px; }
        .contact-link::before { content:''; width:24px; height:1px; background:#B8976A; }
        .form-field { margin-bottom:32px; }
        .form-label { font-family:'Jost',sans-serif; font-size:8.5px; letter-spacing:0.25em; color:#B8976A; text-transform:uppercase; display:block; margin-bottom:10px; }
        .form-input { font-family:'Jost',sans-serif; background:transparent; border:none; border-bottom:1px solid #D9CEBC; color:#2C1F0E; font-size:14px; padding:10px 0; width:100%; outline:none; transition:border-color 0.3s; letter-spacing:0.02em; }
        .form-input:focus { border-bottom-color:#8B6440; }
        .form-input::placeholder { color:#C4B4A0; font-weight:300; }
        .form-textarea { font-family:'Jost',sans-serif; background:transparent; border:none; border-bottom:1px solid #D9CEBC; color:#2C1F0E; font-size:14px; padding:10px 0; width:100%; outline:none; resize:none; height:88px; transition:border-color 0.3s; letter-spacing:0.02em; }
        .form-textarea:focus { border-bottom-color:#8B6440; }
        .form-textarea::placeholder { color:#C4B4A0; font-weight:300; }
        .btn-submit { font-family:'Jost',sans-serif; font-size:10px; letter-spacing:0.22em; text-transform:uppercase; color:#F0EBE1; background:#2C1F0E; border:1px solid #2C1F0E; padding:16px 0; width:100%; cursor:pointer; margin-top:16px; transition:all 0.4s; }
        .btn-submit:hover { background:#8B6440; border-color:#8B6440; }

        /* ─── FOOTER ─── */
        .footer { background:#2C1F0E; padding:48px 60px 36px; }
        .footer-top { display:flex; justify-content:space-between; align-items:flex-start; padding-bottom:36px; border-bottom:1px solid rgba(184,151,106,0.2); flex-wrap:wrap; gap:32px; }
        .footer-logo-name { font-family:'Italiana',serif; font-size:20px; color:#F0EBE1; letter-spacing:0.04em; }
        .footer-logo-sub { font-family:'Jost',sans-serif; font-size:7.5px; letter-spacing:0.3em; color:#B8976A; margin-top:3px; text-transform:uppercase; }
        .footer-links { display:flex; gap:36px; flex-wrap:wrap; }
        .footer-link { font-family:'Jost',sans-serif; font-size:10px; letter-spacing:0.18em; color:#7A6650; text-transform:uppercase; cursor:pointer; background:none; border:none; transition:color 0.3s; }
        .footer-link:hover { color:#D4B896; }
        .footer-bottom { display:flex; justify-content:space-between; align-items:center; padding-top:24px; flex-wrap:wrap; gap:12px; }
        .footer-copy { font-family:'Jost',sans-serif; font-size:10px; letter-spacing:0.12em; color:#5A4A38; }
        .footer-circles { display:flex; gap:6px; align-items:center; }
        .fc { border-radius:50%; }

        /* ─── MOBILE ─── */
        @media (max-width: 768px) {
          .u-nav { padding:20px 24px !important; }
          .u-nav.scrolled { padding:16px 24px !important; }
          .nav-center, .nav-cta { display:none !important; }
          .hamburger { display:flex !important; }
          .hero-content { padding:0 24px 56px !important; }
          .hero-scroll { display:none; }
          .about-wrap { grid-template-columns:1fr !important; }
          .about-left { min-height:56vw; }
          .about-right { padding:52px 24px !important; }
          .stats-row { gap:0; }
          .stat { padding:0 12px !important; }
          .circle-section { padding:72px 24px !important; }
          .circle-words { flex-direction:column; gap:28px; }
          .work-section { padding:72px 24px !important; }
          .work-grid { grid-template-columns:1fr !important; }
          .work-card { aspect-ratio:3/2 !important; }
          .services-section { padding:72px 24px !important; }
          .service-row { grid-template-columns:48px 1fr !important; gap:16px; }
          .service-body { display:none; }
          .film-fullbleed { aspect-ratio:4/3 !important; }
          .film-strip { display:none !important; }
          .film-text { padding:32px !important; }
          .film-meta { flex-wrap:wrap; gap:20px; }
          .contact-section { padding:72px 24px !important; }
          .contact-grid { grid-template-columns:1fr !important; gap:52px !important; }
          .footer { padding:40px 24px 28px !important; }
          .footer-top { flex-direction:column; gap:24px; }
          .footer-bottom { flex-direction:column; gap:8px; text-align:center; }
          .btn-ghost, .btn-solid { padding:13px 28px !important; font-size:9px !important; }
        }
      `}</style>

      {/* ── MOBILE MENU ── */}
      <div className={`mob-menu${menuOpen ? " open" : ""}`}>
        <button onClick={() => setMenuOpen(false)} style={{ position:"absolute",top:24,right:24,background:"none",border:"none",fontSize:24,cursor:"pointer",color:"#2C1F0E" }}>✕</button>
        {["Work","About","Services","Contact"].map(n => (
          <button key={n} className="nav-link" onClick={() => nav(n.toLowerCase())} style={{ fontSize:14,letterSpacing:"0.22em" }}>{n}</button>
        ))}
        <a href="https://www.youtube.com/@urielmaforikan" target="_blank" rel="noreferrer" style={{ fontFamily:"'Jost',sans-serif",fontSize:11,letterSpacing:"0.22em",color:"#8B6440",textDecoration:"none",textTransform:"uppercase",borderBottom:"1px solid #B8976A",paddingBottom:2 }}>YouTube</a>
      </div>

      {/* ── NAV ── */}
      <nav className={`u-nav${scrolled ? " scrolled" : ""}`}>
        <div className="logo-mark" onClick={() => nav("hero")}>
          <span className="logo-u">URIEL</span>
          <span className="logo-sub">Maforikan</span>
        </div>
        <div className="nav-center">
          {["Work","About","Services","Contact"].map(n => (
            <button key={n} className="nav-link" onClick={() => nav(n.toLowerCase())}>{n}</button>
          ))}
        </div>
        <a href="https://www.youtube.com/@urielmaforikan" target="_blank" rel="noreferrer" className="nav-cta">YouTube</a>
        <button className="hamburger" onClick={() => setMenuOpen(true)}><span/><span/><span/></button>
      </nav>

      {/* ── HERO ── */}
      <section id="hero" ref={heroRef} className="hero" style={{ opacity: heroOpacity }}>
        <div className="hero-img">
          <Image src="/uriel-native.jpg" alt="Uriel Maforikan" fill priority />
        </div>
        <div className="hero-veil" />
        <div className="hero-content">
          <p className="hero-eyebrow">Visual Storyteller · Brand Designer · Filmmaker</p>
          <h1 className="hero-name">
            Uriel<br /><em>Maforikan</em>
          </h1>
          <p className="hero-tagline">
            Telling stories through light, frame, and form.<br />
            Turning brands into worlds people want to live in.
          </p>
          <div className="hero-actions">
            <button className="btn-ghost" onClick={() => nav("work")}>View the work</button>
            <a href="https://www.youtube.com/@urielmaforikan" target="_blank" rel="noreferrer" className="btn-solid">Watch on YouTube</a>
          </div>
        </div>
        <div className="hero-scroll">
          <div className="hero-scroll-line" />
          <span className="hero-scroll-txt">Scroll</span>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div className="ticker">
        <div className="ticker-track">
          {Array(4).fill(["Visual Storytelling","Brand Design","Film Direction","Mr. Perfect Series","Creative Identity","Lagos · Nigeria"]).flat().map((t, i) => (
            <span key={i} className={i % 7 === 6 ? "ticker-dot" : "ticker-item"}>{i % 7 === 6 ? "◦" : t}</span>
          ))}
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section id="about">
        <div className="about-wrap">
          <Reveal>
            <div className="about-left" style={{ minHeight: 600 }}>
              <Image src="/uriel-studio.jpg" alt="Uriel Maforikan" fill style={{ objectFit:"cover", objectPosition:"center top" }} />
              <span className="about-caption">© Yolo Imagery · Lagos</span>
            </div>
          </Reveal>
          <div className="about-right">
            <Reveal delay={0.15}>
              <p className="section-label">About</p>
              <h2 className="about-heading">
                Framing<br />the world<br /><em>differently.</em>
              </h2>
              <p className="about-body">
                Uriel Maforikan is a visual storyteller and brand designer based in Lagos, Nigeria — creating work that bridges the emotional and the aesthetic.
              </p>
              <p className="about-body-2">
                With an eye trained on cinema and a heart for human story, he brings a rare combination of technical precision and cultural depth to every engagement. The Mr. Perfect Series was just the beginning.
              </p>
              <div className="stats-row">
                {[["50+","Projects"],["3+","Years Active"],["∞","Stories"]].map(([n,l]) => (
                  <div key={l} className="stat">
                    <div className="stat-num">{n}</div>
                    <div className="stat-label">{l}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── CIRCLE MOTIF / PHILOSOPHY ── */}
      <section className="circle-section">
        <div style={{ position:"absolute",top:-120,right:-120 }}>
          <div className="circle-deco" style={{ width:400,height:400,top:0,left:0 }} />
          <div className="circle-deco" style={{ width:280,height:280,top:60,left:60 }} />
        </div>
        <Reveal>
          <div className="circle-words" style={{ position:"relative",zIndex:1 }}>
            <div className="circle-mark">
              <div className="circle-mark-inner">
                <svg viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16A8 8 0 0010 2zm0 14a6 6 0 110-12 6 6 0 010 12z" opacity="0.6"/><circle cx="10" cy="10" r="2.5"/></svg>
              </div>
            </div>
            <blockquote className="circle-quote">
              &ldquo;The most powerful creative work does not demand attention — it commands presence. It does not shout. It simply <em style={{ fontStyle:"italic",color:"#8B6440" }}>is</em>.&rdquo;
            </blockquote>
          </div>
        </Reveal>
      </section>

      {/* ── WORK ── */}
      <section id="work" className="work-section">
        <div className="work-header">
          <Reveal>
            <p className="section-label">Selected Work</p>
            <h2 className="work-heading">
              The<br /><em>Archive</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <a href="https://www.youtube.com/@urielmaforikan" target="_blank" rel="noreferrer" style={{ fontFamily:"'Jost',sans-serif",fontSize:10,letterSpacing:"0.2em",color:"#8B6440",textDecoration:"none",textTransform:"uppercase",borderBottom:"1px solid #B8976A",paddingBottom:2 }}>
              Full Channel →
            </a>
          </Reveal>
        </div>
        <div className="work-grid">
          {WORKS.map((w, i) => (
            <Reveal key={w.id} delay={i * 0.06}>
              <div className={`work-card work-tile-${i+1}`} onMouseEnter={() => setActiveWork(w.id)} onMouseLeave={() => setActiveWork(null)}>
                <div className="work-card-img">
                  <Image src={i === 0 ? "/uriel-film.jpg" : i === 1 ? "/uriel-studio.jpg" : "/uriel-native.jpg"} alt={w.title} fill />
                </div>
                <div className="work-card-veil" />
                <div className="work-card-body">
                  <p className="work-card-num">{String(i+1).padStart(2,"0")} · {w.year}</p>
                  <h3 className="work-card-title">{w.title}</h3>
                  <p className="work-card-cat">{w.category}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="services-section">
        <Reveal>
          <p className="section-label" style={{ color:"#B8976A" }}>
            <span style={{ background:"#B8976A",display:"inline-block",width:32,height:1,verticalAlign:"middle",marginRight:16 }} />
            What I Do
          </p>
          <h2 className="services-heading">Creative <em>Services</em></h2>
        </Reveal>
        <div className="services-list">
          {SERVICES.map((s, i) => (
            <Reveal key={s.num} delay={i * 0.08}>
              <div className="service-row">
                <div className="service-num">{s.num}</div>
                <div className="service-title">{s.title}</div>
                <div className="service-body">{s.body}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── FEATURED / FILM ── */}
      <section className="film-section">
        <div className="film-fullbleed">
          <Image src="/uriel-film.jpg" alt="Mr. Perfect Series" fill />
          <div className="film-overlay">
            <div className="film-text">
              <Reveal>
                <p className="film-eyebrow">Featured Project</p>
                <h2 className="film-title">Mr. Perfect<br /><em>Series</em></h2>
                <div className="film-meta">
                  {[["Director","UMA"],["Scene","E9.S9"],["Date","Dec 2024"],["Status","Ongoing"]].map(([l,v]) => (
                    <div key={l} className="film-meta-item">
                      <p className="film-meta-label">{l}</p>
                      <p className="film-meta-val">{v}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
        <div className="film-strip">
          {["/uriel-film.jpg","/uriel-studio.jpg","/uriel-native.jpg"].map((src,i) => (
            <div key={i} className="film-strip-pane">
              <Image src={src} alt="Uriel" fill />
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="contact-section">
        <div className="contact-grid">
          <Reveal>
            <p className="section-label">Get in Touch</p>
            <h2 className="contact-heading">
              Let&apos;s make<br />something<br /><em>great.</em>
            </h2>
            <p className="contact-body">
              Whether it&apos;s a brand, a film, or a story waiting to be told — I am open to conversations that lead somewhere remarkable.
            </p>
            <div className="contact-links">
              <a href="https://www.youtube.com/@urielmaforikan" target="_blank" rel="noreferrer" className="contact-link">YouTube @urielmaforikan</a>
              <a href="https://www.notion.so/Hi-I-m-Uriel-Maforikan-3e9d350fe4e8432f9c14ed0b45d56255" target="_blank" rel="noreferrer" className="contact-link">Portfolio &amp; Notion</a>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            {!sent ? (
              <div style={{ paddingTop:8 }}>
                {[{l:"Your name",k:"name",ph:"Full name",ta:false},{l:"Email address",k:"email",ph:"your@email.com",ta:false},{l:"Your message",k:"message",ph:"Tell me about your project…",ta:true}].map(({l,k,ph,ta}) => (
                  <div key={k} className="form-field">
                    <label className="form-label">{l}</label>
                    {ta
                      ? <textarea className="form-textarea" placeholder={ph} value={formData[k as keyof typeof formData]} onChange={e => setFormData({...formData,[k]:e.target.value})} />
                      : <input className="form-input" placeholder={ph} value={formData[k as keyof typeof formData]} onChange={e => setFormData({...formData,[k]:e.target.value})} />
                    }
                  </div>
                ))}
                <button className="btn-submit" onClick={() => { if(formData.name && formData.email) setSent(true); }}>Send message</button>
              </div>
            ) : (
              <div style={{ paddingTop:80, textAlign:"center" }}>
                <div style={{ width:80,height:80,borderRadius:"50%",border:"1px solid #B8976A",margin:"0 auto 28px",display:"flex",alignItems:"center",justifyContent:"center" }}>
                  <div style={{ width:56,height:56,borderRadius:"50%",background:"#B8976A" }} />
                </div>
                <h3 style={{ fontFamily:"'Italiana',serif",fontSize:36,color:"#2C1F0E",marginBottom:12 }}>Message received.</h3>
                <p style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontStyle:"italic",color:"#8B6440" }}>Uriel will be in touch soon.</p>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-top">
          <div>
            <div className="footer-logo-name">URIEL MAFORIKAN</div>
            <div className="footer-logo-sub">Visual Storyteller · Brand Designer</div>
          </div>
          <div className="footer-links">
            {["Work","About","Services","Contact"].map(n => (
              <button key={n} className="footer-link" onClick={() => nav(n.toLowerCase())}>{n}</button>
            ))}
            <a href="https://www.youtube.com/@urielmaforikan" target="_blank" rel="noreferrer" style={{ fontFamily:"'Jost',sans-serif",fontSize:10,letterSpacing:"0.18em",color:"#7A6650",textDecoration:"none",textTransform:"uppercase",transition:"color 0.3s" }}>YouTube</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-copy">© 2026 Uriel Maforikan. All rights reserved.</span>
          <div className="footer-circles">
            {[7,10,7].map((s,i) => <div key={i} className="fc" style={{ width:s,height:s,background:i===1?"#B8976A":"#4A3A28" }} />)}
          </div>
        </div>
      </footer>
    </main>
  );
}
