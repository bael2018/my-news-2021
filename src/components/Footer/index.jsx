import cls from './Footer.module.css'
import Logo from '../../components/UI/Logo'
import { AiFillFacebook } from 'react-icons/ai'
import { TiSocialInstagram } from 'react-icons/ti'
import { FaTwitterSquare } from 'react-icons/fa' 
import { IoLogoYoutube } from 'react-icons/io' 

const Footer = () => {
    return (
        <section className={cls.footer}>
            <div className={cls.footer_wrapper}>
                <div className={cls.footer_wrapper_logo}>
                    <Logo/>
                </div>
                <div className={cls.footer_wrapper_content}>
                    <h3>Our Socials</h3>
                    <ul>
                        <li>
                            <a
                                rel="noreferrer"
                                href="https://www.facebook.com/"
                                target='_blank'
                            >
                                <AiFillFacebook/>
                            </a>
                        </li>
                        <li>
                            <a 
                                rel="noreferrer"
                                href="https://www.instagram.com/"
                                target='_blank'
                            >
                                <TiSocialInstagram/>
                            </a>
                        </li>
                        <li>
                            <a 
                                rel="noreferrer"
                                href="https://twitter.com/"
                                target='_blank'
                            >
                                <FaTwitterSquare/>
                            </a>
                        </li>
                        <li>
                            <a 
                                rel="noreferrer"
                                href="https://www.youtube.com/"
                                target='_blank'
                            >
                                <IoLogoYoutube/>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default Footer