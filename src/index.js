const {Command, flags} = require('@oclif/command')

class GitoolCommand extends Command {
  static description = "Compare two branches in GitHub."
  static args = [
    {
      name: 'config',
      required: false,
      description: 'Setup configuration file.',
      hidden: false,
    },
  ]

  static flags = {
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    organization: flags.string({
      char: 'o',
      description: 'GitHub Organization',
      hidden: false,
      multiple: false,
      env: 'GITOOL_NAME',
      default: undefined,
      required: false,
      dependsOn: ['baseref','headref'],    // this flag requires another flag
    }),
  }

  async run() {
    const {flags} = this.parse(GitoolCommand)
    const name = flags.name || 'world'
    this.log(`hello ${name} from ./src/index.js`)
  }
}
module.exports = GitoolCommand
