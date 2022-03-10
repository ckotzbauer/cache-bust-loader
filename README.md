# Cache-Bust Loader

[![NPM](https://img.shields.io/npm/v/cache-bust-loader.svg)](https://www.npmjs.com/package/cache-bust-loader)

## DEPRECATED: This project is not maintained anymore.

This Webpack loader adds a cache-bust query parameter to referenced files in your source code.


## Installation

```
npm install cache-bust-loader
```


## Usage

Add this to your webpack.config.js to apply the logic to your .css files for example.

### Webpack 1

```js
module.exports = {
  ...
  module: {
    loaders: [
	  { test: /\.css$/, loader: "cache-bust-loader?name=bust&value=ZZxTE!css-loader" }
	]
  }
  ...
};
```

### Webpack 2

```js
module.exports = {
  ...
  module: {
    rules: [
	  { test: /\.css$/, loader: "cache-bust-loader?name=bust&value=ZZxTE!css-loader" }
	]
  }
  ...
};
```

## Configuration

The following parameters are possible:

| Parameter   | Mandatory | Data type | Default value                                        |
|-------------|-----------|-----------|------------------------------------------------------|
| `name`      | True      | String    |                                                      |
| `value`     | False     | String    |                                                      |
| `types`     | False     | String    | eot;woff;woff2;svg;ttf;otf;jpg;jpeg;png;ico;gif;json |

The `name` describes the name of the query parameter, the `value` the string which should change every build. If the `value` is empty, no parameters are applied (e.g. in development mode). The `types` are filetypes
which you want to be cache-busted. Split them with a semicolon.


[License](https://github.com/ckotzbauer/cache-bust-loader/blob/main/LICENSE)
------
