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

const run = async () => {
  // Show script introduction
  init();
  // Collect project name
  // Create new directory
  // CD into new directory
};

run();