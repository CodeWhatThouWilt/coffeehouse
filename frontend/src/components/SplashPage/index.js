import './SplashPage.css';
import topBackground from '../../assets/splash-top-background.svg';
import background from '../../assets/auth-background.svg';
import sparkle from '../../assets/splash-page-sparkle.svg';
import secondBackground from '../../assets/splash-page-background.svg'
import SplashFooter from '../SplashFooter';
import { DiGithubBadge } from 'react-icons/di';
import coffeehouse from '../../assets/Coffeehouse.svg';
import { Link } from 'react-router-dom';
import { TiSocialLinkedinCircular } from 'react-icons/ti';

const SplashPage = () => {

    return (
        <div className='splash-page-container'>

            <div className='splash-mid-container'>
                <Link to='/login' className='splash-login'>Login</Link>
                <div style={{ backgroundImage: `url(${coffeehouse})` }} className='coffeehouse-logo'></div>
                <Link to='/signup' className='splash-signup'>Sign up</Link>
            </div>

            <div className='splash-about-container'>
                Coffeehouse is a lightweight discord clone that
                allows users to message each other in live time using
                socket.io
            </div>


            <div className='github-link'>
                <a href='https://github.com/CodeWhatThouWilt/coffeehouse'>
                    <DiGithubBadge />
                    <span className='github-text'>GITHUB</span>
                </a>
            </div>

            <div className='linkedin-link'>
                <a href='https://www.linkedin.com/in/jacob-north-9b1266226/'>
                    <TiSocialLinkedinCircular />
                    <span className='github-text'>LINKEDIN</span>
                </a>
            </div>

            <div
                style={{ backgroundImage: `url(${sparkle})` }}
                className='splash-top-background-top'>
            </div>
            <div
                style={{ backgroundImage: `url(${secondBackground})` }}
                className='splash-top-background-bottom'>
            </div>
            <SplashFooter />
        </div>
    );
};

export default SplashPage;