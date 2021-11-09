import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { changeRequest, deleteRequest, getRequest, postRequest } from '../../api'
import Recommend from '../../components/Recommend'
import Loader from '../../components/UI/Loader'
import cls from './Single.module.css'
import { CgCalendarDates } from 'react-icons/cg'
import { AiFillHeart , AiOutlineComment} from 'react-icons/ai'
import { arrayFunc, arrayFuncAlt } from '../../helpers'
import { MdClose } from 'react-icons/md'
import { Link } from 'react-router-dom'

const Single = () => {
    const userInfo = JSON.parse(localStorage.getItem('user'))
    const [commentBase , setCommentBase] = useState([])
    const [loading , setLoading] = useState(false)
    const [newShow , setNewShow] = useState(false)
    const [react , setReact] = useState(false)
    const [comment , setComment] = useState('')
    const [base , setBase] = useState([])
    const [select , setSelect] = useState([])
    const [isLiked , setIsLiked] = useState(true)
    const [like , setLike] = useState(0)
    const { newID } = useParams()

    useEffect(() => {
        getRequest('news/' , `${newID}.json` , '')
        .then(res => res.json() , setLoading(true))
        .then(r => {
            setLoading(false)
            setLike(r.likes)
            setBase([r])
        })
    } , [newID , newShow])

    const handleComment = () => {
        const data = new Date()
        const year = data.getFullYear()
        const month = data.getMonth()
        const hours = data.getHours()
        const minutes = data.getMinutes()
        const days = data.getDate()

        getRequest('users/' , `${userInfo}.json` , '')
        .then(res => res.json())
        .then(r => {
            const name = r.name
            const image = r.image

            postRequest({
                text: comment,
                year,
                month,
                hours,
                minutes,
                days,
                user: name,
                picture: image,
                del: userInfo
            }
            , 'news/' , `${newID}/`, 'comments.json'
            )
            setComment('')
            setReact(!react)
        })
    }

    useEffect(() => {
        getRequest('news/' , `${newID}/` , 'comments.json')
        .then(result => result.json())
        .then(item => {
            if(item){
                const data = arrayFunc(item)
                setCommentBase(data) 
            }else{
                setCommentBase([])
            }
        })
    } , [react , newID])

    const handleDeleteBtn = id => {
        deleteRequest('news/' , `${newID}/` , 'comments/' , `${id}.json`)
        .then(() => {
            setReact(!react)
        })
    }

    const handleNew = id => {
        isLiked ? (
            changeRequest(
            {
                likes: like + 1
            },
            'news/',
            `${id}.json`,
            '',
            )
            .then(() => setNewShow(!newShow) , setIsLiked(false))
        ) : (
            changeRequest(
            {
                likes: like - 1
            },
            'news/',
            `${id}.json`,
            '',
            )
            .then(() => setNewShow(!newShow) , setIsLiked(true))
        )
    }

    const handleRead = (el , id) => {
        const data = {
            ...el ,
            id: id
        }

        postRequest(data , 'users/' , `${userInfo}/` , 'selected.json')
        .then(() => setNewShow(!newShow))
    }

    useEffect(() => {
        getRequest('users/' , `${userInfo}/` , 'selected.json')
        .then(res => res.json())
        .then(r => {
            if(r){
                const data = arrayFuncAlt(r)
                setSelect(data)
            }
        })
    } , [newShow])

    return (
        <section className={cls.new}>
            {
                loading ? <Loader/> : (
                    base.map((item) => {
                        return <div key={newID} className={cls.new_child}>
                            <div className={cls.new_child_header}>
                                <h5>{item.subcategory}</h5>
                                <h1>{item.title}</h1>
                                <span>
                                    <CgCalendarDates/> 
                                    {item.year}-{item.month >= 9 ? item.month + 1 : `0${item.month + 1}`}
                                    -{item.days >= 9 ? item.days : `0${item.days}`} {item.hours >= 9 ? item.hours : `0${item.hours}`}:
                                    {item.minutes >= 9 ? item.minutes : `0${item.minutes}`}
                                </span>
                            </div>
                            <div className={cls.new_child_body}>
                                <img src={item.picture} alt="innerImage" />
                                <div className={cls.new_child_body_content}>
                                    <h3>{item.subtitle}</h3>
                                    <p>{item.content}</p>
                                </div>
                                {
                                    item.video === 'nothing' ? (
                                        null
                                    ) : (
                                        <div className={cls.new_child_body_content_video}>
                                            <iframe 
                                            width="100%" 
                                            height="100%" 
                                            src={item.video} 
                                            title="YouTube video player" frameBorder="0" 
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                            allowFullScreen></iframe>
                                        </div>  
                                    )
                                       
                                }
                            </div>
                            <div className={cls.new_child_footer}>
                                {
                                    userInfo ? (
                                        <span onClick={() => handleNew(newID)}>
                                            <AiFillHeart/>
                                            {item.likes}
                                        </span> 
                                    ) : (
                                        null
                                    )
                                }
                                {
                                    userInfo ? (
                                        <button className={
                                            select.map(({id}) => {
                                                return `
                                                    ${id === newID ? cls.activeSelect : null}
                                                `
                                            })
                                        } onClick={() => handleRead(item , newID)}>
                                            Read Later
                                        </button>
                                    ) : (
                                        null
                                    )
                                }
                            </div>
                            <div className={cls.new_child_comment}>
                                {
                                    userInfo ? (
                                        <>
                                            <div className={cls.new_child_comment_typer}>
                                                <input 
                                                    value={comment}
                                                    onChange={e => setComment(e.target.value)} 
                                                    placeholder='Your comment' type="text" 
                                                />
                                                <button onClick={handleComment}>NOW</button>
                                            </div>  

                                            <div className={cls.new_child_comment_content}>
                                                {
                                                    commentBase.length === 0 ? (
                                                        <div className={cls.comment_empty}>
                                                            <h1>Leave your comment <AiOutlineComment/></h1>
                                                        </div>
                                                    ) : (
                                                        commentBase.map(({
                                                            id , picture , text , days , hours , 
                                                            minutes , month , user , year , del
                                                        }) => {
                                                            return <div key={id} className={
                                                                    del === userInfo ? 
                                                                    `   ${cls.new_child_comment_content_wrapper} 
                                                                        ${cls.new_child_comment_content_wrapper_alt}
                                                                    ` :
                                                                    cls.new_child_comment_content_wrapper
                                                                }>
                                                            <div className={cls.new_child_comment_content_wrapper_header}>
                                                                <img src={picture} alt="innerImage" />
                                                                <span>{user}</span>
                                                            </div>
                    
                                                            <div className={cls.new_child_comment_content_wrapper_body}>
                                                                <p>{text}</p>
                                                            </div>
                    
                                                            <div className={cls.new_child_comment_content_wrapper_footer}>
                                                                <CgCalendarDates/>  
                                                                {year}-{month >= 10 ? month + 1 : `${month + 1}`}
                                                                -{days >= 10 ? days : `${days}`} {hours >= 10 ? hours : `${hours}`}:
                                                                {minutes >= 10 ? minutes : `${minutes}`}
                                                            </div>
                                                            
                                                            <div className={cls.new_child_comment_content_wrapper_options}>
                                                                <span onClick={() => handleDeleteBtn(id)}><MdClose/></span>
                                                            </div>
                                                        </div>
                                                        })
                                                    )
                                                }
                                            </div>
                                        </>
                                    ) : (
                                        <div className={cls.comment_warner}>
                                            <h1>
                                                <Link to='/auth'>Log in</Link> to be able to leave comments 
                                                <AiOutlineComment/>
                                            </h1>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    })
                )
            }
            <Recommend/>
        </section>
    )
}

export default Single