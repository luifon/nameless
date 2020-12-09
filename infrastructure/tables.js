class Tables {
    init(connection) {
        this.connection = connection;
        this.createAppointmentTable();
    }

    createAppointmentTable() {
        const sql =
            'create table if not exists tb_appointments (' +
            'id INT NOT NULL AUTO_INCREMENT, ' +
            'patient varchar(50) NOT NULL, ' +
            'service varchar(20) NOT NULL, ' +
            'status varchar(20) NOT NULL, ' +
            'observations text, ' +
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
