const { config: { setConfig, getConfig }, logger } = require('../utils');

module.exports = async (name, cmdObj) => {
    if (cmdObj.configValue) {
        setConfig(name, cmdObj.configValue);
        logger.info(`${name}=${cmdObj.configValue || ''}`);
    } else {
        logger.info(`${name}=${getConfig(name)}`);
    }
};
