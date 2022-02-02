/* main */
const espress = require('express')

let app = espress()

module.exports = app.get('/', (req, res) => {
    
    try{
        
        res.send("Hello, there.. [ From test ]")

    }catch( err ){

        console.error("Module : routes/test.js: get('/') \n", err)
        
    }
})
