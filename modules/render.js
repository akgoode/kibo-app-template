const path = require('path');

const { getEntity } = require('./entityList');
const nunjucks = require('nunjucks');

// writes the response to the configuration menu with the javascript form and values of config object
const writeHtml = (res, config, fileName) => {
    const file = nunjucks.render(path.normalize(path.join(__dirname, `../config/${fileName}.html`)), config);
    res.writeHead(200, {
        'Content-Type': 'text/html',
        'Content-Length': file.length
    });
    res.write(file);
    res.end();
};

// gets settings entity and displays the form with the existing data, or an empty form if starting new
const render = (res, fileName) => {
    if (fileName === 'confirmation') {
        writeHtml(res, {}, fileName);
    } else {
        getEntity()
            .then(data => {
                writeHtml(res, data, fileName);
            })
            .catch(() => {
                writeHtml(res, {}, fileName);
            });
    }
}

module.exports = {
    render
}