import cls from './InputValid.module.css'

const InputValid = ({state , value}) => {

    return (
        <section
            className={cls.valid}
            style={{display: state ? 'block' : 'none'}}
        >
            {value} !
        </section>
    )
}

export default InputValid