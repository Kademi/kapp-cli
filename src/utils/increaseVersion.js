module.exports = (currentVersion) => ((+currentVersion.replace(/\./g, '') + 1) + '').replace(/^(\d+)(\d)(\d)$/g, '$1.$2.$3');
