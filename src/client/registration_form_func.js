/*
 * Тестовое задание
 * Реализация при помощи функций
 */
import React, {useState, useEffect} from 'react'
import './style.css'

function RegistrationForm() {
    const [mode, setMode] = useState('registration')
    const [user, setUser] = useState({
            name: '',
            surname: '',
            email: '',
            pass: '',
            pass_rep: ''
        }
    )

    // хук эффекта для отслеживания изменений в пользователе. Чтобы выполнился рендер после завершения запроса
    useEffect(() => {
        // console.log('user updated:', user)
    }, [user, mode])

    const handleInput = (event) => {
        setUser({...user, [event.target.name]: event.target.value})
    }

    const handleSubmit = async (event) => {
        // отключение стандартного обработчика
        event.preventDefault()

        const onError = message => {
            alert(message)
        }

        if (null === user.email.match(/@/)) {
            return onError('Проверьте корректность указанного email')
        }

        if (user.pass !== user.pass_rep) {
            return onError('Пароли не совпадают')
        }

        const response = await fetch('/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        })

        if (response.ok) {
            setMode('registration_success')
        } else {
            if (response.status === 409) {
                alert(`Пользователь с таким email уже существует`)
            } else {
                alert(`Server error: ${response.status} ${response.statusText}`)
            }
        }
    }

    if (mode === 'registration') {
        return (
            //форма ввода данных. На все input используется один обработчик. Он различает input по полю name
            <div className='container myform'>
                <form onSubmit={handleSubmit} className='form-group'>
                    <h2 className='form-inline'>Регистрация</h2>
                    <p><input type='text' name='name' placeholder='Введите имя'
                              value={user.name} onChange={handleInput} required/></p>
                    <p><input type='text' name='surname' placeholder='Введите фамилию'
                              value={user.surname} onChange={handleInput} required/></p>
                    <p><input type='text' name='email' placeholder='Введите email'
                              value={user.email} onChange={handleInput} required/></p>
                    <p><input type='password' name='pass' placeholder='Введите пароль'
                              value={user.pass} onChange={handleInput} required/></p>
                    <p><input type='password' name='pass_rep' placeholder='Повторите пароль'
                              value={user.pass_rep} onChange={handleInput} required/></p>
                    <input type="submit" className="btn btn-success" value="Зарегистрироваться"/>
                    {/*<pre>{JSON.stringify(this.state.user, null, 2)}</pre>*/}
                </form>
            </div>
        )
    } else if (mode === 'registration_success') {
        return (
            <div className='container myfinal'>
                <h3>Регистрация успешно выполнена</h3>
            </div>
        )
    } else {
        return (
            <div className='container myfinal'>
                <h3>Неизвестное состояние</h3>
            </div>
        )
    }
}

export default RegistrationForm
