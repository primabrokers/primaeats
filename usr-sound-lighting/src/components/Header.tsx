import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "./Logo";
import { describeLine, useBooking } from "../store/booking";
import "./Header.css";

const nav = [
  { to: "/hire", label: "Hire kit" },
  { to: "/packages", label: "Packages" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const count = useBooking((s) => s.lines.reduce((n, l) => n + l.qty, 0));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`site-header ${scrolled || open ? "is-solid" : ""}`}>
      <div className="wrap site-header__inner">
        <Link to="/" className="site-header__logo" aria-label="USR Sound & Lighting, home">
          <Logo height={44} />
        </Link>

        <nav className="site-nav" aria-label="Main">
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to} className="site-nav__link">
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="site-header__actions">
          <Link to="/booking" className="booking-btn">
            <span>Booking</span>
            <AnimatePresence initial={false} mode="popLayout">
              <motion.span
                key={count}
                className="booking-btn__count num"
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.4, opacity: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 26 }}
              >
                {count}
              </motion.span>
            </AnimatePresence>
            <span className="visually-hidden">{count === 1 ? "item" : "items"}</span>
          </Link>
          <button
            type="button"
            className="menu-btn"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="visually-hidden">{open ? "Close menu" : "Open menu"}</span>
            <span className="menu-btn__bars" data-open={open} aria-hidden />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            className="mobile-menu"
            aria-label="Main"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            <div className="wrap">
              {[{ to: "/", label: "Home" }, ...nav, { to: "/booking", label: `Your booking (${count})` }].map((n) => (
                <NavLink key={n.to} to={n.to} end className="mobile-menu__link">
                  {n.label}
                </NavLink>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
      <AddedToast />
    </header>
  );
}

/** Confirms an add-to-booking, wherever it happened. */
function AddedToast() {
  const lastAdded = useBooking((s) => s.lastAdded);
  const lines = useBooking((s) => s.lines);
  const [visible, setVisible] = useState<typeof lastAdded>(null);

  useEffect(() => {
    if (!lastAdded || Date.now() - lastAdded.at > 2000) return;
    setVisible(lastAdded);
    const t = setTimeout(() => setVisible(null), 4200);
    return () => clearTimeout(t);
  }, [lastAdded]);

  const line = visible && lines.find((l) => l.key === visible.key);
  const d = line ? describeLine(line) : null;

  return (
    <div className="toast-region" aria-live="polite">
      <AnimatePresence>
        {d && visible && (
          <motion.div
            key={visible.at}
            className="toast"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            style={{ ["--gel" as string]: d.gel }}
          >
            <span className="toast__gel" aria-hidden />
            <span>
              Added <strong>{d.name}</strong> to your booking.
            </span>
            <Link to="/booking" className="text-link" onClick={() => setVisible(null)}>
              View booking
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
