import express from 'express';
import { path } from './config/const';
import { findFiles } from './helpers/fileFinder';
import { run_script } from './helpers/pythonAPI';

var cors = require('cors')

const app = express();
const port = process.env.PORT || 3000

app.use(cors())

app.listen(port, () => {
  return console.log(`[INFO] server is listening on ${port}`);
})

global.home_dir = __dirname;
global.uploads_dir = `${__dirname}\\uploads`

let folder = `${__dirname}/${path.ROUTES}`
let routes = findFiles(folder, '', '.js')

routes.forEach((route) => {
  let r = require(`./${path.ROUTES}/${route.path}/${route.name}${route.extension}`)
  if(r.get)
    r.get(app, `${route.path}/${route.name}`)
  if(r.post)
    r.post(app, `${route.path}/${route.name}`)
})





