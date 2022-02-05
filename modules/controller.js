// All the user related stuff will happen here, like setting up variables and stuff,
// The server will also be managed from here..


// create environment .. temporary, delete later..
const app_env = require('./global')
app_env.init()


// prompt => courtsey : https://stackoverflow.com/a/68504470

const { exit } = require('process');
const readline = require('readline');
const { set_basedir } = require('./global');
const { resolve } = require('path');
const { rejects } = require('assert');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const prompt = (query) => new Promise((resolve) => rl.question(query, resolve));

// parse command line arguments as well in future

async function change_rootdir()
{
    try{
        let fs = require('fs')
        let _basedir = await prompt("Enter root directory : ")
        console.log("____")
        
        _basedir = decodeURIComponent(_basedir)
        if ( fs.existsSync(_basedir) && fs.lstatSync(_basedir).isDirectory() )
        {
            basedir = _basedir
        }
        else
        {
            console.log(`Entered directory doesn't exist..
                        \rPlease enter valid one..\n`)
            basedir = decodeURIComponent(__dirname)
            console.log("Setting root = ", basedir)
        }
    }catch( err ){
        console.error("Internal Error : ", err)   
    }
}

async function checkIfPortisInUse( _port, result ) {
    // courtsey : https://stackoverflow.com/a/19129614 //which fails///
    
    try {
        
        let net = require('net');
        let server = net.createServer();

        server.once('error', function(err) {
            if (err.code === 'EADDRINUSE') {
                console.error(`Port ${_port} is in use!`)
                return result(null, true)
            }
        });

        server.once('listening', function() {
            // close the server if listening doesn't fail
            server.close();
            return result(null, false)
        });

        server.listen(_port);
        
    } catch (err) {
        console.error("Internal Error : ", err)
        return result(null, false)
    }
    
}

async function change_port()
{
    try{
        console.log("-------------------------------")
        let _port = await prompt("Enter Port : ")
        console.log("____")
        try { _port = parseInt(_port) } catch {}
    
        // let result
        return new Promise ((resolve, reject) =>{
            checkIfPortisInUse( _port, function( err, result )
            {
                if ( ! result )
                {
                    port = _port
                    // ithe server ch listerning parat start kra..
                    console.log("Setting port = ", port)
                    console.log("URL          = ", `${host}:${port}`)
                    if (err) reject(err)
                    else resolve(result)
                }
                else
                {
                    console.log(`\n!Entered port is already used..
                                \rPlease enter valid one..\n`)
                    basedir = decodeURIComponent(__dirname)
                    console.log("Setting port = ", port)
                    console.log("-------------------------------")
                }
            });
        });
        
    }catch( err ){
        console.error("Internal Error : ", err)   
    }
}

async function  EnvironmentSettings()
{

    try {

        let choice = 0
                
        while(choice != 3 )
        {
            console.log("\n===============================\n")
            console.log(`[ ENVIRONMENT SETTINGS ]\n
                        \r\t  1. Change Root Directory
                        \r\t  2. Change Server Port
                        \r\t  3. Return to Main Menu
                        `)
            choice = await prompt("\rChoice\t: ")
            console.log("____")
            
            try { choice = parseInt(choice) } catch {}
            switch (choice) {
                case 1:
                    await change_rootdir()
                    break;
                case 2:
                    await change_port()
                    break;
                case 3:
                    return
                default:
                    console.log("Please enter a valid choice!")
                    break;
            }
        }
    } catch ( err ) {
        console.error("Internal Error : ", err)
    }
}


async function ServerSettings()
{
    try {
        const server = require('./server')

        let choice = 0
                
        while(choice != 4 )
        {
            console.log("\n===============================\n")
            console.log(`[ SERVER SETTINGS ]\n
                        \r\t  1. Check Status
                        \r\t  2. Start Server
                        \r\t  3. Stop Server
                        \r\t  4. Return to Main Menu
                        `)
            choice = await prompt("\rChoice\t: ")
            console.log("____")

            
            try { choice = parseInt(choice) } catch {}
            switch (choice) {
                case 1:
                    await server.checkServerStatus( function result(err, result){
                        if( result==true ){
                            console.log(`\nServer is listening on port:${port}..\n`)
                        }
                        else
                        {
                            console.log("\nServer is not listening\n")
                        }
                    })
                    break;

                case 2:
                    await server.startServer()
                    await server.checkServerStatus( function result(err, result){
                        if( result==true ){
                            console.log("Server started..")
                        }
                        else
                        {
                            console.log("Unable to start the server!")
                        }
                    })
                    break;

                case 3:
                    await server.stopServer()
                    await server.checkServerStatus( function result(err, result){
                        if( result==true ){
                            console.log("Server is still running..")
                            console.log("Unable to start the server")
                        }
                        else
                        {
                            console.log("Server stopped..")
                        }
                    })
                    break;
                case 4:
                    return
                default:
                    console.log("Please enter a valid choice!")
                    break;
            }
        }
    } catch ( err ) {
        console.error("Internal Error : ", err)
    }
}

function printHeader() {
        // header
        console.log("*******************************")
        console.log("  File Explorer API contoller  ")
        console.log("*******************************")
}

// main..
async function main()
{
    try {
        
        printHeader()

        // here menu menu
        let choice = 0
        
        while(choice != 3 )
        {
            console.log(`[ MAIN MENU ]\n
                        \r\t  1. Environment Settings
                        \r\t  2. API Settings
                        \r\t  3. Exit
                        `)
            choice = await prompt("\rChoice\t: ")
            
            try { choice = parseInt(choice) } catch {}
            switch (choice) {
                case 1:
                    await EnvironmentSettings()
                    break;
                case 2:
                    await ServerSettings()
                    break;
                case 3:
                    process.exit()
                default:
                    console.log("Please enter a valid choice!")
                    break;
            }
        }

    } catch (err)
    {
        console.error("Internal Error : ", err)
    }
}

main()  