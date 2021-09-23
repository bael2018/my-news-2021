import { useState } from 'react'
import cls from './Auth.module.css'
import { FcGoogle } from 'react-icons/fc'
import {authRequest} from '../helpers'
import { useHistory } from 'react-router'
import SignIn from '../components/SignIn'

const API_KEY = 'AIzaSyAdxuhd3YQo9M2b6H6r2RlpmBFASgjEw-g'
const BASE_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`

const Auth = () => {
    const [change , setChange] = useState(false)
    const [password , setPassword] = useState('')
    const [email , setEmail] = useState('')
    const [picture , setPicture] = useState('')
    const [userName , setUserName] = useState('')
    const history = useHistory()

    const handleForm = e => {
        e.preventDefault()
        const data = new Date()
        const year = data.getFullYear()
        const month = data.getMonth()
        const hours = data.getHours()
        const minutes = data.getMinutes()
        const days = data.getDate()

        if(password !== '' && email !== '' && picture !== '' && userName !== ''){
            authRequest(BASE_URL , email , password)
            .then(r => {
                localStorage.setItem('user' , JSON.stringify(r.localId))
                fetch(`https://my-news-c980c-default-rtdb.asia-southeast1.firebasedatabase.app/users/${r.localId}.json` , {
                    method: 'PUT',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        email,
                        image: picture,
                        name: userName,
                        years: year,
                        months: month,
                        hours: hours,
                        minutes: minutes,
                        days: days
                    })
                })
                .then(() => {
                    setUserName('')
                    setPassword('')
                    setPicture('')
                    setEmail('')
                    history.push('/')
                    window.location.reload()
                })
            })
        }else{
            alert('Fill the inputs')
        }
    }   

    return (
        change ? <SignIn setChange={setChange}/> : (
            <section className={cls.auth}>
                <h1>Sign up to your account !</h1>
                <p>Already have an account? <span onClick={() => setChange(!change)}>Sign in</span></p>
                <form action="address">
                    <input
                        style={{
                            background: picture ? '#01cbe6' : null , 
                            border: picture ? '2px solid #01cbe6' : null
                        }} 
                        value={picture}
                        onChange={e => setPicture(e.target.value)}
                        placeholder='Your picture' 
                        type="text" 
                    />
                    <input 
                        style={{
                            background: userName ? '#01cbe6' : null , 
                            border: userName ? '2px solid #01cbe6' : null
                        }} 
                        placeholder='Your name' 
                        type="text" 
                        value={userName}
                        onChange={e => setUserName(e.target.value)}
                    />
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
    )
}

export default Auth