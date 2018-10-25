#!/usr/bin/env node
const version = require('./package.json').version;
const program = require('commander');
const os = require('os');
const { checkUpdate, download, startAllApps, setConfigs } = require('./bin/actions');

if (process.argv.length === 2) {
  console.log('Verifique os comandos com $ teresinha --help')
}

program
  .version(version)
  .command('check')
  .description('Verifica a versão do teresa cli')
  .action(async () => {
    try {
      await checkUpdate();
    } catch (error) {
      console.error(error.message);
    }
  });

program
  .command('update')
  .description('Atualiza o teresa cli')
  .action(async () => {
    try {
      await download();
    } catch (error) {
      console.error(error.message);
    }
  });

program
  .command('start')
  .description('Starta todos seus apps')
  .action(async () => {
    try {
      await startAllApps();
    } catch (error) {
      console.error(error.message);
    }
  });

program
  .command('env')
  .description('Configura variáveis de ambiente em massa')
  .action(async () => {
    try {

      if (os.type() === 'Windows_NT') {
        console.log('Não disponível para Windows');
        return;
      }

      const app = process.argv[3];
      if (!app) {
        console.log('Informe nome do app');
        return;
      }
      const envPath = process.argv[4];
      if (!envPath) {
        console.log('Informe caminho do .env');
        return;
      }

      await setConfigs(app, envPath);
    } catch (error) {
      console.error(error.message);
    }
  });

program.parse(process.argv);