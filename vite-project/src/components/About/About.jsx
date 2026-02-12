// About.jsx
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import "./About.scss";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const About = () => {
    const rootRef = useRef(null);
    const tlRef = useRef(null);
    const splitRef = useRef(null);

    useGSAP(() => {
        const root = rootRef.current;
        if (!root) return;

        const build = () => {
            // cleanup
            tlRef.current?.kill();
            splitRef.current?.revert();
            splitRef.current = null;

            ScrollTrigger.getAll()
                .filter(
                    (st) =>
                        st.vars?.id === "aboutWaypoints" ||
                        st.vars?.id === "aboutTitleReveal"
                )
                .forEach((st) => st.kill());

            const box = root.querySelector(".box");
            const start = root.querySelector(".main");
            const title = root.querySelector(".spacer");
            const endEl = root.querySelector(".spacer.final");

            if (!box || !start || !title || !endEl) return;

            // --- TITLE REVEAL (MY JOURNEY) ---
            splitRef.current = new SplitType(title, { types: "chars" });

            gsap.set(splitRef.current.chars, { y: 115, opacity: 0 });

            gsap.to(splitRef.current.chars, {
                y: 0,
                opacity: 1,
                duration: 1.7,
                ease: "power3.out",
                stagger: 0.04,
                scrollTrigger: {
                    id: "aboutTitleReveal",
                    trigger: title,
                    start: "top 75%",
                    toggleActions: "play none none reverse",
                    invalidateOnRefresh: true,
                    // markers: true,
                },
            });

            // --- ROCKET PATH ---
            const boxStartRect = box.getBoundingClientRect();
            const containers = gsap.utils.toArray(
                root.querySelectorAll(".container:not(.initial)")
            );

            const points = containers.map((container) => {
                const marker = container.querySelector(".marker") || container;
                const r = marker.getBoundingClientRect();
                return {
                    x:
                        r.left +
                        r.width / 2 -
                        (boxStartRect.left + boxStartRect.width / 2),
                    y:
                        r.top +
                        r.height / 2 -
                        (boxStartRect.top + boxStartRect.height / 2),
                };
            });

            tlRef.current = gsap.timeline({
                scrollTrigger: {
                    id: "aboutWaypoints",
                    trigger: start,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1,
                    
                },
            });


            tlRef.current.to(box, {
                duration: 1,
                ease: "none",
                motionPath: {
                    path: points,
                    curviness: 1.5,
                },
            });

            ScrollTrigger.refresh();
        };

        build();
        window.addEventListener("resize", build);

        return () => {
            window.removeEventListener("resize", build);
            splitRef.current?.revert();
            tlRef.current?.kill();
        };
    }, []);

    return (
        <section className="aboutWaypoints" ref={rootRef}>
            <video className="aboutBgVideo" autoPlay muted loop playsInline preload="auto">
                <source src="/assets/videos/globeVideo.mp4" type="video/mp4" />
            </video>

            <div className="aboutBgOverlay" />

            <div className="main">
                <h1 className="spacer">MY JOURNEY</h1>

                <div className="container initial">
                    <div className="box" />
                </div>
                <div className="container inner-wrapper">
                    <div className="container second">
                        {/* <div className="marker" /> */}
                        <img className="marker" src="/assets/images/cdw-logo.png" alt="plane" />
                    </div>
                    <h1>FROM A CURIOUS CHILD TO A SKILLED DEVELOPER</h1>
                </div>
                <div className="container third">
                    <div className="marker" />
                </div>
                <div className="container fourth">
                    <div className="marker" />
                </div>
                <div className="container fifth">
                    <div className="marker" />
                </div>
            </div>

            <div className="spacer final" />
        </section>
    );
};

export default About;
