//  global variables are declared here //

global.is_env_initiated = undefined

module.exports.init = function init(){
    if( is_env_initiated == undefined )
    {
        global.port      = 6889
        global.basedir   = "C:\\Users\\Abhijeet\\OneDrive\\Documents"
        global.host      = "localhost"
        global.baseUrl   = `http://${host}:${port}/explore/`
        is_env_initiated = true
    }
}

module.exports.set_basedir = function set_basedir(dir){
    basedir = dir
}

module.exports.set_port = function set_port(portnum){
    port = portnum
}
