//  main //
const espress = require('express')

const app = espress()

module.exports = app.get('/', (req, res) => {
    try{
        // render index or jst handshake..
        res.send("Hello, there..")

    }catch( err ){
        console.error("Module : routes/root.js: get('/') \n", err)
    }
})


// other routers //
let testRouter = require('./test')
let exploreRouter = require('./explore')

// redirect //
app.use( '/test',       testRouter      )
app.use( '/explore',    exploreRouter   )