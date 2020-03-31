module.exports = (program) => {
    program
        .command('config <name>')
        .description('Set or get your configuration')
        .option('-cv, --config-value <configValue>', 'Value of configuration. Leave it blank if you want to get value')
        .action(require('./cmdConfig'));
};
