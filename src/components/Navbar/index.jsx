import cls from './Navbar.module.css'
import Logo from '../UI/Logo'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { RiSearch2Line } from 'react-icons/ri'
import {FaUserCircle} from 'react-icons/fa'
import { getRequest } from '../../api'
import { GrClose } from 'react-icons/gr'
import { arrayFunc } from '../../helpers'
import { AiOutlineBars } from 'react-icons/ai'

const Navbar = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const [scroll , setScroll] = useState(false)
    const [bar , setBar] = useState(false)
    const [cat , setCat] = useState([])
    const [image , setImage] = useState('')

    useEffect(() => {
        if(user){
            getRequest('users/' ,  `${user}.json` , '')
            .then(res => res.json())
            .then(r => {
                setImage(r.image)
            })
        }
    }, [user])

    useEffect(() => {
        getRequest('categories.json' , '' , '')
        .then(res => res.json())
        .then(r => {
            const data = arrayFunc(r)
            const slicedArray = data.slice(0 , 7)
            setCat(slicedArray)
        })
    } , [])

    window.onscroll = () => {
        if(window.scrollY > 250){
            setScroll(true)
        }else{
            setScroll(false)
        }
    }

    return (
        <>
            <div 
                className={bar ? cls.leftBar_cover : `${cls.leftBar_cover} ${cls.leftBar_cover_active}`}
            ></div>
            <div 
                className={bar ? cls.leftBar : `${cls.leftBar} ${cls.leftBar_active}`}
                onClick={() => setBar(false)}
            >
                <div className={cls.leftBar_inside}>
                    <span className={cls.leftBar_icon} onClick={() => setBar(prev => !prev)}>
                        <GrClose/>
                    </span>
                    <NavLink style={{textDecoration: 'none'}} exact to='/'><Logo/></NavLink> 
                </div>
                <div className={cls.leftBar_link}>
                    {
                        cat.map(({ title , id }) => {
                            return <NavLink 
                                key={id} 
                                activeClassName={cls.activeLink} 
                                exact to={`/${title}`}
                            > {title}
                            </NavLink>
                        })
                    }
                </div>
            </div>
           <section 
            className={cls.navbar}
            style={{boxShadow: scroll ? '0px 0px 3px 3px #dadada' : null}}
            >
            <div className={cls.navbar_left}>
                <div className={cls.navbar_btn} onClick={() => setBar(prev => !prev)}>
                    <AiOutlineBars/>
                </div>
                <NavLink className={cls.logo_clear} style={{textDecoration: 'none'}} exact to='/'><Logo/></NavLink>
            </div>
            <div className={cls.navbar_middle}>
                {
                    cat.map(({ title , id }) => {
                        return <NavLink 
                            key={id} 
                            activeClassName={cls.activeLink} 
                            exact to={`/${title}`}
                        > {title}
                        </NavLink>
                    })
                }
            </div>
            <div className={cls.navbar_right}>
                <NavLink exact to='/search'><RiSearch2Line/></NavLink>
                <NavLink exact to={user ? '/user' : '/auth'}>
                    {
                        user ? <img src={`${image}`} alt="user" />
                        : <FaUserCircle/>
                    }
                </NavLink>
            </div>
        </section>
        </>
    )
}

export default Navbar