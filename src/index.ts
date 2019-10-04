#!/usr/bin/env node
// tslint:disable-next-line:no-var-requires
const version = require('../package.json').version;

import * as os from 'os';
import * as program from 'commander';

import { checkUpdate, download, env, getAllEnvs, setAllEnvs, start } from './actions';

if (process.argv.length === 2) {
  console.log('Verifique os comandos com $ teresinha --help');
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
      await start();
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

      await env(app, envPath);
    } catch (error) {
      console.error(error.message);
      console.error(error);
    }
  }).on('--help', () => {
    console.log('');
    console.log('Example:');
    console.log('');
    console.log('  $ teresinha env {nomedoapp} {caminho}');
  });

program
  .command('getAllEnvs')
  .description('Copia todas as variáveis de ambiente em massa')
  .action(async () => {
    try {

      if (os.type() === 'Windows_NT') {
        console.log('Não disponível para Windows');
        return;
      }

      const envPath = process.argv[3];
      if (!envPath) {
        console.log('Informe caminho de onde irá salvar os .env');
        return;
      }

      await getAllEnvs(envPath);
    } catch (error) {
      console.error(error.message);
      console.error(error);
    }
  }).on('--help', () => {
    console.log('');
    console.log('Example:');
    console.log('');
    console.log('  $ teresinha getAllEnvs {caminho}');
  });

program
  .command('setAllEnvs')
  .description('Seta todas as variáveis de ambiente em massa')
  .action(async () => {
    try {

      if (os.type() === 'Windows_NT') {
        console.log('Não disponível para Windows');
        return;
      }

      const envPath = process.argv[3];
      if (!envPath) {
        console.log('Informe caminho de onde irá copiar os .env');
        return;
      }

      await setAllEnvs(envPath);
    } catch (error) {
      console.error(error.message);
      console.error(error);
    }
  }).on('--help', () => {
    console.log('');
    console.log('Example:');
    console.log('');
    console.log('  $ teresinha setAllEnvs {caminho}');
  });

program.parse(process.argv);
