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
    const [view , setView] = useState(false)
    const { id } = useParams()

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

                <div className={cls.root_header_inside}>
                    <div className={cls.root_header_inside_inner}>
                        <div 
                            onClick={() => setView(false)}
                            className={view ? cls.linear_child : `${cls.linear_child} ${cls.linear_child_active}`}
                        >
                            <span></span><span></span><span></span>
                            <span></span><span></span><span></span>
                        </div>
                        <div 
                            onClick={() => setView(true)}
                            className={view ? `${cls.vertical_child} ${cls.vertical_child_active}` : cls.vertical_child}
                        >
                            <span></span><span></span><span></span>
                        </div>
                    </div>  
                    <span className={cls.drop} onClick={() => setShow(!show)}>
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
            </div>

            <div className={view ? `${cls.root_body} ${cls.root_body_active}` : cls.root_body}>
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
                                            {month >= 9 ? month + 1 : `0${month + 1}`}-
                                            {days >= 9 ? days : `0${days}`}
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