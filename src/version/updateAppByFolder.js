const fs = require('fs');
const path = require('path');
const updateApp = require('./updateApp');

module.exports = (appName, newVersion, targetFolderPath) => {
    if (!fs.existsSync(targetFolderPath)) {
        return 0;
    }

    const subFolders = fs.readdirSync(targetFolderPath);
    let numberDepended = 0;

    for (const subFolder of subFolders) {
        const subFolderPath = path.join(targetFolderPath, subFolder);
        const stat = fs.statSync(subFolderPath);
        if (stat.isDirectory()) {
            updateApp(appName, newVersion, subFolder, subFolderPath) && numberDepended++;
        }
    }

    return numberDepended;
};
