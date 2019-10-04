import * as os from 'os';

import command from './command.util';
import sudo from 'sudo';

async function setSudo() {

  if (os.type() === 'Windows_NT') {
    return {};
  }

  const options = {
    cachePassword: true,
    prompt: '[sudo] Digite sua senha: ',
    spawnOptions: {},
  };
  const child = sudo(['ls', '-l', '/tmp', 'mv'], options);
  child.stdout.on('data', () => {
    return {};
  });
  return {};
}

async function verifyInstalled() {
  try {
    return await command('teresa') == null;
  } catch (error) {
    return false;
  }
}

async function verifyVersion() {
  const data = await command('teresa version');
  return data.replace('Version: ', '').trim();
}

async function setChmod(path) {
  if (os.type() === 'Windows_NT') {
    return {};
  }
  return command(`sudo chmod 777 ${path}`);
}

async function movePath(path, filename) {
  let comando = '';
  switch (os.type()) {
    case 'Windows_NT':
      comando = `move '${path}\\${filename}' 'c:\\windows\\system32\\'`;
      break;
    default:
      comando = `sudo mv ${path}//${filename} /usr/local/bin/`;
      break;
  }
  return command(comando);
}

async function allApps() {
  const allApps: any[] = [];

  const rawApps = (await command('teresa app list')).split('\n');

  for (const line of rawApps) {
    if (line[0] === '+') {
      continue;
    }

    if (line[0] === '|') {
      const app = line.split('|')[2].trim();
      if (app === 'APP') {
        continue;
      }
      allApps.push(app);
    }
  }

  return allApps;
}

async function getEnvVars(app) {
  const envVars: any = {
    app,
    envs: [],
  };

  const rawInfo = (await command(`teresa app info ${app}`)).split('\n');

  let envs = false;
  for (const line of rawInfo) {

    if (line === 'env vars:') {
      envs = true;
      continue;
    }

    if (!envs) {
      continue;
    }

    if (line === 'status:') {
      break;
    }

    envVars.envs.push(line.trim());
  }

  return envVars;
}

export default {
  setSudo,
  verifyInstalled,
  verifyVersion,
  setChmod,
  movePath,
  allApps,
  getEnvVars,
};
