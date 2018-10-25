const download = require('download')
const path = require('path');
const fs = require('fs');
const loading = require('loading-indicator');

module.exports = async (options) => {
    const timer = loading.start('Baixando...');
    try {
        const data = download(options.url);
        loading.stop(timer);
        fs.writeFileSync(`${options.directory}//${options.filename}`, data);
        return path.join(options.directory, options.filename);
    } catch (error) {
        loading.stop(timer);
        throw error;
    }
}