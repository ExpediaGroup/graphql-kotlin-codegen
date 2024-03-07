# Contributing

We'd love to accept your patches and contributions to this project. There are just a few guidelines you need to follow which are described in detail below.

## How To Contribute

### 1. Fork this repo

You should create a fork of this project in your account and work from there. You can create a fork by clicking the fork button in GitHub.

### 2. One feature, one branch

Work for each new feature/issue should occur in its own branch. To create a new branch from the command line:

```shell
git checkout -b my-new-feature
```

where "my-new-feature" describes what you're working on.

### 3. Setup your environment

This project uses [bun](https://bun.sh/), so you will need to [install it](https://bun.sh/docs/installation) to get started.
Once installed, run `bun install` at the root of the project to install all dependencies.

### 4. Add tests for any bug fixes or new functionality

All functions must be tested with a unit test. Please follow the existing convention of one exported function per file with a corresponding file to test it. Run tests using `bun test`.

### 5. Check code style

Before opening a pull request, ensure that you have installed all dependencies so the pre-commit hooks will run.
These hooks will run ESLint according to the [.eslintrc.json](./.eslintrc.json) and style the code according to the prettier defaults.

### 6. Add documentation for new or updated functionality

Please review all the .md files in this project to see if they are impacted by your change and update them accordingly.

### 7. Format Commits

This project uses [Semantic Release](https://github.com/semantic-release/semantic-release) for versioning. As such, commits need to follow the format: `<type>(<scope>): <short summary>`. All fields are required.

### 8. Submit Pull Request and describe the change

Push your changes to your branch and open a pull request against the parent repo on GitHub. The project administrators will review your pull request and respond with feedback.

## How Your Contribution Gets Merged

Upon Pull Request submission, your code will be reviewed by the maintainers. They will confirm at least the following:

- Tests run successfully (unit, coverage, integration, style).
- Contribution policy has been followed.

One (human) reviewer will need to sign off on your Pull Request before it can be merged.
