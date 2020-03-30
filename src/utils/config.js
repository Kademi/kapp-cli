const HOME_DIR = require('os').homedir();
const fs = require('fs');
const path = require('path');
const makeDir = require('make-dir');
const configPath = path.join(HOME_DIR, '.kapp', 'config.json');

if (!fs.existsSync(configPath)) {
    makeDir.sync(path.join(HOME_DIR, '.kapp'));
    fs.writeFileSync(configPath, JSON.stringify({}, ' ', 4));
}

module.exports = {
    setConfig: (key, value) => {
        const config = require(configPath);
        config[key] = value;

        fs.writeFileSync(configPath, JSON.stringify(config, ' ', 4));
    },

    getConfig: (key) => {
        const config = require(configPath);

        return config[key];
    },

    listConfig: {
        KADEMI_PATH: 'kademiPath',
    },
};
