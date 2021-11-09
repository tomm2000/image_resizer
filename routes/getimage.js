"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.post = void 0;
const data_1 = require("../model/data");
function post(app, route) {
    console.log(`[INFO] laoded route: ${route}`);
    app.get(route, (req, res) => {
        // let files = fs.readdirSync(`${global.uploads_dir}\\converted`)
        // res.sendFile(`${global.uploads_dir}\\converted\\${files[0]}`)
        let id = req.query.user_id;
        // console.log(`requested image: ${id}`)
        let files = data_1.getUserImages(id);
        if (files.length > 0)
            res.sendFile(files[0]);
        else
            res.send(JSON.stringify({ result: 'error' }));
        // res.send(JSON.stringify({result: 'success', id}))
    });
}
exports.post = post;
//# sourceMappingURL=getimage.js.map