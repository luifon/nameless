const connection = require('../infrastructure/connection');

class Appointments {
    create(appointment) {
        const sql = 'INSERT INTO tb_appointments SET ?';

        connection.query(sql, appointment, (err, results) => {
            if (err) {
                console.log(err);
            } else {
                console.log(results);
            }
        });
    }
}

module.exports = new Appointments();
