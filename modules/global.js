//  global variables are declared here //

global.port     = undefined
global.basedir  = undefined
global.host     = "localhost"
global.baseUrl  = `http://${host}:${port}/explore/`
global.host     = "localhost"

module.exports.init = function init(){
    global.port = 9000
    basedir = "C:\Users\Abhijeet\OneDrive\Desktop\FileExplorer"
}

module.exports.set_basedir = function set_basedir(dir){
    basedir = dir
}

module.exports.set_port = function set_port(portnum){
    port = portnum
}
