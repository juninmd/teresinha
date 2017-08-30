`/repos/luizalabs/teresa/releases/latest`
const hades = require('hades-request');

getTeresa: () => {
    return new Promise((resolve, reject) => {
        const options = {
            url: `https://api.github.com/orgs/${webconfig.github.owner}/repos?access_token=${webconfig.github.token}`,
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:50.0) Gecko/20100101 Firefox/50.0'
            }
        };

        hades.do(options)
            .then(result => {
                return resolve(result);
            })
            .catch(err => {
                return reject(err);
            })
    })
};