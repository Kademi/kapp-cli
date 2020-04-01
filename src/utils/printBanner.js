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
            `=====================[ (c) Kademi ]=====================\n`
            +
            figlet.textSync('Kapp CLI', {
                horizontalLayout: 'full',
            })
            +
            `\n==================[ http://kademi.co ]==================`
        )
    );
};
