const { logger, increaseVersion } = require('../utils');
const path = require('path');
const fs = require('fs');
const updateAppByFolder = require('./updateAppByFolder');
const CURRENT_FOLDER = process.cwd();

module.exports = async (name, cmdObj) => {
    logger.info(cmdObj._description);

    try {

        const appPathAtCurrent = path.join(CURRENT_FOLDER, name);
        const appPathAtApps = path.join(CURRENT_FOLDER, 'apps', name);
        const appPathAtLibs = path.join(CURRENT_FOLDER, 'libs', name);
        const appPathAtThemes = path.join(CURRENT_FOLDER, 'repositories', name);
        const appPathAtRepo = path.join(CURRENT_FOLDER, 'themes', name);
        let appPath;

        if (fs.existsSync(appPathAtCurrent)) {
            appPath = appPathAtCurrent;
        } else if (fs.existsSync(appPathAtApps)) {
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
        const currentVersion = `${fs.readFileSync(versionPath)}`.trim();
        let newVersion;
        if (cmdObj.newVersion) {
            newVersion = cmdObj.newVersion;
        } else {
            newVersion = increaseVersion(`${currentVersion}`);
        }
        logger.info(` -> Increase version of "${name}" from "${currentVersion}" to "${newVersion}"`);
        fs.writeFileSync(versionPath, newVersion);

        if (cmdObj.updateDepended) {
            logger.info(` -> Updating version to depended apps...`);

            let updatedNumber = 0;
            updatedNumber += updateAppByFolder(name, newVersion, CURRENT_FOLDER);
            updatedNumber += updateAppByFolder(name, newVersion, path.join(CURRENT_FOLDER, 'apps'));
            updatedNumber += updateAppByFolder(name, newVersion, path.join(CURRENT_FOLDER, 'libs'));
            updatedNumber += updateAppByFolder(name, newVersion, path.join(CURRENT_FOLDER, 'repositories'));
            updatedNumber += updateAppByFolder(name, newVersion, path.join(CURRENT_FOLDER, 'themes'));

            logger.info(` -> Updated on ${updatedNumber} app(s)`);
        }

        logger.info(` -> Done!`);
    } catch (e) {
        logger.error(`${e.message}`);
    }
};
