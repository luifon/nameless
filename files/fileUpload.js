const fs = require('fs');

fs.createReadStream('./assets/home.jpeg')
    .pipe(fs.createWriteStream('./assets/home-stream.jpeg'))
    .on('finish', () => console.log('imagem escrita com sucesso'));
