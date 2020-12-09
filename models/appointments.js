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
}

module.exports = new Appointments();
