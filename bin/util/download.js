const download = require('download')
const path = require('path');
const fs = require('fs');
const loading = require('loading-indicator');

module.exports = (options) => {
    return new Promise((resolve, reject) => {
      const timer = loading.start('Baixando...');
        download(options.url)
            .then(data => {
                loading.stop(timer);
                fs.writeFileSync(`${options.directory}//${options.filename}`, data);
                return resolve(path.join(options.directory, options.filename));
            }).catch(err => {
              loading.stop(timer);  
              return reject(err);
            });
    })
}