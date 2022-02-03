/* main */
const espress = require('express')

const app = espress()

app.get('/', (req, res) => {
    
    try{
        explorer = require("./../modules/explore")
        explorer.getListFiles(req,res)
    }catch( err ){

        console.error("Module : routes/explore.js: get('/') \n", err)
        
    }
})

module.exports = app