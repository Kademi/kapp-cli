const { logger } = require('../utils');
const fs = require('fs');
const path = require('path');

module.exports = (appName, newVersion, folderName, subFolder, subFolderPath) => {
    let isUpdated = false;
    const updateAppFolder = (appFolderName) => {
        const adminDependenciesPath = path.join(subFolderPath, appFolderName, 'theme', 'apps', subFolder, 'dependencies.json');
        if (fs.existsSync(adminDependenciesPath)) {
            const adminDependencies = require(adminDependenciesPath);

            if (Array.isArray(adminDependencies.appDependencies)) {
                for (let dependedApp of adminDependencies.appDependencies) {
                    if (dependedApp.appId === appName) {
                        dependedApp.branch = newVersion;
                        isUpdated = true;
                        fs.writeFileSync(adminDependenciesPath, JSON.stringify(adminDependencies, ' ', 4));
                        break;
                    }
                }
            }
        }
    };

    updateAppFolder('common');
    updateAppFolder('admin');
    updateAppFolder('website');

    if (isUpdated) {
        logger.info(` -> Update on "${folderName}/${subFolder}"`);
    }

    return isUpdated;
};
