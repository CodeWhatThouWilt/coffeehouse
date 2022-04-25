import './SplashFooter.css';
import { DiReact, DiGithubBadge, DiJavascript1, DiVisualstudio } from 'react-icons/di';
import { SiSequelize, SiCss3, SiExpress, SiPostgresql, SiRedux, SiSocketdotio } from 'react-icons/si';
import { AiFillHtml5 } from 'react-icons/ai';
import { GiPull } from 'react-icons/gi';
import { FaNodeJs, FaToiletPaper } from 'react-icons/fa'
import { useState } from 'react';

const SplashFooter = () => {
    const [showFooter, setShowFooter] = useState(false);

    const stylingHandler = () => {
        if (showFooter) {
            return { left: '0vw' }
        } else {
            return { left: '100vw' }
        };
    };

    const clickHandler = () => {

    };

    return (
        <div className='footer-container' style={stylingHandler()}>
            <div onClick={() => setShowFooter(!showFooter)} className='footer-pull'>
                <GiPull />
            </div>
            <SiRedux />
            <AiFillHtml5 />
            <SiCss3 />
            <SiExpress />
            <SiSequelize />
            <SiPostgresql />
            <DiReact />
            <DiJavascript1 />
            <FaNodeJs />
            <DiVisualstudio />
            <SiSocketdotio />
        </div>
    );
};

export default SplashFooter