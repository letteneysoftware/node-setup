'use strict';

const shell = require('shelljs');

const createDirectory = dirname => {
  shell.mkdir(dirname);
  shell.cd(dirname);
};

module.exports = createDirectory;