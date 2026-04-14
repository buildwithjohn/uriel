"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const WORKS = [
  { id: 1, title: "Mr. Perfect Series", category: "Film", year: "2024", color: "#8B6914" },
  { id: 2, title: "Brand Identity Systems", category: "Branding", year: "2024", color: "#A0782A" },
  { id: 3, title: "Visual Storytelling", category: "Photography", year: "2023", color: "#7A5C10" },
  { id: 4, title: "Motion Design", category: "Animation", year: "2023", color: "#8B6914" },
  { id: 5, title: "Editorial Direction", category: "Creative", year: "2024", color: "#A0782A" },
  { id: 6, title: "Content Strategy", category: "Strategy", year: "2024", color: "#7A5C10" },
];

const SERVICES = [
  { icon: "◈", title: "Visual Storytelling", desc: "Crafting narratives through the lens — film, photography, and direction that moves people and creates lasting impressions." },
  { icon: "◉", title: "Brand Design", desc: "Identity systems that communicate what words cannot. From logo mark to full brand world — cohesive and unforgettable." },
  { icon: "◫", title: "Film & Direction", desc: "Directing short films, series, and brand films with cinematic precision and emotional intent." },
  { icon: "◐", title: "Content Creation", desc: "Strategic content for brands seeking a distinctive voice — built for YouTube, social, and beyond." },
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
    <div ref={ref} className={className} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(32px)", transition: `opacity 0.85s ease ${delay}s, transform 0.85s ease ${delay}s` }}>
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
    <main className="u-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,600&family=Space+Mono:wght@400;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── BASE ── */
        .u-root { font-family: 'Cormorant Garamond', Georgia, serif; background: #F5F0E8; color: #1A1208; min-height: 100vh; overflow-x: hidden; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: #C9A84C; }
        ::selection { background: #C9A84C55; color: #1A1208; }

        /* ── ANIMATIONS ── */
        @keyframes fadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        @keyframes marquee { from { transform:translateX(0); } to { transform:translateX(-50%); } }

        /* ── NAV ── */
        .u-nav { position:fixed; top:0; left:0; right:0; z-index:100; display:flex; align-items:center; justify-content:space-between; transition:all 0.4s ease; }
        .u-nav.scrolled { background:rgba(245,240,232,0.97); backdrop-filter:blur(16px); border-bottom:1px solid #DDD5C0; }
        .nav-links { display:flex; gap:36px; align-items:center; }
        .nav-btn { cursor:pointer; font-family:'Space Mono',monospace; font-size:10px; letter-spacing:0.15em; color:#8A7A60; text-transform:uppercase; transition:color 0.3s; background:none; border:none; }
        .nav-btn:hover { color:#8B6914; }
        .nav-yt { font-family:'Space Mono',monospace; font-size:10px; letter-spacing:0.12em; color:#F5F0E8; background:#1A1208; padding:9px 20px; text-decoration:none; transition:all 0.3s; }
        .nav-yt:hover { background:#8B6914; }
        .hamburger { display:none; flex-direction:column; gap:5px; cursor:pointer; background:none; border:none; padding:4px; }
        .hamburger span { display:block; width:22px; height:1.5px; background:#1A1208; }
        .mobile-menu { display:none; position:fixed; inset:0; z-index:99; background:#F5F0E8; flex-direction:column; align-items:center; justify-content:center; gap:36px; }
        .mobile-menu.open { display:flex !important; }
        .mob-btn { font-family:'Space Mono',monospace; font-size:12px; letter-spacing:0.2em; color:#8A7A60; background:none; border:none; cursor:pointer; text-transform:uppercase; transition:color 0.3s; }
        .mob-btn:hover { color:#8B6914; }

        /* ── TICKER ── */
        .ticker-track { display:flex; animation:marquee 22s linear infinite; white-space:nowrap; }

        /* ── WORK GRID ── */
        .work-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1px; background:#DDD5C0; }
        .work-card { background:#F5F0E8; padding:44px 32px; position:relative; overflow:hidden; cursor:pointer; transition:background 0.35s; border:none; }
        .work-card:hover { background:#EDE5D4; }
        .work-card .c-top { position:absolute; top:0; left:0; right:0; height:3px; background:transparent; transition:background 0.3s; }
        .work-card:hover .c-top { background:#C9A84C; }
        .work-card .c-arrow { position:absolute; bottom:20px; right:24px; opacity:0; font-size:20px; color:#8B6914; transition:opacity 0.3s; }
        .work-card:hover .c-arrow { opacity:1; }

        /* ── SERVICES ── */
        .svc-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:1px; background:#DDD5C0; }
        .svc-card { background:#F5F0E8; padding:56px 48px; transition:background 0.35s; }
        .svc-card:hover { background:#EDE5D4; }

        /* ── GRIDS ── */
        .about-grid { display:grid; grid-template-columns:1fr 1fr; gap:88px; align-items:center; }
        .contact-grid { display:grid; grid-template-columns:1fr 1fr; gap:80px; }
        .footer-row { display:flex; justify-content:space-between; align-items:center; }

        /* ── BUTTONS ── */
        .cta-btn { border:2px solid #1A1208; background:transparent; color:#1A1208; font-family:'Space Mono',monospace; font-size:11px; letter-spacing:0.2em; cursor:pointer; transition:all 0.3s; }
        .cta-btn:hover { background:#1A1208; color:#F5F0E8; }
        .cta-btn.gold { border-color:#8B6914; color:#8B6914; }
        .cta-btn.gold:hover { background:#8B6914; color:#F5F0E8; }

        /* ── INPUTS ── */
        .u-inp { font-family:'Space Mono',monospace; background:transparent; border:none; border-bottom:1.5px solid #C8BFA8; color:#1A1208; font-size:12px; padding:10px 0; width:100%; outline:none; transition:border-color 0.3s; }
        .u-inp:focus { border-bottom-color:#8B6914; }
        .u-inp::placeholder { color:#B0A48A; }
        .u-ta { font-family:'Space Mono',monospace; background:transparent; border:none; border-bottom:1.5px solid #C8BFA8; color:#1A1208; font-size:12px; padding:10px 0; width:100%; outline:none; resize:none; height:84px; transition:border-color 0.3s; }
        .u-ta:focus { border-bottom-color:#8B6914; }
        .u-ta::placeholder { color:#B0A48A; }

        /* ── LINKS ── */
        .soc-lnk { font-family:'Space Mono',monospace; font-size:10px; letter-spacing:0.12em; color:#8A7A60; text-decoration:none; transition:color 0.3s; border-bottom:1px solid #DDD5C0; padding-bottom:3px; }
        .soc-lnk:hover { color:#8B6914; border-bottom-color:#8B6914; }

        /* ── DIVIDERS ── */
        .gold-rule { width:60px; height:2px; background:#C9A84C; margin-bottom:24px; }
        .thin-rule { width:100%; height:1px; background:#DDD5C0; }

        /* ── MOBILE ── */
        @media (max-width: 768px) {
          .u-nav { padding:16px 20px !important; }
          .nav-links { display:none !important; }
          .hamburger { display:flex !important; }
          .hero-pad { padding:0 20px 64px !important; }
          .hero-h1 { font-size:clamp(52px,14vw,72px) !important; }
          .hero-cta { flex-direction:column !important; gap:20px !important; }
          .hero-p { max-width:100% !important; font-size:17px !important; }
          .sec-pad { padding:72px 20px !important; }
          .about-grid { grid-template-columns:1fr !important; gap:44px !important; }
          .work-grid { grid-template-columns:1fr !important; }
          .work-card { padding:28px 20px !important; }
          .svc-grid { grid-template-columns:1fr !important; }
          .svc-card { padding:36px 24px !important; }
          .contact-grid { grid-template-columns:1fr !important; gap:40px !important; }
          .contact-h { font-size:40px !important; }
          .footer-row { flex-direction:column !important; gap:14px !important; text-align:center; }
          .f-dots { display:none !important; }
          .cta-btn { width:100% !important; padding:14px 24px !important; font-size:10px !important; }
          .sec-h2 { font-size:40px !important; }
          .corner-dec { display:none !important; }
          .stat-grid { gap:16px !important; }
        }
        @media (max-width: 480px) {
          .hero-h1 { font-size:clamp(44px,12vw,56px) !important; }
          .sec-h2 { font-size:34px !important; }
          .contact-h { font-size:34px !important; }
        }
      `}</style>

      {/* MOBILE MENU */}
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        <button onClick={() => setMenuOpen(false)} style={{ position:"absolute",top:20,right:20,background:"none",border:"none",fontSize:26,cursor:"pointer",color:"#1A1208" }}>✕</button>
        {["Work","About","Services","Contact"].map(n => (
          <button key={n} className="mob-btn" onClick={() => scrollTo(n.toLowerCase())}>{n}</button>
        ))}
        <a href="https://www.youtube.com/@urielmaforikan" target="_blank" rel="noreferrer" style={{ fontFamily:"'Space Mono',monospace",fontSize:11,letterSpacing:"0.12em",color:"#F5F0E8",background:"#1A1208",padding:"10px 24px",textDecoration:"none" }}>YOUTUBE</a>
      </div>

      {/* NAV */}
      <nav className={`u-nav${scrolled ? " scrolled" : ""}`} style={{ padding:"20px 52px" }}>
        <div onClick={() => scrollTo("hero")} style={{ cursor:"pointer",display:"flex",alignItems:"center",gap:12 }}>
          <Image src="/logo.png" alt="Uriel Logo" width={28} height={28} style={{ objectFit:"contain" }} />
          <div>
            <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:19,fontWeight:600,letterSpacing:"0.06em",color:"#1A1208",lineHeight:1 }}>URIEL</div>
            <div style={{ fontFamily:"'Space Mono',monospace",fontSize:7,letterSpacing:"0.28em",color:"#C9A84C",marginTop:1 }}>MAFORIKAN</div>
          </div>
        </div>
        <div className="nav-links">
          {["Work","About","Services","Contact"].map(n => (
            <button key={n} className="nav-btn" onClick={() => scrollTo(n.toLowerCase())}>{n}</button>
          ))}
          <a href="https://www.youtube.com/@urielmaforikan" target="_blank" rel="noreferrer" className="nav-yt">YOUTUBE</a>
        </div>
        <button className="hamburger" onClick={() => setMenuOpen(true)}><span/><span/><span/></button>
      </nav>

      {/* ── HERO ── */}
      <section id="hero" className="hero-pad" style={{ minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:"0 52px 88px",position:"relative",overflow:"hidden",background:"#F5F0E8" }}>
        {/* Textured background grain */}
        <div style={{ position:"absolute",inset:0,backgroundImage:"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",pointerEvents:"none" }} />

        {/* Large ghost name behind content */}
        <div style={{ position:"absolute",top:"46%",right:-20,transform:"translateY(-50%)",fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(100px,16vw,220px)",fontWeight:600,color:"transparent",WebkitTextStroke:"1.5px #C9A84C18",letterSpacing:"-0.02em",pointerEvents:"none",userSelect:"none",lineHeight:1 }}>URIEL</div>

        {/* Gold corner marks */}
        <div className="corner-dec">
          <div style={{ position:"absolute",top:88,left:52,width:44,height:2,background:"#C9A84C" }} />
          <div style={{ position:"absolute",top:88,left:52,width:2,height:44,background:"#C9A84C" }} />
          <div style={{ position:"absolute",top:88,right:52,width:44,height:2,background:"#C9A84C" }} />
          <div style={{ position:"absolute",top:88,right:52,width:2,height:44,background:"#C9A84C" }} />
        </div>

        {/* Photo strip — top right, fills corner */}
        <div style={{ position:"absolute",top:0,right:0,width:"38%",height:"70%",overflow:"hidden" }}>
          <Image src="/uriel-native.jpg" alt="Uriel Maforikan" fill style={{ objectFit:"cover",objectPosition:"center top" }} />
          <div style={{ position:"absolute",inset:0,background:"linear-gradient(to bottom, transparent 50%, #F5F0E8 100%), linear-gradient(to left, transparent 60%, #F5F0E8 100%)" }} />
        </div>

        <div style={{ position:"relative",zIndex:2,animation:"fadeUp 0.9s ease forwards" }}>
          <div style={{ fontFamily:"'Space Mono',monospace",fontSize:10,letterSpacing:"0.28em",color:"#C9A84C",marginBottom:22,fontWeight:700 }}>
            VISUAL STORYTELLER / BRAND DESIGNER / FILMMAKER
          </div>
          <h1 className="hero-h1" style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(60px,9vw,122px)",fontWeight:600,lineHeight:0.9,letterSpacing:"-0.02em",color:"#1A1208",marginBottom:40 }}>
            <span style={{ display:"block" }}>Uriel</span>
            <span style={{ display:"block",fontStyle:"italic",color:"#8B6914" }}>Maforikan</span>
          </h1>
          <div className="hero-cta" style={{ display:"flex",alignItems:"center",gap:44,flexWrap:"wrap" }}>
            <p className="hero-p" style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:20,fontWeight:300,color:"#6B5B3E",maxWidth:400,lineHeight:1.65,fontStyle:"italic" }}>
              Telling stories through light, frame, and form. Turning brands into worlds people want to live in.
            </p>
            <button className="cta-btn" onClick={() => scrollTo("work")} style={{ padding:"15px 40px" }}>SEE THE WORK</button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position:"absolute",bottom:36,left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:8 }}>
          <div style={{ width:1.5,height:52,background:"linear-gradient(to bottom, transparent, #C9A84C)" }} />
          <div style={{ fontFamily:"'Space Mono',monospace",fontSize:8,letterSpacing:"0.22em",color:"#B0A48A" }}>SCROLL</div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div style={{ background:"#1A1208",padding:"14px 0",overflow:"hidden" }}>
        <div className="ticker-track">
          {Array(3).fill(TICKER_ITEMS).flat().map((t, i) => (
            <span key={i} style={{ fontFamily:"'Space Mono',monospace",fontSize:10,letterSpacing:"0.22em",color:"#C9A84C",fontWeight:700,marginRight:56 }}>{t}&nbsp;&nbsp;◆</span>
          ))}
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section id="about" className="sec-pad" style={{ padding:"108px 52px",background:"#F5F0E8" }}>
        <div className="about-grid">
          <AnimBlock>
            <div style={{ position:"relative",maxWidth:460 }}>
              <div style={{ width:"100%",aspectRatio:"3/4",position:"relative",overflow:"hidden" }}>
                <Image src="/uriel-studio.jpg" alt="Uriel Maforikan" fill style={{ objectFit:"cover",objectPosition:"center top" }} />
                {/* Cinematic letterbox */}
                <div style={{ position:"absolute",top:0,left:0,right:0,height:28,background:"#F5F0E8" }} />
                <div style={{ position:"absolute",bottom:0,left:0,right:0,height:28,background:"#F5F0E8" }} />
              </div>
              {/* Bold corner frames */}
              <div style={{ position:"absolute",top:-16,left:-16,width:36,height:36,borderTop:"3px solid #C9A84C",borderLeft:"3px solid #C9A84C" }} />
              <div style={{ position:"absolute",bottom:-16,right:-16,width:36,height:36,borderBottom:"3px solid #C9A84C",borderRight:"3px solid #C9A84C" }} />
              <div style={{ marginTop:12,display:"flex",justifyContent:"space-between" }}>
                <span style={{ fontFamily:"'Space Mono',monospace",fontSize:8,letterSpacing:"0.12em",color:"#B0A48A" }}>© YOLO IMAGERY</span>
                <span style={{ fontFamily:"'Space Mono',monospace",fontSize:8,letterSpacing:"0.12em",color:"#8B6914",fontWeight:700 }}>LAGOS, NG</span>
              </div>
            </div>
          </AnimBlock>

          <AnimBlock delay={0.2}>
            <div className="gold-rule" />
            <div style={{ fontFamily:"'Space Mono',monospace",fontSize:9,letterSpacing:"0.3em",color:"#C9A84C",marginBottom:20,fontWeight:700 }}>ABOUT</div>
            <h2 className="sec-h2" style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:52,fontWeight:600,lineHeight:1.05,marginBottom:32,color:"#1A1208" }}>
              Framing the world<br /><em style={{ color:"#8B6914",fontWeight:400 }}>differently.</em>
            </h2>
            <p style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:20,fontWeight:300,color:"#5A4A30",lineHeight:1.85,marginBottom:20,fontStyle:"italic" }}>
              Uriel Maforikan is a visual storyteller and brand designer based in Nigeria — creating work that bridges the emotional and the aesthetic.
            </p>
            <p style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:300,color:"#8A7A60",lineHeight:1.8,marginBottom:52 }}>
              With an eye trained on cinema and a heart for human story, he brings a rare combination of technical precision and cultural depth to every creative engagement.
            </p>
            <div className="stat-grid" style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:24 }}>
              {[["50+","PROJECTS"],["3+","YEARS"],["∞","STORIES"]].map(([n,l]) => (
                <div key={l} style={{ borderLeft:"2px solid #C9A84C",paddingLeft:16 }}>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:44,fontWeight:600,color:"#1A1208",lineHeight:1 }}>{n}</div>
                  <div style={{ fontFamily:"'Space Mono',monospace",fontSize:8,letterSpacing:"0.15em",color:"#B0A48A",marginTop:5 }}>{l}</div>
                </div>
              ))}
            </div>
          </AnimBlock>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div style={{ height:1,background:"#DDD5C0",margin:"0 52px" }} />

      {/* ── WORK ── */}
      <section id="work" className="sec-pad" style={{ padding:"108px 52px",background:"#F5F0E8" }}>
        <AnimBlock>
          <div style={{ display:"flex",flexWrap:"wrap",justifyContent:"space-between",alignItems:"flex-end",gap:20,marginBottom:64 }}>
            <div>
              <div className="gold-rule" />
              <div style={{ fontFamily:"'Space Mono',monospace",fontSize:9,letterSpacing:"0.3em",color:"#C9A84C",marginBottom:16,fontWeight:700 }}>SELECTED WORK</div>
              <h2 className="sec-h2" style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:60,fontWeight:600,lineHeight:0.92,color:"#1A1208" }}>
                The<br /><em style={{ color:"#8B6914",fontWeight:400 }}>Archive.</em>
              </h2>
            </div>
            <a href="https://www.youtube.com/@urielmaforikan" target="_blank" rel="noreferrer" className="soc-lnk">VIEW FULL CHANNEL →</a>
          </div>
        </AnimBlock>
        <div className="work-grid">
          {WORKS.map((w, i) => (
            <AnimBlock key={w.id} delay={i * 0.07}>
              <div className="work-card">
                <div className="c-top" />
                <div style={{ fontFamily:"'Space Mono',monospace",fontSize:8,letterSpacing:"0.22em",color:"#B0A48A",marginBottom:32 }}>{String(i+1).padStart(2,"0")} / {w.year}</div>
                <h3 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:26,fontWeight:600,marginBottom:12,lineHeight:1.15,color:"#1A1208" }}>{w.title}</h3>
                <div style={{ fontFamily:"'Space Mono',monospace",fontSize:8,letterSpacing:"0.15em",color:w.color,fontWeight:700 }}>{w.category}</div>
                <div className="c-arrow">→</div>
              </div>
            </AnimBlock>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" style={{ background:"#EDE5D4" }}>
        <div className="sec-pad" style={{ padding:"108px 52px" }}>
          <AnimBlock>
            <div style={{ marginBottom:64 }}>
              <div className="gold-rule" />
              <div style={{ fontFamily:"'Space Mono',monospace",fontSize:9,letterSpacing:"0.3em",color:"#C9A84C",marginBottom:16,fontWeight:700 }}>WHAT I DO</div>
              <h2 className="sec-h2" style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:60,fontWeight:600,color:"#1A1208" }}>
                Creative <em style={{ color:"#8B6914",fontWeight:400 }}>Services.</em>
              </h2>
            </div>
          </AnimBlock>
          <div className="svc-grid">
            {SERVICES.map((s, i) => (
              <AnimBlock key={s.title} delay={i * 0.1}>
                <div className="svc-card">
                  <div style={{ fontSize:30,color:"#C9A84C",marginBottom:22 }}>{s.icon}</div>
                  <h3 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:30,fontWeight:600,marginBottom:16,color:"#1A1208" }}>{s.title}</h3>
                  <p style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:300,color:"#6B5B3E",lineHeight:1.75,fontStyle:"italic" }}>{s.desc}</p>
                </div>
              </AnimBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ── FILM STRIP ── */}
      <section style={{ background:"#1A1208",padding:"80px 0",overflow:"hidden" }}>
        <AnimBlock>
          <div style={{ padding:"0 52px",marginBottom:40 }}>
            <div style={{ fontFamily:"'Space Mono',monospace",fontSize:9,letterSpacing:"0.3em",color:"#C9A84C",marginBottom:12,fontWeight:700 }}>FEATURED PROJECT</div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:44,fontWeight:600,color:"#F5F0E8" }}>
              Mr. Perfect <em style={{ color:"#C9A84C",fontWeight:400 }}>Series</em>
            </h2>
          </div>
        </AnimBlock>
        <div style={{ background:"#0D0B07",padding:"18px 0",position:"relative" }}>
          <div style={{ position:"absolute",inset:0,backgroundImage:"repeating-linear-gradient(90deg,transparent,transparent 56px,#1A1208 56px,#1A1208 64px)",pointerEvents:"none",zIndex:2 }} />
          <div style={{ display:"flex",gap:8,padding:"0 44px",overflowX:"auto",scrollbarWidth:"none" }}>
            {[["SERIES","MR. PERFECT"],["SCENE","E9.S9"],["TAKE","◆"],["DATE","14-12-2024"],["DIRECTOR","UMA"],["SOUND","✓"]].map(([label,val],i) => (
              <div key={i} style={{ background:"#1A1208",border:"1px solid #2E2616",padding:"22px 22px",minWidth:130,flexShrink:0 }}>
                <div style={{ fontFamily:"'Space Mono',monospace",fontSize:8,letterSpacing:"0.15em",color:"#5A4A30",marginBottom:8 }}>{label}</div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:15,color:i >= 4 ? "#C9A84C" : "#F5F0E8" }}>{val}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Portrait triptych */}
        <div style={{ display:"flex",gap:2,height:200,overflow:"hidden",marginTop:2 }}>
          {["/uriel-film.jpg","/uriel-studio.jpg","/uriel-native.jpg"].map((src,i) => (
            <div key={i} style={{ flex:1,position:"relative",overflow:"hidden" }}>
              <Image src={src} alt="Uriel" fill style={{ objectFit:"cover",objectPosition:"center top",filter:"sepia(20%) contrast(1.05)" }} />
              <div style={{ position:"absolute",inset:0,background:"rgba(26,18,8,0.3)" }} />
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="sec-pad" style={{ padding:"108px 52px",background:"#F5F0E8" }}>
        <div className="contact-grid">
          <AnimBlock>
            <div className="gold-rule" />
            <div style={{ fontFamily:"'Space Mono',monospace",fontSize:9,letterSpacing:"0.3em",color:"#C9A84C",marginBottom:20,fontWeight:700 }}>GET IN TOUCH</div>
            <h2 className="contact-h" style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:56,fontWeight:600,lineHeight:1,marginBottom:32,color:"#1A1208" }}>
              Let&apos;s make<br />something<br /><em style={{ color:"#8B6914",fontWeight:400 }}>great.</em>
            </h2>
            <p style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:19,fontWeight:300,color:"#6B5B3E",lineHeight:1.75,fontStyle:"italic",marginBottom:44 }}>
              Whether it&apos;s a brand, a film, or a story waiting to be told, I&apos;m open to conversations that lead somewhere remarkable.
            </p>
            <div style={{ display:"flex",flexDirection:"column",gap:16 }}>
              <a href="https://www.youtube.com/@urielmaforikan" target="_blank" rel="noreferrer" className="soc-lnk">YOUTUBE @URIELMAFORIKAN →</a>
              <a href="https://www.notion.so/Hi-I-m-Uriel-Maforikan-3e9d350fe4e8432f9c14ed0b45d56255" target="_blank" rel="noreferrer" className="soc-lnk">PORTFOLIO NOTION →</a>
            </div>
          </AnimBlock>

          <AnimBlock delay={0.2}>
            {!sent ? (
              <div style={{ paddingTop:36 }}>
                {[{label:"YOUR NAME",key:"name",ph:"Full name",ta:false},{label:"EMAIL ADDRESS",key:"email",ph:"your@email.com",ta:false},{label:"YOUR MESSAGE",key:"message",ph:"Tell me about your project...",ta:true}].map(({label,key,ph,ta}) => (
                  <div key={key} style={{ marginBottom:28 }}>
                    <label style={{ fontFamily:"'Space Mono',monospace",fontSize:8,letterSpacing:"0.22em",color:"#B0A48A",display:"block",marginBottom:7,fontWeight:700 }}>{label}</label>
                    {ta
                      ? <textarea className="u-ta" placeholder={ph} value={formData[key as keyof typeof formData]} onChange={e => setFormData({...formData,[key]:e.target.value})} />
                      : <input className="u-inp" placeholder={ph} value={formData[key as keyof typeof formData]} onChange={e => setFormData({...formData,[key]:e.target.value})} />
                    }
                  </div>
                ))}
                <button className="cta-btn gold" onClick={() => { if(formData.name && formData.email) setSent(true); }} style={{ padding:"16px 0",width:"100%",marginTop:10 }}>SEND MESSAGE</button>
              </div>
            ) : (
              <div style={{ textAlign:"center",paddingTop:72 }}>
                <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:72,color:"#C9A84C",marginBottom:20 }}>◈</div>
                <h3 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:34,fontWeight:600,marginBottom:12,color:"#1A1208" }}>Message received.</h3>
                <p style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:17,fontStyle:"italic",color:"#8A7A60" }}>Uriel will be in touch soon.</p>
              </div>
            )}
          </AnimBlock>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ padding:"28px 52px",borderTop:"1px solid #DDD5C0",background:"#EDE5D4" }}>
        <div className="footer-row">
          <div style={{ display:"flex",alignItems:"center",gap:10 }}>
            <Image src="/logo.png" alt="Logo" width={22} height={22} style={{ objectFit:"contain" }} />
            <div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:15,fontWeight:700,letterSpacing:"0.06em",color:"#1A1208" }}>URIEL MAFORIKAN</div>
              <div style={{ fontFamily:"'Space Mono',monospace",fontSize:7,letterSpacing:"0.2em",color:"#B0A48A",marginTop:2 }}>VISUAL STORYTELLER & BRAND DESIGNER</div>
            </div>
          </div>
          <div style={{ fontFamily:"'Space Mono',monospace",fontSize:9,letterSpacing:"0.08em",color:"#B0A48A" }}>© 2026 URIEL MAFORIKAN. ALL RIGHTS RESERVED.</div>
          <div className="f-dots" style={{ display:"flex",gap:5,alignItems:"center" }}>
            {[1,2,3].map(i => <div key={i} style={{ width:5,height:5,background:i===2?"#C9A84C":"#C8BFA8",borderRadius:"50%" }} />)}
          </div>
        </div>
      </footer>
    </main>
  );
}
