const notifier = require('node-notifier');
const path = require('path');

// Object
notifier.notify({
    title: 'Teresinha',
    message: 'Hey, temos uma nova versão do Teresa disponível!',
    sound: 'true',
    icon: path.join(__dirname, 'teresinha.jpg'),
    wait: true 
});

notifier.on('click', function (notifierObject, options) {

});

notifier.on('timeout', function (notifierObject, options) {
    // Triggers if `wait: true` and notification closes
});