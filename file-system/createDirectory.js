'use strict';

const shell = require('shelljs');

const createDirectory = (type, dirname) => {
  shell.mkdir(dirname);
  shell.cd(dirname);

  switch (type) {
    case 'ejs':
      shell.mkdir(['public', 'views', 'views/pages', 'views/layout']);
    default:
      break;
  }
};

module.exports = createDirectory;