const { isDate } = require('moment');
const moment = require('moment');
const connection = require('../infrastructure/connection');

class Appointments {
    create(appointment, res) {
        const created_at = moment().format('YYYY-MM-DD HH:MM:SS');
        const date = moment(appointment.date, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        const newAppointment = { ...appointment, date, created_at };

        const isPatientNameValid = appointment.patient.length > 5;
        const isDateValid = moment(date).isSameOrAfter(created_at);

        const errors = [
            {
                attribute: 'patient',
                valid: isPatientNameValid,
                message:
                    'Patient name is smaller than 5 characters.' +
                    'Patient name needs to be bigger than 5 characters to create an appointment.',
            },
            {
                attribute: 'date',
                valid: isDateValid,
                message: 'Date is in invalid. You need a valid date to create an appointment.',
            },
        ];

        const errs = errors.filter((a) => !a.valid);

        if (errs.length) {
            res.status(400).json(errs);
        } else {
            const sql = 'INSERT INTO tb_appointments SET ?';

            connection.query(sql, newAppointment, (err, results) => {
                if (err) {
                    res.status(400).json(err);
                } else {
                    res.status(201).json(results);
                }
            });
        }
    }

    findAll(res) {
        const sql = 'SELECT * from tb_appointments';

        connection.query(sql, (err, results) => {
            if (err) {
                res.status(400).json(err);
            } else {
                res.status(200).json(results);
            }
        });
    }

    findById(id, res) {
        const sql = `SELECT * FROM tb_appointments ta WHERE ta.id = ${id}`;

        connection.query(sql, (err, results) => {
            const appointment = results[0];
            if (err) {
                res.status(400).json(err);
            } else {
                res.status(200).json(appointment);
            }
        });
    }
}

module.exports = new Appointments();
