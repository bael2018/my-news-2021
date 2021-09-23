import { Redirect, Route, Switch } from 'react-router'
import cls from './App.module.css'
import Auth from './Auth'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Main from './pages/Main'
import Search from './pages/Search'
import Single from './pages/Single'
import SubNews from './pages/SubNews'
import User from './pages/User'

const App = () => {
    return (
        <section className={cls.root}>
            <Navbar/>
            <Switch>
                <Route component={Main} exact path='/'/>
                <Route component={Search} exact path='/search'/>
                <Route component={Auth} exact path='/auth'/>
                <Route component={User} exact path='/user'/>
                <Route component={SubNews} exact path='/:id'/>
                <Route component={Single} exact path='/news/:newID'/>
                <Redirect to='/'/>
            </Switch>
            <Footer/>
        </section>
    )
}

export default App