# OAI-distiller
Entity extraction, disambiguation and annotation for OAI-PMH openarchive document, using [gulp](http://gulpjs.com/).

## installation
Once cloned, copy the `settings.example.js` file to `settings.js`. Change the paths and add the proper api keys for Textrazor and Babelfy services.
For more information about the services, please read the documentation of the npm library [public-eye](https://www.npmjs.com/package/public-eye).
Concerning paths in `settings.js`, you should set were the source xml files are and where you wish the parsed json files will be stored:

```javascript
  src: '/somewhere/data/open-archive/*/*.xml', // gulp.src arg
  dest: '/somewhere/data/open-archive/parsed', // gulp.dest arg
```

```
$ git clone https://github.com/CVCEeu-dh/OAI-distiller.git

$ cd OAI-distiller 
$ npm install -g gulp
$ npm install
```

## run distiller
Simply `gulp`
