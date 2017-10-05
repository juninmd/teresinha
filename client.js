#!/usr/bin/env node
const version = require('./package.json').version;
const program = require('commander');
const checkUpdate = require('./bin/actions/checkUpdate');
const download = require('./bin/actions/downloadTeresa');

if(process.argv.length == 2){
    console.log('Verifique os comandos com $ teresinha --help')
}

program
.version(version)
.command('check')
.description('Verifica a versão do teresinha')
.action((req, optional) => {
    checkUpdate();
});

program
.command('update')
.description('Atualiza o teresa cli')
.action(() => {
    download()
});


program.parse(process.argv);