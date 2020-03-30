// Print banner
// -----------------------------------------
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const packageJson = require('../../package');

module.exports = () => {
    clear();
    console.log(
        chalk.blue(
            figlet.textSync('kapp-cli', {
                // font: 'Swamp Land',
                // font: '3D-ASCII',
                // font: 'Alligator',
                // font: 'Larry 3D',
                // font: 'Rammstein',
                // font: 'Rounded',
                horizontalLayout: 'full',
            })
        )
    );
};
