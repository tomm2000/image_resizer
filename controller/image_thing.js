"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageFilter = void 0;
exports.imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
//# sourceMappingURL=image_thing.js.map