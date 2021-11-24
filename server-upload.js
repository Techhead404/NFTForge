const express = require('express');
const multer = require('multer');
const uuid = require('uuid').v4;

const file_system = require('fs')
const admz = require('adm-zip')


//Storage
const background = multer({dest: './input/background'});
const upload = multer({dest: './input/Layer1'});



const app = express();
app.use(express.static('public'));



//Upload function
app.post('/upload', upload.array("avatar"), (req , res) => {
    return res.json({status: 'OK', uploaded: req.files.length})
});

app.post('/background', background.array("avator"), (req , res) => {
    return res.json({status: 'OK', uploaded: req.files.length})
});

//Forge function
var childProcess = require('child_process');

function runScript(scriptPath, callback) {
    scriptPath ="./index.js";
    // keep track of whether callback has been invoked to prevent multiple invocations
    var invoked = false;
    var process = childProcess.fork(scriptPath);
    
    // listen for errors as they may prevent the exit event from firing
    process.on('error', function (err) {
        if (invoked) return;
        invoked = true;
        callback = (err);
    });

    // execute the callback once the process has finished running
    process.on('exit', function (code) {
        if (invoked) return;
        invoked = true;
        var err = code === 0 ? null : new Error('exit code ' + code);
        callback = (err);
    });
 

}
app.post('/forge', runScript); 



//Download function
var to_zip = file_system.readdirSync(__dirname+'/'+'output')

app.get('/download',function(req,res){
    res.sendFile(__dirname+'/'+'output')

    var zp = new admz();
 
    for(var k=0 ; k<to_zip.length ; k++){
        zp.addLocalFile(__dirname+'/'+'output'+'/'+to_zip[k])
    }
 // here we assigned the name to our downloaded file!
 const file_after_download = 'Forged-NFTs.zip';
 
 const data = zp.toBuffer();

     // 1. type of content that we are downloading
     // 2. name of file to be downloaded
     // 3. length or size of the downloaded file!
 res.set('Content-Type','application/octet-stream');
 res.set('Content-Disposition',`attachment; filename=${file_after_download}`);
 res.set('Content-Length',data.length);
 res.send(data);
})

app.listen(3001, () => console.log('App is listening...'));

