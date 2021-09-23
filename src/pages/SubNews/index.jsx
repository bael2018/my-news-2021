import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getRequest } from '../../api'
import { arrayFunc } from '../../helpers'
import cls from './SubNews.module.css'
import Loader from '../../components/UI/Loader'
import {CgCalendarDates} from 'react-icons/cg'
import Empty from '../../components/UI/Empty'
import { Link } from 'react-router-dom'

const SubNews = () => {
    const [loading , setLoading] = useState(false)
    const [subCategory , setSubCategory] = useState([])
    const [change , setChange] = useState('General')
    const [show , setShow] = useState(false)
    const [news , setNews] = useState([])
    const {id} = useParams()

    useEffect(() => {
        setChange('General')
        getRequest('subcategories.json' , '' , '')
        .then(res => res.json())
        .then(r => {
            const result = arrayFunc(r)
            const filteredResult = result.filter(({category}) => category === id)
            setSubCategory(filteredResult)
        })
    } , [id])

    useEffect(() => {
        getRequest('news.json' , '' , '')
        .then(res => res.json() , setLoading(true))
        .then(r => {
            setLoading(false)
            const news = arrayFunc(r)
            const dataNews = news.filter(({category}) => category === id)
            if(change === 'General'){
                setNews(dataNews)
            }else{
                const filteredNews = dataNews.filter(({subcategory}) => subcategory === change)
                setNews(filteredNews)
            }
        })
    } , [change , id])

    return (
        <section className={cls.root}>
            <div className={cls.root_header}>
                <h2>{id}</h2>
                <span onClick={() => setShow(!show)}>
                    <h3>{change}</h3>
                    <div    
                        style={{
                            height: show ? '100px' : '0',
                            bottom: show ? '-290%' : '0'
                        }}
                    >
                        <p onClick={() => setChange('General')}>General</p>
                        {
                            subCategory.map(({id , title}) => {
                                return <p 
                                    onClick={() => setChange(title)} 
                                    key={id}>{title}
                                </p>
                            })
                        }
                    </div>
                </span>
            </div>

            <div className={cls.root_body}>
                {
                    loading ? <Loader/> : (
                        news.length === 0 ? <Empty/> : (
                            news.map(({title , id , days , month , year , picture , content , subcategory}) => {
                                return <Link to={`/news/${id}`} className={cls.root_body_inner} key={id}>
                                    <div className={cls.root_body_inner_picture}>
                                        <span>{subcategory}</span>
                                        <img src={picture} alt="innerImage" />
                                    </div>
                                    <div className={cls.root_body_inner_content}>
                                        <h2>{title}</h2>
                                        <span>
                                            <CgCalendarDates/> 
                                            {year}-
                                            {month >= 10 ? month + 1 : `0${month + 1}`}-
                                            {days >= 10 ? days : `0${days}`}
                                        </span>
                                        <p>{content}</p>
                                    </div>
                                </Link>
                            })
                        )
                    )
                }
            </div>
        </section>
    )
}

export default SubNews