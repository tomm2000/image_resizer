import express from 'express'
import fs from 'fs'
import multer from 'multer'
import { file_resize, run_script } from '../helpers/pythonAPI';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, `${global.uploads_dir}`);
    },
  filename: function (req, file, cb) {
      cb(null, file.originalname);
  }
});

const uploadImg = multer({storage: storage}).single('image');

export function post(app: express.Application, route: string) {
  console.log(`[INFO] laoded route: ${route}`)

  app.post(route, uploadImg, (req, res) => {

    //TODO: remove unecessary files!!
    // let converting_files = fs.readdirSync(`${global.uploads_dir}`)
    // for(let file of converting_files) {
    //   if(file != 'converted'){
    //     fs.unlink(`${global.uploads_dir}\\${file}`, () => {})
    //   }
    // }

    // let converted_files = fs.readdirSync(`${global.uploads_dir}\\converted`)
    // for(let file of converted_files) {
    //   fs.unlink(`${global.uploads_dir}\\converted\\${file}`, () => {})
    // }

    // console.log(files)


    file_resize(`${global.home_dir}\\python\\main.py`, `${global.uploads_dir}`, 9, 16, (out) => {
      let files = fs.readdirSync(`${global.uploads_dir}\\converted`)

      if(files.length > 0) {
        // console.log(`sending: ${global.uploads_dir}\\converted\\${files[0]}`)
        // res.sendFile(`${global.uploads_dir}\\converted\\conv_${files[0]}`)
        res.send('success!')
      } else {
        res.send('error!')
      }
    })
  })

  app.get(route, (req, res) => {
    let files = fs.readdirSync(`${global.uploads_dir}\\converted`)
    res.sendFile(`${global.uploads_dir}\\converted\\${files[0]}`)
  })
}