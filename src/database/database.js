// let base = []
// //todo добавить шифрование пароля
// //todo вынести базу в отдельный файл. может быть сделать класс с функциями доступа
// function base_init() {
//     base.push({
//         name: 'Nikita',
//         surname: 'Shubkin',
//         email: 'nikshub@mail.ru',
//         pass: 'nikita12345'
//     })
//
//     base.push({
//         name: 'Anton',
//         surname: 'Soldatov',
//         email: 'ansol@gmail.com',
//         pass: 'anton12345'
//     })
//
//     base.push({
//         name: 'Irina',
//         surname: 'Seledkina',
//         email: 'irsel@box.ru',
//         pass: 'irina12345'
//     })
// }
//
// base_init()

const uuid = require('uuid')
const fs = require('fs')
const fsPromises = fs.promises
const path = require('path')

class Database {
    static async getAll() {
        return new Promise((resolve, reject) => {
            // используется promise, т.к. readFile функция асинхронная
            fs.readFile(
                path.join(__dirname, 'database.json'),
                'utf-8',
                (err, content) => {
                    if (err) {
                        reject(err)
                    } else {
                        if (content.length) {
                            resolve(JSON.parse(content))
                        } else {
                            // если файл изначально пустой, то парсер вернет ошибку, подкидываем ему минимальные данные
                            resolve(JSON.parse('[]'))
                        }
                    }
                })
        })
    }

    // static async add(user) {
    //     const users = await this.getAll()
    //     const idx = users.findIndex(u => u.email===user.email)
    //     return new Promise((resolve, reject) => {
    //         if(idx){
    //             reject()
    //         }
    //
    //         if
    //     })
    //
    //
    //
    // }
    static listDir = async () => {
        try {
            return fsPromises.readdir(__dirname);
        } catch (err) {
            console.error('Error occured while reading directory!', err);
        }
    }

    static findEmail = async (email) => {
        const onError = (message) => {
            console.error(`${this.name}::findEmail >> ${message}`)
            return undefined
        }
        const users = await fsPromises.readFile(path.resolve(__dirname, 'database.json'), 'utf-8')

        if(!users){
            return onError(`Empty file`)
        }

        const idx = JSON.parse(users).findIndex(u => u.email===email)

        return(idx)
    }

    static addUser = async (user) => {
        const onError = (message) => {
            console.log('findEmal err:', message)
            return undefined
        }
        const content = await fsPromises.readFile(path.resolve(__dirname, 'database.json'), 'utf-8')

        if(!content){
            return onError('Empty file')
        }

        const users = JSON.parse(content)

        //@todo Пароль в базе хранится в открытом виде
        // Добавить к нему соль (можно индивидуальную для каждого пользователя, глобальную на всех или обе сразу)
        // В базе хранить хеш от (соль+пароль)
        users.push({
            user: user.name,
            surname: user.surname,
            email: user.email,
            pass: user.pass,
            id: uuid()
        })

        const write_res = await fsPromises.writeFile(path.resolve(__dirname, 'database.json'), JSON.stringify(users))

        console.log('write_res:', write_res)
    }

}

// export default Database
module.exports = Database
