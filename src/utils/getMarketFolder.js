const path = require('path');
const fs = require('fs');
const logger = require('../utils/logger');
const { getConfig, listConfig } = require('../utils/config');

module.exports = () => {
    const configKademiPath = getConfig(listConfig.KADEMI_PATH);

    if (!configKademiPath) {
        logger.error(`"${listConfig.KADEMI_PATH}" is not set. Please use "kapp config -cn ${listConfig.KADEMI_PATH} -cv /path/to/kademi" to set`);
        return;
    }

    if (configKademiPath && !fs.existsSync(configKademiPath)) {
        logger.error(`"${configKademiPath}" does not exist`);
        return;
    }

    return path.join(configKademiPath, 'kademi-dev', 'src', 'main', 'marketplace');
};
