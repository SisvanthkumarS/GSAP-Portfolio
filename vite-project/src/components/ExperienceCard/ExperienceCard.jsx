import React, { useState, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // ✅ add this
import "./ExperienceCard.scss";

const ExperienceCard = (props) => {
  const [open, setOpen] = useState(false);
  const scrollRef = useRef(null);
  const hasMore = Boolean(props.full && props.full.trim().length);

  const stopScrollTrigger = (e) => {
    if (!open) return;
    const el = scrollRef.current;
    if (el && el.scrollHeight > el.clientHeight) e.stopPropagation();
  };

  const toggle = () => {
    setOpen((v) => {
      const next = !v;

      // ✅ freeze timeline while card is open, resume when closed
      const st = ScrollTrigger.getById("expTimeline");
      if (st) {
        if (next) st.disable(false); // keep pinned state, stop updates
        else st.enable(false);
      }

      return next;
    });
  };

  return (
    <div className={`exp-card ${open ? "open" : ""}`}>
      <h3 className="exp-title">{props.title}</h3>
      <span className="exp-meta">{props.meta}</span>

      <div
        className="exp-descWrap"
        ref={scrollRef}
        onWheelCapture={stopScrollTrigger}
        onTouchMoveCapture={stopScrollTrigger}
      >
        <p className="exp-descText">{open && hasMore ? props.full : props.preview}</p>
      </div>

      {hasMore && (
        <button className="exp-toggle" type="button" aria-expanded={open} onClick={toggle}>
          {open ? "Read less" : "Read more"} <span className="arrow" aria-hidden>›</span>
        </button>
      )}
    </div>
  );
};

export default ExperienceCard;
