import { useState } from 'react'
import { useHistory } from 'react-router'
import { arrayFunc, authRequest } from '../../helpers'
import cls from './SignIn.module.css'
import { FcGoogle } from 'react-icons/fc'
import InputValid from '../InputValid'
import { getRequest } from '../../api/index'

const API_KEY = 'AIzaSyAdxuhd3YQo9M2b6H6r2RlpmBFASgjEw-g'
const BASE_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`

const SignIn = ({setChange}) => {
    const [password , setPassword] = useState('')
    const [email , setEmail] = useState('')
    const history = useHistory()

    const [val , setVal] = useState(false)
    const [inputState , setInputState] = useState(false)

    const handleForm = e => {
        e.preventDefault()

        if(password !== '' && email !== ''){
            authRequest(BASE_URL , email , password)
            .then(r => {
                if(r.localId){
                    getRequest('users.json' , '' , '')
                    .then(result => result.json())
                    .then(el => {
                        const usersData = arrayFunc(el)
                        usersData.forEach(item => {
                            if(item.id === r.localId){
                                localStorage.setItem('user' , JSON.stringify(r.localId))
                                setVal(true)
                                setInputState(false)
                                history.push('/')
                                window.location.reload()
                                
                            }
                        })
                    })
                }else{
                    setVal(false)
                    setInputState(true)
                }
            })
        }else{
            setVal(true)
            setInputState(true)
        }
        setPassword('')
        setEmail('')
    }   

    return (
        <section className={cls.auth}>
            <h1>Sign in to your account !</h1>
            <p>Do not have an account? 
                <span 
                    onClick={() => setChange(prev => !prev)}
                >
                    Sign up
                </span>
            </p>
            <form action="address">
                <input 
                    style={{
                        background: email ? '#01cbe6' : null , 
                        border: email ? '2px solid #01cbe6' : null
                    }} 
                    placeholder='Your email' 
                    type="email" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <InputValid
                    state={inputState}
                    value={
                    val ? 
                    'Email address is required' : 'Wrong email address'
                }/>
                <input 
                    style={{
                        background: password ? '#01cbe6' : null , 
                        border: password ? '2px solid #01cbe6' : null
                    }} 
                    placeholder='Your password' 
                    type="password" 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                 <InputValid
                    state={inputState}
                    value={
                    val ? 
                    'Password is required' : 'Wrong password'
                }/>
                <button onClick={handleForm} type='submit'>CREATE</button>
            </form>
            <div className={cls.auth_alternate}>
                <h3>OR</h3>
                <FcGoogle/>
            </div>
        </section>
    )
}

export default SignIn