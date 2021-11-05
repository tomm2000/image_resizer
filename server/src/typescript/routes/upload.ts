import express from 'express'
import fs from 'fs'
import path from 'path'
import multer from 'multer'
import {imageFilter} from '../helpers/image_thing'

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'uploads/');
  },

  // By default, multer removes file extensions so let's add them back
  filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

export function get(app, route) {
// export function get(app: express.Express, route: string) {
  console.log(`[INFO] laoded route: ${route}`)

  app.post(route, (req, res) => {
    // 'profile_pic' is the name of our file input field in the HTML form
    let upload = multer({ storage: storage, fileFilter: imageFilter }).single('profile_pic');
    
    console.log(req)

    upload(req, res, function(err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }

        // Display uploaded image for user validation
        res.send(`You have uploaded this image: <hr/><img src="${req.file.path}" width="500"><hr /><a href="./">Upload another image</a>`);
    });
  })
}