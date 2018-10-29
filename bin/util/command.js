const nodecmd = require('node-cmd');

exports = (command) => {
    return new Promise((resolve, reject) => {
        nodecmd.get(command, (err, data) => {
            if (err) {
                return reject(err);
            }
            return resolve(data);
        });
    })
}