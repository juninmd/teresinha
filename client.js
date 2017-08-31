#!/usr/bin/env node
const version = require('./package.json').version;
const program = require('commander');
const checkUpdate = require('./bin/actions/checkUpdate');
const download = require('./bin/actions/downloadTeresa');

program
    .version(version)
    .command('check')
    .description('Verifica a versão do teresinha')
    .action((req, optional) => {
        console.log("check");
        checkUpdate();
    });

program
    .command('update')
    .description('Atualiza o teresa cli')
    .option('-p, --path', 'Selecione o diretório')
    .action((directory, options) => {
        if (options.path){
            console.log(directory);
            download()
        }
        else {
            console.log("por favor, preencha o caminho")
        }
    });


program.parse(process.argv);
