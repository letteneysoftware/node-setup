'use strict';

const shell = require('shelljs');

const createIndex = () => {
  const file = 'views/pages/index.ejs';
  shell.touch(file);

  let lines = [
    '<!DOCTYPE html>\n',
    '<html lang="en">\n',
    '<%- include(\'../layout/head\') %>\n',
    '<body>\n\n',
    '</body>\n',
    '</html>'
  ]

  for (let line of lines) {
    line = new shell.ShellString(line);
    line.toEnd(file);
  }
};

module.exports = createIndex;