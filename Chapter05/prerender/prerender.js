const fs = require('fs');
const webPage = require('webpage');
const page = webPage.create();

const path = 'page1';
const url = 'https://example.com/' + path;

page.open(url, (status) => {

    if (status != 'success') {
        console.log('Error trying to prerender ' + url);
        phantom.exit();
    }

    const content = page.content;
    fs.write(path + '.html', content, 'w');

    console.log("The file was saved.");
    phantom.exit();
});