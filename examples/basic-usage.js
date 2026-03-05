/**
 * Basic Usage Example for @theluckystrike/relaxed-json
 * 
 * This example demonstrates all major features of the Relaxed JSON library:
 * - Parsing JSON with comments, trailing commas, and unquoted keys
 * - Transforming relaxed JSON to strict JSON
 * - Stringifying objects to JSON strings
 * - Using parse options like reviver, tolerant, and duplicate handling
 */

const RJSON = require('../relaxed-json');

console.log('=== Relaxed JSON Basic Usage Example ===\n');

// ============================================================
// 1. PARSE - Parse relaxed JSON with comments, trailing commas, etc.
// ============================================================

// Example: JSON with single-line and multi-line comments
const jsonWithComments = `
{
  // This is a single-line comment
  "name": "Relaxed JSON",
  "version": "2.0.0",
  /* This is a
     multi-line comment */
  "features": [
    "comments",
    "trailing commas",
    "unquoted keys"
  ], // Trailing comma is allowed!
}
`;

// Parse the JSON with comments - no error despite non-standard JSON!
const parsed = RJSON.parse(jsonWithComments);
console.log('1. PARSE with comments:');
console.log('   Parsed object:', parsed);
console.log('   Name:', parsed.name);
console.log('   Features:', parsed.features);
console.log();

// ============================================================
// 2. TRANSFORM - Convert relaxed JSON to strict JSON string
// ============================================================

// Example: Relaxed JSON with unquoted keys (not valid standard JSON)
const relaxedInput = `
{
  name: "test",
  value: 42,
  enabled: true
}
`;

// Transform relaxed JSON to strict JSON (outputs valid but unparsed JSON string)
const transformed = RJSON.transform(relaxedInput);
console.log('2. TRANSFORM (unquoted keys to quoted):');
console.log('   Input:', relaxedInput.trim());
console.log('   Output:', transformed);
console.log();

// ============================================================
// 3. STRINGIFY - Convert JavaScript objects to JSON strings
// ============================================================

const obj = {
  title: 'Example',
  count: 100,
  items: ['a', 'b', 'c'],
  nested: { deep: 'value' },
  nullValue: null,
  boolValue: false
};

const stringified = RJSON.stringify(obj);
console.log('3. STRINGIFY (object to JSON string):');
console.log('   Input object:', obj);
console.log('   Output string:', stringified);
console.log();

// ============================================================
// 4. PARSE with REVIVER - Transform values during parsing
// ============================================================

const jsonWithReviver = `
{
  "name": "test",
  "value": "100",
  "timestamp": "2024-01-01"
}
`;

// Reviver function to transform values during parsing
const parsedWithReviver = RJSON.parse(jsonWithReviver, (key, value) => {
  // Convert string numbers to actual numbers
  if (key === 'value' && typeof value === 'string') {
    return Number(value);
  }
  // Parse ISO date strings to Date objects
  if (key === 'timestamp' && typeof value === 'string') {
    return new Date(value);
  }
  return value;
});

console.log('4. PARSE with REVIVER (transform values):');
console.log('   Original value type:', typeof jsonWithReviver.match(/\"value\":\s*\"(\d+)\"/)[1]);
console.log('   After reviver value type:', typeof parsedWithReviver.value);
console.log('   Parsed timestamp:', parsedWithReviver.timestamp);
console.log();

// ============================================================
// 5. PARSE with TOLERANT - Continue parsing on errors
// ============================================================

// JSON with a syntax error, but tolerant mode tries to parse what's possible
const brokenJson = `
{
  "valid": "value",
  "invalid": this is broken,
  "another": "valid"
}
`;

// With tolerant option, parsing continues despite errors
try {
  const tolerantResult = RJSON.parse(brokenJson, { tolerant: true });
  console.log('5. PARSE with TOLERANT (continue on errors):');
  console.log('   Result:', tolerantResult);
} catch (e) {
  console.log('5. PARSE with TOLERANT: Error occurred:', e.message);
}
console.log();

// ============================================================
// 6. PARSE with DUPLICATE KEYS - Allow duplicate object keys
// ============================================================

const duplicateKeysJson = `
{
  "name": "first",
  "name": "second",
  "name": "last"
}
`;

// By default, duplicate keys are not allowed - last one wins
const defaultParse = RJSON.parse(duplicateKeysJson);
console.log('6. PARSE with DUPLICATE keys (default):');
console.log('   Result (last value wins):', defaultParse);
console.log();

// ============================================================
// 7. PRACTICAL EXAMPLE - Parse a config file with comments
// ============================================================

const configFile = `
// Application Configuration
{
  // Database settings
  "database": {
    "host": "localhost",
    "port": 5432,
  }, // trailing comma allowed
  
  // Feature flags
  "features": {
    "darkMode": true,
    "analytics": false,
  },
  
  // API endpoints
  "api": "https://api.example.com"
}
`;

const config = RJSON.parse(configFile);
console.log('7. PRACTICAL EXAMPLE (config file with comments):');
console.log('   Database host:', config.database.host);
console.log('   Dark mode enabled:', config.features.darkMode);
console.log('   API endpoint:', config.api);
console.log();

console.log('=== Example Complete ===');
