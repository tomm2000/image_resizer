"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.file_resize = exports.run_script = void 0;
const child_process_1 = require("child_process");
function run_script(path, args, callback) {
    var dataToSend = '';
    // console.log(args)
    const python = child_process_1.spawn('python', [path].concat(args));
    python.stdout.on('data', function (data) {
        let out = data.toString();
        dataToSend = out;
    });
    python.on('close', (code) => {
        callback(dataToSend);
    });
}
exports.run_script = run_script;
function file_resize(script_path, upload_dir, namespace, aspect_w, aspect_h, callback) {
    let w = aspect_w.toString();
    let h = aspect_h.toString();
    run_script(script_path, [upload_dir, namespace, w, h], callback);
}
exports.file_resize = file_resize;
//# sourceMappingURL=pythonAPI.js.map