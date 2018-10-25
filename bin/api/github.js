const { get } = require('axios');
const webconfig = require('../../webconfig');

module.exports = () => {
    return get(`https://api.github.com/repos/luizalabs/teresa/releases/latest?access_token=${Buffer.from(webconfig.token, 'base64')}`);
}