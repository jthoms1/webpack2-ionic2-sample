var loaderUtils = require("loader-utils");
var path = require("path");

module.exports = function(source, sourceMap) {
  this.cacheable();
  var query = loaderUtils.parseQuery(this.query);
  var loaderContext = this;
  var resourcePath = this.resourcePath;

  return query.files.reduce(function(resourceContents, file) {
    var interpolatedName = loaderUtils.interpolateName(loaderContext, file, {
      context: loaderContext.options.context
    });

    try {
      var dir = path.dirname(resourcePath);
      var filePath = path.join(dir, interpolatedName)
      var stats = fs.lstatSync(filePath);

      if (stats.isFile()) {
        return 'import \'' + interpolatedName + '\'\n' + resourceContents;
      }
    } catch (e) {} // eslint-disable-line no-empty

    return resourceContents;
  }, source);
};
