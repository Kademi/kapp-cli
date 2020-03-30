const { config: { setConfig, getConfig }, logger } = require('../utils');

module.exports = async (cmdObj) => {
    if (cmdObj.configValue) {
        setConfig(cmdObj.configName, cmdObj.configValue)
        logger.info(`${cmdObj.configName}=${cmdObj.configValue}`);
    } else {
        logger.info(`${cmdObj.configName}=${getConfig(cmdObj.configName)}`);
    }
};
