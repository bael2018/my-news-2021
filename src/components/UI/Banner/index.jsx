import { Link } from 'react-router-dom'
import cls from './Banner.module.css'

const Banner = () => {
    return (
        <section className={cls.banner}>
            <div className={cls.banner_inside}>
                <h2>World News</h2>
                <p>All the most interesting news of the world !</p>
                <Link to='/search'>Search</Link>
            </div>
            <img src="img/34070.jpg" alt="banner" />
        </section>
    )
}

export default Banner