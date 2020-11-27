/*
 * Тестовое задание
 * Реализация при помощи классов
 */
import React from 'react'
import './style.css'

class RegistrationForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mode: '',
            user: {
                name: '',
                surname: '',
                email: '',
                pass: '',
                pass_rep: ''
            }
        }

        this.handleInput = this.handleInput.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    setMode(mode) {
        let tmp = this.state
        tmp.mode = mode
        this.setState(tmp)
    }

    updateUser(key, val) {
        let tmp = this.state
        tmp.user[key] = val
        this.setState(tmp)
    }

    componentDidMount() {
        /// инициализация состояния тут. Если проинициализировать в конструкторе, то его нельзя будет изменять
        this.setMode('registration')
    }

    handleInput = (event) => {
        this.updateUser(event.target.name, event.target.value)
    }

    // вариант с promise
    // handleSubmit(event) {
    //     // отключение стандартного html обработчика
    //     event.preventDefault()
    //
    //     const onError = message => {
    //         alert(message)
    //     }
    //
    //     if (null === this.state.user.email.match(/@/)) {
    //         return onError('Проверьте корректность указанного email')
    //     }
    //
    //     if (this.state.user.pass !== this.state.user.pass_rep) {
    //         return onError('Пароли не совпадают')
    //     }
    //
    //     fetch('/register', {
    //         method: 'POST',
    //         headers: {'Content-Type': 'application/json'},
    //         body: JSON.stringify(this.state.user)
    //     })
    //         .then((response) => {
    //             if (response.ok) {
    //                 this.setMode('registration_success')
    //             } else {
    //                 if (response.status === 409) {
    //                     alert(`Пользователь с таким email уже существует`)
    //                 } else {
    //                     alert(`Server error: ${response.status} ${response.statusText}`)
    //                 }
    //             }
    //         })
    //
    // }

    // вариант c async/await
    handleSubmit = async (event) => {
        // отключение стандартного обработчика
        event.preventDefault()

        const onError = message => {
            alert(message)
        }

        if (null === this.state.user.email.match(/@/)) {
            return onError('Проверьте корректность указанного email')
        }

        if (this.state.user.pass !== this.state.user.pass_rep) {
            return onError('Пароли не совпадают')
        }

        const response = await fetch('/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state.user)
        })

        if (response.ok) {
            this.setMode('registration_success')
        } else {
            if (response.status === 409) {
                alert(`Пользователь с таким email уже существует`)
            } else {
                alert(`Server error: ${response.status} ${response.statusText}`)
            }
        }
    }

    render() {
        if (this.state.mode === 'registration') {
            return (
                //форма ввода данных. На все input используется один обработчик. Он различает input по полю name
                <div className='container myform'>
                    <form onSubmit={this.handleSubmit} className='form-group'>
                        <h2 className='form-inline'>Регистрация</h2>
                        <p><input type='text' name='name' placeholder='Введите имя'
                                  value={this.state.user.name} onChange={this.handleInput} required/></p>
                        <p><input type='text' name='surname' placeholder='Введите фамилию'
                                  value={this.state.user.surname} onChange={this.handleInput} required/></p>
                        <p><input type='text' name='email' placeholder='Введите email'
                                  value={this.state.user.email} onChange={this.handleInput} required/></p>
                        <p><input type='password' name='pass' placeholder='Введите пароль'
                                  value={this.state.user.pass} onChange={this.handleInput} required/></p>
                        <p><input type='password' name='pass_rep' placeholder='Повторите пароль'
                                  value={this.state.user.pass_rep} onChange={this.handleInput} required/></p>
                        <input type="submit" className="btn btn-success" value="Зарегистрироваться"/>
                        {/*<pre>{JSON.stringify(this.state.user, null, 2)}</pre>*/}
                    </form>
                </div>
            )
        } else if (this.state.mode === 'registration_success') {
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
}

export default RegistrationForm
