const customExpress = require('./config/customExpress');
const connection = require('./infrastructure/connection');

const tables = require('./infrastructure/tables');

connection.connect((err) => {
    if (err) {
        console.log(err);
    }
    {
        console.log('conectado com sucesso');

        tables.init(connection);

        const app = customExpress();
        app.listen(3000, () => console.log('servidor rodando'));
    }
});
