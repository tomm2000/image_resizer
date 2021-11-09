"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.post = void 0;
const multer_1 = __importDefault(require("multer"));
const data_1 = require("../model/data");
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `${global.uploads_dir}`);
    },
    filename: function (req, file, cb) {
        data_1.clearStorage();
        cb(null, file.originalname);
    }
});
const uploadImg = multer_1.default({ storage: storage }).single('image');
function post(app, route) {
    console.log(`[INFO] laoded route: ${route}`);
    app.post(route, uploadImg, (req, res) => {
        let id = data_1.setUserImages();
        res.send(id);
    });
}
exports.post = post;
//# sourceMappingURL=upload.js.map