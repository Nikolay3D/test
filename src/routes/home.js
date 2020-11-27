const koaRouter = require('koa-router')
const koaBodyparser = require('koa-bodyparser')
const router = new koaRouter()
const logfile = require('log-to-file')
const logfilename = 'routes_home.log'

const Database = require('../database/database')

// для справки коды ответа сервера
// http://www.restapitutorial.ru/httpstatuscodes.html

router.get('/getUser', async (ctx) => {
    // console.log('ctx.params: ', ctx.request.query.userId)
    ctx.set('Content-Type', 'application/json')
    const users = await Database.getAll()
    if (ctx.request.query.userId - 1 >= 0 && users.length > ctx.request.query.userId - 1) {
        const user = {}
        Object.assign(user, users[ctx.request.query.userId - 1])
        user.pass = undefined   //@todo в клиенте будет видно наличие поля с паролем?
        ctx.body = JSON.stringify(user)
    } else {
        ctx.status = 416 //Range Not Satisfiable
    }
})

router.post('/register', koaBodyparser(), async (ctx) => {
    const user = ctx.request.body
    if (user.pass !== user.pass_rep) {
        logfile(`${ctx.request.method}:${ctx.request.url}: Пароли не совпадают`, logfilename)
        ctx.response.status = 400   // неверный синтаксис
        return
    }

    if (null === user.email.match(/@/)) {
        logfile(`${ctx.request.method}:${ctx.request.url}: Некорректный формат email`, logfilename)
        ctx.response.status = 400   // неверный синтаксис
        return
    }

    const findid = await Database.findEmail(user.email)

    if (undefined === findid) {
        logfile(`${ctx.request.method}:${ctx.request.url}: Ошибка в БД`, logfilename)
        ctx.response.status = 500   //Server error
    } else if (findid >= 0) {
        logfile(`${ctx.request.method}:${ctx.request.url}: Попытка зарегистрировать уже существующий email: ${user.email}`, logfilename)
        ctx.response.status = 409   //Conflict
    } else {
        await Database.addUser(user)
        logfile(`${ctx.request.method}:${ctx.request.url}: Успешное добавление нового пользователя: ${user.email}`, logfilename)
        ctx.response.status = 200
    }
})

module.exports = router
