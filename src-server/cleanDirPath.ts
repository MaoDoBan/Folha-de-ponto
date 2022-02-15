import path from 'path';
import { fileURLToPath } from 'url';

export function cleanDirPath(crudePath: string){
  const pathWithFileName = fileURLToPath(crudePath);
  const pathToServerDir = path.dirname(pathWithFileName);

  const pieces = pathToServerDir.split("\\");
  pieces.pop();
  return pieces.join('/');
}