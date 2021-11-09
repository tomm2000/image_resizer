"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.openRoutes = exports.findRoutes = void 0;
const fs_1 = __importDefault(require("fs"));
const const_1 = require("../config/const");
function findRoutes(start, path, extension) {
    let search = [];
    try {
        search = fs_1.default.readdirSync(start + path);
    }
    catch (error) {
        console.log('[WARN] route folder not found!');
        return [];
    }
    let files = [];
    search.forEach((thing) => {
        if (thing.endsWith(extension)) {
            files.push({
                name: thing.replace(extension, ''),
                path: path,
                extension
            });
        }
        else if (!thing.includes('.')) {
            files = files.concat(findRoutes(start, `${path}/${thing}`, extension));
        }
    });
    return files;
}
exports.findRoutes = findRoutes;
function openRoutes(app, files) {
    files.forEach((route) => {
        let p = `${global.home_dir}/${const_1.path.ROUTES}/${route.path}/${route.name}${route.extension}`;
        // console.log(p)
        let r = require(p);
        if (r.get)
            r.get(app, `${route.path}/${route.name}`);
        if (r.post)
            r.post(app, `${route.path}/${route.name}`);
    });
}
exports.openRoutes = openRoutes;
//# sourceMappingURL=routeAPI.js.map