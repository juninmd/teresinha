import * as fs from 'fs';

import command from '../util/command.util';

export default async (appName, path) => {
  if (!fs.existsSync(path)) {
    console.log(`${path} não foi encontrado`);
    return;
  }
  const allEnvs = fs.readFileSync(path).toString().split('\n').filter(q => q[0] !== '#' && q !== '');

  if (allEnvs[0] == null) {
    return undefined;
  }
  return command(`teresa app env-set ${allEnvs.join(' ')} --app ${appName} --no-input`);
};
