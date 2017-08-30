const download = require('download')
const path = require('path');
const fs = require('fs');

module.exports = (options) => {
    return new Promise((resolve, reject) => {
        download(options.url)
            .then(data => {
                fs.writeFileSync(`${options.directory}//${options.filename}`, data);
                return resolve(path.join(options.directory, options.filename));
            }).catch(err => {
                return reject(err);
            });
    })
}
