import { Link } from "react-router-dom";
import { brand } from "../brand";
import { usePageTitle } from "../lib/format";
import "./About.css";

const principles = [
  {
    title: "Kit we look after ourselves",
    body: "We maintain our own equipment and test it before it leaves for a job, so what arrives works the way it should.",
  },
  {
    title: "One team, start to finish",
    body: "The people who quote your event are the people who rig it, so nothing gets lost between the office and the venue.",
  },
  {
    title: "Sized to the room",
    body: "We'll tell you if a smaller system will do. A PA that's right for the room sounds better than one that's merely loud.",
  },
  {
    title: "Tidy and safe",
    body: "Cables taped down or run out of the way, fixtures safety-bonded, and everything packed away when the night is done.",
  },
];

export default function About() {
  usePageTitle("About us");
  return (
    <>
      <header className="page-head" style={{ ["--page-gel" as string]: "var(--rose)" }}>
        <div className="wrap">
          <ol className="breadcrumb">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li aria-current="page">About</li>
          </ol>
          <h1>Sound and lighting people from Prestwich</h1>
        </div>
      </header>

      <section className="section about">
        <div className="wrap about__grid">
          <div className="about__story">
            <p className="about__opening">
              {brand.founders} started USR in {brand.founded} to provide professional sound and lighting for hire, and to set it
              up properly for every kind of event.
            </p>
            <p className="muted">
              Today we cover weddings, parties, concerts, school shows and corporate events across the North West. The
              business became {brand.legalName} in 2022, and it's still run by the people who started it.
            </p>
            <p className="muted">
              Our job is the part of the event guests notice without thinking about: speeches everyone can hear, a room that
              looks the way you pictured it, and a dance floor that fills up.
            </p>
            <div className="about__actions">
              <Link to="/hire" className="btn btn-primary">
                See what we hire
              </Link>
              <Link to="/contact" className="btn btn-ghost">
                Get in touch
              </Link>
            </div>
          </div>
          <div>
            <h2 className="about__h2">How we work</h2>
            <ul className="principles">
              {principles.map((p) => (
                <li key={p.title}>
                  <h3>{p.title}</h3>
                  <p className="muted">{p.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
