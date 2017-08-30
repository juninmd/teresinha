const hades = require('hades-request');
const webconfig = require('../webconfig');

module.exports = () => {
    return {
        getTeresa: getTeresa
    }
}

async function getTeresa() {
    const options = {
        url: `https://api.github.com/repos/luizalabs/teresa/releases/latest?access_token=${webconfig.github.token}`,
        method: 'GET',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:50.0) Gecko/20100101 Firefox/50.0'
        }
    };
    return await hades.do(options);
}