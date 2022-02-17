const fs = require("fs");
const path_mod = require("path");


// getting file size // can provide option to set decimals.
bytesToSize = (bytes, decimals=2 ) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

itsDirectory = (resource, res) => {
  
  fs.readdir(resource, function (err, files) {

    if (err) {
      // do something here...
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }

    let fileInfos = [];

    files.forEach((file) => {
      fileInfos.push({
        type  : fs.lstatSync(
                decodeURIComponent(
                  path_mod.join(resource, file)
                )).isDirectory()
                ?"directory":"file",
        name  : file,
        url   : baseUrl + file,
        size  : bytesToSize(
                fs.statSync(decodeURIComponent(
                path_mod.join(resource, file)
                )).size)
      });
    });
    console.log(fileInfos)
    res.status(200).send(fileInfos);
  });

}

itsFile = (resource, res) => {
  // console.log("File : ",resource)

  res.download(resource, path_mod.parse(resource).base, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });

}

const Filter = (req, res, path) => {
  // join path
  const resource = decodeURIComponent(path_mod.join(basedir, path))
  // console.log(resource)   /* DEBUG*/

  try {
    if (fs.existsSync(resource)) {
      // if directory,,
      if(fs.lstatSync(resource).isDirectory())
        itsDirectory(resource, res);
      else
        itsFile(resource, res)
    }
    else
    {
      console.error("Resource not found")
      res.status(500).send(
        {
          message: "Requested resource not found!"
        }
      );  
    }

  } catch (err) {
    console.error("Soemthing went wrong..", err)
    res.status(500).send(
      {
        message: "Internal Error"
      }
    );
  }
};

module.exports = {
  Filter
}