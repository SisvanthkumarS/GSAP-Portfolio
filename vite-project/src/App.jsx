import React from 'react'
import gsap from 'gsap'

import { ScrollTrigger, SplitText } from 'gsap/all';
import Box from './components/Box/Box'
import Cursor from './ui/cursor/Cursor';
import Navbar from './components/NavBar/Navbar';

gsap.registerPlugin(ScrollTrigger, SplitText);
const App = () => {
    return (
        <>
            <Cursor />
            <Navbar/>
            {/* <Box /> */}
        </>
    )
}

export default App
