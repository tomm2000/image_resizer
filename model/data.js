"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearStorage = exports.setUserImages = exports.getUserImages = void 0;
const uuid_1 = require("uuid");
const fs_1 = __importDefault(require("fs"));
const pythonAPI_1 = require("../controller/pythonAPI");
exports.getUserImages = function (user_id) {
    let path = `${global.uploads_dir}\\converted\\${user_id}`;
    try {
        let files = fs_1.default.readdirSync(path);
        return files.map((file) => `${path}\\${file}`);
    }
    catch (error) {
        return [];
    }
};
exports.setUserImages = function () {
    let id = uuid_1.v4();
    const script_path = `${global.home_dir}\\python\\main.py`;
    const dest_path = `${global.uploads_dir}\\converted\\${id}`;
    pythonAPI_1.file_resize(script_path, `${global.uploads_dir}`, id, 9, 16, (out) => { });
    return id;
};
exports.clearStorage = function () {
    // //TODO: remove unecessary files!!
    // let converting_files = fs.readdirSync(`${global.uploads_dir}`)
    // for(let file of converting_files) {
    //   if(file != 'converted'){
    //     fs.unlink(`${global.uploads_dir}\\${file}`, () => {})
    //   }
    // }
    // let converted = fs.readdirSync(`${global.uploads_dir}\\converted`)
    // converted.forEach((namespace) => {
    //   fs.rmSync(`${global.uploads_dir}\\converted\\${namespace}`, { recursive: true, force: true})
    // })
};
//# sourceMappingURL=data.js.map