const chalk = require('chalk');

module.exports = {
    error: (message) => console.log(`${chalk.red('[ERROR]')} ${message}`),
    info: (message) => console.log(`${chalk.blue('[INFO]')} ${message}`),
    warn: (message) => console.log(`${chalk.yellow('[WARN]')} ${message}`),
};
