const {Command, flags} = require('@oclif/command')

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
    const config = require('../../config.json')
    const token = config.TOKEN || 'undefined'
    this.log(`Using ${token}`)
  }
}
module.exports = CompareCommand
