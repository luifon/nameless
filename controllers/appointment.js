const appointments = require('../models/appointments');

module.exports = (app) => {
    app.get('/appointments', (req, res) => res.send('in appointments'));

    app.post('/appointments', (req, res) => {
        const appointment = req.body;
        appointments.create(appointment, res);
    });
};
