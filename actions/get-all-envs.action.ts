import * as fs from 'fs';
import * as path from 'path';

import teresa from '../util/teresa.util';

export default async (pathName) => {

  const pathResolved = path.resolve(pathName);

  console.log('[teresinha] Caminho do Arquivo: ' + pathResolved);

  if (!fs.existsSync(pathResolved)) {
    console.log(`${pathResolved} não foi encontrado`);
    return;
  }

  const apps = await teresa.allApps();

  const envVars = await Promise.all(apps.map((app) => {
    return teresa.getEnvVars(app);
  }));

  envVars.map((item: any) => {
    fs.writeFileSync(`${pathResolved}/.env-${item.app}`, item.envs.join('\n'));
  });

  return envVars;
};
