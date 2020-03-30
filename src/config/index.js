const config = require('./config');

module.exports = (program) => {
    program
        .command('config')
        .description('Set or get your configuration')
        .requiredOption('-cn, --config-name <configName>', 'Name of configuration')
        .option('-cv, --configValue <configValue>', 'Value of configuration')
        .action(config);
};
