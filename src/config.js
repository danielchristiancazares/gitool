const fs = require('fs-extra')
const axios = require('axios')
const file = 'config.json'

function readConfigSync(param) {
  const config = fs.readJsonSync(file);
  if (param === undefined) {
    return config;
  }
  return config[param]
}

async function readConfig(param) {
  const config = await fs.readJson(file);
  if (param === undefined) {
    return config;
  }
  return config[param]
}

async function writeConfig(data) {
  await fs.outputJson(file, data)
}

module.exports = { readConfig, readConfigSync, writeConfig }