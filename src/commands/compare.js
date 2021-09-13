const { Command, flags } = require('@oclif/command');
const axios = require('axios');
const { readConfig, readConfigSync } = require('../config.js')

class CompareCommand extends Command {
  static description = "Compare two branches in GitHub."
  static flags = {
    version: flags.version(),
    verbose: flags.boolean({ char: 'v' }),
    help: flags.help(),
    organization: flags.string({
      char: 'o',
      helpValue: '<org>',
      description: 'GitHub Organization',
      hidden: false,
      multiple: false,
      default: () => readConfigSync('organization'),
      required: false,
    }),
    repository: flags.string({
      char: 'r',
      helpValue: '<repo>',
      description: 'GitHub Repository',
      hidden: false,
      multiple: false,
      default: () => readConfigSync('repository'),
      required: false,
    }),
    base: flags.string({
      char: 'b',
      helpValue: '<branch>',
      description: 'GitHub Repository Base Commit',
      hidden: false,
      multiple: false,
      default: undefined,
      required: true,
      dependsOn: ['head'],
    }),
    head: flags.string({
      char: 'h',
      helpValue: '<branch>',
      description: 'GitHub Repository Head Commit',
      hidden: false,
      multiple: false,
      default: undefined,
      required: true,
      dependsOn: ['base'],
    }),
    token: flags.string({
      char: 't',
      helpValue: '<token>',
      description: 'GitHub Personal Access Token',
      hidden: true,
      multiple: false,
      default: () => readConfigSync('token'),
      required: true
    }),
  }

  async run() {
    const { flags } = this.parse(CompareCommand)
    const token = await readConfig('token')
    const org = flags.organization
    const repo = flags.repository
    const base = flags.base
    const head = flags.head

    const options = {
      method: 'GET',
      baseURL: 'https://api.github.com',
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': `gitool/${org}`,
        'Authorization': `Basic ${Buffer.from(token).toString('base64')}`
      },
      timeout: 30000
    }

    if (token === undefined) {
      throw new Error("No GitHub Personal Access Token.");
    }

    try {
      // Bulk fetch of commits objects
      // const response = await axios.all([
      //   axios.request(`/repos/${org}/${repo}/commits`, { ...options, ...{ params: { sha: `${head}`, per_page: 1 } } }),
      //   axios.request(`/repos/${org}/${repo}/commits`, { ...options, ...{ params: { sha: `${base}`, per_page: 1 } } })
      // ])
      // console.log(response[0]?.data[0])
      // console.log(response[1]?.data[0])
      const response = await axios.request(`/repos/${org}/${repo}/compare/${org}:${base}...${org}:${head}`, options)
      console.log(response?.data)
    } catch (err) {
      this.error(err)
    }
  }
}

module.exports = CompareCommand;