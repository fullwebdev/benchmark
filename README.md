# FullWeb.dev benchmark

Benchmark VanillaJS rendering approaches and compare them with microlibraries and popular frameworks.

> Based on [js-framework-benchmark](https://github.com/krausest/js-framework-benchmark) (see the [official results page](https://krausest.github.io/js-framework-benchmark/index.html), [snapshot results](https://rawgit.com/krausest/js-framework-benchmark/master/webdriver-ts-results/table.html) & the related [blog](http://www.stefankrause.net/wp) posts).

## About the benchmarks

**For all benchmarks the duration is measured including rendering time.**

Go check the [README](https://github.com/krausest/js-framework-benchmark#about-the-benchmarks) of js-framework-benchmark and this [article](http://www.stefankrause.net/wp/?p=218) for more details.

This project focus on VanillaJS suboptimal implementations (named `vanillajs-<something>` in the `frameworks/keyed` and `frameworks/non-keyed` directories) in order to compare different approaches.

js-framework-benchmark contains a lot more implementations, as it focus on frameworks and libraries instead of VanillaJS. We removed those in order to ease readability & builds, but the logic stays globally the same.

## Building & running

### prerequisites

```bash
npm install
npm run lerna-bootstrap
npm run lerna-build-all
cd ./webdriver-ts
npm install
npm run build-prod
cd ../webdriver-ts-results
npm install
```

### benchmark

Make sure all benchmarks are run in the same exact context. For that, we recommend to restart your computer and to only run the following commands.

1. Run the HTTP server: `npm start`
2. (in `webdriver-ts`) run some benchmarks
   - all: `npm run bench`
   - just one: `npm run bench (keyed|non-keyed)/<project-name>`
   - all VanillaJS: `npm run bench -- --framework vanillajs`

open http://localhost:8080/webdriver-ts-results/table.html

Go check [How to get started](https://github.com/krausest/js-framework-benchmark#how-to-get-started---building-and-running) for more information.
