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
                            <a href="/">
                                <AiFillFacebook/>
                            </a>
                        </li>
                        <li>
                            <a href="/">
                                <TiSocialInstagram/>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <FaTwitterSquare/>
                            </a>
                        </li>
                        <li>
                            <a href="">
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