'use strict';

const shell = require('shelljs');

const createHead = () => {
  const file = 'views/layout/head.ejs';
  shell.touch(file);

  let lines = [
    '<head>\n',
    ' <meta charset="UTF-8">\n',
    ' <meta name="viewport" content="width=device-width, initial-scale=1.0">\n',
    ' <meta http-equiv="X-UA-Compatible" content="ie=edge">\n',
    ' <title>Document</title>\n',
    '</head>'
  ]

  for (let line of lines) {
    line = new shell.ShellString(line);
    line.toEnd(file);
  }
};

module.exports = createHead;