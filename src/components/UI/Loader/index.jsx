import cls from './Loader.module.css'

const Loader = () => {
    return (
       <section className={cls.loader}>
            <div className={cls.lds_roller}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
       </section>
    )
}

export default Loader