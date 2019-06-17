#!/usr/bin/env node

"use strict";

const chalk = require('chalk');
const inquirer = require('inquirer');
const figlet = require('figlet');
const shell = require('shelljs');

const createDirectory = require('./file-system/createDirectory'),
  createServer = require('./file-system/createServer');

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
      name: 'PROJECT_TYPE',
      type: 'list',
      message: 'What type of project?',
      choices: ['node', 'ejs']
    },
    {
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
    PROJECT_TYPE,
    PROJECT_NAME,
    DEPENDENCIES,
    DEV_DEPENDENCIES
  } = params;
  // Create new directory
  // CD into new directory
  await createDirectory(PROJECT_TYPE, PROJECT_NAME);
  // Create new server.js file
  // Populate said server with boilerplate
  await createServer(PROJECT_TYPE);
  // NPM Init
  npmInit(DEPENDENCIES, DEV_DEPENDENCIES);
};

run();