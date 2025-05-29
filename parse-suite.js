const fs = require('fs');
const yaml = require('js-yaml');

// Get the environment variable to decide which file to load
const env = process.env.ENV || 'prod';  // Default to 'stage' if not set
const suiteName = process.env.SUITE_NAME || 'smokeUI';

const filePath = env === 'prod' ? 'github/test-suites-prod.yml' : 'github/test-suites-stage.yml';

try {
  const config = yaml.load(fs.readFileSync(filePath, 'utf8'));
  const configFile = config.configFile;
  const suite = config.suites[suiteName];

  if (!suite) {
    console.error(`Suite "${suiteName}" not found in ${filePath}`);
    process.exit(1);
  }

  // Output the variables for use in the pipeline
  console.log(`CONFIG_FILE="${configFile}"`);
  console.log(`SUITES="${suite.spec}"`);
} catch (e) {
  console.error('Failed to parse test-suites.yml:', e);
  process.exit(1);
}