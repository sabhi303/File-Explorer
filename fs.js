let fh = require('fs')

exports.read = fh.readFile('./fs.js','utf-8', ( err, data ) => {
    try{
        
        console.log(data)

    }catch{

        console.log("Error : ", err)

    }
})