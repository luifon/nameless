const appointments = require('../models/appointments');

module.exports = (app) => {
    app.get('/appointments', (req, res) => {
        appointments.findAll(res);
    });

    app.get('/appointments/:id', (req, res) => {
        const id = parseInt(req.params.id);
        appointments.findById(id, res);
    });

    app.post('/appointments', (req, res) => {
        const appointment = req.body;
        appointments.create(appointment, res);
    });

    app.patch('/appointments/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const appointment = req.body;
        appointments.update(id, appointment, res);
    });

    app.delete('/appointments/:id', (req, res) => {
        const id = parseInt(req.params.id);
        appointments.delete(id, res);
    });
};
