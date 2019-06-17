'use strict';

const shell = require('shelljs');

const createServer = () => {
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
  ].map(line => new shell.ShellString(line));
  for (let line of lines) {
    line.toEnd(server);
  }
};

module.exports = createServer;