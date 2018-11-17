// 3rd party module dependencies
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const path = require('path');

// custom module dependencies
const getJob = require('./cronJob');
const { displayForm, displayConfirmation } = require('./fileHelper');
const { getAndCreateOrUpdateEntity } = require('./entityList');

// initializes job variable.  Will be used by config route to start and stop the job
let job;

// This is what appears in the configuration section
// of the app menu inside each sandbox in which it is installed.
// Always a post request to the URL that you set inside the packages tab
router.post('/', (req, res) => {
    displayForm(res);
});

// Route for configuration form submission
// stops existing job if there is one
// creates or updates the settings entity
// restarts the job with the latest start time
router.post('/config', (req, res) => {
    if (job) job.stop();
    displayConfirmation(res);
    const data = req.body;
    getAndCreateOrUpdateEntity(data)
        .then(() => {
            job = getJob(data);
            job.start();
        })
        .catch(console.log);
});

// configures the app object with the routes for configuration
module.exports = app => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(router);
    app.use(express.static(path.normalize(path.join(__dirname + '/../config'))));
}