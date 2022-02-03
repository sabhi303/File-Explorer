/* main */
const espress = require('express')

const app = espress()

app.get('/', (req, res) => {
    
    try{
        
        explorer = require("./../modules/explore")
        explorer.Files(req, res,"")

    }catch( err ){

        console.error("Module : routes/explore.js: get('/') \n", err)

    }
})

app.get('/:path', (req, res) => {
    
    try{
        
        explorer = require("./../modules/explore")
        explorer.Files(req, res, req.params.path)

    }catch( err ){

        console.error("Module : routes/explore.js: get('/') \n", err)

    }
})

module.exports = app