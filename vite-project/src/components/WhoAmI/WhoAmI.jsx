import React, { useRef } from "react";
import "./WhoAmI.scss";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import DirectionalMarquee from "../DirectionalMarquee/DirectionalMarquee";

gsap.registerPlugin(ScrollTrigger);

const WhoAmI = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(
  () => {
    const split = new SplitType(textRef.current, {
      types: "lines",
      lineClass: "line",
    });

    const anim = gsap.fromTo(
      split.lines,
      { yPercent: 40, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 3.2, 
        stagger: 0.6,              
        paused: true,
      }
    );

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 55%",               
      once: true,
      onEnter: () => anim.play(),
      // markers: true,
    });

    return () => {
      anim.kill();
      split.revert();
    };
  },
  { scope: sectionRef }
);



  return (
    <>
     <section className="contact" ref={sectionRef}>
      <p className="split" ref={textRef}>
        I specialize in building scalable, production-ready systems using React,
        Spring Boot, and AWS backed by 3+ years of experience, strong ownership,
        and a focus on production reliability.
      </p>
     
    </section>
    </>
   
  );
};

export default WhoAmI;
