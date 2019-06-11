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

const getProjectName = () => {
  const questions = [{
    name: 'PROJECT_NAME',
    type: 'INPUT',
    message: 'What is the name of your project?'
  }]
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

const run = async () => {
  // Show script introduction
  init();
  // Collect project name
  const projectName = await getProjectName();
  const {
    PROJECT_NAME
  } = projectName;
  // Create new directory
  // CD into new directory
  createDirectory(PROJECT_NAME);
  // Create new server.js file
  // Populate said server with boilerplate
  createServer();
};

run();