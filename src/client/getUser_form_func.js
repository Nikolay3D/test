/*
 * Тестовый запрос данных с сервера.
 * Реализация при помощи функций
 */
import React, {useState, useEffect} from 'react'

function GetUserForm() {
    const [user, setState] = useState({
        name: '',
        surname: '',
        email: '',
    })

    const [userId, setUserId] = useState(1)

    // хук эффекта для отслеживания изменений в пользователе. Чтобы выполнился рендер после завершения запроса
    useEffect(() => {
        // console.log('user updated:', user)
    }, [user])

    // вариант с promise
    // function handleRequest(event) {
    //     fetch(`/getUser?userId=${userId}`, {method: 'GET'})
    //         .then(response => {
    //                 if(response.ok){
    //                     return response.json()
    //                 }
    //                 else{
    //                     alert(`Server error: ${response.status} ${response.statusText}`)
    //                 }
    //             }
    //         ).then(result => {
    //         if(result){
    //             setState(result)
    //         }
    //     })
    // }

    // вариант c async/await
    const handleRequest = async () => {
        const onError = message => {alert(message)}
        const response = await fetch(`/getUser?userId=${userId}`, {method: 'GET'})
        if(!response.ok){
            return onError(`Server error: ${response.status} ${response.statusText}`)
        }
        const result = await response.json()
        if(!result){
            return onError(`Invalid data convert`)
        }
        setState(result)
    }

    return (
        <div className={'form-group'}>
            <h3>Данные пользователя | hooks</h3>
            <pre>{JSON.stringify(user, null, 2)}</pre>
            <p>userId: {userId}</p>
            <input type="number" min={1} onChange={e => setUserId(e.target.value)} value={userId}/>
            <button className="btn btn-primary" onClick={handleRequest}>Запросить</button>
        </div>
    )
}

export default GetUserForm
