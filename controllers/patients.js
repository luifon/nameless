const patient = require('../models/patients');

module.exports = (app) => {
    app.post('/patients', (req, res) => {
        const newPatient = req.body;

        patient.create(newPatient, res);
    });
};
