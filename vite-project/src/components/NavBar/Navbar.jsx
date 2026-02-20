import React, { useRef, useState } from "react";
import { navLinks } from "../../constants/navbarConstants";
import "./Navbar.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Navbar = () => {
  const panelRef = useRef(null);
  const [open, setOpen] = useState(false);


  useGSAP(() => {
    if (!panelRef.current) return;
    gsap.set(panelRef.current, { height: 0, opacity: 0, y: -8, pointerEvents: "none" });
  }, []);

  const toggle = () => {
    const panel = panelRef.current;
    if (!panel) return;

    setOpen((v) => !v);

    const next = !open;
    gsap.to(panel, {
      height: next ? "auto" : 0,
      opacity: next ? 1 : 0,
      y: next ? 0 : -8,
      duration: 0.25,
      ease: "power2.out",
      onStart: () => gsap.set(panel, { pointerEvents: "auto" }),
      onComplete: () => {
        if (!next) gsap.set(panel, { pointerEvents: "none" });
      },
    });
  };

  const goTo = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;


    if (open) toggle();

    ScrollTrigger.refresh();
    gsap.to(window, {
      duration: 1,
      ease: "power3.out",
      scrollTo: { y: el, offsetY: 80 },
    });
  };

  return (
    <nav className="navbar">
  <div className="navbar-wrapper">
    <a className="nav-home" href="#" aria-label="Home">
      <img src="./assets/images/common/icons8-home.svg" alt="" />
    </a>

    <ul className="nav-links">
      {navLinks.map((link) => (
        <li key={link.id}>
          <a href={`#${link.id}`}>{link.label}</a>
        </li>
      ))}
    </ul>
  </div>
</nav>

  );
};

export default Navbar;
