var FileFilter   = require('./lib/FileFilter');
var FileFinder   = require('./lib/FileFinder');
var Runner       = require('./lib/Runner');

module.exports = function(dir, options) {
  options  = options || {};
  var include  = options.include  || /test-.+\.js$/;
  var Reporter = require('./lib/reporter/'
    + (process.env.REPORTER || options.reporter || 'BashReporter'));

  var finder   = new FileFinder(dir);
  var filter   = new FileFilter({include: include});

  finder.execute(function(err, files) {
    if (err) throw err;

    files = filter.filter(files);

    options.files = files;
    var runner   = new Runner(options);
    var reporter = new Reporter({runner: runner});
    runner.execute();
  });
};
