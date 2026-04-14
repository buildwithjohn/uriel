"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useInView as useInViewFM,
  AnimatePresence,
  useSpring,
  useMotionValue,
} from "framer-motion";

/* ─── DATA ─── */
const WORKS = [
  { id: 1, title: "StarHaven", category: "Brand Identity", year: "2024", img: "/starhaven_gradient.jpg", body: "A timeless, aesthetic identity that connects with the target audience." },
  { id: 2, title: "MadamCook", category: "Brand Identity", year: "2024", img: "/Madamcook_tshirt_icon_-_logo.png", body: "Celebrating Nigerian cuisine — premium identity for a culinary brand." },
  { id: 3, title: "BiStantly", category: "Brand Identity", year: "2026", img: "/Asset_64xg.png", body: "On-demand logistics — bold icon, custom typography, orange palette." },
  { id: 4, title: "Angelic Choral", category: "Logo Design", year: "2023", img: "/Angelic_Choral_-_4.jpg", body: "A unique mark telling the story of faith and music." },
  { id: 5, title: "AdeolaSarah", category: "Brand Identity", year: "2024", img: "/AdeolaSarah_logo_1.jpg", body: "Clean, modern identity designed to attract and convert." },
  { id: 6, title: "KB Threads", category: "Fashion Brand", year: "2023", img: "/KB-Threads.jpg", body: "Fashion brand identity — sharp, contemporary, distinctive." },
];

const EXTRAS = [
  { title: "SBS", category: "Logo Design", img: "/SBS.jpg" },
  { title: "Aunty Lara", category: "Logo Design", img: "/aunty_lara_logo_0.jpg" },
  { title: "FLC", category: "Logo Design", img: "/FLC_-_3.jpg" },
  { title: "Instagram Post", category: "Social Media", img: "/Instagram_post_-_3.png" },
  { title: "Brand Asset", category: "Brand Asset", img: "/Asset_14xg.png" },
  { title: "Brand Asset II", category: "Brand Asset", img: "/Asset_24xg.png" },
];

const SERVICES = [
  { num: "I",   title: "Brand Identity Design", body: "I combine design skills and market research to create the best identity for companies and startups — appealing, functional, and built to attract sales." },
  { num: "II",  title: "Logo Design", body: "Minimalist, timeless marks that connect with your target audience. Every logo tells a unique story and leaves a lasting impression." },
  { num: "III", title: "Marketing & Print Design", body: "Flyers, posters, and media kits designed with strategy and aesthetic intent — crafted to drive real results for brands that know attention must be earned." },
  { num: "IV",  title: "Social Media Visuals", body: "Scroll-stopping content that maintains brand consistency across every platform. Proven to improve engagement, recall, and brand perception." },
  { num: "V",   title: "Presentation Decks", body: "Clean, aesthetic, functional decks trusted by Cybernalytix, August Secrets, and others — making funding processes easy and ideas impossible to ignore." },
];

const NAV_LINKS = ["Work", "About", "Services", "Contact"];

/* ─── ANIMATION VARIANTS ─── */


const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

/* ─── REVEAL WRAPPER ─── */
function Reveal({ children, delay = 0, y = 40, className = "" }: {
  children: React.ReactNode; delay?: number; y?: number; className?: string;
}) {
  const ref = useRef(null);
  const inView = useInViewFM(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

/* ─── MAGNETIC BUTTON ─── */
function MagneticBtn({ children, className, onClick, href, target }: {
  children: React.ReactNode; className?: string; onClick?: () => void; href?: string; target?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.28);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.28);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  const inner = (
    <motion.div ref={ref} style={{ x: sx, y: sy, display: "inline-block" }}
      onMouseMove={onMove} onMouseLeave={onLeave}>
      {href
        ? <a href={href} target={target} rel="noreferrer" className={className} style={{ textDecoration: "none" }}>{children}</a>
        : <button className={className} onClick={onClick}>{children}</button>
      }
    </motion.div>
  );
  return inner;
}

/* ─── MAIN ─── */
export default function VBUSite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [activeService, setActiveService] = useState<number | null>(null);

  const heroRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(heroProgress, [0, 0.7], [1, 0]);

  const nav = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <main style={{ fontFamily: "'Jost','Helvetica Neue',sans-serif", background: "#F0EBE1", color: "#2C1F0E", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,200;0,300;0,400;0,500;1,300&family=Italiana&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        ::-webkit-scrollbar{width:2px}
        ::-webkit-scrollbar-thumb{background:#B8976A}
        ::selection{background:#D4B896;color:#2C1F0E}
        @keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @keyframes spinSlow{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}

        /* ── STATIC NAV (always visible, always white) ── */
        .vbu-nav{
          position:fixed;top:0;left:0;right:0;z-index:300;
          background:rgba(244,239,230,0.97);
          backdrop-filter:blur(16px);
          border-bottom:1px solid #DDD5C4;
          padding:0 60px;
          height:68px;
          display:flex;align-items:center;justify-content:space-between;
        }
        .brand{cursor:pointer;display:flex;flex-direction:column}
        .brand-name{font-family:'Italiana',serif;font-size:19px;color:#2C1F0E;letter-spacing:0.04em;line-height:1}
        .brand-sub{font-family:'Jost',sans-serif;font-size:7px;letter-spacing:0.36em;color:#B8976A;text-transform:uppercase;margin-top:2px}
        .nav-links{display:flex;gap:40px;align-items:center}
        .nl{font-family:'Jost',sans-serif;font-size:10.5px;letter-spacing:0.16em;color:#7A6650;text-transform:uppercase;background:none;border:none;cursor:pointer;transition:color 0.3s;padding:0}
        .nl:hover{color:#2C1F0E}
        .nl-hire{font-family:'Jost',sans-serif;font-size:10px;letter-spacing:0.18em;background:#2C1F0E;color:#F0EBE1;border:none;padding:10px 24px;cursor:pointer;transition:background 0.35s;text-decoration:none;display:inline-block;text-transform:uppercase}
        .nl-hire:hover{background:#8B6440}
        .burger{display:none;flex-direction:column;gap:5px;cursor:pointer;background:none;border:none}
        .burger span{display:block;width:22px;height:1px;background:#2C1F0E;transition:all 0.3s}

        /* ── HERO ── */
        .hero{height:100vh;position:relative;overflow:hidden;display:flex;align-items:flex-end;margin-top:68px}
        .hero-veil{position:absolute;inset:0;background:linear-gradient(to top,rgba(20,12,4,0.82) 0%,rgba(20,12,4,0.22) 55%,transparent 100%);z-index:1}
        .hero-content{position:relative;z-index:2;padding:0 60px 80px;width:100%}
        .hero-eyebrow{font-family:'Jost',sans-serif;font-size:10px;letter-spacing:0.36em;color:#D4B896;text-transform:uppercase;margin-bottom:18px}
        .hero-h1{font-family:'Italiana',serif;font-size:clamp(60px,8vw,114px);color:#F0EBE1;line-height:0.88;letter-spacing:0.01em;margin-bottom:10px}
        .hero-h1 em{font-style:italic;color:#D4B896}
        .hero-brand{font-family:'Italiana',serif;font-size:clamp(20px,2.8vw,34px);color:#D4B896;font-style:italic;letter-spacing:0.04em;margin-bottom:24px}
        .hero-tagline{font-family:'Cormorant Garamond',serif;font-size:clamp(15px,1.5vw,19px);color:rgba(240,235,225,0.72);font-style:italic;font-weight:300;max-width:480px;line-height:1.75;margin-bottom:44px}
        .btn-ghost{font-family:'Jost',sans-serif;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#F0EBE1;border:1px solid rgba(240,235,225,0.5);padding:13px 34px;background:transparent;cursor:pointer;transition:all 0.4s}
        .btn-ghost:hover{border-color:#F0EBE1;background:rgba(240,235,225,0.08)}
        .btn-gold{font-family:'Jost',sans-serif;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#2C1F0E;background:#D4B896;border:1px solid #D4B896;padding:13px 34px;cursor:pointer;transition:all 0.4s;text-decoration:none;display:inline-block}
        .btn-gold:hover{background:#C9A87A;border-color:#C9A87A}

        /* spinning badge */
        .badge-ring{position:absolute;right:64px;top:50%;transform:translateY(-50%);z-index:2;width:110px;height:110px;animation:spinSlow 20s linear infinite}

        /* scroll indicator */
        .scroll-hint{position:absolute;bottom:32px;left:60px;display:flex;flex-direction:column;align-items:center;gap:8px;z-index:2}
        .scroll-line{width:1px;height:52px;background:linear-gradient(to bottom,rgba(212,184,150,0.8),transparent)}
        .scroll-txt{font-family:'Jost',sans-serif;font-size:8px;letter-spacing:0.24em;color:rgba(212,184,150,0.65);text-transform:uppercase;writing-mode:vertical-rl}

        /* ── TICKER ── */
        .ticker{background:#2C1F0E;padding:12px 0;overflow:hidden}
        .ticker-t{display:flex;animation:ticker 26s linear infinite;white-space:nowrap}
        .ti{font-family:'Jost',sans-serif;font-size:9px;letter-spacing:0.26em;color:#B8976A;text-transform:uppercase;margin-right:56px}

        /* ── SECTION LABEL ── */
        .sl{font-family:'Jost',sans-serif;font-size:9px;letter-spacing:0.36em;color:#B8976A;text-transform:uppercase;display:flex;align-items:center;gap:14px;margin-bottom:24px}
        .sl::before{content:'';width:28px;height:1px;background:#B8976A;flex-shrink:0}

        /* ── ABOUT ── */
        .about-wrap{display:grid;grid-template-columns:1fr 1fr;min-height:90vh}
        .about-photo{position:relative;overflow:hidden}
        .about-photo img{object-fit:cover;object-position:center top;transition:transform 1s cubic-bezier(.22,1,.36,1)}
        .about-photo:hover img{transform:scale(1.05)}
        .about-cap{position:absolute;bottom:24px;left:24px;font-family:'Jost',sans-serif;font-size:8px;letter-spacing:0.18em;color:rgba(240,235,225,0.5);text-transform:uppercase}
        .about-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(20,12,4,0.3),transparent 60%)}
        .about-text{padding:80px 72px;display:flex;flex-direction:column;justify-content:center;background:#F0EBE1}
        .about-h{font-family:'Italiana',serif;font-size:clamp(40px,4vw,62px);color:#2C1F0E;line-height:1.02;margin-bottom:8px}
        .about-h em{font-style:italic;color:#8B6440}
        .about-role{font-family:'Jost',sans-serif;font-size:10px;letter-spacing:0.26em;color:#B8976A;text-transform:uppercase;margin-bottom:30px}
        .about-body{font-family:'Cormorant Garamond',serif;font-size:19px;font-weight:300;color:#6B5438;line-height:1.9;font-style:italic;margin-bottom:14px}
        .about-body2{font-family:'Jost',sans-serif;font-size:13px;font-weight:300;color:#9A8470;line-height:1.9;letter-spacing:0.02em;margin-bottom:14px}
        .about-hl{border-left:2px solid #B8976A;padding:14px 20px;margin:22px 0;background:#EDE5D6}
        .about-hl p{font-family:'Jost',sans-serif;font-size:12px;font-weight:300;color:#5A4028;line-height:1.85;letter-spacing:0.02em}
        .skills{display:flex;flex-wrap:wrap;gap:7px;margin:22px 0 32px}
        .skill{font-family:'Jost',sans-serif;font-size:9px;letter-spacing:0.14em;text-transform:uppercase;color:#8B6440;border:1px solid #D4B896;padding:5px 12px;transition:all 0.3s}
        .skill:hover{background:#2C1F0E;color:#D4B896;border-color:#2C1F0E}
        .stats-row{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid #D9CEBC;padding-top:32px}
        .stat{padding-right:24px;border-right:1px solid #D9CEBC}
        .stat:last-child{border-right:none;padding-right:0;padding-left:24px}
        .stat:nth-child(2){padding-left:24px}
        .stat-n{font-family:'Italiana',serif;font-size:50px;color:#2C1F0E;line-height:1}
        .stat-l{font-family:'Jost',sans-serif;font-size:8px;letter-spacing:0.22em;color:#B8976A;text-transform:uppercase;margin-top:5px}
        .cta-row{display:flex;gap:12px;flex-wrap:wrap;margin-top:32px}
        .btn-dark{font-family:'Jost',sans-serif;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#F0EBE1;background:#2C1F0E;border:1px solid #2C1F0E;padding:12px 28px;cursor:pointer;transition:all 0.35s;text-decoration:none;display:inline-block}
        .btn-dark:hover{background:#8B6440;border-color:#8B6440}
        .btn-outline{font-family:'Jost',sans-serif;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#2C1F0E;background:transparent;border:1px solid #2C1F0E;padding:12px 28px;cursor:pointer;transition:all 0.35s;text-decoration:none;display:inline-block}
        .btn-outline:hover{background:#2C1F0E;color:#F0EBE1}

        /* ── CIRCLE MOTIF ── */
        .circle-section{padding:96px 60px;background:#E8DFD0;position:relative;overflow:hidden}
        .circle-deco{position:absolute;border-radius:50%;border:1px solid rgba(184,151,106,0.22);pointer-events:none}
        .cq{font-family:'Cormorant Garamond',serif;font-size:clamp(22px,3vw,36px);font-style:italic;font-weight:300;color:#4A3520;line-height:1.6;max-width:620px}
        .cm{width:80px;height:80px;border-radius:50%;border:1px solid #B8976A;display:flex;align-items:center;justify-content:center;flex-shrink:0}
        .cm-i{width:56px;height:56px;border-radius:50%;background:#B8976A;display:flex;align-items:center;justify-content:center}

        /* ── WORK ── */
        .work-section{padding:96px 60px;background:#F0EBE1}
        .work-h{font-family:'Italiana',serif;font-size:clamp(40px,5vw,72px);color:#2C1F0E;line-height:0.92}
        .work-h em{font-style:italic;color:#8B6440}
        .work-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px}
        .wc{position:relative;aspect-ratio:4/5;overflow:hidden;cursor:pointer}
        .wc-img{position:absolute;inset:0;transition:transform 0.85s cubic-bezier(.22,1,.36,1)}
        .wc-img img{object-fit:cover;object-position:center}
        .wc:hover .wc-img{transform:scale(1.07)}
        .wc-veil{position:absolute;inset:0;background:linear-gradient(to top,rgba(20,12,4,0.8) 0%,transparent 55%)}
        .wc-body{position:absolute;bottom:0;left:0;right:0;padding:26px;z-index:2}
        .wc-n{font-family:'Jost',sans-serif;font-size:9px;letter-spacing:0.24em;color:rgba(212,184,150,0.65);margin-bottom:7px}
        .wc-t{font-family:'Italiana',serif;font-size:23px;color:#F0EBE1;line-height:1.1;margin-bottom:3px}
        .wc-c{font-family:'Jost',sans-serif;font-size:8.5px;letter-spacing:0.18em;color:#D4B896;text-transform:uppercase}
        .wc-b{font-family:'Jost',sans-serif;font-size:11px;font-weight:300;color:rgba(240,235,225,0.65);line-height:1.6;margin-top:6px;letter-spacing:0.01em}
        .tile-1{background:linear-gradient(135deg,#C4A882,#A08060)}
        .tile-2{background:linear-gradient(135deg,#8B9A78,#6B7A58)}
        .tile-3{background:linear-gradient(135deg,#B89878,#907858)}
        .tile-4{background:linear-gradient(135deg,#9AA888,#7A8868)}
        .tile-5{background:linear-gradient(135deg,#C8A888,#A88868)}
        .tile-6{background:linear-gradient(135deg,#88A090,#687870)}
        .more-label{font-family:'Jost',sans-serif;font-size:9px;letter-spacing:0.32em;color:#B8976A;text-transform:uppercase;margin:60px 0 18px;display:flex;align-items:center;gap:14px}
        .more-label::before{content:'';width:24px;height:1px;background:#B8976A}
        .ex-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px}
        .ex-card{position:relative;aspect-ratio:1/1;overflow:hidden;background:#D9CEBC;cursor:pointer}
        .ex-card img{object-fit:cover;object-position:center;transition:transform 0.75s ease}
        .ex-card:hover img{transform:scale(1.08)}
        .ex-info{position:absolute;bottom:0;left:0;right:0;padding:14px 16px;background:linear-gradient(to top,rgba(20,12,4,0.75),transparent);opacity:0;transition:opacity 0.35s}
        .ex-card:hover .ex-info{opacity:1}
        .ex-t{font-family:'Italiana',serif;font-size:17px;color:#F0EBE1}
        .ex-c{font-family:'Jost',sans-serif;font-size:8px;letter-spacing:0.16em;color:#D4B896;text-transform:uppercase;margin-top:2px}

        /* ── SERVICES ── */
        .svc-section{background:#2C1F0E;padding:96px 60px}
        .svc-h{font-family:'Italiana',serif;font-size:clamp(40px,5vw,68px);color:#F0EBE1;margin-bottom:64px;line-height:0.95}
        .svc-h em{font-style:italic;color:#D4B896}
        .svc-list{border-top:1px solid rgba(184,151,106,0.18)}
        .svc-row{display:grid;grid-template-columns:72px 1fr 1fr;gap:36px;padding:40px 0;border-bottom:1px solid rgba(184,151,106,0.12);align-items:center;cursor:default;transition:background 0.3s,padding-left 0.35s}
        .svc-row:hover{background:rgba(184,151,106,0.04);padding-left:10px}
        .svc-num{font-family:'Italiana',serif;font-size:36px;color:#B8976A;opacity:0.55;line-height:1}
        .svc-title{font-family:'Italiana',serif;font-size:clamp(22px,2.2vw,30px);color:#F0EBE1}
        .svc-body{font-family:'Jost',sans-serif;font-size:13px;font-weight:300;color:#9A8470;line-height:1.9;letter-spacing:0.02em}

        /* ── FEATURED ── */
        .feat-section{background:#E8DFD0}
        .feat-full{width:100%;aspect-ratio:21/9;position:relative;overflow:hidden}
        .feat-full img{object-fit:cover;object-position:center 30%;filter:brightness(0.8) sepia(0.08)}
        .feat-overlay{position:absolute;inset:0;background:linear-gradient(to right,rgba(20,12,4,0.72) 0%,transparent 62%);display:flex;align-items:center}
        .feat-text{padding:60px}
        .feat-ey{font-family:'Jost',sans-serif;font-size:9px;letter-spacing:0.35em;color:#D4B896;text-transform:uppercase;margin-bottom:18px}
        .feat-h{font-family:'Italiana',serif;font-size:clamp(38px,5vw,66px);color:#F0EBE1;line-height:0.92;margin-bottom:10px}
        .feat-h em{font-style:italic;color:#D4B896}
        .feat-desc{font-family:'Cormorant Garamond',serif;font-size:16px;font-style:italic;color:rgba(240,235,225,0.68);max-width:340px;line-height:1.75;margin-bottom:28px}
        .feat-meta{display:flex;gap:28px;flex-wrap:wrap}
        .fm-l{font-family:'Jost',sans-serif;font-size:8px;letter-spacing:0.24em;color:rgba(212,184,150,0.55);text-transform:uppercase;margin-bottom:4px}
        .fm-v{font-family:'Cormorant Garamond',serif;font-size:16px;color:#F0EBE1;font-style:italic}
        .strip{display:flex}
        .strip-p{flex:1;aspect-ratio:1;position:relative;overflow:hidden}
        .strip-p img{object-fit:cover;object-position:center;filter:sepia(20%) brightness(0.88);transition:filter 0.6s,transform 0.7s}
        .strip-p:hover img{filter:sepia(5%) brightness(1);transform:scale(1.05)}

        /* ── TESTIMONIAL ── */
        .testi{background:#2C1F0E;padding:80px 60px;display:grid;grid-template-columns:3fr 2fr;gap:80px;align-items:center}
        .testi-mark{font-family:'Italiana',serif;font-size:80px;color:#B8976A;opacity:0.3;line-height:0.7;margin-bottom:20px}
        .testi-q{font-family:'Cormorant Garamond',serif;font-size:clamp(18px,2vw,24px);font-style:italic;font-weight:300;color:#E8DFD0;line-height:1.85;margin-bottom:22px}
        .testi-a{font-family:'Jost',sans-serif;font-size:10px;letter-spacing:0.22em;color:#B8976A;text-transform:uppercase}
        .avail{background:rgba(184,151,106,0.08);border:1px solid rgba(184,151,106,0.2);padding:32px}
        .avail-l{font-family:'Jost',sans-serif;font-size:8px;letter-spacing:0.28em;color:#B8976A;text-transform:uppercase;margin-bottom:10px}
        .avail-t{font-family:'Italiana',serif;font-size:26px;color:#F0EBE1;margin-bottom:8px}
        .avail-s{font-family:'Jost',sans-serif;font-size:12px;font-weight:300;color:#9A8470;line-height:1.75;margin-bottom:22px}
        .avail-lnk{font-family:'Jost',sans-serif;font-size:10px;letter-spacing:0.14em;color:#D4B896;text-decoration:none;text-transform:uppercase;display:flex;align-items:center;gap:10px;transition:gap 0.3s,color 0.3s;margin-bottom:10px}
        .avail-lnk::before{content:'';width:16px;height:1px;background:#B8976A;flex-shrink:0}
        .avail-lnk:hover{gap:18px;color:#F0EBE1}

        /* ── CONTACT ── */
        .contact-section{padding:96px 60px;background:#F0EBE1}
        .contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:96px}
        .contact-h{font-family:'Italiana',serif;font-size:clamp(38px,5vw,64px);color:#2C1F0E;line-height:0.95;margin-bottom:26px}
        .contact-h em{font-style:italic;color:#8B6440}
        .contact-body{font-family:'Cormorant Garamond',serif;font-size:19px;font-style:italic;font-weight:300;color:#7A6650;line-height:1.8;margin-bottom:40px}
        .cl{font-family:'Jost',sans-serif;font-size:10px;letter-spacing:0.16em;color:#8B6440;text-decoration:none;text-transform:uppercase;display:flex;align-items:center;gap:12px;transition:gap 0.3s,color 0.3s;margin-bottom:12px}
        .cl::before{content:'';width:20px;height:1px;background:#B8976A;flex-shrink:0}
        .cl:hover{gap:22px;color:#2C1F0E}
        .fl{font-family:'Jost',sans-serif;font-size:12px;font-weight:300;color:#9A8470;line-height:1.7;margin-top:28px}
        .f-lbl{font-family:'Jost',sans-serif;font-size:8px;letter-spacing:0.24em;color:#B8976A;text-transform:uppercase;display:block;margin-bottom:9px}
        .f-inp{font-family:'Jost',sans-serif;background:transparent;border:none;border-bottom:1px solid #D9CEBC;color:#2C1F0E;font-size:14px;font-weight:300;padding:10px 0;width:100%;outline:none;transition:border-color 0.3s;letter-spacing:0.02em}
        .f-inp:focus{border-bottom-color:#8B6440}
        .f-inp::placeholder{color:#C4B4A0;font-weight:200}
        .f-ta{font-family:'Jost',sans-serif;background:transparent;border:none;border-bottom:1px solid #D9CEBC;color:#2C1F0E;font-size:14px;font-weight:300;padding:10px 0;width:100%;outline:none;resize:none;height:88px;transition:border-color 0.3s;letter-spacing:0.02em}
        .f-ta:focus{border-bottom-color:#8B6440}
        .f-ta::placeholder{color:#C4B4A0;font-weight:200}
        .f-sub{font-family:'Jost',sans-serif;font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:#F0EBE1;background:#2C1F0E;border:none;padding:15px 0;width:100%;cursor:pointer;margin-top:14px;transition:background 0.35s}
        .f-sub:hover{background:#8B6440}

        /* ── FOOTER ── */
        .footer{background:#2C1F0E;padding:48px 60px 34px}
        .footer-top{display:flex;justify-content:space-between;align-items:flex-start;padding-bottom:32px;border-bottom:1px solid rgba(184,151,106,0.18);flex-wrap:wrap;gap:28px}
        .f-name{font-family:'Italiana',serif;font-size:19px;color:#F0EBE1;letter-spacing:0.04em}
        .f-tag{font-family:'Jost',sans-serif;font-size:7px;letter-spacing:0.3em;color:#B8976A;margin-top:3px;text-transform:uppercase}
        .f-links{display:flex;gap:26px;flex-wrap:wrap;align-items:center}
        .f-lnk{font-family:'Jost',sans-serif;font-size:10px;letter-spacing:0.16em;color:#6A5A4A;text-transform:uppercase;background:none;border:none;cursor:pointer;transition:color 0.3s;text-decoration:none;display:inline-block}
        .f-lnk:hover{color:#D4B896}
        .footer-bot{display:flex;justify-content:space-between;align-items:center;padding-top:22px;flex-wrap:wrap;gap:10px}
        .f-copy{font-family:'Jost',sans-serif;font-size:10px;letter-spacing:0.08em;color:#4A3A28}
        .f-dots{display:flex;gap:6px;align-items:center}
        .fd{border-radius:50%}

        /* ── MOBILE ── */
        @media(max-width:768px){
          .vbu-nav{padding:0 20px;height:60px}
          .nav-links,.nl-hire{display:none !important}
          .burger{display:flex !important}
          .hero{margin-top:60px}
          .hero-content{padding:0 20px 52px !important}
          .badge-ring,.scroll-hint{display:none}
          .about-wrap{grid-template-columns:1fr !important}
          .about-photo{min-height:56vw}
          .about-text{padding:48px 20px !important}
          .cta-row{flex-direction:column}
          .btn-dark,.btn-outline{width:100% !important;text-align:center}
          .circle-section{padding:64px 20px !important}
          .work-section{padding:64px 20px !important}
          .work-grid{grid-template-columns:1fr !important}
          .wc{aspect-ratio:3/2 !important}
          .ex-grid{grid-template-columns:repeat(2,1fr) !important}
          .svc-section{padding:64px 20px !important}
          .svc-row{grid-template-columns:44px 1fr !important;gap:14px}
          .svc-body{display:none}
          .feat-section .feat-full{aspect-ratio:4/3 !important}
          .strip{display:none !important}
          .feat-text{padding:24px !important}
          .feat-meta{gap:14px;flex-wrap:wrap}
          .testi{grid-template-columns:1fr !important;padding:56px 20px !important;gap:32px}
          .contact-section{padding:64px 20px !important}
          .contact-grid{grid-template-columns:1fr !important;gap:44px !important}
          .footer{padding:36px 20px 24px !important}
          .footer-top{flex-direction:column;gap:20px}
          .footer-bot{flex-direction:column;gap:8px;text-align:center}
          .f-dots{display:none}
          .btn-ghost,.btn-gold{font-size:9px !important;padding:12px 24px !important}
        }
        @media(max-width:480px){
          .ex-grid{grid-template-columns:1fr !important}
          .stats-row{grid-template-columns:1fr;gap:20px;border-top:none;padding-top:0}
          .stat{border-right:none !important;padding:0 !important;border-bottom:1px solid #D9CEBC;padding-bottom:18px !important}
          .stat:last-child{border-bottom:none}
        }
      `}</style>

      {/* ── MOBILE OVERLAY MENU ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "fixed", inset: 0, zIndex: 299, background: "#F0EBE1", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 36 }}
          >
            <button onClick={() => setMenuOpen(false)} style={{ position: "absolute", top: 22, right: 22, background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#2C1F0E" }}>✕</button>
            {NAV_LINKS.map((n, i) => (
              <motion.button
                key={n}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="nl"
                style={{ fontSize: 15, letterSpacing: "0.22em" }}
                onClick={() => nav(n.toLowerCase())}
              >{n}</motion.button>
            ))}
            <motion.a
              href="https://wa.me/2347068246856" target="_blank" rel="noreferrer"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.32 }}
              className="nl-hire"
            >Hire Me</motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── STATIC NAV ── */}
      <motion.nav
        className="vbu-nav"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="brand" onClick={() => nav("hero")}>
          <span className="brand-name">Visuals by Uriel</span>
          <span className="brand-sub">Brand · Design · Identity</span>
        </div>
        <div className="nav-links">
          {NAV_LINKS.map((n, i) => (
            <motion.button
              key={n}
              className="nl"
              onClick={() => nav(n.toLowerCase())}
              whileHover={{ color: "#2C1F0E" }}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.07 }}
            >{n}</motion.button>
          ))}
        </div>
        <motion.a
          href="https://wa.me/2347068246856" target="_blank" rel="noreferrer"
          className="nl-hire"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
        >Hire Me</motion.a>
        <button className="burger" onClick={() => setMenuOpen(true)}><span/><span/><span/></button>
      </motion.nav>

      {/* ── HERO ── */}
      <section className="hero" ref={heroRef}>
        <motion.div style={{ y: heroY, position: "absolute", inset: 0 }}>
          <Image src="/74883030-5e51-413a-adde-e72319e07f20.png" alt="Uriel Maforikan" fill priority style={{ objectFit: "cover", objectPosition: "center top" }} />
        </motion.div>
        <div className="hero-veil" />

        {/* Spinning badge */}
        <motion.div className="badge-ring" style={{ position: "absolute", right: 64, top: "48%", translateY: "-50%", zIndex: 2 }}>
          <svg viewBox="0 0 110 110" width="110" height="110" style={{ animation: "spinSlow 20s linear infinite" }}>
            <path id="cp" d="M 55,55 m -44,0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0" fill="none"/>
            <text style={{ fontSize: "8px", fontFamily: "Jost,sans-serif", letterSpacing: "2.5px", fill: "rgba(212,184,150,0.62)", textTransform: "uppercase" }}>
              <textPath href="#cp">Brand Designer · Osun · Nigeria · </textPath>
            </text>
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(184,151,106,0.22)", border: "1px solid rgba(184,151,106,0.45)" }} />
          </div>
        </motion.div>

        <motion.div className="hero-content" style={{ opacity: heroOpacity }}>
          <motion.p className="hero-eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.2 }}>
            Graphic Designer · Brand Identity Specialist · Osun, Nigeria
          </motion.p>
          <motion.h1 className="hero-h1" initial={{ opacity: 0, y: 48 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}>
            Uriel<br /><em>Maforikan</em>
          </motion.h1>
          <motion.p className="hero-brand" initial={{ opacity: 0, y: 48 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.48 }}>
            Visuals by Uriel
          </motion.p>
          <motion.p className="hero-tagline" initial={{ opacity: 0, y: 48 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.58 }}>
            I help brands stand out with unique, enduring identities — built on strategy, crafted with intention, designed to inspire trust.
          </motion.p>
          <motion.div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }} initial={{ opacity: 0, y: 48 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.68 }}>
            <MagneticBtn className="btn-ghost" onClick={() => nav("work")}>View Portfolio</MagneticBtn>
            <MagneticBtn className="btn-gold" href="https://www.behance.net/uriel01" target="_blank">Behance Portfolio</MagneticBtn>
          </motion.div>
        </motion.div>

        <div className="scroll-hint">
          <div className="scroll-line" />
          <span className="scroll-txt">Scroll</span>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div className="ticker">
        <div className="ticker-t">
          {Array(4).fill(["Brand Identity","Logo Design","Marketing Design","Social Media","Presentation Decks","Available for Freelance","Osun · Nigeria"]).flat().map((t,i) => (
            <span key={i} className="ti">{t}&nbsp;&nbsp;◦</span>
          ))}
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section id="about">
        <div className="about-wrap">
          <Reveal>
            <div className="about-photo" style={{ minHeight: 640, position: "relative" }}>
              <Image src="/uriel-studio.jpg" alt="Uriel Maforikan" fill style={{ objectFit: "cover", objectPosition: "center top" }} />
              <div className="about-overlay" />
              <span className="about-cap">Uriel Maforikan · Osun, Nigeria</span>
            </div>
          </Reveal>
          <div className="about-text">
            <Reveal delay={0.12}>
              <p className="sl">About</p>
              <h2 className="about-h">Hi, I&apos;m<br /><em>Uriel</em> 👋🏾</h2>
              <p className="about-role">Graphic Designer · Brand Identity · Video Editor</p>
              <p className="about-body">An experienced designer with over 3 years of expertise, committed to helping brands stand out with unique, enduring identities that inspire trust.</p>
              <p className="about-body2">Based in Nigeria, I collaborate remotely with teams and clients across the globe. Notable work includes StarHaven, MadamCook, and BiStantly — and I host The Great You Talk Podcast spotlighting inspiring stories of creative professionals.</p>
              <div className="about-hl">
                <p>I help create a consistent professional experience using strategy, brand identity and marketing designs — putting my clients ahead of their competitors.</p>
              </div>
              <div className="skills">
                {["Brand Identity","Logo Design","Adobe Illustrator","Figma","Social Media","Print Design","Presentation Decks","Video Editing"].map((s, i) => (
                  <Reveal key={s} delay={i * 0.06}>
                    <span className="skill">{s}</span>
                  </Reveal>
                ))}
              </div>
              <div className="stats-row">
                {[["3+","Years Experience"],["50+","Projects Delivered"],["∞","Ideas Created"]].map(([n,l],i) => (
                  <Reveal key={l} delay={i * 0.1}>
                    <div className="stat">
                      <div className="stat-n">{n}</div>
                      <div className="stat-l">{l}</div>
                    </div>
                  </Reveal>
                ))}
              </div>
              <div className="cta-row">
                <MagneticBtn className="btn-dark" href="https://drive.google.com/file/d/1y-V2lNExxFCyR2m2uouSO7z4C8fEcqWK/view?usp=sharing" target="_blank">Download Resume</MagneticBtn>
                <MagneticBtn className="btn-outline" href="https://www.behance.net/uriel01" target="_blank">Behance Portfolio</MagneticBtn>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── CIRCLE MOTIF ── */}
      <section className="circle-section">
        <div className="circle-deco" style={{ width: 420, height: 420, top: -140, right: -100 }} />
        <div className="circle-deco" style={{ width: 280, height: 280, top: -60, right: -20 }} />
        <Reveal>
          <div style={{ display: "flex", alignItems: "center", gap: 48, flexWrap: "wrap", position: "relative", zIndex: 1 }}>
            <div className="cm">
              <div className="cm-i">
                <svg viewBox="0 0 20 20" width="20" height="20" fill="#F0EBE1">
                  <path d="M10 2a8 8 0 100 16A8 8 0 0010 2zm0 14a6 6 0 110-12 6 6 0 010 12z" opacity="0.6"/>
                  <circle cx="10" cy="10" r="2.5"/>
                </svg>
              </div>
            </div>
            <blockquote className="cq">
              &ldquo;A great brand identity does not just look good — it creates a consistent, professional experience that builds trust and <em style={{ fontStyle: "italic", color: "#8B6440" }}>attracts.</em>&rdquo;
            </blockquote>
          </div>
        </Reveal>
      </section>

      {/* ── WORK ── */}
      <section id="work" className="work-section">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 60, flexWrap: "wrap", gap: 20 }}>
          <Reveal>
            <p className="sl">Portfolio</p>
            <h2 className="work-h">Selected<br /><em>Work</em></h2>
          </Reveal>
          <Reveal delay={0.1}>
            <a href="https://www.behance.net/uriel01" target="_blank" rel="noreferrer" style={{ fontFamily: "'Jost',sans-serif", fontSize: 10, letterSpacing: "0.2em", color: "#8B6440", textDecoration: "none", textTransform: "uppercase", borderBottom: "1px solid #B8976A", paddingBottom: 2 }}>
              Full Portfolio on Behance →
            </a>
          </Reveal>
        </div>

        <div className="work-grid">
          {WORKS.map((w, i) => (
            <Reveal key={w.id} delay={i * 0.07}>
              <motion.div
                className={`wc tile-${i+1}`}
                whileHover={{ scale: 1.015 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="wc-img"><Image src={w.img} alt={w.title} fill /></div>
                <div className="wc-veil" />
                <motion.div
                  className="wc-body"
                  initial={{ y: 10, opacity: 0.7 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="wc-n">{String(i+1).padStart(2,"0")} · {w.year}</p>
                  <h3 className="wc-t">{w.title}</h3>
                  <p className="wc-c">{w.category}</p>
                  <p className="wc-b">{w.body}</p>
                </motion.div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <p className="more-label">More Work</p>
        <div className="ex-grid">
          {EXTRAS.map((e, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="ex-card">
                <Image src={e.img} alt={e.title} fill />
                <div className="ex-info">
                  <div className="ex-t">{e.title}</div>
                  <div className="ex-c">{e.category}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="svc-section">
        <Reveal>
          <p className="sl" style={{ color: "#B8976A" }}>
            <span style={{ background: "#B8976A", display: "inline-block", width: 28, height: 1, verticalAlign: "middle", marginRight: 14 }} />
            What I Do
          </p>
          <h2 className="svc-h">Creative <em>Services</em></h2>
        </Reveal>
        <div className="svc-list">
          {SERVICES.map((s, i) => (
            <Reveal key={s.num} delay={i * 0.07}>
              <motion.div
                className="svc-row"
                onHoverStart={() => setActiveService(i)}
                onHoverEnd={() => setActiveService(null)}
                animate={{ paddingLeft: activeService === i ? 10 : 0 }}
                transition={{ duration: 0.35 }}
              >
                <div className="svc-num">{s.num}</div>
                <div className="svc-title">{s.title}</div>
                <div className="svc-body">{s.body}</div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── FEATURED ── */}
      <section className="feat-section">
        <div className="feat-full">
          <Image src="/starhaven_gradient.jpg" alt="Featured work" fill />
          <div className="feat-overlay">
            <div className="feat-text">
              <Reveal>
                <p className="feat-ey">Featured Case Study</p>
                <h2 className="feat-h">MadamCook<br /><em>Brand Identity</em></h2>
                <p className="feat-desc">Celebrating Nigerian cuisine — a premium identity built to make traditional dishes accessible to every home.</p>
                <div className="feat-meta">
                  {[["Client","MadamCook"],["Duration","1 Week"],["Scope","Brand Identity"],["Tools","Illustrator · Figma"]].map(([l,v]) => (
                    <div key={l}>
                      <p className="fm-l">{l}</p>
                      <p className="fm-v">{v}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
        <div className="strip">
          {["/starhaven_gradient.jpg","/Madamcook_tshirt_icon_-_logo.png","/Asset_64xg.png"].map((src,i) => (
            <div key={i} className="strip-p">
              <Image src={src} alt="Brand work" fill />
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIAL ── */}
      <section className="testi">
        <Reveal>
          <div className="testi-mark">&ldquo;</div>
          <p className="testi-q">Working with Uriel was fantastic. Communicates adequately and on time — and have you seen his work? Amazing.</p>
          <p className="testi-a">Ademisoye Hannah — OLAD</p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="avail">
            <p className="avail-l">Current Status</p>
            <p className="avail-t">Available for Freelance</p>
            <p className="avail-s">Open to brand identity design gigs — remote, contract, and full-time roles welcome. Based in Osun, Nigeria.</p>
            <a href="https://www.instagram.com/vburielmaforikan" target="_blank" rel="noreferrer" className="avail-lnk">Instagram @vburielmaforikan</a>
            <a href="https://www.behance.net/uriel01" target="_blank" rel="noreferrer" className="avail-lnk">Behance · uriel01</a>
            <a href="mailto:maforikanuriel2017@gmail.com" className="avail-lnk">maforikanuriel2017@gmail.com</a>
            <a href="https://wa.me/2347068246856" target="_blank" rel="noreferrer" className="avail-lnk">WhatsApp · 07068246856</a>
          </div>
        </Reveal>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="contact-section">
        <div className="contact-grid">
          <Reveal>
            <p className="sl">Get in Touch</p>
            <h2 className="contact-h">Enough about me.<br /><em>What about you?</em></h2>
            <p className="contact-body">Want to work on a project together? I promise I&apos;m a lot of fun to work with. Shoot me a message — I respond promptly.</p>
            <a href="mailto:maforikanuriel2017@gmail.com" className="cl">maforikanuriel2017@gmail.com</a>
            <a href="https://wa.me/2347068246856" target="_blank" rel="noreferrer" className="cl">WhatsApp · 07068246856</a>
            <a href="https://www.instagram.com/vburielmaforikan" target="_blank" rel="noreferrer" className="cl">Instagram @vburielmaforikan</a>
            <a href="https://www.behance.net/uriel01" target="_blank" rel="noreferrer" className="cl">Behance · uriel01</a>
            <p className="fl">📍 Osun, Nigeria — available worldwide &nbsp;·&nbsp; 🌐 Remote &amp; contract roles welcome</p>
          </Reveal>
          <Reveal delay={0.18}>
            <AnimatePresence mode="wait">
              {!sent ? (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {[{l:"Your name",k:"name",ph:"Full name",ta:false},{l:"Email address",k:"email",ph:"your@email.com",ta:false},{l:"Your message",k:"message",ph:"Tell me about your project…",ta:true}].map(({l,k,ph,ta}) => (
                    <div key={k} style={{ marginBottom: 28 }}>
                      <label className="f-lbl">{l}</label>
                      {ta
                        ? <textarea className="f-ta" placeholder={ph} value={formData[k as keyof typeof formData]} onChange={e => setFormData({...formData,[k]:e.target.value})} />
                        : <input className="f-inp" placeholder={ph} value={formData[k as keyof typeof formData]} onChange={e => setFormData({...formData,[k]:e.target.value})} />
                      }
                    </div>
                  ))}
                  <motion.button className="f-sub" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} onClick={() => { if(formData.name&&formData.email) setSent(true); }}>
                    Send message
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div key="thanks" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: "center", paddingTop: 80 }}>
                  <motion.div
                    style={{ width: 80, height: 80, borderRadius: "50%", border: "1px solid #B8976A", margin: "0 auto 28px", display: "flex", alignItems: "center", justifyContent: "center" }}
                    animate={{ scale: [1, 1.08, 1] }} transition={{ repeat: 2, duration: 0.5 }}
                  >
                    <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#B8976A" }} />
                  </motion.div>
                  <h3 style={{ fontFamily: "'Italiana',serif", fontSize: 36, color: "#2C1F0E", marginBottom: 12 }}>Message received.</h3>
                  <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 18, fontStyle: "italic", color: "#8B6440" }}>Uriel will be in touch soon.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-top">
          <div>
            <div className="f-name">Visuals by Uriel</div>
            <div className="f-tag">Brand · Design · Identity</div>
          </div>
          <div className="f-links">
            {NAV_LINKS.map(n => (
              <button key={n} className="f-lnk" onClick={() => nav(n.toLowerCase())}>{n}</button>
            ))}
            <a href="https://www.behance.net/uriel01" target="_blank" rel="noreferrer" className="f-lnk">Behance</a>
            <a href="https://www.instagram.com/vburielmaforikan" target="_blank" rel="noreferrer" className="f-lnk">Instagram</a>
          </div>
        </div>
        <div className="footer-bot">
          <span className="f-copy">© 2026 Visuals by Uriel — Uriel Maforikan. All rights reserved.</span>
          <div className="f-dots">
            {[7,10,7].map((s,i) => <div key={i} className="fd" style={{ width:s,height:s,background:i===1?"#B8976A":"#4A3A28" }} />)}
          </div>
        </div>
      </footer>
    </main>
  );
}
