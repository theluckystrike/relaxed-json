# Contributing to @theluckystrike/relaxed-json

Thank you for your interest in contributing! relaxed-json is a TypeScript library that extends JSON with relaxed parsing options, and contributions from the community help make it better.

## Quick Start

```bash
# Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/relaxed-json.git
cd relaxed-json

# Install dependencies (if any)
npm install

# Make your changes
# ...

# Run tests (if available)
npm test
```

## How to Contribute

### Reporting Bugs

Found a bug? We'd love to help! Please use the [bug report template](.github/ISSUE_TEMPLATE/bug_report.md) and include:

- A clear, descriptive title
- Steps to reproduce the issue
- What you expected vs. what actually happened
- Your environment (Node version, browser, etc.)
- Any relevant code snippets or error messages

### Suggesting Features

Have an idea for a new feature? Use the [feature request template](.github/ISSUE_TEMPLATE/feature_request.md) and describe:

- What problem would this feature solve?
- How should it work?
- Any alternative solutions you've considered

### Pull Requests

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/your-feature-name`
3. **Make** your changes following our code style
4. **Test** your changes thoroughly
5. **Commit** with a descriptive message: `git commit -m 'feat: add new parsing option'`
6. **Push** to your fork: `git push origin feature/your-feature-name`
7. **Open** a Pull Request against `main`

## Code Style

- Use **TypeScript** for all new code
- Follow existing code formatting conventions
- Add TypeScript types for new public APIs
- Keep functions focused and modular
- Add JSDoc comments for public functions

## Project Structure

```
relaxed-json/
├── index.d.ts      # TypeScript type definitions
├── relaxed-json.js # Main library code
├── LICENSE         # BSD-3-Clause license
├── package.json    # NPM package config
└── README.md       # Documentation
```

## License

By contributing, you agree that your contributions will be licensed under the BSD-3-Clause license. See [LICENSE](LICENSE) for details.

## Questions?

If you have questions, feel free to open a discussion or reach out through the project's GitHub page.
