import express from 'express'
import fs from 'fs'
import multer from 'multer'
import { file_resize, run_script } from '../controller/pythonAPI';
import { clearStorage, getUserImages, setUserImages } from '../model/data';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${global.uploads_dir}`);
  },
  filename: function (req, file, cb) {
    clearStorage()
    cb(null, file.originalname);
  }
});

const uploadImg = multer({storage: storage}).single('image');

export function post(app: express.Application, route: string) {
  console.log(`[INFO] laoded route: ${route}`)

  app.post(route, uploadImg, (req, res) => {
    let id = setUserImages()
    res.send(id)
  })
}