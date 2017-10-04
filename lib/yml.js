const debug = require('debug')('metalsmith-metadata-directory');
const yaml = require('js-yaml');

function parseYml(text, filename) {
  let yml = '';
  try {
    yml = yaml.safeLoad(text, {
      filename: filename || null,
    })
  } catch(e) {
    debug(e.message || e);
    throw new Error(`Malformed YAML in: ${filename}`);
  }
} 

module.exports = parseYml;