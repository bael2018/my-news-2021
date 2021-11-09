import cls from './Recommend.module.css'
import { BiNews } from 'react-icons/bi'
import { useEffect, useState } from 'react'
import Loader from '../UI/Loader'
import { getRequest } from '../../api'
import { arrayFunc } from '../../helpers'
import { NavLink } from 'react-router-dom'

const Recommend = () => {
    const [base , setBase] = useState([])
    const [loading , setLoading] = useState(false)

    useEffect(() => {
        getRequest('news.json' , '' , '')
        .then(res => res.json() , setLoading(true))
        .then(r => {
            setLoading(false)
            const data = arrayFunc(r)
            const filteredArray = data.filter(({subcategory}) => subcategory === 'Daily')
            setBase(filteredArray)
        })
    } , [])

    return (
        <section className={cls.sticky}>
            <h3 className={cls.sticky_header}><BiNews/> DAILY</h3>
            <div className={cls.sticky_header_body}>
                {
                    loading ? <Loader/> : (
                        base.map(({content , id}) => {
                            return <NavLink activeClassName={cls.sticky_header_body_inner_link} to={`/news/${id}`} key={id} className={cls.sticky_header_body_inner}>
                            <p>{content}</p>
                        </NavLink>
                        })
                    )
                }
            </div>
        </section>
    )
}

export default Recommend