#!/usr/bin/env node

const packageJson = require('../package');
const program = require('commander');
const printBanner = require('../src/utils/printBanner');


// Setup program
// -----------------------------------------
program.version(packageJson.version, '-v, --version', 'output the version number');
program.description(packageJson.description);
program.usage(`[command] [options] `);


// Commands
// -----------------------------------------
// require('../src/config')(program);
require('../src/version')(program);
require('../src/sync')(program);


// Invalid command
// -----------------------------------------
program.on('command:*', () => {
    console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '));
    process.exit(1);
});


// Print banner if printing help
// -----------------------------------------
if (process.argv.indexOf('-h') !== -1 || process.argv.indexOf('--help') !== -1) {
    printBanner();
}


// Print banner when no command
// -----------------------------------------
if (process.argv.length <= 2) {
    printBanner();
}


// Start program
// -----------------------------------------
program.parse(process.argv);
