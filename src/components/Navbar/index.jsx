import cls from './Navbar.module.css'
import Logo from '../UI/Logo'
import {AiOutlineBars} from 'react-icons/ai'
import Sidebar from '../Sidebar'
import { useDispatch } from 'react-redux'
import { MdClose } from 'react-icons/md'
import { useEffect, useState } from 'react'
import { sidebarAction } from '../../redux/actions'
import { NavLink } from 'react-router-dom'
import { RiSearch2Line } from 'react-icons/ri'
import {FaUserCircle} from 'react-icons/fa'
import { getRequest } from '../../api'
import { arrayFunc } from '../../helpers'

const Navbar = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const [scroll , setScroll] = useState(false)
    const [cat , setCat] = useState([])
    const [btn , setBtn] = useState(true)
    const [image , setImage] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        if(user){
            getRequest('users/' ,  `${user}.json` , '')
            .then(res => res.json())
            .then(r => {
                setImage(r.image)
            })
        }
    }, [user])

    const handleBurger = () => {
        setBtn(!btn)
        dispatch(sidebarAction())
    }

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
        <section 
            className={cls.navbar}
            style={{boxShadow: scroll ? '0px 0px 3px 3px #dadada' : null}}
        >
            <div className={cls.navbar_left}>
                {
                    btn ? (
                        <AiOutlineBars onClick={handleBurger} className={cls.sidebar_btn}/>
                    ) : (
                        <MdClose onClick={handleBurger} className={cls.sidebar_btn}/>
                    )
                }
                <Sidebar/>
                <NavLink style={{textDecoration: 'none'}} exact to='/'><Logo/></NavLink>
            </div>
            <div className={cls.navbar_middle}>
                {
                    cat.map(({title , id}) => {
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
                        user ? <img src={`${image}`} alt="userPicture" />
                        : <FaUserCircle/>
                    }
                </NavLink>
            </div>
        </section>
    )
}

export default Navbar