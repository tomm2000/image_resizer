import express from 'express'
import { getUserImages } from '../model/data';


type QueryParams = {
  user_id: string
};

export function post(app: express.Application, route: string) {
  console.log(`[INFO] laoded route: ${route}`)

  app.get(route, (req: express.Request<{}, {}, {}, QueryParams>, res: express.Response) => {
    // let files = fs.readdirSync(`${global.uploads_dir}\\converted`)
    // res.sendFile(`${global.uploads_dir}\\converted\\${files[0]}`)

    let id = req.query.user_id

    // console.log(`requested image: ${id}`)

    let files = getUserImages(id)
    
    if(files.length > 0)
      res.sendFile(files[0])
    else
      res.send(JSON.stringify({result: 'error'}))
    // res.send(JSON.stringify({result: 'success', id}))
  })
}