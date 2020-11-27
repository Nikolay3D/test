/*
 * Тестовый запрос данных с сервера.
 * Реализация при помощи классов
 */
import React from 'react'

class GetUserForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            userId: ''
        }

        this.handleRequest = this.handleRequest.bind(this)
    }

    componentDidMount() {
        /// инициализация состояния тут. Если проинициализировать в конструкторе, то его нельзя будет изменять
        this.setState({userId: 1})
    }

    setUserId(id) {
        this.setState({userId: id})
    }

    // вариант с promise
    // handleRequest(event) {
    //     fetch(`/getUser?userId=${this.state.userId}`, {method: 'GET'})
    //         .then(response => {
    //                 if(response.ok){
    //                     return response.json()
    //                 }
    //                 else{
    //                     alert(`Server error: ${response.status} ${response.statusText}`)
    //                 }
    //             }
    //         ).then(result => {
    //             if(result){
    //                 this.setState({user: result})
    //             }
    //     })
    // }

    // вариант c async/await
    //пока без проверки содержимого ответа
    handleRequest = async (event)=>{
        const onError = message => {alert(message)}
        const response = await fetch(`/getUser?userId=${this.state.userId}`, {method: 'GET'})
        if(!response.ok){
            return onError(`Server error: ${response.status} ${response.statusText}`)
        }
        const result = await response.json()
        if(!result){
            return onError(`Invalid data convert`)
        }

        this.setState({user: result})
    }

    render() {
        return (
            <div className={'form-group'}>
                <h3>Данные пользователя | class</h3>
                <pre>{JSON.stringify(this.state, null, 2)}</pre>
                <input type="number" min={1} onChange={e => this.setUserId(e.target.value)} value={this.state.userId}/>
                <button className="btn btn-primary" onClick={this.handleRequest}>Запросить</button>
            </div>
        )
    }
}

export default GetUserForm
