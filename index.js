var through = require('through2');
var gutil = require('gulp-util');
var PLUGIN_NAME = "gulp-rmindent";

module.exports = function () {
  return through.obj(function (file, enc, next) {
    if (file.isNull()) {
      this.push(file);
      return next();
    }

    if (file.isStream()) {
      this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
    }

    function removeIndention(html) {
      var res = ["pre", "script", "style"].map(function(tag){
        return new RegExp("\<" + tag + "\[\\s\\S\]\*\?\\<\\/" + tag + "\\>", 'igm');
      })
      var origCodes = res.map(function(re){
        return html.match(re);
      });
      var newHtml = html.replace(/^\s*/gm, "").replace(/[\r\n]/gm, "");
      res.map(function(re, i){
        var targets = newHtml.match(re);
        var codes = origCodes[i];
        if (!codes) return;
        for (var i = 0; i < codes.length; i++) {
          newHtml = newHtml.replace(targets[i], codes[i])
        }
      })
      return newHtml;
    }

    try {
      file.contents = new Buffer(removeIndention(file.contents.toString()));
    } catch (err) {
      this.emit('error', new gutil.PluginError(PLUGIN_NAME, err.toString()));
    }

    this.push(file);
    next();
  });
};

