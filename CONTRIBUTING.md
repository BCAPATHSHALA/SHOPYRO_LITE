# Contributing to Shopyro

Thank you for your interest in contributing to Shopyro! We welcome contributions from the community and are excited to see what you'll bring to this headless commerce template.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Documentation](#documentation)
- [Community](#community)
- [Questions](#questions)

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. We are committed to providing a welcoming and inspiring community for all.

### Our Standards

- **Be respectful**: Treat everyone with respect and kindness
- **Be inclusive**: Welcome newcomers and help them get started
- **Be collaborative**: Work together and share knowledge
- **Be constructive**: Provide helpful feedback and suggestions

## Getting Started

Before you begin contributing, please:

1. Read through this contributing guide
2. Check out our [documentation](https://websyro.com/docs/shopyro)
3. Look at existing [issues](https://github.com/BCAPATHSHALA/SHOPYRO_LITE/issues) to see what needs help
4. Join our community discussions

## Development Setup

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Git
- A Shopify Partner account (for testing)
- Basic knowledge of Next.js, React, and TypeScript

### Local Development

1. **Fork and clone the repository**

   ```bash
   git clone https://github.com/YOUR_USERNAME/SHOPYRO_LITE.git
   cd SHOPYRO_LITE
   ```

2. **Install dependencies**

   ```bash
   npm install

   # or

   yarn install

   # or

   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Fill in your Shopify store credentials and other required variables.

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000` to see the application.

## How to Contribute

### Types of Contributions

We welcome various types of contributions:

- **Bug fixes**: Help us squash bugs and improve stability
- **Feature enhancements**: Add new features or improve existing ones
- **Documentation**: Improve our docs, add examples, or fix typos
- **Performance improvements**: Optimize code for better performance
- **UI/UX improvements**: Enhance the user experience
- **Testing**: Add or improve test coverage
- **Accessibility**: Make the template more accessible

### Before You Start

1. **Check existing issues**: Look for existing issues or discussions about your idea
2. **Create an issue**: If your contribution is substantial, create an issue first to discuss it
3. **Get feedback**: Wait for maintainer feedback before starting work on large changes

## Pull Request Process

### 1. Create a Branch

Create a new branch for your feature or fix:

```bash
git checkout -b feature/your-feature-name

# or

git checkout -b fix/your-bug-fix
```

### 2. Make Your Changes

- Write clean, readable code
- Follow our coding standards
- Add tests for new functionality
- Update documentation as needed
- Ensure your changes don't break existing functionality

### 3. Test Your Changes

```bash

# Run the development server

npm run dev

# Run type checking

npm run type-check

# Run linting

npm run lint

# Run tests (if available)

npm run test
```

### 4. Commit Your Changes

Use clear, descriptive commit messages:

```bash
git add .
git commit -m "feat: add product comparison feature"

# or

git commit -m "fix: resolve cart total calculation issue"
```

### 5. Push and Create PR

```bash
git push origin your-branch-name
```

Then create a pull request on GitHub with:

- **Clear title**: Describe what your PR does
- **Detailed description**: Explain the changes and why they're needed
- **Screenshots**: Include screenshots for UI changes
- **Testing notes**: Describe how you tested your changes
- **Breaking changes**: Note any breaking changes

### 6. Code Review

- Be responsive to feedback
- Make requested changes promptly
- Ask questions if feedback is unclear
- Be patient during the review process

## Issue Guidelines

### Reporting Bugs

When reporting bugs, please include:

- **Clear title**: Summarize the issue
- **Description**: Detailed description of the bug
- **Steps to reproduce**: Step-by-step instructions
- **Expected behavior**: What should happen
- **Actual behavior**: What actually happens
- **Environment**: OS, browser, Node.js version, etc.
- **Screenshots**: If applicable

### Feature Requests

For feature requests, please include:

- **Clear title**: Summarize the feature
- **Problem**: What problem does this solve?
- **Solution**: Describe your proposed solution
- **Alternatives**: Any alternative solutions considered
- **Additional context**: Any other relevant information

## Coding Standards

### General Guidelines

- **TypeScript**: Use TypeScript for all new code
- **ESLint**: Follow the existing ESLint configuration
- **Prettier**: Use Prettier for code formatting
- **File naming**: Use kebab-case for files and folders
- **Component naming**: Use PascalCase for React components

### Code Style

- Use functional components with hooks
- Prefer composition over inheritance
- Write self-documenting code with clear variable names
- Add comments for complex logic
- Keep functions small and focused
- Use TypeScript interfaces for type definitions

### Folder Structure

Follow the existing folder structure:

```
├── app/ # Next.js app directory
├── components/ # Reusable components
│ ├── ui/ # Basic UI components
│ ├── layout/ # Layout components
│ └── static-pages/ # Static page components
├── lib/ # Utility functions
├── siteconfig/ # Configuration files
└── types/ # TypeScript type definitions
```

## Testing

- Write tests for new features and bug fixes
- Ensure existing tests pass
- Test across different browsers and devices
- Test with different Shopify store configurations

## Documentation

- Update README.md if needed
- Add JSDoc comments for complex functions
- Update configuration documentation
- Include examples for new features

## Community

### Get Help

- **Email**: hello@websyro.com
- **GitHub Issues**: [Report issues](https://github.com/BCAPATHSHALA/SHOPYRO_LITE/issues)
- **Documentation**: [Full docs & setup guide](https://websyro.com/docs/shopyro)

### Stay Connected

- **LinkedIn**: [Follow Websyro](https://www.linkedin.com/company/websyro/)
- **Twitter**: [Follow Twitter](https://twitter.com/joinwebsyro)

### Recognition

Contributors will be recognized in:

- README.md contributors section
- Release notes for significant contributions
- Social media shoutouts for major features

## Questions?

Don't hesitate to ask questions! We're here to help:

- Open an issue for technical questions
- Email us at hello@websyro.com for general inquiries
- Check our [documentation](https://websyro.com/docs/shopyro) for setup help

Thank you for contributing to Shopyro! 🚀
