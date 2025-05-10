const fs = require('fs');
const yaml = require('js-yaml');

// Get the environment variable to decide which file to load
const env = process.env.ENV || 'stage';  // Default to 'stage' if not set
const suiteName = process.env.SUITE_NAME || 'smoke';

const filePath = env === 'prod' ? 'gitlab/test-suites-prod.yml' : 'gitlab/test-suites-stage.yml';

try {
  const config = yaml.load(fs.readFileSync(filePath, 'utf8'));
  const suite = config.suites[suiteName];

  if (!suite) {
    console.error(`Suite "${suiteName}" not found.`);
    process.exit(1);
  }

  // Output the variables for use in the pipeline
  console.log(`CONFIG_FILE="${suite.configFile}"`);
  console.log(`SUITES="${suite.spec}"`);
} catch (e) {
  console.error('Failed to parse test-suites.yml:', e);
  process.exit(1);
}