import { spawn } from 'child_process'

export function run_script(path: string, args: string[], callback: (stdout: string) => any) {
  var dataToSend = ''

  const python = spawn('python', [path].concat(args));

  python.stdout.on('data', function (data) {
    let out: string = data.toString()

    dataToSend = out
  });

  python.on('close', (code) => {
    callback(dataToSend)
  });
}

export function file_resize(script: string, folder_path: string, aspect_w: number, aspect_h: number, callback: (stdout: string) => any) {
  let w = aspect_w.toString()
  let h = aspect_h.toString()
  
  run_script(script, [folder_path, w, h], callback);
}