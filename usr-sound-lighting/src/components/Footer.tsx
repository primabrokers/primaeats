import { Link } from "react-router-dom";
import { brand, telHref } from "../brand";
import { Logo } from "./Logo";
import "./Footer.css";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap site-footer__grid">
        <div className="site-footer__brand">
          <Logo height={64} />
          <p className="muted">
            Sound, lighting and staging for weddings, parties, concerts and corporate events. Based in {brand.base}, working
            across the North West since {brand.founded}.
          </p>
        </div>

        <nav aria-label="Hire">
          <h2 className="site-footer__title">Hire</h2>
          <ul>
            <li><Link to="/hire?category=sound">Sound</Link></li>
            <li><Link to="/hire?category=lighting">Lighting</Link></li>
            <li><Link to="/hire?category=staging">Staging and floors</Link></li>
            <li><Link to="/hire?category=effects">Effects</Link></li>
            <li><Link to="/packages">Packages</Link></li>
          </ul>
        </nav>

        <nav aria-label="Company">
          <h2 className="site-footer__title">Company</h2>
          <ul>
            <li><Link to="/about">About us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/booking">Your booking</Link></li>
          </ul>
        </nav>

        <div>
          <h2 className="site-footer__title">Talk to us</h2>
          <ul>
            <li><a href={`mailto:${brand.email}`}>{brand.email}</a></li>
            {brand.phone && (
              <li><a href={telHref(brand.phone)}>{brand.phone}</a></li>
            )}
            <li><a href={brand.instagram} rel="noopener" target="_blank">Instagram {brand.instagramHandle}</a></li>
          </ul>
        </div>
      </div>
      <div className="wrap site-footer__legal">
        <p>
          {brand.legalName}. Registered in England and Wales, company number {brand.companyNumber}. Registered office:{" "}
          {brand.registeredOffice}.
        </p>
        <p>© {new Date().getFullYear()} {brand.name}</p>
      </div>
    </footer>
  );
}
