// 3rd party module dependencies
const { CronJob } = require('cron');

// custom module dependencies
const { getEntity } = require('./entityList');

// parses the time configuration
// defines what the job will do when it 'ticks'
// it gets the settings entity, and uses the entries to run the job
const getJob = data => {
    let cronTime = `00 ${data.starttime.split(':')[1]} ${data.starttime.split(':')[0]} * * *`;
    return new CronJob(cronTime, () => {
        getEntity()
            .then(data => {
                console.log('Job running');
                console.log(data);
            })
            .catch(console.log);
        
    }, null, true, data.timezone);
};

module.exports = getJob;