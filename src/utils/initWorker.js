const path = require('path');
const fs = require('fs');
const makeDir = require('make-dir');
const logger = require('./logger');
const genContent = require('./genContent');

module.exports = (rootFolder) => {
    return {
        createFolder: (folderPath) => {
            logger.info(`-> Create "${folderPath}" folder`);
            makeDir.sync(path.join(rootFolder, folderPath));
        },

        createFile: (filePath, template, data) => {
            logger.info(`-> Create "${filePath}" file`);
            fs.writeFileSync(
                path.join(rootFolder, filePath),
                genContent(template, data),
            );
        },

        updateFile: (filePath, template, data) => {
            logger.info(`-> Update "${filePath}" file`);
            fs.writeFileSync(
                path.join(rootFolder, filePath),
                genContent(template, data),
            );
        },
    }
};
