
const espress = require('express')
var cors = require('cors')
var server = undefined

// create environment
const app_env = require('./global')
app_env.init()

// setting up
const app = espress()
app.use( cors( {origin: `http://${host}:${port}`} ))
app.use(espress.urlencoded({ extended: true }));


async function checkServerStatus(result) {

    try {    
        if( server != undefined )
        {
            return result(null, true)
        }
        else
        {
            return result(null, false)
        }
    } catch (err) {
        console.error("Internal Error : ", err)
    }

    
}
async function stopServer() {
    try {
        
        if( server != undefined)
        {    
            server.close()
            server = undefined
        }

    } catch (err) {
        console.error("Internal Error : ", err)
    }
}

async function startServer() {
    try {
        
        if(server == undefined)
        {
            const route = require('./../routers/root')
            app.use('/', route)
        
            server = app.listen(port, () => {
            console.log(`Listening on ${port}... `)
            })
        }

    }catch ( err ){
        console.error("Internal error : ", err)
    }
}

startServer()
checkServerStatus( function result(err, result){
    if( result==true ){
        console.log("Server is listening..")
    }
    else
    {
        console.log("Server is stopped..")
    }
})
stopServer()
checkServerStatus( function result(err, result){
    if( result==true ){
        console.log("Server is listening..")
    }
    else
    {
        console.log("Server is stopped..")
    }
})