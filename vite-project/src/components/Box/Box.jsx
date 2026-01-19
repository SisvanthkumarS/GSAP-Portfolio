import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import './Box.scss'

export default function Box() {
  const boxRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(boxRef.current,{
        x: 0,
        rotate: 0,
        borderRadius: '0%',
      }, {
        x: 270,
        repeat: -1,
        yoyo: true,
        borderRadius: '100%',
        rotate: 360,
        duration: 2,
        ease: 'bounce.Out',
      })
    }, boxRef)

    return () => ctx.revert()
  }, [])


  return (
    <div
      ref={boxRef}
        className="box"
    />
  )
}
