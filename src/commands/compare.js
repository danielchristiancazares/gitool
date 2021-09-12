const {Command, flags} = require('@oclif/command')
const axios = require('axios')
const config = require('../../config.json')

class CompareCommand extends Command {
  static description = "Compare two branches in GitHub."
  static strict = false
  static flags = {
    version: flags.version(),
    verbose: flags.boolean({char: 'v'}),
    help: flags.help(),
    organization: flags.string({
      char: 'o',
      helpValue: '<org>',
      description: 'GitHub Organization',
      hidden: false,
      multiple: false,
      default: undefined,
      required: false,
    }),
    repository: flags.string({
      char: 'r',
      helpValue: '<repo>',
      description: 'GitHub Repository',
      hidden: false,
      multiple: false,
      default: undefined,
      required: false,
    }),
    base: flags.string({
      char: 'b',
      helpValue: '<base-ref>',
      description: 'GitHub Repository Base Commit',
      hidden: false,
      multiple: false,
      default: undefined,
      required: true,
      dependsOn: ['head'],
    }),
    head: flags.string({
      char: 'h',
      helpValue: '<head-ref>',
      description: 'GitHub Repository Head Commit',
      hidden: false,
      multiple: false,
      default: undefined,
      required: true,
      dependsOn: ['base'],
    }),
  }

  async run() {
    const {flags} = this.parse(CompareCommand)
    const token = config.TOKEN || 'undefined'
    const options = 
    axios.get("https://api.github.com/repos/danielchristiancazares/gitool/compare/develop...main",{
      method: 'GET',
      headers: {
        'Accept': 'Accept: application/vnd.github.v3+json',
        'User-Agent': 'gitool-app',
        'Authorization': `Basic ${token}`
      }
    })
    .then(res => { console.log(res.data) })
    .catch(function (error) {
      console.log("Error!");
    });
    this.log(`Using ${token}`)
  }
}
module.exports = CompareCommand
