module.exports = (program) => {
    program
        .command('sync [params...]')
        .description('Sync your applications')
        .allowUnknownOption()
        .action(require('./cmdSync'));
};
