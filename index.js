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
}

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
};

run();