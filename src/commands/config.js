const {Command, flags} = require('@oclif/command')
const {cli} = require('cli-ux')

class ConfigCommand extends Command {
  async run() {
    const organization = await cli.prompt('GitHub Username or Organization')
    const repository = await cli.prompt('GitHub Repository',{required: false})
    const token = await cli.prompt('GitHub Personal Access Token', {type: 'hide', required: true})
    const confirm = await cli.confirm('Continue? (Y/n)')
  }
}
module.exports = ConfigCommand