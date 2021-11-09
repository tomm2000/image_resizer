import fs from 'fs'

import { path } from '../config/const'

interface file {
  path: string,
  name: string,
  extension: string,
}

export function findRoutes(start: string, path: string, extension: string): file[] {
  let search = []

  try {
    search = fs.readdirSync(start + path)
  } catch (error) {
    console.log('[WARN] route folder not found!')
    return []
  }
  let files: file[] = []

  search.forEach((thing) => {
    if(thing.endsWith(extension)) {
      files.push({
        name: thing.replace(extension, ''),
        path: path,
        extension
      })
    } else if(!thing.includes('.')) {
      files = files.concat(findRoutes(start, `${path}/${thing}`, extension))
    }
  })

  return files
}

export function openRoutes(app: Express.Application, files: file[]) {
  files.forEach((route) => {
    let r = require(`${global.home_dir}\\${path.ROUTES}\\${route.path}\\${route.name}${route.extension}`)
    if(r.get)
      r.get(app, `${route.path}/${route.name}`)
    if(r.post)
      r.post(app, `${route.path}/${route.name}`)
  })
}