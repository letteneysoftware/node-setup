'use strict';

const createIndex = require('./ejs/createIndex');
const createHead = require('./ejs/createHead');

const createFiles = async type => {
  switch (type) {
    case 'ejs':
      await createIndex();
      await createHead();
  }
};

module.exports = createFiles;