import cls from './Search.module.css'
import { BiChevronsDown } from 'react-icons/bi'
import { RiSearch2Line } from 'react-icons/ri'
import Recommend from '../../components/Recommend'
import Loader from '../../components/UI/Loader'
import { getRequest } from '../../api'
import {arrayFunc} from '../../helpers'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Search = () => {
    const [clicked , setClicked] = useState(false)
    const [value , setValue] = useState('')
    const [deps , setDeps] = useState('title')
    const [loading , setLoading] = useState(false)
    const [searchData , setSearchData] = useState([])
    const [begin , setBegin] = useState(false)

    const handleSearch = () => {
        setBegin(true)
        getRequest('news.json' , '' , '')
        .then(res => res.json() , setLoading(true))
        .then(r => {
            setLoading(false)
            const data = arrayFunc(r)

            switch (deps) {
                case 'title':
                    const filteredTitle = data
                    .filter(({title}) => title
                    .toLowerCase().
                    includes(value.toLowerCase()))
                    setSearchData(filteredTitle)
                    setValue('')
                    break
                case 'category':
                    const filteredCategory = data
                    .filter(({category}) => category
                    .toLowerCase().
                    includes(value.toLowerCase()))
                    setSearchData(filteredCategory)
                    setValue('')
                    break
                case 'subcategory':
                    const filteredSubcategory = data
                    .filter(({subcategory}) => subcategory
                    .toLowerCase().
                    includes(value.toLowerCase()))
                    setSearchData(filteredSubcategory)
                    setValue('')
                    break
                default:
                    break;
            }
        })
    }

    return (
        <div className={cls.search}>
            <div className={cls.search_left}>
                <div className={cls.search_header}>
                    <span>
                        <input 
                            value={value} 
                            onChange={e => setValue(e.target.value)} 
                            placeholder='search' type="text" 
                        />
                        <button onClick={handleSearch}><RiSearch2Line/></button>
                    </span>

                    <div onClick={() => setClicked(!clicked)}>
                        <h3>{deps} <BiChevronsDown/></h3>
                        <ul
                            style={{
                                height: clicked ? '130px' : '0',
                                bottom: clicked ? '-248%' : '0'
                            }}
                        >
                            <li onClick={() => setDeps('title')}>title</li>
                            <li onClick={() => setDeps('category')}>category</li>
                            <li onClick={() => setDeps('subcategory')}>subcategory</li>
                        </ul>
                    </div>
                </div>
                <div className={cls.search_body}>
                    {
                        begin ? (
                            loading ? <Loader/> : (
                                <>
                                     {
                                         searchData.length === 0 ? (
                                             <div className={cls.isEmpty}>
                                                 <h1>Something went wrong!</h1>
                                             </div>
                                         ) : (
                                             searchData.map(({id , title , picture , content , subcategory}) => {
                                                 return <div className={cls.search_body_inner} key={id}>
                                                    <div className={cls.search_body_inner_image}>
                                                        <span>{subcategory}</span>
                                                        <img src={picture} alt="innerImage" />
                                                    </div>
                                                    <div className={cls.search_body_inner_content}>
                                                        <Link to={`/news/${id}`}>{title}</Link>
                                                        <p>{content}</p>
                                                    </div>
                                                 </div>
                                             })
                                         )
                                     }
                                </>
                             )
                        ) : (
                            <div className={cls.begin}>
                                <h1>Find your news !</h1>
                            </div>
                        )
                    }
                </div>      
            </div>
            <Recommend/>
        </div>
    )
}

export default Search