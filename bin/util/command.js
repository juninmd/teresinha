const nodecmd = require('node-cmd');

module.exports = (command) => {
    console.log('\x1b[36m%s\x1b[0m', '[teresinha command] begin');
    console.log('\x1b[36m%s\x1b[0m', 'command ->', command);
    return new Promise((resolve, reject) => {
        nodecmd.get(command, (err, data) => {
            if (err) {
                console.log(err);
                console.log('[teresinha command] end');
                return reject(err);
            }
            console.log(data);
            console.log('\x1b[36m%s\x1b[0m', '[teresinha command] end');
            return resolve(data);
        });
    })
}