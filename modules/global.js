//  global variables are declared here //

module.exports.init = function init(){
    
    global.port     = 9000
    global.basedir  = "C:\\Users\\Abhijeet\\OneDrive\\Documents"
    global.host     = "localhost"
    global.baseUrl  = `http://${host}:${port}/explore/`
}

module.exports.set_basedir = function set_basedir(dir){
    basedir = dir
}

module.exports.set_port = function set_port(portnum){
    port = portnum
}
