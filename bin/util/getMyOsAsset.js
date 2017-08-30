const os = require('os');

module.exports = (assets) => {
    switch (os.type()) {
        case 'Windows_NT':
        return assets.filter(q => q.name.indexOf('windows') >= 0).filter(q => q.filename = 'teresa.exe')[0];
        case 'Linux':
        return assets.filter(q => q.name.indexOf('linux') >= 0).filter(q => q.filename = 'teresa')[0];
        default:
        return assets.filter(q => q.name.indexOf('darwin') >= 0).filter(q => q.filename = 'teresa')[0];
        break;
    }
}
