var fs = require("fs");
var ReactTools = require("react-tools");
var origJs = require.extensions[".js"];

var transform = function (filename) {
    var content = fs.readFileSync(filename, "utf8");
    return ReactTools.transform(content, {harmony: true});
};

require.extensions[".js"] = function (module, filename) {
    if (filename.indexOf("node_modules/") >= 0) {
        return (origJs || require.extensions[".js"])(module, filename);
    }
    return module._compile(transform(filename), filename);
};
