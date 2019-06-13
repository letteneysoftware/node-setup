#!/usr/bin/env node

"use strict";

const chalk = require('chalk');
const inquirer = require('inquirer');
const figlet = require('figlet');
const shell = require('shelljs');

const init = () => {
  console.log(
    chalk.blue(
      figlet.textSync('Node Setup', {
        font: 'Dr Pepper',
        horizontalLayout: 'default',
        verticalLayout: 'default'
      })
    )
  );
};

const getParams = () => {
  const questions = [{
      name: 'PROJECT_NAME',
      type: 'input',
      message: 'What is the name of your project?'
    },
    {
      name: 'DEPENDENCIES',
      type: 'input',
      message: 'What dependencies should your project have?'
    },
    {
      name: 'DEV_DEPENDENCIES',
      type: 'input',
      message: 'What dev dependencies should your project have?'
    }
  ]
  return inquirer.prompt(questions);
};

const createDirectory = dirname => {
  shell.mkdir(dirname);
  shell.cd(dirname);
};

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
  ];
  lines = lines.map(line => new shell.ShellString(line));
  for (let line of lines) {
    line.toEnd(server);
  }
};

const npmInit = async (deps, devDeps) => {
  await shell.exec('npm init -y');
  await shell.exec(`npm i -s express dotenv ${deps}`);
  if (devDeps) await shell.exec(`npm i -D ${devDeps}`);
};

const run = async () => {
  // Show script introduction
  init();
  // Collect project parameters
  const params = await getParams();
  const {
    PROJECT_NAME,
    DEPENDENCIES,
    DEV_DEPENDENCIES
  } = params;
  // Create new directory
  // CD into new directory
  createDirectory(PROJECT_NAME);
  // Create new server.js file
  // Populate said server with boilerplate
  createServer();
  // NPM Init
  npmInit(DEPENDENCIES, DEV_DEPENDENCIES);
};

run();