import express from 'express';
import { path } from './config/const';
import { findRoutes, openRoutes } from './controller/routeAPI'
import { clearStorage } from './model/data';

var cors = require('cors')

const app = express();
const port = process.env.PORT || 3000

app.use(cors())

app.listen(port, () => {
  return console.log(`[INFO] server is listening on ${port}`);
})

global.home_dir = __dirname;
global.uploads_dir = `${__dirname}\\uploads`

clearStorage()

let folder = `${__dirname}/${path.ROUTES}`
let routes = findRoutes(folder, '', '.js')

openRoutes(app, routes)




