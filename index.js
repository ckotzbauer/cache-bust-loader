var utils = require('loader-utils');

function generateExpression(types) {
    types = types || "eot;woff;woff2;svg;ttf;otf;jpg;jpeg;png;ico;gif;json";
    types = types.split(";");

    var expression = "";
    for (var n = 0; n < types.length; n++) {
        expression = expression + "\\." + types[n] + "\\??|";
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
        var hasArgs = match.indexOf("?") !== -1;
        var replacement = hasArgs ? match.substr(0, match.length - 1) : match;
        replacement = replacement + "?" + paramName + "=" + paramValue;
        replacement = hasArgs ? replacement + "&" : replacement;

        var rawEnding = "\\" + match.replace("\?", "");
        var query = hasArgs ? rawEnding + "\\?" : rawEnding + "(?!\\?{1})";
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

    var expression = generateExpression(query.types);
    return replacePathsInFile(source, expression, query.name, query.value);
};
