// All the user related stuff will happen here, like setting up variables and stuff,
// The server will also be managed from here..



// prompt : courtsey : https://stackoverflow.com/a/68504470

const { exit } = require('process');
const readline = require('readline');
const { set_basedir } = require('./global');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const prompt = (query) => new Promise((resolve) => rl.question(query, resolve));

// parse command line arguments as well in future

async function set_rootdir()
{
    try{
        let fs = require('fs')
        let _basedir = await prompt("Enter root directory : ")
        
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

function printHeader() {
        // header
        console.log("*****************************")
        console.log(" File Explorer API contoller ")
        console.log("*****************************")
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
            console.log(`[MAIN MENU]\n
                        \r\t  1. Environment Settings
                        \r\t  2. API Settings
                        \r\t  3. Exit
                        `)
            choice = await prompt("\rChoice\t: ")
            
            try { choice = parseInt(choice) } catch {}
            switch (choice) {
                case 1:
                case 2:
                    await set_rootdir()
                    break;
                case 3:
                    break;
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