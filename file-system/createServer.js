'use strict';

const shell = require('shelljs');

const createServer = type => {
  const server = 'server.js';
  shell.touch(server);
  let lines = [
    '\'use strict\';\n',
    'require(\'dotenv\').config();\n',
    'const express = require(\'express\');\n',
    'const app = express();\n',
    'const PORT = process.env.PORT || 3000;\n',
    'app.use(express.urlencoded({ extended: true }));\n',
    'app.listen(PORT, () => console.log(`Listening on ${PORT}`));\n\n'
  ];

  switch (type) {
    case 'ejs':
      const ejsLines = [
        'app.set(\'view engine\', \'ejs\');',
        'app.use(express.static(\'./public\'));',
      ];
      lines.splice(lines.length - 1, 0, ...ejsLines);
    default:
      break;
  }

  for (let line of lines) {
    line = new shell.ShellString(line);
    line.toEnd(server);
  }
};

module.exports = createServer;