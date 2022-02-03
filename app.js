
const espress = require('express')
var cors = require('cors')


// create environment
const app_env = require('./modules/global')
app_env.init()

const app = espress()
app.use(cors())          // put some options here...

const route = require('./routers/root')
app.use('/', route)

app.listen(port, (req, res ) => {
    console.log(`Listening on ${port}... `)
})