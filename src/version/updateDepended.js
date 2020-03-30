const { getMarketFolder, logger } = require('../utils');
const fs = require('fs');
const path = require('path');
const updateApp = require('./updateApp');

module.exports = (appName, newVersion, folderName) => {
    const marketFolder = getMarketFolder();
    const targetFolderPath = path.join(marketFolder, folderName);
    const subFolders = fs.readdirSync(targetFolderPath);
    let numberDepended = 0;

    for (const subFolder of subFolders) {
        const subFolderPath = path.join(targetFolderPath, subFolder);
        const stat = fs.statSync(subFolderPath);
        if (stat.isDirectory()) {
            updateApp(appName, newVersion, folderName, subFolder, subFolderPath) && numberDepended++;
        }
    }

    return numberDepended;
};
