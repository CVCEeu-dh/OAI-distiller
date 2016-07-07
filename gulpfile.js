var gulp        = require('gulp'),
    path        = require('path'),

    pkg         = require('./package.json'),
    settings    = require('./settings'),
    $           = require('gulp-load-plugins')(),

    async       = require('async'),

    through     = require('through2'),
    cheerio     = require('cheerio'),
    publicEye   = require('public-eye')(settings);


// pseudo-pugin for cusrom xml parsing



// copy (compress) locale to dist
gulp.task('locale', function() {
  return gulp.src(settings.paths.src)
    .pipe(function(){
      return through.obj(function (file, encoding, done) {
        if (file.isNull()) return done(null, file);
        
        // parse open archive element (a record per xml file)
        var che = cheerio.load(file.contents.toString(), {
                        xmlMode: true
                      }),
            // single pen archive record
            records = che('OAI-PMH ListRecords record'),
            description    = records.find('dc\\:description').text(),

            // the json representation for the object
            result = {
              type    : records.find('dc\\:type').text(),
              title   : records.find('dc\\:title').text(),
              source  : records.find('dc\\:source').text(),
              date    : records.find('dc\\:date').text(),

              publisher   : records.find('dc\\:publisher').text(),
              description : description
            };

        console.log(result.type, result.title);
        
        // chain of enrichment, can concatenate different publicEye services
        async.waterfall([
          function initwaterfall (callback){
            callback(null, result);
          },
          // connect to textrazor to get the data
          function distill (result, callback){

            publicEye.series({
              services:[
                'textrazor',
                'babelfy'
              ],
              text: description
            }, function(err, res){
              if(err)
                return callback(err);
              // console.log(err, response)
              console.log('  found', res.entities.length, 'entities')
              result.entities = res.entities;
              
              setTimeout(function(){
                callback(null, result);
              }, 500);
              
            });
          },
        ], function(err, result) {
          if(err) // todo: PluginError
            throw err;
          console.log('  saving file...', result.title);
          file.contents = new Buffer(JSON.stringify(result));
          done(null, file)
        });
      });
    }())

    
    .pipe($.rename({
      extname: ".json"
    }))
    
    .pipe(gulp.dest(settings.paths.dest))
    .pipe($.size({title: 'locale'}));
});


gulp.task('default', ['locale']);