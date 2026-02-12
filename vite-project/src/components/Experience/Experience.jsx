// src/components/Experience/Experience.jsx
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./Experience.scss";
import ExperienceCard from "../ExperienceCard/ExperienceCard.jsx";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
    {
        title: "Velammal Institute of Technology",
        meta: "Jul 2018 – May 2022",
        preview:
            "• B.Tech (IT)" + "\n" + "• Coursework: Data Structures and Algorithms, Operating Systems, Database Systems, Cloud Computing\n" +
            "• Published AIP paper on ML-based robot navigation.",
        full:
            "• B.Tech in Information Technology" + "\n" + "• Coursework: Data Structures and Algorithms, Operating Systems, Database Systems, Cloud Computing.\n" +
            "• Published an AIP research paper on Machine Learning in Autonomous Navigation of Mobile Robots.\n" +
            "• Selected as a TCS Student Ambassador and led student initiatives."

    },

    {
        title: "Software Engineer Intern — CDW (India)",
        meta: "Feb 2022 – Jun 2022",
        preview:
            "• Built full-stack features for an internal social platform. Automated birthday scheduler which increased 40% daily engagement.",
        full:
            "• Built full-stack features using ReactJS, Java, and Spring Boot for an internal social platform.\n" +
            "• Implemented an automated birthday notification scheduler using calendar-linked data, boosting daily engagement by ~40%.\n" +
            "• Shipped production-ready UI + backend features contributing to scalable workflows and improved reliability.",
    },

    {
        title: "Software Engineer — CDW (India)",
        meta: "Jun 2022 – Oct 2024",
        preview:
            "Owned full-stack delivery, contributed to hiring, and led front-end workshops across multiple universities.",
        full:
            "• Full-stack delivery (backend + UI) with production readiness focus.\n" +
            "• Hiring team contributor: screened/evaluated candidates.\n" +
            "• Led FE workshops across multiple universities.",
    }

    ,

    {
        title: "New York University",
        meta: "2025 – Present",
        preview:
            "MS CS" + "\n" +
            "• Coursework: Design Analysis of Algorithms , HCI, Java, Cloud Computing, Big Data, Information Visualization",
        full:
            "• MS in Computer Science (NYU Tandon)" + "\n" +
            "• Coursework: Design & Analysis of Algorithms, Human-Computer Interaction, Java, Cloud Computing, Big Data, Information Visualization.\n" +
            "• Actively seeking internship and full-time opportunities."
    },
];



const Experience = () => {
    const containerRef = useRef(null);

    useGSAP(
        () => {
            const container = containerRef.current;
            if (!container) return;

            const timelineEl = container.querySelector(".timeline");
            const items = gsap.utils.toArray(container.querySelectorAll(".exp-item"));
            const fill = container.querySelector(".line-fill");

            ScrollTrigger.getAll()
                .filter((st) => st.vars?.id === "expTimeline")
                .forEach((st) => st.kill());

            const maxIdx = Math.max(0, items.length - 1);
            const snapToStep = gsap.utils.snap(1 / Math.max(1, maxIdx));
            const pxPerStep = 650;

            gsap.set(fill, { scaleY: 0, transformOrigin: "top" });

            const setActive = (idx) => {
                items.forEach((el, i) => el.classList.toggle("is-active", i === idx));
            };
            setActive(0);

            let lastIdx = 0;

            ScrollTrigger.create({
                id: "expTimeline",
                trigger: timelineEl,
                start: "top top",
                end: () => `+=${maxIdx * pxPerStep}`,
                scrub: true,
                pin: true,
                pinSpacing: true,
                anticipatePin: 1,



                onUpdate: (self) => {
                    gsap.set(fill, { scaleY: self.progress });

                    const idx = gsap.utils.clamp(
                        0,
                        maxIdx,
                        Math.round(self.progress * maxIdx)
                    );

                    if (idx !== lastIdx) {
                        lastIdx = idx;
                        setActive(idx);
                    }
                },

                // markers: true,
            });
        },
        { scope: containerRef }
    );

    return (
        <section className="exp-section" ref={containerRef}>
            <div className="exp-header">
                <span className="line" />
                <h2>MY JOURNEY</h2>
                <span className="line" />
            </div>

            <div className="timeline">
                <div className="line-wrap">
                    <div className="line-base" />
                    <div className="line-fill" />
                </div>

                {experiences.map((e, idx) => (
                    <div
                        className={`exp-item ${idx % 2 === 0 ? "left" : "right"}`}
                        key={idx}
                    >
                        <ExperienceCard
                            title={e.title}
                            meta={e.meta}
                            preview={e.preview}
                            full={e.full}
                        />
                        <div className="exp-dot" />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Experience;
