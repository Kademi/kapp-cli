const { getMarketFolder, logger, increaseVersion } = require('../utils');
const path = require('path');
const fs = require('fs');
const updateDepended = require('./updateDepended');

module.exports = async (name, cmdObj) => {
    logger.info(cmdObj._description);

    try {
        const marketFolder = getMarketFolder();
        if (!marketFolder) {
            return;
        }

        const appPathAtApps = path.join(marketFolder, 'apps', name);
        const appPathAtLibs = path.join(marketFolder, 'libs', name);
        const appPathAtThemes = path.join(marketFolder, 'repositories', name);
        const appPathAtRepo = path.join(marketFolder, 'themes', name);
        let appPath;

        if (fs.existsSync(appPathAtApps)) {
            appPath = appPathAtApps;
        } else if (fs.existsSync(appPathAtLibs)) {
            appPath = appPathAtLibs;
        } else if (fs.existsSync(appPathAtThemes)) {
            appPath = appPathAtThemes;
        } else if (fs.existsSync(appPathAtRepo)) {
            appPath = appPathAtRepo;
        }

        if (!appPath) {
            logger.error(`App named "${name}" does not exist!`);
            return;
        }

        const versionPath = path.join(appPath, 'app-version.txt');
        const currentVersion = fs.readFileSync(versionPath);
        const newVersion = increaseVersion(`${currentVersion}`);
        logger.info(` -> Increase version of "${name}" from "${currentVersion}" to "${newVersion}"`);
        fs.writeFileSync(versionPath, newVersion);

        if (cmdObj.updateDepended) {
            logger.info(` -> Updating version to depended apps...`);

            let updatedNumber = 0;
            updatedNumber += updateDepended(name, newVersion, 'apps');
            updatedNumber += updateDepended(name, newVersion, 'libs');
            updatedNumber += updateDepended(name, newVersion, 'repositories');
            updatedNumber += updateDepended(name, newVersion, 'themes')

            logger.info(` -> Updated on ${updatedNumber} app(s)`);
        }

        logger.info(` -> Done`);
    } catch (e) {
        logger.error(`${e.message}`);
    }
};
