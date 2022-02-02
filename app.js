
const espress = require('express')


const app = espress()

let route = require('./routers/root')
app.use('/', route)

app.listen(9000, (req, res ) => {
    console.log(" Listening on localhost:9000...")  
})