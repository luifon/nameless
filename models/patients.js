const connection = require('../infrastructure/connection');

const fileUpload = require('../files/fileUpload');

class Patient {
    create(patient, res) {
        const sql = 'INSERT INTO tb_patients SET ?';

        fileUpload(patient.image, patient.name, (errorMessage, newPath) => {
            if (errorMessage) {
                res.status(400).json({ message: errorMessage });
            } else {
                const newPatient = { name: patient.name, image: newPath };

                connection.query(sql, newPatient, (err) => {
                    if (err) {
                        console.log(err);
                        res.status(400).json(err);
                    } else {
                        res.status(200).json(newPatient);
                    }
                });
            }
        });
    }
}

module.exports = new Patient();
