"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const const_1 = require("./config/const");
const routeAPI_1 = require("./controller/routeAPI");
const data_1 = require("./model/data");
console.log(express_1.default);
var cors = require('cors');
const app = express_1.default();
const port = process.env.PORT || 3000;
app.use(cors());
app.listen(port, () => {
    return console.log(`[INFO] server is listening on ${port}`);
});
global.home_dir = __dirname;
global.uploads_dir = `${__dirname}\\uploads`;
data_1.clearStorage();
let folder = `${__dirname}/${const_1.path.ROUTES}`;
let routes = routeAPI_1.findRoutes(folder, '', '.js');
routeAPI_1.openRoutes(app, routes);
//# sourceMappingURL=server.js.map