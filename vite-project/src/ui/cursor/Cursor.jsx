import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./cursor.scss";

export default function Cursor() {
    const dotRef = useRef(null);

    useEffect(() => {
        const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

        const move = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        window.addEventListener("mousemove", move);

        gsap.ticker.add(() => {
            gsap.set(dotRef.current, {
                x: mouse.x,
                y: mouse.y
            });
        });


        return () => {
            window.removeEventListener("mousemove", move);
        };
    }, []);

    return (
        <>
            <div ref={dotRef} className="cursor-dot" />
        </>
    );
}