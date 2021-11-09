import { useEffect, useState } from 'react'
import cls from './User.module.css'
import { getRequest } from '../../api/'
import { CgCalendarDates } from 'react-icons/cg'
import Loader from '../../components/UI/Loader'
import { BiSelectMultiple } from 'react-icons/bi'
import { BrowserRouter as Router, NavLink } from 'react-router-dom'
import { FaEdit } from 'react-icons/fa'
import Selected from '../../components/User-coms/Selected'
import { Switch , Route, useHistory } from 'react-router'
import Edit from '../../components/User-coms/Edit'

const User = () => {
    const userID = JSON.parse(localStorage.getItem('user'))
    
    const [loading , setLoading] = useState(false)
    const [base , setBase] = useState([])
    const history = useHistory()

    useEffect(() => {   
        getRequest('users/' , `${userID}.json` , '')
        .then(res => res.json() , setLoading(true))
        .then(r => {
            setLoading(false)
            setBase([r])
        })
    } , [userID])

    const handleOutBtn = () => {
        history.push('/')
        localStorage.removeItem('user')
        window.location.reload()
    }

    return (
        <Router>
            <section className={cls.user}>
                {
                    loading ? <Loader/> : (
                        base.map(({ image , email , name , years , hours , minutes , months , days }) => {
                            return <div key={email} className={cls.user_header}>
                            <div className={cls.user_wrapper}>
                                <div 
                                    style={{background: `url('${image}') center / cover`}} 
                                    className={cls.user_header_image}>
                                </div>
                                <div className={cls.user_header_content}>
                                    <h2>{name}</h2>
                                    <span><CgCalendarDates/> {years}-{months >= 9 ? months + 1 : `0${months + 1}`}-
                                    {days >= 9 ? days : `0${days}`} {hours >= 9 ? hours : `0${hours}`}
                                    :{minutes >= 9 ? minutes : `0${minutes}`}</span>
                                </div>  
                            </div>
                            <div className={cls.user_footer}>
                                <button onClick={handleOutBtn}> Sign out</button>
                            </div>
                        </div>
                        })
                    )
                }
                <div className={cls.user_body}>
                    <div className={cls.user_body_sidebar}>
                        <NavLink exact activeClassName={cls.user_body_sidebar_activeLink} to='/user/selected'>
                            <BiSelectMultiple/>
                            Selected
                        </NavLink>
                        <NavLink exact activeClassName={cls.user_body_sidebar_activeLink} to='/user/edit'>
                            <FaEdit/>
                            Edit
                        </NavLink>
                    </div>
                    <div className={cls.user_body_content}>
                        <div className={cls.user_body_content_content}>
                            <Switch>
                                <Route component={Selected} exact path='/user/selected'/>
                                <Route component={Edit} exact path='/user/edit'/>
                            </Switch>
                        </div>
                    </div>  
                </div>
            </section>
        </Router>
    )
}

export default User