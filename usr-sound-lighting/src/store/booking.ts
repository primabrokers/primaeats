import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  hireLengths,
  packageBySlug,
  productBySlug,
  productImage,
  serviceLevels,
  type HireLength,
  type ServiceLevel,
} from "../data/catalogue";

export interface BookingLine {
  key: string;
  kind: "product" | "package";
  slug: string;
  qty: number;
  colour?: string;
}

export interface EventDetails {
  eventType: string;
  date: string;
  startTime: string;
  endTime: string;
  guests: string;
  venue: string;
  postcode: string;
  setting: "indoor" | "outdoor" | "marquee";
  access: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
}

export const emptyDetails: EventDetails = {
  eventType: "",
  date: "",
  startTime: "",
  endTime: "",
  guests: "",
  venue: "",
  postcode: "",
  setting: "indoor",
  access: "",
  name: "",
  email: "",
  phone: "",
  notes: "",
};

interface BookingState {
  lines: BookingLine[];
  hireLength: HireLength;
  service: ServiceLevel;
  details: EventDetails;
  lastAdded: { key: string; at: number } | null;
  add: (line: Omit<BookingLine, "key">) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  setHireLength: (h: HireLength) => void;
  setService: (s: ServiceLevel) => void;
  setDetails: (d: Partial<EventDetails>) => void;
  clear: () => void;
}

const lineKey = (l: Omit<BookingLine, "key">) => `${l.kind}:${l.slug}:${l.colour ?? ""}`;

export const useBooking = create<BookingState>()(
  persist(
    (set) => ({
      lines: [],
      hireLength: "day",
      service: "delivered",
      details: emptyDetails,
      lastAdded: null,
      add: (line) =>
        set((s) => {
          const key = lineKey(line);
          const existing = s.lines.find((l) => l.key === key);
          const lines = existing
            ? s.lines.map((l) => (l.key === key ? { ...l, qty: l.qty + line.qty } : l))
            : [...s.lines, { ...line, key }];
          return { lines, lastAdded: { key, at: Date.now() } };
        }),
      setQty: (key, qty) =>
        set((s) => ({
          lines: s.lines.map((l) => (l.key === key ? { ...l, qty: Math.max(1, Math.min(99, qty)) } : l)),
        })),
      remove: (key) => set((s) => ({ lines: s.lines.filter((l) => l.key !== key) })),
      setHireLength: (hireLength) => set({ hireLength }),
      setService: (service) => set({ service }),
      setDetails: (d) => set((s) => ({ details: { ...s.details, ...d } })),
      clear: () => set({ lines: [], details: emptyDetails, lastAdded: null }),
    }),
    {
      name: "usr-booking",
      partialize: (s) => ({ lines: s.lines, hireLength: s.hireLength, service: s.service, details: s.details }),
    },
  ),
);

/** Resolve a line to display name, unit price and whether it forces crew. */
export function describeLine(line: BookingLine) {
  if (line.kind === "package") {
    const pkg = packageBySlug(line.slug);
    return pkg
      ? { name: `${pkg.name} package`, unitPrice: pkg.from, gel: pkg.gel, dryHire: false, crewed: false, href: "/packages#" + pkg.slug, fromPrice: true, perEvent: true, unit: "per event", image: null as string | null }
      : null;
  }
  const p = productBySlug(line.slug);
  return p
    ? {
        name: p.name,
        unitPrice: p.dayRate,
        gel: `var(--${gelFor(p.category)})`,
        dryHire: p.dryHire,
        crewed: p.crewed,
        href: `/hire/${p.slug}`,
        fromPrice: false,
        perEvent: !!p.perEvent,
        unit: p.unit ?? "per day",
        image: productImage(p) as string | null,
      }
    : null;
}

function gelFor(c: string) {
  return { sound: "steel", lighting: "amber", staging: "rose", effects: "lavender" }[c] ?? "amber";
}

export const lineTotal = (d: { unitPrice: number; perEvent: boolean }, qty: number, multiplier: number) =>
  d.unitPrice * qty * (d.perEvent ? 1 : multiplier);

export function useTotals() {
  const { lines, hireLength, service } = useBooking();
  const multiplier = hireLengths.find((h) => h.id === hireLength)?.multiplier ?? 1;
  let kit = 0;
  let allDryHire = lines.length > 0;
  let anyFrom = false;
  for (const l of lines) {
    const d = describeLine(l);
    if (!d) continue;
    // Packages and per-event effects don't scale with hire length.
    kit += lineTotal(d, l.qty, multiplier);
    if (!d.dryHire) allDryHire = false;
    if (d.fromPrice) anyFrom = true;
  }
  const serviceFee = serviceLevels.find((s) => s.id === service)?.fee ?? 0;
  const count = lines.reduce((n, l) => n + l.qty, 0);
  return { kit, serviceFee, total: kit + (lines.length ? serviceFee : 0), count, allDryHire, anyFrom, multiplier };
}
