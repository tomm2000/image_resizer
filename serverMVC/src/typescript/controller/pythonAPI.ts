import { spawn } from 'child_process'

export function run_script(path: string, args: string[], callback: (stdout: string) => any) {
  var dataToSend = ''

  // console.log(args)

  const python = spawn('python', [path].concat(args));

  python.stdout.on('data', function (data) {
    let out: string = data.toString()

    dataToSend = out
  });

  python.on('close', (code) => {
    callback(dataToSend)
  });
}

export function file_resize(script_path: string, upload_dir: string, namespace: string, aspect_w: number, aspect_h: number, callback: (stdout: string) => any) {
  let w = aspect_w.toString()
  let h = aspect_h.toString()
  
  run_script(script_path, [upload_dir, namespace, w, h], callback);
}