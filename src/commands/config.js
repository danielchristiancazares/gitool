const { Command, flags } = require('@oclif/command')
const { cli } = require('cli-ux')
const inquirer = require('inquirer')
const axios = require('axios')
const { readConfig, writeConfig, readConfigSync } = require('../config.js')

const options = {
  method: 'GET',
  baseURL: 'https://api.github.com',
  headers: {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'gitool/0.0.1'
  },
  timeout: 30000
}
const user = {
  login: undefined,
  url: undefined,
  organizations_url: undefined,
  repos_url: undefined,
  organizations: undefined
}

const validateAccessToken = async (token) => {
  options['headers']['Authorization'] = `Basic ${Buffer.from(token).toString('base64')}`
  const response = await axios.get('/user', options)
  if (response?.data !== undefined) {
    user['login'] = response.data.login
    user['url'] = response.data.url
    user['organizations_url'] = response.data.organizations_url
    user['repos_url'] = response.data.repos_url
    options['headers']['User-Agent'] = `gitool/${user.login}`
    return true;
  }
  return "Invalid GitHub Personal Access Token";
};

// In case support for Organizations comes later.
// const retrieveOrganizations = async () => {
//   const response = await axios.get(user.organizations_url, options)
//   const org = response.data
//   console.log(response.data)
//   if (org !== undefined) {
//     return [{ name: login }];
//   }
//   return [{ name: "octocat" }];
// };

class ConfigCommand extends Command {
  async run() {
    const tokenPrompt = await inquirer.prompt([
      {
        name: 'token',
        type: 'password',
        message: 'GitHub Personal Access Token',
        mask: '*',
        default: readConfigSync('token'),
        validate: validateAccessToken
      }
    ])

    const orgPrompt = await inquirer.prompt([
      {
        name: 'organization',
        type: 'list',
        message: 'GitHub Organization or Username',
        choices: [{name: user.login}],
      }
    ])

    const config = await readConfig();
    console.log(config)
    config['token'] = tokenPrompt.token
    config['organization'] = orgPrompt.organization
    console.log(config)
    writeConfig(config)
  }
}

module.exports = ConfigCommand;