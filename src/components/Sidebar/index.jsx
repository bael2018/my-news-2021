import cls from './Sidebar.module.css'
import { useSelector } from 'react-redux'

const Sidebar = () => {
    const state = useSelector(state => state.sidebar.active)

    return (
        <>
            <section className={state ? cls.sidebar : cls.sidebar_alt}>
             
            </section>
        </>
     
    )
}

export default Sidebar