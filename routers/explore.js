/* main */
const espress = require('express')

let app = espress()

module.exports = app.get('/', (req, res) => {
    
    try{
        
        res.send("Hello, there.. [ From Explore ]")

    }catch( err ){

        console.error("Module : routes/explore.js: get('/') \n", err)
        
    }
})