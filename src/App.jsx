import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Clock, Mail, MapPin, Phone, Instagram, Facebook, Music2 } from "lucide-react";
import CONFIG from "./config.js";

// Launch day midnight ET
const targetISO = "2026-11-06T00:00:00-05:00";

function useCountdown(target) {
  const targetTime = useMemo(() => new Date(target).getTime(), [target]);
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const id = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(id); }, []);
  let delta = Math.max(0, targetTime - now);
  const days = Math.floor(delta / (1000 * 60 * 60 * 24));
  delta -= days * 24 * 60 * 60 * 1000;
  const hours = Math.floor(delta / (1000 * 60 * 60));
  delta -= hours * 60 * 60 * 1000;
  const minutes = Math.floor(delta / (1000 * 60));
  delta -= minutes * 60 * 1000;
  const seconds = Math.floor(delta / 1000);
  return { days, hours, minutes, seconds };
}

const Card = ({ className = "", children }) => (<div className={`rounded-2xl border border-white/10 bg-white/5 text-white backdrop-blur ${className}`}>{children}</div>);
const Button = ({ className = "", children, ...props }) => (<button className={`inline-flex items-center justify-center rounded-xl px-4 py-2 font-medium transition ${className}`} {...props}>{children}</button>);
const Input = ({ className = "", ...props }) => (<input className={`w-full rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-white placeholder:text-white/60 ${className}`} {...props} />);

function InfoTile({ icon: Icon, title, children }) {
  return (<Card><div className="flex items-start gap-4 p-5"><div className="mt-1 rounded-xl bg-white/10 p-2"><Icon className="h-5 w-5" /></div><div><div className="font-medium">{title}</div><div className="text-white/80">{children}</div></div></div></Card>);
}
function Social({ icon: Icon, label, href }) {
  const safe = href && href.length ? href : "#";
  return (<a href={safe} target="_blank" rel="noreferrer" aria-label={label} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm text-white hover:bg-white/20"><Icon className="h-4 w-4" /> {label}</a>);
}
function Badge({ children }) { return (<span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80">{children}</span>); }
function TierCard({ name, blurb, priceHint, features, highlight = false }) {
  return (<Card className={`${highlight ? "ring-2 ring-[hsl(42,80%,62%)]" : ""}`}><div className="p-6"><div className="mb-1 text-sm uppercase tracking-widest text-white/70">{priceHint}</div><div className="mb-1 text-xl font-semibold">{name}</div><div className="mb-4 text-white/80">{blurb}</div><ul className="grid gap-2 pl-5 text-sm text-white/80">{features.map((f) => (<li className="list-disc" key={f}>{f}</li>))}</ul><Button className="mt-6 w-full bg-[hsl(350,45%,34%)] hover:bg-[hsl(350,45%,28%)]">Request Details</Button></div></Card>);
}

export default function App() {
  const { days, hours, minutes, seconds } = useCountdown(targetISO);
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2b0f16] via-[#3a121b] to-[#0f0a0a] text-white relative overflow-hidden">
      {/* Soft bokeh backdrop */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="-top-16 -left-20 absolute h-80 w-80 rounded-full bg-[rgba(255,215,0,0.15)] blur-3xl" />
        <div className="top-40 -right-20 absolute h-96 w-96 rounded-full bg-[rgba(187,134,252,0.15)] blur-3xl" />
        <div className="bottom-0 left-1/3 absolute h-64 w-64 rounded-full bg-[rgba(72,187,120,0.1)] blur-3xl" />
      </div>

      {/* Nav */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-3">
          <img src="/assets/venue1106-logo.png" alt="Venue 1106 logo" className="h-12 w-auto rounded-xl ring-1 ring-white/20 bg-white/5 p-1" />
          <div>
            <div className="text-2xl font-semibold tracking-wide">Venue <span className="text-[hsl(42,80%,72%)]">1106</span></div>
            <div className="text-xs uppercase tracking-[0.2em] text-white/70">Your Moment. Your Memories. Your Venue.</div>
          </div>
        </div>
        <div className="hidden gap-3 md:flex">
          <Button className="bg-white/10 text-white hover:bg-white/20" onClick={() => { if (CONFIG.GOOGLE_FORM_URL) window.open(CONFIG.GOOGLE_FORM_URL, "_blank"); }}>Inquire</Button>
          <Button className="bg-[hsl(350,45%,34%)] hover:bg-[hsl(350,45%,28%)]" onClick={() => { if (CONFIG.GOOGLE_FORM_URL) window.open(CONFIG.GOOGLE_FORM_URL, "_blank"); }}>Join the List</Button>
        </div>
      </header>

      {/* Hero */}
      <main className="mx-auto max-w-6xl px-6 pb-24">
        <section className="grid items-center gap-10 pt-6 md:grid-cols-2 md:gap-16">
          <div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-4 text-4xl font-semibold leading-tight sm:text-5xl">
              An elegant event destination in downtown Fayetteville, NC
            </motion.h1>
            <p className="mb-6 max-w-prose text-white/80">
              From luxurious weddings and baby showers to corporate meetings and pop-up shops, Venue 1106 provides tailored packages and versatile spaces for every special moment. Our dedicated team will ensure your vision comes to life with elegance and heartfelt service.
            </p>
            <blockquote className="mb-8 border-l-4 border-[hsl(42,80%,72%)] pl-4 text-sm italic text-white/80">
              “When you think of all the beautiful things in the world, don’t forget to include yourself.”
            </blockquote>

            {/* Countdown */}
            <div className="mb-8">
              <div className="mb-3 flex items-center gap-2 text-white/80">
                <CalendarDays className="h-5 w-5" />
                <span>Target Grand Opening: November 6, 2026</span>
              </div>
              <Card>
                <div className="grid grid-cols-4 divide-x divide-white/10 text-center">
                  {[
                    { label: "Days", value: days },
                    { label: "Hours", value: hours },
                    { label: "Minutes", value: minutes },
                    { label: "Seconds", value: seconds },
                  ].map((t) => (
                    <div key={t.label} className="p-5">
                      <div className="text-3xl font-bold tabular-nums">{String(t.value).padStart(2, "0")}</div>
                      <div className="mt-1 text-xs uppercase tracking-widest text-white/70">{t.label}</div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Email form opens Google Form if provided */}
            <form onSubmit={(e) => { e.preventDefault(); if (CONFIG.GOOGLE_FORM_URL) window.open(CONFIG.GOOGLE_FORM_URL, "_blank"); }} className="flex max-w-lg gap-3" aria-label="Join the Venue 1106 interest list">
              <Input type="email" placeholder="Enter your email to get updates" required />
              <Button type="submit" className="bg-[hsl(42,80%,52%)] text-black hover:bg-[hsl(42,80%,46%)]">Notify Me</Button>
            </form>
            <div className="mt-3 text-xs text-white/70">
              Prefer text? Call or message <a className="underline decoration-white/30 underline-offset-2" href="tel:19104466464">(910) 446‑6464</a> to be added.
            </div>
          </div>

          {/* Right column: feature card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <Card>
              <div className="p-6">
                <div className="mb-4 flex items-center gap-2 text-lg">
                  <Clock className="h-5 w-5" />
                  <span>What to Expect</span>
                </div>
                <ul className="grid list-disc gap-3 pl-5 text-white/80">
                  <li>Two refined event spaces + bridal & groom suites</li>
                  <li>Tile & wood flooring, 10′ ceilings, elegant lighting</li>
                  <li>Catering prep kitchen and designated cocktail area</li>
                  <li>Meeting room, office spaces, and secure storage</li>
                  <li>In‑house DJ option and curated vendor partners</li>
                  <li>Security plan with modern access controls</li>
                </ul>
                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  <Badge>Weddings</Badge>
                  <Badge>Showers</Badge>
                  <Badge>Meetings</Badge>
                  <Badge>Community Events</Badge>
                  <Badge>Photoshoots</Badge>
                  <Badge>Private Dinners</Badge>
                </div>
              </div>
            </Card>
          </motion.div>
        </section>

        {/* Info band */}
        <section className="mt-16 grid gap-4 md:grid-cols-3">
          <InfoTile icon={MapPin} title="Location">
            Downtown Fayetteville, NC
            <div className="text-sm text-white/70">Walkable, central, and convenient parking.</div>
          </InfoTile>
          <InfoTile icon={Phone} title="Contact">
            <a href="tel:19104466464" className="underline decoration-white/30 underline-offset-2">(910) 446‑6464</a>
            <div className="text-sm text-white/70">Call or text for inquiries & tours.</div>
          </InfoTile>
          <InfoTile icon={Mail} title="Updates">
            Join the list above and follow us on social.
            <div className="mt-2 flex gap-3">
              <Social icon={Instagram} label="Instagram" href={CONFIG.SOCIAL.INSTAGRAM} />
              <Social icon={Facebook} label="Facebook" href={CONFIG.SOCIAL.FACEBOOK} />
              <Social icon={Music2} label="Music2" href={CONFIG.SOCIAL.Music2} />
            </div>
          </InfoTile>
        </section>

        {/* Packages preview */}
        <section className="mt-16">
          <h2 className="mb-4 text-2xl font-semibold">Sample Packages</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <TierCard name="Keepsake" blurb="Thoughtfully simple for intimate moments" priceHint="Starter" features={["Up to 50 guests", "Partial décor", "Preferred vendor list"]} />
            <TierCard name="Legacy" blurb="Our most‑booked, beautifully balanced" priceHint="Mid" features={["Up to 100 guests", "Décor + coordination", "DJ option"]} highlight />
            <TierCard name="Signature" blurb="All‑out elegance and white‑glove details" priceHint="Premier" features={["Up to 150 guests", "Full styling", "Concierge support"]} />
          </div>
          <p className="mt-3 text-sm text-white/70">Full package menus with Bronze/Silver/Gold tiers available at launch.</p>
        </section>

        {/* Footer */}
        <footer className="mt-20 border-t border-white/10 py-10 text-center text-white/70">
          <div className="mb-2 text-sm">© {new Date().getFullYear()} Venue 1106 • Fayetteville, North Carolina</div>
          <div className="text-xs">Crafted with love. Rooted in legacy & community.</div>
        </footer>
      </main>
    </div>
  );
}
