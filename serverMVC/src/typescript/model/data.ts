import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import { file_resize } from "../controller/pythonAPI";

export const getUserImages = function (user_id: string): string[] {
  let path = `${global.uploads_dir}\\converted\\${user_id}`
  
  try {
    let files = fs.readdirSync(path)
    return files.map((file) => `${path}\\${file}`)
  } catch (error) {
    return []
  }
};

export const setUserImages = function () {
  let id: string = uuidv4();

  const script_path = `${global.home_dir}\\python\\main.py`;
  const dest_path = `${global.uploads_dir}\\converted\\${id}`;

  file_resize(script_path, `${global.uploads_dir}`, id, 9, 16, (out) => { });

  return id;
};

export const clearStorage = function () {
  //TODO: remove unecessary files!!
  let converting_files = fs.readdirSync(`${global.uploads_dir}`)
  for(let file of converting_files) {
    if(file != 'converted'){
      fs.unlink(`${global.uploads_dir}\\${file}`, () => {})
    }
  }

  let converted = fs.readdirSync(`${global.uploads_dir}\\converted`)
  converted.forEach((namespace) => {
    fs.rmSync(`${global.uploads_dir}\\converted\\${namespace}`, { recursive: true, force: true})
  })
}