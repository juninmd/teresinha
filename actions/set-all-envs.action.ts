import * as fs from 'fs';
import * as path from 'path';

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

    if (allEnvs[0] == null) {
      continue;
    }

    promises.push(command(`teresa app env-set ${allEnvs.join(' ')} --app ${appName} --no-input`));

  }

  return Promise.all(promises);
};
