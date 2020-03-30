const { getMarketFolder, logger } = require('../utils');
const path = require('path');
const { spawn } = require('child_process');

module.exports = async (cmdObj) => {
    logger.info(cmdObj._description);

    try {
        const marketFolder = getMarketFolder();
        const ksyncPath = path.join(__dirname, 'lib', 'ksync3.jar');

        if (marketFolder) {
            const ksync = spawn('java', ['-jar', ksyncPath, ...cmdObj]);

            process.stdin.pipe(ksync.stdin);

            ksync.stdout.on('data', data => {
                console.log(`${data}`.trim());
            });

            ksync.stderr.on('data', data => {
                console.log(`${data}`.trim());
            });

            ksync.on('error', (error) => {
                logger.error(`${error.message}`);
            });

            ksync.on('close', code => {
                process.exit(0);
                // Log when ksync exit
            });
        }
    } catch (e) {
        logger.error(`${e.message}`);
    }
};
