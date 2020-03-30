const { logger } = require('../utils');
const fs = require('fs');
const path = require('path');

module.exports = (appName, newVersion, folderName, subFolder, subFolderPath) => {
    let isUpdated = false;

    // Update "admin"
    // ------------------------------------------
    const adminDependenciesPath = path.join(subFolderPath, 'admin', 'theme', 'apps', subFolder, 'dependencies.json');
    if (fs.existsSync(adminDependenciesPath)) {
        const adminDependencies = require(adminDependenciesPath);

        if (Array.isArray(adminDependencies.appDependencies)) {
            for (let dependedApp of adminDependencies.appDependencies) {
                if (dependedApp.appId === appName) {
                    dependedApp.branch = newVersion;
                    isUpdated = true;
                }
            }

            fs.writeFileSync(adminDependenciesPath, JSON.stringify(adminDependencies, ' ', 2));
        }
    }

    // Update "common"
    // ------------------------------------------
    const commonDependenciesPath = path.join(subFolderPath, 'common', 'theme', 'apps', subFolder, 'dependencies.json');
    if (fs.existsSync(commonDependenciesPath)) {
        const commonDependencies = require(commonDependenciesPath);

        if (Array.isArray(commonDependencies.appDependencies)) {
            for (let dependedApp of commonDependencies.appDependencies) {
                if (dependedApp.appId === appName) {
                    dependedApp.branch = newVersion;
                    isUpdated = true;
                }
            }

            fs.writeFileSync(commonDependenciesPath, JSON.stringify(commonDependencies, ' ', 2));
        }
    }

    // Update "website"
    // ------------------------------------------
    const webDependenciesPath = path.join(subFolderPath, 'website', 'theme', 'apps', subFolder, 'dependencies.json');

    if (fs.existsSync(webDependenciesPath)) {
        const webDependencies = require(webDependenciesPath);

        if (Array.isArray(webDependencies.appDependencies)) {
            for (let dependedApp of webDependencies.appDependencies) {
                if (dependedApp.appId === appName) {
                    dependedApp.branch = newVersion;
                    isUpdated = true;
                }
            }

            fs.writeFileSync(webDependenciesPath, JSON.stringify(webDependencies, ' ', 2));
        }
    }

    if (isUpdated) {
        logger.info(` -> Update on "${folderName}/${subFolder}"`);
    }

    return isUpdated;
};
