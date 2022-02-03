/* main */
const espress = require('express')

const app = espress()

app.get('/', (req, res) => {
    
    try{
        
        res.send("Hello, there.. [ From test ]")

    }catch( err ){

        console.error("Module : routes/test.js: get('/') \n", err)
        
    }
})

module.exports = app
