const os = require('os')
const path = require('path')

const Koa = require('koa')

const koaStatic = require('koa-static')
const koaMount = require('koa-mount')
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')

const homeRoutes = require('../routes/home') // роуты для адреса '/'


// db = new database()

require('dotenv').config()
const PORT = process.env.PORT || 5000
const isProduction = process.env.NODE_ENV==='prod'
const isDevelopment = !isProduction

const ROOT_DIR = __dirname
const FRONTEND_BUNDLE_PATH = path.resolve(
    ROOT_DIR,
    '../../build'
)

const server = new Koa()




///*************** эксперименты ***********************************************
// server.use() // добавляет в middleware функции, которые вызываются каждый раз, когда приходит сообщение
// эта функция содержит контекст запроса и следующую функцю-обработчик next().
// Чтобы был вызван следующий обработчик, необходимо в конце каждой функции вызывать next()?
/*
async function everyMsgFunction(ctx, next) {
    console.log('Server is receive message:', ctx.request.method, ctx.request.url)
    await next()    // если не вызвать эту функцию, то следующие обработчики запроса не будут выполнены
}
server.use(everyMsgFunction)

async function everyMsgFunction2(ctx, next) {
    console.log('2_Server is receive message:', ctx.request.method, ctx.request.url)
    await next()
}
server.use(everyMsgFunction2)
*/
/// ********************************************************************************

server.use(logger())  // в ТЗ есть логгирование. Кроме него добавляю также логгирование запросов. Пока в консоль
server.use(homeRoutes.routes())
// server.use(router.allowedMethods())

// Enable body parser with custom configuration
server.use(bodyParser({
    formLimit: '10mb',
    jsonLimit: '10mb',
    textLimit: '10mb'
}))

// Define Preact Admin App production build directory
if (isProduction) {
    server.use(
        koaMount(
            '/',
            koaStatic(FRONTEND_BUNDLE_PATH)
        )
    )
}

server.listen(PORT, () => console.log(`Server start on port ${PORT}, mode: ${process.env.NODE_ENV}!`))
