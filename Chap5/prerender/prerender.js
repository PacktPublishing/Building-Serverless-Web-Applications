const fs = require('fs');
const webPage = require('webpage');
const page = webPage.create();

const path = 'page1';
const url = 'https://example.com/' + path;

page.open(url, function (status) {

   if (status != 'success')
       throw 'Error trying to prerender ' + url;

   const content = page.content;
   fs.write(path, content, 'w');

   console.log("The file was saved.");
   phantom.exit();
});