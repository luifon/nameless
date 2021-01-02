const fs = require('fs');
const path = require('path');

module.exports = (filePath, fileName, imageCreatedCallback) => {
    const type = path.extname(filePath);
    const newPath = `./assets/images/${fileName}${type}`;
    fs.createReadStream(filePath)
        .pipe(fs.createWriteStream(newPath))
        .on('finish', () => imageCreatedCallback(newPath));
};
