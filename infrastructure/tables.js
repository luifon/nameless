class Tables {
    init(connection) {
        this.connection = connection;
        this.createAppointmentTable();
    }

    createAppointmentTable() {
        const sql =
            'CREATE TABLE IF NOT EXISTS tb_appointments (' +
            'id INT NOT NULL AUTO_INCREMENT, ' +
            'patient varchar(50) NOT NULL, ' +
            'service varchar(20) NOT NULL, ' +
            'status varchar(20) NOT NULL, ' +
            'observations text, ' +
            'created_at datetime NOT NULL, ' +
            'date datetime NOT NULL, ' +
            'PRIMARY KEY(id)' +
            ')';

        this.connection.query(sql, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('appointment table successfully created');
            }
        });
    }
}

module.exports = new Tables();
