# @theluckystrike/relaxed-json

[![npm version](https://img.shields.io/npm/v/@theluckystrike/relaxed-json)](https://npmjs.com/package/@theluckystrike/relaxed-json)
[![License: BSD-3-Clause](https://img.shields.io/badge/License-BSD--3--Clause-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Discord](https://img.shields.io/badge/Discord-Zovo-blueviolet.svg?logo=discord)](https://discord.gg/zovo)
[![Website](https://img.shields.io/badge/Website-zovo.one-blue)](https://zovo.one)
[![GitHub Stars](https://img.shields.io/github/stars/theluckystrike/relaxed-json?style=social)](https://github.com/theluckystrike/relaxed-json)

> Relaxed JSON is a strict superset of JSON that relaxes the strictness of vanilla JSON, allowing comments, trailing commas, and more.

Fork of [fregante/relaxed-json](https://github.com/fregante/relaxed-json) with TypeScript type definitions included.

Part of the [Zovo](https://zovo.one) developer tools family.

## Features

- **Comments** -- Support for both `// single-line` and `/* multi-line */` comments
- **Trailing Commas** -- Allow trailing commas in objects and arrays
- **Relaxed Keys** -- Unquoted keys are allowed
- **Implicit Arrays** -- Objects can be parsed as arrays of their values
- **Tolerant Parsing** -- Continue parsing even when encountering errors
- **TypeScript Support** -- Full type definitions included

## Install

```bash
npm install @theluckystrike/relaxed-json
```

## Usage

```typescript
import RJSON from '@theluckystrike/relaxed-json';

// Parse relaxed JSON with comments
const json = RJSON.parse(`
  {
    // This is a comment
    "name": "value", // trailing comment
    "items": [1, 2, 3,], // trailing comma!
  }
`);

// Transform relaxed JSON to strict JSON
const strictJson = RJSON.transform(`
  {
    name: "value" // unquoted key
  }
`);

// Stringify to JSON
const str = RJSON.stringify({ hello: "world" });
```

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `reviver` | `function` | `undefined` | A function to transform values |
| `relaxed` | `boolean` | `true` | Enable relaxed parsing |
| `warnings` | `boolean` | `false` | Show warnings during parsing |
| `tolerant` | `boolean` | `false` | Continue parsing on errors |
| `duplicate` | `boolean` | `false` | Allow duplicate keys |

## API

### `RJSON.transform(text: string): string`

Transforms Relaxed JSON text into strict JSON text. Doesn't verify the result is valid JSON.

### `RJSON.parse(text: string, options?: Options): unknown`

Parse the RJSON text. Supports all options listed above.

### `RJSON.stringify(obj: unknown): string`

Stringify an object to JSON string.

## License

BSD-3-Clause - See [LICENSE](LICENSE) for full details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## See Also

### Related Zovo Repositories

- [chrome-extension-starter-mv3](https://github.com/theluckystrike/chrome-extension-starter-mv3) - Production-ready Chrome extension starter
- [chrome-storage-plus](https://github.com/theluckystrike/chrome-storage-plus) - Type-safe storage wrapper
- [awesome-chrome-extensions-dev](https://github.com/theluckystrike/awesome-chrome-extensions-dev) - Curated list of Chrome extension development resources

### Zovo Chrome Extensions

- [Zovo Tab Manager](https://chrome.google.com/webstore/detail/zovo-tab-manager) - Manage tabs efficiently
- [Zovo Focus](https://chrome.google.com/webstore/detail/zovo-focus) - Block distractions

Visit [zovo.one](https://zovo.one) for more information.

---

Built by [Zovo](https://zovo.one)
