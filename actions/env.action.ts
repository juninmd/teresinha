import * as fs from 'fs';
import * as path from 'path';

import command from '../util/command.util';
import teresa from '../util/teresa.util';

export default async (appName: string, envFilePath: string) => {

  const pathResolved = path.resolve(envFilePath);

  if (!fs.existsSync(pathResolved)) {
    console.log(`${pathResolved} não foi encontrado`);
    return;
  }

  const allEnvs = fs.readFileSync(pathResolved).toString().split('\n').filter(q => q[0] !== '#' && q !== '');

  const allEnvsParsed = teresa.parserEnv(allEnvs);

  if (allEnvsParsed.length === 0) {
    return;
  }

  return command(`teresa app env-set ${allEnvsParsed.join(' ')} --app ${appName} --no-input`);
};
