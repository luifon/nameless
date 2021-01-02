const fs = require('fs');
const path = require('path');

module.exports = (filePath, fileName, imageCreatedCallback) => {
    const type = path.extname(filePath);

    const validTypes = ['jpg', 'png', 'jpeg'];

    const isTypeValid = validTypes.indexOf(type.substr(1)) !== -1;

    if (!isTypeValid) {
        const message = 'Error: Invalid media type.';
        console.log('Error: Invalid media type.');
        imageCreatedCallback(message);
    } else {
        const newPath = `./assets/images/${fileName}${type}`;
        fs.createReadStream(filePath)
            .pipe(fs.createWriteStream(newPath))
            .on('finish', () => imageCreatedCallback(false, newPath));
    }
};
