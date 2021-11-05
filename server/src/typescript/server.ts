import express from 'express';
import { path } from './config/const';
import { findFiles } from './helpers/fileFinder';
import { spawn } from 'child_process'

var cors = require('cors')

const app = express();
const port = process.env.PORT || 3000

app.use(cors())

app.listen(port, () => {
  return console.log(`[INFO] server is listening on ${port}`);
})


let folder = `${__dirname}/${path.ROUTES}`
let routes = findFiles(folder, '', '.js')

routes.forEach((route) => {
  let r = require(`./${path.ROUTES}/${route.path}/${route.name}${route.extension}`)
  if(r.get)
    r.get(app, `${route.path}/${route.name}`)
  if(r.post)
    r.post(app, `${route.path}/${route.name}`)
})

// var dataToSend;
// // spawn new child process to call the python script

// const python = spawn('python', [`${__dirname}/../src/python/main.py`]);

// // collect data from script
// python.stdout.on('data', function (data) {
//   // console.log('Pipe data from python script ...');
//   dataToSend = data.toString();
// });

// // in close event we are sure that stream from child process is closed
// python.on('close', (code) => {
//   // console.log(`child process close all stdio with code ${code}`);
//   // send data to browser
//   console.log(dataToSend)
// });
