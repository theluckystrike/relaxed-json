# relaxed-json

A strict superset of JSON that allows comments, trailing commas, unquoted keys, and single-quoted strings. Parses relaxed input into standard JavaScript objects, or transforms it into valid JSON text.

Forked from [fregante/relaxed-json](https://github.com/fregante/relaxed-json), originally created by Oleg Grenrus. This fork includes TypeScript type definitions and a test suite.

---

INSTALL

    npm install @theluckystrike/relaxed-json

WHAT IT DOES

The library accepts JSON-like text that would normally fail strict parsing and handles it gracefully. Supported relaxations include single-line comments (//), block comments (/* */), trailing commas in objects and arrays, unquoted object keys, and single-quoted strings.

Three functions are exported.

RJSON.parse(text, opts) parses relaxed JSON text into a JavaScript value. You can pass a reviver function as the second argument, or an options object with the following fields.

    relaxed     boolean, default true    enable relaxed parsing rules
    warnings    boolean, default false   collect parse warnings
    tolerant    boolean, default false   continue parsing after errors
    duplicate   boolean, default false   flag duplicate object keys
    reviver     function                 transform values during parse

RJSON.transform(text) converts relaxed JSON text into a strict JSON string without parsing it into objects. Useful when you need to normalize input before handing it to another JSON consumer.

RJSON.stringify(obj) serializes a JavaScript value to a JSON string with sorted keys.

USAGE

    const RJSON = require('@theluckystrike/relaxed-json');

    // parse JSON with comments and trailing commas
    const config = RJSON.parse(`{
      // database settings
      host: "localhost",
      port: 5432,
      features: ["auth", "logging",],
    }`);

    // transform relaxed text to strict JSON string
    const strict = RJSON.transform("{name: 'test'}");
    // => '{"name": "test"}'

    // stringify with sorted keys
    RJSON.stringify({ b: 2, a: 1 });
    // => '{"a":1,"b":2}'

TESTING

    npm install
    npm test

Tests use Vitest and cover parsing, transformation, stringification, error handling, and all parse options.

LICENSE

BSD-3-Clause. See LICENSE for full text. Original copyright belongs to Oleg Grenrus.

---

Fork maintained by [theluckystrike](https://github.com/theluckystrike) | [zovo.one](https://zovo.one)
