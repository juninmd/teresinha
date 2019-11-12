import * as fs from 'fs';
import * as path from 'path';
import teresa from '../util/teresa.util';

import command from '../util/command.util';

export default async (pathName) => {

  const pathResolved = path.resolve(pathName);

  if (!fs.existsSync(pathResolved)) {
    console.log(`${pathResolved} não foi encontrado`);
    return;
  }

  const promises: Promise<any>[] = [];

  const envsFiles = fs.readdirSync(pathResolved);

  for (const envFile of envsFiles) {

    const appName = envFile.split('.env-')[1];

    const allEnvs = fs.readFileSync(`${pathResolved}/${envFile}`).toString().split('\n').filter(q => q[0] !== '#' && q !== '');

    const allEnvsParsed = teresa.parserEnv(allEnvs);

    if (allEnvsParsed.length === 0) {
      continue;
    }

    promises.push(command(`teresa app env-set ${allEnvsParsed.join(' ')} --app ${appName} --no-input`));

  }

  return Promise.all(promises);
};
