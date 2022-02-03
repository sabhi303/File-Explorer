const fs = require("fs");
const path_resolver = require("path");

const Files = (req, res, path) => {

    // join path
    const resource = decodeURIComponent( path_resolver.join(basedir,path) )
    console.log(resource)
    
  
    fs.readdir(resource, function (err, files) {
      if (err) {
        res.status(500).send({
          message: "Unable to scan files!",
        });
      }
  
      let fileInfos = [];
  
      files.forEach((file) => {
        fileInfos.push({
          name: file,
          url: baseUrl + file,
        });
      });
  
      res.status(200).send(fileInfos);
    });
  };

  module.exports = {
      Files
  }