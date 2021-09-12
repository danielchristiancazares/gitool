# gitool

Compare two branches in GitHub.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/gitool.svg)](https://npmjs.org/package/gitool)
[![Downloads/week](https://img.shields.io/npm/dw/gitool.svg)](https://npmjs.org/package/gitool)
[![License](https://img.shields.io/npm/l/gitool.svg)](https://github.com/danielchristiancazares/gitool/blob/master/package.json)

<!-- toc -->
* [gitool](#gitool)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g gitool
$ gitool COMMAND
running command...
$ gitool (-v|--version|version)
gitool/0.0.1 darwin-arm64 node-v16.8.0
$ gitool --help [COMMAND]
USAGE
  $ gitool COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`gitool compare`](#gitool-compare)
* [`gitool config`](#gitool-config)
* [`gitool help [COMMAND]`](#gitool-help-command)

## `gitool compare`

Compare two branches in GitHub.

```
USAGE
  $ gitool compare

OPTIONS
  -b, --base=<base-ref>     (required) GitHub Repository Base Commit
  -h, --head=<head-ref>     (required) GitHub Repository Head Commit
  -o, --organization=<org>  GitHub Organization
  -r, --repository=<repo>   GitHub Repository
  -v, --verbose
  --help                    show CLI help
  --version                 show CLI version
```

_See code: [src/commands/compare.js](https://github.com/danielchristiancazares/gitool/blob/v0.0.1/src/commands/compare.js)_

## `gitool config`

```
USAGE
  $ gitool config
```

_See code: [src/commands/config.js](https://github.com/danielchristiancazares/gitool/blob/v0.0.1/src/commands/config.js)_

## `gitool help [COMMAND]`

display help for gitool

```
USAGE
  $ gitool help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.3/src/commands/help.ts)_
<!-- commandsstop -->
