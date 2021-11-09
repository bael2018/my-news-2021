import { useEffect, useState } from 'react'
import { getRequest } from '../../api'
import Banner from '../../components/UI/Banner'
import { arrayFunc } from '../../helpers'
import cls from './Main.module.css'
import Loader from '../../components/UI/Loader'
import {Link} from 'react-router-dom'

const Main = () => {
    const [featuredArray , setFeaturedArray] = useState([])
    const [tourismArray , setTourismArray] = useState([])
    const [techArray , setTechArray] = useState([])
    const [recentArray , setRecentArray] = useState([])
    const [topArray , setTopArray] = useState([])
    const [loading , setLoading] = useState(false)

    const [recent , setRecent] = useState([])
    const [top , setTop] = useState([])

    useEffect(() => {
        getRequest('news.json' , '' , '')
        .then(res => res.json() , setLoading(true))
        .then(r => {
            setLoading(false)
            const data = arrayFunc(r)

            const DataTop = data.filter(({subcategory}) => subcategory === 'Top')
            const filteredDataTop = DataTop.slice(1 , 6)
            setTop([DataTop[0]])
            setTopArray(filteredDataTop)

            const DataRecent = data.filter(({subcategory}) => subcategory === 'Recent')
            const filteredDataRecent = DataRecent.slice(1 , 3)
            setRecent([DataRecent[0]])
            setRecentArray(filteredDataRecent)

            const DataTourism = data.filter(({subcategory}) => subcategory === 'Tourism')
            const filteredDataTourism = DataTourism.slice(0 , 10)
            setTourismArray(filteredDataTourism)

            const DataTech = data.filter(({subcategory}) => subcategory === 'Tech')
            const filteredDataTech = DataTech.slice(0 , 10)
            setTechArray(filteredDataTech)

            const DataFeatured = data.filter(({subcategory}) => subcategory === 'Featured')
            const filteredDataFeatured = DataFeatured.slice(0 , 8)
            setFeaturedArray(filteredDataFeatured)
        })
    } , [])

    return (
        <section className={cls.main}>
            <Banner/>
            <div className={cls.main_container}>
                {
                    loading ? <Loader/> : (
                        <div className={cls.main_wrapper}>
                        <div className={cls.main_wrapper_block}>
                            <h4 className={cls.main_wrapper_block_header}>Recent</h4>
                            {
                                recent.map(({title , id , picture}) => {
                                    return <div key={id} className={cls.main_wrapper_block_upper}>
                                    <div className={cls.main_wrapper_block_upper_picture}>
                                        <img src={picture} alt="inner" />
                                    </div>
                                    <Link to={`/news/${id}`}>{title}</Link>
                                </div>
                                })
                            }
                            {
                                recentArray.map(({title , id , picture}) => {
                                    return <div key={id} className={cls.main_wrapper_block_inner}>
                                    <div className={cls.main_wrapper_block_inner_image}>
                                        <img src={picture} alt="inner" />
                                    </div>  
                                    <div className={cls.main_wrapper_block_inner_content}>
                                        <Link to={`/news/${id}`} >{title}</Link>
                                    </div>
                                </div>
                                })
                            }
                        </div>
                        <div className={cls.main_wrapper_child}>
                            <h4 className={cls.main_wrapper_child_header}>Top</h4>  
                            {
                                top.map(({title , id , picture}) => {
                                    return <div key={id} className={cls.main_wrapper_child_upper}>
                                    <div className={cls.main_wrapper_child_upper_picture}>
                                        <img src={picture} alt="inner" />
                                    </div>
                                    <Link to={`/news/${id}`} >{title}</Link>
                                </div>
                                })
                            }
                            {
                                topArray.map(({title , id , picture}) => {
                                    return <div key={id} className={cls.main_wrapper_child_body}>
                                    <div className={cls.main_wrapper_child_body_image}>
                                        <img src={picture} alt="inner" />
                                    </div>  
                                    <div className={cls.main_wrapper_child_body_content}>
                                        <Link to={`/news/${id}`} >{title}</Link>
                                    </div>
                                </div>
                                })
                            }
                        </div>
                        <div className={`${cls.main_wrapper_child} ${cls.main_wrapper_child_alt}`}>
                            <h4 style={{marginBottom: '10px'}} className={cls.main_wrapper_child_header}>Featured</h4>  
                            {
                                featuredArray.map(({title , id , picture}) => {
                                    return <div key={id} className={cls.main_wrapper_child_body}>
                                    <div className={cls.main_wrapper_child_body_image}>
                                        <img src={picture} alt="inner"/>
                                    </div>  
                                    <div className={cls.main_wrapper_child_body_content}>
                                        <Link to={`/news/${id}`} >{title}</Link>
                                    </div>
                                </div>
                                })
                            }
                        </div>  
                    </div>
                    )
                }
            </div>

            <div className={cls.main_middle}>
                <h1 className={cls.main_middle_title}>Tourism</h1>
                {
                    loading ? <Loader/> : (
                        tourismArray.map(({title , id , picture}) => {
                            return <div key={id} className={cls.main_middle_wrapper}>
                            <div className={cls.main_middle_wrapper_picture}>
                                <img src={picture} alt="itemImage" />
                            </div>
                            <div className={cls.main_middle_wrapper_content}>
                                <Link to={`/news/${id}`}>{title}</Link>
                            </div>
                        </div>
                        })
                    )
                }
            </div>

            <div className={cls.main_middle}>
                <h1 className={cls.main_middle_title}>Tech</h1>
                {
                    loading ? <Loader/> : (
                        techArray.map(({title , id , picture}) => {
                            return <div key={id} className={cls.main_middle_wrapper}>
                            <div className={cls.main_middle_wrapper_picture}>
                                <img src={picture} alt="itemImage" />
                            </div>
                            <div className={cls.main_middle_wrapper_content}>
                                <Link to={`/news/${id}`}>{title}</Link>
                            </div>
                        </div>
                        })
                    )
                }
            </div>
        </section>
    )
}

export default Main