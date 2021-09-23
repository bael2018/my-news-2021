import { useState } from 'react'
import { useHistory } from 'react-router'
import { authRequest } from '../../helpers'
import cls from './SignIn.module.css'
import { FcGoogle } from 'react-icons/fc'

const API_KEY = 'AIzaSyAdxuhd3YQo9M2b6H6r2RlpmBFASgjEw-g'
const BASE_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`

const SignIn = ({setChange}) => {
    const [password , setPassword] = useState('')
    const [email , setEmail] = useState('')
    const history = useHistory()

    const handleForm = e => {
        e.preventDefault()

        if(password !== '' && email !== ''){
            authRequest(BASE_URL , email , password)
            .then(r => {
                console.log(r);
                localStorage.setItem('user' , JSON.stringify(r.localId))
                setPassword('')
                setEmail('')
                history.push('/')
                window.location.reload()
            })
        }else{
            alert('Fill the inputs')
        }
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