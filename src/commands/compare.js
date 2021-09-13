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
    const org = flags.organization
    const repo = flags.repository
    const base = flags.base
    const head = flags.head 
    
    const options = {
      url: `https://api.github.com/repos/${org}/${repo}/compare/${base}...${head}`,
      method: 'GET',
      headers: {
        'Accept': 'Accept: application/vnd.github.v3+json',
        'User-Agent': 'gitool-app',
        'Authorization': `Basic ${token}`
      },
      timeout: 30000 // 30 second timeout
    };

    axios.request(options)
    .then(res => { 
      res.data.commits.forEach( x =>
        console.log(x.commit.message)
      )
    }).catch(err => this.throwErorr(err));
  };

  throwErorr(error) {
    if (!!error.response) {
      if(error.response.status === 404) {
        this.log("Could not find one or both of the branches.");
      }
      if(error.response.status === 403) {
        this.log("You are forbidden.")
      }
    }
  };
};
module.exports = CompareCommand;