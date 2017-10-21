var debug = require('debug')('metalsmith-metadata-directory');
var yaml = require('js-yaml');

function parseYml(text, filename) {
  var yml = '';
  try {
    // Try to safe load YAML file, will parse to JSON on success;
    yml = yaml.safeLoad(text, {
      filename: filename || null,
    });
    // Debug output
    debug('Parsed YAML:');
    debug(yml);

    // Returned parsed JSON
    return yml;
  } catch(e) {
    debug(e.message || e);
    throw new Error(`Malformed YAML in: ${filename}`);
  }
}

module.exports = parseYml;
