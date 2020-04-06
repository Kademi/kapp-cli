const { logger } = require('../utils');
const { spawn } = require('child_process');

module.exports = async (params, cmdObj) => {
    logger.info(cmdObj._description);

    try {
        const ksyncPath = require.resolve('@kademi/ksync/dist/ksync3.jar');
        const ksync = spawn('java', ['-jar', ksyncPath, ...params]);

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
    } catch (e) {
        logger.error(`${e.message}`);
    }
};
