var utils = require('loader-utils');

function generateExpression(types, paramName) {
  types = types || "eot;woff;woff2;svg;ttf;otf;jpg;jpeg;png;ico;gif;json";
  types = types.split(";");

  var expression = "";
  for (var n = 0; n < types.length; n++) {
    expression = expression + "\\." + types[n] + "(?!\\?" + paramName + ")[\\?|" + '\\"|' + "\\\\|\\'|\\`|\\|#)]{1}|";
  }

  expression = expression.substr(0, expression.length - 1);
  return new RegExp(expression, "ig");
}

function replacePathsInFile(source, expression, paramName, paramValue) {
  var matches, output = [];
  while (matches = expression.exec(source)) {
    if (output.indexOf(matches[0]) === -1) {
      output.push(matches[0]);
    }
  }

  for (var i = 0; i < output.length; i++) {
    var match = output[i];
    var lastChar = match[match.length - 1];
    var hasArgs = lastChar === "?";
    var replacement = match.substr(0, match.length - 1);
    replacement = replacement + "?" + paramName + "=" + paramValue;
    replacement = hasArgs ? replacement + "" : replacement + lastChar;
    replacement = replacement.replace("\\", "");

    var rawEnding = "\\" + match.replace("\?", "").replace("\\", "");
    var query = rawEnding === "\\.woff" ? rawEnding + "(?!2)" : rawEnding;
    source = source.replace(new RegExp(query, "g"), replacement);
  }

  return source;
}

module.exports = function(source) {
  this.cacheable();

  var query = utils.parseQuery(this.query);

  if (!query.name) {
    throw new Error("No name set!");
  }

  if (!query.value) {
    // No busting
    return source;
  }

  var expression = generateExpression(query.types, query.name);
  return replacePathsInFile(source, expression, query.name, query.value);
};
