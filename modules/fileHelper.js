const fs = require('fs');
const path = require('path');

const { getEntity } = require('./entityList');
const nunjucks = require('nunjucks');
// calls node async read file function and returns a promise with the data
const readFile = function (inFile) {
    return new Promise( (resolve, reject) => {
        fs.readFile(inFile, {encoding: 'utf8'}, (error, data) => {
        if (error) {
            reject(error);
        }

        resolve(data);
        });
    });
};

// writes the response to the configuration menu with the javascript form and values of config object
const writeHtml = (res, config) => {
    if (config.categories) config.categories = config.categories.join(',');
    const form = nunjucks.render(path.normalize(path.join(__dirname, '../config/form.html')), config);
    res.writeHead(200, {
        'Content-Type': 'text/html',
        'Content-Length': form.length
    });
    res.write(form);
    res.end();
};

// gets settings entity and displays the form with the existing data, or an empty form if starting new
const displayForm = res => {
    getEntity()
        .then(data => {
            writeHtml(res, data);
        })
        .catch(() => {
            writeHtml(res, {});
        });
}


// shows confirmation page
const displayConfirmation = res => {
    readFile('./config/confirmation.html')
        .then(data => {
            res.writeHead(200, {
                'Content-Type': 'text/html',
                'Content-Length': data.length
            });
            res.write(data);
            res.end();
        })
        .catch(console.log);
}

module.exports = {
    displayForm,
    displayConfirmation
}