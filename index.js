'use strict'; 
const fs = require('fs')
const path = require('path')

exports.handler = async (request, response, callback) => {
  if (request.path === '/') {
    const uri = path.resolve(__dirname, './doc-blog/index.html');
    let html = fs.readFileSync(uri, {
      encoding: 'utf-8'
    })
    response.setStatusCode(200);
    response.setHeader('Content-Type', 'text/html');
    response.send(html);
  } else {
    const uri = path.resolve(__dirname, `./doc-blog/${request.path}`);
    const isExist = fs.existsSync(uri)
    if (isExist) {
      let fileContent = fs.readFileSync(uri, {
        encoding: 'utf-8'
      })
      response.send(fileContent);
    } else {
      response.send('');
    }
  }   
};