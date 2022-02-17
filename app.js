
const espress = require('express')
var cors = require('cors')


// create environment
const app_env = require('./modules/global')
app_env.init()

const app = espress()
// to support from any platform..
app.use( cors() )
app.use(espress.urlencoded({ extended: true }));

const route = require('./routers/root')
app.use('/', route)

app.listen(port, () => {
    console.log(`Listening on ${port}... `)
})