import { useMemo, useState } from 'react'
import { deleteRequest, getRequest } from '../../../api'
import { arrayFunc } from '../../../helpers'
import Loader from '../../UI/Loader'
import cls from './Selected.module.css'
import { RiCloseLine } from 'react-icons/ri'
import { FaRegNewspaper } from 'react-icons/fa'

const Selected = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const [loading , setLoading] = useState(false)
    const [base , setBase] = useState([])
    const [show , setShow] = useState(false)

    useMemo(() => {
        getRequest('users/' , `${user}/` , 'selected.json')
        .then(res => res.json() , setLoading(true))
        .then(r => {
            setLoading(false)
            if(r){
                const data = arrayFunc(r)
                setBase(data)
            }else(
                setBase([])
            )
        })
    } , [show])

    const handleDelete = e => {
        deleteRequest('users/' , `${user}/` , 'selected/' , `${e}.json`)
        .then(() => setShow(!show))
    }
    
    return (
        <section className={cls.selected}>
            {
                loading ? <Loader/> : (
                    base.length === 0 ? (
                        <div className={cls.seleted_empty}>
                            <h1><FaRegNewspaper/> You have no selected news</h1>
                        </div>
                    ) : (
                        base.reverse().map(({id , content , picture}) => {
                            return <div className={cls.selected_wrapper} key={id}>
                                <div className={cls.selected_wrapper_image}>
                                    <img src={picture} alt="innerImage" />
                                </div>
                                <div className={cls.selected_wrapper_content}>
                                    <p>{content}</p>
                                </div>
                                <div className={cls.selected_wrapper_footer}>
                                    <span onClick={() => handleDelete(id)}><RiCloseLine/></span>
                                </div>  
                            </div>
                        })
                    )
                )
            }
        </section>
    )
}

export default Selected