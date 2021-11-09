import { useEffect, useState } from 'react'
import cls from './Edit.module.css'
import { changeRequest, getRequest } from '../../../api'
import InputValid from '../../InputValid'

const Edit = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const [name , setName] = useState('')
    const [image , setImage] = useState('')

    const [inputState , setInputState] = useState(false)

    useEffect(() => {
        getRequest('users/' , `${user}.json` , '')
        .then(res => res.json())
        .then(r => {
            setName(r.name)
            setImage(r.image)
        })
    } , [])

    const handleForm = e => {
        e.preventDefault()

        if(name !== '' && image !== ''){
            changeRequest({
                name: name,
                image: image
            } ,
            'users/' , `${user}.json` , ''
            )
            .then(() => setInputState(false))
            .then(() => window.location.reload())
        }else{
            setInputState(true)
        }
    }
    
    return (
        <section className={cls.edit}>
            <form action="address">
                <div>
                    <h4>Change your name</h4>
                    <input 
                        placeholder='Your name' 
                        type="text" 
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <InputValid state={inputState} value='Enter your name'/>
                </div>
                <div>
                    <h4>Change your picture</h4>
                    <input 
                        placeholder='Your image' 
                        type="text" 
                        value={image}
                        onChange={e => setImage(e.target.value)}
                    />
                    <InputValid state={inputState} value='Enter your image'/>
                </div>
                <button type='submit' onClick={handleForm}>confirm</button>
            </form>
        </section>
    )
}

export default Edit
