const increaseVersion = require('./increaseVersion');

module.exports = (program) => {
    program
        .command('version <name>')
        .description('Update application version')
        .option('-nv, --new-version <newVersion>', 'New version number')
        .option('-ud, --update-depended', 'Update version on depended apps')
        .action(increaseVersion);
};
