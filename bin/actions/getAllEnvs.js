const fs = require('fs');
const path = require('path');

const { allApps, getEnvVars } = require('../util/teresa');
module.exports = async (pathName) => {

  const pathResolved = path.resolve(pathName);

  console.log('[teresinha] Caminho do Arquivo: ' + pathResolved);

  if (!fs.existsSync(pathResolved)) {
    console.log(`${pathResolved} não foi encontrado`)
    return;
  }

  const apps = await allApps();

  const envVars = await Promise.all(apps.map(app => {
    return getEnvVars(app);
  }));


  envVars.map((item) => {
    fs.writeFileSync(`${pathResolved}/.env-${item.app}`, item.envs.join('\n'));
  })

  return envVars;
};