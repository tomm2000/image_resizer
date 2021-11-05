import fs from 'fs'

interface file {
  path: string,
  name: string,
  extension: string,
}

export function findFiles(start: string, path: string, extension: string): file[] {
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
      files = files.concat(findFiles(start, `${path}/${thing}`, extension))
    }
  })

  return files
}